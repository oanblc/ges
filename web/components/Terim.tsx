"use client";

import { Fragment, useId } from "react";
import { SOZLUK, TERIM_DUZENI } from "./sozluk";

/**
 * Terim kutucuğu: noktalı alt çizgili kelimenin üstüne gelince (dokununca/
 * klavyeyle odaklanınca) kısa açıklama açılır.
 */

export function Terim({ ad, children }: { ad?: string; children: React.ReactNode }) {
  const kimlik = useId();
  const anahtar = ad ?? (typeof children === "string" ? children : "");
  const tanim = SOZLUK[anahtar];
  if (!tanim) return <>{children}</>;
  return (
    <span className="terim" tabIndex={0} aria-describedby={kimlik}>
      {children}
      <span role="tooltip" id={kimlik} className="terim-kutu">
        {tanim}
      </span>
    </span>
  );
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

/** Statik sayfalarda metin sarmalayıcı: içindeki sözlük terimlerini işaretler. */
export function Aciklamali({ children }: { children: React.ReactNode }) {
  return <>{cocuklariIsaretle(children)}</>;
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
