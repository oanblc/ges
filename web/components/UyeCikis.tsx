"use client";

export default function UyeCikis() {
  async function cikis() {
    await fetch("/api/uye", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ islem: "cikis" }),
    });
    window.location.href = "/";
  }
  return (
    <button type="button" className="uye-cikis" onClick={cikis}>
      Çıkış yap
    </button>
  );
}
