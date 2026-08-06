const SERVIS = process.env.ASISTAN_SERVIS_URL ?? "http://127.0.0.1:8756";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "yerel";
  try {
    const res = await fetch(`${SERVIS}/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
      body: await req.text(),
    });
    return Response.json(await res.json(), { status: res.status });
  } catch {
    return Response.json(
      { hata: "Talep şu an kaydedilemedi; lütfen daha sonra deneyin." },
      { status: 503 },
    );
  }
}
