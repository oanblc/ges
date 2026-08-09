import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import AramaSayfa from "@/components/AramaSayfa";
import { SunDolu } from "@/components/Icons";
import { aramaDizini } from "@/data/arama";

export const metadata: Metadata = {
  title: "Arama — gesdanismani.com",
  description: "Sayfalar, sık sorulan sorular, destekler ve blog yazıları içinde arayın.",
  robots: { index: false, follow: true },
};

export default function Arama() {
  return (
    <>
      <SiteHead aktif="diger" />
      <main id="icerik">
        <div className="calc-ust">
          <span className="sub-title">
            <SunDolu />
            Arama
          </span>
          <h1>
            Sitede <span className="hl-g">arayın</span>
          </h1>
        </div>
        <AramaSayfa dizin={aramaDizini()} />
      </main>
      <SiteFoot notu="Aradığınızı bulamadıysanız asistana sorabilirsiniz; cevaplar güncel mevzuata dayanır." />
    </>
  );
}
