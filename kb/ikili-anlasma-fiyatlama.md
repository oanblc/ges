---
konu: İkili anlaşma fiyatlama tipleri, SKTT, çift terimli, tedarikçi değiştirme, GES etkileşimi
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
teyit: SKTT tüketim limitlerinin 2026 kesin değerleri EPDK karar metninden; GTŞ fazla alım fiyatı aylık parametrik
---

# İkili Anlaşma Fiyatlama Tipleri (2026)

## 5 fiyatlama tipi + faturada teşhisi
1. PTF+YEKDEM+marj (spot endeksli): AOPTF (saatlik tüketim ağırlıklı PTF — aritmetik ort DEĞİL;
   gündüz yoğun profilde ortalamanın altı) + YEKDEM (tahmini yansıtılır, ertesi ay fark düzeltmesi) + marj %2-7.
2. Sabit fiyat: ay boyu tek fiyat, PTF/YEKDEM ayrışması yok; vade uzadıkça risk primi (2026 volatilitesi: Haz 1.240 → Tem 2.700 ₺/MWh).
3. PTF×katsayı / PTF+sabit ek / gece-gündüz ikili: birim fiyat ÷ (AOPTF+YEKDEM) her ay sabitse bu tip.
4. Ulusal tarifeden %X iskonto: mesken/küçük ticarethanede hâlâ aktif; EPDK tarifesine oranı sabit.
5. SKTT: (AOPTF+YEKDEM) × KBK; 2026 KBK: mesken 1,05, ticarethane/sanayi 1,0938 (EPDK 30.10.2025).
   İkili anlaşması biten otomatik GTŞ+SKTT'ye düşer = fiili ceza tarifesi → en yüksek tasarruf potansiyelli müşteri.

## TEŞHİS SIRASI (asistan algoritması — protokol v2'ye eklendi)
(1) Birim fiyat ay-ay sabit mi → sabit fiyat. (2) EPDK tarifesine oranı sabit → iskonto.
(3) (AOPTF+YEKDEM)'e oranı 1,0938 → SKTT. (4) Oran sabit ≠1,0938 → PTF×katsayı. (5) Fark sabit → PTF+marj.

## Bileşen ayrıştırma (açık sorular ÇÖZÜLDÜ)
- "Sabit Maliyet Bedeli" = tedarikçinin dengeleme riski + hizmet/işletim marjı (standardı yok; ön bilgilendirme formunda tanımlı). Güç bedeliyle karıştırma (o dağıtım tarafı).
- "(+/-) Tutar" = EPİAŞ uzlaştırma kesinleşince oluşan düzeltme: TAHMİNİ vs GERÇEKLEŞEN YEKDEM farkı + geçmişe dönük DUY düzeltmeleri + okuma düzeltmeleri.
- YEKDEM iki yerde: cari ay aktif enerji bloğunda; GEÇMİŞ DÖNEM FARKI "Diğer"de ayrı satır. Sabit fiyatlı sözleşmede YEKDEM satırı hiç görünmemeli — görünüyorsa "sabit + YEKDEM geçişli"dir.
- Kayıp-kaçak: 2016'dan beri dağıtımın içinde, ayrı satır yok.
- Serbest tüketicide enerji faturası (tedarikçi) + dağıtım faturası (EDAŞ) AYRI gelebilir.

## Çift terimli tarife
- Güç bedeli: sözleşme gücü × kr/kW/ay sabit; aşım: demand ölçümüyle aşan kW × ~1,5-2 kat.
- Yük faktörü yüksek OG işletmede avantajlı; pikli işletmede tek terim ucuz olabilir → yıllık demand serisiyle kıyas.
- GES etkisi: kWh düşürür, güç bedeli OTOMATİK DÜŞMEZ; demand piki güneş saatindeyse sözleşme gücü revizyonuyla azaltılabilir (akşam pikte etkisiz; bulutlu gün riski) → modelde ayrı ihtiyatlı kalem.

## Tedarikçi değiştirme
- EPİAŞ STP: ayın 6'sından önceki son iş günü 24:00'e kadar bildirim → takip eden ay 1'i geçiş; iptal ayın 20'sinden önce 17:00'ye kadar. Fiziksel değişiklik yok.
- Cayma bedeli sözleşmede (standart formül yok); portföyden çıkışta 60 gün önce bildirim zorunluluğu; büyük müşteride teminat mektubu/DBS (1-2 aylık fatura).
- GES'Lİ İŞLETME: mahsup/fazla satış GTŞ hattında yürür; tedarikçi değişikliği mahsup sözleşmesini BOZMAZ; uzlaştırmada net değerler yeni tedarikçi portföyüne yazılır.

## GES etkileşimi (model kuralları)
- Öz tüketim değeri = ikili enerji fiyatı + dağıtım + BTV + KDV (şebekeden hiç geçmez).
- Fazlayı GTŞ alır (ikili tedarikçi ALMAZ; organize piyasada satılamaz); fiyat öz tüketimin belirgin altı → iki kWh sınıfı AYRI değerlenir.
- İKİNCİ KADEME ETKİ (spot endekslide): GES gündüz (pahalı PTF saatleri) çekişini azaltır → AOPTF düşer → kalan tüketimin birim fiyatı da ucuzlar. Sabit fiyatta bu etki yok. Asistan ayrımı modele koymalı.
- Saatlik mahsup: aylık varsayımla hesap tasarrufu ~%20 şişirir → saatlik eşleşme oranı zorunlu girdi.

## Örnek ayrıştırmalar (kb'de hazır)
- Spot sanayi Temmuz: (2,60+0,424)×1,03=3,115; ertesi ay YEKDEM farkı düzeltme örneği (+2.678 ₺).
- SKTT teşhisi: birim fiyat ÷ (AOPTF+YEKDEM) = 1,0938.
- GES tasarrufu: 48.000 öz tüketim × (3,115+1,083)×1,20 ≈ 241.800 ₺ + 12.000 fazla × ~1,8 ≈ 21.600 ₺.

## 2026 seviyeleri
PTF: ilk 4 ay ort 1.645; Haz 1.240; Tem ~2.700 ₺/MWh. YEKDEM revize: Tem 424 / Ağu 450,5 / Eyl 581,1.
Karşılaştırma platformları: mesken/KOBİ encazip+akıllitarife; işletmede danışman modeli (Enoptimal, Apollo, Covolt, Grentis).

## Kaynaklar
Apollo, EPİAŞ (PTF yöntemi + STP süreçleri), Yeşilhaber, Elektra, Enerjisa formları, akıllitarife,
Witteh, Gediz, Enerji Ekonomisi, Covolt, DUY (mevzuat.gov.tr), ENOPTIMAL, EÇE, Enerji360, Bigpara,
Zorlu, Gazelektrik, Rönesans, TESPAM, Mars Enerji, My Enerji Solar, solarVis, Montel, Robokami,
My Enerji, AA, Enerji Günlüğü, Kapsül, Lion Solar, Para Dergi, Enerji Bülteni, encazip, Webrazzi,
Grentis, bulalgetir, Piagrid. (Erişim: 6 Ağustos 2026)
