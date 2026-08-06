"""API'siz birim testler — hesap fonksiyonları ve girdi korumaları.

Kullanım: python3 ajan/test_hesap.py  (API çağrısı yapmaz, ücretsizdir)
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import asistan


def test_iller_senkron():
    assert len(asistan.ILLER) == 81
    assert asistan.ILLER["rize"] == 1100
    assert asistan.ILLER["sanliurfa"] == 1650
    assert asistan.ILLER["istanbul"] == 1300


def test_il_normalizasyon():
    assert asistan.fizibilite("konut", 2000, "İSTANBUL")["il_verimi_kwh_kw"] == 1300
    assert asistan.fizibilite("konut", 2000, "Şanlıurfa")["il_verimi_kwh_kw"] == 1650
    assert asistan.fizibilite("konut", 2000, "Rize")["il_verimi_kwh_kw"] == 1100


def test_bilinmeyen_il_acik_uyari():
    u = asistan.fizibilite("konut", 2000, "Kıbrıs")
    assert u["il_verimi_kwh_kw"] == 1450 and "il_notu" in u


def test_gecersiz_girdi_cokmez():
    assert "hata" in asistan.fizibilite("konut", 0, "Ankara")
    assert "hata" in asistan.fizibilite("isletme", -500, "Konya")
    assert "hata" in asistan.fatura_analizi("mesken_k1", 0, 100, 50)
    assert "hata" in asistan.fatura_analizi("mesken_k1", 100, -5, 50)


def test_kademe_esigi_tam_sinir():
    # 240 kWh/ay tam eşik K1'de kalmalı (web/lib/hesap.ts ile aynı davranış)
    esik_fatura = 240 * asistan.FIYAT["mesken_k1"]
    r = asistan.fizibilite("konut", esik_fatura, "Ankara")
    assert r["yillik_tuketim_kwh"] == 2880, r


def test_enerjisa_referans_ayrisimi():
    # Ozan'ın gerçek sanayi OG ikili anlaşma faturası — her zaman birebir çıkmalı
    f = asistan.fatura_analizi("sanayi_og", 30000, 99937.5, 35473.8, "2026-07", 12720, 4758)
    assert f["birim_fiyat_tl_kwh"] == 3.33125
    assert "EŞLEŞTİ" in f["dagitim_dogru_mu"]


def test_sema_minimumlari():
    fa = next(a for a in asistan.ARACLAR if a["name"] == "fatura_analizi")["input_schema"]["properties"]
    assert fa["tuketim_kwh"]["exclusiveMinimum"] == 0
    fz = next(a for a in asistan.ARACLAR if a["name"] == "fizibilite_hesabi")["input_schema"]["properties"]
    assert fz["aylik_fatura_tl"]["exclusiveMinimum"] == 0


def _normalize(il):
    return (il.replace("İ", "i").replace("I", "i").lower()
            .replace("ı", "i").replace("ş", "s").replace("ğ", "g")
            .replace("ü", "u").replace("ö", "o").replace("ç", "c").replace("̇", ""))


def test_kb_ts_il_paritesi():
    # web/data/kb.ts ILLER listesi Python ILLER ile birebir aynı olmalı
    import re
    ts = (Path(__file__).resolve().parent.parent / "web" / "data" / "kb.ts").read_text()
    govde = ts.split("export const ILLER")[1].split("];")[0]
    ts_iller = {_normalize(ad): int(deger)
                for ad, deger in re.findall(r'\["([^"]+)",\s*(\d+)\]', govde)}
    assert ts_iller == asistan.ILLER, {
        k: (ts_iller.get(k), asistan.ILLER.get(k))
        for k in set(ts_iller) ^ set(asistan.ILLER) or
        [k for k in ts_iller if ts_iller[k] != asistan.ILLER.get(k)]}


def test_kb_ts_tarife_paritesi():
    # kb.ts TARIFE (kr/kWh) ↔ asistan.py EPDK_* (TL/kWh) — 100× fark, aynı rakam
    import json as j
    ts = (Path(__file__).resolve().parent.parent / "web" / "data" / "kb.ts").read_text()
    def deger(ad):
        return float(ts.split(ad + ":")[1].split(",")[0].strip())
    assert abs(deger("enerjiK1") - asistan.EPDK_ENERJI["mesken_k1"] * 100) < 1e-6
    assert abs(deger("dagitimTek") - asistan.EPDK_DAGITIM["sanayi_og_tek"] * 100) < 1e-6
    # PIYASA web tarafında canlı JSON'dan gelmeli (elle kopya kalmamalı)
    assert 'canli.site_ozet' in ts
    web_json = Path(__file__).resolve().parent.parent / "web" / "data" / "piyasa-canli.json"
    assert web_json.exists() and "site_ozet" in j.loads(web_json.read_text())


if __name__ == "__main__":
    basarisiz = 0
    for ad, fn in sorted(globals().items()):
        if ad.startswith("test_"):
            try:
                fn()
                print(f"{ad}: GEÇTİ ✓")
            except AssertionError as e:
                basarisiz += 1
                print(f"{ad}: BAŞARISIZ ✗ {e}")
    sys.exit(1 if basarisiz else 0)
