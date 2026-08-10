"use client";

import { useState } from "react";
import Link from "next/link";
import Marka from "./Marka";
import { Ok } from "./Icons";

export type AktifSayfa =
  | "anasayfa" | "asistan" | "surec" | "hesaplama" | "fatura"
  | "destekler" | "mevzuat" | "rehber" | "kurulum" | "sss" | "teklif" | "simulasyon" | "police" | "blog" | "diger";

type Oge = [AktifSayfa, string, string];
type Girdi = { ad: string; oge?: Oge; grup?: Oge[] };

const MENU: Girdi[] = [
  {
    ad: "Araçlar",
    grup: [
      ["hesaplama", "/hesaplama", "Hesaplama"],
      ["fatura", "/fatura-analizi", "Fatura Analizi"],
      ["teklif", "/teklif-analizi", "Teklif Değerlendirme"],
      ["simulasyon", "/simulasyon", "Simülasyon"],
      ["police", "/police-analizi", "Poliçe Analizi"],
    ],
  },
  {
    ad: "Rehberler",
    grup: [
      ["surec", "/surec", "Kurulum Süreci"],
      ["rehber", "/rehber", "Bilgi Kütüphanesi"],
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
        <Marka />
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
      <Link className="ara-dugme" href="/hesap" aria-label="Hesabım" title="Hesabım">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
        </svg>
      </Link>
      <Link className="ara-dugme" href="/arama" aria-label="Sitede ara" title="Sitede ara">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.8-3.8" />
        </svg>
      </Link>
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
          <Link className="mobil-ara" href="/hesap" onClick={() => setAcik(false)}>
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
            </svg>
            Hesabım
          </Link>
          <Link className="mobil-ara" href="/arama" onClick={() => setAcik(false)}>
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.8-3.8" />
            </svg>
            Sitede Ara
          </Link>
          <Link className="gt-btn small" href="/asistan" onClick={() => setAcik(false)}>
            Asistana Sorun <Ok className="i" />
          </Link>
        </nav>
      )}
    </header>
  );
}
