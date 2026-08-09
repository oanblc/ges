import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import AyarlarForm from "@/components/AyarlarForm";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Ayarlar — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Ayarlar = {
  saat_limit: number;
  gunluk_sohbet: number;
  gunluk_lead: number;
  bakim: boolean;
  varsayilanlar: Record<string, number>;
};

export default async function AyarlarSayfa() {
  await yetkiKontrol();
  let ayarlar: Ayarlar | null = null;
  try {
    ayarlar = (await servisIstek("/yonetim/ayarlar")) as Ayarlar;
  } catch {
    /* uyarı aşağıda */
  }

  return (
    <YonetimKabuk aktif="/yonetim/ayarlar">
      <h1>Ayarlar</h1>
      <p className="yp-aciklama">
        Değerler kalıcı diske yazılır ve deploy gerektirmeden anında geçerli olur. Env
        varsayılanları: saatlik {ayarlar?.varsayilanlar.saat_limit}, sohbet{" "}
        {ayarlar?.varsayilanlar.gunluk_sohbet}, talep {ayarlar?.varsayilanlar.gunluk_lead}.
      </p>
      {!ayarlar ? (
        <p className="yp-hata">Ayarlar okunamadı — asistan servisine ulaşılamıyor.</p>
      ) : (
        <AyarlarForm
          ilk={{
            saat_limit: ayarlar.saat_limit,
            gunluk_sohbet: ayarlar.gunluk_sohbet,
            gunluk_lead: ayarlar.gunluk_lead,
            bakim: ayarlar.bakim,
          }}
        />
      )}
    </YonetimKabuk>
  );
}
