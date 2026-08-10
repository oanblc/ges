"""GES destek/kredi bekçisi — destekler.json'daki her kaydı webden doğrular.

Kullanım:
  python3 ajan/destek_takip.py        → tüm kayıtları kontrol et, JSON'u tazele

Akış (tek yazar ilkesi — destekler.json'u yalnız bu betik yazar):
  1. kb/veri/destekler.json okunur.
  2. Web aramalı Claude çağrısıyla her destek doğrulanır: hâlâ aktif mi,
     koşullar değişti mi? Ayrıca YENİ destek/kredi programı taranır.
  3. Mevcut kayıtların durum/not/sonKontrol alanları güncellenir;
     kb/veri/ ve web/data/ altına yazılır.
  4. Yeni destek adayları ve koşul değişiklikleri kb/taslak/ altına rapor
     edilir — Ozan onaylamadan listeye eklenmez (panel onay akışı ilkesi).

Cron: 45 8 * * * cd ~/Developer/gesdanismani && /usr/bin/python3 ajan/destek_takip.py >> kb/veri/destek-takip.log 2>&1
"""

import datetime
import json
import re
from pathlib import Path

import gemini

ROOT = Path(__file__).resolve().parent.parent
VERI = ROOT / "kb" / "veri" / "destekler.json"
WEB_VERI = ROOT / "web" / "data" / "destekler.json"
TASLAK = ROOT / "kb" / "taslak"

GECERLI_DURUMLAR = {"aktif", "pasif", "donemsel", "teyit-bekliyor"}


def _env_yukle() -> None:
    env = ROOT / ".env"
    if env.exists():
        import os
        for satir in env.read_text().splitlines():
            if "=" in satir and not satir.startswith("#"):
                k, _, v = satir.partition("=")
                os.environ.setdefault(k.strip(), v.strip())


def _calistir(gorev: str) -> str:
    """Google arama destekli Gemini çağrısı (eskiden Anthropic web_search)."""
    return gemini.arastir(
        "Türkiye enerji finansmanı uzmanı bir doğrulama ajanısın. gesdanismani.com destek listesi için çalışıyorsun. Kurallar: (1) Yalnız web'de teyit edebildiğini yaz; emin olamadığında durumu 'teyit-bekliyor' işaretle, ASLA uydurma. (2) Faiz oranı rakamı yazma — bankalar ilan etmez, yapı bilgisi ver. (3) Çıktın YALNIZCA istenen JSON olsun; başka metin ekleme.",
        gorev,
    )


def _json_ayikla(metin: str) -> dict:
    """Model çıktısından ilk JSON nesnesini çıkarır (kod bloğu sarmalına dayanıklı)."""
    m = re.search(r"\{.*\}", metin, re.DOTALL)
    if not m:
        raise ValueError(f"Model çıktısında JSON bulunamadı:\n{metin[:500]}")
    return json.loads(m.group(0))


def main() -> None:
    _env_yukle()
    bugun = datetime.date.today().isoformat()
    veri = json.loads(VERI.read_text(encoding="utf-8"))

    liste = "\n".join(
        f"- id={d['id']} | {d['kurum']} — {d['ad']} | mevcut durum: {d['durum']} | özet: {d['ozet']}"
        for d in veri["destekler"]
    )
    rapor = _calistir(
        "DESTEK BEKÇİSİ. Aşağıdaki Türkiye GES destek/kredi listesindeki her kaydı "
        "web üzerinden kontrol et: program hâlâ yürürlükte mi, başvuru açık mı, "
        "koşullar (limit, vade, ödemesiz dönem, hibe oranı) değişmiş mi? "
        "Ardından listede OLMAYAN yeni destek/hibe/kredi programı var mı tara "
        "(KOSGEB, TKDK, bakanlıklar, büyük bankalar, kalkınma ajansları).\n\n"
        "YALNIZ şu şemada JSON döndür:\n"
        '{"kontroller":[{"id":"...","durum":"aktif|pasif|donemsel|teyit-bekliyor",'
        '"degisiklik":"değişiklik yoksa boş string; varsa ESKİ → YENİ tek cümle",'
        '"kaynakUrl":"teyit linki"}],'
        '"yeniAdaylar":[{"ad":"...","kurum":"...","tur":"devlet|banka|leasing|esco",'
        '"kitle":["konut|isletme|tarimsal"],"ozet":"...","kaynakUrl":"..."}]}\n\n'
        f"=== MEVCUT LİSTE ===\n{liste}"
    )
    sonuc = _json_ayikla(rapor)

    kayitlar = {d["id"]: d for d in veri["destekler"]}
    degisiklikler: list[str] = []
    for k in sonuc.get("kontroller", []):
        d = kayitlar.get(k.get("id"))
        if not d:
            continue
        yeni_durum = k.get("durum", d["durum"])
        if yeni_durum in GECERLI_DURUMLAR and yeni_durum != d["durum"]:
            degisiklikler.append(f"- **{d['kurum']} — {d['ad']}**: {d['durum']} → {yeni_durum}")
            d["durum"] = yeni_durum
        if k.get("degisiklik"):
            degisiklikler.append(f"- **{d['kurum']} — {d['ad']}**: {k['degisiklik']}")
            d["not"] = k["degisiklik"]
        if k.get("kaynakUrl"):
            d["kaynakUrl"] = k["kaynakUrl"]
        d["sonKontrol"] = bugun

    veri["guncelleme"] = bugun
    metin = json.dumps(veri, ensure_ascii=False, indent=2) + "\n"
    VERI.write_text(metin, encoding="utf-8")
    WEB_VERI.write_text(metin, encoding="utf-8")

    adaylar = sonuc.get("yeniAdaylar", [])
    if adaylar or degisiklikler:
        TASLAK.mkdir(parents=True, exist_ok=True)
        satirlar = [f"# Destek bekçisi raporu — {bugun}", ""]
        if degisiklikler:
            satirlar += ["## Durum/koşul değişiklikleri (JSON'a işlendi)", *degisiklikler, ""]
        if adaylar:
            satirlar += ["## Yeni destek adayları (ONAY BEKLİYOR — listeye eklenmedi)", ""]
            for a in adaylar:
                satirlar += [
                    f"### {a.get('kurum', '?')} — {a.get('ad', '?')}",
                    f"- Tür: {a.get('tur', '?')} · Kitle: {', '.join(a.get('kitle', []))}",
                    f"- {a.get('ozet', '')}",
                    f"- Kaynak: {a.get('kaynakUrl', '—')}",
                    "",
                ]
        yol = TASLAK / f"{bugun}-destek-bekcisi.md"
        yol.write_text("\n".join(satirlar), encoding="utf-8")
        print(f"Rapor: {yol}")

    print(
        f"Yazıldı: {VERI} ve {WEB_VERI} — {len(sonuc.get('kontroller', []))} kontrol, "
        f"{len(degisiklikler)} değişiklik, {len(adaylar)} yeni aday."
    )


if __name__ == "__main__":
    main()
