"use client";

import { useState } from "react";
import { Atac, Ok } from "./Icons";
import { Aciklamali } from "./Terim";
import { ILLER } from "@/data/kb";

/**
 * Saatlik tüketim analizi: dağıtım şirketi/EPİAŞ saatlik döküm dosyası (CSV/XLSX)
 * yüklenir, il ve isteğe bağlı birim fiyatlarla saat saat GES simülasyonu döner.
 */

type Ozet = {
  toplamKwh: number;
  gunSayisi: number;
  aylikOrtKwh: number;
  tepeKw: number;
  gunduzOrani: number;
};
type Senaryo = {
  kwp: number;
  yillikUretimKwh: number;
  ozTuketimOrani: number;
  ozTuketimKwh: number;
  fazlaKwh: number;
  yillikTasarrufTl: number;
  yillikSatisTl: number;
  yatirimTl: number;
  geriOdemeYil: number | null;
};
type Cikti = { ozet: Ozet; senaryolar: Senaryo[]; notlar: string[] };
type Grup = "mesken" | "ticarethane" | "sanayi" | "osb";

const GRUPLAR: Array<[Grup, string]> = [
  ["mesken", "Mesken"],
  ["ticarethane", "Ticarethane"],
  ["sanayi", "Sanayi"],
  ["osb", "OSB"],
];

