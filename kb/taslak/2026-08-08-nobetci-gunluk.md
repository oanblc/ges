# NÖBETÇİ TARAMASI — Günlük Kaynak Kontrolü

**Tarama tarihi:** 7 Ağustos 2026 (nöbetçi turu)
**Bilgi tabanı referans sürümü:** 6 Ağustos 2026 onay turu (21 dosya yayında)
**Kapsam:** Kaynak kataloğunda "Günlük (nöbetçi)" işaretli kalemler — EPDK duyuru akışı + kurul kararları, Resmî Gazete (lisanssız/elektrik/YEK anahtar kelimeleri), EPİAŞ son ay PTF/YEKDEM gerçekleşmeleri
**Yöntem:** Web araması (17 sorgu). EPDK/EPİAŞ portallarına doğrudan oturumlu erişim ve Şeffaflık Platformu API'si bu turda **kullanılamadı** → saatlik granülerlikteki veriler ikincil/aggregate kaynaklardan alındı ve öyle işaretlendi.

---

## 0. YÖNETİCİ ÖZETİ

| Alan | Sonuç |
|---|---|
| EPDK tarife tabloları | **GÜNCEL** — 4 Nisan 2026 tarifesi yürürlükte, yeni pencere açılmadı |
| EPDK YEKDEM kurul kararı | **GÜNCEL** — 14718 (02.07.2026) hâlâ en son karar |
| Lisanssız üretim / saatlik mahsup mevzuatı | **GÜNCEL** — 33212 (02.04.2026) + 33244/14531 (05.05.2026) hâlâ en son |
| EPİAŞ piyasa işleyiş duyuruları | **GÜNCEL** — yalnız rutin serbest tüketici liste duyuruları |
| **EPİAŞ PTF gerçekleşmeleri** | ⚠️ **1 DEĞİŞİKLİK** — Temmuz 2026 gerçekleşen PTF, kb'deki tahminden %30 sapıyor |
| Kapatılamayan boşluklar | 3 kalem (aşağıda "DOĞRULANAMADI") |

**Aksiyon gereken kb dosyası sayısı: 2** (`tarifeler-web-arastirma-ek.md`, `piyasa-mahsuplasma.md`) + 1 opsiyonel boşluk kaydı.

---

## 1. DEĞİŞİKLİK KAYDI (ESKİ → YENİ)

### D-01 · Temmuz 2026 gerçekleşen PTF — kb tahmini sapmış
**Önem: YÜKSEK** (hesap motorunda satış fiyatı ve ikili anlaşma teşhis eşiklerini besliyor)

| | Değer |
|---|---|
| **ESKİ (kb)** | "Temmuz 2026 ~2.000–2.100 ₺/MWh" — `tarifeler-web-arastirma-ek.md` §SKTT (tahmin/ileri projeksiyon) |
| **YENİ (gerçekleşen)** | **2.699,61 ₺/MWh** |
| Birim / kapsam | ₺/MWh, Gün Öncesi Piyasası (GÖP), **saatlik PTF'nin aritmetik ortalaması**, **KDV hariç**, vergi/fon hariç çıplak piyasa fiyatı |
| Geçerlilik dönemi | 1–31 Temmuz 2026 (kesinleşmiş ay ortalaması) |
| Sapma | kb üst bandına göre **+%28,6** |
| Kaynak | Montel News (EPİAŞ GÖP verisi aktarımı) — https://montelnews.com/tr/news/01d7a864-1e69-42ec-ac0d-a507b9c2b5dd/goep-te-temmuz-ay-ptf-ortalamas-2-69961-tl-mwh-oldu · erişim 7 Ağu 2026 |
| Kaynak sınıfı | **İKİNCİL** (birincil = EPİAŞ Şeffaflık Platformu "Dönemlik Fiyat Ortalamaları"; portal erişimi bu turda sağlanamadı) |
| **Etkilenen kb dosyaları** | `tarifeler-web-arastirma-ek.md` (§"2026 ilk 5 ay PTF ort."), `piyasa-mahsuplasma.md` (§1 PTF tablosu), `veri/piyasa-canli.json` (aylık seri) |

