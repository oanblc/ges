"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Atac, Ok } from "./Icons";

/**
 * Poliçe sihirbazı: sigorta poliçesi yükle → alanlar okunur → kb sigorta
 * standartlarıyla denetimli GES kapsam değerlendirmesi.
 */

type Alanlar = {
  police_turu: string;
  sigortali_bedel_tl?: number;
  ges_teminati_var_mi: string;
  teminatlar: string[];
  muafiyetler?: string[];
  baslangic_bitis?: string;
  okunamayanlar?: string[];
};

const IZINLI = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");

export default function PoliceSihirbazi() {
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
      const res = await fetch("/api/police", {
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
  const TUR: Record<string, string> = { konut: "Konut poliçesi", isyeri: "İşyeri poliçesi",
    "ges-ozel": "GES'e özel poliçe", "car-ear": "Kurulum (CAR/EAR)", diger: "Diğer", belirsiz: "Tür belirsiz" };
  const GES: Record<string, string> = { var: "GES teminatı VAR", yok: "GES teminatı YOK",
    belirsiz: "GES teminatı belirsiz" };

  return (
    <div className="teklif-arac">
      {!sonuc && (
        <>
          <label className={`teklif-yukle ${mesgul ? "pasif" : ""}`}>
            <Atac className="i" />
            <b>{dosyaAdi || "Poliçe dosyasını seçin"}</b>
            <span>PDF ya da fotoğraf — en fazla 6 MB. Sigorta şirketi adı raporda kullanılmaz.</span>
            <input
              type="file"
              accept={IZINLI.join(",")}
              hidden
              disabled={mesgul}
              onChange={(e) => void sec(e.target.files?.[0])}
            />
          </label>
          <label className="teklif-not">
            <span>İsteğe bağlı not (GES gücünüz, kurulum durumu…)</span>
            <input
              value={notlar}
              maxLength={300}
              placeholder="Örn: 10 kW çatı GES kurdum / kurmayı planlıyorum"
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
                <b>Poliçeniz inceleniyor</b>
                <span>Teminatlar okunuyor, GES sigorta standartlarıyla karşılaştırılıyor — bir dakikayı bulabilir…</span>
                <div className="gozden-cizgiler" aria-hidden="true"><i /><i /><i /></div>
              </div>
            </div>
          ) : (
            <button className="gt-btn" onClick={degerlendir} disabled={!dosya}>
              Poliçeyi Değerlendir <Ok className="i" />
            </button>
          )}
        </>
      )}

      {sonuc && a && (
        <>
          <div className="teklif-ozet">
            <div><b>{TUR[a.police_turu] || a.police_turu}</b><span>poliçe türü</span></div>
            <div><b>{GES[a.ges_teminati_var_mi]}</b><span>panel/GES kapsamı</span></div>
            {a.sigortali_bedel_tl ? (
              <div><b>{tl(a.sigortali_bedel_tl)}</b><span>sigorta bedeli</span></div>
            ) : null}
            {a.baslangic_bitis ? (
              <div><b>{a.baslangic_bitis}</b><span>poliçe dönemi</span></div>
            ) : null}
            <div><b>{a.teminatlar.length}</b><span>okunan teminat</span></div>
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
              Başka Poliçe Değerlendir
            </button>
            <a className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent("Poliçe değerlendirme raporumla ilgili sorularım var.")}`}>
              Asistanla Devam Edin <Ok className="i" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
