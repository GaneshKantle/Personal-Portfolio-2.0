import { motion } from "framer-motion";
import { scrollToElement } from "@/lib/utils";

const socialLinks = [
  { icon: "fab fa-linkedin-in", url: "#", label: "LinkedIn" },
  { icon: "fab fa-github", url: "#", label: "GitHub" },
  { icon: "fab fa-twitter", url: "#", label: "Twitter" },
  { icon: "fab fa-medium", url: "#", label: "Medium" },
  { icon: "fab fa-instagram", url: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-xl font-bold font-mono text-primary mr-1">&lt;</span>
              <span className="text-xl font-bold font-mono">DevPortfolio</span>
              <span className="text-xl font-bold font-mono text-primary ml-1">/&gt;</span>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">Frontend Developer • Web3 Explorer • Tech Writer</p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
          
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </footer>
  );
}

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button 
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up"></i>
    </motion.button>
  );
}
