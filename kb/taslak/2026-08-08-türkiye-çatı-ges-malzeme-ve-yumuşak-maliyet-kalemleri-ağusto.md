> DURUM: İŞLENDİ (8 Ağu 2026, Ozan onayı) — özet kb/ikili-anlasma-fiyatlama.md ve kb/ekipman-fiyatlar.md'ye aktarıldı.

Araştırmaya başlıyorum. Önce güncel tarihi ve piyasa verilerini kontrol edeyim.Bugün 8 Ağustos 2026. Şimdi kalem kalem güncel fiyat araştırması yapıyorum.# Türkiye Çatı GES — Malzeme + Yumuşak Maliyet Kalemleri Fiyat Raporu

**Güncelleme tarihi:** 8 Ağustos 2026
**Kapsam:** Çatı üstü lisanssız GES (konut 5–10 kW / ticari 100 kW), Türkiye
**Para birimi / vergi esası:** TL, aksi belirtilmedikçe **KDV hariç**
**Hazırlayan:** gesdanismani.com bilgi tabanı — piyasa araştırma modülü

---

## 0. ÖNCE DÜRÜSTLÜK NOTU — Doğrulama Durumu

Bu tarama turunda **kalemlerin bir kısmı için birincil/güncel (Ağustos 2026) fiyat kaynağı bulunamadı.** Kural gereği bunlar uydurulmadı, **DOĞRULANAMADI** olarak işaretlendi ve yerlerine yalnızca *doğrulanmış üst-toplam çıpadan türetilmiş bütçe zarfı* konuldu (türetme yöntemi açıkça yazıldı).

| Güven kodu | Anlamı |
|---|---|
| **[D]** | Kaynaklı, tarihli, doğrudan alıntılanabilir rakam |
| **[T]** | Doğrulanmış bir çıpadan **türetilmiş** (aritmetiği gösterilmiş) rakam |
| **[DOĞRULANAMADI]** | Bu turda kaynak bulunamadı — hesap motoruna **girilmemeli**, teklifle beslenmeli |

**Kalem bazında durum:**

| # | Kalem | Durum |
|---|---|---|
| 1 | Konstrüksiyon ₺/kW veya ₺/panel (kiremit/trapez/balast) | **[DOĞRULANAMADI]** — ürün sayfaları var, **güncel TL birim fiyat açık değil** |
| 2 | DC pano / T1+T2 parafudr / AC pano / topraklama seti | **[DOĞRULANAMADI]** — ürün ve standart doğrulandı, **TL fiyat doğrulanamadı** |
| 3 | DC solar kablo 6 mm² ₺/m | **[D] kısmen** — iki farklı kaynak çelişiyor (aşağıda) |
| 4a | TEDAŞ/EDAŞ proje onay–kabul, işlem bedeli | **[D]** — EPDK 2026 kararı doğrulandı |
| 4b | SMM elektrik proje ücreti (EMO) | **[D] çerçeve** / **[DOĞRULANAMADI] tutar** |
| 4c | Statik rapor ücreti | **[DOĞRULANAMADI]** |
| 4d | Çift yönlü sayaç bedeli | **[DOĞRULANAMADI]** |
| 5 | Nakliye / vinç | **[DOĞRULANAMADI]** |
| 6a | 580–625 W TOPCon panel perakende | **[D]** — 1 doğrudan liste fiyatı bulundu |
| 6b | 5–110 kW inverter perakende | **[DOĞRULANAMADI]** — bu turda fiyat listesi çekilemedi |
| — | Anahtar teslim EPC çıpası (50 kW–1 MW) | **[D]** — Nisan–Mayıs 2026 tarihli |

> ⚠️ **Hesap motoru uyarısı:** DOĞRULANAMADI işaretli kalemler motora "sabit fiyat" olarak yazılmamalı; **zorunlu kullanıcı girişi (required input)** alanı olarak açılmalıdır. Aksi halde motor uydurma çıktı üretir.

