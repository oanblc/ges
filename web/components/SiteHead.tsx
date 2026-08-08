import Link from "next/link";
import { Sun, Ok } from "./Icons";

export default function SiteHead({
  aktif,
}: {
  aktif: "anasayfa" | "asistan" | "surec" | "hesaplama" | "destekler" | "rehber" | "kurulum" | "blog";
}) {
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
        <Link className={aktif === "surec" ? "on" : ""} href="/surec">Süreç Rehberi</Link>
        <Link className={aktif === "hesaplama" ? "on" : ""} href="/hesaplama">Hesaplama</Link>
        <Link className={aktif === "destekler" ? "on" : ""} href="/destekler">Destekler</Link>
        <Link className={aktif === "rehber" ? "on" : ""} href="/rehber">Rehber</Link>
        <Link className={aktif === "kurulum" ? "on" : ""} href="/kurulum-sonrasi">Kurulum Sonrası</Link>
        <Link className={aktif === "blog" ? "on" : ""} href="/blog">Blog</Link>
      </nav>
      <Link className="gt-btn small" href="/asistan">
        Asistana Sorun <Ok className="i" />
      </Link>
    </header>
  );
}
