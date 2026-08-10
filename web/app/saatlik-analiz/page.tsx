import type { Metadata } from "next";
import SaatlikAnaliz from "@/components/SaatlikAnaliz";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Saatlik Tüketim Analizi — Dökümünüzden Saat Saat GES Simülasyonu",
  description:
    "Dağıtım şirketinizden veya EPİAŞ'tan aldığınız saatlik tüketim dökümünü (CSV/XLSX) yükleyin; tüketim profiliniz çıksın, farklı GES boyutları için öz tüketim, yıllık fayda ve geri ödeme süresi saat saat simüle edilsin.",
  alternates: { canonical: "/saatlik-analiz" },
};

export default async function SaatlikAnalizSayfa() {
  return (
    <div className="wrap">
      <SiteHead aktif="saatlik" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Saatlik Tüketim Analizi
        </span>
        <h1>
          Saatlik dökümünüzden <span className="hl-g">saat saat GES simülasyonu</span>
        </h1>
        <p>
          Dağıtım şirketinizden ya da EPİAŞ&apos;tan aldığınız saatlik tüketim dökümünü yükleyin;
          tüketim profiliniz çıkarılsın, gündüz oranınız ve tepe gücünüz ölçülsün. Farklı GES
          boyutları saatlik verinizle simüle edilir: öz tüketim, yıllık fayda ve geri ödeme
          süresi karşılaştırmalı tabloda görünür. Ortalamayla değil, gerçek profilinizle hesap.
        </p>
      </div>

      <div className="calc-grid">
        <section className="tool genis" aria-label="Saatlik tüketim analizi">
          <SaatlikAnaliz />
        </section>
      </div>

      </main>
      <SiteFoot yol="/saatlik-analiz" notu="Sonuçlar ön fizibilite niteliğindedir; bağlayıcı görüş değildir." />
    </div>
  );
}
