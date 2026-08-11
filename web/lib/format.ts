import { HANE_YILLIK_KWH } from "@/data/kb";

/**
 * Yıllık üretimi somutlaştıran çeviri: "≈ X hanenin yıllık tüketimi".
 * X = kwhYillik / HANE_YILLIK_KWH; 10'un altında 1 ondalık, üstünde yuvarlak.
 * 1 hanenin altındaysa gösterilmez (null döner).
 */
export function haneEsdegeri(kwhYillik: number): string | null {
  if (!Number.isFinite(kwhYillik) || kwhYillik <= 0) return null;
  const oran = kwhYillik / HANE_YILLIK_KWH;
  if (oran < 1) return null;
  const x =
    oran < 10
      ? oran.toLocaleString("tr-TR", { maximumFractionDigits: 1 })
      : Math.round(oran).toLocaleString("tr-TR");
  return `≈ ${x} hanenin yıllık tüketimi`;
}
