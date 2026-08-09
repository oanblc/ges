import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/yonetim"] }],
    sitemap: "https://www.gesdanismani.com/sitemap.xml",
  };
}
