"""GES Danışmanı — asistan çekirdeği (prototip).

Sitedeki sohbetin arkasında çalışacak beyin. Özellikleri:
- Tüm bilgi tabanını (kb/ + kb/taslak/) bağlama yükler; prompt cache ile ekonomik.
- Eksik bilgiyle gelen soruda TAHMİN ETMEZ, eksik girdileri kullanıcıdan ister.
- Hesap gerektiğinde deterministik fizibilite motorunu araç olarak çağırır
  (rakamlar modelden değil koddan gelir).
- Her mevzuat/rakam iddiasında kb kaynağını belirtir; 7 yaygın miti düzeltir.

Kullanım:
  python3 ajan/asistan.py "soru"          → tek soru-cevap
  python3 ajan/asistan.py                 → etkileşimli sohbet (çıkış: q)
"""

import json
import os
import sys
from pathlib import Path

import anthropic

ROOT = Path(__file__).resolve().parent.parent
KB = ROOT / "kb"

# ---------------------------------------------------------------- kb yükleme

def _env_yukle() -> None:
    env = ROOT / ".env"
    if env.exists():
        for satir in env.read_text().splitlines():
            if "=" in satir and not satir.startswith("#"):
                k, _, v = satir.partition("=")
                os.environ.setdefault(k.strip(), v.strip())


def _kb_yukle() -> str:
    parcalar = []
    for d in sorted(KB.glob("*.md")) + sorted((KB / "taslak").glob("*.md")):
        if d.name == "README.md":
            continue
        parcalar.append(f"\n<dosya ad=\"{d.name}\">\n{d.read_text(encoding='utf-8')}\n</dosya>")
    canli = KB / "veri" / "piyasa-canli.json"
    if canli.exists():
        parcalar.append(f"\n<dosya ad=\"piyasa-canli.json\">\n{canli.read_text()}\n</dosya>")
    return "".join(parcalar)


# ------------------------------------------------- deterministik hesap aracı
# web/lib/hesap.ts ile aynı model — tek doğruluk kaynağı kb/tarifeler.md

FIYAT = {
    "mesken_k1": (0.494065 * 1.06 + 2.4249) * 1.10,
    "mesken_k2": (1.895808 * 1.06 + 2.4249) * 1.10,
    "ticarethane": (2.873087 * 1.06 + 2.479368) * 1.20,
    "mesken_satis": 1.895808,
    "ticarethane_satis": 2.873087,
}
# 81 il — web/data/kb.ts ILLER ile birebir aynı (senkron bozma!)
ILLER = {
    "adana":1580,"adiyaman":1600,"afyonkarahisar":1520,"agri":1500,"aksaray":1520,
    "amasya":1300,"ankara":1450,"antalya":1600,"ardahan":1400,"artvin":1150,
    "aydin":1520,"balikesir":1380,"bartin":1200,"batman":1600,"bayburt":1400,
    "bilecik":1350,"bingol":1480,"bitlis":1500,"bolu":1250,"burdur":1560,
    "bursa":1350,"canakkale":1400,"cankiri":1400,"corum":1350,"denizli":1520,
    "diyarbakir":1600,"duzce":1200,"edirne":1350,"elazig":1520,"erzincan":1450,
    "erzurum":1450,"eskisehir":1450,"gaziantep":1580,"giresun":1150,"gumushane":1350,
    "hakkari":1550,"hatay":1500,"igdir":1500,"isparta":1550,"istanbul":1300,
    "izmir":1500,"kahramanmaras":1550,"karabuk":1250,"karaman":1560,"kars":1450,
    "kastamonu":1250,"kayseri":1500,"kilis":1600,"kirikkale":1450,"kirklareli":1330,
    "kirsehir":1480,"kocaeli":1280,"konya":1550,"kutahya":1450,"malatya":1550,
    "manisa":1480,"mardin":1620,"mersin":1600,"mugla":1550,"mus":1480,
    "nevsehir":1500,"nigde":1550,"ordu":1150,"osmaniye":1550,"rize":1100,
    "sakarya":1250,"samsun":1200,"siirt":1600,"sinop":1250,"sivas":1450,
    "sanliurfa":1650,"sirnak":1600,"tekirdag":1330,"tokat":1350,"trabzon":1150,
    "tunceli":1500,"usak":1480,"van":1600,"yalova":1300,"yozgat":1450,
    "zonguldak":1200,
}


