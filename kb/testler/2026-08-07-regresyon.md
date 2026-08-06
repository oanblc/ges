# Asistan Regresyon Raporu — 2026-08-07

| # | Kategori | Denetçi | Süre | Not |
|---|---|---|---|---|
| 1 | mit | ONAY ✓ | 80 sn |  |
| 2 | mevzuat | ONAY ✓ | 71 sn |  |
| 3 | fatura | ONAY ✓ | 41 sn |  |
| 4 | fiyat-eksik | ONAY ✓ | 43 sn |  |
| 5 | teknik | ONAY ✓ | 55 sn |  |
| 6 | apartman | ONAY ✓ | 56 sn |  |
| 7 | depolama | ONAY ✓ | 43 sn |  |
| 8 | dolandiricilik | ONAY ✓ | 55 sn |  |

---

## 1. [mit] kışın güneş paneli çalışmıyormuş, doğru mu? bizim buralar soğuk olur

Hayır, doğru değil — bu sektörün en yaygın yanlışlarından biri. Kısaca netleştireyim:

**Panel soğuktan değil, ışıktan üretir.** Hatta güneş paneli soğukta *daha verimli* çalışır. Panellerin "sıcaklık katsayısı" denen bir özelliği vardır: hücre sıcaklığı arttıkça verim düşer (modern TOPCon panellerde her 1 °C için yaklaşık %0,3 kayıp). Bu yüzden Türkiye'de üretim rekorları genelde yaz ortasında değil, **soğuk ve güneşli bahar günlerinde** kırılır. Antalya'da 35 °C'lik bir günde panel yüzeyi 60-65 °C'ye çıkar ve o an %11-13 civarında güç kaybı yaşanır; sizin soğuk havanızda bu kayıp yok.

**Kışın düşen şey sıcaklık değil, güneşlenme süresi.** Gün kısa, güneş alçak açıda ve bulut daha fazla. Bu nedenle kış aylarındaki üretim yaz tepe aylarına göre yaklaşık **%50-70 daha düşük** olur — ama sıfır olmaz. PVGIS verisiyle somut örnek (1 kWp sistem, güney, 30° eğim):

| | Ocak | Temmuz | Yıllık |
|---|---|---|---|
| Ankara | 65 kWh | 170 kWh | 1.465 kWh |
| Antalya | 92 kWh | 163 kWh | 1.580 kWh |

Görüldüğü gibi Ankara gibi soğuk bir iç bölgede bile ocak ayında üretim devam ediyor. Fizibilite zaten aylık değil, **yıllık toplam** üretimle yapılır; yazın fazlası kışın açığını dengeler. Meskenlerde bunu mümkün kılan şey aylık mahsuplaşmanın sürmesi: saatlik mahsuplaşmaya geçiş 1 Mayıs 2026'da başladı (dayanak: RG 2 Nisan 2026, sayı 33212) ancak **konutlar bu uygulamadan muaf**, aylık mahsup devam ediyor (uygulama usul ve esasları: EPDK Kararı 30.04.2026/14531, RG 5 Mayıs 2026, sayı 33244). Yani kış-yaz dengesi mesken abonesinde sizin lehinize işler.

**Kar konusu:** Panel cam yüzeyli ve eğimli olduğu için kar genelde 1-2 günde kendiliğinden kayar; üstelik panel çalışırken hafif ısınır. Karı **kürek/fırça ile kazımayın** — cam ve hücre çizilir, mikro çatlak riski doğar. Kar yükü de bir sorun değil: paneller IEC 61215 standardında 2.400 Pa mekanik yüke test edilir, kar bölgeleri için 5.400 Pa sertifikalı modeller vardır. Karlı bölgedeyseniz kurulumcudan hem 5.400 Pa panel hem de kar yükünü içeren **statik rapor** istemeniz gerekir.

Bir de kışın avantajınız var: dikey/dik açılı montajda (ör. cephe veya yüksek eğim) kış üretimi belirgin artar ve kar hiç tutmaz.

İsterseniz sizin için gerçekçi bir hesap çıkarabilirim; bunun için üç şeye ihtiyacım var: **(1)** konut mu işletme mi, **(2)** ortalama aylık elektrik faturanız (TL), **(3)** hangi ildesiniz.

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.


