"""GES Asistanı web servisi — asistan çekirdeğini SSE akışıyla sunar.

Çalıştırma:  python3 -m uvicorn servis:app --app-dir ajan --port 8756
Uçlar:
  POST /sohbet  {"mesajlar":[{"role":"user","content":"..."}]}  → SSE akışı
                olaylar: durum | delta (metin parçası) | duzeltme (metni DEĞİŞTİR) |
                         denetim | arac (hesap sonucu) | bitti | hata
  POST /lead    {"mesajlar":[...], "iletisim": "tel/eposta (ops.)"} → lead kaydı
  GET  /saglik  → {"durum":"ok"}

Not: Çekirdek mantık asistan.py'de; burada yalnız akış orkestrasyonu ve koruma var.
"""

import datetime
import json
import os
import subprocess
import threading
import time
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse

from asistan import (ARACLAR, GUVENLI_YANIT, SISTEM, _denetle, _istemci, _kb_yukle,
                     fatura_analizi, fizibilite, lead_ozeti)

ROOT = Path(__file__).resolve().parent.parent
# Railway'de kalıcı volume bu yola bağlanır (LEAD_DIZIN=/app/kb/lead); yerelde repo içi.
LEAD_DIZIN = Path(os.environ.get("LEAD_DIZIN", str(ROOT / "kb" / "lead")))

app = FastAPI()
_istemci_tekil = None
_kilit = threading.Lock()

# ---- IP başına hız sınırı (bellek içi; tek süreç için yeterli) ----
SAAT_LIMIT = 12          # IP başına saatte istek
ESZAMANLI_LIMIT = 4      # aynı anda işlenen sohbet
_istekler = {}           # ip -> [zaman damgaları]
_eszamanli = threading.Semaphore(ESZAMANLI_LIMIT)


def _sinirli_mi(ip):
    simdi = time.time()
    with _kilit:
        gecmis = [t for t in _istekler.get(ip, []) if simdi - t < 3600]
        if len(gecmis) >= SAAT_LIMIT:
            _istekler[ip] = gecmis
            return True
        gecmis.append(simdi)
        _istekler[ip] = gecmis
        return False


def _al():
    global _istemci_tekil
    with _kilit:
        if _istemci_tekil is None:
            _istemci_tekil = _istemci()
    return _istemci_tekil


def _sse(olay, veri):
    return f"event: {olay}\ndata: {json.dumps(veri, ensure_ascii=False)}\n\n"


def _metin(yanit):
    return "".join(b.text for b in yanit.content if b.type == "text")


IZINLI_GORSEL = {"image/jpeg", "image/png", "image/webp"}
EK_BOYUT_SINIRI = 9_000_000  # base64 karakter (≈ 6,5 MB dosya)


def _temiz_bloklar(icerik):
    """Son kullanıcı mesajındaki ek bloklarını (fatura görseli/PDF) doğrular."""
    bloklar, boyut = [], 0
    for b in icerik[:4]:
        if not isinstance(b, dict):
            continue
        tur = b.get("type")
        if tur == "text":
            metin = str(b.get("text", "")).strip()[:4000]
            if metin:
                bloklar.append({"type": "text", "text": metin})
        elif tur in ("image", "document"):
            kaynak = b.get("source") or {}
            mt, veri = kaynak.get("media_type"), kaynak.get("data")
            if kaynak.get("type") != "base64" or not isinstance(veri, str):
                continue
            if tur == "image" and mt not in IZINLI_GORSEL:
                continue
            if tur == "document" and mt != "application/pdf":
                continue
            boyut += len(veri)
            if boyut > EK_BOYUT_SINIRI:
                continue
            bloklar.append({"type": tur, "source": {"type": "base64", "media_type": mt, "data": veri}})
    return bloklar


def _temiz_mesajlar(ham):
    """Geçmişi güvenli forma indirger: metin + yalnız SON mesajda ek blokları."""
    ham = ham[-20:]  # geçmiş üst sınırı
    temiz = []
    for i, m in enumerate(ham):
        rol = m.get("role")
        icerik = m.get("content")
        if rol not in ("user", "assistant"):
            continue
        if isinstance(icerik, str) and icerik.strip():
            temiz.append({"role": rol, "content": icerik.strip()[:4000]})
        elif isinstance(icerik, list) and rol == "user" and i == len(ham) - 1:
            bloklar = _temiz_bloklar(icerik)
            if bloklar:
                temiz.append({"role": rol, "content": bloklar})
    return temiz


@app.get("/saglik")
def saglik():
    return {"durum": "ok"}


