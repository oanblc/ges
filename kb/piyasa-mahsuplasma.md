---
konu: PTF, YEKDEM, saatlik mahsuplaşma ekonomisi, yatırım maliyetleri, hesap metodolojisi
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
---

# Elektrik Piyasa Fiyatları ve GES Mahsuplaşma Ekonomisi

## 1. PTF (Piyasa Takas Fiyatı)
| Dönem | Ortalama PTF |
|---|---|
| 2024 | 2.233 ₺/MWh |
| 2025 | 2.618 ₺/MWh |
| 2026 Oca–May | 1.645 ₺/MWh (%37 düşüş) |

- Duck curve TR'de belirgin: 2025 saatlik ort. öğle dipi (12:00) ~1.501, akşam zirvesi (19:00) ~3.246 ₺/MWh.
- 15 Haziran 2025'te öğle saatlerinde PTF 0 ₺/MWh gördü; Mayıs–Haziran 2026 güneş saatlerinde ~520 ₺/MWh.
- HESAP KURALI: fazla üretim PTF'den değerlenecekse "güneş saatleri PTF'si" kullanılmalı
  (yıllık ortalamanın ~%55-70'i; çöküş dönemlerinde %30'u).

## 2. YEKDEM
- Yeni USD-endeksli garanti yok; TL bazlı YEKDEM sürüyor (2026 başvuru son tarihi 1 Aralık 2025 idi).
- Tüketiciye yansıyan YEKDEM birim maliyeti: 2025 ort. 363 ₺/MWh; 2026 tahmini ~434 ₺/MWh (aylık dalgalı: 163–1.038).