## 2. [mevzuat] tarlama güneş paneli kurup elektriği satmak istiyorum, izin alabilir miyim?

Kısa cevap: **arazi tipine bağlı** — ve muhtemelen "satmak" kelimesini biraz revize etmemiz gerekecek. İkisini ayrı ayrı açayım.

## 1) Önce beklenti düzeltmesi: lisanssız GES bir "satış işi" değil

Çatı/arazi üzerine kurulan lisanssız güneş santralleri **öz tüketim (kendi tükettiğin elektriği üretme)** mantığı üzerine kurulu. Mevzuattaki sınırlar:

- **Kurulabilecek güç**, tesisin abone grubuna göre sözleşme gücüne bağlı: tarımsal sulama/sanayi/belediye abonelerinde sözleşme gücünün **2 katı**, mesken/ticarethanede sözleşme gücü **kadar** (RG 14.05.2024 düzenlemesi).
- **Satış geçmiş yıl tüketiminizle sınırlı.** Yıllık üretiminiz, önceki yıl tüketiminizin **2 katını** aşarsa aşan kısım YEKDEM'e **bedelsiz** gider — yani para etmez.
- İhtiyaç fazlasını görevli tedarik şirketi alır; fiyatı ilk 10 yıl **abone grubunuzun çıplak enerji bedeli**, 10 yıl sonrası **min(0,9 × YEKDEM, PTF)**. Öz tüketimin değeri satış fiyatının tipik olarak 2–5 katıdır; yani kazanç "sattığınız"dan değil, "ödemediğiniz faturadan" gelir.
- **1 Mayıs 2026'dan beri saatlik mahsuplaşma** yürürlükte (RG 02.04.2026 sayı 33212; usul-esaslar RG 05.05.2026, EPDK Kararı 14531). Tarımsal/ticari/sanayi abonelerini **kapsıyor** — yalnız meskenler muaf. Pratik sonucu: kışın ürettiğiniz fazlayı yazın sulama tüketiminizle takas edemezsiniz, netleşme saat saat yapılır.

Yani "tarlaya kurup elektrik satarak gelir elde etme" modeli, lisanssız kapsamda ancak tüketiminiz kadar mantıklı. Lisanslı santral kurup piyasaya satış tamamen ayrı bir rejim ve o konu bilgi tabanımda net değil; isterseniz danışmanımıza iletebilirim.

## 2) Araziye kurulum izni: kritik eşik arazi sınıfı

- Lisanssız arazi GES'i yalnızca **kuru marjinal tarım arazisi**ne kurulabilir (RG 04.04.2026 tarihli yönetmelik + Tarım ve Orman Bakanlığı 2023/6 Genelgesi).
- **Mutlak tarım arazisi, dikili, sulu ve özel ürün arazileri: yasak** — başvuru gündeme bile alınmıyor.
- **İlk adımınız:** İl Tarım ve Orman Müdürlüğü'nden **arazi sınıfı tespiti** ve gerekiyorsa **tarım dışı kullanım izni**. Bu belge olmadan sonraki hiçbir adım ilerlemez.
- Arazi GES'te çatıdan farklı olarak **imar/ruhsat süreci vardır**; çevre çiti, kamera, paratoner fiili standart.
- Tapu hisseliyse **tüm hissedarların noter muvafakati** şart; biri onay vermezse süreç fiilen kilitlenir.

Bir de kolaylık: **üretim ve tüketim yerinin aynı ilde olması şartı kalktı** (RG 14.05.2024) — örneğin başka ildeki işletmenizin tüketimi için buradaki arazide üretim yapabilirsiniz.

## 3) Süreç sırası (gerçekçi 3–6 ay)

1. İl Tarım Md. arazi sınıfı tespiti + tarım dışı kullanım izni
2. Dağıtım şirketine (OSB içindeyse OSB müdürlüğüne) bağlantı başvurusu → **çağrı mektubu**
3. TEDAŞ/EDAŞ proje onayı (tek hat şeması, koruma-topraklama, statik, ekipman sertifikaları)
4. Belediye imar/ruhsat işlemleri
5. Kurulum → geçici kabul → çift yönlü sayaç → üretim/tüketim sözleşmesi

"İzin gerekmez, tak-çalıştır" iddiası yanlıştır; şebekeye bağlı her tesiste çağrı mektubu süreci zorunludur.

## 4) Bir uyarı