---

## 1. ÜST-TOPLAM ÇIPA (Top-down doğrulama zemini) **[D]**

Bir malzeme listesi ancak anahtar teslim toplamla tutarlıysa güvenilirdir. Elimizdeki en güncel tarihli anahtar teslim referansı:

| Güç | Anahtar teslim EPC (KDV hariç) | ₺/kW **[T]** |
|---|---|---|
| 50 kW | 2.025.000 TL | 40.500 |
| **100 kW** | **3.150.000 TL** | **31.500** |
| 250 kW | 6.000.000 TL | 24.000 |
| 500 kW | 12.825.000 TL | 25.650 |
| 1 MW | 22.500.000 TL | 22.500 |

*Kaynak: Azimut Solar Enerji — "GES Kurulum Maliyeti 2026", sanayi anahtar teslim EPC, belirtilen geçerlilik: **Nisan–Mayıs 2026**, KDV hariç (sayfa güncelleme: 20 Haziran 2026).*

**Kritik okuma notları (motor için uyarı bayrakları):**
- Bu bir **sanayi/anahtar teslim** listesidir; konut çatısı **değildir**. Konutta ₺/kW daha yüksektir.
- Seri **monoton değil**: 250 kW = 24.000 ₺/kW iken 500 kW = 25.650 ₺/kW. Yani liste ölçek eğrisi olarak birebir güvenilir değil → motorda **enterpolasyon yapılmamalı**, yalnızca noktasal referans olarak kullanılmalı.
- Geçerlilik dönemi **Nisan–Mayıs 2026**; rapor tarihi **Ağustos 2026**. Arada ~3 ay var → **kur ve bakır (LME) kaynaklı sapma riski var.**

**Konut tarafı ikinci çıpa [D]:** 2026 yılı için konut çatı GES'in ~90.000 TL'den başladığı, ticari/endüstriyel projelerin 350.000 TL'yi aşabildiği belirtiliyor (Power Enerji, "Solar Çatı GES Fiyatları 2026"). ⚠️ Bu **giriş fiyatı** ifadesidir, kW belirtilmemiştir → hesap motorunda **kullanılamaz**, sadece pazarlama alt sınırı olarak not düşülmelidir.

---

## 2. KONSTRÜKSİYON / MONTAJ RAY SİSTEMİ

### 2.1 Doğrulanan teknik veri **[D]**

| Bileşen | Doğrulanan spesifikasyon | Kaynak / tarih |
|---|---|---|
| Montaj rayı | MX montaj rayı, kesit **55×80 mm**, malzeme **EN-AW 6063**, sertlik **T6**, fiyatlandırma birimi **1 metre** | Solarmerkezi – Konstrüksiyon kategorisi (erişim 08.08.2026) |
| Kiremit kancası | Kiremit **delmeden**, kiremit altı kenetleme + EPDM contalı; çatı membranına zarar vermeyen sistem | Solardepo – Kiremit çatı konstrüksiyonu (erişim 08.08.2026) |
| Konstrüksiyon malzemesi | Çatı ve arazide **alüminyum** tercih ediliyor; panel çerçeve cıvata deliği yerine **sigma profil + kelepçe sıkıştırma** tercih ediliyor, cıvatalar tork değerine göre sıkılmalı | Solarfırsat (erişim 08.08.2026) / Munda Solar (erişim 08.08.2026) |
| Aparat seti kalemleri | Alüminyum orta tutucu, sonlandırıcı, kiremit kancası, alüminyum ray profil | Power Enerji – Montaj aparatları 2026 |

### 2.2 Fiyat durumu — **DOĞRULANAMADI**

