/**
 * Sistem türleri — boyutlandırma kuralları ve fiyat bantları (off-grid, tarımsal
 * sulama, araç şarj istasyonu, ısı pompası eki).
 * Kaynak: kb/sistem-turleri-fiyatlar.md (Ağustos 2026 piyasa taraması, son kontrol
 * 10 Ağu 2026). Kb'de "TEYİT BEKLİYOR" işaretli kalemlerin burada SABİTİ YOKTUR —
 * UI bu kalemler için "fiyat teklifle netleşir" gösterir. 3 ayda bir kb ile güncelle.
 */

export const SISTEM_KAYNAK_NOT =
  "Fiyat bantları Ağustos 2026 piyasa taraması — kaynak: bilgi tabanı.";

/* ---------- Off-grid (bataryalı bağımsız) ---------- */
export const OFFGRID = {
  dod: 0.8, // LiFePO4 kullanılabilir kapasite (DoD) — kb §2, 10 Ağu 2026
  kisPsh: 2.5, // kış tepe güneş saati (boyutlandırıcı mevsim) — kb/teknik-ozel-uygulamalar.md örneği, 10 Ağu 2026
  sistemVerim: 0.75, // panel→batarya→yük zinciri kaybı — kb §2 formülü
  /** Hazır paket bantları [batarya kWh tavanı, alt ₺, üst ₺] — SolarDepo/Power Enerji ilanları, Ağu 2026 (KDV durumu ilanlarda belirsiz) */
  paketBant: [
    [3, 55000, 72000], // küçük bağ evi: 2-3 panel + 2-3 kWh akü
    [6, 60000, 125000], // tiny house/konteyner: 3-4 panel + ~5 kWh LFP + 3-6 kW inverter
    [10, 178000, 225000], // yayla/müstakil ev (klima dahil): ~4-5 kWp + 5-10 kWh LFP
  ] as Array<[number, number, number]>,
  // 10 kWh üzeri hazır paket kb'de TEYİT BEKLİYOR → sabit yok; kb'nin önerdiği modüler yol:
  lfpTlKwh: [7800, 12000] as const, // modüler LFP ₺/kWh — kb/ekipman-fiyatlar.md, Ağu 2026
  hibritInverter10kwTl: [65000, 90000] as const, // 10 kW hibrit inverter — kb/ekipman-fiyatlar.md, Ağu 2026
  /** Senaryo örnekleri (kb §2 tablosu + örnek hesap) */
  senaryolar: [
    "Bağ evi (2,5 kWh/gün, 2 gün otonomi): ≈ 6,25 kWh batarya + 1,4 kWp panel + 2,4-3 kVA inverter — paket 55-72 bin ₺",
    "Tiny house / konteyner: 3-4 panel + ~5 kWh LFP + 3-6 kW inverter — 60-125 bin ₺",
    "Yayla / müstakil ev (klima dahil): ~4-5 kWp + 5-10 kWh LFP — 178-225 bin ₺",
  ],
};

/* ---------- Tarımsal sulama (solar pompaj) ---------- */
export const SULAMA = {
  hpSecenekleri: [5.5, 7.5, 10, 15, 20, 30] as const,
  kwpCarpani: [1.3, 1.5] as const, // panel kWp ≈ HP × 1,3-1,5 — kb §1 (Power Enerji kuralı), 10 Ağu 2026
  tlKwp: [17000, 20000] as const, // anahtar teslim ₺/kWp — kb §1 editör hesabı (7,5 HP örneğinden), Ağu 2026
  // 40+ HP (30+ kW) perakende fiyat İLAN EDİLMİYOR (kb'de TEYİT BEKLİYOR) → sabit yok, teklifle netleşir.
  geriOdemeYil: [2.5, 5] as const, // mazot/şebeke alternatifine göre — kb §1
  /** Hibe/kredi notları — kb §1, 10 Ağu 2026 (çağrı koşulları duyurudan teyit edilmeli) */
  hibeNotlari: [
    "KKYDP: yatırımın %50'si hibe (KDV hariç; üst limit çağrı metninden teyit edilmeli).",
    "IPARD 3 (TKDK): %60-75 hibe (genç çiftçi/organik ve yenilenebilir harcamasına ek puanlar); PV üst sınırı 300 kWe.",
    "Ziraat Bankası sübvansiyonlu tarım kredisi (5 yıla varan vade) sulama GES'te kullanılabiliyor.",
  ],
};

