/**
 * Deterministik GES fizibilite motoru.
 *
 * Model, kb araştırma bulgularına dayanır:
 * - Mesken: AYLIK mahsuplaşma sürer (saatlik mahsuptan muaf, RG 02.04.2026).
 *   Kademeli tarife: tasarruf önce pahalı kademeden (marjinal fiyat) düşer.
 *   Fazla üretim, mesken tek zamanlı aktif ENERJİ bedelinden satılır (vergisiz,
 *   50 kW altı GVK md.9 muafiyeti).
 * - İşletme: SAATLİK mahsuplaşma → öz tüketim oranı ana sürücü. Anlık öz
 *   tüketim tam perakende fiyattan (enerji+dağıtım+vergiler) tasarruf sağlar;
 *   satış yalnız çıplak enerji bedelinden değerlenir.
 * - Yıllık üretimin, tüketimin 2 katını aşan kısmı bedelsiz (YEKDEM'e devir).
 */

import { TARIFE, LIMITLER, MALIYET_KADEMELERI } from "@/data/kb";

const krToTl = (kr: number) => kr / 100;

/** (Enerji×(1+fon+BTV) + Dağıtım) × (1+KDV) → ₺/kWh, vergiler dahil */
function nihaiFiyat(enerjiKr: number, dagitimKr: number, btv: number, kdv: number): number {
  return (krToTl(enerjiKr) * (1 + TARIFE.fon + btv) + krToTl(dagitimKr)) * (1 + kdv);
}

export const FIYATLAR = {
  meskenK1: nihaiFiyat(TARIFE.mesken.enerjiK1, TARIFE.mesken.dagitim, TARIFE.mesken.btv, TARIFE.mesken.kdv),
  meskenK2: nihaiFiyat(TARIFE.mesken.enerjiK2, TARIFE.mesken.dagitim, TARIFE.mesken.btv, TARIFE.mesken.kdv),
  ticarethane: nihaiFiyat(TARIFE.ticarethane.enerjiK1, TARIFE.ticarethane.dagitim, TARIFE.ticarethane.btv, TARIFE.ticarethane.kdv),
  meskenSatis: krToTl(TARIFE.mesken.enerjiK2), // fazla üretim: çıplak enerji bedeli
  ticarethaneSatis: krToTl(TARIFE.ticarethane.enerjiK1),
};

function birimMaliyet(kw: number): number {
  for (const [maksKw, tl] of MALIYET_KADEMELERI) if (kw <= maksKw) return tl;
  return MALIYET_KADEMELERI[MALIYET_KADEMELERI.length - 1][1];
}

export interface HesapSonuc {
  kw: number;
  yillikUretimKwh: number;
  yillikTuketimKwh: number;
  maliyet: number;
  yillikDeger: number;
  geriOdemeYil: number;
  /** Mahsup/öz tüketimle değerlenen enerji (kWh/yıl) */
  ozKwh: number;
  /** Şebekeye bedelli satılan enerji (kWh/yıl) ve geliri (₺/yıl) */
  satisKwh: number;
  satisGeliri: number;
  notlar: string[];
}

