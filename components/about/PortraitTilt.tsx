"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Circular portrait that tilts gently toward the cursor, over a soft accent
 *  halo. Pure transforms, no dependencies; static under reduced motion. */
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
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 450));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 450));
      el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${dy * -8}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative shrink-0">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-full bg-accent/20 blur-2xl"
      />
      <div
        ref={ref}
        className="relative h-44 w-44 transition-transform duration-200 ease-out sm:h-52 sm:w-52"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/profile.png"
          alt="Sadam Khan"
          width={640}
          height={640}
          sizes="(min-width: 640px) 208px, 176px"
          priority
          className="rounded-full border-2 border-line"
        />
      </div>
    </div>
  );
}
