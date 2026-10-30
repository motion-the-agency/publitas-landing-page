import { SiteNav } from "@/components/site-nav";
import { LaunchHero } from "@/components/hero/launch-hero";
import { DeliverablesMarquee } from "@/components/marquee";
import { ConceptStory } from "@/components/sections/concept-story";
import { Audiences } from "@/components/sections/audiences";
import { Roadmap } from "@/components/sections/roadmap";
import { Samples } from "@/components/sections/samples";
import { InContext } from "@/components/sections/in-context";
import { Direction } from "@/components/sections/direction";
import { Investment } from "@/components/sections/investment";
import { Team } from "@/components/sections/team";
import { Faq, NextSteps } from "@/components/sections/closing";

export default function Home() {
  return (
    <>
      <a
        href="#concept"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-navy"
      >
        Skip the launch animation
      </a>
      <SiteNav />
      <main id="top">
        <LaunchHero />
        <ConceptStory />
        <DeliverablesMarquee />
        <Audiences />
        <Roadmap />
        <Samples />
        <InContext />
        <Direction />
        <Investment />
        <Team />
        <Faq />
        <NextSteps />
      </main>
    </>
  );
}
