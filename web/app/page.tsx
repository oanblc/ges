import Journey from "@/components/Journey";
import Roi from "@/components/Roi";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import {
  SunDolu, Ok, Ara, Kalkan, Saat, Arti, Atac, Ev, Fabrika, Filiz,
  Rota, SaatYenile, Ayarlar,
} from "@/components/Icons";
import { Aciklamali } from "@/components/Terim";

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
          <p className="lead"><Aciklamali>Fizibiliteden başvuruya, kurulumdan mahsuplaşmaya — sürecin her aşamasında
            güncel mevzuata dayanan danışmanlık. Teknik bilgi gerektirmez; elektrik
            faturanız yeterli.</Aciklamali></p>

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
          <p><Aciklamali>Çatı uygunluğu, yatırım geri dönüşü ve apartmanlarda kat maliki süreçleri dahil uçtan
            uca yönlendirme.</Aciklamali></p>
          <a className="more" href={`/asistan?soru=${encodeURIComponent("Evime güneş paneli kurmak mantıklı mı?")}`}>
            Detaylı bilgi <Ok className="i" />
          </a>
        </div>
        <div className="pcard">
          <span className="ic">
            <Fabrika />
          </span>
          <b>İşletmeler</b>
          <p><Aciklamali>Fabrika ve ticari çatılarda fizibilite analizi, KOSGEB destekleri ve ihale
            süreçlerinde danışmanlık.</Aciklamali></p>
          <a className="more" href={`/asistan?soru=${encodeURIComponent("İşletmem için GES fizibilitesi yapar mısın?")}`}>
            Detaylı bilgi <Ok className="i" />
          </a>
        </div>
        <div className="pcard">
          <span className="ic">
            <Filiz />
          </span>
          <b>Tarımsal Üreticiler</b>
          <p><Aciklamali>Sulama amaçlı GES yatırımları, IPARD ve TKDK hibe programları ile tarımsal tarife
            uygulamaları.</Aciklamali></p>
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
          <div className="k"><Aciklamali>İnteraktif süreç haritası</Aciklamali></div>
        </div>
        <div>
          <span className="cic">
            <SaatYenile />
          </span>
          <div className="v">Güncel</div>
          <div className="k"><Aciklamali>Saatlik mahsuplaşma dönemine uygun analiz</Aciklamali></div>
        </div>
        <div>
          <span className="cic">
            <Ayarlar />
          </span>
          <div className="v">7 araç</div>
          <div className="k"><Aciklamali>Hesaplama · Fatura · Teklif · Poliçe · Simülasyon · Asistan · Mevzuat</Aciklamali></div>
        </div>
        <div>
          <span className="cic">
            <Kalkan />
          </span>
          <div className="v">₺0</div>
          <div className="k"><Aciklamali>Danışma ve hesaplama araçları ücretsiz</Aciklamali></div>
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
          <p className="desc"><Aciklamali>Projenize özel geri dönüş süresini soldaki araçla anında görün; hesaplamalar resmî EPDK
            tarifeleri ve EPİAŞ gerçekleşen piyasa verileriyle yapılır.</Aciklamali></p>
          <div className="steps-grid">
            <div className="step">
              <span className="num">1</span>
              <b>Sorunuzu Sorun</b>
              <p><Aciklamali>Asistan, durumunuza uygun cevabı güncel mevzuata dayanarak verir.</Aciklamali></p>
            </div>
            <div className="step">
              <span className="num">2</span>
              <b>Faturanızı Yükleyin</b>
              <p><Aciklamali>Tüketiminiz okunur; size uygun güç, maliyet ve satış geliri hesaplanır.</Aciklamali></p>
            </div>
            <div className="step">
              <span className="num">3</span>
              <b>Planınızı Netleştirin</b>
              <p><Aciklamali>Destek uygunluğu, batarya kararı ve süreç adımlarını araçlarla görün.</Aciklamali></p>
            </div>
            <div className="step">
              <span className="num">4</span>
              <b>Danışmanla İlerleyin</b>
              <p><Aciklamali>Talep bırakın; teklif karşılaştırma ve süreç yönetiminde yanınızda olalım.</Aciklamali></p>
            </div>
          </div>
          <div className="journey-foot">
            <a className="gt-btn small" href="/hesaplama">
              Tüm Hesaplama Araçları <Ok className="i" />
            </a>
            <p>
              <Aciklamali>Batarya boyutlandırma aracı da hesaplama sayfasında; destek uygunluğu Destekler sayfasında.</Aciklamali>{" "}
              Araçların gerçek çıktılarından örnekler: <a className="b-link" href="/vakalar">Analiz Vakaları</a>.
            </p>
          </div>
        </div>
      </section>

      </main>
      <SiteFoot yol="/" />
    </div>
  );
}
