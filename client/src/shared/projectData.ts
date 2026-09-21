import openDraft from "../img/opendraft.png";
import eyeDentify from "../img/eye-dentify.png";
import brainWMe from "../img/brainwme.png";
import readItTwin from "../img/readittwin.png";
import parallelYou from "../img/parallelyou.png";
import liquorHub from "../img/liquorhub.jpeg";
import Project1 from "../img/project1.png";
import Project2 from "../img/project2.png";
import ammasManeTindi from "../img/ammas-mane-tindi.png";

// Unified project data structure with both basic and detailed information
export const projectsData = [
  {
    id: 8,
    title: "AMMA'S MANE TINDI",
    tagline: "A brand site for a home kitchen",
    description:
      "A client website for a new homemade food brand. It shows their Karnataka kitchen, bulk orders, and tailoring — then sends people to WhatsApp to order.",
    longDescription:
      "A bilingual brand website for a home kitchen in Kothanur, Bengaluru. The site introduces AMMA'S MANE TINDI as a takeout-only vegetarian kitchen — everyday Karnataka food, bulk orders for functions, and blouse tailoring alongside the kitchen. There is no online checkout: visitors browse the menu and services, then WhatsApp the kitchen to order and collect. Built as a Next.js brand site with English and Kannada copy, a warm illustrated visual language, and clear paths for food, gatherings, and stitching.",
    categoryColor: "primary",
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
      {
        src: ammasManeTindi,
        alt: "Homepage",
        caption: "Brand homepage with Kannada tagline and kitchen story",
      },
      {
        src: ammasManeTindi,
        alt: "Food & bulk orders",
        caption: "Menu, custom cooking, and function orders via WhatsApp",
      },
      {
        src: ammasManeTindi,
        alt: "Tailoring",
        caption: "Blouse stitching and finishing work alongside the kitchen",
      },
    ],
    architecture:
      "Next.js App Router marketing site with typed pages for food, bulk orders, tailoring, about, and contact",
    deployment: "Vercel",
    status: "Live",
    developmentTime: "1 week",
    teamSize: "Solo (Freelance)",
    impact:
      "Gave a new homemade food and tailoring brand a live web presence that sends neighbours to WhatsApp to order",
    image: ammasManeTindi,
    category: "Web Application",
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
    categoryColor: "primary",
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
      {
        src: readItTwin,
        alt: "Landing Page",
        caption: "Product landing with solo and challenge entry points",
      },
      {
        src: readItTwin,
        alt: "Race Lobby",
        caption: "Two-player room lobby with ready states",
      },
      {
        src: readItTwin,
        alt: "Results View",
        caption: "WPM, comprehension, and rematch results screen",
      },
    ],
    architecture:
      "React SPA with Vite, synchronized via Supabase Realtime and Postgres RPCs for authoritative multiplayer scoring",
    deployment: "Vercel",
    status: "Live",
    developmentTime: "2 weeks",
    teamSize: "Solo",
    impact:
      "Turns reading practice into a competitive, shareable challenge that scores both speed and understanding",
    image: readItTwin,
    category: "Web Application",
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
    categoryColor: "primary",
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
      {
        src: brainWMe,
        alt: "Encyclopedia Home",
        caption: "Volume-based encyclopedia of the JS/TS ecosystem",
      },
      {
        src: brainWMe,
        alt: "Category View",
        caption: "Tools grouped by job with illustrated part cards",
      },
      {
        src: brainWMe,
        alt: "Workshop",
        caption: "Interactive stack assembly with wiring rules",
      },
    ],
    architecture:
      "Next.js App Router content site with typed tool/category catalog and client-side workshop state",
    deployment: "Vercel",
    status: "Live",
    developmentTime: "1 week",
    teamSize: "Solo",
    impact:
      "Helps developers understand the JS/TS map without treating React as the whole language",
    image: brainWMe,
    category: "Web Application",
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
    categoryColor: "primary",
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
      {
        src: parallelYou,
        alt: "Landing Input",
        caption: "Enter date, time, and place of birth",
      },
      {
        src: parallelYou,
        alt: "Exact Moment",
        caption: "Sky and place for that instant",
      },
      {
        src: parallelYou,
        alt: "Human Scale",
        caption: "One life zoomed out through cosmic time",
      },
    ],
    architecture:
      "Next.js App Router exhibition: landing birth input → /explore sections powered by curated catalogs and calculated resolvers",
    deployment: "Vercel",
    status: "Live",
    developmentTime: "1–2 months",
    teamSize: "Solo",
    impact:
      "Makes one real birth night feel specific — then quietly shows how small one life is against history and the universe",
    image: parallelYou,
    category: "Web Application",
    difficulty: "Intermediate",
  },

  {
    id: 4,
    title: "EYE'dentify",
    tagline: "Draw a face and find a match",
    description: "Draw a face or upload a photo. The app looks for a matching person in a list, like a digital detective game.",
    longDescription: "EYE'dentify is a comprehensive forensic investigation tool that combines advanced computer vision with user-friendly interfaces to assist law enforcement agencies in criminal identification. The system can process both hand-drawn sketches and real photographs, using sophisticated algorithms to match faces against criminal databases with high accuracy.",
    categoryColor: "primary",
    technologies: [
      "Zustand",
      "Zod",
      "Axios",
      "React Router v6",
      "Flask",
      "OpenCV",
      "Python",
      "Machine Learning",
      "Computer Vision"
    ],
    githubUrl: "https://github.com/GaneshKantle/EYE-dentify",
    liveUrl: "https://eye-dentify.vercel.app/",
    demoUrl: "https://eye-dentify.vercel.app/demo",
    documentationUrl: "https://github.com/GaneshKantle/EYE-dentify/blob/main/README.md",
    features: [
      "Real-time face detection and recognition",
      "Composite sketch creation tools",
      "Database matching with confidence scores",
      "Multi-format image support",
      "Responsive web interface",
      "Secure authentication system",
      "Export and reporting capabilities"
    ],
    challenges: [
      "Implementing accurate face recognition algorithms",
      "Optimizing performance for large databases",
      "Creating intuitive sketch tools",
      "Ensuring data privacy and security",
      "Handling various image formats and qualities"
    ],
    learnings: [
      "Advanced computer vision techniques",
      "State management with Zustand",
      "API design and optimization",
      "Security best practices",
      "Performance optimization strategies"
    ],
    screenshots: [
      { src: eyeDentify, alt: "Main Dashboard", caption: "Main dashboard with face detection interface" },
      { src: eyeDentify, alt: "Sketch Tool", caption: "Interactive sketch creation tool" },
      { src: eyeDentify, alt: "Results View", caption: "Matching results with confidence scores" }
    ],
    architecture: "Full-stack web application with React frontend, Flask backend, and OpenCV for image processing",
    deployment: "Vercel (Frontend) + Heroku (Backend)",
    status: "Live",
    developmentTime: "3 months",
    teamSize: "Solo",
    impact: "Potential to revolutionize forensic investigation workflows",
    image: eyeDentify,
    category: "AI/ML",
    difficulty: "Advanced"
  },
  {
    id: 5,
    title: "OpenDraft",
    tagline: "Make a resume in minutes",
    description: "Fill in your details and watch your resume appear right away. When you are done, download it as a PDF. No sign-up needed.",
    longDescription: "OpenDraft is a sophisticated resume builder that leverages AI to help users create professional, ATS-friendly resumes. The application features real-time preview, multiple professional templates, and seamless PDF export functionality. Built with modern web technologies, it provides an intuitive user experience without requiring user registration.",
    categoryColor: "primary",
    technologies: [
      "TypeScript",
      "Vite",
      "shadcn/ui",
      "Radix UI",
      "Zod",
      "html2pdf.js",
      "Tailwind CSS",
      "React Hook Form"
    ],
    githubUrl: "https://github.com/GaneshKantle/OpenDraft-Resume-Builder",
    liveUrl: "https://open-draft-cv.vercel.app/",
    demoUrl: "https://open-draft-cv.vercel.app/",
    documentationUrl: "https://github.com/GaneshKantle/OpenDraft-Resume-Builder/blob/main/README.md",
    features: [
      "AI-powered content suggestions",
      "Real-time preview with multiple templates",
      "One-click PDF export",
      "ATS-friendly formatting",
      "Responsive design for all devices",
      "No registration required",
      "Professional template library",
      "Customizable sections and layouts"
    ],
    challenges: [
      "Implementing real-time preview updates",
      "Creating responsive PDF generation",
      "Designing intuitive template system",
      "Optimizing performance for large documents",
      "Ensuring cross-browser compatibility"
    ],
    learnings: [
      "Advanced TypeScript patterns",
      "Component library design",
      "PDF generation techniques",
      "Performance optimization",
      "User experience design principles"
    ],
    screenshots: [
      { src: openDraft, alt: "Template Selection", caption: "Professional template selection interface" },
      { src: openDraft, alt: "Editor View", caption: "Real-time resume editor with preview" },
      { src: openDraft, alt: "Export Options", caption: "PDF export and download options" }
    ],
    architecture: "Single-page React application with TypeScript and modern UI components",
    deployment: "Vercel",
    status: "Live",
    developmentTime: "2 months",
    teamSize: "Solo",
    impact: "Simplified resume creation for job seekers worldwide",
    image: openDraft,
    category: "Web Application",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    title: "Video Editor Portfolio",
    tagline: "A showcase site for a client",
    description: "A clean website I built for a client. It shows their video work in a simple, easy-to-browse layout.",
    longDescription: "A modern, responsive portfolio website designed for a professional video editor. The project showcases creative work through an elegant interface with smooth animations, dark mode support, and integration with Google Drive for content management. Built with performance and user experience as top priorities.",
    categoryColor: "primary",
    technologies: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Google Drive API",
      "Framer Motion",
      "Responsive Design"
    ],
    githubUrl: "https://github.com/GaneshKantle/Client-Portfolio",
    liveUrl: "https://vijaykumar-gamma.vercel.app/",
    demoUrl: "https://vijaykumar-gamma.vercel.app/",
    documentationUrl: "https://github.com/GaneshKantle/Client-Portfolio/blob/main/README.md",
    features: [
      "Responsive design for all devices",
      "Dark/light mode toggle",
      "Google Drive integration",
      "Smooth scroll animations",
      "Portfolio gallery with filters",
      "Contact form with validation",
      "SEO optimization",
      "Performance optimization"
    ],
    challenges: [
      "Integrating Google Drive API",
      "Creating smooth animations",
      "Optimizing for mobile devices",
      "Implementing dark mode",
      "Ensuring fast loading times"
    ],
    learnings: [
      "Client communication and requirements gathering",
      "Google Drive API integration",
      "Animation and interaction design",
      "Performance optimization techniques",
      "Freelance project management"
    ],
    screenshots: [
      { src: Project1, alt: "Homepage", caption: "Elegant homepage with hero section" },
      { src: Project1, alt: "Portfolio Gallery", caption: "Interactive portfolio gallery" },
      { src: Project1, alt: "Contact Form", caption: "Professional contact form" }
    ],
    architecture: "Next.js application with React and TypeScript",
    deployment: "Vercel",
    status: "Live",
    developmentTime: "1.5 months",
    teamSize: "Solo (Freelance)",
    impact: "Enhanced client's online presence and professional image",
    image: Project1,
    category: "Portfolio",
    difficulty: "Intermediate"
  },
  {
    id: 7,
    title: "LiquorHub",
    tagline: "An online shop for drinks",
    description:
      "An online store where you can browse drinks, save favorites, fill a cart, and place an order. Built like a real shopping website.",
    longDescription:
      "LiquorHub is a J2EE e-commerce web application for browsing, carting, and ordering spirits. Built with Java Servlets, JSP, JDBC, and MySQL on Apache Tomcat, it features account management, category catalogues, wishlist, cart/checkout with payment records, order history, and a rare collection of collector bottles. An age gate and liquor quiz gate first-time visitors. Designed as an educational full-stack demo of classic layered Java web architecture.",
    categoryColor: "primary",
    technologies: [
      "Java 17",
      "Jakarta Servlets",
      "JSP",
      "JDBC",
      "MySQL 8",
      "Apache Tomcat 10",
      "HTML/CSS",
      "JavaScript",
    ],
    githubUrl: "https://github.com/GaneshKantle/Liquor-Hub",
    liveUrl: "https://github.com/GaneshKantle/Liquor-Hub",
    demoUrl: "https://github.com/GaneshKantle/Liquor-Hub",
    documentationUrl:
      "https://github.com/GaneshKantle/Liquor-Hub/blob/main/README.md",
    features: [
      "Age gate and liquor quiz on first visit",
      "User registration, login, and profile dashboard",
      "Password forget/reset flow",
      "Multi-category product catalogue with search/browse",
      "Wishlist and favourites",
      "Cart, buy-now, and checkout with payment records",
      "Order history and order detail views",
      "Curated rare bottle collection",
      "Custom 404 and responsive storefront UI",
    ],
    challenges: [
      "Designing a clean Servlet–DAO–JDBC layered architecture",
      "Managing session-based cart and auth flows",
      "Modeling relational schema for cart, orders, and payments",
      "Building a cohesive multi-page JSP UI with shared fragments",
      "Seeding and maintaining a realistic product catalogue",
    ],
    learnings: [
      "Jakarta EE servlet and JSP request lifecycle",
      "JDBC persistence patterns with DAO interfaces",
      "Session management for e-commerce workflows",
      "MySQL schema design for orders and inventory",
      "Tomcat deployment and Dynamic Web Project setup",
    ],
    screenshots: [
      {
        src: liquorHub,
        alt: "Home Catalogue",
        caption: "Curated home shelves and category browse",
      },
      {
        src: liquorHub,
        alt: "Cart & Checkout",
        caption: "Cart management and buy-now checkout",
      },
      {
        src: liquorHub,
        alt: "Rare Collection",
        caption: "Collector bottle dossiers with tasting notes",
      },
    ],
    architecture: "Layered J2EE app: JSP views → HttpServlets → DAO/JDBC → MySQL",
    deployment: "Apache Tomcat 10+",
    status: "Demo / Educational",
    developmentTime: "2–3 months",
    teamSize: "Solo",
    impact:
      "Hands-on full-stack e-commerce demo covering auth, catalogue, cart, and orders",
    image: liquorHub,
    category: "Web Application",
    difficulty: "Intermediate",
  },
  // {
  //   id: 8,
  //   title: "Stroke Risk Prediction System",
  //   tagline: "ML-Powered Health Risk Assessment",
  //   description: "A machine learning web app predicting stroke risk using five models for high accuracy. Users input health data for early detection.",
  //   longDescription: "An advanced machine learning application that predicts stroke risk using multiple algorithms for enhanced accuracy. The system analyzes various health parameters and provides risk assessments with detailed explanations. Built with Python and Flask, it offers a user-friendly interface for healthcare professionals and individuals to assess stroke risk factors.",
  //   categoryColor: "primary",
  //   technologies: [
  //     "Python",
  //     "Flask",
  //     "JavaScript",
  //     "Scikit-learn",
  //     "Pandas",
  //     "NumPy",
  //     "Machine Learning",
  //     "Data Analysis"
  //   ],
  //   githubUrl: "https://github.com/GaneshKantle/Stroke-Risk-Prediction-using-ML",
  //   liveUrl: "https://stroke-risk-prediction.herokuapp.com/",
  //   demoUrl: "https://stroke-risk-prediction.herokuapp.com/",
  //   documentationUrl: "https://github.com/GaneshKantle/Stroke-Risk-Prediction-using-ML/blob/main/README.md",
  //   features: [
  //     "Multiple ML model ensemble",
  //     "Real-time risk assessment",
  //     "Detailed health parameter input",
  //     "Risk factor explanations",
  //     "Data visualization",
  //     "Export capabilities",
  //     "Responsive web interface",
  //     "Secure data handling"
  //   ],
  //   challenges: [
  //     "Training accurate ML models",
  //     "Handling medical data responsibly",
  //     "Creating intuitive input forms",
  //     "Optimizing model performance",
  //     "Ensuring data privacy"
  //   ],
  //   learnings: [
  //     "Machine learning model development",
  //     "Medical data handling",
  //     "Flask web development",
  //     "Data preprocessing techniques",
  //     "Model evaluation and validation"
  //   ],
  //   screenshots: [
  //     { src: Project2, alt: "Input Form", caption: "Health parameter input interface" },
  //     { src: Project2, alt: "Results Dashboard", caption: "Risk assessment results and visualization" },
  //     { src: Project2, alt: "Model Comparison", caption: "Multiple model performance comparison" }
  //   ],
  //   architecture: "Flask backend with machine learning models and responsive frontend",
  //   deployment: "Heroku",
  //   status: "Live",
  //   developmentTime: "2.5 months",
  //   teamSize: "Solo",
  //   impact: "Potential to improve early stroke detection and prevention",
  //   image: Project2,
  //   category: "Healthcare/ML",
  //   difficulty: "Advanced"
  // },
];

// Helper function to get project by ID
export const getProjectById = (id: number) => {
  return projectsData.find(project => project.id === id);
};

// Helper function to get all projects
export const getAllProjects = () => {
  return projectsData;
};
