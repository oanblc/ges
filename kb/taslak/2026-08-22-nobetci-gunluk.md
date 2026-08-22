# Nöbetçi Taraması Sonuç Raporu (Günlük)

**Güncelleme Tarihi:** 22 Ağustos 2026, 08:20  
**Tarama Kapsamı:** EPDK Duyuruları/Kurul Kararları, Resmî Gazete (Lisanssız Üretim/YEK), EPİAŞ Şeffaflık Platformu (Temmuz 2026 Gerçekleşmeleri).

---

## 1. EPDK ve Tarife Tabloları
*   **Elektrik faturalarına esas tarife tabloları:** **GÜNCEL**. 1 Temmuz 2026 çeyreklik döneminde yeni tarife yayımlanmamış olup, 4 Nisan 2026 tarihli tablo (Karar No: 12534) geçerliliğini korumaktadır.
*   **Duyurular ve Kurul Kararları (11 - 22 Ağustos):** **GÜNCEL**. Lisanssız üretim yönetmeliği veya mahsuplaşma esaslarını değiştiren yeni bir kurul kararı tespit edilmedi.

## 2. Resmî Gazete Taraması
*   **Lisanssız Üretim / YEK Mevzuatı:** **GÜNCEL**. Son 11 gün içerisinde "lisanssız elektrik", "YEKDEM" veya "saatlik mahsuplaşma" anahtar kelimelerinde bir yönetmelik değişikliği veya CB Kararı yayımlanmamıştır.

## 3. EPİAŞ Piyasa Gerçekleşmeleri (Değişiklik Kaydı)
Temmuz 2026 ayı sonu itibarıyla kesinleşen PTF ve YEKDEM verileri, bilgi tabanındaki "öngörü" ve "Mayıs sonu" verileriyle güncellenmelidir.

### **DEĞİŞİKLİK 1: PTF Gerçekleşmeleri**
*   **ESKİ:** 2026 Oca–May Ortalaması: 1.645 ₺/MWh (1,645 ₺/kWh)
*   **YENİ:** 2026 Temmuz Ayı Ortalaması: **2.748,12 ₺/MWh (2,748 ₺/kWh)**
*   **Kaynak:** [EPİAŞ Şeffaflık Platformu - PTF Özet](https://seffaflik.epias.com.tr/transparency/mcp/mcp.xhtml) (Erişim: 22.08.2026)
*   **Etkilenen Dosya:** `piyasa-mahsuplasma.md` (§1 PTF tablosu), `fatura-analiz-protokolu.md` (§Adım 3 doğruluğu).

### **DEĞİŞİKLİK 2: YEKDEM Birim Maliyeti Gerçekleşmesi**
*   **ESKİ:** Temmuz 2026 Öngörüsü (Karar 14718): 423,99 ₺/MWh (0,424 ₺/kWh)
*   **YENİ:** Temmuz 2026 Gerçekleşen Birim Maliyet: **412,15 ₺/MWh (0,412 ₺/kWh)**
*   **Kaynak:** [EPİAŞ Şeffaflık - YEKDEM Birim Maliyetleri](https://seffaflik.epias.com.tr/transparency/yekdem/birim-maliyeti.xhtml) (Erişim: 22.08.2026)
*   **Etkilenen Dosya:** `piyasa-mahsuplasma.md` (§2 YEKDEM), `yekdem-kararlari.md` (§2 karşılaştırma sütunu).

---

## 4. Güncel Veri Matrisi (Hesap Motoru İçin)

| Parametre | Birim | KDV Hariç Değer | Geçerlilik Dönemi | Kaynak |
|---|---|---|---|---|
| Mesken K2 Aktif Enerji | ₺/kWh | 1,8958 | 4 Nisan 2026 - Devam | EPDK |
| Mesken Dağıtım Bedeli | ₺/kWh | 2,4249 | 4 Nisan 2026 - Devam | EPDK |
| Temmuz PTF (Gerçekleşen) | ₺/MWh | 2.748,12 | Temmuz 2026 | EPİAŞ |
| Temmuz YEKDEM (Gerçekleşen) | ₺/MWh | 412,15 | Temmuz 2026 | EPİAŞ |
| Ağustos YEKDEM (Öngörü) | ₺/MWh | 450,45 | Ağustos 2026 | EPDK (14718) |

---

## 5. Çelişki Kaydı ve Notlar
1.  **KDV Oranı:** `tarifeler-web-arastirma.md` dosyasındaki mesken KDV %10/%20 çelişkisi devam etmektedir. Maliye Bakanlığı'nın 2024 sonrası genel KDV artışına rağmen bazı faturalarda mesken indiriminin korunduğu görülmektedir. **DOĞRULANAMADI** işareti korunmalı, kullanıcıdan fatura örneği istenmelidir.
2.  **LÜ-2 Dağıtım Bedeli:** 10 yılını dolduran tesisler için uygulanan 0,6560 ₺/kWh bedeli Temmuz tarife dönemi değişmediği için sabit kalmıştır.

### Kaynaklar
1.  EPDK Tarife Tabloları (4 Nisan 2026): [epdk.gov.tr/.../3-1327](https://www.epdk.gov.tr/Detay/Icerik/3-1327/elektrik-faturalarina-esas-tarife-tablolari)
2.  EPİAŞ Şeffaflık Platformu (PTF ve YEKDEM Temmuz 2026): [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr)
3.  Resmî Gazete Mevzuat Arama (11-22 Ağustos): [resmigazete.gov.tr](https://www.resmigazete.gov.tr)