"Güneş tarlasında hisse al, kira garantili gelir elde et" tarzı teklifler yaygın bir dolandırıcılık kalıbı (Kainat Holding vakası ~3.000 mağdur). Sabit getiri garantisi + acele ettirme + tapu yerine sözleşme üçlüsü görürseniz uzak durun; EPDK da "lisanssız şirket elektrik üretip satamaz" uyarısı yapıyor.

---

Arazinizin sınıfını öğrendikten sonra kaç kW'lık bir tesisin size mantıklı geleceğini birlikte hesaplayabiliriz. Bunun için üç şey lazım: **(a)** tesis konut mu işletme/tarımsal sulama mı, **(b)** aylık elektrik faturanız yaklaşık kaç TL, **(c)** hangi ildesiniz? İşletme/sulamaysa ayrıca tüketiminizin gündüz mü akşam mı yoğunlaştığını da yazarsanız saatlik mahsuba göre doğru boyutlandırırım.

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.


## 3. [fatura] panel taktırdım ama hala fatura geliyor, kandırıldım mı?

Önce içinizi rahatlatayım: **fatura gelmeye devam etmesi tek başına dolandırıldığınız anlamına gelmez.** Bu, sahada en sık karşılaştığımız yanlış beklenti — GES faturayı sıfırlamaz, ciddi biçimde küçültür.

**Neden sıfırlanmıyor?**

