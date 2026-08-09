import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import TaslakOkundu from "@/components/TaslakOkundu";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Onay Kutusu — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Taslak = { ad: string; okundu: boolean; boyut: number; icerik: string };

export default async function OnayKutusu() {
  await yetkiKontrol();
  let taslaklar: Taslak[] = [];
  let hata = "";
  try {
    taslaklar = ((await servisIstek("/yonetim/taslaklar")) as { taslaklar: Taslak[] }).taslaklar;
  } catch {
    hata = "Asistan servisine ulaşılamadı.";
  }
  const bekleyen = taslaklar.filter((t) => !t.okundu);
  const okunan = taslaklar.filter((t) => t.okundu);

  const kutu = (liste: Taslak[]) => (
    <div className="yp-sohbet">
      {liste.map((t) => (
        <details key={t.ad} className="yp-kayit">
          <summary>
            <span className={`yp-durum ${t.okundu ? "kapandi" : "aranmadi"}`}>
              {t.okundu ? "Okundu" : "Yeni"}
            </span>
            <span className="yp-kayit-soru">{t.ad}</span>
            <TaslakOkundu ad={t.ad} okundu={t.okundu} />
          </summary>
          <pre className="yp-taslak">{t.icerik}</pre>
        </details>
      ))}
    </div>
  );

  return (
    <YonetimKabuk aktif="/yonetim/onay">
      <h1>Onay Kutusu</h1>
      <p className="yp-aciklama">
        Ajanların (nöbetçi, destek bekçisi, sayfa denetçisi) ürettiği raporlar. Bilgi
        tabanına işlenecek bir bulgu görürsen not al; işleme kararını yine sen verirsin.
      </p>
      {hata && <p className="yp-hata">{hata}</p>}
      {!hata && taslaklar.length === 0 && <p>Bekleyen rapor yok.</p>}
      {bekleyen.length > 0 && (
        <>
          <h2>Yeni ({bekleyen.length})</h2>
          {kutu(bekleyen)}
        </>
      )}
      {okunan.length > 0 && (
        <>
          <h2>Okunanlar ({okunan.length})</h2>
          {kutu(okunan)}
        </>
      )}
    </YonetimKabuk>
  );
}
