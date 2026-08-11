---
sonraki_kontrol: 2026-10-01 (EPDK çeyreklik tarife penceresi; 1 Temmuz 2026 penceresinde değişiklik YAPILMADI — 7 Ağu 2026 dağıtım şirketi tarife sayfasından teyit)
konu: EPDK elektrik tarife tablosu — RESMİ birincil kaynak
guncelleme: 2026-08-06
gecerlilik: 4 Nisan 2026'dan itibaren
kaynak: EPDK resmi tarife tablosu (kaynak-dosyalar/epdk-tarife-tablosu-2026-04-04.xlsx)
durum: yayin
---

# EPDK Tarife Tablosu — 4 Nisan 2026 (vergiler HARİÇ, kr/kWh)

## AG Tek Terim (çatı GES hedef kitlesi)
| Grup | Tek zamanlı enerji | Gündüz | Puant | Gece | Dağıtım |
|---|---|---|---|---|---|
| Mesken ≤8 kWh/gün (kademe 1) | 49,4065 | 195,0640 | 374,7551 | 51,3656 | 242,4900 |
| Mesken >8 kWh/gün (kademe 2) | 189,5808 | 195,0640 | 374,7551 | 51,3656 | 242,4900 |
| Ticarethane (kademe 1) | 287,3087 | 350,2620 | 597,3903 | 153,6314 | 247,9368 |
| Ticarethane (kademe 2) | 345,4688 | 350,2620 | 597,3903 | 153,6314 | 247,9368 |
| Sanayi (AG) | 298,5253 | 303,4583 | 515,7441 | 132,1229 | 182,9503 |
| Tarımsal Faaliyetler | 233,3838 | 242,8304 | 422,8933 | 89,4874 | 203,7247 |

## OG (büyük işletmeler)
| Grup | Tek zamanlı enerji | Dağıtım (çift terim) | Dağıtım (tek terim) | Güç bedeli (çift terim, kr/kW/ay) |
|---|---|---|---|---|
| Sanayi | 290,9687 | 107,0498 | 118,2457 | 3.557,5915 |
| Ticarethane | 326,2024 | 166,8345 | 208,1065 | 8.914,7520 |
| Mesken | 203,6685 | 165,2488 | 204,0402 | 8.378,9424 |
| Tarımsal | 243,7156 | 137,4008 | 171,0785 | 7.274,3832 |

## Üretici bedelleri (GES'in şebekeye VERDİĞİ enerjiye kesilen)
| Kullanıcı | Dağıtım bedeli (kr/kWh) |
|---|---|
| Lisanssız Üretici 1 | 208,1065 |
| Lisanssız Üretici 2 | 65,6008 |

## Vergiler dahil pratik fiyatlar (hesap: (Enerji×(1+0,01+BTV)+Dağıtım)×(1+KDV))
- Mesken k1 tek zamanlı: (0,4941×1,06+2,4249)×1,10 ≈ **₺3,24/kWh**
- Mesken k2 tek zamanlı: (1,8958×1,06+2,4249)×1,10 ≈ **₺4,88/kWh**
- Mesken gündüz (çok zamanlı): (1,9506×1,06+2,4249)×1,10 ≈ **₺4,94/kWh**
- Ticarethane k1: (2,8731×1,06+2,4794)×1,20 ≈ **₺6,63/kWh**
- Sanayi AG: (2,9853×1,02+1,8295)×1,20 ≈ **₺5,85/kWh**
- NOT: Mesken KDV %10 varsayımıyla — %10/%20 çelişkisi hâlâ doğrulanacak (bkz. taslak çelişki kaydı).

## Dipnotlar (tablodan)
- Çok zamanlı: gündüz 06-17, puant 17-22, gece 22-06.
- Mesken AG tek zamanlıda kademe eşiği 8 kWh/gün (~240 kWh/ay).
- Şehit aileleri/muharip gaziler: 7,6988 kr enerji (özel indirimli).

## Hane eşdeğeri katsayısı (içerik/araç çevirileri için)
- Ortalama mesken tüketimi: **≈2.824 kWh/yıl** (aile başına) — hesap: EPDK 2024 sektör
  istatistiği mesken toplam tüketimi 75,091 milyar kWh ÷ TÜİK 2024 aile sayısı 26.599.261.
  Kaynak: EPDK 2024 Elektrik Piyasası verisi + TÜİK aile istatistikleri (web teyidi 11 Ağu 2026).
  Kullanım: "X kWh üretim ≈ Y hanenin yıllık tüketimi" çevirisi; web/data/kb.ts `HANE_YILLIK_KWH` ile senkron.
