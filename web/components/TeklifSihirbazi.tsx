"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Atac, Ok } from "./Icons";

/**
 * Teklif sihirbazı: teklif yükle → alanlar okunur → kb bantlarıyla denetimli
 * tarafsız değerlendirme raporu.
 */

type Alanlar = {
  guc_kwp: number;
  panel_adet?: number;
  panel_wp?: number;
  inverter_kw?: number;
  batarya_kwh?: number;
  toplam_tutar: number;
  para_birimi: string;
  kdv_dahil_mi?: string;
  garanti_notlari?: string;
  okunamayanlar?: string[];
};

const IZINLI = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");

export default function TeklifSihirbazi() {
  const [mesgul, setMesgul] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [dosyaAdi, setDosyaAdi] = useState("");
  const [dosya, setDosya] = useState<{ mime: string; veri: string } | null>(null);
  const [notlar, setNotlar] = useState("");
  const [sonuc, setSonuc] = useState<{ alanlar: Alanlar; analiz: string } | null>(null);

  async function sec(f: File | undefined) {
    setHata(null);
    if (!f) return;
    if (!IZINLI.includes(f.type)) return setHata("JPEG, PNG, WebP veya PDF yükleyin.");
    if (f.size > 6 * 1024 * 1024) return setHata("Dosya 6 MB'ı aşmamalı.");
    const veri = await new Promise<string>((coz, red) => {
      const r = new FileReader();
      r.onload = () => coz((r.result as string).split(",")[1] ?? "");
      r.onerror = () => red(new Error());
      r.readAsDataURL(f);
    }).catch(() => null);
    if (!veri) return setHata("Dosya okunamadı; yeniden deneyin.");
    setDosyaAdi(f.name);
    setDosya({ mime: f.type, veri });
  }

  async function degerlendir() {
    if (!dosya || mesgul) return;
    setMesgul(true);
    setHata(null);
    setSonuc(null);
    try {
      const res = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notlar,
          ek: {
            type: dosya.mime === "application/pdf" ? "document" : "image",
            source: { type: "base64", media_type: dosya.mime, data: dosya.veri },
          },
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.hata || "Değerlendirme üretilemedi.");
      setSonuc(d);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Bir sorun oluştu; yeniden deneyin.");
    } finally {
      setMesgul(false);
    }
  }

  const a = sonuc?.alanlar;
  const tlKw = a && a.guc_kwp > 0 && a.para_birimi === "TL"
    ? Math.round(a.toplam_tutar / a.guc_kwp)
    : null;

  return (
    <div className="teklif-arac">
      {!sonuc && (
        <>
          <label className={`teklif-yukle ${mesgul ? "pasif" : ""}`}>
            <Atac className="i" />
            <b>{dosyaAdi || "Teklif dosyasını seçin"}</b>
            <span>PDF ya da fotoğraf — en fazla 6 MB. Firma adı raporda kullanılmaz.</span>
            <input
              type="file"
              accept={IZINLI.join(",")}
              hidden
              disabled={mesgul}
              onChange={(e) => void sec(e.target.files?.[0])}
            />
          </label>
          <label className="teklif-not">
            <span>İsteğe bağlı not (il, aylık tüketim, çatı tipi…)</span>
            <input
              value={notlar}
              maxLength={300}
              placeholder="Örn: Antalya, aylık 450 kWh, kiremit çatı"
              onChange={(e) => setNotlar(e.target.value)}
              disabled={mesgul}
            />
          </label>
          {hata && <p className="teklif-hata">{hata}</p>}
          {mesgul ? (
            <div className="gozden" role="status">
              <svg className="disli" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <div>
                <b>Mühendis teklifinizi inceliyor</b>
                <span>Kalemler okunuyor, güncel piyasa bantlarıyla karşılaştırılıyor — bir dakikayı bulabilir…</span>
                <div className="gozden-cizgiler" aria-hidden="true"><i /><i /><i /></div>
              </div>
            </div>
          ) : (
            <button className="gt-btn" onClick={degerlendir} disabled={!dosya}>
              Teklifi Değerlendir <Ok className="i" />
            </button>
          )}
        </>
      )}

      {sonuc && a && (
        <>
          <div className="teklif-ozet">
            <div><b>{a.guc_kwp.toLocaleString("tr-TR")} kWp</b><span>kurulu güç</span></div>
            {a.panel_adet ? (
              <div><b>{a.panel_adet} × {a.panel_wp || "?"} Wp</b><span>panel</span></div>
            ) : null}
            {a.batarya_kwh ? (
              <div><b>{a.batarya_kwh} kWh</b><span>batarya</span></div>
            ) : null}
            <div>
              <b>{a.para_birimi === "TL" ? tl(a.toplam_tutar)
                : `${a.toplam_tutar.toLocaleString("tr-TR")} ${a.para_birimi}`}</b>
              <span>toplam ({a.kdv_dahil_mi === "dahil" ? "KDV dahil"
                : a.kdv_dahil_mi === "haric" ? "KDV hariç" : "KDV belirsiz"})</span>
            </div>
            {tlKw && (
              <div><b>{tl(tlKw)}</b><span>kW başına</span></div>
            )}
          </div>
          {a.okunamayanlar && a.okunamayanlar.length > 0 && (
            <p className="teklif-hata">Okunamayan alanlar: {a.okunamayanlar.join(", ")} —
              değerlendirme okunabilen kalemlerle sınırlıdır.</p>
          )}
          <div className="teklif-rapor">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{sonuc.analiz}</ReactMarkdown>
          </div>
          <div className="dk-cta-btn" style={{ marginTop: 18 }}>
            <button className="gt-btn small line" onClick={() => { setSonuc(null); setDosya(null); setDosyaAdi(""); }}>
              Başka Teklif Değerlendir
            </button>
            <a className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent("Teklif değerlendirme raporumla ilgili sorularım var.")}`}>
              Asistanla Devam Edin <Ok className="i" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