- **Ray ₺/m:** Ürün sayfası "1 mt fiyatıdır" diyor ancak **TL tutar bu taramada okunamadı** → **DOĞRULANAMADI**.
- **Kelepçe:** Bir listede "Cam Film Solar Panel Kenar Kelepçe 8 cm – 8,00 / 20 cm – 13,00" ve "Orta Kelepçe 8 cm – 9,00 / 20 cm – 15,00" görülüyor. ⚠️ **Para birimi, KDV durumu ve tarih belirsiz; ayrıca bu ürün cam-cam (framesiz) panellere özel olup çerçeveli TOPCon panelde KULLANILAMAZ** (kaynak aynı sayfada bunu açıkça belirtiyor). → **Hesap motoruna GİRİLMEMELİ.**
- **Kiremit kancası ₺/adet:** **DOĞRULANAMADI**
- **Trapez (sandviç panel) bağlantı elemanı ₺/adet:** **DOĞRULANAMADI**
- **Balast (düz çatı ağırlıklı sistem) ₺/kW veya ₺/adet:** **DOĞRULANAMADI** — hiçbir güncel Türkiye kaynağı bulunamadı. Düz çatının "ek konstrüksiyon gerektirdiği" niteliksel olarak doğrulandı (Azimut Solar, 2026), tutar doğrulanmadı.

### 2.3 Metraj formülleri **[T] — fiyattan bağımsız, güvenle kullanılabilir**

Bunlar geometriden türetilir, fiyat değil; motora sabit olarak girilebilir.

Panel: ~2.278 × 1.134 mm (580–625 W TOPCon tipik). **Dikey (portrait) montaj, 2 yatay ray:**

```
ray_uzunlugu_m      = panel_adedi × panel_genisligi_m × 2
                    ≈ panel_adedi × 1,134 × 2 ≈ panel_adedi × 2,27 m
orta_kelepce_adet   = (sıra_basina_panel - 1) × 2 × sıra_sayisi
son_kelepce_adet    = 4 × sıra_sayisi
kiremit_kancasi     = 4 adet/panel (rüzgâr/kar bölgesine göre 3–5)
trapez_baglanti     = 4 adet/panel (mini-ray veya L-bağlantı)
ray_ek_parcasi      = ray_uzunlugu_m / 4,4 m (standart boy) × 1 adet
```

**Örnek çıktı:**
| Sistem | Panel adedi (600 W) | Ray metrajı [T] | Kanca/bağlantı [T] |
|---|---|---|---|
| Konut 5 kW | 9 (5,4 kWp) | ~20,5 m | 36 ad |
| Konut 10 kW | 17 (10,2 kWp) | ~38,6 m | 68 ad |
| Ticari 100 kW | 167 (100,2 kWp) | ~379 m | 668 ad |

---

## 3. DC PANO + T1+T2 PARAFUDR + AC PANO + TOPRAKLAMA/PARATONER

### 3.1 Doğrulanan teknik/ürün verisi **[D]**

| Kalem | Doğrulanan bilgi | Kaynak / tarih |
|---|---|---|
| DC parafudr (yüksek gerilimli string) | Raycap **PROTEC T1 PV** ve **PROTEC T2 PV**, 1100 V ve **1500 V** DC sürekli gerilim seçenekleri; T1 serisi yıldırıma karşı da koruma sağlıyor | Yılkomer, 27.06.2021 ⚠️ **eski tarihli — fiyat için kullanılamaz** |
| AC parafudr | Legrand **T1+T2 100 kA 3P+N + SD** — hem yıldırım (T1) hem anahtarlama/iç kaynaklı aşırı gerilim (T2) koruması | Star Akım (erişim 08.08.2026) |
| Mevzuat/poz karşılığı | Pano tipi aşırı gerilim koruyucular birim fiyat tarifinde **eski poz 718.560 / yeni poz 35.115.2100** altında | Trimbox (erişim 08.08.2026) |
| Sistem bileşen listesi | Şebeke bağlı sistemin tipik parçaları: panel, inverter, **pano elemanları**, kablo–konnektör, mekanik konstrüksiyon, yıllık bakım | Munda Solar (erişim 08.08.2026) |

