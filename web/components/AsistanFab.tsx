"use client";

import { usePathname } from "next/navigation";
import { Sohbet } from "./Icons";

/** Yüzen asistan düğmesi — sohbet sayfasının kendisi hariç her sayfada. */
export default function AsistanFab() {
  const yol = usePathname();
  if (yol?.startsWith("/asistan")) return null;
  return (
    <a className="gt-btn fab" href="/asistan" aria-label="GES Asistanı ile sohbet edin">
      <span className="dot" aria-hidden="true" />
      <Sohbet className="i" />
      GES Asistanı
    </a>
  );
}
