Araştırmaya başlıyorum. Önce güncel piyasa verilerini ve tedarikçi tekliflerini taramam gerekiyor.Piyasa çerçevesi netleşti (2026 içindeyiz). Şimdi tedarikçi teklif yapıları, SKTT katsayıları ve güncel tarife rakamlarını derinleştiriyorum.Şimdi tedarikçi bazlı teklif yapılarını ve K katsayısı seviyelerini araştırıyorum.# Türkiye Serbest Tüketici Elektrik Tedarik Teklifleri — Ağustos 2026 Durum Raporu

**Rapor derleme tarihi:** 8 Ağustos 2026
**Kapsam:** Serbest tüketici (ST) piyasası fiyatlama yapıları, SKTT referansı, tedarikçi teklif tipolojisi, geçiş süreci, GES'li işletme notu
**Hazırlayan:** gesdanismani.com bilgi tabanı araştırma modülü

> ⚠️ **Metodoloji uyarısı:** Bu raporda regülasyon ve piyasa girdileri (limit, formül, YEKDEM, PTF) birincil/haber kaynaklarından doğrulanmıştır. **Tedarikçilerin ticari teklif katsayıları kamuya açık yayımlanmaz** — bunlar tüketim hacmi, profil, teminat ve vade bazında müzakere edilen ikili anlaşma parametreleridir. Bu nedenle şirket bazlı katsayı rakamları aşağıda **DOĞRULANAMADI** olarak işaretlenmiştir; uydurma rakam verilmemiştir. Ayrıca bu oturumda web arama kotası dolduğu için tedarikçi tarife sayfalarının tamamı çekilememiştir (bkz. §10).

---

## 1. Yönetici Özeti (hesap motoru için kritik 6 madde)

| # | Parametre | Değer | Geçerlilik | Güven |
|---|---|---|---|---|
| 1 | Serbest tüketici limiti | **500 kWh/yıl** | 01.01.2026 – 31.12.2026 | Yüksek |
| 2 | SKTT limiti — mesken | **4.000 kWh/yıl** | 01.01.2026'dan itibaren | Yüksek |
| 3 | SKTT limiti — ticarethane & sanayi | **15.000 kWh/yıl** | 2026 (değişmedi) | Yüksek |
| 4 | SKTT formülü | **(PTF + YEKDEM) × KBK** | Yürürlükte | Yüksek |
| 5 | YEKDEM birim ek maliyet — **Ağustos 2026** | **450,45 TL/MWh** | Ağustos 2026 | Yüksek |
| 6 | PTF aylık ortalama — Temmuz 2026 | **2.699,61 TL/MWh** | Temmuz 2026 | Orta (bkz. §3.2) |

**Ana bulgu:** Ağustos 2026'da YEKDEM maliyeti Nisan öngörüsünün ~2,1 katına revize edildi (213,89 → 450,45 TL/MWh). Bu, **(PTF+YEKDEM)×katsayı** tipi endeksli sözleşmelerin maliyetini doğrudan yukarı iter ve endeksli teklifleri sabit fiyatlı tekliflere göre riskli hale getirir. GES'li işletmelerde ise asıl belirleyici katsayının kendisi değil, **PTF'nin saatlik mi yoksa aylık ortalama mı uygulandığıdır** (§8).

---

## 2. Regülasyon Çerçevesi