### 3.2 Fiyat durumu — **DOĞRULANAMADI**

Konut 5–10 kW ve ticari 100 kW için **DC pano seti, AC pano seti, topraklama seti ve paratoner seti TL fiyatlarının hiçbiri** bu taramada doğrulanabilir bir güncel kaynakla eşleştirilemedi.

**→ Motora girilecek şey: fiyat değil, KAPSAM LİSTESİ.** Aşağıdaki liste teklif karşılaştırması ve eksik-kalem denetimi için kullanılmalıdır:

**DC Pano — Konut 5–10 kW (1–2 string, 1 MPPT/2 MPPT)**
- IP65 pano gövdesi (poliester/ABS)
- String başına DC sigorta + tutucu (gPV, 1000/1500 V) — *tek string'de bazı tasarımlarda gerekmez*
- DC yük ayırıcı (1000 V DC, sistem akımına uygun)
- **DC parafudr T2 (veya T1+T2), Ucpv ≥ 1000/1500 V**, ayırıcılı tip
- Barlama, etiketleme, DC uyarı levhaları

**DC Pano — Ticari 100 kW (inverter başına)**
- IP65/IP66 pano
- Her string için gPV sigorta + tutucu
- DC yük ayırıcı
- **DC parafudr T1+T2, 1500 V** (yıldırım riski yüksek/paratonerli tesiste T1 şart)
- İzleme (string monitoring) opsiyonu

**AC Pano — Konut**
- 3 fazlı kompakt şalter veya otomatik sigorta (inverter nominal akımına göre)
- **AC parafudr T2** (paratoner varsa **T1+T2**)
- Kaçak akım rölesi (**tip A/B — inverter üretici beyanına göre; trafosuz inverterlerde Tip B veya Tip A + RCMU kombinasyonu**)
- Faz koruma rölesi, mühürlenebilir bölme

**AC Pano — Ticari 100 kW**
- Kompakt şalter (100 kW / 400 V ≈ **145 A** [T]; termik ayarlı, ~160 A çerçeve)
- **AC parafudr T1+T2 100 kA 3P+N**
- Ölçü ve analizör, akım trafoları
- Şebeke koruma rölesi (dağıtım şirketi şartnamesine göre)
- Ayrılabilir bara sistemi, kilitlenebilir ayırıcı

**Topraklama / Yıldırımdan Korunma**
- Konut: 1–2 adet elektrot + eşpotansiyel bara + 16/25 mm² bağlantı + panel çerçeve/ray sürekliliği (WEEB veya ayrı iletken)
- Ticari: ring topraklama (galvaniz lama), çoklu elektrot, muayene klemensleri, **paratoner ayrı projelendirme** — *paratoner mühendislik hesabı gerektirir ve genellikle ayrı kalemdir, çatı GES BOM'una gömülmemelidir.*

> ⚠️ **DOĞRULANAMADI:** "Konut 5–10 kW pano+topraklama seti X TL", "100 kW seti Y TL" şeklinde piyasada dolaşan rakamların hiçbiri bu turda kaynaklanamadı. **Bu rakamlar uydurulmadı.**

---

## 4. DC SOLAR KABLO (EN 50618, 6 mm²)

### 4.1 Standart doğrulaması **[D]**

Ürün, **EN 50618 / TS EN 50618** kapsamında: bükülgen **kalaylı bakır** iletken Sınıf 5 (EN 60228), halojensiz çapraz bağlı izolasyon ve halojensiz alev geciktirici çapraz bağlı kılıf, tek damarlı; düşey alev yayılma (EN 60332-1-2), duman yoğunluğu (EN 61034-2) testleri tanımlı.
*Kaynak: Voltavm – Hasçelik 6 mm² DC solar kablo teknik sayfası (erişim 08.08.2026)*

