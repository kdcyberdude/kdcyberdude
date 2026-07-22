import { skills } from "../data/content";
import { Reveal } from "./ui";

const RIG = [
  { slot: "GPU 0–2", part: "RTX 5090", spec: "32GB · Blackwell" },
  { slot: "GPU 3–6", part: "RTX 4090", spec: "24GB · Ada" },
  { slot: "role", part: "train + serve", spec: "fine-tune · inference" },
  { slot: "orchestration", part: "Docker · queue", spec: "Supabase jobs" },
];

export default function Systems() {
  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14">
      {/* the rig spec sheet */}
      <Reveal>
        <div className="panel p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="label">the rig · spec</div>
            <span className="mono text-[10px] text-acid">7× GPU · self-hosted</span>
          </div>
          <div className="space-y-0">
            {RIG.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-[var(--color-line)] last:border-0"
              >
                <span className="mono text-[11px] text-dim uppercase tracking-wide">{r.slot}</span>
                <div className="text-right">
                  <div className="text-[14px] font-medium text-txt">{r.part}</div>
                  <div className="mono text-[10px] text-muted">{r.spec}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] text-muted leading-relaxed">
            Owning the hardware means owning the iteration loop — no per-token bill, no queue behind
            someone else's customers, full control from data to deploy.
          </p>
        </div>
      </Reveal>

      {/* skills matrix */}
      <div className="space-y-4">
        {skills.map((grp, i) => (
          <Reveal key={grp.group} delay={i * 0.05}>
            <div>
              <div className="flex items-baseline gap-3 mb-2.5">
                <span className="mono text-[11px] acid-text">0{i + 1}</span>
                <span className="text-[14px] font-semibold text-txt">{grp.group}</span>
                <span className="h-px flex-1 bg-[var(--color-line)]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {grp.items.map((it) => (
                  <span
                    key={it}
                    className="text-[12.5px] text-muted bg-white/[0.02] border border-[var(--color-line)] rounded-md px-2.5 py-1 hover:border-[var(--color-acid)]/30 hover:text-txt transition-colors"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
