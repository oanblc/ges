# Asistan Regresyon Raporu — 2026-08-06

| # | Kategori | Denetçi | Süre | Not |
|---|---|---|---|---|
| 1 | mit | ONAY ✓ | 55 sn |  |
| 2 | mevzuat | SORUN ✗ | 110 sn | - [Cevap "*Bu yanıt bilgilend" ile yarıda kesilmiş; zorunlu "bağlayıcı görüş değ |
| 3 | fatura | ONAY ✓ | 53 sn |  |
| 4 | fiyat-eksik | ONAY ✓ | 29 sn |  |
| 5 | teknik | ONAY ✓ | 52 sn |  |
| 6 | apartman | ONAY ✓ | 50 sn |  |
| 7 | depolama | ONAY ✓ | 80 sn |  |
| 8 | dolandiricilik | SORUN ✗ | 127 sn | - Yatırım/karar sorusu olmasına rağmen cevapta "bağlayıcı görüş değildir" notu y |

---

## 1. [mit] kışın güneş paneli çalışmıyormuş, doğru mu? bizim buralar soğuk olur

Kısa cevap: **yanlış bir bilgi.** Panel kışın da çalışır — hatta soğuk, panelin *arkadaşıdır*. İki şeyi karıştırmak lazım:

**1) Soğuk ≠ verim düşüşü (tam tersi)**
Paneller ısındıkça güç kaybeder. Her panelin bir "sıcaklık katsayısı" vardır (ısı arttıkça gücün ne kadar düştüğünü gösteren değer); modern TOPCon panellerde yaklaşık her +1 °C için %0,3 kayıp. Yani Türkiye'de üretim rekorları yazın 40 derecede değil, **soğuk ve güneşli bahar/kış günlerinde** kırılır. "Sıcak yerde panel daha çok üretir" yaygın bir mittir.

**2) Kışın üretimi düşüren şey gün uzunluğu ve bulut**
Güneşin açısı düşük, gün kısa, bulut daha fazla → üretim yazın tepe aylarına göre **%50-70 daha az** olur. PVGIS verisiyle örnek (1 kWp panel başına aylık üretim):

| | Ocak | Temmuz | Fark |
|---|---|---|---|
| Ankara | 65 kWh | 170 kWh | ~2,6 kat |
| Antalya | 92 kWh | 163 kWh | ~1,8 kat |

Yıllık üretimin yaklaşık %60'ı Nisan-Eylül arasında gerçekleşir. Yani kış "sıfır" değil, "az" demek. Fizibilite de bu yüzden tek bir ayla değil **yıllık ortalamayla** yapılır.

**Kar meselesi**
Kar panelin üstünde birikirse o gün üretim durabilir; ama eğimli montajda kar genelde 1-2 günde kendiliğinden kayar (panel yüzeyi cam ve montaj eğimli olduğu için). Önemli uyarı: **karı kürekle/sert bir şeyle kazımayın** — panel yüzeyini çizmek kalıcı kayıp demek. Karlı bölgedeyseniz iki şeyi teklifte özellikle arayın: (a) panelin mekanik yük sınıfı — kar bölgesi için 5400 Pa (IEC 61215), (b) kar yükünü hesaba katan statik uygunluk yazısı.

