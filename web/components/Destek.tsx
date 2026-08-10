"use client";

import { useState } from "react";
import { Ev, Fabrika, Filiz, Ok } from "./Icons";

/**
 * Destek uygunluk aracı — kurallar kb/finansman-sigorta.md ve
 * kb/ozel-durumlar.md bulgularıyla birebir; rakamlar oradan gelir.
 */

export type Profil = "konut" | "isletme" | "tarimsal";
type Durum = "ok" | "sart" | "yok";

interface Sonuc {
  durum: Durum;
  baslik: string;
  detay: string;
}

function sonuclar(profil: Profil, imalatciKobi: boolean, cksKayitli: boolean): Sonuc[] {
  if (profil === "konut") {
    return [
      {
        durum: "yok",
        baslik: "Genel devlet hibesi / faiz sübvansiyonu",
        detay:
          "Konut çatı GES'ine genel hibe veya faiz desteği yok; teşvik fiilen mahsuplaşma + krediden oluşur. Kapıya gelen 'devlet bedava panel veriyor' söylemi dolandırıcılık kalıbıdır.",
      },
      {
        durum: "ok",
        baslik: "Aylık mahsuplaşma muafiyeti",
        detay:
          "Konut aboneleri saatlik mahsuplaşmadan muaftır; gündüz üretilen fazla, ay içindeki gece tüketimiyle tam perakende fiyattan takas edilir — konutun en değerli teşviki budur.",
      },
      {
        durum: "ok",
        baslik: "Satış gelirinde vergi muafiyeti (GVK md.9)",
        detay:
          "50 kW altındaki çatı tesislerinde şebekeye satılan fazla üretimin geliri gelir vergisinden muaftır.",
      },
      {
        durum: "sart",
        baslik: "Banka kredisi",
        detay:
          "Bireysel çatı GES fiilen ihtiyaç/eko kredisiyle finanse edilir; 'yeşil konut kredisi' GES'i değil A/B enerji sınıfı konut alımını kapsar. Faizler ilan edilmez, şube/proje bazlıdır.",
      },
      {
        durum: "sart",
        baslik: "Sigorta",
        detay:
          "Standart konut poliçesi GES'i otomatik kapsamaz — ek ürün gerekir. 25 kW'a kadar bireysel çatı ürünleri mevcuttur (panel yaşı ve teminat üst sınırı şartlarıyla).",
      },
    ];
  }
  if (profil === "isletme") {
    return [
      imalatciKobi
        ? {
            durum: "ok",
            baslik: "KOSGEB Yeşil Sanayi — 14 M₺'ye kadar faizsiz",
            detay:
              "Çatı GES'te üst limit 14 M₺, tamamen faizsiz; bitişten 12 ay ödemesiz, ardından 4'er aylık 6 taksit. Banka kredisiyle birleştirilebilir.",
          }
        : {
            durum: "sart",
            baslik: "KOSGEB Yeşil Sanayi",
            detay:
              "14 M₺'ye kadar faizsiz destek yalnız imalatçı KOBİ'lere açık — işletmeniz imalat sektöründe KOBİ tanımına giriyorsa yukarıdaki seçimi değiştirin.",
          },
      {
        durum: "sart",
        baslik: "Yatırım Teşvik Belgesi (e-TUYS)",
        detay:
          "KDV istisnası, gümrük muafiyeti, indirimli kurumlar vergisi, damga/harç ve SGK desteği sağlar; amortisman süresi yarıya iner. Leasing üzerinden kullanımda şirket başına asgari 3 M₺ şartı vardır.",
      },
      {
        durum: "ok",
        baslik: "TurSEFF → GEFF (EBRD) kredileri",
        detay:
          "Aracı bankalar üzerinden KOBİ'lere yenilenebilir enerji finansmanı; büyük ölçekte TSKB devrededir.",
      },
      {
        durum: "sart",
        baslik: "Leasing — teşvikli ekipmanda %1 KDV",
        detay:
          "Tüzel/ticari müşteriye özel; teşvikli ekipman kirasında %1 KDV uygulanabilir (GTİP bazında teyit şart). Tipik vade 3-5 yıl.",
      },
      {
        durum: "sart",
        baslik: "ESCO / çatı kiralama",
        detay:
          "Yatırımsız model: performans bazlı satış sözleşmesiyle üçüncü taraf kurar, siz enerjiyi satın alırsınız. Yüksek tüketimli ticari/endüstriyel tesisler için uygundur.",
      },
      {
        durum: "ok",
        baslik: "Hızlandırılmış amortisman",
        detay:
          "Normal amortisman 10 yıl; azalan bakiyeler yöntemiyle 5 yıla iner. YTB kapsamında süre yarısıdır.",
      },
    ];
  }
  return [
    cksKayitli
      ? {
          durum: "ok",
          baslik: "IPARD / TKDK hibesi — %40-70",
          detay:
            "Çağrı dönemine göre yatırımın %40-70'i hibe olarak karşılanır. ÇKS kaydınız mevcut olduğundan başvuru önünüz açık; güncel çağrı takvimini kontrol edin.",
        }
      : {
          durum: "sart",
          baslik: "IPARD / TKDK hibesi — %40-70",
          detay:
            "Çağrı dönemine göre yatırımın %40-70'i hibe edilir; ancak Çiftçi Kayıt Sistemi (ÇKS) kaydı ön şarttır. Önce ÇKS kaydını tamamlayın.",
        },
    {
      durum: "ok",
      baslik: "Sübvansiyonlu tarımsal kredi",
      detay:
        "Tarımsal GES'te %0'a varan sübvansiyonlu faizli yatırım kredisi kullanılabilir (yatırımın %80'ine kadar) — çatı GES'te genel faiz desteğinin tek istisnası tarımsal yatırımlardır.",
    },
    {
      durum: "ok",
      baslik: "Sözleşme gücünün 2 katına kadar kurulum",
      detay:
        "Tarımsal sulama aboneleri (sanayi ve belediye gibi) sözleşme gücünün 2 katına kadar GES kurabilir; mesken ve ticarethanede sınır sözleşme gücü kadardır.",
    },
    {
      durum: "sart",
      baslik: "Saatlik mahsuplaşmaya dikkat",
      detay:
        "Saatlik mahsup sulamayı da kapsar: kışın üretilen fazla, yazın sulama tüketimiyle takas edilemez. Tüketim profilinize göre sistemi küçültmek çoğu zaman daha kârlıdır.",
    },
  ];
}

