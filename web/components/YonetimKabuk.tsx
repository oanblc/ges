import Link from "next/link";
import CikisDugme from "./CikisDugme";
import Marka from "./Marka";

const SEKMELER: Array<[string, string]> = [
  ["/yonetim", "Genel Bakış"],
  ["/yonetim/talepler", "Talepler"],
  ["/yonetim/sohbetler", "Sohbetler"],
  ["/yonetim/onay", "Onay Kutusu"],
  ["/yonetim/destekler", "Destekler"],
  ["/yonetim/sss", "SSS"],
  ["/yonetim/denetim", "Denetim"],
  ["/yonetim/ayarlar", "Ayarlar"],
];

export default function YonetimKabuk({
  aktif,
  children,
}: {
  aktif: string;
  children: React.ReactNode;
}) {
  return (
    <div className="yp-wrap">
      <header className="yp-ust">
        <Link href="/" className="brand">
          <Marka />
        </Link>
        <span className="yp-rozet">Yönetim</span>
        <nav className="yp-sekmeler" aria-label="Yönetim menüsü">
          {SEKMELER.map(([yol, ad]) => (
            <Link key={yol} href={yol} className={aktif === yol ? "on" : ""}
              aria-current={aktif === yol ? "page" : undefined}>
              {ad}
            </Link>
          ))}
        </nav>
        <span className="yp-sag">
          <Link href="/" className="yp-cik">Siteye dön</Link>
          <CikisDugme />
        </span>
      </header>
      <main className="yp-icerik">{children}</main>
    </div>
  );
}