**Dürüst olmak gerekirse tek gerçek dezavantaj şu:** Meskenlerde mahsuplaşma aylık işliyor (saatlik mahsuplaşma 1 Mayıs 2026'da başladı ama **mesken muaf** — RG 02.04.2026 sayı 33212 + RG 05.05.2026/33244). Bu yüzden yazın ürettiğiniz fazlayı kışa taşıyıp kış faturanızı sıfırlamak mümkün değil; kış aylarında faturanız yine bir miktar gelir. Ayrıca hiçbir dönemde fatura tam sıfırlanmaz, çünkü dağıtım bedeli ve vergiler üretimden bağımsız olarak tahsil edilir (EPDK 4 Nisan 2026 tarifesi).

Kışın ne kadar üreteceğiniz büyük ölçüde ilinize bağlı (Karadeniz'de yıllık 1.200-1.400 kWh/kWp, Güneydoğu'da 1.600-1.800 kWh/kWp). İsterseniz **konut mu işletme mi, ortalama aylık elektrik faturanız kaç TL ve hangi ildesiniz** — bu üçünü yazarsanız size özel, aylık kırılımlı bir fizibilite çıkarayım.


## 2. [mevzuat] tarlama güneş paneli kurup elektriği satmak istiyorum, izin alabilir miyim?

Kısa cevap: **mümkün ama üç ayrı filtre var** — arazinin sınıfı, kurabileceğiniz güç sınırı ve "satış" beklentinizin mevzuattaki karşılığı. Çoğu proje ilk adımda değil, sonraki adımlarda hayal kırıklığı yaratıyor; o yüzden üçünü ayrı ayrı anlatayım.

## 1) Arazi sınıfı: en kritik eşik
Tarım arazisine GES kurulumu **yalnızca "kuru marjinal tarım arazisi"** için gündeme alınıyor (RG 04.04.2026 tarihli yönetmelik + Tarım Bakanlığı 2023/6 Genelgesi). Mutlak tarım arazisi, dikili arazi, sulu arazi ve özel ürün arazileri **kapsam dışı** — bu sınıflarda başvuru değerlendirmeye bile alınmıyor.

İlk adımınız kurulumcu görüşmesi değil, **İl Tarım ve Orman Müdürlüğü'nden arazi sınıfı tespiti**, ardından gerekiyorsa **tarım dışı kullanım izni** almak. Buradan çıkmazsa gerisi teoride kalır.

Çatı GES'ten farklı olarak arazi GES'te **imar/ruhsat süreci vardır**; çevre çiti, kamera, paratoner de fiili standart hâline geldi.

## 2) Güç sınırı: "satış" beklentisini asıl sınırlayan kural
Lisanssız üretimde kurabileceğiniz güç, tarlanın büyüklüğüne göre değil **mevcut aboneliğinizin sözleşme gücüne** göre belirlenir (RG 14.05.2024):

- **Tarımsal sulama, sanayi ve belediye abonelikleri:** sözleşme gücünün **2 katı**
- **Mesken ve ticarethane:** sözleşme gücü **kadar**

Yani örneğin 9 kW sözleşme güçlü bir sulama aboneliğiyle üst sınır 18 kW'tır; "arazim büyük, 500 kW kurarım" mümkün değildir. Mesken tarafında ayrıca 25 kW'lık lisanssız sınır geçerlidir.

## 3) "Elektriği satmak" — burada beklentiyi düzeltmem gerekiyor
Lisanssız üretim bir **elektrik satış işi değil, kendi tüketiminizi mahsuplaşma** rejimidir:

- Satabileceğiniz miktar **geçmiş yıl tüketiminizle sınırlı**. "İstediğim kadar üretir satarım" en yaygın yanlışlardan biri.
- Yıllık üretiminiz önceki yıl tüketiminizin **2 katını** aşarsa, aşan kısım **bedelsiz** YEKDEM'e gider (RG 02.04.2026 çerçevesi).
- Fazlanın fiyatı perakende fiyat değil: ilk 10 yıl **abone grubunuzun çıplak enerji bedeli** (dağıtım ve vergiler hariç), 10 yıl sonrası min(0,9×YEKDEM, PTF). Pratikte satış geliri, kendi tükettiğiniz kWh'in değerinin yaklaşık **1/4–1/6'sı** kadardır.
- Tarımsal abonelik/sulama **1 Mayıs 2026'dan beri saatlik mahsuplaşma** kapsamındadır (RG 02.04.2026; usul ve esaslar RG 05.05.2026, EPDK Kararı 14531). Kışın ürettiğinizi yaz tüketiminize saklayamazsınız; gündüz fazlası akşamı silmez. Mesken bu kuraldan muaftır, tarımsal tesis muaf değildir.

**İyi haber:** üretim ile tüketimin aynı ilde olma şartı kalktı (RG 14.05.2024, sayı 32546). Tüketiminiz başka ildeyse bile tarladaki üretimle eşleştirebilirsiniz.

Tüketiminizden bağımsız, gelir amaçlı satış yapan bir santral kurmak istiyorsanız bu **lisanslı üretim** rejimine girer; o rejimin başvuru ve kapasite tahsis detayları bilgi tabanımda net değil — **danışmanımıza iletebilirim**.

## Pratik yol haritası
1. İl Tarım Müdürlüğü'nden arazi sınıfı tespiti (kuru marjinal mi?)
2. Tarım dışı kullanım izni
3. Mevcut aboneliğinizin sözleşme gücünü öğrenin → üst sınırınızı hesaplayın
4. Dağıtım şirketine bağlantı başvurusu (çağrı mektubu) — trafo kapasitesi kontrolü
5. TEDAŞ proje onayı + imar/ruhsat
6. Kurulum ve geçici kabul

En doğru başlangıç, sulama/tüketim profilinize göre **kaç kW'ın gerçekten mantıklı olduğunu** hesaplamak. İsterseniz şu üç bilgiyi paylaşın, rakamsal fizibiliteyi çalıştırayım: (1) tüketim konut mu işletme/tarımsal mı, (2) aylık ortalama elektrik faturanız (TL), (3) il. Tarımsal sulamada ayrıca tüketiminizin ağırlıklı olarak gündüz mü olduğunu belirtin — saatlik mahsupta bu oran sonucu doğrudan değiştiriyor.

*Bu yanıt bilgilend


## 3. [fatura] panel taktırdım ama hala fatura geliyor, kandırıldım mı?

Hemen şunu söyleyeyim: **fatura gelmeye devam etmesi tek başına dolandırıldığınız anlamına gelmiyor.** Bu, GES hakkındaki en yaygın yanlış beklenti — "panel taktırınca fatura sıfırlanır" cümlesi maalesef doğru değil. Nedenleri sırayla:

**1) Dağıtım bedeli ve vergiler mahsuplaşmaz**
Faturanın içindeki dağıtım bedeli (şebekeyi kullanma ücreti), şebekeden çektiğiniz her kWh için ödenir; ürettiğiniz enerji bunu silmez. Mesken için dağıtım bedeli 2,4249 ₺/kWh (EPDK 4 Nisan 2026 tarifesi) — yani düşük tüketimli bir mesken faturasının kabaca **%70-75'i** dağıtım + vergi kalemleridir. Gerçekçi beklenti fatura tamamen sıfır değil, **%70-90 azalma**.

