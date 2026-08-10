import type { Metadata } from "next";
import DesteklerListe from "@/components/DesteklerListe";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import destekVeri from "@/data/destekler.json";
import { Kalkan, Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Destekler — Devlet ve Banka GES Destekleri",
  description:
    "KOSGEB, IPARD/TKDK, YTB ve banka GES kredileri bir arada. Programların yürürlük durumu her gün kontrol edilir ve güncellenir.",
  alternates: { canonical: "/destekler" },
};

const tarihTr = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Destekler() {
  return (
    <div className="wrap">
      <SiteHead aktif="destekler" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Destekler
        </span>
        <h1>
          Devletten ve bankalardan <span className="hl-g">güncel</span> GES destekleri
        </h1>
        <p>
          Hibe programları, faizsiz krediler, vergi avantajları ve banka finansmanı bir
          arada. Liste her gün taranır: koşullar değiştiğinde durum bilgileri güncellenir,
          yeni programlar doğrulandıktan sonra eklenir.
        </p>
        <span className="pulse">Son kontrol: {tarihTr(destekVeri.guncelleme)}</span>
      </div>

      <DesteklerListe />

      <section className="dk-cta">
        <Kalkan className="i" />
        <div>
          <b>Hangileri size uygun?</b>
          <p>
            Profilinize göre uygunluk kontrolü için yukarıdaki aracı kullanın ya da durumunuzu
            asistana anlatın.
          </p>
        </div>
        <div className="dk-cta-btn">
          <a className="gt-btn small line" href="#uygunluk">
            Uygunluk Aracı
          </a>
          <a
            className="gt-btn small"
            href={`/asistan?soru=${encodeURIComponent("Hangi GES desteklerinden yararlanabilirim?")}`}
          >
            Asistana Sorun <Ok className="i" />
          </a>
        </div>
      </section>

      </main>
      <SiteFoot yol="/destekler" notu="Faiz oranları ilan edilmez; koşullar şube/proje bazlıdır. Liste bilgilendirme amaçlıdır." />
    </div>
  );
}
