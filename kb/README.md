# GES Danışmanı — Bilgi Tabanı (kb/)

Sitedeki asistanın (RAG) ve hesap motorunun **tek doğruluk kaynağı** bu klasördür.
Sitede gösterilen hiçbir rakam koda gömülmez; hepsi buradaki dosyalardan okunur.

## Yapı

| Dosya | İçerik | Besleyeceği yer |
|---|---|---|
| `tarifeler.md` | EPDK perakende tarifeleri (mesken kademeli, ticarethane, sanayi), vergiler, SKTT | Hesap motoru: tasarruf edilen kWh değeri |
| `piyasa.md` | PTF seviyeleri, ikili anlaşma fiyatlaması, YEKDEM | Hesap motoru: işletme modu + fazla üretim geliri |
| `mahsuplasma.md` | Saatlik mahsuplaşma kuralları, mesken istisnası, öz tüketim metodolojisi | Hesap motoru + asistan cevapları |
| `maliyetler.md` | Anahtar teslim ₺/kW (ölçek kademeleri), batarya ₺/kWh, il verim tablosu | Hesap motoru: yatırım tarafı |
| `surec.md` | 7 aşamalı başvuru-kurulum süreci, süreler, belgeler | Asistan + süreç rehberi sayfası |
| `tesvikler.md` | KOSGEB, IPARD/TKDK, vergi muafiyetleri | Destek uygunluk aracı |

## Akış

1. **Taslak:** Araştırma ajanı (`ajan/arastirma_ajani.py`) çıktıyı `kb/taslak/` altına yazar.
2. **Onay:** Ozan taslağı inceler; onaylanan içerik ilgili kök dosyaya işlenir.
3. **Yayın:** Site build'i kb dosyalarını okur; her dosyanın başındaki
   `guncelleme: YYYY-MM-DD` tarihi sitede "Mevzuat güncelliği" rozetini besler.

Kural: kaynağı ve geçerlilik tarihi olmayan rakam kb'ye giremez.
