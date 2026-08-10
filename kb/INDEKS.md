# Bilgi Tabanı Ana İndeksi — "Hangi soru hangi dosyadan cevaplanır"

Asistanın RAG yönlendirme haritası. Son güncelleme: 6 Ağustos 2026.
Tüm dosyalar kb kökünde yayında (6 Ağustos 2026 onay turu: 21 taslak onaylandı).

## Dosya kataloğu

| # | Dosya | Kapsam |
|---|---|---|
| 1 | tarifeler.md | EPDK resmi tarife tablosu (4 Nis 2026), vergiler, nihai fiyat formülü |
| 2 | kaynaklar.md | Birincil kaynak kataloğu + takip sıklıkları (EPDK/EPİAŞ/RG/TEDAŞ/GİB) |
| 3 | veri/piyasa-canli.json+md | EPİAŞ gerçekleşen PTF (güneş saatleri dahil) + YEKDEM — günlük cron |
| 4 | piyasa-mahsuplasma.md | PTF/YEKDEM analiz, saatlik mahsup kuralları, satış fiyatlandırması, metodoloji |
| 5 | tarifeler-web-arastirma.md (+ -ek.md) | Kademe/SKTT/serbest tüketici/ikili anlaşma detayları |
| 6 | yekdem-kararlari.md | Tahmini YEKDEM kararları zinciri (14718/14460) |
| 7 | fatura-anatomisi.md | Fatura kalemleri, örnek çözümlemeler, üretici faturası, itiraz, reaktif |
| 8 | ekipman-fiyatlar.md | Panel/inverter/batarya türleri+fiyatları, anahtar teslim tablolar |
| 9 | sss-saha-taramasi.md | 46 gerçek soru + 7 yaygın mit |
| 10 | kurulum-bakim.md | Kurulumcu seçimi, dolandırıcılık, statik/yangın, garanti, OPEX, söküm |
| 11 | finansman-sigorta.md | Krediler, KOSGEB, leasing, ESCO, sigorta, vergi |
| 12 | ozel-durumlar.md | Apartman/kiracı/arazi/sulama/imar/OSB/EV şarj hukuku |
| 13 | teknik-pv-fizigi.md | Işınım/PSH, sıcaklık, kayıp zinciri, PR, degradasyon, PVGIS |
| 14 | teknik-elektrik-altyapi.md | AG/OG, gerilim yükselmesi, koruma, güç kalitesi, trafo, kablo |
| 15 | teknik-sistem-tasarimi.md | String hesabı, DC/AC, gölge/sıra arası, yerleşim, tasarım çıktıları |
| 16 | teknik-depolama.md | LFP/mimari/backup/boyutlandırma/depolama mevzuatı/ekonomi |
| 17 | teknik-izleme-akilli.md | İzleme platformları, veri erişimi, HEMS, alarm, siber güvenlik |
| 18 | teknik-ariza-teshis.md | Panel/inverter arızaları, teşhis ağaçları, testler, çevresel |
| 19 | teknik-ozel-uygulamalar.md | Carport, agrivoltaik, yüzer, BIPV/balkon, off-grid, sulama, ısı pompası |
| 20 | teknik-standartlar-kabul.md | IEC/TEDAŞ standartları, kabul testleri, datasheet okuma, işçilik |

## Soru kategorisi → dosya yönlendirmesi

| Kullanıcı sorusu tipi | Birincil | Destek |
|---|---|---|
| "Mantıklı mı / kaç yılda çıkar" | 9, 13 | 1, 3, 8 |
| "Faturam neden/nasıl" | 7 | 1, 4 |
| "Fazla elektriğin parası / satış" | 4, 7 | 6, 3 |
| "Saatlik mahsuplaşma nedir/beni etkiler mi" | 4 | 9, 16 |
| "Ne kadar tutar / hangi panel-inverter" | 8 | 20, 13 |
| "Kredi/destek/sigorta" | 11 | 9 |
| "Süreç/başvuru/izin" | 12, 9 | 14, 20 |
| "Apartman/kiracı/tarla/OSB" | 12 | 9 |
| "Kaç panel sığar / tasarım doğru mu" | 15 | 13, 8 |
| "Trafo reddi / inverter kapanıyor / elektrik tarafı" | 14 | 18 |
| "Batarya ekleyeyim mi / kesintide çalışır mı" | 16 | 4, 8 |
| "Üretimim düştü / arıza" | 18 | 17, 13 |
| "Üretimimi nasıl izlerim / tüketim verim" | 17 | 3 |
| "Kurulumcu güvenilir mi / teslim kontrolü" | 10, 20 | 9 |
| "Teklif kontrolü (vaat/simülasyon/datasheet)" | 13, 15, 20 | 8 |
| "Carport/balkon/bağ evi/sulama/ısı pompası" | 19 | 24, 16, 12 |
| "Sulama/off-grid/carport/ısı pompası KAÇ PARA" | 24 | 19, 8 |
| "Dolandırıcılık şüphesi" | 10, 9 | — |

