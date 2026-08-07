import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const kok = "https://gesdanismani.com";
  return [
    { url: kok, changeFrequency: "weekly", priority: 1 },
    { url: `${kok}/asistan`, changeFrequency: "weekly", priority: 0.9 },
  ];
}
