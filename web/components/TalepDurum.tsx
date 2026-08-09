"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SECENEKLER: Array<[string, string]> = [
  ["aranmadi", "Aranmadı"],
  ["arandi", "Arandı"],
  ["kapandi", "Kapandı"],
];

export default function TalepDurum({ id, durum }: { id: string; durum: string }) {
  const [secili, setSecili] = useState(durum);
  const [bekliyor, setBekliyor] = useState(false);
  const yonlendir = useRouter();

  async function degistir(yeni: string) {
    if (yeni === secili || bekliyor) return;
    setBekliyor(true);
    const res = await fetch("/api/yonetim/talep-durum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, durum: yeni }),
    });
    if (res.ok) {
      setSecili(yeni);
      yonlendir.refresh();
    }
    setBekliyor(false);
  }

  return (
    <div className="yp-durum-secim" role="group" aria-label="Talep durumu">
      {SECENEKLER.map(([deger, ad]) => (
        <button
          key={deger}
          type="button"
          className={secili === deger ? `on ${deger}` : ""}
          disabled={bekliyor}
          onClick={() => degistir(deger)}
        >
          {ad}
        </button>
      ))}
    </div>
  );
}
