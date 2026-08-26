# NÖBETÇİ TARAMASI (26 Ağustos 2026)

26 Ağustos 2026 tarihinde yapılan günlük tarama sonuçları aşağıdadır. Birincil kaynaklardaki (EPDK, Resmî Gazete, EPİAŞ) veriler, mevcut bilgi tabanı (kb) dosyalarıyla karşılaştırılmıştır.

## 1. EPDK — Tarifeler ve Kurul Kararları
**Durum:** GÜNCEL (Değişiklik yok)

*   **Tarife Tabloları:** 1 Temmuz 2026'da yürürlüğe giren ve `tarifeler.md` dosyasında yer alan 4 Nisan 2026 bazlı tablolar geçerliliğini korumaktadır. Ekim 2026 başına kadar yeni bir ana tarife tablosu beklenmemektedir.
*   **Kurul Kararları:** Unvansız elektrik üretimi veya mahsuplaşma rejimini değiştirecek yeni bir kurul kararı tespit edilmemiştir.
*   **Serbest Tüketici Limiti:** 2026 yılı için belirlenen 500 kWh/yıl limiti güncelliğini korumaktadır.

---

## 2. Resmî Gazete — Mevzuat Takibi
**Durum:** DEĞİŞİKLİK VAR

22 Ağustos 2026 tarihli ve 33348 sayılı Resmî Gazete'de yayımlanan "Elektrik Piyasası Lisans Yönetmeliğinde Değişiklik Yapılmasına Dair Yönetmelik" ile depolama tesislerine ilişkin teknik tanımlarda güncelleme yapılmıştır. Ancak bu değişiklik **lisanssız (çatı GES)** üreticilerinin mahsuplaşma süreçlerini doğrudan etkilememektedir.

*   **Etkilenen kb dosyası:** `teknik-depolama.md` (Tanımlar kısmına küçük bir not eklenmiştir).
*   **Değişiklik:** Lisanslı depolama ünitelerinin yardımcı kaynak statüsü netleştirilmiştir.

---

## 3. EPİAŞ — PTF ve YEKDEM Gerçekleşmeleri
**Durum:** DEĞİŞİKLİK VAR (Aylık Veri Güncellemesi)

Temmuz 2026 ayı sonu verileri ve Ağustos 2026 (ilk 25 gün) PTF gerçekleşmeleri EPİAŞ Şeffaflık Platformu'ndan çekilmiştir. `piyasa-mahsuplasma.md` ve `piyasa-canli.json` dosyaları için güncel rakamlar:

| Parametre | Eski (Haziran 2026) | Yeni (Temmuz 2026 Kesinleşen) | Kaynak |
| :--- | :--- | :--- | :--- |
| **PTF Ortalama** | 1.845,20 ₺/MWh | **2.458,12 ₺/MWh** | EPİAŞ Şeffaflık (26.08.2026) |
| **YEKDEM Gerçekleşen** | 163,40 ₺/MWh | **395,20 ₺/MWh** | EPİAŞ Şeffaflık (26.08.2026) |
| **Güneş Saatleri PTF Ortalama (10:00-16:00)** | 1.120,50 ₺/MWh | **1.342,10 ₺/MWh** | EPİAŞ Analiz (26.08.2026) |

**Ağustos 2026 (Öncü Veri):**
*   **PTF Ortalama (1-25 Ağustos):** 2.712,45 ₺/MWh (KDV hariç).
*   **YEKDEM Öngörüsü (14718 sayılı Karar):** 450,45 ₺/MWh (KDV hariç).

*   **Etkilenen kb dosyası:** `piyasa-mahsuplasma.md` (Bölüm 1 ve 2 güncellendi).
*   **Analiz Notu:** Temmuz ayı YEKDEM gerçekleşmesi (395,20 ₺), EPDK'nın 14718 sayılı karardaki öngörüsünün (423,99 ₺) %6,8 altında kalmıştır. Bu durum, ikili anlaşması olan tüketicilerin Temmuz faturasında "YEKDEM farkı mahsubu" (alacak) görmesi anlamına gelir.

---

## 4. Özet Veri Tablosu (Hesap Motoru İçin)

| Parametre | Birim | Değer | KDV | Geçerlilik Dönemi |
| :--- | :--- | :--- | :--- | :--- |
| **Mesken K2 Aktif Enerji** | ₺/kWh | 1,895808 | Hariç | 01.07.2026 - 30.09.2026 |
| **Ticari Dağıtım Bedeli (AG)** | ₺/kWh | 2,479368 | Hariç | 01.07.2026 - 30.09.2026 |
| **Temmuz 2026 PTF (Kesin)** | ₺/MWh | 2.458,12 | Hariç | Temmuz 2026 |
| **Temmuz 2026 YEKDEM (Kesin)** | ₺/MWh | 395,20 | Hariç | Temmuz 2026 |
| **Ağustos 2026 YEKDEM (Tahmin)** | ₺/MWh | 450,45 | Hariç | Ağustos 2026 |

---

### Kaynaklar
1.  **EPDK Tarife Duyurusu:** [epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 26.08.2026)
2.  **Resmî Gazete (33348 Sayılı):** [resmigazete.gov.tr/eskiler/2026/08/20260822.htm](https://www.resmigazete.gov.tr) (Erişim: 26.08.2026)
3.  **EPİAŞ Şeffaflık Platformu:** [seffaflik.epias.com.tr/transparency/](https://seffaflik.epias.com.tr) (Erişim: 26.08.2026)
4.  **EPDK 14718 Sayılı Karar:** 04 Temmuz 2026 tarihli Resmî Gazete.