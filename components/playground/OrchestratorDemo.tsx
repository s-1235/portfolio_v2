"use client";

import { useEffect, useRef, useState } from "react";

type NodeDef = {
  id: string;
  label: string;
  detail: string;
  deps: string[];
  baseMs: number;
  tokens: number;
  tool?: boolean;
};

const DAG: NodeDef[] = [
  { id: "plan", label: "Planner", detail: "decompose request", deps: [], baseMs: 400, tokens: 400 },
  { id: "docs", label: "Search docs", detail: "tool call", deps: ["plan"], baseMs: 800, tokens: 900, tool: true },
  { id: "code", label: "Search code", detail: "tool call", deps: ["plan"], baseMs: 1000, tokens: 1200, tool: true },
  { id: "ctx", label: "Fetch context", detail: "tool call", deps: ["plan"], baseMs: 650, tokens: 700, tool: true },
  { id: "draft", label: "Drafter", detail: "synthesize from docs + code", deps: ["docs", "code"], baseMs: 1200, tokens: 2500 },
  { id: "cite", label: "Citations", detail: "ground claims in context", deps: ["ctx"], baseMs: 550, tokens: 600 },
  { id: "critic", label: "Critic", detail: "score and gate the merge", deps: ["draft", "cite"], baseMs: 900, tokens: 1500 },
  { id: "final", label: "Finalizer", detail: "merge and emit answer", deps: ["critic"], baseMs: 400, tokens: 300 },
];

const COLUMNS: string[][] = [
  ["plan"],
  ["docs", "code", "ctx"],
  ["draft", "cite"],
  ["critic"],
  ["final"],
];

type NodeStatus =
  | "idle"
  | "running"
  | "retrying"
  | "done"
  | "failed"
  | "skipped";

type NodeState = {
  status: NodeStatus;
  attempts: number;
  ms: number;
  tokens: number;
};

type Metrics = {
  wallMs: number;
  attempts: number;
  retries: number;
  tokens: number;
  done: number;
  failed: number;
  skipped: number;
};

/** Deterministic PRNG so every run is reproducible by seed. */
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

const freshNodes = (): Record<string, NodeState> =>
  Object.fromEntries(
    DAG.map((n) => [n.id, { status: "idle", attempts: 0, ms: 0, tokens: 0 }]),
  );

const statusStyle: Record<NodeStatus, string> = {
  idle: "border-line bg-surface text-muted",
  running: "border-accent bg-accent-soft/40 text-ink",
  retrying: "border-amber-500 bg-amber-50 text-ink dark:bg-amber-500/15",
  done: "border-ink bg-surface text-ink",
  failed: "border-red-500 bg-red-50 text-ink dark:bg-red-500/15",
  skipped: "border-line bg-bg text-muted opacity-60",
};

const statusDot: Record<NodeStatus, string> = {
  idle: "bg-line",
  running: "bg-accent animate-pulse motion-reduce:animate-none",
  retrying: "bg-amber-500 animate-pulse motion-reduce:animate-none",
  done: "bg-ink",
  failed: "bg-red-500",
  skipped: "bg-line",
};

