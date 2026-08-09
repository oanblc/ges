import { NextRequest, NextResponse } from "next/server";
import { CEREZ_ADI, jetonGecerli, servisIstek } from "@/lib/yonetim";

export async function POST(istek: NextRequest) {
  if (!jetonGecerli(istek.cookies.get(CEREZ_ADI)?.value)) {
    return NextResponse.json({ hata: "yetkisiz" }, { status: 401 });
  }
  let govde: { id?: string; durum?: string };
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }
  try {
    const sonuc = await servisIstek("/yonetim/talep-durum", {
      method: "POST",
      body: JSON.stringify({ id: govde.id, durum: govde.durum }),
    });
    return NextResponse.json(sonuc);
  } catch {
    return NextResponse.json({ hata: "Servise ulaşılamadı." }, { status: 502 });
  }
}