export default function Destek({ disProfil }: { disProfil?: Profil | null }) {
  const [icProfil, setIcProfil] = useState<Profil>("konut");
  const [imalatciKobi, setImalatciKobi] = useState(true);
  const [cksKayitli, setCksKayitli] = useState(true);
  // Dışarıdan profil verildiyse (destekler sayfası) kendi seçicisini gizler;
  // null "Tümü" demektir — kişisel özet gösterilmez.
  const denetimli = disProfil !== undefined;
  const profil = denetimli ? disProfil : icProfil;
  if (profil === null) return null;

  const liste = sonuclar(profil, imalatciKobi, cksKayitli);
  const asistanSoru = {
    konut: "Evime GES kurarken hangi desteklerden yararlanabilirim?",
    isletme: "İşletmem için KOSGEB ve YTB desteklerine nasıl başvururum?",
    tarimsal: "Tarımsal sulama GES'i için IPARD hibesine nasıl başvururum?",
  }[profil];

  return (
    <>
      {!denetimli && (
        <div className="rtoggle" aria-label="Profil seçimi">
          <button className={profil === "konut" ? "on" : ""} aria-pressed={profil === "konut"} onClick={() => setIcProfil("konut")}>
            <Ev className="i" /> Konut
          </button>
          <button className={profil === "isletme" ? "on" : ""} aria-pressed={profil === "isletme"} onClick={() => setIcProfil("isletme")}>
            <Fabrika className="i" /> İşletme
          </button>
          <button className={profil === "tarimsal" ? "on" : ""} aria-pressed={profil === "tarimsal"} onClick={() => setIcProfil("tarimsal")}>
            <Filiz className="i" /> Tarımsal
          </button>
        </div>
      )}

      {profil === "isletme" && (
        <label className="d-soru">
          <input
            type="checkbox"
            checked={imalatciKobi}
            onChange={(e) => setImalatciKobi(e.target.checked)}
          />
          İmalat sektöründe faaliyet gösteren KOBİ'yiz
        </label>
      )}
      {profil === "tarimsal" && (
        <label className="d-soru">
          <input
            type="checkbox"
            checked={cksKayitli}
            onChange={(e) => setCksKayitli(e.target.checked)}
          />
          Çiftçi Kayıt Sistemi (ÇKS) kaydımız var
        </label>
      )}

      <div className="d-list">
        {liste.map((s) => (
          <div key={s.baslik} className={`d-item d-${s.durum}`}>
            <span className="dot" aria-hidden="true" />
            <div>
              <b>{s.baslik}</b>
              <p>{s.detay}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="tool-cta">
        <a className="gt-btn small" href={`/asistan?soru=${encodeURIComponent(asistanSoru)}`}>
          Asistana Sorun <Ok className="i" />
        </a>
        <p>Çağrı dönemleri ve şartlar değişir; başvuru öncesi güncel durumu asistanla doğrulayın.</p>
      </div>
    </>
  );
}
