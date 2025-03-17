"use client";

import { useEffect, useState } from 'react';
import React from 'react';

interface Project {
    title: string;
    category: string;
    stack: {
        src: string;
        alt: string;
    }
    description: string;
    image: string;
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
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto mt-[150px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 rounded-md p-6">
                {/* Image Section */}
                <div className="flex items-center justify-center">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="rounded-lg shadow-lg w-full h-auto object-cover"
                    />
                </div>
                {/* Info Section */}
                <div className="text-white flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                    <p className="mb-2 text-lg">
                        <span className="font-medium">Category:</span> {project.category}
                    </p>
                    <p className="mb-4 text-lg">
                        <span className="font-medium">Stack:</span> {project.stack.alt}
                    </p>
                    <p className="mb-4">{project.description}</p>
                </div>
            </div>
        </div>
    );
}
