/* ============================================================
   Canvas telemetry — the "live training run" feel.
   A tiny, dependency-free simulated training loop: loss decays
   with noise, GPUs report utilization, throughput ticks.
   Illustrative visualization, not a real training job.
   ============================================================ */

export type GpuState = { name: string; util: number; temp: number; mem: number };

export type TrainState = {
  step: number;
  loss: number;
  lossHistory: number[];
  tokensPerSec: number;
  lr: number;
  gpus: GpuState[];
};

const GPU_NAMES = [
  "RTX 5090",
  "RTX 5090",
  "RTX 5090",
  "RTX 4090",
  "RTX 4090",
  "RTX 4090",
  "RTX 4090",
];

export function createTrainState(): TrainState {
  return {
    step: 0,
    loss: 4.2,
    lossHistory: [],
    tokensPerSec: 0,
    lr: 3e-4,
    gpus: GPU_NAMES.map((name) => ({
      name,
      util: 60 + Math.random() * 30,
      temp: 58 + Math.random() * 8,
      mem: 70 + Math.random() * 20,
    })),
  };
}

// advance the simulated run one tick
export function tick(s: TrainState): TrainState {
  const step = s.step + 1;
  // loss: exponential-ish decay toward a floor, with noise + occasional spikes
  const floor = 0.72;
  const decay = (s.loss - floor) * 0.992;
  const noise = (Math.random() - 0.5) * 0.06;
  const spike = Math.random() < 0.015 ? Math.random() * 0.18 : 0;
  let loss = floor + decay + noise + spike;
  loss = Math.max(0.55, Math.min(4.5, loss));

  const lossHistory = [...s.lossHistory, loss];
  if (lossHistory.length > 160) lossHistory.shift();

  const gpus = s.gpus.map((g) => {
    const targetUtil = 82 + Math.random() * 16;
    const util = g.util + (targetUtil - g.util) * 0.2 + (Math.random() - 0.5) * 6;
    const temp = g.temp + (Math.random() - 0.48) * 1.2;
    const mem = g.mem + (Math.random() - 0.5) * 2;
    return {
      name: g.name,
      util: clamp(util, 40, 100),
      temp: clamp(temp, 52, 79),
      mem: clamp(mem, 60, 96),
    };
  });

  const avgUtil = gpus.reduce((a, g) => a + g.util, 0) / gpus.length;
  const tokensPerSec = Math.round(avgUtil * 148 + Math.random() * 900);

  return { step, loss, lossHistory, tokensPerSec, lr: s.lr, gpus };
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/* Draw the loss curve into a canvas 2D context (device-pixel aware). */
export function drawLossCurve(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  history: number[],
  color: string,
) {
  ctx.clearRect(0, 0, w, h);
  if (history.length < 2) return;

  const min = 0.5;
  const max = 4.5;
  const pad = 4;
  const n = history.length;
  const x = (i: number) => pad + (i / (n - 1)) * (w - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / (max - min)) * (h - pad * 2);

  // area fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "rgba(199,247,62,0.18)");
  grad.addColorStop(1, "rgba(199,247,62,0)");
  ctx.beginPath();
  ctx.moveTo(x(0), h);
  history.forEach((v, i) => ctx.lineTo(x(i), y(v)));
  ctx.lineTo(x(n - 1), h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // line
  ctx.beginPath();
  history.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), y(v)) : ctx.lineTo(x(i), y(v))));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  ctx.lineJoin = "round";
  ctx.stroke();

  // leading dot
  const lastX = x(n - 1);
  const lastY = y(history[n - 1]);
  ctx.beginPath();
  ctx.arc(lastX, lastY, 2.6, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(199,247,62,0.15)";
  ctx.fill();
}
