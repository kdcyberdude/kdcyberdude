import { useEffect, useState } from "react";
import { profile } from "../data/content";
import { useTheme } from "../hooks";

const LINKS = [
  { href: "#research", label: "Research" },
  { href: "#experience", label: "Path" },
  { href: "#work", label: "Work" },
  { href: "#lab", label: "Lab" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ onTerminal }: { onTerminal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-[var(--color-line)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="wrap flex h-14 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="Home">
          <span className="relative flex h-2 w-2">
            <span className="glow-dot absolute inline-flex h-full w-full rounded-full bg-acid" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          <span className="mono text-sm font-medium tracking-tight text-txt">
            {profile.handle}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-[13px] text-muted hover:text-txt transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onTerminal}
            className="ml-1 mono text-[12px] text-dim hover:text-acid border border-[var(--color-line)] hover:border-[var(--color-acid)]/40 rounded-sm px-2.5 py-1.5 transition-colors"
            aria-label="Open terminal"
          >
            ⌘K
          </button>
          <a
            href={profile.links.resume}
            className="ml-2 text-[13px] font-semibold on-acid bg-acid hover:bg-acid-dim rounded-sm px-3.5 py-1.5 transition-colors"
          >
            Résumé
          </a>
          <button
            onClick={toggle}
            className="ml-2 mono text-[12px] text-dim hover:text-acid border border-[var(--color-line)] hover:border-[var(--color-acid)]/40 rounded-sm px-2.5 py-1.5 transition-colors"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light" : "Dark"}
          >
            {theme === "dark" ? "☀︎" : "☾"}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <button
            className="mono text-sm text-txt p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "✕" : "≡"}
          </button>
          <button
            onClick={toggle}
            className="mono text-sm text-muted p-2 -mr-1"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? "☀︎" : "☾"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--color-line)] bg-bg/95 backdrop-blur-md">
          <div className="wrap py-3 flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] text-muted hover:text-txt"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  setOpen(false);
                  onTerminal();
                }}
                className="flex-1 mono text-[13px] text-acid border border-[var(--color-acid)]/30 rounded-sm py-2"
              >
                terminal
              </button>
              <a
                href={profile.links.resume}
                className="flex-1 text-center text-[14px] font-semibold on-acid bg-acid rounded-sm py-2"
              >
                Résumé
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
