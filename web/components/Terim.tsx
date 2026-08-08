"use client";

import { Fragment, useId, useLayoutEffect, useRef, useState } from "react";
import { SOZLUK, TERIM_DUZENI } from "./sozluk";

/**
 * Terim kutucuğu: noktalı alt çizgili kelimenin üstüne gelince (dokununca/
 * klavyeyle odaklanınca) kısa açıklama açılır. Kutu açılırken ölçülür:
 * ekran kenarından taşarsa içeri kaydırılır, üstte yer yoksa alta açılır.
 */

export function Terim({ ad, children }: { ad?: string; children: React.ReactNode }) {
  const kimlik = useId();
  const [acik, setAcik] = useState(false);
  const [altta, setAltta] = useState(false);
  const [kaydir, setKaydir] = useState(0);
  const kutuRef = useRef<HTMLSpanElement>(null);

  const anahtar = ad ?? (typeof children === "string" ? children : "");
  const tanim = SOZLUK[anahtar];

  useLayoutEffect(() => {
    if (!acik) return;
    const kutu = kutuRef.current;
    if (!kutu) return;
    setKaydir(0);
    setAltta(false);
    requestAnimationFrame(() => {
      const r = kutu.getBoundingClientRect();
      let fark = 0;
      if (r.left < 8) fark = 8 - r.left;
      else if (r.right > window.innerWidth - 8) fark = window.innerWidth - 8 - r.right;
      if (fark !== 0) setKaydir(fark);
      if (r.top < 8) setAltta(true);
    });
  }, [acik]);

  if (!tanim) return <>{children}</>;

  return (
    <span
      className="terim"
      tabIndex={0}
      aria-describedby={acik ? kimlik : undefined}
      onMouseEnter={() => setAcik(true)}
      onMouseLeave={() => setAcik(false)}
      onFocus={() => setAcik(true)}
      onBlur={() => setAcik(false)}
    >
      {children}
      {acik && (
        <span
          role="tooltip"
          id={kimlik}
          ref={kutuRef}
          className={`terim-kutu ${altta ? "altta" : ""}`}
          style={{ "--kaydir": `${kaydir}px` } as React.CSSProperties}
        >
          {tanim}
        </span>
      )}
    </span>
  );
}

/** Statik sayfalarda metin sarmalayıcı: içindeki sözlük terimlerini işaretler. */
export function Aciklamali({ children }: { children: React.ReactNode }) {
  return <>{cocuklariIsaretle(children)}</>;
}

/** Düz metindeki sözlük terimlerini Terim kutucuklarıyla işaretler. */
export function metniIsaretle(metin: string): React.ReactNode {
  const parcalar = metin.split(TERIM_DUZENI);
  if (parcalar.length === 1) return metin;
  return parcalar.map((parca, i) =>
    i % 2 === 1 ? (
      <Terim key={i} ad={parca}>
        {parca}
      </Terim>
    ) : (
      <Fragment key={i}>{parca}</Fragment>
    ),
  );
}

/** React çocuklarındaki string düğümleri işaretler (markdown render'ı için). */
export function cocuklariIsaretle(cocuklar: React.ReactNode): React.ReactNode {
  if (typeof cocuklar === "string") return metniIsaretle(cocuklar);
  if (Array.isArray(cocuklar))
    return cocuklar.map((c, i) =>
      typeof c === "string" ? <Fragment key={i}>{metniIsaretle(c)}</Fragment> : c,
    );
  return cocuklar;
}
