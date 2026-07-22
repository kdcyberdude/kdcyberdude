import { traits, growing, profile } from "../data/content";
import { Reveal } from "./ui";

export default function HowIWork() {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {traits.map((tr, i) => (
          <Reveal key={tr.title} delay={i * 0.05}>
            <div className="panel p-5 h-full">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="acid-text mono text-sm">0{i + 1}</span>
                <h3 className="text-[15px] font-semibold text-txt">{tr.title}</h3>
              </div>
              <p className="text-[13.5px] text-muted leading-relaxed">{tr.proof}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-5 panel p-5 md:p-6 border-[var(--color-acid)]/20 bg-[var(--color-acid)]/[0.03]">
          <p className="text-[14.5px] md:text-[15px] text-txt/90 leading-relaxed">
            <span className="serif italic text-muted">{growing}</span>
          </p>
          <p className="mt-4 text-[14.5px] text-txt leading-relaxed">
            I'm looking for the{" "}
            <span className="acid-text font-medium">right people on the right mission</span> — as a{" "}
            {profile.availability.roles.join(", ")}. If that's the room you're building,{" "}
            <a href="#contact" className="underline decoration-[var(--color-acid)]/40 underline-offset-4 hover:text-acid">
              let's talk
            </a>
            .
          </p>
        </div>
      </Reveal>
    </div>
  );
}
