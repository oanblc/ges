"use client";

import { useState } from "react";

type Ayarlar = {
  saat_limit: number;
  gunluk_sohbet: number;
  gunluk_lead: number;
  bakim: boolean;
};

const ALANLAR: Array<[keyof Ayarlar, string, string]> = [
  ["saat_limit", "Saatlik soru sınırı (IP başına)", "Aynı ziyaretçinin bir saatte sorabileceği soru"],
  ["gunluk_sohbet", "Günlük sohbet tavanı (site geneli)", "Aşılınca gün sonuna kadar 'kapasite doldu' verilir"],
  ["gunluk_lead", "Günlük talep tavanı", "Günde kabul edilen danışmanlık talebi"],
];

export default function AyarlarForm({ ilk }: { ilk: Ayarlar }) {
  const [ayarlar, setAyarlar] = useState<Ayarlar>(ilk);
  const [bekliyor, setBekliyor] = useState(false);
  const [mesaj, setMesaj] = useState("");

  async function kaydet(e: React.FormEvent) {
    e.preventDefault();
    setBekliyor(true);
    setMesaj("");
    const res = await fetch("/api/yonetim/kopru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uc: "/yonetim/ayarlar", veri: ayarlar }),
    });
    const d = await res.json().catch(() => ({}));
    setMesaj(res.ok ? "✓ Kaydedildi — anında geçerli." : d.hata || "Kaydedilemedi.");
    setBekliyor(false);
  }

  return (
    <form className="yp-ayarlar" onSubmit={kaydet}>
      {ALANLAR.map(([anahtar, etiket, aciklama]) => (
        <label key={anahtar} className="yp-alan">
          <span>
            <b>{etiket}</b>
            <small>{aciklama}</small>
          </span>
          <input
            type="number"
            min={1}
            value={ayarlar[anahtar] as number}
            onChange={(e) => setAyarlar({ ...ayarlar, [anahtar]: Number(e.target.value) })}
          />
        </label>
      ))}
      <label className="yp-alan bakim">
        <span>
          <b>Bakım modu</b>
          <small>Açıkken asistan, mevzuat araması ve fatura okuma ziyaretçilere kapatılır</small>
        </span>
        <input
          type="checkbox"
          checked={ayarlar.bakim}
          onChange={(e) => setAyarlar({ ...ayarlar, bakim: e.target.checked })}
        />
      </label>
      <div className="yp-sss-arac">
        <button className="gt-btn small" type="submit" disabled={bekliyor}>
          {bekliyor ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {mesaj && <span className="yp-sss-mesaj">{mesaj}</span>}
      </div>
    </form>
  );
}
