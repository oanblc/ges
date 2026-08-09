"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Ok } from "./Icons";

export type AktifSayfa =
  | "anasayfa" | "asistan" | "surec" | "hesaplama" | "fatura"
  | "destekler" | "mevzuat" | "rehber" | "kurulum" | "sss" | "teklif" | "blog" | "diger";

type Oge = [AktifSayfa, string, string];
type Girdi = { ad: string; oge?: Oge; grup?: Oge[] };

const MENU: Girdi[] = [
  { ad: "Asistan", oge: ["asistan", "/asistan", "Asistan"] },
  {
    ad: "Araçlar",
    grup: [
      ["hesaplama", "/hesaplama", "Hesaplama"],
      ["fatura", "/fatura-analizi", "Fatura Analizi"],
      ["teklif", "/teklif-analizi", "Teklif Değerlendirme"],
    ],
  },
  {
    ad: "Rehberler",
    grup: [
      ["surec", "/surec", "Süreç Rehberi"],
      ["rehber", "/rehber", "Rehber"],
      ["kurulum", "/kurulum-sonrasi", "Kurulum Sonrası"],
      ["sss", "/sss", "Sık Sorulan Sorular"],
    ],
  },
  { ad: "Destekler", oge: ["destekler", "/destekler", "Destekler"] },
  { ad: "Mevzuat", oge: ["mevzuat", "/mevzuat", "Mevzuat"] },
  { ad: "Blog", oge: ["blog", "/blog", "Blog"] },
];

function TekLink({ oge, aktif, tikla }: { oge: Oge; aktif: AktifSayfa; tikla?: () => void }) {
  const [anahtar, yol, ad] = oge;
  return (
    <Link
      className={aktif === anahtar ? "on" : ""}
      aria-current={aktif === anahtar ? "page" : undefined}
      href={yol}
      onClick={tikla}
    >
      {ad}
    </Link>
  );
}

export default function SiteHead({ aktif }: { aktif: AktifSayfa }) {
  const [acik, setAcik] = useState(false);

  return (
    <header className="site-head">
      <a className="skip" href="#icerik">
        İçeriğe atla
      </a>
      <Link href="/" className="brand">
        <span className="sun">
          <Sun />
        </span>
        <span className="brand-yazi">
          gesdanismani
          <i>.com</i>
        </span>
      </Link>
      <nav className="nav" aria-label="Ana menü">
        {MENU.map((g) =>
          g.oge ? (
            <TekLink key={g.ad} oge={g.oge} aktif={aktif} />
          ) : (
            <div key={g.ad} className="nav-grup">
              <button
                type="button"
                className={g.grup!.some(([a]) => a === aktif) ? "on" : ""}
                aria-haspopup="true"
              >
                {g.ad}
                <svg className="i ok-asagi" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="nav-acilir">
                {g.grup!.map((o) => (
                  <TekLink key={o[1]} oge={o} aktif={aktif} />
                ))}
              </div>
            </div>
          )
        )}
      </nav>
      <Link className="gt-btn small baslik-cta" href="/asistan">
        Asistana Sorun <Ok className="i" />
      </Link>
      <button
        className="menu-dugme"
        aria-expanded={acik}
        aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setAcik(!acik)}
      >
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          {acik ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      {acik && (
        <nav className="mobil-menu" aria-label="Mobil menü">
          {MENU.map((g) =>
            g.oge ? (
              <TekLink key={g.ad} oge={g.oge} aktif={aktif} tikla={() => setAcik(false)} />
            ) : (
              <div key={g.ad} className="mobil-grup">
                <span className="grup-baslik">{g.ad}</span>
                {g.grup!.map((o) => (
                  <TekLink key={o[1]} oge={o} aktif={aktif} tikla={() => setAcik(false)} />
                ))}
              </div>
            )
          )}
          <Link className="gt-btn small" href="/asistan" onClick={() => setAcik(false)}>
            Asistana Sorun <Ok className="i" />
          </Link>
        </nav>
      )}
    </header>
  );
}
