"use client";

import { motion } from "motion/react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { phases } from "@/content/proposal";

const TOTAL_CREDITS = 2000;
const fill = { teaser: "bg-teaser", pilot: "bg-pilot", launch: "bg-launch" } as const;

export function Investment() {
  const used = phases.reduce((sum, p) => sum + p.credits, 0);
  const spare = TOTAL_CREDITS - used;

  return (
    <section id="investment" className="sky-tiles py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Investment" title="One plan for the whole launch" />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="h-full">
            <article className="sky-vivid relative flex h-full flex-col overflow-hidden rounded-[32px] p-8 text-navy shadow-xl shadow-sky/25 ring-1 ring-white sm:p-10">
              <div aria-hidden className="prism-cool absolute -right-24 -top-24 size-72 rounded-full opacity-80" />
              <p className="relative inline-flex w-fit rounded-full bg-pilot px-3 py-1 text-xs font-display font-semibold text-navy">
                Growth Creative Credits
              </p>
              <p className="relative mt-6 text-6xl font-display font-semibold tracking-tight sm:text-7xl">
                <CountUp to={32000} prefix="$" />
              </p>
              <p className="relative mt-1 text-lg font-bold text-ink">paid upfront</p>
              <ul className="relative mt-8 space-y-3 font-normal text-ink">
                {["2,000 credits at $16 each", "Works whether the launch takes 3 months or 6", "Valid for 12 months from purchase"].map(
                  (t) => (
                    <li key={t} className="flex gap-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="mt-0.5 shrink-0" fill="none">
                        <circle cx="10" cy="10" r="10" fill="white" fillOpacity="0.8" />
                        <path d="M6 10.5l2.5 2.5L14 7.5" stroke="#086bc6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <p className="relative mt-auto border-t border-navy/10 pt-6 font-normal leading-relaxed text-ink">
                Dedicated project manager, same-day responses, unlimited revisions.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <article className="flex h-full flex-col rounded-[32px] bg-white p-8 shadow-xl shadow-blue/10 ring-1 ring-mist sm:p-10">
              <p className="inline-flex w-fit rounded-full bg-sky/10 px-3 py-1 text-xs font-display font-semibold text-blue">
                Estimated credit use
              </p>
              <p className="mt-6 text-6xl font-display font-semibold tracking-tight text-navy sm:text-7xl">
                ~<CountUp to={used} />
              </p>
              <p className="mt-1 text-lg font-bold text-slate">of {TOTAL_CREDITS.toLocaleString("en-US")} credits</p>

              <div
                className="mt-8 flex h-5 gap-1 overflow-hidden rounded-full bg-ice p-1"
                role="img"
                aria-label={`Credit use: ${phases.map((p) => `${p.number} about ${p.credits}`).join(", ")}, about ${spare} left over.`}
              >
                {phases.map((p, i) => (
                  <motion.span
                    key={p.key}
                    className={`rounded-full ${fill[p.key]}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(p.credits / TOTAL_CREDITS) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {phases.map((p) => (
                  <div key={p.key} className="rounded-2xl bg-ice p-4">
                    <dt className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate">
                      <span aria-hidden className={`size-2.5 rounded-full ${fill[p.key]}`} />
                      {p.number}
                    </dt>
                    <dd className="mt-1 text-2xl font-display font-semibold text-navy">~{p.credits}</dd>
                  </div>
                ))}
                <div className="rounded-2xl bg-ice p-4">
                  <dt className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate">
                    <span aria-hidden className="size-2.5 rounded-full bg-white ring-2 ring-mist" />
                    Left over
                  </dt>
                  <dd className="mt-1 text-2xl font-display font-semibold text-navy">~{spare}</dd>
                </div>
              </dl>

              <p className="mt-auto pt-8 font-normal leading-relaxed text-slate">
                About 740 spare credits for extra assets or post-launch work.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-5">
          <aside
            aria-labelledby="credit-expiry"
            className="flex flex-col gap-5 rounded-[28px] border-2 border-pilot bg-[#fff8df] p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-2xl bg-pilot text-navy">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2.5M9 2h6" />
              </svg>
            </span>
            <div>
              <h3 id="credit-expiry" className="text-xl font-display font-semibold text-navy sm:text-2xl">
                Credits expire 12 months after purchase
              </h3>
              <p className="mt-1 text-base font-normal leading-relaxed text-ink sm:text-lg">
                Any of the 2,000 credits still unused 12 months after the upfront payment expire. The launch plan
                runs from November 2026 to Q1 2027, so the ~1,260 credits planned for Phases 2 to 4 fall inside that
                window.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
