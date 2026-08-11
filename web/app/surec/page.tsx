import type { Metadata } from "next";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";
import { Aciklamali } from "@/components/Terim";

export const metadata: Metadata = {
  title: "Kurulum Süreci — Başvurudan Üretime Yedi Aşama",
  description:
    "Çatı GES sürecinin yedi aşaması: gerekli belgeler, gerçekçi süreler, en sık gecikme nedenleri ve her adımda dikkat edilecekler.",
  alternates: { canonical: "/surec" },
};

const ASAMALAR = [
  {
    ad: "Ön Değerlendirme",
    sure: "≈ 1–2 hafta",
    detay:
      "Çatınızın uygunluğu ve tüketiminize göre sistem kapasitesi belirlenir. Konutta üst sınır 25 kW'tır; çoğu eve 3-6 kW yeter ve 1 kW yaklaşık 5-6 m² çatı alanı ister. Kuzey çatı önerilmez; doğu-batı yerleşim %10-20 kayıpla çalışır.",
    belgeler: [
      "Son 12 ayın elektrik faturaları",
      "Çatı tipi, yön ve eğim bilgisi",
      "Sözleşme gücü (faturanızda yazar)",
    ],
    dikkat: [
      "Ciddi kurulumcu yerinde keşif yapar: gölge analizi, bağlantı noktası, statik ön bakış. Keşifsiz telefon fiyatı risk işaretidir.",
      "Fizibiliteyi yıllık ortalama üretimle isteyin; 'kışın da aynı üretir' vaadi gerçek dışıdır.",
    ],
    roller: {
      kurulumcu: [
        "Yerinde keşif: gölge analizi, bağlantı noktası ve statik ön bakış; tüketiminize uygun kapasite önerisi.",
      ],
      resmi: [
        "Bu aşamada resmî kurum devrede değildir; dağıtım şirketi süreci başvuruyla başlar.",
      ],
      siz: [
        "Keşifte ölçüm ve çatı fotoğraflarının dosyalanmasını isteyin — teklif bu ölçümlere dayanmalı.",
        "Teklifte panel/inverter marka, model ve Wp değerinin yazılı olduğunu teyit edin; 'muadili' ifadesini kabul etmeyin.",
        "Fizibilitenin yıllık ortalama üretimle yapıldığını kontrol edin.",
      ],
    },
  },
  {
    ad: "Bağlantı Başvurusu",
    sure: "≈ 1–3 ay",
    detay:
      "Bölgenizdeki elektrik dağıtım şirketine bağlantı başvurusu yapılır. Mesken ve ticarethanede sözleşme gücü kadar, sanayi ve tarımsal sulamada sözleşme gücünün 2 katına kadar kapasite istenebilir. OSB'deki tesisler dağıtım şirketine değil OSB müdürlüğüne başvurur.",
    belgeler: [
      "Tapu (hisseli tapuda tüm hissedarların noter muvafakati)",
      "Abonelik bilgileri ve kimlik",
      "Kiralık yerde noter onaylı kira kontratı (yeni uygulamada tapu veya kira kontratından biri yeterli)",
      "Apartmanda kat malikleri kurulu kararı",
    ],
    dikkat: [
      "Eksik belge en sık gecikme nedenidir — başvuru öncesi kontrol listesini asistanla üzerinden geçin.",
      "Başvuruyu kurulumcu yapacaksa sözleşmede 'izin sorumluluğu' yazılı olsun.",
    ],
    roller: {
      kurulumcu: [
        "Başvuru dosyasını hazırlar ve sunar — sözleşmenizde 'izin sorumluluğu' yazılıysa takibi de üstlenir.",
      ],
      resmi: [
        "Dağıtım şirketi (OSB'de OSB müdürlüğü) dosyayı inceler, eksik varsa bildirir.",
      ],
      siz: [
        "Eksik belgelerin 15 takvim günü içinde tamamlandığını takip edin — süre aşılırsa dosya iade edilir.",
        "Belgelerin ıslak imzalı aslı veya noter onaylı suretinin dosyada olduğunu kontrol edin.",
      ],
    },
  },
  {
    ad: "Çağrı Mektubu",
    sure: "Onay belgesi",
    detay:
      "Dağıtım şirketi, şebekeye bağlanabileceğinizi 'çağrı mektubu' adı verilen resmî yazıyla bildirir. Bu belge sürecin dönüm noktasıdır: sonraki adımların yasal süreleri bu tarihten itibaren işler ve bağlantı anlaşması bazı banka kredilerinin ön şartıdır.",
    belgeler: ["Çağrı mektubu (dağıtım şirketinden gelir)", "Bağlantı anlaşması"],
    dikkat: [
      "Süre sınırlarını takvime işleyin; proje onayı adımındaki gecikmeler hakkın düşmesine yol açabilir.",
      "'İzin gerekmez, tak-çalıştır' söylemi yanlıştır — şebekeye bağlı her sistemde bu süreç zorunludur (muafiyet yalnız off-grid/balkon tipi).",
    ],
    roller: {
      kurulumcu: [
        "Bağlantı anlaşması ve proje takvimini hazırlar; proje firmasıyla süreci başlatır.",
      ],
      resmi: [
        "Dağıtım şirketi çağrı mektubunu düzenler; mektup bildirim tarihinden itibaren 180 gün geçerlidir.",
      ],
      siz: [
        "Mektup tarihini takvime işleyin: ilk 90 gün içinde proje onaya sunulmazsa hak kaybı riski doğar.",
        "Bağlantı anlaşmasının bir nüshasını dosyalayın — bazı banka kredilerinin ön şartıdır.",
      ],
    },
  },
  {
    ad: "Proje Onayı",
    sure: "≈ 1–2 ay",
    detay:
      "Elektrik projesi EMO kayıtlı serbest müşavir mühendislere hazırlatılır ve TEDAŞ onayına sunulur: 100 kW'a kadar kabuller Bölge Koordinatörlüklerinde, 1.000 kW'a kadar proje ve kabuller Bölge Müdürlüklerinde yürür. Onay süresi bölgeye göre değişir.",
    belgeler: [
      "Bağlantı anlaşması",
      "Tek hat şeması + string planı + koruma koordinasyonu + topraklama projesi",
      "Panel/inverter katalog ve sertifikaları (IEC 61215/61730, EN 50549-1)",
      "Statik uygunluk yazısı, röle ayar listesi",
    ],
    dikkat: [
      "Panel sertifika numarasını TÜV Certipedia/VDE veritabanından sorgulatın; model kodu etiketle birebir eşleşmeli.",
      "Projede yazan marka/model ile sahaya gelen malzeme aynı olmalı — kabulde seri no eşleşmesi aranır.",
    ],
    roller: {
      kurulumcu: [
        "EMO kayıtlı serbest müşavir mühendise projeyi hazırlatır ve TEDAŞ onayına sunar.",
      ],
      resmi: [
        "TEDAŞ bölge birimleri projeyi inceler ve onaylar.",
      ],
      siz: [
        "Projedeki panel/inverter marka-modelinin teklifinizle birebir aynı olduğunu teyit edin.",
        "Panel sertifika numarasını TÜV Certipedia/VDE veritabanından sorgulatın; model kodu etiketle eşleşmeli.",
      ],
    },
  },
  {
    ad: "Kurulum",
    sure: "≈ 1–3 gün",
    detay:
      "Paneller, inverter ve konstrüksiyon yetkili ekipçe monte edilir — tüm sürecin en kısa aşaması budur. Kalite işçilikte gizlidir: farklı marka MC4 konnektör çiftlemek yasaktır (çatı yangınlarının başlıca nedeni), DC kablo EN 50618 standardında ve UV korumalı kanalda olmalıdır.",
    belgeler: [
      "Sözleşme: kapsam, marka/model listesi, teslim tarihi + gecikme cezası",
      "Teslim öncesi 10 maddelik fotoğraf kontrol listesi",
    ],
    dikkat: [
      "Ödemeyi iş kalemine bağlayın: küçük avans → teslimatta ara ödeme → kabulde bakiye. %50+ peşinat ve elden ödeme isteyenden kaçının.",
      "Kiremitte kanca kullanılır (kiremit delinmez); her delik contalanır. Sızdırmazlık garantisini yazılı isteyin.",
    ],
    roller: {
      kurulumcu: [
        "Montajı yetkili ekiple 1-3 günde tamamlar; işçilik standartlarından (MC4, EN 50618 kablo, sızdırmazlık) sorumludur.",
      ],
      resmi: [
        "Bu aşamada saha denetimi yoktur — resmî kontrol kabul aşamasında yapılır.",
      ],
      siz: [
        "Teslim öncesi fotoğraf kontrol listesini uygulatın (konnektörler, kablo kanalları, delik contaları).",
        "Sahaya gelen ekipmanın seri numaralarını fatura ve garanti belgeleriyle eşleştirip teslim alın.",
        "Ödemeyi iş kalemine bağlı tutun; kabulden önce bakiyenin tamamını ödemeyin.",
      ],
    },
  },
  {
    ad: "Kabul ve Sayaç",
    sure: "≈ 2–8 hafta",
    detay:
      "Dağıtım şirketi tesisi yerinde kontrol eder: projeye birebir uygunluk, malzeme seri no eşleşmesi, topraklama ölçümü, izolasyon raporları ve röle ayarları tutanağa geçer. Geçici kabulle birlikte çift yönlü sayaç takılır; sisteminiz şebekeyle resmen bağlanır.",
    belgeler: [
      "IEC 62446-1 devreye alma test raporu (kurulumcudan mutlaka isteyin)",
      "String başına Voc/Isc/izolasyon tablosu, topraklama ölçümü",
      "Garanti belgeleri (distribütör onaylı) + seri no listesi",
    ],
    dikkat: [
      "Devreye alma raporu ileride garanti ve sigorta taleplerinizin temel kanıtıdır — dosyalayın.",
      "Paralel ithal inverterde Türkiye garantisi olmayabilir; distribütör onaylı belge şart.",
    ],
    roller: {
      kurulumcu: [
        "IEC 62446-1 devreye alma testlerini yapar, raporu hazırlar ve kabule katılır.",
      ],
      resmi: [
        "Dağıtım şirketi tesisi yerinde kontrol eder; kabul kurulu oluşturulduktan sonra 10 gün içinde toplanır, muayene raporu tebliğinden itibaren 10 iş günü içinde sayaç takılır.",
      ],
      siz: [
        "Kabul öncesi test raporunu (string Voc/Isc, izolasyon, topraklama ölçümü) mutlaka isteyin ve dosyalayın — garanti/sigorta taleplerinin kanıtıdır.",
        "Tutanağa geçen seri numaralarını sahadaki ekipmanla karşılaştırın.",
      ],
    },
  },
  {
    ad: "Üretim Dönemi",
    sure: "25+ yıl",
    detay:
      "Ürettiğiniz elektrik tüketiminizden düşülür: konutlarda aylık, işletmelerde saatlik mahsuplaşma uygulanır. Fatura tamamen sıfırlanmaz — dağıtım bedeli ve vergiler kalır; gerçekçi beklenti %70-90 azalmadır. Paneller 25-30 yıl lineer performans garantisiyle çalışır.",
    belgeler: [
      "İnverter izleme uygulaması (ücretsiz)",
      "Yıllık üretim kaydı — garanti taleplerinde kanıt",
    ],
    dikkat: [
      "İlk faturanızda mahsubun işlediğini kontrol edin; detaylı takip için Kurulum Sonrası rehberine geçin.",
      "Ev satışında sistem mütemmim cüz gibi devredilir; satış sözleşmesine 'GES bedele dahil' yazdırın.",
    ],
    roller: {
      kurulumcu: [
        "Sözleşmedeki işçilik garantisi süresince (en az 2 yıl isteyin) arıza müdahalesinden sorumludur.",
      ],
      resmi: [
        "Dağıtım şirketi sayacı 25-35 günlük dönemlerle okur; fazla üretim bedelini görevli tedarik şirketi öder (tebliğden itibaren en geç 10 iş günü).",
      ],
      siz: [
        "İlk faturanızda mahsubun işlediğini kontrol edin.",
        "Üretimi inverter uygulamasından kWh/kWp kıyasıyla izleyin (Türkiye bandı 1.300-1.500).",
        "Fatura itirazınız haklı bulunursa fark sonraki faturada mahsup edilir; isterseniz 3 iş günü içinde nakit iade hakkınız vardır.",
      ],
    },
  },
];

