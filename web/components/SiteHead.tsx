"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Ok } from "./Icons";

export type AktifSayfa =
  | "anasayfa" | "asistan" | "surec" | "hesaplama" | "fatura"
  | "destekler" | "rehber" | "kurulum" | "blog" | "diger";

const BAGLANTILAR: Array<[AktifSayfa, string, string]> = [
  ["asistan", "/asistan", "Asistan"],
  ["surec", "/surec", "Süreç Rehberi"],
  ["hesaplama", "/hesaplama", "Hesaplama"],
  ["fatura", "/fatura-analizi", "Fatura Analizi"],
  ["destekler", "/destekler", "Destekler"],
  ["rehber", "/rehber", "Rehber"],
  ["kurulum", "/kurulum-sonrasi", "Kurulum Sonrası"],
  ["blog", "/blog", "Blog"],
];

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
        gesdanışmanı
      </Link>
      <nav className="nav" aria-label="Ana menü">
        {BAGLANTILAR.map(([anahtar, yol, ad]) => (
          <Link
            key={yol}
            className={aktif === anahtar ? "on" : ""}
            aria-current={aktif === anahtar ? "page" : undefined}
            href={yol}
          >
            {ad}
          </Link>
        ))}
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
          {BAGLANTILAR.map(([anahtar, yol, ad]) => (
            <Link
              key={yol}
              className={aktif === anahtar ? "on" : ""}
              aria-current={aktif === anahtar ? "page" : undefined}
              href={yol}
              onClick={() => setAcik(false)}
            >
              {ad}
            </Link>
          ))}
          <Link className="gt-btn small" href="/asistan" onClick={() => setAcik(false)}>
            Asistana Sorun <Ok className="i" />
          </Link>
        </nav>
      )}
    </header>
  );
}
