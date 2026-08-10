import type { Metadata } from "next";
import { redirect } from "next/navigation";
import HesapPanel from "@/components/HesapPanel";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { uyeOku } from "@/lib/uye";

export const metadata: Metadata = {
  title: "Hesabım — gesdanismani.com",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Hesap() {
  const uye = await uyeOku();
  if (!uye) redirect("/giris");

  return (
    <div className="wrap">
      <SiteHead aktif="diger" />
      <main id="icerik" className="uye-panel">
        <HesapPanel ad={uye.ad} eposta={uye.eposta} />
      </main>
      <SiteFoot notu="Üyelik bilgileri yalnızca hizmet için kullanılır; üçüncü kişilerle paylaşılmaz." />
    </div>
  );
}
