"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UyeCikis from "./UyeCikis";
import {
  ArtiYalin, Bilgi, Cop, Dosya, DosyaOnay, Gonder, Grafik, Hedef, Kalkan,
  Kilit, Kullanici, Ok, Pano, Simsek, Sohbet, Sun, Takvim, Zil,
} from "./Icons";

/** /hesap üye paneli: 4 bölüm — genel bakış, konuşmalar, talepler, hesap bilgileri. */

type Ozet = {
  ad: string; eposta: string; kayit: string;
  soruSayisi: number; analizSayisi: number; sonAktivite: string; acikTalep: number;
};
type SohbetMesaj = { soru: string; cevap: string; zaman: string };
type Konusma = { oturum: string; baslangic: string; son: string; adet: number; ilkSoru: string; mesajlar: SohbetMesaj[] };
type TalepMesaj = { kim: "uye" | "ekip"; metin: string; zaman: string };
type Talep = {
  id: string; konu: string; durum: "acik" | "yanitlandi" | "kapandi";
  mesajlar: TalepMesaj[]; olusturma: string; guncelleme: string;
};

const YUKLENEMEDI = "Şu an yüklenemedi; lütfen daha sonra yeniden deneyin.";

const KONULAR: Array<[string, string]> = [
  ["fizibilite", "Fizibilite"],
  ["mevzuat", "Mevzuat"],
  ["teklif", "Teklif değerlendirme"],
  ["diger", "Diğer"],
];
const KONU_ETIKET = Object.fromEntries(KONULAR);

const DURUM_ETIKET: Record<Talep["durum"], [string, string]> = {
  acik: ["acik", "Açık"],
  yanitlandi: ["yanit", "Yanıtlandı"],
  kapandi: ["kapandi", "Kapandı"],
};

const ARACLAR: Array<[string, string, string, React.ReactNode]> = [
  ["/simulasyon", "Güneş Sahası Simülasyonu", "İlinize göre üretim, mahsup ve geri ödeme", <Sun key="s" className="i" />],
  ["/fatura-analizi", "Fatura Analizi", "Faturanızdan GES planınıza", <Dosya key="f" className="i" />],
  ["/teklif-analizi", "Teklif Değerlendirme", "Elinizdeki teklif piyasaya uygun mu", <DosyaOnay key="t" className="i" />],
  ["/police-analizi", "Poliçe Analizi", "GES sigortanız yeterli mi", <Kalkan key="p" className="i" />],
  ["/asistan", "GES Asistanı", "Güncel mevzuatla soru-cevap", <Sohbet key="a" className="i" />],
];

const BOLUMLER: Array<[string, string, React.ReactNode]> = [
  ["genel", "Genel Bakış", <Pano key="g" className="i" />],
  ["konusmalar", "Konuşmalarım", <Sohbet key="k" className="i" />],
  ["talepler", "Taleplerim", <Hedef key="t" className="i" />],
  ["hesap", "Hesap Bilgileri", <Kullanici key="h" className="i" />],
];

function gunUzun(s: string) {
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
function gunKisa(s: string) {
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}
function ayYil(s: string) {
  if (!s) return "";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
}
function kisaZaman(s: string) {
  if (!s) return "";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return `${d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}, ${d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}`;
}

async function getir<T>(yol: string): Promise<T> {
  const res = await fetch(yol, { cache: "no-store" });
  const d = (await res.json().catch(() => ({}))) as T & { hata?: string };
  if (!res.ok) throw new Error(d.hata || YUKLENEMEDI);
  return d;
}
async function gonderiJson(yol: string, veri: unknown) {
  const res = await fetch(yol, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(veri),
  });
  const d = (await res.json().catch(() => ({}))) as { hata?: string };
  if (!res.ok) throw new Error(d.hata || "İşlem şu an yapılamadı; lütfen daha sonra deneyin.");
  return d;
}

