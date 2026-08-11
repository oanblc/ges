---
konu: GES sistem türleri — sulama, off-grid, carport/şarj, ısı pompası paketi, esnek panel (boyutlandırma + fiyat)
guncelleme: 2026-08-11
durum: yayin (Ozan talebi 10 Agu 2026; 11 Agu 2026 tutarlilik duzeltmesi: off-grid formul + bag evi senaryosu + sulama ust bandi)
not: Fiyatlar "Ağustos 2026 itibarıyla" perakende/ilan taraması; teknik boyutlandırma detayı teknik-ozel-uygulamalar.md'de. 3 ayda bir güncelle.
---

# GES Sistem Türleri — Boyutlandırma ve Fiyat (Türkiye, Ağustos 2026)

## 1. Tarımsal sulama GES (solar pompaj)
**Boyutlandırma**
- Panel gücü (kWp) ≈ pompa gücü (HP) × 1,3-1,5. Örnek: 5 HP → ~7,5 kWp; 7,5 HP → ~10 kWp (18×600 W); 25 HP → ~27 kWp. (Power Enerji kuralı "HP×1,5"; kb çıpası 1,3-1,5 ile tutarlı.)
- Sürücü (solar pompa inverteri/VFD): pompa gücüne eşit veya bir üst kademe, MPPT'li; 3+ HP tipik 3 faz. Bulutta yavaşlar, durmaz; kuru çalışma koruması standart.
- Batarya YOK — su deposu/damla sulama = depolama (kb çıpası). Girdi verisi: TDH (toplam dinamik yükseklik) + günlük su ihtiyacı (m³).
- Şebekesiz (tipik): panel→VFD→pompa, izin/abonelik gerekmez, sadece güneşliyken çalışır.
- Şebekeli: sulama aboneliği üzerinden lisanssız GES → mahsuplaşma; sulamada kurulu güç sınırı sözleşme gücünün 2 KATI (kb çıpası); sulama elektriğinde KDV %10. Gece de pompaj gerekiyorsa şebekeli/hibrit VFD düşünülür.

