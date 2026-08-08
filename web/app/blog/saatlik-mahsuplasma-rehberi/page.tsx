import type { Metadata } from "next";
import SaatlikGrafik from "@/components/blog/SaatlikGrafik";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META, PIYASA } from "@/data/kb";
import { FIYATLAR } from "@/lib/hesap";
import { Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Saatlik Mahsuplaşma Adım Adım: 1 Mayıs 2026 Sonrası GES Ekonomisi",
  description:
    "Saatlik mahsuplaşma nasıl işler? Sayaçtan faturaya beş adım, öz tüketim-satış makası ve güncel EPİAŞ verileriyle işletme GES'inin yeni ekonomisi.",
  alternates: { canonical: "/blog/saatlik-mahsuplasma-rehberi" },
};

const tl = (v: number, hane = 2) =>
  v.toLocaleString("tr-TR", { minimumFractionDigits: hane, maximumFractionDigits: hane });

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const ayAdi = (ym: string) => {
  const [y, a] = ym.split("-");
  return `${AYLAR[Number(a) - 1]} ${y}`;
};

/** Yatay kıyas çubukları — 4px yuvarlak uç, doğrudan etiket */
function Cubuklar({ satirlar, birim }: { satirlar: Array<[string, number, string]>; birim: string }) {
  const maks = Math.max(...satirlar.map(([, v]) => v));
  return (
    <svg viewBox="0 0 680 92" role="img" aria-label={satirlar.map(([a, v]) => `${a}: ${tl(v, 0)} ${birim}`).join("; ")}>
      {satirlar.map(([ad, v, renk], i) => {
        const yy = 14 + i * 44;
        const w = Math.max(8, (v / maks) * 430);
        return (
          <g key={ad}>
            <text x="0" y={yy + 15} fontSize="13" fill="#252525">{ad}</text>
            <rect x="196" y={yy} width={w} height="22" rx="4" fill={renk} />
            <text x={196 + w + 10} y={yy + 15} fontSize="13" fontWeight="600" fill="#252525">
              {tl(v, birim === "₺/kWh" ? 2 : 0)} {birim}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const ADIMLAR = [
  {
    b: "Çift yönlü sayaç her saati ayrı ölçer",
    p: "Kabulde takılan sayaç, her saat için şebekeye verdiğiniz ve şebekeden çektiğiniz enerjiyi ayrı ayrı kaydeder. Mahsuplaşmanın birimi artık ay değil, o saatin kendisidir.",
  },
  {
    b: "Aynı saatte üretip tükettiğiniz enerji faturaya hiç girmez",
    p: "Öğlen 13:00'te 8 kW üretip 6 kW tüketiyorsanız o 6 kW 'öz tüketim'dir: şebekeye hiç uğramaz, tam perakende fiyatından (enerji + dağıtım + vergiler) tasarruf sağlar. Sistemin en değerli kilovatsaati budur.",
  },
  {
    b: "O saatin fazlası satış fiyatından değerlenir",
    p: "13:00'teki 2 kW fazla şebekeye verilir ve YEKDEM süresi içindeki tesislerde 'abone grubu perakende tarifesi − dağıtım bedeli' üzerinden ödenir — piyasa fiyatı (PTF) değil. Örnek: Mayıs 2026'da OG sanayi için net ~2,25 ₺/kWh, o dönem gündüz PTF'sinin yaklaşık 4 katıydı.",
  },
  {
    b: "Akşam çektiğiniz enerji tam fiyattan alınır",
    p: "19:00'da üretim bitmişken çektiğiniz her kWh, dağıtım bedeli ve vergiler dahil normal tarifeden faturalanır. Öğlenin fazlası akşamın çekişini artık birebir silemez — aradaki fiyat farkı sizin aleyhinizedir.",
  },
  {
    b: "Ay sonunda saatlerin toplamı faturaya yansır",
    p: "Tüm saatlerin alış ve satışları toplanır; satış geliri faturanızdan düşülür. Yıllık üretimin, bir önceki yıl tüketiminizin 2 katını aşan kısmı ile bataryadan şebekeye verilen enerji bedelsiz YEKDEM'e devredilir.",
  },
];

export default function SaatlikMahsuplasma() {
  const ozTuketimDegeri = FIYATLAR.ticarethane;
  const satisFiyati = FIYATLAR.ticarethaneSatis;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Saatlik Mahsuplaşma Adım Adım: 1 Mayıs 2026 Sonrası GES Ekonomisi",
    datePublished: "2026-08-08",
    dateModified: "2026-08-08",
    author: { "@type": "Organization", name: "GES Danışmanı" },
    publisher: { "@type": "Organization", name: "GES Danışmanı" },
  };

  return (
    <div className="wrap">
      <SiteHead aktif="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="yazi">
        <article className="yazi-ana">
        <header>
          <span className="sub-title">
            <SunDolu />
            Blog
          </span>
          <h1>
            Saatlik mahsuplaşma <span className="hl-g">adım adım</span>: yeni dönemde işletme
            GES'i nasıl kazandırır?
          </h1>
          <div className="blog-meta">
            <span>8 Ağustos 2026</span>
            <span>·</span>
            <span>Mevzuat çıpası: RG 2 Nisan 2026, sayı 33212</span>
            <span>·</span>
            <span>Veri: EPİAŞ Şeffaflık + EPDK {META.tarifeGecerlilik}</span>
          </div>
        </header>

        <p>
          1 Mayıs 2026'da ticarethane, sanayi ve tarımsal sulama aboneleri için{" "}
          <b>saatlik mahsuplaşma</b> dönemi başladı. Eski düzende ay içinde ürettiğiniz her
          kilovatsaat, ayın herhangi bir saatindeki tüketiminizi silebiliyordu. Yeni düzende
          hesap her saatin kendi içinde görülüyor — ve bu, işletme GES'inin ekonomisini kökten
          değiştiriyor.
        </p>

        <div className="callout">
          <b>Konutlar muaf.</b> Mesken aboneleri saatlik mahsuplaşmaya <u>geçmedi</u>; aylık
          mahsuplaşma aynen sürüyor. "Saatlik mahsup ev GES'ini öldürdü" söylemi sahada en sık
          duyduğumuz yanlıştır.
        </div>

        <h2 id="isleyis">Beş adımda işleyiş</h2>
        {ADIMLAR.map((a, i) => (
          <div className="adim" key={a.b}>
            <span className="no">{i + 1}</span>
            <div>
              <b>{a.b}</b>
              <p>{a.p}</p>
            </div>
          </div>
        ))}

        <h2 id="grafik">Bir günü grafikte okuyalım</h2>
        <p>
          Aşağıdaki profil, mesai saatli bir işletmeye kurulmuş 10 kW'lık örnek bir sistemin
          gününü gösteriyor. Sarı bölge aynı saatte örtüşen üretim-tüketim (öz tüketim), yeşil
          taralı bölge satışa giden fazla, kahverengi taralı bölge şebekeden çekilen enerji.
          İmleci saatlerin üzerinde gezdirin:
        </p>
        <figure className="fig">
          <SaatlikGrafik />
          <figcaption>
            İllüstratif profil — kendi tesisinizin eğrisi sayaç verinizden çıkar. Mesai saatli
            işletmede öz tüketim tipik %70-90'dır; profil örtüşmesi ne kadar yüksekse kazanç o
            kadar büyük.
          </figcaption>
        </figure>

        <h2 id="makas">Neden öz tüketim her şeydir: alış-satış makası</h2>
        <p>
          Aynı kilovatsaatin iki fiyatı var. Anında tükettiğinizde tam perakende maliyetten
          (enerji + dağıtım + vergiler) tasarruf edersiniz; şebekeye sattığınızda yalnız çıplak
          enerji bedelini alırsınız. Ticarethane tarifesiyle güncel makas:
        </p>
        <figure className="fig">
          <Cubuklar
            birim="₺/kWh"
            satirlar={[
              ["Öz tüketim değeri", ozTuketimDegeri, "#1F8A5D"],
              ["Şebekeye satış", satisFiyati, "#A5620D"],
            ]}
          />
          <figcaption>
            EPDK {META.tarifeGecerlilik} ticarethane tarifesi; öz tüketim değeri vergiler dahil
            nihai fiyat, satış çıplak enerji bedelidir. Oran ≈{" "}
            {tl(ozTuketimDegeri / satisFiyati, 1)}:1 — örtüşmeyen her kWh değerinin yarısından
            fazlasını kaybeder.
          </figcaption>
        </figure>
        <p>
          Bu yüzden "kurulu güç × yıllık üretim × tarife" çarpımıyla yapılan eski usul gelir
          hesabı artık <b>geliri abartır</b>. Doğru hesap, üretimin ne kadarının tüketimle aynı
          saate denk geldiğini bilmeyi gerektirir.
        </p>

        <h2 id="piyasa">Piyasa da aynı yöne işaret ediyor</h2>
        <p>
          Türkiye'de güneşin bol olduğu saatlerde elektrik zaten ucuzlar ("ördek eğrisi").
          EPİAŞ gerçekleşen verisiyle {ayAdi(PIYASA.ay)}:
        </p>
        <figure className="fig">
          <Cubuklar
            birim="₺/MWh"
            satirlar={[
              ["Tüm saatler ortalama PTF", PIYASA.ptfOrtalama, "#1F8A5D"],
              ["Güneş saatleri (10-17) PTF", PIYASA.ptfGunesSaatleri, "#A5620D"],
            ]}
          />
          <figcaption>
            Kaynak: EPİAŞ Şeffaflık Platformu, gerçekleşen piyasa takas fiyatı. Haziran
            2026'da güneş saatleri ortalaması 404 ₺/MWh'e kadar düştü; 15 Haziran 2025'te
            öğle saatlerinde 0 ₺ görüldü.
          </figcaption>
        </figure>
        <p>
          İyi haber: YEKDEM süresi içindeki tesislerin satış fiyatı PTF'ye değil perakende
          tarifeye bağlı. 10 yılını dolduran tesislerde ise fiyat min(0,9 × YEKDEM; saatlik
          PTF)'ye döner — son gerçekleşen YEKDEM birim maliyeti {tl(PIYASA.yekdemGerceklesenSon, 0)}{" "}
          ₺/MWh ({ayAdi(PIYASA.yekdemAyi)}).
        </p>

        <h2 id="oz-tuketim">Öz tüketimi büyütmenin dört yolu</h2>
        <div className="adim">
          <span className="no">1</span>
          <div>
            <b>Yükleri üretim saatlerine kaydırın</b>
            <p>Soğutma, kompresör, pompa gibi kaydırılabilir yükleri öğle bandına alın; konutta bulaşık/çamaşır ve termosifonu üretim fazlasına zamanlayın.</p>
          </div>
        </div>
        <div className="adim">
          <span className="no">2</span>
          <div>
            <b>EV'yi üretim fazlasıyla şarj edin</b>
            <p>PV-surplus modlu akıllı wallbox, üretim fazlası oluştuğunda şarjı otomatik başlatır — saatlik mahsuptaki işletmelerde öz tüketimi artırmanın en etkili yolu.</p>
          </div>
        </div>
        <div className="adim">
          <span className="no">3</span>
          <div>
            <b>Bataryayı "kurtarılan gelir" için kurun</b>
            <p>Mahsuplaşamayan fazlayı depolayıp akşam kullanmak, bedelsizleşecek enerjiyi tam perakende değerine çevirir; işletmede tipik geri dönüş 3-5 yıldır. Boyutu 15 dakikalık sayaç profiliniz belirler.</p>
          </div>
        </div>
        <div className="adim">
          <span className="no">4</span>
          <div>
            <b>Sistemi profile göre boyutlandırın</b>
            <p>Yıllık üretimin 2× tüketimi aşan kısmı bedelsizdir; tarımsal sulamada kış fazlası yaz tüketimiyle takas edilemez. Çoğu zaman biraz küçük sistem, büyüğünden daha kârlıdır.</p>
          </div>
        </div>

        <div className="dk-cta">
          <SunDolu className="i" />
          <div>
            <b>Kendi rakamlarınızı görün</b>
            <p>
              Yatırım getirisi aracı saatlik mahsuplaşma esasıyla hesaplar; öz tüketim oranınızı
              kaydırarak makasın etkisini kendiniz izleyin.
            </p>
          </div>
          <div className="dk-cta-btn">
            <a className="gt-btn small line" href="/hesaplama#roi">Getiri Aracı</a>
            <a
              className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent("Saatlik mahsuplaşma benim işletmemi nasıl etkiler?")}`}
            >
              Asistana Sorun <Ok className="i" />
            </a>
          </div>
        </div>
        </article>

        <aside className="yazi-yan" aria-label="İçindekiler">
          <div className="side-card">
            <h3>
              <SunDolu className="i" /> İçindekiler
            </h3>
            <a className="q" href="#isleyis">Beş adımda işleyiş</a>
            <a className="q" href="#grafik">Bir günü grafikte okuyalım</a>
            <a className="q" href="#makas">Alış-satış makası</a>
            <a className="q" href="#piyasa">Piyasa verisi (EPİAŞ)</a>
            <a className="q" href="#oz-tuketim">Öz tüketimi büyütmek</a>
          </div>
          <div className="side-card cta">
            <h3>Durumunuz özel mi?</h3>
            <p>
              İkili anlaşmanız, vardiyalı üretiminiz ya da tarımsal sulamanız varsa asistan
              hesabı size göre kurar.
            </p>
            <a
              className="gt-btn small"
              style={{ marginTop: 12 }}
              href={`/asistan?soru=${encodeURIComponent("Saatlik mahsuplaşma benim tesisimde nasıl işler?")}`}
            >
              Asistana Sorun <Ok className="i" />
            </a>
          </div>
        </aside>
      </div>

      <SiteFoot yol="/blog/saatlik-mahsuplasma-rehberi" />
    </div>
  );
}
