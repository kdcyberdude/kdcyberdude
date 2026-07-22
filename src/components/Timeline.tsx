import { timeline, education, honors } from "../data/content";
import { Reveal } from "./ui";

export default function Timeline() {
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
      {/* timeline */}
      <div className="relative">
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-[var(--color-line)]" />
        <div className="space-y-8">
          {timeline.map((job, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="relative pl-7">
                <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-acid bg-bg" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-[15px] font-semibold text-txt">{job.role}</h3>
                  <span className="mono text-[11px] text-dim">{job.period}</span>
                </div>
                <div className="mono text-[13px] text-acid/80 mt-0.5">{job.org}</div>
                <p className="mt-2 text-[13.5px] text-muted leading-relaxed">{job.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* education + honors */}
      <div className="space-y-5">
        <Reveal>
          <div className="panel p-5">
            <div className="label mb-3">education</div>
            <h3 className="text-[15px] font-semibold text-txt">{education.school}</h3>
            <p className="text-[13.5px] text-muted mt-1">{education.degree}</p>
            <div className="flex items-center gap-3 mt-2 mono text-[11px] text-dim">
              <span>{education.period}</span>
              <span className="acid-text">{education.gpa}</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="panel p-5">
            <div className="label mb-3">honors</div>
            <ul className="space-y-2.5">
              {honors.map((h, i) => (
                <li key={i} className="flex gap-2.5 text-[13px] text-muted leading-relaxed">
                  <span className="acid-text shrink-0">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
