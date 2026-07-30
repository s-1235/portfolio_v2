"use client";

import { useEffect, useRef, useState } from "react";

type NodeId = "planner" | "worker-a" | "worker-b" | "worker-c" | "judge";
type NodeStatus = "idle" | "running" | "retry" | "done";

type Step = {
  node?: NodeId;
  status?: NodeStatus;
  log: string;
};

const SCRIPT: Step[] = [
  { log: "Request: summarize the three strongest sources on a topic." },
  {
    node: "planner",
    status: "running",
    log: "Planner: decomposing the request into three parallel subtasks.",
  },
  {
    node: "planner",
    status: "done",
    log: "Planner: dispatching subtasks to workers A, B, and C.",
  },
  {
    node: "worker-a",
    status: "running",
    log: "Worker A: searching and reading source candidates.",
  },
  {
    node: "worker-b",
    status: "running",
    log: "Worker B: searching a second index in parallel.",
  },
  {
    node: "worker-c",
    status: "running",
    log: "Worker C: extracting citations from the reference set.",
  },
  {
    node: "worker-a",
    status: "done",
    log: "Worker A: draft summary ready (2 sources).",
  },
  {
    node: "worker-b",
    status: "retry",
    log: "Worker B: tool call failed, retrying with backoff.",
  },
  {
    node: "worker-c",
    status: "done",
    log: "Worker C: citation list ready.",
  },
  {
    node: "worker-b",
    status: "done",
    log: "Worker B: recovered, draft ready (1 source).",
  },
  {
    node: "judge",
    status: "running",
    log: "Judge: scoring drafts for coverage and consistency.",
  },
  {
    node: "judge",
    status: "done",
    log: "Judge: merged the top-scoring material into one answer.",
  },
  { log: "Final answer returned. Pipeline complete." },
];

const NODES: { id: NodeId; label: string; detail: string }[] = [
  { id: "planner", label: "Planner", detail: "decomposes the task" },
  { id: "worker-a", label: "Worker A", detail: "search + draft" },
  { id: "worker-b", label: "Worker B", detail: "search + draft" },
  { id: "worker-c", label: "Worker C", detail: "citations" },
  { id: "judge", label: "Judge", detail: "scores + merges" },
];

const statusStyle: Record<NodeStatus, string> = {
  idle: "border-line bg-surface text-muted",
  running: "border-accent bg-accent-soft/40 text-ink",
  retry: "border-amber-500 bg-amber-50 text-ink",
  done: "border-ink bg-surface text-ink",
};

const statusDot: Record<NodeStatus, string> = {
  idle: "bg-line",
  running: "bg-accent animate-pulse motion-reduce:animate-none",
  retry: "bg-amber-500 animate-pulse motion-reduce:animate-none",
  done: "bg-ink",
};

function deriveStatuses(step: number): Record<NodeId, NodeStatus> {
  const s: Record<NodeId, NodeStatus> = {
    planner: "idle",
    "worker-a": "idle",
    "worker-b": "idle",
    "worker-c": "idle",
    judge: "idle",
  };
  SCRIPT.slice(0, step).forEach((e) => {
    if (e.node && e.status) s[e.node] = e.status;
  });
  return s;
}

export default function AgentPipelineDemo() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const finished = step >= SCRIPT.length;
  const statuses = deriveStatuses(step);

  useEffect(() => {
    if (!playing || finished) return;
    const t = setTimeout(() => {
      const next = step + 1;
      setStep(next);
      if (next >= SCRIPT.length) setPlaying(false);
    }, 900);
    return () => clearTimeout(t);
  }, [playing, step, finished]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [step]);

  const columns: NodeId[][] = [
    ["planner"],
    ["worker-a", "worker-b", "worker-c"],
    ["judge"],
  ];

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (finished) setStep(0);
            setPlaying(!playing);
          }}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          {playing ? "Pause" : finished ? "Replay" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            if (!finished) setStep((n) => n + 1);
          }}
          disabled={finished}
          className="rounded-full border border-line px-5 py-2 text-sm font-medium transition hover:border-ink disabled:opacity-40"
        >
          Step
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setStep(0);
          }}
          className="rounded-full border border-line px-5 py-2 text-sm font-medium transition hover:border-ink"
        >
          Reset
        </button>
        <span className="ml-auto text-xs tracking-widest uppercase text-muted">
          Simulated run · {Math.min(step, SCRIPT.length)}/{SCRIPT.length}
        </span>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {columns.map((col, ci) => (
          <div key={ci} className="contents">
            {ci > 0 && (
              <div
                aria-hidden
                className="hidden text-center text-xl text-muted sm:block"
              >
                →
              </div>
            )}
            <div className="space-y-3">
              {col.map((id) => {
                const node = NODES.find((n) => n.id === id)!;
                const st = statuses[id];
                return (
                  <div
                    key={id}
                    className={`rounded-xl border p-4 transition ${statusStyle[st]}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${statusDot[st]}`}
                      />
                      <span className="text-sm font-medium">{node.label}</span>
                      <span className="ml-auto text-xs">{st}</span>
                    </div>
                    <p className="mt-1 text-xs opacity-70">{node.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div
        ref={logRef}
        className="mt-6 h-40 overflow-y-auto rounded-xl bg-ink p-4 font-mono text-xs leading-relaxed text-bg"
      >
        {SCRIPT.slice(0, step).map((e, i) => (
          <p key={i}>
            <span className="opacity-50">{String(i).padStart(2, "0")} </span>
            {e.log}
          </p>
        ))}
        {step === 0 && (
          <p className="opacity-50">Press Play or Step to run the pipeline.</p>
        )}
      </div>
    </div>
  );
}
