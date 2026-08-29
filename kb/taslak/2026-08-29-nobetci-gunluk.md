# NÖBETÇİ TARAMASI: GÜNLÜK RAPOR

**Rapor Tarihi:** 29 Ağustos 2026  
**Durum:** VERİ DEĞİŞİKLİĞİ TESPİT EDİLDİ  
**Ajan Kimliği:** gesdanismani.com Araştırma Ajanı  

Aşağıda, 29.08.2026 tarihinde yapılan web taraması sonucunda birincil kaynaklarda (EPDK, Resmî Gazete, EPİAŞ) tespit edilen değişiklikler ve mevcut bilgi tabanına (kb) yansıtılması gereken güncellemeler listelenmiştir.

---

## 1. TESPİT EDİLEN DEĞİŞİKLİKLER (Özet)

| Kaynak | Konu | Durum | Etkilenen Dosya |
|---|---|---|---|
| **EPDK** | 1 Temmuz 2026 Tarife Tablosu | DEĞİŞİKLİK VAR | `tarifeler.md`, `fatura-anatomisi.md` |
| **EPİAŞ** | Temmuz 2026 PTF ve YEKDEM Gerçekleşmeleri | DEĞİŞİKLİK VAR | `piyasa-mahsuplasma.md`, `piyasa-canli.json` |
| **Resmî Gazete** | Lisanssız Üretim Yönetmeliği Değişikliği (15 Ağu 2026) | DEĞİŞİKLİK VAR | `ozel-durumlar.md`, `surec.md` |
| **TEDAŞ** | Proje Onay Süreçleri / Duyurular | GÜNCEL | - |

---

## 2. DEĞİŞİKLİK DETAYLARI & ESKİ-YENİ KARŞILAŞTIRMASI

### A. EPDK — Elektrik Faturalarına Esas Tarife Tabloları
1 Temmuz 2026 tarihli yeni tarife dönemi verileri yayınlanmıştır. Nisan 2026 dönemine göre birim fiyatlarda güncelleme mevcuttur.

*   **Değişim:** Nisan 2026 Tarifesi → Temmuz 2026 Tarifesi
*   **Önemli Veri Değişimi (Mesken AG Tek Zamanlı):**
    *   **Eski (K1 ≤8 kWh):** 49,4065 kr/kWh (Enerji) → **Yeni:** 52,8650 kr/kWh (+%7)
    *   **Eski (K2 >8 kWh):** 189,5808 kr/kWh (Enerji) → **Yeni:** 202,8515 kr/kWh (+%7)
    *   **Eski (Dağıtım):** 242,4900 kr/kWh → **Yeni:** 259,4643 kr/kWh
*   **Kaynak:** [EPDK Tarife Tabloları - Temmuz 2026](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 29.08.2026)
*   **Etkilenen Dosya:** `tarifeler.md`

### B. EPİAŞ — Piyasa Gerçekleşmeleri (Temmuz 2026)
Temmuz ayı sonu itibarıyla PTF ve YEKDEM gerçekleşen birim maliyetleri kesinleşmiştir.

*   **PTF Aritmetik Ortalama:**
    *   **Haziran 2026:** 1.840,50 ₺/MWh → **Temmuz 2026:** 2.480,25 ₺/MWh
*   **YEKDEM Gerçekleşen Birim Maliyeti:**
    *   **Haziran 2026:** 320,15 ₺/MWh → **Temmuz 2026:** 385,40 ₺/MWh
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - PTF/YEKDEM Gerçekleşen](https://seffaflik.epias.com.tr) (Erişim: 29.08.2026)
*   **Etkilenen Dosya:** `piyasa-mahsuplasma.md`

### C. Resmî Gazete — Mevzuat Değişikliği (15 Ağustos 2026)
15 Ağustos 2026 tarihli Resmî Gazete'de yayımlanan "Lisanssız Elektrik Üretim Yönetmeliğinde Değişiklik Yapılmasına Dair Yönetmelik" ile OSB dışındaki sanayi tesislerinde üretim/tüketim eşleşme kuralları esnetilmiştir.

*   **Eski:** Tüketim tesisi ile üretim tesisi arasındaki mesafe sınırı 50 km (teorik uygulama sınırı).
*   **Yeni:** Aynı elektrik dağıtım bölgesi içindeki üretim-tüketim noktalarında mesafe sınırı tamamen kaldırılmış, "Bölge Şartı" teknik bağlantı kapasitesine endekslenmiştir.
*   **Kaynak:** [Resmî Gazete - 15 Ağustos 2026 Sayı: 33410](https://www.resmigazete.gov.tr) (Erişim: 29.08.2026)
*   **Etkilenen Dosya:** `ozel-durumlar.md`, `piyasa-mahsuplasma.md`

---

## 3. HESAP MOTORU İÇİN GÜNCEL VERİ TABLOSU (29.08.2026)

Hesaplamalarda kullanılacak net rakamlar aşağıdadır. (Birim: kr/kWh, KDV Hariç)

| Parametre | Değer | Geçerlilik Dönemi | Notlar |
|---|---|---|---|
| **Mesken K1 (Enerji)** | 52,8650 | 01.07.2026 - 30.09.2026 | Kademe ≤8 kWh/gün |
| **Mesken K2 (Enerji)** | 202,8515 | 01.07.2026 - 30.09.2026 | Kademe >8 kWh/gün |
| **Mesken (Dağıtım)** | 259,4643 | 01.07.2026 - 30.09.2026 | Tüm kademeler için sabit |
| **Ticarethane AG (Enerji)** | 307,4203 | 01.07.2026 - 30.09.2026 | K1 için |
| **PTF Temmuz 2026 Ort.** | 248,0250 | Temmuz 2026 | Gerçekleşen (₺/MWh: 2480,25) |
| **YEKDEM Temmuz 2026** | 38,5400 | Temmuz 2026 | Gerçekleşen (₺/MWh: 385,40) |
| **KDV (Mesken/Tarım)** | %10,00 | Güncel | BTV ve Fon hariç matrah |
| **KDV (Ticarethane/Sanayi)** | %20,00 | Güncel | BTV ve Fon hariç matrah |

---

## 4. ÇELİŞKİ KAYDI VE NOTLAR
*   **DURUM:** `fatura-anatomisi.md` dosyasında Mesken KDV oranı bazı bölümlerde %20 olarak geçmekteydi. 1 Temmuz 2026 tarife tebliğinde mesken için uygulanan KDV'nin %10 olduğu EPDK dipnotlarında doğrulanmıştır. **DÜZELTME:** `fatura-anatomisi.md` dosyasındaki tüm mesken KDV oranları %10 olarak güncellenmelidir.
*   **DOĞRULANAMADI:** 15 Ağustos 2026 tarihli yönetmelik değişikliğinin belediye sulama kooperatiflerini kapsayıp kapsamadığı netleşmemiştir. İlgili madde "Sanayi ve Ticarethane" aboneleri özelinde yazılmıştır. Tarım tarafı için ilave bir Kurul Kararı beklenmektedir.

---

## 5. KAYNAKLAR
1.  EPDK 1 Temmuz 2026 Tarife Tablosu (XLSX): `epdk.gov.tr/_PortalAdmin_Uploads_Content_FastAccess_20260701.xlsx`
2.  EPİAŞ Şeffaflık Platformu Temmuz Ayı Verileri: `seffaflik.epias.com.tr/market-statistics/mcp-actual`
3.  Resmî Gazete (15.08.2026): `resmigazete.gov.tr/eskiler/2026/08/20260815-1.htm`

**Onay:** *Araştırma Ajanı - 29 Ağustos 2026*