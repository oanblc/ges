import type { Metadata } from "next";
import TeklifSihirbazi from "@/components/TeklifSihirbazi";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import UyeKilit from "@/components/UyeKilit";
import { uyeOku } from "@/lib/uye";
import { SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Teklif Değerlendirme — GES Teklifiniz Piyasaya Uygun mu?",
  description:
    "Firmalardan aldığınız çatı GES teklifini yükleyin: kalemler okunur, güncel piyasa bantları ve ekipman fiyatlarıyla tarafsız biçimde karşılaştırılır, firmaya soracağınız sorular çıkarılır.",
  alternates: { canonical: "/teklif-analizi" },
};

export default async function TeklifAnalizi() {
  const uye = await uyeOku();
  return (
    <div className="wrap">
      <SiteHead aktif="teklif" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Teklif Değerlendirme
        </span>
        <h1>
          Aldığınız teklif <span className="hl-g">piyasaya uygun mu?</span>
        </h1>
        <p>
          Firmalardan aldığınız GES teklifinin PDF&apos;ini ya da fotoğrafını yükleyin. Kalemleri
          okuyup güncel piyasa bantları ve ekipman fiyatlarıyla karşılaştırıyor, eksik
          kalemleri ve firmaya sormanız gereken soruları çıkarıyoruz. Biz kurulum satmıyoruz;
          değerlendirme tarafsızdır ve firma adı raporda kullanılmaz.
        </p>
      </div>

      <div className="calc-grid">
        <section className="tool genis" aria-label="Teklif sihirbazı">
          {uye ? <TeklifSihirbazi /> : <UyeKilit donus="/teklif-analizi" />}
        </section>
      </div>

      </main>
      <SiteFoot notu="Değerlendirmeler bilgilendirme amaçlıdır; bağlayıcı görüş niteliği taşımaz." />
    </div>
  );
}
