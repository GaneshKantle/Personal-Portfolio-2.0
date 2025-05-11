import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "DeFi Dashboard",
    description: "A comprehensive dashboard for tracking decentralized finance investments. Features include portfolio management, token swaps, yield farming tracking, and real-time price updates.",
    category: "Featured Project",
    categoryColor: "primary",
    technologies: ["React.js", "Web3.js", "Ethers.js", "Chart.js"],
    githubUrl: "#",
    liveUrl: "#",
    image: (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-md border border-border">
        <div className="p-4 bg-card border-b border-border flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">DeFi Dashboard</div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold">Portfolio Value</div>
            <div className="text-primary font-bold">$12,450.83</div>
          </div>
          <div className="w-full h-32 bg-card rounded-lg mb-4"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-card p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">ETH</div>
              <div className="font-bold">2.45 ETH</div>
            </div>
            <div className="bg-card p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">BTC</div>
              <div className="font-bold">0.18 BTC</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "TaskMaster Pro",
    description: "A productivity application with advanced task management features. Includes customizable boards, lists, time tracking, labels, priorities, and team collaboration tools.",
    category: "Web Application",
    categoryColor: "secondary",
    technologies: ["React.js", "Redux", "Firebase", "Styled Components"],
    githubUrl: "#",
    liveUrl: "#",
    image: (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-md border border-border">
        <div className="p-4 bg-card border-b border-border">
          <div className="text-lg font-bold mb-2">My Tasks</div>
          <div className="flex space-x-2 text-sm">
            <div className="bg-[#10B981]/20 text-[#10B981] px-2 py-1 rounded">All</div>
            <div className="bg-card px-2 py-1 rounded">Today</div>
            <div className="bg-card px-2 py-1 rounded">Upcoming</div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="p-3 bg-card rounded-lg flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Update portfolio website</span>
            </div>
            <div className="p-3 bg-card rounded-lg flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Research Web3 technologies</span>
            </div>
            <div className="p-3 bg-card rounded-lg flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Prepare for tech conference</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-[#10B981] text-white py-2 rounded-lg">Add Task</button>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "NFT Marketplace",
    description: "A platform for artists to mint, sell, and trade NFTs. Features include wallet integration, collection management, auction functionality, and real-time bidding.",
    category: "Blockchain Project",
    categoryColor: "accent",
    technologies: ["React.js", "Solidity", "IPFS", "Metamask"],
    githubUrl: "#",
    liveUrl: "#",
    image: (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-md border border-border">
        <div className="h-40 bg-gradient-to-r from-[#8B5CF6]/30 to-primary/30"></div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg mb-1">Cosmic Dreams #042</h4>
              <p className="text-sm text-muted-foreground">Created by @artist</p>
            </div>
            <div className="bg-[#8B5CF6]/20 text-[#8B5CF6] px-3 py-1 rounded-full text-sm">
              3.2 ETH
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-[#8B5CF6] text-white py-2 rounded-lg">Buy Now</button>
            <button className="flex-1 bg-card text-white py-2 rounded-lg">Place Bid</button>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const controls = useAnimation();
  const { ref, inView } = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Set color based on category
  const getCategoryColor = (color: string) => {
    switch(color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'secondary':
        return 'bg-[#10B981]/10 text-[#10B981]';
      case 'accent':
        return 'bg-[#8B5CF6]/10 text-[#8B5CF6]';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  // Handle project scrolling and animation
  useEffect(() => {
    const handleProjectScroll = () => {
      const projectCards = document.querySelectorAll('.project-card');
      const windowHeight = window.innerHeight;
      
      projectCards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardTop = cardElement.getBoundingClientRect().top;
        const cardCenter = cardTop + cardElement.offsetHeight / 2;
        
        // Check if card center is in the middle portion of the viewport
        if (cardCenter > windowHeight * 0.35 && cardCenter < windowHeight * 0.65) {
          setActiveProject(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleProjectScroll);
    handleProjectScroll(); // Run once on page load
    
    return () => {
      window.removeEventListener('scroll', handleProjectScroll);
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.5 }}
          >
            My <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto rounded-full"
            initial={{ opacity: 0, width: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, width: 80 },
              hidden: { opacity: 0, width: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Check out some of my highlighted projects. Scroll through to explore each one.
          </motion.p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="space-y-24" id="projects-container">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card bg-background rounded-2xl shadow-xl overflow-hidden border border-border hover:border-primary transition-all ${
                  activeProject === index ? 'scale-105 z-10' : 
                  activeProject !== null ? 'scale-95 -translate-y-5 opacity-70' : ''
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 1, 0.5, 1]
                }}
              >
                <div className="md:flex">
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:w-1/2 p-6 md:p-8">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-mono mb-4 ${getCategoryColor(project.categoryColor)}`}>
                          {project.category}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-display">{project.title}</h3>
                        <p className="text-muted-foreground mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-card px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-4">
                          <a href={project.githubUrl} className={`text-${project.categoryColor === 'primary' ? 'primary' : project.categoryColor === 'secondary' ? '[#10B981]' : '[#8B5CF6]'} hover:text-primary/80 transition-colors`}>
                            <i className="fab fa-github"></i> Source
                          </a>
                          <a href={project.liveUrl} className={`text-${project.categoryColor === 'primary' ? 'primary' : project.categoryColor === 'secondary' ? '[#10B981]' : '[#8B5CF6]'} hover:text-primary/80 transition-colors`}>
                            <i className="fas fa-external-link-alt"></i> Live Demo
                          </a>
                        </div>
                      </div>
                      <div className="md:w-1/2 bg-card flex items-center justify-center p-6">
                        {project.image}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 bg-card flex items-center justify-center p-6">
                        {project.image}
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-mono mb-4 ${getCategoryColor(project.categoryColor)}`}>
                          {project.category}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-display">{project.title}</h3>
                        <p className="text-muted-foreground mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-card px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-4">
                          <a href={project.githubUrl} className={`text-${project.categoryColor === 'primary' ? 'primary' : project.categoryColor === 'secondary' ? '[#10B981]' : '[#8B5CF6]'} hover:text-opacity-80 transition-colors`}>
                            <i className="fab fa-github"></i> Source
                          </a>
                          <a href={project.liveUrl} className={`text-${project.categoryColor === 'primary' ? 'primary' : project.categoryColor === 'secondary' ? '[#10B981]' : '[#8B5CF6]'} hover:text-opacity-80 transition-colors`}>
                            <i className="fas fa-external-link-alt"></i> Live Demo
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-bold transition-all transform hover:scale-105 hover:shadow-lg"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
