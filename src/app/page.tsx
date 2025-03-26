"use client";
import Image from "next/image";
import Project from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

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
      {/* about section */}
      <div
        id="about"
        className="w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-white text-3xl tracking-[-0.05em] mt-16">about.</h1>
        <div className="w-full max-w-[1200px] mx-auto py-10 px-4">
          <div className="bg-zinc-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
            <div className="flex flex-col md:flex-row">
              {/* Image column */}
              <div className="md:w-1/3 p-6 flex justify-center items-center">
                <div className="relative w-[280px] h-[280px] overflow-hidden rounded-xl border-2 border-zinc-700 shadow-lg">
                  <Image
                    src="/images/testemony1.png"
                    alt="Lasse Lenting"
                    width={280}
                    height={280}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>

              {/* Content column */}
              <div className="md:w-2/3 p-6 md:p-8">
                <h2 className="text-white text-2xl font-thunder-black mb-4 tracking-tight">
                  Creative Developer & Designer
                </h2>
                <div className="text-zinc-300 space-y-4 text-lg">
                  <p>
                    I blend code with creativity as a web developer, 3D
                    modeller, and graphic designer. My passion lies in crafting
                    experiences that are both visually captivating and
                    intuitively functional.
                  </p>
                  <p>
                    Currently, I'm exploring the intersection of 3D modeling and
                    web development, building interactive environments that push
                    the boundaries of digital experiences. This fusion of
                    technical skill and artistic vision allows me to create
                    unique digital solutions.
                  </p>
                  <p>
                    My design approach is experimental yet purposeful,
                    constantly evolving as I explore new techniques and styles.
                    I thrive in collaborative environments and am always seeking
                    opportunities to work with other creative minds.
                  </p>
                </div>

                {/* Skills tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Web Development",
                    "3D Modeling",
                    "UI/UX Design",
                    "Creative Coding",
                    "Graphic Design",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
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
