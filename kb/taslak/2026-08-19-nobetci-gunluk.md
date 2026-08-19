# NÖBETÇİ TARAMASI: Günlük Piyasa ve Mevzuat Kontrolü

**Güncelleme Tarihi:** 19 Ağustos 2026  
**Tarama Kapsamı:** EPDK Duyurular/Tarifeler, Resmî Gazete (Lisanssız/YEK), EPİAŞ Şeffaflık Platformu (PTF/YEKDEM gerçekleşmeleri).

---

## 1. EPDK — Elektrik Tarifeleri ve Kurul Kararları
**Durum:** GÜNCEL (Değişiklik Yok)

*   **Tarife Tabloları:** 1 Temmuz 2026 çeyreklik döneminde yeni bir tarife tablosu yayımlanmamıştır. 4 Nisan 2026 tarihli tablo (Karar No: 14531) yürürlüğünü sürdürmektedir. Bir sonraki olağan güncelleme 1 Ekim 2026 tarihindedir.
*   **Kurul Kararları:** 12-18 Ağustos 2026 haftasında lisanssız üretimi veya mahsuplaşma rejimini etkileyen yeni bir kurul kararı tespit edilmemiştir.
*   **KB Dosyası Etkisi:** `tarifeler.md`, `tarifeler-web-arastirma-ek.md` dosyaları geçerliliğini korumaktadır.

---

## 2. Resmî Gazete — Mevzuat Takibi
**Durum:** GÜNCEL (Değişiklik Yok)

*   **Lisanssız Üretim:** 5 Mayıs 2026 tarihli "Saatlik Mahsup Usul ve Esasları" sonrasındaki statüko devam etmektedir. Bugün yayımlanan 33346 sayılı Resmî Gazete'de enerji piyasasına ilişkin bir düzenleme bulunmamaktadır.
*   **KB Dosyası Etkisi:** `ozel-durumlar.md`, `piyasa-mahsuplasma.md` dosyaları günceldir.

---

## 3. EPİAŞ — PTF ve YEKDEM Gerçekleşmeleri
**Durum:** **DEĞİŞİKLİK VAR**

Temmuz 2026 ayı uzlaştırma sonuçları kesinleşmiş ve KB'deki "tahmini" verilerin yerini "gerçekleşen" veriler almıştır.

### A. PTF (Piyasa Takas Fiyatı) Gerçekleşmesi
*   **ESKİ:** 2026 Oca–May ortalaması (1.645 ₺/MWh) üzerinden yapılan projeksiyonlar.
*   **YENİ:** **2.699,60 ₺/MWh** (Temmuz 2026 Aylık Aritmetik Ortalama).
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - PTF Özeti](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf.xhtml) (Erişim: 19.08.2026).
*   **Etkilenen KB Dosyası:** `piyasa-mahsuplasma.md` (§1. PTF Tablosu), `veri/piyasa-canli.json`.

### B. YEKDEM Birim Maliyeti Gerçekleşmesi
*   **ESKİ:** 14718 sayılı Kurul Kararı Temmuz öngörüsü (423,99 ₺/MWh).
*   **YENİ:** **424,40 ₺/MWh** (Temmuz 2026 Kesinleşen YEKDEM Birim Maliyeti).
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - YEKDEM Birim Maliyeti](https://seffaflik.epias.com.tr/transparency/yekdem/yekdem-birim-maliyeti.xhtml) (Erişim: 19.08.2026).
*   **Etkilenen KB Dosyası:** `yekdem-kararlari.md` (§2. ve §4. bölümler), `piyasa-mahsuplasma.md` (§2. YEKDEM).

---

## 4. Özet Bulgular ve Aksiyon Notları

| Parametre | Eski Değer (Tahmin/Eski Ay) | Yeni Değer (Gerçekleşen) | Birim | Kaynak |
| :--- | :--- | :--- | :--- | :--- |
| **Temmuz PTF Ort.** | 1.645 (Oca-May ort) | **2.699,60** | ₺/MWh (KDV Hariç) | EPİAŞ (19.08.2026) |
| **Temmuz YEKDEM** | 423,99 (Öngörü) | **424,40** | ₺/MWh (KDV Hariç) | EPİAŞ (19.08.2026) |
| **Sanayi OG Elektrik Alış** | 4,81 | **4,81** | ₺/kWh (KDV Hariç) | EPDK (04.04.2026) |
| **Mesken K2 Alış** | 4,32 | **4,32** | ₺/kWh (KDV Hariç) | EPDK (04.04.2026) |

**DOĞRULANAMADI:** Ağustos 2026 aylık PTF ortalaması henüz ay tamamlanmadığı için kesinleşmemiştir; ancak 1-18 Ağustos arası gidişat **2.745,12 ₺/MWh** seviyesinde seyretmektedir (Tahminidir, fatura hesabında kullanılamaz).

---

### Kaynaklar
1.  **EPDK:** [Elektrik Faturalarına Esas Tarife Tabloları](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Geçerlilik: 4 Nisan 2026 - 30 Eylül 2026).
2.  **EPİAŞ:** [Şeffaflık Platformu PTF Verileri](https://seffaflik.epias.com.tr) (Veri Tarihi: 01.07.2026 - 31.07.2026).
3.  **Resmî Gazete:** [Günlük Arşiv](https://www.resmigazete.gov.tr) (19 Ağustos 2026).
4.  **Kurul Kararı:** 14718 Sayılı YEKDEM Öngörü Kararı (02.07.2026).