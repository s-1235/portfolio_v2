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

type PulseEdge = { a: THREE.Vector3; b: THREE.Vector3; phase: number };

/** Clusters of agent nodes around purple hubs, hubs wired to each other:
 *  organizations of agents connected by workflows. */
function buildGraph() {
  const rng = mulberry32(11);
  const K = 6;
  const golden = Math.PI * (3 - Math.sqrt(5));

  const hubs: THREE.Vector3[] = [];
  for (let i = 0; i < K; i++) {
    const y = 1 - (i / (K - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i * 2.0 + 0.6;
    const scale = 0.95 + rng() * 0.2;
    hubs.push(
      new THREE.Vector3(
        Math.cos(theta) * r * scale,
        y * scale,
        Math.sin(theta) * r * scale,
      ),
    );
  }

  const base: number[] = [];
  const intra: number[] = [];
  hubs.forEach((hub) => {
    const m = 9 + Math.floor(rng() * 5);
    const members: THREE.Vector3[] = [];
    for (let j = 0; j < m; j++) {
      const dir = new THREE.Vector3(
        rng() - 0.5,
        rng() - 0.5,
        rng() - 0.5,
      ).normalize();
      const p = hub.clone().add(dir.multiplyScalar(0.12 + rng() * 0.26));
      members.push(p);
      base.push(p.x, p.y, p.z);
      // every agent reports to its hub
      intra.push(p.x, p.y, p.z, hub.x, hub.y, hub.z);
    }
    // a few peer links inside the cluster
    for (let j = 0; j < members.length; j += 3) {
      const q = members[(j + 1) % members.length];
      intra.push(members[j].x, members[j].y, members[j].z, q.x, q.y, q.z);
    }
  });

  // Org-to-org workflows: a ring through all hubs guarantees one connected
  // network, plus one cross-link per hub for redundancy.
  const seen = new Set<string>();
  const inter: number[] = [];
  const pulses: PulseEdge[] = [];
  const addEdge = (i: number, j: number) => {
    const key = [Math.min(i, j), Math.max(i, j)].join("-");
    if (seen.has(key)) return;
    seen.add(key);
    const h = hubs[i];
    const q = hubs[j];
    inter.push(h.x, h.y, h.z, q.x, q.y, q.z);
    pulses.push({ a: h.clone(), b: q.clone(), phase: rng() });
  };
  for (let i = 0; i < K; i++) addEdge(i, (i + 1) % K);
  for (let i = 0; i < K; i += 2) addEdge(i, (i + 3) % K);

  const hubArr: number[] = [];
  hubs.forEach((h) => hubArr.push(h.x, h.y, h.z));

  return {
    base: new Float32Array(base),
    hubs: new Float32Array(hubArr),
    intra: new Float32Array(intra),
    inter: new Float32Array(inter),
    pulses,
  };
}

function Graph({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulseAttr = useRef<THREE.BufferAttribute>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const time = useRef(0);
  const g = useMemo(() => buildGraph(), []);
  const pulsePositions = useMemo(
    () => new Float32Array(g.pulses.length * 3),
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
    // Pulses travel hub to hub along the workflow edges.
    g.pulses.forEach((e, i) => {
      const u = reduce ? e.phase : (time.current * 0.12 + e.phase) % 1;
      pulsePositions[i * 3] = e.a.x + (e.b.x - e.a.x) * u;
      pulsePositions[i * 3 + 1] = e.a.y + (e.b.y - e.a.y) * u;
      pulsePositions[i * 3 + 2] = e.a.z + (e.b.z - e.a.z) * u;
    });
    if (pulseAttr.current) pulseAttr.current.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0.35, 0.4, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.base, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#18181b" size={0.03} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.hubs, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8000ff" size={0.075} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.intra, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#c9c9ce" transparent opacity={0.4} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[g.inter, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8000ff" transparent opacity={0.45} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={pulseAttr}
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#8000ff" size={0.05} sizeAttenuation />
      </points>
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
