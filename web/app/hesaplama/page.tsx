import type { Metadata } from "next";
import Batarya from "@/components/Batarya";
import Maliyet from "@/components/Maliyet";
import Roi from "@/components/Roi";
import SiteHead from "@/components/SiteHead";
import { uyeOku } from "@/lib/uye";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import { Ayarlar, Grafik, Kalkan, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Hesaplama Araçları — Kurulum Maliyeti, Geri Ödeme ve Batarya",
  description:
    "GES kurulum maliyeti, yatırım geri dönüşü ve batarya boyutlandırma araçları. Maliyet bantları güncel piyasa tekliflerinden, tarifeler EPDK'dan alınır.",
  alternates: { canonical: "/hesaplama" },
};

export default async function Hesaplama() {
  const uye = await uyeOku();
  return (
    <div className="wrap">
      <SiteHead aktif="hesaplama" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Hesaplama Araçları
        </span>
        <h1>
          Maliyet, geri ödeme ve <span className="hl-g">batarya hesabı</span>
        </h1>
        <p>
          Maliyet bantları güncel piyasa tekliflerinden, tarifeler {META.tarifeGecerlilik}{" "}
          tarihli EPDK tablosundan alınır. Sonuçlar ön fizibilite niteliğindedir; kesin analiz
          için asistana taşıyabilirsiniz. Hibe ve kredi seçenekleri için{" "}
          <a href="/destekler">Destekler</a> sayfasına bakın.
        </p>
        <nav className="cip-nav" aria-label="Sayfa içi araçlar">
          <a href="#maliyet">Kurulum Maliyeti</a>
          <a href="#roi">Yatırım Getirisi</a>
          <a href="#batarya">Batarya</a>
          <a href="/fatura-analizi">Fatura Analizi ↗</a>
        </nav>
      </div>

      <div className="calc-grid">
        <a className="dk-cta" href="/fatura-analizi" style={{ gridColumn: "1/-1", margin: 0, textDecoration: "none", color: "inherit" }}>
          <Grafik className="i" />
          <div>
            <b>Yeni: Faturanızdan GES planınıza</b>
            <p>
              Faturanızın fotoğrafını yükleyin; tüketiminiz okunsun, maliyet + satış geliri +
              geri ödeme tek ekranda çıksın.
            </p>
          </div>
          <div className="dk-cta-btn">
            <span className="gt-btn small">Fatura Analizini Deneyin</span>
          </div>
        </a>

        <section className="tool genis" id="maliyet" aria-labelledby="maliyetBaslik">
          <h2 id="maliyetBaslik">
            <Kalkan className="i" /> Kurulum Maliyeti
          </h2>
          <p className="tanim">
            Ne kadar para gider? Bantlar 2026 piyasa tekliflerinden ve EPC fiyat listelerinden
            derlenmiştir; kesin rakam yerinde keşifle netleşir.
          </p>
          <Maliyet />
        </section>

        <section className="tool" id="roi" aria-labelledby="roiBaslik">
          <h2 id="roiBaslik">
            <Grafik className="i" /> Yatırım Getirisi
          </h2>
          <p className="tanim">
            Faturanız ve ilinize göre önerilen kapasite, tahmini yatırım ve geri ödeme süresi.
          </p>
          {uye && <Roi />}
        </section>

        <section className="tool" id="batarya" aria-labelledby="batBaslik">
          <h2 id="batBaslik">
            <Ayarlar className="i" /> Batarya Boyutlandırma
          </h2>
          <p className="tanim">
            GES'inize batarya eklemek mantıklı mı, kaç kWh gerekir? Konutta akşam tüketiminizden
            hesaplayın; işletmede sayaç profilinizle asistana hesaplatın.
          </p>
          {uye && <Batarya />}
        </section>
      </div>

      </main>
      <SiteFoot yol="/hesaplama" notu="Sonuçlar ön fizibilite niteliğindedir; bağlayıcı görüş değildir." />
    </div>
  );
}