## 3. Saatlik mahsuplaşma (1 Mayıs 2026) — KRİTİK KURALLAR
Dayanak: RG 2 Nisan 2026 sayı 33212 + 11415 sayılı CB Kararı (RG 13 Haziran 2026).
- Kapsam: 12 Mayıs 2019 sonrası çağrı mektuplu lisanssız tesisler; ticarethane/sanayi/tarım saatlik mahsuba geçti.
- **MESKEN MUAF: aylık mahsuplaşma devam ediyor.** (Konut hesabında saatlik profil gerekmez!)
- Fazla enerjinin fiyatı (10 yıllık YEKDEM süresi içinde): PTF DEĞİL,
  abone grubu perakende tarifesi − dağıtım bedeli. Örnek Mayıs 2026 OG sanayi:
  2,9097 − 0,6560 = net ~2,25 ₺/kWh (o dönem gündüz PTF'nin 4 katı).
- 10 yılı dolan tesisler: min(0,9 × YEKDEM fiyatı; saatlik PTF).
- Bedelsiz YEKDEM devri: (a) yıllık üretim > önceki yıl tüketiminin 2 katı → aşan kısım,
  (b) depolamadan şebekeye verilen enerji.
- Öz tüketim makası: örtüşmeyen her kWh, alış (~4,3–5,3) ile satış (~2,25) farkı kadar değer kaybeder.
  "kWp × üretim × tarife" formülü geliri ABARTIR.

## 4. İşletme gerçek maliyeti (2026)
- Vergiler dahil: sanayi ~5,26 ₺/kWh, ticarethane ~4,78–7,3 ₺/kWh (kaynaklar arası fark var — teyit gerekli).
- Dağıtım bedeli: ticarethane ~1,88, sanayi AG ~1,39 ₺/kWh; LÜ-2 üretici dağıtım bedeli 0,656 ₺/kWh.
- İkili anlaşma: enerji bileşeni 2026'da ~1,6–2,5 ₺/kWh bandında pazarlık ediliyor (PTF düşük).
- Öz tüketim değeri : satış değeri ≈ 2:1 ila 5:1.

## 5. Yatırım maliyetleri (2026, anahtar teslim)
| Segment | ₺/kW |
|---|---|
| Konut 5 kW | ~24–38 bin |
| Ticari 100 kW | ~31.500 (KDV hariç) |
| 250 kW | ~24.000 |
| 500 kW | ~25.650 |
| 1 MW | ~22.500 |
- Batarya (LiFePO4, ev tipi perakende): ~20–23 bin ₺/kWh (örn. 5 kWh ≈ 113 bin ₺); 6.000+ döngü, 10–15 yıl.
  (8 Ağu 2026 düzeltme, Ozan onayı: eski "10–11 bin ₺/kWh" değeri hücre/büyük ölçek fiyatıydı; ev tipi perakende teknik-depolama.md ile eşitlendi.)

## 6. Hesap metodolojisi
- Öz tüketim oranı varsayılanları: konut bataryasız %25–40 (ama meskende aylık mahsup
  sürdüğünden konut hesabı aylık netleşmeyle yapılır); işletme mesai saatli %70–90; vardiyalı sanayi %85–95.
- İşletme yıllık değer = Üretim × [ÖT% × tam perakende maliyet] + Üretim × [(1−ÖT%) × satış fiyatı];
  satış fiyatı 10 yıl içi: abone grubu çıplak enerji bedeli; sonrası: min(0,9×YEKDEM, güneş saatleri PTF).
  2× tüketim tavanını aşan üretim = 0 gelir.
- Degradasyon: yıl 1 %1–2, sonra yıllık %0,4–0,55 (25. yılda ~%85).
- Tarife artışı: "her yıl %X zam" varsayımı riskli (2026'da PTF nominal düştü) → taban/orta/iyimser üç senaryo.

## ÇELİŞKİ KAYDI (onayda çözülecek)
1. Mesken KDV: ÇÖZÜLDÜ (7 Ağu 2026, 2 bağımsız kaynak) — mesken ve tarımsal sulama %10, ticarethane/sanayi %20 (10 Temmuz 2023'ten beri). kb/tarifeler.md doğruydu.
2. Ticarethane nihai fiyatı: 4,78 vs 6,6–7,3 ₺/kWh → 4,78 muhtemelen eski tablo; teyit edilecek.

## Kaynaklar
Montel, My Enerji, EPİAŞ Şeffaflık, Grentis 2026 rehberi, Paksoy Hukuk, Mondaq, AA,
Esin Avukatlık (11415 Karar), GEM Kurumsal, ENOPTIMAL, GENSED, Azimut Solar, Solar Zirve,
Power Enerji, Piagrid, Renewasoft, Ember Türkiye Electricity Review 2026, Üçay Mühendislik.

## AÇIK SORU (7 Ağustos eklendi — üretici fatura sorusu tetikledi)
3. Veriş yönlü (üretici) dağıtım bedeli: tarife tablosunda LÜ-1 208,1065 / LÜ-2 65,6008 kr/kWh;
   ikincil kaynak (Kaan Gökay) ~28,3 kr/kWh diyor. Hangi bedelin hangi gerilim seviyesine ve
   veriş/çekiş yönüne uygulandığı EPDK metodolojisinden netleştirilecek (tablo dipnotu 5 kesik çıktı).

## İhtiyaç fazlası enerji ödeme takvimi (aylık döngü — LÜY md. 26, EPİAŞ uzlaştırma)

Onay: Ozan, 9 Ağustos 2026 · Kaynak: LÜY md. 26, EPİAŞ uzlaştırma duyuruları, Enerjisa lisanssız üretim SSS.

| Gün | Ne olur |
|---|---|
| Ayın 1-6'sı | Dağıtım şirketi (EDAŞ) sayaçları okur; ihtiyaç fazlası miktarı ayın 6'sına kadar görevli tedarik şirketine (GTŞ) bildirir |
| 1-10. gün | Veriler EPİAŞ Lisanssız Üretim Modülü'ne yüklenir |
| 11. gün | Ön uzlaştırma sonuçları yayınlanır |
| 12. gün 17:30 | Ön uzlaştırmaya itiraz için son saat |
| 15. gün | Faturaya esas kesin uzlaştırma ilan edilir |
| Tebliğ + 10 iş günü | Alacak, üreticinin faturasının/gider pusulasının GTŞ'ye tebliğini izleyen EN GEÇ 10 iş günü içinde IBAN'a ödenir (LÜY md. 26/11) |
| Blokajlı süreçte | GTŞ, EPİAŞ'tan aldığı ödemeyi izleyen ayın 5. iş gününe kadar üreticiye geçirmek zorundadır |

Pratik özet (kullanıcıya böyle anlat): kesin uzlaştırma ayın 15'inde netleşir; para
tebliğden sonra en geç 10 iş günü içinde yatar — kabaca ayın ikinci yarısı/ay sonu.
Ödemeyi EDAŞ değil GTŞ yapar; IBAN tanımı şarttır; meskende gider pusulası düzenlenir.
