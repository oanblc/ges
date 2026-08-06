---
konu: PV fiziği ve üretim hesabı — ışınım, sıcaklık, kayıp zinciri, PR, degradasyon
guncelleme: 2026-08-06
durum: taslak-onay-bekliyor
not: Ankara/Antalya aylık tabloları PVGIS v5.2 API'den canlı çekildi (1 kWp, 30°, güney, %14 kayıp)
---

# PV Fiziği ve Üretim Hesabı (2026)

## Işınım
- GHI yatay toplam; DNI dik direkt; GTI eğik yüzeye düşen — ÜRETİM HESABI GTI ile (yataya göre +%15-25).
- PSH: günlük kWh/m² ÷ 1 → "tam güç saat"; Günlük üretim ≈ kWp × PSH × PR.
- TR: yıllık 1.527 kWh/m² ort; güneşlenme GD Anadolu 2.993 sa > Akdeniz 2.956 > ... > Karadeniz 1.971. PSH tipik 3,5-5+.
- GEPA (gepa.enerji.gov.tr): 500m çözünürlük, ±%10; YATAY verir → eğik için PVGIS.
- PVGIS adımları: konum → Grid connected → kWp + kayıp (%8-14 modern) → slope/azimuth (0=güney) → aylık kWh + H(i); CSV indirilebilir.

## Panel fiziği
- STC (1000 W/m², 25°C) etiket; NMOT'ta (~800 W/m², hücre ~45°C) gerçek çıkış ≈ STC'nin %75'i.
- Pmax sıcaklık katsayıları: PERC −0,34..−0,38 / TOPCon −0,29..−0,32 / HJT −0,24..−0,27 %/°C.
- Antalya 35°C günde hücre ~60-65°C → anlık kayıp PERC ~%13, TOPCon ~%11, HJT ~%9; yıllık sıcaklık kaybı TR %3-8.
- Düşük ışıkta HJT/TOPCon > PERC (~%1 yıllık fark bulutlu bölgelerde).

## Kayıp zinciri (tipik)
Yansıma %2,5-4,5 · kirlenme %1-5 · gölge %0-15 (tasarım!) · sıcaklık %3-10 · mismatch %0,3-1 ·
DC kablo ≤%1 · inverter %2-4 (EURO verime bak, maks değil; formül 0,48·η50 ağırlıklı) · AC ~%1 · trafo ~%1.
- PR = üretim ÷ (kWp × eğik ışınım); iyi sabit sistem %80-85; TR hedef ≥%80 (kabul testi eşiği); yılda %0,5-1 düşer.

## Üretim pratiği
- Yıllık üretim = kWp × özgül üretim. TR bantları: Akdeniz/GDA 1.600-1.800; İç Anadolu 1.500-1.700; Ege 1.500-1.650; Marmara 1.250-1.400; Karadeniz 1.200-1.400 kWh/kWp.
- Ankara PVGIS (1 kWp): yıllık 1.465 kWh; Oca 65 → Tem 170 (2,6×). Antalya: 1.580; Oca 92 → Tem 163 (1,8×). Üretimin ~%60-62'si Nis-Eyl.
- Eğim/azimut: G 30-35° = %100; yatay %88-91; GD/GB 30° %95-97; tam D %78 / B %80; D-B split %85-90. Kural: ±15° eğim, ±30° azimut <%5 kayıp.
- Bifacial: çatı yatık %2-5; arazi yüksek+açık %5-15; carport %15-20. Şart: arka boşluk ≥0,5 m + yüksek albedo. Kiremite yapışık montajda bifacial primi anlamsız.

## Degradasyon
- LID %1-2 (yalnız p-tipi PERC; n-tipi TOPCon/HJT'de YOK); LeTID PERC sıcak iklim riski.
- Yıllık: PERC %0,45-0,55; TOPCon ~%0,40; HJT ~%0,25. TOPCon 25. yıl ~%87-89.
- Saha degradasyonu genelde garanti eğrisinin üstünde — garanti alt sınırdır.

## SSS
- 1 kW → yıllık ~1.200-1.800 kWh (bölge); tipik 1.400-1.500.
- %22 verim = az alan; üretimi belirleyen kWp + bölge. Alan kısıtı yoksa verim başlıca kriter değil.
- MİT: "sıcakta çok üretir" — sıcaklık DÜŞÜRÜR; rekorlar soğuk-güneşli bahar günlerinde.
- PVGIS güvenilir (±%5-10; JRC); yıllar arası hava ±%5-8 doğal.
- Üretim vaadi kontrolü (4 adım): kWh/kWp'yi bölge bandıyla kıyasla → PVGIS'i kendin çalıştır (vaat >%5 üstteyse gerekçe iste) → teklifde PR + IEC 61724 kabul testi (≥%80) → gölge analizi + AYLIK tablo iste.

## Kaynaklar
Global Solar Atlas, SurgePV (5 rehber), SolarScope, GEPA, Vikipedi, Tuncmatik 2026, Piagrid,
PVGIS v5.2 API (canlı), pvgis.com, Sinovoltaics, TheGreenWatt (3), A1 SolarStore, Solar Stack,
pv magazine, RatedPower, Solargis, PVsyst docs, Seven Sensor (TR, PR/IEC 61724), Solis,
EA Global (PID/LID 2025), Electro Zirve, Norm Enerji, Wattsizing. (Erişim: 6 Ağustos 2026)