def _maliyet_kw(kw: float) -> int:
    for maks, tl in [(10, 38000), (100, 31500), (1000, 25500)]:
        if kw <= maks:
            return tl
    return 22500


def fizibilite(tip: str, aylik_fatura_tl: float, il: str, oz_tuketim_orani: float = 0.8) -> dict:
    if aylik_fatura_tl <= 0:
        return {"hata": "Aylık fatura tutarı 0'dan büyük olmalı. Kullanıcıdan güncel fatura "
                        "tutarını (TL) iste; tahmin etme."}
    anahtar = (il.replace("İ", "i").replace("I", "i").lower()
               .replace("ı", "i").replace("ş", "s").replace("ğ", "g")
               .replace("ü", "u").replace("ö", "o").replace("ç", "c")
               .replace("̇", ""))  # 'İ'.lower() artığı birleşik nokta
    il_notu = None
    verim = ILLER.get(anahtar)
    if verim is None:
        verim = 1450
        il_notu = (f"'{il}' il listesinde bulunamadı; Türkiye ortalaması 1450 kWh/kW kullanıldı. "
                   "Cevapta bu varsayımı AÇIKÇA belirt ve il adını teyit et.")
    if tip == "konut":
        esik_fatura = 240 * FIYAT["mesken_k1"]
        aylik_kwh = (aylik_fatura_tl / FIYAT["mesken_k1"] if aylik_fatura_tl <= esik_fatura
                     else 240 + (aylik_fatura_tl - esik_fatura) / FIYAT["mesken_k2"])
        yillik = aylik_kwh * 12
        kw = min(25, max(2, yillik / verim))
        uretim = kw * verim
        mahsup = min(uretim, yillik)
        k2 = min(mahsup, max(0, yillik - 2880))
        deger = k2 * FIYAT["mesken_k2"] + (mahsup - k2) * FIYAT["mesken_k1"]
        deger += max(0.0, min(uretim - yillik, 2 * yillik - mahsup)) * FIYAT["mesken_satis"]
    else:
        yillik = (aylik_fatura_tl / FIYAT["ticarethane"]) * 12
        kw = min(5000, max(2, yillik / verim))
        uretim = kw * verim
        oz = min(uretim * oz_tuketim_orani, yillik)
        satis = max(0.0, min(uretim - oz, 2 * yillik - oz))
        deger = oz * FIYAT["ticarethane"] + satis * FIYAT["ticarethane_satis"]
    maliyet = kw * _maliyet_kw(kw)
    if deger <= 0:
        return {"hata": "Bu girdilerle yıllık kazanç hesaplanamadı; girdileri kullanıcıyla teyit et."}
    sonuc = {
        "onerilen_kw": round(kw, 1),
        "yillik_uretim_kwh": round(uretim),
        "yillik_tuketim_kwh": round(yillik),
        "tahmini_yatirim_tl": round(maliyet),
        "yillik_kazanc_tl": round(deger),
        "geri_odeme_yil": round(maliyet / deger, 1),
        "il_verimi_kwh_kw": verim,
        "model_notu": ("konut: aylık mahsup + kademeli tarife (EPDK 04.04.2026)" if tip == "konut"
                       else "işletme: saatlik mahsup; öz tüketim tam perakende, satış çıplak enerji bedeli"),
    }
    if il_notu:
        sonuc["il_notu"] = il_notu
    return sonuc


# EPDK 4 Nisan 2026 — vergiler hariç birim değerler (kr/kWh → TL/kWh)
EPDK_DAGITIM = {"mesken_ag": 2.4249, "ticarethane_ag": 2.479368, "sanayi_ag": 1.829503,
                "sanayi_og_tek": 1.182457, "sanayi_og_cift": 1.070498,
                "ticarethane_og_tek": 2.081065, "ticarethane_og_cift": 1.668345,
                "tarimsal_ag": 2.037247}
EPDK_ENERJI = {"mesken_k1": 0.494065, "mesken_k2": 1.895808, "ticarethane_k1": 2.873087,
               "ticarethane_k2": 3.454688, "sanayi_ag": 2.985253, "sanayi_og": 2.909687,
               "tarimsal_ag": 2.333838}


