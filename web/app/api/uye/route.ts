import { NextRequest, NextResponse } from "next/server";
import { UYE_CEREZ, uyeJetonUret } from "@/lib/uye";

const SERVIS = process.env.ASISTAN_SERVIS_URL ?? "http://127.0.0.1:8756";
const ISLEMLER = new Set(["kayit", "giris", "cikis", "sifre-unut", "sifre-sifirla"]);

export async function POST(istek: NextRequest) {
  let govde: { islem?: string; veri?: unknown };
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }
  const islem = String(govde.islem || "");
  if (!ISLEMLER.has(islem)) {
    return NextResponse.json({ hata: "Geçersiz işlem." }, { status: 400 });
  }

  if (islem === "cikis") {
    const yanit = NextResponse.json({ durum: "ok" });
    yanit.cookies.set(UYE_CEREZ, "", { maxAge: 0, path: "/" });
    return yanit;
  }

  const ip =
    istek.headers.get("x-forwarded-for") ?? istek.headers.get("x-real-ip") ?? "yerel";
  let d: { durum?: string; ad?: string; eposta?: string; hata?: string };
  let kod: number;
  try {
    const res = await fetch(`${SERVIS}/uye/${islem}`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
      body: JSON.stringify(govde.veri ?? {}),
    });
    kod = res.status;
    d = await res.json().catch(() => ({}));
  } catch {
    return NextResponse.json(
      { hata: "İşlem şu an yapılamadı; lütfen daha sonra deneyin." },
      { status: 503 }
    );
  }

  const yanit = NextResponse.json(d, { status: kod });
  // kayıt, giriş ve şifre sıfırlama başarılıysa oturum aç
  if (kod === 200 && d.durum === "ok" && d.eposta && islem !== "sifre-unut") {
    yanit.cookies.set(UYE_CEREZ, uyeJetonUret({ ad: d.ad || "", eposta: d.eposta }), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }
  return yanit;
}
