// import React from "react";
// import { motion } from "framer-motion";
// import { useScrollAnimation } from "../hooks/useScrollAnimation";
// import { useEffect } from "react";
// import { Button } from "../components/ui/button";

// const blogPosts = [
//   {
//     id: 1,
//     title: "Building Performant React Applications",
//     excerpt: "Learn advanced techniques for optimizing your React applications. This article covers code splitting, memoization, virtualization, and more.",
//     category: "React.js",
//     categoryColor: "primary",
//     date: "June 15, 2023",
//     url: "#",
//     gradientFrom: "from-primary/30",
//     gradientTo: "to-[#8B5CF6]/30",
//   },
//   {
//     id: 2,
//     title: "Introduction to Web3 Development",
//     excerpt: "Explore the fundamentals of Web3 development. This comprehensive guide covers blockchain basics, smart contracts, and dApp development.",
//     category: "Blockchain",
//     categoryColor: "secondary",
//     date: "May 22, 2023",
//     url: "#",
//     gradientFrom: "from-[#10B981]/30",
//     gradientTo: "to-primary/30",
//   },
//   {
//     id: 3,
//     title: "Designing Intuitive User Interfaces",
//     excerpt: "Learn the principles of creating user-friendly interfaces. This article covers visual hierarchy, color theory, typography, and best practices.",
//     category: "UI/UX",
//     categoryColor: "accent",
//     date: "April 10, 2023",
//     url: "#",
//     gradientFrom: "from-[#8B5CF6]/30",
//     gradientTo: "to-[#10B981]/30",
//   },
// ];

// export default function BlogSection() {
//   const { ref, inView, controls } = useScrollAnimation();

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const getCategoryColor = (color: string) => {
//     switch(color) {
//       case 'primary':
//         return 'bg-primary/10 text-primary';
//       case 'secondary':
//         return 'bg-[#10B981]/10 text-[#10B981]';
//       case 'accent':
//         return 'bg-[#8B5CF6]/10 text-[#8B5CF6]';
//       default:
//         return 'bg-primary/10 text-primary';
//     }
//   };

//   const getLinkColor = (color: string) => {
//     switch(color) {
//       case 'primary':
//         return 'text-primary group-hover:text-primary/80';
//       case 'secondary':
//         return 'text-[#10B981] group-hover:text-[#10B981]/80';
//       case 'accent':
//         return 'text-[#8B5CF6] group-hover:text-[#8B5CF6]/80';
//       default:
//         return 'text-primary group-hover:text-primary/80';
//     }
//   };

//   return (
//     <section id="blog" className="py-20 bg-background" ref={ref}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           animate={controls}
//           variants={{
//             visible: { opacity: 1, y: 0 },
//             hidden: { opacity: 0, y: 20 }
//           }}
//           // transition={{ duration: 0.1 }}
//         >
//           <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
//             My <span className="text-primary">Blog</span>
//           </h2>
//           <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
//           <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
//             I write about web development, blockchain technologies, and other crazy topics. Check out my latest articles.
//           </p>
//         </motion.div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {blogPosts.map((post, index) => (
//             <motion.div
//               key={post.id}
//               className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:border-primary transition-all group"
//               initial={{ opacity: 0, y: 50 }}
//               animate={controls}
//               variants={{
//                 visible: { opacity: 1, y: 0 },
//                 hidden: { opacity: 0, y: 50 }
//               }}
//             >
//               <div className="h-48 bg-background overflow-hidden">
//                 <motion.div 
//                   className={`w-full h-full bg-gradient-to-br ${post.gradientFrom} ${post.gradientTo}`}
//                 ></motion.div>
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   <span className={`${getCategoryColor(post.categoryColor)} px-3 py-1 rounded-full text-xs font-mono`}>
//                     {post.category}
//                   </span>
//                   <span className="text-muted-foreground text-sm ml-auto">{post.date}</span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
//                   {post.title}
//                 </h3>
//                 <p className="text-muted-foreground mb-4 line-clamp-3">
//                   {post.excerpt}
//                 </p>
//                 <a 
//                   href={post.url} 
//                   className={`${getLinkColor(post.categoryColor)} inline-flex items-center transition-colors`}
//                 >
//                   Read More 
//                   <motion.i 
//                     className="fas fa-arrow-right ml-2"
//                   ></motion.i>
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         <div className="text-center mt-12">
//           <Button
//             variant="outline"
//             size="lg"
//             className="inline-block border-border hover:border-primary text-foreground font-bold transition-all transform hover:scale-105"
//             asChild
//           >
//             <a href="https://medium.com/@ganeshkantle" target="_blank" rel="noopener noreferrer">
//               View All Articles <i className="fab fa-medium ml-2"></i>
//             </a>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }
