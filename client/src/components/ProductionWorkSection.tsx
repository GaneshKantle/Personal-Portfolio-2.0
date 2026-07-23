import React from "react";
import { motion } from "framer-motion";

const productionSites = [
  {
    title: "Influencer X Media",
    description: "Marketing site for Influencer X Media.",
    url: "https://influencerxmedia.com",
  },
  {
    title: "Swing Boudoir Mag",
    description: "Membership and content platform for Swing Boudoir Magazine.",
    url: "https://app.swingboudoirmag.com/",
  },
  {
    title: "WI Thinkers",
    description: "Company website for WI Thinkers.",
    url: "https://thewithinkers.com/",
  },
  {
    title: "WI Thinkers CRM",
    description: "Internal CRM platform for client and workflow management.",
    url: "https://crm.thewithinkers.com/",
  },
  {
    title: "The Glam Model",
    description: "Creator platform for The Glam Model.",
    url: "https://onlyfans.theglammodel.com/",
  },

];

export default function ProductionWorkSection() {
  return (
    <>
      <section id="production" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4">
              Production <span className="text-blue-600">Work</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Live products built at WI Thinkers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {productionSites.map((site, index) => (
              <motion.a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-blue-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors duration-300">
                    {site.title}
                  </h3>
                  <i className="fas fa-arrow-up-right-from-square text-xs text-gray-400 group-hover:text-blue-600 mt-1.5 transition-colors duration-300"></i>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                  {site.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600">
                  Visit
                  <i className="fas fa-external-link-alt text-xs"></i>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

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
