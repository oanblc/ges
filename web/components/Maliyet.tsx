"use client";

import { useMemo, useState } from "react";
import { BATARYA_TL_KWH, CATI_CARPANI, EKIPMAN, MALIYET_BANT, MALIYET_KALEMLERI } from "@/data/kb";
import {
  CARPORT_PRIM, ISI_POMPASI, OFFGRID, SARJ_CIHAZ, SARJ_LISANS_NOTU, SISTEM_KAYNAK_NOT, SULAMA,
  type SarjTipi,
} from "@/data/sistem-turleri";
import { Ok } from "./Icons";
import { Aciklamali } from "./Terim";

/**
 * "Ne kadar param gider?" — kurulum maliyeti tahmini.
 * On-grid bantlar gerçek 2026 teklif/EPC verilerinden (kb/taslak/2026-08-08-maliyet-arastirmasi.md);
 * off-grid, sulama ve şarj türleri kb/sistem-turleri-fiyatlar.md'den (data/sistem-turleri.ts).
 */

const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");
const binTl = (n: number) =>
  n >= 1_000_000
    ? (n / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " M₺"
    : Math.round(n / 1000).toLocaleString("tr-TR") + " bin ₺";
const sayi = (n: number, hane = 1) =>
  n.toLocaleString("tr-TR", { maximumFractionDigits: hane });

type Segment = "konut" | "ticari";
type Cati = keyof typeof CATI_CARPANI;
type SistemTuru = "ongrid" | "offgrid" | "sulama" | "sarj";

const SEG = {
  konut: { min: 2, max: 25, adim: 1, varsayilan: 6 },
  ticari: { min: 10, max: 1000, adim: 10, varsayilan: 100 },
} as const;

const CATILAR: Array<[Cati, string]> = [
  ["trapez", "Trapez / sandviç panel"],
  ["kiremit", "Kiremit"],
  ["teras", "Beton teras"],
];

const TURLER: Array<[SistemTuru, string]> = [
  ["ongrid", "Şebekeye bağlı"],
  ["offgrid", "Off-grid (bataryalı)"],
  ["sulama", "Tarımsal sulama"],
  ["sarj", "Araç şarjı"],
];

function bant(segment: Segment, kw: number): [number, number] {
  for (const [maks, alt, ust] of MALIYET_BANT[segment]) if (kw <= maks) return [alt, ust];
  const son = MALIYET_BANT[segment][MALIYET_BANT[segment].length - 1];
  return [son[1], son[2]];
}

/* ---------- Off-grid paneli ---------- */
function OffGridPanel() {
  const [gunluk, setGunluk] = useState<number>(5);
  const [otonomi, setOtonomi] = useState<number>(2);

  const h = useMemo(() => {
    // kb ortak formülü (11 Ağu 2026): günlük × otonomi ÷ 0,8 (LFP DoD) ÷ 0,85 (inverter+kablo verimi)
    const bataryaKwh = (gunluk * otonomi) / OFFGRID.dod / OFFGRID.cevrimVerim;
    const panelKwp = gunluk / (OFFGRID.kisPsh * OFFGRID.sistemVerim);
    const inverterKw = Math.max(3, Math.ceil(panelKwp * 1.2));
    const panelAdet = Math.max(2, Math.ceil((panelKwp * 1000) / EKIPMAN.panelWp));
    const paket = OFFGRID.paketBant.find(([tavan]) => bataryaKwh <= tavan);
    if (paket) return { bataryaKwh, panelKwp, inverterKw, panelAdet, alt: paket[1], ust: paket[2], moduler: false };
    // 10 kWh üzeri hazır paket kb'de teyit bekliyor → modüler kalemlerle bant (panel+montaj teklifle netleşir)
    const alt = bataryaKwh * OFFGRID.lfpTlKwh[0] + OFFGRID.hibritInverter10kwTl[0];
    const ust = bataryaKwh * OFFGRID.lfpTlKwh[1] + OFFGRID.hibritInverter10kwTl[1];
    return { bataryaKwh, panelKwp, inverterKw, panelAdet, alt, ust, moduler: true };
  }, [gunluk, otonomi]);

  const kalemler: Array<[string, string]> = [
    ["Güneş panelleri", `≈ ${sayi(h.panelKwp)} kWp (${h.panelAdet} adet ${EKIPMAN.panelWp} Wp) — kış güneşine göre boyutlandırıldı`],
    ["LFP batarya", `≈ ${sayi(h.bataryaKwh)} kWh LiFePO4 — günlük × otonomi ÷ 0,8 (DoD) ÷ 0,85 (inverter+kablo verimi), ${otonomi} gün otonomi`],
    ["Hibrit inverter", `≈ ${h.inverterKw} kW tam sinüs — motorlu yük (pompa/buzdolabı) kalkışı için; tepe yükünüze göre teklifle kesinleşir`],
    ["Regülatör, montaj, kablolama", h.moduler ? "Panel ve montaj bu banda dahil değil — fiyat teklifle netleşir" : "Hazır pakete dahil"],
  ];

  return (
    <div className="roi-form" style={{ padding: 0 }}>
      <div className="fs-form-izgara">
        <div className="rf">
          <label htmlFor="ogGunluk">Günlük tüketim — {sayi(gunluk)} kWh/gün</label>
          <input id="ogGunluk" type="range" min={1} max={30} step={1} value={gunluk}
            onChange={(e) => setGunluk(+e.target.value)} />
        </div>
        <div className="rf">
          <label htmlFor="ogOtonomi">Otonomi (güneşsiz gün) — {otonomi} gün</label>
          <input id="ogOtonomi" type="range" min={1} max={3} step={1} value={otonomi}
            onChange={(e) => setOtonomi(+e.target.value)} />
        </div>
      </div>

      <div className="roi-out">
        <div className="ro">
          <div className="rv">{binTl(h.alt)} – {binTl(h.ust)}</div>
          <div className="rk">{h.moduler ? "Batarya + inverter bandı (modüler)" : "Hazır paket bandı"}</div>
        </div>
        <div className="ro">
          <div className="rv">{binTl((h.alt + h.ust) / 2)}</div>
          <div className="rk">Ortalama bütçe</div>
        </div>
        <div className="ro">
          <div className="rv">{sayi(h.bataryaKwh)} kWh · {sayi(h.panelKwp)} kWp</div>
          <div className="rk">Batarya ve panel boyutu</div>
        </div>
      </div>

      <div className="bom">
        <h3>Bu sistemde neler var?</h3>
        <table>
          <thead><tr><th>Kalem</th><th>İçerik</th></tr></thead>
          <tbody>
            {kalemler.map(([ad, icerik]) => (
              <tr key={ad}><td>{ad}</td><td><Aciklamali>{icerik}</Aciklamali></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="fs-notlar">
        {OFFGRID.senaryolar.map((s) => <li key={s}>{s}</li>)}
        <li>Şebekeye bağlanmayan sistemde izin/abonelik gerekmez.</li>
        <li>İlanlarda KDV durumu belirsizdir — sipariş öncesi teyit edin.</li>
        {h.moduler && <li>10 kWh üzeri hazır paket ilanı yaygın değil; toplam fiyat teklifle netleşir.</li>}
      </ul>
      <div className="tool-cta" style={{ marginTop: 12 }}>
        <a className="gt-btn small"
          href={`/asistan?soru=${encodeURIComponent(`Günlük ${gunluk} kWh tüketen, ${otonomi} gün otonomili off-grid sistem için ${sayi(h.bataryaKwh)} kWh batarya + ${sayi(h.panelKwp)} kWp panel makul mü?`)}`}>
          Asistana Sorun <Ok className="i" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Tarımsal sulama paneli ---------- */
function SulamaPanel() {
  const [hp, setHp] = useState<number>(7.5);
  const [sebekeli, setSebekeli] = useState<boolean>(false);

  const kwpAlt = hp * SULAMA.kwpCarpani[0];
  const kwpUst = hp * SULAMA.kwpCarpani[1];
  const alt = kwpAlt * SULAMA.tlKwp[0];
  const ust = kwpUst * SULAMA.tlKwp[1];

  const kalemler: Array<[string, string]> = [
    ["Güneş panelleri", `≈ ${sayi(kwpAlt)}-${sayi(kwpUst)} kWp (HP × 1,3-1,5 kuralı)`],
    ["Solar pompa sürücüsü (VFD)", "Pompa gücüne eşit veya bir üst kademe, MPPT'li; bulutta yavaşlar, durmaz; kuru çalışma koruması standart"],
    ["Konstrüksiyon ve montaj", "Arazi konstrüksiyonu, DC kablolama, devreye alma — anahtar teslim banda dahil"],
    ...(sebekeli
      ? [["Proje ve bağlantı işlemleri", "Sulama aboneliği üzerinden lisanssız GES başvurusu, çift yönlü sayaç — teklifle netleşir"] as [string, string]]
      : []),
  ];

  return (
    <div className="roi-form" style={{ padding: 0 }}>
      <div className="fs-form-izgara">
        <div className="rf">
          <label htmlFor="suHp">Pompa gücü</label>
          <select id="suHp" value={hp} onChange={(e) => setHp(+e.target.value)}>
            {SULAMA.hpSecenekleri.map((v) => (
              <option key={v} value={v}>{sayi(v)} HP</option>
            ))}
          </select>
        </div>
        <div className="rf">
          <label>Bağlantı</label>
          <div className="rtoggle" aria-label="Şebeke bağlantısı">
            <button type="button" className={!sebekeli ? "on" : ""} aria-pressed={!sebekeli} onClick={() => setSebekeli(false)}>Şebekesiz</button>
            <button type="button" className={sebekeli ? "on" : ""} aria-pressed={sebekeli} onClick={() => setSebekeli(true)}>Şebekeli</button>
          </div>
        </div>
      </div>

      <div className="roi-out">
        <div className="ro">
          <div className="rv">{binTl(alt)} – {binTl(ust)}</div>
          <div className="rk">Anahtar teslim bant (≈ 17-20 bin ₺/kWp)</div>
        </div>
        <div className="ro">
          <div className="rv">{binTl((alt + ust) / 2)}</div>
          <div className="rk">Ortalama bütçe</div>
        </div>
        <div className="ro">
          <div className="rv">{SULAMA.geriOdemeYil[0].toLocaleString("tr-TR")}–{SULAMA.geriOdemeYil[1]} yıl</div>
          <div className="rk">Tipik geri ödeme (mazot/şebeke alternatifine göre)</div>
        </div>
      </div>

      <div className="bom">
        <h3>Bu sistemde neler var?</h3>
        <table>
          <thead><tr><th>Kalem</th><th>İçerik</th></tr></thead>
          <tbody>
            {kalemler.map(([ad, icerik]) => (
              <tr key={ad}><td>{ad}</td><td><Aciklamali>{icerik}</Aciklamali></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="fs-notlar">
        <li>Batarya gerekmez — su deposu ve damla sulama depolama görevi görür.</li>
        {sebekeli ? (
          <li>Şebekeli kurulumda sulama aboneliği üzerinden mahsuplaşma yapılır; kurulu güç sınırı
            sözleşme gücünün 2 katıdır, sulama elektriğinde KDV %10'dur.</li>
        ) : (
          <li>Şebekesiz kurulumda izin/abonelik gerekmez; sistem yalnız güneşliyken çalışır — gece
            pompaj gerekiyorsa şebekeli/hibrit sürücü değerlendirilir.</li>
        )}
        {hp >= 30 && (
          <li>30 HP ve üzeri büyük sistemlerde perakende fiyat ilan edilmiyor — fiyat proje bazlı
            teklifle netleşir.</li>
        )}
        {SULAMA.hibeNotlari.map((n) => <li key={n}>{n}</li>)}
        <li>Güncel hibe çağrıları için <a href="/destekler">Destekler sayfasına</a> bakın.</li>
      </ul>
      <div className="tool-cta" style={{ marginTop: 12 }}>
        <a className="gt-btn small"
          href={`/asistan?soru=${encodeURIComponent(`${sayi(hp)} HP ${sebekeli ? "şebekeli" : "şebekesiz"} sulama pompam için solar pompaj sistemi kurmak istiyorum; hibe seçenekleriyle birlikte yol haritası çıkarır mısın?`)}`}>
          Asistana Sorun <Ok className="i" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Araç şarj istasyonu paneli ---------- */
function SarjPanel() {
  const [tip, setTip] = useState<SarjTipi>("ac22");
  const [adet, setAdet] = useState<number>(2);
  const [carportKwp, setCarportKwp] = useState<number>(0);

  const cihaz = SARJ_CIHAZ[tip];
  const cihazAlt = cihaz.bant[0] * adet;
  const cihazUst = cihaz.bant[1] * adet;
  const [gesBirimAlt, gesBirimUst] = bant("ticari", Math.max(carportKwp, 10));
  const gesAlt = carportKwp * gesBirimAlt * CARPORT_PRIM[0];
  const gesUst = carportKwp * gesBirimUst * CARPORT_PRIM[1];
  const alt = cihazAlt + gesAlt;
  const ust = cihazUst + gesUst;

  const kalemler: Array<[string, string]> = [
    [`Şarj cihazı — ${cihaz.ad} × ${adet}`,
      `${binTl(cihaz.bant[0])} – ${binTl(cihaz.bant[1])} / adet (KDV dahil perakende${tip.startsWith("dc") ? ", kurulum dahil bant" : ""})`],
    ["Pano, hat ve montaj", "Cihaz bandına ek; güç artışı gerekebilir — fiyat teklifle netleşir"],
    ...(carportKwp > 0
      ? [["Carport GES", `${carportKwp} kWp panel + çelik carport konstrüksiyonu (çatı GES bandına %30-50 prim): ${binTl(gesAlt)} – ${binTl(gesUst)}`] as [string, string]]
      : []),
    ...(tip.startsWith("dc")
      ? [["Trafo / elektrik altyapısı", "DC istasyonlarda en büyük ek kalem olabilir — fiyat teklifle netleşir"] as [string, string]]
      : []),
  ];

  return (
    <div className="roi-form" style={{ padding: 0 }}>
      <div className="fs-form-izgara">
        <div className="rf">
          <label htmlFor="sjTip">İstasyon tipi</label>
          <select id="sjTip" value={tip} onChange={(e) => setTip(e.target.value as SarjTipi)}>
            {(Object.keys(SARJ_CIHAZ) as SarjTipi[]).map((k) => (
              <option key={k} value={k}>{SARJ_CIHAZ[k].ad}</option>
            ))}
          </select>
        </div>
        <div className="rf">
          <label htmlFor="sjAdet">İstasyon adedi — {adet}</label>
          <input id="sjAdet" type="range" min={1} max={10} step={1} value={adet}
            onChange={(e) => setAdet(+e.target.value)} />
        </div>
        <div className="rf">
          <label htmlFor="sjGes">Carport GES — {carportKwp ? `${carportKwp} kWp` : "yok"}</label>
          <input id="sjGes" type="range" min={0} max={100} step={5} value={carportKwp}
            onChange={(e) => setCarportKwp(+e.target.value)} />
        </div>
      </div>

      <div className="roi-out">
        <div className="ro">
          <div className="rv">{binTl(alt)} – {binTl(ust)}</div>
          <div className="rk">Tahmini toplam (cihaz{carportKwp > 0 ? " + carport GES" : ""})</div>
        </div>
        <div className="ro">
          <div className="rv">{binTl((alt + ust) / 2)}</div>
          <div className="rk">Ortalama bütçe</div>
        </div>
        <div className="ro">
          <div className="rv">{binTl(cihazAlt)} – {binTl(cihazUst)}</div>
          <div className="rk">Cihaz kalemi ({cihaz.ad} × {adet})</div>
        </div>
      </div>

      <div className="bom">
        <h3>Bu sistemde neler var?</h3>
        <table>
          <thead><tr><th>Kalem</th><th>İçerik</th></tr></thead>
          <tbody>
            {kalemler.map(([ad, icerik]) => (
              <tr key={ad}><td>{ad}</td><td><Aciklamali>{icerik}</Aciklamali></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="fs-notlar">
        <li>{SARJ_LISANS_NOTU}</li>
        {cihaz.not && <li>{cihaz.not}</li>}
        {carportKwp > 0 && (
          <li>Cihaz fiyatları KDV dahil perakende, carport GES bandı KDV hariç EPC — toplam bu
            iki tabanın karmasıdır.</li>
        )}
        {carportKwp > 0 && (
          <li>Carport konstrüksiyonunda ₺/m² perakende ilan edilmez; referans: 2 araçlık hazır solar
            carport ≈ 572 bin ₺ (Ağu 2026). Öğlen üretimin mesai saati şarjıyla örtüşmesi en kârlı
            senaryodur; yapı ruhsatı/statik gerekir.</li>
        )}
      </ul>
      <div className="tool-cta" style={{ marginTop: 12 }}>
        <a className="gt-btn small"
          href={`/asistan?soru=${encodeURIComponent(`İşyerime ${adet} adet ${cihaz.ad} şarj istasyonu${carportKwp ? ` ve ${carportKwp} kWp carport GES` : ""} kurmak istiyorum; lisans gereklilikleri ve maliyetiyle yol haritası çıkarır mısın?`)}`}>
          Asistana Sorun <Ok className="i" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Ana bileşen ---------- */
export default function Maliyet() {
  const [tur, setTur] = useState<SistemTuru>("ongrid");
  const [segment, setSegment] = useState<Segment>("konut");
  const [kw, setKw] = useState<number>(SEG.konut.varsayilan);
  const [cati, setCati] = useState<Cati>("kiremit");
  const [bataryali, setBataryali] = useState(false);
  const [bataryaKwh, setBataryaKwh] = useState(10);
  const [isiPompali, setIsiPompali] = useState<boolean>(false);
  const [ipM2, setIpM2] = useState<number>(120);
  const [ipBolge, setIpBolge] = useState<number>(2);

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

  // ısı pompası eki — kaba tahmin (editör katsayıları, data/sistem-turleri.ts)
  const ip = useMemo(() => {
    if (!isiPompali) return null;
    const [, kAlt, kUst] = ISI_POMPASI.bolgeler[ipBolge];
    const kwhAlt = Math.round((ipM2 * kAlt) / ISI_POMPASI.scop);
    const kwhUst = Math.round((ipM2 * kUst) / ISI_POMPASI.scop);
    const ekKwp = Math.max(1, Math.round((kwhAlt + kwhUst) / 2 / ISI_POMPASI.kwpBasinaKwhYil));
    return {
      kwhAlt, kwhUst, ekKwp,
      alt: ISI_POMPASI.cihazBant[0] + ISI_POMPASI.montajBant[0],
      ust: ISI_POMPASI.cihazBant[1] + ISI_POMPASI.montajBant[1],
    };
  }, [isiPompali, ipM2, ipBolge]);

  const segDegistir = (yeni: Segment) => {
    setSegment(yeni);
    setKw(SEG[yeni].varsayilan);
  };

  const ekAlt = sonuc.batarya + (ip?.alt ?? 0);
  const ekUst = sonuc.batarya + (ip?.ust ?? 0);
  const gesOrtalama = (sonuc.alt + sonuc.ust) / 2; // dağılım grafiği yalnız GES bandını anlatır

  const panelAdet = Math.ceil((kw * 1000) / EKIPMAN.panelWp);
  const catiAlani = Math.round(panelAdet * EKIPMAN.panelM2);
  const invHedef = kw / EKIPMAN.dcAcOran;
  const invKw = EKIPMAN.inverterBoylari.find((b) => b >= invHedef) ?? Math.round(invHedef);
  // metraj çarpanları: kb/taslak 8 Ağu 2026 araştırması (ray ~2,3 m/panel, bağlantı 4/panel)
  const rayMetre = Math.round(panelAdet * 2.3);
  const baglanti = panelAdet * 4;
  const konstruksiyon = {
    kiremit: `≈ ${rayMetre} m eloksallı alüminyum ray (EN-AW 6063) + ≈ ${baglanti} adet kiremit kancası (kiremit delinmez) + orta/son tutucular ve sızdırmazlık contaları`,
    trapez: `≈ ${rayMetre} m eloksallı alüminyum ray + ≈ ${baglanti} adet EPDM contalı trapez vidası + orta/son tutucular`,
    teras: `Balast ayaklı eğimli konstrüksiyon (çatı delinmez) + ≈ ${rayMetre} m ray + koruyucu şilte`,
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
    <div className="rtoggle" aria-label="Sistem türü" style={{ marginBottom: 16 }}>
      {TURLER.map(([k, ad]) => (
        <button key={k} type="button" className={tur === k ? "on" : ""} aria-pressed={tur === k}
          onClick={() => setTur(k)}>
          {ad}
        </button>
      ))}
    </div>

    {tur === "offgrid" && <OffGridPanel />}
    {tur === "sulama" && <SulamaPanel />}
    {tur === "sarj" && <SarjPanel />}

    {tur === "ongrid" && (
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

        <label className="d-soru">
          <input type="checkbox" checked={isiPompali} onChange={(e) => setIsiPompali(e.target.checked)} />
          Isı pompası ekle (kaba tahmin)
        </label>
        {isiPompali && (
          <>
            <div className="rf">
              <label htmlFor="mIpM2">Isıtılan alan — {ipM2} m²</label>
              <input id="mIpM2" type="range" min={60} max={400} step={10} value={ipM2}
                onChange={(e) => setIpM2(+e.target.value)} />
            </div>
            <div className="rf">
              <label htmlFor="mIpBolge">İklim bölgesi</label>
              <select id="mIpBolge" value={ipBolge} onChange={(e) => setIpBolge(+e.target.value)}>
                {ISI_POMPASI.bolgeler.map(([ad], i) => (
                  <option key={ad} value={i}>{ad}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="roi-out">
          <div className="ro">
            <div className="rv">
              {binTl(sonuc.alt + ekAlt)} – {binTl(sonuc.ust + ekUst)}
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
          {ip && (
            <div className="ro">
              <div className="rv">{binTl(ip.alt)} – {binTl(ip.ust)}</div>
              <div className="rk">Isı pompası cihaz + montaj (toplama dahil)</div>
            </div>
          )}
        </div>

        {ip && (
          <p className="roi-note">
            Isı pompası kaba tahmini: yıllık ilave tüketim ≈ {ip.kwhAlt.toLocaleString("tr-TR")}–
            {ip.kwhUst.toLocaleString("tr-TR")} kWh; GES gücünü ≈ +{ip.ekKwp} kWp artırmayı düşünün
            (mesken aylık mahsupta kış tüketimi yaz fazlasıyla netleşmez — denge yıllık ekonomide
            kurulur). Premium markalarda cihaz 345 bin ₺'ye kadar çıkar; kesin boyut proje hesabı ister.
          </p>
        )}

        {sonuc.kdvli && (
          <p className="roi-note">
            %20 KDV ile: {binTl(sonuc.kdvli[0] + ekAlt)} – {binTl(sonuc.kdvli[1] + ekUst)}.
            Yatırım Teşvik Belgesi KDV istisnası sağlayabilir — Destekler sayfasına bakın.
          </p>
        )}
      </div>

      <div>
        <p className="tanim" style={{ marginBottom: 12 }}>
          Ortalama {binTl(gesOrtalama)} GES bütçesinin kalemlere dağılımı:
        </p>
        {(bataryali || ip) && (
          <p className="tanim" style={{ marginBottom: 12 }}>
            Seçtiğiniz ek kalemler bu dağılıma dahil değildir:
            {bataryali ? ` + batarya ${binTl(sonuc.batarya)}` : ""}
            {bataryali && ip ? "," : ""}
            {ip ? ` + ısı pompası ${binTl((ip.alt + ip.ust) / 2)} (ortalama)` : ""}.
          </p>
        )}
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
        standardına göredir (Ağustos 2026). İyi haber: 50 kW ve altı çatı GES'te 2026 yılı
        için TEDAŞ proje onay + kabul bedeli alınmıyor (EPDK kararı). Marka ve kesin kalem
        fiyatları teklifle netleşir — teklifinizdeki kalemleri bu listeyle karşılaştırın,
        eksik kalemi sorun.
      </p>
    </div>
    </>
    )}

    <p className="roi-note" style={{ marginTop: 14 }}>{SISTEM_KAYNAK_NOT}</p>
    </>
  );
}
