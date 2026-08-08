/** Süreç aşamaları — ince çizgili illüstrasyonlar (arka plansız, teknik çizim havası). */

const T = "var(--theme)";
const Y = "var(--theme2)";
const B = "var(--body)"; // örtme (occlusion) için kağıt beyazı

/** seed: sahne başına farklı el titremesi (ve benzersiz filtre id'si) üretir. */
const Sahne = ({ seed, children }: { seed: number; children: React.ReactNode }) => (
  <svg viewBox="0 0 320 200" aria-hidden="true">
    <filter id={`kalem-${seed}`}>
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed={seed} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <g
      filter={`url(#kalem-${seed})`}
      fill="none"
      stroke={T}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.92"
    >
      {children}
    </g>
  </svg>
);

const Gunes = ({ cx = 46, cy = 40, r = 12 }: { cx?: number; cy?: number; r?: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={Y} stroke={T} strokeWidth="1.8" />
    <g className="a-rays">
      <path
        stroke={T}
        strokeWidth="1.8"
        d={`M${cx} ${cy - r - 9}v5M${cx} ${cy + r + 4}v5M${cx - r - 9} ${cy}h5M${cx + r + 4} ${cy}h5M${cx - r - 4} ${cy - r - 4}l3.5 3.5M${cx + r} ${cy + r}l3.5 3.5M${cx - r - 4} ${cy + r + 4}l3.5-3.5M${cx + r} ${cy - r}l3.5-3.5`}
      />
    </g>
  </g>
);

const Zemin = () => <path d="M18 176h284" strokeDasharray="1 9" strokeWidth="2.4" />;

/* 1 — Ön Değerlendirme: detaylı ev + çatıyı tarayan büyüteç */
const OnDegerlendirme = () => (
  <Sahne seed={1}>
    <Gunes />
    <Zemin />
    {/* ev */}
    <path d="M92 176v-58M188 176v-58" />
    <path d="M80 118 140 74l60 44" />
    <path d="M168 94V72h12v13" strokeWidth="1.8" />
    <path d="M128 176v-26h20v26" strokeWidth="1.8" />
    <rect x="104" y="128" width="18" height="16" rx="2" strokeWidth="1.6" />
    <path d="M113 128v16M104 136h18" strokeWidth="1.2" />
    <path d="M160 128h20" strokeWidth="1.6" />
    {/* çatıda panel izi */}
    <path d="M102 108l28-20 16 12-28 20z" strokeWidth="1.6" />
    <path d="M116 98l16 12M110 103l16 12" strokeWidth="1.1" />
    {/* çalılar */}
    <path d="M56 176c0-8 12-8 12 0M244 176c0-7 10-7 10 0" strokeWidth="1.6" />
    {/* büyüteç */}
    <g className="a-scan">
      <circle cx="232" cy="80" r="30" fill={B} strokeWidth="2.4" />
      <path d="M254 102l24 24" strokeWidth="4.5" />
      <rect x="216" y="68" width="32" height="22" rx="2" fill={Y} strokeWidth="1.8" />
      <path d="M227 68v22M237 68v22M216 79h32" strokeWidth="1.3" />
    </g>
  </Sahne>
);

/* 2 — Bağlantı Başvurusu: dağıtım direği + başvuru dosyası */
const Basvuru = () => (
  <Sahne seed={2}>
    <Gunes cx={278} cy={38} r={11} />
    <Zemin />
    {/* kafes direk */}
    <path d="M46 176 66 60M86 176 66 60" strokeWidth="1.8" />
    <path d="M52 152h28M56 130h20M59 110h14M62 92h8" strokeWidth="1.3" />
    <path d="M52 152l24-22M80 152l-24-22M56 130l17-20M76 130l-17-20" strokeWidth="1" />
    <path d="M44 84h44" strokeWidth="1.8" />
    <path d="M46 84v6M86 84v6M66 60v-8" strokeWidth="1.6" />
    <path d="M46 90c30 18 60 22 104 22" strokeWidth="1.2" />
    {/* dosya */}
    <path d="M158 50h64l24 24v94h-88z" fill={B} />
    <path d="M222 50v24h24" />
    <path d="M174 96h56M174 112h56" strokeWidth="1.6" />
    <rect x="174" y="126" width="56" height="14" rx="3" fill={Y} strokeWidth="1.6" />
    <path d="M174 154q9-9 17 0t17 0" strokeWidth="1.4" />
    {/* iletim oku */}
    <g className="a-slide">
      <path d="M108 132h26m0 0-9-9m9 9-9 9" strokeWidth="2.2" />
    </g>
  </Sahne>
);

/* 3 — Çağrı Mektubu: zarftan yükselen onay yazısı */
const CagriMektubu = () => (
  <Sahne seed={3}>
    <Gunes />
    <Zemin />
    <g className="a-bob">
      <path d="M112 44h96v76h-96z" fill={B} />
      <circle cx="160" cy="70" r="11" fill={Y} strokeWidth="1.8" />
      <path d="M128 94h64M136 106h48" strokeWidth="1.6" />
    </g>
    {/* zarf */}
    <path d="M84 102h152v74H84z" fill={B} />
    <path d="M84 102l76 46 76-46" />
    <path d="M84 176l54-38M236 176l-54-38" strokeWidth="1.6" />
    {/* hareket kıvılcımları */}
    <path d="M100 40l-6-6M220 40l6-6" stroke={Y} strokeWidth="2" />
  </Sahne>
);

/* 4 — Proje Onayı: teknik çizim paftası + onay damgası */
const ProjeOnayi = () => (
  <Sahne seed={4}>
    <Gunes cx={278} cy={38} r={11} />
    <Zemin />
    <path d="M64 46h150v122H64z" fill={B} />
    <path d="M72 54h134v106H72z" strokeWidth="1" strokeDasharray="3 5" />
    {/* pafta: panel yerleşimi */}
    <rect x="88" y="70" width="76" height="48" rx="2" strokeWidth="1.6" />
    <path d="M113 70v48M139 70v48M88 94h76" strokeWidth="1.1" />
    {/* ölçü çizgileri */}
    <path d="M88 132h76M88 128v8M164 128v8" strokeWidth="1.1" />
    <path d="M176 70v48M172 70h8M172 118h8" strokeWidth="1.1" />
    <path d="M88 148h40" strokeWidth="1.4" />
    {/* damga */}
    <g className="a-pulse">
      <circle cx="240" cy="132" r="28" fill={Y} strokeWidth="2.2" />
      <circle cx="240" cy="132" r="20" strokeWidth="1.4" />
      <path className="a-draw" d="M231 132l7 7 13-13" strokeWidth="2.6" />
    </g>
  </Sahne>
);

/* 5 — Kurulum: çatıya inen panel + merdiven */
const Kurulum = () => (
  <Sahne seed={5}>
    <Gunes cx={44} cy={38} r={11} />
    <Zemin />
    <path d="M36 176 190 66l94 68" />
    {/* merdiven */}
    <path d="M58 176l26-62M80 176l26-62" strokeWidth="1.6" />
    <path d="M66 158h22M72 144h22M78 130h22M84 116h22" strokeWidth="1.2" />
    {/* monte panel */}
    <path d="M112 138l56-40 34 24-56 40z" strokeWidth="1.8" />
    <path d="M140 118l34 24M126 128l34 24M168 98l-56 40" strokeWidth="1.1" />
    {/* inen panel */}
    <g className="a-drop">
      <path d="M236 26l30 22-40 28-30-22z" fill={Y} strokeWidth="2" />
      <path d="M221 43l30 22M251 37l-15 11M236 26l-15 33" strokeWidth="1.1" />
      <path d="M226 88v16m0 0-7-7m7 7 7-7" strokeWidth="2" />
    </g>
  </Sahne>
);

/* 6 — Kabul ve Sayaç: çift yönlü sayaç + onay rozeti */
const KabulSayac = () => (
  <Sahne seed={6}>
    <Gunes cx={44} cy={38} r={11} />
    <Zemin />
    <rect x="112" y="48" width="96" height="104" rx="8" fill={B} />
    <circle cx="122" cy="58" r="1.6" fill={T} stroke="none" />
    <circle cx="198" cy="58" r="1.6" fill={T} stroke="none" />
    <circle cx="122" cy="142" r="1.6" fill={T} stroke="none" />
    <circle cx="198" cy="142" r="1.6" fill={T} stroke="none" />
    <rect x="128" y="66" width="64" height="24" rx="3" fill={Y} strokeWidth="1.8" />
    <path d="M140 78h9M155 78h9M170 78h9" strokeWidth="2" />
    {/* kadran */}
    <path d="M138 124a22 22 0 0 1 44 0" strokeWidth="1.8" />
    <path d="M141 113l4 2M150 105l3 4M160 102v5M170 105l-3 4M179 113l-4 2" strokeWidth="1.1" />
    <path className="a-needle" d="M160 124l14-12" strokeWidth="2.2" />
    <circle cx="160" cy="124" r="2.4" fill={T} stroke="none" />
    {/* çift yönlü akış */}
    <g className="a-slide">
      <path d="M96 164H56m0 0 9-7m-9 7 9 7M224 164h40m0 0-9-7m9 7-9 7" strokeWidth="2.2" />
    </g>
    <circle cx="230" cy="54" r="15" fill={Y} strokeWidth="1.8" />
    <path d="M223 54l5 5 10-10" strokeWidth="2.2" />
  </Sahne>
);

/* 7 — Üretim Dönemi: panel dizisi + yükselen kazanç */
const Uretim = () => (
  <Sahne seed={7}>
    <Gunes cx={58} cy={48} r={15} />
    <Zemin />
    {/* arazi tipi paneller */}
    <path d="M118 148l30-24h36l-30 24z" strokeWidth="1.8" />
    <path d="M186 148l30-24h36l-30 24z" strokeWidth="1.8" />
    <path d="M150 124l4 24M206 124l4 24M133 136h36M201 136h36" strokeWidth="1.1" />
    <path d="M136 148v28M204 148v28M158 148v22M226 148v22" strokeWidth="1.6" />
    {/* kazanç eğrisi */}
    <path className="a-draw-loop" d="M118 96c30 8 62-4 84-30" strokeWidth="2.4" />
    <path d="M202 66h16v16" strokeWidth="2.4" />
    <g className="a-pulse">
      <circle cx="254" cy="98" r="12" fill={Y} strokeWidth="1.8" />
      <path d="M253 92v12M250 98l7-2.5M250 102.5l7-2.5" strokeWidth="1.6" />
    </g>
  </Sahne>
);

export const SAHNELER = [
  OnDegerlendirme,
  Basvuru,
  CagriMektubu,
  ProjeOnayi,
  Kurulum,
  KabulSayac,
  Uretim,
];
