import Link from "next/link";

/** Üyelere özel araçların yerinde gösterilen kilit kartı. */
export default function UyeKilit({ donus }: { donus: string }) {
  const q = `?donus=${encodeURIComponent(donus)}`;
  return (
    <div className="uye-kilit">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="kilit-ikon">
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="15.5" r="1.6" fill="currentColor" />
      </svg>
      <h2>Bu araç üyelere özeldir</h2>
      <p>
        Üyelik ücretsizdir ve birkaç saniye sürer. Üye olduğunuzda asistan dahil tüm
        araçları sınırsız kullanabilirsiniz.
      </p>
      <div className="kilit-dugmeler">
        <Link className="gt-btn" href={`/kayit${q}`}>
          Ücretsiz Kayıt Ol
        </Link>
        <Link className="gt-btn ikincil" href={`/giris${q}`}>
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}
