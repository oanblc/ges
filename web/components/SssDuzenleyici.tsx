"use client";

import { useState } from "react";

type Kayit = { soru: string; cevap: string };
type Kategori = { ad: string; sorular: Kayit[] };
type Veri = { guncelleme?: string; kaynak?: string; kategoriler: Kategori[] };

export default function SssDuzenleyici({ ilkVeri }: { ilkVeri: Veri }) {
  const [kategoriler, setKategoriler] = useState<Kategori[]>(ilkVeri.kategoriler);
  const [kirli, setKirli] = useState(false);
  const [bekliyor, setBekliyor] = useState(false);
  const [mesaj, setMesaj] = useState("");

  function guncelle(deger: Kategori[]) {
    setKategoriler(deger);
    setKirli(true);
    setMesaj("");
  }

  function soruDegistir(ki: number, si: number, alan: keyof Kayit, deger: string) {
    const yeni = kategoriler.map((k, i) =>
      i !== ki ? k : {
        ...k,
        sorular: k.sorular.map((s, j) => (j !== si ? s : { ...s, [alan]: deger })),
      }
    );
    guncelle(yeni);
  }

  function soruSil(ki: number, si: number) {
    guncelle(kategoriler.map((k, i) =>
      i !== ki ? k : { ...k, sorular: k.sorular.filter((_, j) => j !== si) }
    ));
  }

  function soruEkle(ki: number) {
    guncelle(kategoriler.map((k, i) =>
      i !== ki ? k : { ...k, sorular: [...k.sorular, { soru: "Yeni soru?", cevap: "" }] }
    ));
  }

  async function yayinla() {
    setBekliyor(true);
    setMesaj("");
    const veri: Veri = {
      ...ilkVeri,
      kategoriler: kategoriler
        .map((k) => ({
          ...k,
          sorular: k.sorular.filter((s) => s.soru.trim() && s.cevap.trim()),
        }))
        .filter((k) => k.sorular.length > 0),
    };
    const res = await fetch("/api/yonetim/kopru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uc: "/yonetim/sss-kaydet", veri: { veri } }),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok) {
      setKirli(false);
      setMesaj("✓ Kaydedildi — site birkaç dakika içinde güncellenir.");
    } else {
      setMesaj(d.hata || "Kaydedilemedi.");
    }
    setBekliyor(false);
  }

  return (
    <div>
      <div className="yp-sss-arac">
        <button className="gt-btn small" onClick={yayinla} disabled={!kirli || bekliyor}>
          {bekliyor ? "Kaydediliyor…" : "Değişiklikleri Yayınla"}
        </button>
        {mesaj && <span className="yp-sss-mesaj">{mesaj}</span>}
        {kirli && !mesaj && <span className="yp-sss-mesaj">Yayınlanmamış değişiklik var.</span>}
      </div>
      {kategoriler.map((k, ki) => (
        <section key={k.ad} className="yp-sss-kategori">
          <h2>
            {k.ad} ({k.sorular.length})
          </h2>
          {k.sorular.map((s, si) => (
            <details key={si} className="yp-kayit">
              <summary>
                <span className="yp-kayit-soru">{s.soru || "(boş soru)"}</span>
                <button type="button" className="yp-sil"
                  onClick={(e) => { e.preventDefault(); soruSil(ki, si); }}>
                  Sil
                </button>
              </summary>
              <div className="yp-sss-form">
                <input
                  value={s.soru}
                  onChange={(e) => soruDegistir(ki, si, "soru", e.target.value)}
                  aria-label="Soru"
                />
                <textarea
                  value={s.cevap}
                  rows={4}
                  onChange={(e) => soruDegistir(ki, si, "cevap", e.target.value)}
                  aria-label="Cevap"
                />
              </div>
            </details>
          ))}
          <button type="button" className="yp-ekle" onClick={() => soruEkle(ki)}>
            + Soru ekle
          </button>
        </section>
      ))}
    </div>
  );
}
