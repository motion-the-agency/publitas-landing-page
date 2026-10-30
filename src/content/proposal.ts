// Every figure and name on the page comes from the Publitas pitch deck in Figma
// (file C7N6eLBL90hGO613usyEQH) or the proposal emails. Edit here, not in components.

export const links = {
  bookCall: "https://meetings-eu1.hubspot.com/sam-jupp",
  videoStyle1: "https://f.io/giDN4VEB",
  videoStyle2: "https://f.io/rellMCpO",
  email: "mailto:widi@motiontheagency.com",
};

export type PhaseKey = "teaser" | "pilot" | "launch";

export const phases: {
  key: PhaseKey;
  number: string;
  name: string;
  when: string;
  milestone: string;
  goal: string;
  action: string;
  credits: number;
  headline: string;
  audience: string;
  deliverables: string[];
}[] = [
  {
    key: "teaser",
    number: "Phase 2",
    name: "Teaser",
    when: "Mid-November 2026",
    milestone: "New sidebar goes live",
    goal: "Explain the first change and reassure existing clients.",
    action: "Explore the new home when it's available",
    credits: 280,
    headline: "A new home for your work.",
    audience: "Existing customers",
    deliverables: ["Teaser video, 30s", "CSM email", "LinkedIn teaser", "FAQ and objection sheet"],
  },
  {
    key: "pilot",
    number: "Phase 3",
    name: "Limited release",
    when: "December 2026",
    milestone: "Pilot with 5 to 10 selected accounts",
    goal: "Prepare internal teams and support the pilot.",
    action: "Join by invitation and give feedback",
    credits: 710,
    headline: "Help shape what comes next.",
    audience: "Pilot accounts",
    deliverables: [
      "Training, information and sales decks",
      "Data sheets and competitive one-pager",
      "Interview explainer and snippets",
      "Email tracks and pilot outreach",
      "LinkedIn campaign",
    ],
  },
  {
    key: "launch",
    number: "Phase 4",
    name: "General launch",
    when: "Q1 2027",
    milestone: "Hard launch to all accounts",
    goal: "Demonstrate value and drive adoption.",
    action: "Existing clients onboard. New clients book a demo.",
    credits: 270,
    headline: "Know your next move.",
    audience: "All customers and new retailers",
    deliverables: [
      "Countdown and launch assets",
      "Website visuals",
      "Updated sales deck and talk tracks",
      "Feedback and case study templates",
    ],
  },
];

export const audiences = [
  {
    name: "Internal teams",
    who: "CS, Sales, Marketing and Product",
    quote: "What's changing, why it matters, and how to explain it.",
    assets: ["Training deck", "One-pagers", "Talk tracks"],
    outcome: "Ready to explain and sell it",
  },
  {
    name: "Existing customers",
    who: "Producers, designers, technical owners, marketing leads",
    quote: "Nothing you rely on breaks. Your work gets easier.",
    assets: ["CSM emails", "Teaser video", "Knowledge base", "LinkedIn"],
    outcome: "Explore the new home",
  },
  {
    name: "New customers",
    who: "US enterprise retailers evaluating platforms",
    quote: "Shoppable experiences that improve every cycle.",
    assets: ["Website", "Sales deck", "Data sheets", "LinkedIn", "Email nurture"],
    outcome: "Book a demo",
  },
];

export const team = [
  {
    role: "Design Director",
    name: "Savira Azaria",
    note: "Your main contact. Leads creative direction and day-to-day delivery.",
    lead: true,
  },
  { role: "Motion Director", name: "Sam Jupp", note: "Oversees creative quality across the launch." },
  { role: "Head of Animation", name: "Pujita", note: "Leads the teaser video and all motion work." },
  { role: "Marketing Strategy", name: "Bramuda", note: "Shapes the messaging and campaign plan." },
  { role: "Project Admin", name: "Widi", note: "Scheduling, credits and approvals." },
];

export const faqs = [
  {
    q: "What if the launch date moves?",
    a: "The plan works whether the launch takes three months or six. Credits stay valid for 12 months from purchase.",
  },
  {
    q: "How do we know what each asset costs?",
    a: "Every asset's credit cost is agreed before work starts, and tracked in a shared Notion board.",
  },
  {
    q: "Who do we talk to day to day?",
    a: "Savira Azaria, in your Slack channel, with same-day responses.",
  },
  {
    q: "How many rounds of changes are included?",
    a: "Unlimited revisions.",
  },
  {
    q: "What do you need from us to start?",
    a: "The sidebar date, approved UI and one Marketing approver.",
  },
];
