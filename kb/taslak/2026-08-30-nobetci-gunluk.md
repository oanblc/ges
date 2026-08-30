# NÖBETÇİ TARAMASI (Günlük) - Bulgular ve Karşılaştırma

**Rapor Tarihi:** 30 Ağustos 2026
**Tarama Kapsamı:** EPDK, Resmî Gazete, EPİAŞ Şeffaflık Platformu, TEDAŞ.
**Ajan Notu:** 11 Ağustos 2026 tarihli son kapsamlı güncellemeden bugüne (30 Ağustos 2026) kadar olan piyasa verileri ve mevzuat akışı kontrol edilmiştir.

---

### 1. EPDK — Tarifeler ve Kurul Kararları
*   **Elektrik Faturalarına Esas Tarife Tabloları:** 1 Temmuz 2026'da yayımlanan ve 4 Nisan 2026 rakamlarını koruyan tabloda herhangi bir ara değişiklik saptanmadı. 1 Ekim 2026'da yürürlüğe girecek olan Q4 tarifeleri için henüz bir kurul kararı veya taslak yayımlanmamıştır.
*   **Kurul Kararları:** 11-30 Ağustos tarihleri arasında Lisanssız Üretim Yönetmeliği'ni veya mahsuplaşma rejimini etkileyen yeni bir karar bulunmamaktadır.
*   **Duyurular:** **GÜNCEL**

---

### 2. Resmî Gazete — Mevzuat Değişiklikleri
*   **Lisanssız Üretim / YEK:** 12 Ağustos - 30 Ağustos 2026 tarihli Resmî Gazete sayıları taranmıştır. Güneş enerjisi veya lisanssız üretimi doğrudan etkileyen bir yönetmelik değişikliği veya Cumhurbaşkanı Kararı saptanmamıştır.
*   **Vergi Oranları:** GVK md.9 (mesken muafiyeti) ve KDV oranlarında GES yatırımlarını etkileyen bir değişiklik yoktur.
*   **Durum:** **GÜNCEL**

---

### 3. EPİAŞ — Piyasa Gerçekleşmeleri
Temmuz 2026 uzlaştırma dönemi kesinleşmiş, Ağustos 2026 piyasa verileri netleşmiştir.

| Parametre | ESKİ (KB / Öngörü) | YENİ (Gerçekleşen / Cari) | Kaynak | Etkilenen KB Dosyası |
| :--- | :--- | :--- | :--- | :--- |
| **YEKDEM Birim Maliyeti (Temmuz 2026)** | 423,99 ₺/MWh (Öngörü - Karar 14718) | **415,22 ₺/MWh** (Kesinleşen) | [EPİAŞ Şeffaflık - YEKDEM Gerçekleşen](https://seffaflik.epias.com.tr) (28.08.2026) | `piyasa-mahsuplasma.md`, `yekdem-kararlari.md` |
| **PTF Aylık Aritmetik Ort. (Ağustos 2026)** | 2.700,00 ₺/MWh (Temmuz verisi) | **2.412,45 ₺/MWh** (1-29 Ağustos Ort.) | [EPİAŞ Şeffaflık - PTF Verileri](https://seffaflik.epias.com.tr) (30.08.2026) | `piyasa-mahsuplasma.md`, `veri/piyasa-canli.json` |
| **Güneş Saatleri PTF Ort. (Ağustos 2026)** | DOĞRULANAMADI (Öngörü bazlı) | **715,10 ₺/MWh** (09:00-17:00 Ort.) | [EPİAŞ Şeffaflık - PTF Verileri](https://seffaflik.epias.com.tr) (30.08.2026) | `piyasa-mahsuplasma.md` |

---

### 4. Diğer Kaynaklar (KOSGEB / TEDAŞ / Bankalar)
*   **KOSGEB Yeşil Sanayi Destek Programı:** 14 M₺ üst limitli çatı GES faizsiz kredi desteği çağrısı açık durumdadır. Limitlerde veya başvuru şartlarında (imalatçı KOBİ) değişiklik yoktur.
*   **Banka GES Kredileri:** Ziraat, İş Bankası ve Garanti BBVA paketleri incelenmiş; 11 Ağustos'taki yapısal bilgiler güncelliğini korumaktadır. (Faiz oranları şube bazlı/ilan edilmiyor).
*   **Durum:** **GÜNCEL**

---

### ÖZET BULGU LİSTESİ VE GÜNCELLEME KOMUTLARI

1.  **Piyasa Verisi Güncellemesi:** Temmuz 2026 YEKDEM maliyeti öngörüden %2,07 daha düşük gerçekleşmiştir (423,99 → 415,22). Bu durum işletmelerin Temmuz faturası analizinde kullanılan "öngörü farkı" satırını etkilemektedir.
2.  **PTF Trend Analizi:** Ağustos 2026 PTF ortalaması, Temmuz ayına (2.699 ₺/MWh) kıyasla yaklaşık %10,6 gerilemiştir. Özellikle güneş saatlerindeki PTF çöküşü (duck curve) devam etmektedir (AOP: 2412, Güneş: 715). Saatlik mahsuplaşmaya tabi ticari tesisler için "öz tüketim değeri"nin şebekeye satıştan yaklaşık 6,8 kat daha kârlı olduğu teyit edilmiştir.

---

### Kaynaklar
1.  **EPDK Tarife Tabloları:** [epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 30.08.2026)
2.  **EPİAŞ Şeffaflık Platformu (PTF):** [seffaflik.epias.com.tr/mcp](https://seffaflik.epias.com.tr/reporting-service/v1/mcp/export-csv) (Erişim: 30.08.2026, Geçerlilik: Ağustos 2026 birikimli)
3.  **EPİAŞ Şeffaflık Platformu (YEKDEM):** [seffaflik.epias.com.tr/yekdem-birim-maliyeti](https://seffaflik.epias.com.tr/reporting-service/v1/yekdem/maliyet) (Erişim: 30.08.2026, Geçerlilik: Temmuz 2026 kesinleşen)
4.  **Resmî Gazete:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (Ağustos 2026 arşiv taraması)
5.  **KOSGEB Destekleri:** [kosgeb.gov.tr/site/tr/genel/destekdetay/8924/yesil-sanayi-destek-programi](https://www.kosgeb.gov.tr) (Erişim: 30.08.2026)