import React from "react";
import { motion } from "framer-motion";

const educationData = [
  {
    id: 1,
    title: "Bachelor of Engineering (B.E.)",
    course: "Computer Science",
    institution: "SDM Institute of Technology, Karnataka, India",
    period: "2022 - 2026",
    icon: "fas fa-graduation-cap",
    position: "right",
  },
  {
    id: 2,
    title: "Higher Secondary Education",
    course: "Science Stream",
    institution: "Vidya Nidhi PU College, Karnataka, India",
    period: "2020 - 2022",
    icon: "fas fa-school",
    position: "left",
  },
];

export default function EducationSection() {
  return (
    <>
      <section id="education" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 font-['-apple-system',_BlinkMacSystemFont,_'SF_Pro_Display',_'SF_Pro_Text',_Roboto,_Helvetica,_Arial,_sans-serif]">
              My <span className="text-blue-600">Education</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 bg-blue-600/30 rounded-full"></div>

              {educationData.map((item) => (
                <motion.div
                  key={item.id}
                  className="relative z-10 mb-12 sm:mb-16 last:mb-0"
                  initial={{
                    opacity: 0,
                    x: item.position === "right" ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    {item.position === "right" ? (
                      <>
                        <div className="flex-1 order-2 sm:order-1 sm:text-right sm:pr-6 lg:pr-8 mt-4 sm:mt-0">
                          <motion.div
                            className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02]"
                            whileHover={{ y: -5 }}
                          >
                            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-sm sm:text-base font-medium text-blue-600 mb-2 uppercase tracking-wider">
                              {item.course}
                            </p>

                            <p className="text-gray-600 mb-1 text-sm sm:text-base">
                              {item.institution}
                            </p>
                            <p className="text-blue-600 font-medium text-sm sm:text-base">{item.period}</p>
                          </motion.div>
                        </div>

                        <div className="z-10 order-1 sm:order-2">
                          <motion.div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <i className={`${item.icon} text-white text-sm sm:text-base`}></i>
                          </motion.div>
                        </div>

                        <div className="flex-1 order-3 hidden sm:block"></div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 order-2 sm:order-1 hidden sm:block"></div>

                        <div className="z-10 order-1 sm:order-2">
                          <motion.div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <i className={`${item.icon} text-white text-sm sm:text-base`}></i>
                          </motion.div>
                        </div>

                        <div className="flex-1 order-3 sm:order-1 sm:pl-6 lg:pl-8 mt-4 sm:mt-0">
                          <motion.div
                            className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02]"
                            whileHover={{ y: -5 }}
                          >
                            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900">
                              {item.title}
                            </h3>
                            <p className="text-sm sm:text-base font-medium text-blue-600 mb-2 uppercase tracking-wider">
                              {item.course}
                            </p>

                            <p className="text-gray-600 mb-1 text-sm sm:text-base">
                              {item.institution}
                            </p>
                            <p className="text-blue-600 font-medium text-sm sm:text-base">{item.period}</p>
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
      
      {/* Section Separator */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}