**2) Şebekeye verdiğiniz enerji, çektiğinizden daha düşük değerlenir**
Öz tüketim (üretip anında kullandığınız) tam perakende fiyattan değer kazanır; fazlayı şebekeye verdiğinizde ise yalnızca **çıplak enerji bedeli** ödenir (dağıtım ve vergi yok). Yani "1 kWh verdim, 1 kWh bedava çekerim" değil.

**3) Mevsimsellik ve mahsup gecikmesi**
Kışın üretim %50-70 düşer; yaz fazlası alacağınız da **takip eden dönem** faturasına yansır. Üst üste iki dönem hiç mahsup satırı görmüyorsanız, o zaman gerçekten sorgulanacak bir durum var.

**4) İşletme aboneliğiyseniz durum değişti**
1 Mayıs 2026'dan itibaren ticarethane/sanayi/tarımsal aboneler **saatlik mahsuplaşmaya** geçti (RG 02.04.2026 sayı 33212). Yani gündüz ürettiğiniz fazla, akşam tükettiğinizi artık silmiyor — kurulum öncesi size aylık mantıkla hesap yapıldıysa tasarruf beklenenin altında kalır. **Mesken aboneleri bu değişiklikten muaf**, aylık mahsup devam ediyor.

**5) Sık karşılaşılan gerçek hatalar da var**
Yanlış abone grubu tarifesi uygulanması, mahsup satırının hiç işlenmemesi, çift yönlü sayaç parametresinin yanlış kurulması, ya da işletmelerde GES sonrası ilk kez çıkan **reaktif ceza** (GES şebekeden çekişi azalttığı için reaktif oranı fırlar, kompanzasyonun yeniden ayarlanması gerekir).

