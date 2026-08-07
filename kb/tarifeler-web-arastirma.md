---
konu: EPDK mesken tarifesi web taraması — kademe sınırı, KDV, birim fiyatlar
guncelleme: 2026-08-06
kaynak: web araması (kısa tarama); birincil teyit kb/tarifeler.md (EPDK XLSX)
durum: yayin (Ozan onayi 6 Agu 2026)
teyit: mesken KDV %10/%20 çelişkisi AÇIK — INDEKS teyit listesinde
---

# Güncel EPDK Mesken Elektrik Tarifesi — Kademe Sınırı ve Birim Fiyatlar

**Güncelleme tarihi:** 6 Ağustos 2026
**Kapsam:** AG (alçak gerilim) mesken, tek terimli **tek zamanlı** tarife, görevli tedarik şirketi (ulusal tarife)
**Araştırma derinliği:** Kısa test taraması — 3 arama. **Bu doküman yayına alınmadan önce epdk.gov.tr tarife tablosuyla birebir teyit edilmelidir** (gerekçe: §6).

---

## 1. Özet (TL;DR)

| Parametre | Değer | Durum |
|---|---|---|
| Kademe eşiği (mesken AG tek zamanlı) | Günlük ortalama **8 kWh** (30 günlük dönemde 240 kWh) | Doğrulandı (çoklu kaynak) |
| Kademe 1 birim fiyat | **2,92 TL/kWh** (vergi hariç) | 4 Nisan 2026 tarifesi — teyit gerekli |
| Kademe 2 birim fiyat | **4,32 TL/kWh** (vergi hariç) | 4 Nisan 2026 tarifesi — teyit gerekli |
| Mesken KDV | **%20** | Doğrulandı (yön), oran teyit gerekli |
| Belediye Tüketim Vergisi (BTV) | **%5** (mesken) | Doğrulandı |
| Yıllık sübvansiyon limiti (SKTT eşiği) | **4.000 kWh/yıl** (2026) | Doğrulandı (AA) |

---

## 2. Kademe Sınırı (Aylık/Günlük Eşik)

Kademeli tarife, dar gelirliyi koruma ve tasarruf amacıyla getirilmiş bir uygulamadır: 6446 sayılı Elektrik Piyasası Kanunu gereğince EPDK tarafından 31.12.2021 tarih ve 10707 no'lu Kurul kararı ile belirlenen kademeli tarife uygulamasına geçilmiştir ve 1 Ocak 2022 tarihinden itibaren uygulanmaya başlanmıştır.

Mevcut eşik yapısı:

- **Mesken AG tek zamanlı:** Tüketicinin günlük 8 kWh'e (dahil) kadarki tüketimine düşük kademe fiyatı, günlük 8 kWh'in üzerindeki tüketimine yüksek kademe fiyatı uygulanır.
- **Tarihsel geçiş:** Mesken AG tek zamanlı abone grubu için kademe limiti 01.03.2022 itibarıyla oluşan faturalarda günlük ortalama 8 kWh'dir; söz konusu limit Ocak 2022'de oluşturulan faturalarda 5 kWh/gün, Şubat 2022'de 7 kWh/gün olarak uygulanmıştır.
- **Ticarethane / Kamu ve Özel Hizmetler AG tek zamanlı:** Günlük 30 kWh'e (dahil) kadar düşük kademe, üzerinde yüksek kademe.

### Kritik uygulama detayı: eşik "aylık 240 kWh" değil, **günlük ortalamadır**
Fatura dönemi gün sayısı 28–33 arasında değişebildiğinden hesap motoru eşiği **sabit 240 kWh** olarak kodlamamalıdır:

```
Kademe1_esik_kWh = 8 × fatura_dönemi_gün_sayısı
Kademe1_tüketim  = min(toplam_kWh, Kademe1_esik_kWh)
Kademe2_tüketim  = max(0, toplam_kWh − Kademe1_esik_kWh)
```
(240 kWh yalnızca 30 günlük dönemin özel hâlidir: Günlük ortalama 8 kWh = 30 günlük 240 kWh.)

### Çok zamanlı tarifede kademe YOK
Çok zamanlı tarifede olan mesken alçak gerilim ve Kamu ve Özel Hizmetler Sektörü ile Diğer alçak gerilim aboneliklerinde kademeli tarife uygulanmamaktadır. Hesap motorunda tarife tipi (tek/çok zamanlı) ayrı bir dallanma olmalıdır.

---

## 3. Birim Fiyatlar — 4 Nisan 2026 Tarifesi

