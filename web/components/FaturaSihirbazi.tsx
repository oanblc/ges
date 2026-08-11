"use client";

import { useState } from "react";
import { Atac, Ok } from "./Icons";
import { Aciklamali } from "./Terim";
import { ILLER, MALIYET_BANT, CATI_CARPANI } from "@/data/kb";
import { konutHesap, isletmeHesap, type HesapSonuc } from "@/lib/hesap";

/**
 * Fatura sihirbazı: fatura yükle → alanlar okunur → eksikleri tamamla →
 * maliyet + üretim + şebekeye satış + geri ödeme tek ekranda.
 */

type Alanlar = {
  belge_fatura_mi: boolean;
  abone_grubu: "mesken" | "ticarethane" | "sanayi" | "tarimsal" | "belirsiz";
  donem_ay?: string;
  tuketim_kwh: number;
  aktif_enerji_tl: number;
  dagitim_tl: number;
  toplam_tutar_tl: number;
  il?: string;
  okunamayanlar?: string[];
};

const IZINLI = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

/** Türkçe il adı normalizasyonu: toLocaleLowerCase("tr") tek başına "IZMIR" → "ızmır"
 * ürettiğinden önce İ→i / I→ı çevrimi yapılır (ajan/asistan.py ile aynı yaklaşım). */
const ilAnahtar = (s: string) =>
  s.trim().replace(/İ/g, "i").replace(/I/g, "ı").toLocaleLowerCase("tr");
