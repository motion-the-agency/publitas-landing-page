import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { team } from "@/content/proposal";

const workflow = [
  {
    title: "A shared Slack channel",
    body: "#publitas-x-motion is already open.",
  },
  {
    title: "Credits you can audit",
    body: "Every task and credit tracked in Notion.",
  },
  {
    title: "A team of three, every day",
    body: "Designers, animators and a project manager.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function Team() {
  const [lead, ...rest] = team;
  return (
    <section id="team" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The team" title="Who you'll work with" />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Reveal className="h-full lg:row-span-2">
            <article className="sky-vivid relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[32px] p-8 text-navy shadow-xl shadow-sky/25 ring-1 ring-white">
              <div aria-hidden className="prism-cool absolute -bottom-20 -right-20 size-64 rounded-full opacity-80" />
              <div className="relative">
                <span aria-hidden className="grid size-14 place-items-center rounded-2xl bg-white text-lg font-display font-semibold text-blue">
                  {initials(lead.name)}
                </span>
                <p className="mt-6 text-sm font-bold text-blue">{lead.role} · your main contact</p>
                <h3 className="mt-1 text-4xl font-display font-semibold">{lead.name}</h3>
              </div>
              <p className="relative mt-10 text-lg font-normal leading-relaxed text-ink">{lead.note}</p>
            </article>
          </Reveal>
          {rest.map((m, i) => (
            <Reveal key={m.name} delay={(i % 2) * 0.06} className="h-full">
              <article className="flex h-full gap-4 rounded-[28px] bg-white p-6 shadow-lg shadow-blue/5 ring-1 ring-mist">
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ice font-display font-semibold text-blue">
                  {initials(m.name)}
                </span>
                <div>
                  <p className="text-sm font-bold text-blue">{m.role}</p>
                  <h3 className="mt-0.5 text-xl font-display font-semibold text-navy">{m.name}</h3>
                  <p className="mt-1 font-normal text-slate">{m.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal className="lg:col-span-2">
            <p className="flex items-center gap-4 rounded-[28px] bg-sky/10 px-6 py-5 font-normal text-ink">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky font-display font-semibold text-white">+3</span>
              <span>
                <span className="font-display font-semibold">Motion designers and designers</span> for videos, decks, emails,
                social posts and web visuals.
              </span>
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {workflow.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div>
                <div aria-hidden className="phase-rule h-1.5 w-16 rounded-full" />
                <h3 className="mt-5 text-xl font-display font-semibold text-navy">{w.title}</h3>
                <p className="mt-2 font-normal leading-relaxed text-slate">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
