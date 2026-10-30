import { phases } from "@/content/proposal";

const dot = { teaser: "bg-teaser", pilot: "bg-pilot", launch: "bg-launch" } as const;

// A ribbon of every planned deliverable: the breadth of the plan in one glance.
export function DeliverablesMarquee() {
  const items = phases.flatMap((p) => p.deliverables.map((d) => ({ d, key: p.key })));
  return (
    <div className="sky-vivid relative -rotate-1 overflow-hidden py-5 shadow-lg shadow-sky/20">
      <p className="sr-only">Planned deliverables: {items.map((i) => i.d).join(", ")}.</p>
      <div aria-hidden className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((i) => (
              <li key={`${copy}-${i.d}`} className="flex items-center gap-6 whitespace-nowrap pr-6 text-xl font-display font-semibold text-navy sm:text-2xl">
                {i.d}
                <span className={`size-2.5 rounded-full ${dot[i.key]}`} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
