import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { getAllProjects } from "../../shared/projectData";
import { DotPattern } from "../DotPattern";
import {
  ProjectSpecimenCard,
  type SpecimenProject,
} from "./ProjectSpecimenCard";
import ImageGallery from "../../img/image-gallery.png";
import JobPortal from "../../img/job-management.png";
import FarmDirect from "../../img/farm-direct.png";
import NetflixClone from "../../img/netflix-clone.png";
import FigmaSmartHome from "../../img/smart-home.png";
import LoanCalculator from "../../img/loan-calci.png";
import RecipeBook from "../../img/recipe-book.png";
import PotholePortal from "../../img/pothole-portal.png";
import MyNFT from "../../img/nft-dapp.png";
import SmartSafetyRing from "../../img/empowher.png";
import VoteWise from "../../img/votewise.png";
import KantlesWardrobe from "../../img/kantle-wardrobe.png";
import ClientPortfolio from "../../img/client-portfolio.png";

const mainProjects = getAllProjects() as SpecimenProject[];

const additionalProjects: SpecimenProject[] = [
  {
    id: 101,
    title: "Loan Calculator App",
    description:
      "Type how much money you borrow. The app shows how much you pay back each month, and can change the answer into other currencies.",
    technologies: [
      "Material UI 5",
      "React Router DOM 7",
      "Axios",
      "Custom Hooks",
    ],
    githubUrl: "https://github.com/GaneshKantle/Loan-Calculator",
    liveUrl: "https://loan-calcii.vercel.app/",
    image: LoanCalculator,
  },
  {
    id: 102,
    title: "Recipe Skeleton Master",
    description:
      "Look up tasty recipes. Search by name or food type, then open one to see how to cook it.",
    technologies: [
      "Material UI",
      "Emotion",
      "Framer Motion",
      "Jest + Testing Library",
      "JavaScript",
    ],
    githubUrl: "https://github.com/GaneshKantle/Recipe-Skeleton-Master",
    liveUrl: "https://recipe-skeleton-master.vercel.app/",
    image: RecipeBook,
  },
  {
    id: 103,
    title: "PotHole Portal",
    description:
      "Spot a hole in the road? Report it on a map. City workers can check the reports and plan the fixes.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "Google Maps JavaScript API",
    ],
    githubUrl: "https://github.com/GaneshKantle/Pothole-Portal",
    liveUrl: "https://pothole-portal.vercel.app/",
    image: PotholePortal,
  },
  {
    id: 104,
    title: "NFT - DApp",
    description:
      "Make your own digital collectible on the blockchain. Connect your wallet and mint it so it belongs to you.",
    technologies: [
      "Solidity",
      "Remix IDE",
      "Web3.js",
      "MetaMask",
      "IPFS",
      "Ethereum",
    ],
    githubUrl: "https://github.com/GaneshKantle/My-Non-Fungible-Token-DApp",
    liveUrl: "https://non-fungible-token-dapp.vercel.app",
    image: MyNFT,
  },
  {
    id: 105,
    title: "EmpowHER",
    description:
      "A website about a smart safety ring. It shows how someone could call for help and share their location in an emergency.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Lottie Web",
      "Google Model Viewer",
    ],
    githubUrl: "https://github.com/GaneshKantle/Smart-Safety-Ring",
    liveUrl: "https://smart-safety-ring.vercel.app/",
    image: SmartSafetyRing,
  },
  {
    id: 106,
    title: "VoteWise DApp",
    description:
      "Vote for a person by typing their name. Everyone can see the live vote count saved on the blockchain.",
    technologies: ["Web3.js 4", "Solidity", "MetaMask", "Remix IDE", "Hardhat"],
    githubUrl: "https://github.com/GaneshKantle/Ethereum-Voting-DApp",
    liveUrl: "https://votewise-dapp.vercel.app/",
    image: VoteWise,
  },
  {
    id: 107,
    title: "Kantle's Wardrobe",
    description:
      "A simple clothing brand website. Browse shirts and pants, open a product page, and find ways to get in touch.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Google Fonts"],
    githubUrl: "https://github.com/GaneshKantle/KANTLE-Wardrobe",
    liveUrl: "https://kantles-wardrobe.vercel.app/",
    image: KantlesWardrobe,
  },
  {
    id: 108,
    title: "Client's Portfolio",
    description:
      "A personal website I built for a client. It shows their skills, school, projects, and easy ways to contact them.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Font Awesome 6",
      "Mailto/WhatsApp deep links",
    ],
    githubUrl: "https://github.com/GaneshKantle/Freelance-Work-Portfolio",
    liveUrl: "https://ganeshkantle.github.io/Freelance-Work-Portfolio/",
    image: ClientPortfolio,
  },
  {
    id: 109,
    title: "Image Gallery",
    description:
      "A grid of pictures. Click one to see it big. Press X or Escape to close it.",
    technologies: ["HTML5", "CSS3", "Vanilla", "GitHub Pages"],
    githubUrl: "https://github.com/GaneshKantle/Image-Gallery",
    liveUrl: "https://ganeshkantle.github.io/Image-Gallery/",
    image: ImageGallery,
  },
  {
    id: 110,
    title: "Internship Management Portal",
    description:
      "Find internship jobs, filter them, and apply. Track your applications and save the ones you like.",
    technologies: [
      "Tailwind CSS 3",
      "daisyUI 5",
      "Express 4",
      "Node.js",
      "PostCSS 8",
    ],
    githubUrl: "https://github.com/GaneshKantle/AI-Job-Management-Portal",
    liveUrl: "https://ai-job-management-portal.vercel.app",
    image: JobPortal,
  },
  {
    id: 111,
    title: "Farm Direct",
    description:
      "A place where farmers and buyers meet. Send a request, make a deal, and peek at simple market charts.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Chart.js (CDN)"],
    githubUrl: "https://github.com/GaneshKantle/Farm-Direct",
    liveUrl: "https://farm-directs.vercel.app/",
    image: FarmDirect,
  },
  {
    id: 112,
    title: "Netflix Clone",
    description:
      "A look-alike of the Netflix home page. Same big hero, device sections, FAQ, and footer — built for practice.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript (Vanilla)",
      "Font Awesome 6",
    ],
    githubUrl: "https://github.com/GaneshKantle/Netflix-Clone",
    liveUrl: "https://ganeshkantle.github.io/Netflix-Clone/",
    image: NetflixClone,
  },
  {
    id: 113,
    title: "Figma Smart Home Controller",
    description:
      "A design for a phone app that controls a smart home. Tap rooms, alarms, and devices in the interactive layout.",
    technologies: ["HTML5", "Google Fonts", "Figma Embed", "GitHub Pages"],
    githubUrl: "https://github.com/GaneshKantle/Figma-Smart-Home-Controller",
    liveUrl: "https://ganeshkantle.github.io/Figma-Smart-Home-Controller/",
    image: FigmaSmartHome,
  },
];

