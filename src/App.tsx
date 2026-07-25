import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LearningBench from "./components/LearningBench";
import BriefSimulator from "./components/BriefSimulator";
import EvidenceGrid from "./components/EvidenceGrid";
import HowIWork from "./components/HowIWork";
import Timeline from "./components/Timeline";
import Probes from "./components/Probes";
import Contact from "./components/Contact";
import Terminal from "./components/Terminal";
import { Section, Reveal } from "./components/ui";
import { skills } from "./data/content";

export default function App() {
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setTermOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Nav onTerminal={() => setTermOpen(true)} />

      <main>
        <Hero />

        <LearningBench />

        <Section
          id="lab"
          tag="02 / experiment lab"
          title={
            <>
              Give me an ambiguous problem.{" "}
              <span className="text-muted">Watch first-principles scoping.</span>
            </>
          }
          subtitle="Empirical research and product builds use the same muscle: restate the claim, name the measurable, design the thinnest experiment that could kill the idea. Type your own — or pick a preset. Illustrative of how I think, not a live model."
        >
          <Reveal>
            <BriefSimulator />
          </Reveal>
        </Section>

        <Section
          id="work"
          tag="03 / built & shipped"
          title="Execution proof"
          subtitle="Research taste matters. So does shipping — models, fleets, and products that real people use."
        >
          <EvidenceGrid />
        </Section>

        <Section
          id="how"
          tag="04 / how I work"
          title="What you’re actually getting"
          subtitle="Traits shown through evidence — not adjectives."
        >
          <HowIWork />
        </Section>

        <Section
          id="experience"
          tag="05 / trajectory"
          title="The path here"
          subtitle="Roles, tenure, and the full-stack → ML → research arc — not a compressed one-liner."
        >
          <Timeline />
        </Section>

        <Section
          id="stack"
          tag="06 / stack"
          title="Tools I reach for"
        >
          <div className="grid sm:grid-cols-2 gap-8">
            {skills.map((g) => (
              <Reveal key={g.group}>
                <div className="border-t border-[var(--color-line)] pt-4">
                  <div className="label mb-3">{g.group}</div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="text-[13px] text-muted border border-[var(--color-line)] rounded-sm px-2.5 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="probes"
          tag="07 / more code"
          title={
            <>
              Public repos are a slice.{" "}
              <span className="text-muted">Here’s a curated sample.</span>
            </>
          }
        >
          <Probes />
        </Section>

        <Contact />
      </main>

      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
    </>
  );
}
