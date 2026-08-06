/** Süreç aşamaları için tema diline uygun çizgi illüstrasyonlar (stroke sahneler, sarı vurgu). */

const T = "var(--theme)";
const Y = "var(--theme2)";

const Sahne = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 320 200" aria-hidden="true">
    <g fill="none" stroke={T} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

const Gunes = ({ cx = 46, cy = 42, r = 13 }: { cx?: number; cy?: number; r?: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={Y} stroke={T} strokeWidth="2.2" />
    <path
      stroke={T}
      strokeWidth="2.2"
      d={`M${cx} ${cy - r - 10}v6M${cx} ${cy + r + 4}v6M${cx - r - 10} ${cy}h6M${cx + r + 4} ${cy}h6M${cx - r - 4} ${cy - r - 4}l4 4M${cx + r} ${cy + r}l4 4M${cx - r - 4} ${cy + r + 4}l4-4M${cx + r} ${cy - r}l4-4`}
    />
  </g>
);

const Zemin = () => <path d="M18 176h284" strokeDasharray="1 10" strokeWidth="3" />;

/* 1 — Ön Değerlendirme: çatı + büyüteçte panel */
const OnDegerlendirme = () => (
  <Sahne>
    <Gunes />
    <Zemin />
    <path d="M78 176v-66l52-38 52 38v66" />
    <path d="M66 116l64-47 64 47" />
    <path d="M118 176v-30h24v30" />
    <circle cx="228" cy="82" r="34" fill="var(--surface)" />
    <path d="M252 106l26 26" strokeWidth="5" />
    <rect x="210" y="68" width="36" height="26" rx="3" fill={Y} stroke={T} strokeWidth="2.2" />
    <path d="M222 68v26M234 68v26M210 81h36" strokeWidth="2" />
  </Sahne>
);

/* 2 — Bağlantı Başvurusu: başvuru dosyası + dağıtım direği */
const Basvuru = () => (
  <Sahne>
    <Gunes cx={278} cy={40} r={12} />
    <Zemin />
    <path d="M58 176V62M38 78h40M34 98h48" />
    <circle cx="44" cy="78" r="3" fill={T} />
    <circle cx="72" cy="78" r="3" fill={T} />
    <path d="M132 44h96l24 24v108h-120z" fill="var(--surface)" />
    <path d="M228 44v24h24" />
    <path d="M150 84h64M150 102h64" />
    <rect x="148" y="118" width="68" height="16" rx="4" fill={Y} stroke={T} strokeWidth="2" />
    <path d="M150 150h44" />
    <path d="M96 120h24m0 0-8-8m8 8-8 8" />
  </Sahne>
);

/* 3 — Çağrı Mektubu: zarftan çıkan onay yazısı */
const CagriMektubu = () => (
  <Sahne>
    <Gunes />
    <Zemin />
    <path d="M96 58h128v70H96z" fill="var(--surface)" />
    <circle cx="160" cy="80" r="13" fill={Y} stroke={T} strokeWidth="2.2" />
    <path d="M120 104h80M132 116h56" strokeWidth="2.2" />
    <path d="M78 100h164v76H78z" fill="var(--surface)" />
    <path d="M78 100l82 52 82-52" />
    <path d="M78 176l58-40M242 176l-58-40" strokeWidth="2" />
  </Sahne>
);

/* 4 — Proje Onayı: teknik çizim + onay damgası */
const ProjeOnayi = () => (
  <Sahne>
    <Gunes cx={280} cy={40} r={12} />
    <Zemin />
    <path d="M64 46h150v122H64z" fill="var(--surface)" />
    <rect x="84" y="68" width="84" height="52" rx="3" />
    <path d="M112 68v52M140 68v52M84 94h84" strokeWidth="2" />
    <path d="M84 140h60m-60-6v12m60-12v12" strokeWidth="2" />
    <circle cx="240" cy="132" r="30" fill={Y} stroke={T} strokeWidth="2.6" />
    <circle cx="240" cy="132" r="21" strokeWidth="2" />
    <path d="M230 132l7 7 14-14" strokeWidth="3" />
  </Sahne>
);

/* 5 — Kurulum: eğimli çatıya panel yerleştirme */
const Kurulum = () => (
  <Sahne>
    <Gunes />
    <Zemin />
    <path d="M36 176 190 66l94 68" />
    <path d="M92 138l56-40 34 24-56 40z" fill="var(--surface)" />
    <path d="M120 118l34 24M106 128l34 24M148 98l-56 40" strokeWidth="2" />
    <path d="M196 54l40-28 30 22" fill={Y} stroke={T} strokeWidth="2.4" />
    <path d="M236 26l30 22-40 28-30-22z" fill={Y} stroke={T} strokeWidth="2.4" />
    <path d="M214 88v18m0 0-7-7m7 7 7-7" strokeWidth="2.4" />
  </Sahne>
);

/* 6 — Kabul ve Sayaç: çift yönlü sayaç + onay rozeti */
const KabulSayac = () => (
  <Sahne>
    <Gunes cx={44} cy={40} r={12} />
    <Zemin />
    <rect x="112" y="48" width="96" height="104" rx="10" fill="var(--surface)" />
    <rect x="128" y="66" width="64" height="26" rx="4" fill={Y} stroke={T} strokeWidth="2.2" />
    <path d="M140 79h10M156 79h10M172 79h10" strokeWidth="2.4" />
    <path d="M138 122a22 22 0 0 1 44 0" />
    <path d="M160 122l14-12" strokeWidth="2.4" />
    <path d="M96 166H56m0 0 9-7m-9 7 9 7M224 166h40m0 0-9-7m9 7-9 7" strokeWidth="2.6" />
    <circle cx="228" cy="56" r="17" fill={Y} stroke={T} strokeWidth="2.4" />
    <path d="M220 56l6 6 11-11" strokeWidth="2.8" />
  </Sahne>
);

/* 7 — Üretim Dönemi: panel dizisi + yükselen kazanç */
const Uretim = () => (
  <Sahne>
    <Gunes cx={62} cy={52} r={18} />
    <Zemin />
    <path d="M120 148l30-24 34 0-30 24z" fill="var(--surface)" />
    <path d="M186 148l30-24 34 0-30 24z" fill="var(--surface)" />
    <path d="M150 124l4 24M204 124l4 24M134 137l30-13M200 137l30-13" strokeWidth="2" />
    <path d="M138 148v28M204 148v28" strokeWidth="2.4" />
    <path d="M118 96c30 8 62-4 84-30" strokeWidth="2.8" />
    <path d="M202 66h16v16" strokeWidth="2.8" />
    <circle cx="252" cy="98" r="12" fill={Y} stroke={T} strokeWidth="2.2" />
    <path d="M248 98h8M252 94v8" strokeWidth="2" />
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
