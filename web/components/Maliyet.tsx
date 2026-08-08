"use client";

import { useMemo, useState } from "react";
import { BATARYA_TL_KWH, CATI_CARPANI, EKIPMAN, MALIYET_BANT, MALIYET_KALEMLERI } from "@/data/kb";
import { Ok } from "./Icons";
import { Aciklamali } from "./Terim";

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
    return {
      alt,
      ust,
      // birim maliyet gösterimi toplamla aynı çarpanı içermeli (denetim bulgusu, 8 Ağu 2026)
      altBirim: altBirim * carpan,
      ustBirim: ustBirim * carpan,
      batarya,
      kdvli: segment === "ticari" ? [alt * 1.2, ust * 1.2] : null,
    };
  }, [segment, kw, cati, bataryali, bataryaKwh]);

  const segDegistir = (yeni: Segment) => {
    setSegment(yeni);
    setKw(SEG[yeni].varsayilan);
  };

  const ortalama = (sonuc.alt + sonuc.ust) / 2 + sonuc.batarya;

  const panelAdet = Math.ceil((kw * 1000) / EKIPMAN.panelWp);
  const catiAlani = Math.round(panelAdet * EKIPMAN.panelM2);
  const invHedef = kw / EKIPMAN.dcAcOran;
  const invKw = EKIPMAN.inverterBoylari.find((b) => b >= invHedef) ?? Math.round(invHedef);
  const konstruksiyon = {
    kiremit: "Eloksallı alüminyum ray + kiremit kancası (kiremit delinmez) + sızdırmazlık contaları",
    trapez: "Eloksallı alüminyum ray + EPDM contalı trapez vidaları",
    teras: "Balast ayaklı eğimli konstrüksiyon (çatı delinmez) + koruyucu şilte",
  }[cati];
  const malzemeler: Array<[string, string]> = [
    ["Güneş panelleri",
     `≈ ${panelAdet} adet ${EKIPMAN.panelWp} Wp N-Type TOPCon panel · ~${catiAlani} m² çatı alanı · ürün garantisi 12-15 yıl, performans 25-30 yıl lineer`],
    ["İnverter",
     `≈ ${invKw} kW ${bataryali ? "hibrit" : "string"} inverter (DC/AC ≈ 1,2) · EN 50549-1 uyumlu · garanti 5-10 yıl${bataryali ? " · batarya haberleşmesi (CAN/RS485) uyumlu" : ""}`],
    ["Konstrüksiyon", konstruksiyon],
    ["Montaj ve işçilik",
     "Yetkili ekip montajı, kalibre MC4 kriplemesi, devreye alma ve IEC 62446-1 test raporu"],
    ["Kablo ve elektrik",
     "EN 50618 DC solar kablo (UV korumalı kanalda), tek marka MC4 konnektör, DC + AC panolar, parafudr (Tip 1+2), topraklama ve gerekiyorsa paratoner"],
    ["Proje, izin, devreye alma",
     "SMM elektrik projesi (tek hat + string planı + topraklama), TEDAŞ onayı, geçici kabul, çift yönlü sayaç"],
    ["Nakliye ve diğer", "Nakliye, gerekirse vinç, sarf malzemeler ve etiketleme"],
  ];

  return (
    <>
    <div className="b-grid">
      <div className="roi-form" style={{ padding: 0 }}>
        <div className="rtoggle" aria-label="Sistem tipi">
          <button className={segment === "konut" ? "on" : ""} aria-pressed={segment === "konut"} onClick={() => segDegistir("konut")}>
            Konut çatısı
          </button>
          <button className={segment === "ticari" ? "on" : ""} aria-pressed={segment === "ticari"} onClick={() => segDegistir("ticari")}>
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
              <p><Aciklamali>Panel ve inverter ithal olduğundan fiyatlar kura duyarlıdır; teklif geçerlilik
                süresini ve kur sabitleme koşulunu sorun.</Aciklamali></p>
            </div>
          </div>
          <div className="d-item d-sart">
            <span className="dot" aria-hidden="true" />
            <div>
              <b>Banda girmeyen kalemler</b>
              <p><Aciklamali>Çatı takviyesi (eski binada statik gerektirirse), trafo gücü artırımı (büyük
                sistemlerde) ve batarya montaj bedeli ayrıca fiyatlanır.</Aciklamali></p>
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
            Teklifinizi Asistana Sorun <Ok className="i" />
          </a>
          <p><Aciklamali>Elinizde teklif varsa asistan kalem kalem makul fiyat kontrolü yapar.</Aciklamali></p>
        </div>
      </div>
    </div>

    <div className="bom">
      <h3>Bu sistemde neler var? — {kw.toLocaleString("tr-TR")} kW için malzeme listesi</h3>
      <table>
        <thead>
          <tr>
            <th>Kalem</th>
            <th>İçerik</th>
            <th>Pay</th>
            <th>Tahmini bant</th>
          </tr>
        </thead>
        <tbody>
          {MALIYET_KALEMLERI.map(([ad, oran], i) => (
            <tr key={ad}>
              <td>{ad}</td>
              <td><Aciklamali>{malzemeler[i]?.[1]}</Aciklamali></td>
              <td className="mono">%{oran}</td>
              <td className="mono">
                {binTl((sonuc.alt * oran) / 100)} – {binTl((sonuc.ust * oran) / 100)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="roi-note">
        Kalem payları 2026 sektör kırılımıdır; ekipman spesifikasyonları güncel piyasa
        standardına göredir (Ağustos 2026). Marka ve kesin kalem fiyatları teklifle netleşir —
        teklifinizdeki kalemleri bu listeyle karşılaştırın, eksik kalemi sorun.
      </p>
    </div>
    </>
  );
}
