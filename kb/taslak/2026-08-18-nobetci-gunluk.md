# NÖBETÇİ TARAMASI GÜNLÜK RAPORU

**Güncelleme Tarihi:** 18 Ağustos 2026  
**Tarama Kapsamı:** EPDK, Resmî Gazete, EPİAŞ Şeffaflık Platformu  
**Ajan Notu:** Bugün yapılan taramada Temmuz 2026 ayı kesinleşen piyasa verileri ve Resmî Gazete'de yayımlanan bir kurul kararı tespit edilmiştir.

---

## 1. EPDK — Elektrik Tarifeleri ve Kurul Kararları
**Durum:** KISMİ DEĞİŞİKLİK  

*   **Tarife Tabloları:** 1 Temmuz 2026 dönemine ait mevcut tabloda bir değişiklik saptanmadı. **GÜNCEL** (Geçerlilik: 1 Temmuz 2026 - 30 Eylül 2026).
*   **Yeni Kurul Kararı:** 15 Ağustos 2026 tarihli EPDK Kararı (No: 14820) ile mesken aboneleri için "Mikro-GES" tanımında kapasite sınırı güncellendi.
    *   **ESKİ:** 25 kW (Mesken sınırı)  
    *   **YENİ:** 50 kW (Mesken sınırı - Vergi muafiyeti ve teknik bağlantı kolaylığı kapsamı genişletildi)  
    *   **Kaynak:** [EPDK Kurul Kararları Sayfası](https://www.epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari) (15.08.2026)  
    *   **Etkilenen Dosyalar:** `tarifeler-web-arastirma-ek.md`, `fatura-anatomisi.md`, `sss-saha-taramasi.md`, `finans-rehberi.md`.

---

## 2. EPİAŞ — PTF ve YEKDEM Gerçekleşmeleri (Temmuz 2026)
**Durum:** DEĞİŞİKLİK (Yeni Veri Girişi)  

Temmuz 2026 ayı için kesinleşen piyasa verileri EPİAŞ Şeffaflık Platformu üzerinden çekilmiştir.  

| Parametre | Eski Veri (Tahmin/Önceki Ay) | Yeni Veri (Temmuz 2026 Kesinleşen) | Kaynak |
| :--- | :--- | :--- | :--- |
| **Aylık Ort. PTF** | 1.645 ₺/MWh (Oca-May Ort.) | **2.894,15 ₺/MWh** (KDV Hariç) | [EPİAŞ Şeffaflık - PTF](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf.xhtml) |
| **Güneş Saati PTF (10:00-16:00)** | DOĞRULANAMADI | **1.120,40 ₺/MWh** (KDV Hariç) | [EPİAŞ Şeffaflık - PTF](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf.xhtml) |
| **YEKDEM Birim Maliyeti** | 423,99 ₺/MWh (Tahmin - Karar 14718) | **408,12 ₺/MWh** (KDV Hariç) | [EPİAŞ Şeffaflık - YEKDEM](https://seffaflik.epias.com.tr/transparency/yekdem/yekdem-birim-maliyeti.xhtml) |

*   **Etkilenen Dosyalar:** `piyasa-mahsuplasma.md`, `veri/piyasa-canli.json`, `fatura-analiz-protokolu.md`.

---

## 3. Resmî Gazete — Mevzuat Değişiklikleri
**Durum:** GÜNCEL  

*   **Tarama:** 12 Ağustos 2026 - 18 Ağustos 2026 tarihleri arasında "lisanssız", "elektrik", "YEKDEM" anahtar kelimeleriyle yapılan taramada GES mahsuplaşma rejimini etkileyen yeni bir yönetmelik değişikliği saptanmamıştır. **GÜNCEL**.

---

## 4. Kaynak Kataloğu ve Bilgi Tabanı Eşleşme Notları

*   **piyasa-mahsuplasma.md Update:** Temmuz 2026 verisi eklendi. "Duck Curve" etkisinin devam ettiği, öğle saatleri PTF'sinin (1.120,40 ₺) aylık ortalamanın (2.894,15 ₺) yalnızca %38'i seviyesinde gerçekleştiği not düşülmelidir. Bu durum bataryalı sistemlerin (load-shifting) fizibilitesini artırmaktadır.
*   **tarifeler-web-arastirma-ek.md Update:** Mesken vergi muafiyeti/limit bilgisi 25 kW'dan 50 kW'a revize edilecektir. (EPDK 14820 Sayılı Karar uyarınca).

---

### Kaynaklar
1.  **EPDK Kurul Kararı (14820):** [epdk.gov.tr/Kararlar/14820](https://www.epdk.gov.tr) (Erişim: 18.08.2026)
2.  **EPİAŞ PTF Temmuz 2026:** [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr) (Erişim: 18.08.2026, Geçerlilik: Temmuz 2026)
3.  **EPİAŞ YEKDEM Gerçekleşen:** [seffaflik.epias.com.tr/yekdem](https://seffaflik.epias.com.tr) (Erişim: 18.08.2026, Geçerlilik: Temmuz 2026)
4.  **Resmî Gazete Arşivi:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (Sorgu: 12-18 Ağustos 2026)