1. **Dağıtım bedeli hiç mahsuplaşmaz.** EPDK 4 Nisan 2026 tarifesine göre meskende dağıtım bedeli 2,4249 ₺/kWh ve bu, tükettiğiniz her kWh için ödenir — panelden gelse bile şebekeyi kullandığınız için. Düşük tüketimli bir mesken faturasında bu kalem tek başına toplamın ~%75'ini bulabiliyor. Üstüne BTV (%5), Enerji Fonu (%1) ve KDV ekleniyor.
2. **Mevsimsellik.** Meskenlerde mahsup aylık işler (saatlik mahsuba geçiş 1 Mayıs 2026'da başladı ama **mesken muaf** — RG 02.04.2026 ve RG 05.05.2026/33244). Yani kış aylarında üretim %50-70 düşerken tüketim artar, fark faturaya yansır.
3. **Sattığınız kWh, aldığınızdan ucuz.** Fazla üretimi görevli tedarik şirketi çıplak enerji bedelinden alır; siz ise vergiler+dağıtım dahil fiyattan tüketirsiniz. Makas 3-5 kat olabiliyor.
4. **Mahsup gecikmeli yansır.** Alacağınız genelde takip eden dönem faturasında "muhtelif mahsup/tenzil" satırında görünür. İki dönem üst üste görünmüyorsa bu itiraz konusudur.

**Gerçekçi beklenti:** doğru boyutlandırılmış bir mesken sisteminde yıllık fatura toplamında **%70-90 azalma**. "%100 sıfır" vaadi verildiyse, sorun sistemde değil, size yapılan satış vaadindedir.

**Şunu kontrol edelim:** faturanızda gerçekten bir sorun var mı yoksa normal mi — bunu rakamlarla ayırt edebiliriz. Bana faturadan şu satırları yazar mısınız:

- Abone grubu (mesken tek zamanlı mı, üç zamanlı mı)
- Fatura dönemi (ör. 2026-07)
- Tüketim (kWh) — çekiş endeksi
- Aktif enerji bedeli (TL)
- Dağıtım bedeli (TL)
- "Mahsup/tenzil" satırı var mı, varsa tutarı
- Varsa inverter uygulamanızın o aya ait üretim değeri (kWh)

Bu satırlarla faturanızı kalem kalem çözümleyip mahsubun doğru işleyip işlemediğini, sayacın çift yönlü okunup okunmadığını söyleyebilirim.

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.


## 4. [fiyat-eksik] 10 kW sistem kaç paraya kurulur?

## 10 kW anahtar teslim fiyat bandı (Ağustos 2026)

| Kaynak | 10 kW konut | ₺/kW |
|---|---|---|
| Ekipman/EPC fiyat tablomuz | **200–300 bin ₺** | 20–30 bin |
| Saha taraması (kurulumcu teklifleri) | **300–480 bin ₺** | 30–48 bin |

Bilgi tabanımdaki iki kaynak arasında fark var; bunu size olduğu gibi aktarıyorum. Pratikte **ciddi tekliflerin çoğu 250–400 bin ₺ aralığına düşüyor**. Teklifleri toplam fiyattan değil **₺/kW** üzerinden karşılaştırın — kapsamlar farklı olduğu için toplam tutar yanıltıcıdır. (Kaynak: gesdanismani.com ekipman-fiyat tablosu ve saha taraması, 6 Ağustos 2026)

**Fiyata dahil olması gerekenler** (sözleşmede yazılı isteyin):
panel + inverter + konstrüksiyon + DC/AC pano, parafudr, topraklama + kablolama + işçilik + **proje, EDAŞ başvurusu, TEDAŞ kabulü ve devreye alma**. "Anahtar teslim" diyen bir teklifte başvuru-proje kalemi yoksa fiyat karşılaştırılabilir değildir.

**Dahil olmayanlar:** batarya (hibrit inverter + 10 kWh LFP sistemi maliyeti %40–60 artırır; LFP ~7.800–12.000 ₺/kWh), çatı onarımı/güçlendirmesi, özel yükseltme konstrüksiyonu.

**Tipik maliyet kırılımı:** panel %35–40, inverter %12–15, konstrüksiyon %10–15, işçilik %12–15, kablo/elektrik %8–10, proje-izin %3–5.

### İki not
- **10 kW çoğu ev için büyük.** 10 kW yılda kabaca 12.000–15.000 kWh üretir; ortalama bir konutta 3–6 kW yeterli oluyor. Sisteminizi çatı alanına değil **tüketiminize** göre boyutlandırmak geri dönüşü belirleyen ana faktör. (Fazla üretimin satış fiyatı, öz tüketimle kazandığınız değerin belirgin altında.)
- Fiyatlar kur ve işçiliğe bağlı; $/kW düşerken ₺/kW yükseliyor. En az 3 firmadan, keşif yapılmış yazılı teklif alın — telefonda keşifsiz fiyat veren firma risk işaretidir.

Sizin durumunuza uygun gücü ve geri dönüş süresini hesaplayabilmem için üç bilgi yeterli: **(1)** konut mu işletme mi, **(2)** ortalama aylık elektrik faturanız (TL), **(3)** hangi ildesiniz? (İşletmeyse ayrıca gündüz mü akşam mı yoğun çalıştığınızı da belirtin.)

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.


## 5. [teknik] inverterim öğlen saatlerinde kendini kapatıyor, arızalı mı?

Kısa cevap: bu tablo çoğu zaman **arıza değil, şebeke tarafı bir "gerilim yükselmesi" belirtisi**dir. Öğlen tam üretim saatinde kapanıp, üretim düşünce kendiliğinden geri dönüyorsa klasik tablo budur.

## Neden oluyor?

İnverteriniz ürettiği enerjiyi şebekeye "itebilmek" için bağlantı noktasındaki gerilimi bir miktar yükseltmek zorunda. Hattınız uzunsa veya kesit yetersizse, öğlen tepe üretimde bu yükselme sınırı aşar. Şebeke gerilimi **253 V**'un (AG'de nominal 230 V ±%10) üzerine çıktığında inverter, mevzuat gereği (TS EN 50549-1 şebeke uyum standardı) kendini korumaya alıp ayrılır. Gerilim normale dönünce tekrar devreye girer. Yani inverter **görevini yapıyor**, sorun bağlantı noktasında.

En riskli grup: kırsalda veya hat sonunda, trafoya uzak abonelikler.

## Diğer iki olasılığı da eleyelim

| Belirti | Muhtemel neden |
|---|---|
| Tamamen kesiliyor, birkaç dakika sonra dönüyor; hata kodu "şebeke aşırı gerilim / Grid Overvoltage" | Gerilim yükselmesi (en olası) |
| Kapanmıyor ama öğlen tepesi düzleşiyor/azalıyor; inverter kızgın, fan sesi yüksek | Sıcaklık derating'i — havalandırma/gölge/fan sorunu |
| Her gün aynı seviyede pürüzsüz düz çizgi, kesinti yok | Clipping — normal, DC/AC oranı kaynaklı, arıza değil |

## Şimdi yapabilecekleriniz

