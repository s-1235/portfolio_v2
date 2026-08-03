"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroGraph = dynamic(() => import("./HeroGraph"), { ssr: false });

/** Desktop-only, lazy-loaded 3D hero ornament. Renders nothing below lg
 *  so phones never pay the WebGL cost. */
export default function Hero3D() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => setShow(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  if (!show) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[540px] w-[500px] -translate-y-1/2 lg:block"
    >
      <HeroGraph />
    </div>
  );
}
