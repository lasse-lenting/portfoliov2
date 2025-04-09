"use client";
import Image from "next/image";
import Project from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
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
            <div className="bg-pink-400 rounded-xl overflow-hidden p-6 col-span-4 sm:col-span-3 items-center row-span-1 flex flex-col justify-center sm:justify-between transition-all hover:opacity-90">
              <div className="text-stone-800 font-thunder-black text-center">
                <h2 className="text-5xl md:text-5xl leading-none">FULL</h2>
                <h2 className="text-5xl md:text-5xl leading-none">
                  STACK
                </h2>
                <h2 className="text-5xl md:text-5xl leading-none">DEVELOPER</h2>
              </div>
            </div>
            {/* Icons Box */}
            <div className="bg-orange-500 rounded-lg text-stone-900 text-xl overflow-hidden p-6 col-span-1 sm:col-span-1 row-span-1 flex flex-col items-center justify-center gap-4 transition-all hover:opacity-90">
                {/* rotterdam text with random font stretch per letter */}
                <i className="devicon-nextjs-plain"></i>
                <i className="devicon-react-original"></i>
                <i className="devicon-tailwindcss-original"></i>
                <i className="devicon-photoshop-plain"></i>
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