export default function OrchestratorDemo() {
  const [concurrency, setConcurrency] = useState(2);
  const [failPct, setFailPct] = useState(25);
  const [retries, setRetries] = useState(2);
  const [budget, setBudget] = useState(12000);
  const [seed, setSeed] = useState(42);

  const [nodes, setNodes] = useState<Record<string, NodeState>>(freshNodes);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const cancelRef = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  function reset() {
    cancelRef.current = true;
    setRunning(false);
    setNodes(freshNodes());
    setLog([]);
    setMetrics(null);
  }

  async function run() {
    cancelRef.current = false;
    setRunning(true);
    setMetrics(null);
    setLog([]);
    const state = freshNodes();
    setNodes({ ...state });

    const rng = mulberry32(seed);
    const t0 = performance.now();
    const stamp = () =>
      String(Math.round(performance.now() - t0)).padStart(5, "0");
    const emit = (line: string) => setLog((l) => [...l, `${stamp()}  ${line}`]);
    const patch = (id: string, p: Partial<NodeState>) => {
      state[id] = { ...state[id], ...p };
      setNodes({ ...state });
    };
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    let spent = 0;
    let attempts = 0;
    let retriesUsed = 0;
    let active = 0;
    const launched = new Set<string>();

    emit(`run started: seed ${seed}, concurrency ${concurrency}, tool failure ${failPct}%, retries ${retries}, budget ${budget} tokens`);

    const launch = (def: NodeDef) => {
      launched.add(def.id);
      active++;
      (async () => {
        const started = performance.now();
        for (let attempt = 1; attempt <= retries + 1; attempt++) {
          if (cancelRef.current) break;
          if (spent + def.tokens > budget) {
            emit(`${def.label}: budget exhausted (${spent}/${budget} tokens), aborting node`);
            patch(def.id, { status: "failed" });
            break;
          }
          spent += def.tokens;
          attempts++;
          patch(def.id, {
            status: attempt === 1 ? "running" : "retrying",
            attempts: attempt,
            tokens: state[def.id].tokens + def.tokens,
          });
          if (attempt === 1) emit(`${def.label}: started`);
          const dur = def.baseMs * (0.7 + rng() * 0.6);
          await sleep(dur);
          if (cancelRef.current) break;
          const failP = def.tool ? failPct / 100 : 0.03;
          if (rng() < failP) {
            if (attempt <= retries) {
              retriesUsed++;
              const backoff = 300 * 2 ** (attempt - 1);
              emit(`${def.label}: attempt ${attempt} failed, retrying in ${backoff}ms`);
              await sleep(backoff);
              continue;
            }
            emit(`${def.label}: failed after ${attempt} attempts`);
            patch(def.id, { status: "failed" });
            break;
          }
          patch(def.id, {
            status: "done",
            ms: Math.round(performance.now() - started),
          });
          emit(`${def.label}: done in ${Math.round(performance.now() - started)}ms (attempt ${attempt})`);
          break;
        }
        active--;
      })();
    };

    // Scheduler loop: resolve deps, cascade skips, launch under the cap.
    while (!cancelRef.current) {
      for (const def of DAG) {
        if (launched.has(def.id) || state[def.id].status !== "idle") continue;
        if (
          def.deps.some((d) =>
            ["failed", "skipped"].includes(state[d].status),
          )
        ) {
          patch(def.id, { status: "skipped" });
          emit(`${def.label}: skipped (upstream failure)`);
        }
      }
      const terminal = DAG.every((d) =>
        ["done", "failed", "skipped"].includes(state[d.id].status),
      );
      if (terminal) break;
      for (const def of DAG) {
        if (active >= concurrency) break;
        if (launched.has(def.id) || state[def.id].status !== "idle") continue;
        if (def.deps.every((d) => state[d].status === "done")) launch(def);
      }
      await sleep(50);
    }

    const wallMs = Math.round(performance.now() - t0);
    const counts = { done: 0, failed: 0, skipped: 0 };
    DAG.forEach((d) => {
      const s = state[d.id].status;
      if (s === "done") counts.done++;
      else if (s === "failed") counts.failed++;
      else if (s === "skipped") counts.skipped++;
    });
    if (!cancelRef.current) {
      emit(
        `run complete: ${counts.done}/${DAG.length} nodes succeeded, ${spent} tokens, ${wallMs}ms wall time`,
      );
      setMetrics({
        wallMs,
        attempts,
        retries: retriesUsed,
        tokens: spent,
        ...counts,
      });
    } else {
      emit("run cancelled");
    }
    setRunning(false);
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="mb-6 grid gap-4 sm:grid-cols-5">
        <label className="block text-sm">
          <span className="mb-1 block font-mono text-[11px] tracking-wider uppercase text-muted">
            Concurrency
          </span>
          <select
            value={concurrency}
            onChange={(e) => setConcurrency(Number(e.target.value))}
            disabled={running}
            className="w-full rounded-lg border border-line bg-bg px-2 py-1.5"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} worker{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-mono text-[11px] tracking-wider uppercase text-muted">
            Tool failure {failPct}%
          </span>
          <input
            type="range"
            min={0}
            max={60}
            step={5}
            value={failPct}
            onChange={(e) => setFailPct(Number(e.target.value))}
            disabled={running}
            className="w-full accent-[var(--accent)]"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-mono text-[11px] tracking-wider uppercase text-muted">
            Max retries
          </span>
          <select
            value={retries}
            onChange={(e) => setRetries(Number(e.target.value))}
            disabled={running}
            className="w-full rounded-lg border border-line bg-bg px-2 py-1.5"
          >
            {[0, 1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-mono text-[11px] tracking-wider uppercase text-muted">
            Token budget
          </span>
          <select
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            disabled={running}
            className="w-full rounded-lg border border-line bg-bg px-2 py-1.5"
          >
            <option value={6000}>6,000</option>
            <option value={12000}>12,000</option>
            <option value={24000}>24,000</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-mono text-[11px] tracking-wider uppercase text-muted">
            Seed
          </span>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value) || 0)}
            disabled={running}
            className="w-full rounded-lg border border-line bg-bg px-2 py-1.5"
          />
        </label>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => (running ? (cancelRef.current = true) : run())}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          {running ? "Cancel" : "Run"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={running}
          className="rounded-full border border-line px-5 py-2 text-sm font-medium transition hover:border-ink disabled:opacity-40"
        >
          Reset
        </button>
        <span className="ml-auto font-mono text-[11px] tracking-wider uppercase text-muted">
          Real engine · reproducible by seed
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        {COLUMNS.map((col, ci) => (
          <div key={ci} className="space-y-3">
            {col.map((id) => {
              const def = DAG.find((d) => d.id === id)!;
              const st = nodes[id];
              return (
                <div
                  key={id}
                  className={`rounded-xl border p-3 transition ${statusStyle[st.status]}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${statusDot[st.status]}`}
                    />
                    <span className="truncate text-sm font-medium">
                      {def.label}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs opacity-70">
                    {def.detail}
                  </p>
                  <p className="mt-1 text-xs opacity-70">
                    {st.status}
                    {st.attempts > 1 ? ` (attempt ${st.attempts})` : ""}
                    {st.status === "done" ? ` · ${st.ms}ms` : ""}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {metrics && (
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-4">
          <div className="rounded-xl border border-line bg-bg p-4">
            <p className="font-mono text-[11px] tracking-wider uppercase text-muted">
              Wall time
            </p>
            <p className="mt-1 font-medium">{metrics.wallMs}ms</p>
          </div>
          <div className="rounded-xl border border-line bg-bg p-4">
            <p className="font-mono text-[11px] tracking-wider uppercase text-muted">
              Attempts / retries
            </p>
            <p className="mt-1 font-medium">
              {metrics.attempts} / {metrics.retries}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-bg p-4">
            <p className="font-mono text-[11px] tracking-wider uppercase text-muted">
              Tokens spent
            </p>
            <p className="mt-1 font-medium">
              {metrics.tokens.toLocaleString()} / {budget.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-bg p-4">
            <p className="font-mono text-[11px] tracking-wider uppercase text-muted">
              Nodes
            </p>
            <p className="mt-1 font-medium">
              {metrics.done} done · {metrics.failed} failed · {metrics.skipped}{" "}
              skipped
            </p>
          </div>
        </div>
      )}

      <div
        ref={logRef}
        className="mt-6 h-44 overflow-y-auto rounded-xl bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-200"
      >
        {log.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        {log.length === 0 && (
          <p className="opacity-50">
            Set the knobs and press Run.
          </p>
        )}
      </div>
    </div>
  );
}