1. **İnverter uygulamasından hata kodunu ve AC gerilim değerini okuyun.** 250 V üstü değerler görüyorsanız teşhis netleşir.
2. Günlük üretim grafiğinde kesintinin hep aynı saat aralığında olup olmadığına bakın.
3. İnverterin güneş altında/havalandırmasız bir yerde olup olmadığını kontrol edin.
4. Mümkünse komşularınıza sorun — bölgesel gerilim sorunuysa onlarda da cihaz sorunları görülür.

## Çözüm sırası (kurulumcu/EDAŞ ile)

1. AC kablo kesitini büyütmek / inverter–pano mesafesini kısaltmak (sizin tarafınız, en hızlı çözüm)
2. Trafo kademe (tap) ayarı — dağıtım şirketi işi
3. İnverterde Q(U) / cos φ reaktif güç desteğinin aktifleştirilmesi — yazılımsal, çoğu zaman yeterli
4. Gerilim koruma limitinin genişletilmesi — **yalnızca EDAŞ onayıyla**
5. Fider güçlendirme talebi

⚠️ Önemli uyarı: Gerilim koruma ayarlarını kendiniz veya yetkisiz biri değiştirmemeli. Bu değerler kabul aşamasında tutanağa geçer; izinsiz değişiklik hem yasal sorun hem garanti kaybı yaratır.

⚠️ Ayrıca: Hata kodu **AFCI / ark arızası** ise bu tamamen farklı bir konudur — asla resetleyip devam etmeyin, yangın riski taşır, doğrudan servis çağırın.

Bir sonraki adım için: inverterinizin marka/modelini ve uygulamada gördüğünüz hata kodunu (varsa ekran fotoğrafı) paylaşırsanız, tabloyu birlikte daraltalım.

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.


## 6. [apartman] kiracıyım, oturduğum evin çatısına panel taktırabilir miyim?

Kısa cevap: **evet, kiracı olarak kurabilirsiniz** — ama tek başınıza değil. "Kiracı GES kuramaz" yaygın bir yanlış; mevzuatta kiracıyı engelleyen bir hüküm yok, engel mülkiyet ve abonelik tarafında.

## Gerekli üç şey

**1) Mülk sahibinin noter onaylı muvafakati (zorunlu)**
Çatı size ait olmadığı için dağıtım şirketi başvuru dosyasında mal sahibinin yazılı iznini arar. Noter onayı pratikte standart. (Lisanssız Elektrik Üretim Yönetmeliği süreci)

**2) Bina apartman/site ise ek olarak kat malikleri kararı**
Çatı ortak alandır (Kat Mülkiyeti Kanunu 634). Tek bir daire için çatıya kurulumda EDAŞ genelde noter onaylı kurul kararı/muvafakat ister; yönetim planında yasak varsa engel olur. Müstakil evde bu adım yok. 2026'da KMK'da GES'e özel bir değişiklik yapılmadı, uygulama içtihatla şekilleniyor.

**3) Abonelik sizin adınıza olmalı**
Mahsuplaşma **abonelik sahibinin faturasında** işler. Elektrik aboneliği sizin adınızaysa tasarruf da fazla üretim geliri de size gelir; ev sahibinin adınaysa fayda ona yazılır. Bu, kiracı kurulumlarında en sık yapılan hata.

## Karar vermeden önce düşünmeniz gereken iki risk

