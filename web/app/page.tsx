import Journey from "@/components/Journey";
import Roi from "@/components/Roi";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import {
  SunDolu, Ok, Ara, Kalkan, Saat, Arti, Atac, Ev, Fabrika, Filiz,
  Rota, SaatYenile, Ayarlar,
} from "@/components/Icons";

export default function Anasayfa() {
  return (
    <div className="wrap">
      <SiteHead aktif="anasayfa" />
      <main id="icerik">

      <section className="hero">
        <div className="hero-inner">
          <span className="sub-title on-dark">
            <SunDolu />
            Türkiye&apos;nin Güncel Mevzuatlı GES Danışmanlık Platformu
          </span>
          <h1>
            Güneş enerjisi yatırımınızda
            <br />
            <span className="hl-y">güvenilir</span> rehberlik.
          </h1>
          <p className="lead">
            Fizibiliteden başvuruya, kurulumdan mahsuplaşmaya — sürecin her aşamasında
            güncel mevzuata dayanan danışmanlık. Teknik bilgi gerektirmez; elektrik
            faturanız yeterli.
          </p>

          <form className="ask" action="/asistan" method="get">
            <Ara className="i" />
            <input
              name="soru"
              placeholder="Sorunuzu kendi cümlelerinizle yazın…"
              aria-label="Asistana soru"
            />
            <button className="send" aria-label="Gönder">
              <Ok className="i" />
            </button>
          </form>
          <div className="chips">
            {["Evim güneş enerjisine uygun mu?", "Saatlik mahsuplaşma nedir?",
              "Hangi desteklerden yararlanabilirim?"].map((s) => (
              <a key={s} className="chip" href={`/asistan?soru=${encodeURIComponent(s)}`}>
                {s}
              </a>
            ))}
          </div>
          <a className="hero-fatura" href="/fatura-analizi">
            <Atac className="i" />
            <span>
              <b>Faturanızı yükleyin, GES planınız çıksın</b> — maliyet, satış geliri ve geri
              ödeme tek ekranda
            </span>
            <Ok className="i" />
          </a>
          <div className="trust">
            <span>
              <Kalkan className="i" /> Kaynak gösterilen yanıtlar
            </span>
            <span>
              <Saat className="i" /> Mevzuat güncelliği:{" "}
              <span className="mono">{META.kbGuncelleme}</span>
            </span>
            <span>
              <Arti className="i" /> Ücretsiz kullanım
            </span>
          </div>
        </div>
      </section>

      <section className="personas">
        <div className="pcard">
          <span className="ic">
            <Ev />
          </span>
          <b>Konut Sahipleri</b>
          <p>
            Çatı uygunluğu, yatırım geri dönüşü ve apartmanlarda kat maliki süreçleri dahil uçtan
            uca yönlendirme.
          </p>
          <a className="more" href={`/asistan?soru=${encodeURIComponent("Evime güneş paneli kurmak mantıklı mı?")}`}>
            Detaylı bilgi <Ok className="i" />
          </a>
        </div>
        <div className="pcard">
          <span className="ic">
            <Fabrika />
          </span>
          <b>İşletmeler</b>
          <p>
            Fabrika ve ticari çatılarda fizibilite analizi, KOSGEB destekleri ve ihale
            süreçlerinde danışmanlık.
          </p>
          <a className="more" href={`/asistan?soru=${encodeURIComponent("İşletmem için GES fizibilitesi yapar mısın?")}`}>
            Detaylı bilgi <Ok className="i" />
          </a>
        </div>
        <div className="pcard">
          <span className="ic">
            <Filiz />
          </span>
          <b>Tarımsal Üreticiler</b>
          <p>
            Sulama amaçlı GES yatırımları, IPARD ve TKDK hibe programları ile tarımsal tarife
            uygulamaları.
          </p>
          <a className="more" href={`/asistan?soru=${encodeURIComponent("Tarımsal sulama için GES kurabilir miyim?")}`}>
            Detaylı bilgi <Ok className="i" />
          </a>
        </div>
      </section>

      <section className="counters">
        <div>
          <span className="cic">
            <Rota />
          </span>
          <div className="v">7 aşama</div>
          <div className="k">İnteraktif süreç haritası</div>
        </div>
        <div>
          <span className="cic">
            <SaatYenile />
          </span>
          <div className="v">Güncel</div>
          <div className="k">Saatlik mahsuplaşma dönemine uygun analiz</div>
        </div>
        <div>
          <span className="cic">
            <Ayarlar />
          </span>
          <div className="v">4 araç</div>
          <div className="k">Maliyet · Getiri · Batarya · Fatura analizi</div>
        </div>
        <div>
          <span className="cic">
            <Kalkan />
          </span>
          <div className="v">₺0</div>
          <div className="k">Danışma ve hesaplama araçları ücretsiz</div>
        </div>
      </section>

      <Journey />

      <section className="how" id="hesaplama">
        <Roi />
        <div>
          <span className="sub-title">
            <SunDolu />
            Nasıl çalışır
          </span>
          <h2>
            Platformu <span className="hl-g">dört adımda</span> kullanın
          </h2>
          <p className="desc">
            Projenize özel geri dönüş süresini soldaki araçla anında görün; hesaplamalar resmî EPDK
            tarifeleri ve EPİAŞ gerçekleşen piyasa verileriyle yapılır.
          </p>
          <div className="steps-grid">
            <div className="step">
              <span className="num">1</span>
              <b>Sorunuzu Sorun</b>
              <p>Asistan, durumunuza uygun cevabı güncel mevzuata dayanarak verir.</p>
            </div>
            <div className="step">
              <span className="num">2</span>
              <b>Faturanızı Yükleyin</b>
              <p>Tüketiminiz okunur; size uygun güç, maliyet ve satış geliri hesaplanır.</p>
            </div>
            <div className="step">
              <span className="num">3</span>
              <b>Planınızı Netleştirin</b>
              <p>Destek uygunluğu, batarya kararı ve süreç adımlarını araçlarla görün.</p>
            </div>
            <div className="step">
              <span className="num">4</span>
              <b>Danışmanla İlerleyin</b>
              <p>Talep bırakın; teklif karşılaştırma ve süreç yönetiminde yanınızda olalım.</p>
            </div>
          </div>
          <div className="journey-foot">
            <a className="gt-btn small" href="/hesaplama">
              Tüm Hesaplama Araçları <Ok className="i" />
            </a>
            <p>Batarya boyutlandırma aracı da hesaplama sayfasında; destek uygunluğu Destekler sayfasında.</p>
          </div>
        </div>
      </section>

      </main>
      <SiteFoot yol="/" />
    </div>
  );
}
