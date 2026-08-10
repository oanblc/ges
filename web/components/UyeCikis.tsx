"use client";

import { Cikis } from "./Icons";

export default function UyeCikis({ ikonlu = false }: { ikonlu?: boolean }) {
  async function cikis() {
    await fetch("/api/uye", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ islem: "cikis" }),
    });
    window.location.href = "/";
  }
  return (
    <button type="button" className="uye-cikis" onClick={cikis}>
      {ikonlu && <Cikis className="i" />}
      Çıkış yap
    </button>
  );
}
