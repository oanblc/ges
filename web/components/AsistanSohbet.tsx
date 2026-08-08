"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Atac, Ok, Kalkan, Sohbet } from "./Icons";

type Mesaj = {
  role: "user" | "assistant";
  content: string;
  ekAd?: string;
  denetim?: "onay" | "guvenli-yanit";
  akiyor?: boolean;
};

type Ek = { ad: string; mime: string; veri: string };

const IZINLI_EKLER = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const ORNEKLER = [
  "Panel taktırdım, neden hâlâ fatura geliyor?",
  "Saatlik mahsuplaşma beni etkiler mi?",
  "Kiracıyım, çatıya panel taktırabilir miyim?",
  "Elektrik kesilince panellerim evi besler mi?",
];

/** SSE gövdesini olay olay ayrıştırır. */
function* olaylar(tampon: string): Generator<[string, string, number]> {
  let baslangic = 0;
  for (;;) {
    const son = tampon.indexOf("\n\n", baslangic);
    if (son === -1) return yield ["", "", baslangic];
    const blok = tampon.slice(baslangic, son);
    baslangic = son + 2;
    const olay = /^event: (.+)$/m.exec(blok)?.[1] ?? "";
    const veri = /^data: (.+)$/m.exec(blok)?.[1] ?? "{}";
    yield [olay, veri, baslangic];
  }
}

