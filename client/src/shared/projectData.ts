import openDraft from "../img/openDraft.png";
import eyeDentify from "../img/eye-dentify.png";
import Project1 from "../img/project1.png";
import Project2 from "../img/project2.png";

// Unified project data structure with both basic and detailed information
export const projectsData = [
  {
    id: 1,
    title: "EYE'dentify",
    tagline: "Forensic Face Recognition & Sketch System",
    description: "Forensic face sketch and recognition system for law enforcement and investigators. Create composite sketches, upload images, and match against a criminal database with real-time results.",
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
    id: 2,
    title: "OpenDraft",
    tagline: "AI-Powered Resume Builder",
    description: "AI Resume Builder: Build professional, real‑time preview, and one‑click PDF export. Modern templates, responsive UI, no signup required.",
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
    id: 3,
    title: "Video Editor Portfolio",
    tagline: "Professional Portfolio Showcase",
    description: "Developed as a Freelance project where I engineered a sleek, responsive portfolio of my client. Highlights: React, TypeScript, Google Drive, dark mode, SVG icons.",
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
    id: 4,
    title: "Stroke Risk Prediction System",
    tagline: "ML-Powered Health Risk Assessment",
    description: "A machine learning web app predicting stroke risk using five models for high accuracy. Users input health data for early detection.",
    longDescription: "An advanced machine learning application that predicts stroke risk using multiple algorithms for enhanced accuracy. The system analyzes various health parameters and provides risk assessments with detailed explanations. Built with Python and Flask, it offers a user-friendly interface for healthcare professionals and individuals to assess stroke risk factors.",
    categoryColor: "primary",
    technologies: [
      "Python",
      "Flask",
      "JavaScript",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Machine Learning",
      "Data Analysis"
    ],
    githubUrl: "https://github.com/GaneshKantle/Stroke-Risk-Prediction-using-ML",
    liveUrl: "https://stroke-risk-prediction.herokuapp.com/",
    demoUrl: "https://stroke-risk-prediction.herokuapp.com/",
    documentationUrl: "https://github.com/GaneshKantle/Stroke-Risk-Prediction-using-ML/blob/main/README.md",
    features: [
      "Multiple ML model ensemble",
      "Real-time risk assessment",
      "Detailed health parameter input",
      "Risk factor explanations",
      "Data visualization",
      "Export capabilities",
      "Responsive web interface",
      "Secure data handling"
    ],
    challenges: [
      "Training accurate ML models",
      "Handling medical data responsibly",
      "Creating intuitive input forms",
      "Optimizing model performance",
      "Ensuring data privacy"
    ],
    learnings: [
      "Machine learning model development",
      "Medical data handling",
      "Flask web development",
      "Data preprocessing techniques",
      "Model evaluation and validation"
    ],
    screenshots: [
      { src: Project2, alt: "Input Form", caption: "Health parameter input interface" },
      { src: Project2, alt: "Results Dashboard", caption: "Risk assessment results and visualization" },
      { src: Project2, alt: "Model Comparison", caption: "Multiple model performance comparison" }
    ],
    architecture: "Flask backend with machine learning models and responsive frontend",
    deployment: "Heroku",
    status: "Live",
    developmentTime: "2.5 months",
    teamSize: "Solo",
    impact: "Potential to improve early stroke detection and prevention",
    image: Project2,
    category: "Healthcare/ML",
    difficulty: "Advanced"
  }
];

// Helper function to get project by ID
export const getProjectById = (id: number) => {
  return projectsData.find(project => project.id === id);
};

// Helper function to get all projects
export const getAllProjects = () => {
  return projectsData;
};
