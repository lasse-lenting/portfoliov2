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
      {/* about section - bento box layout */}
      <div
        id="about"
        className="w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-white text-3xl tracking-[-0.05em] mt-16">about.</h1>
        <div className="w-full max-w-[1200px] mx-auto py-10 px-4">
          {/* Bento Box Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
            {/* Logo Box */}
            <div className="bg-amber-400 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 flex items-center justify-center transition-all hover:opacity-90">
              <div className="w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M30,20 C45,5 65,10 75,25 C85,40 75,60 60,70 C45,80 25,75 15,60"
                    fill="none"
                    stroke="#3D0C02"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Post Task Box */}
            <div className="bg-blue-500 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 flex items-center justify-center transition-all hover:opacity-90">
              <button className="bg-amber-50 text-stone-800 font-semibold py-3 px-6 rounded-full flex items-center gap-2">
                Post your task <span className="text-xl">→</span>
              </button>
            </div>

            {/* Food Illustration Box */}
            <div className="bg-pink-400 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 relative transition-all hover:opacity-90">
              <div className="absolute bottom-0 right-0 w-32 h-32">
                <div className="relative w-full h-full">
                  <div className="absolute bottom-0 right-0 w-16 h-32 bg-red-500 rounded-t-full transform rotate-45"></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Team Box */}
            <div className="bg-stone-800 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 md:col-span-1 md:row-span-2 transition-all hover:opacity-90">
              <div className="grid grid-cols-3 gap-2 h-full">
                {[
                  {
                    name: "Daniel",
                    rating: "4.3",
                    job: "Handyman",
                    img: "/images/testemony1.png",
                  },
                  {
                    name: "Elisa",
                    rating: "4.5",
                    job: "Cook",
                    img: "/images/testemony2.png",
                  },
                  {
                    name: "James",
                    rating: "4.6",
                    job: "Mechanic",
                    img: "/images/testemony1.png",
                  },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="bg-amber-50 rounded-lg p-2 flex flex-col items-center"
                  >
                    <div className="relative w-full aspect-square overflow-hidden rounded-md mb-2">
                      <Image
                        src={person.img}
                        alt={person.name}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-stone-800 font-bold text-lg">
                      {person.name}
                    </h3>
                    <p className="text-stone-600 text-xs flex items-center gap-1">
                      <span>★</span> {person.rating} | {person.job}
                    </p>
                    <button className="mt-2 bg-amber-400 text-stone-800 text-xs font-medium py-1 px-3 rounded-full">
                      Contact {person.name === "Elisa" ? "her" : "him"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Icons Box */}
            <div className="bg-orange-500 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 flex flex-wrap items-center justify-center gap-4 transition-all hover:opacity-90">
              {[
                "search",
                "heart",
                "gift",
                "user",
                "message-circle",
                "map-pin",
              ].map((icon) => (
                <div
                  key={icon}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 text-stone-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon === "search" && (
                      <>
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </>
                    )}
                    {icon === "heart" && (
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    )}
                    {icon === "gift" && (
                      <>
                        <polyline points="20 12 20 22 4 22 4 12" />
                        <rect x="2" y="7" width="20" height="5" />
                        <line x1="12" y1="22" x2="12" y2="7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </>
                    )}
                    {icon === "user" && (
                      <>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </>
                    )}
                    {icon === "message-circle" && (
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    )}
                    {icon === "map-pin" && (
                      <>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </>
                    )}
                  </svg>
                </div>
              ))}
            </div>

            {/* Price Box */}
            <div className="bg-stone-800 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 flex flex-col items-center justify-center transition-all hover:opacity-90">
              <h2 className="text-amber-100 text-6xl font-thunder-black tracking-tight text-center">
                $159
              </h2>
              <div className="mt-4 bg-amber-100 text-stone-800 px-6 py-2 rounded-full font-bold">
                Mechanic
              </div>
              <p className="text-amber-100/70 text-xs mt-4 text-center max-w-[200px]">
                This is an estimate, please continue to get the final price.
              </p>
            </div>

            {/* Services Box */}
            <div className="bg-lime-400 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 flex flex-col justify-center gap-3 transition-all hover:opacity-90">
              {[
                { name: "Mover", count: 13 },
                { name: "Gardener", count: 8 },
                { name: "Cook", count: 21 },
                { name: "Handyman", count: 16 },
              ].map((service) => (
                <div
                  key={service.name}
                  className="bg-stone-800/90 text-white rounded-full py-2 px-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center">
                      {service.name === "Mover" && <span>🚚</span>}
                      {service.name === "Gardener" && <span>🌱</span>}
                      {service.name === "Cook" && <span>👨‍🍳</span>}
                      {service.name === "Handyman" && <span>🔧</span>}
                    </span>
                    <span>{service.name}</span>
                  </div>
                  <span className="bg-amber-400 text-stone-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {service.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Brand Box */}
            <div className="bg-pink-400 rounded-xl overflow-hidden p-6 col-span-1 row-span-1 flex flex-col justify-between transition-all hover:opacity-90">
              <p className="text-stone-800 text-sm font-medium">Brand Idea</p>
              <div className="text-stone-800 font-thunder-black text-center">
                <h2 className="text-4xl md:text-5xl leading-none">CRAFTED</h2>
                <h2 className="text-4xl md:text-5xl leading-none">
                  ANSWERS FOR
                </h2>
                <h2 className="text-4xl md:text-5xl leading-none">YOUR HOME</h2>
              </div>
              <p className="text-stone-800 text-sm font-medium text-center">
                Helper
              </p>
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
