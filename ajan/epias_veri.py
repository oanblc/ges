"""EPİAŞ Şeffaflık API'sinden gerçekleşen PTF ve YEKDEM verisi çeker.

Kullanım:
  python ajan/epias_veri.py            → son 60 günün verisini çek, kb/veri/ altına yaz

Gereken .env değişkenleri (kayit.epias.com.tr üzerinden ücretsiz hesap):
  EPIAS_KULLANICI=eposta@adresin
  EPIAS_SIFRE=şifren

Çıktılar:
  kb/veri/piyasa-canli.json  → hesap motorunun okuyacağı makine verisi
  kb/veri/piyasa-canli.md    → asistan bilgi tabanı için insan-okur özet
"""

import datetime as dt
import json
import os
import statistics
import sys
import urllib.request
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VERI = ROOT / "kb" / "veri"

GIRIS_URL = "https://giris.epias.com.tr/cas/v1/tickets"
SERVIS = "https://seffaflik.epias.com.tr/electricity-service"
PTF_URL = f"{SERVIS}/v1/markets/dam/data/mcp"
# YEKDEM gerçekleşen birim maliyet uç noktası — ilk canlı çalıştırmada
# Şeffaflık API dokümanından (seffaflik.epias.com.tr/home/api) teyit edilecek.
YEKDEM_URL = f"{SERVIS}/v1/renewables/data/unit-cost"

GUNES_SAATLERI = range(10, 17)  # 10:00–16:59 — çatı GES üretiminin yoğunlaştığı dilim


def _env_yukle() -> None:
    env = ROOT / ".env"
    if env.exists():
        for satir in env.read_text().splitlines():
            if "=" in satir and not satir.startswith("#"):
                k, _, v = satir.partition("=")
                os.environ.setdefault(k.strip(), v.strip())


def _tgt_al() -> str:
    kullanici = os.environ.get("EPIAS_KULLANICI")
    sifre = os.environ.get("EPIAS_SIFRE")
    if not kullanici or not sifre:
        raise SystemExit(
            "EPİAŞ kimlik bilgisi eksik.\n"
            "1) https://kayit.epias.com.tr adresinden ücretsiz hesap aç (e-posta doğrulamalı).\n"
            "2) .env dosyasına EPIAS_KULLANICI ve EPIAS_SIFRE satırlarını ekle.\n"
            "3) Bu betiği yeniden çalıştır."
        )
    veri = urllib.parse.urlencode({"username": kullanici, "password": sifre}).encode()
    istek = urllib.request.Request(
        GIRIS_URL, data=veri,
        headers={"Content-Type": "application/x-www-form-urlencoded", "Accept": "text/plain"},
    )
    with urllib.request.urlopen(istek, timeout=30) as yanit:
        return yanit.read().decode().strip()


def _sorgula(url: str, tgt: str, govde: dict) -> dict:
    istek = urllib.request.Request(
        url, data=json.dumps(govde).encode(),
        headers={"Content-Type": "application/json", "TGT": tgt},
    )
    with urllib.request.urlopen(istek, timeout=60) as yanit:
        return json.loads(yanit.read().decode())


def main() -> None:
    _env_yukle()
    bugun = dt.date.today()
    baslangic = bugun - dt.timedelta(days=60)
    tarih = lambda g, s: f"{g.isoformat()}T{s}+03:00"

    tgt = _tgt_al()
    print("TGT alındı, veri çekiliyor…")

    ptf_ham = _sorgula(PTF_URL, tgt, {
        "startDate": tarih(baslangic, "00:00:00"),
        "endDate": tarih(bugun, "23:59:59"),
    }).get("items", [])
    if not ptf_ham:
        raise SystemExit("PTF verisi boş döndü — tarih aralığını/uç noktayı kontrol et.")

    # Aylık ortalama + güneş saatleri ortalaması
    aylar: dict[str, dict[str, list]] = {}
    for kayit in ptf_ham:
        zaman = dt.datetime.fromisoformat(kayit["date"])
        fiyat = float(kayit["price"])
        ay = zaman.strftime("%Y-%m")
        kova = aylar.setdefault(ay, {"tum": [], "gunes": []})
        kova["tum"].append(fiyat)
        if zaman.hour in GUNES_SAATLERI:
            kova["gunes"].append(fiyat)

    ptf_ozet = {
        ay: {
            "ortalama": round(statistics.mean(k["tum"]), 2),
            "gunes_saatleri_ortalama": round(statistics.mean(k["gunes"]), 2),
            "gunes_orani": round(statistics.mean(k["gunes"]) / statistics.mean(k["tum"]), 3),
        }
        for ay, k in sorted(aylar.items())
    }

    yekdem_ozet: dict | str
    try:
        yekdem_ham = _sorgula(YEKDEM_URL, tgt, {
            "startDate": tarih(baslangic.replace(day=1), "00:00:00"),
            "endDate": tarih(bugun, "23:59:59"),
        }).get("items", [])
        yekdem_ozet = {
            dt.datetime.fromisoformat(k["period"]).strftime("%Y-%m"): round(float(k["unitCost"]), 2)
            for k in yekdem_ham
        } or "veri boş — uç nokta teyit edilecek"
    except Exception as hata:  # uç nokta adı farklıysa akışı durdurma
        yekdem_ozet = f"çekilemedi ({hata}) — YEKDEM_URL, Şeffaflık API dokümanından teyit edilecek"

    VERI.mkdir(parents=True, exist_ok=True)
    cikti = {
        "cekim_zamani": dt.datetime.now().isoformat(timespec="seconds"),
        "kaynak": "EPİAŞ Şeffaflık Platformu (birincil kaynak, gerçekleşen veri)",
        "ptf_aylik": ptf_ozet,
        "yekdem_gerceklesen_aylik": yekdem_ozet,
        "birim": "TL/MWh",
    }
    (VERI / "piyasa-canli.json").write_text(
        json.dumps(cikti, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    satirlar = [
        "---",
        "konu: EPİAŞ gerçekleşen PTF ve YEKDEM (canlı veri)",
        f"guncelleme: {bugun.isoformat()}",
        "kaynak: EPİAŞ Şeffaflık API (otomatik çekim — ajan/epias_veri.py)",
        "durum: yayin",
        "---",
        "",
        "# Gerçekleşen Piyasa Verileri (₺/MWh)",
        "",
        "| Ay | Ortalama PTF | Güneş saatleri (10-17) PTF | Oran |",
        "|---|---|---|---|",
    ]
    for ay, d in ptf_ozet.items():
        satirlar.append(f"| {ay} | {d['ortalama']:,.0f} | {d['gunes_saatleri_ortalama']:,.0f} | %{d['gunes_orani']*100:.0f} |")
    satirlar += ["", f"YEKDEM gerçekleşen: {yekdem_ozet}", ""]
    (VERI / "piyasa-canli.md").write_text("\n".join(satirlar), encoding="utf-8")

    print(f"Yazıldı: {VERI/'piyasa-canli.json'}")
    print(f"Yazıldı: {VERI/'piyasa-canli.md'}")
    print(json.dumps(ptf_ozet, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
