import { probes, probesIntro } from "../data/content";
import { Reveal } from "./ui";

const statusLabel: Record<string, string> = {
  public: "public",
  private: "private",
  fork: "fork",
  probe: "probe",
};

export default function Probes() {
  return (
    <div>
      <p className="text-[14px] text-muted leading-relaxed max-w-2xl mb-8">{probesIntro}</p>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
        {probes.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <div className="border-t border-[var(--color-line)] pt-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-semibold text-txt">{p.name}</h3>
                <span className="mono text-[10px] text-dim uppercase tracking-wide">
                  {statusLabel[p.status]}
                </span>
              </div>
              <p className="label mt-1">{p.kicker}</p>
              <p className="mt-2 text-[13.5px] text-muted leading-relaxed">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="mono text-[10px] text-dim border border-[var(--color-line)] rounded-sm px-2 py-0.5"
                  >
                    {s}
                  </span>
                ))}
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mono text-[11px] text-acid hover:underline ml-auto"
                  >
                    open ↗
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
