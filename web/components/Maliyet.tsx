"use client";

import { useMemo, useState } from "react";
import { BATARYA_TL_KWH, CATI_CARPANI, MALIYET_BANT, MALIYET_KALEMLERI } from "@/data/kb";
import { Ok } from "./Icons";

/**
 * "Ne kadar param gider?" — kurulum maliyeti tahmini.
 * Bantlar gerçek 2026 teklif/EPC verilerinden (kb/taslak/2026-08-08-maliyet-arastirmasi.md).
 */

const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");
const binTl = (n: number) =>
  n >= 1_000_000
    ? (n / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " M₺"
    : Math.round(n / 1000).toLocaleString("tr-TR") + " bin ₺";

type Segment = "konut" | "ticari";
type Cati = keyof typeof CATI_CARPANI;

const SEG = {
  konut: { min: 2, max: 25, adim: 1, varsayilan: 6 },
  ticari: { min: 10, max: 1000, adim: 10, varsayilan: 100 },
} as const;

const CATILAR: Array<[Cati, string]> = [
  ["trapez", "Trapez / sandviç panel"],
  ["kiremit", "Kiremit"],
  ["teras", "Beton teras"],
];

function bant(segment: Segment, kw: number): [number, number] {
  for (const [maks, alt, ust] of MALIYET_BANT[segment]) if (kw <= maks) return [alt, ust];
  const son = MALIYET_BANT[segment][MALIYET_BANT[segment].length - 1];
  return [son[1], son[2]];
}

export default function Maliyet() {
  const [segment, setSegment] = useState<Segment>("konut");
  const [kw, setKw] = useState<number>(SEG.konut.varsayilan);
  const [cati, setCati] = useState<Cati>("kiremit");
  const [bataryali, setBataryali] = useState(false);
  const [bataryaKwh, setBataryaKwh] = useState(10);

  const s = SEG[segment];

  const sonuc = useMemo(() => {
    const carpan = CATI_CARPANI[cati];
    const [altBirim, ustBirim] = bant(segment, kw);
    const alt = kw * altBirim * carpan;
    const ust = kw * ustBirim * carpan;
    const batarya = bataryali ? bataryaKwh * BATARYA_TL_KWH : 0;
    return { alt, ust, altBirim, ustBirim, batarya, kdvli: segment === "ticari" ? [alt * 1.2, ust * 1.2] : null };
  }, [segment, kw, cati, bataryali, bataryaKwh]);

  const segDegistir = (yeni: Segment) => {
    setSegment(yeni);
    setKw(SEG[yeni].varsayilan);
  };

  const ortalama = (sonuc.alt + sonuc.ust) / 2 + sonuc.batarya;

  return (
    <div className="b-grid">
      <div className="roi-form" style={{ padding: 0 }}>
        <div className="rtoggle" role="tablist" aria-label="Sistem tipi">
          <button className={segment === "konut" ? "on" : ""} onClick={() => segDegistir("konut")}>
            Konut çatısı
          </button>
          <button className={segment === "ticari" ? "on" : ""} onClick={() => segDegistir("ticari")}>
            Ticari / sanayi çatısı
          </button>
        </div>

        <div className="rf">
          <label htmlFor="mGuc">
            Sistem gücü — {kw.toLocaleString("tr-TR")} kW
          </label>
          <input
            id="mGuc"
            type="range"
            min={s.min}
            max={s.max}
            step={s.adim}
            value={kw}
            onChange={(e) => setKw(+e.target.value)}
          />
        </div>

        <div className="rf">
          <label htmlFor="mCati">Çatı tipi</label>
          <select id="mCati" value={cati} onChange={(e) => setCati(e.target.value as Cati)}>
            {CATILAR.map(([k, ad]) => (
              <option key={k} value={k}>
                {ad}
              </option>
            ))}
          </select>
        </div>

        <label className="d-soru">
          <input type="checkbox" checked={bataryali} onChange={(e) => setBataryali(e.target.checked)} />
          Batarya eklemek istiyorum
        </label>
        {bataryali && (
          <div className="rf">
            <label htmlFor="mBat">
              Batarya kapasitesi — {bataryaKwh} kWh
            </label>
            <input
              id="mBat"
              type="range"
              min={5}
              max={30}
              step={5}
              value={bataryaKwh}
              onChange={(e) => setBataryaKwh(+e.target.value)}
            />
          </div>
        )}

        <div className="roi-out">
          <div className="ro">
            <div className="rv">
              {binTl(sonuc.alt + sonuc.batarya)} – {binTl(sonuc.ust + sonuc.batarya)}
            </div>
            <div className="rk">
              Tahmini toplam {segment === "konut" ? "(KDV dahil piyasa bandı)" : "(KDV hariç EPC bandı)"}
            </div>
          </div>
          <div className="ro">
            <div className="rv">
              {tl(sonuc.altBirim)} – {tl(sonuc.ustBirim)}
            </div>
            <div className="rk">kW başına birim maliyet</div>
          </div>
          <div className="ro">
            <div className="rv">{bataryali ? binTl(sonuc.batarya) : "—"}</div>
            <div className="rk">
              {bataryali ? "Batarya (kurulum hariç liste)" : "Batarya seçilmedi"}
            </div>
          </div>
        </div>

        {sonuc.kdvli && (
          <p className="roi-note">
            %20 KDV ile: {binTl(sonuc.kdvli[0] + sonuc.batarya)} – {binTl(sonuc.kdvli[1] + sonuc.batarya)}.
            Yatırım Teşvik Belgesi KDV istisnası sağlayabilir — Destekler sayfasına bakın.
          </p>
        )}
      </div>

      <div>
        <p className="tanim" style={{ marginBottom: 12 }}>
          Ortalama {binTl(ortalama)} bütçenin kalemlere dağılımı:
        </p>
        <svg viewBox="0 0 360 196" role="img"
          aria-label={MALIYET_KALEMLERI.map(([ad, o]) => `${ad}: yüzde ${o}`).join("; ")}>
          {MALIYET_KALEMLERI.map(([ad, oran], i) => {
            const yy = i * 28;
            const w = (oran / 40) * 148;
            return (
              <g key={ad}>
                <text x="0" y={yy + 14} fontSize="12" fill="#252525">{ad}</text>
                <rect x="168" y={yy + 4} width={w} height="14" rx="4" fill="#1F8A5D" />
                <text x={168 + w + 8} y={yy + 15} fontSize="12" fontWeight="600" fill="#252525">
                  %{oran}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="d-list" style={{ marginTop: 6 }}>
          <div className="d-item d-sart">
            <span className="dot" aria-hidden="true" />
            <div>
              <b>Teklifler çoğunlukla EUR bazlıdır</b>
              <p>
                Panel ve inverter ithal olduğundan fiyatlar kura duyarlıdır; teklif geçerlilik
                süresini ve kur sabitleme koşulunu sorun.
              </p>
            </div>
          </div>
          <div className="d-item d-sart">
            <span className="dot" aria-hidden="true" />
            <div>
              <b>Banda girmeyen kalemler</b>
              <p>
                Çatı takviyesi (eski binada statik gerektirirse), trafo gücü artırımı (büyük
                sistemlerde) ve batarya montaj bedeli ayrıca fiyatlanır.
              </p>
            </div>
          </div>
        </div>
        <div className="tool-cta" style={{ marginTop: 10 }}>
          <a
            className="gt-btn small"
            href={`/asistan?soru=${encodeURIComponent(
              `${kw} kW'lık ${segment === "konut" ? "konut" : "ticari"} çatı GES için aldığım teklif makul mü? Kalemleri paylaşacağım.`
            )}`}
          >
            Teklifinizi Değerlendirtin <Ok className="i" />
          </a>
          <p>Elinizde teklif varsa asistan kalem kalem makul fiyat kontrolü yapar.</p>
        </div>
      </div>
    </div>
  );
}