const allProjects: SpecimenProject[] = [
  ...mainProjects,
  ...additionalProjects,
];

export default function AllProjects() {
  const [, setLocation] = useLocation();
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const toggleFlip = (id: number) => {
    setFlippedId((current) => (current === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section
        className="section-y relative overflow-hidden"
        style={{ paddingTop: "calc(var(--nav-offset) + var(--section-y))" }}
      >
        <DotPattern />
        <div className="page-shell relative z-10">
          <div className="mb-12 text-center sm:mb-16">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Full archive
            </p>
            <motion.h1
              className="text-title mb-6 font-semibold tracking-tight text-foreground"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              Project <span className="text-primary">Specimens</span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.15,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              Every build, catalogued. Click a plate to flip it open — only one
              stays flipped at a time.
            </motion.p>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${project.title}`}
                className="min-w-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.2,
                  delay: Math.min(index * 0.03, 0.3),
                  ease: "easeOut",
                }}
              >
                <ProjectSpecimenCard
                  project={project}
                  index={index}
                  variant="grid"
                  flipped={flippedId === project.id}
                  onFlip={() => toggleFlip(project.id)}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => setLocation("/")}
              className="inline-block border border-foreground bg-foreground px-6 py-3 text-lg font-semibold text-background transition-opacity duration-300 hover:opacity-90"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
