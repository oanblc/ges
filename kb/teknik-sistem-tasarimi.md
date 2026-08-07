---
konu: Sistem tasarımı — string hesabı, DC/AC oranı, gölge, yerleşim, tasarım yazılımları
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
not: örnek hesaplar illüstratif; kesin değerler datasheet'ten
---

# Sistem Tasarımı (2026)

## String tasarımı
- Voc soğukta yükselir (γ ≈ −0,25..−0,30 %/°C): Voc_soğuk = Voc_STC×(1+γ/100×(Tmin−25)); N_maks = maksDC/Voc_soğuk — GÜVENLİK sınırı (tipik maks DC 1000-1100 V).
- MPPT çift kontrol: yazın Vmpp alt sınırın üstünde, kışın Voc üst sınırın altında.
- Örnek (580W TOPCon, Voc 51,5): −10°C'de ~56 V → 1100V inverterde maks ~19 panel/string; 10 kW + 1,2 oran = ~21 panel → 2 MPPT'ye 10+11.
- Paralel stringler aynı sayı/yön/eğim; farklı yönler AYRI MPPT.

## DC/AC oranı (overpaneling)
- Standart 1,1-1,3; 1,2'de yıllık clipping <%0,25; 1,25'te %1-3; >1,4-1,5 sorgulanır.
- TR: güney optimal eğimde 1,1-1,2; teras/D-B ve gölgelide 1,25-1,3.
- SAATLİK MAHSUP SONRASI: kırpılan öğle tepesi zaten düşük değerli satış → öz tüketim odaklı tasarımda yüksek DC/AC + küçük inverter savunulabilir strateji.

## Gölge analizi
- Yakın gölge (baca/parapet) 3B model + string tasarımını etkiler; uzak gölge (bina/dağ) ufuk çizgisi.
- Sıra arası: kış gündönümü α = 90−enlem−23,45 → Antalya 30,6° / İzmir 28,6° / Ankara 26,6° / Edirne 24,6°. D = sin(eğim)×L/tanα + cos(eğim)×L (+%5-10 pay). Örnek 40°K, 20°, 2,3 m panel → eksen ~3,7-3,9 m.
- GCR: arazi 0,30-0,50; çatı 0,50-0,70 (bilinçli kış gölgesi toleransı).

## Yerleşim
- Teras D-B (10° çadır): +%25'e kadar kWp/m², yayvan üretim eğrisi → saatlik mahsupta öz tüketime uyumlu; kWh/kWp güneyin %85-90'ı; her yön ayrı MPPT.
- kWp/m²: eğimli paralel 0,20-0,22; teras D-B 0,15-0,18; teras güney açılı 0,10-0,13. (1 kWp ≈ eğimlide 5 m², açılı terasta 8-10 m².)
- Teras: balastlı (delmez, statik kontrol şart) vs ankrajlı (hafif, yalıtım kritik).

## İnverter konumu
- DC düşüm hedef <%1-2 (maks 3); güneşten korunmuş, 30-45 cm havalandırma; ana pano/sayaca yakın.

## Tasarım yazılımları
- PVsyst (bankable, P50/P90), PV*SOL, HelioScope; ücretsiz: SolarEdge Designer, Huawei SmartDesign 2.0.
- KURULUMCUDAN İSTENECEK ÇIKTILAR (teklif kontrol listesi): (1) ölçekli yerleşim planı, (2) string/tek hat şeması, (3) üretim simülasyonu (aylık kWh, kWh/kWp, PR + yazılım adı), (4) kayıp raporu (gölge/sıcaklık/kablo/kirlilik/clipping), (5) saatlik mahsup kapsamındaysa öz tüketim analizi.

## SSS
- Kaç panel sığar: eğimli alan ÷ ~2,6 m²; kesin sayı yerleşim planıyla.
- İki yön: olur, ayrı MPPT şartıyla; parçalı çatıda optimizer/mikro.
- Küçük inverter: 1,1-1,3 standart, kusur değil; clipping kalemini simülasyondan iste.
- Simülasyon raporu vermeyen kurulumcu: normal değil — ücretsiz araçlarla bile dakikada üretilir; rapor yoksa üretim vaadi dayanaksız.

## Kaynaklar
ExpertCE, Photonik, Greenlancer, Medium/Mandal, Orbit, Solar with Yash, Aurensol, SolarPowerWorld,
Anern, Econo Solar, Mars Enerji, Gayrimenkulhaber, Enoptimal, PVsyst docs, SurgePV, HelioScope,
Heaven Designs, Solar Pathfinder, SunPeak, ASES Solar Today, Autarco, Spirit Energy, My Enerji,
DP Solar, Aforenergy, SolarQuotes, Beny, Aurora, SolarEdge, Huawei. (Erişim: 6 Ağustos 2026)
