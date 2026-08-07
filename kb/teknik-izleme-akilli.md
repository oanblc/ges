---
konu: İzleme, veri erişimi, HEMS/öz tüketim optimizasyonu, alarm teşhisi, veri güvenliği
guncelleme: 2026-08-06
durum: yayin (Ozan onayi 6 Agu 2026)
---
# İzleme ve Akıllı Enerji Yönetimi (2026)
## İzleme mimarisi
- Bulutlar: Huawei FusionSolar (string seviye, veri gecikmeli), Sungrow iSolarCloud (+uzaktan IV-eğrisi teşhisi, API), SolarEdge (PANEL seviyesi, ~15 dk), Growatt Shine (aralık 5→1 dk ayarlanabilir). Karma filo = ikinci sınıf destek; bağımsız doğrulama: meteocontrol VCOM (FusionSolar API), Solar-Log.
- Modbus RTU/RS485 fiili standart; SunSpec register haritaları marka bağımsız okuma; MW ölçeğinde SCADA + meteo istasyonu (piranometre) ile PR hesabı.
## Tüketim verisine erişim (TR)
- OSOS kapsamındaysa EDAŞ portalı (saatlik); serbest tüketici EPİAŞ STP (tys-portal.epias.com.tr); GESMETRİK gibi yerli servisler EDAŞ/EPİAŞ+üretim eşleştiriyor.
- Kapsam dışı mesken pratik yolu: Shelly Pro 3EM (3 faz CT, %1, cihazda 60 gün 1-dk veri, yerel script) veya inverter smart meter (Huawei DTSU666-H — export limitation da yapar). Cihaz bazlı: Tuya ölçümlü priz; NILM TR'de olgun ürün değil.
## Öz tüketim optimizasyonu (saatlik mahsup çağı)
- HEMS: PV+batarya+EV+ısı pompası tek beyin; SG-Ready ısı pompası koordinasyonu; bina termal kütlesi "ısıl batarya".
- Yük kaydırma: bulaşık/çamaşır öğlene, termosifon rölesi PV fazlasında, klima ön soğutma — Shelly ile bulutsuz.
- EV PV-surplus şarj: go-e/evcc sınıfı; işletmede kaydırılabilir yükler (soğutma/kompresör/pompa) üretim saatlerine.
## Alarm/teşhis
- Ciddi: izolasyon (tekrarlıyorsa servis), AFCI ark (ASLA yoksayma), şebeke aşırı gerilim (gevşek AC/zayıf şebeke), fan (derating→öğle tepesi düzleşir).
- Düşüş sırası: uygulama+string kıyası (>%5-10 sapma) → görsel → termal/IV. Yağmur sonrası %5+ sıçrama = kirlenme kanıtı.
## Veri güvenliği
- Forescout 2025: 46 zafiyet, ~35.000 cihaz internete açık → inverter ağını ayrı segmente al, arayüzü internete açma; veri sahipliği sözleşmede kontrol.
- Yerel izleme: Home Assistant (Huawei HACS entegrasyonu — 2021+ firmware'de yalnız inverterin kendi AP'sinden 192.168.200.1, dongle "Modbus TCP Unrestricted"); internet kesilse üretim sürer, yerel kurulum izlemeyi sürdürür.
## SSS
- "Uygulamada üretim var, faturada mahsup yok": uygulama BRÜT, fatura NET; öz tüketim faturada görünmez; saatlik mahsup sonrası "mahsup azaldı"nın başlıca nedeni rejim değişikliği; sayaç parametresi/kabul kontrolü.
- Wi-Fi kopması: dongle yalnız 2.4 GHz; kopukluk üretimi durdurmaz.
- Saatlik tüketim: OSOS/EPİAŞ STP; yoksa Shelly/smart meter.
- "Komşudan az üretiyorum": gölge→yön/eğim→clipping→kirlenme→string uyumsuzluğu; adil kıyas kWh/kWp.
## Kaynaklar
NuraVolt, Solarfox, SolarTech (3), SolarEdge SunSpec, Growatt, ClearSpot, meteocontrol, Solar-Log,
VoltaconSolar, Fronius, TrackSo, Seven Sensor, Dataloggersuite, EPİAŞ (2), Enerji Cebinde, WiTHOR,
Apollo, GESMETRİK, Shelly, SmartHomeScene, Huawei (2), Fonri, MYT, Technopat, gridX, go-e, evcc,
Elli, GENSED, Lion Solar, Üçay, GEM, ENOPTIMAL, Solar Zirve, Gayrimenkul Haber, Aforenergy,
Energy Solutions, Solis, SolaX, Solar Analytica, MY Enerji, MapperX, Geografik, Sahi, Big Enerji,
Anern, Forescout, Industrial Cyber, Help Net Security, GitHub/PyPI/HA Community, HomeShift,
Piagrid, Kerem Çilli, STS, Aurora, RatedPower. (Erişim: 6 Ağustos 2026)
