"use client";

import { useState } from "react";

const DURUMLAR: Array<[string, string]> = [
  ["aktif", "Aktif"],
  ["donemsel", "Dönemsel"],
  ["teyit-bekliyor", "Teyit bekliyor"],
  ["pasif", "Pasif"],
];

export default function DestekDurum({
  id,
  durum,
  yazilabilir,
}: {
  id: string;
  durum: string;
  yazilabilir: boolean;
}) {
  const [secili, setSecili] = useState(durum);
  const [bekliyor, setBekliyor] = useState(false);
  const [mesaj, setMesaj] = useState("");

  async function degistir(yeni: string) {
    setSecili(yeni);
    setBekliyor(true);
    setMesaj("");
    const res = await fetch("/api/yonetim/kopru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uc: "/yonetim/destek-durum", veri: { id, durum: yeni } }),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      setSecili(durum);
      setMesaj(d.hata || "Kaydedilemedi.");
    } else {
      setMesaj("✓ Kaydedildi");
    }
    setBekliyor(false);
  }

  return (
    <span className="yp-destek-durum">
      <select
        value={secili}
        disabled={!yazilabilir || bekliyor}
        onChange={(e) => degistir(e.target.value)}
        aria-label="Destek durumu"
      >
        {DURUMLAR.map(([deger, ad]) => (
          <option key={deger} value={deger}>
            {ad}
          </option>
        ))}
      </select>
      {mesaj && <small>{mesaj}</small>}
    </span>
  );
}
