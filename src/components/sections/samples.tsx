import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { links } from "@/content/proposal";

const videos = [
  { style: "Style 1", title: "Creative & Stylised UI Animation", href: links.videoStyle1, thumb: "/samples/video-style-1.webp" },
  { style: "Style 2", title: "Brand-Aligned Approach", href: links.videoStyle2, thumb: "/samples/video-style-2.webp" },
];

export function Samples() {
  return (
    <section id="samples" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="What we&rsquo;ve made so far" title="Samples, built on your brief" />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {videos.map((v, i) => (
            <Reveal key={v.href} delay={i * 0.08} className="h-full">
              <a
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-xl shadow-sky/20 ring-1 ring-mist"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={v.thumb}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-blue shadow-2xl backdrop-blur transition-transform duration-500 group-hover:scale-110"
                  >
                    <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 3.5v13l11-6.5z" />
                    </svg>
                  </span>
                </div>
                <div className="flex flex-1 items-end justify-between gap-4 px-6 py-5 text-navy">
                  <div>
                    <p className="text-sm font-bold text-blue">Teaser video · {v.style}</p>
                    <h3 className="mt-1 text-xl font-display font-semibold sm:text-2xl">{v.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-ice px-4 py-2 text-sm font-bold text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                    Watch<span className="sr-only"> {v.style} on Frame.io (opens in a new tab)</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
