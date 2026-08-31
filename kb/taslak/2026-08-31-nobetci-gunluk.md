# GÜNLÜK NÖBETÇİ TARAMASI RAPORU

**Güncelleme Tarihi:** 31 Ağustos 2026, 11:17 UTC
**Tarama Kapsamı:** EPDK, EPİAŞ, Resmî Gazete, TEDAŞ
**Durum:** Mevcut bilgi tabanında kritik güncellemeler tespit edildi.

---

## 1. EPDK — Tarife ve Kurul Kararları

### 1.1. Elektrik Faturalarına Esas Tarifeler
*   **Durum:** **GÜNCEL**
*   **Analiz:** 1 Temmuz 2026'da yayımlanan tarife tablosu yürürlüktedir. 1 Ekim 2026 dönemine kadar yeni bir katsayı veya birim fiyat değişikliği yayımlanmamıştır.
*   **Referans:** [EPDK Tarife Tabloları](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Geçerlilik: 31.08.2026)

### 1.2. Kurul Kararları (Yeni)
*   **Değişiklik:** 27 Ağustos 2026 tarihli ve 14892 sayılı Kurul Kararı ile "Depolamalı Lisanssız Üretim Tesislerinde AC Kaplin Bağlantı Standartları" güncellendi.
*   **ESKİ:** Teknik kısıtlar nedeniyle AC kaplin sistemlerde inverter verimlilik kaybı %5 toleransla kabul ediliyordu.
*   **YENİ:** AC kaplin sistemlerde batarya evirici (battery inverter) verimlilik standardı IEC 61683 uyarınca minimum %96,5 olarak belirlendi.
*   **Kaynak:** [EPDK Kurul Kararları](https://www.epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari) (Karar No: 14892, 27.08.2026)
*   **Etkilenen Dosya:** `teknik-depolama.md` (§2 Mimari bölümü).

---

## 2. EPİAŞ — Piyasa Gerçekleşmeleri (Ağustos Özet)

### 2.1. PTF (Piyasa Takas Fiyatı) Gerçekleşmeleri
Ağustos 2026 ayının ilk 30 gün verilerine göre PTF değerlerinde yaz sıcaklıkları ve klima yükü nedeniyle Temmuz'a göre artış gözlemlenmiştir.

| Parametre | Temmuz 2026 (Gerçekleşen) | Ağustos 2026 (Tahmini/Öncü) | Birim |
|---|---|---|---|
| Aylık Aritmetik Ort. PTF | 2.840,15 | 2.965,40 | ₺/MWh (KDV hariç) |
| Güneş Saatleri Ort. (10:00-16:00) | 1.420,08 | 1.385,20 | ₺/MWh (KDV hariç) |

*   **ESKİ:** `piyasa-mahsuplasma.md` içindeki "2026 Oca–May: 1.645 ₺/MWh" verisi.
*   **YENİ:** "2026 Oca–Ağu Ortalaması: 1.942,30 ₺/MWh" (Güncel ağırlıklı ortalama).
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - PTF](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf.xhtml) (Veri Tarihi: 30.08.2026)
*   **Etkilenen Dosya:** `piyasa-mahsuplasma.md`, `veri/piyasa-canli.json`

### 2.2. YEKDEM Birim Maliyeti
*   **Temmuz 2026 Gerçekleşen:** 412,50 ₺/MWh (Öngörülen 423,99 idi; -%2,7 sapma).
*   **Ağustos 2026 Tahmini:** 448,20 ₺/MWh.
*   **Kaynak:** [EPİAŞ YEKDEM Birim Maliyeti](https://seffaflik.epias.com.tr/transparency/yenilenebilir-enerji-destek-mekanizmasi/yekdem-birim-maliyeti.xhtml) (30.08.2026)
*   **Etkilenen Dosya:** `yekdem-kararlari.md`

---

## 3. Resmî Gazete — Mevzuat Takibi

### 3.1. Lisanssız Üretim Yönetmeliği Değişikliği
*   **Bulgu:** **DEĞİŞİKLİK YOK.** 24-31 Ağustos 2026 tarihli Resmî Gazete sayılarında "lisanssız", "elektrik", "YEK" anahtar kelimelerinde GES piyasasını doğrudan etkileyen bir yönetmelik değişikliği tespit edilmedi.
*   **Durum:** **GÜNCEL**
*   **Kaynak:** [Resmî Gazete Arşivi](https://www.resmigazete.gov.tr/) (Ağustos 2026 son hafta taraması).

---

## 4. Dosya Güncelleme Talimatları (Editör Notları)

| Dosya | Yapılacak İşlem | Değişiklik Özeti |
|---|---|---|
| `piyasa-mahsuplasma.md` | GÜNCELLE | Ağustos PTF verisi (2.965,40 ₺/MWh) eklenecek. |
| `teknik-depolama.md` | GÜNCELLE | Karar 14892 uyarınca AC kaplin verimlilik şartı (%96,5) eklenecek. |
| `yekdem-kararlari.md` | GÜNCELLE | Temmuz ayı gerçekleşen (412,50 ₺/MWh) "Gerçekleşen" sütununa işlenecek. |
| `tarifeler.md` | GÜNCEL | Herhangi bir işlem gerekmiyor. |

---

## Kaynaklar ve Geçerlilik
1.  **EPDK Kurul Kararı (14892):** 27.08.2026 tarihli karar. Birim: Verimlilik %, Geçerlilik: Derhal.
2.  **EPİAŞ PTF Verisi:** seffaflik.epias.com.tr, 30.08.2026 çekimli. Birim: ₺/MWh, KDV Hariç.
3.  **EPİAŞ YEKDEM Verisi:** seffaflik.epias.com.tr, 30.08.2026 çekimli. Birim: ₺/MWh, KDV Hariç.
4.  **Resmî Gazete:** www.resmigazete.gov.tr, 31.08.2026 tarihli nöbetçi taraması.

> **DOĞRULANAMADI:** TEDAŞ 2026 Eylül ayı birim fiyatları (proje onay bedelleri) henüz yayımlanmamıştır; mevcut 2026 başı listesi geçerliliğini korumaktadır.