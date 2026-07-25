import { traits } from "../data/content";
import { Reveal } from "./ui";

export default function HowIWork() {
  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
      {traits.map((t, i) => (
        <Reveal key={t.title} delay={i * 0.05}>
          <div className="border-t border-[var(--color-line)] pt-4">
            <h3 className="text-[16px] font-semibold text-txt tracking-tight">{t.title}</h3>
            <p className="mt-2 text-[14px] text-muted leading-relaxed">{t.proof}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
