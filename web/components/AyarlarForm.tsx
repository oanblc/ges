"use client";

import { useState } from "react";

type Ayarlar = {
  saat_limit: number;
  gunluk_sohbet: number;
  gunluk_lead: number;
  bakim: boolean;
  smtp_sunucu: string;
  smtp_port: number;
  smtp_kullanici: string;
  smtp_sifre_var: boolean;
  bildirim_eposta: string;
  eposta_kopru: string;
};

const ALANLAR: Array<["saat_limit" | "gunluk_sohbet" | "gunluk_lead", string, string]> = [
  ["saat_limit", "Saatlik soru sınırı (IP başına)", "Aynı ziyaretçinin bir saatte sorabileceği soru"],
  ["gunluk_sohbet", "Günlük sohbet tavanı (site geneli)", "Aşılınca gün sonuna kadar 'kapasite doldu' verilir"],
  ["gunluk_lead", "Günlük talep tavanı", "Günde kabul edilen danışmanlık talebi"],
];

export default function AyarlarForm({ ilk }: { ilk: Ayarlar }) {
  const [ayarlar, setAyarlar] = useState<Ayarlar>(ilk);
  const [sifre, setSifre] = useState("");
  const [bekliyor, setBekliyor] = useState(false);
  const [mesaj, setMesaj] = useState("");
  const [taniMesaj, setTaniMesaj] = useState("");

  async function kaydet(e: React.FormEvent) {
    e.preventDefault();
    setBekliyor(true);
    setMesaj("");
    const res = await fetch("/api/yonetim/kopru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uc: "/yonetim/ayarlar",
        veri: { ...ayarlar, smtp_sifre: sifre },
      }),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok) {
      setSifre("");
      setAyarlar({ ...ayarlar, smtp_sifre_var: ayarlar.smtp_sifre_var || !!sifre });
    }
    setMesaj(res.ok ? "✓ Kaydedildi — anında geçerli." : d.hata || "Kaydedilemedi.");
    setBekliyor(false);
  }

  async function smtpSina() {
    setTaniMesaj("Deneniyor…");
    const res = await fetch("/api/yonetim/kopru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uc: "/yonetim/eposta-tani", veri: {} }),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      setTaniMesaj(d.hata || "Tanı çalıştırılamadı.");
      return;
    }
    const kopru = String(d.kopru || "");
    if (kopru.includes("ok")) {
      setTaniMesaj("✓ E-posta köprüsü çalışıyor — gönderim hazır.");
      return;
    }
    if (kopru) {
      setTaniMesaj(`✕ Köprü hatası: ${kopru.slice(0, 100)}`);
      return;
    }
    const giris = String(d.smtp_giris || "");
    if (giris.includes("başarılı")) setTaniMesaj("✓ SMTP bağlantısı ve giriş başarılı.");
    else if (String(d[`tcp_${d.ayar?.port}`] || "").includes("Timeout"))
      setTaniMesaj("✕ Sunucudan SMTP portuna çıkış engelli (barındırma katmanı). Bilgiler doğru olsa da gönderim yapılamaz.");
    else setTaniMesaj(`✕ ${giris || "bağlantı kurulamadı"}`);
  }

  return (
    <form className="yp-ayarlar" onSubmit={kaydet}>
      {ALANLAR.map(([anahtar, etiket, aciklama]) => (
        <label key={anahtar} className="yp-alan">
          <span>
            <b>{etiket}</b>
            <small>{aciklama}</small>
          </span>
          <input
            type="number"
            min={1}
            value={ayarlar[anahtar]}
            onChange={(e) => setAyarlar({ ...ayarlar, [anahtar]: Number(e.target.value) })}
          />
        </label>
      ))}
      <label className="yp-alan bakim">
        <span>
          <b>Bakım modu</b>
          <small>Açıkken asistan, mevzuat araması ve fatura okuma ziyaretçilere kapatılır</small>
        </span>
        <input
          type="checkbox"
          checked={ayarlar.bakim}
          onChange={(e) => setAyarlar({ ...ayarlar, bakim: e.target.checked })}
        />
      </label>

      <h2 className="yp-ayar-baslik">E-posta (SMTP)</h2>
      <p className="yp-aciklama">
        Danışmanlık talebi gelince bildirim ve karşılama e-postaları bu hesaptan gönderilir.
        Şifre sunucudaki kalıcı diskte tutulur; koda veya GitHub&apos;a yazılmaz.
      </p>
      <label className="yp-alan">
        <span>
          <b>SMTP sunucusu</b>
          <small>Natro kurumsal e-posta için: mail.kurumsaleposta.com</small>
        </span>
        <input
          type="text"
          value={ayarlar.smtp_sunucu}
          onChange={(e) => setAyarlar({ ...ayarlar, smtp_sunucu: e.target.value })}
        />
      </label>
      <label className="yp-alan">
        <span>
          <b>Port</b>
          <small>465 (SSL) ya da 587 (STARTTLS)</small>
        </span>
        <input
          type="number"
          min={1}
          max={65535}
          value={ayarlar.smtp_port}
          onChange={(e) => setAyarlar({ ...ayarlar, smtp_port: Number(e.target.value) })}
        />
      </label>
      <label className="yp-alan">
        <span>
          <b>E-posta adresi (kullanıcı)</b>
          <small>Gönderen adres; ör. info@gesdanismani.com</small>
        </span>
        <input
          type="text"
          value={ayarlar.smtp_kullanici}
          onChange={(e) => setAyarlar({ ...ayarlar, smtp_kullanici: e.target.value })}
        />
      </label>
      <label className="yp-alan">
        <span>
          <b>Şifre</b>
          <small>
            {ayarlar.smtp_sifre_var
              ? "Kayıtlı bir şifre var — değiştirmek istemiyorsan boş bırak"
              : "Posta kutusunun şifresi"}
          </small>
        </span>
        <input
          type="password"
          value={sifre}
          autoComplete="new-password"
          placeholder={ayarlar.smtp_sifre_var ? "••••••••" : ""}
          onChange={(e) => setSifre(e.target.value)}
        />
      </label>
      <label className="yp-alan">
        <span>
          <b>E-posta köprüsü (Apps Script)</b>
          <small>
            Doluysa gönderim SMTP yerine bu adres üzerinden yapılır — Railway&apos;in SMTP
            engelini aşar. Boş bırakılırsa SMTP denenir.
          </small>
        </span>
        <input
          type="text"
          value={ayarlar.eposta_kopru}
          placeholder="https://script.google.com/macros/s/…/exec"
          onChange={(e) => setAyarlar({ ...ayarlar, eposta_kopru: e.target.value })}
        />
      </label>
      <label className="yp-alan">
        <span>
          <b>Bildirim adresi</b>
          <small>Yeni talep özetlerinin düşeceği e-posta</small>
        </span>
        <input
          type="text"
          value={ayarlar.bildirim_eposta}
          onChange={(e) => setAyarlar({ ...ayarlar, bildirim_eposta: e.target.value })}
        />
      </label>

      <div className="yp-sss-arac">
        <button className="gt-btn small" type="submit" disabled={bekliyor}>
          {bekliyor ? "Kaydediliyor…" : "Kaydet"}
        </button>
        <button className="gt-btn small ikincil" type="button" onClick={smtpSina} disabled={bekliyor}>
          SMTP&apos;yi Sına
        </button>
        {mesaj && <span className="yp-sss-mesaj">{mesaj}</span>}
      </div>
      {taniMesaj && <p className="yp-aciklama">{taniMesaj}</p>}
    </form>
  );
}
