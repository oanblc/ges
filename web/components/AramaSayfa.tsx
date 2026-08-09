"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { AramaKaydi } from "@/data/arama";

/** Türkçe karakterleri sadeleştirip küçük harfe indirir: "Mahsuplaşma" → "mahsuplasma". */
function duzle(m: string) {
  return m
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
}

const ORNEKLER = ["mahsuplaşma", "batarya", "kosgeb", "geri ödeme", "çağrı mektubu", "apartman"];

export default function AramaSayfa({ dizin }: { dizin: AramaKaydi[] }) {
  const [sorgu, setSorgu] = useState("");
  const kutuRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setSorgu(q);
    kutuRef.current?.focus();
  }, []);

  useEffect(() => {
    const url = sorgu.trim()
      ? `/arama?q=${encodeURIComponent(sorgu.trim())}`
      : "/arama";
    window.history.replaceState(null, "", url);
  }, [sorgu]);

  const sonuclar = useMemo(() => {
    const kelimeler = duzle(sorgu.trim()).split(/\s+/).filter((k) => k.length > 1);
    if (!kelimeler.length) return null;
    return dizin
      .map((k) => {
        const baslik = duzle(k.baslik);
        const ozet = duzle(k.ozet);
        let puan = 0;
        for (const kelime of kelimeler) {
          if (baslik.includes(kelime)) puan += 3;
          else if (ozet.includes(kelime)) puan += 1;
          else return null; // her kelime bir yerde geçmeli
        }
        if (k.tur === "sayfa") puan += 2; // ana sayfalar üstte
        return { kayit: k, puan };
      })
      .filter((x): x is { kayit: AramaKaydi; puan: number } => x !== null)
      .sort((a, b) => b.puan - a.puan)
      .slice(0, 30)
      .map((x) => x.kayit);
  }, [sorgu, dizin]);

  return (
    <div className="arama-govde">
      <div className="arama-kutu">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.8-3.8" />
        </svg>
        <input
          ref={kutuRef}
          value={sorgu}
          onChange={(e) => setSorgu(e.target.value)}
          placeholder="Ne aramıştınız? (ör. mahsuplaşma, batarya, KOSGEB…)"
          aria-label="Site içi arama"
          enterKeyHint="search"
        />
        {sorgu && (
          <button type="button" aria-label="Temizle" onClick={() => setSorgu("")}>
            ×
          </button>
        )}
      </div>

      {sonuclar === null ? (
        <div className="arama-bos">
          <p>Sayfalar, sık sorulan sorular, destekler ve blog yazıları içinde arar.</p>
          <div className="arama-ornekler">
            {ORNEKLER.map((o) => (
              <button key={o} type="button" className="as-chip" onClick={() => setSorgu(o)}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : sonuclar.length === 0 ? (
        <div className="arama-bos">
          <p>
            &ldquo;{sorgu}&rdquo; için sonuç bulunamadı. Farklı bir kelime deneyin ya da{" "}
            <Link href={`/asistan`}>asistana sorun</Link> — güncel mevzuatla cevaplar.
          </p>
        </div>
      ) : (
        <>
          <p className="arama-sayac">{sonuclar.length} sonuç</p>
          <div className="arama-liste">
            {sonuclar.map((s, i) => (
              <Link key={`${s.yol}-${i}`} href={s.yol} className={`arama-sonuc tur-${s.tur}`}>
                <span className="arama-tur">{s.etiket}</span>
                <b>{s.baslik}</b>
                <p>{s.ozet}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
