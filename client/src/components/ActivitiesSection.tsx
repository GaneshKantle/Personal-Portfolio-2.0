import React from "react";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Hackathon Participant",
    description:
      "Regular participant in local and academic hackathons. Top 3 at the 2025 AquaTech Hackathon.",
    icon: "fas fa-code",
    color: "text-blue-600",
    gradient: "from-blue-100 to-purple-100",
  },
  {
    id: 2,
    title: "Youth Red Cross Volunteer",
    description:
      "Organizing blood donation camps and spreading awareness about health and safety.",
    icon: "fas fa-users",
    color: "text-green-600",
    gradient: "from-green-100 to-blue-100",
  },
  {
    id: 3,
    title: "Chess State Level",
    description:
      "Secured a position in the top 50, competing against 700+ skilled players.",
    icon: "fas fa-basketball-ball",
    color: "text-purple-600",
    gradient: "from-purple-100 to-green-100",
  },
];

const profiles = [
  {
    name: "LeetCode",
    icon: "fas fa-code",
    color: "#F48024",
    url: "https://leetcode.com/u/ganeshkantle/",
  },
  {
    name: "Unstop",
    icon: "fas fa-briefcase",
    color: "#FF5722",
    url: "https://unstop.com/u/ganeskan50953",
  },
  {
    name: "Medium",
    icon: "fab fa-medium-m",
    color: "#00A5EC",
    url: "https://medium.com/@ganeshkantle",
  },
  {
    name: "Bento",
    icon: "fas fa-cube",
    color: "#6B66FF",
    url: "https://bento.me/kantle",
  },
  {
    name: "Dev.to",
    icon: "fab fa-dev",
    color: "#0A0A0A",
    url: "https://dev.to/ganeshkantle",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "Twitter",
    icon: "fab fa-twitter",
    color: "#00ACEE",
    url: "https://twitter.com/ganeshkantle",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "Instagram",
    icon: "fab fa-instagram",
    color: "#E4405F",
    url: "https://instagram.com/_.ganesshhh_",
  },
  {
    name: "WordPress",
    icon: "fab fa-wordpress",
    color: "#21759B",
    url: "https://ganeshkantle.wordpress.com/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

export default function ActivitiesSection() {
  return (
    <>
      <section id="activities" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4">
              Extracurricular <span className="text-blue-600">Activities</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  className="relative z-10 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${activity.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${activity.icon} ${activity.color} text-lg sm:text-2xl`}></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {activity.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-gray-900">
                Connect with me on
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {profiles.map((profile, index) => (
                  <motion.a
                    key={index}
                    href={profile.url}
                    target={profile.target || "_self"}
                    rel={profile.rel || ""}
                    className="relative z-10 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] group flex flex-col items-center"                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 flex items-center justify-center">
                      <i 
                        className={`${profile.icon} text-lg sm:text-xl`} 
                        style={{ color: profile.color }}
                      ></i>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                      {profile.name}
                    </span>
                  </motion.a>
                ))}
              </div>
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