const tl = (n: number) => "₺" + Math.round(n).toLocaleString("tr-TR");
const binTl = (n: number) =>
  n >= 1_000_000
    ? (n / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " M₺"
    : Math.round(n / 1000).toLocaleString("tr-TR") + " bin ₺";
const kwh = (n: number) => Math.round(n).toLocaleString("tr-TR") + " kWh";
const yuzde = (n: number) => "%" + Math.round(n * 100);

function dosyaTipi(ad: string): "csv" | "xlsx" | null {
  const kucuk = ad.toLocaleLowerCase("tr");
  if (kucuk.endsWith(".csv")) return "csv";
  if (kucuk.endsWith(".xlsx")) return "xlsx";
  return null;
}

/** "1,45" / "1.45" → sayı; boş ya da geçersizse undefined. */
function fiyatCoz(s: string): number | undefined {
  const temiz = s.trim().replace(",", ".");
  if (!temiz) return undefined;
  const n = Number(temiz);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default function SaatlikAnaliz() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [surukleniyor, setSurukleniyor] = useState<boolean>(false);
  const [il, setIl] = useState<string>("İstanbul");
  const [grup, setGrup] = useState<Grup>("sanayi");
  const [aktifFiyat, setAktifFiyat] = useState<string>("");
  const [dagitimFiyat, setDagitimFiyat] = useState<string>("");
  const [mesgul, setMesgul] = useState<boolean>(false);
  const [hata, setHata] = useState<string | null>(null);
  const [sonuc, setSonuc] = useState<Cikti | null>(null);

  function dosyaSec(secilen: File | undefined) {
    setHata(null);
    if (!secilen) return;
    if (!dosyaTipi(secilen.name))
      return setHata("CSV veya XLSX dosyası yükleyin — dağıtım şirketinizden ya da EPİAŞ'tan aldığınız saatlik döküm.");
    if (secilen.size > 5 * 1024 * 1024) return setHata("Dosya 5 MB'ı aşmamalı.");
    setDosya(secilen);
    setSonuc(null);
  }

  async function analizEt() {
    setHata(null);
    if (!dosya) return setHata("Önce saatlik tüketim dosyanızı yükleyin.");
    const tip = dosyaTipi(dosya.name);
    if (!tip) return setHata("CSV veya XLSX dosyası yükleyin.");
    setMesgul(true);
    setSonuc(null);
    try {
      const b64 = await new Promise<string>((coz, red) => {
        const r = new FileReader();
        r.onload = () => coz((r.result as string).split(",")[1] ?? "");
        r.onerror = () => red(new Error());
        r.readAsDataURL(dosya);
      });
      const govde: Record<string, unknown> = {
        il,
        grup,
        dosya: { ad: dosya.name, tip, b64 },
      };
      const aktif = fiyatCoz(aktifFiyat);
      const dagitim = fiyatCoz(dagitimFiyat);
      if (aktif !== undefined) govde.aktif_tl_kwh = aktif;
      if (dagitim !== undefined) govde.dagitim_tl_kwh = dagitim;
      const res = await fetch("/api/saatlik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(govde),
      });
      const d: Cikti & { hata?: string } = await res.json();
      if (!res.ok || d.hata) {
        if (res.status === 503)
          throw new Error(d.hata ?? "Analiz servisi şu an çalışmıyor; lütfen daha sonra deneyin.");
        if (res.status === 429)
          throw new Error(d.hata ?? "Kısa sürede çok fazla deneme yapıldı; lütfen biraz bekleyip yeniden deneyin.");
        throw new Error(d.hata ?? "Dosya çözümlenemedi; saatlik dökümün orijinal halini yüklemeyi deneyin.");
      }
      setSonuc(d);
    } catch (e) {
      setHata(
        e instanceof Error && e.message
          ? e.message
          : "Analiz şu an tamamlanamadı; lütfen daha sonra yeniden deneyin.",
      );
    } finally {
      setMesgul(false);
    }
  }

  // yalnız geri ödemesi hesaplanabilen senaryolar aday olur; hiçbirinde yoksa ★ basılmaz
  const adaylar = sonuc?.senaryolar.filter((s) => (s.geriOdemeYil ?? 0) > 0) ?? [];
  const enIyi =
    adaylar.length > 0
      ? adaylar.reduce((a, b) => ((b.geriOdemeYil ?? 0) < (a.geriOdemeYil ?? 0) ? b : a))
      : null;

  return (
    <div className="fs">
      {!sonuc && (
        <form
          className="roi-form"
          style={{ padding: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            void analizEt();
          }}
        >
          <label
            className={`fs-kutu ${mesgul ? "pasif" : ""} ${surukleniyor ? "hedef" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setSurukleniyor(true);
            }}
            onDragLeave={() => setSurukleniyor(false)}
            onDrop={(e) => {
              e.preventDefault();
              setSurukleniyor(false);
              dosyaSec(e.dataTransfer.files?.[0]);
            }}
          >
            <input
              type="file"
              accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              hidden
              disabled={mesgul}
              onChange={(e) => {
                dosyaSec(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <Atac className="i" />
            {dosya ? (
              <>
                <b>{dosya.name}</b>
                <span>Dosya hazır — ili seçip &ldquo;Analiz Et&rdquo; ile devam edin. Değiştirmek için yeni dosya seçin.</span>
              </>
            ) : (
              <>
                <b>Saatlik tüketim dökümünüzü buraya bırakın</b>
                <span>CSV veya XLSX · en fazla 5 MB · dağıtım şirketinizden ya da EPİAŞ&apos;tan alabilirsiniz</span>
              </>
            )}
          </label>
          <p className="fs-not"><Aciklamali>Dosya yalnız bu analiz için kullanılır; saat saat okunur, tüketim profiliniz çıkarılır
            ve farklı GES boyutları için öz tüketim simülasyonu yapılır.</Aciklamali></p>
          <div className="rf">
            <label>Abone grubu</label>
            <div className="rtoggle" aria-label="Abone grubu">
              {GRUPLAR.map(([k, ad]) => (
                <button
                  key={k}
                  type="button"
                  className={grup === k ? "on" : ""}
                  aria-pressed={grup === k}
                  onClick={() => setGrup(k)}
                >
                  {ad}
                </button>
              ))}
            </div>
          </div>
          <div className="fs-form-izgara">
            <div className="rf">
              <label htmlFor="saIl">İl</label>
              <select id="saIl" value={il} onChange={(e) => setIl(e.target.value)}>
                {ILLER.map(([ad]) => (
                  <option key={ad} value={ad}>
                    {ad}
                  </option>
                ))}
              </select>
            </div>
            <div className="rf">
              <label htmlFor="saAktif">Aktif enerji birim fiyatınız (isteğe bağlı)</label>
              <div className="numwrap">
                <span className="cur">₺/kWh</span>
                <input
                  id="saAktif"
                  inputMode="decimal"
                  placeholder="örn. 2,60"
                  value={aktifFiyat}
                  onChange={(e) => setAktifFiyat(e.target.value)}
                />
              </div>
            </div>
            <div className="rf">
              <label htmlFor="saDagitim">Dağıtım birim fiyatınız (isteğe bağlı)</label>
              <div className="numwrap">
                <span className="cur">₺/kWh</span>
                <input
                  id="saDagitim"
                  inputMode="decimal"
                  placeholder="örn. 1,10"
                  value={dagitimFiyat}
                  onChange={(e) => setDagitimFiyat(e.target.value)}
                />
              </div>
            </div>
          </div>
          <p className="fs-not">Birim fiyatları boş bırakırsanız seçtiğiniz abone grubunun güncel EPDK tarifesiyle
            hesaplanır; faturanızdaki birim fiyatları girerseniz sonuçlar size özel olur.</p>
          {grup === "mesken" && (
            <p className="fs-not">Meskenler aylık mahsuplaşmaya tabidir; bu araç öz tüketim profilinizi analiz eder.</p>
          )}
          <div className="tool-cta">
            <button className="gt-btn small" type="submit" disabled={mesgul}>
              {mesgul ? "Analiz ediliyor…" : "Analiz Et"} <Ok className="i" />
            </button>
            {mesgul && <p>Saatlik veriniz okunuyor ve simülasyon çalışıyor; birkaç saniye sürebilir.</p>}
          </div>
        </form>
      )}

      {sonuc && (
        <div className="fs-sonuc">
          <div className="roi-out fs-out" style={{ marginBottom: 14 }}>
            <div className="ro one">
              <div className="rv">{kwh(sonuc.ozet.toplamKwh)}</div>
              <div className="rk">
                Toplam tüketim — {sonuc.ozet.gunSayisi.toLocaleString("tr-TR")} günlük saatlik veriden
              </div>
            </div>
            <div className="ro">
              <div className="rv">{kwh(sonuc.ozet.aylikOrtKwh)}</div>
              <div className="rk">Aylık ortalama tüketim</div>
            </div>
            <div className="ro">
              <div className="rv">
                {sonuc.ozet.tepeKw.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} kW
              </div>
              <div className="rk">Tepe güç (en yüksek saatlik çekiş)</div>
            </div>
            <div className="ro">
              <div className="rv">{yuzde(sonuc.ozet.gunduzOrani)}</div>
              <div className="rk">Gündüz tüketim oranı (GES'in doğrudan karşılayabileceği dilim)</div>
            </div>
          </div>

          {sonuc.senaryolar.length > 0 && (
            <div className="tablo-kaydir sa-tablo" style={{ margin: "0 0 14px" }}>
              <table>
                <caption className="sr-only">GES boyutu senaryolarının karşılaştırması</caption>
                <thead>
                  <tr>
                    <th scope="col">Güç</th>
                    <th scope="col">Yıllık üretim</th>
                    <th scope="col">Öz tüketim</th>
                    <th scope="col">Yıllık fayda</th>
                    <th scope="col">Yatırım</th>
                    <th scope="col">Geri ödeme</th>
                  </tr>
                </thead>
                <tbody>
                  {sonuc.senaryolar.map((s) => (
                    <tr key={s.kwp} className={enIyi && s.kwp === enIyi.kwp ? "iyi" : ""}>
                      <td>
                        {s.kwp.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} kWp
                        {enIyi && s.kwp === enIyi.kwp ? " ★" : ""}
                      </td>
                      <td>{kwh(s.yillikUretimKwh)}</td>
                      <td>
                        {yuzde(s.ozTuketimOrani)} · {kwh(s.ozTuketimKwh)}
                      </td>
                      <td>{tl(s.yillikTasarrufTl + s.yillikSatisTl)}/yıl</td>
                      <td>{binTl(s.yatirimTl)}</td>
                      <td>
                        {(s.geriOdemeYil ?? 0) > 0
                          ? "≈ " + (s.geriOdemeYil ?? 0).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " yıl"
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {enIyi && (
            <p className="fs-not">
              ★ işaretli satır en kısa geri ödemeli senaryodur. Yıllık fayda, öz tüketim tasarrufu
              ({tl(enIyi.yillikTasarrufTl)}) ile şebekeye satış gelirinin ({tl(enIyi.yillikSatisTl)}) toplamıdır;
              fazla üretim ({kwh(enIyi.fazlaKwh)}) saatlik mahsuplaşma kurallarına göre değerlendirilir.
            </p>
          )}
          {sonuc.notlar.length > 0 && (
            <ul className="fs-notlar">
              {sonuc.notlar.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
          <p className="roi-note"><Aciklamali>Sonuçlar yüklediğiniz saatlik profil ve {il} güneşlenme verisiyle üretilen ön
            fizibilitedir; kesin tasarım yerinde keşif ister.</Aciklamali></p>
          <p className="fs-not">
            Tek bir boyutu gün gün oynatarak görmek için <a href="/simulasyon">Detaylı Simülasyon</a> sayfasını
            kullanabilirsiniz.
          </p>
          <div className="tool-cta">
            <a
              className="gt-btn small"
              href={`/asistan?soru=${encodeURIComponent(
                "Saatlik tüketim analizime göre hangi GES boyutu bana uygun?",
              )}`}
            >
              Asistana Sorun <Ok className="i" />
            </a>
            <button
              type="button"
              className="fs-geri"
              onClick={() => {
                setSonuc(null);
                setDosya(null);
              }}
            >
              ← Yeni dosya ile tekrar analiz et
            </button>
          </div>
        </div>
      )}

      {hata && <p className="ek-hata" style={{ margin: "12px 0 0" }}>{hata}</p>}
    </div>
  );
}
