"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/** Yönetim: üye taleplerini listeler; cevap yazma ve durum değiştirme. */

type Mesaj = { kim: "uye" | "ekip"; metin: string; zaman: string };
export type UyeTalep = {
  id: string;
  konu: string;
  durum: "acik" | "yanitlandi" | "kapandi";
  mesajlar: Mesaj[];
  olusturma: string;
  guncelleme: string;
  eposta?: string;
  ad?: string;
};

const KONU_ETIKET: Record<string, string> = {
  fizibilite: "Fizibilite",
  mevzuat: "Mevzuat",
  teklif: "Teklif değerlendirme",
  diger: "Diğer",
};
const DURUMLAR: Array<[UyeTalep["durum"], string]> = [
  ["acik", "Açık"],
  ["yanitlandi", "Yanıtlandı"],
  ["kapandi", "Kapandı"],
];
const DURUM_ETIKET = Object.fromEntries(DURUMLAR);

function zaman(s: string) {
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleString("tr-TR", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

async function kopru(veri: unknown) {
  const res = await fetch("/api/yonetim/kopru", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uc: "/yonetim/talep-yanit", veri }),
  });
  const d = (await res.json().catch(() => ({}))) as { hata?: string };
  if (!res.ok) throw new Error(d.hata || "İşlem şu an yapılamadı; lütfen yeniden deneyin.");
  return d;
}

export default function UyeTalepleriPanel({ talepler }: { talepler: UyeTalep[] }) {
  const yonlendir = useRouter();
  const [seciliId, setSeciliId] = useState<string>("");
  const [cevap, setCevap] = useState<string>("");
  const [bekliyor, setBekliyor] = useState<boolean>(false);
  const [hata, setHata] = useState<string>("");

  const secili = useMemo(() => {
    if (!talepler.length) return null;
    return talepler.find((t) => t.id === seciliId) ?? talepler[0];
  }, [talepler, seciliId]);

  async function gonder(mesaj: string, durum?: UyeTalep["durum"]) {
    if (!secili || bekliyor) return;
    setBekliyor(true);
    setHata("");
    try {
      await kopru({ id: secili.id, mesaj, ...(durum ? { durum } : {}) });
      setCevap("");
      yonlendir.refresh();
    } catch (e) {
      setHata(e instanceof Error ? e.message : "İşlem şu an yapılamadı; lütfen yeniden deneyin.");
    } finally {
      setBekliyor(false);
    }
  }

  if (talepler.length === 0) {
    return <p>Henüz üye talebi yok. Üyeler /hesap sayfasından talep oluşturduğunda burada listelenir.</p>;
  }

  return (
    <>
      <div className="yp-tablo-kutu">
        <table>
          <thead>
            <tr>
              <th>Talep</th>
              <th>Üye</th>
              <th>Konu</th>
              <th>Güncelleme</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {talepler.map((t) => (
              <tr
                key={t.id}
                className={t.durum === "acik" ? "bekliyor" : ""}
                onClick={() => setSeciliId(t.id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <b>#{t.id}</b> · {t.mesajlar.length} mesaj
                </td>
                <td>{t.ad || t.eposta || "—"}</td>
                <td>{KONU_ETIKET[t.konu] || t.konu}</td>
                <td>{zaman(t.guncelleme || t.olusturma)}</td>
                <td>
                  <span className={`yp-durum ${t.durum}`}>{DURUM_ETIKET[t.durum] || t.durum}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {secili && (
        <div className="yt-detay">
          <div className="yp-detay-ust">
            <div>
              <h2>
                #{secili.id} · {KONU_ETIKET[secili.konu] || secili.konu}
                {secili.eposta ? ` — ${secili.ad || ""} (${secili.eposta})` : ""}
              </h2>
              <span className="yp-detay-zaman">Açılış: {zaman(secili.olusturma)}</span>
            </div>
            <div className="yp-durum-secim" role="group" aria-label="Talep durumu">
              {DURUMLAR.map(([deger, adi]) => (
                <button
                  key={deger}
                  type="button"
                  className={secili.durum === deger ? `on ${deger}` : ""}
                  disabled={bekliyor || secili.durum === deger}
                  onClick={() => void gonder("", deger)}
                >
                  {adi}
                </button>
              ))}
            </div>
          </div>
          <div className="yp-sohbet">
            {secili.mesajlar.map((m, i) => (
              <div key={i} className={`yp-mesaj ${m.kim === "uye" ? "ziyaretci" : ""}`}>
                <b>
                  {m.kim === "uye" ? "Üye" : "Ekip"} · {zaman(m.zaman)}
                </b>
                <p>{m.metin}</p>
              </div>
            ))}
          </div>
          <form
            className="yt-cevap"
            onSubmit={(e) => {
              e.preventDefault();
              if (cevap.trim()) void gonder(cevap.trim());
            }}
          >
            <textarea
              value={cevap}
              onChange={(e) => setCevap(e.target.value)}
              placeholder="Üyeye yanıt yazın… (gönderildiğinde talep Yanıtlandı olur)"
              aria-label="Üyeye yanıt"
              disabled={bekliyor}
              required
            />
            <button className="gt-btn small" disabled={bekliyor}>
              {bekliyor ? "Gönderiliyor…" : "Yanıtı Gönder"}
            </button>
          </form>
          {hata && <p className="yp-hata">{hata}</p>}
        </div>
      )}
    </>
  );
}
