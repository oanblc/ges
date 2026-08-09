import { NextRequest, NextResponse } from "next/server";
import { CEREZ_ADI, jetonUret, sifreDogru } from "@/lib/yonetim";

// Kaba kuvvete karşı basit bellek içi fren: IP başına dakikada 5 deneme
const denemeler = new Map<string, number[]>();

export async function POST(istek: NextRequest) {
  const ip = istek.headers.get("x-forwarded-for")?.split(",").pop()?.trim() || "?";
  const simdi = Date.now();
  const gecmis = (denemeler.get(ip) || []).filter((t) => simdi - t < 60_000);
  if (gecmis.length >= 5) {
    return NextResponse.json({ hata: "Çok fazla deneme; bir dakika bekleyin." }, { status: 429 });
  }
  gecmis.push(simdi);
  denemeler.set(ip, gecmis);

  let govde: { sifre?: string };
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }
  if (!sifreDogru(String(govde.sifre || ""))) {
    return NextResponse.json({ hata: "Şifre hatalı." }, { status: 401 });
  }
  const yanit = NextResponse.json({ durum: "ok" });
  yanit.cookies.set(CEREZ_ADI, jetonUret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return yanit;
}
