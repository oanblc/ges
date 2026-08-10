import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import UyelerPanel from "@/components/UyelerPanel";
import { yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Üyeler — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function UyelerYonetim() {
  await yetkiKontrol();
  return (
    <YonetimKabuk aktif="/yonetim/uyeler">
      <h1>Üyeler ve Aktivite</h1>
      <p className="yp-aciklama">
        Kayıtlı üyeler, giriş bilgileri ve site içi aktiviteleri (asistan, analizler, talepler).
        Bir üyeye tıklayınca sağdaki akış yalnız onun hareketlerini gösterir. Aktivite kaydı bu
        özelliğin devreye girdiği andan itibaren birikir.
      </p>
      <UyelerPanel />
    </YonetimKabuk>
  );
}
