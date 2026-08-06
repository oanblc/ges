const SERVIS = process.env.ASISTAN_SERVIS_URL ?? "http://127.0.0.1:8756";

/** Python asistan servisine SSE proxy'si. Servis kapalıysa anlaşılır hata döner. */
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "yerel";
  let res: Response;
  try {
    res = await fetch(`${SERVIS}/sohbet`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
      body: await req.text(),
    });
  } catch {
    return Response.json(
      { hata: "Asistan servisi şu an çalışmıyor; lütfen daha sonra deneyin." },
      { status: 503 },
    );
  }
  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
