"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sun } from "@/components/Icons";

export default function YonetimGiris() {
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [bekliyor, setBekliyor] = useState(false);
  const yonlendir = useRouter();

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setBekliyor(true);
    setHata("");
    const res = await fetch("/api/yonetim/giris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sifre }),
    });
    if (res.ok) {
      yonlendir.push("/yonetim");
      yonlendir.refresh();
      return;
    }
    const d = await res.json().catch(() => ({}));
    setHata(d.hata || "Giriş yapılamadı.");
    setBekliyor(false);
  }

  return (
    <div className="yp-giris">
      <form className="yp-giris-kart" onSubmit={gonder}>
        <span className="sun">
          <Sun />
        </span>
        <h1>Yönetim Paneli</h1>
        <p>Bu alan site yöneticisine özeldir.</p>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          placeholder="Yönetici şifresi"
          autoFocus
          required
        />
        {hata && <span className="yp-hata">{hata}</span>}
        <button className="gt-btn small" type="submit" disabled={bekliyor}>
          {bekliyor ? "Kontrol ediliyor…" : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
