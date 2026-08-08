"use client";

import { useEffect, useState } from "react";
import { Ok } from "./Icons";

/**
 * Site geneli lead kilidi: hesap araçlarının sonuçları, iletişim bilgisi
 * bırakılana kadar bulanık gösterilir. Bir kez bırakan kullanıcı için tüm
 * kilitler kalıcı açılır (localStorage). "Daha sonra" diyen kullanıcı sonuçları
 * görür; altında nazik bir hatırlatma şeridi kalır (oturum boyunca).
 */

const ANAHTAR = "gd-lead";
const ERTELE_ANAHTAR = "gd-lead-ertele";

export const leadVar = () =>
  typeof window !== "undefined" && window.localStorage.getItem(ANAHTAR) === "1";

export function leadKaydet() {
  window.localStorage.setItem(ANAHTAR, "1");
  window.dispatchEvent(new Event("gd-lead"));
}

export const iletisimGecerliMi = (v: string) =>
  /[^@\s]+@[^@\s]+\.[^@\s]{2,}/.test(v) || v.replace(/\D/g, "").length >= 10;

export async function leadGonderApi(iletisim: string, baglam: string, mesajlar?: unknown[]) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      iletisim,
      mesajlar: mesajlar?.length
        ? mesajlar
        : [{ role: "user", content: `[${baglam}] Kullanıcı sonuçları görmek için iletişim bıraktı.` }],
    }),
  });
  if (!res.ok) {
    const j = await res.json().catch(() => null);
    throw new Error(j?.hata ?? "Gönderilemedi; lütfen yeniden deneyin.");
  }
}

function LeadFormu({
  kaynak,
  onAcildi,
}: {
  kaynak: string;
  onAcildi?: () => void;
}) {
  const [iletisim, setIletisim] = useState("");
  const [mesgul, setMesgul] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  return (
    <>
      <form
        className="as-lead-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!iletisimGecerliMi(iletisim.trim())) {
            setHata("Geçerli bir telefon veya e-posta girin.");
            return;
          }
          setMesgul(true);
          setHata(null);
          leadGonderApi(iletisim.trim(), kaynak)
            .then(() => {
              leadKaydet();
              onAcildi?.();
            })
            .catch((h) => setHata(h instanceof Error ? h.message : "Gönderilemedi."))
            .finally(() => setMesgul(false));
        }}
      >
        <input
          value={iletisim}
          onChange={(e) => setIletisim(e.target.value)}
          placeholder="Telefon veya e-posta"
          aria-label="İletişim bilgisi"
          autoComplete="on"
          enterKeyHint="send"
          required
          disabled={mesgul}
        />
        <button className="gt-btn small" disabled={mesgul}>
          {mesgul ? "Gönderiliyor…" : "Sonuçları Gör"} <Ok className="i" />
        </button>
      </form>
      {hata && <span className="ek-hata">{hata}</span>}
    </>
  );
}

export default function LeadKilidi({
  kaynak,
  beklet = false,
  children,
}: {
  kaynak: string;
  /** true iken kilit hiç gösterilmez (ör. kullanıcı henüz araca dokunmadı) */
  beklet?: boolean;
  children: React.ReactNode;
}) {
  const [acik, setAcik] = useState(false);
  const [ertelendi, setErtelendi] = useState(false);
  const [tesekkur, setTesekkur] = useState(false);

  useEffect(() => {
    setAcik(leadVar());
    setErtelendi(window.sessionStorage.getItem(ERTELE_ANAHTAR) === "1");
    const dinle = () => setAcik(true);
    window.addEventListener("gd-lead", dinle);
    return () => window.removeEventListener("gd-lead", dinle);
  }, []);

  if (acik || beklet) {
    return (
      <>
        {tesekkur && <p className="kilit-tesekkur">Teşekkürler — sonuçlarınız açıldı.</p>}
        {children}
      </>
    );
  }

  if (ertelendi) {
    return (
      <>
        {children}
        <div className="kilit-hatirlatma">
          <span>Danışmanımız sonuçlarınızı sizinle değerlendirsin ister misiniz?</span>
          <LeadFormu kaynak={`${kaynak} (hatırlatma)`} />
        </div>
      </>
    );
  }

  return (
    <div className="kilit">
      <div className="kilit-icerik" aria-hidden="true">
        {children}
      </div>
      <div className="kilit-kart" role="group" aria-label="Sonuçları görmek için iletişim bırakın">
        <b>Sonuçlarınız hazır</b>
        <p>
          Size özel rakamları görmek ve gerekirse danışmanımızın size ulaşabilmesi için telefon
          ya da e-postanızı bırakın.
        </p>
        <LeadFormu kaynak={kaynak} onAcildi={() => setTesekkur(true)} />
        <span className="kilit-kvkk">
          Göndererek <a href="/gizlilik">KVKK aydınlatma metnini</a> kabul etmiş olursunuz.
          {" · "}
          <button
            type="button"
            className="fs-geri"
            onClick={() => {
              window.sessionStorage.setItem(ERTELE_ANAHTAR, "1");
              setErtelendi(true);
            }}
          >
            Daha sonra
          </button>
        </span>
      </div>
    </div>
  );
}
