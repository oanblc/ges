/**
 * Bilgi tabanı verileri — kaynak: ~/Developer/gesdanismani/kb/
 * Sitede gösterilen hiçbir rakam koda gömülmez; bu dosya kb'nin derleme
 * zamanı yansımasıdır. Rakam güncellemesi = kb güncellemesi + bu dosyanın
 * yeniden üretimi (ileride otomatik export'a bağlanacak).
 */

export const META = {
  tarifeGecerlilik: "4 Nisan 2026", // EPDK resmi tarife tablosu
  kbGuncelleme: "6 Ağustos 2026",
  piyasaKaynak: "EPİAŞ Şeffaflık (gerçekleşen veri, otomatik çekim)",
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
  fon: 0.01, // Enerji Fonu, enerji bedeli üzerinden
};

export const LIMITLER = {
  meskenKw: 25, // konut çatısı üst sınırı
  isletmeKw: 5000, // lisanssız öz tüketim pratik sınırı
  bedelliUretimCarpani: 2, // yıllık tüketimin 2 katını aşan üretim bedelsiz
  skttMeskenKwhYil: 4000, // üzeri mesken destekli tarifeden çıkar
};

/** Anahtar teslim maliyet kademeleri [maksKw, ₺/kW] — 2026 piyasa araştırması */
export const MALIYET_KADEMELERI: Array<[number, number]> = [
  [10, 38000],
  [100, 31500],
  [1000, 25500],
  [Infinity, 22500],
];

/** EPİAŞ gerçekleşen veriler (kb/veri/piyasa-canli.json — günlük cron) */
export const PIYASA = {
  ptfOrtalama: 2700, // ₺/MWh, Temmuz 2026 (son tam ay)
  ptfGunesSaatleri: 1770, // 10:00-17:00 ortalaması
  gunesOrani: 0.66, // duck curve düzeltme katsayısı
  yekdemGerceklesenSon: 1083.63, // ₺/MWh, Haziran 2026
};

/** İl bazlı özgül üretim (kWh/kW·yıl) — GEPA bölge ortalamalarından */
export const ILLER: Array<[string, number]> = [
  ["Adana", 1580], ["Adıyaman", 1600], ["Afyonkarahisar", 1520], ["Ağrı", 1500],
  ["Aksaray", 1520], ["Amasya", 1300], ["Ankara", 1450], ["Antalya", 1600],
  ["Ardahan", 1400], ["Artvin", 1150], ["Aydın", 1520], ["Balıkesir", 1380],
  ["Bartın", 1200], ["Batman", 1600], ["Bayburt", 1400], ["Bilecik", 1350],
  ["Bingöl", 1480], ["Bitlis", 1500], ["Bolu", 1250], ["Burdur", 1560],
  ["Bursa", 1350], ["Çanakkale", 1400], ["Çankırı", 1400], ["Çorum", 1350],
  ["Denizli", 1520], ["Diyarbakır", 1600], ["Düzce", 1200], ["Edirne", 1350],
  ["Elazığ", 1520], ["Erzincan", 1450], ["Erzurum", 1450], ["Eskişehir", 1450],
  ["Gaziantep", 1580], ["Giresun", 1150], ["Gümüşhane", 1350], ["Hakkari", 1550],
  ["Hatay", 1500], ["Iğdır", 1500], ["Isparta", 1550], ["İstanbul", 1300],
  ["İzmir", 1500], ["Kahramanmaraş", 1550], ["Karabük", 1250], ["Karaman", 1560],
  ["Kars", 1450], ["Kastamonu", 1250], ["Kayseri", 1500], ["Kilis", 1600],
  ["Kırıkkale", 1450], ["Kırklareli", 1330], ["Kırşehir", 1480], ["Kocaeli", 1280],
  ["Konya", 1550], ["Kütahya", 1450], ["Malatya", 1550], ["Manisa", 1480],
  ["Mardin", 1620], ["Mersin", 1600], ["Muğla", 1550], ["Muş", 1480],
  ["Nevşehir", 1500], ["Niğde", 1550], ["Ordu", 1150], ["Osmaniye", 1550],
  ["Rize", 1100], ["Sakarya", 1250], ["Samsun", 1200], ["Siirt", 1600],
  ["Sinop", 1250], ["Sivas", 1450], ["Şanlıurfa", 1650], ["Şırnak", 1600],
  ["Tekirdağ", 1330], ["Tokat", 1350], ["Trabzon", 1150], ["Tunceli", 1500],
  ["Uşak", 1480], ["Van", 1600], ["Yalova", 1300], ["Yozgat", 1450],
  ["Zonguldak", 1200],
];