/** Konut: aylık fatura (₺, vergiler dahil) → fizibilite */
export function konutHesap(aylikFatura: number, ilVerimi: number, aylikKwhGirdi?: number): HesapSonuc {
  const esik = TARIFE.mesken.kademeEsigiAylikKwh; // 240 kWh/ay
  const esikFatura = esik * FIYATLAR.meskenK1;
  const aylikKwh =
    aylikKwhGirdi && aylikKwhGirdi > 0
      ? aylikKwhGirdi
      : aylikFatura <= esikFatura
        ? aylikFatura / FIYATLAR.meskenK1
        : esik + (aylikFatura - esikFatura) / FIYATLAR.meskenK2;
  const yillikKwh = aylikKwh * 12;

  const kw = Math.min(LIMITLER.meskenKw, Math.max(2, yillikKwh / ilVerimi));
  const uretim = kw * ilVerimi;

  // Aylık mahsup: mahsuplaşan enerji tam perakende fiyattan, pahalı kademeden başlayarak
  const mahsup = Math.min(uretim, yillikKwh);
  const yillikK2 = Math.max(0, yillikKwh - esik * 12);
  const k2den = Math.min(mahsup, yillikK2);
  const k1den = mahsup - k2den;
  const mahsupDegeri = k2den * FIYATLAR.meskenK2 + k1den * FIYATLAR.meskenK1;

  // Fazla üretim: çıplak enerji bedelinden satış; 2× tüketim tavanı; GVK muafiyeti (vergisiz)
  const fazla = Math.max(0, uretim - yillikKwh);
  const bedelliFazla = Math.min(fazla, LIMITLER.bedelliUretimCarpani * yillikKwh - mahsup);
  const satisGeliri = Math.max(0, bedelliFazla) * FIYATLAR.meskenSatis;

  const yillikDeger = mahsupDegeri + satisGeliri;
  const maliyet = kw * birimMaliyet(kw);

  const notlar = [
    "Konutlar saatlik mahsuplaşmadan muaftır; hesap aylık mahsuplaşma esasıyla yapılmıştır.",
  ];
  if (yillikKwh > LIMITLER.skttMeskenKwhYil)
    notlar.push(
      `Yıllık tüketiminiz ${LIMITLER.skttMeskenKwhYil.toLocaleString("tr-TR")} kWh üzerinde: destekli tarife kapsamı dışındasınız; GES şebeke çekişinizi bu sınırın altına indirirse ek avantaj sağlar (hesaba katılmadı).`
    );

  return {
    kw: Math.round(kw * 10) / 10,
    yillikUretimKwh: Math.round(uretim),
    yillikTuketimKwh: Math.round(yillikKwh),
    maliyet,
    yillikDeger,
    geriOdemeYil: maliyet / yillikDeger,
    ozKwh: Math.round(mahsup),
    satisKwh: Math.round(Math.max(0, bedelliFazla)),
    satisGeliri,
    notlar,
  };
}

/** İşletme (ticarethane AG varsayılan): saatlik mahsuplaşma modeli */
export function isletmeHesap(
  aylikFatura: number,
  ilVerimi: number,
  ozTuketimOrani: number,
  aylikKwhGirdi?: number
): HesapSonuc {
  const birim = FIYATLAR.ticarethane;
  const yillikKwh =
    aylikKwhGirdi && aylikKwhGirdi > 0 ? aylikKwhGirdi * 12 : (aylikFatura / birim) * 12;

  const kw = Math.min(LIMITLER.isletmeKw, Math.max(2, yillikKwh / ilVerimi));
  const uretim = kw * ilVerimi;

  // Saatlik mahsup: anlık öz tüketim tam perakende fiyattan tasarruf
  const ozKwh = Math.min(uretim * ozTuketimOrani, yillikKwh);
  const ozDeger = ozKwh * birim;

  // Kalan üretim satılır: çıplak enerji bedeli; 2× tüketim tavanı
  const satisKwh = Math.min(
    uretim - ozKwh,
    Math.max(0, LIMITLER.bedelliUretimCarpani * yillikKwh - ozKwh)
  );
  const satisGeliri = Math.max(0, satisKwh) * FIYATLAR.ticarethaneSatis;

  const yillikDeger = ozDeger + satisGeliri;
  const maliyet = kw * birimMaliyet(kw);

  return {
    kw: kw >= 100 ? Math.round(kw) : Math.round(kw * 10) / 10,
    yillikUretimKwh: Math.round(uretim),
    yillikTuketimKwh: Math.round(yillikKwh),
    maliyet,
    yillikDeger,
    geriOdemeYil: maliyet / yillikDeger,
    ozKwh: Math.round(ozKwh),
    satisKwh: Math.round(Math.max(0, satisKwh)),
    satisGeliri,
    notlar: [
      "1 Mayıs 2026'dan itibaren işletmeler saatlik mahsuplaşmaya tabidir; öz tüketim oranı sonucu belirler.",
      "İkili anlaşmanız varsa enerji bileşeniniz farklıdır — kesin analiz için asistana sözleşme fiyatınızı iletin.",
    ],
  };
}
