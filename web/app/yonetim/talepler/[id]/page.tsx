import type { Metadata } from "next";
import Link from "next/link";
import YonetimKabuk from "@/components/YonetimKabuk";
import TalepDurum from "@/components/TalepDurum";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Talep Detayı — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Mesaj = { role: string; content: unknown };
type Talep = {
  id: string;
  zaman: string;
  iletisim: string;
  durum: string;
  ozet: Record<string, unknown> | { hata: string };
  sohbet: Mesaj[];
};

const OZET_ETIKET: Record<string, string> = {
  tip: "Profil",
  il: "İl",
  aylik_fatura_tl: "Aylık fatura (TL)",
  niyet_asamasi: "Niyet aşaması",
  sicaklik: "İlgi düzeyi",
  onerilen_aksiyon: "Önerilen aksiyon",
  konusulan_konular: "Konuşulan konular",
};

function metinCikar(icerik: unknown): string {
  if (typeof icerik === "string") return icerik;
  if (Array.isArray(icerik)) {
    return icerik
      .map((b) => {
        if (b && typeof b === "object" && "type" in b) {
          if (b.type === "text") return String((b as { text?: string }).text || "");
          if (b.type === "image") return "[fatura görseli]";
          if (b.type === "document") return "[PDF eki]";
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

export default async function TalepDetay({ params }: { params: Promise<{ id: string }> }) {
  await yetkiKontrol();
  const { id } = await params;
  let talep: Talep | null = null;
  try {
    talep = (await servisIstek(`/yonetim/talep?id=${encodeURIComponent(id)}`)) as Talep;
  } catch {
    /* aşağıda uyarı */
  }

  return (
    <YonetimKabuk aktif="/yonetim/talepler">
      <p>
        <Link href="/yonetim/talepler">← Taleplere dön</Link>
      </p>
      {!talep ? (
        <p className="yp-hata">Talep bulunamadı ya da servise ulaşılamadı.</p>
      ) : (
        <>
          <div className="yp-detay-ust">
            <div>
              <h1>
                {talep.iletisim ? (
                  <a href={talep.iletisim.includes("@") ? `mailto:${talep.iletisim}` : `tel:${talep.iletisim.replace(/\s/g, "")}`}>
                    {talep.iletisim}
                  </a>
                ) : (
                  "İletişim bırakılmamış"
                )}
              </h1>
              <span className="yp-detay-zaman">{talep.zaman.replace("T", " ")}</span>
            </div>
            <TalepDurum id={talep.id} durum={talep.durum} />
          </div>

          {talep.ozet && !("hata" in talep.ozet) && (
            <>
              <h2>Asistan özeti</h2>
              <div className="yp-tablo-kutu">
                <table>
                  <tbody>
                    {Object.entries(OZET_ETIKET).map(([anahtar, etiket]) => {
                      const deger = (talep.ozet as Record<string, unknown>)[anahtar];
                      if (deger == null || deger === "") return null;
                      return (
                        <tr key={anahtar}>
                          <td>{etiket}</td>
                          <td>
                            {Array.isArray(deger)
                              ? deger.join(", ")
                              : typeof deger === "number"
                                ? deger.toLocaleString("tr-TR")
                                : String(deger)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <h2>Sohbet geçmişi</h2>
          <div className="yp-sohbet">
            {talep.sohbet.map((m, i) => {
              const metin = metinCikar(m.content);
              if (!metin) return null;
              return (
                <div key={i} className={`yp-mesaj ${m.role === "user" ? "ziyaretci" : "asistan"}`}>
                  <b>{m.role === "user" ? "Ziyaretçi" : "Asistan"}</b>
                  <p>{metin}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </YonetimKabuk>
  );
}
