# NÖBETÇİ TARAMASI: Haftalık Bulgu Raporu

**Rapor Tarihi:** 17 Ağustos 2026  
**Tarama Periyodu:** 11 Ağustos 2026 – 17 Ağustos 2026  
**Uzman:** gesdanismani.com Araştırma Ajanı  

---

## 1. EPDK Mevzuat ve Karar Taraması
*Kaynak: [epdk.gov.tr - Kurul Kararları](https://www.epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari)*

*   **Tarife Tabloları:** 4 Nisan 2026 tarihli tablo halen yürürlüktedir. 1 Temmuz çeyreklik döneminde bir değişiklik yapılmadığı ve Ağustos ayı içinde ek bir tarife kararı yayımlanmadığı teyit edilmiştir.  
    **Durum:** **GÜNCEL** (Etkilenen dosya: `tarifeler.md`, `tarifeler-web-arastirma-ek.md`)
*   **SKTT Limitleri:** 2026 yılı için belirlenen limitlerde (Mesken 4.000 kWh/yıl) yeni bir Kurul Kararı saptanmadı.  
    **Durum:** **GÜNCEL** (Etkilenen dosya: `ikili-anlasma-fiyatlama.md`)
*   **Lisanssız Üretim Yönetmeliği:** Resmî Gazete ve EPDK duyurularında 11-17 Ağustos haftasında Lisanssız Elektrik Üretim Yönetmeliği’ne ilişkin bir değişiklik saptanmadı.  
    **Durum:** **GÜNCEL** (Etkilenen dosya: `ozel-durumlar.md`, `piyasa-mahsuplasma.md`)

---

## 2. EPİAŞ Piyasa Verileri Taraması
*Kaynak: [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr)*

### 2.1. PTF (Piyasa Takas Fiyatı) Gerçekleşmeleri
Temmuz 2026 ayına ait kesinleşmiş PTF verileri sisteme girilmiştir.

*   **Değişiklik:** Temmuz 2026 PTF ortalaması eklendi.
*   **ESKİ:** 2026 Oca–May ortalama: 1.645 ₺/MWh
*   **YENİ:** **2026 Temmuz Aritmetik Ortalama PTF: 2.850,12 ₺/MWh** (KDV hariç)  
    *Güneş Saatleri (10:00-16:00) Ortalaması: 1.120,40 ₺/MWh*
*   **Kaynak:** [EPİAŞ Şeffaflık - PTF](https://seffaflik.epias.com.tr/electricity/market-operation/mcp) (Erişim: 17.08.2026)
*   **Etkilenen KB Dosyası:** `piyasa-mahsuplasma.md` (§1), `veri/piyasa-canli.json`

### 2.2. YEKDEM Birim Maliyeti Gerçekleşmeleri
Temmuz 2026 dönemi gerçekleşen YEKDEM birim maliyeti açıklandı.

*   **Değişiklik:** Tahmini değerden gerçekleşen değere geçiş.
*   **ESKİ (Tahmin):** 423,99 ₺/MWh (Karar 14718)
*   **YENİ:** **2026 Temmuz Gerçekleşen YEKDEM Birim Maliyeti: 312,45 ₺/MWh** (KDV hariç)
*   **Kaynak:** [EPİAŞ Şeffaflık - YEKDEM Birim Maliyeti](https://seffaflik.epias.com.tr/electricity/renewable-support-mechanism/unit-cost) (Erişim: 17.08.2026)
*   **Etkilenen KB Dosyası:** `yekdem-kararlari.md` (§2), `piyasa-mahsuplasma.md` (§2)

---

## 3. Resmî Gazete Taraması
*Kaynak: [resmigazete.gov.tr](https://www.resmigazete.gov.tr)*

*   **Arama Terimleri:** "Lisanssız", "YEKDEM", "Güneş", "EPDK"
*   **Bulgu:** 14 Ağustos 2026 tarihli Resmî Gazete'de yayımlanan 14815 sayılı EPDK Kararı ile hibrit tesislerdeki depolama ünitelerine ilişkin teknik bir düzenleme yapılmıştır ancak bu düzenleme **Çatı GES / Lisanssız Üretim** kapsamındaki "aylık/saatlik mahsuplaşma" süreçlerini doğrudan etkilememektedir.
*   **Durum:** **GÜNCEL** (KB değişikliği gerektirmiyor).

---

## 4. EDAŞ ve TEDAŞ Taraması
*Kaynak: [tedas.gov.tr](https://www.tedas.gov.tr), Dağıtım Şirketleri Duyuru Sayfaları*

*   **Bulgu:** Bölgesel kapasite haritalarında (lisanssız GES için trafo kapasiteleri) Ağustos ayı ortası güncellemeleri yayımlanmaya başlanmıştır. Ancak KB'deki genel rehber ilkeleri değiştirecek bir "kapasite durdurma" veya "yeni kısıt" kararı saptanmadı.
*   **Durum:** **GÜNCEL** (Etkilenen dosya: `dagitim-sirketleri.md`, `teknik-elektrik-altyapi.md`)

---

## 5. Özet Tablo ve Aksiyon Listesi

| KB Dosyası | Alan / Satır | Mevcut Bilgi | Yeni Bilgi | Kaynak / Tarih |
|---|---|---|---|---|
| `piyasa-mahsuplasma.md` | §1 PTF Tablosu | Oca–May 1.645 ₺/MWh | Temmuz: 2.850,12 ₺/MWh | EPİAŞ (17.08.2026) |
| `piyasa-mahsuplasma.md` | §2 YEKDEM | Temmuz Tahmin 423,99 | Temmuz Gerçek: 312,45 ₺/MWh | EPİAŞ (17.08.2026) |
| `yekdem-kararlari.md` | §2 Tablo | Temmuz Tahmin 423,99 | Temmuz Gerçekleşen: 312,45 | EPİAŞ (17.08.2026) |

**DOĞRULANAMADI:** Ağustos 2026 PTF ortalaması henüz ay tamamlanmadığı için kesinleşmemiştir; günlük veriler akmaya devam etmektedir.

---
### Kaynaklar Listesi
1.  EPİAŞ Şeffaflık Platformu, "Gün Öncesi Piyasası - PTF", 17 Ağustos 2026 erişimli.
2.  EPİAŞ Şeffaflık Platformu, "YEKDEM Birim Maliyetleri", 17 Ağustos 2026 erişimli.
3.  Resmî Gazete Arşivi (11-17 Ağustos 2026), resmigazete.gov.tr.
4.  EPDK Kurul Kararları Veritabanı, epdk.gov.tr.