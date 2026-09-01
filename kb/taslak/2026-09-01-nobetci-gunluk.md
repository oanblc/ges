# NÖBETÇİ TARAMASI RAPORU (01.09.2026)

**GÜNCELLEME DURUMU:** DEĞİŞİKLİK VAR (EPİAŞ Ağustos gerçekleşmeleri ve YEKDEM kesinleşmeleri eklendi). EPDK tarife tabloları ve Resmî Gazete mevzuatında 11 Ağustos 2026'dan bu yana majör bir değişiklik tespit edilmemiştir.

---

## 1. EPİAŞ Piyasa Verileri (Ağustos 2026 Gerçekleşmeleri)

Ağustos ayı PTF verileri netleşmiş, Temmuz ayı YEKDEM birim maliyeti kesinleşmiştir.

| Parametre | Eski (Temmuz 2026) | Yeni (Ağustos 2026) | Kaynak | Etkilenen Dosya |
|---|---|---|---|---|
| **PTF Aylık Aritmetik Ort.** | 2.150,40 ₺/MWh | **2.340,50 ₺/MWh** | [EPİAŞ Şeffaflık](https://seffaflik.epias.com.tr) (31.08.2026) | `piyasa-mahsuplasma.md` |
| **PTF Güneş Saatleri Ort. (09:00-17:00)** | 980,20 ₺/MWh | **1.120,40 ₺/MWh** | [EPİAŞ Şeffaflık](https://seffaflik.epias.com.tr) (31.08.2026) | `piyasa-mahsuplasma.md`, `piyasa-canli.json` |
| **YEKDEM Gerçekleşen Maliyet** | 423,99 ₺/MWh (Tahmin) | **442,12 ₺/MWh (Kesin)** | [EPİAŞ YEKDEM Raporu](https://seffaflik.epias.com.tr) (15.08.2026) | `piyasa-mahsuplasma.md`, `fatura-analiz-protokolu.md` |

---

## 2. EPDK ve Resmî Gazete Taraması

**EPDK (epdk.gov.tr):**
*   **Tarife Tabloları:** 4 Nisan 2026 tarihli tarife tablosu hala güncelliğini korumaktadır. 1 Ekim 2026 tarihinde yayımlanacak olan Q4 tarifesi öncesinde ara bir kurul kararı (zam/indirim) yayımlanmamıştır.
*   **Kurul Kararları:** 20 Ağustos 2026 tarihinde yayımlanan 14812 sayılı karar ile bazı OSB'lerin dağıtım bedellerinde güncelleme yapılmıştır ancak ulusal tarifeyi etkilememektedir.
*   **Durum:** **GÜNCEL** (Mevcut `tarifeler.md` dosyası geçerlidir).

**Resmî Gazete (resmigazete.gov.tr):**
*   **Mevzuat:** 11 Ağustos - 1 Eylül 2026 tarihleri arasında "Lisanssız Elektrik Üretimi", "YEKDEM" veya "Elektrik Piyasası" anahtar kelimelerinde GES yatırımcısını etkileyecek yeni bir yönetmelik veya CB Kararı yayımlanmamıştır.
*   **Durum:** **GÜNCEL** (Mevcut `ozel-durumlar.md` ve `piyasa-mahsuplasma.md` geçerlidir).

---

## 3. Bilgi Tabanı (KB) Güncelleme Komutları

Aşağıdaki değişikliklerin ilgili dosyalara işlenmesi önerilir:

### A. `piyasa-mahsuplasma.md` Güncellemesi
*   **ESKİ:** "2026 Oca–May | 1.645 ₺/MWh"
*   **YENİ:** "2026 Oca–Ağu | 1.822,30 ₺/MWh (Ağustos ort. 2.340,50 ₺/MWh)"
*   **ESKİ:** "Mayıs–Haziran 2026 güneş saatlerinde ~520 ₺/MWh"
*   **YENİ:** "Ağustos 2026 güneş saatlerinde ~1.120,40 ₺/MWh"

### B. `fatura-analiz-protokolu.md` Güncellemesi
*   **ESKİ (Adım 3):** "423,99 (Tahmin)"
*   **YENİ:** "442,12 (Temmuz 2026 Kesinleşen)"

---

## 4. ÇELİŞKİ KAYDI
**Konu:** Mesken KDV Oranı (%10 vs %20)
**Bulgu:** `tarifeler.md` ve `tarifeler-web-arastirma.md` dosyalarında mesken KDV oranı için "teyit bekliyor" notu bulunmaktadır. 01.09.2026 itibarıyla yapılan kontrolde, GİB 2026 genel tebliğleri uyarınca meskenlerde elektrik teslimi için uygulanan KDV oranının **%10** olduğu doğrulanmıştır.
**Eylem:** Tüm dokümanlardaki "çelişki/teyit bekliyor" notlarının kaldırılıp %10 olarak sabitlenmesi önerilir.

---

## Kaynaklar

1.  **EPİAŞ Şeffaflık Platformu:** PTF (MCP) Verileri, [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr), Erişim Tarihi: 01.09.2026. (Birim: ₺/MWh, KDV Hariç).
2.  **EPİAŞ YEKDEM Sonuçları:** Temmuz 2026 Uzlaştırma Raporu, [seffaflik.epias.com.tr/yekdem-birim-maliyeti](https://seffaflik.epias.com.tr), Yayınlanma: 15.08.2026.
3.  **EPDK Duyuru Akışı:** [epdk.gov.tr/Detay/Icerik/3-0-1/duyurular](https://www.epdk.gov.tr), Kontrol Tarihi: 01.09.2026.
4.  **Resmî Gazete Arşivi:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr), Kontrol Dönemi: 11.08.2026 - 01.09.2026.