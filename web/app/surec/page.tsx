import type { Metadata } from "next";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Süreç Rehberi — Başvurudan Üretime Yedi Aşama",
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
  },
  {
    ad: "Bağlantı Başvurusu",
    sure: "≈ 1–3 ay",
    detay:
      "Bölgenizdeki elektrik dağıtım şirketine bağlantı başvurusu yapılır. Mesken ve ticarethanede sözleşme gücü kadar, sanayi ve tarımsal sulamada sözleşme gücünün 2 katına kadar kapasite istenebilir. OSB'deki tesisler dağıtım şirketine değil OSB müdürlüğüne başvurur.",
    belgeler: [
      "Tapu (hisseli tapuda tüm hissedarların noter muvafakati)",
      "Abonelik bilgileri ve kimlik",
      "Kiracıysanız mülk sahibinin noter muvafakati",
      "Apartmanda kat malikleri kurulu kararı",
    ],
    dikkat: [
      "Eksik belge en sık gecikme nedenidir — başvuru öncesi kontrol listesini asistanla üzerinden geçin.",
      "Başvuruyu kurulumcu yapacaksa sözleşmede 'izin sorumluluğu' yazılı olsun.",
    ],
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
  },
  {
    ad: "Proje Onayı",
    sure: "≈ 2–6 ay",
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
  },
];

export default function Surec() {
  return (
    <div className="wrap">
      <SiteHead aktif="surec" />

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Süreç Rehberi
        </span>
        <h1>
          Başvurudan üretime <span className="hl-g">yedi aşama</span>, tüm ayrıntısıyla
        </h1>
        <p>
          Her aşamanın gerekli belgeleri, gerçekçi süreleri ve en sık gecikme nedenleri.
          Süreler bölgeye göre değişir; uçtan uca gerçekçi toplam 3-6 aydır. (Mevzuat
          güncelliği: {META.kbGuncelleme})
        </p>
      </div>

      <div className="sr-list">
        {ASAMALAR.map((a, i) => (
          <section key={a.ad} className="sr-item" aria-label={`Aşama ${i + 1}: ${a.ad}`}>
            <span className="sr-num">{i + 1}</span>
            <div>
              <h2>
                {a.ad} <span className="jt">{a.sure}</span>
              </h2>
              <p>{a.detay}</p>
              <div className="sr-kutu">
                <div>
                  <b>Belgeler ve çıktılar</b>
                  <ul>
                    {a.belgeler.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <b>Dikkat</b>
                  <ul>
                    {a.dikkat.map((x) => (
                      <li key={x}>{x}</li>
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

      <SiteFoot yol="/surec" />
    </div>
  );
}
