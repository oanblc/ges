import type { Metadata } from "next";
import PoliceSihirbazi from "@/components/PoliceSihirbazi";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import UyeKilit from "@/components/UyeKilit";
import { uyeOku } from "@/lib/uye";
import { SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Sigorta Poliçesi Analizi — GES'iniz Güvende mi?",
  description:
    "Konut ya da işyeri sigorta poliçenizi yükleyin: GES/güneş paneli teminatınız var mı, hangi kritik teminatlar eksik, sigortacınıza ne sormalısınız — tarafsız değerlendirme.",
  alternates: { canonical: "/police-analizi" },
};

export default async function PoliceAnalizi() {
  const uye = await uyeOku();
  return (
    <div className="wrap">
      <SiteHead aktif="police" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Poliçe Analizi
        </span>
        <h1>
          Sigortanız <span className="hl-g">GES&apos;inizi koruyor mu?</span>
        </h1>
        <p>
          Standart konut poliçeleri güneş panellerini çoğu zaman otomatik kapsamaz. Poliçenizin
          PDF&apos;ini ya da fotoğrafını yükleyin; GES açısından kapsamınızı, eksik teminatları ve
          sigortacınıza sormanız gerekenleri tarafsız biçimde değerlendirelim. Biz sigorta
          satmıyoruz; şirket adı raporda kullanılmaz.
        </p>
      </div>

      <div className="calc-grid">
        <section className="tool genis" aria-label="Poliçe sihirbazı">
          {uye ? <PoliceSihirbazi /> : <UyeKilit donus="/police-analizi" />}
        </section>
      </div>

      </main>
      <SiteFoot notu="Değerlendirmeler bilgilendirme amaçlıdır; poliçe şartları için sigortacınız bağlayıcıdır." />
    </div>
  );
}
