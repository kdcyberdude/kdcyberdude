import { useEffect, useRef, useState } from "react";
import { createTrainState, tick, drawLossCurve, type TrainState } from "../sim/telemetry";
import { useRafLoop, useReducedMotion, useInView } from "../hooks";

function GpuBar({ name, util, temp }: { name: string; util: number; temp: number }) {
  const hot = temp > 74;
  return (
    <div className="flex items-center gap-2.5">
      <span className="mono text-[10px] text-dim w-[52px] shrink-0">{name}</span>
      <div className="relative h-2 flex-1 rounded-full bg-white/5 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-200"
          style={{
            width: `${util}%`,
            background: hot
              ? "linear-gradient(90deg,#8fae32,#f6b24b)"
              : "linear-gradient(90deg,#5eead4,#c7f73e)",
          }}
        />
      </div>
      <span className="mono text-[10px] text-muted w-[34px] text-right tabular-nums">
        {Math.round(util)}%
      </span>
      <span
        className={`mono text-[10px] w-[30px] text-right tabular-nums ${
          hot ? "text-amber" : "text-dim"
        }`}
      >
        {Math.round(temp)}°
      </span>
    </div>
  );
}

export default function TrainingPanel({ variant = "full" }: { variant?: "full" | "ambient" }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const [state, setState] = useState<TrainState>(() => {
    // seed with a little history so it never looks empty
    let s = createTrainState();
    for (let i = 0; i < 40; i++) s = tick(s);
    return s;
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useRafLoop(() => setState((s) => tick(s)), 9, inView && !reduced);

  // draw loss curve whenever history changes
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (c.width !== w * dpr || c.height !== h * dpr) {
      c.width = w * dpr;
      c.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawLossCurve(ctx, w, h, state.lossHistory, "#c7f73e");
  }, [state.lossHistory]);

  const gpus = variant === "ambient" ? state.gpus.slice(0, 4) : state.gpus;

  return (
    <div
      ref={ref}
      className="panel p-4 md:p-5 overflow-hidden"
      style={{ boxShadow: "0 0 60px -30px rgba(199,247,62,0.4)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="glow-dot absolute inline-flex h-full w-full rounded-full bg-acid" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          <span className="mono text-[11px] tracking-wide text-txt">train.run</span>
          <span className="mono text-[10px] text-dim">asr-pa/ft-0413</span>
        </div>
        <span className="mono text-[10px] text-dim tabular-nums">
          step {state.step.toLocaleString()}
        </span>
      </div>

      {/* loss */}
      <div className="flex items-end justify-between mb-1">
        <span className="label">loss</span>
        <span className="mono text-xl md:text-2xl font-semibold text-acid tabular-nums leading-none">
          {state.loss.toFixed(3)}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ height: variant === "ambient" ? 56 : 84 }}
        aria-hidden
      />

      {/* readouts */}
      <div className="grid grid-cols-3 gap-2 my-3 pt-3 border-t border-[var(--color-line)]">
        <div>
          <div className="label">tok/s</div>
          <div className="mono text-sm text-txt tabular-nums">
            {(state.tokensPerSec / 1000).toFixed(1)}k
          </div>
        </div>
        <div>
          <div className="label">lr</div>
          <div className="mono text-sm text-txt tabular-nums">3e-4</div>
        </div>
        <div>
          <div className="label">gpus</div>
          <div className="mono text-sm text-txt tabular-nums">7 · nvlink</div>
        </div>
      </div>

      {/* gpu bars */}
      <div className="space-y-1.5">
        {gpus.map((g, i) => (
          <GpuBar key={i} name={g.name} util={g.util} temp={g.temp} />
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[var(--color-line)]">
        <span className="mono text-[10px] text-dim">
          illustrative telemetry — a stand-in for the real 7-GPU home lab
        </span>
      </div>
    </div>
  );
}