const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");
const binTl = (n: number) =>
  n >= 1_000_000
    ? (n / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " M₺"
    : Math.round(n / 1000).toLocaleString("tr-TR") + " bin ₺";
const kwh = (n: number) => n.toLocaleString("tr-TR") + " kWh";

function maliyetBandi(segment: "konut" | "ticari", kw: number): [number, number] {
  for (const [maks, alt, ust] of MALIYET_BANT[segment]) if (kw <= maks) return [kw * alt, kw * ust];
  const son = MALIYET_BANT[segment][MALIYET_BANT[segment].length - 1];
  return [kw * son[1], kw * son[2]];
}

export default function FaturaSihirbazi() {
  const [adim, setAdim] = useState<1 | 2 | 3>(1);
  const [mesgul, setMesgul] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [dosyaAdi, setDosyaAdi] = useState("");
  const [okunamayan, setOkunamayan] = useState<string[]>([]);

  // Adım 2 form durumu
  const [tip, setTip] = useState<"konut" | "isletme">("konut");
  const [aylikFatura, setAylikFatura] = useState(0);
  const [aylikKwh, setAylikKwh] = useState(0);
  const [il, setIl] = useState("İstanbul");
  const [ozTuketim, setOzTuketim] = useState(0.8);

  const [sonuc, setSonuc] = useState<HesapSonuc | null>(null);

  async function yukle(dosya: File | undefined) {
    setHata(null);
    if (!dosya) return;
    if (!IZINLI.includes(dosya.type)) return setHata("JPEG, PNG, WebP veya PDF yükleyin.");
    if (dosya.size > 6 * 1024 * 1024) return setHata("Dosya 6 MB'ı aşmamalı.");
    setMesgul(true);
    setDosyaAdi(dosya.name);
    try {
      const veri = await new Promise<string>((coz, red) => {
        const r = new FileReader();
        r.onload = () => coz((r.result as string).split(",")[1] ?? "");
        r.onerror = () => red(new Error());
        r.readAsDataURL(dosya);
      });
      const res = await fetch("/api/fatura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ek: {
            type: dosya.type === "application/pdf" ? "document" : "image",
            source: { type: "base64", media_type: dosya.type, data: veri },
          },
        }),
      });
      const a: Alanlar & { hata?: string } = await res.json();
      if (!res.ok || a.hata) throw new Error(a.hata ?? "Fatura okunamadı.");
      if (!a.belge_fatura_mi)
        throw new Error("Bu belge bir elektrik faturasına benzemiyor — lütfen faturanızı yükleyin.");
      setTip(a.abone_grubu === "mesken" ? "konut" : "isletme");
      setAylikFatura(Math.round(a.toplam_tutar_tl));
      setAylikKwh(Math.round(a.tuketim_kwh));
      const bulunan = a.il ? ILLER.find(([ad]) => ilAnahtar(ad) === ilAnahtar(a.il!)) : undefined;
      const eksikler = [...(a.okunamayanlar ?? [])];
      if (bulunan) setIl(bulunan[0]);
      else if (!eksikler.some((x) => ilAnahtar(x).startsWith("il")))
        eksikler.push("il"); // sessizce İstanbul varsayma — kullanıcı aşağıdan seçsin
      setOkunamayan(eksikler);
      setAdim(2);
    } catch (e) {
      setHata(e instanceof Error && e.message ? e.message : "Fatura okunamadı; daha net bir fotoğrafla deneyin.");
    } finally {
      setMesgul(false);
    }
  }

  function hesapla() {
    setHata(null);
    if (aylikFatura <= 0) return setHata("Aylık fatura tutarını girin.");
    const verim = ILLER.find(([ad]) => ad === il)?.[1] ?? 1450;
    setSonuc(tip === "konut" ? konutHesap(aylikFatura, verim, aylikKwh || undefined) : isletmeHesap(aylikFatura, verim, ozTuketim, aylikKwh || undefined));
    setAdim(3);
  }

  const seg = tip === "konut" ? "konut" : "ticari";
  const bant = sonuc ? maliyetBandi(seg, sonuc.kw) : null;
  const carpan = CATI_CARPANI.kiremit; // bant zaten aralık; çatı farkı payın içinde

  return (
    <div className="fs">
      <div className="fs-adimlar" aria-hidden="true">
        {(["Fatura", "Bilgiler", "Sonuç"] as const).map((ad, i) => (
          <span key={ad} className={`fs-adim ${adim === i + 1 ? "on" : ""} ${adim > i + 1 ? "gecti" : ""}`}>
            <i>{i + 1}</i> {ad}
          </span>
        ))}
      </div>

      {adim === 1 && (
        <div className="fs-yukle">
          <label className={`fs-kutu ${mesgul ? "pasif" : ""}`}>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              hidden
              disabled={mesgul}
              onChange={(e) => {
                void yukle(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <Atac className="i" />
            {mesgul ? (
              <>
                <b>{dosyaAdi}</b>
                <span>Fatura okunuyor… birkaç saniye sürebilir.</span>
              </>
            ) : (
              <>
                <b>Faturanızı buraya yükleyin</b>
                <span>Fotoğraf (JPEG/PNG/WebP) veya PDF · en fazla 6 MB</span>
              </>
            )}
          </label>
          <p className="fs-not"><Aciklamali>Fatura yalnız bu analiz için kullanılır; tüketim ve tutar satırları otomatik okunur,
            bir sonraki adımda düzeltme şansınız olur.</Aciklamali></p>
          <button type="button" className="fs-geri" onClick={() => setAdim(2)}>
            Faturam yanımda değil — bilgileri elle gireyim →
          </button>
        </div>
      )}

      {adim === 2 && (
        <form
          className="roi-form"
          style={{ padding: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            hesapla();
          }}
        >
          {okunamayan.length > 0 && (
            <p className="fs-uyari">
              Faturadan okunamayanlar: {okunamayan.join(", ")} — lütfen aşağıda tamamlayın.
            </p>
          )}
          <div className="rtoggle" aria-label="Abone tipi">
            <button type="button" className={tip === "konut" ? "on" : ""} aria-pressed={tip === "konut"} onClick={() => setTip("konut")}>
              Konut
            </button>
            <button type="button" className={tip === "isletme" ? "on" : ""} aria-pressed={tip === "isletme"} onClick={() => setTip("isletme")}>
              İşletme
            </button>
          </div>
          <div className="fs-form-izgara">
            <div className="rf">
              <label htmlFor="fsTutar">Aylık fatura tutarı (vergiler dahil)</label>
              <div className="numwrap">
                <span className="cur">₺</span>
                <input
                  id="fsTutar"
                  inputMode="numeric"
                  value={aylikFatura ? aylikFatura.toLocaleString("tr-TR") : ""}
                  onChange={(e) => setAylikFatura(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
                />
              </div>
            </div>
            <div className="rf">
              <label htmlFor="fsKwh">Aylık tüketim (kWh)</label>
              <div className="numwrap">
                <input
                  id="fsKwh"
                  inputMode="numeric"
                  value={aylikKwh ? aylikKwh.toLocaleString("tr-TR") : ""}
                  onChange={(e) => setAylikKwh(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
                />
                <span className="cur">kWh</span>
              </div>
            </div>
            <div className="rf">
              <label htmlFor="fsIl">İl</label>
              <select id="fsIl" value={il} onChange={(e) => setIl(e.target.value)}>
                {ILLER.map(([ad]) => (
                  <option key={ad} value={ad}>
                    {ad}
                  </option>
                ))}
              </select>
            </div>
            {tip === "isletme" && (
              <div className="rf">
                <label htmlFor="fsOz">Öz tüketim oranı — %{Math.round(ozTuketim * 100)}</label>
                <input
                  id="fsOz"
                  type="range"
                  min={0.4}
                  max={0.95}
                  step={0.05}
                  value={ozTuketim}
                  onChange={(e) => setOzTuketim(+e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="tool-cta">
            <button className="gt-btn small" type="submit">
              Planımı Hesapla <Ok className="i" />
            </button>
            <button type="button" className="fs-geri" onClick={() => setAdim(1)}>
              ← Farklı fatura yükle
            </button>
          </div>
        </form>
      )}

      {adim === 3 && sonuc && bant && (
        <div className="fs-sonuc">
          <div className="roi-out fs-out">
            <div className="ro one">
              <div className="rv">
                {binTl(bant[0] * carpan)} – {binTl(bant[1] * carpan)}
              </div>
              <div className="rk">
                Tahmini kurulum maliyeti — önerilen güç {sonuc.kw.toLocaleString("tr-TR")} kW
                {seg === "ticari" ? " (KDV hariç EPC bandı)" : " (KDV dahil piyasa bandı)"}
              </div>
            </div>
            <div className="ro">
              <div className="rv">{kwh(sonuc.yillikUretimKwh)}</div>
              <div className="rk">Yıllık üretim ({il})</div>
            </div>
            <div className="ro">
              <div className="rv">{kwh(sonuc.ozKwh)}</div>
              <div className="rk">
                {tip === "konut" ? "Aylık mahsupla faturanızdan düşen" : "Öz tüketimle değerlenen"}
              </div>
            </div>
            <div className="ro">
              <div className="rv">
                {kwh(sonuc.satisKwh)} → {tl(sonuc.satisGeliri)}/yıl
              </div>
              <div className="rk">Şebekeye satış (çıplak enerji bedelinden)</div>
            </div>
            <div className="ro">
              <div className="rv">{tl(sonuc.yillikDeger)}/yıl</div>
              <div className="rk">Toplam yıllık kazanç (tasarruf + satış)</div>
            </div>
            <div className="ro">
              <div className="rv">
                ≈ {sonuc.geriOdemeYil.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl
              </div>
              <div className="rk">Geri ödeme süresi (bandın ortasıyla)</div>
            </div>
          </div>
          {sonuc.notlar.length > 0 && (
            <ul className="fs-notlar">
              {sonuc.notlar.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
          <p className="roi-note"><Aciklamali>Satış geliri "abone grubu çıplak enerji bedeli" esasıyla, EPDK tarifesiyle hesaplanır;
            yıllık üretimin tüketiminizin 2 katını aşan kısmı bedelsiz YEKDEM'e devredilir. Sonuçlar
            ön fizibilitedir; kesin tasarım yerinde keşif ister.</Aciklamali></p>
          <div className="tool-cta">
            <a
              className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent(
                `${il}'de ${tip === "konut" ? "konut" : "işletme"} aboneliğim var, aylık faturam ${tl(aylikFatura)}${aylikKwh > 0 ? `, aylık tüketimim ${kwh(aylikKwh)}` : ""}. ${sonuc.kw} kW GES planımı detaylandırır mısın?`,
              )}`}
            >
              Asistanla Detaylandırın <Ok className="i" />
            </a>
            <button type="button" className="fs-geri" onClick={() => setAdim(2)}>
              ← Bilgileri düzenle
            </button>
          </div>
        </div>
      )}

      {hata && <p className="ek-hata" style={{ margin: "12px 0 0" }}>{hata}</p>}
    </div>
  );
}
