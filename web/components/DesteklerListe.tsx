"use client";

import { useState } from "react";
import Destek, { type Profil } from "@/components/Destek";
import destekVeri from "@/data/destekler.json";
import { Ev, Fabrika, Filiz, Kalkan, Ok } from "@/components/Icons";
import { Aciklamali } from "@/components/Terim";

const TUR_BASLIK: Record<string, string> = {
  devlet: "Devlet Destekleri",
  banka: "Banka Kredileri",
  leasing: "Leasing",
  esco: "ESCO / Yatırımsız Modeller",
};

const TUR_KISA: Record<string, string> = {
  devlet: "Devlet",
  banka: "Banka",
  leasing: "Leasing",
  esco: "ESCO",
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

export default function DesteklerListe() {
  const [profil, setProfil] = useState<Profil | null>(null); // null = Tümü
  const [tur, setTur] = useState("");
  const [durum, setDurum] = useState("");

  const suzgecli = destekVeri.destekler.filter(
    (d) =>
      (!profil || d.kitle.includes(profil)) &&
      (!tur || d.tur === tur) &&
      (!durum || d.durum === durum),
  );
  const gruplar = Object.keys(TUR_BASLIK)
    .map((t) => ({
      tur: t,
      baslik: TUR_BASLIK[t],
      kayitlar: suzgecli.filter((d) => d.tur === t),
    }))
    .filter((g) => g.kayitlar.length > 0);

  return (
    <>
      <section className="dk-bolum" id="uygunluk" aria-labelledby="uygunlukBaslik">
        <div className="tool">
          <h2 id="uygunlukBaslik">
            <Kalkan className="i" /> Size Uygun Destekler
          </h2>
          <p className="tanim">
            Profilinizi seçin; yararlanabileceğiniz avantajları şartlarıyla görün, alttaki
            liste de seçiminize göre süzülsün.
          </p>
          <div className="dk-secimler">
            <div className="rtoggle" aria-label="Profil">
              <button className={profil === null ? "on" : ""} aria-pressed={profil === null} onClick={() => setProfil(null)}>Tümü</button>
              {(Object.keys(KITLE) as Profil[]).map((k) => (
                <button key={k} className={profil === k ? "on" : ""} aria-pressed={profil === k} onClick={() => setProfil(k)}>
                  {(() => { const I = KITLE[k].Ikon; return <I className="i" />; })()} {KITLE[k].etiket}
                </button>
              ))}
            </div>
            <div className="rtoggle" aria-label="Tür">
              <button className={tur === "" ? "on" : ""} aria-pressed={tur === ""} onClick={() => setTur("")}>Tümü</button>
              {Object.keys(TUR_BASLIK).map((t) => (
                <button key={t} className={tur === t ? "on" : ""} aria-pressed={tur === t} onClick={() => setTur(t)}>
                  {TUR_KISA[t]}
                </button>
              ))}
            </div>
            <div className="rtoggle" aria-label="Durum">
              <button className={durum === "" ? "on" : ""} aria-pressed={durum === ""} onClick={() => setDurum("")}>Tümü</button>
              {["aktif", "donemsel", "teyit-bekliyor"].map((s) => (
                <button key={s} className={durum === s ? "on" : ""} aria-pressed={durum === s} onClick={() => setDurum(s)}>
                  {DURUM[s].etiket}
                </button>
              ))}
            </div>
          </div>
          <Destek disProfil={profil} />
        </div>
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
