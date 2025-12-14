import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { getAllProjects } from "../../shared/projectData";
import ClientProfile from "../../img/client-portfolio.png";
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

// Define the project type
// Replace your current interface with this:
interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    image: string | JSX.Element;
    categoryColor: string;
    tagline?: string;
    longDescription?: string;
    demoUrl?: string;
    documentationUrl?: string;
    features?: string[];
    challenges?: string[];
    learnings?: string[];
    screenshots?: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
    architecture?: string;
    deployment?: string;
    status?: string;
    developmentTime?: string;
    teamSize?: string;
    impact?: string;
    category?: string;
    difficulty?: string;
  }

// Get main projects from shared data
const mainProjects = getAllProjects();

// Additional projects that will only show on this page
const additionalProjects: Project[] = [
  
    {
        id: 5,
        title: "Loan Calculator App",
    description:
          "Compute EMI and visualize loan payments over time.\nConvert EMI to multiple currencies with live exchange rates and theme toggle.",
    categoryColor: "primary",
    technologies: [
          "Material UI 5",
          "React Router DOM 7",
      "Axios",
          "Custom Hooks"
          // "ExchangeRate-API"
        ],
        githubUrl: "https://github.com/GaneshKantle/Loan-Calculator",
        liveUrl: "https://loan-calcii.vercel.app/",
    image: (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
              <div className="text-xs text-gray-600">{`Loan Calculator`}</div>
        </div>
                <img
          src={LoanCalculator}
          alt="Loan Calculator App"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
      </div>
    ),
  },
  {
        id: 5,
        title: "Recipe Skeleton Master",
    description:
          "Browse and search curated recipes with a clean, restaurant-style UI. Fetches live data from DummyJSON and filters by name or cuisine.",
    categoryColor: "primary",
    technologies: [
          "Material UI",
          "Emotion",
          "Framer Motion",
          "Jest + Testing Library",
          "JavaScript"
        ],
        githubUrl: "https://github.com/GaneshKantle/Recipe-Skeleton-Master",
        liveUrl: "https://recipe-skeleton-master.vercel.app/",
    image: (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
              <div className="text-xs text-gray-600">{`Recipe Book`}</div>
        </div>
                <img
          src={RecipeBook}
          alt="Recipe-Skeleton-Master Screenshot"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },
      {
        id: 6,
        title: "PotHole Portal",
        description:
          "Crowdsourced Road Repair Platform. Detect and report potholes via user submissions.\nAuthorities review, verify, and manage repairs through an admin dashboard.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "PHP",
          "Google Maps JavaScript API"
        ],
        githubUrl: "https://github.com/GaneshKantle/Pothole-Portal",
        liveUrl: "https://pothole-portal.vercel.app/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            {/* Top Bar */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`Pothole‑Portal`}</div>
            </div>
      
            {/* Preview image */}
                    <img
          src={PotholePortal}
          alt="Pothole‑Portal Dashboard Screenshot"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
      </div>
    ),
  },
  {
        id: 1,
        title: "NFT - DApp",
    description:
          "Mnting DApp for ERC‑721 tokens on Ethereum.\nConnect with MetaMask, enter an IPFS/Pinata token URI, and mint to your wallet.",
    categoryColor: "primary",
    technologies: [
          "Solidity",
          "Remix IDE",
          "Web3.js",
          "MetaMask",
          "IPFS",
          "Ethereum "
        ],
        githubUrl: "https://github.com/GaneshKantle/My-Non-Fungible-Token-DApp",
        liveUrl: "https://non-fungible-token-dapp.vercel.app",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`MyNFT DApp`}</div>
            </div>
                    <img
          src={MyNFT}
          alt="My NFT DApp Preview"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },
      {
        id: 1,
        title: "EmpowHER",
        description:
          " Smart Safety Ring, Interactive concept site for a smart safety ring.\nShows how SOS alerts, live location, and emergency workflows would work.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Lottie Web",
          "Google Model Viewer"
        ],
        githubUrl: "https://github.com/GaneshKantle/Smart-Safety-Ring",
        liveUrl: "https://smart-safety-ring.vercel.app/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`Smart-Safety-Ring`}</div>
            </div>
                    <img
          src={SmartSafetyRing}
          alt="Smart Safety Ring Website"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },

      {
        id: 1,
        title: "VoteWise DApp",
        description:
          "Cast votes for any candidate by name and see real-time counts on-chain. Connect with MetaMask to interact with a deployed Solidity contract via Web3.js.",
        categoryColor: "primary",
        technologies: [
          "Web3.js 4",
          "Solidity",
          "MetaMask",
          "Remix IDE",
          "Hardhat",
        ],
        githubUrl: "https://github.com/GaneshKantle/Ethereum-Voting-DApp",
        liveUrl: "https://votewise-dapp.vercel.app/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`VoteWise`}</div>
            </div>
                    <img
          src={VoteWise}
          alt="Ethereum Voting DApp Screenshot"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },

      {
        id: 1,
        title: "Kantle's Wardrobe",
        description:
          "Business portfolio for a men's fashion brand with product showcases.\nBrowse shirts and pants, view item pages, and access contact/social links.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "CSS3",
          "Vanilla JavaScript",
          "Google Fonts"
        ],
        githubUrl: "https://github.com/GaneshKantle/KANTLE-Wardrobe",
        liveUrl: "https://kantles-wardrobe.vercel.app/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`Kantle's Wardrobe`}</div>
            </div>
                    <img
          src={KantlesWardrobe}
          alt="Kantle's Wardrobe Screenshot"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },

      {
        id: 1,
        title: "Client's Portfolio",
        description:
          "Responsive single‑page portfolio built for a client to showcase skills, education, and projects. Direct contact via mail-to and WhatsApp, plus links to GitHub and LinkedIn.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "CSS3",
          "JavaScript6",
          "Font Awesome 6",
          "Mailto/WhatsApp deep links"
        ],
        githubUrl: "https://github.com/GaneshKantle/Freelance-Work-Portfolio",
        liveUrl: "https://ganeshkantle.github.io/Freelance-Work-Portfolio/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`Freelance-Work-Portfolio`}</div>
            </div>
                    <img
          src={ClientPortfolio}
          alt="Anu Prakash Portfolio Preview"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },
      {
        id: 1,
        title: "Image Gallery",
        description:
          "Interactive, responsive image grid with smooth hover animations and a fullscreen viewer. Click any image to open an overlay; press X/ESC to close.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "CSS3",
          "Vanilla",
          "GitHub Pages"
        ],
        githubUrl: "https://github.com/GaneshKantle/Image-Gallery",
        liveUrl: "https://ganeshkantle.github.io/Image-Gallery/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`Image Gallery`}</div>
            </div>
                    <img
          src={ImageGallery}
          alt="Image Gallery Screenshot"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },

      {
        id: 1,
        title: "Internship Management Portal",
        description:
          "Browse internships with filters and detailed descriptions.\nApply and track application status via a student dashboard.\nSave jobs and manage your profile.",
        categoryColor: "primary",
        technologies: [
          "Tailwind CSS 3",
          "daisyUI 5",
          "Express 4",
          "Node.js",
          "PostCSS 8"
        ],
        githubUrl: "https://github.com/GaneshKantle/AI-Job-Management-Portal",
        liveUrl: "https://ai-job-management-portal.vercel.app",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`AI-Job-Portal`}</div>
            </div>
                    <img
          src={JobPortal}
          alt="AI Job Management Portal Screenshot"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },

      {
        id: 1,
        title: "Farm Direct",
        description:
          "Connects farmers and buyers through an assured contract farming marketplace.\nBrowse profiles, send requests, draft agreements, and view simple market trends.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "CSS3",
          "Vanilla JavaScript",
          "Chart.js (CDN)",
        ],
        githubUrl: "https://github.com/GaneshKantle/Farm-Direct",
        liveUrl: "https://farm-directs.vercel.app/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`Farm Direct`}</div>
            </div>
                    <img
          src={FarmDirect}
          alt="Farm Direct Screenshot"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },

      {
        id: 1,
        title: "Netflix Clone",
        description: "Responsive clone of the Netflix landing page. Replicates hero sections, device/kids highlights, FAQ, and footer.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "CSS3",
          "JavaScript (Vanilla)",
          "Font Awesome 6"
        ],
        githubUrl: "https://github.com/GaneshKantle/Netflix-Clone",
        liveUrl: "https://ganeshkantle.github.io/Netflix-Clone/",
        image: (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-600">{`Netflix Clone`}</div>
            </div>
                    <img
          src={NetflixClone}
          alt="Netflix Clone Landing Page Preview"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
          </div>
        ),
      },

      {
        id: 1,
        title: "Figma Smart Home Controller",
        description:
          "Interactive UI/UX concept for a smart home controller, embedded directly from Figma. Showcases Home, Living Room, Alarms, Search Devices etc with a modern, responsive layout.",
        categoryColor: "primary",
        technologies: [
          "HTML5",
          "Google Fonts",
          "Figma Embed",
          "GitHub Pages"
        ],
        githubUrl: "https://github.com/GaneshKantle/Figma-Smart-Home-Controller",
        liveUrl: "https://ganeshkantle.github.io/Figma-Smart-Home-Controller/",
    image: (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
              <div className="text-xs text-gray-600">{`Figma Smart Home`}</div>
        </div>
                <img
          src={FigmaSmartHome}
          alt="Smart Home UI preview"
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
      </div>
    ),
  },

      
];

