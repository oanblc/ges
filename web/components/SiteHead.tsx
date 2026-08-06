import Link from "next/link";
import { Sun, Ok } from "./Icons";

export default function SiteHead({ aktif }: { aktif: "anasayfa" | "asistan" }) {
  return (
    <header className="site-head">
      <Link href="/" className="brand">
        <span className="sun">
          <Sun />
        </span>
        gesdanışmanı
      </Link>
      <nav className="nav">
        <Link className={aktif === "asistan" ? "on" : ""} href="/asistan">Asistan</Link>
        <a href="/#surec">Süreç Rehberi</a>
        <a href="/#hesaplama">Hesaplama</a>
        <a href="#">Rehber</a>
        <a href="#">Kurulum Sonrası</a>
      </nav>
      <Link className="gt-btn small" href="/asistan">
        Asistana Sorun <Ok className="i" />
      </Link>
    </header>
  );
}
