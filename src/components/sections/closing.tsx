"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { faqs, links } from "@/content/proposal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section aria-labelledby="faq-title" className="sky-tiles py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <SectionHeading id="faq-title" eyebrow="Questions" title="Before you decide" />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-[24px] transition-colors ${isOpen ? "bg-white shadow-xl shadow-blue/10" : "bg-white/60"}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${base}-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-[24px] px-6 py-5 text-left text-lg font-display font-semibold text-navy"
                  >
                    {f.q}
                    <span
                      aria-hidden
                      className={`grid size-9 shrink-0 place-items-center rounded-full text-xl transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-sky text-white" : "bg-ice text-blue"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${base}-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pr-16 font-normal leading-relaxed text-slate">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Kick-off: Thursday 5 November 2026, 09:00 South Africa time.
const KICKOFF = new Date("2026-11-05T09:00:00+02:00").getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, KICKOFF - now);
  return {
    done: ms === 0,
    parts: [
      { label: "Days", value: Math.floor(ms / 86_400_000) },
      { label: "Hours", value: Math.floor(ms / 3_600_000) % 24 },
      { label: "Minutes", value: Math.floor(ms / 60_000) % 60 },
      { label: "Seconds", value: Math.floor(ms / 1000) % 60 },
    ],
  };
}

export function NextSteps() {
  const countdown = useCountdown();
  return (
    <section id="next-steps" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-36">
      <Image src="/video/rocket-launch-end.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_30%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(238_248_253/0.82),rgb(238_248_253/0.7)_45%,rgb(238_248_253/0.9))]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Next steps" title="Phase 2 starts with a confirmed release scope" tone="vivid" />

        <div className="mt-12" aria-live="off">
          <p className="text-sm font-bold text-ink">Countdown to kick-off · Thursday 5 November</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {(countdown?.parts ?? [
              { label: "Days", value: 0 },
              { label: "Hours", value: 0 },
              { label: "Minutes", value: 0 },
              { label: "Seconds", value: 0 },
            ]).map((p) => (
              <div key={p.label} className="glass min-w-24 rounded-3xl px-5 py-4 text-center">
                <p className="text-4xl font-display font-semibold tabular-nums text-navy sm:text-5xl">
                  {countdown ? String(p.value).padStart(2, "0") : "--"}
                </p>
                <p className="mt-1 text-xs font-bold text-slate">{p.label}</p>
              </div>
            ))}
          </div>
          {countdown?.done && <p className="mt-4 font-bold text-navy">Kick-off day is here.</p>}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="glass rounded-[28px] p-8">
            <p className="inline-flex rounded-full bg-sky px-3 py-1 text-xs font-display font-semibold text-white">Motion</p>
            <p className="mt-4 text-xl font-normal leading-relaxed text-navy">
              Kick off on <strong className="font-display font-semibold">Thursday 5 November</strong>, then Phase 2 copy comes to you for
              sign-off.
            </p>
          </div>
          <div className="glass rounded-[28px] p-8">
            <p className="inline-flex rounded-full bg-pilot px-3 py-1 text-xs font-display font-semibold text-navy">Publitas</p>
            <p className="mt-4 text-xl font-normal leading-relaxed text-navy">
              Confirm the sidebar date, share approved UI and name one Marketing approver.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-4xl font-display font-semibold text-navy sm:text-6xl">Ready when you are, Karina.</p>
          <p className="mx-auto mt-4 max-w-lg text-lg font-normal text-ink">
            Lock the Phase 2 scope with Sam.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-navy px-7 py-4 text-base font-display font-semibold text-white shadow-xl shadow-navy/20 transition-transform hover:-translate-y-0.5"
            >
              Book a call with Sam
            </a>
            <a href={links.email} className="glass rounded-full px-7 py-4 text-base font-display font-semibold text-navy transition-transform hover:-translate-y-0.5">
              Email us
            </a>
          </div>
        </div>

        <footer className="mt-24 flex flex-col gap-4 border-t border-navy/10 pt-8 text-sm font-semibold text-ink sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Image src="/brand/motion-mark.png" alt="" width={24} height={24} className="rounded-md" />
            Motion The Agency. Confidential proposal prepared for Publitas, October 2026.
          </p>
          <a href="#top" className="hover:text-blue">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
