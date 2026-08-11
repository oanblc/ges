import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { Aciklamali } from "@/components/Terim";
import { Ok, SunDolu } from "@/components/Icons";
import { SSS_DETAY, SSS_DETAY_GUNCELLEME } from "@/data/sss-detay";

export const dynamicParams = false;

export function generateStaticParams() {
  return SSS_DETAY.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = SSS_DETAY.find((x) => x.slug === slug);
  if (!d) return {};
  return {
    title: `${d.soru} — SSS`,
    description: d.kisa,
    alternates: { canonical: `/sss/${d.slug}` },
  };
}

export default async function SssDetaySayfa({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = SSS_DETAY.find((x) => x.slug === slug);
  if (!d) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: d.soru,
        acceptedAnswer: { "@type": "Answer", text: d.kisa },
      },
    ],
  };

  const kimlik = (metin: string) =>
    metin.toLowerCase()
      .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
      .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
      .replace(/[^a-z0-9 ]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

  const iliskili = d.iliskili
    .map((s) => SSS_DETAY.find((x) => x.slug === s))
    .filter(Boolean) as typeof SSS_DETAY;

  return (
    <div className="wrap">
      <SiteHead aktif="sss" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="icerik">
      <div className="yazi">
        <article className="yazi-ana">
          <header>
            <span className="sub-title">
              <SunDolu />
              Sık Sorulan Sorular
            </span>
            <h1>{d.soru}</h1>
            <div className="blog-meta">
              <span>Güncelleme: {SSS_DETAY_GUNCELLEME}</span>
              <span>·</span>
              <span>Dayanak: {d.dayanak}</span>
            </div>
          </header>

          <p>
            <b><Aciklamali>{d.kisa}</Aciklamali></b>
          </p>

          {d.bolumler.map((b) => (
            <section key={b.baslik}>
              <h2 id={kimlik(b.baslik)}>{b.baslik}</h2>
              {b.paragraflar.map((p) => (
                <p key={p.slice(0, 40)}>
                  <Aciklamali>{p}</Aciklamali>
                </p>
              ))}
            </section>
          ))}

          <div className="dk-cta">
            <SunDolu className="i" />
            <div>
              <b>Kendi durumunuza uygulayalım</b>
              <p>{d.cta.metin}</p>
            </div>
            <div className="dk-cta-btn">
              <a className="gt-btn small" href={d.cta.href}>
                {d.cta.etiket} <Ok className="i" />
              </a>
            </div>
          </div>

          <p style={{ marginTop: 24 }}>
            <a className="b-link" href="/sss">← Tüm sık sorulan sorular</a>
          </p>
        </article>

        <aside className="yazi-yan" aria-label="İçindekiler ve ilgili sorular">
          <div className="side-card">
            <h3>
              <SunDolu className="i" /> Bu sayfada
            </h3>
            {d.bolumler.map((b) => (
              <a key={b.baslik} className="q" href={`#${kimlik(b.baslik)}`}>
                {b.baslik}
              </a>
            ))}
          </div>
          {iliskili.length > 0 && (
            <div className="side-card">
              <h3>
                <SunDolu className="i" /> İlgili sorular
              </h3>
              {iliskili.map((x) => (
                <a key={x.slug} className="q" href={`/sss/${x.slug}`}>
                  {x.soru}
                </a>
              ))}
            </div>
          )}
          <div className="side-card cta">
            <h3>Sorunuz farklı mı?</h3>
            <p>
              Asistan aynı bilgi tabanıyla, size özel rakamlarla cevaplar — faturanızın
              fotoğrafını da okuyabilir.
            </p>
            <a
              className="gt-btn small"
              style={{ marginTop: 12 }}
              href={`/asistan?soru=${encodeURIComponent(d.soru)}`}
            >
              Asistana Sorun <Ok className="i" />
            </a>
          </div>
        </aside>
      </div>
      </main>

      <SiteFoot notu="Bu içerik bilgilendirme amaçlıdır; bağlayıcı görüş değildir." />
    </div>
  );
}
