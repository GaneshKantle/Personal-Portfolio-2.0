import { motion } from "framer-motion";

const aboutCards = [
  { icon: "fas fa-code", title: "Frontend Dev", color: "text-primary" },
  { icon: "fas fa-laptop-code", title: "Web3 Explorer", color: "text-[#10B981]" },
  { icon: "fas fa-pen-fancy", title: "Tech Writer", color: "text-[#8B5CF6]" },
  { icon: "fas fa-users", title: "Team Player", color: "text-primary" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="p-6 sm:p-8 bg-background rounded-2xl shadow-lg border border-border mb-10 transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ rotateX: 5, rotateY: 5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-mono">
                I'm a passionate frontend developer with 3+ years of experience creating beautiful, responsive web applications. My expertise lies in React.js and JavaScript, with a growing interest in Web3, blockchain technologies, and Solidity development.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-mono">
                I enjoy turning complex problems into simple, elegant solutions. When I'm not coding, I'm writing technical blogs or contributing to open-source projects.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-mono">
                I'm constantly learning and exploring new technologies to stay at the cutting edge of web development.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {aboutCards.map((card, index) => (
              <motion.div 
                key={index}
                className="bg-background p-4 rounded-lg border border-border hover:border-primary transition-colors"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`text-3xl ${card.color} mb-2`}>
                  <i className={card.icon}></i>
                </div>
                <h3 className="font-bold">{card.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
