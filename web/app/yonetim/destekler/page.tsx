import type { Metadata } from "next";
import YonetimKabuk from "@/components/YonetimKabuk";
import DestekDurum from "@/components/DestekDurum";
import { servisIstek, yetkiKontrol } from "@/lib/yonetim";

export const metadata: Metadata = {
  title: "Destekler — Yönetim",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Destek = {
  id: string;
  ad: string;
  kurum: string;
  tur: string;
  kitle: string[];
  ozet: string;
  durum: string;
  sonKontrol?: string;
  not?: string;
};

type DestekVeri = { guncelleme?: string; yazilabilir?: boolean; destekler: Destek[] };

export default async function DesteklerYonetim() {
  await yetkiKontrol();
  let veri: DestekVeri | null = null;
  try {
    veri = (await servisIstek("/yonetim/destekler")) as DestekVeri;
  } catch {
    /* uyarı aşağıda */
  }

  return (
    <YonetimKabuk aktif="/yonetim/destekler">
      <h1>Destek Listesi</h1>
      <p className="yp-aciklama">
        Durumu buradan değiştirirsen değişiklik repoya işlenir ve site birkaç dakika içinde
        yeniden yayınlanır. Yeni destek adayları Onay Kutusu&apos;ndaki bekçi raporlarından gelir.
      </p>
      {!veri ? (
        <p className="yp-hata">Destek verisi okunamadı.</p>
      ) : (
        <>
          {!veri.yazilabilir && (
            <p className="yp-hata">
              GITHUB_TOKEN tanımlı olmadığı için liste okunur-yalnız; durum değişikliği siteye
              yansıtılamaz.
            </p>
          )}
          <div className="yp-tablo-kutu">
            <table className="destek-tablo">
              <thead>
                <tr>
                  <th>Destek</th>
                  <th>Kitle</th>
                  <th>Son kontrol</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {veri.destekler.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <b>{d.kurum}</b> — {d.ad}
                      <p style={{ margin: "4px 0 0", color: "var(--text)", fontWeight: 400 }}>
                        {d.ozet}
                      </p>
                      {d.not && (
                        <p style={{ margin: "4px 0 0", color: "#A5620D", fontWeight: 400 }}>
                          Not: {d.not}
                        </p>
                      )}
                    </td>
                    <td>{d.kitle.join(", ")}</td>
                    <td>{d.sonKontrol || "—"}</td>
                    <td>
                      <DestekDurum id={d.id} durum={d.durum} yazilabilir={!!veri.yazilabilir} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </YonetimKabuk>
  );
}