export default function HesapPanel({ ad, eposta }: { ad: string; eposta: string }) {
  const yonlendir = useRouter();
  const [bolum, setBolum] = useState<string>("genel");

  // veri
  const [ozet, setOzet] = useState<Ozet | null>(null);
  const [ozetHata, setOzetHata] = useState<string>("");
  const [konusmalar, setKonusmalar] = useState<Konusma[] | null>(null);
  const [konusmaHata, setKonusmaHata] = useState<string>("");
  const [seciliOturum, setSeciliOturum] = useState<string>("");
  const [talepler, setTalepler] = useState<Talep[] | null>(null);
  const [talepHata, setTalepHata] = useState<string>("");
  const [seciliTalep, setSeciliTalep] = useState<string>("");

  async function talepleriYukle() {
    try {
      const d = await getir<{ talepler: Talep[] }>("/api/uye/talepler");
      setTalepler(d.talepler ?? []);
      setTalepHata("");
    } catch (e) {
      setTalepHata(e instanceof Error ? e.message : YUKLENEMEDI);
      setTalepler((eski) => eski ?? []);
    }
  }

  useEffect(() => {
    getir<Ozet>("/api/uye/ozet")
      .then(setOzet)
      .catch((e: unknown) => setOzetHata(e instanceof Error ? e.message : YUKLENEMEDI));
    getir<{ sohbetler: Konusma[] }>("/api/uye/sohbetler")
      .then((d) => setKonusmalar(d.sohbetler ?? []))
      .catch((e: unknown) => {
        setKonusmaHata(e instanceof Error ? e.message : YUKLENEMEDI);
        setKonusmalar([]);
      });
    void talepleriYukle();
  }, []);

  // konuşma seçimi
  const konusma = useMemo(() => {
    if (!konusmalar?.length) return null;
    return konusmalar.find((k) => k.oturum === seciliOturum) ?? konusmalar[0];
  }, [konusmalar, seciliOturum]);

  // talep seçimi
  const talep = useMemo(() => {
    if (!talepler?.length) return null;
    return talepler.find((t) => t.id === seciliTalep) ?? talepler[0];
  }, [talepler, seciliTalep]);

  // yeni talep formu
  const [konu, setKonu] = useState<string>("fizibilite");
  const [mesaj, setMesaj] = useState<string>("");
  const [talepGidiyor, setTalepGidiyor] = useState<boolean>(false);
  const [talepFormNot, setTalepFormNot] = useState<string>("");
  const [talepFormHata, setTalepFormHata] = useState<string>("");

  async function talepGonder(e: React.FormEvent) {
    e.preventDefault();
    if (!mesaj.trim() || talepGidiyor) return;
    setTalepGidiyor(true);
    setTalepFormNot("");
    setTalepFormHata("");
    try {
      await gonderiJson("/api/uye/talep", { konu, mesaj: mesaj.trim() });
      setMesaj("");
      setTalepFormNot("Talebiniz alındı; ekibimiz iş günlerinde 24 saat içinde yanıtlar.");
      await talepleriYukle();
    } catch (er) {
      setTalepFormHata(er instanceof Error ? er.message : YUKLENEMEDI);
    } finally {
      setTalepGidiyor(false);
    }
  }

  // talep yanıtı
  const [cevap, setCevap] = useState<string>("");
  const [cevapGidiyor, setCevapGidiyor] = useState<boolean>(false);
  const [cevapHata, setCevapHata] = useState<string>("");

  async function cevapGonder(e: React.FormEvent) {
    e.preventDefault();
    if (!talep || !cevap.trim() || cevapGidiyor) return;
    setCevapGidiyor(true);
    setCevapHata("");
    try {
      await gonderiJson("/api/uye/talep-yanit", { id: talep.id, mesaj: cevap.trim() });
      setCevap("");
      await talepleriYukle();
    } catch (er) {
      setCevapHata(er instanceof Error ? er.message : YUKLENEMEDI);
    } finally {
      setCevapGidiyor(false);
    }
  }

  // hesap bilgileri
  const [adGirdi, setAdGirdi] = useState<string>(ad);
  const [adNot, setAdNot] = useState<string>("");
  const [adHata, setAdHata] = useState<string>("");
  const [eskiSifre, setEskiSifre] = useState<string>("");
  const [yeniSifre, setYeniSifre] = useState<string>("");
  const [sifreNot, setSifreNot] = useState<string>("");
  const [sifreHata, setSifreHata] = useState<string>("");
  const [bildirim, setBildirim] = useState<boolean>(true);
  const [silHata, setSilHata] = useState<string>("");

  async function adKaydet(e: React.FormEvent) {
    e.preventDefault();
    setAdNot("");
    setAdHata("");
    if (!adGirdi.trim()) {
      setAdHata("Ad Soyad boş bırakılamaz.");
      return;
    }
    try {
      await gonderiJson("/api/uye/guncelle", { ad: adGirdi.trim() });
      setAdNot("Bilgileriniz güncellendi.");
      yonlendir.refresh();
    } catch (er) {
      setAdHata(er instanceof Error ? er.message : YUKLENEMEDI);
    }
  }

  async function sifreDegistir(e: React.FormEvent) {
    e.preventDefault();
    setSifreNot("");
    setSifreHata("");
    if (yeniSifre.length < 8 || !/[a-zA-ZğüşöçıİĞÜŞÖÇ]/.test(yeniSifre) || !/\d/.test(yeniSifre)) {
      setSifreHata("Yeni şifre en az 8 karakter olmalı; harf ve rakam içermelidir.");
      return;
    }
    try {
      await gonderiJson("/api/uye/sifre-degistir", { eski: eskiSifre, yeni: yeniSifre });
      setEskiSifre("");
      setYeniSifre("");
      setSifreNot("Şifreniz değiştirildi.");
    } catch (er) {
      setSifreHata(er instanceof Error ? er.message : YUKLENEMEDI);
    }
  }

  async function bildirimDegistir() {
    const yeni = !bildirim;
    setBildirim(yeni);
    try {
      await gonderiJson("/api/uye/tercih", { bildirim: yeni });
    } catch {
      setBildirim(!yeni); // kaydedilemedi — geri al
    }
  }

  async function hesabiSil() {
    setSilHata("");
    if (!confirm("Hesabınızı kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;
    try {
      await gonderiJson("/api/uye/sil", {});
      window.location.href = "/";
    } catch (er) {
      setSilHata(er instanceof Error ? er.message : YUKLENEMEDI);
    }
  }

  const ilkAd = ad.trim().split(/\s+/)[0] || ad;

  return (
    <>
      <section className="panel-ust">
        <div className="sub-title">
          <Sun className="i" /> Üye Paneli
        </div>
        <h1>
          Merhaba, <span className="hl-g">{ilkAd}</span>
        </h1>
        <p>
          {eposta}
          {ozet?.kayit && ayYil(ozet.kayit) ? ` · Üyelik: ${ayYil(ozet.kayit)}` : ""}
        </p>
      </section>

      <div className="panel-govde">
        <nav className="ray" aria-label="Hesap bölümleri">
          {BOLUMLER.map(([anahtar, adResmi, ikon]) => (
            <button
              key={anahtar}
              type="button"
              className={bolum === anahtar ? "on" : ""}
              aria-current={bolum === anahtar ? "true" : undefined}
              onClick={() => setBolum(anahtar)}
            >
              {ikon}
              {adResmi}
            </button>
          ))}
          <div className="ray-alt">
            <UyeCikis ikonlu />
          </div>
        </nav>

        {bolum === "genel" && (
          <section className="bolum" aria-label="Genel Bakış">
            <h2>Genel Bakış</h2>
            <p className="b-not">Hesabınızın özeti ve araçlarınıza hızlı erişim.</p>
            {ozetHata && <p className="p-hata">{ozetHata}</p>}
            <div className="istat-grid">
              <div className="istat">
                <span className="ic"><Sohbet className="i" /></span>
                <span className="v">{ozet ? ozet.soruSayisi : "—"}</span>
                <span className="l">Asistana sorulan soru</span>
              </div>
              <div className="istat">
                <span className="ic"><Grafik className="i" /></span>
                <span className="v">{ozet ? ozet.analizSayisi : "—"}</span>
                <span className="l">Tamamlanan analiz</span>
              </div>
              <div className="istat">
                <span className="ic"><Takvim className="i" /></span>
                <span className="v">{ozet ? gunKisa(ozet.sonAktivite) : "—"}</span>
                <span className="l">Son aktivite</span>
              </div>
              <div className="istat">
                <span className="ic"><Hedef className="i" /></span>
                <span className="v">{ozet ? ozet.acikTalep : "—"}</span>
                <span className="l">Açık talep</span>
              </div>
            </div>
            <h3 className="gb-h2">
              <Simsek className="i" /> Araçlarınız
            </h3>
            <div className="hesap-araclar">
              {ARACLAR.map(([yol, aracAd, aciklama, ikon]) => (
                <Link key={yol} href={yol} className="hesap-arac">
                  <span className="arac-ust">
                    {ikon}
                    <b>{aracAd}</b>
                  </span>
                  <span>{aciklama}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {bolum === "konusmalar" && (
          <section className="bolum" aria-label="Konuşmalarım">
            <h2>Konuşmalarım</h2>
            <p className="b-not">
              GES Asistanı ile geçmiş sohbetleriniz. Bir konuşmayı seçerek tamamını görüntüleyebilirsiniz.
            </p>
            {konusmaHata && <p className="p-hata">{konusmaHata}</p>}
            {konusmalar === null && !konusmaHata && <p className="b-not">Yükleniyor…</p>}
            {konusmalar !== null && konusmalar.length === 0 && !konusmaHata && (
              <div className="bos">
                <span className="ic"><Sohbet className="i" /></span>
                <h3>Henüz asistanla konuşmadınız</h3>
                <p>
                  GES Asistanı güncel mevzuat ve piyasa verileriyle sorularınızı yanıtlar. İlk
                  sorunuzu sorduğunuzda konuşmalarınız burada listelenir.
                </p>
                <Link className="gt-btn" href="/asistan">
                  <Sohbet className="i" /> Asistana ilk sorunuzu sorun
                </Link>
              </div>
            )}
            {konusma && (
              <div className="konusma-yerlesim">
                <div className="k-liste">
                  <div className="k-liste-bas">
                    <span>Geçmiş ({konusmalar!.length} konuşma)</span>
                  </div>
                  <div className="k-satirlar">
                    {konusmalar!.map((k) => (
                      <button
                        key={k.oturum}
                        type="button"
                        className={`k-satir ${konusma.oturum === k.oturum ? "on" : ""}`}
                        onClick={() => setSeciliOturum(k.oturum)}
                      >
                        <span className="tarih">{gunUzun(k.baslangic)}</span>
                        <span className="ozet">{k.ilkSoru || "(görsel/PDF ile soru)"}</span>
                        <span className="adet">{k.adet} mesaj</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="k-detay">
                  <div className="k-detay-bas">
                    <b>
                      {gunUzun(konusma.baslangic)} · {konusma.adet} mesaj
                    </b>
                    <Link className="gt-btn small line" href="/asistan">
                      Bu konudan devam et
                    </Link>
                  </div>
                  <div className="chat">
                    {konusma.mesajlar.map((m, i) => (
                      <div key={i} style={{ display: "contents" }}>
                        <div className="msg user">{m.soru || "(görsel/PDF ile soru)"}</div>
                        <div className="msg bot">
                          <div className="who">
                            <Sohbet className="i" /> GES Asistanı
                          </div>
                          <p>{m.cevap || "(cevap kaydı yok)"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {bolum === "talepler" && (
          <section className="bolum" aria-label="Taleplerim">
            <h2>Taleplerim</h2>
            <p className="b-not">
              Danışmanlık ve destek talepleriniz. Ekibimiz iş günlerinde 24 saat içinde yanıtlar.
            </p>
            <div className="talep-yerlesim">
              <form className="kart" onSubmit={talepGonder}>
                <h3>
                  <ArtiYalin className="i" /> Yeni Talep Oluştur
                </h3>
                <label className="form-alan">
                  Konu başlığı
                  <select value={konu} onChange={(e) => setKonu(e.target.value)}>
                    {KONULAR.map(([deger, etiket]) => (
                      <option key={deger} value={deger}>
                        {etiket}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-alan">
                  Mesajınız
                  <textarea
                    value={mesaj}
                    onChange={(e) => setMesaj(e.target.value)}
                    placeholder="Talebinizi kısaca anlatın; saha bilgisi, il/ilçe ve varsa belge referansları yanıt süresini kısaltır."
                    required
                  />
                  <small>Talebinize e-posta ile de bilgilendirme gönderilir.</small>
                </label>
                {talepFormNot && <p className="p-not">{talepFormNot}</p>}
                {talepFormHata && <p className="p-hata">{talepFormHata}</p>}
                <button
                  className="gt-btn"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={talepGidiyor}
                >
                  {talepGidiyor ? "Gönderiliyor…" : "Talebi Gönder"} <Ok className="i" />
                </button>
              </form>

              <div>
                {talepHata && <p className="p-hata">{talepHata}</p>}
                {talepler === null && !talepHata && <p className="b-not">Yükleniyor…</p>}
                {talepler !== null && talepler.length === 0 && !talepHata && (
                  <div className="bos">
                    <span className="ic"><Hedef className="i" /></span>
                    <h3>Henüz talebiniz yok</h3>
                    <p>
                      Fizibilite, mevzuat veya teklif değerlendirme için soldaki formdan talep
                      oluşturabilirsiniz.
                    </p>
                  </div>
                )}
                {talepler !== null && talepler.length > 0 && (
                  <div className="talep-listesi">
                    {talepler.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        className={`talep-satir ${talep?.id === t.id ? "on" : ""}`}
                        onClick={() => setSeciliTalep(t.id)}
                      >
                        <span className="orta">
                          <b>
                            {KONU_ETIKET[t.konu] || t.konu} —{" "}
                            {(t.mesajlar[0]?.metin || "").slice(0, 60) || "Talep"}
                          </b>
                          <span className="alt">
                            #{t.id} · {gunUzun(t.olusturma)} · {t.mesajlar.length} mesaj
                          </span>
                        </span>
                        <span className={`rozet ${DURUM_ETIKET[t.durum][0]}`}>
                          {DURUM_ETIKET[t.durum][1]}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {talep && (
                  <div className="kart talep-detay">
                    <div className="talep-detay-bas">
                      <b>
                        #{talep.id} · {KONU_ETIKET[talep.konu] || talep.konu}
                      </b>
                      <span className={`rozet ${DURUM_ETIKET[talep.durum][0]}`}>
                        {DURUM_ETIKET[talep.durum][1]}
                      </span>
                    </div>
                    <div className="dizi">
                      {talep.mesajlar.map((m, i) => (
                        <div key={i} className={`t-yazi ${m.kim === "ekip" ? "ekip" : ""}`}>
                          <span className="kim">
                            {m.kim === "ekip" ? <Sun className="i" /> : <Kullanici className="i" />}
                            {m.kim === "ekip" ? "gesdanismani ekibi" : "Siz"}
                            <span className="zaman">{kisaZaman(m.zaman)}</span>
                          </span>
                          <p>{m.metin}</p>
                        </div>
                      ))}
                    </div>
                    {talep.durum === "kapandi" ? (
                      <p className="b-not" style={{ marginTop: 14 }}>
                        Bu talep kapatıldı. Yeni bir konu için soldan talep oluşturabilirsiniz.
                      </p>
                    ) : (
                      <form className="cevap-bar" onSubmit={cevapGonder}>
                        <input
                          value={cevap}
                          onChange={(e) => setCevap(e.target.value)}
                          placeholder="Bu talebe yanıt yazın…"
                          aria-label="Talebe yanıt"
                          disabled={cevapGidiyor}
                        />
                        <button className="send" aria-label="Gönder" disabled={cevapGidiyor}>
                          <Gonder className="i" />
                        </button>
                      </form>
                    )}
                    {cevapHata && <p className="p-hata">{cevapHata}</p>}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {bolum === "hesap" && (
          <section className="bolum" aria-label="Hesap Bilgileri">
            <h2>Hesap Bilgileri</h2>
            <p className="b-not">Kimlik, güvenlik ve bildirim tercihleriniz.</p>
            <div className="hesap-grid">
              <form className="kart" onSubmit={adKaydet}>
                <h3>
                  <Kullanici className="i" /> Profil
                </h3>
                <label className="form-alan">
                  Ad Soyad
                  <input value={adGirdi} onChange={(e) => setAdGirdi(e.target.value)} />
                </label>
                <label className="form-alan">
                  E-posta
                  <input value={eposta} readOnly />
                  <small>E-posta adresi hesabınızın kimliğidir; şu an değiştirilemez.</small>
                </label>
                {adNot && <p className="p-not">{adNot}</p>}
                {adHata && <p className="p-hata">{adHata}</p>}
                <button className="gt-btn line">Bilgileri Güncelle</button>
              </form>

              <form className="kart" onSubmit={sifreDegistir}>
                <h3>
                  <Kilit className="i" /> Şifre Değiştir
                </h3>
                <label className="form-alan">
                  Mevcut şifre
                  <input
                    type="password"
                    value={eskiSifre}
                    onChange={(e) => setEskiSifre(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </label>
                <label className="form-alan">
                  Yeni şifre
                  <input
                    type="password"
                    value={yeniSifre}
                    onChange={(e) => setYeniSifre(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <small>En az 8 karakter; harf ve rakam içermelidir.</small>
                </label>
                {sifreNot && <p className="p-not">{sifreNot}</p>}
                {sifreHata && <p className="p-hata">{sifreHata}</p>}
                <button className="gt-btn line">Şifreyi Değiştir</button>
              </form>

              <div className="kart">
                <h3>
                  <Zil className="i" /> Bildirim Tercihleri
                </h3>
                <div className="tercih">
                  <button
                    type="button"
                    className={`sw ${bildirim ? "on" : ""}`}
                    role="switch"
                    aria-checked={bildirim}
                    aria-label="E-posta bildirimleri"
                    onClick={() => void bildirimDegistir()}
                  />
                  <span className="metin">
                    <b>E-posta bildirimleri</b>
                    <span>
                      Talebinize ekipten yanıt geldiğinde ve önemli mevzuat değişikliklerinde
                      e-posta al.
                    </span>
                  </span>
                </div>
              </div>

              <div className="kart">
                <h3>
                  <Kalkan className="i" /> Gizlilik ve Hesap
                </h3>
                <div className="kvkk">
                  <Bilgi className="i" />
                  <span>
                    Kişisel verileriniz 6698 sayılı KVKK kapsamında yalnızca hizmet sunumu için
                    işlenir; üçüncü kişilerle paylaşılmaz. Ayrıntılar için{" "}
                    <Link href="/gizlilik">Aydınlatma Metni</Link>.
                  </span>
                </div>
                <div className="tehlike">
                  <UyeCikis ikonlu />
                  <button type="button" onClick={() => void hesabiSil()}>
                    <Cop className="i" /> Hesabımı sil
                  </button>
                  {silHata && <p className="p-hata">{silHata}</p>}
                  <span className="tehlike-not">
                    Hesap silme talebi 7 gün içinde işlenir; verileriniz kalıcı olarak kaldırılır.
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
