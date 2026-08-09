import type { Metadata } from "next";
import SiteHead from "@/components/SiteHead";
import SiteFoot from "@/components/SiteFoot";
import { META } from "@/data/kb";
import { Ok, SunDolu } from "@/components/Icons";
import { Aciklamali } from "@/components/Terim";

export const metadata: Metadata = {
  title: "Bilgi Kütüphanesi — GES Rehberi ve Yaygın Yanlışlar",
  description:
    "Tarifeler, mahsuplaşma, özel durumlar, depolama ve finansman: GES bilgi kütüphanesi. Sahada dolaşan 7 yaygın yanlışın doğrusu.",
  alternates: { canonical: "/rehber" },
};

/** İçerik kb/sss-saha-taramasi.md (7 mit) ve konu dosyalarının yayın özetlerinden. */
const MITLER = [
  {
    mit: "Saatlik mahsup evleri de kapsıyor, ev GES'i öldü",
    gercek:
      "Konutlar saatlik mahsuplaşmadan muaftır; aylık mahsuplaşma aynen devam eder. Kademeli tarifeden kurtarma, 2026'nın en güçlü konut gerekçesidir.",
  },
  {
    mit: "Devlet meskene hibe veriyor / bedava panel dağıtıyor",
    gercek:
      "Genel konut hibesi yoktur; teşvik mahsuplaşma + krediden oluşur. 'Bedava panel' kapı satışı bilinen bir dolandırıcılık kalıbıdır.",
  },
  {
    mit: "Fatura tamamen sıfırlanır",
    gercek:
      "Dağıtım bedeli ve vergiler her durumda kalır; gerçekçi beklenti %70-90 azalmadır.",
  },
  {
    mit: "İzin gerekmez, tak-çalıştır",
    gercek:
      "Şebekeye bağlı her sistemde çağrı mektubu süreci zorunludur. Muafiyet yalnız off-grid ve balkon tipi sistemlerdedir.",
  },
  {
    mit: "Kışın panel çalışmaz",
    gercek:
      "Üretim %50-70 azalır ama sürer. Fizibilite yıllık ortalamayla yapılır; kış ayı geçen yılın aynı ayıyla kıyaslanır.",
  },
  {
    mit: "Elektrik kesintisinde panelim evi besler",
    gercek:
      "Bataryasız şebeke bağlantılı sistem kesintide güvenlik gereği durur. Kesinti sigortası isteyen kritik yük panolu batarya kurar.",
  },
  {
    mit: "İstediğim kadar üretir satarım",
    gercek:
      "Yıllık üretimin, tüketiminizin 2 katını aşan kısmı bedelsiz YEKDEM'e devredilir; sistem tüketiminize göre boyutlandırılır.",
  },
];

const KONULAR = [
  {
    baslik: "Tarifeler ve Faturanız",
    ozet:
      "Kademeli konut tarifesi (~240 kWh/ay eşiği), ticarethane/sanayi grupları, dağıtım bedeli ve vergilerin fatura içindeki yeri.",
    soru: "Elektrik faturamı kalem kalem açıklar mısın?",
  },
  {
    baslik: "Mahsuplaşma ve Satış",
    ozet:
      "Konutta aylık, işletmede saatlik mahsuplaşma; öz tüketim oranının önemi, fazla üretimin satış fiyatı ve 2× tüketim tavanı.",
    soru: "Saatlik mahsuplaşma benim faturamı nasıl etkiler?",
  },
  {
    baslik: "Apartman, Kiracı ve Özel Durumlar",
    ozet:
      "Kat maliki kararları, kiracıda noter muvafakati, hisseli tapu, OSB'de farklı başvuru, arazi GES kısıtları ve EV şarjı.",
    soru: "Apartmanda oturuyorum, GES kurabilir miyim?",
  },
  {
    baslik: "Sistem Tasarımı",
    ozet:
      "String hesabı, DC/AC oranı (1,1-1,3), gölge analizi, yön-eğim etkisi ve datasheet'te bakılacak üç kritik sayı.",
    soru: "Çatım için doğru sistem tasarımı nasıl olmalı?",
  },
  {
    baslik: "Batarya ve Depolama",
    ozet:
      "LFP ev standardı, boyutlandırma kuralları, depodan şebekeye satışın ödenmemesi ve arbitrajın konutta neden kârlı olmadığı.",
    soru: "GES'ime batarya eklemeli miyim?",
  },
  {
    baslik: "Finansman ve Sigorta",
    ozet:
      "KOSGEB, YTB, IPARD, banka kredileri ve leasing yapıları; konut poliçesinin GES'i otomatik kapsamadığı gerçeği.",
    soru: "GES yatırımımı nasıl finanse edebilirim?",
  },
  {
    baslik: "Kurulumcu Seçimi ve Güvenlik",
    ozet:
      "EMO/SMM doğrulama paketi, sözleşme kontrol listesi, ödeme planı kuralları ve 'garantili getiri' dolandırıcılığının kırmızı bayrakları.",
    soru: "Güvenilir GES kurulumcusunu nasıl seçerim?",
  },
  {
    baslik: "İzleme ve Akıllı Kullanım",
    ozet:
      "İnverter izleme uygulamaları, özgül üretim ve PR ölçütleri, yük kaydırma ve EV'yi üretim fazlasıyla şarj etme.",
    soru: "Üretimimi nasıl izler ve öz tüketimimi nasıl artırırım?",
  },
];

export default function Rehber() {
  return (
    <div className="wrap">
      <SiteHead aktif="rehber" />
      <main id="icerik">

      <div className="calc-ust">
        <span className="sub-title">
          <SunDolu />
          Bilgi Kütüphanesi
        </span>
        <h1>
          GES'e dair <span className="hl-g">merak edilen</span> her konu
        </h1>
        <p>
          Tarifelerden batarya seçimine, süreç boyunca karşınıza çıkacak konuları burada
          topladık (son güncelleme: {META.kbGuncelleme}). Bir konu seçin; ayrıntısını
          asistanla kendi durumunuz üzerinden konuşabilirsiniz.
        </p>
      </div>

      <section className="dk-bolum" aria-label="Yaygın yanlışlar">
        <h2>Sahada dolaşan 7 yaygın yanlış</h2>
        <div className="dk-grid">
          {MITLER.map((m) => (
            <article key={m.mit} className="dk-kart mit-kart">
              <span className="mit">&ldquo;{m.mit}&rdquo;</span>
              <b>Gerçek</b>
              <p><Aciklamali>{m.gercek}</Aciklamali></p>
            </article>
          ))}
        </div>
      </section>

      <section className="dk-bolum" aria-label="Konular">
        <h2>Konular</h2>
        <div className="dk-grid">
          {KONULAR.map((k) => (
            <article key={k.baslik} className="dk-kart">
              <b>{k.baslik}</b>
              <p><Aciklamali>{k.ozet}</Aciklamali></p>
              <div className="dk-alt">
                <span />
                <a href={`/asistan?soru=${encodeURIComponent(k.soru)}`}>
                  Asistana Sorun <Ok className="i" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dk-cta">
        <SunDolu className="i" />
        <div>
          <b>Sorunuz listede yok mu?</b>
          <p>
            Sorunuzu kendi cümlelerinizle yazmanız yeterli; asistan güncel mevzuata
            dayanarak yanıtlar ve dayandığı kaynağı belirtir.
          </p>
        </div>
        <div className="dk-cta-btn">
          <a className="gt-btn small" href="/asistan">
            Sohbete Başlayın <Ok className="i" />
          </a>
        </div>
      </section>

      </main>
      <SiteFoot yol="/rehber" />
    </div>
  );
}
