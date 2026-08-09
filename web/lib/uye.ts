import crypto from "crypto";
import { cookies } from "next/headers";

/** Üye oturumu: HMAC imzalı httpOnly çerez (gd_uye). */

export const UYE_CEREZ = "gd_uye";
const OMUR_MS = 30 * 24 * 60 * 60 * 1000;

const gizli = () => process.env.YONETIM_SIFRE || process.env.YONETIM_ANAHTAR || "";

export type Uye = { ad: string; eposta: string };

export function uyeJetonUret(uye: Uye): string {
  const govde = Buffer.from(
    JSON.stringify({ ...uye, son: Date.now() + OMUR_MS })
  ).toString("base64url");
  const imza = crypto.createHmac("sha256", gizli()).update(govde).digest("hex");
  return `${govde}.${imza}`;
}

export function uyeCoz(jeton?: string): Uye | null {
  if (!jeton || !gizli()) return null;
  const [govde, imza] = jeton.split(".");
  if (!govde || !imza) return null;
  const dogru = crypto.createHmac("sha256", gizli()).update(govde).digest("hex");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(imza), Buffer.from(dogru))) return null;
    const veri = JSON.parse(Buffer.from(govde, "base64url").toString());
    if (Date.now() > Number(veri.son)) return null;
    return { ad: String(veri.ad), eposta: String(veri.eposta) };
  } catch {
    return null;
  }
}

/** Sunucu sayfalarında üye oturumunu okur; yoksa null. */
export async function uyeOku(): Promise<Uye | null> {
  const depo = await cookies();
  return uyeCoz(depo.get(UYE_CEREZ)?.value);
}
