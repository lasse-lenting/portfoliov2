"use client"
import Image from "next/image";
import Project from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';

import { useScrollWithOffset } from '@/hooks/useScrollWithOffset';

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
  
  // Use the hook to handle URL hash navigation with a 150px offset
  useScrollWithOffset(150);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

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
              L<span className="tracking-[-0.015em]">E</span>NT<span className="tracking-[-0.02em]">ING</span>
            </p>
          </div>
          
          {/* Modern scroll indicator */}
          <div className="absolute bottom-[100px] sm:bottom-[50px] left-0 right-0 flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/50 text-xs uppercase tracking-widest">Scroll</p>
              <div className="relative w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full absolute top-1 animate-bounce"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* about section */}
      <div id="about" className="w-full flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl tracking-[-0.05em] mt-16">
          about.
        </h1>
      <div className="w-full max-w-[1200px] bg-black mx-auto py-10 px-4">
        <p className="text-white text-xl tracking-[-0.05em]">
          Lasse is a web developer, 3D modeller, and graphic designer. He has a passion for creating visually stunning and user-friendly experiences.
          <br />
          <br />
          Lasse is currently working on a project that combines 3D modeling with web development. He has experience in creating interactive 3D environments, and is eager to learn more about the field.
          <br />
          <br />
          He is also a graphic designer who loves to experiment with different design styles and techniques.
          <br />
          <br />
          Lasse is always looking for new opportunities to collaborate with other creatives and expand his skill set.
        </p>
      </div>
      </div>
      {/* projects section */}
      <div id="projects" className="w-full flex flex-col justify-center items-center scroll-mt-[150px] mt-20">
        <h1 className="text-white text-3xl tracking-[-0.05em]">
          projects.
        </h1>

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
