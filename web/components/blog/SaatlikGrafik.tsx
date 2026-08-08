"use client";

import { useRef, useState } from "react";

/**
 * Saatlik mahsuplaşma gün profili — illüstratif 10 kW mesai-saatli işletme.
 * Renkler doğrulanmış çift: üretim #1F8A5D, tüketim #A5620D (CVD-güvenli).
 */

const URETIM = [0, 0, 0, 0, 0, 0.3, 1.2, 2.8, 4.6, 6.2, 7.5, 8.3, 8.6, 8.4, 7.7, 6.4, 4.8, 3.0, 1.4, 0.4, 0, 0, 0, 0];
const TUKETIM = [1.2, 1.1, 1.1, 1.1, 1.2, 1.5, 2.5, 4.0, 5.5, 6.0, 6.2, 6.3, 5.8, 6.1, 6.2, 6.0, 5.6, 4.5, 3.2, 2.4, 2.0, 1.8, 1.5, 1.3];

const W = 680;
const H = 300;
const PX = 46; // sol eksen payı
const PT = 18;
const PB = 34;
const MAKS = 10;

const x = (i: number) => PX + (i * (W - PX - 12)) / 23;
const y = (v: number) => H - PB - (v / MAKS) * (H - PT - PB);

const cizgi = (dizi: number[]) =>
  dizi.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

/** Üst ve alt seri arasında kalan bölgenin kapalı yolu */
const bant = (ust: number[], alt: number[]) =>
  ust.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ") +
  [...alt].reverse().map((v, i) => `L${x(23 - i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ") +
  "Z";

const kwTr = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 1 });

export default function SaatlikGrafik() {
  const kutu = useRef<HTMLDivElement>(null);
  const [saat, setSaat] = useState<number | null>(null);

  const ozT = URETIM.map((u, i) => Math.min(u, TUKETIM[i]));

  const gezin = (e: React.MouseEvent) => {
    const r = kutu.current?.getBoundingClientRect();
    if (!r) return;
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - PX) * 23) / (W - PX - 12));
    setSaat(i >= 0 && i <= 23 ? i : null);
  };

  const u = saat !== null ? URETIM[saat] : 0;
  const t = saat !== null ? TUKETIM[saat] : 0;
  const fark = u - t;

  return (
    <div>
      <div className="chart-legend" aria-hidden="true">
        <span><i style={{ background: "#1F8A5D" }} /> GES üretimi</span>
        <span><i style={{ background: "#A5620D" }} /> Tesis tüketimi</span>
        <span><i style={{ background: "#FFE175" }} /> Öz tüketim (aynı saatte örtüşen)</span>
      </div>
      <div className="chart-wrap" ref={kutu} onMouseMove={gezin} onMouseLeave={() => setSaat(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img"
          aria-label="Saatlik üretim ve tüketim profili: öğle saatlerinde üretim tüketimi aşar, akşam şebekeden çekilir">
          {[0, 5, 10].map((v) => (
            <g key={v}>
              <line x1={PX} x2={W - 12} y1={y(v)} y2={y(v)} stroke="#E2E5DE" strokeWidth="1" />
              <text x={PX - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#525252">{v} kW</text>
            </g>
          ))}
          {[0, 6, 12, 18, 23].map((h) => (
            <text key={h} x={x(h)} y={H - 12} textAnchor="middle" fontSize="11" fill="#525252">
              {String(h).padStart(2, "0")}:00
            </text>
          ))}

          {/* bölgeler: öz tüketim / fazla / çekiş */}
          <path d={bant(ozT, ozT.map(() => 0))} fill="#FFE175" opacity="0.5" />
          <path d={bant(URETIM, ozT)} fill="#1F8A5D" opacity="0.16" />
          <path d={bant(TUKETIM, ozT)} fill="#A5620D" opacity="0.13" />

          <path d={cizgi(URETIM)} fill="none" stroke="#1F8A5D" strokeWidth="2" strokeLinejoin="round" />
          <path d={cizgi(TUKETIM)} fill="none" stroke="#A5620D" strokeWidth="2" strokeLinejoin="round" />

          {/* seçici bölge etiketleri */}
          <text x={x(12)} y={y(3)} textAnchor="middle" fontSize="12" fontWeight="600" fill="#252525">Öz tüketim</text>
          <text x={x(12.4)} y={y(8.1)} textAnchor="middle" fontSize="12" fontWeight="600" fill="#252525">Fazla → satış</text>
          <text x={x(20.3)} y={y(2.6)} textAnchor="middle" fontSize="12" fontWeight="600" fill="#252525">Şebekeden çekiş</text>

          {saat !== null && (
            <g>
              <line x1={x(saat)} x2={x(saat)} y1={PT} y2={H - PB} stroke="#252525" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={x(saat)} cy={y(u)} r="4.5" fill="#1F8A5D" stroke="#fff" strokeWidth="2" />
              <circle cx={x(saat)} cy={y(t)} r="4.5" fill="#A5620D" stroke="#fff" strokeWidth="2" />
            </g>
          )}
        </svg>
        {saat !== null && (
          <div className="chart-tip" style={{ left: `${(x(saat) / W) * 100}%`, top: `${(y(Math.max(u, t)) / H) * 100}%` }}>
            <b>{String(saat).padStart(2, "0")}:00</b> · Üretim {kwTr(u)} kW · Tüketim {kwTr(t)} kW
            <br />
            {fark > 0.05
              ? `Bu saatin fazlası ${kwTr(fark)} kW → satış fiyatından`
              : fark < -0.05
                ? `Şebekeden çekilen ${kwTr(-fark)} kW → tam perakende fiyattan`
                : "Üretim ve tüketim başa baş"}
          </div>
        )}
      </div>
    </div>
  );
}
