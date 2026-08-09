import type { Metadata } from "next";
import Link from "next/link";
import YonetimKabuk from "@/components/YonetimKabuk";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Sohbet Kayıtları — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Sohbet = {
  zaman: string;
  durum: string;
  ekli: boolean;
  sure_sn: number;
  soru: string;
  cevap: string;
};

const DURUMLAR: Array<[string, string]> = [
  ["", "Tümü"],
  ["onay", "Onaylı"],
  ["onay-revize", "Revizeli onay"],
  ["guvenli-yanit", "Güvenli yanıt"],
  ["hata", "Hata"],
  ["kapi", "Karşılama"],
];

const ETIKET = Object.fromEntries(DURUMLAR.filter(([d]) => d));

export default async function Sohbetler({
  searchParams,
}: {
  searchParams: Promise<{ durum?: string }>;
}) {
  await yetkiKontrol();
  const { durum = "" } = await searchParams;
  let sohbetler: Sohbet[] = [];
  let hata = "";
  try {
    sohbetler = ((await servisIstek("/yonetim/sohbetler")) as { sohbetler: Sohbet[] }).sohbetler;
  } catch {
    hata = "Asistan servisine ulaşılamadı.";
  }
  const sayilar: Record<string, number> = {};
  for (const s of sohbetler) sayilar[s.durum] = (sayilar[s.durum] || 0) + 1;
  const liste = durum ? sohbetler.filter((s) => s.durum === durum) : sohbetler;

  return (
    <YonetimKabuk aktif="/yonetim/sohbetler">
      <h1>Sohbet Kayıtları</h1>
      {hata && <p className="yp-hata">{hata}</p>}
      {!hata && (
        <>
          <div className="yp-filtreler">
            {DURUMLAR.map(([deger, ad]) => (
              <Link
                key={deger}
                href={deger ? `/yonetim/sohbetler?durum=${deger}` : "/yonetim/sohbetler"}
                className={durum === deger ? "on" : ""}
              >
                {ad}
                {deger ? ` (${sayilar[deger] || 0})` : ` (${sohbetler.length})`}
              </Link>
            ))}
          </div>
          {liste.length === 0 && (
            <p>Kayıt yok. Sohbetler bu sayfada, en yenisi üstte listelenir (son 14 gün).</p>
          )}
          <div className="yp-sohbet">
            {liste.map((s, i) => (
              <details key={i} className={`yp-kayit ${s.durum}`}>
                <summary>
                  <span className={`yp-durum ${s.durum === "onay" || s.durum === "onay-revize" ? "arandi" : s.durum === "kapi" ? "kapandi" : "aranmadi"}`}>
                    {ETIKET[s.durum] || s.durum}
                  </span>
                  <span className="yp-kayit-soru">{s.soru || "(görsel/PDF ile soru)"}</span>
                  <span className="yp-kayit-zaman">
                    {s.zaman.replace("T", " ").slice(5, 16)} · {s.sure_sn}sn{s.ekli ? " · ekli" : ""}
                  </span>
                </summary>
                <p>{s.cevap || "(cevap kaydı yok)"}</p>
              </details>
            ))}
          </div>
        </>
      )}
    </YonetimKabuk>
  );
}
