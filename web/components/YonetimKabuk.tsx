import Link from "next/link";
import { Sun } from "./Icons";

const SEKMELER: Array<[string, string]> = [
  ["/yonetim", "Genel Bakış"],
  ["/yonetim/talepler", "Talepler"],
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
          <span className="sun">
            <Sun />
          </span>
          <span className="brand-yazi">
            gesdanismani<i>.com</i>
          </span>
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
        <Link href="/" className="yp-cik">Siteye dön</Link>
      </header>
      <main className="yp-icerik">{children}</main>
    </div>
  );
}
