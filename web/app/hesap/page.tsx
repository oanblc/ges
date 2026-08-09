import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import UyeCikis from "@/components/UyeCikis";
import { uyeOku } from "@/lib/uye";

export const metadata: Metadata = {
  title: "Hesabım — gesdanismani.com",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ARACLAR: Array<[string, string, string]> = [
  ["/simulasyon", "Güneş Sahası Simülasyonu", "İlinize göre üretim, mahsup ve geri ödeme"],
  ["/fatura-analizi", "Fatura Analizi", "Faturanızdan GES planınıza"],
  ["/teklif-analizi", "Teklif Değerlendirme", "Elinizdeki teklif piyasaya uygun mu"],
  ["/police-analizi", "Poliçe Analizi", "GES sigortanız yeterli mi"],
  ["/asistan", "GES Asistanı", "Güncel mevzuatla soru-cevap"],
];

export default async function Hesap() {
  const uye = await uyeOku();
  if (!uye) redirect("/giris");

  return (
    <>
      <SiteHead aktif="diger" />
      <main id="icerik" className="uye-sayfa">
        <div className="uye-kutu genis">
          <h1>Merhaba, {uye.ad}</h1>
          <p className="uye-not">{uye.eposta}</p>
          <h2>Araçlarınız</h2>
          <div className="hesap-araclar">
            {ARACLAR.map(([yol, ad, aciklama]) => (
              <Link key={yol} href={yol} className="hesap-arac">
                <b>{ad}</b>
                <span>{aciklama}</span>
              </Link>
            ))}
          </div>
          <div className="uye-alt">
            <UyeCikis />
          </div>
        </div>
      </main>
      <SiteFoot notu="Üyelik bilgileri yalnızca hizmet için kullanılır; üçüncü kişilerle paylaşılmaz." />
    </>
  );
}
