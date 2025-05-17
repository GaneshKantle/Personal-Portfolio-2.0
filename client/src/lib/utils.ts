import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Smooth scroll to element
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for navbar
      behavior: "smooth",
    });
  }
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Type animation
export function setupTypewriterEffect(
  element: HTMLElement | null,
  text: string,
  delay: number = 100
): void {
  if (!element) return;
  
  element.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length && element) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, delay);
    }
  }
  
  setTimeout(typeWriter, 1000);
}