import type { Metadata } from "next";
import Image from "next/image";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Blog — GES Rehber Yazıları",
  description:
    "Mevzuat değişiklikleri, piyasa verileri ve saha deneyimiyle GES yazıları: saatlik mahsuplaşma, tarifeler, teşvikler ve daha fazlası.",
  alternates: { canonical: "/blog" },
};

const YAZILAR = [
  {
    yol: "/blog/arazi-ges-mi-cati-ges-mi",
    baslik: "Arazi GES mi, çatı GES mi? Farklar, maliyetler, karar rehberi",
    ozet:
      "İzin yükünden kurulum maliyetine iki modelin 2026 karşılaştırması: $/kW bantları, maliyet dağılımı grafiği, arazi tarafının az bilinen izin adımları ve hangi durumda hangisinin mantıklı olduğu.",
    tarih: "8 Ağustos 2026",
    etiket: "Yatırım",
    gorsel: "/kapak-arazi-cati.jpg",
    gorselAlt: "Solda arazi tipi güneş santrali sıraları, sağda kiremit çatıya panel montajı",
  },
  {
    yol: "/blog/faturadaki-devlet-destegi",
    baslik: "Faturadaki 'devlet desteği' nedir, neden her yıl azalıyor?",
    ozet:
      "Tedarikçi mesajlarındaki 'devlet desteği mahsuplaştırıldı' satırının anlamı: kim alır, 4.000 kWh eşiği neden önemli, SKTT'ye düşmek ne demek — ve daralan destek GES kararınızı nasıl etkiler.",
    tarih: "8 Ağustos 2026",
    etiket: "Tarifeler",
    gorsel: "/fatura-elektrik.jpg",
    gorselAlt: "Elektrik faturası — okuma bilgileri ve fatura detayı",
  },
  {
    yol: "/blog/saatlik-mahsuplasma-rehberi",
    baslik: "Saatlik mahsuplaşma adım adım: yeni dönemde işletme GES'i nasıl kazandırır?",
    ozet:
      "1 Mayıs 2026'da başlayan saatlik mahsuplaşmayı beş adımda, interaktif gün profili ve güncel EPİAŞ verileriyle anlatıyoruz. Öz tüketim-satış makası neden artık her şey?",
    tarih: "8 Ağustos 2026",
    etiket: "Mevzuat + Veri",
    gorsel: "/roof-solar.jpg",
    gorselAlt: "Çatı üzerinde güneş paneli dizisi",
  },
];

export default function Blog() {
  return (
    <div className="wrap">
      <SiteHead aktif="blog" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Blog
        </span>
        <h1>
          Mevzuattan sahaya, <span className="hl-g">GES gündemi</span>
        </h1>
        <p>
          Mevzuat değişiklikleri, piyasa gelişmeleri ve sahada sık karşılaştığımız sorular
          üzerine yazıyoruz. Son güncelleme: {META.kbGuncelleme}.
        </p>
      </div>

      <section className="dk-bolum" aria-label="Yazılar" style={{ paddingBottom: 48 }}>
        <div className="dk-grid">
          {YAZILAR.map((y) => (
            <article key={y.yol} className="dk-kart blog-kart">
              <a href={y.yol} className="kapak" aria-hidden="true" tabIndex={-1}>
                {y.gorsel.endsWith(".svg") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={y.gorsel} alt={y.gorselAlt} width={480} height={280} />
                ) : (
                  <Image src={y.gorsel} alt={y.gorselAlt} width={480} height={280} />
                )}
              </a>
              <div className="dk-ust">
                <span className="dk-kurum">{y.etiket}</span>
                <span className="dk-durum aktif">{y.tarih}</span>
              </div>
              <b>
                <a className="b-link" href={y.yol}>
                  {y.baslik}
                </a>
              </b>
              <p>{y.ozet}</p>
              <div className="dk-alt">
                <span />
                <a href={y.yol}>
                  Yazıyı Okuyun <Ok className="i" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      </main>
      <SiteFoot yol="/blog" />
    </div>
  );
}