---

İsterseniz faturanızı gerçekten çözümleyeyim — kandırılıp kandırılmadığınız ancak rakamlarla anlaşılır. Bana şu satırları yazarsanız kalem kalem çapraz doğrulama yapabilirim:

- **Abone grubu** (mesken mi, ticarethane/sanayi mi)
- **Tüketim (kWh)** — faturadaki çekiş miktarı
- **Aktif enerji bedeli (TL)**
- **Dağıtım bedeli (TL)**
- Varsa: fatura dönemi, "muhtelif mahsup/tenzil" satırı ve tutarı, inverter uygulamanızın o ay gösterdiği üretim (kWh)

Bir de şunu ayrıca kontrol edin: **inverter uygulamanızdaki üretim − faturadaki veriş = öz tüketiminiz.** Öz tüketim hiçbir sayaçtan geçmediği için faturada görünmez; "üretimim nereye gitti" sorusunun cevabı çoğu zaman burada saklıdır ve sisteminizin çalıştığının kanıtıdır.


## 4. [fiyat-eksik] 10 kW sistem kaç paraya kurulur?

## 10 kW çatı GES — Ağustos 2026 fiyat aralığı

Bilgi tabanımdaki anahtar teslim fiyat bantları (Ağustos 2026 itibarıyla, ekipman-fiyat taramamız):

| Kalem | Değer |
|---|---|
| Konut 10 kW anahtar teslim | **200–300 bin ₺** (≈20–30 bin ₺/kW) |
| Saha taramamızdaki üst bant | 300–480 bin ₺ (bazı kurulumcu listeleri) |
| Batarya eklenirse (hibrit + 10 kWh) | Toplam maliyet **%40–60** artar |

Bantlar geniş; iki kaynak grubumuz arasında fark var (bu yüzden tek bir EPC listesine dayanmayın, **en az 3 teklif** alın). Fiyatı belirleyen ana kalemler: panel %35–40, inverter %12–15, konstrüksiyon %10–15, işçilik %12–15, kablo/pano %8–10, proje-izin %3–5.

**Karşılaştırmayı ₺/kW üzerinden yapın**, toplam fiyat üzerinden değil. Ayrıca teklifte şunlar yazılı olmalı: marka/model listesi, çatı tipi (sandviç/trapez sac en ucuz, kiremit özel kanca ister, beton teras balastlı en pahalı), başvuru+proje+sayaç+devreye alma dahil mi, garanti süreleri.

**İki not:**
- 10 kW yılda kabaca 12–15 bin kWh üretir; çoğu konut için 3–6 kW yeterlidir. Yani "10 kW" sizin için gereğinden büyük olabilir — doğru güç, faturanızdan çıkar.
- Fiyatlar kur ve işçilikle değişken; bu rakamlar Ağustos 2026 damgalı, 3 ayda bir güncellenmesi gerekiyor.

Sizin durumunuza uygun gücü ve geri dönüş süresini hesaplayabilmem için üç şeye ihtiyacım var: **(1)** konut mu işletme mi, **(2)** aylık elektrik faturanız (TL), **(3)** hangi ildesiniz? (İşletmeyse ayrıca gündüz mü akşam mı yoğun çalışıyorsunuz.) Bunları yazarsanız fizibilite hesabını çalıştırıp net bir tablo çıkarayım.


## 5. [teknik] inverterim öğlen saatlerinde kendini kapatıyor, arızalı mı?

Büyük olasılıkla arıza değil — bu, Türkiye'de çatı GES'lerinde en sık görülen saha sorunu: **şebeke gerilim yükselmesi**. Yine de birkaç olasılığı ayırmamız gerekiyor.

