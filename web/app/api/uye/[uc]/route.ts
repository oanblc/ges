import { NextRequest, NextResponse } from "next/server";
import { UYE_CEREZ, uyeCoz, uyeJetonUret } from "@/lib/uye";

/** Üye paneli proxy'si: /api/uye/<uc> → asistan servisi /uye/<uc> (x-uye başlığıyla). */

const SERVIS = process.env.ASISTAN_SERVIS_URL ?? "http://127.0.0.1:8756";
const OKUMALAR = new Set(["ozet", "sohbetler", "talepler"]);
const YAZMALAR = new Set(["talep", "talep-yanit", "guncelle", "sifre-degistir", "tercih", "sil"]);

const uyeAl = (istek: NextRequest) => uyeCoz(istek.cookies.get(UYE_CEREZ)?.value);

export async function GET(
  istek: NextRequest,
  ctx: { params: Promise<{ uc: string }> }
) {
  const { uc } = await ctx.params;
  if (!OKUMALAR.has(uc)) {
    return NextResponse.json({ hata: "Geçersiz uç." }, { status: 404 });
  }
  const uye = uyeAl(istek);
  if (!uye) {
    return NextResponse.json(
      { hata: "Bu bölüm üyelere özeldir; lütfen giriş yapın." },
      { status: 401 }
    );
  }
  try {
    const res = await fetch(`${SERVIS}/uye/${uc}`, {
      cache: "no-store",
      headers: { "x-uye": uye.eposta },
    });
    const d = await res.json().catch(() => ({}));
    return NextResponse.json(d, { status: res.status });
  } catch {
    return NextResponse.json(
      { hata: "Şu an yüklenemedi; lütfen daha sonra yeniden deneyin." },
      { status: 503 }
    );
  }
}

export async function POST(
  istek: NextRequest,
  ctx: { params: Promise<{ uc: string }> }
) {
  const { uc } = await ctx.params;
  if (!YAZMALAR.has(uc)) {
    return NextResponse.json({ hata: "Geçersiz uç." }, { status: 404 });
  }
  const uye = uyeAl(istek);
  if (!uye) {
    return NextResponse.json(
      { hata: "Bu işlem üyelere özeldir; lütfen giriş yapın." },
      { status: 401 }
    );
  }
  let govde: Record<string, unknown>;
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }
  const ip =
    istek.headers.get("x-forwarded-for") ?? istek.headers.get("x-real-ip") ?? "yerel";
  try {
    const res = await fetch(`${SERVIS}/uye/${uc}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": ip,
        "x-uye": uye.eposta,
      },
      body: JSON.stringify(govde),
    });
    const d = await res.json().catch(() => ({}));
    const yanit = NextResponse.json(d, { status: res.status });
    if (res.ok && uc === "sil") {
      // hesap silindi — oturumu kapat
      yanit.cookies.set(UYE_CEREZ, "", { maxAge: 0, path: "/" });
    }
    if (res.ok && uc === "guncelle" && typeof govde.ad === "string" && govde.ad.trim()) {
      // ad değişti — çerezdeki kimliği tazele
      yanit.cookies.set(UYE_CEREZ, uyeJetonUret({ ad: govde.ad.trim(), eposta: uye.eposta }), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    }
    return yanit;
  } catch {
    return NextResponse.json(
      { hata: "İşlem şu an yapılamadı; lütfen daha sonra deneyin." },
      { status: 503 }
    );
  }
}
