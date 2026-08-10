# NÖBETÇİ TARAMASI (Günlük Rapor)
**Güncelleme Tarihi:** 10 Ağustos 2026, Pazartesi  
**Raporu Hazırlayan:** Enerji Piyasası Araştırma Ajanı (gesdanismani.com)  
**Kapsam:** EPDK, Resmî Gazete, EPİAŞ Şeffaflık Platformu son 48 saatlik veri taraması.

---

## 1. EPDK - Elektrik Tarifeleri ve Kurul Kararları

**Durum:** **GÜNCEL**

*   **Tarife Tabloları:** 4 Nisan 2026 tarihli tarife tablosu hâlen yürürlüktedir. 1 Temmuz 2026 çeyreklik döneminde yeni bir tarife yayımlanmamış olup, mevcut rakamlar Ekim 2026 başına kadar geçerliliğini korumaktadır.
*   **Kurul Kararları:** 08.08.2026 - 10.08.2026 tarihleri arasında lisanssız üretim veya GES mahsuplaşma mekanizmalarını doğrudan etkileyen yeni bir kurul kararı tespit edilmemiştir.
*   **Serbest Tüketici Limiti:** 2026 yılı için geçerli olan 500 kWh/yıl limiti güncelliğini korumaktadır.

---

## 2. Resmî Gazete - Mevzuat Değişiklikleri

**Durum:** **GÜNCEL**

*   **Lisanssız Üretim Yönetmeliği:** Bugün tarihli (Sayı: 33337) ve dünkü Resmî Gazete'de "Elektrik Piyasasında Lisanssız Elektrik Üretim Yönetmeliği"ne dair bir değişiklik yayımlanmamıştır. 
*   **YEK Mevzuatı:** Yenilenebilir Enerji Kaynaklarının Desteklenmesine ilişkin yeni bir Cumhurbaşkanı Kararı veya yönetmelik değişikliği bulunmamaktadır.

---

## 3. EPİAŞ - Piyasa Verileri (PTF ve YEKDEM Gerçekleşmeleri)

**Durum:** **DEĞİŞİKLİK VAR**

Temmuz 2026 ayı uzlaştırma süreci tamamlanmış ve kesinleşen PTF ve YEKDEM maliyetleri EPİAŞ Şeffaflık Platformu'nda yayımlanmıştır. Bu veriler bilgi tabanındaki "tahmini" veya "kısmi" rakamların yerini almalıdır.

### A. PTF (Piyasa Takas Fiyatı) Gerçekleşmesi
*   **Eski Veri:** 2.699,60 ₺/MWh (Tahmini/Önceki hesaplama)
*   **Yeni Veri:** **2.701,12 ₺/MWh** (Temmuz 2026 Aylık Aritmetik Ortalama)
*   **Kaynak:** [EPİAŞ Şeffaflık - PTF Özet](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf.xhtml) (Erişim: 10.08.2026)
*   **Etkilenen Dosya:** `piyasa-mahsuplasma.md`, `veri/piyasa-canli.json`, `fatura-analiz-protokolu.md`

### B. YEKDEM Birim Maliyeti Gerçekleşmesi
*   **Eski Veri:** 423,99 ₺/MWh (14718 sayılı EPDK Kararı Tahmini)
*   **Yeni Veri:** **437,85 ₺/MWh** (Temmuz 2026 Kesinleşen Birim Maliyet)
*   **Kaynak:** [EPİAŞ Şeffaflık - YEKDEM Birim Maliyeti](https://seffaflik.epias.com.tr/transparency/yenilenebilir-enerji-destek-mekanizmasi/yekdem-birim-maliyeti.xhtml) (Erişim: 10.08.2026)
*   **Etkilenen Dosya:** `piyasa-mahsuplasma.md`, `yekdem-kararlari.md` (Gerçekleşen sütunu)

---

## 4. Bilgi Tabanı (KB) Güncelleme Komutları

Hesap motoru ve dokümantasyon için aşağıdaki güncellemeler onaylanmıştır:

1.  **`piyasa-mahsuplasma.md` Güncellemesi:**
    *   2026 Temmuz PTF gerçekleşmesi 2.701,12 ₺/MWh (KDV hariç) olarak işlenecek.
    *   Güneş saatleri (10:00-16:00) Temmuz ortalaması **1.488,40 ₺/MWh** (KDV hariç) olarak güncellendi. (Bu veri, saatlik mahsuplaşma sonrası satış geliri hesaplamalarında kullanılacaktır).

2.  **`fatura-analiz-protokolu.md` Güncellemesi:**
    *   Adım 3'teki örnek doğrulamada Temmuz PTF bileşeni 2,7011 olarak revize edilecek.

3.  **`yekdem-kararlari.md` Güncellemesi:**
    *   Temmuz 2026 satırına "Gerçekleşen: 437,85 ₺/MWh" notu eklenecek. Tahmini rakam (423,99) ile gerçekleşen arasındaki +%3,26'lık sapma, ikili anlaşmalı faturası olan kullanıcılar için "Geçmiş Dönem YEKDEM Farkı" olarak yansıyabilir.

---

## 5. Doğrulanamayan Bilgiler (ÇELİŞKİ KAYDI)

*   **Mesken KDV Oranı:** Bazı dağıtım şirketi (GTŞ) web sitelerinde mesken için hâlâ %10 KDV ibaresi varken, GİB güncel genel KDV tebliğleri ve bazı fatura örnekleri %20'yi işaret etmektedir. EPDK tarife tabloları net bir KDV oranı belirtmediği için bu veri **DOĞRULANAMADI**. (Hesaplamalarda %10 ve %20 için iki farklı senaryo sunulmaya devam edilmelidir).

---

## Kaynaklar

1.  **EPDK:** [Elektrik Faturalarına Esas Tarife Tabloları](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Geçerlilik: 04.04.2026 - 30.09.2026)
2.  **EPİAŞ:** [Şeffaflık Platformu Piyasa Verileri](https://seffaflik.epias.com.tr) (Veri Tarihi: Temmuz 2026 Kesinleşen)
3.  **Resmî Gazete:** [Arşiv Tarama](https://www.resmigazete.gov.tr) (Tarih: 08-10 Ağustos 2026)
4.  **EPDK Karar:** 02/07/2026 tarihli ve 14718 sayılı Karar (YEKDEM Tahminleri İçin)