## Önce ayırt edelim: gerçekten kapanıyor mu, "kırpma" mı?

- **Üretim grafiği öğlen düz bir çizgi hâlinde ama yüksek seviyede ve pürüzsüzse** → bu *clipping* (kırpma). İnverterin AC gücü panel gücünden küçük olduğunda tepe saatlerde üretimi tavanda tutmasıdır. Tamamen normaldir, arıza değil (DC/AC oranı 1,1-1,3 standart tasarım).
- **Üretim sıfıra düşüyor, sonra kendiliğinden geri geliyorsa** → aşağıdaki nedenlere bakacağız.

## En olası neden: aşırı gerilim (over-voltage) kesmesi

Panelleriniz tepe güçte üretirken şebekeye enerji basar; hattın empedansı yüzünden bağlantı noktasındaki gerilim yükselir. Gerilim üst sınırı (**nominalin +%10'u, yani ~253 V**) aştığında inverter, TS EN 50549-1 şebeke bağlantı standardı gereği kendini **güvenlik amacıyla** ayırır. Gerilim düşünce geri döner — bu yüzden "sadece öğlen" olur.

Risk grubu: uzun AG hattının sonundaki, trafoya uzak abonelikler (özellikle kırsal).

**Çözüm sırası** (ucuzdan pahalıya, bilgi tabanımızdaki standart yaklaşım):
1. İnverter–pano arası **AC kablo kesitini büyütmek** / mesafeyi kısaltmak
2. Dağıtım trafosunun **kademe (tap) ayarı** → dağıtım şirketi işi
3. İnverterde **Q(U) / cos φ reaktif destek** parametresi — genelde yazılımsal ilk çözüm
4. Gerilim koruma limitinin genişletilmesi — **yalnızca EDAŞ onayıyla**, kendi başınıza yapılmaz
5. Fider güçlendirme talebi (dağıtım şirketine yazılı başvuru)

## Diğer olasılıklar

| Belirti | Muhtemel neden | Ne yapmalı |
|---|---|---|
| Tepe düzleşiyor, gövde çok sıcak, fan sesi yok/anormal | Sıcaklık derating veya fan arızası | Havalandırma boşluğu (30-45 cm), gölge; fan arızası → servis |
| Sabah "izolasyon hatası", öğlene doğru geçiyor | Nem (ters yönlü belirti) | Tekrarlıyorsa servis |
| Ekranda **AFCI / ark hatası** | DC ark riski | **Asla resetleyip devam etmeyin** — yangın riski, kesin servis |
| Yanık kokusu, is, su izi | Ciddi | Restart denemeyin, servisi çağırın |

## Sizin güvenle yapabileceğiniz kontroller

- İnverter ekranındaki/uygulamadaki **hata kodunun fotoğrafını** çekin ve olay kaydını (log) inceleyin — kod "over voltage / grid voltage high" diyorsa teşhis netleşir.
- Uygulamada **AC gerilim** değerini öğlen tepe saatinde okuyun; 250 V ve üzeri görüyorsanız neden hemen hemen kesindir.
- Gerekirse AC sigortayı kapat-aç yapabilirsiniz.

⚠️ **DC tarafına dokunmayın**: paneller güneş varken 600-1500 V üretir ve DC arkı kendiliğinden sönmez. Panel, konnektör, çatı işleri yetkili servis işidir.

---


## 6. [apartman] kiracıyım, oturduğum evin çatısına panel taktırabilir miyim?

Kısa cevabı: **evet, kiracı da kurabilir** — bunun "kiracı kuramaz" diye bilinmesi sahadaki en yaygın yanlışlardan biri. Ama tek başınıza karar veremezsiniz; birkaç şartı sırayla geçmeniz gerekiyor.

## 1) Olmazsa olmaz: mülk sahibinin noter onaylı muvafakati
Çatı size ait olmadığı için dağıtım şirketi başvuru dosyasında mülk sahibinin **noter onaylı muvafakatini** arar. Sözlü izin veya yazılı taahhüt yeterli olmaz.

## 2) Apartman/site ise ikinci bir kapı var
Müstakil evde tek engel mülk sahibi. Apartmanda çatı **ortak alan** (Kat Mülkiyeti Kanunu, 634):
- Ortak alan aboneliği (asansör, merdiven aydınlatması) için Yargıtay içtihadı bunu "faydalı yenilik" (m.42) sayıyor → **sayı ve arsa payı çoğunluğu** yeterli olabiliyor.
- Tek daireye özel kurulumda ise dağıtım şirketleri pratikte noter onaylı kat malikleri kurul kararı/muvafakat istiyor; yönetim planında yasak varsa iş orada tı


## 7. [depolama] elektrik kesilince panellerim evi beslemeye devam eder mi?

Kısa cevap: **hayır** — standart (bataryasız, "on-grid" yani şebekeye bağlı) bir çatı GES'inde elektrik kesildiğinde panelleriniz de durur. Bu bir arıza değil, zorunlu bir güvenlik özelliği.

**Neden?**
İnverterde "ada oluşumu önleme" (anti-islanding) koruması vardır: şebeke gerilimi kaybolduğunda inverter kendini yaklaşık 50 ms–birkaç saniye içinde şebekeden ayırır ve üretimi keser. Amaç, hatta çalışan dağıtım şirketi ekiplerinin sizin panelinizden gelen enerjiyle çarpılmasını önlemek. Bu, inverterlerin tip test şartı olan TS EN 50549-1 / EN 62116 kapsamında zorunludur. Yani güneş tepede olsa bile, kesinti sürerken sisteminiz beklemede kalır.

**Kesintide beslemek istiyorsanız üç seçenek var:**

1. **Hibrit inverter + batarya (en yaygın çözüm).** Hibrit inverterlerin "EPS" adı verilen yedek çıkışı, kesintide 10–20 ms içinde devreye girer. Ama dikkat: bu gerçek bir UPS değil, çok kısa bir kararma olur.
2. **Kritik yük panosu.** Pratikte tüm evi beslemek yerine buzdolabı, aydınlatma, modem, kombi gibi hayati yükler ayrı bir panoya alınır. Tüm evi yedeklemek (özellikle 3 fazda) maliyeti hızla yukarı çeker.
3. **Jeneratör.** Şebekeye bağlı standart inverter jeneratörle senkron çalışmaz; birlikte kullanım için jeneratör uyumlu hibrit inverter + kontrolör gerekir.

**Maliyet tarafı (Ağustos 2026 verisi, mutlaka teklifle teyit edilmeli):** LiFePO4 batarya perakendede ~7.800–12.000 ₺/kWh; 10 kW'lık bir konut sisteminde hibrit inverter + 10 kWh batarya toplam yatırımı yaklaşık **%40–60 artırır**. Meskende bataryayı tek başına "kâr aracı" olarak düşünmemek gerekiyor: konutta aylık mahsuplaşma sürdüğü için şebeke zaten sizin için bir "sanal batarya" gibi çalışıyor (saatlik mahsuplaşma 1 Mayıs 2026'da başladı, ancak **meskenler muaf** — RG 02.04.2026 ve RG 05.05.2026/33244). Dolayısıyla meskende bataryanın asıl gerekçesi ekonomi değil, **kesinti sigortası** ve konfor. Ayrıca mevzuat gereği depolamadan şebekeye verilen enerjiye ödeme yapılmıyor; bu enerji bedelsiz olarak sisteme geçiyor (lisanssız üretim mevzuatı, bilgi tabanı: saatlik mahsuplaşma ve depolama notları).

