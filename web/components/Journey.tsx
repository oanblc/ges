"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Ok, OkGeri, EvBuyutec, Dosya, Zarf, DosyaOnay, PanelMontaj, SayacOnay, GunesUfuk } from "./Icons";
import { SAHNELER } from "./JourneyArt";

const ASAMALAR = [
  {
    ad: "Ön Değerlendirme",
    ozet: "Çatınızın uygunluğu ve tüketiminize göre sistem kapasitesi belirlenir.",
    detay:
      "Asistana elektrik faturanızı ve çatı bilgilerinizi iletirsiniz; tüketim profilinize uygun sistem kapasitesi ve yatırımın kabaca geri dönüşü bu aşamada netleşir.",
    sure: "≈ 1–2 hafta",
    Ikon: EvBuyutec,
  },
  {
    ad: "Bağlantı Başvurusu",
    ozet: "Bölgenizdeki elektrik dağıtım şirketine gerekli belgelerle başvurulur.",
    detay:
      "Bölgenizdeki elektrik dağıtım şirketine tapu, abonelik ve teknik belgelerle bağlantı başvurusu yapılır. Eksik belge en sık gecikme nedenidir — kontrol listemiz tam da bunun için var.",
    sure: "≈ 1–3 ay",
    Ikon: Dosya,
  },
  {
    ad: "Çağrı Mektubu",
    ozet: "Dağıtım şirketi bağlantı iznini yazılı olarak bildirir; süreç resmen başlar.",
    detay:
      "Dağıtım şirketi, şebekeye bağlanabileceğinizi 'çağrı mektubu' adı verilen resmî yazıyla bildirir. Bu belge sürecin dönüm noktasıdır; sonraki adımların süreleri bu tarihten itibaren işler.",
    sure: "Onay belgesi",
    Ikon: Zarf,
  },
  {
    ad: "Proje Onayı",
    ozet: "Elektrik projesi hazırlanır ve TEDAŞ tarafından onaylanır.",
    detay:
      "Elektrik projesi serbest müşavir mühendislere hazırlatılır ve TEDAŞ onayına sunulur. Onay süresi bölgeye göre değişir; süre sınırlarını kaçırmamak önemlidir.",
    sure: "≈ 1–2 ay",
    Ikon: DosyaOnay,
  },
  {
    ad: "Kurulum",
    ozet: "Paneller ve inverter yetkili ekipçe monte edilir — en kısa aşama budur.",
    detay:
      "Paneller, inverter ve montaj ekipmanları yetkili kurulum firmasınca yerleştirilir. Şaşırtıcı ama gerçek: tüm sürecin en kısa aşaması fiziksel kurulumdur.",
    sure: "≈ 1–3 gün",
    Ikon: PanelMontaj,
  },
  {
    ad: "Kabul ve Sayaç",
    ozet: "Geçici kabul yapılır, çift yönlü sayaç takılır; sistem şebekeye bağlanır.",
    detay:
      "Dağıtım şirketi tesisi yerinde kontrol eder, geçici kabul yapılır ve çift yönlü sayaç takılır. Sisteminiz artık şebekeyle resmen bağlantılıdır.",
    sure: "≈ 2–8 hafta",
    Ikon: SayacOnay,
  },
  {
    ad: "Üretim Dönemi",
    ozet: "Elektriğinizi üretmeye başlarsınız; mahsuplaşma faturanıza yansır.",
    detay:
      "Ürettiğiniz elektrik tüketiminizden düşülür; konutlarda aylık, işletmelerde saatlik mahsuplaşma uygulanır. Paneller 25 yıl ve üzeri performans garantisiyle çalışmaya devam eder.",
    sure: "25+ yıl",
    Ikon: GunesUfuk,
  },
];

