"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Portrait that tilts gently toward the cursor. Pure transforms, no
 *  dependencies; static under prefers-reduced-motion. */
export default function PortraitTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 500));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 500));
      el.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${dy * -7}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-48 shrink-0 transition-transform duration-200 ease-out sm:w-60"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Image
        src="/profile.png"
        alt="Sadam Khan"
        width={720}
        height={1080}
        sizes="(min-width: 640px) 240px, 192px"
        priority
        className="rounded-2xl border border-line"
      />
    </div>
  );
}
