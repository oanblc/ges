import type { Metadata } from "next";
import { Epilogue, JetBrains_Mono, Jost } from "next/font/google";
import "./globals.css";
import AsistanFab from "@/components/AsistanFab";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin", "latin-ext"],
  weight: "500",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gesdanismani.com"),
  title: {
    default: "GES Danışmanı — Türkiye'nin Güncel Mevzuatlı GES Danışmanlık Platformu",
    template: "%s | GES Danışmanı",
  },
  description:
    "Güneş enerjisi yatırımınızda tarafsız ve güncel rehberlik. Başvurudan mahsuplaşmaya, güncel mevzuata dayanan yapay zekâ destekli danışmanlık.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "GES Danışmanı",
    title: "GES Danışmanı — Güncel Mevzuatlı GES Danışmanlık Platformu",
    description:
      "Çatı güneş enerjisinde başvurudan mahsuplaşmaya güncel mevzuatlı rehberlik; hesaplar resmî EPDK tarifeleri ve EPİAŞ verileriyle.",
    images: [{ url: "/hero-solar.jpg", width: 1200, height: 630, alt: "Çatı güneş enerjisi santrali" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const kurulusSemasi = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GES Danışmanı",
  url: "https://gesdanismani.com",
  description:
    "Türkiye'de çatı güneş enerjisi (GES) süreçleri için güncel mevzuatlı danışmanlık platformu.",
  areaServed: "TR",
  knowsAbout: ["güneş enerjisi", "GES", "lisanssız elektrik üretimi", "mahsuplaşma", "EPDK tarifeleri"],
};

const siteSemasi = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GES Danışmanı",
  url: "https://gesdanismani.com",
  inLanguage: "tr-TR",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${epilogue.variable} ${jost.variable} ${jbMono.variable}`}>
      <body>
        {children}
        <AsistanFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(kurulusSemasi) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSemasi) }}
        />
      </body>
    </html>
  );
}
