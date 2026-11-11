import { projectEntry, shot } from "./projectShape";
import ammasManeTindi from "../img/ammas-mane-tindi.png";
import readItTwin from "../img/readittwin.png";
import brainWMe from "../img/brainwme.png";
import parallelYou from "../img/parallelyou.png";

const projectEntriesRawA = [
  {
    id: 8,
    title: "AMMA'S MANE TINDI",
    tagline: "A brand site for a home kitchen",
    description:
      "A client website for a new homemade food brand. It shows their Karnataka kitchen, bulk orders, and tailoring — then sends people to WhatsApp to order.",
    longDescription:
      "A bilingual brand website for a home kitchen in Kothanur, Bengaluru. The site introduces AMMA'S MANE TINDI as a takeout-only vegetarian kitchen — everyday Karnataka food, bulk orders for functions, and blouse tailoring alongside the kitchen. There is no online checkout: visitors browse the menu and services, then WhatsApp the kitchen to order and collect. Built as a Next.js brand site with English and Kannada copy, a warm illustrated visual language, and clear paths for food, gatherings, and stitching.",
    technologies: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Lucide React",
    ],
    githubUrl: "https://github.com/GaneshKantle/Amma-s-Mane-Thindi",
    liveUrl: "https://ammasmanethindi.vercel.app/",
    demoUrl: "https://ammasmanethindi.vercel.app/",
    documentationUrl:
      "https://github.com/GaneshKantle/Amma-s-Mane-Thindi/blob/main/README.md",
    features: [
      "Bilingual English and Kannada brand storytelling",
      "Food menu, custom cooking, and bulk-order pages",
      "Tailoring and blouse-work services alongside the kitchen",
      "WhatsApp-first ordering with no online checkout",
      "Kitchen hours, location, and takeout-only guidance",
      "Packaging story and photo gallery of homemade goods",
      "Warm illustrated visual language for a home brand",
      "Responsive layout for phones and desktops",
    ],
    challenges: [
      "Translating a home kitchen's trust into a digital brand",
      "Keeping food, functions, and tailoring in one coherent site",
      "Designing WhatsApp-first conversion without a cart",
      "Balancing English and Kannada without crowding the layout",
      "Making takeout-only collection feel clear and local",
    ],
    learnings: [
      "Client brand sites for local service businesses",
      "Bilingual content and Kannada typography on the web",
      "WhatsApp as the primary conversion path",
      "Next.js App Router for multi-page marketing sites",
      "Restraint in visual identity for homemade brands",
    ],
    screenshots: [
      shot(ammasManeTindi, "Homepage", "Brand homepage with Kannada tagline and kitchen story"),
      shot(ammasManeTindi, "Food & bulk orders", "Menu, custom cooking, and function orders via WhatsApp"),
      shot(ammasManeTindi, "Tailoring", "Blouse stitching and finishing work alongside the kitchen"),
    ],
    architecture:
      "Next.js App Router marketing site with typed pages for food, bulk orders, tailoring, about, and contact",
    developmentTime: "1 week",
    teamSize: "Solo (Freelance)",
    impact:
      "Gave a new homemade food and tailoring brand a live web presence that sends neighbours to WhatsApp to order",
    image: ammasManeTindi,
    difficulty: "Intermediate",
  },

  {
    id: 1,
    title: "Read It Twin",
    tagline: "Race your friend at reading",
    description:
      "Read a story as fast as you can. Play alone or race a friend. Then answer a few questions to see who did better.",
    longDescription:
      "Read It Twin is a polished multiplayer reading competition app where players race through passages and take comprehension quizzes. It supports solo runs with local passage seeds and synchronized two-player rooms with authoritative server-side scoring, lobby flow, countdown sync, results, and rematch. Built as a React SPA with a Supabase (PostgreSQL + Realtime) backend, anonymous sessions, and production hardening for live deployment.",
    technologies: [
      "TypeScript",
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "Framer Motion",
      "React Router",
      "Vitest",
    ],
    githubUrl: "https://github.com/GaneshKantle/Read-It-Twin",
    liveUrl: "https://readittwin.vercel.app",
    demoUrl: "https://readittwin.vercel.app",
    documentationUrl:
      "https://github.com/GaneshKantle/Read-It-Twin/blob/main/README.md",
    features: [
      "Solo reading → quiz → results flow",
      "Create/join rooms with shareable codes",
      "Synchronized two-player races with live lobby",
      "Server-authoritative WPM and comprehension scoring",
      "Countdown-synced race start and rematch",
      "Anonymous play with no signup required",
      "Realtime multiplayer via Supabase",
      "Responsive UI with polished motion",
    ],
    challenges: [
      "Keeping race timing synchronized across clients",
      "Designing authoritative scoring without traditional auth",
      "Modeling lobby → race → results → rematch state machines",
      "Hardening RLS and RPCs for anonymous Realtime access",
      "Handling disconnects, rejoin, and leave notifications cleanly",
    ],
    learnings: [
      "Supabase Realtime and SECURITY DEFINER RPCs",
      "Server-authoritative multiplayer game design",
      "Anonymous session and room lifecycle patterns",
      "Complex client-server state synchronization",
      "Production hardening for SPA + Postgres backends",
    ],
    screenshots: [
      shot(readItTwin, "Landing Page", "Product landing with solo and challenge entry points"),
      shot(readItTwin, "Race Lobby", "Two-player room lobby with ready states"),
      shot(readItTwin, "Results View", "WPM, comprehension, and rematch results screen"),
    ],
    architecture:
      "React SPA with Vite, synchronized via Supabase Realtime and Postgres RPCs for authoritative multiplayer scoring",
    developmentTime: "2 weeks",
    impact:
      "Turns reading practice into a competitive, shareable challenge that scores both speed and understanding",
    image: readItTwin,
    difficulty: "Advanced",
  },

  {
    id: 2,
    title: "BrainWMe",
    tagline: "A picture guide to coding tools",
    description:
      "A simple picture book of JavaScript tools. See what each tool is for, and try building your own stack like putting puzzle pieces together.",
    longDescription:
      "BrainWMe is an illustrated learning map of the JS/TS ecosystem. It organizes tools into volumes and job-based categories so learners can see what each piece is for, when it’s needed, and what it’s often confused with. An interactive workshop lets you explode a stack in 3D, dock one tool per job, and enforce needs-React wiring rules. A language-model view shows the TypeScript trunk versus UI and runtime branches. Built as a modern Next.js app with custom ink-style illustrations and motion.",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Motion",
      "Lucide React",
    ],
    githubUrl: "https://github.com/GaneshKantle/Brain-W-Me",
    liveUrl: "https://brainwme.vercel.app/",
    demoUrl: "https://brainwme.vercel.app/",
    documentationUrl:
      "https://github.com/GaneshKantle/Brain-W-Me/blob/main/README.md",
    features: [
      "Illustrated encyclopedia of 50+ categories and 200+ tools",
      "Volume-based browsing (language, UI, data, product, platform, tooling)",
      "Per-tool job, why, how, and common confusion notes",
      "Interactive workshop to wire one tool per job",
      "Needs-React rules baked into stack assembly",
      "Language model view: trunk vs UI/runtime branches",
      "Custom ink-and-wash illustration system",
      "Responsive, comic-panel UI with motion",
    ],
    challenges: [
      "Modeling the ecosystem as jobs and sockets, not just a tool list",
      "Teaching that React is optional without oversimplifying",
      "Building an interactive assemble/explode workshop UX",
      "Keeping a large content catalog consistent and navigable",
      "Designing a cohesive illustrated visual language in the browser",
    ],
    learnings: [
      "Content modeling for educational product surfaces",
      "Next.js App Router structure for content-heavy sites",
      "Motion-driven interaction design",
      "SVG/illustration systems for product UI",
      "Explaining complex ecosystems through progressive disclosure",
    ],
    screenshots: [
      shot(brainWMe, "Encyclopedia Home", "Volume-based encyclopedia of the JS/TS ecosystem"),
      shot(brainWMe, "Category View", "Tools grouped by job with illustrated part cards"),
      shot(brainWMe, "Workshop", "Interactive stack assembly with wiring rules"),
    ],
    architecture:
      "Next.js App Router content site with typed tool/category catalog and client-side workshop state",
    developmentTime: "1 week",
    impact:
      "Helps developers understand the JS/TS map without treating React as the whole language",
    image: brainWMe,
    difficulty: "Intermediate",
  },

  {
    id: 3,
    title: "Parallel You",
    tagline: "What the world looked like when you were born",
    description:
      "Type in your birthday. Then scroll through the sky, Earth, and history from that exact moment. Only real facts — no made-up stuff.",
    longDescription:
      "Parallel You turns a real date, time, and place of birth into a continuous scroll experience. It moves from the exact night you arrived — moon, sun, location, life-in-numbers — through world context, a birthplace map, age capsules, and life alongside history, then zooms out through civilization, Earth, and the cosmos. Built for restraint: calculated and curated facts only, uncertainty labeled, empty when unknown. No astrology, no invented people, no signup.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
      "Luxon",
      "SunCalc",
      "Zod",
    ],
    githubUrl: "https://github.com/GaneshKantle/Parallel-You",
    liveUrl: "https://parallelyouu.vercel.app",
    demoUrl: "https://parallelyouu.vercel.app",
    documentationUrl:
      "https://github.com/GaneshKantle/Parallel-You/blob/main/README.md",
    features: [
      "Birth moment input (date, time, place)",
      "Exact-moment sky and place context",
      "Life-in-numbers since birth",
      "World-when-you-arrived curated notes",
      "Parallel map of birthplace on Earth",
      "Life alongside public history",
      "At-your-age year capsules",
      "Human Scale cosmic zoom-out",
      "Quiet shareable poster",
      "No accounts or registration required",
      "Provenance-labeled facts (calculated, historical, estimate)",
    ],
    challenges: [
      "Sequencing intimate → historical → cosmic in one continuous narrative",
      "Keeping tone observational without fake precision",
      "Modeling time/place math accurately across zones and eras",
      "Curating sparse historical data without inventing gaps",
      "Building performant scroll and 3D/globe moments",
      "Designing shareable output that stays quiet and factual",
    ],
    learnings: [
      "Narrative UX for long-form scroll experiences",
      "Time and astronomy math with Luxon and SunCalc",
      "3D globe/map interactions with React Three Fiber",
      "Provenance-aware data modeling",
      "Restraint-first product design (empty over invented)",
      "Next.js App Router composition for multi-section exhibitions",
    ],
    screenshots: [
      shot(parallelYou, "Landing Input", "Enter date, time, and place of birth"),
      shot(parallelYou, "Exact Moment", "Sky and place for that instant"),
      shot(parallelYou, "Human Scale", "One life zoomed out through cosmic time"),
    ],
    architecture:
      "Next.js App Router exhibition: landing birth input → /explore sections powered by curated catalogs and calculated resolvers",
    developmentTime: "1–2 months",
    impact:
      "Makes one real birth night feel specific — then quietly shows how small one life is against history and the universe",
    image: parallelYou,
    difficulty: "Intermediate",
  },
];

export const projectEntriesA = projectEntriesRawA.map(projectEntry);
