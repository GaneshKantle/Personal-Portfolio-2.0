import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollRouting = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const sections = [
      { id: 'home', path: '/' },
      { id: 'about', path: '/about' },
      { id: 'skills', path: '/skills' },
      { id: 'experience', path: '/experience' },
      { id: 'education', path: '/education' },
      { id: 'projects', path: '/projects' },
      { id: 'activities', path: '/activities' },
      { id: 'certificates', path: '/certificates' },
      { id: 'contact', path: '/contact' },
    ];

    const handleScroll = () => {

      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Find which section is currently most visible
      let currentSection = sections[0];
      let maxVisibility = 0;

      sections.forEach(({ id, path }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementBottom = elementTop + element.offsetHeight;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(elementTop, scrollY);
          const visibleBottom = Math.min(elementBottom, scrollY + windowHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > maxVisibility) {
            maxVisibility = visibleHeight;
            currentSection = { id, path };
          }
        }
      });

      // Update URL if we're not already on the correct path
      if (currentSection.path !== window.location.pathname) {
        console.log(`Route changing from ${window.location.pathname} to ${currentSection.path} (section: ${currentSection.id})`);
        setLocation(currentSection.path);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Handle initial route if user navigates directly to a section
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      const targetSection = sections.find(section => section.path === currentPath);
      if (targetSection) {
        const element = document.getElementById(targetSection.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [setLocation]);
};
