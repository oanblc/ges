/**
 * Bilgi tabanı verileri — kaynak: ~/Developer/gesdanismani/kb/
 * Sitede gösterilen hiçbir rakam koda gömülmez. Piyasa verisi
 * data/piyasa-canli.json'dan gelir; o dosyayı yalnız ajan/epias_veri.py yazar
 * (tek yazar ilkesi — elle düzenleme yok). Tarife sabitleri kb/tarifeler.md
 * ve ajan/asistan.py EPDK_* sözlükleriyle birebir senkron tutulur
 * (bekçi: ajan/test_hesap.py parite testleri).
 */
import canli from "./piyasa-canli.json";

export const META = {
  tarifeGecerlilik: "4 Nisan 2026", // EPDK resmi tarife tablosu
  kbGuncelleme: "7 Ağustos 2026",
  piyasaKaynak: "EPİAŞ Şeffaflık Platformu",
  piyasaCekimZamani: canli.cekim_zamani,
};

/** EPDK 4 Nisan 2026 tarife tablosu — kr/kWh, vergiler HARİÇ */
export const TARIFE = {
  mesken: {
    enerjiK1: 49.4065, // ≤240 kWh/ay (destekli)
    enerjiK2: 189.5808, // >240 kWh/ay
    dagitim: 242.49,
    kademeEsigiAylikKwh: 240,
    btv: 0.05,
    kdv: 0.10,
  },
  ticarethane: {
    enerjiK1: 287.3087,
    enerjiK2: 345.4688,
    dagitim: 247.9368,
    btv: 0.05,
    kdv: 0.20,
  },
  sanayiAG: { enerji: 298.5253, dagitim: 182.9503, btv: 0.01, kdv: 0.20 },
  // OG grupları — ajan/asistan.py EPDK_DAGITIM/EPDK_ENERJI ile birebir
  sanayiOG: { enerji: 290.9687, dagitimTek: 118.2457, dagitimCift: 107.0498, btv: 0.01, kdv: 0.20 },
  ticarethaneOG: { enerjiK1: 287.3087, dagitimTek: 208.1065, dagitimCift: 166.8345, btv: 0.05, kdv: 0.20 },
  tarimsalAG: { enerji: 233.3838, dagitim: 203.7247, kdv: 0.10 }, // KDV meskenle aynı indirimli oran; BTV muafiyeti teyit bekliyor
  fon: 0.01, // Enerji Fonu, enerji bedeli üzerinden
};

export const LIMITLER = {
  meskenKw: 25, // konut çatısı üst sınırı
  isletmeKw: 5000, // lisanssız öz tüketim pratik sınırı
  bedelliUretimCarpani: 2, // yıllık tüketimin 2 katını aşan üretim bedelsiz
  skttMeskenKwhYil: 4000, // üzeri mesken destekli tarifeden çıkar
};

/** Anahtar teslim maliyet kademeleri [maksKw, ₺/kW] — 2026 piyasa araştırması */
/** Segment + güce göre bant orta noktası (₺/kW) — MALIYET_BANT tek doğruluk kaynağıdır. */
export function bantOrtaMaliyet(segment: "konut" | "ticari", kw: number): number {
  const b = MALIYET_BANT[segment];
  for (const [maks, alt, ust] of b) if (kw <= maks) return (alt + ust) / 2;
  const son = b[b.length - 1];
  return (son[1] + son[2]) / 2;
}

/**
 * Kurulum maliyeti aracı — piyasa bantları [maksKw, alt ₺/kW, üst ₺/kW].
 * Kaynak: kb/taslak/2026-08-08-maliyet-arastirmasi.md (Azimut Nis-May 2026 EPC,
 * Türkiye Solar Market 2026, saha teklifi). Konut bandı KDV dahil piyasa,
 * ticari bant KDV hariç EPC fiyatıdır.
 */
export const MALIYET_BANT = {
  konut: [
    [4, 26000, 40000],
    [7, 24000, 36000],
    [25, 20000, 32000],
  ] as Array<[number, number, number]>,
  ticari: [
    [50, 32000, 42000],
    [100, 27000, 36000],
    [250, 22000, 28000],
    [500, 22000, 27500],
    [Infinity, 20000, 25500],
  ] as Array<[number, number, number]>,
};

/** Çatı tipine göre montaj çarpanı (kanca/balast işçilik farkı) */
export const CATI_CARPANI = { trapez: 1.0, teras: 1.04, kiremit: 1.06 } as const;

/** Maliyet kalemi dağılımı (%) — iki bağımsız 2026 kaynağının ortak bandından */
export const MALIYET_KALEMLERI: Array<[string, number]> = [
  ["Güneş panelleri", 38],
  ["İnverter", 15],
  ["Konstrüksiyon", 12],
  ["Montaj ve işçilik", 13],
  ["Kablo ve elektrik", 9],
  ["Proje, izin, devreye alma", 7],
  ["Nakliye ve diğer", 6],
];

