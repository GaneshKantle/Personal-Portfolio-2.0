import { projectEntry, shot } from "./projectShape";
import eyeDentify from "../img/eye-dentify.png";
import openDraft from "../img/opendraft.png";
import Project1 from "../img/project1.png";
import liquorHub from "../img/liquorhub.jpeg";

const projectEntriesRawB = [
  {
    id: 4,
    title: "EYE'dentify",
    tagline: "Draw a face and find a match",
    description: "Draw a face or upload a photo. The app looks for a matching person in a list, like a digital detective game.",
    longDescription: "EYE'dentify is a comprehensive forensic investigation tool that combines advanced computer vision with user-friendly interfaces to assist law enforcement agencies in criminal identification. The system can process both hand-drawn sketches and real photographs, using sophisticated algorithms to match faces against criminal databases with high accuracy.",
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
    developmentTime: "3 months",
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
    developmentTime: "2 months",
    impact: "Simplified resume creation for job seekers worldwide",
    image: openDraft,
    difficulty: "Intermediate"
  },
  {
    id: 6,
    title: "Video Editor Portfolio",
    tagline: "A showcase site for a client",
    description: "A clean website I built for a client. It shows their video work in a simple, easy-to-browse layout.",
    longDescription: "A modern, responsive portfolio website designed for a professional video editor. The project showcases creative work through an elegant interface with smooth animations, dark mode support, and integration with Google Drive for content management. Built with performance and user experience as top priorities.",
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
      shot(liquorHub, "Home Catalogue", "Curated home shelves and category browse"),
      shot(liquorHub, "Cart & Checkout", "Cart management and buy-now checkout"),
      shot(liquorHub, "Rare Collection", "Collector bottle dossiers with tasting notes"),
    ],
    architecture: "Layered J2EE app: JSP views → HttpServlets → DAO/JDBC → MySQL",
    deployment: "Apache Tomcat 10+",
    status: "Demo / Educational",
    developmentTime: "2–3 months",
    impact:
      "Hands-on full-stack e-commerce demo covering auth, catalogue, cart, and orders",
    image: liquorHub,
    difficulty: "Intermediate",
  },
];

export const projectEntriesB = projectEntriesRawB.map(projectEntry);