export default function Journey() {
  const [mod, setMod] = useState<"adim" | "tumu">("adim");
  const [idx, setIdx] = useState(0);
  const [oncekiIdx, setOncekiIdx] = useState(-1);
  const zamanlayici = useRef<ReturnType<typeof setInterval> | null>(null);
  const bolumRef = useRef<HTMLElement>(null);

  const elleGezildi = useRef(false);

  const durdur = useCallback(() => {
    if (zamanlayici.current) clearInterval(zamanlayici.current);
    zamanlayici.current = null;
  }, []);

  const git = useCallback(
    (i: number) => {
      // kullanıcı elle gezinmeye başladıysa otomatik oynatma kalıcı durur
      elleGezildi.current = true;
      durdur();
      setIdx((eski) => {
        setOncekiIdx(eski);
        return (i + ASAMALAR.length) % ASAMALAR.length;
      });
    },
    [durdur],
  );

  const otomatikBaslat = useCallback(() => {
    durdur();
    if (elleGezildi.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    zamanlayici.current = setInterval(() => {
      setIdx((eski) => {
        setOncekiIdx(eski);
        return (eski + 1) % ASAMALAR.length;
      });
    }, 4600);
  }, [durdur]);

  useEffect(() => {
    if (mod !== "adim") return durdur;
    // yalnız bölüm ekrandayken oynat (mobil pil tasarrufu)
    const bolum = bolumRef.current;
    if (!bolum || typeof IntersectionObserver === "undefined") {
      otomatikBaslat();
      return durdur;
    }
    const gozlemci = new IntersectionObserver(
      ([giris]) => (giris.isIntersecting ? otomatikBaslat() : durdur()),
      { threshold: 0.2 },
    );
    gozlemci.observe(bolum);
    return () => {
      gozlemci.disconnect();
      durdur();
    };
  }, [mod, otomatikBaslat, durdur]);

  const modDegistir = (m: "adim" | "tumu") => {
    setMod(m);
    const r = bolumRef.current?.getBoundingClientRect();
    if (r && r.top < 0) bolumRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="journey" id="surec" ref={bolumRef}>
      <div className="journey-head">
        <span className="sub-title">
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
            <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4" />
          </svg>
          GES Süreci
        </span>
        <h2>
          Başvurudan üretime <span className="hl-g">yedi aşama</span>
        </h2>
        <p>
          Süreci hiç bilmiyorsanız endişelenmeyin — hangi aşamada ne yapılacağını, hangi kuruma
          başvurulacağını ve ne kadar süreceğini adım adım gösteriyoruz.
        </p>
      </div>

      <div className="jmode" aria-label="Görünüm seçimi">
        <button className={mod === "adim" ? "on" : ""} aria-pressed={mod === "adim"} onClick={() => modDegistir("adim")}>
          Adım Adım
        </button>
        <button className={mod === "tumu" ? "on" : ""} aria-pressed={mod === "tumu"} onClick={() => modDegistir("tumu")}>
          Tümünü Tek Ekranda Gör
        </button>
      </div>

      {mod === "adim" ? (
        <div className="jstepper">
          <div className="jprogress">
            {ASAMALAR.map((a, i) => (
              <span key={a.ad} style={{ display: "contents" }}>
                <button
                  className={`jdot ${i === idx ? "on" : ""} ${i < idx ? "done" : ""}`}
                  aria-pressed={i === idx}
                  aria-label={`Aşama ${i + 1}: ${a.ad}`}
                  onClick={() => {
                    git(i);
                    otomatikBaslat();
                  }}
                >
                  {i + 1}
                </button>
                {i < ASAMALAR.length - 1 && (
                  <span className={`jline ${i < idx ? "fill" : ""}`}>
                    <i />
                  </span>
                )}
              </span>
            ))}
          </div>

          <div
            className="jviewport"
            onMouseEnter={durdur}
            onMouseLeave={otomatikBaslat}
            onTouchStart={durdur}
          >
            {ASAMALAR.map((a, i) => {
              const Sahne = SAHNELER[i];
              return (
                <div
                  key={a.ad}
                  className={`jslide ${i === idx ? "on" : ""} ${i === oncekiIdx ? "out" : ""}`}
                >
                  <div className="jtxt">
                    <span className="stage-tag">
                      Aşama {i + 1} / {ASAMALAR.length}
                    </span>
                    <h4>{a.ad}</h4>
                    <p className="jd">{a.detay}</p>
                    <span className="jt">{a.sure}</span>
                  </div>
                  <span className="jart">
                    <Sahne />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="jnav">
            <button aria-label="Önceki aşama" onClick={() => { git(idx - 1); otomatikBaslat(); }}>
              <OkGeri className="" />
            </button>
            <button aria-label="Sonraki aşama" onClick={() => { git(idx + 1); otomatikBaslat(); }}>
              <Ok className="" />
            </button>
          </div>
        </div>
      ) : (
        <div className="jtrack">
          {ASAMALAR.map((a, i) => (
            <div className="jstep" key={a.ad}>
              <span className="jn">{i + 1}</span>
              <span className="jic">
                <a.Ikon />
              </span>
              <b>{a.ad}</b>
              <p>{a.ozet}</p>
              <span className="jt">{a.sure}</span>
            </div>
          ))}
        </div>
      )}

      <div className="journey-foot">
        <a className="gt-btn small" href="/surec">
          Süreç Rehberini İnceleyin <Ok className="i" />
        </a>
        <p>
          Her aşamanın belgeleri, olası gecikme nedenleri ve dikkat edilecek noktalar rehberde
          ayrıntılı olarak yer alır.
        </p>
      </div>
    </section>
  );
}
