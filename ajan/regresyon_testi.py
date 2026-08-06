"""Asistan regresyon testi — SSS örneklemini toplu koşturur, denetçi kararlarıyla raporlar.

Kullanım: python3 ajan/regresyon_testi.py
Çıktı:   kb/testler/YYYY-MM-DD-regresyon.md
"""

import datetime
import time
from pathlib import Path

from asistan import _denetle, _istemci, sohbet

ROOT = Path(__file__).resolve().parent.parent

# Kategori kapsaması: mit / mevzuat / fatura / fiyat-eksik bilgi / teknik / apartman / depolama / dolandırıcılık
SORULAR = [
    ("mit", "kışın güneş paneli çalışmıyormuş, doğru mu? bizim buralar soğuk olur"),
    ("mevzuat", "tarlama güneş paneli kurup elektriği satmak istiyorum, izin alabilir miyim?"),
    ("fatura", "panel taktırdım ama hala fatura geliyor, kandırıldım mı?"),
    ("fiyat-eksik", "10 kW sistem kaç paraya kurulur?"),
    ("teknik", "inverterim öğlen saatlerinde kendini kapatıyor, arızalı mı?"),
    ("apartman", "kiracıyım, oturduğum evin çatısına panel taktırabilir miyim?"),
    ("depolama", "elektrik kesilince panellerim evi beslemeye devam eder mi?"),
    ("dolandiricilik", "bir firma güneş tarlasından aylık 2000 TL kira garantisi veriyor, yatırayım mı?"),
]


def main() -> None:
    istemci = _istemci()
    satirlar = [
        f"# Asistan Regresyon Raporu — {datetime.date.today().isoformat()}",
        "",
        "| # | Kategori | Denetçi | Süre | Not |",
        "|---|---|---|---|---|",
    ]
    detaylar = []
    for i, (kategori, soru) in enumerate(SORULAR, 1):
        t0 = time.time()
        try:
            yanit = sohbet([{"role": "user", "content": soru}], istemci)
            metin = "".join(b.text for b in yanit.content if b.type == "text")
            karar = _denetle(soru, metin, istemci)
            durum = "ONAY ✓" if karar.startswith("ONAY") else "SORUN ✗"
            not_ = "" if durum.startswith("ONAY") else karar.splitlines()[1][:80]
        except Exception as hata:  # tek soru düşerse rapor devam etsin
            metin, durum, not_ = f"HATA: {hata}", "HATA ✗", str(hata)[:80]
        sure = f"{time.time() - t0:.0f} sn"
        satirlar.append(f"| {i} | {kategori} | {durum} | {sure} | {not_} |")
        detaylar += [f"\n## {i}. [{kategori}] {soru}\n", metin, ""]
        print(f"[{i}/{len(SORULAR)}] {kategori}: {durum} ({sure})")

    hedef = ROOT / "kb" / "testler"
    hedef.mkdir(parents=True, exist_ok=True)
    dosya = hedef / f"{datetime.date.today().isoformat()}-regresyon.md"
    dosya.write_text("\n".join(satirlar + ["", "---"] + detaylar), encoding="utf-8")
    print(f"\nRapor: {dosya}")


if __name__ == "__main__":
    main()
