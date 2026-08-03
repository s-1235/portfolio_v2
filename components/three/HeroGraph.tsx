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

type PulseEdge = {
  a: THREE.Vector3;
  b: THREE.Vector3;
  phase: number;
  speed: number;
};

/** Icon sprite: purple rounded chip with a white glyph, for the data pulses. */
function makeIconTexture(glyph: string) {
  const size = 96;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.beginPath();
  ctx.roundRect(6, 6, size - 12, size - 12, 26);
  ctx.fillStyle = "#8000ff";
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 44px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph, size / 2, size / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 2;
  return tex;
}

/** Dense sphere mesh with hub nodes; pulses on every edge, iconed pulses on
 *  the hub-to-hub workflow links. */
function buildGraph() {
  const rng = mulberry32(7);
  const n = 96;
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = 1.08 + rng() * 0.14;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r * jitter,
        y * jitter,
        Math.sin(theta) * r * jitter,
      ),
    );
  }

  const hubIdx: number[] = [];
  for (let k = 0; k < 6; k++) hubIdx.push(Math.floor((k + 0.5) * (n / 6)));
  const hubSet = new Set(hubIdx);

  const base: number[] = [];
  const hubArr: number[] = [];
  pts.forEach((p, i) => {
    (hubSet.has(i) ? hubArr : base).push(p.x, p.y, p.z);
  });

  // Mesh: every node wired to its 2 nearest neighbours, deduped, with a
  // small pulse riding every edge.
  const seenMesh = new Set<string>();
  const lines: number[] = [];
  const meshPulses: PulseEdge[] = [];
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const key = [Math.min(i, j), Math.max(i, j)].join("-");
        if (seenMesh.has(key)) return;
        seenMesh.add(key);
        const q = pts[j];
        lines.push(p.x, p.y, p.z, q.x, q.y, q.z);
        meshPulses.push({
          a: p.clone(),
          b: q.clone(),
          phase: rng(),
          speed: 0.05 + rng() * 0.06,
        });
      });
  });

  // Communication layer: hubs in a ring plus cross-links.
  const seen = new Set<string>();
  const inter: number[] = [];
  const hubPulses: PulseEdge[] = [];
  const addEdge = (i: number, j: number) => {
    const key = [Math.min(i, j), Math.max(i, j)].join("-");
    if (seen.has(key)) return;
    seen.add(key);
    const h = pts[hubIdx[i]];
    const q = pts[hubIdx[j]];
    inter.push(h.x, h.y, h.z, q.x, q.y, q.z);
    hubPulses.push({
      a: h.clone(),
      b: q.clone(),
      phase: rng(),
      speed: 0.1 + rng() * 0.05,
    });
  };
  for (let i = 0; i < hubIdx.length; i++) addEdge(i, (i + 1) % hubIdx.length);
  for (let i = 0; i < hubIdx.length; i += 2)
    addEdge(i, (i + 3) % hubIdx.length);

  return {
    base: new Float32Array(base),
    hubs: new Float32Array(hubArr),
    lines: new Float32Array(lines),
    inter: new Float32Array(inter),
    meshPulses,
    hubPulses,
  };
}

function advance(
  edges: PulseEdge[],
  buf: Float32Array,
  t: number,
  reduce: boolean,
  stride = 1,
  offset = 0,
) {
  let w = 0;
  for (let i = offset; i < edges.length; i += stride) {
    const e = edges[i];
    const u = reduce ? e.phase : (t * e.speed + e.phase) % 1;
    buf[w * 3] = e.a.x + (e.b.x - e.a.x) * u;
    buf[w * 3 + 1] = e.a.y + (e.b.y - e.a.y) * u;
    buf[w * 3 + 2] = e.a.z + (e.b.z - e.a.z) * u;
    w++;
  }
}

function Graph({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const meshAttr = useRef<THREE.BufferAttribute>(null);
  const iconAttrs = useRef<(THREE.BufferAttribute | null)[]>([
    null,
    null,
    null,
  ]);
  const pointer = useRef({ x: 0, y: 0 });
  const time = useRef(0);
  const g = useMemo(() => buildGraph(), []);
  const icons = useMemo(
    () => [makeIconTexture("{}"), makeIconTexture("✓"), makeIconTexture("⇅")],
    [],
  );

  const meshBuf = useMemo(() => new Float32Array(g.meshPulses.length * 3), [g]);
  const iconBufs = useMemo(
    () =>
      [0, 1, 2].map(
        (k) => new Float32Array(Math.ceil((g.hubPulses.length - k) / 3) * 3),
      ),
    [g],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (!group.current) return;
    const gr = group.current;
    if (!reduce) {
      gr.rotation.y += dt * 0.07;
      gr.rotation.x += (pointer.current.y * 0.22 - gr.rotation.x + 0.35) * 0.03;
      gr.rotation.z += (pointer.current.x * 0.12 - gr.rotation.z) * 0.03;
      time.current += dt;
    }
    advance(g.meshPulses, meshBuf, time.current, reduce);
    if (meshAttr.current) meshAttr.current.needsUpdate = true;
    for (let k = 0; k < 3; k++) {
      advance(g.hubPulses, iconBufs[k], time.current, reduce, 3, k);
      const attr = iconAttrs.current[k];
      if (attr) attr.needsUpdate = true;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0.4, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.base, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#18181b"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.hubs, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#8000ff"
          size={0.075}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#b9b9bf"
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.inter, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8000ff"
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={meshAttr}
            attach="attributes-position"
            args={[meshBuf, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#8000ff"
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
      {icons.map((tex, k) => (
        <points key={k}>
          <bufferGeometry>
            <bufferAttribute
              ref={(el: THREE.BufferAttribute | null) => {
                iconAttrs.current[k] = el;
              }}
              attach="attributes-position"
              args={[iconBufs[k], 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            map={tex}
            size={0.16}
            sizeAttenuation
            transparent
            alphaTest={0.1}
            depthWrite={false}
          />
        </points>
      ))}
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
      camera={{ position: [0, 0, 9], fov: 22 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Graph reduce={reduce} />
    </Canvas>
  );
}
