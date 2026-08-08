"use client";

import { useMemo, useState } from "react";
import mevzuat from "@/data/mevzuat.json";
import { Ara, Ok } from "./Icons";
import { metniIsaretle } from "./Terim";

/**
 * Mevzuat kütüphanesi: anlık arama istemci tarafında (ücretsiz);
 * "AI'ya sor" yalnız mevzuat kayıtlarını gören ucuz modele gider.
 */

const TUR_ETIKET: Record<string, string> = {
  kanun: "Kanun",
  yonetmelik: "Yönetmelik",
  teblig: "Tebliğ",
  "kurul-karari": "EPDK Kurul Kararı",
  "cb-karari": "Cumhurbaşkanı Kararı",
};

const ETKI_ETIKET: Record<string, string> = {
  konut: "Konut",
  isletme: "İşletme",
  tarimsal: "Tarımsal",
};

type Kayit = (typeof mevzuat.kayitlar)[number];

const kucult = (s: string) => s.toLocaleLowerCase("tr");

export default function MevzuatArama() {
  const [arama, setArama] = useState("");
  const [tur, setTur] = useState<string>("hepsi");
  const [aiCevap, setAiCevap] = useState<string | null>(null);
  const [aiIlgili, setAiIlgili] = useState<string[]>([]);
  const [aiMesgul, setAiMesgul] = useState(false);
  const [aiHata, setAiHata] = useState<string | null>(null);

  const liste = useMemo(() => {
    const a = kucult(arama.trim());
    return mevzuat.kayitlar.filter((k: Kayit) => {
      if (tur !== "hepsi" && k.tur !== tur) return false;
      if (!a) return true;
      return kucult(`${k.baslik} ${k.ozet} ${k.tarih} ${TUR_ETIKET[k.tur] ?? ""}`).includes(a);
    });
  }, [arama, tur]);

  async function aiSor() {
    const soru = arama.trim();
    if (!soru || aiMesgul) return;
    setAiMesgul(true);
    setAiHata(null);
    setAiCevap(null);
    try {
      const res = await fetch("/api/mevzuat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soru }),
      });
      const j = await res.json();
      if (!res.ok || j.hata) throw new Error(j.hata ?? "Cevap alınamadı.");
      setAiCevap(j.cevap);
      setAiIlgili(Array.isArray(j.ilgili) ? j.ilgili : []);
    } catch (e) {
      setAiHata(e instanceof Error ? e.message : "Cevap alınamadı; yeniden deneyin.");
    } finally {
      setAiMesgul(false);
    }
  }

  return (
    <div>
      <form
        className="mv-arama"
        onSubmit={(e) => {
          e.preventDefault();
          void aiSor();
        }}
      >
        <div className="ask mv-ask">
          <Ara className="i" />
          <input
            value={arama}
            onChange={(e) => {
              setArama(e.target.value);
              setAiCevap(null);
              setAiIlgili([]);
            }}
            placeholder='Arayın ya da sorun… ör. "saatlik mahsup evleri kapsıyor mu?"'
            aria-label="Mevzuat arama"
          />
          <button className="gt-btn small" disabled={aiMesgul || !arama.trim()}>
            {aiMesgul ? "Aranıyor…" : "AI'ya Sor"} <Ok className="i" />
          </button>
        </div>
        <p className="mv-ipucu">
          {arama.trim()
            ? `${liste.length} kayıt eşleşti — sorunuzun cevabı listede yoksa "AI'ya Sor" kütüphaneye göre yanıtlar.`
            : 'Yazdıkça liste anında süzülür; "AI\'ya Sor" sorunuzu kütüphanedeki kayıtlara göre yanıtlar.'}
        </p>
      </form>

      {aiHata && <p className="ek-hata">{aiHata}</p>}
      {aiCevap && (
        <div className="mv-cevap" role="region" aria-label="Yapay zekâ cevabı">
          <b>Kütüphaneye göre cevap</b>
          <p>{metniIsaretle(aiCevap)}</p>
          {aiIlgili.length > 0 && <span>Dayanak kayıtlar aşağıda işaretlendi.</span>}
        </div>
      )}

      <div className="mv-filtre" role="group" aria-label="Tür süzgeci">
        {["hepsi", "kanun", "yonetmelik", "kurul-karari", "cb-karari", "teblig"].map((t) => (
          <button
            key={t}
            className={tur === t ? "on" : ""}
            aria-pressed={tur === t}
            onClick={() => setTur(t)}
          >
            {t === "hepsi" ? "Tümü" : TUR_ETIKET[t]}
          </button>
        ))}
      </div>

      <div className="mv-liste">
        {liste.length === 0 && (
          <p className="mv-bos">
            Eşleşen kayıt yok — sorunuzu "AI'ya Sor" ile iletin ya da{" "}
            <a href={`/asistan?soru=${encodeURIComponent(arama)}`}>asistana sorun</a>.
          </p>
        )}
        {liste.map((k: Kayit) => (
          <article
            key={k.id}
            className={`mv-kart ${aiIlgili.includes(k.id) ? "isaretli" : ""}`}
          >
            <div className="mv-ust">
              <span className={`mv-tur t-${k.tur}`}>{TUR_ETIKET[k.tur] ?? k.tur}</span>
              <span className="mv-tarih">{k.tarih}</span>
            </div>
            <b>{k.baslik}</b>
            <p>{metniIsaretle(k.ozet)}</p>
            <div className="mv-alt">
              <span className="mv-etki">
                {k.etki.map((e: string) => (
                  <i key={e}>{ETKI_ETIKET[e] ?? e}</i>
                ))}
              </span>
              <a
                href={`/asistan?soru=${encodeURIComponent(`${k.baslik} — bu düzenleme beni nasıl etkiler?`)}`}
              >
                Beni nasıl etkiler? <Ok className="i" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