def fatura_analizi(abone_grubu: str, tuketim_kwh: float, aktif_enerji_tl: float,
                   dagitim_tl: float, donem_ay: str = "", yekdem_tl: float = 0.0,
                   sabit_maliyet_tl: float = 0.0) -> dict:
    """Protokol v2'nin deterministik çekirdeği: birim fiyat ayrıştırma + çapraz doğrulama."""
    if tuketim_kwh <= 0:
        return {"hata": "Tüketim (kWh) 0'dan büyük olmalı. Kullanıcıdan faturadaki tüketim "
                        "satırını iste."}
    if aktif_enerji_tl <= 0 or dagitim_tl < 0:
        return {"hata": "Aktif enerji bedeli pozitif, dağıtım bedeli negatif olmayan bir tutar "
                        "olmalı. Faturadaki değerleri kullanıcıyla teyit et."}
    birim = aktif_enerji_tl / tuketim_kwh
    birim_dagitim = dagitim_tl / tuketim_kwh

    # Dağıtım eşleştirme → abone grubu/gerilim teşhisi
    dagitim_eslesme = min(EPDK_DAGITIM.items(), key=lambda kv: abs(kv[1] - birim_dagitim))
    dagitim_sapma = abs(dagitim_eslesme[1] - birim_dagitim) / dagitim_eslesme[1]

    # Piyasa verisi (canlı dosyadan)
    ptf, yekdem_tahmin = None, {"2026-07": 0.42399, "2026-08": 0.45045}.get(donem_ay[:7] if donem_ay else "")
    canli = KB / "veri" / "piyasa-canli.json"
    if canli.exists() and donem_ay:
        aylik = json.loads(canli.read_text()).get("ptf_aylik", {}).get(donem_ay[:7])
        if aylik:
            ptf = aylik["ortalama"] / 1000

    # Rejim teşhisi
    rejim, detay = "belirsiz", []
    grup_enerji = EPDK_ENERJI.get(abone_grubu)
    if grup_enerji and abs(birim - grup_enerji) / grup_enerji < 0.02:
        rejim = "ulusal tarife"
    elif ptf and yekdem_tahmin:
        oran = birim / (ptf + yekdem_tahmin)
        if abs(oran - 1.0938) < 0.02:
            rejim = "SKTT (ikili anlaşma sonlanmış olabilir!)"
        elif 0.95 < oran < 1.15:
            rejim = "ikili anlaşma — PTF+YEKDEM+marj endeksli"
            if yekdem_tl:
                enerji_bileseni = (aktif_enerji_tl - yekdem_tl - sabit_maliyet_tl) / tuketim_kwh
                detay.append(f"enerji bileşeni {enerji_bileseni:.4f} TL/kWh (dönem ort. PTF {ptf:.4f} → marj %{(enerji_bileseni/ptf-1)*100:.1f})")
                detay.append(f"YEKDEM bileşeni {yekdem_tl/tuketim_kwh:.4f} TL/kWh (tahmini karar değeri {yekdem_tahmin})")
        elif grup_enerji and birim < grup_enerji:
            rejim = "ikili anlaşma — tarife altı sabit/iskonto"
    return {
        "birim_fiyat_tl_kwh": round(birim, 5),
        "rejim_teshisi": rejim,
        "ayrisim": detay,
        "dagitim_birim": round(birim_dagitim, 5),
        "dagitim_eslesen_tarife": f"{dagitim_eslesme[0]} ({dagitim_eslesme[1]})",
        "dagitim_dogru_mu": "EŞLEŞTİ ✓" if dagitim_sapma < 0.01 else f"SAPMA %{dagitim_sapma*100:.1f} — anomali olabilir",
        "ges_tasarruf_degeri_tl_kwh": round((birim + birim_dagitim) * 1.2, 3),
        "not": "GES tasarruf değeri = (enerji+dağıtım)×KDV yaklaşımı; BTV/fon hariç kaba değer",
    }


