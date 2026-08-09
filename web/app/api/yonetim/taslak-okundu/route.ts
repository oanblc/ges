import { NextRequest, NextResponse } from "next/server";
import { CEREZ_ADI, jetonGecerli, servisIstek } from "@/lib/yonetim";

export async function POST(istek: NextRequest) {
  if (!jetonGecerli(istek.cookies.get(CEREZ_ADI)?.value)) {
    return NextResponse.json({ hata: "yetkisiz" }, { status: 401 });
  }
  let govde: { ad?: string; okundu?: boolean };
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }
  try {
    const sonuc = await servisIstek("/yonetim/taslak-okundu", {
      method: "POST",
      body: JSON.stringify({ ad: govde.ad, okundu: govde.okundu }),
    });
    return NextResponse.json(sonuc);
  } catch {
    return NextResponse.json({ hata: "Servise ulaşılamadı." }, { status: 502 });
  }
}
