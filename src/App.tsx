import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BriefSimulator from "./components/BriefSimulator";
import EvidenceGrid from "./components/EvidenceGrid";
import DiffusionDenoiser from "./components/DiffusionDenoiser";
import TrainingPanel from "./components/TrainingPanel";
import HowIWork from "./components/HowIWork";
import Timeline from "./components/Timeline";
import Systems from "./components/Systems";
import Probes from "./components/Probes";
import Contact from "./components/Contact";
import Terminal from "./components/Terminal";
import { Section, Reveal } from "./components/ui";
import { writing } from "./data/content";

export default function App() {
  const [termOpen, setTermOpen] = useState(false);

  // global shortcuts: ⌘K / Ctrl+K / "/"
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

        <Section
          id="brief"
          tag="§01 / brief me"
          title={
            <>
              Give me an ambiguous problem.{" "}
              <span className="text-muted">Watch me scope it.</span>
            </>
          }
          subtitle="This is what a forward-deployed / founding engineer actually does: take a vague 0→1 problem and decompose it into model, data, infra, product, and a plan to ship. Type your own — or pick a preset."
        >
          <Reveal>
            <BriefSimulator />
          </Reveal>
        </Section>

        <Section
          id="work"
          tag="§02 / evidence"
          title="Things I built and shipped"
          subtitle="Not slideware — trained models, a paid product, and a feature at 100K+ DAU. Expand any card for how it was built."
        >
          <EvidenceGrid />
        </Section>

        <Section
          id="lab"
          tag="§03 / the lab"
          title="Two things I do all day"
          subtitle="Play with them. On the left, a diffusion model resolving a portrait from noise (the LuxeAI story). On the right, a training run on the fleet. Both are illustrative stand-ins for the real pipelines."
        >
          <div className="grid lg:grid-cols-2 gap-4 md:gap-5 items-start">
            <Reveal>
              <DiffusionDenoiser />
            </Reveal>
            <Reveal delay={0.08}>
              <TrainingPanel variant="full" />
            </Reveal>
          </div>
        </Section>

        <Section
          id="how"
          tag="§04 / how i work"
          title="What you're actually getting"
          subtitle="The traits, shown through evidence — not adjectives."
        >
          <HowIWork />
        </Section>

        <Section id="experience" tag="§05 / trajectory" title="The path here">
          <Timeline />
        </Section>

        <Section
          id="systems"
          tag="§06 / systems & skills"
          title="The stack I run"
          subtitle="Owned hardware, and the tools I reach for across the AI stack."
        >
          <Systems />
        </Section>

        <Section
          id="probes"
          tag="§07 / probes"
          title={
            <>
              I code a lot.{" "}
              <span className="text-muted">The graph just doesn't show it.</span>
            </>
          }
          subtitle="Public GitHub is a slice — not the whole practice. Private product, Bitbucket, training repos on the rig, agent stacks on a laptop. Here's a curated sample of that reach."
        >
          <Probes />
        </Section>

        <Section
          id="writing"
          tag="§08 / writing"
          title="Notes"
          subtitle="Longer-form pieces on the work. Coming soon — the topics I'll write up first."
        >
          <div className="grid md:grid-cols-3 gap-4">
            {writing.map((w, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="panel p-5 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="label">note {String(i + 1).padStart(2, "0")}</span>
                    {w.soon && (
                      <span className="mono text-[10px] text-acid border border-[var(--color-acid)]/30 rounded-full px-2 py-0.5">
                        soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-[15px] font-semibold text-txt leading-snug">{w.title}</h3>
                  <p className="mt-2 text-[13px] text-muted leading-relaxed">{w.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Contact />
      </main>

      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
    </>
  );
}
