"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Deterministic PRNG so the graph is identical on every load. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rng = mulberry32(7);
  const n = 96;
  const pts: THREE.Vector3[] = [];
  // Fibonacci sphere with radius jitter, so it reads organic, not CAD.
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = 1.05 + rng() * 0.25;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r * jitter,
        y * jitter,
        Math.sin(theta) * r * jitter,
      ),
    );
  }
  const accentIdx = new Set<number>();
  for (let i = 0; i < n; i += 8) accentIdx.add(i);

  const base: number[] = [];
  const accent: number[] = [];
  pts.forEach((p, i) => {
    (accentIdx.has(i) ? accent : base).push(p.x, p.y, p.z);
  });

  // Connect each node to its 2 nearest neighbours.
  const lines: number[] = [];
  const accentLines: number[] = [];
  pts.forEach((p, i) => {
    const dists = pts
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j } of dists) {
      const target = accentIdx.has(i) || accentIdx.has(j) ? accentLines : lines;
      target.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z);
    }
  });

  return {
    base: new Float32Array(base),
    accent: new Float32Array(accent),
    lines: new Float32Array(lines),
    accentLines: new Float32Array(accentLines),
  };
}

function Graph({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const g = useMemo(() => buildGraph(), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (!group.current || reduce) return;
    const gr = group.current;
    gr.rotation.y += dt * 0.07;
    gr.rotation.x += (pointer.current.y * 0.22 - gr.rotation.x + 0.35) * 0.03;
    gr.rotation.z += (pointer.current.x * 0.12 - gr.rotation.z) * 0.03;
  });

  return (
    <group ref={group} rotation={[0.35, 0.4, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.base, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#18181b" size={0.032} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.accent, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8000ff" size={0.055} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#c9c9ce" transparent opacity={0.45} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[g.accentLines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8000ff" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

export default function HeroGraph() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.9], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Graph reduce={reduce} />
    </Canvas>
  );
}