// Function to convert string image paths to JSX elements for main projects
const convertMainProjectsToJSX = (projects: any[]) => {
  return projects.map(project => ({
    ...project,
    image: (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-md border border-gray-200">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-600">{project.title}</div>
        </div>
        <img
          src={project.image}
          alt={`${project.title} Screenshot`}
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 object-cover rounded-b-xl"
        />
      </div>
    )
  }));
};

// Convert main projects to have JSX images and combine with additional projects
const allProjects = [...convertMainProjectsToJSX(mainProjects), ...additionalProjects];

export default function AllProjects() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              All <span className="text-blue-600">Projects</span>
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              Explore my complete portfolio of projects. Each project showcases different skills and technologies I've worked with.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
            {allProjects.map((project: Project, index: number) => (
              <motion.div
                key={project.id}
                className="project-card relative z-10 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] h-full min-w-0"                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
                whileHover={{ y: -3 }}
              >
                <div className="flex flex-col h-full">
                  <div className="bg-gray-50 flex items-center justify-center p-3 sm:p-4 lg:p-5">
                    {/* Render the project image directly since it's already JSX.Element */}
                    {project.image}
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 flex-1 text-xs sm:text-sm lg:text-base leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {project.technologies.slice(0, 6).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-gray-700 border border-gray-200"
                        >
                           {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs text-gray-700 border border-gray-200">
                          +{project.technologies.length - 6}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto space-y-2">
                      {/* First row: Source and Live buttons side by side */}
                      <div className="flex space-x-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out py-2 px-3 rounded-lg text-sm font-medium text-center flex items-center justify-center"
                        >
                          <i className="fab fa-github mr-2"></i> 
                          <span className="hidden sm:inline">Source</span>
                          <span className="sm:hidden">Src</span>
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border border-gray-200 hover:border-blue-300 transition-all duration-300 ease-in-out py-2 px-3 rounded-lg text-sm font-medium text-center flex items-center justify-center"
                        >
                          <i className="fas fa-external-link-alt mr-2"></i> 
                          <span className="hidden sm:inline">Live</span>
                          <span className="sm:hidden">Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Back to Home Button */}
          <div className="text-center mt-16">
            <button
              onClick={() => setLocation("/")}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 hover:border-blue-700 transition-all duration-300 ease-in-out py-3 px-6 rounded-full text-lg font-semibold transform hover:scale-[1.02] hover:shadow-md"
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
