import Journey from "@/components/Journey";
import Roi from "@/components/Roi";
import SiteHead from "@/components/SiteHead";
import { META } from "@/data/kb";
import {
  SunDolu, Ok, Ara, Kalkan, Saat, Arti, Ev, Fabrika, Filiz,
  Rota, SaatYenile, Ayarlar, Sohbet,
} from "@/components/Icons";

export default function Anasayfa() {
  return (
    <div className="wrap">
      <SiteHead aktif="anasayfa" />

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
            Fizibiliteden başvuruya, kurulumdan mahsuplaşmaya — sürecin her aşamasında güncel
            mevzuata dayanan, kaynak gösteren yapay zekâ destekli danışmanlık. Teknik bilgi
            gerektirmez; elektrik faturanız yeterli.
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
          <div className="v">3 araç</div>
          <div className="k">Yatırım getirisi · Destek uygunluğu · Batarya</div>
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
          <h3>
            Karardan <span className="hl-g">devreye almaya</span> dört aşamalı yol haritası
          </h3>
          <p className="desc">
            Projenize özel geri dönüş süresini soldaki araçla anında görün; hesaplamalar resmî EPDK
            tarifeleri ve EPİAŞ gerçekleşen piyasa verileriyle, analiz motorumuzda yapılır.
          </p>
          <div className="steps-grid">
            <div className="step">
              <span className="num">1</span>
              <b>Değerlendirme</b>
              <p>Tüketim profilinize göre sistemin uygunluğunu ve kapasitesini belirleyin.</p>
            </div>
            <div className="step">
              <span className="num">2</span>
              <b>Finansal Analiz</b>
              <p>Yatırım maliyeti, geri ödeme süresi ve destek programlarını görün.</p>
            </div>
            <div className="step">
              <span className="num">3</span>
              <b>Başvuru Süreci</b>
              <p>Dağıtım şirketi başvurusundan geçici kabule adım adım ilerleyin.</p>
            </div>
            <div className="step">
              <span className="num">4</span>
              <b>İşletme Dönemi</b>
              <p>Fatura ve mahsup kontrolü, performans takibi ve garanti süreçleri.</p>
            </div>
          </div>
        </div>
      </section>

      <a className="gt-btn fab" href="/asistan" aria-label="Canlı asistanla sohbet edin">
        <span className="dot" aria-hidden="true" />
        <Sohbet className="i" />
        Canlı Asistan
      </a>

      <footer className="site-foot">
        <div>
          <b>gesdanışmanı</b> — GES danışmanlık platformu
          <br />
          Tarife verisi: EPDK, {META.tarifeGecerlilik} · Piyasa verisi: {META.piyasaKaynak}
        </div>
        <div className="cols">
          <span>Yanıtlar bilgilendirme amaçlıdır; bağlayıcı görüş niteliği taşımaz.</span>
        </div>
      </footer>
    </div>
  );
}
