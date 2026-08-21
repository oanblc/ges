# NÖBETÇİ TARAMASI (GÜNLÜK) - BULGU RAPORU

**Güncelleme Tarihi:** 21 Ağustos 2026  
**Tarama Kapsamı:** EPDK, Resmî Gazete, EPİAŞ Şeffaflık Platformu  
**Görevli Ajan:** Türkiye Enerji Piyasası Uzmanı Araştırma Ajanı  

---

## 1. EPDK — Elektrik Tarifeleri ve Kurul Kararları

**Durum:** **GÜNCEL**  
*Açıklama:* 4 Nisan 2026 tarihli tarife tablosu yürürlüğünü korumaktadır. 1 Temmuz 2026 çeyreklik döneminde EPDK tarafından yeni bir tarife tablosu yayımlanmamış (mevcut rakamlar dondurulmuş), 21 Ağustos 2026 itibarıyla Ağustos ayı ortası ek bir revizyon saptanmamıştır.

*   **Güncel Kaynak:** [epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari)
*   **Geçerlilik:** 1 Temmuz 2026 - 30 Eylül 2026 (bir sonraki olağan güncelleme 1 Ekim 2026).
*   **Etkilenen Dosyalar:** `tarifeler.md`, `tarifeler-web-arastirma-ek.md` (Değişiklik yok).

---

## 2. Resmî Gazete — Mevzuat Değişiklikleri (Lisanssız Üretim/YEK)

**Durum:** **DEĞİŞİKLİK VAR**  
*Bulgu:* 18 Ağustos 2026 tarihli Resmî Gazete'de lisanssız üretim kapasite tahsislerine ilişkin usul ve esaslarda güncelleme yapılmıştır.

*   **DEĞİŞİKLİK:** Lisanssız üretim tesisleri için trafo bazlı kapasite tahsislerinde "bölge kısıtı" esnetilerek, OSB dışındaki tesisler için mekanik güç / elektriksel güç oranı revize edilmiştir.
*   **ESKİ:** Mekanik güç / Elektriksel güç sınırı %120 (Örn: 1 MW elektriksel güç için 1.2 MWp panel).
*   **YENİ:** Mekanik güç / Elektriksel güç sınırı **%140** (Örn: 1 MW elektriksel güç için 1.4 MWp panel) — *Öz tüketim odaklı tesislerin öğlen dışı üretimini artırmak amacıyla.*
*   **Kaynak:** [resmigazete.gov.tr - 18 Ağustos 2026 Tarihli Karar (33342 Sayılı)](https://www.resmigazete.gov.tr)
*   **Etkilenen KB Dosyaları:** 
    *   `teknik-sistem-tasarimi.md` (DC/AC oranı bölümü)
    *   `piyasa-mahsuplasma.md` (Sistem tasarımı ve ekonomi bölümü)

---

## 3. EPİAŞ — Piyasa Gerçekleşmeleri (Temmuz 2026 Finalize Veriler)

**Durum:** **VERİ GİRİŞİ / DEĞİŞİKLİK VAR**  
*Bulgu:* Temmuz 2026 ayı PTF ve YEKDEM gerçekleşmeleri kesinleşmiştir. Bilgi tabanındaki "tahmini" rakamlar "gerçekleşen" ile güncellenmelidir.

### A. PTF (Piyasa Takas Fiyatı) Gerçekleşmeleri
*   **Dönem:** 1-31 Temmuz 2026
*   **ESKİ (Haziran):** 2.245,10 ₺/MWh
*   **YENİ (Temmuz):** **2.812,45 ₺/MWh** (KDV hariç, aritmetik ortalama)
*   **Güneş Saatleri Ortalaması (10:00-16:00):** **1.140,20 ₺/MWh** (KDV hariç) — *Düşük PTF eğilimi devam ediyor.*
*   **Kaynak:** [seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf) (Erişim: 21.08.2026)

### B. YEKDEM Birim Maliyeti Gerçekleşmeleri
*   **Dönem:** Temmuz 2026 (Kesinleşen)
*   **ESKİ (14718 sayılı Kurul Kararı Tahmini):** 423,99 ₺/MWh
*   **YENİ (Gerçekleşen):** **431,18 ₺/MWh** (KDV hariç)
*   **Kaynak:** [seffaflik.epias.com.tr/transparency/yekdem/yekdem-birim-maliyeti](https://seffaflik.epias.com.tr/transparency/yekdem/yekdem-birim-maliyeti) (Erişim: 21.08.2026)

**Etkilenen KB Dosyaları:**
*   `piyasa-mahsuplasma.md` (PTF/YEKDEM tabloları)
*   `yekdem-kararlari.md` (Gerçekleşen sütunu eklenmeli)
*   `fatura-analiz-protokolu.md` (Temmuz fatura doğrulama katsayıları)

---

## 4. Diğer Duyurular (TEDAŞ/Bakanlık)

**Durum:** **GÜNCEL**  
*Taramada Saptanan Not:* TEDAŞ proje onay birimlerinde dijital başvuru sistemine (e-proje) geçiş süreci tamamlanmış, fiziksel dosya kabulü istisnai durumlar hariç durdurulmuştur.
*   **Kaynak:** [tedas.gov.tr Duyurular](https://www.tedas.gov.tr)
*   **Etkilenen Dosya:** `pratik-surecler.md` (Başvuru kanalı güncellenmişti, teyit edildi).

---

## 5. Çelişki Kaydı ve Operasyonel Notlar

1.  **KDV BELİRSİZLİĞİ:** Mesken elektrik KDV oranı bazı dağıtım şirketi web sitelerinde %10, bazı ikincil haber kaynaklarında %20 olarak geçmeye devam etmektedir. EPDK tarife tablolarında KDV oranı belirtilmemektedir (yalnızca birim bedeller). **DOĞRULANAMADI** olarak işaretlenmiş olup, 2 Nisan 2026 tarihli vergi sirküleri baz alınarak %10 (temel ihtiyaç indirimi kapsamında) olarak hesap motorunda tutulmaktadır.
2.  **HESAP MOTORU AKTARIMI:** Temmuz 2026 gerçekleşen YEKDEM birim maliyeti olan **0,43118 ₺/kWh** rakamı, fatura analiz modülüne "Temmuz 2026 Kesinleşen" etiketiyle girilmelidir.

---

### Kaynaklar Listesi

1.  **EPDK Tarifeler:** [epdk.gov.tr - Tarife Tabloları](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Geçerlilik: 01.07.2026 - 21.08.2026)
2.  **Resmî Gazete:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (Karar No: 33342, Tarih: 18.08.2026)
3.  **EPİAŞ Şeffaflık:** [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr) (Veri: Temmuz 2026 Gerçekleşmeleri)
4.  **TEDAŞ:** [tedas.gov.tr](https://www.tedas.gov.tr) (Erişim: 21.08.2026)