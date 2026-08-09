import sss from "./sss.json";
import destekler from "./destekler.json";

/** Site içi arama dizini: sayfalar + SSS + destekler + blog tek listede toplanır. */

export type AramaKaydi = {
  baslik: string;
  ozet: string;
  yol: string;
  tur: "sayfa" | "sss" | "destek" | "blog";
  etiket: string; // sonuç kartında görünen tür adı
};

const SAYFALAR: Array<[string, string, string]> = [
  ["/asistan", "GES Asistanı", "Güncel mevzuatla soru-cevap; fatura fotoğrafı yükleyip birlikte inceleyin. EPDK ve EPİAŞ kaynaklı bilgi tabanı."],
  ["/simulasyon", "Güneş Sahası Simülasyonu", "Çatı veya arazi GES'inizi kurun, gerçek il verisiyle üretimi izleyin; günlük, aylık, yıllık karne ve PDF rapor. Panel, batarya, mahsuplaşma, uydu çizimi."],
  ["/hesaplama", "Hesaplama Araçları", "Kurulum maliyeti, geri ödeme süresi (amortisman) ve batarya boyutlandırma hesaplayıcıları."],
  ["/fatura-analizi", "Fatura Analizi", "Elektrik faturanızı yükleyin; tüketiminize uygun GES planı ve tasarruf tahmini çıkarılır."],
  ["/teklif-analizi", "Teklif Değerlendirme", "Elinizdeki GES teklifini yükleyin; fiyat, ekipman ve kapsam piyasa bantlarıyla karşılaştırılır."],
  ["/police-analizi", "Sigorta Poliçesi Analizi", "GES sigorta poliçenizi yükleyin; teminatlar, muafiyetler ve eksik kalan riskler değerlendirilir."],
  ["/surec", "Kurulum Süreci", "Başvurudan üretime yedi aşama: çağrı mektubu, proje onayı, geçici kabul, çift yönlü sayaç. Gerekli belgeler ve süreler."],
  ["/rehber", "Bilgi Kütüphanesi", "Tarifeler, batarya, panel tipleri, yaygın yanlışlar; GES'e dair merak edilen konular tek sayfada."],
  ["/kurulum-sonrasi", "Kurulum Sonrası", "Fatura kontrolü, bakım takvimi, arıza ve garanti süreçleri; ilk fatura nasıl okunur."],
  ["/sss", "Sık Sorulan Sorular", "Mahsuplaşma, maliyet, izinler, apartman ve batarya dahil 8 kategoride derlenmiş sorular."],
  ["/destekler", "Destekler", "Devlet ve banka GES destekleri: KOSGEB, TKDK, kredi ve hibe programlarının güncel durumu."],
  ["/mevzuat", "Mevzuat", "GES'i etkileyen kanun, yönetmelik ve kurul kararları; Lisanssız Elektrik Üretim Yönetmeliği ve saatlik mahsuplaşma kararları."],
  ["/blog", "Blog", "GES ekonomisi ve mevzuatı üzerine derinlemesine yazılar."],
];

const BLOGLAR: Array<[string, string, string]> = [
  ["/blog/arazi-ges-mi-cati-ges-mi", "Arazi GES mi, Çatı GES mi?", "Kurulum maliyeti, izin süreci, verim ve geri ödeme farkları; tablolar ve karar rehberi."],
  ["/blog/saatlik-mahsuplasma-rehberi", "Saatlik Mahsuplaşma Adım Adım", "1 Mayıs 2026 sonrası GES ekonomisi: saatlik mahsup nasıl işler, PTF ve YEKDEM etkisi."],
  ["/blog/faturadaki-devlet-destegi", "Faturadaki 'Devlet Desteği' Nedir?", "Faturadaki destek satırının kaynağı ve neden her yıl azaldığı."],
];

export function aramaDizini(): AramaKaydi[] {
  const kayitlar: AramaKaydi[] = [];
  for (const [yol, baslik, ozet] of SAYFALAR)
    kayitlar.push({ yol, baslik, ozet, tur: "sayfa", etiket: "Sayfa" });
  for (const [yol, baslik, ozet] of BLOGLAR)
    kayitlar.push({ yol, baslik, ozet, tur: "blog", etiket: "Blog" });
  // /sss sayfasındaki çapa kimlikleriyle birebir aynı türetme
  const kimlik = (metin: string) =>
    metin.toLowerCase()
      .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
      .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
      .replace(/[^a-z0-9 ]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);
  for (const kategori of sss.kategoriler)
    for (const s of kategori.sorular)
      kayitlar.push({
        yol: `/sss#${kimlik(s.soru)}`,
        baslik: s.soru,
        ozet: s.cevap.length > 220 ? s.cevap.slice(0, 220) + "…" : s.cevap,
        tur: "sss",
        etiket: `SSS · ${kategori.ad}`,
      });
  for (const d of destekler.destekler)
    kayitlar.push({
      yol: "/destekler",
      baslik: `${d.kurum} — ${d.ad}`,
      ozet: d.ozet,
      tur: "destek",
      etiket: "Destek",
    });
  return kayitlar;
}
