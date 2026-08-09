import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Genel Bakış — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Ozet = {
  gun: { gun: string; sohbet: number; lead: number };
  tavanlar: { sohbet: number; lead: number; saatlik: number };
  talep: { toplam: number; bekleyen: number };
  veriGuncellemeleri: Record<string, string | null>;
  taslak: { sayi: number; son: string[] };
};

const VERI_ADLARI: Record<string, string> = {
  piyasa: "EPİAŞ piyasa verisi",
  denetim: "Sayfa denetimi",
  destekler: "Destek listesi",
};

export default async function GenelBakis() {
  await yetkiKontrol();
  let ozet: Ozet | null = null;
  try {
    ozet = (await servisIstek("/yonetim/ozet")) as Ozet;
  } catch {
    /* servis kapalı — aşağıda uyarı gösterilir */
  }

  return (
    <YonetimKabuk aktif="/yonetim">
      <h1>Genel Bakış</h1>
      {!ozet ? (
        <p className="yp-hata">
          Asistan servisine ulaşılamadı — sayaçlar ve talepler görüntülenemiyor.
        </p>
      ) : (
        <>
          <div className="yp-kartlar">
            <div className="yp-kart">
              <b>{ozet.gun.sohbet}</b>
              <span>bugünkü sohbet</span>
              <small>tavan {ozet.tavanlar.sohbet}</small>
            </div>
            <div className="yp-kart">
              <b>{ozet.gun.lead}</b>
              <span>bugünkü talep</span>
              <small>tavan {ozet.tavanlar.lead}</small>
            </div>
            <div className="yp-kart vurgu">
              <b>{ozet.talep.bekleyen}</b>
              <span>aranmayı bekleyen talep</span>
              <small>toplam {ozet.talep.toplam} kayıt</small>
            </div>
            <div className="yp-kart">
              <b>{ozet.taslak.sayi}</b>
              <span>taslak rapor</span>
              <small>ajan çıktıları (kb/taslak)</small>
            </div>
          </div>

          <h2>Veri güncellemeleri</h2>
          <div className="yp-tablo-kutu">
            <table>
              <tbody>
                {Object.entries(ozet.veriGuncellemeleri).map(([anahtar, tarih]) => (
                  <tr key={anahtar}>
                    <td>{VERI_ADLARI[anahtar] || anahtar}</td>
                    <td>{tarih || "veri yok"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {ozet.taslak.son.length > 0 && (
            <>
              <h2>Son ajan raporları</h2>
              <ul className="yp-liste">
                {ozet.taslak.son.map((ad) => (
                  <li key={ad}>{ad}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </YonetimKabuk>
  );
}
