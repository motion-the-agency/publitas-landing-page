import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

// The campaign pieces from the deck, shown where they will actually live.
const emailPoints = [
  { title: "The date, up front", body: "Customers know when it happens before anything else." },
  { title: "The news, said simply", body: "One headline. No feature list." },
  { title: "The real product", body: "The new dashboard, labelled as a preview." },
  { title: "One action", body: "A 30-second video shows the new layout." },
];

const postCopy =
  "A new home is on its way. In mid-November, the new sidebar brings your content, campaigns and analytics into one clear layout.";

function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm font-bold text-blue">
      <span className="grid size-7 place-items-center rounded-full bg-sky text-xs font-display font-semibold text-white">{n}</span>
      {children}
    </p>
  );
}

function Avatar({ size = 40 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full bg-white ring-1 ring-mist"
      style={{ width: size, height: size }}
    >
      <Image src="/brand/publitas-logo-blue.svg" alt="" width={size * 0.72} height={size * 0.24} />
    </span>
  );
}

function MailClient() {
  return (
    <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_40px_100px_-40px_rgb(10_95_208/0.5)] ring-1 ring-mist">
      <div className="flex items-center gap-2 border-b border-mist bg-paper px-5 py-3.5" aria-hidden>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 rounded-md bg-white px-3 py-1 text-xs font-semibold text-slate ring-1 ring-mist">Inbox</span>
      </div>
      <div className="border-b border-mist px-6 py-5">
        <p className="text-lg font-display font-semibold text-navy sm:text-xl">Your new Publitas home arrives mid-November</p>
        <div className="mt-3 flex items-center gap-3">
          <Avatar size={36} />
          <div className="text-sm">
            <p className="font-bold text-navy">The Publitas Team</p>
            <p className="text-slate">to you</p>
          </div>
        </div>
      </div>
      <div className="bg-[#f3f6f9] px-3 py-6 sm:px-8">
        <Image
          src="/samples/newsletter.jpg"
          alt="The full existing-customer email: A new home for your work, arriving mid-November, with a preview of the new dashboard, what changes and what stays, a note on pricing, and a Talk to your CSM button."
          width={1200}
          height={3063}
          sizes="(min-width: 1024px) 600px, 92vw"
          className="mx-auto h-auto w-full max-w-[600px] shadow-lg shadow-navy/10"
        />
      </div>
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const icons = {
  like: "M7 11v9H4v-9h3zm0 0l4-7c1.5 0 2.5 1 2.2 2.6L12.6 10H19a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7",
  comment: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  repost: "M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z",
  bookmark: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
};

function LinkedInPost() {
  return (
    <figure className="rounded-2xl bg-white shadow-xl shadow-navy/10 ring-1 ring-mist">
      <div className="flex items-start gap-3 p-4">
        <Avatar size={48} />
        <div className="min-w-0 text-sm">
          <p className="font-bold text-[#191919]">Publitas</p>
          <p className="text-xs text-[#666]">Shoppable experiences for retail</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-[#666]">
            Now · <span className="scale-75"><Icon d={icons.globe} /></span>
          </p>
        </div>
      </div>
      <p className="px-4 pb-3 text-sm leading-relaxed text-[#191919]">{postCopy}</p>
      <Image
        src="/samples/kv-landscape.jpg"
        alt="LinkedIn landscape visual: A new home for your work, arriving mid-November, beside the new Publitas sidebar."
        width={1200}
        height={628}
        sizes="(min-width: 1024px) 520px, 92vw"
        className="h-auto w-full"
      />
      <div className="flex justify-around border-t border-[#e8e8e8] px-2 py-1.5 text-sm font-semibold text-[#666]" aria-hidden>
        {(["like", "comment", "repost", "send"] as const).map((k) => (
          <span key={k} className="flex items-center gap-1.5 rounded-md px-2 py-2 capitalize">
            <Icon d={icons[k]} />
            <span className="hidden sm:inline">{k}</span>
          </span>
        ))}
      </div>
      <figcaption className="sr-only">The teaser as a LinkedIn post, 1.91:1.</figcaption>
    </figure>
  );
}

function InstagramPost() {
  return (
    <figure className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy/10 ring-1 ring-mist">
      <div className="flex items-center gap-3 px-3 py-2.5">
        <span className="rounded-full bg-[linear-gradient(45deg,#f2bf1f,#e8507e,#19b0ed)] p-[2px]">
          <Avatar size={32} />
        </span>
        <p className="text-sm font-bold text-[#262626]">publitas</p>
        <span aria-hidden className="ml-auto text-lg leading-none text-[#262626]">···</span>
      </div>
      <Image
        src="/samples/kv-square.jpg"
        alt="Square feed visual: A new home for your work, with the new sidebar."
        width={1080}
        height={1080}
        sizes="(min-width: 1024px) 420px, 92vw"
        className="h-auto w-full"
      />
      <div className="flex items-center gap-4 px-3 pt-3 text-[#262626]" aria-hidden>
        <Icon d={icons.heart} />
        <Icon d={icons.comment} />
        <Icon d={icons.send} />
        <span className="ml-auto">
          <Icon d={icons.bookmark} />
        </span>
      </div>
      <p className="px-3 pb-4 pt-2 text-sm text-[#262626]">
        <span className="font-bold">publitas</span> A new home for your work. Arriving mid-November.
      </p>
      <figcaption className="sr-only">The same visual as a square feed post, 1:1.</figcaption>
    </figure>
  );
}

function StatusBar() {
  return (
    <div className="flex h-11 items-center justify-between px-7 pt-1 text-[13px] font-semibold text-white" aria-hidden>
      <span className="tracking-tight">9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.8" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.8" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.8" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.3c2.1 0 4 .8 5.5 2.1l1.1-1.2A9.6 9.6 0 0 0 7.5.6 9.6 9.6 0 0 0 .9 3.2L2 4.4a8 8 0 0 1 5.5-2.1z" />
          <path d="M7.5 5.6c1.2 0 2.3.4 3.2 1.2l1.1-1.2a6.4 6.4 0 0 0-8.6 0l1.1 1.2c.9-.8 2-1.2 3.2-1.2z" />
          <path d="M7.5 8.6c.4 0 .8.2 1.1.4L7.5 10.3 6.4 9c.3-.3.7-.4 1.1-.4z" />
        </svg>
        <span className="relative flex h-[12px] w-[25px] items-center rounded-[4px] border border-white/40 p-[1.5px]">
          <span className="h-full w-[80%] rounded-[2px] bg-white" />
          <span className="absolute -right-[3px] top-1/2 h-[4px] w-[1.5px] -translate-y-1/2 rounded-r bg-white/40" />
        </span>
      </span>
    </div>
  );
}

// iPhone 15 Pro proportions (393 x 852 pt). Instagram shows a 9:16 story under the status
// bar with the reply bar below it on black, which is how this is laid out.
function StoryPhone() {
  return (
    <figure className="relative mx-auto w-full max-w-[300px]">
      {/* Side buttons sit outside the titanium band. */}
      <span aria-hidden className="absolute -left-[3px] top-[17%] h-[5%] w-[3px] rounded-l bg-[#8d8d92]" />
      <span aria-hidden className="absolute -left-[3px] top-[26%] h-[9%] w-[3px] rounded-l bg-[#8d8d92]" />
      <span aria-hidden className="absolute -left-[3px] top-[37%] h-[9%] w-[3px] rounded-l bg-[#8d8d92]" />
      <span aria-hidden className="absolute -right-[3px] top-[29%] h-[14%] w-[3px] rounded-r bg-[#8d8d92]" />

      <div className="rounded-[52px] bg-[linear-gradient(145deg,#d6d6db,#7d7d83_30%,#c9c9ce_55%,#6e6e74_80%,#b9b9be)] p-[3px] shadow-[0_50px_90px_-30px_rgb(4_52_96/0.55),0_20px_40px_-20px_rgb(0_0_0/0.35)]">
        <div className="rounded-[49px] bg-black p-[9px]">
          <div className="relative aspect-[393/852] overflow-hidden rounded-[41px] bg-black">
            <span aria-hidden className="absolute left-1/2 top-[10px] z-20 h-[26px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
            <StatusBar />

            <div className="relative mx-[3px] aspect-[9/16] overflow-hidden rounded-[14px]">
              <Image
                src="/samples/kv-story.jpg"
                alt="Story visual, 9:16: A new home for your work, Same Publitas, easier to find your way, with the new sidebar."
                fill
                sizes="300px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35),transparent)]" />
              <div className="absolute inset-x-2.5 top-2 flex gap-1" aria-hidden>
                <span className="h-[2px] flex-1 rounded-full bg-white" />
                <span className="h-[2px] flex-1 rounded-full bg-white/45" />
                <span className="h-[2px] flex-1 rounded-full bg-white/45" />
              </div>
              <div className="absolute inset-x-2.5 top-4 flex items-center gap-2 text-white" aria-hidden>
                <Avatar size={24} />
                <span className="text-[11px] font-bold">publitas</span>
                <span className="text-[11px] font-normal text-white/75">2h</span>
                <span className="ml-auto text-sm leading-none">···</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 pt-2.5 text-white" aria-hidden>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap rounded-full border border-white/35 px-3.5 py-2 text-[11px] font-normal text-white/85">
                Send message
              </span>
              <Icon d={icons.heart} />
              <Icon d={icons.send} />
            </div>
            <span aria-hidden className="absolute bottom-[7px] left-1/2 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-white/90" />
          </div>
        </div>
      </div>
      <figcaption className="sr-only">The same visual as a 9:16 Instagram story on an iPhone.</figcaption>
    </figure>
  );
}

export function InContext() {
  return (
    <section aria-labelledby="in-context-title" className="sky-tiles py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="in-context-title" eyebrow="The campaign, in context" title="See it where it lands" />

        {/* 01 · Email */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Label n="01">Existing-customer email</Label>
              <h3 className="mt-4 text-3xl font-display font-semibold text-navy sm:text-4xl">The CSM email</h3>
              <ol className="mt-8 space-y-6">
                {emailPoints.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ice text-sm font-display font-semibold text-blue">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-navy">{p.title}</p>
                      <p className="mt-0.5 font-normal text-slate">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <MailClient />
          </Reveal>
        </div>

        {/* 02 · Social */}
        <div className="mt-32">
          <Reveal>
            <Label n="02">Social teaser</Label>
            <h3 className="mt-4 text-3xl font-display font-semibold text-navy sm:text-4xl">One visual, three formats</h3>
          </Reveal>
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.2fr_1fr_0.85fr] lg:gap-8">
            <Reveal>
              <p className="mb-3 text-sm font-bold text-slate">LinkedIn · 1.91:1</p>
              <LinkedInPost />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mb-3 text-sm font-bold text-slate">Instagram feed · 1:1</p>
              <InstagramPost />
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mb-3 text-center text-sm font-bold text-slate">Stories · 9:16</p>
              <StoryPhone />
            </Reveal>
          </div>
        </div>

        {/* 03 · Sales deck */}
        <div className="mt-32">
          <Reveal>
            <Label n="03">Sales deck page</Label>
            <h3 className="mt-4 text-3xl font-display font-semibold text-navy sm:text-4xl">Ready for the room</h3>
          </Reveal>
          <Reveal delay={0.08} className="mt-12">
            <figure className="relative overflow-hidden rounded-[32px] shadow-2xl shadow-navy/20">
              <Image
                src="/samples/sales-deck-presenter.jpg"
                alt="A presenter in a bright meeting room pitching the Publitas sales deck page, Know your next move, on a wall screen."
                width={2400}
                height={1339}
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="glass absolute bottom-4 left-4 max-w-xs rounded-2xl px-5 py-4 sm:bottom-6 sm:left-6">
                <p className="font-display font-semibold text-navy">Know your next move.</p>
                <p className="mt-0.5 text-sm font-normal text-slate">One call to action for new retailers: Book a demo.</p>
              </figcaption>
            </figure>
            <p className="mt-3 text-xs font-normal text-slate">Illustrative photo. The slide on screen is the real deck page.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
