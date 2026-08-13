# GÜNLÜK NÖBETÇİ TARAMASI - 13 AĞUSTOS 2026

**Ajan:** gesdanismani.com Araştırma Robotu  
**Tarama Kapsamı:** EPDK, EPİAŞ Şeffaflık, Resmî Gazete  
**Durum:** 2 Değişiklik Tespit Edildi, Diğerleri Güncel.

---

### 1. EPDK (Enerji Piyasası Düzenleme Kurumu) Taraması
*   **Tarife Tabloları:** 4 Nisan 2026 tarihli tablolar geçerliliğini korumaktadır. 1 Temmuz 2026 ara döneminde yeni bir genel tarife değişikliği yayımlanmamıştır.
*   **Kurul Kararları:** 7-12 Ağustos 2026 tarihleri arasında Lisanssız Üretim Yönetmeliği'ni veya GES mahsuplaşma kurallarını değiştiren yeni bir karar yayımlanmamıştır.
*   **Duyurular:** Lisanssız üretim süreçlerine ilişkin yeni bir idari duyuru bulunmamaktadır.
*   **KARAR:** **GÜNCEL** (Mevcut `tarifeler.md` ve `surec.md` dosyaları geçerli).

---

### 2. RESMÎ GAZETE TARAMASI
*   **Lisanssız Üretim/YEK Mevzuatı:** Son 24 saat içinde 6446 sayılı kanun veya bağlı yönetmeliklerde (5.1.h, saatlik mahsup vb.) bir değişiklik yayımlanmamıştır.
*   **KARAR:** **GÜNCEL** (Mevcut `piyasa-mahsuplasma.md` ve `ozel-durumlar.md` geçerli).

---

### 3. EPİAŞ ŞEFFAFLIK PLATFORMU VE PİYASA GERÇEKLEŞMELERİ
*   **Temmuz 2026 PTF (Ağırlıklı Ortalama):** Temmuz ayı uzlaştırma dönemi verileri kesinleşmiştir. Bilgi tabanındaki "tahmini/yaklaşık" değer, resmi gerçekleşen değer ile güncellenmelidir.
*   **Temmuz 2026 YEKDEM Birim Maliyeti:** EPDK öngörüsü olan 423,99 ₺/MWh yerine, EPİAŞ tarafından Temmuz ayı gerçekleşen birim maliyeti yayımlanmıştır.

#### ⚡ DEĞİŞİKLİK KAYDI (Piyasa Verileri)

**1. Temmuz 2026 PTF Ortalaması**
*   **ESKİ:** ~2.700,00 ₺/MWh (Tahmini)
*   **YENİ:** 2.704,18 ₺/MWh (Gerçekleşen / KDV Hariç)
*   **Kaynak:** [EPİAŞ Şeffaflık - PTF Verileri](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf.xhtml) (Erişim: 13.08.2026)
*   **Etkilenen Dosya:** `piyasa-mahsuplasma.md` (§1), `fatura-analiz-protokolu.md` (Adım 3 - Örnek Çapraz Doğrulama).

**2. Temmuz 2026 YEKDEM Gerçekleşen Birim Maliyeti**
*   **ESKİ:** 423,99 ₺/MWh (Öngörü - Karar 14718)
*   **YENİ:** 431,12 ₺/MWh (Gerçekleşen / KDV Hariç)
*   **Kaynak:** [EPİAŞ Şeffaflık - YEKDEM Birim Maliyetleri](https://seffaflik.epias.com.tr/transparency/yekdem/birim-maliyetleri.xhtml) (Erişim: 13.08.2026)
*   **Etkilenen Dosya:** `yekdem-kararlari.md` (§2), `piyasa-mahsuplasma.md` (§2).

---

### 4. DİĞER RESMİ KAYNAKLAR (TEDAŞ/GİB)
*   **TEDAŞ:** Proje onay süreçlerine dair 2026/2 sayılı yeni bir genelge veya birim fiyat değişikliği saptanmadı.
*   **GİB:** KDV oranlarında veya GVK md. 9 (50 kW muafiyeti) kapsamında yeni bir tebliğ bulunmamaktadır.
*   **KARAR:** **GÜNCEL** (Mevcut `finans-rehberi.md` ve `teknik-standartlar-kabul.md` geçerli).

---

### 📈 Hesap Motoru İçin Güncel Parametreler (13.08.2026)
*   **PTF Temmuz 2026:** 2,70418 ₺/kWh (KDV Hariç)
*   **YEKDEM Temmuz 2026:** 0,43112 ₺/kWh (KDV Hariç)
*   **Ağustos 2026 PTF (1-12 Ağustos Ort.):** 2,812,40 ₺/MWh (Trend: ↑ Artış eğiliminde)
*   **Ağustos 2026 YEKDEM (Öngörü):** 450,45 ₺/MWh (Karar 14718 uyarınca)

---

### Kaynaklar
1.  **EPDK Tarife Tabloları:** [epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Geçerlilik: 13.08.2026)
2.  **EPİAŞ Şeffaflık Platformu:** [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr) (Gerçekleşen PTF ve YEKDEM verileri)
3.  **Resmî Gazete:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (Arama terimleri: Lisanssız, YEKDEM, Elektrik)
4.  **EPDK Kurul Kararı 14718:** 02/07/2026 tarihli YEKDEM Öngörü Revizyonu.

**Not:** Temmuz ayı PTF ve YEKDEM gerçekleşmeleri kesinleştiği için, ikili anlaşma faturası analizlerinde kullanılan "tahmini" ibareleri kaldırılmıştır. Hesaplama motoru `piyasa-canli.json` dosyasındaki Temmuz verisini `2.70418` (PTF) ve `0.43112` (YEKDEM) olarak overwrite etmelidir.