import Link from "next/link";
import CikisDugme from "./CikisDugme";

/** Panel kabuğu: sol ikon rayı + üst bar. (Esin: Altın Ekranı admin dili, GES paleti) */

const cizgi = { fill: "none", stroke: "currentColor", strokeWidth: 1.7,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IKONLAR: Record<string, React.ReactNode> = {
  bakis: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></svg>),
  talep: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 8.5 17.5 13 15 10.5" /></svg>),
  sohbet: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><path d="M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20.5l1.4-4.9A7.5 7.5 0 1 1 20 12.5z" /></svg>),
  onay: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6L18.5 5a2 2 0 0 0-1.8-1H7.3a2 2 0 0 0-1.8 1Z" /></svg>),
  destek: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><circle cx="12" cy="10" r="4" /><path d="M12 2v2M4.9 5.6l1.4 1.4M2 12h2M20 12h2M17.7 7l1.4-1.4M8 21h8M12 16v5" /></svg>),
  sss: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4M12 17.5v.5" /></svg>),
  denetim: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" /><path d="m9 12 2 2 4-4" /></svg>),
  ayar: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></svg>),
  site: (<svg width="18" height="18" viewBox="0 0 24 24" {...cizgi}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" /></svg>),
};

const SEKMELER: Array<[string, string, string]> = [
  ["/yonetim", "Genel Bakış", "bakis"],
  ["/yonetim/talepler", "Talepler", "talep"],
  ["/yonetim/sohbetler", "Sohbetler", "sohbet"],
  ["/yonetim/onay", "Onay Kutusu", "onay"],
  ["/yonetim/destekler", "Destekler", "destek"],
  ["/yonetim/sss", "SSS", "sss"],
  ["/yonetim/denetim", "Denetim", "denetim"],
  ["/yonetim/ayarlar", "Ayarlar", "ayar"],
];

export default function YonetimKabuk({
  aktif,
  children,
}: {
  aktif: string;
  children: React.ReactNode;
}) {
  const baslik = SEKMELER.find(([yol]) => aktif === yol || aktif.startsWith(yol + "/"))?.[1]
    ?? SEKMELER.find(([yol]) => yol === aktif)?.[1] ?? "Yönetim";
  return (
    <div className="yp-kok">
      <aside className="yp-rail">
        <Link href="/yonetim" className="yp-marka" aria-label="Yönetim ana sayfası">
          <span className="marka-panel kucuk" aria-hidden="true">
            <span className="marka-grid">
              {Array.from({ length: 9 }).map((_, i) => (<i key={i} />))}
            </span>
          </span>
        </Link>
        <nav className="yp-rail-nav" aria-label="Yönetim menüsü">
          {SEKMELER.map(([yol, ad, ikon]) => (
            <Link key={yol} href={yol}
              className={`yp-ric ${aktif === yol || aktif.startsWith(yol + "/") ? "on" : ""}`}
              title={ad} aria-label={ad}
              aria-current={aktif === yol ? "page" : undefined}>
              {IKONLAR[ikon]}
            </Link>
          ))}
        </nav>
        <span className="yp-rail-bosluk" />
        <Link href="/" className="yp-ric" title="Siteye dön" aria-label="Siteye dön">
          {IKONLAR.site}
        </Link>
        <CikisDugme />
      </aside>
      <div className="yp-govde">
        <header className="yp-tepe">
          <h3>{baslik}</h3>
          <div className="yp-tepe-sag">
            <span className="yp-avatar" aria-hidden="true">G</span>
            <span className="yp-kimlik"><b>Yönetici</b>gesdanismani.com</span>
          </div>
        </header>
        <main className="yp-icerik">{children}</main>
      </div>
    </div>
  );
}