EN 50618'in halojensiz, çift izolasyonlu, UV/ozon dayanımlı ve **1500 V DC**'ye uygunluk anlamına geldiği ayrıca doğrulandı (Power Enerji, sayfa tarihi **08.01.2026**).

### 4.2 Fiyat — **[D] ama KAYNAKLAR ÇELİŞİYOR** ⚠️

| Kesit | Fiyat | Kaynak | Kaynak tarihi | Not |
|---|---|---|---|---|
| 4 mm² | **25–40 TL/m** (ortalama) | Power Enerji – Solar Kablo Fiyatları 2026 | erişim 08.08.2026 | KDV durumu **belirtilmemiş** |
| **6 mm²** | **45–60 TL/m** (ortalama) | Power Enerji – Solar Kablo Fiyatları 2026 | erişim 08.08.2026 | KDV durumu **belirtilmemiş** |
| **6 mm²** | **80 TL/m** | Power Enerji – "6mm Solar Kablo Fiyatı 80 TL Metre" başlıklı sayfa | **08.01.2026** | Aynı yayıncı, farklı sayfa |

**Çelişki analizi:** Aynı yayıncının iki sayfası 6 mm² için **45–60 TL/m** ve **80 TL/m** veriyor. Bu sayfalardan biri güncellenmemiş olabilir. **Fiyatı belirleyen ana etkenin LME bakır fiyatı olduğu, ayrıca marka / TÜV sertifikası / izolasyon malzemesinin fark yarattığı** aynı kaynakta belirtiliyor. Toptan (makara) alımda metre fiyatının düştüğü da belirtiliyor.

**→ Hesap motoru kuralı:**
```
dc_kablo_6mm2_TL_m:
  taban  = 45      # KDV durumu doğrulanamadı
  tavan  = 80
  varsayilan = 60  # orta senaryo, [T]
  KDV = "DOĞRULANAMADI - teklifte teyit"
  gecerlilik = "Oca-Ağu 2026 arası yayınlar; LME bakıra endeksli, 30 günde bir yenilenmeli"
  makara_indirimi = "var (oran DOĞRULANAMADI)"
```

### 4.3 Tipik metraj **[T]**

```
dc_metraj_m = string_sayisi × 2 × (ortalama_string_uzunlugu_m) × 1,15   # %15 fire/kıvrım payı
```

| Sistem | String sayısı (tipik) | Tek yön uzunluk | **Toplam 6 mm² metraj [T]** |
|---|---|---|---|
| Konut 5 kW | 1 | 25–40 m | **58–92 m** |
| Konut 10 kW | 2 | 25–45 m | **115–207 m** |
| Ticari 100 kW | 10–12 | 30–60 m | **690–1.656 m** |

**Yan kalem:** MC4 konnektör çifti = `string_sayısı × 2 + %10 yedek`. (Fiyat: **DOĞRULANAMADI**)

---

## 5. PROJE / İZİN KALEMLERİ — "YUMUŞAK MALİYET"

### 5.1 TEDAŞ / EDAŞ resmî bedelleri **[D] — EN GÜÇLÜ DOĞRULANMIŞ BÖLÜM**

**Dayanak:** EPDK Kurul Kararı, **25.12.2025 tarih ve 14165-9 / 14165-12** sayılı kararlar; Resmî Gazete'de yayımlandı (SEDAŞ 2026 bedel duyurusu bu karar numaralarına atıf yapıyor).

