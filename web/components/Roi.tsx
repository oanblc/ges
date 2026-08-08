"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ILLER, META } from "@/data/kb";
import { konutHesap, isletmeHesap } from "@/lib/hesap";
import { Aciklamali } from "./Terim";

const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");
const sayi = (s: string) => Number(String(s).replace(/[^\d]/g, "")) || 0;

const TIP = {
  konut: { min: 500, max: 20000, adim: 100, varsayilan: 2400 },
  isletme: { min: 10000, max: 3000000, adim: 5000, varsayilan: 150000 },
} as const;

export default function Roi() {
  const [tip, setTip] = useState<"konut" | "isletme">("konut");
  const [fatura, setFatura] = useState<number>(TIP.konut.varsayilan);
  const [faturaMetni, setFaturaMetni] = useState(TIP.konut.varsayilan.toLocaleString("tr-TR"));
  const [verim, setVerim] = useState(1300); // İstanbul
  const [ozTuketim, setOzTuketim] = useState(0.8);

  const t = TIP[tip];

  const sonuc = useMemo(() => {
    const f = Math.min(t.max, Math.max(t.min, fatura));
    return tip === "konut" ? konutHesap(f, verim) : isletmeHesap(f, verim, ozTuketim);
  }, [tip, fatura, verim, ozTuketim, t]);

  const tipDegistir = (yeni: "konut" | "isletme") => {
    setTip(yeni);
    const v = TIP[yeni].varsayilan;
    setFatura(v);
    setFaturaMetni(v.toLocaleString("tr-TR"));
  };

  const kwMetni =
    sonuc.kw >= 1000
      ? (sonuc.kw / 1000).toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " MW"
      : sonuc.kw.toLocaleString("tr-TR") + " kW";

  return (
    <div className="roi-card">
      <div className="photo-card">
        <Image src="/roof-solar.jpg" alt="Çatı üzerinde güneş paneli kurulumu" width={700} height={190} priority />
        <div className="float-badge">
          <div className="fv">
            ≈ {sonuc.geriOdemeYil.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl
          </div>
          <div className="fk">Projenize özel geri ödeme süresi</div>
        </div>
      </div>

      <div className="roi-form">
        <div className="rtoggle" aria-label="Abone tipi">
          <button className={tip === "konut" ? "on" : ""} aria-pressed={tip === "konut"} onClick={() => tipDegistir("konut")}>
            Konut
          </button>
          <button className={tip === "isletme" ? "on" : ""} aria-pressed={tip === "isletme"} onClick={() => tipDegistir("isletme")}>
            İşletme
          </button>
        </div>

        <div className="rf">
          <label htmlFor="roiBillNum">Aylık elektrik faturanız</label>
          <div className="numwrap">
            <span className="cur">₺</span>
            <input
              id="roiBillNum"
              inputMode="numeric"
              value={faturaMetni}
              aria-label="Aylık fatura tutarı, TL"
              onChange={(e) => {
                setFaturaMetni(e.target.value);
                const v = sayi(e.target.value);
                if (v) setFatura(v);
              }}
              onBlur={() => {
                const v = Math.min(t.max, Math.max(t.min, sayi(faturaMetni)));
                setFatura(v);
                setFaturaMetni(v.toLocaleString("tr-TR"));
              }}
            />
          </div>
          <input
            type="range"
            min={t.min}
            max={t.max}
            step={t.adim}
            value={Math.min(t.max, Math.max(t.min, fatura))}
            aria-label="Fatura tutarı kaydırıcısı"
            onChange={(e) => {
              const v = +e.target.value;
              setFatura(v);
              setFaturaMetni(v.toLocaleString("tr-TR"));
            }}
          />
        </div>

        <div className="rf">
          <label htmlFor="roiCity">İl</label>
          <select id="roiCity" value={verim} onChange={(e) => setVerim(+e.target.value)}>
            {ILLER.map(([ad, v]) => (
              <option key={ad} value={v}>
                {ad}
              </option>
            ))}
          </select>
        </div>

        {tip === "isletme" && (
          <div className="rf">
            <label htmlFor="roiOz">
              Öz tüketim oranı — %{Math.round(ozTuketim * 100)}
            </label>
            <input
              id="roiOz"
              type="range"
              min={0.4}
              max={0.95}
              step={0.05}
              value={ozTuketim}
              onChange={(e) => setOzTuketim(+e.target.value)}
            />
          </div>
        )}

<div className="roi-out">
          <div className="ro">
            <div className="rv">{kwMetni}</div>
            <div className="rk">Önerilen kapasite</div>
          </div>
          <div className="ro">
            <div className="rv">{tl(sonuc.maliyet)}</div>
            <div className="rk">Tahmini yatırım</div>
          </div>
          <div className="ro">
            <div className="rv">{tl(sonuc.yillikDeger)}</div>
            <div className="rk">Yıllık kazanç</div>
          </div>
        </div>

        <p className="roi-note">
          <Aciklamali>
          {tip === "konut"
            ? `Aylık mahsuplaşma ve kademeli konut tarifesiyle (EPDK, ${META.tarifeGecerlilik}) hesaplanır. Kesin analiz için asistana çatı bilgilerinizi iletin.`
            : `Saatlik mahsuplaşma esasıyla hesaplanır: öz tüketim tam perakende fiyattan, satış çıplak enerji bedelinden değerlenir (EPDK, ${META.tarifeGecerlilik}). İkili anlaşmanız varsa asistana sözleşme fiyatınızı iletin.`}
          </Aciklamali>
        </p>
      </div>
    </div>
  );
}