/* ---------- Araç şarj istasyonu ---------- */
export type SarjTipi = "ac7" | "ac22" | "dc60" | "dc120";
export const SARJ_CIHAZ: Record<
  SarjTipi,
  { ad: string; kw: number; bant: [number, number]; not?: string }
> = {
  // AC 7-22 kW cihaz bandı 15-40 bin ₺ (KDV dahil perakende) — kb §3: 11 kW ~17,8 bin (Tunçmatik), 22 kW ~25 bin (Vestel), Ağu 2026
  ac7: { ad: "AC 7,4 kW", kw: 7.4, bant: [15000, 25000] },
  ac22: { ad: "AC 22 kW", kw: 22, bant: [20000, 40000] },
  // DC 60 kW: cihaz ~$15 bin (osarj.com.tr, Ağu 2026); kurulum dahil bant kb'nin 80 kW referansından (600-900 bin ₺) ölçekli editör hesabı
  dc60: {
    ad: "DC 60 kW", kw: 60, bant: [500000, 800000],
    not: "Trafo/elektrik altyapısı en büyük ek kalem olabilir; kesin fiyat teklifle netleşir.",
  },
  // DC 120 kW kurulum dahil 750 bin - 1,15 M₺ — kb §3 (osarj.com.tr), Ağu 2026
  dc120: {
    ad: "DC 120 kW", kw: 120, bant: [750000, 1150000],
    not: "Trafo/elektrik altyapısı en büyük ek kalem olabilir; kesin fiyat teklifle netleşir.",
  },
};
/** Carport konstrüksiyon primi: çatı GES ₺/kWp bandına ×1,3-1,5 (çelik payı) — kb §3 kuralı; ₺/m² ilan edilmiyor → kalan fark teklifle netleşir */
export const CARPORT_PRIM = [1.3, 1.5] as const;
/** EPDK şarj mevzuatı kısa notu — kb §3 (RG 2.4.2022/31797 + 23.3.2026/33202), 10 Ağu 2026 */
export const SARJ_LISANS_NOTU =
  "Halka açık/ticari şarj hizmeti için şarj ağı işletmeci lisansı ya da lisanslı ağdan sertifika gerekir " +
  "(lisanslı ağ asgari eşiği: 6 ayda 50 ünite + 5 farklı ilçe). Kendi filonuz/personeliniz için halka açık " +
  "olmayan şarjda lisans gerekmez.";

/* ---------- Isı pompası eki (on-grid'e ilave) ---------- */
export const ISI_POMPASI = {
  /** TS 825 iklim bölgeleri — yıllık ısı ihtiyacı kWh/m²·yıl [alt, üst]. EDİTÖR KATSAYISI (kaba tahmin; proje hesabı şart) — kb §4, 10 Ağu 2026 */
  bolgeler: [
    ["1. bölge — Akdeniz / Ege kıyısı", 40, 70],
    ["2. bölge — Marmara / Güneydoğu", 70, 100],
    ["3. bölge — İç Anadolu", 100, 140],
    ["4. bölge — Doğu Anadolu", 140, 200],
  ] as Array<[string, number, number]>,
  scop: 3.5, // mevsimsel COP varsayımı (3,5-4,0; premium 4,5-5,0) — kb §4
  kwpBasinaKwhYil: 1250, // 1 kWp ≈ 1.100-1.400 kWh/yıl TR ortalaması — kb §4
  cihazBant: [85000, 210000] as const, // 8 kW monoblok ~85 bin; 10-16 kW yerli markalar 130-210 bin ₺ (KDV dahil) — Piagrid Mart 2026 derlemesi; premium (Vaillant/Daikin/Bosch) 345 bine kadar
  montajBant: [20000, 80000] as const, // montaj+tesisat+buffer+termostat — kb §4, Ağu 2026
};
