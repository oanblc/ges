import type { Metadata } from "next";
import FaturaSihirbazi from "@/components/FaturaSihirbazi";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { META } from "@/data/kb";
import { SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Fatura Analizi — Faturanızdan GES Planınıza",
  description:
    "Elektrik faturanızı yükleyin: tüketiminiz okunsun, size uygun GES gücü, kurulum maliyeti, şebekeye satış geliri ve geri ödeme süresi tek ekranda çıksın.",
  alternates: { canonical: "/fatura-analizi" },
};

export default function FaturaAnalizi() {
  return (
    <div className="wrap">
      <SiteHead aktif="fatura" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Fatura Analizi
        </span>
        <h1>
          Faturanızdan <span className="hl-g">GES planınıza</span> üç adım
        </h1>
        <p>
          Elektrik faturanızın fotoğrafını yükleyin; tüketim ve tutar satırları otomatik okunur.
          Bilgileri onayladığınızda size uygun sistem gücünü, kurulum maliyeti bandını, şebekeye
          satabileceğiniz enerjiyi ve geri ödeme süresini tek ekranda görürsünüz. Hesaplar{" "}
          {META.tarifeGecerlilik} tarihli EPDK tarifeleri ve güncel piyasa bantlarıyla yapılır.
        </p>
      </div>

      <div className="calc-grid">
        <section className="tool genis" aria-label="Fatura sihirbazı">
          <FaturaSihirbazi />
        </section>
      </div>

      </main>
      <SiteFoot yol="/fatura-analizi" notu="Sonuçlar ön fizibilite niteliğindedir; bağlayıcı görüş değildir." />
    </div>
  );
}
