import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { Aciklamali } from "@/components/Terim";
import { CATI_CARPANI, MALIYET_KALEMLERI } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Arazi GES mi, Çatı GES mi? Farklar, Maliyetler, Karar Rehberi",
  description:
    "Arazi ve çatı güneş santralinin izin süreci, kurulum maliyeti, verim ve süre farkları: 2026 fiyat bantları, maliyet dağılımı grafiği ve hangi durumda hangisinin mantıklı olduğu.",
  alternates: { canonical: "/blog/arazi-ges-mi-cati-ges-mi" },
};

/** Aralık kıyası — iki maliyet bandını aynı eksende gösterir */
function Bant({
  satirlar,
  min,
  maks,
  birim,
}: {
  satirlar: Array<[string, number, number, string]>;
  min: number;
  maks: number;
  birim: string;
}) {
  const X0 = 190;
  const GEN = 380;
  const x = (v: number) => X0 + ((v - min) / (maks - min)) * GEN;
  const yuk = satirlar.length * 52 + 26;
  return (
    <svg viewBox={`0 0 680 ${yuk}`} role="img"
      aria-label={satirlar.map(([a, alt, ust]) => `${a}: ${alt}–${ust} ${birim}`).join("; ")}>
      {[min, (min + maks) / 2, maks].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={8} x2={x(v)} y2={yuk - 22} stroke="#E2E5DE" strokeWidth="1" />
          <text x={x(v)} y={yuk - 6} fontSize="11.5" fill="#525252" textAnchor="middle">
            {v} {birim}
          </text>
        </g>
      ))}
      {satirlar.map(([ad, alt, ust, renk], i) => {
        const yy = 22 + i * 52;
        return (
          <g key={ad}>
            <text x="0" y={yy + 14} fontSize="13" fill="#252525">{ad}</text>
            <rect x={x(alt)} y={yy} width={Math.max(8, x(ust) - x(alt))} height="20" rx="4" fill={renk} />
            <text x={x(alt) - 8} y={yy + 14} fontSize="12.5" fontWeight="600" fill="#252525" textAnchor="end">
              {alt}
            </text>
            <text x={x(ust) + 8} y={yy + 14} fontSize="12.5" fontWeight="600" fill="#252525">
              {ust}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Halka (pasta) grafik — payları yayla, kimliği yandaki etiket listesiyle verir */
function Halka({ dilimler }: { dilimler: Array<[string, number, string]> }) {
  const CX = 158;
  const CY = 152;
  const R1 = 62;
  const R2 = 112;
  const RAD = Math.PI / 180;
  const nokta = (r: number, a: number) =>
    [CX + r * Math.cos(a * RAD - Math.PI / 2), CY + r * Math.sin(a * RAD - Math.PI / 2)] as const;
  let aci = 0;
  const yaylar = dilimler.map(([ad, pay, renk]) => {
    const a0 = aci;
    const a1 = (aci += (pay / 100) * 360);
    const [x0, y0] = nokta(R2, a0);
    const [x1, y1] = nokta(R2, a1);
    const [x2, y2] = nokta(R1, a1);
    const [x3, y3] = nokta(R1, a0);
    const buyuk = a1 - a0 > 180 ? 1 : 0;
    return {
      ad, pay, renk,
      d: `M${x0} ${y0}A${R2} ${R2} 0 ${buyuk} 1 ${x1} ${y1}L${x2} ${y2}A${R1} ${R1} 0 ${buyuk} 0 ${x3} ${y3}Z`,
    };
  });
  return (
    <svg viewBox="0 0 680 300" role="img"
      aria-label={dilimler.map(([a, p]) => `${a}: yüzde ${p}`).join("; ")}>
      {yaylar.map((y) => (
        <path key={y.ad} d={y.d} fill={y.renk} stroke="#fff" strokeWidth="2" />
      ))}
      {yaylar.map((y, i) => {
        const yy = 42 + i * 36;
        return (
          <g key={y.ad}>
            <rect x="330" y={yy - 12} width="14" height="14" rx="4" fill={y.renk} />
            <text x="354" y={yy} fontSize="13" fill="#252525">{y.ad}</text>
            <text x="672" y={yy} fontSize="13" fontWeight="600" fill="#252525" textAnchor="end">
              %{y.pay}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AraziMiCatiMi() {
  // kb'deki 7 kalem grafikte 6'ya indirgenir (proje+nakliye "diğer"de birleşir)
  const k = Object.fromEntries(MALIYET_KALEMLERI);
  const dilimler: Array<[string, number, string]> = [
    ["Güneş panelleri", k["Güneş panelleri"], "#0B4F3F"],
    ["İnverter", k["İnverter"], "#1F8A5D"],
    ["Montaj ve işçilik", k["Montaj ve işçilik"], "#4CAF82"],
    ["Konstrüksiyon", k["Konstrüksiyon"], "#7AC6A2"],
    ["Kablo ve elektrik", k["Kablo ve elektrik"], "#A8DCC3"],
    ["Proje, izin, nakliye ve diğer",
      k["Proje, izin, devreye alma"] + k["Nakliye ve diğer"], "#D9C36A"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Arazi GES mi, çatı GES mi? Farklar, maliyetler, karar rehberi",
    datePublished: "2026-08-08",
    dateModified: "2026-08-08",
    author: { "@type": "Organization", name: "GES Danışmanı" },
    publisher: { "@type": "Organization", name: "GES Danışmanı" },
  };

  return (
    <div className="wrap">
      <SiteHead aktif="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="icerik">
      <div className="yazi">
        <article className="yazi-ana">
          <header>
            <span className="sub-title">
              <SunDolu />
              Blog
            </span>
            <h1>
              Arazi GES mi, <span className="hl-g">çatı GES mi?</span> Farklar, maliyetler,
              karar rehberi
            </h1>
            <div className="blog-meta">
              <span>8 Ağustos 2026</span>
              <span>·</span>
              <span>Fiyat verisi: sektör EPC listeleri (Şubat–Ağustos 2026)</span>
            </div>
          </header>

          <p>
            <Aciklamali>
              Güneş yatırımı düşünen herkesin ilk yol ayrımı aynı: paneller çatıya mı
              kurulacak, yoksa bir araziye mi? İkisi de aynı elektriği üretir ama izin
              süreci, maliyet yapısı, süre ve getiri mekanizması ciddi biçimde ayrışır.
              Bu yazıda iki modeli güncel rakamlarla yan yana koyuyoruz.
            </Aciklamali>
          </p>

          <h2 id="fark">Bir bakışta temel farklar</h2>
          <div className="tablo-kaydir">
            <table>
              <thead>
                <tr><th></th><th>Çatı GES</th><th>Arazi GES</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yer gereksinimi</td>
                  <td>Mevcut çatı — ek arazi maliyeti yok</td>
                  <td>Mülk ya da kiralık arazi; sıra aralıkları ve yollarla panel alanının
                      2-3 katı yer gerekir</td>
                </tr>
                <tr>
                  <td>İzin yükü</td>
                  <td>Hafif: statik uygunluk, bağlantı başvurusu, proje onayı</td>
                  <td>Ağır: tarım arazisi raporu, imar, gerekirse ÇED, enerji nakil hattı
                      onayı</td>
                </tr>
                <tr>
                  <td>Kurulum maliyeti (2026)</td>
                  <td>550–950 $/kW</td>
                  <td>450–650 $/kW (arazi bedeli hariç)</td>
                </tr>
                <tr>
                  <td>Verim koşulları</td>
                  <td>Çatının yönü ve eğimiyle sınırlı</td>
                  <td>Optimum açı ve yönlendirme serbest; panel altı havalandırma daha iyi</td>
                </tr>
                <tr>
                  <td>Tipik ölçek</td>
                  <td>Konut 5-25 kW, işletme yüzlerce kW</td>
                  <td>Genellikle MW ölçeği</td>
                </tr>
                <tr>
                  <td>Ek giderler</td>
                  <td>Çatı tipine göre montaj farkı (kiremitte %{Math.round((CATI_CARPANI.kiremit - 1) * 100)}'ya
                      varan ek)</td>
                  <td>Çit-güvenlik, kamera, trafo/şalt, arazi hazırlığı, kira</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="maliyet">Kurulum maliyeti: bantlar ne diyor?</h2>
          <p>
            <Aciklamali>
              Sektör EPC fiyat listelerinde 2026 anahtar teslim bantları şöyle: çatıda
              550–950 $/kW, arazide 450–650 $/kW (KDV ve arazi bedeli hariç). kW başına
              arazi daha ucuz görünür; bunun nedeni ölçek ekonomisidir — MW'lık alımlarda
              panel ve inverter birim fiyatı düşer, işçilik yayılır. Ancak bu bant arazinin
              kendisini, çit-güvenlik yatırımını ve şebekeye bağlantı için gerekebilecek
              enerji nakil hattını içermez; küçük ölçekli bir arazi projesinde bu kalemler
              farkı kolayca tersine çevirir.
            </Aciklamali>
          </p>
          <figure className="fig">
            <Bant
              min={400}
              maks={1000}
              birim="$/kW"
              satirlar={[
                ["Arazi GES", 450, 650, "#1F8A5D"],
                ["Çatı GES", 550, 950, "#A5620D"],
              ]}
            />
            <figcaption>
              2026 anahtar teslim kurulum bantları, KDV ve arazi bedeli hariç (sektör EPC
              listeleri; referans kur ~44 ₺/$). Kesin rakam için birden fazla teklif alın.
            </figcaption>
          </figure>

          <h2 id="dagilim">Paranız nereye gidiyor?</h2>
          <p>
            <Aciklamali>
              Çatı sisteminde bütçenin üçte birinden fazlası panele gider; inverter ve
              işçilik onu izler. Arazi projesinde bu tabloya trafo/şalt sahası, arazi
              hazırlığı ve çevre güvenliği eklenir, konstrüksiyonun payı da zemine çakılan
              kazık sistemleri nedeniyle büyür.
            </Aciklamali>
          </p>
          <figure className="fig">
            <Halka dilimler={dilimler} />
            <figcaption>
              Çatı GES maliyet dağılımı (sektör kırılımı — hesaplama araçlarımızla aynı
              veri seti). Arazi projelerinde ek olarak trafo/şalt ve saha hazırlığı kalemleri
              devreye girer.
            </figcaption>
          </figure>

          <h2 id="surec">İzin süreci: asıl ayrışma burada</h2>
          <p>
            <Aciklamali>
              Çatı tarafında süreç görece standarttır: statik uygunluk, dağıtım şirketine
              bağlantı başvurusu, proje onayı ve kabul. Üstelik 2026 itibarıyla 50 kW
              altındaki çatı sistemlerinde TEDAŞ proje onay ve kabul bedelleri kaldırıldı —
              yani resmî harç maliyeti sıfır. Arazi tarafında ise sıraya şunlar girer:
              arazinin "marjinal tarım arazisi" raporu (İl Tarım ve Orman Müdürlüğü), imar
              sorgusu ve gerekirse plan değişikliği, ölçeğe göre ÇED değerlendirmesi,
              bağlantı görüşü ve çağrı mektubu, ardından enerji nakil hattı projesinin
              TEDAŞ onayı — çağrı mektubunun 180 günlük geçerliliği içinde (projenin ilk 90 günde
              onaya sunulması gerekir). Fiziksel
              kurulum MW ölçeğinde 4-6 ay sürerken, izin aşamaları bunun üzerine eklenir;
              çatı projesi ise çoğu durumda birkaç ay içinde devrededir.
            </Aciklamali>
          </p>

          <h2 id="getiri">Getiri tarafı: mahsuplaşma kimin lehine?</h2>
          <p>
            <Aciklamali>
              Öz tüketim modelinde iki sistem de aynı mahsuplaşma kurallarına tabidir; fark
              tüketimin nerede olduğudur. Çatı GES tüketimin tam üstündedir: ürettiğinizi
              önce kendiniz kullanır, pahalı şebeke elektriğini birebir ikame edersiniz.
              Arazi GES'te üretim genellikle tüketim noktasından uzaktadır; elektrik şebeke
              üzerinden mahsuplaşır ve 1 Mayıs 2026'da başlayan saatlik mahsuplaşma
              işletmeler için öz tüketim-satış makasını açmıştır — üretimin tüketimle aynı
              saatte örtüşmediği her kWh, perakende fiyat yerine piyasa fiyatından değer
              bulur. Bu yüzden işletmeler için "önce kendi çatın, yetmiyorsa arazi" sırası
              2026'da her zamankinden daha geçerli.
            </Aciklamali>
          </p>

          <h2 id="karar">Hangisi size göre?</h2>
          <div className="tablo-kaydir">
            <table>
              <thead>
                <tr><th>Durum</th><th>Mantıklı seçim</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Konut, aylık faturayı düşürme hedefi</td>
                  <td>Çatı — düşük izin yükü, sıfır harç, aylık mahsup</td>
                </tr>
                <tr>
                  <td>İşletme, çatısı yeterli</td>
                  <td>Çatı — öz tüketim saatlik mahsupta en değerli senaryo</td>
                </tr>
                <tr>
                  <td>İşletme, çatısı küçük / tüketimi büyük</td>
                  <td>Önce çatı, kalan ihtiyaç için arazi (öz tüketim tesisi)</td>
                </tr>
                <tr>
                  <td>Yatırım amaçlı MW ölçeği, uygun arazi var</td>
                  <td>Arazi — ölçek ekonomisi; izin sürecine profesyonel destek şart</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="dk-cta">
            <SunDolu className="i" />
            <div>
              <b>Kendi senaryonuzu hesaplayalım</b>
              <p>
                Tüketiminizi ve çatı/arazi durumunuzu asistana anlatın; boyut, maliyet bandı
                ve geri ödeme süresini güncel tarifelerle hesaplasın.
              </p>
            </div>
            <div className="dk-cta-btn">
              <a className="gt-btn small line" href="/hesaplama">
                Hesaplama Araçları
              </a>
              <a
                className="gt-btn small"
                href={`/asistan?soru=${encodeURIComponent("Arazi GES ile çatı GES arasında kararsızım; durumuma göre hangisi mantıklı?")}`}
              >
                Asistana Sorun <Ok className="i" />
              </a>
            </div>
          </div>
        </article>

        <aside className="yazi-yan" aria-label="İçindekiler">
          <div className="side-card">
            <h3>
              <SunDolu className="i" /> İçindekiler
            </h3>
            <a className="q" href="#fark">Temel farklar</a>
            <a className="q" href="#maliyet">Maliyet bantları</a>
            <a className="q" href="#dagilim">Maliyet dağılımı</a>
            <a className="q" href="#surec">İzin süreci</a>
            <a className="q" href="#getiri">Getiri tarafı</a>
            <a className="q" href="#karar">Hangisi size göre?</a>
          </div>
          <div className="side-card cta">
            <h3>Çatınız yeter mi?</h3>
            <p>
              Çoğu işletmenin ilk sorusu bu. Çatı alanınızı ve aylık tüketiminizi yazın,
              asistan kaç kW sığacağını hesaplasın.
            </p>
            <a
              className="gt-btn small"
              style={{ marginTop: 12 }}
              href={`/asistan?soru=${encodeURIComponent("Çatı alanıma kaç kW GES sığar, tüketimimi karşılar mı?")}`}
            >
              Asistana Sorun <Ok className="i" />
            </a>
          </div>
        </aside>
      </div>
      </main>

      <SiteFoot notu="Yanıtlar bilgilendirme amaçlıdır; bağlayıcı görüş niteliği taşımaz." />
    </div>
  );
}
