import { NextRequest, NextResponse } from "next/server";
import { CEREZ_ADI, jetonGecerli } from "@/lib/yonetim";

// Panelin istemci bileşenleri için tek POST köprüsü — yalnız izinli uçlara geçirir.
const IZINLI = new Set([
  "/yonetim/destek-durum",
  "/yonetim/sss-kaydet",
  "/yonetim/ayarlar",
  "/yonetim/talep-durum",
  "/yonetim/taslak-okundu",
  "/yonetim/eposta-tani",
]);

export async function POST(istek: NextRequest) {
  if (!jetonGecerli(istek.cookies.get(CEREZ_ADI)?.value)) {
    return NextResponse.json({ hata: "yetkisiz" }, { status: 401 });
  }
  let govde: { uc?: string; veri?: unknown };
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }
  const uc = String(govde.uc || "");
  if (!IZINLI.has(uc)) {
    return NextResponse.json({ hata: "Geçersiz uç." }, { status: 400 });
  }
  try {
    const res = await fetch(
      `${process.env.ASISTAN_SERVIS_URL || "http://127.0.0.1:8756"}${uc}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "x-yonetim-anahtar": process.env.YONETIM_ANAHTAR || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(govde.veri ?? {}),
      }
    );
    const d = await res.json().catch(() => ({}));
    return NextResponse.json(d, { status: res.status });
  } catch {
    return NextResponse.json({ hata: "Servise ulaşılamadı." }, { status: 502 });
  }
}
