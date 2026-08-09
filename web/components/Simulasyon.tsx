"use client";

import { useEffect, useRef } from "react";
import { EKIPMAN, MALIYET_BANT, TARIFE } from "@/data/kb";
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
        sahneKur(); sifirla();
      }));
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
    bagla("guc", "gucCikti", (v) => v + " kWp", "guc");
    bagla("tuketim", "tukCikti", (v) => v.toLocaleString("tr-TR") + " kWh/ay", "tuketim");
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
    function panelBilgi() {
      const adet = Math.ceil((S.guc * 1000) / EKIPMAN.panelWp);
      const alan = Math.round(adet * EKIPMAN.panelM2);
      el("panelSayi").textContent = `≈ ${adet} panel · ${alan.toLocaleString("tr-TR")} m² panel alanı`;
      return { adet, alan };
    }
    function sahneKur() {
      const cati = S.tip === "cati";
      el("bina").style.opacity = cati ? "1" : ".25";
      el("arazi").setAttribute("opacity", cati ? "0" : "1");
      el("binaEtiket").textContent =
        ({ mesken: "Konut", ticarethane: "Ticarethane", sanayi: "Sanayi Tesisi" } as Record<string, string>)[S.grup] +
        (S.gerilim === "OG" && S.grup !== "mesken" ? " · OG" : "");
      const oran = Math.max(1, Math.round((S.guc / 250) * (cati ? 12 : 18)));
      if (cati) panelDoku(el("panelIzgara"), 3, 4, 352, 316, 32, -15, 26, 12, 26, 24, oran);
      else panelDoku(el("araziIzgara"), 3, 6, 300, 330, 42, -19, 20, 26, 34, 30, oran);
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
    function gunHesabi(): Saat[] {
      if (!S.il) return Array.from({ length: 24 }, (_, h) =>
        ({ h, u: 0, t: 0, oz: 0, satis: 0, alis: 0, bat: 0, batAksi: 0 }));
      const profil = ILLER[S.il].profil[S.mevsim];
      const gunlukTuk = S.tuketim / 30, sekil = PROFIL[S.profil],
        toplamSekil = sekil.reduce((a, b) => a + b, 0);
      const saatler: Saat[] = [];
      let bat = 0;
      for (let h = 0; h < 24; h++) {
        const ham = (profil[h] / 1000) * S.guc * HAVA[S.hava][S.mevsim] * (S.tip === "arazi" ? ARAZI : 1);
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
    const NOKTA = { panel: [470, 300], bina: [470, 440], direk: [774, 300], bat: [246, 370] } as const;
    function akisParcaciklari(s: Saat) {
      if (!oynuyor) return;
      const tepe = Math.max(...saatler.map((x) => x.u), 1);
      if (s.oz > 0 && Math.random() < 0.8) parca(...NOKTA.panel, ...NOKTA.bina, "#E8C43C");
      if (s.satis > tepe * 0.03 && Math.random() < 0.7) parca(...NOKTA.panel, ...NOKTA.direk, "#1F8A5D");
      if (s.alis > tepe * 0.03 && Math.random() < 0.7) parca(...NOKTA.direk, ...NOKTA.bina, "#A5620D");
      if (s.batAksi > 0 && Math.random() < 0.6) parca(...NOKTA.panel, ...NOKTA.bat, "#FFE175");
      if (s.batAksi < 0 && Math.random() < 0.6) parca(...NOKTA.bat, ...NOKTA.bina, "#0A6B5C");
    }

    const cubukKutu = el("cubuklar");
    function cubuklariKur() {
      cubukKutu.innerHTML = "";
      for (let h = 0; h < 24; h++) cubukKutu.insertAdjacentHTML("beforeend",
        `<span><em class="u" id="u${h}"></em><em class="t" id="t${h}"></em></span>`);
    }
    const kw = (v: number) => v.toFixed(1).replace(".", ",") + " kW";
    type Toplam = { uretim: number; oz: number; satis: number; alis: number; batVer: number; kazanc: number };
    function toplamHesap(kadar: number): Toplam {
      const f = fiyatlar(), t: Toplam = { uretim: 0, oz: 0, satis: 0, alis: 0, batVer: 0, kazanc: 0 };
      for (const s of saatler.slice(0, kadar)) {
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
      el("saatPul").textContent = "06:00";
      el("perde").classList.remove("acik");
      (el("baslat") as HTMLButtonElement).disabled = false;
      panelYaz({ u: 0, t: 0, satis: 0, alis: 0, bat: 0 },
        { uretim: 0, oz: 0, satis: 0, alis: 0, batVer: 0, kazanc: 0 });
    }
    function karneGoster() {
      const t = toplamHesap(24), f = (v: number) => Math.round(v).toLocaleString("tr-TR");
      el("karneAlt").textContent =
        `${S.guc} kWp · ${S.il} · ${({ kis: "kış", bahar: "ilkbahar/sonbahar", yaz: "yaz" } as Record<string, string>)[S.mevsim]} günü · ` +
        `${({ acik: "açık", parcali: "ortalama", bulutlu: "bulutlu" } as Record<string, string>)[S.hava]} hava`;
      const pb = panelBilgi();
      const fi = fiyatlar();
      const ozKwh = t.oz + t.batVer;
      const tlB = (v: number) => v.toFixed(2).replace(".", ",");
      const acilim = S.grup === "mesken"
        ? `<tr class="kalem"><td>→ Öz tüketim değeri: ${f(ozKwh)} kWh × ${tlB(fi.alis)} ₺</td><td>${f(ozKwh * fi.alis)} ₺</td></tr>
           <tr class="kalem"><td>→ Aylık mahsuba emanet: ${f(t.satis)} kWh (≈%85 değerle)</td><td>${f(t.satis * fi.alis * 0.85)} ₺</td></tr>`
        : `<tr class="kalem"><td>→ Önlenen fatura: ${f(ozKwh)} kWh × ${tlB(fi.alis)} ₺ (vergili alış)</td><td>${f(ozKwh * fi.alis)} ₺</td></tr>
           <tr class="kalem"><td>→ Satış geliri: ${f(t.satis)} kWh × ${tlB(fi.satis)} ₺ (enerji bedeli)</td><td>${f(t.satis * fi.satis)} ₺</td></tr>`;
      el("karneTablo").innerHTML = `
        <tr><td>Panel</td><td>${pb.adet} adet · ${pb.alan.toLocaleString("tr-TR")} m²</td></tr>
        <tr><td>Günlük üretim</td><td>${f(t.uretim)} kWh</td></tr>
        <tr><td>Öz tüketim</td><td>%${t.uretim ? Math.round((ozKwh / t.uretim) * 100) : 0} · ${f(ozKwh)} kWh</td></tr>
        <tr><td>Şebekeye ${S.grup === "mesken" ? "emanet" : "satış"}</td><td>${f(t.satis)} kWh</td></tr>
        <tr><td>Şebekeden alış</td><td>${f(t.alis)} kWh</td></tr>
        ${S.batarya ? `<tr><td>Bataryadan beslenen</td><td>${f(t.batVer)} kWh</td></tr>
        <tr class="kalem"><td>→ Bataryada kalan (yarına devreder)</td><td>${f(saatler[23].bat)} kWh</td></tr>` : ""}
        ${acilim}
        <tr class="buyuk"><td>Cebinde kalan (bugün)</td><td>+${f(t.kazanc)} ₺</td></tr>`;
      // sistem özeti: yıllık üretim + kb bantlarından tahmini yatırım + kaba geri ödeme
      const yillikUretim = S.guc * ILLER[S.il].verim;
      const seg = S.grup === "mesken" ? "konut" : "ticari";
      const bantlar = MALIYET_BANT[seg as keyof typeof MALIYET_BANT] as ReadonlyArray<readonly [number, number, number]>;
      let alt = bantlar[bantlar.length - 1][1], ust = bantlar[bantlar.length - 1][2];
      for (const [maks, a, u] of bantlar) if (S.guc <= maks) { alt = a; ust = u; break; }
      const yatirimAlt = S.guc * alt, yatirimUst = S.guc * ust;
      const ozOran = t.uretim ? ozKwh / t.uretim : 0.7;
      const yillikDeger = yillikUretim * (ozOran * fi.alis + (1 - ozOran) * fi.satis);
      const binf = (v: number) => v >= 1_000_000
        ? (v / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " M₺"
        : Math.round(v / 1000).toLocaleString("tr-TR") + " bin ₺";
      el("sistemOzet").innerHTML = `
        <h3>Bu sistem gerçekte ne eder?</h3>
        <div><span>Yıllık üretim tahmini</span><b>≈ ${f(yillikUretim)} kWh</b></div>
        <div><span>Tahmini kurulum maliyeti</span><b>${binf(yatirimAlt)} – ${binf(yatirimUst)}</b></div>
        <div><span>Kaba geri ödeme</span><b>≈ ${(yatirimAlt / yillikDeger).toFixed(1).replace(".", ",")} – ${(yatirimUst / yillikDeger).toFixed(1).replace(".", ",")} yıl</b></div>`;
      el("perde").classList.add("acik");
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
    el("tekrar").onclick = sifirla;
    const gucDegistir = (fark: number) => {
      S.guc = Math.min(250, Math.max(5, S.guc + fark));
      const g = el("guc") as HTMLInputElement;
      g.value = String(S.guc); el("gucCikti").textContent = S.guc + " kWp";
      sahneKur(); sifirla();
    };
    el("panelArti").onclick = () => gucDegistir(5);
    el("panelEksi").onclick = () => gucDegistir(-5);
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
              <input type="range" id="guc" min={5} max={250} step={5} defaultValue={50} />
              <output id="gucCikti">50 kWp</output></div>
            <small className="panel-sayi" id="panelSayi"></small></div>
          <div className="grup"><span>İl</span><select id="il" aria-label="İl"></select></div>
        </div>

        <button className="gelismis-ac" id="gelismisAc" aria-expanded="false" type="button">Gelişmiş ayarlar</button>
        <div className="gelismis" id="gelismis">
          <div className="grup"><span>Bağlantı
            <button className="terim" data-tip="AG (alçak gerilim): evler ve küçük işletmelerin standart bağlantısı. OG (orta gerilim): trafolu büyük tesisler — birim fiyatı biraz daha düşüktür." aria-label="AG OG nedir" type="button">?</button></span>
            <div className="cipler" data-ad="gerilim">
              <button className="cip on" data-deger="AG" type="button">AG</button>
              <button className="cip" data-deger="OG" type="button">OG</button></div></div>
          <div className="grup"><span>Gün Koşulu</span>
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
            <div className="kaydirici"><input type="range" id="tuketim" min={500} max={60000} step={500} defaultValue={9000} />
              <output id="tukCikti">9.000 kWh/ay</output></div>
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
            <g id="bina">
              <path d="M300 330 L470 250 L640 330 L470 410 Z" fill="#EDEFE9" />
              <path d="M300 330 L300 390 L470 470 L470 410 Z" fill="#D8DCD3" />
              <path d="M640 330 L640 390 L470 470 L470 410 Z" fill="#C7CCC1" />
              <path d="M330 316 L470 250 L610 316 L470 382 Z" fill="#00544E" />
              <g id="panelIzgara"></g>
              <path d="M395 430 L395 462 L445 486 L445 452 Z" fill="#004540" />
              <g id="pencereler" fill="#FFE175" opacity="0">
                <path d="M330 358 L356 370 L356 392 L330 380 Z" /><path d="M560 380 L586 368 L586 392 L560 404 Z" />
              </g>
              <text x="470" y="500" textAnchor="middle" fontSize="13" fill="#5E6660" fontWeight="600" id="binaEtiket">Ticarethane</text>
            </g>
            <g id="arazi" opacity="0"><g id="araziIzgara"></g></g>
            <g id="batKutu" transform="translate(212 342)" opacity="0">
              <path d="M0 18 L34 2 L68 18 L34 34 Z" fill="#0A6B5C" />
              <path d="M0 18 L0 52 L34 68 L34 34 Z" fill="#08574B" />
              <path d="M68 18 L68 52 L34 68 L34 34 Z" fill="#063F37" />
              <rect id="batSeviye" x="8" y="40" width="0" height="8" rx="3" transform="skewY(24)" fill="#FFE175" />
              <text x="34" y="88" textAnchor="middle" fontSize="12" fill="#5E6660" fontWeight="600">Batarya</text>
            </g>
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
          <div className="perde" id="perde">
            <div className="karne">
              <h2>Gün Sonu Karnesi</h2>
              <div className="alt" id="karneAlt"></div>
              <table id="karneTablo"></table>
              <div className="sistem" id="sistemOzet"></div>
              <div className="karne-cta">
                <a className="gt-btn small line" href="/hesaplama">Detaylı Hesap</a>
                <button className="gt-btn small" id="tekrar" type="button">Yeniden Oyna</button>
              </div>
            </div>
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
    </div>
  );
}