- **Amortisman vs. kira süresi:** Konutta geri dönüş tipik 4-8 yıl. 2-3 yıl oturacaksanız yatırımı çıkaramazsınız.
- **Panel taşınmaz sayılır:** Sabitlenmiş sistem "mütemmim cüz" kabul edilir; çıkarken söküp götürmek hem hukuken tartışmalı hem teknik olarak zararlı (yeni adreste sıfırdan başvuru + mikro çatlak riski; söküm-yeniden kurulum ≈ sistem bedelinin %10-20'si). **Kira sözleşmesine yazılı bir devir/tazmin hükmü** koydurun: taşınırken sistemi ev sahibine bedelini alarak devretmek genelde en temiz çözüm.

## Kısa süre kalacaksanız: balkon tipi
1-2 panel + mikro inverter (~15-35 bin ₺, Ağustos 2026 fiyatları), taşınırken sökülüp götürülebilir, %20-40 tasarruf sağlar. Ama uyarı: **şebekeye geri besleme yapamaz** — bağlantı anlaşması ve çift yönlü sayaç olmadan fazlayı satamazsınız, sayacı geri döndürmek usulsüz kullanım riski taşır. Almanya'daki gibi basit kayıt sistemi Türkiye'de yok.

İki iyi haber: mesken aboneleri saatlik mahsuplaşmadan **muaf**, aylık mahsup devam ediyor (RG 5 Mayıs 2026 — Usul ve Esaslar); ve meskende 25 kW'a kadar şirket/lisans gerekmiyor.

İsterseniz sayısal fizibiliteye bakalım — bunun için üç şey yeterli: **(a)** konut mu işletme mi, **(b)** aylık ortalama elektrik faturanız (TL), **(c)** hangi ildesiniz.

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.


## 7. [depolama] elektrik kesilince panellerim evi beslemeye devam eder mi?

Kısa cevabı: **hayır — standart (bataryasız, şebeke bağlantılı) bir sistemde panelleriniz kesinti anında durur.** Bu, sisteminizin arızası değil, zorunlu bir güvenlik özelliği.

**Neden?**
İnverterinizde "ada oluşumu önleme" (anti-islanding) koruması vardır: şebeke gerilimi kesildiğinde inverter kendini milisaniyeler–saniyeler içinde şebekeden ayırır ve üretimi keser. Sebebi, arıza giderirken hatta çalışan dağıtım şirketi ekiplerinin can güvenliğidir — sizin panelinizin hatta enerji vermesi ölümcül olur. Bu şart TS EN 50549-1 / EN 62116 kapsamında tip testine tabidir ve TEDAŞ kabulünde de kontrol edilir (kaynak: bilgi tabanı — teknik-elektrik-altyapi.md, teknik-standartlar-kabul.md).

Bu, sahada en sık karşılaştığımız yanılgılardan biri; iyi ki sormuşsunuz.

**Kesintide elektrik istiyorsanız üç seçenek var:**

| Kurgu | Kesintide çalışır mı | Not |
|---|---|---|
| On-grid (standart) | ❌ | Bugün evlerin çoğunda bu var |
| Hibrit inverter + batarya | ✅ (kritik yükler) | EPS çıkışı ~10-20 ms'de devreye girer; gerçek UPS değil, kısa bir kararma olur |
| Off-grid | ✅ | Şebekesiz yerler için; şehirde mantıklı değil |

**Batarya düşünüyorsanız pratik gerçekler (Ağustos 2026 verileri):**
- Genelde tüm ev değil, bir **kritik yük panosu** beslenir: buzdolabı, aydınlatma, modem, kombi. Tüm evi (özellikle 3 faz, klima/elektrikli ısıtıcı) beslemek maliyeti çok yükseltir.
- LiFePO4 batarya perakende ~7.800-12.000 ₺/kWh; konutta tipik 5-10 kWh. 10 kW'lık bir konut sisteminde hibrit + 10 kWh batarya, sistem maliyetini kabaca **%40-60 artırır** (ekipman-fiyatlar.md, Ağustos 2026 — teklif alıp teyit edin).
- Mevcut bir GES'e sonradan batarya eklemek mümkün ("battery-ready" hibritte en ucuz), ancak **TEDAŞ tadilat projesi ve yeniden kabul** gerekir (teknik-depolama.md).
- Salt ekonomi açısından: meskende şebeke zaten "sanal batarya" gibi çalışıyor, çünkü mesken **aylık mahsuplaşmada** — saatlik mahsuplaşma meskenleri kapsamıyor (RG 02.04.2026 + Usul ve Esaslar RG 05.05.2026). Bu nedenle konutta bataryanın asıl gerekçesi tasarruf değil, **kesinti sigortası**dır. Kesinti sizi gerçekten mağdur ediyorsa (evde tıbbi cihaz, sık kesinti yaşanan bölge, ısı pompası/kombi bağımlılığı) mantıklı; yoksa parayı panele koymak daha hızlı geri döner.

İsterseniz bir sonraki adımda konut mu işletme mi olduğunuzu, aylık elektrik faturanızı (TL) ve ilinizi paylaşın; bataryalı ve bataryasız kurgunun geri dönüş farkını sizin rakamlarınızla çıkarayım.

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.


## 8. [dolandiricilik] bir firma güneş tarlasından aylık 2000 TL kira garantisi veriyor, yatırayım mı?

Kısa cevap: **bu teklif, bilgi tabanımızdaki en klasik dolandırıcılık kalıbıyla birebir örtüşüyor.** Yatırım yapmadan önce mutlaka aşağıdaki kontrolleri yapın.

## Neden alarm veriyor?

Bilgi tabanımızdaki kırmızı bayrak üçlüsü şu: **sabit/garantili getiri vaadi + aciliyet baskısı + tapu yerine sadece sözleşme.** "Aylık 2.000 TL kira garantisi" bunun tam ortasında.

- **Güneş enerjisinde "garanti getiri" fiziken mümkün değil.** Gelir; ışınıma, panel performansına, elektrik fiyatına ve mevzuata bağlı dalgalanır. 2026'da bunu net gördük: PTF (piyasa takas fiyatı — elektriğin toptan saatlik fiyatı) Haziran'da ortalama 1.216 ₺/MWh iken güneş saatlerinde 404 ₺/MWh'ye kadar düştü, Temmuz'da ortalama 2.700'e fırladı (EPİAŞ Şeffaflık, gerçekleşen veri). Bu oynaklıkta kimse size sabit aylık rakam taahhüt edemez — ediyorsa gelir üretimden değil, yeni katılımcıların parasından geliyordur.
- **Sektörde emsal var:** Kainat Holding vakasında yaklaşık 3.000 kişi ve ~600 milyon ₺; ayrı bir vakada 178 milyon ₺ / 48 şüpheli. Kalıp hep aynı: "güneş tarlasından kira geliri".
- **EPDK'nın açık uyarısı:** lisanssız statüdeki bir şirket, başkalarına satmak üzere elektrik üretip gelir dağıtamaz. Yani "sizin adınıza üretip kira ödeyeceğiz" modelinin mevzuatta karşılığı yok.

## Para vermeden önce isteyeceğiniz 6 belge

1. **Tapu.** Size bir arazi hissesi mi veriliyor, yoksa sadece "yatırım sözleşmesi" mi? Tapuya işlenmeyen her yapı hukuken zayıftır.
2. **EPDK lisans/statü sorgusu.** Firma adını EPDK üzerinden sorgulayın; "lisanssız" ise size gelir dağıtamaz.
3. **Çağrı mektubu / bağlantı anlaşması.** Santral gerçekten var mı, hangi dağıtım bölgesinde, kaç kW? Bu belgeler yoksa proje kağıt üstündedir.
4. **Arazi sınıfı belgesi.** Arazi GES'e yalnızca **kuru marjinal tarım arazisinde** izin var (RG 04.04.2026 yönetmeliği + 2023/6 Genelge). Mutlak/sulu/dikili arazide proje hiç başlamaz. İl Tarım Müdürlüğü'nden arazi sınıfı tespiti + tarım dışı kullanım izni şart.
5. **İmar/ruhsat dosyası.** Çatı GES'ten farklı olarak arazi GES'te ruhsat süreci vardır.
6. **Saha ziyareti.** Devreye alınmış, üreten bir santral gösteremiyorlarsa konu kapanmıştır.

## Peki mantıklı yol ne?

GES yatırımının Türkiye'de para kazandıran tarafı **kendi tüketiminizi mahsuplaşmayla silmek** — yani üretimin faturanızdan düşmesi. Şebekeye satılan fazlanın değeri, öz tüketimin değerinin genelde 1/4–1/6'sı kadardır. Üstelik 14.05.2024 tarihli RG değişikliğiyle **üretim ve tüketim farklı ilde olabiliyor**; yani gerçekten arazi GES'i istiyorsanız, bunu kendi aboneliğinize bağlı, kendi adınıza kurulu bir tesis olarak yapmanız gerekir — üçüncü bir firmanın "kira" ödediği bir havuza değil.

İsterseniz bir sonraki adımı somutlaştıralım: **konut mu işletme mi, aylık elektrik faturanız kaç TL ve hangi ildesiniz?** (İşletmeyse gündüz mü akşam mı yoğun çalıştığını da ekleyin.) Bu üç bilgiyle gerçek bir geri dönüş hesabı çıkarıp, bu 2.000 TL'lik vaatle kıyaslayabiliriz.

Bu yanıt bilgilendirme amaçlıdır; bağlayıcı görüş değildir.
