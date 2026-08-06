"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Circular portrait that follows the cursor: the frame tilts and the photo
 *  pans inside the circular mask, so the head visibly turns toward the
 *  pointer. Static under prefers-reduced-motion. */
export default function PortraitTilt() {
  const frameRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const pan = panRef.current;
    if (!frame || !pan) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 420));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 420));
      frame.style.transform = `perspective(700px) rotateY(${dx * 10}deg) rotateX(${dy * -10}deg)`;
      pan.style.transform = `translate(${dx * 12}px, ${dy * 10}px) scale(1.1)`;
    };
    const onLeave = () => {
      frame.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg)";
      pan.style.transform = "translate(0px, 0px) scale(1.1)";
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
        ref={frameRef}
        className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-line transition-transform duration-200 ease-out sm:h-52 sm:w-52"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={panRef}
          className="h-full w-full transition-transform duration-200 ease-out"
          style={{ transform: "scale(1.1)" }}
        >
          <Image
            src="/profile.png"
            alt="Sadam Khan"
            width={640}
            height={640}
            sizes="(min-width: 640px) 208px, 176px"
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
