"use client";

import type { PointerEvent } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { audiences } from "@/content/proposal";

// Three steps of the deck's sky, from white haze to light Publitas blue.
const tones = [
  "bg-[linear-gradient(150deg,#ffffff,#e6f6fe)] text-navy ring-1 ring-mist",
  "bg-[linear-gradient(150deg,#e6f6fe,#bfe7f9)] text-navy",
  "bg-[linear-gradient(150deg,#bfe7f9,#86d1f2)] text-navy",
];
const chip = ["bg-ice text-ink", "bg-white/70 text-ink", "bg-white/60 text-ink"];

// The light follows the cursor so each card reads as something to explore, not a slide.
function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="audiences-title" eyebrow="Three audiences" title="One story, three angles" />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.08} className="h-full">
              <article
                onPointerMove={spotlight}
                className={`group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[28px] p-8 transition-transform duration-500 hover:-translate-y-1.5 ${tones[i]}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(360px circle at var(--x) var(--y), rgb(255 255 255 / 0.7), transparent 60%)",
                  }}
                />
                <p className="text-sm font-bold opacity-80">0{i + 1}</p>
                <h3 className="mt-2 text-2xl font-display font-semibold">{a.name}</h3>
                <p className="mt-1 text-sm font-normal opacity-85">{a.who}</p>
                <blockquote className="mt-8 text-2xl font-display font-semibold leading-snug">“{a.quote}”</blockquote>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label={`Assets for ${a.name}`}>
                  {a.assets.map((asset) => (
                    <li key={asset} className={`rounded-full px-3 py-1 text-sm font-semibold ${chip[i]}`}>
                      {asset}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-10 text-sm font-bold">
                  <span className="opacity-75">Outcome: </span>
                  {a.outcome}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
