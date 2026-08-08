import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { Aciklamali } from "@/components/Terim";
import { META, TARIFE } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Faturadaki 'Devlet Desteği' Nedir, Neden Her Yıl Azalıyor?",
  description:
    "Elektrik faturanızdaki devlet desteği satırının anlamı: kim alır, sınırı nedir, SKTT'ye düşmek ne demek — ve daralan destek GES kararınızı nasıl etkiler.",
  alternates: { canonical: "/blog/faturadaki-devlet-destegi" },
};

const tl = (v: number, hane = 2) =>
  v.toLocaleString("tr-TR", { minimumFractionDigits: hane, maximumFractionDigits: hane });

/** Yatay kıyas çubukları — doğrulanmış palet, doğrudan etiket */
function Cubuklar({
  satirlar,
  birim,
  hane = 0,
}: {
  satirlar: Array<[string, number, string]>;
  birim: string;
  hane?: number;
}) {
  const maks = Math.max(...satirlar.map(([, v]) => v));
  const yuk = satirlar.length * 44 + 8;
  return (
    <svg viewBox={`0 0 680 ${yuk}`} role="img"
      aria-label={satirlar.map(([a, v]) => `${a}: ${tl(v, hane)} ${birim}`).join("; ")}>
      {satirlar.map(([ad, v, renk], i) => {
        const yy = 14 + i * 44;
        const w = Math.max(8, (v / maks) * 400);
        return (
          <g key={ad}>
            <text x="0" y={yy + 15} fontSize="13" fill="#252525">{ad}</text>
            <rect x="226" y={yy} width={w} height="22" rx="4" fill={renk} />
            <text x={226 + w + 10} y={yy + 15} fontSize="13" fontWeight="600" fill="#252525">
              {tl(v, hane)} {birim}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function DevletDestegi() {
  const k1 = TARIFE.mesken.enerjiK1 / 100; // kr → ₺/kWh, vergisiz aktif enerji
  const k2 = TARIFE.mesken.enerjiK2 / 100;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Faturadaki 'Devlet Desteği' Nedir, Neden Her Yıl Azalıyor?",
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
              Faturadaki <span className="hl-g">"devlet desteği"</span> nedir, neden her yıl
              azalıyor?
            </h1>
            <div className="blog-meta">
              <span>8 Ağustos 2026</span>
              <span>·</span>
              <span>Dayanak: EPDK tarife kararları + RG 23.12.2025</span>
              <span>·</span>
              <span>Tarife verisi: EPDK {META.tarifeGecerlilik}</span>
            </div>
          </header>

          <p>
            <Aciklamali>
              Tedarikçinizden şöyle bir mesaj almış olabilirsiniz: "tüketim bedeli 3.327 TL olup
              devlet desteği mahsuplaştırıldıktan sonra ödenmesi gereken tutar 2.330 TL." İlk
              bakışta size özel bir indirim gibi görünen bu satır, aslında Türkiye'deki bütün
              konut abonelerini ilgilendiren bir tarife düzeninin görünür hali — ve bu düzen her
              yıl biraz daha daralıyor.
            </Aciklamali>
          </p>

          <h2 id="nedir">Bu destek tam olarak nedir?</h2>
          <p>
            <Aciklamali>
              Devlet, konut (mesken) elektriğinde aktif enerji bedelinin bir kısmını
              sübvanse eder. Eskiden bu destek fiyatın içinde görünmezdi; artık faturalarda
              "gerçek bedel − devlet desteği = ödenecek tutar" biçiminde açıkça gösteriliyor.
              Başvuru gerektirmez, mesken abonelerine otomatik uygulanır. Destek yalnızca
              enerji bedelinedir — dağıtım bedeli ve vergiler tam tarifeden ödenir.
            </Aciklamali>
          </p>
          <p>
            <Aciklamali>
              Desteğin ilk katmanı kademeli tarifedir: aylık yaklaşık 240 kWh'e kadarki
              tüketim düşük (destekli) fiyattan, üzeri yüksek kademeden faturalanır. İki
              kademe arasındaki fark küçümsenecek gibi değil:
            </Aciklamali>
          </p>
          <figure className="fig">
            <Cubuklar
              birim="₺/kWh"
              hane={2}
              satirlar={[
                ["1. kademe (destekli, ≤240 kWh/ay)", k1, "#1F8A5D"],
                ["2. kademe (240 kWh üzeri)", k2, "#A5620D"],
              ]}
            />
            <figcaption>
              Mesken aktif enerji bedeli, vergiler hariç (EPDK, {META.tarifeGecerlilik}).
              Yüksek kademe, destekli kademenin yaklaşık {Math.round(k2 / k1)} katıdır — çok
              tüketen ev, desteğin çok daha azını alır.
            </figcaption>
          </figure>

          <h2 id="sinir">Herkes alabiliyor mu? Sınır daralıyor</h2>
          <p>
            <Aciklamali>
              Desteğin ikinci ve daha az bilinen katmanı yıllık eşiktir: tüketimi belirli bir
              sınırı aşan mesken aboneleri "yüksek tüketimli" sayılır ve destekli ulusal
              tarifeden tamamen çıkarılır. Bu eşik 2025'te 5.000 kWh/yıl iken 2026'da 4.000
              kWh/yıla indirildi — aylık yaklaşık 333 kWh, bugünkü tarifeyle kabaca 984 TL'lik
              tüketime denk geliyor. Serbest tüketici limiti de aynı dönemde 750'den 500
              kWh/yıla indi.
            </Aciklamali>
          </p>
          <figure className="fig">
            <Cubuklar
              birim="kWh/yıl"
              satirlar={[
                ["Destek eşiği — 2025", 5000, "#1F8A5D"],
                ["Destek eşiği — 2026", 4000, "#A5620D"],
              ]}
            />
            <figcaption>
              Mesken "yüksek tüketim" eşiği (EPDK kararı, RG). Eşik bir yılda %20 daraldı;
              klima, elektrikli araç ve ısı pompası kullanan evler bu sınırı kolayca aşıyor.
            </figcaption>
          </figure>
          <p>
            <Aciklamali>
              Eşiği aşan abone SKTT'ye geçer: fiyat artık devlet destekli tarife değil,
              (PTF + YEKDEM) × katsayı formülüyle piyasadan türetilir. Yani hem destek biter
              hem de fatura, toptan piyasa dalgalanmasına açılır — YEKDEM öngörüsünün 2026'da
              iki ayda ikiye katlandığı bir yılda bu ciddi bir belirsizliktir.
            </Aciklamali>
          </p>

          <h2 id="sure">Ne kadar sürecek?</h2>
          <p>
            <Aciklamali>
              Bu destek bir kampanya değil; EPDK'nın tarife kararlarıyla süren kalıcı bir
              düzen. Belirli bir bitiş tarihi yok — ama yönü net: eşikler her yıl aşağı
              çekiliyor, destek her yıl daha az haneyi kapsıyor. Devletin uzun vadeli mesajı,
              yüksek tüketimli evlerin gerçek piyasa fiyatıyla tanışacağı yönünde.
            </Aciklamali>
          </p>

          <h2 id="ges">GES'le ne ilgisi var?</h2>
          <p>
            <Aciklamali>
              Çatı GES'i bu tabloda iki iş birden görür. Birincisi: üretiminiz şebekeden
              çektiğiniz enerjiyi azaltır; yıllık çekişinizi 4.000 kWh eşiğinin altına
              indirirseniz destekli tarifede kalırsınız. İkincisi: aylık mahsuplaşma sayesinde
              gündüz ürettiğiniz fazla, pahalı 2. kademeden düşülür — kademeden kurtarma,
              2026'da konut GES'inin en güçlü ekonomik gerekçesidir. Kısacası destek daraldıkça
              GES'in değeri artıyor: devletin sübvansiyonu azalırken çatınızın sübvansiyonu
              25 yıl sabit kalıyor.
            </Aciklamali>
          </p>

          <div className="dk-cta">
            <SunDolu className="i" />
            <div>
              <b>Kendi faturanıza bakalım</b>
              <p>
                Faturanızın fotoğrafını yükleyin: eşiğe ne kadar yakın olduğunuzu, kademe
                dağılımınızı ve GES'in size özel getirisini birlikte görelim.
              </p>
            </div>
            <div className="dk-cta-btn">
              <a className="gt-btn small line" href="/fatura-analizi">
                Fatura Analizi
              </a>
              <a
                className="gt-btn small"
                href={`/asistan?soru=${encodeURIComponent("Faturamdaki devlet desteği ne kadar, destek eşiğine yakın mıyım?")}`}
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
            <a className="q" href="#nedir">Bu destek nedir?</a>
            <a className="q" href="#sinir">Sınır daralıyor</a>
            <a className="q" href="#sure">Ne kadar sürecek?</a>
            <a className="q" href="#ges">GES'le ilgisi</a>
          </div>
          <div className="side-card cta">
            <h3>Eşiğe yakın mısınız?</h3>
            <p>
              Yıllık tüketiminiz 4.000 kWh'e yaklaşıyorsa destekten çıkma riskiniz var —
              asistan faturanızdan hesaplasın.
            </p>
            <a
              className="gt-btn small"
              style={{ marginTop: 12 }}
              href={`/asistan?soru=${encodeURIComponent("Yıllık tüketimimi ve destek eşiğine uzaklığımı faturamdan hesaplar mısın?")}`}
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