export default function AsistanSohbet({ ilkSoru }: { ilkSoru?: string }) {
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([]);
  const [girdi, setGirdi] = useState("");
  const [ek, setEk] = useState<Ek | null>(null);
  const [ekHata, setEkHata] = useState<string | null>(null);
  const [durum, setDurum] = useState<string | null>(null);
  const [leadDurum, setLeadDurum] = useState<"kapali" | "form" | "gonderildi">("kapali");
  const [iletisim, setIletisim] = useState("");
  const kayanRef = useRef<HTMLDivElement>(null);
  const gonderildiRef = useRef(false);

  const mesajGuncelle = (fn: (son: Mesaj) => Mesaj) =>
    setMesajlar((eski) => eski.map((m, i) => (i === eski.length - 1 ? fn(m) : m)));

  async function dosyaSec(dosya: File | undefined) {
    setEkHata(null);
    if (!dosya) return;
    if (!IZINLI_EKLER.includes(dosya.type)) {
      setEkHata("JPEG, PNG, WebP veya PDF yükleyebilirsiniz.");
      return;
    }
    if (dosya.size > 6 * 1024 * 1024) {
      setEkHata("Dosya 6 MB'ı aşmamalı — faturanın net bir fotoğrafı yeterlidir.");
      return;
    }
    const veri = await new Promise<string>((cozuldu, hata) => {
      const okuyucu = new FileReader();
      okuyucu.onload = () => cozuldu((okuyucu.result as string).split(",")[1] ?? "");
      okuyucu.onerror = () => hata(new Error("Dosya okunamadı."));
      okuyucu.readAsDataURL(dosya);
    }).catch(() => null);
    if (!veri) {
      setEkHata("Dosya okunamadı; lütfen yeniden deneyin.");
      return;
    }
    setEk({ ad: dosya.name, mime: dosya.type, veri });
  }

  async function sor(soru: string) {
    if ((!soru.trim() && !ek) || durum) return;
    const metin = soru.trim() || "Faturamı analiz eder misin?";
    const eskiler = mesajlar
      .filter((m) => !m.akiyor)
      .map(({ role, content, ekAd }) => ({
        role,
        content: ekAd ? `[Fatura eki gönderildi: ${ekAd}] ${content}` : content,
      }));
    const yeniIcerik = ek
      ? [
          {
            type: ek.mime === "application/pdf" ? "document" : "image",
            source: { type: "base64", media_type: ek.mime, data: ek.veri },
          },
          { type: "text", text: metin },
        ]
      : metin;
    const gecmis = [...eskiler, { role: "user" as const, content: yeniIcerik }];
    setMesajlar([
      ...mesajlar.filter((m) => !m.akiyor),
      { role: "user", content: metin, ekAd: ek?.ad },
      { role: "assistant", content: "", akiyor: true },
    ]);
    setGirdi("");
    setEk(null);
    setEkHata(null);
    setDurum("bağlanıyor");
    try {
      const res = await fetch("/api/asistan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesajlar: gecmis }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.hata ?? "Servise ulaşılamadı.");
      }
      const okuyucu = res.body.getReader();
      const coz = new TextDecoder();
      let tampon = "";
      for (;;) {
        const { done, value } = await okuyucu.read();
        if (done) break;
        tampon += coz.decode(value, { stream: true });
        let kalan = 0;
        for (const [olay, veri, konum] of olaylar(tampon)) {
          kalan = konum;
          if (!olay) break;
          const d = JSON.parse(veri);
          if (olay === "delta") {
            setDurum("yazıyor");
            mesajGuncelle((m) => ({ ...m, content: m.content + d.t }));
          } else if (olay === "durum") setDurum(d.mesaj);
          else if (olay === "duzeltme") mesajGuncelle((m) => ({ ...m, content: d.metin }));
          else if (olay === "denetim")
            mesajGuncelle((m) => ({ ...m, denetim: d.sonuc === "onay" ? "onay" : "guvenli-yanit" }));
          else if (olay === "hata") throw new Error(d.mesaj);
        }
        tampon = tampon.slice(kalan);
      }
      mesajGuncelle((m) => ({ ...m, akiyor: false }));
    } catch (e) {
      mesajGuncelle((m) => ({
        ...m,
        akiyor: false,
        content: m.content || (e instanceof Error ? e.message : "Bir sorun oluştu; lütfen yeniden deneyin."),
      }));
    } finally {
      setDurum(null);
    }
  }

  useEffect(() => {
    if (ilkSoru && !gonderildiRef.current) {
      gonderildiRef.current = true;
      void sor(ilkSoru);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ilkSoru]);

  useEffect(() => {
    kayanRef.current?.scrollTo({ top: kayanRef.current.scrollHeight, behavior: "smooth" });
  }, [mesajlar, durum]);

  async function leadGonder() {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesajlar: mesajlar.filter((m) => !m.akiyor), iletisim }),
    });
    setLeadDurum(res.ok ? "gonderildi" : "form");
  }

  const yapistir = (e: React.ClipboardEvent) => {
    const dosya = Array.from(e.clipboardData.files).find((f) => IZINLI_EKLER.includes(f.type));
    if (dosya) {
      e.preventDefault();
      void dosyaSec(dosya);
    }
  };

  return (
    <div className="as-main" onPaste={yapistir}>
      <div className="chat" ref={kayanRef} aria-live="polite">
        {mesajlar.length === 0 && (
          <div className="as-bos">
            <p>
              Çatı güneş enerjisiyle ilgili her sorunuzu sorun — cevaplar resmî kaynaklara
              dayanır, hesaplar güncel tarifelerle yapılır. Fatura fotoğrafınızı ataç
              düğmesiyle ekleyin ya da doğrudan buraya yapıştırın (Cmd/Ctrl+V); kalem kalem
              analiz edelim.
            </p>
            <div className="as-ornekler">
              {ORNEKLER.map((o) => (
                <button key={o} className="as-chip" onClick={() => void sor(o)}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}
        {mesajlar.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="msg user">
              {m.ekAd && (
                <span className="msg-ek">
                  <Atac className="i" /> {m.ekAd}
                </span>
              )}
              {m.content}
            </div>
          ) : (
            <div key={i} className="msg bot">
              <div className="who">
                <Sohbet className="i" /> GES Asistanı
              </div>
              <div className="govde">
                {m.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                ) : durum ? (
                  `${durum}…`
                ) : (
                  ""
                )}
              </div>
              {m.denetim === "onay" && (
                <div className="verified">
                  <Kalkan className="i" /> Bağımsız denetimden geçti
                </div>
              )}
            </div>
          ),
        )}
        {durum && <div className="as-durum">{durum}…</div>}
      </div>

      {ek && (
        <div className="ek-cubugu">
          <span className="ek-chip">
            <Atac className="i" /> {ek.ad}
            <button type="button" onClick={() => setEk(null)} aria-label="Eki kaldır">
              ×
            </button>
          </span>
          <span className="ek-ipucu">Fatura eklendi — isterseniz sorunuzu da yazıp gönderin.</span>
        </div>
      )}
      {ekHata && <div className="ek-hata">{ekHata}</div>}

      <form
        className="inbar"
        onSubmit={(e) => {
          e.preventDefault();
          void sor(girdi);
        }}
      >
        <label className={`atac ${durum ? "pasif" : ""}`} aria-label="Fatura fotoğrafı veya PDF ekle">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            hidden
            disabled={!!durum}
            onChange={(e) => {
              void dosyaSec(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <Atac className="i" />
        </label>
        <input
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          placeholder={
            ek
              ? "Faturanızla ilgili sorunuz (boş bırakabilirsiniz)…"
              : 'Sorunuzu yazın ya da ataçla faturanızı ekleyin…'
          }
          aria-label="Asistana soru"
          disabled={!!durum}
        />
        <button className="send" aria-label="Gönder" disabled={!!durum}>
          <Ok className="i" />
        </button>
      </form>

      <div className="as-lead">
        {leadDurum === "kapali" && mesajlar.length > 0 && (
          <button className="gt-btn small" onClick={() => setLeadDurum("form")}>
            Danışmanlık Talebi Bırak
          </button>
        )}
        {leadDurum === "form" && (
          <form
            className="as-lead-form"
            onSubmit={(e) => {
              e.preventDefault();
              void leadGonder();
            }}
          >
            <input
              value={iletisim}
              onChange={(e) => setIletisim(e.target.value)}
              placeholder="Telefon veya e-posta"
              aria-label="İletişim bilgisi"
              required
            />
            <button className="gt-btn small">Gönder</button>
          </form>
        )}
        {leadDurum === "gonderildi" && (
          <span className="as-lead-ok">
            Talebiniz alındı — danışmanımız en kısa sürede size ulaşacak.
          </span>
        )}
      </div>

      <div className="under">
        Asistan resmî kaynaklara dayanır; yatırım kararlarında bağlayıcı görüş vermez. Sohbetler
        hizmet kalitesi için kaydedilir.
      </div>
    </div>
  );
}
