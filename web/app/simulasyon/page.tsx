import type { Metadata } from "next";
import Simulasyon from "@/components/Simulasyon";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import UyeKilit from "@/components/UyeKilit";
import { uyeOku } from "@/lib/uye";
import { SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Güneş Sahası Simülasyonu — Kur, Oynat, Karneni Gör",
  description:
    "Kendi güneş santralini kur: çatı ya da arazi, il, güç ve tüketim profilini seç; gerçek PVGIS güneşlenme verisiyle günü oynat, saatlik mahsuplaşmayı ve cebinde kalanı canlı izle.",
  alternates: { canonical: "/simulasyon" },
};

export default async function SimulasyonSayfa() {
  const uye = await uyeOku();
  return (
    <div className="wrap">
      <SiteHead aktif="simulasyon" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Simülasyon
        </span>
        <h1>
          Kendi santralini kur, <span className="hl-g">gününü oynat</span>
        </h1>
        <p>
          Çatı mı arazi mi, konut mu sanayi mi? Seçimlerini yap, günü başlat: güneş doğsun,
          paneller üretsin, sayaç dönsün. Üretim eğrileri 81 il için gerçek PVGIS güneşlenme
          verisinden, fiyatlar güncel EPDK tarifelerinden gelir. Gün sonunda karneni gör.
        </p>
      </div>

      <div className="calc-grid">
        <section className="tool genis" aria-label="Güneş sahası simülasyonu">
          {uye ? <Simulasyon /> : <UyeKilit donus="/simulasyon" />}
        </section>
      </div>

      </main>
      <SiteFoot notu="Simülasyon eğitim amaçlıdır; kişisel hesap için hesaplama araçlarını kullanın." />
    </div>
  );
}
