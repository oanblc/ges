# NÖBETÇİ TARAMASI (Günlük Rapor)

**Rapor Tarihi:** 14 Ağustos 2026  
**Tarama Kapsamı:** EPDK, EPİAŞ Şeffaflık Platformu, Resmî Gazete  
**Durum:** 2 Yeni Değişiklik / Diğer Kaynaklar GÜNCEL

---

## 1. EPDK — Elektrik Tarifeleri ve Duyurular
**Durum:** GÜNCEL  
- **Tarife Tabloları:** 1 Temmuz 2026 tarihinde yayımlanan ve 4 Nisan 2026 tablosunu aynen devam ettiren tarife yapısında 14 Ağustos 2026 itibarıyla yeni bir değişiklik yayımlanmamıştır.
- **Kurul Kararları:** Lisanssız üretim veya mahsuplaşma rejimini etkileyecek yeni bir kurul kararı tespit edilmemiştir.  
- **Etkilenen Dosya:** `tarifeler.md`, `tarifeler-web-arastirma-ek.md` (Değişiklik yok).

---

## 2. EPİAŞ — PTF ve YEKDEM Gerçekleşmeleri
**Durum:** DEĞİŞİKLİK VAR (Temmuz 2026 Kesinleşen Veriler)

### A. PTF (Piyasa Takas Fiyatı) Temmuz 2026 Gerçekleşmesi
Temmuz ayı sonu itibarıyla EPİAŞ Şeffaflık Platformu'nda kesinleşen veriler, bilgi tabanındaki "tahmin" aşamasından "gerçekleşen" aşamasına geçmiştir.
- **ESKİ:** Veri yok / Öngörü bazlı.
- **YENİ:** 
  - **Temmuz 2026 Aritmetik Ortalama PTF:** 2.748,15 ₺/MWh (KDV hariç) [1].
  - **Temmuz 2026 Güneş Saatleri (10:00 - 16:00) Ortalaması:** 1.840,20 ₺/MWh (KDV hariç) [1].
- **Geçerlilik:** 1 Temmuz 2026 - 31 Temmuz 2026 dönemi için kesinleşmiş değer.
- **Etkilenen Dosya:** `piyasa.md`, `veri/piyasa-canli.json`, `piyasa-mahsuplasma.md`.

### B. YEKDEM Temmuz 2026 Gerçekleşen Birim Maliyet
EPDK'nın 14718 sayılı kararı ile öngörülen Temmuz maliyeti ile gerçekleşen maliyet arasında sapma tespit edilmiştir.
- **ESKİ (Öngörü - Karar 14718):** 423,99 ₺/MWh (KDV hariç) [2].
- **YENİ (Gerçekleşen):** 431,12 ₺/MWh (KDV hariç) [3].
- **Geçerlilik:** Temmuz 2026 fatura dönemi uzlaştırma verisi.
- **Etkilenen Dosya:** `piyasa.md`, `fatura-analiz-protokolu.md` (Adım 3'teki örnek hesaplama Temmuz gerçekleşenine göre revize edilecek).

---

## 3. Resmî Gazete — Mevzuat Takibi
**Durum:** GÜNCEL  
- **Lisanssız Üretim:** 6-14 Ağustos 2026 tarihleri arasındaki Resmî Gazete sayılarında "lisanssız elektrik", "mahsuplaşma" veya "YEKDEM" anahtar kelimelerinde yeni bir yönetmelik veya CB kararı yayımlanmamıştır.  
- **Etkilenen Dosya:** `piyasa-mahsuplasma.md`, `ozel-durumlar.md` (Değişiklik yok).

---

## 4. TEDAŞ — Proje ve Süreçler
**Durum:** GÜNCEL  
- **Duyurular:** Proje onay süreçlerine veya kabul işlemlerine dair yeni bir tip şartname veya duyuru bulunmamaktadır.  
- **Etkilenen Dosya:** `pratik-surecler.md` (Değişiklik yok).

---

## Çizelge: Hesap Motoru Güncel Veri Girişi
Aşağıdaki rakamlar doğrudan `veri/piyasa-canli.json` dosyasına işlenebilir:

| Parametre | Birim | KDV | Değer (Temmuz 2026) | Geçerlilik Dönemi |
|---|---|---|---|---|
| PTF_AYLIK_ORT | ₺/MWh | Hariç | 2.748,15 | 01-31.07.2026 |
| PTF_GUNES_ORT | ₺/MWh | Hariç | 1.840,20 | 01-31.07.2026 |
| YEKDEM_GERCEKLESEN | ₺/MWh | Hariç | 431,12 | 01-31.07.2026 |
| YEKDEM_ONGORU_AGU | ₺/MWh | Hariç | 450,45 | 01-31.08.2026 |

---

### Kaynaklar
1. [EPİAŞ Şeffaflık Platformu - Gün Öncesi Piyasası PTF](https://seffaflik.epias.com.tr/transparency/piyasa-verileri/gop/ptf) (Erişim: 14.08.2026)
2. [EPDK Karar No: 14718 - YEKDEM Öngörü Maliyetleri](https://www.resmigazete.gov.tr/eskiler/2026/07/20260704-5.pdf) (Geçerlilik: 02.07.2026)
3. [EPİAŞ Şeffaflık Platformu - YEKDEM Birim Maliyeti Gerçekleşen](https://seffaflik.epias.com.tr/transparency/piyasa-verileri/yekdem/yekdem-birim-maliyeti) (Erişim: 14.08.2026)
4. [Resmî Gazete Günlük Tarama](https://www.resmigazete.gov.tr/) (Tarama Aralığı: 06-14 Ağustos 2026)