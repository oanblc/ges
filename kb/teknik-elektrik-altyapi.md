---
konu: Elektrik altyapısı — AG/OG bağlantı, gerilim yükselmesi, koruma, güç kalitesi, trafo, kablo
guncelleme: 2026-08-06
durum: taslak-onay-bekliyor
teyit: AG tahsis oranları (%10/7,5 kW) tek kaynak (Entegro) — Yönetmelik md.7 + EDAŞ usulleriyle teyit; RG 33212 asıl metin teyidi
---
# Elektrik Altyapısı ve Bağlantı (2026)
## Bağlantı seviyeleri
- AG 0,4 kV / OG 34,5 kV. Yönetmelik md.7: AG'den bağlanan üretim toplamı trafo gücünün %50'sini aşamaz.
- Pratik AG tahsisi: küçük trafoda ~7,5 kW; 100-1000 kVA trafoda kişi başı ~%10 (400 kVA→~40 kW); üzeri OG (müşteri trafosu). Kabul süresi: AG 1 yıl, OG 2 yıl.
- Sözleşme gücü kuralı (RG 14.05.2024): sanayi/tarımsal sulama/belediye 2 KATI; mesken/ticarethane sözleşme gücü KADAR. + RG 2 Nisan 2026: yıllık üretim ≤ 2× tüketim + saatlik mahsup (mesken hariç).
## Gerilim yükselmesi (en sık saha sorunu)
- Üretim tepe yaparken hat empedansı gerilimi yükseltir → 253 V üstünde inverter kesilir ("öğlen kapanma").
- Çözüm sırası: AC kesit büyüt/mesafe kısalt → trafo tap ayarı → Q(U)/cos φ reaktif destek → limit genişletme (yalnız EDAŞ onayıyla) → fider güçlendirme talebi. Kırsal hat sonu aboneler en riskli.
## Koruma
- Anti-islanding: şebeke kesilince ~50 ms-sn'de ayrılır; on-grid kesintide üretmez.
- RCD: trafosuz inverterde düzgün DC kaçak → Tip B güvenli seçim (dahili RCMU varsa üretici Tip A'ya izin verebilir — kılavuz esas). 30 mA son kullanıcı / 300 mA selektif.
- Topraklama: TN-C-S ağırlıklı; Topraklamalar Yönetmeliği + TS HD 60364-5-54; eşpotansiyel bara + paratoner irtibat kuralları.
- SPD: DC'de PV-özel Tip 2 (dizi-inverter >10 m ise iki uçta; paratoner varsa Tip 1+2); AC'de inverter çıkışı Tip 2 + ana panoda risk sınıfına göre.
- GES AC panosu kabul isterleri: ayrı pano, inverter başına kesici, RCD, SPD, KİLİTLENEBİLİR ana ayırıcı, çift yönlü sayaç, "GES vardır" etiketi.
## Güç kalitesi
- İnverter TS EN 50549-1 tip test şartı; gerilim ±%10; frekans 47,5-52 Hz; LFSM-O 50,2 Hz üstü güç düşürme; THD akım <%3-5.
- Reaktif: cos φ 0,90end-0,90kap ayarlanabilir; Q(U) gerilim sorununda ilk yazılımsal çözüm; parametreler "EDAŞ görüşü esastır".
## Trafo/OG (işletme)
- Müstakil trafo: AG limiti aşılınca. Boyut: toplam inverter AC ≤ trafo nominal (yük+geri besleme birlikte).
- Hücreler: 630 kVA'ya kadar sigortalı yük ayırıcı; üzeri kesicili+röleli+ölçü. Röle fonksiyonları: 50/51, 50N/51N + 59/27, 81O/U; ayarlar EDAŞ selektivite koordinasyonuna göre, kabulde test raporu.
## Kablo
- Kesit ≈ (2×I×L)/(κ×%ΔU×V). DC solar kablo H1Z2Z2-K 4-6 mm², düşüm hedefi ~%1 (tasarım hedefi); AC kesit GES'te "gerilim yükselmesi" kriteriyle seçilir; toplam kablo kaybı ≤%2-3 hedef.
## SSS
- Trafo dolu reddi: dönemsel kapasite tablolarını izle + alternatif bağlantı noktası + güç düşürme + kendi OG trafosu seçenekleri.
- Öğlen kapanan inverter: gerilim yükselmesi (yukarıdaki çözüm sırası).
- Jeneratör+GES: on-grid inverter jeneratörle senkron ÇALIŞMAZ; enversör kilitleme standart; birlikte çalışma = jeneratör uyumlu hibrit + kontrolör.
- Monofaze/trifaze: aboneliğe göre; ~5 kW üstü trifaze tercih (çoğu EDAŞ şart koşar).
- "9 kW sözleşme gücüm var": mesken → 9 kW'a kadar; sanayi/sulama olsaydı 18 kW.
## Kaynaklar
Entegro, Lexpera (Lisanssız Yön.), Zent, Azimut, Konya kapasite tablosu, Çakmak Avukatlık, GENSED,
SolarVeri, Enerji Ajansı, Veichi, Shielden (2), Grafen, Türkiye Solar Market, SOLANKA, CNC Elektrik,
Onccy, Elektrikport (2), EMO (3 PDF), Yılkomer (2), Siskom, EloEnerji, SDG Solar, SolarEdge EN50549
sertifika, Elektrik Taahhüt, Kontrol Kalemi (3), Eva Elektromekanik, DergiPark, SB Solar, 320volt,
Elektrik Rehberiniz, Aydınlatma Portalı, Güçbir, Oskay. (Erişim: 6 Ağustos 2026)