## Çapraz tutarlılık çıpaları (her cevapta doğru olması gerekenler)
1. Saatlik mahsup 1 Mayıs 2026'da başladı; MESKEN MUAF (aylık devam).
2. Mesken lisanssız sınırı 25 kW; sanayi/sulama/belediye sözleşme gücünün 2 katı, mesken/ticarethane sözleşme gücü kadar.
3. Fazla satış (ilk 10 yıl) = abone grubu ÇIPLAK enerji bedeli; 10 yıl sonrası min(0,9×YEKDEM, PTF).
4. Yıllık üretim > 2× tüketim → aşan kısım bedelsiz; depodan verilen enerji bedelsiz.
5. Mesken kademe eşiği 240 kWh/ay; SKTT sınırı 4.000 kWh/yıl (mesken), 15.000 (işletme).
6. Üretim-tüketim farklı ilde olabilir (RG 14.05.2024).
7. Tarife: 4 Nisan 2026 EPDK tablosu (kuruş hassasiyetli değerler tarifeler.md'de).
8. Fiyat/faiz/prim değişkendir → her rakama tarih damgası + "teklif alın/teyit" notu.

## Ek yayınlar (onay turunda eklendi)

| # | Dosya | Kapsam |
|---|---|---|
| 21 | fatura-analiz-protokolu.md | 7 adımlı fatura analiz algoritması (v2, gerçek faturayla doğrulandı) |
| 22 | fatura-kalem-sozlugu.md | Kalem eş anlamlıları, şirket farkları, anomali belirtileri |
| 23 | ikili-anlasma-fiyatlama.md | 5 fiyatlama tipi, teşhis sırası, SKTT KBK, AOPTF, uzlaştırma düzeltmesi |
| 24 | sistem-turleri-fiyatlar.md | Sulama GES, off-grid paket, carport/EV şarj, ısı pompası paketi, esnek panel — boyutlandırma+fiyat (Ağu 2026) |

## Teyit bekleyen maddeler (haftalık tarama kapatacak)
Son tarife penceresi kontrolü: 1 Temmuz 2026'da YENİ TARİFE YAYIMLANMADI; 4 Nisan 2026 geçerli (7 Ağu 2026, dağıtım şirketi ulusal tarife sayfasından teyit). Sonraki kontrol: Ekim 2026 penceresi.
- GVK esnaf muaflığı sınırı 25 vs 50 kW (konsolide metin 50 gösteriyor)
- Küçük abonelerde reaktif sınır eşikleri (%33/%20 aktarımı)
- SKTT mesken limiti kesin değeri (4.000 — EPDK karar metninden teyit)
- 50 kW ticari ₺/kW (tek EPC kaynağı)
- AG kişi başı trafo tahsis oranları (tek kaynak)
- ~~Mesken KDV %10 vs %20~~ ÇÖZÜLDÜ (7 Ağu): mesken+tarımsal sulama %10, ticarethane/sanayi %20
- Ticarethane nihai fiyat 4,78 vs 6,6-7,3 TL/kWh (kaynaklar ayrışıyor)
- Veriş yönlü dağıtım bedeli (208,1 / 65,6 / ~28,3 kr — üç farklı değer dolaşımda)
- Serbest tüketici limiti 500 kWh/yıl (tek kaynak GENSED; güncel EPDK kararıyla teyit)
- Tarımsal sulama BTV muafiyeti (kb.ts tarimsalAG için işaretli)
- Şarj ağı asgari ünite eşiği 50→150 (2025 taslağı nihai metne girdi mi — RG 23.3.2026 tam metinden teyit)
- 30-90 kW büyük sulama GES anahtar teslim fiyatı (perakende ilan yok)
- 20 kWh sınıfı off-grid hazır paket fiyatı; 300-400 Wp esnek panel fiyatı
- KKYDP hibe üst limiti ~3 M₺ (güncel çağrı metninden teyit)
