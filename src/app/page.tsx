"use client";
import Image from "next/image";
import Project from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useScrollWithOffset } from "@/hooks/useScrollWithOffset";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  stack: {
    src: string;
    alt: string;
  };
  slug: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [orangeBoxCols, setOrangeBoxCols] = useState(1); // Default column span for orange box
  const [pinkBoxCols, setPinkBoxCols] = useState(3); // Default column span for pink box
  const [isDragging, setIsDragging] = useState(false);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the hook to handle URL hash navigation with a 150px offset
  useScrollWithOffset(150);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  // Setup drag handlers
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startPosRef.current = e.clientX;
      document.body.style.cursor = 'col-resize';
      e.preventDefault(); // Prevent text selection during drag
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const diff = e.clientX - startPosRef.current;
      const percentMove = diff / containerWidth;
      
      // REVERSED: Now expanding when dragging LEFT
      if (percentMove < -0.1 && orangeBoxCols === 1 && pinkBoxCols > 2) {
        // Expand orange box & shrink pink box
        setOrangeBoxCols(2);
        setPinkBoxCols(2);
        startPosRef.current = e.clientX;
      } else if (percentMove > 0.1 && orangeBoxCols === 2 && pinkBoxCols < 3) {
        // Shrink orange box & expand pink box
        setOrangeBoxCols(1);
        setPinkBoxCols(3);
        startPosRef.current = e.clientX;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      startPosRef.current = e.touches[0].clientX;
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const diff = e.touches[0].clientX - startPosRef.current;
      const percentMove = diff / containerWidth;
      
      // REVERSED: Now expanding when dragging LEFT for touch
      if (percentMove < -0.1 && orangeBoxCols === 1 && pinkBoxCols > 2) {
        // Expand orange box & shrink pink box
        setOrangeBoxCols(2);
        setPinkBoxCols(2);
        startPosRef.current = e.touches[0].clientX;
      } else if (percentMove > 0.1 && orangeBoxCols === 2 && pinkBoxCols < 3) {
        // Shrink orange box & expand pink box
        setOrangeBoxCols(1);
        setPinkBoxCols(3);
        startPosRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    const dragHandle = dragHandleRef.current;
    if (dragHandle) {
      // Mouse events
      dragHandle.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Touch events
      dragHandle.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (dragHandle) {
        // Remove mouse events
        dragHandle.removeEventListener('mousedown', handleMouseDown);
        // Remove touch events
        dragHandle.removeEventListener('touchstart', handleTouchStart);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, orangeBoxCols, pinkBoxCols]);

  return (
    <div className="flex gap-[200px] sm:gap-[400px] flex-col">
      <div className="w-full h-screen flex justify-center items-center bg-black">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/lasse.png"
            alt="Logo"
            width={650}
            height={650}
            className="opacity-85 object-contain max-h-full mb-[100px]"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-[-50px]">
            <p className="text-white text-[35vw] sm:text-[38vw] md:text-[222px] font-thunder-black tracking-[-0.01em]">
              L<span className="tracking-[-0.015em]">E</span>NT
              <span className="tracking-[-0.02em]">ING</span>
            </p>
          </div>

          {/* Modern scroll indicator */}
          <div className="absolute bottom-[100px] sm:bottom-[50px] left-0 right-0 flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/50 text-xs uppercase tracking-widest">
                Scroll
              </p>
              <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full absolute top-1 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about section - bento box layout */}
      <div
        id="about"
        className="w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-white text-3xl tracking-[-0.05em] mt-16">about.</h1>
        <div className="w-full max-w-[1200px] mx-auto py-10 px-4">
          {/* Bento Box Grid */}
          <div className="grid grid-cols-5 md:grid-cols-7 gap-4 auto-rows-auto">
            {/* Logo Box */}

            {/* Team Box */}
            <div className="bg-lime-400 rounded-xl overflow-hidden p-6 col-span-5 row-span-4 md:col-span-3 md:row-span-3 transition-all hover:opacity-90">
              <div className="grid grid-cols-1 gap-2 h-full">
                {[
                  {
                    name: "Daniel",
                    rating: "4.3",
                    job: "Handyman",
                    img: "/images/lasse.jpg",
                  }
                ].map((person) => (
                  <div
                    key={person.name}
                    className="bg-lime-400 rounded-lg flex flex-col items-center h-min"
                  >
                    <div className="relative w-full aspect-square overflow-hidden rounded-md">
                      <Image
                        src={person.img}
                        alt={person.name}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-400 rounded-xl overflow-hidden p-6 col-span-2 md:col-span-1 row-span-1 flex items-center justify-center transition-all hover:opacity-90">
              <div className="w-24 h-24">
                {/* reverse color of image  */}
                <Image
                  src="/logosmall.png"
                  alt="Logo"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full invert opacity-85"
                />
              </div>
            </div>
            <div className="bg-stone-800 rounded-xl overflow-hidden p-3 col-span-3 md:col-span-3 row-span-1 flex flex-col items-center justify-center transition-all hover:opacity-90">
              <h2 className="text-amber-100 text-5xl font-thunder-black text-center">
                5+ years of experience
              </h2>
            </div>
            {/* Post Task Box */}
            <div className="bg-blue-500 rounded-xl overflow-hidden p-6 col-span-5 sm:col-span-4 row-span-1 flex items-center justify-center transition-all hover:opacity-90">
              <Link href="mailto:lasselenting@gmail.com">
              <button className="bg-amber-50 text-stone-800 font-semibold py-3 px-6 rounded-full flex items-center gap-2">
                Contact me <span className="text-xl">→</span>
              </button>
              </Link>
            </div>
            
            {/* Container for the last boxes with draggable handle */}
            <div 
              ref={containerRef} 
              className="col-span-5 sm:col-span-4 row-span-1 grid grid-cols-4 gap-4 relative"
            >
              {/* Pink box with dynamic columns */}
              <div 
                className={`bg-pink-400 rounded-xl overflow-hidden p-6 col-span-${pinkBoxCols} flex flex-col justify-center sm:justify-between transition-all duration-300 hover:opacity-90`}
              >
                <div className="text-stone-800 font-thunder-black text-center">
                  <h2 className="text-5xl md:text-5xl leading-none">FULL</h2>
                  <h2 className="text-5xl md:text-5xl leading-none">
                    STACK
                  </h2>
                  <h2 className="text-5xl md:text-5xl leading-none">DEVELOPER</h2>
                </div>
              </div>
              
              {/* Orange box with expandable width and draggable handle */}
              <div 
                className={`bg-orange-500 rounded-xl text-stone-900 text-xl overflow-hidden p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:opacity-90 col-span-${orangeBoxCols} relative`}
              >
                {/* Icons */}
                <i className="devicon-nextjs-plain"></i>
                <i className="devicon-react-original"></i>
                <i className="devicon-tailwindcss-original"></i>
                <i className="devicon-photoshop-plain"></i>
                
                {/* Draggable handle inside the orange box, on its left edge */}
                <div 
                  ref={dragHandleRef}
                  className={`absolute top-0 bottom-0 left-0 w-4 bg-white/20 hover:bg-white/40 cursor-col-resize z-10 transition-all ${
                    isDragging ? 'bg-white/50' : ''
                  }`}
                >
                  {/* Visual indicator for the handle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-14 bg-white/70 rounded"></div>
                  
                  {/* Small animated arrow indicator - now pointing LEFT */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <div className="absolute w-3 h-3 border-t-2 border-l-2 border-white transform rotate-[-45deg] -left-5 -top-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* projects section */}
      <div
        id="projects"
        className="w-full flex flex-col justify-center items-center scroll-mt-[150px] mt-20"
      >
        <h1 className="text-white text-3xl tracking-[-0.05em]">projects.</h1>

        <div className="w-full max-w-[1200px] bg-black mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-6">
            {projects.map((project) => (
              <Project
                key={project.slug}
                title={project.title}
                category={project.category}
                description={project.description}
                image={project.image}
                stack={project.stack}
                slug={project.slug}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}