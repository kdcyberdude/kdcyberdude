import { education, timeline, trajectoryIntro } from "../data/content";
import { Reveal } from "./ui";

export default function Timeline() {
  return (
    <div>
      <Reveal>
        <p className="mb-10 max-w-2xl text-[15px] text-muted leading-relaxed">{trajectoryIntro}</p>
      </Reveal>

      <div className="space-y-0">
        {timeline.map((j, i) => (
          <Reveal key={j.org + j.role + j.period} delay={i * 0.04}>
            <article className="grid md:grid-cols-[12.5rem_1fr] gap-2 md:gap-8 border-t border-[var(--color-line)] py-6 md:py-7">
              <div className="pt-0.5">
                <div className="mono text-[12px] text-dim leading-snug">{j.period}</div>
                <div className="mono text-[11px] text-acid mt-1.5">{j.duration}</div>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-txt tracking-tight">{j.role}</h3>
                <div className="mt-1 text-[14px] text-muted">
                  {j.href ? (
                    <a
                      href={j.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-acid transition-colors"
                    >
                      {j.org}
                    </a>
                  ) : (
                    j.org
                  )}
                </div>
                <p className="mt-3 text-[14px] text-muted leading-relaxed">{j.summary}</p>
                <ul className="mt-3.5 space-y-2">
                  {j.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex gap-2.5 text-[13.5px] text-txt/85 leading-relaxed"
                    >
                      <span className="acid-text mt-1 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-8 border-t border-[var(--color-line)] pt-5">
          <div className="label mb-2">Education</div>
          <p className="text-[14px] text-txt">
            {education.degree}
            <span className="text-muted"> · {education.school}</span>
          </p>
          <p className="mono text-[12px] text-dim mt-1">
            {education.period} · {education.gpa}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
