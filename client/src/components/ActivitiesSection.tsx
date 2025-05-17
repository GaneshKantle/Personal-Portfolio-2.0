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
    color: "text-primary",
    gradient: "from-primary/30 to-[#8B5CF6]/30",
  },
  {
    id: 2,
    title: "Youth Red Cross Volunteer",
    description:
      "Organizing blood donation camps and spreading awareness about health and safety.",
    icon: "fas fa-users",
    color: "text-[#10B981]",
    gradient: "from-[#10B981]/30 to-primary/30",
  },
  {
    id: 3,
    title: "Chess State Level",
    description:
      "Secured a position in the top 50, competing against 700+ skilled players.",
    icon: "fas fa-basketball-ball",
    color: "text-[#8B5CF6]",
    gradient: "from-[#8B5CF6]/30 to-[#10B981]/30",
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
    color: "#FFFFFF",
    url: "https://dev.to/ganeshkantle",
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
    <section id="activities" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Extracurricular <span className="text-primary">Activities</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:border-primary transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div
                className={`h-40 bg-gradient-to-r ${activity.gradient}`}
              ></div>
              <div className="p-6">
                <motion.div
                  className="flex items-center justify-center -mt-16 mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div
                    className={`bg-background w-20 h-20 rounded-full border-4 border-card flex items-center justify-center text-3xl ${activity.color}`}
                  >
                    <i className={activity.icon}></i>
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-center mb-4">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Profiles */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center font-display">
            Other <span className="text-primary">Profiles</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {profiles.map((profile, index) => (
              <motion.a
                key={index}
                href={profile.url}
                className="bg-background p-4 rounded-lg flex flex-col items-center hover:border border-primary transition-all"
                whileHover={{ y: -5, scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-2xl mb-2" style={{ color: profile.color }}>
                  <i className={profile.icon}></i>
                </div>
                <span className="text-sm">{profile.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
