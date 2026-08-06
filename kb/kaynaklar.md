---
konu: Birincil kaynak kataloğu — ajanın "adı gibi bileceği" resmi kaynaklar
guncelleme: 2026-08-06
durum: yayin
---

# Birincil Kaynak Kataloğu

Arkaplan ajanı bu katalogdaki kaynakları düzenli tarar; sitedeki her bilgi
buradaki birincil kaynaklara dayandırılır. İkincil kaynaklar (haber, blog)
yalnızca birincil kaynağa ulaşılamadığında ve işaretlenerek kullanılır.

## 1. EPDK — epdk.gov.tr

| Kaynak | URL | Takip sıklığı | Beslediği kb dosyası |
|---|---|---|---|
| Elektrik faturalarına esas tarife tabloları | epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari | Ocak/Nisan/Temmuz/Ekim başı + haftalık kontrol | tarifeler.md |
| Kurul kararları | epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari | Haftalık | tarifeler.md, mahsuplasma.md |
| Lisanssız elektrik üretimi mevzuatı | epdk.gov.tr (Lisanssız Elektrik Üretim Yönetmeliği + değişiklikleri) | Haftalık | mahsuplasma.md, surec.md |
| YEKDEM sayfaları (öngörü/gerçekleşen birim maliyet) | epdk.gov.tr YEKDEM içerikleri | Aylık | piyasa.md |
| Serbest tüketici limiti kararları | epdk.gov.tr/Detay/Icerik/16/serbest-tuketici | Yılbaşı + çeyreklik | tarifeler.md |
| Duyurular | epdk.gov.tr duyuru akışı | Günlük (nöbetçi) | tümü |

Not: EPDK sayfaları JavaScript ile yükleniyor; tablo PDF/XLSX'leri
`_PortalAdmin_Uploads_Content_FastAccess_*.xlsx` kalıbıyla iniyor.
İndirilen her resmi dosya `kb/kaynak-dosyalar/` altına tarihli adla arşivlenir.

## 2. EPİAŞ — epias.com.tr / seffaflik.epias.com.tr

| Kaynak | İçerik | Takip sıklığı | Beslediği kb dosyası |
|---|---|---|---|
| Şeffaflık: Gün Öncesi Piyasası PTF | Saatlik/aylık PTF (₺/MWh) | Aylık özet + güneş saatleri ortalaması | piyasa.md |
| Şeffaflık: YEKDEM birim maliyeti | Tahmini ve gerçekleşen YEKDEM | Aylık | piyasa.md |
| Şeffaflık: YEK-G | Yenilenebilir enerji garanti belgeleri | Çeyreklik | piyasa.md |
| EPİAŞ duyuruları | Piyasa işleyiş değişiklikleri | Haftalık | piyasa.md |

Not: Şeffaflık Platformu API'si (kayıtlı kullanıcı + TGT kimlik doğrulama ile)
ücretsiz; PTF/YEKDEM verisini otomatik çekmek için EPİAŞ kayıt hesabı açılacak
→ ajan bu veriyi elle değil API'den alacak (yol haritasında).

## 3. Diğer resmi kaynaklar

| Kaynak | İçerik | Takip |
|---|---|---|
| Resmî Gazete (resmigazete.gov.tr) | Yönetmelik/CB kararları (ör. 2 Nisan 2026 saatlik mahsup, 11415 sayılı Karar) | Günlük (nöbetçi, "lisanssız/elektrik/YEK" anahtar kelimeleri) |
| TEDAŞ (tedas.gov.tr) | Proje onay süreçleri, duyurular | Haftalık |
| GİB (gib.gov.tr) | GVK md.9 muafiyet, KDV oranları | Aylık |
| Enerji Bakanlığı / GEPA | Güneş enerjisi potansiyel atlası (il verimleri) | Yıllık |

## Kural
- Her kb güncellemesinde kaynak URL + erişim tarihi zorunlu.
- Birincil kaynak ile ikincil kaynak çelişirse birincil kazanır; çelişki
  "ÇELİŞKİ KAYDI" bölümüne yazılır ve Ozan onayına sunulur.
