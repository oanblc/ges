"""Sayfa içerik denetçisi — sitedeki her sayfanın görünen bilgisini bilgi tabanıyla denetler.

Kullanım:
  python3 ajan/sayfa_denetim.py            → tüm sayfaları denetle, denetim.json'u tazele

Akış (tek yazar ilkesi — denetim.json'u yalnız bu betik yazar):
  1. SITE_URL (varsayılan http://127.0.0.1:3000) üzerinden her sayfanın HTML'i çekilir,
     görünür metne indirgenir.
  2. Tek Claude çağrısında sayfa metinleri kb/*.md (tek doğruluk kaynağı) ile
     karşılaştırılır; gerekirse sınırlı web aramasıyla güncellik kontrolü yapılır.
  3. Sayfa başına durum üretilir: dogrulandi | uyari. Sonuç kb/veri/denetim.json ve
     web/data/denetim.json'a yazılır — sitedeki "bilgiler denetlendi" rozeti buradan beslenir.
  4. Uyarılar kb/taslak/ altına raporlanır; düzeltme Ozan onayıyla yapılır.

Cron: 20 9 * * * cd ~/Developer/gesdanismani && /usr/bin/python3 ajan/sayfa_denetim.py >> kb/veri/denetim.log 2>&1
"""

from __future__ import annotations

import datetime
import json
import os
import re
import urllib.request
from pathlib import Path

import anthropic

ROOT = Path(__file__).resolve().parent.parent
VERI = ROOT / "kb" / "veri" / "denetim.json"
WEB_VERI = ROOT / "web" / "data" / "denetim.json"
TASLAK = ROOT / "kb" / "taslak"

SAYFALAR = [
    "/", "/asistan", "/surec", "/hesaplama", "/destekler",
    "/rehber", "/kurulum-sonrasi", "/blog", "/blog/saatlik-mahsuplasma-rehberi",
]


def _env_yukle() -> None:
    env = ROOT / ".env"
    if env.exists():
        for satir in env.read_text().splitlines():
            if "=" in satir and not satir.startswith("#"):
                k, _, v = satir.partition("=")
                os.environ.setdefault(k.strip(), v.strip())


def _metin_indirge(html: str) -> str:
    html = re.sub(r"<(script|style|svg)[^>]*>.*?</\1>", " ", html, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r"<[^>]+>", " ", html)
    html = html.replace("&amp;", "&").replace("&quot;", '"').replace("&#x27;", "'")
    return re.sub(r"\s+", " ", html).strip()[:9000]


def _sayfa_cek(taban: str, yol: str) -> str | None:
    try:
        with urllib.request.urlopen(taban + yol, timeout=20) as r:
            return _metin_indirge(r.read().decode("utf-8", "ignore"))
    except Exception as hata:
        print(f"UYARI: {yol} çekilemedi ({hata})")
        return None


def _kb_ozeti() -> str:
    parcalar = []
    for d in sorted((ROOT / "kb").glob("*.md")):
        if d.name in ("README.md", "INDEKS.md", "kaynaklar.md"):
            continue
        parcalar.append(f"## {d.name}\n{d.read_text(encoding='utf-8')[:3000]}")
    return "\n\n".join(parcalar)


def _calistir(gorev: str) -> str:
    client = anthropic.Anthropic()
    messages = [{"role": "user", "content": gorev}]
    tools = [{"type": "web_search_20260209", "name": "web_search", "max_uses": 6}]

    while True:
        response = client.beta.messages.create(
            model="claude-opus-5",
            max_tokens=16000,
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",
            system=(
                "gesdanismani.com için içerik denetçisisin. Görev: sayfalardaki görünür "
                "bilgileri (rakam, tarih, mevzuat kuralı, süreç bilgisi) bilgi tabanıyla "
                "karşılaştırmak. Kurallar: (1) Bilgi tabanı tek doğruluk kaynağıdır; sayfa "
                "ondan sapıyorsa UYARI ver. (2) Zamana bağlı bilgilerde (tarife tarihi, "
                "mevzuat) şüphe varsa web aramasıyla kontrol et. (3) Üslup/pazarlama metnine "
                "karışma; yalnız OLGUSAL hataları raporla. (4) Emin olmadığında uyarı verme "
                "— yanlış alarm denetimin değerini düşürür. (5) Çıktın YALNIZCA istenen "
                "JSON olsun."
            ),
            tools=tools,
            messages=messages,
        )
        if response.stop_reason == "refusal":
            raise SystemExit("İstek reddedildi.")
        if response.stop_reason == "pause_turn":
            messages = [messages[0], {"role": "assistant", "content": response.content}]
            continue
        return "".join(b.text for b in response.content if b.type == "text")


