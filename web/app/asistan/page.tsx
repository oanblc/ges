import type { Metadata } from "next";
import SiteHead from "@/components/SiteHead";
import UyeKilit from "@/components/UyeKilit";
import { uyeOku } from "@/lib/uye";
import SiteFoot from "@/components/SiteFoot";
import AsistanSohbet from "@/components/AsistanSohbet";
import { META, PIYASA } from "@/data/kb";
import { Kalkan, Grafik, Soru } from "@/components/Icons";
import { YanSorular, DanismanlikDugmesi } from "@/components/AsistanYan";
import { Terim } from "@/components/Terim";

export const metadata: Metadata = {
  title: "GES Asistanı — Güncel Mevzuatla Soru-Cevap",
  description:
    "Çatı güneş enerjisiyle ilgili sorularınızı sorun: EPDK/EPİAŞ kaynaklı, denetimden geçen, hesapları güncel tarifelerle yapan yapay zekâ destekli GES asistanı.",
  alternates: { canonical: "/asistan" },
};

export default async function AsistanSayfa({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const uye = await uyeOku();
  const p = await searchParams;
  const ilkSoru = typeof p.soru === "string" ? p.soru.slice(0, 500) : undefined;

  return (
    <div className="wrap">
      <SiteHead aktif="asistan" />
      <main id="icerik">
      <div className="as-ust">
        <h1>
          GES Asistanı <span className="pulse">Güncel mevzuat · {META.kbGuncelleme}</span>
        </h1>
        <p>
          Sorularınız EPDK ve EPİAŞ kaynaklı bilgi tabanıyla, güncel tarifelerle cevaplanır.
        </p>
      </div>

      <div className="as-wrap">
        {uye ? <AsistanSohbet ilkSoru={ilkSoru} /> : <UyeKilit donus="/asistan" />}

        <aside className="as-side">
          <div className="side-card">
            <h3>
              <Grafik className="i" /> Canlı piyasa verisi
            </h3>
            <div className="live">
              <span><Terim ad="PTF">PTF</Terim> ({PIYASA.ay} ort.)</span>
              <span className="v mono">{(PIYASA.ptfOrtalama / 1000).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺/kWh</span>
            </div>
            <div className="live">
              <span><Terim ad="PTF">PTF</Terim> güneş saatleri</span>
              <span className="v mono">{(PIYASA.ptfGunesSaatleri / 1000).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺/kWh</span>
            </div>
            <div className="live">
              <span><Terim ad="YEKDEM">YEKDEM</Terim> ({PIYASA.yekdemAyi})</span>
              <span className="v mono">{(PIYASA.yekdemGerceklesenSon / 1000).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺/kWh</span>
            </div>
            <div className="live">
              <span>Kaynak</span>
              <span className="v"><Terim ad="EPİAŞ">EPİAŞ</Terim> Şeffaflık</span>
            </div>
          </div>

          <div className="side-card">
            <h3>
              <Soru className="i" /> Örnek sorular
            </h3>
            <YanSorular />
          </div>

          <div className="side-card">
            <h3>
              <Kalkan className="i" /> Nasıl çalışır
            </h3>
            <div className="as-how">
              <span className="k">1</span>
              <span>Cevaplar EPDK/EPİAŞ kaynaklı bilgi tabanından gelir</span>
            </div>
            <div className="as-how">
              <span className="k">2</span>
              <span>Hesaplamalar güncel tarifelerle, hesap araçlarıyla yapılır</span>
            </div>
            <div className="as-how">
              <span className="k">3</span>
              <span>Her cevap yayınlanmadan bağımsız denetimden geçer</span>
            </div>
          </div>

          <div className="cta">
            <h3>Projenizi birlikte planlayalım</h3>
            <p>
              Sorularınız netleşince süreç yönetimi ve teklif karşılaştırması için danışmanlık
              talebi bırakın.
            </p>
            <DanismanlikDugmesi />
          </div>
        </aside>
      </div>

      </main>
      <SiteFoot yol="/asistan" />
    </div>
  );
}
