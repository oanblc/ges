import Link from "next/link";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { Ok, SunDolu } from "@/components/Icons";

export default function BulunamadiSayfasi() {
  return (
    <div className="wrap">
      <SiteHead aktif="diger" />
      <main id="icerik">
        <div className="calc-ust" style={{ paddingBottom: 56 }}>
          <span className="sub-title">
            <SunDolu />
            Sayfa bulunamadı
          </span>
          <h1>Aradığınız sayfa burada değil</h1>
          <p>
            Bağlantı değişmiş ya da yanlış yazılmış olabilir. Sorunuzu doğrudan asistana
            sorabilir veya ana sayfadan devam edebilirsiniz.
          </p>
          <div className="dk-cta-btn" style={{ marginTop: 18 }}>
            <Link className="gt-btn small line" href="/">
              Ana Sayfa
            </Link>
            <Link className="gt-btn small" href="/asistan">
              Asistana Sorun <Ok className="i" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFoot yol="/404" />
    </div>
  );
}
