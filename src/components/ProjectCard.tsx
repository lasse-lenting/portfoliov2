import Link from "next/link";
import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";
import React, { useState } from 'react';

interface ProjectProps {
    title: string;
    stack: {
        src: string;
        alt: string;
    }  // image for stack (like framer, react, etc.)
    category: string;
    description: string;
    image: string;
    slug: string;
}

export default function Project(project: ProjectProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        // Project card container now allows overflow so the tooltip isn’t clipped
        <div className="w-full overflow-visible">
            {/* Image container remains clipped */}
            <div className="relative w-full bg-black overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="rounded h-full w-full object-cover transform scale-150 translate-y-20 translate-x-[-10px] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-100 h-1/2" />
            </div>
            <div className="px-4 mt-4 overflow-visible">
                <div className="relative flex gap-2 items-center overflow-visible">
                    <div className="relative overflow-visible">
                        <img
                            src={project.stack.src}
                            alt=""
                            className={`mr-2 ${project.stack.src === "/images/vue.png" ? "w-4 h-4" : "w-6 h-6"}`}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        />
                        {showTooltip && (
                            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white/10 text-white text-xs py-1 px-2 rounded overflow-visible">
                                {project.stack.alt}
                                {/* Downward-pointing triangle with transparent sides */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
          border-l-4 border-r-4 border-b-0 border-t-4 border-t-white/10 
          border-l-transparent border-r-transparent" />
                            </div>
                        )}
                    </div>
                    <div className="relative flex group">
                        <Link href={`/projects/${project.slug}`}>
                            <p className="text-white text-xl flex items-center underline underline-offset-3 decoration-white/30 hover:cursor-pointer hover:decoration-white/40 w-min">
                                {project.title}
                            </p>
                        </Link>
                        <SquareArrowOutUpRight size={12} className="absolute right-[-15px] text-white/40 group-hover:text-white/60" />
                    </div>
                </div>
                <p className="text-white/60 text-sm mt-2">{project.category}</p>
                <p className="text-white/80 mt-4">{project.description}</p>
            </div>
        </div>
    );
}
