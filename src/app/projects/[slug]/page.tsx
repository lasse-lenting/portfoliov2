"use client";

import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  category: string;
  stack: {
    src: string;
    alt: string;
  };
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Assuming params is a promise that resolves with { slug }
  const { slug } = React.use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async (slug: string) => {
      const response = await fetch(`/api/projects?slug=${slug}`);
      if (!response.ok) {
        setProject(null);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setProject(data);
      setLoading(false);
    };

    if (slug) {
      fetchProjectData(slug);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-white/10 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-[120px] pb-20">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-white/60 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="px-4 py-2 bg-white/5 rounded-full">
            {project.category}
          </div>
          <div className="flex items-center px-4 py-2 bg-white/5 rounded-full">
            <img
              src={project.stack.src}
              alt={project.stack.alt}
              className={`mr-2 ${project.stack.src === "/images/vue.png" ? "w-4 h-4" : "w-6 h-6"}`}
            />
            <span>{project.stack.alt}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Image section - 7 columns on large screens */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-video overflow-hidden rounded-lg bg-white/5 p-2">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Project links */}
            <div className="mt-6 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors duration-300"
                >
                  <ExternalLink size={16} className="mr-2" />
                  <span>View Live</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors duration-300"
                >
                  <Github size={16} className="mr-2" />
                  <span>View Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Info section - 5 columns on large screens */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-2xl font-bold mb-6">About this project</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-white/60">Category</dt>
                    <dd className="font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Technology</dt>
                    <dd className="font-medium">{project.stack.alt}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
