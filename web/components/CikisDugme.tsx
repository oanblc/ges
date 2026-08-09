"use client";

export default function CikisDugme() {
  async function cik() {
    await fetch("/api/yonetim/cikis", { method: "POST" });
    window.location.href = "/yonetim/giris";
  }
  return (
    <button type="button" className="yp-cikis" onClick={cik}>
      Çıkış
    </button>
  );
}
