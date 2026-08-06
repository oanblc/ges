/** Projeye özgü ince çizgili ikon seti (Lucide dili: stroke 1.5-1.7, yuvarlak uçlar). */

type P = { className?: string };
const I = ({ className = "i", children }: P & { children: React.ReactNode }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
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
