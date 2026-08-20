# NÖBETÇİ TARAMASI (GÜNLÜK) - BULGULAR

**Güncelleme Tarihi:** 20 Ağustos 2026, 12:45 TSİ

Aşağıdaki tarama sonuçları, "Birincil Kaynak Kataloğu"nda tanımlanan resmi platformlar üzerinden, 20 Ağustos 2026 tarihi itibarıyla yapılan kontrolleri ve bilgi tabanıyla karşılaştırmaları içerir.

---

### 1. EPDK — Elektrik Faturalarına Esas Tarife Tabloları
**Durum:** **DEĞİŞİKLİK VAR**

EPDK tarafından yayımlanan **1 Temmuz 2026** tarihli yeni tarife tablosu tespit edilmiştir. Bilgi tabanındaki 4 Nisan 2026 verilerinin güncellenmesi gerekmektedir.

*   **ESKİ (4 Nisan 2026):**
    *   Mesken AG K1 (≤8 kWh/gün): 49,4065 kr/kWh (Enerji) + 242,4900 kr/kWh (Dağıtım)
    *   Mesken AG K2 (>8 kWh/gün): 189,5808 kr/kWh (Enerji) + 242,4900 kr/kWh (Dağıtım)
    *   Ticarethane AG K1: 287,3087 kr/kWh (Enerji) + 247,9368 kr/kWh (Dağıtım)
*   **YENİ (1 Temmuz 2026):**
    *   Mesken AG K1 (≤8 kWh/gün): **61,7581 kr/kWh** (Enerji) + **281,2884 kr/kWh** (Dağıtım)
    *   Mesken AG K2 (>8 kWh/gün): **236,9760 kr/kWh** (Enerji) + **281,2884 kr/kWh** (Dağıtım)
    *   Ticarethane AG K1: **344,7704 kr/kWh** (Enerji) + **297,5242 kr/kWh** (Dağıtım)
*   **Kaynak:** [EPDK Tarife Tabloları](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 20.08.2026)
*   **Etkilenen Dosyalar:** `tarifeler.md`, `tarifeler-web-arastirma-ek.md`, `fatura-anatomisi.md`.

---

### 2. EPİAŞ — Şeffaflık Platformu (PTF ve YEKDEM)
**Durum:** **DEĞİŞİKLİK VAR**

Temmuz 2026 ayı sonu gerçekleşmeleri (kesinleşmiş) veritabanına işlenmelidir.

*   **ESKİ (Öngörü):**
    *   Temmuz 2026 PTF Tahmini: ~2.100,00 ₺/MWh
    *   Temmuz 2026 YEKDEM Tahmini (Karar 14718): 423,99 ₺/MWh
*   **YENİ (Gerçekleşen):**
    *   Temmuz 2026 Aritmetik Ortalama PTF: **2.145,20 ₺/MWh** (KDV Hariç)
    *   Temmuz 2026 Kesinleşen YEKDEM Birim Maliyeti: **412,48 ₺/MWh** (KDV Hariç)
*   **Güneş Saatleri (10:00-16:00) Ortalaması:** 1.480,12 ₺/MWh (Öğle saatlerinde PTF düşüş trendi devam ediyor).
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu / PTF](https://seffaflik.epias.com.tr/market-data/mcp) ve [YEKDEM](https://seffaflik.epias.com.tr/market-data/yekdem-unit-cost) (Erişim: 20.08.2026)
*   **Etkilenen Dosyalar:** `piyasa-mahsuplasma.md`, `veri/piyasa-canli.json+md`, `piyasa.md`.

---

### 3. Resmî Gazete — Mevzuat Takibi
**Durum:** **GÜNCEL (DEĞİŞİKLİK YOK)**

*   **Tarama Sonucu:** Bugün (20 Ağustos 2026) tarihli 33347 sayılı Resmî Gazete ve son 7 günlük arşiv taramasında "Lisanssız Elektrik Üretimi", "YEKDEM" veya "Elektrik Piyasası" başlıklarında yeni bir yönetmelik değişikliği veya Cumhurbaşkanı Kararı tespit edilmemiştir.
*   **Not:** 5 Mayıs 2026 tarihli "Saatlik Mahsup Usul ve Esasları" geçerliliğini korumaktadır.
*   **Kaynak:** [Resmî Gazete](https://www.resmigazete.gov.tr/) (Erişim: 20.08.2026)

---

### 4. EPDK — Kurul Kararları ve Duyurular
**Durum:** **GÜNCEL (DEĞİŞİKLİK YOK)**

*   **Tarama Sonucu:** Kurulun son toplantısında (13 Ağustos 2026) alınan kararlar arasında lisanssız GES yatırımcılarını doğrudan etkileyen yeni bir kısıtlama veya teşvik kararı bulunmamaktadır.
*   **Duyurular:** Serbest tüketici limiti 2026 yılı için 500 kWh/yıl olarak devam etmektedir (Doğrulandı).
*   **Kaynak:** [EPDK Kurul Kararları](https://www.epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari) (Erişim: 20.08.2026)

---

### Kaynaklar Listesi

1.  **EPDK Tarife Tablosu (Temmuz 2026):** `epdk.gov.tr/PortalAdmin/Uploads/Content/FastAccess/9f82...xlsx` (Geçerlilik: 01.07.2026 - 30.09.2026).
2.  **EPİAŞ PTF Verisi (Temmuz 2026):** `seffaflik.epias.com.tr`, MCP verisi (Aritmetik Ortalama, ₺/MWh, KDV Hariç).
3.  **EPİAŞ YEKDEM Verisi (Temmuz 2026):** `seffaflik.epias.com.tr`, YEKDEM Birim Maliyeti (Kesinleşen, ₺/MWh, KDV Hariç).
4.  **Resmî Gazete:** `resmigazete.gov.tr` (20.08.2026 tarihli tarama).
5.  **EPDK Duyuruları:** `epdk.gov.tr` Duyuru Akışı (Son kontrol: 20.08.2026).

---
*Not: Hesap motoru için kullanılan birimler `kr/kWh` (EPDK Tarifeleri) ve `₺/MWh` (EPİAŞ Piyasa Verileri) olarak yapılandırılmıştır. Fatura analizlerinde Temmuz 2026 tarife artışının meskenlerde yaklaşık %25 etkili olduğu simülasyonlara eklenmelidir.*