@app.post("/sohbet")
async def sohbet_ucu(istek: Request):
    ip = (istek.headers.get("x-forwarded-for", "").split(",")[0].strip()
          or (istek.client.host if istek.client else "?"))
    if _sinirli_mi(ip):
        return JSONResponse({"hata": "Saatlik soru sınırına ulaşıldı; lütfen daha sonra deneyin."},
                            status_code=429)
    ham_govde = await istek.body()
    if len(ham_govde) > 13_000_000:
        return JSONResponse({"hata": "Dosya çok büyük; en fazla 6 MB'lık bir fatura yükleyin."},
                            status_code=413)
    govde = json.loads(ham_govde)
    mesajlar = _temiz_mesajlar(govde.get("mesajlar", []))
    if not mesajlar or mesajlar[-1]["role"] != "user":
        return JSONResponse({"hata": "Geçerli bir soru gönderin."}, status_code=400)

    def uret():
        if not _eszamanli.acquire(blocking=False):
            yield _sse("hata", {"mesaj": "Şu an yoğunluk var; lütfen birkaç dakika sonra deneyin."})
            return
        try:
            istemci = _al()
            soru = mesajlar[-1]["content"]
            sistem = [{"type": "text", "text": SISTEM + _kb_yukle(),
                       "cache_control": {"type": "ephemeral"}}]
            gecmis = list(mesajlar)
            yanit = None
            for _tur in range(8):
                yield _sse("durum", {"mesaj": "düşünüyor"})
                with istemci.beta.messages.stream(
                    model="claude-opus-5", max_tokens=6144,
                    betas=["server-side-fallback-2026-07-01"], fallbacks="default",
                    system=sistem, tools=ARACLAR, messages=gecmis,
                ) as akis:
                    for parca in akis.text_stream:
                        yield _sse("delta", {"t": parca})
                    yanit = akis.get_final_message()
                if yanit.stop_reason != "tool_use":
                    break
                gecmis.append({"role": "assistant", "content": yanit.content})
                sonuclar = []
                for blok in yanit.content:
                    if blok.type == "tool_use":
                        yield _sse("durum", {"mesaj": "hesaplıyor"})
                        arac = {"fizibilite_hesabi": fizibilite,
                                "fatura_analizi": fatura_analizi}.get(blok.name)
                        try:
                            cikti = ({"hata": f"Bilinmeyen araç: {blok.name}"} if arac is None
                                     else arac(**blok.input))
                        except Exception as e:
                            cikti = {"hata": f"Araç hatası: {type(e).__name__}"}
                        yield _sse("arac", {"ad": blok.name, "sonuc": cikti})
                        sonuclar.append({"type": "tool_result", "tool_use_id": blok.id,
                                         "content": json.dumps(cikti, ensure_ascii=False),
                                         "is_error": "hata" in cikti})
                gecmis.append({"role": "user", "content": sonuclar})

            metin = _metin(yanit) if yanit else ""
            if not metin:
                yield _sse("duzeltme", {"metin": GUVENLI_YANIT})
                yield _sse("bitti", {})
                return

            yield _sse("durum", {"mesaj": "denetleniyor"})
            karar = _denetle(soru, metin, istemci)
            if karar.startswith("SORUN"):
                # Tek revizyon hakkı (akışsız), sonra yeniden denetim; geçmezse güvenli yanıt
                duzeltme_istegi = gecmis + [
                    {"role": "assistant", "content": metin},
                    {"role": "user", "content": (
                        "<system-reminder>Denetçi kontrolü cevabında hata buldu. Cevabını "
                        "aşağıdaki düzeltmelerle yeniden yaz; düzeltme sürecinden bahsetme, "
                        f"doğrudan nihai cevabı ver.\n{karar}</system-reminder>")},
                ]
                revize = istemci.beta.messages.create(
                    model="claude-opus-5", max_tokens=6144,
                    betas=["server-side-fallback-2026-07-01"], fallbacks="default",
                    system=sistem, messages=duzeltme_istegi)
                yeni = _metin(revize)
                if yeni and _denetle(soru, yeni, istemci).startswith("ONAY"):
                    yield _sse("duzeltme", {"metin": yeni})
                    yield _sse("denetim", {"sonuc": "onay", "revize": True})
                else:
                    yield _sse("duzeltme", {"metin": GUVENLI_YANIT})
                    yield _sse("denetim", {"sonuc": "guvenli-yanit"})
            else:
                yield _sse("denetim", {"sonuc": "onay"})
            yield _sse("bitti", {})
        except Exception as e:
            yield _sse("hata", {"mesaj": f"Beklenmeyen hata ({type(e).__name__}); "
                                         "lütfen yeniden deneyin."})
        finally:
            _eszamanli.release()

    return StreamingResponse(uret(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


AYIKLAMA_ARACI = [{
    "name": "fatura_alanlari",
    "description": "Fatura görselinden okunan alanları yapılandırılmış olarak döndür.",
    "input_schema": {
        "type": "object",
        "properties": {
            "belge_fatura_mi": {"type": "boolean",
                                "description": "Belge gerçekten bir elektrik faturası mı"},
            "abone_grubu": {"type": "string",
                            "enum": ["mesken", "ticarethane", "sanayi", "tarimsal", "belirsiz"]},
            "donem_ay": {"type": "string", "description": "YYYY-AA; okunamadıysa boş"},
            "tuketim_kwh": {"type": "number", "minimum": 0},
            "aktif_enerji_tl": {"type": "number", "minimum": 0},
            "dagitim_tl": {"type": "number", "minimum": 0},
            "toplam_tutar_tl": {"type": "number", "minimum": 0,
                                "description": "Vergiler dahil ödenecek tutar"},
            "il": {"type": "string", "description": "Faturadan okunabiliyorsa il adı; yoksa boş"},
            "okunamayanlar": {"type": "array", "items": {"type": "string"},
                              "description": "Okunamayan/bulanık alan adları"},
        },
        "required": ["belge_fatura_mi", "abone_grubu", "tuketim_kwh",
                     "aktif_enerji_tl", "dagitim_tl", "toplam_tutar_tl"],
        "additionalProperties": False,
    },
}]


@app.post("/fatura-ayikla")
async def fatura_ayikla(istek: Request):
    """Fatura görseli/PDF'inden alanları okur — fatura sihirbazının ilk adımı."""
    ip = (istek.headers.get("x-forwarded-for", "").split(",")[0].strip()
          or (istek.client.host if istek.client else "?"))
    if _sinirli_mi(ip):
        return JSONResponse({"hata": "Saatlik sınır aşıldı; lütfen daha sonra deneyin."},
                            status_code=429)
    ham = await istek.body()
    if len(ham) > 13_000_000:
        return JSONResponse({"hata": "Dosya çok büyük; en fazla 6 MB yükleyin."}, status_code=413)
    govde = json.loads(ham)
    bloklar = _temiz_bloklar([govde.get("ek") or {}])
    if not any(b["type"] in ("image", "document") for b in bloklar):
        return JSONResponse({"hata": "Geçerli bir fatura görseli (JPEG/PNG/WebP) veya PDF gönderin."},
                            status_code=400)
    bloklar.append({"type": "text", "text": "Bu elektrik faturasındaki alanları oku ve "
                                            "fatura_alanlari aracıyla döndür."})
    try:
        yanit = _istemci().messages.create(
            model="claude-sonnet-5",
            max_tokens=1500,
            system=("Türk elektrik faturalarını okuyan bir ayıklayıcısın. Yalnız görselde "
                    "gördüğünü yaz; emin olmadığın alanı okunamayanlar listesine ekle, asla "
                    "tahmin etme. Tüketim kWh, aktif enerji bedeli ve dağıtım bedeli satırlarını "
                    "vergisiz tutarlarıyla; toplam tutarı vergiler dahil oku."),
            tools=AYIKLAMA_ARACI,
            tool_choice={"type": "tool", "name": "fatura_alanlari"},
            messages=[{"role": "user", "content": bloklar}],
        )
        alanlar = next(b.input for b in yanit.content if b.type == "tool_use")
    except Exception as e:
        return JSONResponse({"hata": f"Fatura okunamadı ({type(e).__name__}); daha net bir "
                                     "fotoğrafla deneyin."}, status_code=502)
    return alanlar


@app.post("/lead")
async def lead_ucu(istek: Request):
    ip = (istek.headers.get("x-forwarded-for", "").split(",")[0].strip()
          or (istek.client.host if istek.client else "?"))
    if _sinirli_mi(ip):
        return JSONResponse({"hata": "sınır"}, status_code=429)
    govde = await istek.json()
    mesajlar = _temiz_mesajlar(govde.get("mesajlar", []))
    iletisim = str(govde.get("iletisim", ""))[:200]
    if not mesajlar:
        return JSONResponse({"hata": "Sohbet geçmişi boş."}, status_code=400)
    try:
        ozet = lead_ozeti(mesajlar, _al())
    except Exception as e:
        ozet = {"hata": f"özet üretilemedi: {type(e).__name__}"}
    kayit = {
        "zaman": datetime.datetime.now().isoformat(timespec="seconds"),
        "iletisim": iletisim,
        "ozet": ozet,
        "sohbet": mesajlar,
    }
    LEAD_DIZIN.mkdir(parents=True, exist_ok=True)
    dosya = LEAD_DIZIN / f"{kayit['zaman'].replace(':', '')}.json"
    dosya.write_text(json.dumps(kayit, ensure_ascii=False, indent=2), encoding="utf-8")
    try:  # Ozan'a anında masaüstü bildirimi (e-posta kanalı yayında bağlanacak)
        subprocess.run(["osascript", "-e",
                        'display notification "Yeni danışmanlık talebi geldi — kb/lead/" '
                        'with title "gesdanışmanı" sound name "Glass"'], timeout=10)
    except Exception:
        pass
    return {"durum": "kaydedildi"}
