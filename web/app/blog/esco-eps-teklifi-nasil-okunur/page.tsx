import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { Aciklamali } from "@/components/Terim";
import { META } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "ESCO / Enerji Performans Sözleşmesi (EPS) Teklifi Nasıl Okunur?",
  description:
    "'İlk yatırım bizden' GES teklifi (ESCO / enerji performans sözleşmesi) nasıl çalışır: üretime endeksli fatura, süre sonu devir, sözleşme kontrol listesi ve öz kaynak-kredi-EPS karşılaştırması.",
  alternates: { canonical: "/blog/esco-eps-teklifi-nasil-okunur" },
};

const KONTROL = [
  {
    b: "Yıllık artış (eskalasyon) maddesi",
    a: "Ödeyeceğiniz birim fiyat her yıl neye göre artıyor? TÜFE, ÜFE, EPDK tarifesi, döviz veya sabit bir yüzde olabilir. Bu madde sözleşmenin toplam maliyetini en çok etkileyen satırdır — oranı ve endeksi teklifinizden okuyun, 'piyasa koşullarına göre güncellenir' gibi açık uçlu ifadeleri kabul etmeyin.",
  },
  {
    b: "Performans garantisi kapsamı",
    a: "Firma yıllık asgari üretim (kWh) taahhüt ediyor mu? Taahhüt tutmazsa fark nasıl telafi ediliyor — fatura indirimi mi, süre uzatımı mı? Garanti yalnız ekipmanı değil, üretim miktarını da kapsamalı.",
  },
  {
    b: "Bakım ve işletme kimde?",
    a: "Sözleşme süresince temizlik, arıza müdahalesi, inverter değişimi ve izleme kimin sorumluluğunda? EPS modelinin doğası gereği bu yük tipik olarak firmadadır — ama yazılı olmalı; 'gerektiğinde bakım' gibi muğlak ifade yerine müdahale süresi (SLA) isteyin.",
  },
  {
    b: "Erken çıkış ve fesih şartları",
    a: "Sözleşmeyi erken sonlandırmak isterseniz (taşınma, kapanma, sistemi satın alma isteği) ne ödersiniz? Kalan dönem bedelinin tamamı mı, azalan bir cetvel mi? Fesih cetveli sözleşme ekinde tablo olarak yer almalı.",
  },
  {
    b: "Süre sonu devir koşulları",
    a: "Süre bitiminde sistem hangi durumda, hangi bedelle devrediliyor? Devir 'bedelsiz' mi, sembolik bedelli mi? Devir anında asgari performans (ör. panel gücünün belirli bir yüzdesi) ve ekipman garanti belgelerinin tarafınıza teslimi yazılı olsun.",
  },
  {
    b: "Sigorta kimde?",
    a: "Sözleşme süresince tesisin sigortası (yangın, doğal afet, hırsızlık, makine kırılması) kimin üzerinde ve poliçe kapsamı ne? Bina sizin, tesis firmanınsa hasar senaryolarında sorumluluk sınırı netleşmeli. Çatınızın yalıtımına gelecek zararın tazmini de bu başlığın parçası.",
  },
  {
    b: "Bina satışı ve taşınma senaryosu",
    a: "Binayı satarsanız sözleşme yeni malike devrolabiliyor mu, alıcı kabul etmezse ne oluyor? Kiracıysanız kira süresi ile EPS süresi uyumlu mu? Bu senaryolar sözleşmede yoksa, en güçlü pazarlık kozunuz şimdi masadadır.",
  },
];

