import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const technicalSkills = [
  { name: "React.js", percentage: 90 },
  { name: "JavaScript", percentage: 85 },
  { name: "HTML5/CSS3", percentage: 95 },
  { name: "Java", percentage: 75 },
  { name: "Web3/Blockchain", percentage: 60 },
  { name: "Solidity", percentage: 50 },
];

const softSkills = [
  { name: "Teamwork", rating: 5, icon: "fas fa-users", color: "text-accent" },
  { name: "Communication", rating: 4.5, icon: "fas fa-comments", color: "text-primary" },
  { name: "Problem Solving", rating: 5, icon: "fas fa-lightbulb", color: "text-secondary" },
  { name: "Time Management", rating: 4, icon: "fas fa-clock", color: "text-accent" },
  { name: "Adaptability", rating: 4.5, icon: "fas fa-chart-line", color: "text-success" },
  { name: "Leadership", rating: 4, icon: "fas fa-tasks", color: "text-primary" },
];

const technologies = [
  { name: "React", icon: "fab fa-react", color: "#61DAFB" },
  { name: "JavaScript", icon: "fab fa-js", color: "#F7DF1E" },
  { name: "HTML5", icon: "fab fa-html5", color: "#E34F26" },
  { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572B6" },
  { name: "Node.js", icon: "fab fa-node-js", color: "#339933" },
  { name: "Java", icon: "fab fa-java", color: "#007396" },
  { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
  { name: "Ethereum", icon: "fab fa-ethereum", color: "#3C3C3D" },
];

const StarRating = ({ rating, color = "text-secondary" }: { rating: number, color?: string }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`
            ${star <= Math.floor(rating) ? "fas fa-star" : ""}
            ${star > Math.floor(rating) && star - 0.5 <= rating ? "fas fa-star-half-alt" : ""}
            ${star > Math.ceil(rating) ? "far fa-star" : ""}
            ${color}
          `}
        ></i>
      ))}
    </div>
  );
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-display flex items-center">
              <span className="mr-3 text-primary"><i className="fas fa-laptop-code"></i></span>
              Technical Skills
            </h3>
            
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-mono font-bold">{skill.name}</span>
                    <span className="text-primary font-mono">{skill.percentage}%</span>
                  </div>
                  <Progress value={skill.percentage} className="h-3 bg-background" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-display flex items-center">
              <span className="mr-3 text-success"><i className="fas fa-brain"></i></span>
              Soft Skills
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className={`bg-background p-4 rounded-xl border border-border hover:border-${skill.color.replace("text-", "")} transition-colors`}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-${skill.color.replace("text-", "")}/20 ${skill.color} mb-3`}>
                    <i className={skill.icon}></i>
                  </div>
                  <h4 className="font-bold mb-1">{skill.name}</h4>
                  <StarRating rating={skill.rating} color={skill.color} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Tools & Technologies */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 font-display text-center">
            Tools & Technologies
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div 
                key={index}
                className="bg-background p-4 rounded-full h-20 w-20 flex items-center justify-center border border-border hover:border-primary transition-all"
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <i className={`${tech.icon} text-4xl text-primary`}></i>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
