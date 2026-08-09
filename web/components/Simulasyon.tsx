"use client";

import { useEffect, useRef } from "react";
import { EKIPMAN, LIMITLER, MALIYET_BANT, TARIFE } from "@/data/kb";
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

export default function Simulasyon() {
  const kok = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = (id: string) => document.getElementById(id)!;
    const S = { tip: "cati", grup: "ticarethane", gerilim: "AG", il: "",
      mevsim: "bahar" as "kis" | "bahar" | "yaz", hava: "acik" as "acik" | "parcali" | "bulutlu",
      guc: 50, tuketim: 9000, profil: "gunduz" as keyof typeof PROFIL, batarya: 0 };

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
        const ham = (profil[h] / 1000) * S.guc * (havaCarpani ?? HAVA[S.hava][S.mevsim]) * (S.tip === "arazi" ? ARAZI : 1);
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
    function karneGoster() {
      const f = (v: number) => Math.round(v).toLocaleString("tr-TR");
      const tlB = (v: number) => v.toFixed(2).replace(".", ",");
      const fi = fiyatlar();
      const pb = panelBilgi();
      const binf = (v: number) => v >= 1_000_000
        ? (v / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " M₺"
        : Math.round(v / 1000).toLocaleString("tr-TR") + " bin ₺";

      // Bugün: oynatılan gün (seçili hava). Ay/yıl: ortalama koşullar (hava=1.0).
      const bugun = toplamHesap(24);
      const ortalamaGun = gunHesabi(1);
      const ort = toplamHesap(24, ortalamaGun);
      const ay = { uretim: ort.uretim * 30, satis: ort.satis * 30, alis: ort.alis * 30, kazanc: ort.kazanc * 30 };
      const yillikUretim = S.guc * ILLER[S.il].verim * (S.tip === "arazi" ? ARAZI : 1);
      const ozOran = ort.uretim ? (ort.oz + ort.batVer) / ort.uretim : 0.7;
      const yillikKazanc = yillikUretim * (ozOran * fi.alis + (1 - ozOran) * fi.satis);
      const seg = S.grup === "mesken" ? "konut" : "ticari";
      const bantlar = MALIYET_BANT[seg as keyof typeof MALIYET_BANT] as ReadonlyArray<readonly [number, number, number]>;
      let alt = bantlar[bantlar.length - 1][1], ust = bantlar[bantlar.length - 1][2];
      for (const [maks, a, u] of bantlar) if (S.guc <= maks) { alt = a; ust = u; break; }
      const bugunOz = bugun.oz + bugun.batVer;

      el("sonucBaslik").textContent =
        `${S.guc.toLocaleString("tr-TR")} kWp · ${pb.adet.toLocaleString("tr-TR")} panel (${pb.alan.toLocaleString("tr-TR")} m²) · ${S.il}`;
      el("sonucGun").innerHTML = `
        <h4>Bugün <small>(oynattığın ${({ kis: "kış", bahar: "bahar", yaz: "yaz" } as Record<string, string>)[S.mevsim]} günü, ${({ acik: "açık", parcali: "ortalama", bulutlu: "bulutlu" } as Record<string, string>)[S.hava]} hava)</small></h4>
        <div><span>Üretim</span><b>${f(bugun.uretim)} kWh</b></div>
        <div><span>Öz tüketim</span><b>%${bugun.uretim ? Math.round((bugunOz / bugun.uretim) * 100) : 0} · ${f(bugunOz)} kWh</b></div>
        <div><span>Şebekeye ${S.grup === "mesken" ? "emanet" : "satış"}</span><b>${f(bugun.satis)} kWh</b></div>
        <div><span>Şebekeden alış</span><b>${f(bugun.alis)} kWh</b></div>
        <div class="vurgu"><span>Cebinde kalan</span><b>+${f(bugun.kazanc)} ₺</b></div>
        <p class="dip">Önlenen fatura ${f(bugunOz)} kWh × ${tlB(fi.alis)} ₺ + ${S.grup === "mesken" ? "mahsup emaneti" : "satış"} ${f(bugun.satis)} kWh × ${tlB(S.grup === "mesken" ? fi.alis * 0.85 : fi.satis)} ₺</p>`;
      const gessizFatura = S.tuketim * fi.alis;
      const satisDegeri = S.grup === "mesken" ? fi.alis * 0.85 : fi.satis;
      const gesliFatura = Math.max(0, ay.alis * fi.alis - ay.satis * satisDegeri);
      const dusus = gessizFatura ? Math.round((1 - gesliFatura / gessizFatura) * 100) : 0;
      el("sonucAy").innerHTML = `
        <h4>Aylık <small>(${({ kis: "kış", bahar: "bahar/sonbahar", yaz: "yaz" } as Record<string, string>)[S.mevsim]} ayı, ortalama hava)</small></h4>
        <div><span>Üretim</span><b>${f(ay.uretim)} kWh</b></div>
        <div><span>Tüketimin</span><b>${f(S.tuketim)} kWh</b></div>
        <div><span>GES'siz fatura</span><b>≈ ${f(gessizFatura)} ₺</b></div>
        <div><span>GES ile fatura</span><b>≈ ${f(gesliFatura)} ₺${gesliFatura === 0 ? " (alacaklısın)" : ""}</b></div>
        <div class="vurgu"><span>Fatura düşüşü</span><b>%${Math.max(0, Math.min(100, dusus))}</b></div>
        <p class="dip">Mevsimin tipik günü × 30; satış/mahsup geliri faturadan düşülmüş hâli. Hava seçimi yalnız oynatılan günü etkiler.</p>`;
      el("sonucYil").innerHTML = `
        <h4>Yıllık <small>(4 mevsim, gerçek PVGIS verimi)</small></h4>
        <div><span>Üretim</span><b>≈ ${f(yillikUretim)} kWh</b></div>
        <div><span>Yıllık kazanç</span><b>≈ ${f(yillikKazanc)} ₺</b></div>
        <div><span>Kurulum maliyeti</span><b>${binf(S.guc * alt)} – ${binf(S.guc * ust)}</b></div>
        <div class="vurgu"><span>Kaba geri ödeme</span><b>≈ ${(S.guc * alt / yillikKazanc).toFixed(1).replace(".", ",")} – ${(S.guc * ust / yillikKazanc).toFixed(1).replace(".", ",")} yıl</b></div>
        <p class="dip">Güncel kb maliyet bantları; kesin rakam için Detaylı Hesap.</p>`;
      const kutu = el("sonuclar");
      kutu.hidden = false;
      kutu.scrollIntoView({ behavior: "smooth", block: "start" });
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

      <div className="sonuclar" id="sonuclar" hidden>
        <div className="sonuc-ust">
          <h2>Gün Sonu Karnesi</h2>
          <span id="sonucBaslik"></span>
        </div>
        <div className="sonuc-izgara">
          <div className="sonuc-kart" id="sonucGun"></div>
          <div className="sonuc-kart" id="sonucAy"></div>
          <div className="sonuc-kart one" id="sonucYil"></div>
        </div>
        <div className="karne-cta">
          <a className="gt-btn small line" href="/hesaplama">Detaylı Hesap</a>
          <a className="gt-btn small line" href="/fatura-analizi">Fatura Analizi</a>
          <button className="gt-btn small" id="tekrar" type="button">Tekrar Simüle Et</button>
        </div>
      </div>
    </div>
  );
}
