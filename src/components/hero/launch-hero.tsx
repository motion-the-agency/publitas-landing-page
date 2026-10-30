"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { links, phases } from "@/content/proposal";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// Scroll choreography, as fractions of the pinned hero's scroll length:
// 0.00-0.60  full-screen launch; scroll scrubs the rocket up, the phase tracker follows the climb
// 0.56-0.82  the scene blurs, tints blue and pulls back into the sky dome ("the planet")
// 0.74-0.92  the November line and the real new home rise onto the dome, then it holds
const SCRUB_START = 0.02;
const SCRUB_END = 0.6;
const phaseAt = [0, 0.4, 0.75];

function pickSource(video: HTMLVideoElement) {
  const small = window.matchMedia("(max-width: 767px)").matches ? "-720" : "";
  const webm = video.canPlayType('video/webm; codecs="vp9"') !== "";
  return `/video/rocket-launch${small}.${webm ? "webm" : "mp4"}`;
}

export function LaunchHero() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticHero />;
  return <ScrollHero />;
}

function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The whole file is pulled into memory first so every scroll position seeks instantly.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let url: string | null = null;
    let cancelled = false;
    fetch(pickSource(video))
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        video.src = url;
        video.addEventListener("loadeddata", () => setReady(true), { once: true });
      })
      .catch(() => {
        video.src = pickSource(video);
        setReady(true);
      });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  // Ease the playhead towards the scroll target, so trackpad jitter never shows as stutter.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video && ready && video.duration) {
        const goal = target.current * (video.duration - 0.05);
        const diff = goal - video.currentTime;
        if (Math.abs(diff) > 0.015) video.currentTime += diff * 0.25;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  useMotionValueEvent(p, "change", (v) => {
    const scrub = range(v, SCRUB_START, SCRUB_END);
    target.current = scrub;
    const next = v > SCRUB_END + 0.02 ? -1 : phaseAt.filter((t) => scrub >= t).length - 1;
    setPhase((cur) => (cur === next ? cur : next));
  });

  // Dome: full-screen circle that shrinks to a horizon arc centred below the fold.
  const clipPath = useTransform(p, (v) => {
    const t = ease(range(v, 0.58, 0.82));
    const cy = 50 + 30 * t;
    return `circle(calc(80vmax - ${t} * (80vmax - 70vh)) at 50% ${cy}%)`;
  });
  const sceneBlur = useTransform(p, (v) => `blur(${18 * ease(range(v, 0.58, 0.76))}px)`);
  const tint = useTransform(p, (v) => ease(range(v, 0.6, 0.78)));
  const sceneScale = useTransform(p, (v) => 1 + 0.12 * ease(range(v, 0.58, 0.82)));

  const introOpacity = useTransform(p, [0.76, 0.88], [0, 1]);
  const introY = useTransform(p, [0.74, 0.9], ["18vh", "0vh"]);
  const introBlur = useTransform(p, (v) => `blur(${10 * (1 - range(v, 0.76, 0.88))}px)`);
  const prismOpacity = useTransform(p, [0.72, 0.84], [0, 1]);

  const pitchOpacity = useTransform(p, [0, 0.5, 0.6], [1, 1, 0]);
  const pitchBlur = useTransform(p, (v) => `blur(${14 * range(v, 0.5, 0.6)}px)`);
  const pitchY = useTransform(p, [0.45, 0.6], ["0vh", "-6vh"]);
  const hudOpacity = useTransform(p, [0, 0.03, 0.55, 0.62], [0, 1, 1, 0]);
  const climb = useTransform(p, [SCRUB_START, SCRUB_END], [0, 1]);

  return (
    <section ref={ref} aria-label="Publitas 2.0 launch" className="relative h-[620vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-paper">
        <div aria-hidden className="sky-tiles absolute inset-0" />

        {/* Prism light hugging the dome's edge, the deck's "touch of rainbow". */}
        <motion.div
          aria-hidden
          style={{ opacity: prismOpacity }}
          className="pointer-events-none absolute left-1/2 top-[8vh] size-[144vh] -translate-x-1/2 rounded-full"
        >
          <div className="prism absolute inset-0 rounded-full opacity-70" />
        </motion.div>

        <motion.div style={{ clipPath }} className="absolute inset-0 will-change-[clip-path]">
          <motion.div style={{ filter: sceneBlur, scale: sceneScale }} className="absolute inset-0">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster="/video/rocket-launch-poster.jpg"
              aria-hidden
              tabIndex={-1}
              className="absolute inset-0 size-full object-cover object-[50%_75%]"
            />
            {/* Film grain over the painting, generated in CSS so the video file stays small. */}
            <div aria-hidden className="film-grain" />
          </motion.div>
          <motion.div
            aria-hidden
            style={{ opacity: tint }}
            className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_15%,#f2fbff,#bfe7f9_45%,#86d1f2_80%,#6cc8f0)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(60%_42%_at_50%_82%,rgb(242_251_255/0.6),transparent_72%)]"
          />
        </motion.div>

        {/* Stage 1: the November campaign line on the dome, with the real new home below it. */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, filter: introBlur }}
          className="absolute inset-x-0 top-[16vh] flex flex-col items-center px-4 text-center"
        >
          <p className="glass rounded-full px-4 py-1.5 text-xs font-bold text-blue">
            Launch proposal for Publitas 2.0
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-display font-semibold leading-[1.02] tracking-tight text-navy text-balance sm:text-6xl lg:text-7xl">
            A new home for your work.
          </h2>
          <p className="mt-4 max-w-md font-normal text-ink">
            Arriving mid-November.
          </p>
          <div className="relative mt-10 w-[min(92vw,980px)]">
            <FloatingLabel className="-left-4 top-[22%] sm:-left-10" delay="0s">
              Content
            </FloatingLabel>
            <FloatingLabel className="-right-3 top-[12%] sm:-right-12" delay="1.2s">
              Campaigns
            </FloatingLabel>
            <FloatingLabel className="-left-2 top-[62%] sm:-left-14" delay="2.1s">
              Analytics
            </FloatingLabel>
            <div className="glass rounded-[22px] p-2 shadow-[0_40px_120px_-30px_rgb(4_52_96/0.6)]">
              <Image
                src="/brand/publitas-new-home.png"
                alt="The new Publitas home, with the sidebar, Next actions and Group performance."
                width={2400}
                height={1424}
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 980px, 92vw"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Stage 2: the pitch line, resolving out of the blur as the scene sharpens. */}
        <motion.div
          style={{ opacity: pitchOpacity, filter: pitchBlur, y: pitchY }}
          className="absolute inset-x-0 bottom-[13vh] flex flex-col items-center px-4 text-center"
        >
          <p className="glass rounded-full px-4 py-1.5 text-xs font-bold text-navy">
            For Karina and the Publitas team
          </p>
          <h1 className="text-glow-paper mt-5 max-w-4xl text-5xl font-display font-semibold leading-[0.98] tracking-tight text-navy text-balance sm:text-7xl lg:text-8xl">
            Know your next move.
          </h1>
          <p className="text-glow-paper mt-5 max-w-xl text-base font-normal text-ink sm:text-lg">
            The Publitas 2.0 launch plan, November to Q1 2027.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#concept"
              className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-transform hover:-translate-y-0.5"
            >
              See the plan
            </a>
            <a
              href={links.bookCall}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full px-6 py-3 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5"
            >
              Book a call with Sam
            </a>
          </div>
        </motion.div>

        <PhaseTracker opacity={hudOpacity} climb={climb} active={phase} />
        <CompactTracker opacity={hudOpacity} active={phase} />

        <ScrollCue progress={p} />

      </div>
    </section>
  );
}