| Kalem | 2026 bedeli | Geçerlilik | Kaynak |
|---|---|---|---|
| **50 kW ve altı çatı & cephe GES — proje onay + kabul** | **0 TL (bedel alınmayacak)** | 2026 yılı boyunca | AA / Radikal / Ekonomist, 30.12.2025 |
| Pay devri işlemi | **0 TL** | 2026 | AA, 30.12.2025 |
| Diğer işlemler (tesis devri, birleşme, bölünme, unvan/nev'i değişikliği) | **4.210 TL** | 2026 | AA, 30.12.2025 |
| OSOS ilave veri talebi | **61 TL / sayaç / ay** | 01.01.2026'dan itibaren | AA, 30.12.2025 |

> 🎯 **Bu, konut GES ekonomisini doğrudan değiştiren maddedir.** 50 kW altı çatı/cephe GES'te **2026'da proje onay ve kabul harcı YOK.** Motorda konut senaryosu için bu kalem **0 TL** yazılmalı, "yaklaşık 3–4 bin TL" gibi eski varsayımlar temizlenmelidir.

**⚠️ 50 kW ÜSTÜ (100 kW dahil) proje onay + kabul bedeli: DOĞRULANAMADI.**
- EPDK'nın "**25 kW Üstü Lisanssız GES'ler için Proje Onay ve Kabul Bedelleri**" başlıklı ayrı bir kurul kararı seti olduğu doğrulandı (epdk.gov.tr mevzuat dizini).
- Dağıtım şirketleri (AYEDAŞ, Başkent EDAŞ, UEDAŞ, SEDAŞ) "**50 kW Üstü Proje Onay Bedelleri**" tablolarını ayrıca yayımlıyor — **UEDAŞ'ta 01.01.2026 tarihli ayrı duyuru mevcut**, ancak **tablo içindeki TL rakamları bu taramada okunamadı.**
- SEDAŞ 2026 bedel dokümanında **"Toplam (TL) (KDV Dahil): 0 / 3.970,80 / 7.942,80 / 15.885,60"** şeklinde bir kademe dizisi görünüyor; **hangi kademe hangi kW aralığına karşılık geliyor DOĞRULANAMADI** → motora girilmemeli. (Karşılaştırma: SEDAŞ 2025 dokümanında aynı dizi **0 / 3.029,76 / 6.059,64 / 12.119,04** — yıllık artış ≈ **%31** [T].)

**→ Aksiyon:** 100 kW senaryosu için **kullanıcının bağlı olduğu EDAŞ'ın "50 kW Üstü Proje Onay/Kabul Bedelleri 2026" PDF'i** motora manuel girdi olarak bağlanmalı. Bu bedel **iller arası değişmez** (EPDK ulusal karar) ama tahsilat EDAŞ üzerindendir.

**Başvuru bedeli:** 2026 başvuru bedeli kademeleri EPDK 14165-9 kararıyla belirlendi ancak **tutarlar DOĞRULANAMADI.** (Tarihsel referans: 2022'de 0–250 kW başvuru ücretsizdi — My Enerji Solar, 2022 arşivi. **2026 için geçerliliği doğrulanmadı.**)

**Yıllık işletim bedeli:** EPDK'nın şebeke işletmecisi başvuru + yıllık işletim bedeli ile görevli tedarik şirketi yıllık işletim bedelini 2026 için belirlediği doğrulandı (AA, 30.12.2025); **tutarlar DOĞRULANAMADI.** Bu bir **OPEX** kalemidir, CAPEX BOM'una konmamalıdır.

### 5.2 SMM Elektrik Proje Ücreti (EMO) **[D] çerçeve / [DOĞRULANAMADI] tutar**

| Unsur | Doğrulanan bilgi |
|---|---|
| Dayanak | TMMOB EMO **2026 Yılı En Az Ücret Tarifesi**; EMO Yönetim Kurulu'nun **10.11.2025 tarih ve 49/50 sayılı** toplantısında kabul edildi |
| Yürürlük | **01.01.2026** |
| Yetki kaynağı | EMO 49. Olağan Genel Kurulu (26–28 Nisan 2024) yetkisi + EMO En Az Ücret ve Mesleki Denetim Uygulama Esasları Yönetmeliği md. 6 (RG 09.12.2010/27780) |
| **KDV** | **Tarife KDV HARİÇ'tir** (Voltra Enerji EMO hesaplama aracı açıkça belirtiyor) |
| Yayın | EMO duyurusu 24.11.2025; tarife ekleri emo.org.tr'de PDF olarak yayımlandı (10.11.2025) |

**⚠️ GES/enerji santrali için TL tutar DOĞRULANAMADI.** EMO 2026 tarife PDF'inde yapı sınıfı bazlı ücret dizileri görünüyor (ör. 530.780 / 1.013.859 / 1.566.873 … 6.999.454 gibi) ancak **bunlar yapı sınıfı × metrekare maliyet tablolarıdır, doğrudan GES proje ücreti değildir** — yanlış eşleştirme riski yüksek olduğundan **kullanılmadı.**

**Yapısal not [D]:** EMO tarifesinde enerji santrali, farklı yapı parçalarından oluşan tesislerde **proje bedellerinin tek maliyet üzerinden** hesaplandığı belirtiliyor (EMO 2026 Bölüm IV).

**→ Motor kuralı:** SMM proje ücreti, **EMO 2026 tarifesine bağlı bir fonksiyon** olarak modellenmeli, sabit TL olarak değil. Doğrulama için: emo.org.tr 2026 tarife ekleri + EMO şube mesleki denetim birimi.

**Ayrıca EMO 2026 tarifesinde ücretlendirilen ve GES kabulünde istenebilen ölçüm hizmetleri [D]:** topraklama ölçümü, kaçak akım rölesi testleri, **paratoner ölçüm ve kontrolleri**, termal kamera ölçümleri, yönetmelik uygunluk kontrolleri. (Tutarlar **DOĞRULANAMADI**.) → Bunlar BOM'da **ayrı satır** olmalı; çoğu teklifte unutuluyor.

### 5.3 Statik Rapor — **DOĞRULANAMADI**

Çatı GES'te statik/mukavemet raporu uygulamada isteniyor (dağıtım şirketi ve/veya sigorta), ancak **2026 için ücret kaynağı bulunamadı.** İnşaat Mühendisleri Odası (İMO) 2026 asgari ücret tarifesi doğrulanmalı. **Rakam üretilmedi.**

### 5.4 Çift Yönlü Sayaç Bedeli — **DOĞRULANAMADI**

**Doğrulanan mevzuat çerçevesi [D]:** Lisanssız Elektrik Üretim Yönetmeliği değişikliği (02.04.2026) uyarınca, üretim ve tüketim tesisi aynı ölçüm noktasındaysa **mahsuplaşma öncesi tüketim = çift yönlü sayaçtan çekilen enerji + tek yönlü üretim sayacından tüketim tesisine verilen enerji** olarak belirlenir.

**Bedeli: DOĞRULANAMADI.** Sayaç, EDAŞ onaylı marka/model listesinden temin edilir ve bedeli EPDK'nın 2026 işlem bedelleri kararında ayrı bir kalem olarak **görülmedi** → muhtemelen serbest piyasa/EDAŞ sayaç fiyat listesine tabi. **Motorda zorunlu kullanıcı girişi yapılmalı.**

### 5.5 Diğer izin kalemleri **[D] — maliyeti düşüren kritik bilgiler**

| Konu | Doğrulanan durum | Kaynak / tarih |
|---|---|---|
| **Yapı ruhsatı** | **Çatı GES yapı ruhsatına TABİ DEĞİL.** Dayanak: Planlı Alanlar İmar Yönetmeliği **md. 59/2**. **Nisan 2026'da** ETKB Enerji İşleri Genel Müdürlüğü'nün GENSED'e verdiği yazıyla netleştirildi | My Enerji Solar, 30.04.2026 |
| **"GES Uygunluk Belgesi"** | Bakanlığa göre mevzuatta bu adla tanımlı **ayrı bir belge yok**; pratikte "Tesis Yeri Uygunluk Belgesi"