export default function Surec() {
  return (
    <div className="wrap">
      <SiteHead aktif="surec" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Kurulum Süreci
        </span>
        <h1>
          Başvurudan üretime <span className="hl-g">yedi aşama</span>, tüm ayrıntısıyla
        </h1>
        <p>
          Her aşamanın gerekli belgeleri, gerçekçi süreleri ve en sık gecikme nedenleri.
          Uçtan uca süreç çoğunlukla 3-6 ay sürer; yoğun bölge ve dönemlerde 8 aya kadar
          uzayabilir. (Mevzuat güncelliği: {META.kbGuncelleme})
        </p>
        <nav className="cip-nav" aria-label="Aşamalara git">
          {ASAMALAR.map((a, i) => (
            <a key={a.ad} href={`#asama-${i + 1}`}>
              {i + 1}. {a.ad}
            </a>
          ))}
        </nav>
      </div>

      <div className="sr-list">
        {ASAMALAR.map((a, i) => (
          <section key={a.ad} id={`asama-${i + 1}`} className="sr-item" aria-label={`Aşama ${i + 1}: ${a.ad}`}>
            <span className="sr-num">{i + 1}</span>
            <div>
              <h2>
                {a.ad} <span className="jt">{a.sure}</span>
              </h2>
              <p><Aciklamali>{a.detay}</Aciklamali></p>
              <div className="sr-kutu">
                <div>
                  <b>Belgeler ve çıktılar</b>
                  <ul>
                    {a.belgeler.map((x) => (
                      <li key={x}><Aciklamali>{x}</Aciklamali></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <b>Dikkat</b>
                  <ul>
                    {a.dikkat.map((x) => (
                      <li key={x}><Aciklamali>{x}</Aciklamali></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="sr-kutu" style={{ marginTop: 14 }} aria-label="Bu adımda kim ne yapar">
                <div>
                  <b>Kurulumcu yapar</b>
                  <ul>
                    {a.roller.kurulumcu.map((x) => (
                      <li key={x}><Aciklamali>{x}</Aciklamali></li>
                    ))}
                  </ul>
                  <b style={{ marginTop: 10 }}>Resmî taraf yapar</b>
                  <ul>
                    {a.roller.resmi.map((x) => (
                      <li key={x}><Aciklamali>{x}</Aciklamali></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <b>Siz kontrol edin</b>
                  <ul>
                    {a.roller.siz.map((x) => (
                      <li key={x}><Aciklamali>{x}</Aciklamali></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="dk-cta">
        <SunDolu className="i" />
        <div>
          <b>Hangi aşamadasınız?</b>
          <p>
            Durumunuzu asistana anlatın; eksik belgenizi ve bir sonraki adımınızı birlikte
            netleştirin.
          </p>
        </div>
        <div className="dk-cta-btn">
          <a
            className="gt-btn small"
            href={`/asistan?soru=${encodeURIComponent("GES başvuru sürecinde hangi aşamada ne yapmalıyım?")}`}
          >
            Asistana Sorun <Ok className="i" />
          </a>
        </div>
      </section>

      </main>
      <SiteFoot yol="/surec" />
    </div>
  );
}
