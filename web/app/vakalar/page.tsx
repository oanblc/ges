import type { Metadata } from "next";
import SiteFoot from "@/components/SiteFoot";
import SiteHead from "@/components/SiteHead";
import { Aciklamali } from "@/components/Terim";
import { HANE_YILLIK_KWH } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Analiz Vakaları — Gerçek Verilerle GES Değerlendirmeleri",
  description:
    "Platformumuzda yapılan gerçek, anonimleştirilmiş analizler: saatlik tüketim verisiyle sanayi GES fizibilitesi, konut poliçe analizi ve sayısal sonuçları.",
  alternates: { canonical: "/vakalar" },
};

const sayi = (v: number) => Math.round(v).toLocaleString("tr-TR");

export default function Vakalar() {
  // Hatay vakası: aylık ~133.000 kWh → yıllık tüketimin hane eşdeğeri
  const hatayYillikKwh = 133000 * 12;
  const haneEsdeger = hatayYillikKwh / HANE_YILLIK_KWH;

  const VAKALAR = [
    {
      baslik: "Demir-çelik tesisi — saatlik veriyle fizibilite",
      sektor: "Sanayi (OG) · Hatay",
      tarih: "Ağustos 2026",
      sorun:
        "Aylık yaklaşık 133.000 kWh tüketen tesis, saatlik mahsuplaşma döneminde çatı GES'in hâlâ mantıklı olup olmadığını netleştirmek istedi.",
      neYaptik:
        "Tesisin gerçek saatlik tüketim verisi, sitedeki saatlik analiz motoruyla işlendi: üretim-tüketim örtüşmesi saat saat hesaplandı, alış-satış makası yeni dönem kurallarıyla modellendi.",
      sonuc: [
        "Gündüz yoğun üretim profili sayesinde öz tüketim %98-100 çıktı — üretimin neredeyse tamamı satış yerine pahalı şebeke alışını ikame ediyor.",
        "Geri ödeme ~4,3 yıl bandında hesaplandı.",
        `Ölçek çevirisi: tesisin yıllık tüketimi (~${sayi(hatayYillikKwh / 1000)} bin kWh) yaklaşık ${sayi(haneEsdeger)} hanenin yıllık elektrik tüketimine eşdeğer (ortalama hane ${sayi(HANE_YILLIK_KWH)} kWh/yıl, EPDK 2024 verisi).`,
      ],
      cta: { href: "/saatlik-analiz", etiket: "Saatlik Analiz Aracı" },
    },
    {
      baslik: "10 kW konut GES'i — poliçe kapsam analizi",
      sektor: "Konut",
      tarih: "Ağustos 2026",
      sorun:
        "10 kW çatı sistemi kuran konut sahibi, mevcut konut sigortasının panellerini koruyup korumadığından emin olmak istedi.",
      neYaptik:
        "Poliçe metni, poliçe analiz aracıyla madde madde tarandı; teminat kalemleri GES risklerine (yangın, doğal afet, panel/inverter hasarı) karşı eşleştirildi.",
      sonuc: [
        "Standart konut poliçesinin GES'i kapsamadığı tespit edildi — yaygın 'konut sigortam var, panelim güvende' varsayımı bu vakada da doğru çıkmadı.",
        "Çözüm olarak poliçeye GES zeyili (ek teminat) yaptırılması önerildi; teklif alınacak başlıklar listelendi.",
      ],
      cta: { href: "/police-analizi", etiket: "Poliçe Analizi Aracı" },
    },
  ];

  return (
    <div className="wrap">
      <SiteHead aktif="diger" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Analiz Vakaları
        </span>
        <h1>
          Gerçek verilerle, <span className="hl-g">anonim vakalar</span>
        </h1>
        <p>
          Platformda yapılan gerçek analizlerden seçtiklerimiz: hangi soruyla gelindi,
          hangi veriyle ne hesaplandı, sonuç ne çıktı. Her vaka tarih damgalıdır ve
          kimlik bilgileri anonimleştirilmiştir.
        </p>
      </div>

      <section className="dk-bolum" aria-label="Vakalar" style={{ paddingBottom: 24 }}>
        <div className="dk-grid">
          {VAKALAR.map((v) => (
            <article key={v.baslik} className="dk-kart">
              <div className="dk-ust">
                <span className="dk-kurum">{v.sektor}</span>
                <span className="dk-durum aktif">{v.tarih}</span>
              </div>
              <b>{v.baslik}</b>
              <p>
                <b>Soru:</b> <Aciklamali>{v.sorun}</Aciklamali>
              </p>
              <p>
                <b>Ne yaptık:</b> <Aciklamali>{v.neYaptik}</Aciklamali>
              </p>
              <p>
                <b>Sonuç:</b>
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6 }}>
                {v.sonuc.map((s) => (
                  <li key={s.slice(0, 40)}><Aciklamali>{s}</Aciklamali></li>
                ))}
              </ul>
              <div className="dk-alt">
                <span />
                <a href={v.cta.href}>
                  {v.cta.etiket} <Ok className="i" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--text)", marginTop: 18, maxWidth: "76ch" }}>
          Vitrin yenidir; vakalar analiz yaptıkça eklenir. Tüm vakalar
          anonimleştirilmiştir — sayısal sonuçlar sitedeki analiz araçlarının gerçek
          çıktılarından alınmıştır (Ağustos 2026).
        </p>
      </section>

      <section className="dk-cta" style={{ marginBottom: 48 }}>
        <SunDolu className="i" />
        <div>
          <b>Sizin vakanız da böyle netleşsin</b>
          <p>
            Faturanızı, saatlik verinizi veya teklifinizi yükleyin; aynı motorlarla size
            özel sonucu görün.
          </p>
        </div>
        <div className="dk-cta-btn">
          <a className="gt-btn small line" href="/fatura-analizi">
            Fatura Analizi
          </a>
          <a className="gt-btn small" href="/asistan">
            Asistana Sorun <Ok className="i" />
          </a>
        </div>
      </section>

      </main>
      <SiteFoot notu="Bu içerik bilgilendirme amaçlıdır; bağlayıcı görüş değildir." />
    </div>
  );
}
