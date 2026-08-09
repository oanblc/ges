import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const kok = "https://gesdanismani.com";
  return [
    { url: kok, changeFrequency: "weekly", priority: 1 },
    { url: `${kok}/asistan`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${kok}/hesaplama`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${kok}/fatura-analizi`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${kok}/teklif-analizi`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${kok}/simulasyon`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${kok}/destekler`, changeFrequency: "daily", priority: 0.8 },
    { url: `${kok}/mevzuat`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${kok}/surec`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${kok}/rehber`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${kok}/kurulum-sonrasi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${kok}/sss`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${kok}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${kok}/blog/saatlik-mahsuplasma-rehberi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${kok}/blog/faturadaki-devlet-destegi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${kok}/blog/arazi-ges-mi-cati-ges-mi`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${kok}/gizlilik`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
