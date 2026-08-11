/**
 * SSS tekil sayfaları (/sss/[slug]) — arama değeri yüksek soruların derin cevapları.
 * Tek doğruluk kaynağı: kb/ (ozel-durumlar, piyasa-mahsuplasma, pratik-surecler,
 * sss-saha-taramasi, finans-rehberi, finansman-sigorta, yekdem-kararlari).
 * kb'de olmayan iddia buraya yazılmaz. Güncelleme: 11 Ağustos 2026.
 */

export type SssDetay = {
  slug: string;
  soru: string;
  /** FAQPage JSON-LD + meta description için kısa cevap (1-3 cümle) */
  kisa: string;
  /** Ana /sss sayfasındaki soruyla birebir eşleşen metin (varsa "detaylı cevap →" linki çıkar) */
  anaSayfaSoru?: string;
  dayanak: string;
  bolumler: Array<{ baslik: string; paragraflar: string[] }>;
  cta: { href: string; etiket: string; metin: string };
  iliskili: string[]; // diğer slug'lar
};

export const SSS_DETAY: SssDetay[] = [
  {
    slug: "osbde-ges-kurulur-mu",
    soru: "OSB'de GES kurulur mu? Başvuru kime yapılır?",
    kisa:
      "Evet, OSB'deki tesisler çatı GES kurabilir; ancak başvuru elektrik dağıtım şirketine değil, dağıtım lisansı sahibi OSB müdürlüğüne yapılır. Mahsup hesabı EPİAŞ üzerinden yürür ve OSB tarifeleri farklıdır.",
    dayanak: "kb/ozel-durumlar.md (OSBÜK kılavuzu, EPDK) — 6 Ağustos 2026",
    bolumler: [
      {
        baslik: "OSB'de süreç neden farklı işler?",
        paragraflar: [
          "Organize Sanayi Bölgeleri kendi sınırları içinde dağıtım lisansına sahiptir. Bu yüzden OSB'deki bir fabrika, bölgesindeki elektrik dağıtım şirketine (EDAŞ) değil, doğrudan OSB müdürlüğüne başvurur. Çağrı mektubu, bağlantı anlaşması ve kabul süreçlerinin muhatabı OSB'dir.",
          "Mahsuplaşma hesabı EPİAŞ üzerinden yürütülür ve OSB'nin uyguladığı tarifeler ulusal tarifeden farklı olabilir — fizibilite yaparken kendi OSB'nizin birim fiyatlarını kullanmalısınız.",
        ],
      },
      {
        baslik: "2024 sonrası önemli esneme",
        paragraflar: [
          "2024'ten bu yana OSB içindeki üretim tesisi ile OSB dışındaki tüketim noktası eşleştirilebiliyor. Ayrıca bölge şartı da esnedi (RG 14.05.2024/32546): üretim ve tüketim farklı illerde olabilir — örneğin İstanbul'daki işletme için başka ilde arazi GES mümkün.",
          "Sanayi abonelerinde kapasite sınırı sözleşme gücünün 2 katına kadar çıkabilir; işletmeler 1 Mayıs 2026'dan beri saatlik mahsuplaşmaya tabidir, bu yüzden boyutlandırmada saatlik tüketim profili belirleyicidir.",
        ],
      },
      {
        baslik: "OSB'deki işletme için pratik adımlar",
        paragraflar: [
          "1) OSB müdürlüğünden lisanssız üretim başvuru koşullarını ve uygulanan tarifeyi yazılı isteyin. 2) Son 12 ayın saatlik tüketim verisini (varsa otomatik sayaç okuma verisi) toplayın. 3) Saatlik mahsuplaşma dönemine uygun, öz tüketim oranını esas alan fizibilite yaptırın — vardiyalı çalışan sanayide öz tüketim %85-95'e ulaşabilir.",
        ],
      },
    ],
    cta: {
      href: "/saatlik-analiz",
      etiket: "Saatlik Analiz",
      metin:
        "OSB'deki tesisinizin saatlik tüketim verisiyle öz tüketim oranını ve geri ödeme süresini hesaplayalım.",
    },
    iliskili: ["saatlik-mahsuplasma-kimleri-kapsar", "lisansli-lisanssiz-ges-farki"],
  },
  {
    slug: "lisansli-lisanssiz-ges-farki",
    soru: "Lisanslı ve lisanssız GES arasındaki fark nedir?",
    kisa:
      "Lisanssız GES öz tüketim amaçlıdır: EPDK lisansı ve şirket kurma gerekmez, süreç dağıtım şirketi üzerinden çağrı mektubuyla yürür (konutta 25 kW'a kadar). Lisanslı üretim ise elektriği satmak amacıyla kurulan, EPDK üretim lisansı ve şirket gerektiren yatırımcı modelidir.",
    dayanak: "kb/sss-saha-taramasi.md + kb/ozel-durumlar.md + kb/piyasa-mahsuplasma.md — Ağustos 2026",
    bolumler: [
      {
        baslik: "Lisanssız üretim: kendi elektriğini üretmek",
        paragraflar: [
          "Çatı GES'lerin neredeyse tamamı 'lisanssız üretim' kapsamındadır. Adı yanıltmasın: izinsiz demek değildir — çağrı mektubu, proje onayı ve kabul süreci zorunludur; ama EPDK'dan üretim lisansı almanız ve şirket kurmanız gerekmez. Konut abonesinde üst sınır 25 kW'tır; mesken ve ticarethanede sözleşme gücü kadar, sanayi ve tarımsal sulamada sözleşme gücünün 2 katına kadar kapasite istenebilir.",
          "Lisanssız üreticinin önceliği öz tüketimdir. Fazla üretim mahsuplaşmayla değerlendirilir; yıllık üretimin, önceki yıl tüketiminin 2 katını aşan kısmı bedelsiz YEKDEM'e devredilir — yani 'istediğim kadar üretir satarım' modeli değildir.",
        ],
      },
      {
        baslik: "Lisanslı üretim: satış amaçlı santral",
        paragraflar: [
          "Lisanslı üretim, elektriği piyasada satmak amacıyla kurulan santraller içindir: EPDK üretim lisansı, şirket kurma, ön lisans süreci ve çok daha ağır bir mevzuat yükü vardır. Kendi faturasını düşürmek isteyen konut ya da işletmenin bu yola girmesi gerekmez.",
        ],
      },
      {
        baslik: "Hangisi size uygun?",
        paragraflar: [
          "Amacınız faturanızı azaltmaksa cevap nettir: lisanssız üretim. Sitedeki tüm hesaplayıcılar ve rehberler lisanssız (öz tüketim) modeline göre çalışır. Yatırım amaçlı satış santrali düşünüyorsanız bu ayrı bir uzmanlık alanıdır; lisans süreci için enerji hukuku danışmanlığı gerekir.",
        ],
      },
    ],
    cta: {
      href: "/hesaplama",
      etiket: "Hesaplama Araçları",
      metin: "Lisanssız çatı GES'inizin kapasitesini ve geri dönüşünü ücretsiz hesaplayın.",
    },
    iliskili: ["cagri-mektubu-nedir", "osbde-ges-kurulur-mu"],
  },
  {
    slug: "apartmanda-ges-kurulur-mu",
    soru: "Apartmanda GES kurulur mu? Kaç kat malikinin onayı gerekir?",
    kisa:
      "Kurulur; çatı ortak alan olduğu için kat malikleri kurulu kararı şarttır. Ortak alan aboneliği (asansör, merdiven aydınlatması) için Yargıtay içtihadına göre sayı ve arsa payı çoğunluğu (KMK m.42 'faydalı yenilik') yeterlidir; bireysel daire aboneliği için pratikte daha ağır şartlar ve noter onaylı karar aranır.",
    anaSayfaSoru: "Apartman çatısında panel kurmak için tüm kat maliklerinin onayı gerekir mi?",
    dayanak: "kb/ozel-durumlar.md + kb/pratik-surecler.md (KMK 634 m.42, Yargıtay içtihatları) — Ağustos 2026",
    bolumler: [
      {
        baslik: "Çatı ortak alandır — karar şart",
        paragraflar: [
          "Kat Mülkiyeti Kanunu'na göre çatı ortak alandır; ana kural KMK m.19'daki oybirliğidir. 2026 itibarıyla KMK'da GES'e özel bir değişiklik yapılmadı; kurallar içtihatla şekilleniyor — bu nüansı bilmek, komşu itirazlarına karşı en önemli korumadır.",
          "Ortak alan aboneliği için (asansör, hidrofor, merdiven aydınlatması gibi ortak giderleri karşılayan GES) Yargıtay bu yatırımı 'faydalı yenilik' (m.42) sayar: kat maliklerinin sayı VE arsa payı çoğunluğu (her ikisinde de %50'den fazla) yeterlidir. Bazı firma bloglarında geçen '4/5 çoğunluk gerekir' iddiasının KMK m.42 ile dayanağı yoktur.",
        ],
      },
      {
        baslik: "Bireysel daire aboneliği daha zordur",
        paragraflar: [
          "Tek bir dairenin kendi faturası için çatıya panel kurması mümkündür ama şartları ağırdır: kullanılan alan arsa payını aşmamalı, diğer maliklere de yer kalmalı ve statik güvenlik sağlanmalıdır. Pratikte dağıtım şirketi noter onaylı kurul kararı veya muvafakat ister; yönetim planındaki bir yasak süreci durdurabilir.",
        ],
      },
      {
        baslik: "Sorunsuz yol haritası",
        paragraflar: [
          "1) Kat malikleri kurulu kararı alın — kararda kurulacak güç (kWp), kullanılacak alan, hangi aboneliğe bağlanacağı, bakım sorumluluğu ve olası hasarın tazmini açıkça yazsın. 2) Kararı noterden onaylatın. 3) Dağıtım şirketine başvuruyu bu kararla yapın. Yazılı karar olmadan kurulan sistemde diğer maliklerin söktürme davası açma riski vardır.",
          "En pürüzsüz model, ortak sayaç GES'idir: üretim apartmanın ortak giderlerini düşürür, aidat azalır ve tek abonelik üzerinden yürüdüğü için süreç sadedir. Tüm daireleri tek GES'le sıfırlamak ise hem hukuken hem teknik olarak zordur.",
        ],
      },
    ],
    cta: {
      href: "/asistan?soru=Apartman%C4%B1m%C4%B1z%C4%B1n%20%C3%A7at%C4%B1s%C4%B1na%20GES%20i%C3%A7in%20nas%C4%B1l%20karar%20almal%C4%B1y%C4%B1z%3F",
      etiket: "Asistana Sorun",
      metin: "Apartmanınızın durumunu (kat sayısı, çatı, abonelik) anlatın; karar metni için gereken başlıkları birlikte çıkaralım.",
    },
    iliskili: ["kiraci-ges-kurabilir-mi", "cagri-mektubu-nedir"],
  },
  {
    slug: "kiraci-ges-kurabilir-mi",
    soru: "Kiracı GES kurabilir mi?",
    kisa:
      "Evet, kiracı GES kurabilir; mülk sahibinin noter onaylı muvafakati zorunludur ve mahsuplaşma abonelik sahibinin faturasında işler. 'Kiracı kuramaz' bilgisi yaygın ama yanlıştır.",
    dayanak: "kb/ozel-durumlar.md + kb/sss-saha-taramasi.md — Ağustos 2026",
    bolumler: [
      {
        baslik: "Kural: muvafakat + abonelik",
        paragraflar: [
          "Kiracının GES kurmasının önünde yasal engel yok; iki şart var. Birincisi mülk sahibinin noter onaylı muvafakati. İkincisi abonelik: mahsuplaşma, elektrik aboneliği kimin üzerineyse onun faturasında işler — abonelik sizdeyse tasarruf doğrudan size yansır. Yeni uygulamada başvuruda tapu veya noter onaylı kira kontratından biri yeterlidir.",
          "Apartman dairesi kiracısıysanız durum farklı: çatı ortak alan olduğu için tek başınıza kuramazsınız; mal sahibi ve yönetim onayı gerekir. Bu durumda balkon tipi (tak-çalıştır) sistemler pratik alternatiftir.",
        ],
      },
      {
        baslik: "Sözleşmeye ne yazılmalı?",
        paragraflar: [
          "Sökülemeyen tesis hukuken mütemmim cüz sayılır — kira sonunda binada kalır. Bu yüzden kira sözleşmesine (veya ek protokole) devir ve tazmin hükmü koydurun: kira bitiminde sistem sökülecek mi, kalacaksa mülk sahibi hangi bedeli ödeyecek? Resmî mevzuatta kiracının kurduğu GES'in otomatik devir prosedürü tanımlı değildir; koruma tamamen sözleşmenizdedir.",
          "Tersi senaryo da işler: ev sahibi kurarsa fayda fiilen kiracıya geçer; ev sahibi bunu kira bedeline yansıtarak alır. İki taraf için de en sağlıklı yol, yatırımı ve paylaşımı baştan yazılı hâle getirmektir.",
        ],
      },
      {
        baslik: "Kiracı işletmeler (AVM, depo, fabrika)",
        paragraflar: [
          "Ticari kiracıda model aynıdır: bina sahibi/yönetim muvafakati alınır, tesis ticarethane aboneliği üzerinden saatlik mahsuplaşmaya tabi olur. Uzun vadeli kira kontratı olan, gündüz yoğun tüketimli işletmelerde kiracı GES'i güçlü bir yatırımdır — geri ödeme süresi kira süresinin içinde kalıyorsa denklem nettir.",
        ],
      },
    ],
    cta: {
      href: "/fatura-analizi",
      etiket: "Fatura Analizi",
      metin: "Faturanızı yükleyin; kiracı senaryosunda size uygun güç ve geri ödeme süresini görün.",
    },
    iliskili: ["apartmanda-ges-kurulur-mu", "saatlik-mahsuplasma-kimleri-kapsar"],
  },
  {
    slug: "yekdem-nedir-kimin-icin",
    soru: "YEKDEM nedir, kimin için geçerli?",
    kisa:
      "YEKDEM, yenilenebilir enerji üretimini destekleme mekanizmasıdır. Çatı GES sahibi için pratik anlamı ikilidir: fazla üretimin satış fiyatı ilk 10 yıl bu çerçevede belirlenir; öte yandan YEKDEM'in maliyeti tüm tüketicilerin elektrik fiyatının içinde yer alır. Yeni USD endeksli alım garantisi verilmiyor; mekanizma TL bazlı sürüyor.",
    dayanak: "kb/yekdem-kararlari.md + kb/piyasa-mahsuplasma.md (EPDK kararları, RG) — Ağustos 2026",
    bolumler: [
      {
        baslik: "Mekanizma ne yapar?",
        paragraflar: [
          "YEKDEM (Yenilenebilir Enerji Kaynaklarını Destekleme Mekanizması), yenilenebilir üreticilere alım garantisi sağlayan havuz sistemidir. Havuzun maliyeti tüm elektrik tüketicilerine dağıtılır: EPDK her yıl 'öngörülen YEKDEM birim maliyeti'ni ilan eder ve bu bedel faturanızda ayrı satır olarak değil, enerji bedelinin matrahı içinde yer alır. 2026 için ilk belirleme 201,41-617,89 ₺/MWh aralığındaydı (EPDK kararı, RG Aralık 2025); yıl içinde revize edildi.",
          "Eski dönemin USD endeksli alım garantileri yeni başvurulara kapalıdır; mekanizma TL bazlı devam ediyor.",
        ],
      },
      {
        baslik: "Çatı GES sahibi için anlamı",
        paragraflar: [
          "Lisanssız üreticinin ihtiyaç fazlası enerjisi, tesisin ilk 10 yılında (YEKDEM süresi) 'abone grubu perakende tarifesi eksi dağıtım bedeli' üzerinden değerlenir — piyasa takas fiyatından (PTF) değil. 10 yılı dolduran tesislerde ise fiyat, 0,9 × YEKDEM fiyatı ile saatlik PTF'den düşük olanıdır.",
          "İkinci kural: yıllık üretiminiz önceki yıl tüketiminizin 2 katını aşarsa, aşan kısım bedelsiz olarak YEKDEM'e devredilir. Bu yüzden sistemi 'ne kadar büyük o kadar iyi' diye değil, tüketiminize göre boyutlandırmak gerekir.",
        ],
      },
      {
        baslik: "Sık karıştırılan nokta",
        paragraflar: [
          "'Devlet ürettiğim elektriği dolarla alıyor' söylemi bugün için yanlıştır — o model, geçmiş yıllarda başvuran lisanslı/eski santraller içindi. Bugün çatı GES'in ekonomisi alım garantisine değil, öz tüketime dayanır: kendi tükettiğiniz her kWh, satacağınız kWh'ten belirgin şekilde değerlidir.",
        ],
      },
    ],
    cta: {
      href: "/asistan?soru=Fazla%20%C3%BCretimim%20hangi%20fiyattan%20de%C4%9Ferlenir%3F",
      etiket: "Asistana Sorun",
      metin: "Tesisinizin yaşına ve abone grubunuza göre fazla üretim fiyatınızı asistanla netleştirin.",
    },
    iliskili: ["saatlik-mahsuplasma-kimleri-kapsar", "gese-hibe-var-mi"],
  },
  {
    slug: "cagri-mektubu-nedir",
    soru: "Çağrı mektubu nedir, nasıl alınır?",
    kisa:
      "Çağrı mektubu, dağıtım şirketinin 'şebekeye bağlanabilirsiniz' onayını bildiren resmî yazıdır ve şebekeye bağlı her GES için zorunludur. Bildirimden itibaren 180 gün geçerlidir; ilk 90 gün içinde proje onaya sunulmalıdır.",
    anaSayfaSoru: "Çatıya panel kurmadan önce dağıtım şirketinden çağrı mektubu almak zorunlu mu?",
    dayanak: "kb/pratik-surecler.md (Lisanssız Elektrik Üretim Yönetmeliği, RG 12.05.2019; TEDAŞ/EDAŞ sayfaları) — 9 Ağustos 2026",
    bolumler: [
      {
        baslik: "Neden bu kadar önemli?",
        paragraflar: [
          "Çağrı mektubu, lisanssız üretim sürecinin dönüm noktasıdır: dağıtım şirketi bu yazıyla şebeke bağlantınızı onaylar, sonraki tüm adımların yasal süreleri bu tarihten itibaren işler ve bağlantı anlaşması bazı banka kredilerinin ön şartıdır. 'İzin gerekmez, tak-çalıştır' söylemi yanlıştır — şebekeye bağlı her sistemde bu süreç zorunludur; muafiyet yalnız off-grid ve balkon tipi sistemlerdedir.",
        ],
      },
      {
        baslik: "Başvuruda istenen belgeler",
        paragraflar: [
          "Güncel listede şunlar var: EK-1 Lisanssız Üretim Bağlantı Başvuru Formu, EK-2 Faaliyet Yasağına İlişkin Beyan, kimlik fotokopisi, tapu (noter onaylı) — kiralık yerde noter onaylı kira kontratı (yeni uygulamada ikisinden biri yeterli), imza beyannamesi, apartmanda karar defterindeki noter onaylı kurul kararı, son faturadan tekil kod ve inşaat ruhsatı veya yerine geçen belge. Vekâletli başvuruda yetki belgeli vekâletname eklenir.",
          "Dosyadaki eksikler 15 takvim günü içinde tamamlanmazsa başvuru iade edilir; belgelerin ıslak imzalı aslı veya noter onaylı sureti istenir. Dağıtım şirketine göre küçük farklar olabilir — başvuru öncesi şirketinizin güncel listesini teyit edin.",
        ],
      },
      {
        baslik: "Süreler: 180 gün ve kritik 90 gün",
        paragraflar: [
          "Çağrı mektubu, bildirim tarihinden itibaren 180 gün geçerlidir. Ancak asıl kritik eşik ilk 90 gündür: bu süre içinde üretim tesisi projesi onaya sunulmazsa hak kaybı riski doğar. Mektubu alır almaz proje firmanızla takvimi netleştirin; 'nasılsa 6 ayımız var' rahatlığı en sık yapılan hatadır.",
        ],
      },
    ],
    cta: {
      href: "/surec",
      etiket: "Kurulum Süreci",
      metin: "Çağrı mektubunun süreçteki yerini ve sonraki adımları yedi aşamalı süreç haritasında görün.",
    },
    iliskili: ["lisansli-lisanssiz-ges-farki", "apartmanda-ges-kurulur-mu"],
  },
  {
    slug: "saatlik-mahsuplasma-kimleri-kapsar",
    soru: "Saatlik mahsuplaşma kimleri kapsıyor? Konutlar dahil mi?",
    kisa:
      "1 Mayıs 2026'da başlayan saatlik mahsuplaşma; ticarethane, sanayi ve tarımsal sulama abonelerini kapsar. Konutlar (mesken) muaftır — aylık mahsuplaşma aynen devam eder. 12 Mayıs 2019 öncesi çağrı mektubu almış tesisler de haklarını korur.",
    anaSayfaSoru: "Saatlik mahsuplaşma ile aylık mahsuplaşma arasında parasal fark ne kadar?",
    dayanak: "kb/piyasa-mahsuplasma.md + kb/ozel-durumlar.md (RG 2 Nisan 2026/33212; RG 5 Mayıs 2026/33244, EPDK Kararı 14531) — Ağustos 2026",
    bolumler: [
      {
        baslik: "Kural neyi değiştirdi?",
        paragraflar: [
          "Eski (aylık) düzende ay içindeki tüm üretim ve tüketim ay sonunda tek kalemde netleşiyordu: gece tükettiğinizi gündüz üretiminizle takas edebiliyordunuz. Saatlik düzende mahsup her saat ayrı yapılır — üretim ile tüketim aynı saatte örtüşmüyorsa, fazla üretim o saat içinde 'satış' sayılır ve satış fiyatı, kendi tüketiminizi ikame etmenin değerinden belirgin şekilde düşüktür.",
          "Kapsam: 12 Mayıs 2019 sonrası çağrı mektuplu lisanssız tesislerden ticarethane, sanayi ve tarımsal sulama aboneleri. Mesken aboneleri muaftır ve aylık mahsuplaşmaya devam eder — 'saatlik mahsup ev GES'ini öldürdü' söylemi yanlıştır.",
        ],
      },
      {
        baslik: "İşletmeler için parasal etki",
        paragraflar: [
          "Fazla enerjinin fiyatı (tesisin ilk 10 yılında) PTF değil, abone grubu perakende tarifesi eksi dağıtım bedelidir. Örnek — Mayıs 2026 OG sanayi: 2,9097 − 0,6560 ≈ 2,25 ₺/kWh. Buna karşılık aynı işletmenin şebekeden alış maliyeti vergiler dahil ~4,3-5,3 ₺/kWh bandındadır. Yani örtüşmeyen her kWh, alış-satış makası kadar değer kaybeder; profile göre nakit akışı etkisi %20-50'yi bulabilir.",
          "Bu yüzden yeni dönemde işletme fizibilitesi 'kWp × üretim × tarife' formülüyle yapılmaz; saatlik tüketim profiliyle öz tüketim oranı hesaplanır. Mesai saatli işletmede öz tüketim %70-90, vardiyalı sanayide %85-95'e ulaşır — profil gündüz yoğunsa saatlik mahsup korkulduğu kadar etkilemez.",
        ],
      },
      {
        baslik: "Ne yapmalı?",
        paragraflar: [
          "İşletmeyseniz: dağıtım şirketinden veya sayaç okuma sisteminizden saatlik tüketim verinizi alın ve fizibiliteyi bu veriyle yaptırın; gerekiyorsa sistemi küçültmek, tüketimi gündüze kaydırmak veya batarya eklemek en etkili üç düzeltmedir. Konutsanız: hesabınız aylık netleşmeyle yapılır, saatlik profil gerekmez.",
        ],
      },
    ],
    cta: {
      href: "/saatlik-analiz",
      etiket: "Saatlik Analiz",
      metin: "Saatlik tüketim verinizi yükleyin; öz tüketim oranınızı ve yeni dönem geri ödemenizi gerçek verinizle hesaplayalım.",
    },
    iliskili: ["osbde-ges-kurulur-mu", "yekdem-nedir-kimin-icin"],
  },
  {
    slug: "gese-hibe-var-mi",
    soru: "GES'e devlet hibesi var mı? Kim hangi destekten yararlanır?",
    kisa:
      "Konut çatı GES'ine genel bir devlet hibesi yoktur; konutun teşviki mahsuplaşma ve banka kredileridir. Hibe ve faizsiz finansman işletme ile çiftçiye özeldir: KOSGEB Yeşil Sanayi (faizsiz, çatı GES üst limiti 14 milyon ₺) ve tarımda IPARD/TKDK (%40-70 hibe).",
    dayanak: "kb/sss-saha-taramasi.md + kb/finansman-sigorta.md + kb/ozel-durumlar.md — Ağustos 2026",
    bolumler: [
      {
        baslik: "Konut için gerçek durum",
        paragraflar: [
          "'Devlet meskene hibe veriyor', 'bedava panel dağıtılıyor' söylemleri yanlıştır — kapıya gelen 'devlet destekli bedava panel' teklifi bilinen bir dolandırıcılık kalıbıdır. Konutun gerçek teşviki üç başlıktır: aylık mahsuplaşma (fazla üretim faturadan düşer), 50 kW'a kadar satış gelirinde gelir vergisi muafiyeti (GVK md. 9) ve bankaların GES/yeşil enerji kredileri. Çatı GES'e genel devlet faiz sübvansiyonu da yoktur; istisna tarımsal kredilerdir.",
        ],
      },
      {
        baslik: "İşletmeler: KOSGEB ve teşvik belgesi",
        paragraflar: [
          "İmalatçı KOBİ'ler için en güçlü araç KOSGEB Yeşil Sanayi Destek Programı'dır: faizsiz geri ödemeli destek, çatı GES'te üst limit 14 milyon ₺, bitişten sonra ödemesiz dönem. Ayrıca Yatırım Teşvik Belgesi (YTB) ile KDV istisnası ve diğer avantajlar; leasing'de makine-teçhizat listesindeki yeni ekipmanda %1 KDV uygulanabilir. Koşullar çağrı dönemine göre değişir — güncel durum Destekler sayfasında izlenir.",
        ],
      },
      {
        baslik: "Çiftçiler: gerçek hibe burada",
        paragraflar: [
          "GES'te gerçek anlamda 'hibe' tarım tarafındadır: IPARD/TKDK programlarında çağrı dönemine göre %40-70 hibe oranları uygulanır; Çiftçi Kayıt Sistemi (ÇKS) kaydı ön şarttır. Tarımsal sulama GES'i ayrıca sözleşme gücünün 2 katına kadar kurulabilir. Ziraat Bankası'nın tarımsal GES'te sübvansiyonlu faizli kredisi de vardır.",
          "Özet tablo: konut → mahsup + kredi (hibe yok); KOBİ → KOSGEB faizsiz + YTB/leasing avantajları; çiftçi → IPARD/TKDK hibesi + sübvansiyonlu kredi.",
        ],
      },
    ],
    cta: {
      href: "/destekler",
      etiket: "Destekler Sayfası",
      metin: "Size uygun destekleri güncel çağrı durumlarıyla Destekler sayfasında görün.",
    },
    iliskili: ["yekdem-nedir-kimin-icin", "fatura-tamamen-sifirlanir-mi"],
  },
  {
    slug: "fatura-tamamen-sifirlanir-mi",
    soru: "Çatıya panel kurunca elektrik faturası tamamen sıfırlanır mı?",
    kisa:
      "Hayır. Üretiminiz enerji bedelini düşürür ama dağıtım bedeli ve vergiler kalır; gerçekçi beklenti faturada %70-90 azalmadır. 'Fatura sıfır' vaadi, tekliflerdeki en yaygın abartıdır.",
    anaSayfaSoru: "Çatıya panel kurunca fatura tamamen sıfırlanır mı?",
    dayanak: "kb/sss-saha-taramasi.md + kb/tarifeler.md + kb/fatura-anatomisi.md — Ağustos 2026",
    bolumler: [
      {
        baslik: "Faturanın düşmeyen kalemleri",
        paragraflar: [
          "Elektrik faturası tek kalem değildir: enerji (tüketim) bedelinin yanında dağıtım bedeli ve vergiler (BTV, KDV, enerji fonu) vardır. GES üretiminiz enerji bedelini mahsupla eritir; ama şebekeden çektiğiniz her kWh için dağıtım bedeli ve vergiler tam tarifeden ödenir. Meskende dağıtım bedeli, kWh başına maliyetin önemli bir parçasıdır — bu yüzden fatura hiçbir zaman tam sıfıra inmez.",
        ],
      },
      {
        baslik: "Gerçekçi beklenti nedir?",
        paragraflar: [
          "Doğru boyutlandırılmış bir konut sisteminde gerçekçi beklenti %70-90 fatura azalmasıdır. Üstelik konutta ek bir kazanç katmanı var: aylık mahsuplaşma sayesinde üretiminiz önce pahalı 2. kademeden (240 kWh/ay üzeri tüketim) düşer — 2. kademe fiyatı destekli kademenin yaklaşık 4 katı olduğu için, 'kademeden kurtarma' 2026'da konut GES'inin en güçlü ekonomik gerekçesidir.",
          "Teklif değerlendirirken ölçüt şudur: 'faturanız sıfırlanır' diyen satıcıya dağıtım bedeli ve vergileri sorun. Bu kalemleri bilmeyen ya da geçiştiren satıcının fizibilitesi de güvenilir değildir.",
        ],
      },
      {
        baslik: "İşletmede durum",
        paragraflar: [
          "İşletmelerde 1 Mayıs 2026'dan beri saatlik mahsuplaşma uygulandığı için sonuç, üretim-tüketim örtüşmesine (öz tüketim oranına) bağlıdır: gündüz yoğun profilde azalma yüksek, gece ağırlıklı profilde düşüktür. İşletme fizibilitesi mutlaka saatlik veriyle yapılmalıdır.",
        ],
      },
    ],
    cta: {
      href: "/fatura-analizi",
      etiket: "Fatura Analizi",
      metin: "Faturanızın fotoğrafını yükleyin; sizin tarifenizle gerçekçi azalma oranını hesaplayalım.",
    },
    iliskili: ["saatlik-mahsuplasma-kimleri-kapsar", "gese-hibe-var-mi"],
  },
];

export const SSS_DETAY_GUNCELLEME = "11 Ağustos 2026";

/** Ana /sss sayfası soru metni → detay slug eşlemesi */
export const ANA_SORU_SLUG: Record<string, string> = Object.fromEntries(
  SSS_DETAY.filter((d) => d.anaSayfaSoru).map((d) => [d.anaSayfaSoru as string, d.slug])
);
