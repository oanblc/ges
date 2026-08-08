import Link from "next/link";
import { META } from "@/data/kb";
import denetim from "@/data/denetim.json";
import { Kalkan } from "./Icons";

const tarihTr = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const SUTUNLAR: Array<[string, Array<[string, string]>]> = [
  [
    "Araçlar",
    [
      ["/asistan", "Asistan"],
      ["/fatura-analizi", "Fatura Analizi"],
      ["/hesaplama", "Hesaplama"],
      ["/destekler", "Destekler"],
    ],
  ],
  [
    "Rehberler",
    [
      ["/surec", "Süreç Rehberi"],
      ["/rehber", "Rehber"],
      ["/kurulum-sonrasi", "Kurulum Sonrası"],
      ["/blog", "Blog"],
    ],
  ],
];

export default function SiteFoot({ yol, notu }: { yol: string; notu?: string }) {
  const kayit = denetim.sayfalar.find((s) => s.yol === yol);
  return (
    <footer className="site-foot">
      <div>
        <b>gesdanışmanı</b> — GES danışmanlık platformu
        <br />
        Tarife verisi: EPDK, {META.tarifeGecerlilik} · Piyasa verisi: {META.piyasaKaynak}
        {kayit?.durum === "dogrulandi" && kayit.sonKontrol && (
          <>
            <br />
            <span className="denetim">
              <Kalkan className="i" />
              Bu sayfadaki bilgiler {tarihTr(kayit.sonKontrol)} tarihinde denetlendi
            </span>
          </>
        )}
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
