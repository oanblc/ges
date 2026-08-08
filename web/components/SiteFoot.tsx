import { META } from "@/data/kb";
import denetim from "@/data/denetim.json";
import { Kalkan } from "./Icons";

const tarihTr = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
      <div className="cols">
        <span>{notu ?? "Yanıtlar bilgilendirme amaçlıdır; bağlayıcı görüş niteliği taşımaz."}</span>
      </div>
    </footer>
  );
}
