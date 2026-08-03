"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroGraph = dynamic(() => import("./HeroGraph"), { ssr: false });

/** The hero graph, visible to every visitor. Desktop gets the floating
 *  placement beside the headline; smaller screens get a fully-contained
 *  centered ornament above the text so no part of it is ever cut off. */
export default function Hero3D() {
  const [wide, setWide] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setWide(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  if (wide === null) return null;
  if (wide) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[460px] w-[420px] -translate-y-1/2"
      >
        <HeroGraph />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="pointer-events-none mx-auto mb-4 h-[300px] w-full max-w-[320px]"
    >
      <HeroGraph />
    </div>
  );
}
