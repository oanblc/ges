# Nöbetçi Taraması Bulguları (Günlük)

**Güncelleme Tarihi:** 12 Ağustos 2026, 09:00 (TSİ)  
**Tarama Kapsamı:** EPDK, EPİAŞ, Resmî Gazete, TEDAŞ  
**Durum:** 2 Değişiklik Tespit Edildi / Diğerleri GÜNCEL

---

## 1. EPDK — Elektrik Tarifeleri ve Kurul Kararları
**Durum:** DEĞİŞİKLİK VAR

*   **ESKİ:** 4 Nisan 2026 tarihli tarife tablosu (KB dosyası: `tarifeler.md`, `tarifeler-web-arastirma-ek.md`)
*   **YENİ:** 1 Temmuz 2026 tarihli Elektrik Faturalarına Esas Tarife Tabloları yayımlandı. Temmuz dönemi birim fiyatları mesken ve sanayi gruplarında Nisan dönemiyle aynı kalmakla birlikte, dağıtım bedellerinde sistem işletim maliyeti kaynaklı ~%0,8'lik bir teknik güncelleme yapılmıştır.
*   **Kaynak:** [EPDK Tarife Tabloları](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 12.08.2026)
*   **Etkilenen Dosyalar:** `tarifeler.md`, `fatura-anatomisi.md`, `tarifeler-web-arastirma-ek.md`

---

## 2. EPİAŞ — PTF ve YEKDEM Gerçekleşmeleri (Temmuz 2026)
**Durum:** DEĞİŞİKLİK VAR (Tahminden Gerçekleşene Geçiş)

*   **ESKİ:** Temmuz 2026 PTF tahmini (2.000-2.100 ₺/MWh); Temmuz 2026 YEKDEM tahmini (423,99 ₺/MWh).
*   **YENİ (GERÇEKLEŞEN):**
    *   **Temmuz 2026 PTF (MCP) Aritmetik Ortalaması:** 2.698,42 ₺/MWh (KDV hariç).
    *   **Temmuz 2026 Güneş Saatleri (10:00-16:00) PTF Ortalaması:** 1.412,10 ₺/MWh (KDV hariç).
    *   **Temmuz 2026 YEKDEM Birim Maliyeti (Gerçekleşen):** 431,18 ₺/MWh (KDV hariç).
*   **Analiz:** KB'deki "Duck Curve" etkisi derinleşmektedir. Öğle saatleri fiyatları, genel ortalamanın %48 altına inmiştir.
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - PTF](https://seffaflik.epias.com.tr/electricity/market-operation/mcp) / [YEKDEM](https://seffaflik.epias.com.tr/electricity/settlement/yekdem-unit-cost) (Geçerlilik: 1-31 Temmuz 2026 dönemi)
*   **Etkilenen Dosyalar:** `piyasa-mahsuplasma.md`, `veri/piyasa-canli.json`, `fatura-analiz-protokolu.md`

---

## 3. Resmî Gazete — Mevzuat Takibi
**Durum:** GÜNCEL (Değişiklik Yok)

*   **Kontrol:** 7 Ağustos - 12 Ağustos 2026 tarihli Resmî Gazete sayıları tarandı. "Lisanssız", "Elektrik", "YEKDEM" anahtar kelimelerinde yeni bir yönetmelik değişikliği veya Cumhurbaşkanı Kararı tespit edilmedi.
*   **Not:** 2 Nisan 2026 tarihli Saatlik Mahsup Usul ve Esasları (11415 sayılı Karar) halen en güncel ana mevzuat çıpasıdır.

---

## 4. TEDAŞ ve Dağıtım Şirketleri
**Durum:** GÜNCEL (Değişiklik Yok)

*   **Kontrol:** TEDAŞ Proje onay birimi duyuruları ve bölgesel EDAŞ (AEDAŞ, BEDAŞ, Enerjisa) kapasite tabloları kontrol edildi. Ağustos 2026 kapasite tahsis duyuruları henüz askıya çıkmamıştır (Ayın 15'inden sonra bekleniyor).

---

## KB Güncelleme Talimatı (Veri Motoru İçin)

| Parametre | Eski Değer | Yeni Değer | Birim | Kaynak Tarihi |
| :--- | :--- | :--- | :--- | :--- |
| PTF_TEM26_ORT | 2.100,00 | 2.698,42 | ₺/MWh | 12.08.2026 |
| YEKDEM_TEM26_GER | 423,99 | 431,18 | ₺/MWh | 12.08.2026 |
| DAGITIM_MESKEN_K1 | 242,4900 | 244,4321 | kr/kWh | 01.07.2026 |

---

### Kaynaklar
1.  EPDK, "Elektrik Faturalarına Esas Tarife Tabloları", 1 Temmuz 2026. [Link](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari)
2.  EPİAŞ Şeffaflık Platformu, "PTF Realizasyon Verileri - Temmuz 2026". [Link](https://seffaflik.epias.com.tr)
3.  Resmî Gazete Arşivi (1-12 Ağustos 2026). [Link](https://www.resmigazete.gov.tr)
4.  EPDK Kurul Kararı No: 14718 (Tahmini YEKDEM referansı için). [Link](https://www.resmigazete.gov.tr/eskiler/2026/07/20260704-5.pdf)