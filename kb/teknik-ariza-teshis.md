---
konu: Arıza teşhisi — panel arızaları, inverter hataları, teşhis ağacı, testler, çevresel
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
---
# Arıza Teşhisi (2026)
## Panel arızaları
- PID: string ucu panellerde aylar içinde düşüş (%30'a varan); yüksek gerilim+sıcak+nem hızlandırır; anti-PID kutusu STABİLİZE eder, geri döndürmez → erken müdahale.
- Hot-spot: gölge/kuş pisliği/hücre defekti → tek hücre sıcak; yangın riski; termal taramada çıkar.
- Mikro çatlak: gözle görülmez, EL testi ("panel röntgeni"); snail trail = çatlağa nem girmiş görünür sonuç.
- Bypass diyot kısa devresi: panel gücünün ~1/3 kaybı (klasik belirti); termalde bir substring homojen sıcak.
- Delaminasyon/sararma → nem → İZOLASYON HATALARININ sık nedeni. MC4: farklı marka çiftleme yasak; termalde 85-95°C üstü konnektör arızalı.
## İnverter hataları
- İzolasyon düşük: sabah oluşup öğlen geçiyorsa nem; tekrarlıyorsa servis.
- Şebeke aşırı/düşük gerilim: kendiliğinden döner; süreklilik → EDAŞ/ayar.
- DC aşırı gerilim: string tasarım hatası → servis. Fan/sıcaklık: soğuyunca restart OK.
- AFCI/ark: ASLA resetleyip geçme — yangın riski, kesin servis. Yanık kokusu/is/su → restart deneme.
## Teşhis ağaçları
- ÜRETİM SIFIR: inverter ekran/LED → AC sigorta kapat-aç (en sık 30 sn çözüm) → şebeke var mı → AC/DC ayırıcı konumu → hata koduyla servis.
- ÜRETİM DÜŞÜK: kirlilik (%5-15, tozluda %25+) → yeni gölge (ağaç/bina) → string/MPPT kıyası → sıcaklık (normal) → degradasyon (yıllık %0,3-0,5 normal; üstü arıza).
- Mevsim: kış tepe ayları yaza göre %25-50 düşük NORMAL; kıyas geçen yılın AYNI AYIYLA; bölge/komşu kıyası (herkes düşükse hava).
## Testler (TR)
- İzolasyon (megger), IV eğrisi (IEC 62446), termal/drone termografi, EL. Sağlayıcılar: Solarian, MapperX, SW Tech, Big Enerji, Mes Enerji, Proerk. Fiyat teklif usulü ("MW başına, teklifle" yaz).
## Çevresel
- Kuş pisliği en zararlı kirlilik (yağmurla gitmez, hot-spot yapar); kar 1-2 günde kendiliğinden kayar (kazıma!); yosun/liken kenar kirlenmesi fırça ister; sahilde IEC 61701 tuz sisi sertifikası şart; kemirgen kablo hasarı → aralıklı izolasyon/ark hataları (%28 kayıp vakası var).
## Sorumluluk sınırı
- Kullanıcı: uygulama/LED kontrolü, görsel bakı, AC sigorta kapat-aç, basınçsız yıkama.
- KESİN SERVİS: DC tarafının tamamı (string güneşliyken 600-1500 V, DC ark sönmez), konnektör, panel sökme, çatı işi.
- Servis öncesi bilgi paketi: marka/model+hata kodu foto, LED, başlangıç tarihi+önceki olay, üretim grafiği+geçen yıl kıyası, etkilenen string, denenen resetler, sistem yaşı.
## SSS
- Ekran kapalı: gece normal; gündüzse AC/DC ayırıcı → servis.
- Öğlen düz çizgi: her gün aynı yüksek seviyede pürüzsüz = CLIPPING (normal); düşük/düzensiz = gerilim sınırı veya arıza.
- Yağmur sonrası izolasyon: tekrarlıyorsa sızıntı noktası aranmalı.
- %15 yıllık düşüş: kesin sorun (normal %0,3-0,5) → hava→kir→gölge→string→termal+IV sırası.
## Kaynaklar
Nature SciRep 2022, npj MatDeg 2022, Wikipedia, SolarBuy, EnergySage, Solarian, WINAICO,
ResearchGate, GreenLancer, SolarTech, INCURE, PowerOutage.us, Antfea, SolarInfo.ie, Aforenergy (2),
SunPal, OhmSnap 2026, ElectriCare, ReVision, NREL/SPN, MapperX, SW Tech, Mes, Proerk, Geografik,
ScienceDirect 2023, Palmetto, Clean Solar, InBalance, EUROLAB, Coastal Bros, SolarMe, Topcable,
OSHA, Boston Solar. (Erişim: 6 Ağustos 2026)
