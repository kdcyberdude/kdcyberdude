import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks";

const W = 300;
const H = 380;
const STEPS = 30;

/** Draw an abstract, studio-lit portrait bust onto a context (the "clean" target). */
function drawTarget(ctx: CanvasRenderingContext2D) {
  // background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#13171b");
  bg.addColorStop(1, "#0a0c0e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // studio key light behind the head
  const glow = ctx.createRadialGradient(W * 0.5, H * 0.34, 10, W * 0.5, H * 0.34, 190);
  glow.addColorStop(0, "rgba(199,247,62,0.16)");
  glow.addColorStop(0.5, "rgba(94,234,212,0.06)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // shoulders / bust
  ctx.beginPath();
  ctx.moveTo(W * 0.12, H);
  ctx.bezierCurveTo(W * 0.16, H * 0.72, W * 0.34, H * 0.64, W * 0.5, H * 0.64);
  ctx.bezierCurveTo(W * 0.66, H * 0.64, W * 0.84, H * 0.72, W * 0.88, H);
  ctx.closePath();
  const bust = ctx.createLinearGradient(0, H * 0.62, 0, H);
  bust.addColorStop(0, "#2a3138");
  bust.addColorStop(1, "#12161a");
  ctx.fillStyle = bust;
  ctx.fill();

  // neck
  ctx.fillStyle = "#20262b";
  ctx.fillRect(W * 0.42, H * 0.5, W * 0.16, H * 0.16);

  // head
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.38, W * 0.17, H * 0.15, 0, 0, Math.PI * 2);
  const skin = ctx.createLinearGradient(W * 0.35, H * 0.24, W * 0.6, H * 0.52);
  skin.addColorStop(0, "#3a424a");
  skin.addColorStop(1, "#1c2126");
  ctx.fillStyle = skin;
  ctx.fill();

  // hair cap
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.3, W * 0.18, H * 0.1, 0, Math.PI, 0);
  ctx.fillStyle = "#0e1114";
  ctx.fill();

  // rim lights
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(199,247,62,0.5)";
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.38, W * 0.17, H * 0.15, 0, Math.PI * 0.6, Math.PI * 1.05);
  ctx.stroke();
  ctx.strokeStyle = "rgba(94,234,212,0.4)";
  ctx.beginPath();
  ctx.ellipse(W * 0.5, H * 0.38, W * 0.17, H * 0.15, 0, -Math.PI * 0.1, Math.PI * 0.35);
  ctx.stroke();

  // vignette
  const vg = ctx.createRadialGradient(W * 0.5, H * 0.45, 60, W * 0.5, H * 0.5, 260);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}

function makeNoise(ctx: CanvasRenderingContext2D, w: number, h: number, tint: number) {
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255;
    d[i] = v * 0.8 + tint * 0.2;
    d[i + 1] = v;
    d[i + 2] = v * 0.85 + tint * 0.15;
    d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

export default function DiffusionDenoiser() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<HTMLCanvasElement | null>(null);
  const noiseRef = useRef<HTMLCanvasElement | null>(null);
  const [t, setT] = useState(reduced ? 1 : 0.08);
  const [playing, setPlaying] = useState(false);

  // build offscreen target + noise once
  useEffect(() => {
    const tc = document.createElement("canvas");
    tc.width = W;
    tc.height = H;
    drawTarget(tc.getContext("2d")!);
    targetRef.current = tc;

    const nc = document.createElement("canvas");
    nc.width = W / 2;
    nc.height = H / 2;
    noiseRef.current = nc;
  }, []);

  // render for a given t
  const render = (tt: number, reNoise: boolean) => {
    const c = canvasRef.current;
    const tc = targetRef.current;
    const nc = noiseRef.current;
    if (!c || !tc || !nc) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== W * dpr) {
      c.width = W * dpr;
      c.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // target, sharpening as t rises
    const blur = (1 - tt) * 5;
    ctx.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : "none";
    ctx.drawImage(tc, 0, 0, W, H);
    ctx.filter = "none";

    // noise veil, thinning as t rises
    if (reNoise) makeNoise(nc.getContext("2d")!, nc.width, nc.height, 120);
    const noiseAlpha = Math.pow(1 - tt, 1.4);
    if (noiseAlpha > 0.01) {
      ctx.globalAlpha = noiseAlpha;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(nc, 0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.globalAlpha = 1;
    }
  };

  // shimmer + play loop
  useEffect(() => {
    if (reduced) {
      render(1, false);
      return;
    }
    let raf = 0;
    let last = 0;
    let localT = t;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - last < 55) return;
      last = time;
      if (playing) {
        localT = Math.min(1, localT + 0.018);
        setT(localT);
        if (localT >= 1) setPlaying(false);
      } else {
        localT = t;
      }
      render(localT, localT < 0.98); // re-noise while still noisy
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, t, reduced]);

  const step = Math.round(t * STEPS);

  return (
    <div className="panel p-5 md:p-6 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="label mb-1.5">luxeai · denoise</div>
          <h3 className="text-lg font-semibold text-txt">From noise to a portrait</h3>
        </div>
        <span className="mono text-[11px] text-dim tabular-nums">
          step {step}/{STEPS}
        </span>
      </div>

      <div className="relative mx-auto rounded-xl overflow-hidden border border-[var(--color-line)]">
        <canvas
          ref={canvasRef}
          style={{ width: W, height: H, maxWidth: "100%" }}
          className="block bg-black"
          aria-label="Diffusion denoising visualization: noise resolving into a studio portrait"
        />
        <div className="absolute bottom-2 left-2 mono text-[10px] text-white/70 bg-black/40 rounded px-1.5 py-0.5">
          {t < 0.25 ? "latent noise" : t < 0.7 ? "denoising…" : "resolved"}
        </div>
      </div>

      {/* slider */}
      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={t}
          onChange={(e) => {
            setPlaying(false);
            setT(parseFloat(e.target.value));
          }}
          className="w-full accent-[var(--color-acid)] cursor-pointer"
          aria-label="Denoising step"
          disabled={reduced}
        />
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => {
              if (t >= 0.99) setT(0.05);
              setPlaying((p) => !p);
            }}
            disabled={reduced}
            className="btn btn-primary btn-sm"
          >
            {playing ? "❚❚ pause" : "▶ denoise"}
          </button>
          <span className="mono text-[10px] text-dim">
            illustrative — real pipeline is a per-customer FLUX fine-tune
          </span>
        </div>
      </div>
    </div>
  );
}
