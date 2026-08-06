---
konu: Standartlar (IEC 61215/61730/62446, EN 50549), TEDAŞ şartları, kabul testleri, datasheet okuma, işçilik
guncelleme: 2026-08-06
durum: taslak-onay-bekliyor
---
# Standartlar, Kabul Testleri, Datasheet (2026)
## Panel standartları
- IEC 61215:2021 (tip onayı): termal çevrim -40/+85 ×200, damp heat 85/85 1000 saat, mekanik 2400 Pa (kar bölgesi 5400 Pa), dolu ~25mm/23 m/s, hot-spot, UV, bypass diyot; test başına kayıp ≤%5.
- IEC 61730 (güvenlik) — CE esasen bunun beyanı (performans kanıtı DEĞİL). PID: IEC TS 62804.
- Doğrulama: sertifika no'yu veren kuruluşun veritabanında sorgula (TÜV Certipedia, VDE); model kodu etiketle birebir eşleşmeli. TSE, TS EN IEC 61215/61730 üzerinden belgeler — TEDAŞ kabul eder.
- Şüpheli panel işaretleri: model kodu uyuşmazlığı, seri no doğrulanamıyor, flash test raporu yok, "B-grade" fiyat, etiketsiz.
## İnverter
- TS EN 50549-1:2019 uygunluk sertifikası temel belge; anti-islanding EN 62116.
- "TEDAŞ onaylı inverter listesi" KAMUYA AÇIK YOK — proje bazında sertifika değerlendirmesi (Elektromekanik Ekipman Kriterleri dokümanı); röle ayarları EDAŞ değerlerine set edilir, kabulde tutanağa geçer.
## TEDAŞ süreç
- ≤100 kW kabul: Bölge Koordinatörlükleri; ≤1.000 kW proje+kabul: Bölge Müdürlükleri.
- Proje dosyası: bağlantı anlaşması, tek hat+string planı+koruma koordinasyonu+topraklama projesi, kataloglar+sertifikalar, statik yazı, röle ayar listesi.
- Geçici kabulde sahada: projeye birebir uygunluk, malzeme seri no/model eşleşmesi, topraklama ölçümü, izolasyon raporları, röle set doğrulaması, etiketleme, sayaç.
## IEC 62446-1 devreye alma testleri (kullanıcının isteyeceği rapor)
- Sıra: süreklilik → polarite → string Voc (datasheet×N, sıcaklık düzeltmeli) → string akım (±%5) → izolasyon (≥1 MΩ) → fonksiyon (ada durması dahil) → (ek) IV eğrisi + termal.
- Rapor içeriği: tek hat+string planı, seri no listesi, string başına Voc/Isc/izolasyon tablosu (ışınım+sıcaklıkla), topraklama ölçümü, röle ayarları, test cihazı kalibrasyonu, imza+tarih, garanti belgeleri.
## Datasheet okuma (altın içerik)
- Panel: Pmax (STC — çatıda sürekli görülmez, normal), Voc (string güvenlik sınırı), Isc (sigorta/kablo), verim (=alan, geniş çatıda ₺/W daha önemli), γPmax (sıfıra yakın iyi; -0,26..-0,30 iyi bant), NOCT (düşük iyi), mekanik yük (kar bölgesi 5400 Pa), dolu sınıfı, garanti eğrisi (ürün garantisi asıl önemli).
- İnverter: MPPT aralığı, maks DC gerilim (kesin sınır), EURO verim (tepe değil), MPPT sayısı, IP sınıfı, dB.
- "3 sayı": γPmax + ürün garantisi/25-30. yıl % + mekanik yük. İnverterde: MPPT aralığı + maks DC + Euro verim.
## İşçilik
- DC kablo EN 50618 H1Z2Z2-K; UV korumasız kanal/NYY açıkta kabul edilemez.
- MC4 ÇAPRAZ ÇİFTLEME YASAK (IEC 62852 + garanti; çatı yangınlarının başlıca nedeni); kalibre crimp aleti şart.
- Teslim öncesi 10 madde fotoğraf listesi: aynı marka konnektör, UV kanal, kablo çatıya değmiyor, DC etiketleri, topraklama her rayda, kelepçe tork izi, inverter havalandırma+gölge, delme sızdırmazlığı, kesiciler erişilebilir+işaretli, seri no eşleşmesi.
## SSS
- "580W gerçek mi": seri no bazlı FLASH TEST raporu iste (Pmax 0/+5W toleransta); şüphede saha IV testi.
- İkinci el panel: önerilmez (garanti yok, string'i en zayıfa çeker, TEDAŞ sertifika sorunu).
- Test raporu vermeyen kurulumcu: ödemeyi rapora bağla; vermezse bağımsız EMO'lu mühendise ölçüm — hukuki delil.
## Kaynaklar
Sinovoltaics (2), JVG Thoma, Coulee, Kite, Solarian, SGS TR, TEDAŞ (3 doküman), SEDAŞ, Lexpera,
SDG Solar, SolarEdge TR sertifika, Wattuneed, TestOne, Otomasyon AVM, Mi Enerji, Drita, EMO,
LONGi, GP Solar, Kerem Çilli, Qbits, Smart Roof, Stäubli, AltEnergyMag, Omnisol, Solarblogger,
ETK, Solaris, Solar Bakım, Solar Konsept, EnerjiBaba. (Erişim: 6 Ağustos 2026)