**Çapraz doğrulama — kb ile ÇAKIŞAN kayıtlar (düzeltme gerekmez, teyit oldu):**
- `fatura-analiz-protokolu.md` Adım 3'teki doğrulanmış örnek "PTF Tem **2,6996** ₺/kWh" → 2.699,61 ₺/MWh ile **birebir tutuyor ✓**. Yani protokol dosyası doğru, tarife araştırma dosyası eski tahmini taşıyor. **İç tutarsızlık tespit edildi ve şimdi çözüldü.**
- `ikili-anlasma-fiyatlama.md` §2'deki "2026 volatilitesi: Haz 1.240 → Tem 2.700 ₺/MWh" → Haziran 2026 **1.240,16 ₺/MWh** ile **tutuyor ✓** (aynı kaynak).

**Hesap motoruna aktarılacak net satır:**
```
PTF_aylik_ortalama:
  2026-06: 1240,16 ₺/MWh  (=1,24016 ₺/kWh, KDV hariç, GÖP aritmetik ort.)
  2026-07: 2699,61 ₺/MWh  (=2,69961 ₺/kWh, KDV hariç, GÖP aritmetik ort.)
  kaynak: EPİAŞ GÖP / Montel aktarımı · erişim 2026-08-07 · sınıf: İKİNCİL
```