İki not daha:
- Mevcut bir GES'e sonradan batarya eklemek mümkün, ama TEDAŞ tadilat projesi + kabul gerekir. Yeni kuruyorsanız "battery-ready" hibrit inverter seçmek, sonradan eklemenin en ucuz yolu.
- Bataryayı sigortacınıza yazılı bildirin; bildirilmemiş kurulum hasar reddi gerekçesi olabiliyor.

Bu yanıt bilgilendirme amaçlıdır, bağlayıcı bir görüş değildir; nihai karar öncesi en az iki bağımsız teklif almanızı öneririz.

Bölgenizde kesinti sıkça yaşanıyorsa, hangi yükleri yedeklemenin mantıklı olduğunu ve batarya boyutunu birlikte çıkarabiliriz. İsterseniz **konut mu işletme mi olduğunuzu, aylık elektrik faturanızı (TL) ve ilinizi** yazın; sistem büyüklüğü ve geri dönüş süresi için hesabı çalıştırayım.


## 8. [dolandiricilik] bir firma güneş tarlasından aylık 2000 TL kira garantisi veriyor, yatırayım mı?

## Kısa cevabım: Bu model, bilgi tabanımdaki dolandırıcılık kalıbına neredeyse birebir uyuyor. Acele etmeyin.

**"Aylık sabit kira garantisi" ifadesi, GES gelirinin nasıl oluştuğuyla bağdaşmıyor.** Sebebini üç başlıkta açıklayayım.

