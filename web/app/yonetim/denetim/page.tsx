import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Denetim Raporları — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Sayfa = { yol: string; durum: string; sonKontrol: string | null; bulgular: string[] };

const ETIKET: Record<string, [string, string]> = {
  dogrulandi: ["Doğrulandı", "arandi"],
  uyari: ["Uyarı", "aranmadi"],
  bekliyor: ["Denetlenmedi", "kapandi"],
};

export default async function DenetimRaporlari() {
  await yetkiKontrol();
  let veri: { guncelleme?: string; sayfalar: Sayfa[] } | null = null;
  try {
    veri = (await servisIstek("/yonetim/denetim")) as { guncelleme?: string; sayfalar: Sayfa[] };
  } catch {
    /* uyarı aşağıda */
  }

  return (
    <YonetimKabuk aktif="/yonetim/denetim">
      <h1>Sayfa Denetimi</h1>
      <p className="yp-aciklama">
        Denetçi ajan, sitedeki görünür bilgileri bilgi tabanıyla haftada iki kez karşılaştırır.
        Son koşu: {veri?.guncelleme || "—"}.
      </p>
      {!veri ? (
        <p className="yp-hata">Denetim verisi okunamadı.</p>
      ) : (
        <div className="yp-tablo-kutu">
          <table>
            <thead>
              <tr>
                <th>Sayfa</th>
                <th>Durum</th>
                <th>Son kontrol</th>
                <th>Bulgular</th>
              </tr>
            </thead>
            <tbody>
              {veri.sayfalar.map((s) => {
                const [ad, sinif] = ETIKET[s.durum] || [s.durum, "kapandi"];
                return (
                  <tr key={s.yol} className={s.durum === "uyari" ? "bekliyor" : ""}>
                    <td>{s.yol}</td>
                    <td>
                      <span className={`yp-durum ${sinif}`}>{ad}</span>
                    </td>
                    <td>{s.sonKontrol || "—"}</td>
                    <td>
                      {s.bulgular.length === 0
                        ? "—"
                        : s.bulgular.map((b, i) => <p key={i} style={{ margin: "0 0 6px" }}>{b}</p>)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </YonetimKabuk>
  );
}
