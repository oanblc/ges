"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Tur = "kayit" | "giris" | "sifre-unut" | "sifre-sifirla";

const BASLIKLAR: Record<Tur, string> = {
  kayit: "Hesap oluşturun",
  giris: "Giriş yapın",
  "sifre-unut": "Şifrenizi mi unuttunuz?",
  "sifre-sifirla": "Yeni şifrenizi belirleyin",
};

export default function UyeForm({ tur }: { tur: Tur }) {
  const [ad, setAd] = useState("");
  const [eposta, setEposta] = useState("");
  const [sifre, setSifre] = useState("");
  const [jeton, setJeton] = useState("");
  const [bekliyor, setBekliyor] = useState(false);
  const [mesaj, setMesaj] = useState("");
  const [tamam, setTamam] = useState(false);
  const [donus, setDonus] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setDonus(p.get("donus") || "");
    if (tur !== "sifre-sifirla") return;
    setJeton(p.get("jeton") || "");
    setEposta(p.get("eposta") || "");
  }, [tur]);

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setBekliyor(true);
    setMesaj("");
    const veri: Record<string, string> = { eposta };
    if (tur === "kayit") Object.assign(veri, { ad, sifre });
    if (tur === "giris") veri.sifre = sifre;
    if (tur === "sifre-sifirla") Object.assign(veri, { jeton, sifre });
    const res = await fetch("/api/uye", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ islem: tur, veri }),
    });
    const d = await res.json().catch(() => ({}));
    setBekliyor(false);
    if (!res.ok) {
      setMesaj(d.hata || "İşlem yapılamadı; lütfen tekrar deneyin.");
      return;
    }
    if (tur === "sifre-unut") {
      setTamam(true);
      setMesaj(
        "Bu e-posta ile kayıtlı bir hesap varsa şifre sıfırlama bağlantısı gönderildi. Gelen kutunuzu (ve gereksiz klasörünü) kontrol edin."
      );
      return;
    }
    window.location.href = donus && donus.startsWith("/") ? donus : "/hesap";
  }

  return (
    <form className="uye-kutu" onSubmit={gonder}>
      <h1>{BASLIKLAR[tur]}</h1>
      {tur === "kayit" && (
        <p className="uye-not">
          Üyelik ücretsizdir; taleplerinizi ve analizlerinizi tek yerden yürütmenizi sağlar.
        </p>
      )}
      {tur === "sifre-unut" && !tamam && (
        <p className="uye-not">
          E-posta adresinizi yazın; şifrenizi yenilemeniz için size bir bağlantı gönderelim.
        </p>
      )}

      {!tamam && (
        <>
          {tur === "kayit" && (
            <label>
              Adınız Soyadınız
              <input value={ad} onChange={(e) => setAd(e.target.value)} required minLength={2} />
            </label>
          )}
          {tur !== "sifre-sifirla" && (
            <label>
              E-posta
              <input
                type="email"
                value={eposta}
                onChange={(e) => setEposta(e.target.value)}
                required
              />
            </label>
          )}
          {tur !== "sifre-unut" && (
            <label>
              {tur === "sifre-sifirla" ? "Yeni şifre" : "Şifre"}
              <input
                type="password"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                required
                minLength={8}
                autoComplete={tur === "giris" ? "current-password" : "new-password"}
              />
              {tur !== "giris" && <small>En az 8 karakter</small>}
            </label>
          )}
          <button className="gt-btn" type="submit" disabled={bekliyor}>
            {bekliyor
              ? "İşleniyor…"
              : tur === "kayit"
                ? "Kayıt Ol"
                : tur === "giris"
                  ? "Giriş Yap"
                  : tur === "sifre-unut"
                    ? "Bağlantı Gönder"
                    : "Şifreyi Değiştir"}
          </button>
        </>
      )}
      {mesaj && <p className={tamam ? "uye-bilgi" : "uye-hata"}>{mesaj}</p>}

      <div className="uye-alt">
        {tur === "giris" && (
          <>
            <Link href="/sifremi-unuttum">Şifremi unuttum</Link>
            <span>
              Hesabınız yok mu? <Link href={donus ? `/kayit?donus=${encodeURIComponent(donus)}` : "/kayit"}>Kayıt olun</Link>
            </span>
          </>
        )}
        {tur === "kayit" && (
          <span>
            Zaten üye misiniz? <Link href={donus ? `/giris?donus=${encodeURIComponent(donus)}` : "/giris"}>Giriş yapın</Link>
          </span>
        )}
        {(tur === "sifre-unut" || tur === "sifre-sifirla") && (
          <Link href="/giris">Girişe dön</Link>
        )}
      </div>
    </form>
  );
}