export default function EscoEps() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "ESCO / Enerji Performans Sözleşmesi (EPS) Teklifi Nasıl Okunur?",
    datePublished: "2026-08-11",
    dateModified: "2026-08-11",
    author: { "@type": "Organization", name: "GES Danışmanı" },
    publisher: { "@type": "Organization", name: "GES Danışmanı" },
  };

  return (
    <div className="wrap">
      <SiteHead aktif="blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="icerik">
      <div className="yazi">
        <article className="yazi-ana">
          <header>
            <span className="sub-title">
              <SunDolu />
              Blog
            </span>
            <h1>
              "İlk yatırım bizden" GES teklifi: <span className="hl-g">ESCO / EPS sözleşmesi</span>{" "}
              nasıl okunur?
            </h1>
            <div className="blog-meta">
              <span>11 Ağustos 2026</span>
              <span>·</span>
              <span>Kaynak: finansman bilgi tabanımız (mevzuat güncelliği: {META.kbGuncelleme})</span>
            </div>
          </header>

          <p>
            <Aciklamali>
              Büyük çatısı olan işletmelere son dönemde sık gelen bir teklif türü var:
              "Kurulum maliyetini biz üstlenelim, siz yalnız ürettiğiniz elektriğin
              faturasını ödeyin." Bu model enerji performans sözleşmesi (EPS) ya da
              yaygın adıyla ESCO modelidir. Model meşrudur ve dünyada yaygındır — ama
              imzaladığınız şey bir elektrik faturası değil, 10 yıla varan bir finansman
              sözleşmesidir. Bu yazı, önünüzdeki teklifi hangi maddelerden okuyacağınızı
              anlatır.
            </Aciklamali>
          </p>

          <h2 id="nedir">EPS / ESCO modeli nasıl çalışır?</h2>
          <p>
            <Aciklamali>
              Kurgu dört parçadan oluşur. Birincisi ilk yatırım: panelleri, inverteri ve
              montajı ESCO firması finanse eder; siz kurulum bedeli ödemezsiniz. İkincisi
              üretime endeksli fatura: sistemin ürettiği her kWh için firmaya, sözleşmede
              yazan birim fiyattan ödeme yaparsınız — bu fiyat şebeke tarifesinden düşük
              olacak şekilde kurgulanır, aradaki fark sizin tasarrufunuzdur. Üçüncüsü
              süre: piyasadaki sözleşmeler tipik olarak 10 yıla kadar uzanır. Dördüncüsü
              devir: süre sonunda sistem, sözleşmedeki koşullarla size geçer ve kalan
              ömründe üretim tamamen sizindir.
            </Aciklamali>
          </p>
          <p>
            <Aciklamali>
              Model, öz kaynak ayırmak istemeyen yüksek tüketimli işletmeler için
              tasarlanmıştır. Cazibesi gerçektir: bugün nakit çıkışı olmadan yarından
              itibaren tasarruf başlar. Bedeli de gerçektir: tasarrufun önemli bir bölümü,
              sözleşme süresi boyunca finansmanı sağlayan firmaya gider. Yani soru "EPS
              iyi mi kötü mü" değil; "bu sözleşmenin toplam maliyeti, kredi veya öz
              kaynakla kurmaktan ne kadar farklı" sorusudur.
            </Aciklamali>
          </p>

          <h2 id="kontrol">Teklifi okurken 7 maddelik kontrol listesi</h2>
          {KONTROL.map((k, i) => (
            <p key={k.b}>
              <b>{i + 1}. {k.b}.</b> <Aciklamali>{k.a}</Aciklamali>
            </p>
          ))}

          <h2 id="kiyas">Öz kaynak mı, kredi mi, EPS mi?</h2>
          <p>
            <Aciklamali>
              Üç yolun yapısal farkı şudur — rakamlar projeye ve döneme göre değiştiği
              için tabloyu oranla değil mantıkla okuyun:
            </Aciklamali>
          </p>
          <div className="tablo-kaydir">
            <table>
              <thead>
                <tr>
                  <th scope="col">Kriter</th>
                  <th scope="col">Öz kaynak</th>
                  <th scope="col">Banka kredisi / leasing</th>
                  <th scope="col">EPS / ESCO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>İlk nakit çıkışı</td>
                  <td>Yatırımın tamamı</td>
                  <td>Peşinat (yatırımın ~%20'sine kadar finansman boşluğu)</td>
                  <td>Yok</td>
                </tr>
                <tr>
                  <td>Toplam maliyet</td>
                  <td>En düşük</td>
                  <td>Faiz/kira yükü eklenir — oranı bankanızdan teyit edin</td>
                  <td>Tipik olarak en yüksek; birim fiyat ve artış maddesini teklifinizden okuyun</td>
                </tr>
                <tr>
                  <td>Sistemin sahibi</td>
                  <td>İlk günden siz</td>
                  <td>Siz (leasing'de süre sonunda mülkiyet devri)</td>
                  <td>Sözleşme süresince firma; süre sonunda devir</td>
                </tr>
                <tr>
                  <td>Bakım/performans riski</td>
                  <td>Sizde</td>
                  <td>Sizde</td>
                  <td>Tipik olarak firmada — kapsamı sözleşmede yazmalı</td>
                </tr>
                <tr>
                  <td>Tasarrufun sahibi</td>
                  <td>Tamamı sizin</td>
                  <td>Taksit süresince paylaşımlı, sonra sizin</td>
                  <td>Sözleşme süresince paylaşımlı, devirden sonra sizin</td>
                </tr>
                <tr>
                  <td>Kime uygun</td>
                  <td>Birikimi olan herkes</td>
                  <td>Kredibilitesi olan işletme (KOSGEB faizsiz desteği önce değerlendirin)</td>
                  <td>Öz kaynak ayırmak istemeyen büyük tüketiciler</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <Aciklamali>
              Ara yolları da unutmayın: imalatçı KOBI'ler için KOSGEB Yeşil Sanayi desteği
              faizsizdir; leasing'de makine-teçhizat listesindeki yeni ekipmanda %1 KDV
              uygulanabilir. EPS teklifini bu alternatiflerin toplam maliyetiyle yan yana
              koymadan imzalamayın.
            </Aciklamali>
          </p>

          <h2 id="karar">Karar anında tek soru</h2>
          <p>
            <Aciklamali>
              EPS teklifinin adil olup olmadığını tek bir hesap gösterir: sözleşme süresi
              boyunca firmaya ödeyeceğiniz toplam tutar (birim fiyat × taahhüt üretim ×
              süre, artış maddesiyle) ile aynı sistemi kredi veya öz kaynakla kurmanın
              toplam maliyetini karşılaştırın. Fark, "ilk yatırım sıfır" rahatlığına
              ödediğiniz fiyattır — bilerek ödüyorsanız sorun yok; farkı görmeden imza
              atmak sorundur.
            </Aciklamali>
          </p>

          <div className="dk-cta">
            <SunDolu className="i" />
            <div>
              <b>EPS teklifinizi de tarafsız değerlendirelim</b>
              <p>
                Teklif Değerlendirme aracına yükleyin: birim fiyat, artış maddesi ve devir
                koşullarını alternatif finansman yollarıyla yan yana görün.
              </p>
            </div>
            <div className="dk-cta-btn">
              <a className="gt-btn small line" href="/teklif-analizi">
                Teklif Değerlendirme
              </a>
              <a
                className="gt-btn small"
                href={`/asistan?soru=${encodeURIComponent("Elimde ilk yatırımsız (ESCO/EPS) bir GES teklifi var, nasıl değerlendirmeliyim?")}`}
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
            <a className="q" href="#nedir">Model nasıl çalışır?</a>
            <a className="q" href="#kontrol">7 maddelik kontrol listesi</a>
            <a className="q" href="#kiyas">Öz kaynak / kredi / EPS</a>
            <a className="q" href="#karar">Karar anında tek soru</a>
          </div>
          <div className="side-card cta">
            <h3>Teklifiniz masada mı?</h3>
            <p>
              Sözleşme taslağınızdaki artış ve fesih maddelerini asistana özetletin;
              atlamamanız gereken soruları çıkaralım.
            </p>
            <a
              className="gt-btn small"
              style={{ marginTop: 12 }}
              href={`/asistan?soru=${encodeURIComponent("ESCO sözleşmesinde hangi maddelere dikkat etmeliyim?")}`}
            >
              Asistana Sorun <Ok className="i" />
            </a>
          </div>
        </aside>
      </div>
      </main>

      <SiteFoot notu="Bu içerik bilgilendirme amaçlıdır; bağlayıcı görüş değildir." />
    </div>
  );
}