def _json_ayikla(metin: str) -> dict:
    m = re.search(r"\{.*\}", metin, re.DOTALL)
    if not m:
        raise ValueError(f"Model çıktısında JSON yok:\n{metin[:500]}")
    return json.loads(m.group(0))


def main() -> None:
    _env_yukle()
    taban = os.environ.get("SITE_URL", "http://127.0.0.1:3000")
    bugun = datetime.date.today().isoformat()

    sayfa_metinleri = {}
    for yol in SAYFALAR:
        metin = _sayfa_cek(taban, yol)
        if metin:
            sayfa_metinleri[yol] = metin
    if not sayfa_metinleri:
        raise SystemExit(f"Hiçbir sayfa çekilemedi ({taban}) — site çalışmıyor olabilir.")

    govde = "\n\n".join(f"=== SAYFA {yol} ===\n{m}" for yol, m in sayfa_metinleri.items())
    rapor = _calistir(
        "SAYFA DENETİMİ. Aşağıdaki sayfa metinlerindeki her olgusal bilgiyi (rakamlar, "
        "tarihler, tarife/mevzuat kuralları, süreç ve süre bilgileri, destek koşulları) "
        "bilgi tabanıyla karşılaştır. Her sayfa için karar ver:\n"
        '- "dogrulandi": olgusal çelişki yok\n'
        '- "uyari": en az bir olgusal sapma/eskimiş bilgi var (bulgulara ESKİ → DOĞRU yaz)\n\n'
        "YALNIZ şu şemada JSON döndür:\n"
        '{"sayfalar":[{"yol":"/...","durum":"dogrulandi|uyari","bulgular":["..."]}]}\n\n'
        f"=== BİLGİ TABANI ===\n{_kb_ozeti()}\n\n{govde}"
    )
    sonuc = _json_ayikla(rapor)

    kararlar = {s.get("yol"): s for s in sonuc.get("sayfalar", [])}
    cikti = {
        "guncelleme": bugun,
        "kaynak": "ajan/sayfa_denetim.py — sayfa içeriği bilgi tabanıyla günlük karşılaştırılır",
        "sayfalar": [],
    }
    uyarilar: list[str] = []
    for yol in SAYFALAR:
        k = kararlar.get(yol)
        if yol not in sayfa_metinleri or not k:
            cikti["sayfalar"].append({"yol": yol, "durum": "bekliyor", "sonKontrol": None, "bulgular": []})
            continue
        durum = k.get("durum") if k.get("durum") in ("dogrulandi", "uyari") else "uyari"
        bulgular = [b for b in k.get("bulgular", []) if isinstance(b, str)]
        cikti["sayfalar"].append(
            {"yol": yol, "durum": durum, "sonKontrol": bugun, "bulgular": bulgular}
        )
        if durum == "uyari":
            uyarilar.append(f"### {yol}\n" + "\n".join(f"- {b}" for b in bulgular))

    metin = json.dumps(cikti, ensure_ascii=False, indent=2) + "\n"
    VERI.write_text(metin, encoding="utf-8")
    WEB_VERI.write_text(metin, encoding="utf-8")

    if uyarilar:
        TASLAK.mkdir(parents=True, exist_ok=True)
        yol = TASLAK / f"{bugun}-sayfa-denetimi.md"
        yol.write_text(
            f"# Sayfa denetimi uyarıları — {bugun}\n\n" + "\n\n".join(uyarilar) + "\n",
            encoding="utf-8",
        )
        print(f"Rapor: {yol}")

    dogru = sum(1 for s in cikti["sayfalar"] if s["durum"] == "dogrulandi")
    print(f"Yazıldı: {VERI} — {len(sayfa_metinleri)} sayfa denetlendi, "
          f"{dogru} doğrulandı, {len(uyarilar)} uyarı.")


if __name__ == "__main__":
    main()
