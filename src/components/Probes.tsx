import { probes } from "../data/content";
import { Reveal } from "./ui";

export default function Probes() {
  return (
    <div className="max-w-3xl">
      {probes.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.03}>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8 border-t border-[var(--color-line)] py-7 md:py-8"
          >
            <div className="min-w-0">
              <h3 className="text-[16px] font-semibold tracking-tight text-txt group-hover:text-acid transition-colors">
                {p.name}
              </h3>
              <p className="mt-1.5 text-[14px] text-muted leading-relaxed max-w-xl">
                {p.blurb}
              </p>
            </div>
            <span className="mono text-[11px] text-dim group-hover:text-acid transition-colors shrink-0 sm:pt-1">
              {p.kicker} ↗
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
