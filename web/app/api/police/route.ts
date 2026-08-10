import { cookies } from "next/headers";
import { uyeCoz } from "@/lib/uye";
const SERVIS = process.env.ASISTAN_SERVIS_URL ?? "http://127.0.0.1:8756";

/** Poliçe değerlendirme ucu — asistan servisine düz JSON proxy'si. */
export async function POST(req: Request) {
  const uyeDepo = await cookies();
  const uyeBilgi = uyeCoz(uyeDepo.get("gd_uye")?.value);
  if (!uyeBilgi) {
    return Response.json({ hata: "Bu araç üyelere özeldir; lütfen giriş yapın." }, { status: 401 });
  }
  const ip =
    req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "yerel";
  let res: Response;
  try {
    res = await fetch(`${SERVIS}/police-degerlendir`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip, "x-uye": uyeBilgi.eposta ?? "" },
      body: await req.text(),
    });
  } catch {
    return Response.json(
      { hata: "Değerlendirme servisi şu an çalışmıyor; lütfen daha sonra deneyin." },
      { status: 503 },
    );
  }
  return new Response(res.body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
