# GÜNLÜK NÖBETÇİ TARAMASI SONUÇLARI
**Rapor Tarihi:** 11 Ağustos 2026  
**Tarama Kapsamı:** EPDK, EPİAŞ, Resmî Gazete (Son 24 saat)

Aşağıdaki bulgular, `gesdanismani.com` bilgi tabanındaki mevcut verilerle karşılaştırılmıştır.

---

## 1. EPDK (Enerji Piyasası Düzenleme Kurumu)
*   **Elektrik Tarifeleri:** 1 Temmuz 2026'da yayımlanan ve 4 Nisan 2026 tablosunun devamı niteliğinde olan tarife yapısında yeni bir revizyon (ara zam veya indirim) saptanmadı.
*   **Kurul Kararları:** Bugün tarihli duyurularda lisanssız üretim veya YEKDEM mekanizmasını doğrudan etkileyen yeni bir karar bulunmamaktadır.
*   **Durum:** **GÜNCEL** (İlgili dosya: `tarifeler.md`)

---

## 2. EPİAŞ (Şeffaflık Platformu)
Temmuz 2026 ayı son uzlaştırma verileri ve Ağustos ayının ilk 10 günlük PTF trendleri kontrol edilmiştir.

### Değişiklik 1: Temmuz 2026 PTF Gerçekleşmesi
*   **ESKİ:** 2.700,00 ₺/MWh (Tahmin/Öngörü)  
*   **YENİ:** **2.699,62 ₺/MWh** (Kesinleşen aylık ortalama)
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - PTF Özet](https://seffaflik.epias.com.tr/market-data/mcp-smp/mcp-summary) (Erişim: 11.08.2026)
*   **Etkilenen Dosyalar:** `piyasa-mahsuplasma.md`, `piyasa-canli.json` (Güncelleme gerektirir).
*   **Hesap Notu:** Güneş saatleri (10:00 - 16:00) ağırlıklı ortalaması 1.842,30 ₺/MWh olarak gerçekleşmiştir.

### Değişiklik 2: Temmuz 2026 YEKDEM Birim Maliyeti Gerçekleşmesi
*   **ESKİ:** 423,99 ₺/MWh (14718 sayılı EPDK Kararı tahmini)  
*   **YENİ:** **432,15 ₺/MWh** (Gerçekleşen birim maliyet)
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - YEKDEM Birim Maliyeti](https://seffaflik.epias.com.tr/market-data/yekdem/unit-cost) (Erişim: 11.08.2026)
*   **Etkilenen Dosyalar:** `yekdem-kararlari.md`, `piyasa-mahsuplasma.md`.
*   **Etki:** Temmuz faturasında "ikili anlaşma + YEKDEM" kullanan sanayi ve ticari abonelerde tahminden **%1,92** daha yüksek bir YEKDEM kalemi görülecektir.

---

## 3. Resmî Gazete
*   **Tarama Sonucu:** 11 Ağustos 2026 tarihli ve 33338 sayılı Resmî Gazete'de "elektrik", "lisanssız", "güneş" veya "yenilenebilir" anahtar kelimelerini içeren yeni bir yönetmelik değişikliği veya Cumhurbaşkanı Kararı saptanmadı.
*   **Durum:** **GÜNCEL** (İlgili dosya: `ozel-durumlar.md`, `imar-yapi-kayit-depolama.md`)

---

## 4. TEDAŞ / Dağıtım Şirketleri
*   **Duyurular:** Proje onay süreçlerine ilişkin standartlarda veya evrak listesinde bir değişiklik saptanmadı.
*   **Durum:** **GÜNCEL** (İlgili dosya: `pratik-sureczler.md`, `dagitim-sirketleri.md`)

---

## Özet Tablo (Hesap Motoru İçin Kritik Veriler)

| Veri Kalemi | Değer | Birim | KDV Durumu | Geçerlilik Dönemi | Kaynak Durumu |
|---|---|---|---|---|---|
| **Aylık Ortalama PTF** | 2.699,62 | ₺/MWh | Hariç | Temmuz 2026 | Kesinleşti |
| **Güneş Saatleri PTF** | 1.842,30 | ₺/MWh | Hariç | Temmuz 2026 | Kesinleşti |
| **YEKDEM Birim Maliyet**| 432,15 | ₺/MWh | Hariç | Temmuz 2026 | Kesinleşti |
| **Serbest Tük. Limiti** | 500 | kWh/yıl | - | 2026 Yılı | Güncel |
| **Mesken KDV Oranı** | %10 | - | - | Ağustos 2026 | GÜNCEL |

---

### Kaynaklar
1. [EPİAŞ Şeffaflık Platformu - PTF Verileri](https://seffaflik.epias.com.tr) (11.08.2026)
2. [EPDK Tarife Tabloları Arşivi](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (11.08.2026)
3. [Resmî Gazete Arşivi](https://www.resmigazete.gov.tr) (11.08.2026)
4. [EPDK 14718 sayılı Kurul Kararı](https://www.resmigazete.gov.tr/eskiler/2026/07/20260704-5.pdf) (Kıyaslama için kullanıldı)