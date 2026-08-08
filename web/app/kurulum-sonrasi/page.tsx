import type { Metadata } from "next";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import { Ayarlar, Grafik, Kalkan, Ok, SaatYenile, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Kurulum Sonrası — Fatura Kontrolü, Bakım, Arıza ve Garanti",
  description:
    "GES devreye girdikten sonra: mahsup kontrolü, performans takibi, temizlik-bakım takvimi, arıza teşhis ağacı ve garanti hakları.",
  alternates: { canonical: "/kurulum-sonrasi" },
};

/** İçerik kb/kurulum-bakim.md, kb/teknik-ariza-teshis.md, kb/teknik-izleme-akilli.md özetlerinden. */
export default function KurulumSonrasi() {
  return (
    <div className="wrap">
      <SiteHead aktif="kurulum" />

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Kurulum Sonrası
        </span>
        <h1>
          İşletme dönemi: <span className="hl-g">takip, bakım ve garanti</span>
        </h1>
        <p>
          Sistem devreye girdikten sonra düzenli dört iş kalır: faturayı doğrulamak, üretimi
          izlemek, temizliği aksatmamak ve arızada doğru sırayla hareket etmek.
        </p>
      </div>

      <div className="calc-grid">
        <section className="tool" aria-labelledby="ksFatura">
          <h2 id="ksFatura">
            <Grafik className="i" /> Fatura ve Mahsup Kontrolü
          </h2>
          <div className="d-list">
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Uygulama BRÜT, fatura NET gösterir</b>
                <p>
                  İzleme uygulamasındaki üretim ile faturadaki mahsup aynı sayı değildir:
                  anında kendi tükettiğiniz enerji faturada hiç görünmez. &ldquo;Üretim var,
                  mahsup yok&rdquo; şikâyetlerinin çoğunun açıklaması budur.
                </p>
              </div>
            </div>
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Fatura sıfırlanmaz, %70-90 azalır</b>
                <p>
                  Dağıtım bedeli ve vergiler her durumda ödenir. İlk faturada çift yönlü
                  sayacın verdiği/çektiği enerji satırlarını ve mahsup kalemini kontrol edin.
                </p>
              </div>
            </div>
            <div className="d-item d-sart">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Mahsup azaldıysa önce rejimi kontrol edin</b>
                <p>
                  İşletmelerde 1 Mayıs 2026 sonrası &ldquo;mahsubum düştü&rdquo;nün başlıca
                  nedeni saatlik mahsuplaşmaya geçiştir; sayaç parametresi ve kabul ayarları
                  ikinci şüphelidir.
                </p>
              </div>
            </div>
          </div>
          <div className="tool-cta">
            <a
              className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent("GES sonrası faturamı analiz eder misin? Kalemleri paylaşacağım.")}`}
            >
              Faturanızı Analiz Ettirin <Ok className="i" />
            </a>
          </div>
        </section>

        <section className="tool" aria-labelledby="ksIzleme">
          <h2 id="ksIzleme">
            <SaatYenile className="i" /> Performans Takibi
          </h2>
          <div className="d-list">
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Ölçüt: kWh/kWp (özgül üretim)</b>
                <p>
                  Türkiye'de yıllık 1.300-1.700 kWh/kWp normaldir. Komşuyla kıyas da toplam
                  kWh ile değil kWh/kWp ile yapılır.
                </p>
              </div>
            </div>
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Kışın düşüş normaldir</b>
                <p>
                  Kış ayları yaza göre %25-50 düşük üretir. Doğru kıyas geçen yılın aynı
                  ayıyladır; herkes düşükse neden havadır.
                </p>
              </div>
            </div>
            <div className="d-item d-sart">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Yıllık %0,3-0,5 üzeri düşüş arızadır</b>
                <p>
                  Panel yaşlanması yılda en fazla binde 3-5'tir. Daha hızlı düşüşte sıra:
                  hava → kirlilik → yeni gölge → string kıyası → termal + IV testi.
                </p>
              </div>
            </div>
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Garanti taahhüdünü veriyle belgeleyin</b>
                <p>
                  Sözleşmenizde yıllık kWh/PR taahhüdü varsa izleme verisi + ışınım
                  düzeltmesiyle belgeleyip kurulumcuya yazılı bildirin.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="tool" aria-labelledby="ksBakim">
          <h2 id="ksBakim">
            <Ayarlar className="i" /> Temizlik ve Bakım
          </h2>
          <div className="d-list">
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Yılda 1-2 temizlik — yağmur yetmez</b>
                <p>
                  Yapışkan kir, polen ve kuş pisliği yağmurla çıkmaz; kirlilik %5-15 üretim
                  kaybettirir (tozlu bölgede %25+). Saf su ve yumuşak ekipman kullanın;
                  deterjan/sirke kaplamayı bozar, panel sıcakken yıkanmaz.
                </p>
              </div>
            </div>
            <div className="d-item d-sart">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Kuş pisliği en zararlı kirdir, kar kendiliğinden kayar</b>
                <p>
                  Nokta kirlenme hot-spot yapar, görünce temizletin. Karı kazımayın — 1-2
                  günde kayar; kazıma mikro çatlak riskidir.
                </p>
              </div>
            </div>
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Yıllık işletme gideri: yatırımın ~%1-2'si</b>
                <p>
                  Planlama varsayımı olarak bütçeleyin; sistem ömründeki en büyük kalem 1-2
                  inverter değişimidir (garanti tipik 5-10 yıl).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="tool" aria-labelledby="ksAriza">
          <h2 id="ksAriza">
            <Kalkan className="i" /> Arıza ve Garanti
          </h2>
          <div className="d-list">
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Üretim sıfırsa: 30 saniyelik ilk kontrol</b>
                <p>
                  Sıra: inverter ekran/LED → AC sigortayı kapat-aç (en sık çözüm) → şebeke
                  var mı → AC/DC ayırıcı konumu → hata koduyla servis. Fan/sıcaklık
                  hataları soğuyunca kendiliğinden düzelir.
                </p>
              </div>
            </div>
            <div className="d-item d-yok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>AFCI/ark hatasını asla resetleyip geçmeyin</b>
                <p>
                  Ark hatası yangın riskidir, kesin servis işidir. DC tarafının tamamı
                  (string, konnektör, panel sökme) kullanıcı işi değildir — string güneşliyken
                  600-1500 V taşır.
                </p>
              </div>
            </div>
            <div className="d-item d-ok">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Garanti yapısını bilin</b>
                <p>
                  Panelde ürün garantisi markaya göre 10-15 yıl (malzeme/işçilik; yaygın bant
                  12-15), performans garantisi 25-30 yıl lineerdir. İnverter garantisi string
                  modellerde 5-10 yıldır ve ek ücretle uzatılabilir; mikro inverterde 12 yılın
                  üzerine çıkar. Kurulumcu iflas etse bile panel/inverter garantisi üreticide
                  sürer — belgeleri ve seri numaralarını saklayın.
                </p>
              </div>
            </div>
            <div className="d-item d-sart">
              <span className="dot" aria-hidden="true" />
              <div>
                <b>Hasarda 5 iş günü içinde sigorta ihbarı</b>
                <p>
                  Fırtına/dolu hasarında süreyi kaçırmayın; eksper ataması artık otomatik ve
                  bağımsızdır. Bataryalı sistemi sigortacıya yazılı bildirmemek ret
                  gerekçesidir.
                </p>
              </div>
            </div>
          </div>
          <div className="tool-cta">
            <a
              className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent("GES'imde arıza var sanırım, teşhis için yardım eder misin?")}`}
            >
              Arıza Teşhisi Yaptırın <Ok className="i" />
            </a>
            <p>Servise gitmeden önce: hata kodu fotoğrafı, üretim grafiği ve geçen yıl kıyası hazırlayın.</p>
          </div>
        </section>
      </div>

      <SiteFoot yol="/kurulum-sonrasi" />
    </div>
  );
}
