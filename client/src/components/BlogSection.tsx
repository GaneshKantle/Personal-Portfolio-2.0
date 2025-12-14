import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "Building Performant React Applications",
    excerpt: "Learn advanced techniques for optimizing your React applications. This article covers code splitting, memoization, virtualization, and more.",
    category: "React.js",
    categoryColor: "primary",
    date: "June 15, 2023",
    url: "#",
    gradientFrom: "from-blue-100",
    gradientTo: "to-purple-100",
  },
  {
    id: 2,
    title: "Introduction to Web3 Development",
    excerpt: "Explore the fundamentals of Web3 development. This comprehensive guide covers blockchain basics, smart contracts, and dApp development.",
    category: "Blockchain",
    categoryColor: "secondary",
    date: "May 22, 2023",
    url: "#",
    gradientFrom: "from-green-100",
    gradientTo: "to-blue-100",
  },
  {
    id: 3,
    title: "Designing Intuitive User Interfaces",
    excerpt: "Learn the principles of creating user-friendly interfaces. This article covers visual hierarchy, color theory, typography, and best practices.",
    category: "UI/UX",
    categoryColor: "accent",
    date: "April 10, 2023",
    url: "#",
    gradientFrom: "from-purple-100",
    gradientTo: "to-green-100",
  },
];

export default function BlogSection() {
  const { ref, inView, controls } = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getCategoryColor = (color: string) => {
    switch(color) {
      case 'primary':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'secondary':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'accent':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getLinkColor = (color: string) => {
    switch(color) {
      case 'primary':
        return 'text-blue-600 group-hover:text-blue-700';
      case 'secondary':
        return 'text-green-600 group-hover:text-green-700';
      case 'accent':
        return 'text-purple-600 group-hover:text-purple-700';
      default:
        return 'text-blue-600 group-hover:text-blue-700';
    }
  };

  return (
    <>
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
      
      <section id="blog" className="py-12 sm:py-16 md:py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Latest <span className="text-blue-600">Blog Posts</span>
            </motion.h2>
            <motion.div
              className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto rounded-full"
              initial={{ opacity: 0, width: 0 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, width: 64 },
                hidden: { opacity: 0, width: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <motion.p
              className="text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Sharing my thoughts and experiences in web development, blockchain, and technology.
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 20 }
                  }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`h-32 sm:h-40 bg-gradient-to-r ${post.gradientFrom} ${post.gradientTo}`}></div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <Badge
                        variant="outline"
                        className={`${getCategoryColor(post.categoryColor)} text-xs sm:text-sm`}
                      >
                        {post.category}
                      </Badge>
                      <span className="text-xs sm:text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <a
                      href={post.url}
                      className={`inline-flex items-center font-medium ${getLinkColor(post.categoryColor)} transition-colors duration-300 text-sm sm:text-base`}
                    >
                      Read More
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
              >
                View All Posts
              </Button>
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
