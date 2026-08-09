import type { Metadata } from "next";
import Link from "next/link";
import YonetimKabuk from "@/components/YonetimKabuk";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Talepler — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Talep = {
  id: string;
  zaman: string;
  iletisim: string;
  durum: string;
  tip: string | null;
  il: string | null;
  sicaklik: string | null;
};

const DURUM_ETIKET: Record<string, string> = {
  aranmadi: "Aranmadı",
  arandi: "Arandı",
  kapandi: "Kapandı",
};

export default async function Talepler() {
  await yetkiKontrol();
  let talepler: Talep[] = [];
  let hata = "";
  try {
    talepler = ((await servisIstek("/yonetim/talepler")) as { talepler: Talep[] }).talepler;
  } catch {
    hata = "Asistan servisine ulaşılamadı.";
  }

  return (
    <YonetimKabuk aktif="/yonetim/talepler">
      <h1>Danışmanlık Talepleri</h1>
      {hata && <p className="yp-hata">{hata}</p>}
      {!hata && talepler.length === 0 && (
        <p>Henüz kayıtlı talep yok. Talepler, ziyaretçi asistanda iletişim bıraktığında burada listelenir.</p>
      )}
      {talepler.length > 0 && (
        <div className="yp-tablo-kutu">
          <table>
            <thead>
              <tr>
                <th>Zaman</th>
                <th>İletişim</th>
                <th>Profil</th>
                <th>Durum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {talepler.map((t) => (
                <tr key={t.id} className={t.durum === "aranmadi" ? "bekliyor" : ""}>
                  <td>{t.zaman.replace("T", " ").slice(0, 16)}</td>
                  <td>{t.iletisim || "—"}</td>
                  <td>
                    {[t.tip, t.il, t.sicaklik ? `ilgi: ${t.sicaklik}` : null]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </td>
                  <td>
                    <span className={`yp-durum ${t.durum}`}>{DURUM_ETIKET[t.durum] || t.durum}</span>
                  </td>
                  <td>
                    <Link href={`/yonetim/talepler/${t.id}`}>İncele</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </YonetimKabuk>
  );
}
