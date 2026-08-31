# NÖBETÇİ TARAMASI (Haftalık) - Bulgular Raporu

**Tarama Tarihi:** 31 Ağustos 2026  
**Tarama Kapsamı:** EPDK (Tarifeler, Kurul Kararları), Resmî Gazete (Mevzuat), EPİAŞ (PTF, YEKDEM Gerçekleşmeleri).

Aşağıdaki veriler birincil kaynaklardan (EPDK, EPİAŞ Şeffaflık Platformu, Resmî Gazete) doğrulanmış ve mevcut bilgi tabanı (KB) ile karşılaştırılmıştır.

---

### 1. EPDK Elektrik Faturalarına Esas Tarifeler
**Durum:** **GÜNCEL**
- **Tespit:** 1 Temmuz 2026 döneminde yayınlanan güncel bir tarife tablosu bulunmamaktadır. 4 Nisan 2026 tarihli tarife tablosu (Karar No: 12534) yürürlüğünü korumaktadır. Bir sonraki tarife dönemi 1 Ekim 2026'dır.
- **Kaynak:** [EPDK Tarife Tabloları](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 31.08.2026)
- **Etkilenen Dosya:** `tarifeler.md`, `tarifeler-web-arastirma-ek.md` (Değişiklik yok).

---

### 2. EPİAŞ Piyasa Verileri (Ağustos 2026 Sonu İtibarıyla)
**Durum:** **DEĞİŞİKLİK VAR**

| Parametre | Eski (KB Bilgisi) | Yeni (Gerçekleşen) | Kaynak / Not |
| :--- | :--- | :--- | :--- |
| **Ağustos 2026 PTF Ortalaması** | Belirlenmemiş / 2026 Oca-May: 1.645 ₺/MWh | **2.512,40 ₺/MWh** (KDV hariç) | [EPİAŞ Şeffaflık - PTF](https://seffaflik.epias.com.tr/market/dam/mcp) |
| **Temmuz 2026 YEKDEM (Gerçekleşen)** | Tahmini: 423,99 ₺/MWh (Karar 14718) | **418,90 ₺/MWh** (KDV hariç) | [EPİAŞ Şeffaflık - YEKDEM Birim Maliyeti](https://seffaflik.epias.com.tr/market/yekdem/unit-cost) |

- **Etkilenen Dosyalar:**
    - `piyasa-mahsuplasma.md`: Bölüm 1 (PTF) ve Bölüm 2 (YEKDEM) tablolarına Ağustos/Temmuz gerçekleşmeleri eklenecek.
    - `fatura-analiz-protokolu.md`: Örnek hesaplamalar Ağustos verisiyle güncellenecek.
    - `veri/piyasa-canli.json`: Yeni veri girişleri yapılacak.

---

### 3. Resmî Gazete ve Mevzuat Taraması
**Durum:** **GÜNCEL / KRİTİK NOT**
- **Lisanssız Üretim:** Son 7 gün içerisinde Lisanssız Elektrik Üretim Yönetmeliği'nde bir değişiklik yayımlanmamıştır.
- **YEKDEM Kararları:** Temmuz başında yayımlanan 14718 sayılı EPDK kararı dışında yeni bir revizyon bulunmamaktadır.
- **Kaynak:** [Resmî Gazete](https://www.resmigazete.gov.tr/) (Arama Terimleri: "Lisanssız", "EPDK", "Elektrik") (Erişim: 31.08.2026)
- **Etkilenen Dosya:** Değişiklik yok.

---

### 4. EPDK Kurul Kararları
**Durum:** **DEĞİŞİKLİK VAR (SKTT KBK Onayı)**

| Parametre | Eski (KB Bilgisi) | Yeni (Kesinleşen) | Kaynak |
| :--- | :--- | :--- | :--- |
| **SKTT KBK Katsayısı (2026)** | "Birincil kaynaktan TEYİT BEKLİYOR" | **1,0938** (KDV hariç) | EPDK Kurul Kararı (31.12.2025 tarihli kararın 2026 uygulama teyidi) |

- **Detay:** `ikili-anlasma-fiyatlama.md` dosyasındaki "teyit bekliyor" notu kaldırılarak 1,0938 değeri kesinleştirilmiştir.
- **Etkilenen Dosyalar:** `ikili-anlasma-fiyatlama.md`, `tarifeler-web-arastirma-ek.md`.

---

### Kaynaklar Listesi
1. **EPDK Tarife Arşivi:** [epdk.gov.tr/Detay/Icerik/3-1327/...](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 31.08.2026)
2. **EPİAŞ Şeffaflık Platformu:** [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr) (Ağustos 2026 PTF verisi, 31.08.2026)
3. **Resmî Gazete Fihristi:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (31.08.2026)
4. **EPDK Kurul Kararları:** [epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari](https://www.epdk.gov.tr/Detay/Icerik/3-0-1/kurul-kararlari) (31.08.2026)

> **Hesap Motoru Notu:** Ağustos 2026 PTF değeri olan **2.512,40 ₺/MWh** (2,5124 ₺/kWh) verisi, ikili anlaşma analizlerinde ve SKTT hesaplamalarında "Cari Ay PTF" parametresi olarak güncellenmelidir. KDV oranı mesken dışı gruplar için %20 olarak uygulanmaya devam etmektedir.