"""GES Danışmanı — arkaplan araştırma/doğrulama ajanı.

Üç mod:
  python ajan/arastirma_ajani.py arastir "araştırılacak konu"
      → Web araştırması yapar, kaynak linkli raporu kb/taslak/ altına yazar.
  python ajan/arastirma_ajani.py dogrula kb/tarifeler.md
      → Mevcut bilgi tabanı dosyasındaki rakam/mevzuat bilgilerini webden
        doğrular; değişiklik varsa onay taslağını kb/taslak/ altına yazar.
  python ajan/arastirma_ajani.py tara gunluk|haftalik
      → kb/kaynaklar.md kataloğundaki EPDK/EPİAŞ/Resmî Gazete kaynaklarını
        tarar (nöbetçi modu); yeni tarife/karar/duyuru tespit ederse onay
        taslağı üretir. cron ile günlük çalıştırılmak üzere tasarlandı.

Taslaklar Ozan onaylamadan kb/ köküne (yayına) alınmaz — panel onay akışının
komut satırı karşılığıdır.
"""

import sys
import datetime
from pathlib import Path

import anthropic

ROOT = Path(__file__).resolve().parent.parent
TASLAK = ROOT / "kb" / "taslak"


def _env_yukle() -> None:
    env = ROOT / ".env"
    if env.exists():
        import os
        for satir in env.read_text().splitlines():
            if "=" in satir and not satir.startswith("#"):
                k, _, v = satir.partition("=")
                os.environ.setdefault(k.strip(), v.strip())


def _calistir(gorev: str) -> str:
    client = anthropic.Anthropic()
    messages = [{"role": "user", "content": gorev}]
    tools = [{"type": "web_search_20260209", "name": "web_search", "max_uses": 8}]

    while True:
        response = client.beta.messages.create(
            model="claude-sonnet-5",
            max_tokens=16000,
            system=(
                "Türkiye enerji piyasası uzmanı bir araştırma ajanısın. "
                "gesdanismani.com bilgi tabanı için çalışıyorsun. Kurallar: "
                "(1) Her rakama kaynak linki ve geçerlilik tarihi ekle. "
                "(2) Emin olmadığın bilgiyi 'DOĞRULANAMADI' diye işaretle, uydurma. "
                "(3) Çıktıyı markdown yaz: başlık, güncelleme tarihi, yapılandırılmış "
                "bölümler, en sonda Kaynaklar listesi. "
                "(4) Rakamları hesap motoruna aktarılabilir netlikte ver "
                "(birim, KDV dahil/hariç, geçerlilik dönemi)."
            ),
            tools=tools,
            messages=messages,
        )
        if response.stop_reason == "refusal":
            raise SystemExit("İstek güvenlik sınıflandırıcısı tarafından reddedildi.")
        if response.stop_reason == "pause_turn":
            messages = [messages[0], {"role": "assistant", "content": response.content}]
            continue
        return "".join(b.text for b in response.content if b.type == "text")


def _kaydet(ad: str, icerik: str) -> Path:
    TASLAK.mkdir(parents=True, exist_ok=True)
    tarih = datetime.date.today().isoformat()
    yol = TASLAK / f"{tarih}-{ad}.md"
    yol.write_text(icerik, encoding="utf-8")
    return yol


def main() -> None:
    _env_yukle()
    if len(sys.argv) < 3 or sys.argv[1] not in ("arastir", "dogrula", "tara"):
        print(__doc__)
        raise SystemExit(1)

    mod, hedef = sys.argv[1], sys.argv[2]
    if mod == "tara":
        katalog = (ROOT / "kb" / "kaynaklar.md").read_text(encoding="utf-8")
        mevcut = "\n\n".join(
            f"## {d.name}\n{d.read_text(encoding='utf-8')[:3000]}"
            for d in sorted((ROOT / "kb").glob("*.md"))
            if d.name not in ("README.md", "kaynaklar.md")
        )
        rapor = _calistir(
            f"NÖBETÇİ TARAMASI ({hedef}). Aşağıdaki kaynak kataloğundaki 'Takip sıklığı' "
            f"{hedef} kapsamına giren kaynakları web üzerinden kontrol et. Özellikle: "
            "EPDK'da yeni tarife tablosu/kurul kararı var mı, Resmî Gazete'de lisanssız "
            "üretim/YEK mevzuat değişikliği var mı, EPİAŞ'ta son ay PTF ve YEKDEM "
            "gerçekleşmeleri ne. Bulgularını mevcut bilgi tabanıyla karşılaştır; "
            "DEĞİŞİKLİK YOKSA kısaca 'GÜNCEL' yaz, varsa her değişiklik için "
            "ESKİ → YENİ + kaynak + etkilenen kb dosyası listele.\n\n"
            f"=== KAYNAK KATALOĞU ===\n{katalog}\n\n=== MEVCUT BİLGİ TABANI (özet) ===\n{mevcut}"
        )
        yol = _kaydet(f"nobetci-{hedef}", rapor)
        print(f"Taslak hazır (onay bekliyor): {yol}")
        return

    if mod == "arastir":
        rapor = _calistir(
            f"Şu konuyu Türkiye özelinde, güncel kaynaklarla derinlemesine araştır: {hedef}"
        )
        yol = _kaydet(hedef.lower().replace(" ", "-")[:60], rapor)
    else:
        dosya = ROOT / hedef
        rapor = _calistir(
            "Aşağıdaki bilgi tabanı dosyasındaki rakamları ve mevzuat bilgilerini "
            "webden doğrula. Değişen/eskiyen her bilgi için ESKİ → YENİ karşılaştırması "
            "ve kaynağını ver; değişiklik yoksa 'GÜNCEL' yaz.\n\n---\n\n"
            + dosya.read_text(encoding="utf-8")
        )
        yol = _kaydet(f"dogrulama-{dosya.stem}", rapor)

    print(f"Taslak hazır (onay bekliyor): {yol}")


if __name__ == "__main__":
    main()
