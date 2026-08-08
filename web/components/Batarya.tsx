"use client";

import { useState } from "react";
import { Ok } from "./Icons";

/**
 * Batarya boyutlandırma — formüller kb/teknik-depolama.md ile birebir:
 * Konut: akşam tüketimi × 1,15 ÷ DoD (LFP ~%90); pratik bant 1-1,5 kWh / kWp.
 * İşletme: 15 dk sayaç profili gerektirir → asistana yönlendirilir.
 */

const DOD = 0.9; // LFP kullanılabilir derinlik

export default function Batarya() {
  const [mod, setMod] = useState<"konut" | "isletme">("konut");
  const [aksamKwh, setAksamKwh] = useState(8);
  const [kwp, setKwp] = useState(6);

  const oneriKwh = Math.round(((aksamKwh * 1.15) / DOD) * 10) / 10;
  const bantAlt = Math.round(kwp * 1 * 10) / 10;
  const bantUst = Math.round(kwp * 1.5 * 10) / 10;

  return (
    <div className="b-grid">
      <div className="roi-form" style={{ padding: 0 }}>
        <div className="rtoggle" aria-label="Kullanım tipi">
          <button className={mod === "konut" ? "on" : ""} aria-pressed={mod === "konut"} onClick={() => setMod("konut")}>
            Konut
          </button>
          <button className={mod === "isletme" ? "on" : ""} aria-pressed={mod === "isletme"} onClick={() => setMod("isletme")}>
            İşletme
          </button>
        </div>

        {mod === "konut" ? (
          <>
            <div className="rf">
              <label htmlFor="batAksam">
                Akşam-gece tüketiminiz — {aksamKwh.toLocaleString("tr-TR")} kWh/gün
              </label>
              <input
                id="batAksam"
                type="range"
                min={2}
                max={30}
                step={1}
                value={aksamKwh}
                onChange={(e) => setAksamKwh(+e.target.value)}
              />
            </div>
            <div className="rf">
              <label htmlFor="batKwp">
                Planlanan GES gücü — {kwp.toLocaleString("tr-TR")} kWp
              </label>
              <input
                id="batKwp"
                type="range"
                min={2}
                max={25}
                step={1}
                value={kwp}
                onChange={(e) => setKwp(+e.target.value)}
              />
            </div>
            <div className="roi-out">
              <div className="ro">
                <div className="rv">≈ {oneriKwh.toLocaleString("tr-TR")} kWh</div>
                <div className="rk">Önerilen kapasite (akşam tüketimi × 1,15 ÷ %90 DoD)</div>
              </div>
              <div className="ro">
                <div className="rv">
                  {bantAlt.toLocaleString("tr-TR")}–{bantUst.toLocaleString("tr-TR")} kWh
                </div>
                <div className="rk">Pratik bant (kWp başına 1–1,5 kWh)</div>
              </div>
              <div className="ro">
                <div className="rv">10-15 yıl</div>
                <div className="rk">LFP beklenen ömür (takvim yaşlanması belirler)</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="tanim">
              İşletmelerde doğru batarya boyutu 15 dakikalık sayaç profilinden çıkar:
              saatlik mahsuplaşmada <b>mahsuplaşamayan fazla üretim</b> load-shifting ile
              bataryaya alınır, puant tıraşlama (peak-shaving) ayrıca hesaplanır. Tipik geri
              dönüş 3-5 yıldır.
            </p>
            <div className="tool-cta">
              <a
                className="gt-btn small"
                href={`/asistan?soru=${encodeURIComponent(
                  "İşletmem için batarya boyutlandırması yapar mısın? Sayaç profilimi paylaşabilirim."
                )}`}
              >
                Asistanla Hesaplayın <Ok className="i" />
              </a>
            </div>
          </>
        )}
      </div>

      <div className="d-list">
        <div className="d-item d-sart">
          <span className="dot" aria-hidden="true" />
          <div>
            <b>Depodan şebekeye satış ödenmez</b>
            <p>
              Bataryadan şebekeye verilen enerjiye ödeme yapılmaz; depo çıkışı ölçülemiyorsa
              fazlanın tamamı bedelsiz sayılır. Doğru iş modeli öz tüketimi büyütmektir.
            </p>
          </div>
        </div>
        <div className="d-item d-yok">
          <span className="dot" aria-hidden="true" />
          <div>
            <b>Salt gece-puant arbitrajı konutta kârlı değil</b>
            <p>
              Üç zamanlı tarifede gece-puant farkı bataryanın çevrim maliyetinin altındadır;
              batarya ancak GES fazlasını depolarken kendini öder.
            </p>
          </div>
        </div>
        <div className="d-item d-ok">
          <span className="dot" aria-hidden="true" />
          <div>
            <b>Yerleşim ve sigorta</b>
            <p>
              Garaj, teknik oda veya gölge dış cephe uygundur; yatak odasına kurulmaz. Kurulumu
              sigortacıya yazılı bildirin — bildirilmemiş batarya ret gerekçesidir.
            </p>
          </div>
        </div>
        <div className="d-item d-ok">
          <span className="dot" aria-hidden="true" />
          <div>
            <b>Sonradan eklenebilir</b>
            <p>
              "Battery-ready" hibrit inverter en ucuz yoldur; mevcut GES'e ekleme TEDAŞ tadilat
              projesi ve kabul gerektirir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
