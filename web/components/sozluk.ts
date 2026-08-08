/**
 * Terim sözlüğü — ziyaretçinin bilmediği kavramlar için kısa, kb ile uyumlu
 * açıklamalar. Terim.tsx kutucuğu ve asistan cevaplarındaki otomatik
 * işaretleme buradan beslenir.
 */

export const SOZLUK: Record<string, string> = {
  "EPİAŞ":
    "Enerji Piyasaları İşletme A.Ş. — Türkiye elektrik piyasasını işleten kurum; PTF gibi fiyatları burada oluşur ve yayınlanır.",
  "EPDK":
    "Enerji Piyasası Düzenleme Kurumu — elektrik tarifelerini ve piyasa kurallarını belirleyen düzenleyici kurum.",
  "PTF":
    "Piyasa Takas Fiyatı — elektriğin saatlik toptan piyasa fiyatı. Gün öncesi piyasada oluşur, ₺/MWh cinsinden yayınlanır.",
  "YEKDEM":
    "Yenilenebilir Enerji Kaynakları Destekleme Mekanizması — yenilenebilir üreticilere uygulanan destek ve fiyatlandırma çerçevesi.",
  "TEDAŞ":
    "Elektrik projelerini onaylayan ve tesislerin kabul işlemlerini yürüten kamu kuruluşu.",
  "mahsuplaşma":
    "Ürettiğiniz elektriğin tüketiminizden düşülmesi. Konutlarda aylık, işletmelerde saatlik dönemler halinde yapılır.",
  "saatlik mahsuplaşma":
    "Üretim-tüketim denkleştirmesinin her saat kendi içinde yapılması. 1 Mayıs 2026'dan beri işletmelerde geçerli; konutlar muaf.",
  "öz tüketim":
    "Ürettiğiniz elektriği şebekeye vermeden anında tesiste kullanmanız — kilovatsaat başına en yüksek değeri bu kısım sağlar.",
  "kWp":
    "Kilovat-tepe: panellerin standart test koşullarındaki azami gücü. Sistem büyüklüğü bu birimle anılır.",
  "kWh":
    "Kilovatsaat: enerji birimi — 1 kW gücündeki bir cihazın 1 saatte tükettiği (veya ürettiği) enerji.",
  "dağıtım bedeli":
    "Şebekeyi kullanmanın karşılığı olarak faturada yer alan kalem; GES kursanız da şebekeden çektiğiniz enerji için ödenir.",
  "çağrı mektubu":
    "Dağıtım şirketinin 'şebekeye bağlanabilirsiniz' anlamına gelen resmî yazısı — sürecin dönüm noktası.",
  "çift yönlü sayaç":
    "Hem şebekeden çektiğiniz hem şebekeye verdiğiniz elektriği ayrı ayrı ölçen sayaç; kabul aşamasında takılır.",
  "inverter":
    "Panellerin ürettiği doğru akımı (DC) evde/şebekede kullanılan alternatif akıma (AC) çeviren cihaz — sistemin beyni.",
  "LFP":
    "Lityum demir fosfat — ev tipi bataryalarda güvenliği ve uzun çevrim ömrüyle standartlaşan pil kimyası.",
  "DoD":
    "Deşarj derinliği — batarya kapasitesinin güvenle kullanılabilen oranı (LFP'de tipik %90).",
  "lisanssız üretim":
    "Lisans almadan, öz tüketim amaçlı elektrik üretimine izin veren rejim; çatı GES'lerin yasal çerçevesi.",
  "YTB":
    "Yatırım Teşvik Belgesi — KDV istisnası, gümrük muafiyeti ve SGK desteği gibi avantajlar sağlayan belge (e-TUYS üzerinden alınır).",
  "PR":
    "Performans oranı — santralin ışınımdan bağımsız kalite ölçütü; izleme ve garanti takibinde kullanılır.",
  "duck curve":
    "Ördek eğrisi — güneşin bol olduğu öğle saatlerinde elektrik fiyatının düşüp akşam yükselmesiyle oluşan günlük fiyat deseni.",
};

/** Otomatik işaretleme için terim alternasyonu (uzun terimler önce) */
export const TERIM_DUZENI = new RegExp(
  `(?<![\\p{L}\\d])(${Object.keys(SOZLUK)
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![\\p{L}\\d])`,
  "gu",
);
