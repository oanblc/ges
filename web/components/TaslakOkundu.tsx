"use client";

import { useState } from "react";

export default function TaslakOkundu({ ad, okundu }: { ad: string; okundu: boolean }) {
  const [isaretli, setIsaretli] = useState(okundu);
  const [bekliyor, setBekliyor] = useState(false);

  async function degistir() {
    if (bekliyor) return;
    setBekliyor(true);
    const res = await fetch("/api/yonetim/taslak-okundu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ad, okundu: !isaretli }),
    });
    if (res.ok) setIsaretli(!isaretli);
    setBekliyor(false);
  }

  return (
    <button
      type="button"
      className={`yp-okundu ${isaretli ? "on" : ""}`}
      disabled={bekliyor}
      onClick={degistir}
    >
      {isaretli ? "✓ Okundu" : "Okundu işaretle"}
    </button>
  );
}
