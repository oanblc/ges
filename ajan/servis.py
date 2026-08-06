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
import subprocess
import threading
import time
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse

from asistan import (ARACLAR, GUVENLI_YANIT, SISTEM, _denetle, _istemci, _kb_yukle,
                     fatura_analizi, fizibilite, lead_ozeti)

ROOT = Path(__file__).resolve().parent.parent
LEAD_DIZIN = ROOT / "kb" / "lead"

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


def _temiz_mesajlar(ham):
    """İstemciden gelen geçmişi güvenli text-only forma indirger."""
    temiz = []
    for m in ham[-20:]:  # geçmiş üst sınırı
        rol = m.get("role")
        icerik = m.get("content")
        if rol in ("user", "assistant") and isinstance(icerik, str) and icerik.strip():
            temiz.append({"role": rol, "content": icerik.strip()[:4000]})
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
    govde = await istek.json()
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
