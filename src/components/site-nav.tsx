"use client";

import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { links } from "@/content/proposal";

const sections = [
  { href: "#concept", label: "Concept" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#samples", label: "Samples" },
  { href: "#investment", label: "Investment" },
  { href: "#team", label: "Team" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Reading progress in the three phase colours. */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="phase-rule h-1 origin-left"
      />
      <nav
        aria-label="Proposal sections"
        className="mx-auto mt-3 flex max-w-7xl items-center justify-between gap-4 px-3 sm:px-6"
      >
        <a
          href="#top"
          className="glass-nav flex h-12 items-center gap-3 rounded-full px-4"
          aria-label="Publitas and Motion The Agency, back to top"
        >
          <Image src="/brand/publitas-logo.svg" alt="" width={84} height={27} priority />
          <span aria-hidden className="text-sm font-bold text-navy/40">
            ×
          </span>
          <Image src="/brand/motion-mark.png" alt="" width={24} height={24} className="rounded-md" />
        </a>

        <ul className="glass-nav hidden h-12 items-center gap-1 rounded-full px-2 lg:flex">
          {sections.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-sky hover:text-white"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={links.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-12 items-center whitespace-nowrap rounded-full bg-navy px-5 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Book a call with Sam
          </a>
          <button
            type="button"
            className="glass-nav inline-flex size-12 cursor-pointer items-center justify-center rounded-full text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 7h16M3 15h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="glass-nav mx-3 mt-2 rounded-3xl p-3 lg:hidden">
          <ul className="flex flex-col">
            {sections.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-semibold text-navy hover:bg-ice"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={links.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-full bg-navy px-4 py-3 text-center text-sm font-bold text-white"
          >
            Book a call with Sam
          </a>
        </div>
      )}
    </header>
  );
}