### 2.1 Serbest tüketici eşiği
- 2026 yılı serbest tüketici limiti **500 kWh/yıl** olarak belirlendi; 2025'te 750 kWh idi. Karar EPDK'nın 18 Aralık 2025 tarihli Kurul toplantısında alındı ve **23 Aralık 2025 tarihli, 33116 sayılı Resmî Gazete**'de yayımlandı. — [AA](https://www.aa.com.tr/tr/ekonomi/elektrikte-serbest-tuketici-limiti-2026da-500-kilovatsaat-olacak/3778210), [CNBC-e](https://www.cnbce.com/enerji/elektrikte-2026-icin-serbest-tuketici-limiti-belirlendi-h21699) *(geçerlilik: 01.01.2026–31.12.2026)*
- Pratik sonuç: **yıllık 500 kWh ≈ aylık 42 kWh.** Konut abonelerinin fiilen tamamına yakını ve tüm ticarethane/sanayi aboneleri serbest tüketici niteliğini taşıyor. — [Haber7, Temmuz 2026](https://ekonomi.haber7.com/ekonomi/haber/3641921-elektrik-faturasinda-yeni-donem-ayrintilar-aciklandi-herkes-istedigini-secebilecek)
- Aynı kararla lisanslı üreticilerin **piyasada satabileceği üretim oranı 2026 için %50** olarak belirlendi (tedarikçilerin ikili anlaşma portföyünü besleyen arz tarafı kısıtı). — [AA](https://www.aa.com.tr/tr/ekonomi/elektrikte-serbest-tuketici-limiti-2026da-500-kilovatsaat-olacak/3778210)
- Piyasa hareketi: serbest tüketici hakkını kullanan abone sayısı Ocak 2025'te 224.650 iken Kasım 2025'te 801.270'e çıktı. — [İstanbul Ticaret Gazetesi, 21.11.2025](https://istanbulticaretgazetesi.com/elektrikte-serbest-tuketici-donemi-yeni-model-1-ocak-2026da-yururluge-giriyor)

### 2.2 SKTT (Son Kaynak Tedarik Tarifesi) — teklif karşılaştırmasının referans noktası
Sözleşme imzalamayan tüketici bölgesindeki görevli tedarik şirketinden alır. Yüksek tüketimli sayılırsa fiyat **ulusal tarife değil, piyasa endeksli SKTT** olur:

**Aktif enerji (SKTT) = (PTF + YEKDEM) × KBK**

- Limitler (EPDK 30.10.2025 kararı, yürürlük 01.01.2026): **mesken 4.000 kWh/yıl** (2025'te 5.000 idi), **ticarethane ve sanayi 15.000 kWh/yıl** (değişmedi). — [KEPSAŞ](https://www.kepsas.com.tr/skt-tuketici/), [Petroturk/EPDK açıklaması, 31.10.2025](https://www.petroturk.com/elektrik-haberleri/epdk-sktt-ile-ilgili-bilinmesi-gerekenleri-acikladi)
- Mesken için 4.000 kWh/yıl ≈ **aylık 333 kWh ≈ aylık ~984 TL fatura** eşiğine karşılık geliyor. — [Petroturk/EPDK, 31.10.2025](https://www.petroturk.com/elektrik-haberleri/epdk-sktt-ile-ilgili-bilinmesi-gerekenleri-acikladi)
- **Tesisat bazlı uygulama:** Birden fazla aboneliği olanlarda yalnızca limiti aşan tesisat SKTT'ye geçer, diğerleri ulusal tarifeden faturalanmaya devam eder. — [Gediz Perakende](https://www.gedizperakende.com.tr/tarifeler/son-kaynak-tedarik-tarifesi), [SEPAŞ](https://www.sepas.com.tr/kampanyalar/sktt)
- **Kritik fark:** Ulusal tarifede aktif enerji bedeline devlet desteği uygulanır; SKTT'de uygulanmaz. Dağıtım bedeli her iki halde de aynıdır, SKTT ile değişmez. — [Petroturk/EPDK, 31.10.2025](https://www.petroturk.com/elektrik-haberleri/epdk-sktt-ile-ilgili-bilinmesi-gerekenleri-acikladi)

### 2.3 KBK (Kurulca Belirlenen Katsayı)
- **2025 değeri: 1,0938 (%9,38 marj)** — 16 Kasım 2024 tarihli Resmî Gazete'de yayımlanan Kurul kararı, yürürlük 01.02.2025. — [GENSED](https://gensed.org/epdk-kurul-karari-ile-sktt-limitleri-guncellendi/)
- **2026 KBK değeri: DOĞRULANAMADI.** 2026 için KBK'nın 1,0938'de sabit kalıp kalmadığına dair birincil kaynak (Resmî Gazete / EPDK Kurul kararı) bu turda teyit edilemedi. Bir tedarikçi bilgilendirme sayfasında mesken için "1,05" ifadesi geçmekle birlikte sayfada geçerlilik tarihi yoktur ve **DOĞRULANAMADI** sayılmalıdır. — [Selenka Enerji](https://selenkaenerji.com/teklif-al.html)
- 🔴 **Hesap motoru notu:** KBK, tüm "katsayı" tipi tekliflerin karşılaştırma tabanıdır. Motorda `KBK_2026` alanı **zorunlu doğrulama bayrağı** ile tutulmalı; teyit edilene kadar 1,0938 varsayımı "geçici" etiketiyle kullanılmalıdır.

---

## 3. Fiyat Girdileri (Ağustos 2026)

### 3.1 YEKDEM birim ek maliyet öngörüleri — 2026
EPDK öngörüleri yıl içinde iki kez revize edildi. **Ağustos 2026 için geçerli değer 450,45 TL/MWh'dir.**

| Ay (2026) | Nisan revizyonu (Kurul 14460) | Temmuz revizyonu (Kurul 14718) | Değişim |
|---|---|---|---|
| Nisan | 574,54 TL/MWh | — | — |
| Mayıs | 602,51 TL/MWh | — | — |
| Haziran | 580,99 TL/MWh | — | — |
| Temmuz | 189,15 TL/MWh | **423,99 TL/MWh** | +%124 |
| **Ağustos** | 213,89 TL/MWh | **450,45 TL/MWh** | **+%111** |
| Eylül | 330,66 TL/MWh | **581,14 TL/MWh** | +%76 |

Kaynaklar: [AA Enerji Terminali, 04.04.2026](https://www.aa.com.tr/tr/enerjiterminali/elektrik/epdk-2026-yekdem-maliyetlerini-revize-etti/56138) (Nisan–Haziran değerleri) ve [Enerji Günlüğü, 04.07.2026](https://www.enerjigunlugu.net/epdk-yekdem-maliyetini-yeniden-yukseltti-68791h.htm) (Temmuz–Aralık revizyonu). Nisan kararında Nisan–Aralık dokuz aylık ortalama 372,35 TL/MWh olarak belirlenmişti — [Enerji Günlüğü, 05.04.2026](https://www.enerjigunlugu.net/epdk-2026-yili-yekdem-tahminlerini-dusurdu-67672h.htm).

> **Yorum:** YEKDEM öngörüsünün iki ayda iki katına çıkması, "sabit katsayı" görünümlü endeksli tekliflerin gerçekte **öngörülemez** olduğunu gösteriyor. Endeksli sözleşmede tüketici hem PTF hem YEKDEM riskini taşır.

### 3.2 PTF (Piyasa Takas Fiyatı)
- **Temmuz 2026 aylık PTF ortalaması: 2.699,61 TL/MWh** (yıllık %9 düşüş; Temmuz 2025: 2.965,16 TL/MWh). — [Montel News, ~01.08.2026](https://montelnews.com/tr/news/01d7a864-1e69-42ec-ac0d-a507b9c2b5dd/goep-te-temmuz-ay-ptf-ortalamas-2-69961-tl-mwh-oldu)
  - ⚠️ **Kaynak içi tutarsızlık:** Aynı haberde Haziran 2026 ortalaması 1.240,16 TL/MWh olarak verilmiş ancak aylık değişim %8 denmiş; bu iki veri matematiksel olarak bağdaşmıyor. **Haziran 2026 PTF değeri DOĞRULANAMADI**, EPİAŞ Şeffaflık Platformu'ndan teyit edilmelidir.
- 2026'nın ilk dört ayı + Mayıs kısmi verisiyle **PTF ortalaması 1.644,71 TL/MWh** (2025 ortalamasına göre belirgin gerileme). — [MyEnerji, 16.06.2026](https://myenerji.com/2012-2024-ptf-yekdem-fiyatlari/)
- **Ağustos 2026 gerçekleşen PTF: henüz oluşmadı** (ay içindeyiz). Hesap motoru Ağustos faturasını ancak ay sonunda kesinleştirebilir → endeksli tekliflerde **fatura öngörülemezliği** yapısaldır.

**Referans:** Saatlik ve günlük PTF verisi EPİAŞ Şeffaflık Platformu'ndan alınmalıdır — [seffaflik.epias.com.tr](https://seffaflik.epias.com.tr)

---

## 4. Teklif Fiyatlama Yapıları — Tipoloji

Piyasada dolaşan tekliflerin tamamı aşağıdaki 5 yapıdan birine indirgenebilir. Hesap motorunda bu şekilde modellenmelidir:

| Tip | Formül (aktif enerji, TL/MWh, vergiler ve dağıtım hariç) | Riski kim taşır | Öngörülebilirlik |
|---|---|---|---|
| **A. Katsayı (çarpan)** | `(PTF + YEKDEM) × k`, k < KBK | Tüketici | Düşük |
| **B. Eksi TL / mutlak iskonto** | `(PTF + YEKDEM) − X` | Tüketici | Düşük |
| **C. Ulusal tarife endeksli % iskonto** | `Ulusal tarife aktif enerji × (1 − i)` | Karma | Orta |
| **D. Sabit birim fiyat** | `F` (TL/MWh, taahhüt süresince sabit) | Tedarikçi | Yüksek |
| **E. Ön ödemeli** | Genelde D veya C üzerine ön ödeme iskontosu | Karma | Orta-Yüksek |

Bu üç ana ailenin (sabit / ulusal tarife endeksli / PTF-YEKDEM endeksli) piyasada eşzamanlı sunulduğu ve taahhüt süresinin genellikle 1 yıl, erken fesihte cayma bedeli uygulandığı doğrulanmıştır. — [Piagrid Serbest Tüketici Rehberi, 31.03.2026](https://www.piagrid.com/rehber/serbest-tuketici)

### 4.1 A tipi — katsayı seviyeleri
- Referans tavan **KBK**'dır (2025: 1,0938). Tedarikçiler yüksek hacimli müşterilere **KBK katsayısının altında** teklif verebilir. — [Witteh SKTT Rehberi, 06.04.2026](https://witteh.com/son-kaynak-tedarik-tarifesi/)
- 🔴 **Şirket bazlı katsayı seviyeleri (Enerjisa / CK Enerji / Aksa / Zorlu / Gazelektrik için 0,97 – 1,05 vb. spesifik değerler): DOĞRULANAMADI.** Bu değerler yayımlanmıyor; teklif bazında müzakere ediliyor. Motorda sabit değer olarak gömülmemeli, **kullanıcıdan teklif metni girdisi** olarak alınmalıdır.

### 4.2 B tipi — "eksi TL" tekliflerinin matematiği (motor için kritik)
"Eksi TL" teklifi (`PTF+YEKDEM − X`) ile katsayı teklifi (`×k`) doğrudan karşılaştırılamaz. Dönüşüm:

```
k_eşdeğer = 1 − X / (PTF + YEKDEM)
X_eşdeğer = (PTF + YEKDEM) × (1 − k)
```

**Sonuç:** Eksi TL teklifinin efektif iskontosu **fiyat yükseldikçe erir**. Ağustos 2026 girdileriyle:

| Senaryo (PTF, TL/MWh) | PTF+YEKDEM(450,45) | −250 TL teklifinin efektif iskontosu |
|---|---|---|
| 1.500 | 1.950,45 | %12,8 (k≈0,872) |
| 2.100 | 2.550,45 | %9,8 (k≈0,902) |
| 2.700 | 3.150,45 | %7,9 (k≈0,921) |
| 3.000 | 3.450,45 | %7,2 (k≈0,928) |

→ **Yüksek fiyat beklentisinde katsayı (%) teklifi, düşük fiyat beklentisinde eksi TL teklifi lehtedir.**

### 4.3 C tipi — ulusal tarife endeksli iskonto
- Piyasada tipik iskonto aralığı **%8–15**; iskonto **yalnızca aktif enerji bedeline** uygulanır, dağıtım bedeli ve vergiler değişmez. — [Piagrid, 31.03.2026](https://www.piagrid.com/rehber/serbest-tuketici) ve [Piagrid Elektrik Fiyatları](https://www.piagrid.com/indirimli-elektrik/elektrik-fiyati)
- ⚠️ Bu tarifede EPDK zamları tüketiciye **birebir yansır**; "sabit" değildir.

### 4.4 D tipi — sabit birim fiyat
Taahhüt süresince kWh birim fiyatı değişmez, zamlardan etkilenilmez; ancak **"YEKDEM hariç" ibaresi varsa fiyat sabitliği bozulur** — sözleşmede YEKDEM'in fiyata dahil olup olmadığı mutlaka kontrol edilmelidir. — [Piagrid, 31.03.2026](https://www.piagrid.com/rehber/serbest-tuketici)
🔴 **Ağustos 2026 için tedarikçi bazlı sabit fiyat seviyeleri (TL/MWh): DOĞRULANAMADI.**

### 4.5 E tipi — ön ödemeli tarife koşulları
🔴 **DOĞRULANAMADI.** Ön ödemeli/ön faturalı ST tarifelerinin 2026 koşulları (asgari yükleme tutarı, iskonto oranı, sayaç tipi zorunluluğu, iade/mahsup mekanizması) için bu turda birincil kaynak doğrulanamadı. Ön ödemeli sayaç uygulamaları düzenleyici olarak Elektrik Piyasası Tüketici Hizmetleri Yönetmeliği kapsamındadır; **teklif bazında tedarikçiden yazılı koşul talep edilmelidir.** Motorda bu tip şimdilik "kullanıcı girdisi" olarak açık bırakılmalıdır.

---

## 5. Tedarikçi Bazlı Durum Tablosu

| Tedarikçi | Doğrulanan | Doğrulanamayan (Ağustos 2026) |
|---|---|---|
| **Enerjisa** | 2026 ST limitinin 500 kWh olduğunu ve ST'lerin istediği tedarikçiden alım hakkını sayfasında teyit ediyor — [enerjisa.com.tr](https://m.enerjisa.com.tr/tr/musteri-islemleri/musteri-bilgilendirme/serbest-tuketici-haklari-nelerdir) | Katsayı/iskonto seviyeleri, sabit fiyat, ön ödemeli koşullar → **DOĞRULANAMADI** |
| **CK Enerji (Boğaziçi/Akdeniz)** | "Serbest Tüketici", "Avantajlı Sanayi", "Avantajlı Ticarethane", "SKTT", "Yeşil Enerji" olarak **segment bazlı ürün ailesi** sunuyor — [ckbogazici.com.tr](https://www.ckbogazici.com.tr/tr/indirimli-elektrik); "Düşük Tüketimli Son Kaynak Tarifesi Serbest Tüketici Sözleşmesi" ayrı bir ürün — [ckakdeniz.com.tr](https://www.ckakdeniz.com.tr/tr/indirimli-elektrik) | Ürünlerin fiyat parametreleri → **DOĞRULANAMADI** (CK Akdeniz sayfasındaki limit bilgisi 2022 verisiyle güncel değil) |
| **Aksa Elektrik** | SKTT sayfasında 2026 ST limitini 500 kWh olarak teyit ediyor; teklif süreci **"teklif talebi → tüketim analizi → online sözleşme"** akışıyla dijital — [aksaelektriksatis.com.tr](https://www.aksaelektriksatis.com.tr/son-kaynak-tedarik-tarifesi) | Katsayı/indirim seviyeleri → **DOĞRULANAMADI** |
| **Zorlu (Zorlu Enerji Elektrik/ZES perakende)** | — | Ürün yapısı ve fiyatlar → **DOĞRULANAMADI** (bu turda kaynak çekilemedi) |
| **Gazelektrik** | — | Teklif katsayıları → **DOĞRULANAMADI** (Gazelektrik bir tedarikçi değil, **karşılaştırma/aracı platform** olarak konumlanır; bu ayrımın da teyidi gerekir) |
| **Genel piyasa** | Türkiye genelinde **21 perakende elektrik şirketi** faaliyette; tüketici bölgesinden bağımsız olarak herhangi biriyle anlaşabiliyor — [Haber7, Temmuz 2026](https://ekonomi.haber7.com/ekonomi/haber/3641921-elektrik-faturasinda-yeni-donem-ayrintilar-aciklandi-herkes-istedigini-secebilecek) | — |

---

## 6. Mesken / Ticarethane / Sanayi Ayrımı

### 6.1 Fatura bileşenleri ve vergi farkları
| Kalem | Mesken | Ticarethane | Sanayi |
|---|---|---|---|
| SKTT eşiği | 4.000 kWh/yıl | 15.000 kWh/yıl | 15.000 kWh/yıl |
| BTV (aktif enerji üzerinden, dağıtım hariç) | %5 | %5 | **%1** |
| Dağıtım bedeli (AG, ~) | 183,62 kr/kWh | 187,74 kr/kWh | **138,53 kr/kWh** |
| Kademeli tarife | **Var** (240 kWh/ay) | Yok | Yok |

- BTV oranları ve dağıtım bedelinin BTV matrahına dahil edilmediği: — [fatura.hesaplama.in, 05.07.2026](https://fatura.hesaplama.in/elektrik-faturasi-hesaplama) *(ikincil kaynak — orta güven)*
- Dağıtım bedeli rakamları: — [Piagrid](https://www.piagrid.com/indirimli-elektrik/elektrik-fiyati) *(ikincil kaynak, geçerlilik tarihi sayfada net değil — **düşük güven**, EPDK tarife tablosundan teyit edilmeli)*
- 🔴 **KDV oranları (mesken / ticarethane / sanayi): DOĞRULANAMADI.** Taranan ikincil kaynaklar çelişkili oranlar veriyor. EPDK tarife tablosundan teyit edilmeden motora girilmemelidir.

### 6.2 Ulusal tarife referansı (mesken)
4 Nisan 2026 tarifesine göre konutta kademeli yapı: **240 kWh/ay ve altı için 2,92 TL/kWh, üstü için 4,32 TL/kWh** (aktif enerji + dağıtım bedeli dahil, **KDV ve BTV hariç**). — [Piagrid, kaynak: EPDK 04.04.2026](https://www.piagrid.com/indirimli-elektrik/elektrik-fiyati) *(ikincil kaynak — EPDK esas tarife tablosundan teyit önerilir)*

### 6.3 Segment bazlı karar kuralı

| Segment | Durum | Öneri |
|---|---|---|
| **Mesken, <4.000 kWh/yıl** | Ulusal tarife + devlet desteği kapsamında | ❌ ST'ye geçme. Destekli ulusal tarife neredeyse her zaman daha ucuz. |
| **Mesken, >4.000 kWh/yıl** | SKTT'ye düşer, destek kesilir | ✅ ST teklifi al — SKTT (PTF+YEKDEM)×KBK'ya karşı iskonto ara |
| **Ticarethane, <15.000 kWh/yıl** | SKTT ile ikili anlaşma farkı sınırlı kalıyor | ⚠️ Marjinal fayda; sözleşme/cayma riskini tart |
| **Ticarethane/Sanayi, >15.000 kWh/yıl** | SKTT kapsamı | ✅ Doğru tasarlanmış sözleşmeyle SKTT'ye kıyasla anlamlı tasarruf mümkün |

Düşük tüketimli işletmelerde farkın sınırlı kaldığı, yüksek tüketimli sanayi ve ticarethanelerde ise doğru tasarlanmış sözleşmeyle SKTT'ye kıyasla anlamlı tasarruf sağlanabildiği sektör değerlendirmesi: — [İstanbul Ticaret Gazetesi, 21.11.2025](https://istanbulticaretgazetesi.com/elektrikte-serbest-tuketici-donemi-yeni-model-1-ocak-2026da-yururluge-giriyor)

---

## 7. Geçiş Süreci ve Takvim

### 7.1 Akış
1. **Uygunluk:** Yıllık tüketim ≥ 500 kWh (2026).
2. **Borç kontrolü:** Mevcut tedarikçiye taksitlendirilmiş veya doğrudan borç bulunmamalı. — [Aras EPSAŞ](https://www.arasepas.com/serbesttuketiciavantajlari)
3. **Teklif toplama:** En az 3 tedarikçiden, **aynı formatta** (TL/MWh, aktif enerji, vergiler hariç) teklif al.
4. **Sözleşme + EPİAŞ portföy talebi:** Tedarikçi, EPYS üzerinden aylık talep döneminde portföye ekleme talebi girer.
5. **Yürürlük:** Kesinleşen listeler sonrası takip eden ayın 1'inde başlar.

### 7.2 EPİAŞ takvimi — doğrulanmış tarihler
- **Ağustos 2026 talep dönemi 26.06.2026'da açıldı**; Temmuz 2026 dönemi kesinleşmiş listeleri EPYS'de yayımlandı. Sözleşmesiz talep/şikâyet başvuruları (STF.01 formu) 03.07.2026 saat 17:00'a kadar alındı. — [EPİAŞ Duyuru](https://www.epias.com.tr/tum-duyurular/temmuz-2026-donemi-serbest-tuketici-listelerinin-yayimlanmasi-ve-agustos-2026-talep-doneminin-acilmasi/)
- Bir önceki dönem duyurusu (Haziran/Temmuz 2026, 22.05.2026) aynı yapıyı teyit ediyor. — [EPİAŞ Duyuru](https://www.epias.com.tr/tum-duyurular/haziran-2026-donemi-serbest-tuketici-listelerinin-yayimlanmasi-ve-temmuz-2026-talep-doneminin-acilmasi/)
- 📌 **Kural:** Talep dönemi bir önceki ayın ~20'sinde açılır. **Ağustos 2026 içindeyiz → bugün imzalanan sözleşme en erken 1 Eylül 2026'da yürürlüğe girer.** Ayın 20'sinden sonra imzalanan sözleşmeler bir ay daha kayabilir. — süreç mantığı [Piagrid](https://www.piagrid.com/rehber/serbest-tuketici) ile uyumlu; **kesin kesim tarihi için EPİAŞ aylık duyurusu esas alınmalıdır.**
- 🔒 Elektriksiz kalma riski yoktur: sözleşme sona erse dahi görevli tedarik şirketi son kaynak güvencesiyle beslemeye devam eder.

---

## 8. GES'li İşletme İçin Hangi Teklif Tipi Avantajlı? 🌞

> Aşağıdaki bölüm **doğrulanmış piyasa girdilerinden türetilen analizdir**; mahsuplaşma mevzuatının 2026 detayları için §10'daki doğrulama listesine bakınız.

### 8.1 Temel mekanik: GES net çekiş profilini bozar
Çatı GES'li bir işletmenin şebekeden **net çekişi**, üretimin olduğu 10:00–16:00 bandında dibe iner; çekiş **sabah erken, akşam ve gece** saatlerine kayar. Oysa PTF de aynı saatlerde (güneş bol → PTF düşük; akşam pik → PTF yüksek) hareket eder.

**Sonuç:** GES'li tesisin **tüketim ağırlıklı ortalama PTF'si, basit aylık ortalama PTF'den yüksektir.**

### 8.2 Karar kuralı (en kritik tek soru)
| Teklif yapısı | GES'li işletme için |
|---|---|
| **Saatlik PTF endeksli** `(PTF_saatlik + YEKDEM) × k` | ❌ **Dezavantajlı.** GES'in ucuz saatleri "yediği", pahalı saatlerin faturaya kaldığı için efektif maliyet katsayıdan bağımsız olarak yükselir. |
| **Aylık ortalama PTF endeksli** `(PTF_aylık_ort + YEKDEM) × k` | ✅ **Avantajlı.** GES'in yarattığı profil kayması tüketici lehine "ortalanır" — GES'in gizli değeri burada realize olur. |
| **Sabit birim fiyat (D tipi)** | ✅ **Avantajlı** — saat farkı yok, GES tasarrufu net kWh üzerinden birebir yansır; ayrıca bütçe öngörülebilirliği sağlar. |
| **Ulusal tarife endeksli % iskonto (C tipi)** | ⚪ Nötr — zam riski taşır, GES avantajını ne artırır ne azaltır. |
| **Eksi TL (B tipi)** | ⚠️ Duruma bağlı — yüksek PTF döneminde iskontosu erir (§4.2). |

**🎯 Öneri sıralaması (GES'li ticarethane/sanayi, Ağustos 2026 koşulları):**
**1) Sabit birim fiyat (YEKDEM dahil ibaresiyle) → 2) Aylık ortalama PTF endeksli katsayı → 3) Ulusal tarife endeksli % iskonto → 4) Saatlik PTF endeksli**

### 8.3 GES'li işletmede sözleşmeye mutlaka yazdırılması gerekenler
1. **PTF'nin saatlik mi, basit aylık ortalama mı uygulanacağı** — tek başına %5–15 fark yaratır.
2. **YEKDEM'in fiyata dahil olup olmadığı** — "sabit fiyat, YEKDEM hariç" gerçek sabit fiyat değildir ([Piagrid](https://www.piagrid.com/rehber/serbest-tuketici)); Ağustos 2026'daki 450,45 TL/MWh seviyesi bunun somut maliyetidir.
3. **Mahsuplaşma / ihtiyaç fazlası enerjinin muhasebesi:** Lisanssız üretimde üretim fazlasının hangi fiyattan değerlendirileceği ve tedarikçi değişiminin mahsuplaşmayı nasıl etkileyeceği sözleşmede açıkça yer almalı. 🔴 **2026 yılı ihtiyaç fazlası alım fiyat mekanizması: DOĞRULANAMADI** — YEK Kanunu ve lisanssız üretim yönetmeliği ilgili maddeleri ayrıca teyit edilmeli.
4. **Tahmin sapma / profil cezası maddesi:** Tedarikçiler ikili anlaşmalarda tüketim tahmininden sapma için ceza uygulayabilir. GES üretimi hava koşullarına bağlı dalgalandığı için **GES'li tesiste sapma riski yapısal olarak yüksektir** → bu madde ya kaldırılmalı ya tolerans bandı geniş tutulmalı. ⚠️ *(Genel piyasa pratiği; sözleşme bazında teyit gerekir.)*
5. **Taahhüt süresi ve cayma bedeli** — genellikle 1 yıl, erken fesihte cayma bedeli. — [Piagrid, 31.03.2026](https://www.piagrid.com/rehber/serbest-tuketici)

---

## 9. Hesap Motoru Parametre Seti (Ağustos 2026)

```yaml
donem: 2026-08
para_birimi: TL
birim: TL/MWh   # kWh için /1000

regulasyon:
  serbest_tuketici_limiti_kwh_yil: 500          # dogrulandi
  sktt_limit_mesken_kwh_yil: 4000               # dogrulandi
  sktt_limit_ticarethane_kwh_yil: 15000         # dogrulandi
  sktt_limit_sanayi_kwh_yil: 15000              # dogrulandi
  sktt_formul: "(PTF + YEKDEM) * KBK"           # dogrulandi
  KBK_2026: null                                # DOGRULANAMADI (2025: 1.0938)
  KBK_fallback_gecici: 1.0938

girdiler:
  YEKDEM_2026_08: 450.45                        # dogrulandi (EPDK Kurul 14718)
  YEKDEM_2026_09: 581.14
  YEKDEM_2026_07: 423.99
  PTF_2026_07_ortalama: 2699.61                 # orta guven
  PTF_2026_08_gerceklesen: null                 # ay icinde, EPIAS'tan cekilecek

vergi_ve_dagitim:
  btv_mes