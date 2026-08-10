"use client";

import { useState } from "react";
import destekVeri from "@/data/destekler.json";
import { Ev, Fabrika, Filiz, Ok } from "@/components/Icons";
import { Aciklamali } from "@/components/Terim";

const TUR_BASLIK: Record<string, string> = {
  devlet: "Devlet Destekleri",
  banka: "Banka Kredileri",
  leasing: "Leasing",
  esco: "ESCO / Yatırımsız Modeller",
};

const DURUM: Record<string, { etiket: string; sinif: string }> = {
  aktif: { etiket: "Aktif", sinif: "aktif" },
  donemsel: { etiket: "Çağrı dönemine bağlı", sinif: "donemsel" },
  "teyit-bekliyor": { etiket: "Teyit bekliyor", sinif: "teyit" },
  pasif: { etiket: "Yürürlükte değil", sinif: "pasif" },
};

const KITLE: Record<string, { etiket: string; Ikon: typeof Ev }> = {
  konut: { etiket: "Konut", Ikon: Ev },
  isletme: { etiket: "İşletme", Ikon: Fabrika },
  tarimsal: { etiket: "Tarımsal", Ikon: Filiz },
};

const HEPSI = "hepsi";

export default function DesteklerListe() {
  const [kitle, setKitle] = useState(HEPSI);
  const [tur, setTur] = useState(HEPSI);
  const [durum, setDurum] = useState(HEPSI);

  const suzgecli = destekVeri.destekler.filter(
    (d) =>
      (kitle === HEPSI || d.kitle.includes(kitle)) &&
      (tur === HEPSI || d.tur === tur) &&
      (durum === HEPSI || d.durum === durum),
  );
  const gruplar = Object.keys(TUR_BASLIK)
    .map((t) => ({
      tur: t,
      baslik: TUR_BASLIK[t],
      kayitlar: suzgecli.filter((d) => d.tur === t),
    }))
    .filter((g) => g.kayitlar.length > 0);
  const suzuluyor = kitle !== HEPSI || tur !== HEPSI || durum !== HEPSI;

  return (
    <>
      <section className="dk-bolum dk-filtre" aria-label="Destek filtreleri">
        <div className="dk-filtre-satir">
          <span className="dk-filtre-ad">Profil</span>
          <div className="rtoggle" aria-label="Profile göre süz">
            <button className={kitle === HEPSI ? "on" : ""} aria-pressed={kitle === HEPSI} onClick={() => setKitle(HEPSI)}>Tümü</button>
            {Object.entries(KITLE).map(([k, v]) => (
              <button key={k} className={kitle === k ? "on" : ""} aria-pressed={kitle === k} onClick={() => setKitle(k)}>
                <v.Ikon className="i" /> {v.etiket}
              </button>
            ))}
          </div>
        </div>
        <div className="dk-filtre-satir">
          <span className="dk-filtre-ad">Tür</span>
          <div className="rtoggle" aria-label="Türe göre süz">
            <button className={tur === HEPSI ? "on" : ""} aria-pressed={tur === HEPSI} onClick={() => setTur(HEPSI)}>Tümü</button>
            {Object.entries(TUR_BASLIK).map(([t, ad]) => (
              <button key={t} className={tur === t ? "on" : ""} aria-pressed={tur === t} onClick={() => setTur(t)}>
                {t === "esco" ? "ESCO" : ad.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
        <div className="dk-filtre-satir">
          <span className="dk-filtre-ad">Durum</span>
          <div className="rtoggle" aria-label="Duruma göre süz">
            <button className={durum === HEPSI ? "on" : ""} aria-pressed={durum === HEPSI} onClick={() => setDurum(HEPSI)}>Tümü</button>
            {["aktif", "donemsel", "teyit-bekliyor"].map((s) => (
              <button key={s} className={durum === s ? "on" : ""} aria-pressed={durum === s} onClick={() => setDurum(s)}>
                {DURUM[s].etiket}
              </button>
            ))}
          </div>
        </div>
        <p className="dk-filtre-sonuc" aria-live="polite">
          {suzgecli.length} program listeleniyor
          {suzuluyor && (
            <button
              className="dk-filtre-sifirla"
              onClick={() => { setKitle(HEPSI); setTur(HEPSI); setDurum(HEPSI); }}
            >
              Filtreleri temizle
            </button>
          )}
        </p>
      </section>

      {gruplar.length === 0 && (
        <section className="dk-bolum">
          <p className="dk-bos">Bu filtrelerle eşleşen program yok. Filtreleri gevşetmeyi deneyin.</p>
        </section>
      )}

      {gruplar.map((g) => (
        <section key={g.tur} className="dk-bolum" aria-label={g.baslik}>
          <h2>{g.baslik}</h2>
          <div className="dk-grid">
            {g.kayitlar.map((d) => {
              const dr = DURUM[d.durum] ?? DURUM["teyit-bekliyor"];
              return (
                <article key={d.id} className={`dk-kart ${d.durum === "pasif" ? "soluk" : ""}`}>
                  <div className="dk-ust">
                    <span className="dk-kurum">{d.kurum}</span>
                    <span className={`dk-durum ${dr.sinif}`}>{dr.etiket}</span>
                  </div>
                  <b>{d.ad}</b>
                  <p><Aciklamali>{d.ozet}</Aciklamali></p>
                  {"not" in d && d.not && <p className="dk-not"><Aciklamali>{d.not}</Aciklamali></p>}
                  <div className="dk-alt">
                    <span className="dk-kitle">
                      {d.kitle.map((k) => {
                        const kit = KITLE[k];
                        return kit ? (
                          <span key={k}>
                            <kit.Ikon className="i" /> {kit.etiket}
                          </span>
                        ) : null;
                      })}
                    </span>
                    <a href={d.kaynakUrl} target="_blank" rel="noopener noreferrer">
                      Kaynak <Ok className="i" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
