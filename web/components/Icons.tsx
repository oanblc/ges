/** Projeye özgü ince çizgili ikon seti (Lucide dili: stroke 1.5-1.7, yuvarlak uçlar). */

type P = { className?: string };
const I = ({ className = "i", children }: P & { children: React.ReactNode }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

export const Atac = (p: P) => (
  <I {...p}>
    <path d="M20.5 12.6l-7.8 7.8a5.6 5.6 0 0 1-7.9-7.9l8.5-8.5a3.7 3.7 0 0 1 5.2 5.2l-8.2 8.2a1.85 1.85 0 0 1-2.6-2.6l7.6-7.6" />
  </I>
);

export const Sun = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4" />
  </I>
);
export const SunDolu = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4" />
  </I>
);
export const Ok = (p: P) => (
  <I {...p}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </I>
);
export const OkGeri = (p: P) => (
  <I {...p}>
    <path d="M19 12H6M11 6l-6 6 6 6" />
  </I>
);
export const Ara = (p: P) => (
  <I {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </I>
);
export const Kalkan = (p: P) => (
  <I {...p}>
    <path d="M12 3 4 6v6c0 4.4 3.2 7.9 8 9 4.8-1.1 8-4.6 8-9V6z" />
    <path d="m9 12 2 2 4-4.5" />
  </I>
);
export const Saat = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </I>
);
export const Arti = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8M12 8v8" />
  </I>
);
export const Ev = (p: P) => (
  <I {...p}>
    <path d="m4 11 8-7 8 7" />
    <path d="M6 10v9h12v-9" />
    <path d="M10 19v-5h4v5" />
  </I>
);
export const Fabrika = (p: P) => (
  <I {...p}>
    <path d="M3 20h18" />
    <path d="M5 20V9h6v11M13 20V4h6v16" />
  </I>
);
export const Filiz = (p: P) => (
  <I {...p}>
    <path d="M12 21v-6M7 21v-3M17 21v-3" />
    <path d="M4 15c2.5-1.5 5-6 8-6s5.5 4.5 8 6" />
    <path d="M12 9V3" />
  </I>
);
export const Rota = (p: P) => (
  <I {...p}>
    <circle cx="5.5" cy="18.5" r="2.2" />
    <circle cx="18.5" cy="5.5" r="2.2" />
    <path d="M7.4 17.2c3.2-1.2 3-3.4 1.6-5-1.5-1.7-1.3-3.8 1.4-4.9 1.9-.8 4.3-.6 6-1.4" strokeDasharray="0.1 3.2" />
    <path d="m15.5 4.5 3-1 1 3" />
  </I>
);
export const SaatYenile = (p: P) => (
  <I {...p}>
    <path d="M20.4 13.5A8.5 8.5 0 1 1 12 3.5a8.6 8.6 0 0 1 6.5 3" />
    <path d="M18.9 2.8v3.7h-3.7" />
    <path d="M12 7.8V12l3.1 1.9" />
  </I>
);
export const Ayarlar = (p: P) => (
  <I {...p}>
    <path d="M5 4v16M12 4v16M19 4v16" />
    <rect x="3" y="8.6" width="4" height="3.6" rx="1.4" />
    <rect x="10" y="13.4" width="4" height="3.6" rx="1.4" />
    <rect x="17" y="6" width="4" height="3.6" rx="1.4" />
  </I>
);
export const EvBuyutec = (p: P) => (
  <I {...p}>
    <path d="m3.5 10.5 8-6.5 8 6.5" />
    <path d="M5.5 9.5V19h5" />
    <circle cx="15.5" cy="15.5" r="3.4" />
    <path d="m18 18 2.5 2.5" />
  </I>
);
export const Dosya = (p: P) => (
  <I {...p}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 16.5h6M9 9.5h2" />
  </I>
);
export const Zarf = (p: P) => (
  <I {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.8 6.5 8.2 6.5 8.2-6.5" />
  </I>
);
export const DosyaOnay = (p: P) => (
  <I {...p}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v5h5" />
    <circle cx="12" cy="14" r="3.2" />
    <path d="m10.7 14.1 1 1 1.7-1.9" />
  </I>
);
export const PanelMontaj = (p: P) => (
  <I {...p}>
    <rect x="3.5" y="5" width="13" height="9" rx="1.4" />
    <path d="M8 5v9M12.5 5v9M3.5 9.5h13" />
    <path d="M10 14v3.5M6.5 20.5h7" />
    <path d="m17.5 16.5 3-3M19 12l2 2-4.5 4.5-2-2z" />
  </I>
);
export const SayacOnay = (p: P) => (
  <I {...p}>
    <path d="M4.5 14a7.5 7.5 0 0 1 15 0" />
    <path d="M12 14l3.2-3.8" />
    <circle cx="12" cy="14" r="1.3" />
    <path d="M4.5 17.5h15" />
    <path d="m9.3 20.5 1.8 1.4 3.6-3.4" strokeWidth="1.4" />
  </I>
);
export const GunesUfuk = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="11" r="3.6" />
    <path d="M12 3.5v2M12 16.5v2M4.5 11h2M17.5 11h2M6.7 5.7 8 7M16 15l1.3 1.3M6.7 16.3 8 15M16 7l1.3-1.3" />
    <path d="M4 21.5h16" strokeDasharray="2.5 2.5" />
  </I>
);
export const Sohbet = (p: P) => (
  <I {...p}>
    <path d="M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20.5l1.4-4.9A7.5 7.5 0 1 1 20 12.5z" />
    <path d="M8.8 12.5h.01M12.5 12.5h.01M16.2 12.5h.01" strokeWidth="2.4" />
  </I>
);
export const Grafik = (p: P) => (
  <I {...p}>
    <path d="M21 21H4.5A1.5 1.5 0 0 1 3 19.5V3" />
    <path d="m6.5 15 4-5 3.5 3 4.5-6" />
  </I>
);
export const Soru = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.4 9.2a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.4-2.6 2.4M12 16.2h.01" />
  </I>
);
export const Kullanici = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
  </I>
);
export const Pano = (p: P) => (
  <I {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </I>
);
export const Takvim = (p: P) => (
  <I {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 2v4M16 2v4M3 10h18" />
  </I>
);
export const Hedef = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <path d="M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M14.9 9.1l4.2-4.2M4.9 19.1l4.2-4.2" />
  </I>
);
export const Simsek = (p: P) => (
  <I {...p}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
  </I>
);
export const Kilit = (p: P) => (
  <I {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </I>
);
export const Zil = (p: P) => (
  <I {...p}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </I>
);
export const Bilgi = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v5M12 16.5v.5" />
  </I>
);
export const Cikis = (p: P) => (
  <I {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </I>
);
export const Cop = (p: P) => (
  <I {...p}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
  </I>
);
export const ArtiYalin = (p: P) => (
  <I {...p}>
    <path d="M12 5v14M5 12h14" />
  </I>
);
export const Gonder = (p: P) => (
  <I {...p}>
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </I>
);