ARACLAR = [{
    "name": "fatura_analizi",
    "description": (
        "Elektrik faturası ayrıştırma ve çapraz doğrulama motoru (protokol v2). Kullanıcı fatura "
        "değerlerini verdiğinde çağır. Zorunlu: abone grubu tahmini, tüketim (kWh), aktif enerji "
        "bedeli (TL), dağıtım bedeli (TL). Varsa: dönem (YYYY-AA), YEKDEM ve sabit maliyet "
        "bileşenleri. Eksikse kullanıcıdan faturadaki ilgili satırları iste."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "abone_grubu": {"type": "string", "enum": list(EPDK_ENERJI.keys())},
            "tuketim_kwh": {"type": "number", "exclusiveMinimum": 0},
            "aktif_enerji_tl": {"type": "number", "exclusiveMinimum": 0},
            "dagitim_tl": {"type": "number", "minimum": 0},
            "donem_ay": {"type": "string", "description": "YYYY-AA"},
            "yekdem_tl": {"type": "number", "minimum": 0},
            "sabit_maliyet_tl": {"type": "number", "minimum": 0},
        },
        "required": ["abone_grubu", "tuketim_kwh", "aktif_enerji_tl", "dagitim_tl"],
        "additionalProperties": False,
    },
}, {
    "name": "fizibilite_hesabi",
    "description": (
        "Deterministik GES fizibilite motoru. Kullanıcıdan üç zorunlu bilgi alındıktan SONRA çağır: "
        "tip (konut/isletme), aylık fatura (TL), il. İşletmede öz tüketim oranı da sorulmalı "
        "(gündüz yoğun ~0.8-0.9, akşam yoğun ~0.4-0.5). Rakamları asla kendin tahmin etme."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "tip": {"type": "string", "enum": ["konut", "isletme"]},
            "aylik_fatura_tl": {"type": "number", "exclusiveMinimum": 0},
            "il": {"type": "string"},
            "oz_tuketim_orani": {"type": "number", "minimum": 0.3, "maximum": 0.95},
        },
        "required": ["tip", "aylik_fatura_tl", "il"],
        "additionalProperties": False,
    },
}]

SISTEM = """Sen gesdanismani.com'un GES (güneş enerjisi santrali) danışmanısın. Türkiye'nin
güncel mevzuatlı GES danışmanlık platformunda, hiç bilmeyen kullanıcıya da uzmana da doğru ve güncel
bilgi veriyorsun. Kurulumcu değilsin, satış yapmazsın; kullanıcının tarafındasın.

DAVRANIŞ KURALLARI:
1. EKSİK BİLGİDE TAHMİN ETME, SOR. Fizibilite/maliyet/geri dönüş sorularında üç zorunlu girdi:
   (a) konut mu işletme mi, (b) aylık elektrik faturası (TL), (c) il. İşletmedeyse öz tüketim
   profili de gerekir (gündüz mü akşam mı yoğun çalışıyor). Eksik olanları TEK mesajda, kısa ve
   nazik biçimde iste; bilineni varsayma. Genel bilgi sorularında (mevzuat, süreç) soru sormadan
   doğrudan cevapla.
2. Rakamsal fizibilite SONUCUNU asla kendin üretme — girdiler tamamlanınca fizibilite_hesabi
   aracını çağır ve çıktısını yorumla.
3. Her mevzuat/tarife/fiyat iddiasında bilgi tabanındaki kaynağı kısaca belirt
   (ör. "EPDK 4 Nisan 2026 tarifesi", "RG 02.04.2026 — saatlik mahsuplaşma").
4. Bilgi tabanında olmayan konuda uydurma; "bu konu bilgi tabanımda net değil, danışmanımıza
   iletebilirim" de.
5. Yaygın yanlışları (mitleri) kibarca düzelt — özellikle: saatlik mahsup meskenleri kapsamaz;
   meskene devlet hibesi yoktur; fatura tamamen sıfırlanmaz (dağıtım+vergi kalır); izinsiz
   şebeke bağlantısı olmaz; kışın panel çalışır; bataryasız on-grid kesintide çalışmaz.
6. Ton: profesyonel, sıcak, sade Türkçe; teknik terimi ilk geçtiği yerde bir cümleyle açıkla.
   Cevap sonunda uygunsa tek bir yönlendirme yap (hesaplama, süreç rehberi veya insan danışman).
7. Yatırım/karar niteliğindeki her cevabın SON SATIRI şu olsun: "Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir." Cevabı asla bu nottan önce kesme.

BİLGİ TABANI (tek doğruluk kaynağın):
"""


