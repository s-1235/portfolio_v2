"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Pose = "center" | "left" | "right" | "down" | "down-left" | "down-right";

const POSES: Record<Pose, string> = {
  center: "/profile.png",
  left: "/profile-left.png",
  right: "/profile-right.png",
  down: "/profile-down.png",
  "down-left": "/profile-down-left.png",
  "down-right": "/profile-down-right.png",
};

/** Circular portrait whose photo swaps between real pre-rendered head poses as
 *  the cursor moves, so the head visibly turns toward the pointer (a photo-set
 *  swap, not a CSS tilt). Plain <img> so every swap is instant off the browser
 *  cache, no Next/Image re-fetch per pose. Static under prefers-reduced-motion. */
export default function PortraitTilt() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<Pose>("center");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      Object.values(POSES).map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / 420;
      const dy = (e.clientY - cy) / 420;

      let next: Pose = "center";
      if (dy > 0.3 && dx > 0.25) next = "down-right";
      else if (dy > 0.3 && dx < -0.25) next = "down-left";
      else if (dy > 0.3) next = "down";
      else if (dx > 0.25) next = "right";
      else if (dx < -0.25) next = "left";
      setPose(next);
    };
    const onLeave = () => setPose("center");
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
        className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-line sm:h-52 sm:w-52"
      >
        <Image
          src="/profile.png"
          alt="Sadam Khan"
          width={640}
          height={640}
          sizes="(min-width: 640px) 208px, 176px"
          priority
          className={`h-full w-full object-cover ${ready ? "hidden" : ""}`}
        />
        {ready && (
          // Pose swap must read straight from the browser cache warmed above;
          // next/image re-fetches an optimized URL per src change and would
          // show a loading flash on every pose swap.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={POSES[pose]}
            alt="Sadam Khan"
            width={640}
            height={640}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
