import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const kok = "https://gesdanismani.com";
  return [
    { url: kok, changeFrequency: "weekly", priority: 1 },
    { url: `${kok}/asistan`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${kok}/hesaplama`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${kok}/destekler`, changeFrequency: "daily", priority: 0.8 },
    { url: `${kok}/surec`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${kok}/rehber`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${kok}/kurulum-sonrasi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${kok}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${kok}/blog/saatlik-mahsuplasma-rehberi`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
