---
konu: Elektrik tarife yapısı (EPDK perakende tarifeleri, kademe, SKTT, vergiler)
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
---

# Türkiye Elektrik Tarife Yapısı — GES Fizibilite Hesap Verileri

## Yürürlükteki tarife: 4 Nisan 2026 EPDK tablosu
Nisan zammı: mesken %25, ticarethane %17,5, sanayi (OG) %5,8, tarım %24,8.
EPDK tarifeleri Ocak/Nisan/Temmuz/Ekim'de günceller → hesap motoru "tarife geçerlilik tarihi" alanı taşımalı.

## Birim fiyatlar (4 Nisan 2026, enerji+dağıtım, KDV/BTV HARİÇ)
| Abone grubu | ₺/kWh |
|---|---|
| Mesken kademe 1 (≤240 kWh/ay) | 2,92 |
| Mesken kademe 2 (>240 kWh/ay) | 4,32 |
| Ticarethane (AG) | 5,35–5,93 |
| Sanayi (OG) | 4,81 |
| Tarımsal sulama | 4,37 |

Mesken üç zamanlı: gündüz 4,38 · puant 6,17 · gece 2,94 ₺/kWh.
GES üretimi gündüze denk gelir → çok zamanlı abonede tasarruf gündüz fiyatından.

## Kademeli konut tarifesi ve destek
- Kademe eşiği: 240 kWh/ay. Sübvansiyon: k1 ~%57, k2 ~%36.
- Destek tavanı (1 Ocak 2026): yıllık 4.000 kWh — aşan mesken SKTT'ye geçer.
- GES çıkarımı: öz tüketim yıllık çekişi 4.000 kWh altına indirirse abone destekli
  tarifeye döner; marjinal kWh en pahalı kademeden silinir (marjinal fiyat mantığı).

## SKTT
- 2026 limitleri: mesken ≥4.000 kWh/yıl, ticarethane+sanayi ≥15.000 kWh/yıl.
- Formül: (PTF + YEKDEM) × katsayı (~1,05–1,09; kesin değer EPDK Kurul Kararı'ndan teyit edilecek) + dağıtım + vergiler.
- 2026 ilk 5 ay PTF ort. ≈ 1.645 ₺/MWh; Temmuz 2026 ~2.000–2.100 ₺/MWh.

## Serbest tüketici / ikili anlaşma
- 2026 limiti: 500 kWh/yıl → fiilen herkes serbest tüketici olabilir.
- İkili anlaşma tipik PTF+marj endeksli; SADECE enerji bedelini değiştirir,
  dağıtım+vergiler aynen ödenir. Hesaplayıcıda "enerji bedeli override" alanı.

## Vergiler ve nihai fiyat formülü
| Kalem | Oran |
|---|---|
| Enerji Fonu | enerji bedelinin %1 |
| BTV | mesken/ticarethane %5, sanayi %1 |
| TRT payı | kaldırıldı (2021) |
| KDV | mesken/tarım %10, ticarethane/sanayi %20 |

NihaiFiyat = (Enerji×(1+0,01+BTV) + Dağıtım) × (1+KDV)

## "1 kWh silmenin değeri" (hesap motorunun kalbi)
- Anlık öz tüketim: TÜM kalemler tasarruf (enerji+dağıtım+fon+BTV+KDV) → tam perakende fiyat.
- Mahsuplaşan enerji (aynı netleşme dönemi): yine tam perakende fiyat kadar.
- Şebekeye satılan net fazla: yalnız ÇIPLAK enerji bedeli (dağıtımsız, vergisiz);
  ayrıca üretici yönlü dağıtım bedeli (~0,283 ₺/kWh+KDV) kesilir.
  Satış geliri ≈ öz tüketim değerinin 1/4–1/6'sı.

## Pratik nihai fiyatlar (vergiler dahil, Ağustos 2026)
- Mesken k1: ~3,24 ₺/kWh · k2: ~4,8 ₺/kWh
- Ticarethane: ~6,6–7,3 ₺/kWh
- Sanayi (OG): ~5,8–5,9 ₺/kWh
- Tarımsal sulama: ~4,9 ₺/kWh

## Uyarılar
1. Virgül hassasiyetli resmi fiyatlar için EPDK 4 Nisan 2026 PDF'i indirilecek (sayfa dinamik, otomatik çekilemedi).
2. Parametrik olacaklar: tarife dönemi, kademe eşiği, SKTT limit ve katsayısı, PTF aylık, KDV/BTV, saatlik mahsup anahtarı, 2× üretim tavanı.

## Kaynaklar
EPDK tarife tabloları (epdk.gov.tr/Detay/Icerik/3-1327), Piagrid (piagrid.com/indirimli-elektrik/elektrik-fiyati),
akıllitarife.com, Enerji Atlası, AA (12 soruda elektrik tarifesi limiti), Bigpara, KEPSAŞ, Enerjisa duyuru,
Witteh SKTT rehberi, GENSED (serbest tüketici 500 kWh), Montel/EPİAŞ (PTF), TESPAM, Kaan Gökay (üretici dağıtım bedeli),
Medyascope/Cumhuriyet/Dünya (Nisan 2026 zam haberleri).