**Fiyat bandı (Power Enerji ilan listesi, Ağu 2026; KDV durumu ilanlarda net değil → teklifte teyit)**
| Pompa | Anahtar teslim bant | Tipik alan |
|---|---|---|
| 1-2 HP (0,75-1,5 kW) | 60-80 bin ₺ | 5-20 dönüm |
| 3-5 HP (2,2-3,7 kW) | 95-135 bin ₺ | 20-40 dönüm |
| 7,5-10 HP (5,5-7,5 kW) | 150-250 bin ₺ (7,5 HP montaj dahil 180-200 bin) | 40-80 dönüm |
| 15-30 HP (11-22 kW) | 280-700 bin ₺ (üst uç ~20 HP; 30 HP'ye ekstrapolasyon bandı aşar, aşağıya bak) | 80+ dönüm |
| 30 HP VE ÜZERİ | PROJE BAZLI TEKLİF — perakende ilan yok | — |
- ₺/kWp (editör hesabı, 7,5 HP örneğinden): anahtar teslim ~17-20 bin ₺/kWp.
- Bant sınırı notu (11 Ağu 2026): 30 HP → 39-45 kWp × 17-20 bin ₺/kWp ≈ 663-900 bin ₺, yani ilan bandındaki "700 bin" üst ucunu aşar → 20-30 HP arasında ilan bandına değil ₺/kWp hesabına güven, 30 HP ve üzerinde her durumda proje bazlı teklif.
- 40-120 HP (30-90 kW) büyük sistemler: perakende fiyat İLAN EDİLMİYOR → proje bazlı teklif; TEYİT BEKLİYOR.
- Geri ödeme 2,5-5 yıl (mazot/şebeke çekme alternatifine göre çoğu zaman ilk günden ucuz).

**Hibe/kredi uyumu (Ağu 2026)**
- KKYDP: yatırımın %50'si hibe (KDV hariç, üst limit ~3 M₺ — çağrı metninden teyit edilmeli).
- IPARD 3 (TKDK): %60-75 hibe (genç çiftçi/organik +%10; yenilenebilir enerji harcamasına ek +%10); PV üst sınır 300 kWe. Çağrı takvimi değişken → TKDK duyurusu şart.
- Ziraat Bankası sübvansiyonlu tarım kredisi (5 yıla varan) sulama GES'te kullanılıyor.
- Kaynak: Power Enerji sulama sayfası, Kampa (5,5 HP paket), Dörtyol/TKDK 302.7, Piagrid TKDK sayfası. Son kontrol: 10 Ağu 2026.

## 2. Off-grid (bataryalı bağımsız) sistemler
**Boyutlandırma (kb ORTAK FORMÜL — teknik-depolama.md ve teknik-ozel-uygulamalar.md ile aynı, 11 Ağu 2026)**
- Batarya (kWh) = günlük tüketim (kWh/gün) × otonomi günü ÷ 0,8 (LiFePO4 DoD) ÷ 0,85 (inverter+kablo verimi) ≈ günlük × otonomi × 1,47. Neden: AC tüketim bataryadan inverter kaybı kadar fazla enerji çeker; DoD ve verim bağımsız kayıplardır — tek "÷0,8" batarya boyutunu ~%15 eksik verir.
- Panel (kWp) = günlük tüketim ÷ (kış PSH × 0,75). Kış = boyutlandırıcı; sürekli kış kullanımında panel 2-3× veya jeneratör hibrit.
- Hibrit/off-grid inverter = tepe yük × 1,25; motorlu yük (pompa/buzdolabı) kalkışı 3× → tam sinüs şart.
- Örnek (bağ evi 2,5 kWh/gün, 2 gün otonomi): 2,5×2÷0,8÷0,85 ≈ 7,4 kWh batarya (pratikte 8 kWh sınıfı) + ~1,4 kWp panel + 2,4-3 kVA inverter. Bu profil 55-72 bin ₺'lik küçük paketle KARŞILANMAZ; tiny house paketi (~5 kWh) de alt kalır → 8-10 kWh sınıfı için yayla/müstakil bandına (178-225 bin ₺) veya modüler kuruluma bak.
- 55-72 bin ₺ bandındaki paket (~2-3 kWh akü) ancak ~1 kWh/gün tüketim + 2 gün otonomi profilini taşır (1×2÷0,8÷0,85 ≈ 2,9 kWh): aydınlatma+TV+telefon şarjı; buzdolabı sürekli çalışmaz.

**Hazır paket fiyat bantları (Ağu 2026; SolarDepo "indirimli liste" — KDV durumu ilanlarda belirsiz → sipariş öncesi teyit)**
| Senaryo | Tipik içerik | Bant |
|---|---|---|
| Küçük bağ evi (aydınlatma+TV+şarj) | 2-3 panel + ~2-3 kWh akü | 55-72 bin ₺ |
| Tiny house / konteyner | 3-4 panel + ~5 kWh LFP + 3-6 kW inverter | 60-125 bin ₺ (çamaşır mak. çalıştıran üst bant) |
| Yayla/müstakil ev (klima dahil) | ~4-5 kWp + 5-10 kWh LFP | 178-225 bin ₺ |
| Tam off-grid 10 kWh (9×600 W + 51,2V 200Ah LFP + 6 kW inverter) | — | ~224 bin ₺ (SolarDepo) |
| 20 kWh sınıfı | hazır paket ilanı yaygın değil | TEYİT BEKLİYOR → modüler kur: LFP ~7,8-12 bin ₺/kWh (ekipman-fiyatlar.md) + 10 kW hibrit inverter 65-90 bin ₺ |
- Karavan/küçük ev setleri (Power Enerji): başlangıç 35-78 bin; buzdolabı çalıştıran 45-85 bin; klimalı lüks 70-150+ bin ₺.
- İzin gerekmez (şebekeye bağlanmayan sistem).
- Kaynak: SolarDepo off-grid paket kataloğu, Power Enerji hazır paket/karavan sayfaları, SolarAVM. Son kontrol: 10 Ağu 2026.

## 3. GES'li araç şarj istasyonu (carport)
**İstasyon maliyeti (Ağu 2026)**
- AC 7-22 kW cihaz (KDV dahil perakende): 11 kW ~17,8 bin ₺ (Tunçmatik); 22 kW ~25 bin ₺ (Vestel EVC04, Akakçe) → bant 15-40 bin ₺ + pano/hat/montaj (güç artışı gerekebilir).
- DC (B2B, osarj.com.tr rehberi; cihaz USD): 30 kW ~$10,5 bin; 60 kW ~$15 bin; 120 kW ~$21,5 bin. Kurulum dahil: 80 kW $18-25 bin (~600-900 bin ₺); 120 kW $22-32 bin (~750 bin-1,15 M₺). Trafo/elektrik altyapısı en büyük ek kalem olabilir.
**Carport konstrüksiyon eki**
- Kural: çatı GES'e göre kW başına +%30-50 prim (çelik konstrüksiyon payı ~%45) — teknik-ozel-uygulamalar.md çıpası. ₺/m² perakendede İLAN EDİLMİYOR → teklif kalemi.
- Referans nokta: 2 araçlık hazır solar carport (TommaTech; panel+çelik+inverter+AC şarj cihazı dahil; batarya/montaj/nakliye hariç) 571.705 ₺ KDV dahil (Mil Enerji, Ağu 2026).
- İşletme tipik konfigürasyon: 2-10 araçlık carport (~5-30 kWp) + 2×22 kW AC; filo/müşteri yoğunsa +1 DC 60-120 kW. Öğlen üretim = mesai şarjı örtüşmesi en kârlı senaryo. Yapı ruhsatı/statik gerekir.
**Mevzuat kısa notu**
- Şarj Hizmeti Yönetmeliği (RG 2.4.2022/31797): halka açık/ticari şarj hizmeti = şarj ağı işletmeci LİSANSI veya lisanslı ağdan SERTİFİKA. Kendi filosu/personeli için halka açık olmayan şarj: lisans gerekmez.
- Lisanslı ağ asgari eşiği: 6 ayda 50 şarj ünitesi + 5 farklı ilçe. (2025 taslağında 150 ünite/15 ilçe önerildi — nihai metne girip girmediği TEYİT BEKLİYOR.)
- Değişiklik RG 23.3.2026/33202: fiyat yalnız TL/kWh; kişisel/ev tipi şarj ünitesinin ağa bağlanma zorunluluğu kaldırıldı; 1 Tem 2026'dan itibaren otoyol 50 kW+ DC'de temassız kart zorunlu.
- Kaynak: osarj.com.tr kurulum rehberi, Akakçe, Mil Enerji, EPDK şarj lisansı sayfası, RG 23.3.2026, ENGN özet. Son kontrol: 10 Ağu 2026.

## 4. GES + ısı pompası paketi
**Isı pompası fiyatı (hava kaynaklı, Piagrid derlemesi Mart 2026, KDV dahil)**
- 8 kW monoblok ~85 bin ₺; 10-16 kW bant: Baymak/Arçelik/DemirDöküm/Alarko 130-210 bin ₺; Vaillant/Daikin/Bosch 176-345 bin ₺.
- Montaj+tesisat+buffer+termostat ek: 20-80 bin ₺ (monoblokta bakır boru/gaz işçiliği ~20 bin ₺ tasarruf).
**Hesap kuralı**
- COP/SCOP varsayımı: mevsimsel 3,5-4,0 (premium 4,5-5,0; -25°C garantili modeller mevcut).
- Yıllık ilave elektrik (kWh) = yıllık ısı ihtiyacı ÷ SCOP. Isı ihtiyacı ≈ m² × iklim katsayısı (kaba, TS 825 bölgeleri; yalıtımlı konut varsayımı — EDİTÖR KATSAYISI, proje hesabı şart):
  1. bölge (Akdeniz/Ege kıyı) 40-70 · 2. bölge (Marmara/G.Doğu) 70-100 · 3. bölge (İç Anadolu) 100-140 · 4. bölge (Doğu Anadolu) 140-200 kWh/m²·yıl.
- Örnek: 120 m², 3. bölge → ~14.400 kWh ısı ÷ SCOP 3,5 ≈ 4.100 kWh/yıl ilave elektrik.
**GES boyutuna etkisi**
- 1 kWp ≈ 1.100-1.400 kWh/yıl (TR ortalama) → ısı pompası GES'i tipik +3-4 kWp büyütür (büyük/soğuk bölge ev 8-12 kWp toplam).
- NÜANS (çıpa): mesken AYLIK mahsupta — kış tüketimi yaz fazlasıyla ay bazında netleşmez; denge yıllık ekonomide kurulur, kış faturası tam sıfırlanmaz. Soğutma modunda öğlen üretim=öğlen tüketim → en kârlı eşleşme.
- Kaynak: Piagrid ısı pompası kataloğu (Mart 2026), Konak Mühendislik, VRFTek, Power Enerji. Son kontrol: 10 Ağu 2026.

## 5. Esnek panel (tekne/karavan) — kısa
- Panel (KDV dahil perakende, Ağu 2026; marka aralığı ÇOK geniş): 100 Wp 6,2-12 bin ₺ (Halfcut 6,2 bin; Antfea 8,6 bin; Arçelik 12 bin); 200 Wp 14,9-19 bin ₺. 300-400 Wp esnek: güvenilir ilan bulunamadı → TEYİT BEKLİYOR. Not: W başına rijit panelin 5-10 katı — sadece ağırlık/kavis zorunluysa seç.
- MPPT regülatör: 30 A 2,7-5,4 bin ₺; 40 A 3-5,4 bin ₺; 60 A 6,5-7,1 bin ₺ (Lexron/Mexxsun/Havensis, Akakçe-Argefen).
- Servis aküsü: jel 100 Ah ~7,5 bin ₺, 200 Ah 12+ bin ₺ (Power Enerji); lityum daha pahalı ama 3-5× çevrim ömrü.
- Hazır kit bandı: karavan başlangıç 35-78 bin ₺; buzdolabı+TV seti 45-85 bin ₺ (Power Enerji, Ağu 2026).
- Boyutlandırma: karavan tipik 200-600 Wp; regülatör amperi = panel gücü ÷ akü gerilimi × 1,25.
- Kaynak: Akakçe esnek panel, Antfea, Power Enerji karavan/jel akü/regülatör sayfaları, Munda Solar. Son kontrol: 10 Ağu 2026.

## Kaynak listesi (erişim 10 Ağustos 2026)
Power Enerji (sulama/paket/karavan/regülatör/jel akü/ısı pompası), Kampa, SolarDepo, SolarAVM,
osarj.com.tr, Akakçe, Mil Enerji, Enlife, Enerjitem, EPDK şarj lisansı sayfası, Resmî Gazete
23.3.2026-33202 (şarj değişikliği) ve 2.4.2022-31797 (şarj yönetmeliği), ENGN, Lebib Yalkın,
Piagrid (ısı pompası + TKDK), Konak Mühendislik, VRFTek, Dörtyol Danışmanlık (IPARD 302.7),
Antfea, Munda Solar, Argefen.
