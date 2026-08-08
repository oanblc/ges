import type { Metadata } from "next";
import Destek from "@/components/Destek";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import destekVeri from "@/data/destekler.json";
import { Ev, Fabrika, Filiz, Kalkan, Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Destekler — Devlet ve Banka GES Destekleri",
  description:
    "KOSGEB, IPARD/TKDK, YTB ve banka GES kredileri bir arada. Programların yürürlük durumu her gün kontrol edilir ve güncellenir.",
  alternates: { canonical: "/destekler" },
};

const TUR_BASLIK: Record<string, string> = {
  devlet: "Devlet Destekleri",
  banka: "Banka Kredileri",
  leasing: "Leasing",
  esco: "ESCO / Yatırımsız Modeller",
};

const DURUM: Record<string, { etiket: string; sinif: string }> = {
  aktif: { etiket: "Aktif", sinif: "aktif" },
  donemsel: { etiket: "Çağrı dönemine bağlı", sinif: "donemsel" },
  "teyit-bekliyor": { etiket: "Teyit bekliyor", sinif: "teyit" },
  pasif: { etiket: "Yürürlükte değil", sinif: "pasif" },
};

const KITLE: Record<string, { etiket: string; Ikon: typeof Ev }> = {
  konut: { etiket: "Konut", Ikon: Ev },
  isletme: { etiket: "İşletme", Ikon: Fabrika },
  tarimsal: { etiket: "Tarımsal", Ikon: Filiz },
};

const tarihTr = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Destekler() {
  const gruplar = Object.keys(TUR_BASLIK)
    .map((tur) => ({
      tur,
      baslik: TUR_BASLIK[tur],
      kayitlar: destekVeri.destekler.filter((d) => d.tur === tur),
    }))
    .filter((g) => g.kayitlar.length > 0);

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

      <section className="dk-bolum" id="uygunluk" aria-labelledby="uygunlukBaslik">
        <div className="tool">
          <h2 id="uygunlukBaslik">
            <Kalkan className="i" /> Size Uygun Destekler
          </h2>
          <p className="tanim">
            Profilinizi seçin; yararlanabileceğiniz hibe, kredi ve vergi avantajlarını
            şartlarıyla görün. Programların tam listesi aşağıdadır.
          </p>
          <Destek />
        </div>
      </section>

      {gruplar.map((g) => (
        <section key={g.tur} className="dk-bolum" aria-label={g.baslik}>
          <h2>{g.baslik}</h2>
          <div className="dk-grid">
            {g.kayitlar.map((d) => {
              const durum = DURUM[d.durum] ?? DURUM["teyit-bekliyor"];
              return (
                <article key={d.id} className={`dk-kart ${d.durum === "pasif" ? "soluk" : ""}`}>
                  <div className="dk-ust">
                    <span className="dk-kurum">{d.kurum}</span>
                    <span className={`dk-durum ${durum.sinif}`}>{durum.etiket}</span>
                  </div>
                  <b>{d.ad}</b>
                  <p>{d.ozet}</p>
                  {"not" in d && d.not && <p className="dk-not">{d.not}</p>}
                  <div className="dk-alt">
                    <span className="dk-kitle">
                      {d.kitle.map((k) => {
                        const kit = KITLE[k];
                        return kit ? (
                          <span key={k}>
                            <kit.Ikon className="i" /> {kit.etiket}
                          </span>
                        ) : null;
                      })}
                    </span>
                    <a href={d.kaynakUrl} target="_blank" rel="noopener noreferrer">
                      Kaynak <Ok className="i" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

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