### 1. Bu kurguda gelirin "iyi bacağı" hiç yok
Bir güneş santrali iki yoldan para kazandırır:
- **Öz tüketim / mahsuplaşma:** Ürettiğiniz elektriği kendi tesisinizde kullanırsınız; enerji + dağıtım + vergiler dahil tam perakende fiyat kadar tasarruf edersiniz. Gelirin asıl kaynağı budur.
- **Şebekeye satış (ihtiyaç fazlası):** Yalnızca **çıplak enerji bedeli** ödenir — dağıtım ve vergiler yoktur, üstelik üretici yönlü dağıtım bedeli de kesilir. Bilgi tabanımdaki bantla: satış geliri, öz tüketim değerinin kabaca **1/4 – 1/6'sı** kadardır (piyasa-mahsuplasma.md).

"Uzakta bir tarladan kira alıyorum" kurgusunda sizin bir tüketiminiz yok, dolayısıyla **gelirin güçlü bacağı olan öz tüketim tamamen devre dışı**. Elinizde sadece en zayıf bacak kalıyor.

### 2. Satış fiyatı mevzuatta sabit değil, kademeli ve sınırlı
- **İlk 10 yıl (YEKDEM alım garantisi süresi):** fazla enerji, abone grubunun **çıplak enerji bedelinden** alınır. Örnek olarak Mayıs 2026'da OG sanayi için bu net ~2,25 ₺/kWh idi — ama bu, tarife her çeyrek değiştiği için sabit değil (EPDK tarifeleri Ocak/Nisan/Temmuz/Ekim'de güncelliyor; yürürlükteki tablo 4 Nisan 2026).
- **10 yılını dolduran tesisler:** formül `min(0,9 × YEKDEM, PTF)`'ye geçer. Burada oynaklık çok yüksek: EPİAŞ gerçekleşen verisinde güneş saatleri PTF ortalaması Haziran 2026'da 404 ₺/MWh, Ağustos 2026'da 2.195 ₺/MWh — aynı yaz içinde ~5 kat fark.
- Ayrıca **satış miktarı geçmiş yıl tüketimine bağlıdır**; yıllık üretim önceki yıl tüketiminin 2 katını aşarsa aşan kısım **bedelsiz** olarak YEKDEM'e gider (RG 02.04.2026 saatlik mahsuplaşma düzenlemesi + INDEKS çıpaları).

Yani ne fiyat sabit, ne miktar sınırsız. Bu zeminde hiçbir kurulumcu ya da işletmeci "her ay şu kadar TL" taahhüdü **üretimden** karşılayamaz. Karşılıyor görünüyorsa, ödemenin kaynağı büyük olasılıkla üretim değil, **sizden sonra gelen yatırımcının parasıdır** — saadet zinciri tanımı budur.

### 3. Hukuki zemin de
