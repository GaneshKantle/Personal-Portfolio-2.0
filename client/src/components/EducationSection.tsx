import { motion } from "framer-motion";

const educationData = [
  {
    id: 1,
    title: "University Degree",
    institution: "Computer Science & Engineering",
    period: "2018 - 2022",
    icon: "fas fa-graduation-cap",
    position: "right",
  },
  {
    id: 2,
    title: "High Secondary School",
    institution: "Science & Mathematics",
    period: "2016 - 2018",
    icon: "fas fa-school",
    position: "left",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            My <span className="text-primary">Education</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 bg-primary/30 rounded-full"></div>
            
            {educationData.map((item) => (
              <motion.div 
                key={item.id}
                className="relative z-10 mb-16 last:mb-0"
                initial={{ opacity: 0, x: item.position === "right" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-center">
                  {item.position === "right" ? (
                    <>
                      <div className="flex-1 order-2 sm:order-1 sm:text-right sm:pr-8 mt-4 sm:mt-0">
                        <motion.div 
                          className="bg-card p-5 rounded-xl shadow-lg border border-border hover:border-primary transition-colors"
                          whileHover={{ y: -5 }}
                        >
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground mb-1">{item.institution}</p>
                          <p className="text-primary">{item.period}</p>
                        </motion.div>
                      </div>
                      
                      <div className="z-10 order-1 sm:order-2">
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className={`${item.icon} text-white`}></i>
                        </motion.div>
                      </div>
                      
                      <div className="flex-1 order-3 hidden sm:block"></div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 order-2 sm:order-1 hidden sm:block"></div>
                      
                      <div className="z-10 order-1 sm:order-2">
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className={`${item.icon} text-white`}></i>
                        </motion.div>
                      </div>
                      
                      <div className="flex-1 order-3 sm:pl-8 mt-4 sm:mt-0">
                        <motion.div 
                          className="bg-card p-5 rounded-xl shadow-lg border border-border hover:border-primary transition-colors"
                          whileHover={{ y: -5 }}
                        >
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground mb-1">{item.institution}</p>
                          <p className="text-primary">{item.period}</p>
                        </motion.div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