DENETIM_TALIMATI = """DENETÇİ MODUNDASIN. Aşağıda kullanıcı sorusu ve asistanın taslak cevabı var.
Cevabı bilgi tabanına karşı denetle:
1. Her mevzuat/rakam/tarih iddiası bilgi tabanıyla uyumlu mu? (özellikle: saatlik mahsup mesken
   muafiyeti, 25 kW sınırı, kademe eşiği 240 kWh/ay, tarife değerleri, RG/karar numaraları)
2. Bilgi tabanında olmayan uydurma iddia var mı?
3. Fizibilite soruları için eksik girdiyle rakam verilmiş mi (verilmemeliydi)?
4. Zorunlu uyarılar atlanmış mı (yatırım cevabında "bağlayıcı görüş değildir")?
ÇIKTI FORMATI (başka bir şey yazma):
- Sorun yoksa tek satır: ONAY
- Sorun varsa: SORUN satırı + her hata için "- [iddia] → [doğrusu, kb dayanağıyla]"
"""


def _denetle(soru: str, cevap: str, istemci) -> str:
    """İkinci geçiş: taslak cevabı kb'ye karşı denetler. Aynı system → cache okuması."""
    yanit = istemci.beta.messages.create(
        model="claude-opus-5",
        max_tokens=1024,
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
        output_config={"effort": "low"},
        system=[{
            "type": "text",
            "text": SISTEM + _kb_yukle(),
            "cache_control": {"type": "ephemeral"},
        }],
        messages=[{
            "role": "user",
            "content": f"{DENETIM_TALIMATI}\n\n<soru>{soru}</soru>\n\n<taslak_cevap>{cevap}</taslak_cevap>",
        }],
    )
    return "".join(b.text for b in yanit.content if b.type == "text").strip()


LEAD_SEMASI = {
    "type": "object",
    "properties": {
        "tip": {"type": "string", "enum": ["konut", "isletme", "tarimsal", "belirsiz"]},
        "il": {"type": ["string", "null"]},
        "aylik_fatura_tl": {"type": ["number", "null"]},
        "oz_tuketim_profili": {"type": ["string", "null"], "description": "gündüz/akşam/vardiyalı vb."},
        "konusulan_konular": {"type": "array", "items": {"type": "string"}},
        "niyet_asamasi": {
            "type": "string",
            "enum": ["bilgi_topluyor", "fizibilite_yapildi", "teklif_asamasinda",
                     "kurulum_sonrasi_destek", "belirsiz"],
        },
        "sicaklik": {"type": "string", "enum": ["soguk", "ilik", "sicak"],
                     "description": "sicak = somut rakamlarını verdi ve sonraki adımı sordu"},
        "onerilen_aksiyon": {"type": "string"},
        "ozet": {"type": "string", "description": "danışmana 2-3 cümlelik devir özeti"},
    },
    "required": ["tip", "il", "aylik_fatura_tl", "oz_tuketim_profili", "konusulan_konular",
                 "niyet_asamasi", "sicaklik", "onerilen_aksiyon", "ozet"],
    "additionalProperties": False,
}


def lead_ozeti(mesajlar: list, istemci) -> dict:
    """Sohbet dökümünden panele düşecek yapılandırılmış lead özeti üretir."""
    dokum = []
    for m in mesajlar:
        if isinstance(m["content"], str):
            dokum.append(f"{m['role']}: {m['content']}")
        else:
            for b in m["content"]:
                tur = getattr(b, "type", None) or b.get("type")
                if tur == "text":
                    dokum.append(f"{m['role']}: {getattr(b, 'text', None) or b.get('text', '')}")
                elif tur == "tool_result":
                    dokum.append(f"[hesap sonucu]: {b.get('content', '')[:300]}")
    yanit = istemci.messages.create(
        model="claude-opus-5",
        max_tokens=4096,
        output_config={"effort": "low",
                       "format": {"type": "json_schema", "schema": LEAD_SEMASI}},
        messages=[{
            "role": "user",
            "content": ("Aşağıdaki GES danışmanlık sohbetinden lead özeti çıkar. Bilinmeyen "
                        "alanlara null yaz, tahmin etme.\n\n" + "\n".join(dokum)),
        }],
    )
    return json.loads(next(b.text for b in yanit.content if b.type == "text"))


def _istemci():
    _env_yukle()
    return anthropic.Anthropic()


GUVENLI_YANIT = (
    "Bu sorunun doğrulanmış bir cevabını şu anda üretemedim; yanıltıcı olmamak için taslak "
    "cevabı paylaşmıyorum. Sorunuzu biraz farklı ifade ederek yeniden sorabilir veya "
    "danışmanımıza iletebilirsiniz.\n"
    "Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir."
)