**Türetilmiş (kendi hesabım — resmî değil):**
- Tem/Haz değişimi: **+%117,7**
- Temmuz 2025 (2.965,16 ₺/MWh) → Temmuz 2026: **−%9,0** (yıllık kıyas)
- 2026 Oca–Tem ağırlıksız aritmetik ortalama ≈ **1.738 ₺/MWh** *(Oca–May için kb'deki 1.645 tek değer olarak alındı; ay bazında ağırlıklandırılmamıştır — fizibilitede kullanılmamalı)*

---

## 2. GÜNCEL (değişiklik yok) — kaynak bazında

### 2.1 EPDK — Elektrik faturalarına esas tarife tabloları
**Durum: GÜNCEL.** 4 Nisan 2026 tarifesi yürürlükte; Temmuz penceresinde değişiklik yapılmadığı `tarifeler.md` içinde 7 Ağu 2026 itibarıyla zaten kayıtlı. Bu tur ek doğrulama getirdi: EPDK tarifeler sayfası, sistem güncellemesi gerekçesini "5 Nisan 2025 ve 4 Nisan 2026 tarihlerinde gerçekleşen tarife değişimleri" olarak tanımlıyor; yani **son tarife değişimi hâlâ 4 Nisan 2026**.
- Nisan artış oranları teyit edildi: nihai perakende satış fiyatlarında mesken **%25** (kb ile aynı).
- **Sonraki kritik pencere: 1 Ekim 2026.** `tarifeler.md` içindeki `sonraki_kontrol: 2026-10-01` alanı doğru.
- Kaynak: https://www.epdk.gov.tr/Detay/Icerik/3-0-1/tarifeler · https://uzmanpara.milliyet.com.tr/uzmanpara/elektrik-zammi-2026-nisanda-ne-kadar-oldu-elektrige-ne-kadar-zam-geldi-iste-yeni-tarife-7565631 · erişim 7 Ağu 2026

### 2.2 EPDK — YEKDEM öngörülen birim maliyet kararları
**Durum: GÜNCEL.** Kurul Kararı **14718 / 02.07.2026** (RG 04.07.2026, sayı 33300) hâlâ yürürlükteki en son karar; Ağustos ayında yeni revizyon **saptanmadı**.
- Temmuz **423,99** / Ağustos **450,45** ₺/MWh (KDV hariç, Tem–Ara 2026 uzlaştırma dönemleri) — `yekdem-kararlari.md` ile birebir örtüşüyor ✓
- Zincir teyidi: 14460 (04.04.2026, RG 33214) Temmuz için 189,15 öngörmüştü → 14718 ile 423,99'a çıkarıldı (**+%124**) ✓
- **Cari ay (Ağustos 2026) hesap girdisi:** 450,45 ₺/MWh = **0,45045 ₺/kWh**, KDV hariç, öngörü (gerçekleşen değil)
- Kaynak: https://www.enerjigunlugu.net/epdk-yekdem-maliyeti-tahminini-yeniden-yukseltti-68791h.htm · https://yesilekonomi.com/epdk-2026-yekdem-ongorusunu-revize-etti/ · https://www.iso.org.tr/duyurular/resmî-gazete/enerji-piyasasi-duzenleme-kurumunun-2026-yekdem-birim-maliyet-ongoruleri-guncellendi/ · erişim 7 Ağu 2026

### 2.3 Resmî Gazete — lisanssız / YEK anahtar kelimeleri
**Durum: GÜNCEL.** Ağustos 2026'da lisanssız üretim veya YEK mevzuatında yeni düzenleme **saptanmadı**. Yürürlükteki çıpalar doğrulandı:
- **RG 02.04.2026 / 33212** — Lisanssız Elektrik Üretim Yönetmeliğinde Değişiklik: ihtiyaç fazlası enerjiye sınır, **yıllık üretim ≤ 2× tüketim**, öz tüketim kurgusunun güçlendirilmesi ✓ (`piyasa-mahsuplasma.md` §3 ile uyumlu)
- **RG 05.05.2026 / 33244 — Kurul Kararı 30.04.2026/14531** — saatlik mahsuplaşma Usul ve Esasları ✓ (`ozel-durumlar.md` ile uyumlu)
- **Mesken muafiyeti teyitli:** mesken abone grubu saatlik mahsuplaşmadan muaf, aylık mahsuplaşmaya devam ediyor — bağımsız iki kaynakta doğrulandı. `sss-saha-taramasi.md` Mit-1 cevabı geçerliliğini koruyor ✓
- Kaynak: https://www.iso.org.tr/duyurular/resmî-gazete/elektrik-piyasasinda-lisanssiz-elektrik-uretim-yonetmeliginde-degisiklik-yapilmasina-dair-yonetmelik-yayimlandi/ · https://gensed.org/saatlik-mahsuplasma-duzenlemeleri-hakkinda/ · https://gesmetrik.com/ · erişim 7 Ağu 2026

### 2.4 EPİAŞ — duyurular / piyasa işleyişi
**Durum: GÜNCEL.** Ağustos 2026 duyuru akışında yalnızca **rutin** kalemler var: Temmuz 2026 dönemi serbest tüketici listelerinin yayımlanması + Ağustos talep döneminin açılması, Ağustos dönemi listeleri + Eylül talep dönemi. Piyasa işleyişini/uzlaştırmayı değiştiren duyuru saptanmadı.
- Not: Çoklu talep düzeltme son tarihi 21.07.2026 23:59 idi (geçti) — `ikili-anlasma-fiyatlama.md` §Tedarikçi değiştirme takvimiyle uyumlu, değişiklik yok.
- Kaynak: https://www.epias.com.tr/tum-duyurular/agustos-2026-donemi-serbest-tuketici-listelerinin-yayimlanmasi-ve-eylul-2026-talep-doneminin-acilmasi/ · erişim 7 Ağu 2026

---

## 3. DOĞRULANAMADI (bu turda kapatılamayan boşluklar)

| # | Kalem | Neden | Etki |
|---|---|---|---|
| B-01 | **Temmuz 2026 "güneş saatleri" PTF ortalaması** (10:00–16:00 bandı) | Saatlik seri yalnız EPİAŞ Şeffaflık Platformu'ndan alınabiliyor; portal/API erişimi yok. Aylık aritmetik ortalama (2.699,61) **bu amaçla kullanılamaz** | `piyasa-mahsuplasma.md` §1 "HESAP KURALI" için Temmuz değeri **boş kalıyor**. Mayıs–Haziran için kayıtlı ~520 ₺/MWh değeri Temmuz'a **taşınmamalı** (aylık ortalama 2,2× yükseldi) |
| B-02 | **Temmuz 2026 GERÇEKLEŞEN YEKDEM birim maliyeti** | EPDK/EPİAŞ gerçekleşen YEKDEM yayını bulunamadı; uzlaştırma takvimi gereği henüz yayımlanmamış olması muhtemel (DOĞRULANAMADI — varsayım) | `ikili-anlasma-fiyatlama.md` §"(+/-) Tutar" kaleminin Temmuz farkı hesaplanamıyor. Şimdilik öngörü 423,99 ₺/MWh kullanılmaya devam |
| B-03 | **Temmuz 2026 EPİAŞ aylık bülteni** (üretim mix, güneş payı) | Aylık bülten PDF'ine erişilemedi; yalnız 17.07.2026 tarihli günlük bülten ve 30.07.2026'ya kadar giden üçüncü taraf mix görselleştirmesi görüldü | `piyasa-canli.json` üretim mix alanı Temmuz için eksik |

**Uyarı:** B-01 ve B-02 kapatılmadan Temmuz 2026 dönemli **işletme faturası analizi** ve **saatlik mahsup satış geliri hesabı** tam yapılamaz. Kullanıcıya bu dönem için hesap verilirken "Temmuz güneş saatleri PTF'si henüz doğrulanmadı" ihtarı düşülmeli.

---

## 4. YAN BULGULAR (kb'de kayıtlı değil — Ozan onayına)

Nöbet taramasında, günlük kapsam dışı olmakla birlikte **kb'de karşılığı bulunmayan** iki düzenleme görüldü. Değişiklik değil, **boşluk** olarak kaydediyorum:

1. **Lisanslı tesisle aynı ölçüm noktası kuralı (RG 02.04.2026/33212 içinde):** Lisanslı üretim tesisi ile aynı ölçüm noktası üzerinden kurulan lisanssız tesislerde bağlantı/sistem kullanım anlaşmalarının **veriş yönünün sıfır olması** zorunlu kılınmış; amaç bu tesisleri şebekeye verişsiz öz tüketime özgülemek.
   → Önerilen hedef: `ozel-durumlar.md` veya `teknik-elektrik-altyapi.md`. **Birincil RG metniyle teyit şart** (kaynak ikincil: https://turkishlawblog.com/insights/detail/elektrik-piyasasinda-lisanssiz-elektrik-uretim-yonetmeliginde-degisiklik-yapildi).
2. **Elektrik Piyasası Bağlantı ve Sistem Kullanım Yönetmeliğinde Değişiklik (RG, ~24 Haziran 2026):** iletim tesislerine ilişkin güncelleme işlemlerinin **geçici kabulü 27/1/2026 ve sonrasında** onaylanan tesisler için yapılacağı düzenlenmiş. Çatı GES'i doğrudan etkilemiyor; düşük öncelik.
   → Kaynak (ikincil): https://www.enerjiekonomisi.com/elektrik-piyasasinda-yonetmelik-degisikligi/42692

---

## 5. ÖNERİLEN KB DÜZENLEMELERİ

| Dosya | Yapılacak | Öncelik |
|---|---|---|
| `tarifeler-web-arastirma-ek.md` | "Temmuz 2026 ~2.000–2.100 ₺/MWh" satırını **"Temmuz 2026 gerçekleşen: 2.699,61 ₺/MWh (GÖP aritmetik ort., KDV hariç)"** ile değiştir; tahmin/gerçekleşen ayrımını alan olarak ekle | YÜKSEK |
| `piyasa-mahsuplasma.md` | §1 PTF tablosuna `2026 Haz 1.240,16` ve `2026 Tem 2.699,61` satırlarını ekle; "2026 Oca–May 1.645" ifadesini "Oca–May" olarak sınırla | YÜKSEK |
| `veri/piyasa-canli.json` | Aylık PTF serisine Haz/Tem 2026 kaydı; `gunes_saatleri_ptf.2026-07 = null` + `durum: "DOĞRULANAMADI"` | YÜKSEK |
| `INDEKS.md` | Teyit listesine B-01/B-02 ekle | ORTA |
| `kaynaklar.md` | EPİAŞ Şeffaflık API hesabı açılışını "engelleyici" olarak yükselt — bu tur B-01/B-02/B-03'ün üçü de aynı nedenle kapanamadı | ORTA |

---

## 6. SONRAKİ NÖBET TAKVİMİ

- **Günlük:** RG (lisanssız/elektrik/YEK), EPDK duyuru akışı
- **~10–15 Ağu 2026:** EPİAŞ Temmuz aylık bülteni + gerçekleşen YEKDEM → B-01/B-02/B-03 kapatma denemesi
- **1 Ekim 2026:** EPDK çeyreklik tarife penceresi — yılın en kritik kontrolü (`tarifeler.md` tamamen yenilenebilir)
- **Kalıcı:** EPİAŞ Şeffaflık Platformu API kaydı (TGT) — elle tarama bu turda üç boşluk üretti

---

## Kaynaklar

**Birincil**
1. EPDK — Elektrik tarifeleri sayfası: https://www.epdk.gov.tr/Detay/Icerik/3-0-1/tarifeler · erişim 7 Ağu 2026
2. EPDK — Lisanssız Elektrik Üretim Yönetmeliği taslak/duyuru sayfası: https://www.epdk.gov.tr/Detay/Icerik/5-16233/elektrik-piyasasinda-lisanssiz-elektrik-uretim-yo · erişim 7 Ağu 2026
3. Mevzuat Bilgi Sistemi — Lisanssız Elektrik Üretim Yönetmeliği (güncel metin): https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=31502&MevzuatTur=7&MevzuatTertip=5 · erişim 7 Ağu 2026
4. EPİAŞ — Ağustos 2026 dönemi serbest tüketici duyurusu: https://www.epias.com.tr/tum-duyurular/agustos-2026-donemi-serbest-tuketici-listelerinin-yayimlanmasi-ve-eylul-2026-talep-doneminin-acilmasi/ · erişim 7 Ağu 2026
5. EPİAŞ — Spot elektrik piyasası / bültenler: https://www.epias.com.tr/spot-elektrik-piyasasi/ (son günlük bülten 04.08.2026) · erişim 7 Ağu 2026
6. EPİAŞ Raporlama Platformu — Dönemlik Fiyat Ortalamaları: https://rapor.epias.com.tr/rapor/xhtml/ptfSmfGunluk.xhtml · erişim 7 Ağu 2026 *(veri çekilemedi)*

**İkincil (işaretli kullanım)**
7. Montel News — GÖP Temmuz 2026 PTF ortalaması: https://montelnews.com/tr/news/01d7a864-1e69-42ec-ac0d-a507b9c2b5dd/goep-te-temmuz-ay-ptf-ortalamas-2-69961-tl-mwh-oldu
8. Enerji Günlüğü — 14718 sayılı YEKDEM revizyonu: https://www.enerjigunlugu.net/epdk-yekdem-maliyeti-tahminini-yeniden-yukseltti-68791h.htm
9. Yeşil Ekonomi — 14718 aylık değerler: https://yesilekonomi.com/epdk-2026-yekdem-ongorusunu-revize-etti/
10. İSO — 14460 / RG 33214 YEKDEM güncellemesi: https://www.iso.org.tr/duyurular/resmî-gazete/enerji-piyasasi-duzenleme-kurumunun-2026-yekdem-birim-maliyet-ongoruleri-guncellendi/
11. İSO — RG 33212 lisanssız yönetmelik değişikliği: https://www.iso.org.tr/duyurular/resmî-gazete/elektrik-piyasasinda-lisanssiz-elektrik-uretim-yonetmeliginde-degisiklik-yapilmasina-dair-yonetmelik-yayimlandi/
12. GENSED — 33244 / 14531 saatlik mahsuplaşma usul ve esasları: https://gensed.org/saatlik-mahsuplasma-duzenlemeleri-hakkinda/
13. Turkish Law Blog — 33212 madde analizi (yan bulgu 1): https://turkishlawblog.com/insights/detail/elektrik-piyasasinda-lisanssiz-elektrik-uretim-yonetmeliginde-degisiklik-yapildi
14. Enerji Ekonomisi — Bağlantı ve Sistem Kullanım Yönetmeliği değişikliği (yan bulgu 2): https://www.enerjiekonomisi.com/elektrik-piyasasinda-yonetmelik-degisikligi/42692
15. Uzmanpara/Milliyet — 4 Nisan 2026 tarife artış oranları: https://uzmanpara.milliyet.com.tr/uzmanpara/elektrik-zammi-2026-nisanda-ne-kadar-oldu-elektrige-ne-kadar-zam-geldi-iste-yeni-tarife-7565631
16. Yeşil Haber — Mart 2026 PTF 1.620,32 ₺/MWh: https://yesilhaber.net/epias-mart-2026-elektrik-piyasasi-raporu-ptf-1620/

**Kaynak sınıfı notu:** D-01'deki PTF rakamı ikincil kaynağa dayanıyor. Kural gereği birincil (EPİAŞ Şeffaflık) teyidi alınana kadar kb'ye `sinif: IKINCIL` etiketiyle yazılmalı; birincil teyit gelince etiket düşürülür. Birincil ile çelişirse ÇELİŞKİ KAYDI açılacak.