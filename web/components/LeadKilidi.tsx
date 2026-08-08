"use client";

import { useEffect, useState } from "react";
import { Ok } from "./Icons";

/**
 * Site geneli lead kilidi: hesap araçlarının sonuçları, iletişim bilgisi
 * bırakılana kadar bulanık gösterilir. Bir kez bırakan kullanıcı için tüm
 * kilitler kalıcı olarak açılır (localStorage).
 */

const ANAHTAR = "gd-lead";

export const leadVar = () =>
  typeof window !== "undefined" && window.localStorage.getItem(ANAHTAR) === "1";

export function leadKaydet() {
  window.localStorage.setItem(ANAHTAR, "1");
  window.dispatchEvent(new Event("gd-lead"));
}

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

export default function LeadKilidi({
  kaynak,
  children,
}: {
  kaynak: string;
  children: React.ReactNode;
}) {
  const [acik, setAcik] = useState(false);
  const [iletisim, setIletisim] = useState("");
  const [mesgul, setMesgul] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  useEffect(() => {
    setAcik(leadVar());
    const dinle = () => setAcik(true);
    window.addEventListener("gd-lead", dinle);
    return () => window.removeEventListener("gd-lead", dinle);
  }, []);

  if (acik) return <>{children}</>;

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
        <form
          className="as-lead-form"
          onSubmit={(e) => {
            e.preventDefault();
            setMesgul(true);
            setHata(null);
            leadGonderApi(iletisim, kaynak)
              .then(() => leadKaydet())
              .catch((h) => setHata(h instanceof Error ? h.message : "Gönderilemedi."))
              .finally(() => setMesgul(false));
          }}
        >
          <input
            value={iletisim}
            onChange={(e) => setIletisim(e.target.value)}
            placeholder="Telefon veya e-posta"
            aria-label="İletişim bilgisi"
            required
            disabled={mesgul}
          />
          <button className="gt-btn small" disabled={mesgul}>
            {mesgul ? "Gönderiliyor…" : "Sonuçları Gör"} <Ok className="i" />
          </button>
        </form>
        {hata && <span className="ek-hata">{hata}</span>}
        <span className="kilit-kvkk">
          Göndererek <a href="/gizlilik">KVKK aydınlatma metnini</a> kabul etmiş olursunuz.
        </span>
      </div>
    </div>
  );
}
