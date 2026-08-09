import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { Aciklamali } from "@/components/Terim";
import { Ok, SunDolu } from "@/components/Icons";
import SSS from "@/data/sss.json";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular — Çatı GES",
  description:
    "Çatı güneş enerjisi hakkında en çok sorulan sorular ve denetimden geçmiş cevaplar: maliyet, izinler, mahsuplaşma, batarya, teknik detaylar ve bakım.",
  alternates: { canonical: "/sss" },
};

type Kayit = { soru: string; cevap: string };
type Kategori = { ad: string; sorular: Kayit[] };

const kimlik = (metin: string) =>
  metin.toLowerCase()
    .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9 ]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

export default function SikSorulanlar() {
  const kategoriler = SSS.kategoriler as Kategori[];
  const toplam = kategoriler.reduce((t, k) => t + k.sorular.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: kategoriler.flatMap((k) =>
      k.sorular.map((s) => ({
        "@type": "Question",
        name: s.soru,
        acceptedAnswer: { "@type": "Answer", text: s.cevap },
      }))
    ),
  };

  return (
    <div className="wrap">
      <SiteHead aktif="sss" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="icerik">
      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Sık Sorulan Sorular
        </span>
        <h1>
          Merak edilenler, <span className="hl-g">denetimli cevaplarla</span>
        </h1>
        <p>
          Bu sayfadaki {toplam} soru, internette gerçek kullanıcıların sorduklarından
          derlendi; her cevap asistanımızın bilgi tabanına dayanır ve yayınlanmadan önce
          ikinci bir yapay zekâ denetiminden geçti. Güncelleme: {SSS.guncelleme}.
        </p>
      </div>

      <div className="yazi sss-yerlesim">
        <div className="yazi-ana">
          {kategoriler.map((k) => (
            <section key={k.ad} className="sss-bolum" id={kimlik(k.ad)}>
              <h2>{k.ad}</h2>
              {k.sorular.map((s) => (
                <details key={s.soru} className="sss-kayit" id={kimlik(s.soru)}>
                  <summary>{s.soru}</summary>
                  <p>
                    <Aciklamali>{s.cevap}</Aciklamali>
                  </p>
                </details>
              ))}
            </section>
          ))}

          <div className="dk-cta">
            <SunDolu className="i" />
            <div>
              <b>Sorunuz burada yok mu?</b>
              <p>
                Asistan aynı bilgi tabanıyla, size özel rakamlarla cevaplar — faturanızın
                fotoğrafını da okuyabilir.
              </p>
            </div>
            <div className="dk-cta-btn">
              <a className="gt-btn small" href="/asistan">
                Asistana Sorun <Ok className="i" />
              </a>
            </div>
          </div>
        </div>

        <aside className="yazi-yan" aria-label="Kategoriler">
          <div className="side-card">
            <h3>
              <SunDolu className="i" /> Kategoriler
            </h3>
            {kategoriler.map((k) => (
              <a key={k.ad} className="q" href={`#${kimlik(k.ad)}`}>
                {k.ad} ({k.sorular.length})
              </a>
            ))}
          </div>
        </aside>
      </div>
      </main>

      <SiteFoot notu="Cevaplar bilgilendirme amaçlıdır; bağlayıcı görüş niteliği taşımaz." />
    </div>
  );
}
