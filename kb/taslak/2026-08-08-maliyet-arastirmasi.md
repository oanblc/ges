# GES kurulum maliyeti web araştırması — 8 Ağustos 2026

Amaç: /hesaplama "Kurulum Maliyeti" aracının veri temeli. Onaylanırsa kb/piyasa-mahsuplasma.md
§5 ile birleştirilebilir.

## Toplanan fiyat noktaları (anahtar teslim)

| Kaynak | Sistem | Fiyat | ₺/kW |
|---|---|---|---|
| Azimut Solar (Nis-May 2026 EPC, KDV hariç) | 50 kW | 2.025.000 ₺ | 40.500 |
| Azimut Solar | 100 kW | 3.150.000 ₺ | 31.500 |
| Azimut Solar | 250 kW | 6.000.000 ₺ | 24.000 |
| Azimut Solar | 500 kW | 12.825.000 ₺ | 25.650 |
| Azimut Solar | 1 MW | 22.500.000 ₺ | 22.500 |
| Azimut/TSM piyasa ort. (konut, KDV dahil) | 3 kW | 80–120 bin ₺ | 27–40 bin |
| Azimut/TSM piyasa ort. | 5 kW | 120–180 bin ₺ | 24–36 bin |
| Azimut/TSM piyasa ort. | 10 kW | 200–320 bin ₺ | 20–32 bin |
| TSM | 15–20 kW | 350–550 bin ₺ | ~23–28 bin |
| Saha teklifi (Scribd, Çelik Gönç) | 20,9 kWp | 17.700 € + KDV = 21.240 € | ~€847/kWp net |

## Maliyet kalemi dağılımı (iki kaynak uyumlu)

Panel %35-40 · İnverter %12-20 · Konstrüksiyon %10-15 · Montaj-işçilik %12-15 ·
Kablo-elektrik %8-10 · Proje-izin %3-5 · Trafo/bağlantı (büyük sistem) %5-10

## Batarya

- Tommatech 51,2V 5 kWh LFP ≈ 113.000 ₺ (Power Enerji, vade farksız liste) → ~22.600 ₺/kWh.
  kb/teknik-depolama.md ile uyumlu ("5 kWh ~113 bin ₺").
- ÇELİŞKİ: kb/piyasa-mahsuplasma.md §5 "batarya ~10-11 bin ₺/kWh" diyor — ev tipi perakende
  gerçeği 20-23 bin ₺/kWh. Onayda düzeltilmeli (10-11 bin muhtemelen hücre/büyük ölçek fiyatı).
- Batarya ekleme toplam sistemi ~%30-40 büyütüyor (hibrit inverter farkı dahil).

## Araçta kullanılan model

- Konut çatı (KDV dahil piyasa bandı): ≤4 kW 26-40 bin; ≤7 kW 24-36 bin; ≤25 kW 20-32 bin ₺/kW.
- Ticari/sanayi çatı (KDV hariç EPC): ≤50 kW 32-42 bin; ≤100 kW 27-36 bin; ≤250 kW 22-28 bin;
  ≤500 kW 22-27,5 bin; >500 kW 20-25,5 bin ₺/kW.
- Çatı tipi çarpanı: trapez/sandviç 1,00 · beton teras 1,04 · kiremit 1,06 (kanca işçiliği).
- Not: teklifler sıkça EUR bazlı (saha örneği); kur riski uyarısı araca eklendi.

## Kaynaklar

- azimutsolarenerji.com.tr/ges-kurulum-maliyeti.html (Nisan-Mayıs 2026)
- turkiyesolarmarket.com.tr — "Çatı GES Kurulum Maliyeti 2026: Gerçekçi Hesap"
- satis.powerenerji.com/lityum-batarya/ (Tommatech 5 kWh)
- scribd.com/document/993022789 (saha teklifi, 20,9 kWp)
(Erişim: 8 Ağustos 2026)
