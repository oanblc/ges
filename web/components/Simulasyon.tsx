"use client";

import { useEffect, useRef } from "react";
import { CATI_CARPANI, EKIPMAN, LIMITLER, MALIYET_BANT, TARIFE } from "@/data/kb";
import PVGIS from "@/data/pvgis.json";

/**
 * Güneş sahası simülasyonu — izometrik sahne + canlı gün akışı + karne.
 * Üretim profilleri PVGIS'ten (81 il, mevsimlik gerçek saatlik ortalamalar);
 * fiyatlar kb tarifeleriyle aynı kaynaktan türetilir. Prototip: artifact
 * "gessim-onizleme" (Ozan onayı: sade girişler + gelişmiş çekmece).
 */

type Profil = { verim: number; profil: Record<"kis" | "bahar" | "yaz", number[]> };
const ILLER = (PVGIS as { iller: Record<string, Profil> }).iller;

const kr = (v: number) => v / 100;
// hesap.ts nihai fiyat formülüyle birebir: BTV ve fon yalnız enerji matrahına uygulanır
const vergili = (enerji: number, dagitim: number, btv: number, kdv: number) =>
  (kr(enerji) * (1 + TARIFE.fon + btv) + kr(dagitim)) * (1 + kdv);
const FIYAT = {
  mesken: { alis: vergili(TARIFE.mesken.enerjiK2, TARIFE.mesken.dagitim, TARIFE.mesken.btv, TARIFE.mesken.kdv),
            satis: kr(TARIFE.mesken.enerjiK2) },
  ticarethaneAG: { alis: vergili(TARIFE.ticarethane.enerjiK1, TARIFE.ticarethane.dagitim, TARIFE.ticarethane.btv, TARIFE.ticarethane.kdv),
                   satis: kr(TARIFE.ticarethane.enerjiK1) },
  ticarethaneOG: { alis: vergili(TARIFE.ticarethaneOG.enerjiK1, TARIFE.ticarethaneOG.dagitimTek, TARIFE.ticarethaneOG.btv, TARIFE.ticarethaneOG.kdv),
                   satis: kr(TARIFE.ticarethaneOG.enerjiK1) },
  sanayiAG: { alis: vergili(TARIFE.sanayiAG.enerji, TARIFE.sanayiAG.dagitim, TARIFE.sanayiAG.btv, TARIFE.sanayiAG.kdv),
              satis: kr(TARIFE.sanayiAG.enerji) },
  sanayiOG: { alis: vergili(TARIFE.sanayiOG.enerji, TARIFE.sanayiOG.dagitimTek, TARIFE.sanayiOG.btv, TARIFE.sanayiOG.kdv),
              satis: kr(TARIFE.sanayiOG.enerji) },
};

// "Ortalama" = PVGIS tipik günü (1.0). "Açık" gün/ortalama oranı mevsime bağlıdır:
// kışın açık gün ortalamanın çok üstündedir, yazın zaten çoğu gün açıktır.
const HAVA: Record<string, Record<"kis" | "bahar" | "yaz", number>> = {
  acik: { kis: 1.6, bahar: 1.3, yaz: 1.12 },
  parcali: { kis: 1, bahar: 1, yaz: 1 },
  bulutlu: { kis: 0.22, bahar: 0.22, yaz: 0.25 },
};
const PROFIL = {
  gunduz: [0.35,0.3,0.3,0.3,0.35,0.5,0.8,1,1.15,1.2,1.2,1.15,1.1,1.15,1.2,1.15,1.05,0.9,0.7,0.55,0.5,0.45,0.4,0.35],
  aksam: [0.5,0.4,0.35,0.3,0.3,0.35,0.5,0.7,0.6,0.5,0.5,0.55,0.6,0.55,0.5,0.55,0.7,1,1.3,1.4,1.35,1.15,0.9,0.65],
  vardiya: Array(24).fill(1),
};
const ARAZI = 1.05;
const MAPS_ANAHTAR = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
// Güney baz (PVGIS profilleri güney/30°); diğer cepheler yaklaşık üretim çarpanı
const CEPHE = { guney: 1.0, dogubati: 0.85, kuzey: 0.6 } as const;

