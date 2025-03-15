"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollWithOffset(offset = 150) {
  const pathname = usePathname();

  // Function to handle click navigation
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle URL hash navigation
  useEffect(() => {
    // Only run on the home page
    if (pathname !== '/') return;

    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
      // Get the target element
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        // Use setTimeout to ensure the DOM is fully loaded
        setTimeout(() => {
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300); // Increased timeout to ensure everything is loaded
      }
    }
  }, [pathname, offset]);

  return { scrollToSection };
} 