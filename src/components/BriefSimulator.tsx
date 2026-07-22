import { useEffect, useRef, useState } from "react";
import { decompose, presets, type Brief, type Receipt } from "../sim/decompose";
import { useReducedMotion } from "../hooks";

const STAGE_ORDER = ["scope", "model", "data", "infra", "product", "plan", "risks", "receipts"];

function ReceiptChips({ receipts }: { receipts: Receipt[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {receipts.map((r, i) => (
        <a
          key={i}
          href={`#work`}
          onClick={() => {
            window.dispatchEvent(new CustomEvent("focus-project", { detail: r.projectId }));
          }}
          className="group inline-flex items-center gap-1.5 rounded-md border border-[var(--color-acid)]/25 bg-[var(--color-acid)]/[0.05] px-2.5 py-1.5 text-[12px] text-txt hover:border-[var(--color-acid)]/60 hover:bg-[var(--color-acid)]/10 transition-colors"
        >
          <span className="acid-text">▸</span>
          {r.label}
          <span className="text-dim group-hover:text-acid transition-colors">↗</span>
        </a>
      ))}
    </div>
  );
}

export default function BriefSimulator() {
  const reduced = useReducedMotion();
  const [input, setInput] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [typed, setTyped] = useState<string[][]>([]);
  const [progress, setProgress] = useState(0); // completed stage count
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const cancelRef = useRef(false);
  const logRef = useRef<HTMLDivElement | null>(null);

  const run = (text: string) => {
    const b = decompose(text);
    cancelRef.current = false;
    setBrief(b);
    setTyped(b.stages.map(() => []));
    setProgress(0);
    setPhase("running");
  };

  // typewriter driver
  useEffect(() => {
    if (phase !== "running" || !brief) return;

    if (reduced) {
      setTyped(brief.stages.map((s) => s.lines.slice()));
      setProgress(brief.stages.length);
      setPhase("done");
      return;
    }

    let sIdx = 0;
    let lIdx = 0;
    let cIdx = 0;
    let timer: ReturnType<typeof setTimeout>;
    const CHARS = 2; // chars per tick

    const step = () => {
      if (cancelRef.current) return;
      const stage = brief.stages[sIdx];
      if (!stage) {
        setPhase("done");
        return;
      }
      const line = stage.lines[lIdx] ?? "";
      cIdx = Math.min(line.length, cIdx + CHARS);
      setTyped((prev) => {
        const next = prev.map((a) => a.slice());
        next[sIdx][lIdx] = line.slice(0, cIdx);
        return next;
      });

      if (cIdx >= line.length) {
        lIdx++;
        cIdx = 0;
        if (lIdx >= stage.lines.length) {
          const finished = sIdx + 1;
          setProgress(finished);
          sIdx++;
          lIdx = 0;
          timer = setTimeout(step, 300);
          return;
        }
        timer = setTimeout(step, 120);
        return;
      }
      timer = setTimeout(step, 12);
    };

    timer = setTimeout(step, 160);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, brief, reduced]);

  const skip = () => {
    if (!brief) return;
    cancelRef.current = true;
    setTyped(brief.stages.map((s) => s.lines.slice()));
    setProgress(brief.stages.length);
    setPhase("done");
  };

  const reset = () => {
    cancelRef.current = true;
    setBrief(null);
    setTyped([]);
    setProgress(0);
    setPhase("idle");
    setInput("");
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    run(input.trim());
  };

  return (
    <div className="panel overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-line)] bg-white/[0.015]">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/70" />
        </span>
        <span className="mono text-[11px] text-dim ml-1">fde.sim — kd@rig</span>
        <span className="ml-auto mono text-[10px] text-dim hidden sm:inline">
          {phase === "running" ? "decomposing…" : phase === "done" ? "complete" : "ready"}
        </span>
      </div>

      <div className="p-4 md:p-6">
        {/* prompt */}
        <form onSubmit={submit}>
          <label className="label block mb-2">describe an ambiguous 0→1 problem</label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="flex items-start gap-2 flex-1 rounded-lg border border-[var(--color-line-bright)] bg-black/30 px-3 py-2.5 focus-within:border-[var(--color-acid)]/50 transition-colors">
              <span className="acid-text mono text-sm mt-0.5">$</span>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(e);
                  }
                }}
                rows={1}
                placeholder="e.g. build us a voice assistant for a low-resource language…"
                className="flex-1 resize-none bg-transparent text-[14px] text-txt placeholder:text-dim outline-none mono leading-relaxed"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-acid px-5 py-2.5 text-[14px] font-semibold text-bg hover:bg-acid/90 transition-colors"
            >
              Scope it →
            </button>
          </div>
        </form>

        {/* presets */}
        {phase === "idle" && (
          <div className="mt-4">
            <div className="label mb-2">or try one</div>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setInput(p.prompt);
                    run(p.prompt);
                  }}
                  className="text-[12.5px] text-muted border border-[var(--color-line)] rounded-full px-3 py-1.5 hover:border-[var(--color-acid)]/40 hover:text-acid transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* output */}
        {brief && (
          <div className="mt-6">
            {/* stage progress rail */}
            <div className="flex flex-wrap items-center gap-1.5 mb-5">
              {STAGE_ORDER.map((label) => {
                const idx = brief.stages.findIndex((s) => s.label === label);
                const active = idx >= 0 && idx < progress;
                const current = idx === progress && phase === "running";
                if (idx < 0) return null;
                return (
                  <span
                    key={label}
                    className={`mono text-[10px] px-2 py-1 rounded transition-colors ${
                      active
                        ? "text-acid bg-[var(--color-acid)]/10"
                        : current
                          ? "text-txt bg-white/5"
                          : "text-dim"
                    }`}
                  >
                    {label}
                    {active && " ✓"}
                  </span>
                );
              })}
            </div>

            {/* read-back */}
            <p className="text-[14px] text-muted mb-5 leading-relaxed">
              <span className="acid-text mono">I hear:</span>{" "}
              <span className="text-txt">{brief.read}</span>
            </p>

            <div ref={logRef} className="space-y-5">
              {brief.stages.map((stage, si) => {
                const lines = typed[si] ?? [];
                if (lines.length === 0) return null;
                const stageDone = si < progress;
                return (
                  <div key={stage.id} className="border-l-2 border-[var(--color-line-bright)] pl-4">
                    <div className="mono text-[11px] tracking-wide acid-text uppercase mb-1.5">
                      ▸ {stage.label}
                    </div>
                    <div className="space-y-1.5">
                      {lines.map((ln, li) => (
                        <p key={li} className="text-[13.5px] md:text-[14px] text-txt/90 leading-relaxed">
                          {ln}
                        </p>
                      ))}
                    </div>
                    {stageDone && stage.receipts && stage.receipts.length > 0 && (
                      <ReceiptChips receipts={stage.receipts} />
                    )}
                  </div>
                );
              })}
              {phase === "running" && (
                <span className="mono text-acid blink inline-block">▋</span>
              )}
            </div>

            {/* controls */}
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[var(--color-line)]">
              {phase === "running" && (
                <button
                  onClick={skip}
                  className="mono text-[12px] text-muted hover:text-acid transition-colors"
                >
                  skip ▸▸
                </button>
              )}
              {phase === "done" && (
                <>
                  <button
                    onClick={reset}
                    className="text-[13px] font-medium text-bg bg-acid rounded-md px-4 py-2 hover:bg-acid/90 transition-colors"
                  >
                    ↺ Try another brief
                  </button>
                  <a
                    href="#contact"
                    className="text-[13px] text-muted hover:text-acid transition-colors"
                  >
                    …or just talk to me →
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
