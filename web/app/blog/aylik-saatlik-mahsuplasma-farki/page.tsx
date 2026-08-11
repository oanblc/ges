import type { Metadata } from "next";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META, PIYASA } from "@/data/kb";
import { FIYATLAR } from "@/lib/hesap";
import { Ok, SunDolu } from "@/components/Icons";
import { Aciklamali } from "@/components/Terim";

export const metadata: Metadata = {
  title: "Aylık Mahsuplaşma ile Saatlik Mahsuplaşma Farkı: Aynı Örnekle TL Karşılaştırması (2026)",
  description:
    "GES mahsuplaşma değişikliği 2026: 1 Mayıs'a kadar aylık mahsuplaşma nasıl işliyordu, saatlik mahsuplaşmada ne değişti? Aynı işletme günü iki rejimde hesaplandı — fark TL ve yüzde olarak.",
  alternates: { canonical: "/blog/aylik-saatlik-mahsuplasma-farki" },
};

const tl = (v: number, hane = 2) =>
  v.toLocaleString("tr-TR", { minimumFractionDigits: hane, maximumFractionDigits: hane });

/** Temsili gün — 100 kWp GES'li, gündüz yoğun ticarethane (kWh/dilim) */
const GUN: Array<[string, number, number]> = [
  ["00–06", 0, 90],
  ["06–09", 60, 120],
  ["09–12", 180, 150],
  ["12–15", 200, 140],
  ["15–18", 120, 130],
  ["18–21", 10, 100],
  ["21–24", 0, 60],
];