**Geçerlilik dönemi:** 4 Nisan 2026'dan itibaren. **Sonraki olağan tarife değişikliği beklentisi:** 1 Temmuz 2026 (EPDK tarifeleri çeyrek dönemlik günceller). **⚠️ DOĞRULANAMADI: 1 Temmuz 2026 revizyonunun yapılıp yapılmadığı bu taramada teyit edilemedi — bugün 6 Ağustos 2026 olduğu için aşağıdaki fiyatlar güncelliğini yitirmiş olabilir.**

### 3.1 Vergi hariç (çıplak) birim fiyatlarEPDK 4 Nisan 2026 tarifesinde mesken tek zamanlı kademeli: Kademe 1 = 2,92 TL/kWh (≤ 240 kWh/ay), Kademe 2 = 4,32 TL/kWh (> 240 kWh/ay). Bu fiyatlar için kaynak açıkça KDV ve Belediye Tüketim Vergisi dahil değildir (Kaynak: EPDK, 4 Nisan 2026) notunu düşmektedir.

Aynı tarife setinde **mesken üç zamanlı** fiyatlar: T2 gündüz (06–17) 4,38 TL/kWh; T1 puant (17–22) 6,17 TL/kWh; T3 gece (22–06) 2,94 TL/kWh.

### 3.2 Vergi dahil birim fiyatlar (hesaplanmış)

Vergi zinciri: `enerji bedeli × (1 + BTV %5) × (1 + KDV %20)` → toplam çarpan **1,26**

| Kademe | Vergi hariç | + BTV %5 | **KDV dahil brüt** |
|---|---|---|---|
| Kademe 1 (≤ 8 kWh/gün) | 2,92 TL/kWh | 3,066 TL/kWh | **3,68 TL/kWh** |
| Kademe 2 (> 8 kWh/gün) | 4,32 TL/kWh | 4,536 TL/kWh | **5,44 TL/kWh** |
| Üç zamanlı T3 gece | 2,94 TL/kWh | 3,087 TL/kWh | **3,71 TL/kWh** |
| Üç zamanlı T2 gündüz | 4,38 TL/kWh | 4,599 TL/kWh | **5,52 TL/kWh** |
| Üç zamanlı T1 puant | 6,17 TL/kWh | 6,479 TL/kWh | **7,77 TL/kWh** |

> Bu KDV dahil değerler **tarafımızca hesaplanmıştır**, EPDK tablosundan doğrudan alıntı değildir. **⚠️ DOĞRULANAMADI:** 2,92 / 4,32 TL/kWh'in yalnızca *enerji bedeli* mi, yoksa *enerji + dağıtım bedeli* toplamı mı olduğu netleşmedi. Bir kaynağın örnek hesabı (200 kWh için 200 × 2,92 = 584 TL, vergiler hariç) dağıtım bedelini ayrıca eklemezken, başka kaynak bu fiyatlara ~85 TL/ay dağıtım + sayaç bedeli ve KDV eklenmektedir demektedir. **Hesap motoruna girmeden önce EPDK tablosundan "Perakende Tek Terimli Aktif Enerji Bedeli" ve "Dağıtım Bedeli" satırları ayrı ayrı okunmalıdır.**

---

## 4. Vergi ve Fonlar (Fatura Kalemleri)

| Kalem | Mesken oranı | Not |
|---|---|---|
| KDV | **%20** | KDV oranı 1 Mart 2022'de mesken için düşürülmüş, 10 Temmuz 2023'te yükseltilmiştir. Sepaş de 09.07.2023 tarihinden itibaren KDV oranının tüm mesken ve tarımsal faaliyet aboneliklerinde güncellendiğini teyit eder. **⚠️ Oranın rakamı kaynak metinlerinde teknik nedenle okunamadı; %20 bilgisi mevzuat bilgisiyle verilmiştir — teyit edilmeli.** |
| Belediye Tüketim Vergisi | **%5** | Belediye Tüketim Vergisi mesken %5 / sanayi-ticari %1 |
| TRT Payı | **0 (kaldırıldı)** | TRT Payı 25 Aralık 2021 tarihinde 7346 sayılı Kanun ile elektrik faturalarından tamamen kaldırılmıştır; 2026 faturalarında bu kalem yer almaz |
| Enerji Fonu | **0 (kaldırıldı)** | 1 Ocak 2022 tarihinde faturalarda TRT Payı ve Enerji Fonu kaldırılmıştır |
| Dağıtım bedeli | Değişken | Dağıtım bölgesine göre farklılaşır; ulusal tek fiyat değildir |

---

## 5. Yıllık Tüketim Limiti (SKTT / Sübvansiyon Eşiği) — 2026'nın Ana Değişikliği

