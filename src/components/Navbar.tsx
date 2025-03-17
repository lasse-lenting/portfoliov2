"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useScrollWithOffset } from '@/hooks/useScrollWithOffset';
import { Menu, X } from 'lucide-react'; // Import icons for hamburger menu

export default function Navbar() {
  const { scrollToSection } = useScrollWithOffset(150);
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isHomePage = pathname === '/';

  const handleNavigation = (id: string) => {
    if (isHomePage) {
      scrollToSection(id);
      window.history.pushState({}, '', `/#${id}`);
    } else {
      router.push(`/#${id}`);
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex justify-between items-center bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl px-4 py-4 sm:px-2 sm:py-2">
          {/* Logo */}
          <Link href={'/'}>
            <Image src="/logo.svg" alt="Logo" width={30} height={30} className='ml-4'/>
          </Link>
          
          {/* Desktop Navigation - hidden on mobile */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('about');
                }}
                className="text-white hover:text-gray-300 transition cursor-pointer"
              >
                About
              </a>
            </li>
            <li>
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('projects');
                }}
                className="text-white hover:text-gray-300 transition cursor-pointer"
              >
                Projects
              </a>
            </li>
            <li className='bg-white rounded-md px-6 py-3 flex items-center transition-all duration-300 w-[106px] hover:w-[150px] hover:bg-black group'>
              <a className="text-black group-hover:text-white mx-auto transition" href="#">
                Contact
              </a>
            </li>
          </ul>
          
          {/* Hamburger menu icon - only on mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 transition mr-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile dropdown menu with CSS transition */}
        <div 
          className={`md:hidden mt-2 bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[300px] opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-4 border-0'
          }`}
        >
          <ul className="flex flex-col p-6">
            <li className="pb-3 border-b border-white/10">
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('about');
                }}
                className="text-white hover:text-gray-300 transition cursor-pointer block w-full"
              >
                About
              </a>
            </li>
            <li className="py-3 border-b border-white/10">
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('projects');
                }}
                className="text-white hover:text-gray-300 transition cursor-pointer block w-full"
              >
                Projects
              </a>
            </li>
            <li className="pt-3 flex justify-center">
              <div className='bg-white rounded-md px-6 py-3 flex items-center transition-all duration-300 w-full'>
                <a className="text-black  mx-auto " href="#">
                  Contact
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

