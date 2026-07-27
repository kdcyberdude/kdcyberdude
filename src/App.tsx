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
          id="experience"
          tag="02 / path"
          title="The path here"
          subtitle="Full-stack → ML → research on owned infra."
        >
          <Timeline />
        </Section>

        <Section
          id="work"
          tag="03 / work"
          title="Selected work"
          subtitle="A few things I’ve shipped. Open any for the build story."
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
          id="lab"
          tag="05 / experiment lab"
          title={
            <>
              Give me an ambiguous problem.{" "}
              <span className="text-muted">Watch first-principles scoping.</span>
            </>
          }
          subtitle="Restate the claim, name the measurable, design the thinnest experiment. Illustrative — not a live model."
        >
          <Reveal>
            <BriefSimulator />
          </Reveal>
        </Section>

        <Section
          id="probes"
          tag="06 / open work"
          title="Open work"
          subtitle="Repos and models you can open."
        >
          <Probes />
        </Section>

        <Contact />
      </main>

      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
    </>
  );
}
