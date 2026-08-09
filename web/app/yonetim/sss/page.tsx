import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import SssDuzenleyici from "@/components/SssDuzenleyici";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "SSS Yönetimi — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Veri = {
  guncelleme?: string;
  kaynak?: string;
  kategoriler: Array<{ ad: string; sorular: Array<{ soru: string; cevap: string }> }>;
};

export default async function SssYonetim() {
  await yetkiKontrol();
  let yanit: { yazilabilir: boolean; veri: Veri | null } | null = null;
  let hata = "";
  try {
    yanit = (await servisIstek("/yonetim/sss")) as { yazilabilir: boolean; veri: Veri | null };
  } catch {
    hata = "Asistan servisine ulaşılamadı.";
  }

  return (
    <YonetimKabuk aktif="/yonetim/sss">
      <h1>SSS Yönetimi</h1>
      <p className="yp-aciklama">
        Sorularda yaptığın değişiklikler &quot;Değişiklikleri Yayınla&quot; ile repoya işlenir;
        site birkaç dakika içinde yeni haliyle yayınlanır.
      </p>
      {hata && <p className="yp-hata">{hata}</p>}
      {yanit && !yanit.yazilabilir && (
        <p className="yp-hata">
          SSS düzenlemek için asistan servisine GITHUB_TOKEN eklenmesi gerekiyor (içerik yazma
          izinli fine-grained token).
        </p>
      )}
      {yanit?.veri && <SssDuzenleyici ilkVeri={yanit.veri} />}
    </YonetimKabuk>
  );
}