export default function Simulasyon() {
  const kok = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = (id: string) => document.getElementById(id)!;
    const S = { tip: "cati", grup: "ticarethane", gerilim: "AG", il: "",
      mevsim: "bahar" as "kis" | "bahar" | "yaz", hava: "acik" as "acik" | "parcali" | "bulutlu",
      guc: 50, tuketim: 9000, profil: "gunduz" as keyof typeof PROFIL, batarya: 0,
      cephe: "guney" as keyof typeof CEPHE, cati: "trapez" as keyof typeof CATI_CARPANI };

    const ilSec = el("il") as HTMLSelectElement;
    const bosSecenek = new Option("İl seçiniz…", "", true, true);
    bosSecenek.disabled = true;
    ilSec.add(bosSecenek);
    for (const ad of Object.keys(ILLER)) ilSec.add(new Option(ad, ad));
    ilSec.onchange = () => { S.il = ilSec.value; ilSec.classList.remove("uyar"); sifirla(); };
    kok.current!.querySelectorAll<HTMLElement>(".cipler").forEach((k) =>
      k.addEventListener("click", (e) => {
        const d = (e.target as HTMLElement).closest(".cip") as HTMLElement | null;
        if (!d) return;
        k.querySelectorAll(".cip").forEach((c) => c.classList.remove("on"));
        d.classList.add("on");
        (S as Record<string, unknown>)[k.dataset.ad!] = d.dataset.deger;
        if (k.dataset.ad === "grup") gucUygulaRef();
        sahneKur(); sifirla();
      }));
    let gucUygulaRef = () => {};
    const bagla = (id: string, cik: string, fmt: (v: number) => string, alan: string) => {
      const g = el(id) as HTMLInputElement, o = el(cik);
      g.oninput = () => {
        (S as Record<string, unknown>)[alan] = +g.value;
        o.textContent = fmt(+g.value);
        sahneKur(); // panel sayısı/alan, doluluk ve batarya kutusu kaydırıcıyla senkron kalsın
        sifirla();
      };
      o.textContent = fmt(+g.value);
    };
    const ciftBagla = (kayId: string, sayId: string, alan: "guc" | "tuketim",
      enAz: number, enCok: number, sonra?: () => void) => {
      const kay = el(kayId) as HTMLInputElement, say = el(sayId) as HTMLInputElement;
      const uygula = (v: number) => {
        v = Math.min(enCok, Math.max(enAz, Math.round(v)));
        (S as Record<string, unknown>)[alan] = v;
        say.value = String(v);
        kay.value = String(Math.min(+kay.max, v)); // kaydırıcı kendi tavanında durur
        sonra?.(); sahneKur(); sifirla();
      };
      kay.oninput = () => uygula(+kay.value);
      say.onchange = () => uygula(+say.value || enAz);
      return uygula;
    };
    const gucUygula = ciftBagla("guc", "gucSayi", "guc", 5, 5000, () => {
      const meskenSinir = S.grup === "mesken" && S.guc > LIMITLER.meskenKw;
      el("gucUyari").style.display = meskenSinir ? "block" : "none";
      if (meskenSinir) { S.guc = LIMITLER.meskenKw;
        (el("gucSayi") as HTMLInputElement).value = String(S.guc);
        (el("guc") as HTMLInputElement).value = String(S.guc); }
    });
    gucUygulaRef = () => gucUygula(S.guc);
    el("tamKarsila").onclick = () => {
      if (!S.il) { ilSec.classList.add("uyar"); ilSec.focus(); return; }
      const yonK = S.tip === "cati" ? CEPHE[S.cephe] : 1;
      const verim = ILLER[S.il].verim * (S.tip === "arazi" ? ARAZI : 1) * yonK;
      const hedef = Math.max(5, Math.round((S.tuketim * 12) / verim / 5) * 5);
      gucUygula(hedef);
    };
    ciftBagla("tuketim", "tukSayi", "tuketim", 100, 2000000);
    bagla("batarya", "batCikti", (v) => (v ? v + " kWh" : "yok"), "batarya");
    el("gelismisAc").onclick = (e) => {
      const g = el("gelismis"), acik = g.classList.toggle("acik");
      (e.currentTarget as HTMLElement).setAttribute("aria-expanded", String(acik));
    };

    function panelDoku(hedef: HTMLElement, satir: number, sutun: number, x0: number, y0: number,
      dx1: number, dy1: number, dx2: number, dy2: number, w: number, h: number, dolu: number) {
      let s = "", i = 0;
      for (let r = 0; r < satir; r++) for (let c = 0; c < sutun; c++) {
        const x = x0 + c * dx1 + r * dx2, y = y0 + c * dy1 + r * dy2;
        const bos = i >= dolu;
        s += `<path class="${bos ? "bos" : "hucre"}" d="M${x} ${y} l${w} ${-w * 0.47} l${h * 0.9} ${h * 0.42} l${-w} ${w * 0.47} Z" fill="${bos ? "rgba(255,255,255,.25)" : "#0E4F49"}" stroke="${bos ? "#8FA69F" : "#0A3F3A"}" stroke-width="1" stroke-dasharray="${bos ? "3 3" : "0"}"/>`;
        i++;
      }
      hedef.innerHTML = s;
    }
    function araziDoku(hedef: HTMLElement, dolu: number) {
      let s = "";
      for (let i = 0; i < 12; i++) {
        const r = Math.floor(i / 4), c = i % 4;
        const x = 180 + c * 96 + r * 34, y = 300 + r * 44;
        const bos = i >= dolu;
        s += `<g stroke="${bos ? "#8FA69F" : "#0A3F3A"}" stroke-width="1.6" stroke-linejoin="round"${bos ? ' stroke-dasharray="3 3"' : ""}>
          <path d="M${x + 10} ${y + 26} l0 14 M${x + 54} ${y + 6} l0 14"${bos ? "" : ' stroke-dasharray="0"'}/>
          <path class="${bos ? "bosh" : "hucre"}" d="M${x} ${y + 20} l58 -27 l26 13 l-58 27 Z" fill="${bos ? "rgba(255,255,255,.25)" : "#0E4F49"}"/>
          ${bos ? "" : `<path d="M${x + 19} ${y + 11} l26 13 M${x + 38} ${y + 2} l26 13" stroke="#F3F5F0" stroke-width="1.1"/>`}
        </g>`;
      }
      hedef.innerHTML = s;
    }
    function panelBilgi() {
      const adet = Math.ceil((S.guc * 1000) / EKIPMAN.panelWp);
      const alan = Math.round(adet * EKIPMAN.panelM2);
      el("panelSayi").textContent = `≈ ${adet} panel · ${alan.toLocaleString("tr-TR")} m² panel alanı`;
      return { adet, alan };
    }
    function sahneKur() {
      const cati = S.tip === "cati";
      el("sahneCati").setAttribute("opacity", cati ? "1" : "0");
      el("sahneArazi").setAttribute("opacity", cati ? "0" : "1");
      const etiket = ({ mesken: "Konut", ticarethane: "Ticarethane", sanayi: "Sanayi Tesisi" } as Record<string, string>)[S.grup] +
        (S.gerilim === "OG" && S.grup !== "mesken" ? " · OG" : "");
      el("binaEtiket").textContent = etiket;
      el("araziEtiket").textContent = etiket + " (öz tüketim)";
      const olcek = S.grup === "mesken" ? 25 : S.grup === "ticarethane" ? 300 : 1250;
      const oran = Math.max(1, Math.round((Math.min(S.guc, olcek) / olcek) * 12));
      if (cati) panelDoku(el("panelIzgara"), 3, 4, 352, 316, 32, -15, 26, 12, 26, 24, oran);
      else araziDoku(el("araziIzgara"), oran);
      el("batKutu").setAttribute("transform", cati ? "translate(212 342)" : "translate(120 400)");
      el("catiAyarGrup").style.display = cati ? "" : "none";
      panelBilgi();
      el("batKutu").setAttribute("opacity", S.batarya ? "1" : "0");
      el("aBatSatir").style.display = S.batarya ? "flex" : "none";
      el("mahsupBaslik").textContent =
        S.grup === "mesken" ? "Bugünkü Kazanç (aylık mahsup)" : "Bugünkü Kazanç (saatlik mahsup)";
    }

    type Saat = { h: number; u: number; t: number; oz: number; satis: number; alis: number;
      bat: number; batAksi: number };
    function fiyatlar() {
      if (S.grup === "mesken") return FIYAT.mesken;
      const anahtar = (S.grup + S.gerilim) as keyof typeof FIYAT;
      return FIYAT[anahtar] ?? FIYAT.ticarethaneAG;
    }
    function gunHesabi(havaCarpani?: number): Saat[] {
      if (!S.il) return Array.from({ length: 24 }, (_, h) =>
        ({ h, u: 0, t: 0, oz: 0, satis: 0, alis: 0, bat: 0, batAksi: 0 }));
      const profil = ILLER[S.il].profil[S.mevsim];
      const gunlukTuk = S.tuketim / 30, sekil = PROFIL[S.profil],
        toplamSekil = sekil.reduce((a, b) => a + b, 0);
      const saatler: Saat[] = [];
      let bat = 0;
      for (let h = 0; h < 24; h++) {
        const yonK = S.tip === "cati" ? CEPHE[S.cephe] : 1;
        const ham = (profil[h] / 1000) * S.guc * (havaCarpani ?? HAVA[S.hava][S.mevsim]) * (S.tip === "arazi" ? ARAZI : 1) * yonK;
        const u = Math.min(ham, S.guc / EKIPMAN.dcAcOran); // inverter kırpma tavanı (DC/AC 1,2)
        const t = (sekil[h] / toplamSekil) * gunlukTuk;
        const oz = Math.min(u, t);
        let fazla = u - oz, eksik = t - oz, batAksi = 0;
        if (S.batarya) {
          if (fazla > 0) { const al = Math.min(fazla, (S.batarya - bat) / 0.95); bat += al * 0.95; fazla -= al; batAksi = al; }
          else if (eksik > 0 && bat > 0) { const ver = Math.min(eksik, bat); bat -= ver; eksik -= ver; batAksi = -ver; }
        }
        saatler.push({ h, u, t, oz, satis: fazla, alis: eksik, bat, batAksi });
      }
      return saatler;
    }

    // ---- animasyon ----
    const svgNS = "http://www.w3.org/2000/svg";
    let saatler: Saat[] = [], kare = 0, zaman = 6, hizIx = 0, oynuyor = false;
    const HIZLAR = [1, 3, 8];
    const dogusBatis = () => {
      if (!S.il) return [6, 19];
      const p = ILLER[S.il].profil[S.mevsim];
      let d = 6, b = 19;
      for (let h = 0; h < 24; h++) if (p[h] > 3) { d = h; break; }
      for (let h = 23; h >= 0; h--) if (p[h] > 3) { b = h + 1; break; }
      return [d, b];
    };
    function gokyuzu(h: number) {
      const kutu = el("sahneKutu"), gunduz = h > 6.5 && h < 19,
        alaca = (h > 5 && h <= 6.5) || (h >= 19 && h < 20.5);
      kutu.style.setProperty("--gok1", gunduz ? "#BFE3EE" : alaca ? "#F0C9A0" : "#1C2B33");
      kutu.style.setProperty("--gok2", gunduz ? "#EAF4EC" : alaca ? "#F6E7CF" : "#31434C");
      el("pencereler").setAttribute("opacity", gunduz ? "0" : ".9");
      el("pencereler2").setAttribute("opacity", gunduz ? "0" : ".9");
    }
    function gunesKonum(h: number) {
      const [d, b] = dogusBatis(), g = el("gunes"), p = (h - d) / (b - d);
      if (p < 0 || p > 1) { g.setAttribute("opacity", "0"); el("gunesIsin").innerHTML = ""; return; }
      g.setAttribute("opacity", "1");
      const x = 90 + p * 720, y = 300 - Math.sin(p * Math.PI) * 240;
      g.setAttribute("cx", String(x)); g.setAttribute("cy", String(y));
      let isin = "";
      for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4;
        isin += `<path d="M${x + Math.cos(a) * 34} ${y + Math.sin(a) * 34} L${x + Math.cos(a) * 44} ${y + Math.sin(a) * 44}"/>`; }
      el("gunesIsin").innerHTML = isin;
    }
    function parca(x1: number, y1: number, x2: number, y2: number, renk: string) {
      const p = document.createElementNS(svgNS, "circle");
      p.setAttribute("r", "4"); p.setAttribute("fill", renk);
      el("parcaciklar").appendChild(p);
      const t0 = performance.now(), sure = 900;
      const adim = (t: number) => {
        const k = Math.min(1, (t - t0) / sure);
        p.setAttribute("cx", String(x1 + (x2 - x1) * k));
        p.setAttribute("cy", String(y1 + (y2 - y1) * k - Math.sin(k * Math.PI) * 24));
        if (k < 1 && oynuyor) requestAnimationFrame(adim); else p.remove();
      };
      adim(t0);
    }
    type Nokta = readonly [number, number];
    const noktalar = (): Record<"panel" | "bina" | "direk" | "bat", Nokta> => S.tip === "cati"
      ? { panel: [470, 300], bina: [470, 440], direk: [774, 300], bat: [246, 372] }
      : { panel: [370, 330], bina: [668, 400], direk: [774, 300], bat: [154, 430] };
    function akisParcaciklari(s: Saat) {
      if (!oynuyor) return;
      const N = noktalar();
      const tepe = Math.max(...saatler.map((x) => x.u), 1);
      if (s.oz > 0 && Math.random() < 0.8) parca(...N.panel, ...N.bina, "#E8C43C");
      if (s.satis > tepe * 0.03 && Math.random() < 0.7) parca(...N.panel, ...N.direk, "#1F8A5D");
      if (s.alis > tepe * 0.03 && Math.random() < 0.7) parca(...N.direk, ...N.bina, "#A5620D");
      if (s.batAksi > 0 && Math.random() < 0.6) parca(...N.panel, ...N.bat, "#FFE175");
      if (s.batAksi < 0 && Math.random() < 0.6) parca(...N.bat, ...N.bina, "#0A6B5C");
    }
    let isinFaz = 0;
    function isinDemeti(u: number, tepe: number) {
      const g = el("gunes"), demet = el("isinDemeti");
      if (u <= 0 || g.getAttribute("opacity") === "0") { demet.setAttribute("opacity", "0"); return; }
      const N = noktalar();
      const gx = +g.getAttribute("cx")!, gy = +g.getAttribute("cy")!;
      isinFaz = (isinFaz + 1.2) % 16;
      let s = "";
      for (const kay of [-14, 0, 14]) {
        s += `<line x1="${gx + kay}" y1="${gy + 30}" x2="${N.panel[0] + kay}" y2="${N.panel[1] - 8}" stroke-dasharray="7 9" stroke-dashoffset="${-isinFaz}"/>`;
      }
      demet.innerHTML = s;
      demet.setAttribute("opacity", String(Math.min(0.8, 0.25 + (u / tepe) * 0.6)));
    }

    const cubukKutu = el("cubuklar");
    function cubuklariKur() {
      cubukKutu.innerHTML = "";
      for (let h = 0; h < 24; h++) cubukKutu.insertAdjacentHTML("beforeend",
        `<span><em class="u" id="u${h}"></em><em class="t" id="t${h}"></em></span>`);
    }
    const kw = (v: number) => v.toFixed(1).replace(".", ",") + " kW";
    type Toplam = { uretim: number; oz: number; satis: number; alis: number; batVer: number; kazanc: number };
    function toplamHesap(kadar: number, liste?: Saat[]): Toplam {
      const f = fiyatlar(), t: Toplam = { uretim: 0, oz: 0, satis: 0, alis: 0, batVer: 0, kazanc: 0 };
      for (const s of (liste ?? saatler).slice(0, kadar)) {
        t.uretim += s.u; t.oz += s.oz; t.satis += s.satis; t.alis += s.alis;
        if (s.batAksi < 0) t.batVer -= s.batAksi;
        t.kazanc += s.oz * f.alis + (s.batAksi < 0 ? -s.batAksi * f.alis : 0) + s.satis * f.satis;
      }
      if (S.grup === "mesken") {
        // aylık mahsup: gün içi fazla, ay sonunda tüketimden düşer — değeri alış fiyatına yakındır
        t.kazanc = (t.oz + t.batVer) * f.alis + t.satis * f.alis * 0.85;
      }
      return t;
    }
    function panelYaz(s: { u: number; t: number; satis: number; alis: number; bat: number }, top: Toplam) {
      el("aUretim").textContent = kw(s.u); el("aTuketim").textContent = kw(s.t);
      el("aSatis").textContent = kw(s.satis); el("aAlis").textContent = kw(s.alis);
      if (S.batarya) el("aBat").textContent = "%" + Math.round((s.bat / S.batarya) * 100);
      el("cUretim").textContent = Math.round(top.uretim).toLocaleString("tr-TR");
      el("cOz").textContent = "%" + (top.uretim ? Math.round(((top.oz + top.batVer) / top.uretim) * 100) : 0);
      el("cSatis").textContent = Math.round(top.satis).toLocaleString("tr-TR");
      el("cKazanc").textContent = Math.round(top.kazanc).toLocaleString("tr-TR") + " ₺";
      el("batSeviye").setAttribute("width", String(S.batarya ? 52 * (s.bat / S.batarya) : 0));
    }
    function sifirla() {
      oynuyor = false; cancelAnimationFrame(kare); zaman = 6;
      saatler = gunHesabi(); cubuklariKur();
      gokyuzu(9); gunesKonum(9);
      el("isinDemeti").setAttribute("opacity", "0");
      el("saatPul").textContent = "06:00";
      (el("baslat") as HTMLButtonElement).disabled = false;
      panelYaz({ u: 0, t: 0, satis: 0, alis: 0, bat: 0 },
        { uretim: 0, oz: 0, satis: 0, alis: 0, batVer: 0, kazanc: 0 });
    }
    type Donem = { uretim: number; tuketim: number; oz: number; satis: number; alis: number;
      batVer: number; kazanc: number; gessiz: number; gesli: number };
    function donemHesabi(mevsim: "kis" | "bahar" | "yaz", gunSayisi: number, fi: { alis: number; satis: number }): Donem {
      const eskiMevsim = S.mevsim; S.mevsim = mevsim;
      const gun = gunHesabi(1);
      S.mevsim = eskiMevsim;
      const t = toplamHesap(24, gun);
      const satisDegeri = S.grup === "mesken" ? fi.alis * 0.85 : fi.satis;
      const d: Donem = {
        uretim: t.uretim * gunSayisi, tuketim: (S.tuketim / 30) * gunSayisi,
        oz: (t.oz + t.batVer) * gunSayisi, satis: t.satis * gunSayisi, alis: t.alis * gunSayisi,
        batVer: t.batVer * gunSayisi, kazanc: t.kazanc * gunSayisi, gessiz: 0, gesli: 0,
      };
      d.gessiz = d.tuketim * fi.alis;
      d.gesli = Math.max(0, d.alis * fi.alis - d.satis * satisDegeri);
      return d;
    }
    function karneGoster() {
      const f = (v: number) => Math.round(v).toLocaleString("tr-TR");
      const fi = fiyatlar();
      const pb = panelBilgi();
      const binf = (v: number) => v >= 1_000_000
        ? (v / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " M₺"
        : Math.round(v / 1000).toLocaleString("tr-TR") + " bin ₺";
      const satisDegeri = S.grup === "mesken" ? fi.alis * 0.85 : fi.satis;

      // Bugün: oynatılan gün. Aylık: seçili mevsimin tipik günü ×30.
      // Yıllık: mevsim ağırlıklı (kış 90 + geçiş 183 + yaz 92 gün, her biri kendi PVGIS profiliyle).
      const bt = toplamHesap(24);
      const bugun: Donem = {
        uretim: bt.uretim, tuketim: S.tuketim / 30, oz: bt.oz + bt.batVer, satis: bt.satis,
        alis: bt.alis, batVer: bt.batVer, kazanc: bt.kazanc,
        gessiz: (S.tuketim / 30) * fi.alis,
        gesli: Math.max(0, bt.alis * fi.alis - bt.satis * satisDegeri),
      };
      const ay = donemHesabi(S.mevsim, 30, fi);
      const kisY = donemHesabi("kis", 90, fi), baharY = donemHesabi("bahar", 183, fi),
        yazY = donemHesabi("yaz", 92, fi);
      const yil: Donem = { uretim: 0, tuketim: 0, oz: 0, satis: 0, alis: 0, batVer: 0,
        kazanc: 0, gessiz: 0, gesli: 0 };
      for (const d of [kisY, baharY, yazY]) {
        yil.uretim += d.uretim; yil.tuketim += d.tuketim; yil.oz += d.oz; yil.satis += d.satis;
        yil.alis += d.alis; yil.batVer += d.batVer; yil.kazanc += d.kazanc;
        yil.gessiz += d.gessiz; yil.gesli += d.gesli;
      }
      const seg = S.grup === "mesken" ? "konut" : "ticari";
      const bantlar = MALIYET_BANT[seg as keyof typeof MALIYET_BANT] as ReadonlyArray<readonly [number, number, number]>;
      let alt = bantlar[bantlar.length - 1][1], ust = bantlar[bantlar.length - 1][2];
      for (const [maks, a, u] of bantlar) if (S.guc <= maks) { alt = a; ust = u; break; }
      const catiK = S.tip === "cati" ? CATI_CARPANI[S.cati] : 1;
      alt *= catiK; ust *= catiK;

      const oran = (d: Donem) => (d.uretim ? Math.round((d.oz / d.uretim) * 100) : 0);
      const dusus = (d: Donem) => (d.gessiz ? Math.max(0, Math.min(100, Math.round((1 - d.gesli / d.gessiz) * 100))) : 0);
      const emanetAd = S.grup === "mesken" ? "Şebekeye emanet" : "Şebekeye satış";
      const satirlar: Array<[string, (d: Donem) => string]> = [
        ["Üretim (kWh)", (d) => f(d.uretim)],
        ["Tüketim (kWh)", (d) => f(d.tuketim)],
        ["Öz tüketim (kWh)", (d) => `${f(d.oz)} · %${oran(d)}`],
        ...(S.batarya ? [["Bataryadan beslenen (kWh)", (d: Donem) => f(d.batVer)] as [string, (d: Donem) => string]] : []),
        [emanetAd + " (kWh)", (d) => f(d.satis)],
        ["Şebekeden alış (kWh)", (d) => f(d.alis)],
        ["GES'siz fatura (₺)", (d) => "≈ " + f(d.gessiz)],
        ["GES ile fatura (₺)", (d) => "≈ " + f(d.gesli)],
        ["Fatura düşüşü", (d) => "%" + dusus(d)],
        ["Net kazanç (₺)", (d) => "+" + f(d.kazanc)],
      ];
      el("sonucBaslik").textContent =
        `${S.guc.toLocaleString("tr-TR")} kWp · ${pb.adet.toLocaleString("tr-TR")} panel (${pb.alan.toLocaleString("tr-TR")} m²) · ${S.il}`;
      const havaAd = ({ acik: "açık", parcali: "ortalama", bulutlu: "bulutlu" } as Record<string, string>)[S.hava];
      const mevsimAd = ({ kis: "kış", bahar: "bahar/sonbahar", yaz: "yaz" } as Record<string, string>)[S.mevsim];
      el("sonucTablo").innerHTML = `
        <thead><tr><th>Kalem</th><th>Bugün<small>${mevsimAd} günü, ${havaAd}</small></th>
        <th>Aylık<small>${mevsimAd} ayı, ort. hava</small></th>
        <th>Yıllık<small>mevsim ağırlıklı</small></th></tr></thead>
        <tbody>${satirlar.map(([ad, fn]) =>
          `<tr class="${ad.startsWith("Net") ? "vurgu" : ""}"><td>${ad}</td><td>${fn(bugun)}</td><td>${fn(ay)}</td><td>${fn(yil)}</td></tr>`).join("")}
        </tbody>`;
      el("yatirimOzet").innerHTML = `
        <div><span>Tahmini kurulum maliyeti</span><b>${binf(S.guc * alt)} – ${binf(S.guc * ust)}</b></div>
        <div><span>Kaba geri ödeme</span><b>≈ ${(S.guc * alt / yil.kazanc).toFixed(1).replace(".", ",")} – ${(S.guc * ust / yil.kazanc).toFixed(1).replace(".", ",")} yıl</b></div>
        <div><span>Yıllık özgül üretim (PVGIS)</span><b>${f(ILLER[S.il].verim)} kWh/kWp</b></div>`;
      // 25 yıllık birikimli tasarruf grafiği (bugünkü fiyatlarla) + başabaş bandı
      const tepe25 = yil.kazanc * 25;
      let g25 = "";
      for (let y = 1; y <= 25; y++) {
        const v = yil.kazanc * y, x = 14 + (y - 1) * 26, h25 = (v / tepe25) * 150;
        const dolu = v >= S.guc * ust ? "#1F8A5D" : v >= S.guc * alt ? "#7AC6A2" : "#E8C43C";
        g25 += `<rect x="${x}" y="${168 - h25}" width="20" height="${h25}" rx="3" fill="${dolu}"/>`;
        if (y % 5 === 0) g25 += `<text x="${x + 10}" y="182" font-size="9" fill="#5E6660" text-anchor="middle">${y}. yıl</text>`;
      }
      const cizgi = (deger: number, ad: string) => {
        const cy = 168 - (deger / tepe25) * 150;
        return deger <= tepe25 ? `<line x1="10" x2="668" y1="${cy}" y2="${cy}" stroke="#A5620D" stroke-width="1.5" stroke-dasharray="5 4"/>
          <text x="666" y="${cy - 4}" font-size="9.5" fill="#A5620D" text-anchor="end">${ad}</text>` : "";
      };
      el("grafik25").innerHTML = g25 + cizgi(S.guc * alt, "yatırım (alt bant)") + cizgi(S.guc * ust, "yatırım (üst bant)");
      const basabasAlt = (S.guc * alt / yil.kazanc).toFixed(1).replace(".", ","),
        basabasUst = (S.guc * ust / yil.kazanc).toFixed(1).replace(".", ",");
      el("grafik25Not").textContent =
        `Bugünkü tarifelerle birikimli tasarruf; turuncu kesikli çizgiler yatırım bandı. Başabaş ≈ ${basabasAlt}–${basabasUst}. yıl. Elektrik zamları geri ödemeyi genellikle kısaltır.`;
      const co2 = yil.uretim * 0.42, agac = Math.round(co2 / 22), km = Math.round(co2 / 0.12);
      el("cevre").innerHTML = `
        <div><b>${f(co2 / 1000)} ton</b><span>yıllık CO₂ tasarrufu</span></div>
        <div><b>${f(agac)}</b><span>yetişkin ağaca eşdeğer</span></div>
        <div><b>${f(km)} km</b><span>araba yoluna eşdeğer</span></div>`;
      sonRapor = { bugun, ay, yil, kisY, baharY, yazY, pb, fi, alt, ust, satirlar };
      const kutu = el("sonuclar");
      kutu.hidden = false;
      kutu.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ---- PDF raporu: yeni pencerede biçimli rapor + yazdırma (PDF olarak kaydet) ----
    let sonRapor: { bugun: Donem; ay: Donem; yil: Donem; kisY: Donem; baharY: Donem; yazY: Donem;
      pb: { adet: number; alan: number }; fi: { alis: number; satis: number };
      alt: number; ust: number; satirlar: Array<[string, (d: Donem) => string]> } | null = null;
    function raporIndir() {
      if (!sonRapor) return;
      const { bugun, ay, yil, kisY, baharY, yazY, pb, fi, alt, ust, satirlar } = sonRapor;
      const f = (v: number) => Math.round(v).toLocaleString("tr-TR");
      const tlB = (v: number) => v.toFixed(2).replace(".", ",");
      const bugunTarih = new Date().toLocaleDateString("tr-TR");
      const grupAd = ({ mesken: "Mesken", ticarethane: "Ticarethane", sanayi: "Sanayi" } as Record<string, string>)[S.grup];
      const mevsimAd = ({ kis: "kış", bahar: "bahar/sonbahar", yaz: "yaz" } as Record<string, string>)[S.mevsim];
      const havaAd = ({ acik: "açık", parcali: "ortalama", bulutlu: "bulutlu" } as Record<string, string>)[S.hava];
      const saatSatir = saatler.map((s) =>
        `<tr><td>${String(s.h).padStart(2, "0")}:00</td><td>${s.u.toFixed(1)}</td><td>${s.t.toFixed(1)}</td>
         <td>${s.oz.toFixed(1)}</td><td>${s.satis.toFixed(1)}</td><td>${s.alis.toFixed(1)}</td></tr>`).join("");
      const mahsupKural = S.grup === "mesken"
        ? "Mesken aboneliğinde AYLIK mahsuplaşma uygulanır: ay içindeki toplam veriş ile çekiş ay sonunda netleştirilir; fazla üretim çıplak enerji bedeliyle değerlendirilir."
        : "İşletme aboneliklerinde 1 Mayıs 2026 itibarıyla SAATLİK mahsuplaşma uygulanır: her saat kendi içinde netleşir; o saatteki fazla üretim çıplak enerji bedelinden satılır, eksik vergili tarifeden alınır.";
      const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<title>GES Simülasyon Raporu — ${S.il}</title>
<style>
  body{font-family:"Avenir Next","Segoe UI",system-ui,sans-serif; color:#252525; margin:34px; font-size:12.5px; line-height:1.5}
  h1{font-size:21px; color:#004540; margin:0 0 2px}
  .alt{color:#5E6660; margin-bottom:18px; font-size:12px}
  h2{font-size:14px; color:#004540; margin:20px 0 8px; border-bottom:2px solid #004540; padding-bottom:3px}
  table{width:100%; border-collapse:collapse; font-size:11.5px}
  th,td{border:1px solid #D9DDD4; padding:5px 8px; text-align:right}
  th:first-child,td:first-child{text-align:left}
  th{background:#F0F3EC; color:#004540}
  tr.vurgu td{font-weight:700; background:#F6FBF4}
  .iki{display:flex; gap:26px} .iki>div{flex:1}
  .kutu{background:#F6F8F3; border:1px solid #E2E5DE; border-radius:8px; padding:10px 14px; margin:8px 0}
  .not{font-size:10.5px; color:#5E6660; margin-top:16px; border-top:1px solid #D9DDD4; padding-top:10px}
  @page{margin:14mm}
</style></head><body>
<h1>Güneş Sahası Simülasyon Raporu</h1>
<div class="alt">gesdanismani.com · ${bugunTarih} · Bu rapor eğitim amaçlı simülasyon çıktısıdır.</div>
<h2>1. Sistem Bilgileri</h2>
<div class="kutu">
  <b>${S.guc.toLocaleString("tr-TR")} kWp</b> ${S.tip === "cati" ? "çatı" : "arazi"} GES · ${S.il} ·
  ${grupAd} aboneliği (${S.gerilim})${S.tip === "cati" ? ` · ${({ guney: "güney", dogubati: "doğu/batı", kuzey: "kuzey" } as Record<string, string>)[S.cephe]} cephe, ${({ trapez: "trapez/sac", teras: "beton teras", kiremit: "kiremit" } as Record<string, string>)[S.cati]} çatı` : ""} · ≈ ${pb.adet.toLocaleString("tr-TR")} adet ${EKIPMAN.panelWp} Wp panel,
  ${pb.alan.toLocaleString("tr-TR")} m² panel alanı${S.batarya ? ` · ${S.batarya} kWh batarya` : ""} ·
  Aylık tüketim ${S.tuketim.toLocaleString("tr-TR")} kWh (${({ gunduz: "gündüz yoğun", aksam: "akşam yoğun", vardiya: "7/24" } as Record<string, string>)[S.profil]} profil)
</div>
<h2>2. Özet Karne</h2>
<table><thead><tr><th>Kalem</th><th>Bugün (${mevsimAd}, ${havaAd})</th><th>Aylık (${mevsimAd})</th><th>Yıllık (mevsim ağırlıklı)</th></tr></thead>
<tbody>${satirlar.map(([ad, fn]) => `<tr class="${ad.startsWith("Net") ? "vurgu" : ""}"><td>${ad}</td><td>${fn(bugun)}</td><td>${fn(ay)}</td><td>${fn(yil)}</td></tr>`).join("")}</tbody></table>
<h2>3. Oynatılan Günün Saatlik Dökümü (${mevsimAd} günü, ${havaAd} hava)</h2>
<p>${mahsupKural}</p>
<table><thead><tr><th>Saat</th><th>Üretim (kW)</th><th>Tüketim (kW)</th><th>Öz tüketim (kW)</th><th>${S.grup === "mesken" ? "Emanet" : "Satış"} (kW)</th><th>Alış (kW)</th></tr></thead>
<tbody>${saatSatir}</tbody></table>
<h2>4. Mevsimlere Göre Yıllık Dağılım</h2>
<table><thead><tr><th>Dönem</th><th>Üretim (kWh)</th><th>Öz tüketim (kWh)</th><th>${S.grup === "mesken" ? "Emanet" : "Satış"} (kWh)</th><th>Alış (kWh)</th><th>Net kazanç (₺)</th></tr></thead><tbody>
<tr><td>Kış (90 gün)</td><td>${f(kisY.uretim)}</td><td>${f(kisY.oz)}</td><td>${f(kisY.satis)}</td><td>${f(kisY.alis)}</td><td>+${f(kisY.kazanc)}</td></tr>
<tr><td>Bahar/Sonbahar (183 gün)</td><td>${f(baharY.uretim)}</td><td>${f(baharY.oz)}</td><td>${f(baharY.satis)}</td><td>${f(baharY.alis)}</td><td>+${f(baharY.kazanc)}</td></tr>
<tr><td>Yaz (92 gün)</td><td>${f(yazY.uretim)}</td><td>${f(yazY.oz)}</td><td>${f(yazY.satis)}</td><td>${f(yazY.alis)}</td><td>+${f(yazY.kazanc)}</td></tr>
<tr class="vurgu"><td>Yıl toplamı</td><td>${f(yil.uretim)}</td><td>${f(yil.oz)}</td><td>${f(yil.satis)}</td><td>${f(yil.alis)}</td><td>+${f(yil.kazanc)}</td></tr>
</tbody></table>
<h2>5. Yatırım ve 25 Yıllık Bakış</h2>
<table><thead><tr><th></th><th>Değer</th></tr></thead><tbody>
<tr><td>25 yıllık toplam tasarruf (bugünkü fiyatlarla)</td><td>≈ ${f(yil.kazanc * 25)} ₺</td></tr>
<tr><td>Başabaş (yatırımın döndüğü yıl)</td><td>≈ ${(S.guc * alt / yil.kazanc).toFixed(1).replace(".", ",")} – ${(S.guc * ust / yil.kazanc).toFixed(1).replace(".", ",")}. yıl</td></tr>
<tr><td>Yıllık CO₂ tasarrufu</td><td>≈ ${f(yil.uretim * 0.42 / 1000)} ton (${f(Math.round(yil.uretim * 0.42 / 22))} yetişkin ağaca eşdeğer)</td></tr>
</tbody></table>
<div class="iki"><div class="kutu">Tahmini kurulum maliyeti<br><b>${(S.guc * alt / 1e6).toFixed(1).replace(".", ",")} – ${(S.guc * ust / 1e6).toFixed(1).replace(".", ",")} M₺</b> aralığı (güncel piyasa bantları)</div>
<div class="kutu">Kaba geri ödeme süresi<br><b>≈ ${(S.guc * alt / yil.kazanc).toFixed(1).replace(".", ",")} – ${(S.guc * ust / yil.kazanc).toFixed(1).replace(".", ",")} yıl</b> (yıllık net kazançla)</div></div>
<div class="not"><b>Varsayımlar ve kaynaklar:</b> Üretim profilleri PVGIS v5.2 (${S.il}, 30° eğim, %14 sistem kaybı, 2020 saatlik serisi);
yıllık özgül üretim ${f(ILLER[S.il].verim)} kWh/kWp. Fiyatlar EPDK güncel tarifeleri: vergili alış ${tlB(fi.alis)} ₺/kWh,
${S.grup === "mesken" ? "mahsup emanet değeri ≈ " + tlB(fi.alis * 0.85) : "satış (çıplak enerji bedeli) " + tlB(fi.satis)} ₺/kWh.
İnverter kırpma tavanı DC/AC ${EKIPMAN.dcAcOran}. Batarya tur verimi %95.
Bu rapor bilgilendirme amaçlıdır; bağlayıcı fizibilite niteliği taşımaz — kişisel hesap için gesdanismani.com/hesaplama ve fatura analizi kullanılmalıdır.</div>
<script>window.onload = () => setTimeout(() => window.print(), 300);</script>
</body></html>`;
      const p = window.open("", "_blank");
      if (!p) return;
      p.document.write(html);
      p.document.close();
    }

    function dongu() {
      if (!oynuyor) return;
      zaman += 0.016 * HIZLAR[hizIx] * 0.55;
      if (zaman >= 30) { oynuyor = false; karneGoster(); return; }
      const h = Math.floor(zaman) % 24, s = saatler[h];
      el("saatPul").textContent =
        String(h).padStart(2, "0") + ":" + String(Math.floor((zaman % 1) * 60)).padStart(2, "0");
      gokyuzu(zaman % 24); gunesKonum(zaman % 24);
      const tepe = Math.max(...saatler.map((x) => Math.max(x.u, x.t)), 1);
      el("u" + h).style.height = (s.u / tepe) * 80 + "px";
      el("t" + h).style.height = (s.t / tepe) * 80 + "px";
      kok.current!.querySelectorAll(".hucre").forEach((c) =>
        c.setAttribute("fill", s.u > tepe * 0.35 ? "#FFE175" : s.u > 0 ? "#7FB99B" : "#0E4F49"));
      isinDemeti(s.u, tepe);
      if (Math.random() < 0.5) akisParcaciklari(s);
      panelYaz(s, toplamHesap(h + 1));
      kare = requestAnimationFrame(dongu);
    }
    el("baslat").onclick = () => {
      if (oynuyor) return;
      if (!S.il) { ilSec.classList.add("uyar"); ilSec.focus(); return; }
      if (zaman >= 30) sifirla();
      oynuyor = true; (el("baslat") as HTMLButtonElement).disabled = true;
      kare = requestAnimationFrame(dongu);
    };
    el("hiz").onclick = (e) => {
      hizIx = (hizIx + 1) % HIZLAR.length;
      (e.currentTarget as HTMLElement).textContent = "Hız " + HIZLAR[hizIx] + "×";
    };
    el("raporBtn").onclick = raporIndir;
    // ---- uydudan çatı çizimi (Google Maps; anahtar yoksa düğme görünmez) ----
    let harita: unknown = null, cizimYonetici: unknown = null, sonCokgen: unknown = null, sonAlan = 0;
    const g = () => (window as unknown as { google: any }).google;
    function haritaYukle(): Promise<void> {
      return new Promise((coz, red) => {
        if ((window as unknown as { google?: unknown }).google) return coz();
        const s = document.createElement("script");
        s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_ANAHTAR}&libraries=drawing,places,geometry&language=tr&region=TR`;
        s.onload = () => coz(); s.onerror = () => red(new Error("maps yüklenemedi"));
        document.head.appendChild(s);
      });
    }
    function alanOzeti() {
      if (!sonAlan) { el("uyduBilgi").textContent = "Çatınızın köşelerini haritada tıklayarak işaretleyin."; return; }
      const kwp = S.tip === "cati"
        ? (sonAlan * 0.6 / EKIPMAN.panelM2) * (EKIPMAN.panelWp / 1000)
        : sonAlan / 15;
      const oneri = Math.max(5, Math.round(kwp / 5) * 5);
      el("uyduBilgi").innerHTML =
        `Seçilen alan: <b>${Math.round(sonAlan).toLocaleString("tr-TR")} m²</b> · ` +
        `sığabilecek güç: <b>≈ ${oneri.toLocaleString("tr-TR")} kWp</b> ` +
        `(${Math.ceil(oneri * 1000 / EKIPMAN.panelWp).toLocaleString("tr-TR")} panel)`;
      (el("uyduKullan") as HTMLButtonElement).disabled = false;
      (el("uyduKullan") as HTMLButtonElement).dataset.kwp = String(oneri);
    }
    async function uyduAc() {
      el("uyduPerde").classList.add("acik");
      try { await haritaYukle(); } catch { el("uyduBilgi").textContent = "Harita yüklenemedi; lütfen daha sonra deneyin."; return; }
      if (!harita) {
        const G = g();
        harita = new G.maps.Map(el("uyduHarita"), {
          center: { lat: 39.0, lng: 35.0 }, zoom: 6, mapTypeId: "satellite",
          tilt: 0, streetViewControl: false, fullscreenControl: false, mapTypeControl: false,
        });
        const arama = new G.maps.places.Autocomplete(el("uyduAdres") as HTMLInputElement,
          { componentRestrictions: { country: "tr" }, fields: ["geometry"] });
        arama.addListener("place_changed", () => {
          const yer = arama.getPlace();
          if (yer.geometry?.location) {
            (harita as any).setCenter(yer.geometry.location);
            (harita as any).setZoom(19);
          }
        });
        cizimYonetici = new G.maps.drawing.DrawingManager({
          drawingMode: G.maps.drawing.OverlayType.POLYGON,
          drawingControl: false,
          polygonOptions: { fillColor: "#FFE175", fillOpacity: 0.45, strokeColor: "#E8C43C",
            strokeWeight: 2.5, editable: true },
        });
        (cizimYonetici as any).setMap(harita);
        G.maps.event.addListener(cizimYonetici, "polygoncomplete", (poli: any) => {
          if (sonCokgen) (sonCokgen as any).setMap(null);
          sonCokgen = poli;
          const hesapla = () => { sonAlan = G.maps.geometry.spherical.computeArea(poli.getPath()); alanOzeti(); };
          hesapla();
          poli.getPath().addListener("set_at", hesapla);
          poli.getPath().addListener("insert_at", hesapla);
          (cizimYonetici as any).setDrawingMode(null);
        });
      }
      alanOzeti();
    }
    if (MAPS_ANAHTAR) {
      el("uyduAcBtn").onclick = () => void uyduAc();
      el("uyduKapat").onclick = () => el("uyduPerde").classList.remove("acik");
      el("uyduTemizle").onclick = () => {
        if (sonCokgen) (sonCokgen as any).setMap(null);
        sonCokgen = null; sonAlan = 0;
        (el("uyduKullan") as HTMLButtonElement).disabled = true;
        if (cizimYonetici) (cizimYonetici as any).setDrawingMode(g().maps.drawing.OverlayType.POLYGON);
        alanOzeti();
      };
      el("uyduKullan").onclick = (e) => {
        const kwp = Number((e.currentTarget as HTMLElement).dataset.kwp || 0);
        if (kwp) { gucUygula(kwp); }
        el("uyduPerde").classList.remove("acik");
        el("panelSayi").insertAdjacentHTML("beforeend",
          ` · uydudan seçilen alan ${Math.round(sonAlan).toLocaleString("tr-TR")} m²`);
      };
    }
    el("tekrar").onclick = () => {
      el("sonuclar").hidden = true;
      sifirla();
      el("sahneKutu").scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const adimBoyu = () => (S.grup === "sanayi" ? 50 : S.grup === "ticarethane" ? 10 : 5);
    el("panelArti").onclick = () => gucUygula(S.guc + adimBoyu());
    el("panelEksi").onclick = () => gucUygula(S.guc - adimBoyu());
    sahneKur(); sifirla();
    return () => { oynuyor = false; cancelAnimationFrame(kare); };
  }, []);

  return (
    <div className="simx" ref={kok}>
      <div className="girdiler">
        <div className="birincil">
          <div className="grup"><span>Kurulum
            <button className="terim" data-tip="Paneller bir binanın çatısına da, boş bir araziye de kurulabilir. Arazide gölgesiz yerleşim ve daha iyi havalandırma sayesinde üretim biraz daha yüksektir." aria-label="Kurulum nedir" type="button">?</button></span>
            <div className="cipler" data-ad="tip">
              <button className="cip on" data-deger="cati" type="button">Çatı</button>
              <button className="cip" data-deger="arazi" type="button">Arazi</button></div></div>
          <div className="grup"><span>Abone Grubu
            <button className="terim" data-tip="Elektrik sözleşmenizin türü: Mesken = konut, Ticarethane = dükkan/ofis, Sanayi = fabrika. Fiyatlar ve mahsuplaşma kuralı gruba göre değişir." aria-label="Abone grubu nedir" type="button">?</button></span>
            <div className="cipler" data-ad="grup">
              <button className="cip" data-deger="mesken" type="button">Mesken</button>
              <button className="cip on" data-deger="ticarethane" type="button">Ticarethane</button>
              <button className="cip" data-deger="sanayi" type="button">Sanayi</button></div></div>
          <div className="grup"><span>Santral Gücü
            <button className="terim" data-tip="kWp = panellerin tepe gücü; kaç panel taktığınızın ölçüsü. 10 kWp ≈ 17-18 panel, bir konut çatısını doldurur." aria-label="kWp nedir" type="button">?</button></span>
            <div className="kaydirici">
              <input type="range" id="guc" min={5} max={1000} step={5} defaultValue={50} />
              <span className="sayi-kutu"><input type="number" id="gucSayi" min={5} max={5000} defaultValue={50} aria-label="Güç (kWp)" /><i>kWp</i></span></div>
            <button className="tam-karsila" id="tamKarsila" type="button">⚡ Faturamı tam karşıla</button>
            {MAPS_ANAHTAR ? (
              <button className="tam-karsila" id="uyduAcBtn" type="button">🛰 Uydudan çatını çiz</button>
            ) : null}
            <small className="panel-sayi" id="panelSayi"></small>
            <small className="panel-sayi uyari" id="gucUyari" style={{ display: "none" }}>Konutta yasal üst sınır 25 kW — güç buna çekildi.</small></div>
          <div className="grup"><span>İl</span><select id="il" aria-label="İl"></select></div>
        </div>

        <button className="gelismis-ac" id="gelismisAc" aria-expanded="false" type="button">Gelişmiş ayarlar</button>
        <div className="gelismis" id="gelismis">
          <div className="grup"><span>Bağlantı
            <button className="terim" data-tip="AG (alçak gerilim): evler ve küçük işletmelerin standart bağlantısı. OG (orta gerilim): trafolu büyük tesisler — birim fiyatı biraz daha düşüktür." aria-label="AG OG nedir" type="button">?</button></span>
            <div className="cipler" data-ad="gerilim">
              <button className="cip on" data-deger="AG" type="button">AG</button>
              <button className="cip" data-deger="OG" type="button">OG</button></div></div>
          <div className="grup" id="catiAyarGrup"><span>Çatı Cephesi &amp; Tipi
            <button className="terim" data-tip="Cephe: panellerin baktığı yön — güney en verimlisidir, doğu/batı ~%15, kuzey ~%40 kayıp yaratır. Çatı tipi montaj maliyetini etkiler (kiremit en işçiliklisi)." aria-label="Cephe ve çatı tipi" type="button">?</button></span>
            <div className="cipler" data-ad="cephe">
              <button className="cip on" data-deger="guney" type="button">Güney</button>
              <button className="cip" data-deger="dogubati" type="button">Doğu/Batı</button>
              <button className="cip" data-deger="kuzey" type="button">Kuzey</button></div>
            <div className="cipler" data-ad="cati">
              <button className="cip on" data-deger="trapez" type="button">Trapez/Sac</button>
              <button className="cip" data-deger="teras" type="button">Beton Teras</button>
              <button className="cip" data-deger="kiremit" type="button">Kiremit</button></div></div>
          <div className="grup"><span>Gün Koşulu
            <button className="terim" data-tip="Yalnız oynattığın günün animasyonunu ve 'Bugün' sonucunu etkiler; aylık ve yıllık sonuçlar ortalama koşullardan hesaplanır." aria-label="Gün koşulu neyi etkiler" type="button">?</button></span>
            <div className="cipler" data-ad="mevsim">
              <button className="cip" data-deger="kis" type="button">Kış</button>
              <button className="cip on" data-deger="bahar" type="button">Bahar</button>
              <button className="cip" data-deger="yaz" type="button">Yaz</button></div>
            <div className="cipler" data-ad="hava">
              <button className="cip on" data-deger="acik" type="button">Açık</button>
              <button className="cip" data-deger="parcali" type="button">Ortalama</button>
              <button className="cip" data-deger="bulutlu" type="button">Bulutlu</button></div></div>
          <div className="grup"><span>Tüketim
            <button className="terim" data-tip="Aylık kWh tüketiminiz ve elektriği günün hangi saatlerinde kullandığınız. Üretim gündüz olduğu için gündüz tüketen kazançlı çıkar." aria-label="Tüketim nedir" type="button">?</button></span>
            <div className="kaydirici"><input type="range" id="tuketim" min={500} max={200000} step={500} defaultValue={9000} />
              <span className="sayi-kutu"><input type="number" id="tukSayi" min={100} max={2000000} defaultValue={9000} aria-label="Aylık tüketim (kWh)" /><i>kWh/ay</i></span></div>
            <div className="cipler" data-ad="profil">
              <button className="cip on" data-deger="gunduz" type="button">Gündüz</button>
              <button className="cip" data-deger="aksam" type="button">Akşam</button>
              <button className="cip" data-deger="vardiya" type="button">7/24</button></div></div>
          <div className="grup"><span>Batarya
            <button className="terim" data-tip="Gündüz üretilen fazla elektriği depolayıp gece kullanmanızı sağlar. 10 kWh, bir konutu akşam boyunca besler." aria-label="Batarya nedir" type="button">?</button></span>
            <div className="kaydirici">
              <input type="range" id="batarya" min={0} max={200} step={10} defaultValue={0} />
              <output id="batCikti">yok</output></div></div>
        </div>

        <details className="sozlukcuk">
          <summary>Terimler ne anlama geliyor?</summary>
          <div>
            <span><b>kWp:</b> panellerin tepe gücü — santralin &quot;büyüklüğü&quot;.</span>
            <span><b>kWh:</b> üretilen ya da tüketilen enerji miktarı; faturanız kWh üzerinden hesaplanır.</span>
            <span><b>AG / OG:</b> alçak / orta gerilim bağlantısı; evler AG, trafolu büyük tesisler OG kullanır.</span>
            <span><b>Öz tüketim:</b> ürettiğiniz elektriğin şebekeye gitmeden kendi binanızda kullanılan kısmı — en kârlı kısım budur.</span>
            <span><b>Mahsuplaşma:</b> şebekeye verdiğiniz ile şebekeden aldığınızın netleştirilmesi. Meskende ay sonunda, işletmelerde saat saat yapılır.</span>
            <span><b>Üretim verisi:</b> il bazlı gerçek PVGIS güneşlenme profilleri (30° eğim, %14 sistem kaybı).</span>
          </div>
        </details>
      </div>

      <div className="oyun">
        <div className="sahne-kutu" id="sahneKutu">
          <svg viewBox="0 0 900 520" aria-label="İzometrik güneş santrali sahnesi">
            <ellipse cx="450" cy="415" rx="400" ry="120" fill="#CFE0CC" />
            <ellipse cx="450" cy="410" rx="380" ry="110" fill="#DBEAD6" />
            <circle id="gunes" cx="140" cy="120" r="26" fill="#FFE175" stroke="#E8C43C" strokeWidth="3" />
            <g id="gunesIsin" stroke="#E8C43C" strokeWidth="2.5" strokeLinecap="round"></g>
            <g id="direk" transform="translate(760 240)">
              <path d="M0 160 L14 0 L28 160" fill="none" stroke="#7A8884" strokeWidth="6" strokeLinejoin="round" />
              <path d="M-26 34 H54 M-18 66 H46" stroke="#7A8884" strokeWidth="5" strokeLinecap="round" />
              <path d="M-26 34 C-80 90 -150 120 -210 132" stroke="#9AA8A2" strokeWidth="2.5" fill="none" />
              <text x="14" y="185" textAnchor="middle" fontSize="13" fill="#5E6660" fontWeight="600">Şebeke</text>
            </g>
            {/* çatı sahnesi */}
            <g id="sahneCati">
              <path d="M300 330 L470 250 L640 330 L470 410 Z" fill="#F6F7F3" stroke="#004540" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M300 330 L300 390 L470 470 L470 410 Z" fill="#E3E7DE" stroke="#004540" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M640 330 L640 390 L470 470 L470 410 Z" fill="#D3D8CC" stroke="#004540" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M330 316 L470 250 L610 316 L470 382 Z" fill="#0B5A52" stroke="#004540" strokeWidth="2" strokeLinejoin="round"/>
              <g id="panelIzgara"></g>
              <path d="M395 430 L395 462 L445 486 L445 452 Z" fill="none" stroke="#004540" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M405 440 L435 454" stroke="#004540" strokeWidth="1.4"/>
              <g id="pencereler" fill="#FFE175" stroke="#004540" strokeWidth="1.4" opacity="0">
                <path d="M330 358 L356 370 L356 392 L330 380 Z"/><path d="M560 380 L586 368 L586 392 L560 404 Z"/>
              </g>
              <text x="470" y="500" textAnchor="middle" fontSize="13" fill="#5E6660" fontWeight="600" id="binaEtiket">Ticarethane</text>
            </g>
            {/* arazi sahnesi */}
            <g id="sahneArazi" opacity="0">
              <g id="araziIzgara"></g>
              <g stroke="#004540" strokeWidth="2" strokeLinejoin="round">
                <path d="M600 356 L668 324 L736 356 L668 388 Z" fill="#F6F7F3"/>
                <path d="M600 356 L600 396 L668 428 L668 388 Z" fill="#E3E7DE"/>
                <path d="M736 356 L736 396 L668 428 L668 388 Z" fill="#D3D8CC"/>
                <path d="M636 396 L636 414 L658 424 L658 406 Z" fill="none"/>
              </g>
              <g id="pencereler2" fill="#FFE175" stroke="#004540" strokeWidth="1.2" opacity="0">
                <path d="M690 380 L712 370 L712 388 L690 398 Z"/>
              </g>
              <text x="668" y="452" textAnchor="middle" fontSize="13" fill="#5E6660" fontWeight="600" id="araziEtiket">Tesis</text>
            </g>
            <g id="batKutu" transform="translate(212 342)" opacity="0">
              <path d="M0 18 L34 2 L68 18 L34 34 Z" fill="#0A6B5C" stroke="#004540" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M0 18 L0 52 L34 68 L34 34 Z" fill="#08574B" stroke="#004540" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M68 18 L68 52 L34 68 L34 34 Z" fill="#063F37" stroke="#004540" strokeWidth="1.6" strokeLinejoin="round" />
              <rect id="batSeviye" x="8" y="40" width="0" height="8" rx="3" transform="skewY(24)" fill="#FFE175" />
              <text x="34" y="88" textAnchor="middle" fontSize="12" fill="#5E6660" fontWeight="600">Batarya</text>
            </g>
            {/* ışın demeti */}
            <g id="isinDemeti" stroke="#E8C43C" strokeWidth="2.5" strokeLinecap="round" opacity="0" fill="none"></g>
            <g id="parcaciklar"></g>
          </svg>
          <div className="saat-pul" id="saatPul">06:00</div>
          <div className="panel-arac" role="group" aria-label="Panel ekle veya çıkar">
            <button id="panelEksi" type="button" aria-label="Panel çıkar (5 kWp)">−</button>
            <span>panel</span>
            <button id="panelArti" type="button" aria-label="Panel ekle (5 kWp)">+</button>
          </div>
          <div className="kontrol">
            <button className="gt-btn small" id="baslat" type="button">▶ Günü Başlat</button>
            <button className="gt-btn small line" id="hiz" type="button">Hız 1×</button>
          </div>
        </div>

        <div className="olcum">
          <div className="kart">
            <h3>Şu An</h3>
            <div className="akislar">
              <div className="akis"><i style={{ background: "#E8C43C" }} />Üretim <b id="aUretim">0 kW</b></div>
              <div className="akis"><i style={{ background: "#B3C9C4" }} />Tüketim <b id="aTuketim">0 kW</b></div>
              <div className="akis"><i style={{ background: "#1F8A5D" }} />Şebekeye satış <b id="aSatis">0 kW</b></div>
              <div className="akis"><i style={{ background: "#A5620D" }} />Şebekeden alış <b id="aAlis">0 kW</b></div>
              <div className="akis" id="aBatSatir" style={{ display: "none" }}><i style={{ background: "#0A6B5C" }} />Batarya <b id="aBat">%0</b></div>
            </div>
          </div>
          <div className="kart">
            <h3>Saatlik Üretim ve Tüketim</h3>
            <div className="cubuklar" id="cubuklar"></div>
            <div className="grafik-aciklama">
              <span><i style={{ background: "#E8C43C" }} />üretim</span>
              <span><i style={{ background: "#B3C9C4" }} />tüketim</span>
            </div>
          </div>
          <div className="kart">
            <h3 id="mahsupBaslik">Bugünkü Kazanç</h3>
            <div className="canli-sayi">
              <div><b id="cUretim">0</b><span>kWh üretim</span></div>
              <div><b id="cOz">%0</b><span>öz tüketim</span></div>
              <div><b id="cSatis">0</b><span>kWh satış</span></div>
              <div><b id="cKazanc">0 ₺</b><span>cebinde kalan</span></div>
            </div>
          </div>
          <p className="not">Üretim eğrileri il bazlı gerçek PVGIS güneşlenme verisinden gelir; fiyatlar
            güncel EPDK tarifeleriyle hesaplanır. Rakamlar eğitim amaçlıdır — kişisel hesap için
            Hesaplama Araçları ve Fatura Analizi kullanın.</p>
        </div>
      </div>

      <div className="uydu-perde" id="uyduPerde">
        <div className="uydu-kutu">
          <div className="uydu-ust">
            <input id="uyduAdres" type="text" placeholder="Adresinizi yazın (mahalle, sokak…)" />
            <button className="gt-btn small line" id="uyduTemizle" type="button">Temizle</button>
            <button className="gt-btn small" id="uyduKullan" type="button" disabled>Alanı Kullan</button>
            <button className="uydu-kapat" id="uyduKapat" type="button" aria-label="Kapat">✕</button>
          </div>
          <div id="uyduHarita" className="uydu-harita"></div>
          <p className="dip" id="uyduBilgi">Çatınızın köşelerini haritada tıklayarak işaretleyin.</p>
        </div>
      </div>

      <div className="sonuclar" id="sonuclar" hidden>
        <div className="sonuc-ust">
          <h2>Gün Sonu Karnesi</h2>
          <span id="sonucBaslik"></span>
        </div>
        <div className="sonuc-tablo-kutu">
          <table className="sonuc-tablo" id="sonucTablo"></table>
        </div>
        <div className="yatirim-ozet" id="yatirimOzet"></div>
        <div className="grafik25-kutu">
          <h3>25 Yıllık Birikimli Tasarruf</h3>
          <svg viewBox="0 0 680 186" id="grafik25" role="img" aria-label="25 yıllık birikimli tasarruf grafiği"></svg>
          <p className="dip" id="grafik25Not"></p>
        </div>
        <div className="cevre" id="cevre"></div>
        <div className="karne-cta">
          <button className="gt-btn small" id="raporBtn" type="button">PDF Raporu İndir</button>
          <a className="gt-btn small line" href="/hesaplama">Detaylı Hesap</a>
          <a className="gt-btn small line" href="/fatura-analizi">Fatura Analizi</a>
          <button className="gt-btn small" id="tekrar" type="button">Tekrar Simüle Et</button>
        </div>
      </div>
    </div>
  );
}
