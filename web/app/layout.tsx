import type { Metadata } from "next";
import { Epilogue, Jost } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "GES Danışmanı — Türkiye'nin Güncel Mevzuatlı GES Danışmanlık Platformu",
  description:
    "Güneş enerjisi yatırımınızda tarafsız ve güncel rehberlik. Başvurudan mahsuplaşmaya, güncel mevzuata dayanan yapay zekâ destekli danışmanlık.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${epilogue.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
