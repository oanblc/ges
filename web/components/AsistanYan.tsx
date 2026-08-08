"use client";

import { Ok } from "./Icons";
import { ORNEK_SORULAR } from "./sorular";

/**
 * Asistan yan paneli köprüleri: örnek sorular sayfayı yenilemeden mevcut
 * sohbete eklenir; danışmanlık kartı sohbetteki lead formunu açar.
 */

export function YanSorular() {
  return (
    <>
      {ORNEK_SORULAR.map((s) => (
        <button
          key={s}
          className="q q-dugme"
          onClick={() => window.dispatchEvent(new CustomEvent("gd-soru", { detail: s }))}
        >
          <Ok className="i" />
          {s}
        </button>
      ))}
    </>
  );
}

export function DanismanlikDugmesi() {
  return (
    <button
      className="gt-btn small"
      style={{ marginTop: 12 }}
      onClick={() => window.dispatchEvent(new Event("gd-lead-ac"))}
    >
      Danışmanlık Talebi Bırak <Ok className="i" />
    </button>
  );
}
