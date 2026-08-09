import Link from "next/link";
import { META } from "@/data/kb";

const SUTUNLAR: Array<[string, Array<[string, string]>]> = [
  [
    "Araçlar",
    [
      ["/asistan", "Asistan"],
      ["/fatura-analizi", "Fatura Analizi"],
      ["/teklif-analizi", "Teklif Değerlendirme"],
      ["/simulasyon", "Simülasyon"],
      ["/hesaplama", "Hesaplama"],
      ["/destekler", "Destekler"],
    ],
  ],
  [
    "Rehberler",
    [
      ["/surec", "Süreç Rehberi"],
      ["/mevzuat", "Mevzuat"],
      ["/rehber", "Rehber"],
      ["/kurulum-sonrasi", "Kurulum Sonrası"],
      ["/sss", "Sık Sorulan Sorular"],
      ["/blog", "Blog"],
    ],
  ],
];

export default function SiteFoot({ notu }: { yol?: string; notu?: string }) {
  return (
    <footer className="site-foot">
      <div>
        <b>gesdanismani.com</b> — GES danışmanlık platformu
        <br />
        Tarife verisi: EPDK, {META.tarifeGecerlilik} · Piyasa verisi: {META.piyasaKaynak}
        <br />
        İletişim: <a href="mailto:iletisim@gesdanismani.com">iletisim@gesdanismani.com</a>
      </div>
      {SUTUNLAR.map(([baslik, linkler]) => (
        <nav key={baslik} className="foot-sutun" aria-label={baslik}>
          <b>{baslik}</b>
          {linkler.map(([href, ad]) => (
            <Link key={href} href={href}>
              {ad}
            </Link>
          ))}
        </nav>
      ))}
      <div className="cols">
        <span>{notu ?? "Yanıtlar bilgilendirme amaçlıdır; bağlayıcı görüş niteliği taşımaz."}</span>
        <Link href="/gizlilik">Gizlilik ve KVKK Aydınlatma Metni</Link>
      </div>
    </footer>
  );
}