/**
 * Malzeme listesi üretimi — kb/ekipman-fiyatlar.md (Ağustos 2026).
 * Kalem payları sektör kırılımından; panel/inverter spesifikasyonları 2026 standardı.
 */
export const EKIPMAN = {
  panelWp: 580,          // 2026 standardı N-Type TOPCon tipik güç
  panelM2: 2.4,          // panel başına çatı alanı (m²)
  dcAcOran: 1.2,         // önerilen DC/AC oranı
  inverterBoylari: [5, 6, 8, 10, 15, 20, 25, 30, 50, 60, 75, 100, 110],
};

/** Ev tipi LFP batarya, kurulum hariç liste fiyatı (5 kWh ≈ 113.000 ₺, 2026) */
export const BATARYA_TL_KWH = 22600;

/**
 * Türkiye ortalama mesken (hane) elektrik tüketimi, kWh/yıl.
 * Hesap: EPDK 2024 mesken toplam tüketimi 75,091 milyar kWh ÷ TÜİK 2024 aile
 * sayısı 26.599.261 ≈ 2.824 kWh/yıl. Kaynak kaydı: kb/tarifeler.md
 * "Hane eşdeğeri katsayısı" bölümü (web teyidi 11 Ağustos 2026).
 * Kullanım: "X kWh ≈ Y hanenin yıllık tüketimi" çevirileri.
 */
export const HANE_YILLIK_KWH = 2824;

/** EPİAŞ gerçekleşen veriler — data/piyasa-canli.json'dan (cron her gün tazeler) */
export const PIYASA = {
  ay: canli.site_ozet.ay, // örn. "2026-07" (son tam ay)
  ptfOrtalama: canli.site_ozet.ptfOrtalama, // ₺/MWh
  ptfGunesSaatleri: canli.site_ozet.ptfGunesSaatleri, // 10:00-17:00 ortalaması
  gunesOrani: canli.site_ozet.gunesOrani, // duck curve düzeltme katsayısı
  yekdemGerceklesenSon: canli.site_ozet.yekdemGerceklesenSon ?? 1083.63, // ₺/MWh
  yekdemAyi: canli.site_ozet.yekdemAyi ?? "2026-06",
};

/** İl bazlı özgül üretim (kWh/kW·yıl) — PVGIS v5.2, 2016-2020 ortalaması (pvgis.json ile aynı kaynak) */
export const ILLER: Array<[string, number]> = [
  ["Adana", 1557], ["Adıyaman", 1571], ["Afyonkarahisar", 1481], ["Aksaray", 1581],
  ["Amasya", 1362], ["Ankara", 1491], ["Antalya", 1615], ["Ardahan", 1267],
  ["Artvin", 1291], ["Aydın", 1591], ["Ağrı", 1383], ["Balıkesir", 1441],
  ["Bartın", 1330], ["Batman", 1502], ["Bayburt", 1407], ["Bilecik", 1378],
  ["Bingöl", 1454], ["Bitlis", 1437], ["Bolu", 1295], ["Burdur", 1612],
  ["Bursa", 1337], ["Denizli", 1529], ["Diyarbakır", 1508], ["Düzce", 1211],
  ["Edirne", 1401], ["Elazığ", 1516], ["Erzincan", 1461], ["Erzurum", 1372],
  ["Eskişehir", 1457], ["Gaziantep", 1585], ["Giresun", 1068], ["Gümüşhane", 1341],
  ["Hakkari", 1514], ["Hatay", 1567], ["Isparta", 1530], ["Iğdır", 1392],
  ["Kahramanmaraş", 1556], ["Karabük", 1347], ["Karaman", 1587], ["Kars", 1313],
  ["Kastamonu", 1334], ["Kayseri", 1480], ["Kilis", 1580], ["Kocaeli", 1256],
  ["Konya", 1574], ["Kütahya", 1426], ["Kırklareli", 1409], ["Kırıkkale", 1509],
  ["Kırşehir", 1540], ["Malatya", 1484], ["Manisa", 1437], ["Mardin", 1559],
  ["Mersin", 1586], ["Muğla", 1589], ["Muş", 1345], ["Nevşehir", 1480],
  ["Niğde", 1612], ["Ordu", 1147], ["Osmaniye", 1446], ["Rize", 1033],
  ["Sakarya", 1252], ["Samsun", 1204], ["Siirt", 1507], ["Sinop", 1291],
  ["Sivas", 1447], ["Tekirdağ", 1355], ["Tokat", 1337], ["Trabzon", 1078],
  ["Tunceli", 1504], ["Uşak", 1563], ["Van", 1523], ["Yalova", 1330],
  ["Yozgat", 1462], ["Zonguldak", 1306], ["Çanakkale", 1537], ["Çankırı", 1452],
  ["Çorum", 1412], ["İstanbul", 1375], ["İzmir", 1592], ["Şanlıurfa", 1583],
  ["Şırnak", 1501],
];
