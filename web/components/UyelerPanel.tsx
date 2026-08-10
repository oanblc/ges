"use client";

import { useEffect, useMemo, useState } from "react";

type Uye = {
  ad: string;
  eposta: string;
  kayit: string;
  sonGiris: string;
  girisSayisi: number;
  aktiviteSayisi: number;
  sonAktivite: string;
  sonAktiviteTur: string;
};
type Ozet = { toplam: number; buHafta: number; bugun: number; girisYapan: number };
type Aktivite = { eposta: string; tur: string; zaman: string };

async function kopru(uc: string, veri: unknown = {}) {
  const res = await fetch("/api/yonetim/kopru", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uc, veri }),
  });
  return res.json();
}

function tarih(s: string) {
  if (!s) return "—";
  const d = new Date(s);
  return d.toLocaleString("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function gun(s: string) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function UyelerPanel() {
  const [uyeler, setUyeler] = useState<Uye[]>([]);
  const [ozet, setOzet] = useState<Ozet | null>(null);
  const [adlar, setAdlar] = useState<Record<string, string>>({});
  const [aktiviteler, setAktiviteler] = useState<Aktivite[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");
  const [secili, setSecili] = useState<string | null>(null);

  async function yukle() {
    setYukleniyor(true);
    const u = await kopru("/yonetim/uyeler");
    setUyeler(u.uyeler || []);
    setOzet(u.ozet || null);
    setAdlar(u.aktiviteAdi || {});
    const a = await kopru("/yonetim/uye-aktivite");
    setAktiviteler(a.aktiviteler || []);
    setYukleniyor(false);
  }
  useEffect(() => {
    void yukle();
  }, []);

  async function uyeSil(eposta: string) {
    if (!confirm(`${eposta} hesabını silmek istediğinize emin misiniz? Bu geri alınamaz.`)) return;
    await kopru("/yonetim/uye-sil", { eposta });
    if (secili === eposta) setSecili(null);
    void yukle();
  }

  const suzulmus = useMemo(() => {
    const q = arama.trim().toLocaleLowerCase("tr");
    if (!q) return uyeler;
    return uyeler.filter((u) => u.ad.toLocaleLowerCase("tr").includes(q) || u.eposta.includes(q));
  }, [uyeler, arama]);

  const seciliAktivite = useMemo(
    () => (secili ? aktiviteler.filter((a) => a.eposta === secili) : aktiviteler),
    [aktiviteler, secili]
  );

  if (yukleniyor) return <p className="yp-aciklama">Yükleniyor…</p>;

  return (
    <div className="uyeler-kok">
      {ozet && (
        <div className="uyeler-ozet">
          <div className="uyeler-kart vurgu"><b>{ozet.toplam}</b><span>Toplam üye</span></div>
          <div className="uyeler-kart"><b>{ozet.buHafta}</b><span>Son 7 günde yeni</span></div>
          <div className="uyeler-kart"><b>{ozet.bugun}</b><span>Bugün kayıt</span></div>
          <div className="uyeler-kart"><b>{ozet.girisYapan}</b><span>Giriş yapan</span></div>
        </div>
      )}

      <div className="uyeler-govde">
        <section className="uyeler-liste-blok">
          <div className="uyeler-arac">
            <input
              className="uyeler-ara"
              placeholder="Ad ya da e-posta ara…"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
            />
            {secili && (
              <button className="uyeler-temizle" onClick={() => setSecili(null)}>
                Filtreyi kaldır ({secili})
              </button>
            )}
          </div>
          {suzulmus.length === 0 ? (
            <p className="yp-aciklama">Kayıtlı üye yok.</p>
          ) : (
            <div className="yp-tablo-kutu">
              <table className="uyeler-tablo">
                <thead>
                  <tr>
                    <th>Üye</th>
                    <th>Kayıt</th>
                    <th>Son giriş</th>
                    <th>Giriş</th>
                    <th>Aktivite</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {suzulmus.map((u) => (
                    <tr
                      key={u.eposta}
                      className={secili === u.eposta ? "secili" : ""}
                      onClick={() => setSecili(u.eposta)}
                    >
                      <td>
                        <b>{u.ad}</b>
                        <span className="uyeler-eposta">{u.eposta}</span>
                      </td>
                      <td>{gun(u.kayit)}</td>
                      <td>{u.sonGiris ? gun(u.sonGiris) : "—"}</td>
                      <td>{u.girisSayisi || 0}</td>
                      <td>
                        {u.aktiviteSayisi || 0}
                        {u.sonAktiviteTur && adlar[u.sonAktiviteTur] && (
                          <span className="uyeler-sonakt">{adlar[u.sonAktiviteTur]}</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="uyeler-sil"
                          onClick={(e) => {
                            e.stopPropagation();
                            void uyeSil(u.eposta);
                          }}
                          aria-label="Üyeyi sil"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="uyeler-akis-blok">
          <h2>{secili ? "Üye aktivitesi" : "Son aktiviteler"}</h2>
          {seciliAktivite.length === 0 ? (
            <p className="yp-aciklama">Henüz aktivite kaydı yok.</p>
          ) : (
            <ol className="uyeler-akis">
              {seciliAktivite.slice(0, 80).map((a, i) => (
                <li key={i}>
                  <span className="akis-tur">{adlar[a.tur] || a.tur}</span>
                  {!secili && <span className="akis-uye">{a.eposta}</span>}
                  <span className="akis-zaman">{tarih(a.zaman)}</span>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
    </div>
  );
}
