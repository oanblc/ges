import type { Metadata } from "next";
import MevzuatArama from "@/components/MevzuatArama";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import UyeKilit from "@/components/UyeKilit";
import { uyeOku } from "@/lib/uye";
import mevzuat from "@/data/mevzuat.json";
import { SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Mevzuat — GES'i Etkileyen Kanun, Yönetmelik ve Kararlar",
  description:
    "Çatı GES'i etkileyen güncel mevzuat tek sayfada: saatlik mahsuplaşma, tarifeler, YEKDEM, depolama ve teşvik düzenlemeleri. Aramalı ve yapay zekâ destekli.",
  alternates: { canonical: "/mevzuat" },
};

const tarihTr = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function Mevzuat() {
  const uye = await uyeOku();
  return (
    <div className="wrap">
      <SiteHead aktif="mevzuat" />
      <main id="icerik">
        <div className="calc-ust">
          <span className="sub-title">
            <SunDolu />
            Mevzuat
          </span>
          <h1>
            GES'i etkileyen <span className="hl-g">güncel düzenlemeler</span>
          </h1>
          <p>
            Kanunlar, yönetmelikler, EPDK kararları ve tebliğler tek sayfada — her kayıtta
            "sizi nasıl etkiler" özeti var. Kütüphane bilgi tabanımızdan beslenir ve yeni
            mevzuat çıktığında güncellenir (son güncelleme: {tarihTr(mevzuat.guncelleme)}).
          </p>
        </div>

        <section className="dk-bolum" style={{ paddingBottom: 48 }} aria-label="Mevzuat kütüphanesi">
          {uye ? <MevzuatArama /> : <UyeKilit donus="/mevzuat" />}
        </section>
      </main>
      <SiteFoot notu="Özetler bilgilendirme amaçlıdır; resmî metin Resmî Gazete'dir." />
    </div>
  );
}