function FloatingLabel({
  children,
  className,
  delay,
}: {
  children: string;
  className: string;
  delay: string;
}) {
  return (
    <span
      style={{ animationDelay: delay }}
      className={`glass animate-float absolute z-10 hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-navy shadow-lg shadow-navy/15 sm:inline-flex ${className}`}
    >
      <span aria-hidden className="size-2 rounded-full bg-pilot" />
      {children}
    </span>
  );
}

const dotTone = ["bg-teaser", "bg-pilot", "bg-launch"];

function PhaseTracker({
  opacity,
  climb,
  active,
}: {
  opacity: MotionValue<number>;
  climb: MotionValue<number>;
  active: number;
}) {
  return (
    <motion.aside
      style={{ opacity }}
      aria-label="Launch phases"
      className="absolute right-8 top-1/2 hidden -translate-y-1/2 xl:block"
    >
      <div className="glass relative flex flex-col-reverse gap-8 rounded-3xl py-6 pl-12 pr-6">
        <div aria-hidden className="absolute bottom-8 left-[22px] top-8 w-1 overflow-hidden rounded-full bg-navy/10">
          <motion.div
            style={{ scaleY: climb }}
            className="absolute inset-0 origin-bottom bg-[linear-gradient(to_top,#19b0ed,#f2bf1f,#3f9d72)]"
          />
        </div>
        {phases.map((ph, i) => {
          const on = active >= i;
          return (
            <div key={ph.key} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[33px] top-1 size-4 rounded-full border-2 border-white transition-all duration-500 ${
                  on ? `${dotTone[i]} scale-110 shadow-[0_0_0_6px_rgb(255_255_255/0.6)]` : "bg-navy/15"
                }`}
              />
              <p className={`text-xs font-bold transition-colors ${on ? "text-blue" : "text-navy/50"}`}>
                {ph.number} · {ph.when}
              </p>
              <p className={`text-sm font-display font-semibold transition-colors ${on ? "text-navy" : "text-navy/50"}`}>
                {ph.name}
              </p>
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}

function CompactTracker({ opacity, active }: { opacity: MotionValue<number>; active: number }) {
  return (
    <motion.div
      style={{ opacity }}
      aria-hidden
      className="glass absolute left-1/2 top-24 flex -translate-x-1/2 items-center gap-3 rounded-full px-4 py-2 xl:hidden"
    >
      {phases.map((ph, i) => (
        <span key={ph.key} className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-display font-semibold text-navy">
          <span className={`size-2.5 rounded-full transition-colors ${active >= i ? dotTone[i] : "bg-navy/15"}`} />
          <span className={active >= i ? "" : "text-navy/45"}>{ph.number}</span>
        </span>
      ))}
    </motion.div>
  );
}

function ScrollCue({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.04], [1, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold text-white"
    >
      Scroll
      <span className="relative h-10 w-6 rounded-full border-2 border-white/80">
        <span className="absolute left-1/2 top-2 size-1.5 -translate-x-1/2 animate-bounce rounded-full bg-white" />
      </span>
    </motion.div>
  );
}

// Reduced motion: both stages laid out as still frames, no pinning or scrubbing.
function StaticHero() {
  return (
    <section aria-label="Publitas 2.0 launch">
      <div className="sky-vivid px-4 pb-16 pt-32 text-center text-navy">
        <p className="text-sm font-bold text-blue">Launch proposal for Publitas 2.0</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-display font-semibold leading-tight sm:text-7xl">A new home for your work.</h1>
        <div className="glass mx-auto mt-10 max-w-5xl rounded-[22px] p-2">
          <Image
            src="/brand/publitas-new-home.png"
            alt="The new Publitas home, with the sidebar, Next actions and Group performance."
            width={2400}
            height={1424}
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </div>
      <div className="relative flex min-h-[80vh] items-end justify-center overflow-hidden px-4 pb-16 text-center">
        <Image src="/video/rocket-launch-end.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="relative">
          <h2 className="text-glow-paper text-5xl font-display font-semibold text-navy sm:text-7xl">Know your next move.</h2>
          <a
            href={links.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-blue"
          >
            Book a call with Sam
          </a>
        </div>
      </div>
    </section>
  );
}
