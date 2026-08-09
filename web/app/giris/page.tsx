import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import UyeForm from "@/components/UyeForm";

export const metadata: Metadata = {
  title: "Giriş Yap — gesdanismani.com",
  robots: { index: false, follow: true },
};

export default function Giris() {
  return (
    <>
      <SiteHead aktif="diger" />
      <main id="icerik" className="uye-sayfa">
        <UyeForm tur="giris" />
      </main>
      <SiteFoot notu="Üyelik bilgileri yalnızca hizmet için kullanılır; üçüncü kişilerle paylaşılmaz." />
    </>
  );
}
