import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import UyeTalepleriPanel, { type UyeTalep } from "@/components/UyeTalepleriPanel";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Üye Talepleri — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function UyeTalepleri() {
  await yetkiKontrol();
  let talepler: UyeTalep[] = [];
  let hata = "";
  try {
    talepler = ((await servisIstek("/yonetim/uye-talepleri")) as { talepler: UyeTalep[] }).talepler;
  } catch {
    hata = "Asistan servisine ulaşılamadı.";
  }

  return (
    <YonetimKabuk aktif="/yonetim/uye-talepleri">
      <h1>Üye Talepleri</h1>
      <p className="yp-aciklama">
        Üyelerin panelden açtığı danışmanlık ve destek talepleri. Bir talebe tıklayıp yazışmayı
        görüntüleyebilir, cevap yazabilir ve durumunu değiştirebilirsiniz.
      </p>
      {hata && <p className="yp-hata">{hata}</p>}
      {!hata && <UyeTalepleriPanel talepler={talepler} />}
    </YonetimKabuk>
  );
}
