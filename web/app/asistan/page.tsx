import type { Metadata } from "next";
import SiteHead from "@/components/SiteHead";
import AsistanSohbet from "@/components/AsistanSohbet";
import { META, PIYASA } from "@/data/kb";
import { Ok, Kalkan, Grafik, Soru } from "@/components/Icons";

export const metadata: Metadata = {
  title: "GES Asistanı — Güncel Mevzuatla Soru-Cevap",
  description:
    "Çatı güneş enerjisiyle ilgili sorularınızı sorun: EPDK/EPİAŞ kaynaklı, denetimden geçen, hesapları güncel tarifelerle yapan yapay zekâ destekli GES asistanı.",
};

const YAN_SORULAR = [
  "Panel taktırdım, neden hâlâ fatura geliyor?",
  "Saatlik mahsuplaşma beni etkiler mi?",
  "Kiracıyım, çatıya panel taktırabilir miyim?",
  "Elektrik kesilince panellerim evi besler mi?",
];

export default async function AsistanSayfa({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const p = await searchParams;
  const ilkSoru = typeof p.soru === "string" ? p.soru.slice(0, 500) : undefined;

  return (
    <div className="wrap">
      <SiteHead aktif="asistan" />
      <div className="as-ust">
        <h1>
          GES Asistanı <span className="pulse">Güncel mevzuat · {META.kbGuncelleme}</span>
        </h1>
        <p>
          Sorularınız EPDK ve EPİAŞ kaynaklı bilgi tabanıyla, güncel tarifelerle cevaplanır.
        </p>
      </div>

      <div className="as-wrap">
        <AsistanSohbet ilkSoru={ilkSoru} />

        <aside className="as-side">
          <div className="side-card">
            <h3>
              <Grafik className="i" /> Canlı piyasa verisi
            </h3>
            <div className="live">
              <span>PTF ({PIYASA.ay} ort.)</span>
              <span className="v mono">{(PIYASA.ptfOrtalama / 1000).toFixed(2)} ₺/kWh</span>
            </div>
            <div className="live">
              <span>PTF güneş saatleri</span>
              <span className="v mono">{(PIYASA.ptfGunesSaatleri / 1000).toFixed(2)} ₺/kWh</span>
            </div>
            <div className="live">
              <span>YEKDEM ({PIYASA.yekdemAyi})</span>
              <span className="v mono">{(PIYASA.yekdemGerceklesenSon / 1000).toFixed(3)} ₺/kWh</span>
            </div>
            <div className="live">
              <span>Kaynak</span>
              <span className="v">EPİAŞ Şeffaflık</span>
            </div>
          </div>

          <div className="side-card">
            <h3>
              <Soru className="i" /> Örnek sorular
            </h3>
            {YAN_SORULAR.map((s) => (
              <a key={s} className="q" href={`/asistan?soru=${encodeURIComponent(s)}`}>
                <Ok className="i" />
                {s}
              </a>
            ))}
          </div>

          <div className="side-card">
            <h3>
              <Kalkan className="i" /> Nasıl çalışır
            </h3>
            <div className="how">
              <span className="k">1</span>
              <span>Cevaplar EPDK/EPİAŞ kaynaklı bilgi tabanından gelir</span>
            </div>
            <div className="how">
              <span className="k">2</span>
              <span>Hesaplar deterministik araçla yapılır — asistan rakam uydurmaz</span>
            </div>
            <div className="how">
              <span className="k">3</span>
              <span>Her cevap yayınlanmadan bağımsız denetimden geçer</span>
            </div>
          </div>

          <div className="cta">
            <h3>Projenizi birlikte planlayalım</h3>
            <p>
              Sorularınız netleşince süreç yönetimi ve teklif karşılaştırması için danışmanlık
              talebi bırakın — sohbetin altındaki düğmeyi kullanmanız yeterli.
            </p>
          </div>
        </aside>
      </div>

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