export default function AylikSaatlikFark() {
  const alis = FIYATLAR.ticarethane; // vergiler dahil perakende (₺/kWh)
  const satis = FIYATLAR.ticarethaneSatis; // çıplak enerji bedeli (₺/kWh)

  const toplamUretim = GUN.reduce((a, [, u]) => a + u, 0);
  const toplamTuketim = GUN.reduce((a, [, , t]) => a + t, 0);

  // Eski rejim: ay (örnekte gün) içinde toplam üretim toplam tüketimi siler
  const aylikNetCekis = Math.max(0, toplamTuketim - toplamUretim);
  const aylikTutar = aylikNetCekis * alis;

  // Yeni rejim: her dilim kendi içinde mahsuplaşır
  const ozTuketim = GUN.reduce((a, [, u, t]) => a + Math.min(u, t), 0);
  const fazla = GUN.reduce((a, [, u, t]) => a + Math.max(0, u - t), 0);
  const eksik = GUN.reduce((a, [, u, t]) => a + Math.max(0, t - u), 0);
  const saatlikTutar = eksik * alis - fazla * satis;

  const fark = saatlikTutar - aylikTutar;
  const farkYuzde = (fark / aylikTutar) * 100;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      "Aylık Mahsuplaşma ile Saatlik Mahsuplaşma Farkı: Aynı Örnekle TL Karşılaştırması",
    datePublished: "2026-08-11",
    dateModified: "2026-08-11",
    author: { "@type": "Organization", name: "GES Danışmanı" },
    publisher: { "@type": "Organization", name: "GES Danışmanı" },
  };

  return (
    <div className="wrap">
      <SiteHead aktif="blog" />
      <main id="icerik">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="yazi">
        <article className="yazi-ana">
        <header>
          <span className="sub-title">
            <SunDolu />
            Blog
          </span>
          <h1>
            Aylıktan saatliğe: mahsuplaşma değişikliği{" "}
            <span className="hl-g">faturanızı ne kadar etkiledi?</span>
          </h1>
          <div className="blog-meta">
            <span>11 Ağustos 2026</span>
            <span>·</span>
            <span>Mevzuat çıpası: RG 2 Nisan 2026 sayı 33212 + RG 5 Mayıs 2026 sayı 33244</span>
            <span>·</span>
            <span>Tarife: EPDK {META.tarifeGecerlilik}</span>
          </div>
        </header>

        <p>
          1 Mayıs 2026'ya kadar GES'li bir işletmenin hesabı basitti: ay içinde ürettiğiniz
          toplam enerji, ayın toplam tüketiminden düşülürdü. O tarihten beri ticarethane,
          sanayi ve tarımsal sulama abonelerinde hesap <b>her saatin kendi içinde</b>{" "}
          görülüyor. Bu yazıda iki rejimi aynı örnek gün üzerinden, güncel EPDK tarifesiyle
          TL'ye çevirip karşılaştırıyoruz. Saatlik mahsubun işleyişini beş adımda anlatan{" "}
          <a href="/blog/saatlik-mahsuplasma-rehberi">genel rehberimiz</a> ayrıca okunabilir;
          buradaki odak <b>eski–yeni farkı</b>dır.
        </p>

        <h2 id="kim-etkilendi">Kim etkilendi, kim etkilenmedi?</h2>
        <p><Aciklamali>Değişiklik abone grubuna ve tesisin çağrı mektubu tarihine göre uygulanıyor
          (dayanak: RG 2 Nisan 2026 sayı 33212; usul ve esaslar RG 5 Mayıs 2026 sayı 33244,
          EPDK Kararı 30.04.2026/14531):</Aciklamali></p>
        <div className="tablo-kaydir">
          <table>
            <thead>
              <tr><th>Abone / tesis</th><th>1 Mayıs 2026 öncesi</th><th>1 Mayıs 2026 sonrası</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Mesken</td>
                <td>Aylık mahsuplaşma</td>
                <td><b>Aylık mahsuplaşma devam ediyor</b> — konutlar saatlik mahsuptan muaf</td>
              </tr>
              <tr>
                <td>Ticarethane</td>
                <td>Aylık mahsuplaşma</td>
                <td>Saatlik mahsuplaşma</td>
              </tr>
              <tr>
                <td>Sanayi (AG/OG)</td>
                <td>Aylık mahsuplaşma</td>
                <td>Saatlik mahsuplaşma</td>
              </tr>
              <tr>
                <td>Tarımsal sulama</td>
                <td>Aylık mahsuplaşma</td>
                <td>Saatlik mahsuplaşma — kış fazlası artık yaz tüketimiyle takas edilemez</td>
              </tr>
              <tr>
                <td>OSB içindeki işletme</td>
                <td>Aylık mahsuplaşma</td>
                <td>Saatlik mahsuplaşma; süreç OSB müdürlüğü üzerinden yürür, mahsup hesabı
                  EPİAŞ'ta görülür, OSB tarifeleri farklıdır</td>
              </tr>
              <tr>
                <td>12 Mayıs 2019 <u>öncesi</u> çağrı mektuplu tesisler</td>
                <td>Aylık mahsuplaşma</td>
                <td><b>Hakları korunur</b> — yeni kapsam 12 Mayıs 2019 sonrası çağrı mektuplu
                  lisanssız tesislerdir</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="callout">
          <b>En yaygın yanlış:</b> "Saatlik mahsup ev GES'ini bitirdi." Bitirmedi — mesken
          aboneleri kapsam dışında, konutta aylık mahsuplaşma aynen sürüyor.
        </div>

        <h2 id="eski-duzen">Eski düzen: ayın toplamı üzerinden tek hesap</h2>
        <p><Aciklamali>Aylık mahsuplaşmada dönem sonunda iki sayı karşılaştırılırdı: o ay şebekeye
          verdiğiniz toplam enerji ve şebekeden çektiğiniz toplam enerji. Öğlen 12:00'de
          ürettiğiniz fazla kilovatsaat, aynı gece 02:00'deki tüketiminizi <b>birebir</b>{" "}
          silebilirdi — üretimin ve tüketimin hangi saatte gerçekleştiğinin hiçbir önemi
          yoktu.</Aciklamali></p>
        <p>
          Basit örnek: bir günde {tl(toplamUretim, 0)} kWh üretip {tl(toplamTuketim, 0)} kWh
          tükettiyseniz, eski düzende faturaya yalnız aradaki fark olan{" "}
          <b>{tl(aylikNetCekis, 0)} kWh</b> net çekiş yansırdı. Üretimin tamamı — gündüz mü
          üretildi, tüketimle örtüştü mü bakılmaksızın — tüketimi tam perakende değerinden
          silerdi.
        </p>

        <h2 id="yeni-duzen">Yeni düzen: her saat kendi içinde kapanır</h2>
        <p><Aciklamali>Saatlik mahsuplaşmada çift yönlü sayaç her saati ayrı ölçer ve üç ayrı sonuç
          doğar:</Aciklamali></p>
        <div className="adim">
          <span className="no">1</span>
          <div>
            <b>Örtüşen kısım (öz tüketim) en değerlisi</b>
            <p><Aciklamali>Aynı saatte üretip tükettiğiniz enerji faturaya hiç girmez; vergiler ve dağıtım
              bedeli dahil tam perakende fiyattan ({tl(alis)} ₺/kWh, ticarethane) tasarruf
              sağlar.</Aciklamali></p>
          </div>
        </div>
        <div className="adim">
          <span className="no">2</span>
          <div>
            <b>O saatin fazlası satış fiyatından değerlenir</b>
            <p><Aciklamali>YEKDEM süresi (10 yıl) içindeki tesislerde fazla enerji, piyasa fiyatından (PTF)
              değil, abone grubu perakende tarifesinden dağıtım bedeli düşülerek — yani çıplak
              enerji bedelinden — ödenir: ticarethane için {tl(satis)} ₺/kWh. 10 yılını
              dolduran tesislerde fiyat min(0,9 × YEKDEM; saatlik PTF)'ye döner; son
              gerçekleşen YEKDEM birim maliyeti {tl(PIYASA.yekdemGerceklesenSon, 0)} ₺/MWh.</Aciklamali></p>
          </div>
        </div>
        <div className="adim">
          <span className="no">3</span>
          <div>
            <b>O saatin eksiği tam tarifeden alınır</b>
            <p><Aciklamali>Üretimin yetmediği saatte çektiğiniz her kWh, enerji + dağıtım + vergiler dahil
              normal perakende tarifeden faturalanır. Öğlenin fazlası akşamın çekişini artık
              birebir silemez; arada {tl(alis - satis)} ₺/kWh'lik bir makas oluşur.</Aciklamali></p>
          </div>
        </div>

        <h2 id="karsilastirma">Aynı gün, iki rejim: TL karşılaştırması</h2>
        <p><Aciklamali>Temsili örneğimiz: 100 kWp çatı GES'i olan, mesai saatleri yoğun çalışan bir
          ticarethane ve güneşli bir yaz günü. Aşağıdaki tablo günün yedi dilimindeki üretim
          ve tüketimi, her dilimin saatlik mahsuptaki sonucuyla birlikte gösteriyor:</Aciklamali></p>
        <div className="tablo-kaydir">
          <table>
            <thead>
              <tr>
                <th>Saat dilimi</th>
                <th>Üretim (kWh)</th>
                <th>Tüketim (kWh)</th>
                <th>Öz tüketim (kWh)</th>
                <th>Fazla → satış (kWh)</th>
                <th>Eksik → alış (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {GUN.map(([saat, u, t]) => (
                <tr key={saat}>
                  <td>{saat}</td>
                  <td>{tl(u, 0)}</td>
                  <td>{tl(t, 0)}</td>
                  <td>{tl(Math.min(u, t), 0)}</td>
                  <td>{u > t ? tl(u - t, 0) : "—"}</td>
                  <td>{t > u ? tl(t - u, 0) : "—"}</td>
                </tr>
              ))}
              <tr>
                <td><b>Toplam</b></td>
                <td><b>{tl(toplamUretim, 0)}</b></td>
                <td><b>{tl(toplamTuketim, 0)}</b></td>
                <td><b>{tl(ozTuketim, 0)}</b></td>
                <td><b>{tl(fazla, 0)}</b></td>
                <td><b>{tl(eksik, 0)}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><Aciklamali>Şimdi aynı günü iki rejimde faturaya çevirelim. Alış fiyatı EPDK{" "}
          {META.tarifeGecerlilik} ticarethane tarifesi (vergiler dahil {tl(alis)} ₺/kWh),
          satış fiyatı çıplak enerji bedeli ({tl(satis)} ₺/kWh):</Aciklamali></p>
        <div className="tablo-kaydir">
          <table>
            <thead>
              <tr><th></th><th>Aylık mahsuplaşma (eski)</th><th>Saatlik mahsuplaşma (yeni)</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Hesap birimi</td>
                <td>Dönem toplamı</td>
                <td>Her saat ayrı</td>
              </tr>
              <tr>
                <td>Faturalanan çekiş</td>
                <td>{tl(toplamTuketim, 0)} − {tl(toplamUretim, 0)} = {tl(aylikNetCekis, 0)} kWh</td>
                <td>{tl(eksik, 0)} kWh (örtüşmeyen saatlerin toplamı)</td>
              </tr>
              <tr>
                <td>Satışa giden fazla</td>
                <td>0 kWh (üretimin tamamı tüketimi sildi)</td>
                <td>{tl(fazla, 0)} kWh × {tl(satis)} ₺ = −{tl(fazla * satis, 0)} ₺ gelir</td>
              </tr>
              <tr>
                <td>Günün net maliyeti</td>
                <td><b>{tl(aylikTutar, 0)} ₺</b></td>
                <td><b>{tl(saatlikTutar, 0)} ₺</b></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="callout">
          <b>Fark: günde {tl(fark, 0)} ₺ (%{tl(farkYuzde, 0)} daha yüksek maliyet).</b>{" "}
          Kaynağı tek bir şey: tüketimle örtüşmeyen {tl(fazla, 0)} kWh, eskiden tam perakende
          değerinden ({tl(alis)} ₺/kWh) tüketimi silerken şimdi yalnız {tl(satis)} ₺/kWh'den
          satılıyor — her örtüşmeyen kWh, aradaki {tl(alis - satis)} ₺'lik makas kadar değer
          kaybediyor. Örtüşme (öz tüketim) ne kadar yüksekse fark o kadar küçülür; bu örnekte
          üretimin %{tl((ozTuketim / toplamUretim) * 100, 0)}'i örtüşüyor.
        </div>
        <p>
          Rakamlar temsilidir; sizin farkınızı çatınızın üretim eğrisi ile işletmenizin saat
          saat tüketim profili belirler. Vardiyalı çalışan bir tesiste fark bu örnekten küçük,
          hafta sonu kapalı bir ofiste daha büyük çıkabilir.
        </p>

        <h2 id="ne-anlama-geliyor">Bu değişiklik ne anlama geliyor?</h2>
        <div className="adim">
          <span className="no">1</span>
          <div>
            <b>Öz tüketim oranı artık ana sürücü</b>
            <p><Aciklamali>Eski usul "kurulu güç × yıllık üretim × tarife" hesabı geliri abartır. Doğru soru
              üretimin ne kadarının tüketimle aynı saate denk geldiğidir; mesai saatli
              işletmede tipik oran %70-90, vardiyalı sanayide %85-95'tir.</Aciklamali></p>
          </div>
        </div>
        <div className="adim">
          <span className="no">2</span>
          <div>
            <b>Boyutlandırma küçülme yönünde</b>
            <p><Aciklamali>Satış fiyatı öz tüketim değerinin yarısından azken, profili aşan her kWp'nin
              getirisi düşer. Üstelik yıllık üretimin, önceki yıl tüketiminin 2 katını aşan
              kısmı bedelsiz YEKDEM'e devredilir. Çoğu zaman biraz küçük sistem, büyüğünden
              daha kârlıdır.</Aciklamali></p>
          </div>
        </div>
        <div className="adim">
          <span className="no">3</span>
          <div>
            <b>Batarya ve yük kaydırma yeni değer kazandı</b>
            <p><Aciklamali>Kompresör, soğutma, pompa gibi kaydırılabilir yükleri öğle bandına almak
              bedavaya öz tüketim artışıdır. Mahsuplaşamayan fazlayı depolayıp akşam kullanmak
              ise her kWh'yi satış fiyatından tam perakende değerine taşır; işletmelerde tipik
              geri dönüş 3-5 yıldır.</Aciklamali></p>
          </div>
        </div>
        <div className="adim">
          <span className="no">4</span>
          <div>
            <b>"GES artık kârlı değil" doğru değil — hesap şekli değişti</b>
            <p><Aciklamali>YEKDEM süresi içindeki tesislerin satış fiyatı PTF'ye değil perakende tarifeye
              bağlı: Mayıs 2026'da OG sanayi için net ~2,25 ₺/kWh, o dönem gündüz PTF'sinin
              yaklaşık 4 katıydı. Öz tüketimin değeri ise zaten tarifeyle birlikte duruyor.
              Değişen şey, profiline göre boyutlandırılmamış sistemlerin kâğıt üstü getirisinin
              gerçekle yüzleşmesidir.</Aciklamali></p>
          </div>
        </div>

        <div className="dk-cta">
          <SunDolu className="i" />
          <div>
            <b>Gerçek etkiyi kendi saatlik verinizle hesaplayın</b>
            <p><Aciklamali>Saatlik analiz aracımız tam bu iş için yapıldı: dağıtım şirketinizden ya da
              EPİAŞ'tan aldığınız saatlik tüketim dökümünü yükleyin, farklı GES boyutları
              gerçek profilinizle saat saat simüle edilsin — öz tüketim, yıllık fayda ve geri
              ödeme süresi temsili örnekle değil, sizin verinizle çıksın.</Aciklamali></p>
          </div>
          <div className="dk-cta-btn">
            <a className="gt-btn small line" href="/saatlik-analiz">Saatlik Analiz Aracı</a>
            <a
              className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent("Aylıktan saatlik mahsuplaşmaya geçiş benim işletmemi nasıl etkiledi?")}`}
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
            <a className="q" href="#kim-etkilendi">Kim etkilendi?</a>
            <a className="q" href="#eski-duzen">Eski düzen: aylık hesap</a>
            <a className="q" href="#yeni-duzen">Yeni düzen: saatlik hesap</a>
            <a className="q" href="#karsilastirma">TL karşılaştırması</a>
            <a className="q" href="#ne-anlama-geliyor">Ne anlama geliyor?</a>
          </div>
          <div className="side-card cta">
            <h3>Profiliniz elinizde mi?</h3>
            <p><Aciklamali>Saatlik tüketim dökümünüz varsa aracı kullanın; yoksa nasıl alacağınızı asistan
              adım adım anlatır.</Aciklamali></p>
            <a
              className="gt-btn small"
              style={{ marginTop: 12 }}
              href={`/asistan?soru=${encodeURIComponent("Saatlik tüketim dökümümü nereden alabilirim?")}`}
            >
              Asistana Sorun <Ok className="i" />
            </a>
          </div>
        </aside>
      </div>

      </main>
      <SiteFoot yol="/blog/aylik-saatlik-mahsuplasma-farki" notu="Bu içerik bilgilendirme amaçlıdır; bağlayıcı görüş değildir." />
    </div>
  );
}
