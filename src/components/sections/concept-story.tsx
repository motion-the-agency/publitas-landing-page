"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    month: "November",
    phase: "Phase 2 · Existing customers",
    title: "A new home for your work.",
    body: "Content, campaigns and analytics in one clear sidebar.",
    tags: ["Content", "Campaigns", "Analytics"],
    dot: "bg-teaser",
  },
  {
    month: "December",
    phase: "Phase 3 · Pilot accounts",
    title: "Help shape what comes next.",
    body: "Five to ten accounts test Experiments by invitation.",
    tags: ["Experiments", "Pilot by invitation"],
    dot: "bg-pilot",
  },
  {
    month: "Q1 2027",
    phase: "Phase 4 · All customers and new retailers",
    title: "Know your next move.",
    body: "Next actions and performance, side by side.",
    tags: ["Next actions", "Group performance", "Book a demo"],
    dot: "bg-launch",
  },
];

// Each step frames a different part of the real product UI.
const views = [
  { src: "home", scale: 2.3, origin: "0% 0%" },
  { src: "experiments", scale: 1.35, origin: "62% 8%" },
  { src: "home", scale: 1.5, origin: "62% 22%" },
] as const;

function UiFrame({ step }: { step: number }) {
  const view = views[step];
  return (
    <div className="glass relative rounded-[28px] p-2 shadow-[0_40px_100px_-40px_rgb(10_95_208/0.55)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-white">
        {(["home", "experiments"] as const).map((src) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: view.src === src ? 1 : 0,
              scale: view.src === src ? view.scale : 1.1,
            }}
            style={{ transformOrigin: view.src === src ? view.origin : "50% 50%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={src === "home" ? "/brand/publitas-new-home.png" : "/brand/publitas-experiments.png"}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-left-top"
            />
          </motion.div>
        ))}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {steps[step].tags.map((t) => (
            <motion.span
              key={`${step}-${t}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-full bg-navy/90 px-3 py-1 text-xs font-bold text-white"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConceptStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setStep((cur) => (cur === next ? cur : next));
  });

  return (
    <section id="concept" className="sky-tiles relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The launch concept" title="One home that grows with every phase" />

        <div ref={ref} className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <ol>
            {steps.map((s, i) => (
              <li key={s.title} className="flex min-h-[46vh] flex-col justify-center py-10 lg:min-h-[78vh]">
                <div
                  className={`transition-opacity duration-500 ${step === i ? "lg:opacity-100" : "lg:opacity-35"}`}
                >
                  <p className="flex items-center gap-2 text-sm font-bold text-blue">
                    <span aria-hidden className={`size-2.5 rounded-full ${s.dot}`} />
                    {s.month} <span className="font-semibold text-slate">· {s.phase}</span>
                  </p>
                  <h3 className="mt-3 text-4xl font-display font-semibold leading-tight tracking-tight text-navy sm:text-5xl">{s.title}</h3>
                  <p className="mt-4 max-w-md text-lg font-normal leading-relaxed text-slate">{s.body}</p>
                </div>
                <div className="mt-8 lg:hidden">
                  <UiFrame step={i} />
                </div>
              </li>
            ))}
          </ol>
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-15rem)]">
              <UiFrame step={step} />
              <div className="mt-6 flex justify-center gap-2" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? `w-10 ${s.dot}` : "w-4 bg-navy/15"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
