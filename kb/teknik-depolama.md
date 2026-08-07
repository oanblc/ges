---
konu: Depolama tekniği — kimya, mimari, backup, boyutlandırma, TR mevzuatı, ekonomi
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
---
# Depolama Tekniği (2026)
## Kimya
- LFP ev standardı: termal kaçış ~270°C (NMC ~210), 4.000-10.000 çevrim (NMC 1.000-2.300), kobaltsız; yoğunluk dezavantajı sabit kurulumda önemsiz.
- DoD↔çevrim ters orantılı; kıyasta DoD referansını eşitle. C-rate: ev tipik 0,5C. Ev bataryasında ömrü fiilen TAKVİM yaşlanması belirler (yüksek SoC bekleme + sıcaklık) → 10-15 yıl; garanti normu 10 yıl/%70.
## Mimari
- DC-coupled (hibrit): %97-98 verim, yeni kurulum standardı. AC-coupled: %90-94, retrofit için. HV (150-600V) büyük sistemde standartlaşıyor (ince kablo, düşük kayıp); inverter-batarya gerilim/haberleşme (CAN/RS485) uyumu garanti şartı.
## Backup
- EPS çıkışı 10-20 ms geçiş (gerçek UPS değil); kritik yük panosu (buzdolabı/aydınlatma/modem/kombi) standart çözüm; tam ev = pik talep + 3 faz hibrit → pahalı. GEN portu + kuru kontak ile jeneratör otomasyonu; off-gridde jeneratör otonomi günü maliyetini düşürür.
## Boyutlandırma
- Konut: Batarya = akşam tüketimi × 1,15 ÷ DoD → TR tipik 5-10 kWh. Pratik: 1 kWp'e 1-1,5 kWh.
- İşletme (saatlik mahsup): 15 dk sayaç profili → load-shifting kWh = mahsuplaşamayan fazla; peak-shaving ayrıca; geri dönüş 3-5 yıl.
- Off-grid: günlük × otonomi (2-3 gün) ÷ DoD ÷ 0,85.
## TR mevzuatı (kritik)
- Depolama ≤ üretim tesisi kurulu gücü (Lisanssız Yön. md.37/6; RG 29.12.2025 değişikliğiyle detay).
- DEPODAN ŞEBEKEYE VERİLEN ENERJİYE ÖDEME YOK; depo çıkışı ölçülemiyorsa fazlanın TAMAMI bedelsiz → projede depo çıkış ölçümü zorunlu; iş modeli öz tüketim maksimizasyonu.
- Mevcut GES'e batarya = TEDAŞ tadilat projesi + kabul. Müstakil depolama = EPDK lisansı (MW başına 70 bin ₺ teminat, üst 45 M₺; önlisans dönemsel askıya alınabiliyor — duyuru takip).
## Güvenlik
- LFP delinmede dahi alev eğilimi çok düşük ("lityum=yangın" algısı NMC/LCO kaynaklı). Yer: garaj/teknik oda/gölge dış cephe; yatak odası olmaz (NFPA 855); menfeze ≥1 m. İdeal 15-30°C; 0°C altı şarj BMS keser. Dış mekân IP65+. Sigortacıya yazılı bildirim — bildirilmemiş kurulum ret gerekçesi.
## Ekonomi
- Çevrim maliyeti: 5 kWh ~113 bin ₺ → ~4-4,7 ₺/kWh-çevrim. Üç zamanlı gece-puant farkı ~3,2 ₺ < çevrim maliyeti → SALT ŞEBEKE ARBİTRAJI MESKENDE KÂRLI DEĞİL (henüz).
- Doğru kurgu: birincil iş GES fazlasını depolamak; üç zamanlı gece tamamlama ikincil. İşletmede bedelsizleşen fazla "kurtarılan gelir" → denklem çok daha iyi.
## SSS
- Akü vs lityum: kWh-ömür maliyeti kurşun asitte 3-4 kat pahalı; günlük çevrimde cevap LFP.
- Kesintide tüm ev çalışmaz (kritik yük panosu); bataryasız on-grid kesintide tamamen durur.
- Sonradan ekleme: AC-coupled veya hibrite geçiş; "battery-ready" hibrit en ucuz yol; TEDAŞ tadilat onayı gerekir.
- V2H: TR'de 2026'da fiilen yok (cihaz arzı + mevzuat çerçevesi eksik) — izlenecek alan.
## Kaynaklar
Ufine, EASYWAY, BSLBATT, ELECO 2023, Anern, DIY Solar Forum, MDPI, EnergySage, PowMr, Aforenergy,
EPEVER, Solar Tech Support, Sungrow Academy, SurgePV, PowerLutions, Solvoltaics, AA, AYSO,
howtostoreelectricity, Alomaliye (RG 29.12.2025), Erdem&Erdem, Hukuki Haber, TEDAŞ, mevzuat.gov.tr,
Enerji Ajansı, Solar Permit Solutions, EcoFlow, Power Enerji, Akıllı Tarife, Fatura Kılavuzu,
Foxtheon, SolaX, Solar Insure, Voltify, Şarj Teknik. (Erişim: 6 Ağustos 2026)
