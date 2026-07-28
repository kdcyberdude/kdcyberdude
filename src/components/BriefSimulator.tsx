import { useEffect, useRef, useState } from "react";
import { decompose, presets, type Brief, type Receipt } from "../sim/decompose";
import { useReducedMotion } from "../hooks";

const STAGE_ORDER = [
  "hear",
  "principles",
  "hypothesize",
  "measure",
  "experiment",
  "kill",
  "receipts",
];

function receiptTarget(projectId: string): string {
  if (projectId === "learningbench" || projectId === "harvestgym") return "research";
  return "work";
}

function ReceiptChips({ receipts }: { receipts: Receipt[] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {receipts.map((r, i) => (
        <a
          key={i}
          href={`#${receiptTarget(r.projectId)}`}
          onClick={() => {
            if (r.projectId === "learningbench") {
              document.getElementById("research")?.scrollIntoView({ behavior: "smooth" });
              return;
            }
            window.dispatchEvent(new CustomEvent("focus-project", { detail: r.projectId }));
          }}
          className="group inline-flex items-center gap-1.5 border border-[var(--color-acid)]/30 bg-[var(--color-acid)]/[0.06] px-2.5 py-1.5 text-[12px] text-txt hover:border-[var(--color-acid)]/70 transition-colors rounded-sm"
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
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const cancelRef = useRef(false);

  const run = (text: string) => {
    const b = decompose(text);
    cancelRef.current = false;
    setBrief(b);
    setTyped(b.stages.map(() => []));
    setProgress(0);
    setPhase("running");
  };

  useEffect(() => {
    if (phase !== "running" || !brief) return;

    if (reduced) {
      setTyped(brief.stages.map((s) => s.lines.slice()));
      setProgress(brief.stages.length);
      setPhase("done");
      return;
    }

    let cancelled = false;
    let sIdx = 0;
    let lIdx = 0;
    let cIdx = 0;
    let timer: ReturnType<typeof setTimeout>;
    const CHARS = 2;
    const stageCount = brief.stages.length;

    const step = () => {
      if (cancelled || cancelRef.current) return;
      const stage = brief.stages[sIdx];
      if (!stage) {
        setPhase("done");
        return;
      }
      const line = stage.lines[lIdx] ?? "";
      cIdx = Math.min(line.length, cIdx + CHARS);
      // Capture indices before setState — the updater runs later, and
      // sIdx/lIdx are mutated below when a line/stage finishes.
      const writeStage = sIdx;
      const writeLine = lIdx;
      const writeText = line.slice(0, cIdx);
      setTyped((prev) => {
        const next = Array.from({ length: stageCount }, (_, i) =>
          Array.isArray(prev[i]) ? prev[i].slice() : [],
        );
        const row = (next[writeStage] ?? []).slice();
        row[writeLine] = writeText;
        next[writeStage] = row;
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
          timer = setTimeout(step, 280);
          return;
        }
        timer = setTimeout(step, 110);
        return;
      }
      timer = setTimeout(step, 11);
    };

    timer = setTimeout(step, 140);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
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

  const researchPresets = presets.filter((p) => p.kind === "research");
  const buildPresets = presets.filter((p) => p.kind === "build");

  return (
    <div className="panel overflow-hidden shadow-[0_24px_60px_-40px_rgba(15,23,32,0.35)]">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-line)] bg-panel-2">
        <span className="mono text-[11px] text-dim tracking-wide">exp.scope — first principles</span>
        <span className="ml-auto mono text-[10px] text-dim">
          {phase === "running" ? "thinking…" : phase === "done" ? "complete" : "ready"}
        </span>
      </div>

      <div className="p-4 md:p-6">
        <form onSubmit={submit}>
          <label className="label block mb-2">drop an ambiguous problem</label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="flex items-start gap-2 flex-1 border border-[var(--color-line-bright)] bg-bg-elev px-3 py-2.5 focus-within:border-[var(--color-acid)]/55 transition-colors rounded-sm">
              <span className="acid-text mono text-sm mt-0.5">›</span>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(e);
                  }
                }}
                rows={2}
                placeholder="e.g. measure whether models learn novel rules in-context…"
                className="flex-1 resize-none bg-transparent text-[14px] text-txt placeholder:text-dim outline-none leading-relaxed"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary shrink-0 self-stretch sm:self-auto"
            >
              Scope it →
            </button>
          </div>
        </form>

        {phase === "idle" && (
          <div className="mt-5 space-y-4">
            <div>
              <div className="label mb-2">research</div>
              <div className="flex flex-wrap gap-2">
                {researchPresets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setInput(p.prompt);
                      run(p.prompt);
                    }}
                    className="min-h-8 rounded-[7px] border border-[var(--color-line)] bg-panel px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-[var(--color-acid)]/45 hover:text-acid"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="label mb-2">build / systems</div>
              <div className="flex flex-wrap gap-2">
                {buildPresets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setInput(p.prompt);
                      run(p.prompt);
                    }}
                    className="min-h-8 rounded-[7px] border border-[var(--color-line)] bg-panel px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-[var(--color-acid)]/45 hover:text-acid"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {brief && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-1.5 mb-5">
              {STAGE_ORDER.map((label) => {
                const idx = brief.stages.findIndex((s) => s.label === label);
                const active = idx >= 0 && idx < progress;
                const current = idx === progress && phase === "running";
                if (idx < 0) return null;
                return (
                  <span
                    key={label}
                    className={`mono text-[10px] px-2 py-1 rounded-sm transition-colors ${
                      active
                        ? "text-acid bg-[var(--color-acid)]/10"
                        : current
                          ? "text-txt bg-bg-elev"
                          : "text-dim"
                    }`}
                  >
                    {label}
                    {active ? " ✓" : ""}
                  </span>
                );
              })}
            </div>

            <p className="text-[14px] text-muted mb-5 leading-relaxed">
              <span className="acid-text mono text-[12px]">I hear</span>
              <span className="text-txt"> — {brief.read}</span>
            </p>

            <div className="space-y-5">
              {brief.stages.map((stage, si) => {
                const lines = typed[si] ?? [];
                if (lines.length === 0) return null;
                const stageDone = si < progress;
                return (
                  <div key={stage.id} className="border-l-2 border-[var(--color-line-bright)] pl-4">
                    <div className="mono text-[11px] tracking-wide acid-text uppercase mb-1.5">
                      {stage.label}
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
                    className="btn btn-primary btn-sm"
                  >
                    ↺ Another problem
                  </button>
                  <a
                    href="#contact"
                    className="text-[13px] text-muted hover:text-acid transition-colors"
                  >
                    Talk to me →
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
