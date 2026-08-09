import { NextResponse } from "next/server";
import { CEREZ_ADI } from "@/lib/yonetim";

export async function POST() {
  const yanit = NextResponse.json({ durum: "ok" });
  yanit.cookies.set(CEREZ_ADI, "", { httpOnly: true, path: "/", maxAge: 0 });
  return yanit;
}
