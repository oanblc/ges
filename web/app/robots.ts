import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/yonetim", "/hesap", "/giris", "/kayit", "/sifremi-unuttum", "/sifre-sifirla", "/arama"] }],
    sitemap: "https://www.gesdanismani.com/sitemap.xml",
  };
}
