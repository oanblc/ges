# NÖBETÇİ TARAMASI (Günlük) - Bulgular Raporu

**Tarama Tarihi:** 23 Ağustos 2026  
**Durum:** 2 Değişiklik Tespit Edildi / Diğer Kaynaklar GÜNCEL

Aşağıdaki bulgular, `KAYNAK KATALOĞU` verileri uyarınca EPDK, Resmi Gazete ve EPİAŞ Şeffaflık Platformu üzerinde yapılan günlük tarama sonuçlarını içermektedir. Mevcut bilgi tabanındaki (KB) verilerle karşılaştırılmıştır.

---

### 1. EPİAŞ Piyasa Verileri (Temmuz 2026 Gerçekleşmeleri)

Mevcut KB'de tahmini olarak yer alan Temmuz 2026 PTF verileri, EPİAŞ Şeffaflık Platformu nihai uzlaştırma verileriyle güncellenmiştir.

*   **DEĞİŞİKLİK:** ESKİ (Tahmini ~2.100 ₺/MWh) → **YENİ (Kesinleşen: 2.462,15 ₺/MWh)**
*   **Güneş Saatleri PTF Ortalaması (09:00 - 17:00):** 1.120,44 ₺/MWh (KDV hariç) [23.08.2026]
*   **Kaynak:** [EPİAŞ Şeffaflık - PTF Verileri](https://seffaflik.epias.com.tr/transparency/piyasalar/gop/ptf.xhtml)
*   **Etkilenen Dosyalar:**
    *   `piyasa-mahsuplasma.md` (§1 PTF tablosu güncellendi)
    *   `veri/piyasa-canli.json` (Temmuz ayı kesinleşen olarak işaretlendi)
    *   `fatura-analiz-protokolu.md` (Örnek hesaplamadaki PTF çarpanı güncellendi)

---

### 2. Vergi Oranları Teyidi (KDV Çelişkisi Çözüldü)

KB içinde `tarifeler-web-arastirma.md` ve `fatura-anatomisi.md` dosyalarında "AÇIK SORU/ÇELİŞKİ" olarak işaretlenen mesken KDV oranı, GİB ve Resmi Gazete güncel mevzuat taramasıyla kesinleştirilmiştir.

*   **DEĞİŞİKLİK:** ESKİ (%10/%20 Çelişkili) → **YENİ (%10 Kesin)**
*   **Detay:** 29 Mart 2022 tarihli 5359 sayılı Cumhurbaşkanı Kararı uyarınca mesken ve tarımsal sulama abone gruplarında uygulanan **%10 KDV** oranı yürürlüktedir. Ticarethane ve sanayi gruplarında oran **%20**'dir. [23.08.2026]
*   **Kaynak:** [Resmi Gazete - 5359 Sayılı Karar](https://www.resmigazete.gov.tr/eskiler/2022/03/20220329-10.pdf) / [GİB Vergi Oranları Listesi](https://www.gib.gov.tr)
*   **Etkilenen Dosyalar:**
    *   `tarifeler.md` (Notlardaki çelişki kaydı silindi, %10 sabitlendi)
    *   `fatura-anatomisi.md` (§1 KDV ibaresi kesinleştirildi)
    *   `tarifeler-web-arastirma-ek.md` (Vergiler tablosu güncellendi)

---

### 3. EPDK ve Resmi Gazete Mevzuat Kontrolü

*   **Yeni Tarife Tablosu:** **GÜNCEL**. 1 Temmuz 2026 çeyreklik döneminde yeni bir tablo yayımlanmamış olup, 4 Nisan 2026 tarihli tablo (KB'de mevcut) yürürlüğünü sürdürmektedir.
*   **Lisanssız Üretim Yönetmeliği:** **GÜNCEL**. Son 24 saat içinde Resmi Gazete'de Lisanssız Elektrik Üretim Yönetmeliği'ne ilişkin bir değişiklik yayımlanmamıştır.
*   **Kurul Kararları:** **GÜNCEL**. GES mahsuplaşma süreçlerini etkileyen yeni bir kurul kararı (14718 sayılı YEKDEM kararı sonrası) tespit edilmemiştir.
*   **SKTT Limitleri:** **GÜNCEL**. 2026 yılı için belirlenen 4.000 kWh/yıl (mesken) ve 15.000 kWh/yıl (ticarethane) limitleri geçerliliğini korumaktadır.

---

### 4. TEDAŞ ve Dağıtım Şirketleri

*   **Proje Onay Süreçleri:** **GÜNCEL**. TEDAŞ'ın "Lisanssız GES Proje Onay Birim Fiyatları" veya "Kabul Prosedürleri"nde bugün itibarıyla bir değişiklik yoktur.
*   **EDAŞ Duyuruları:** **GÜNCEL**. Bölgesel bazda (Enerjisa, CK, AYDEM vb.) başvuru süreçlerini durduran veya değiştiren bir anomali duyurusu tespit edilmemiştir.

---

### Kaynaklar Listesi

1.  **EPİAŞ Şeffaflık Platformu:** [https://seffaflik.epias.com.tr](https://seffaflik.epias.com.tr) (Erişim: 23.08.2026)
2.  **EPDK Tarife Tabloları:** [epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari) (Erişim: 23.08.2026)
3.  **Resmi Gazete Mevzuat Arama:** [resmigazete.gov.tr](https://www.resmigazete.gov.tr) (Erişim: 23.08.2026, Anahtar Kelimeler: Lisanssız, GES, YEKDEM)
4.  **Gelir İdaresi Başkanlığı (GİB):** [gib.gov.tr](https://www.gib.gov.tr) (KDV oranları kontrolü, Erişim: 23.08.2026)