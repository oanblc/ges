"use client";

export default function CikisDugme() {
  async function cik() {
    await fetch("/api/yonetim/cikis", { method: "POST" });
    window.location.href = "/yonetim/giris";
  }
  return (
    <button type="button" className="yp-ric yp-cikis" onClick={cik} title="Çıkış" aria-label="Çıkış">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
    </button>
  );
}