def _guvenli_mesaj(yanit):
    """Denetimden geçemeyen cevabın yerine güvenli metin koyar (aynı Message tipiyle)."""
    ilk_metin = next(b for b in yanit.content if b.type == "text")
    return yanit.model_copy(update={"content": [ilk_metin.model_copy(update={"text": GUVENLI_YANIT})]})


def sohbet(mesajlar: list, istemci) -> anthropic.types.Message:
    duzeltme_hakki = 1  # denetçi en fazla bir kez düzelttirir (döngü emniyeti)
    for _tur in range(8):  # araç/revizyon döngüsü üst sınırı
        yanit = istemci.beta.messages.create(
            model="claude-opus-5",
            max_tokens=6144,
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",
            system=[{
                "type": "text",
                "text": SISTEM + _kb_yukle(),
                "cache_control": {"type": "ephemeral"},
            }],
            tools=ARACLAR,
            messages=mesajlar,
        )
        if yanit.stop_reason != "tool_use":
            # Doğrulama katmanı: taslak cevabı kb'ye karşı denetle; sorun varsa bir kez düzelt
            metin = "".join(b.text for b in yanit.content if b.type == "text")
            soru = next((m["content"] for m in reversed(mesajlar)
                         if m["role"] == "user" and isinstance(m["content"], str)), "")
            karar = _denetle(soru, metin, istemci)
            if karar.startswith("ONAY") or not karar.startswith("SORUN"):
                return yanit
            if duzeltme_hakki == 0:
                # Revizyon da denetimden geçemedi: hatalı cevabı YAYINLAMA, güvenli yanıta düş
                return _guvenli_mesaj(yanit)
            duzeltme_hakki -= 1
            # Revizyon turu yerel kopyada döner — taslak ve düzeltme talimatı
            # çağıranın sohbet geçmişine sızmaz
            mesajlar = mesajlar + [
                {"role": "assistant", "content": yanit.content},
                {"role": "user",
                 "content": ("<system-reminder>Denetçi kontrolü cevabında hata buldu. "
                             "Cevabını aşağıdaki düzeltmelerle yeniden yaz; düzeltme sürecinden "
                             f"bahsetme, doğrudan nihai cevabı ver.\n{karar}</system-reminder>")},
            ]
            continue
        mesajlar.append({"role": "assistant", "content": yanit.content})
        sonuclar = []
        for blok in yanit.content:
            if blok.type == "tool_use":
                arac = {"fizibilite_hesabi": fizibilite, "fatura_analizi": fatura_analizi}.get(blok.name)
                try:
                    if arac is None:
                        cikti, hatali = {"hata": f"Bilinmeyen araç: {blok.name}"}, True
                    else:
                        cikti = arac(**blok.input)
                        hatali = "hata" in cikti
                except Exception as e:
                    cikti, hatali = {"hata": f"Araç hatası: {type(e).__name__}. Girdileri "
                                             "kullanıcıyla teyit edip yeniden dene."}, True
                sonuclar.append({
                    "type": "tool_result",
                    "tool_use_id": blok.id,
                    "content": json.dumps(cikti, ensure_ascii=False),
                    "is_error": hatali,
                })
        mesajlar.append({"role": "user", "content": sonuclar})
    # 8 tura rağmen nihai cevap çıkmadı — döngüyü emniyetle kapat
    return _guvenli_mesaj(yanit) if any(b.type == "text" for b in yanit.content) else yanit


def _yazdir(yanit) -> None:
    for blok in yanit.content:
        if blok.type == "text":
            print(blok.text)


def main() -> None:
    istemci = _istemci()
    if len(sys.argv) > 1:
        mesajlar = [{"role": "user", "content": " ".join(sys.argv[1:])}]
        _yazdir(sohbet(mesajlar, istemci))
        return
    mesajlar: list = []
    print("GES Asistanı (çıkış: q)")
    while True:
        soru = input("\nSiz: ").strip()
        if soru.lower() in ("q", "quit", "çık"):
            break
        mesajlar.append({"role": "user", "content": soru})
        yanit = sohbet(mesajlar, istemci)
        mesajlar.append({"role": "assistant", "content": yanit.content})
        print("\nAsistan:")
        _yazdir(yanit)


if __name__ == "__main__":
    main()