Kademe eşiğinden **ayrı ve bağımsız** ikinci bir filtre vardır: yıllık toplam tüketim limitini aşan mesken abonesi sübvansiyonlu ulusal tarifeden çıkıp **Son Kaynak Tedarik Tarifesi'ne (SKTT)** geçer.

- **2026 limiti:** EPDK, elektrik desteklerinin daha adil dağıtılması amacıyla 2026'da mesken tüketici grubuna yönelik yıllık elektrik tüketim limitini 4 bin kilovatsaat olarak belirledi; yeni düzenleme 1 Ocak 2026 itibarıyla uygulanacak.
- **Etki büyüklüğü:** Türkiye genelinde yaklaşık 43 milyon mesken abonesi bulunuyor; yeni limitin yürürlüğe girmesiyle yaklaşık 2,5 milyon abonenin (mesken abonelerinin yaklaşık %6'sı) düzenlemeden etkileneceği öngörülüyor. Son değişiklikle yaklaşık 23 teravatsaatlik tüketim son kaynak tedariki kapsamında olacak; bu da toplam mesken tüketiminin yaklaşık %29'una tekabül etmektedir.
- **Kalan sübvansiyon oranı:** Düşük kademede (günlük 8 kWh altı tüketim) yaklaşık %57, yüksek kademede (günlük 8 kWh ve üzeri) %36 oranında sübvansiyon sağlanmaya devam edileceği öngörülmektedir.
- **Limit aşımının yürürlük tarihi kuralı (2025 yılı örneğiyle):** Limit aşıldığında yeni tarife **aynı fatura döneminde değil, sonraki aybaşlarında** başlar. Örneğin 25/11/2024 tarihinde okunan sayaçla 2024 tüketimi 5.000 kWh'i ilk kez aşan bir mesken kullanıcısına 1/2/2025 tarihi, 30/12/2024'te aşan bir kullanıcıya 1/3/2025 tarihi itibarıyla yüksek tüketimli son kaynak tüketicileri için hesaplanacak tarife uygulanır. → **Hesap motoruna gecikmeli yürürlük mantığı eklenmelidir.**

### Yanlış bilgi uyarısı: "3.000 kWh"
Eylül–Ekim 2025'te yaygın olarak yıllık destek sınırının 5.000 kWh'ten 3.000 kWh'e düşürüleceği haberleri çıkmış, hatta kademe sınırının yıllık 5000 kWh'ten 3000 kWh'e düşürüldüğü ve Ocak 2026'dan itibaren geçerli olacağı yazılmıştır. **Nihai karar 4.000 kWh'dir** (§5, AA / 31.10.2025). Bilgi tabanında 3.000 kWh rakamı kullanılmamalıdır.

---

## 6. Hesap Motoru Parametre Bloğu

```yaml
tarife_kimlik: EPDK_AG_MESKEN_TEK_ZAMANLI
gecerlilik_baslangic: 2026-04-04
gecerlilik_bitis: DOĞRULANAMADI   # 2026-07-01 revizyonu teyit edilmedi
para_birimi: TRY
birim: TL/kWh

kademe_esigi:
  tip: gunluk_ortalama
  deger_kWh_gun: 8
  # 30 günlük dönemde 240 kWh'e karşılık gelir

fiyatlar_vergi_haric:
  kademe_1: 2.92
  kademe_2: 4.32
  kapsam: DOĞRULANAMADI   # enerji bedeli mi, enerji+dağıtım mı?

vergiler:
  btv_orani: 0.05        # Belediye Tüketim Vergisi, mesken
  kdv_orani: 0.20        # TEYİT EDİLMELİ
  kdv_matrahi: btv_dahil_tutar
  trt_payi: 0.00
  enerji_fonu: 0.00

fiyatlar_kdv_dahil_hesaplanmis:
  kademe_1: 3.68
  kademe_2: 5.44
  formul: "vergi_haric × 1.05 × 1.20"

dagitim_bedeli:
  deger: DOĞRULANAMADI   # bölgeye göre değişir, ayrı tabloda tutulmalı

yillik_limit_SKTT:
  yil: 2026
  limit_kWh: 4000
  yururluk: 2026-01-01
  asim_sonrasi_tarife: SKTT_yuksek_tuketimli
  gecikmeli_yururluk: true
```

---

## 7. DOĞRULANAMADI / Risk Listesi

Şeffaflık gereği, bu taramanın sınırları:

1. **1 Temmuz 2026 tarife revizyonu — DOĞRULANAMADI.** Bugün 6 Ağustos 2026; EPDK çeyreklik güncelleme yapıyorsa 2,92 / 4,32 TL/kWh eskimiş olabilir. **En yüksek öncelikli doğrulama kalemi.**
2. **2,92 / 4,32 TL/kWh'in dağıtım bedelini içerip içermediği — DOĞRULANAMADI.** Kaynaklar çelişiyor (§3.2).
3. **KDV oranının tam rakamı — kaynak metinlerinden okunamadı.** %20 bilgisi mevzuat bilgisine dayanıyor, EPDK/GİB'den teyit edilmeli.
4. **Kaynak kalitesi uyarısı:** Bulunan sonuçların hiçbiri **epdk.gov.tr birincil kaynağı değildir**; hepsi tedarikçi/karşılaştırma/haber sitesidir. Bilgi tabanına girecek nihai rakamlar EPDK Kurul Kararı PDF'inden alınmalıdır.
5. **Güvenilmez bulunan kaynak — kullanılmadı:** Bir hesaplama sitesi mesken tarifesini "0–150 kWh 3,01 TL/kWh, 151–300 kWh 4,46 TL/kWh, 301–500 kWh 5,98 TL/kWh, 500 kWh üzeri 7,52 TL/kWh" şeklinde **4 dilimli** sunmaktadır. Bu yapı EPDK'nın **2 kademeli** mesken tarifesiyle bağdaşmıyor; muhtemelen SEO amaçlı üretilmiş hatalı içeriktir. **Bilgi tabanına alınmamalıdır.**
6. **Tedarikçi değişikliği yapmış aboneler kapsam dışı:** Bu fiyatlar daha önce tedarikçi değişikliği yapmamış tüketiciler için geçerli ulusal tarife fiyatlarıdır.

---

## Kaynaklar

1. **Anadolu Ajansı Enerji Terminali** — "12 soruda elektrik tarifesinde yeni limit", 31.10.2025 — 2026 yıllık limit 4.000 kWh, sübvansiyon oranları, abone etkisi: https://www.aa.com.tr/tr/enerjiterminali/elektrik/12-soruda-elektrik-tarifesinde-yeni-limit/52592
2. **Trakya Elektrik Perakende Satış A.Ş. (TREPAŞ)** — "Kademeli Tarife" — EPDK 31.12.2021/10707 Kurul Kararı, 8 kWh ve 30 kWh eşikleri: https://trepas.com.tr/kademeli-tarife
3. **Sepaş Enerji** — "Kademeli Tarife Hakkında Bilmeniz Gerekenler" — eşiğin tarihsel seyri (5→7→8 kWh), çok zamanlı tarifede kademe olmaması, KDV değişiklikleri: https://www.sepas.com.tr/musteri-hizmetleri/fatura-ve-odeme-islemleri/kademeli-tarife-hakkinda-bilmeniz-gerekenler
4. **Gazelektrik** — "Elektrik Birim Fiyatları Ne Kadar?", 08.05.2026 — 4 Nisan 2026 tarifesi kademe ve üç zamanlı fiyatlar, vergi/fon durumu: https://gazelektrik.com/enerji-piyasalari/elektrik-fiyatlari
5. **Piagrid** — "Elektrik Fiyatları ve Tarifeleri 2026" — 2,92 / 4,32 TL/kWh, "KDV ve BTV dahil değildir" notu, örnek hesap: https://www.piagrid.com/indirimli-elektrik/elektrik-fiyati
6. **CK Boğaziçi Elektrik** — "Kademeli Elektrik Tarifesi" — TRT Payı/Enerji Fonu kaldırılması, fatura gösterimi: https://www.ckbogazici.com.tr/tr/kademeli-elektrik-tarifesi
7. **Enerji Atlası** — "Elektrik Fiyatları, Elektrik Tarifeleri" — 240 kWh/30 gün karşılığı, ulusal tarife kapsamı: https://www.enerjiatlasi.com/elektrik-fiyatlari/
8. **SB Solar** — "1 kW Kaç TL?", 23.11.2025 — EPDK'nın limit aşımı yürürlük tarihi örnekleri: https://sbsolar.com.tr/2025/11/23/1-kw-kac-tl-guncel-elektrik-fiyatlari/
9. *(Karşı-kaynak, kullanılmadı)* Solarfirmaları / İndigo Dergisi — 3.000 kWh iddiası (nihai karar 4.000 kWh ile çürütüldü)
10. *(Güvenilmez, kullanılmadı)* hesapsonuc.com — 4 dilimli mesken tarifesi

**Zorunlu sonraki adım:** epdk.gov.tr → Elektrik Piyasası → Tarifeler bölümünden yürürlükteki Kurul Kararı PDF'i ile §3 ve §4 rakamları birebir eşleştirilmeli; 1 Temmuz 2026 revizyonu kontrol edilmelidir.