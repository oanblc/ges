# NÖBETÇİ TARAMASI (Günlük Piyasa ve Mevzuat Kontrolü)

**Rapor Tarihi:** 17 Ağustos 2026  
**Durum:** Kısmi Güncelleme Gerekli (Piyasa Verileri)  

11 Ağustos 2026 tarihli son kapsamlı güncellemeden bugüne kadar yapılan rutin web taraması ve birincil kaynak kontrolleri (EPDK, EPİAŞ, Resmî Gazete) sonuçları aşağıdadır.

---

### 1. EPDK - Tarife ve Kurul Kararları
*   **Elektrik Faturalarına Esas Tarife Tabloları:** **GÜNCEL**  
    *   4 Nisan 2026 tarihli tarife tablosu halen yürürlüktedir. 1 Temmuz çeyreklik döneminde birim bedellerde (enerji ve dağıtım) değişiklik yapılmadığı teyit edilmiştir. Bir sonraki tarife dönemi 1 Ekim 2026'dır.
    *   **Etkilenen Dosya:** `tarifeler.md` (Değişiklik yok).
*   **Kurul Kararları:** **GÜNCEL**  
    *   11-17 Ağustos 2026 tarihleri arasında lisanssız üretimi veya mahsuplaşma rejimini etkileyen yeni bir kurul kararı yayımlanmamıştır. En son kritik karar 14718 sayılı YEKDEM tahmin revizyonudur.
*   **Duyurular:** **GÜNCEL**  
    *   Sektörü etkileyen (serbest tüketici limiti vb.) yeni bir duyuru tespit edilmemiştir.

### 2. Resmî Gazete - Mevzuat Taraması
*   **Lisanssız Üretim / YEK / Enerji:** **GÜNCEL**  
    *   Son 7 gün içerisinde 6446 sayılı Kanun veya Lisanssız Elektrik Üretim Yönetmeliği üzerinde bir değişiklik yayımlanmamıştır.
    *   **Etkilenen Dosya:** `mahsuplasma.md`, `surec.md` (Değişiklik yok).

### 3. EPİAŞ - Piyasa Gerçekleşmeleri (Temmuz 2026 Kesinleşen)
*   **PTF (Piyasa Takas Fiyatı):** **ESKİ → YENİ**  
    *   **Eski:** 1.645,00 ₺/MWh (Ocak-Mayıs ortalaması)  
    *   **Yeni:** **2.699,61 ₺/MWh** (Temmuz 2026 Aylık Aritmetik Ortalama)  
    *   **Kaynak:** [EPİAŞ Şeffaflık Platformu - PTF Özet](https://seffaflik.epias.com.tr) (17.08.2026)  
    *   **Etkilenen Dosya:** `piyasa-canli.json`, `piyasa-mahsuplasma.md`
*   **YEKDEM Gerçekleşen Birim Maliyeti:** **ESKİ → YENİ**  
    *   **Eski:** 423,99 ₺/MWh (14718 sayılı Karar Temmuz Tahmini)  
    *   **Yeni:** **431,12 ₺/MWh** (Temmuz 2026 Gerçekleşen/Uzlaştırma Birim Maliyeti)  
    *   **Birim:** ₺/MWh (KDV Hariç)  
    *   **Kaynak:** [EPİAŞ Şeffaflık Platformu - YEKDEM Birim Maliyeti](https://seffaflik.epias.com.tr) (17.08.2026)  
    *   **Etkilenen Dosya:** `piyasa-canli.json`, `fatura-analiz-protokolu.md`

### 4. Diğer Kurumlar (TEDAŞ, GİB, Bakanlık)
*   **TEDAŞ:** Proje onay süreçleri ve birim fiyat dosyasında değişiklik yok. **GÜNCEL**  
*   **GİB:** KDV oranları (Mesken %10, Ticari %20) ve GVK md.9 muafiyet sınırında (50 kW) değişiklik yok. **GÜNCEL**

---

### Kaynaklar
1.  **EPDK Tarife Tabloları:** [epdk.gov.tr/Detay/Icerik/3-1327](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 17.08.2026)
2.  **EPİAŞ Şeffaflık Platformu:** [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr) (Temmuz 2026 Kesinleşen Veriler, Erişim: 17.08.2026)
3.  **Resmî Gazete:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (11-17 Ağustos 2026 sayıları tarandı)
4.  **EPDK Kurul Kararları:** [epdk.gov.tr/Detay/Icerik/3-0-1](https://www.epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari) (Erişim: 17.08.2026)

> **Not:** Hesap motoru için Temmuz 2026 mahsuplaşma birim fiyatı hesaplanırken, gerçekleşen **431,12 ₺/MWh** YEKDEM maliyeti kullanılmalıdır. Önceki tahmin (423,99) ile gerçekleşen arasındaki +7,13 ₺/MWh fark, ikili anlaşmalı tüketicilerin faturalarına "YEKDEM Farkı" olarak yansıyacaktır.