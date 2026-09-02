# NÖBETÇİ TARAMASI (Günlük) - 02 EYLÜL 2026

Türkiye enerji piyasası günlük tarama sonuçları aşağıdadır. Mevcut bilgi tabanı (KB) ile yapılan karşılaştırma sonucunda piyasa gerçekleşme verileri güncellenmiş, mevzuat ve tarife tablolarında bir değişiklik saptanmamıştır.

**Tarama Tarihi:** 02 Eylül 2026, 09:15  
**Tarama Kapsamı:** EPDK, Resmî Gazete, EPİAŞ Şeffaflık Platformu

---

## 1. EPDK — Elektrik Tarifeleri ve Kurul Kararları
**Durum:** **GÜNCEL**

*   **Tarife Tabloları:** 1 Temmuz 2026 tarihinde bir değişiklik yapılmadığı teyit edilmişti. Bugün yapılan kontrolde 1 Ekim 2026 dönemine kadar geçerli olan tablonun hala **4 Nisan 2026** tarihli tablo olduğu görülmüştür.
*   **Kurul Kararları:** Son 24 saat içinde lisanssız üretimi veya mahsuplaşma rejimini etkileyen yeni bir kurul kararı yayımlanmamıştır.
*   **Serbest Tüketici Limiti:** 2026 yılı için belirlenen **500 kWh/yıl** limiti yürürlüktedir.

---

## 2. Resmî Gazete — Mevzuat Takibi
**Durum:** **GÜNCEL**

*   **Günlük Kontrol:** 02 Eylül 2026 tarihli ve 33360 sayılı Resmî Gazete kontrol edilmiştir. "Lisanssız", "YEKDEM", "Güneş" veya "Elektrik" anahtar kelimelerinde sektörü etkileyen bir yönetmelik değişikliği veya Cumhurbaşkanı Kararı saptanmamıştır.

---

## 3. EPİAŞ — PTF ve YEKDEM Gerçekleşmeleri
**Durum:** **DEĞİŞİKLİK VAR** (Ağustos 2026 verileri sisteme girildi)

Ağustos 2026 ayının tamamlanmasıyla birlikte piyasa gerçekleşme verileri kesinleşmiştir. Bilgi tabanındaki "tahmini" ve "eksik" veriler güncellenmiştir.

### ESKİ → YENİ Değerler

| Veri Tipi | Eski Değer (Tahmin/Eksik) | Yeni Değer (Gerçekleşen) | Kaynak | Etkilenen Dosya |
| :--- | :--- | :--- | :--- | :--- |
| **Ağustos PTF Ort.** | 2.100,00 ₺/MWh (Tahmin) | **2.488,40 ₺/MWh** | [EPİAŞ Şeffaflık - PTF](https://seffaflik.epias.com.tr/market-data/mcp) | `piyasa-mahsuplasma.md`, `veri/piyasa-canli.json` |
| **Ağustos YEKDEM** | 450,45 ₺/MWh (Tahmin) | **398,12 ₺/MWh** | [EPİAŞ Şeffaflık - YEKDEM](https://seffaflik.epias.com.tr/market-data/renewables-support-mechanism) | `yekdem-kararlari.md`, `piyasa-mahsuplasma.md` |
| **Güneş Saati Ort.** | Veri Yok | **1.810,15 ₺/MWh** | [EPİAŞ Şeffaflık - MCP (09:00-17:00)](https://seffaflik.epias.com.tr/market-data/mcp) | `piyasa-mahsuplasma.md` |

---

## 4. Hesap Motoruna Aktarılabilir Net Veriler

Bu veriler `kb/veri/piyasa-canli.json` dosyasına aşağıdaki formatta işlenmiştir:

| Parametre | Birim | KDV Durumu | Geçerlilik Dönemi | Değer |
| :--- | :--- | :--- | :--- | :--- |
| PTF_AVG_2026_08 | ₺/MWh | Hariç | 01.08.2026 - 31.08.2026 | 2.488,40 |
| YEKDEM_REAL_2026_08 | ₺/MWh | Hariç | 01.08.2026 - 31.08.2026 | 398,12 |
| PTF_SUN_AVG_2026_08 | ₺/MWh | Hariç | 01.08.2026 - 31.08.2026 | 1.810,15 |

---

## 5. Çelişki Kaydı ve Notlar
*   **YEKDEM Sapması:** Ağustos ayı için EPDK'nın 14718 sayılı kararıyla öngördüğü 450,45 ₺/MWh tahmini, gerçekleşen 398,12 ₺/MWh değerinden **%11,6 daha yüksektir.** Bu durum, ikili anlaşması olan tüketicilerin faturalarında "YEKDEM farkı/düzeltmesi" olarak iade/mahsup görmesine neden olacaktır. Asistan, fatura analizlerinde bu farkı "olumlu sapma" olarak işaretlemelidir.

---

### Kaynaklar
1.  **EPDK Tarife Tabloları (4 Nisan 2026):** [epdk.gov.tr/.../elektrik-faturalarina-esas-tarife-tablolari](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 02.09.2026)
2.  **EPİAŞ Şeffaflık Platformu PTF:** [seffaflik.epias.com.tr/ptf](https://seffaflik.epias.com.tr/transparency/market/day-ahead-market/mcp.xhtml) (Ağustos 2026 Kesinleşmiş, Erişim: 02.09.2026)
3.  **EPİAŞ Şeffaflık Platformu YEKDEM:** [seffaflik.epias.com.tr/yekdem](https://seffaflik.epias.com.tr/transparency/market/renewables-support-mechanism/unit-cost.xhtml) (Ağustos 2026 Gerçekleşen, Erişim: 02.09.2026)
4.  **Resmî Gazete:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (Sayı: 33360, Erişim: 02.09.2026)