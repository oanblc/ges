import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CEREZ = "gd_yonetim";
const OMUR_MS = 7 * 24 * 60 * 60 * 1000;

const sifre = () => process.env.YONETIM_SIFRE || "";

export function jetonUret(): string {
  const son = Date.now() + OMUR_MS;
  const imza = crypto.createHmac("sha256", sifre()).update(String(son)).digest("hex");
  return `${son}.${imza}`;
}

export function jetonGecerli(jeton?: string): boolean {
  if (!jeton || !sifre()) return false;
  const [son, imza] = jeton.split(".");
  if (!son || !imza || Date.now() > Number(son)) return false;
  const dogru = crypto.createHmac("sha256", sifre()).update(son).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(imza), Buffer.from(dogru));
  } catch {
    return false;
  }
}

export function sifreDogru(aday: string): boolean {
  const dogru = sifre();
  if (!dogru) return false;
  const a = crypto.createHash("sha256").update(aday).digest();
  const b = crypto.createHash("sha256").update(dogru).digest();
  return crypto.timingSafeEqual(a, b);
}

export const CEREZ_ADI = CEREZ;

/** Sunucu sayfalarında oturum kontrolü — geçersizse girişe yönlendirir. */
export async function yetkiKontrol(): Promise<void> {
  const depo = await cookies();
  if (!jetonGecerli(depo.get(CEREZ)?.value)) redirect("/yonetim/giris");
}

const SERVIS = process.env.ASISTAN_SERVIS_URL || "http://127.0.0.1:8756";

/** Asistan servisinin yönetim API'sine sunucu tarafından istek atar. */
export async function servisIstek(yol: string, secenekler: RequestInit = {}) {
  const res = await fetch(`${SERVIS}${yol}`, {
    ...secenekler,
    cache: "no-store",
    headers: {
      ...(secenekler.headers || {}),
      "x-yonetim-anahtar": process.env.YONETIM_ANAHTAR || "",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`servis ${res.status}`);
  return res.json();
}
