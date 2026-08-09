/** Marka kilidi: şarj animasyonlu güneş paneli + mevcut yazı stili (yatay). */
export default function Marka() {
  return (
    <>
      <span className="marka-panel" aria-hidden="true">
        <span className="marka-grid">
          {Array.from({ length: 9 }).map((_, i) => (
            <i key={i} />
          ))}
        </span>
        <span className="marka-sweep" />
      </span>
      <span className="brand-yazi">
        gesdanismani
        <i>.com</i>
      </span>
    </>
  );
}
