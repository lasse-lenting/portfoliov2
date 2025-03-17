

interface ProjectProps {
    title: string;
    stack: string;  // image for stack (like framer, react, etc.)
    category: string;
    description: string;
    image: string;
}

export default function Project(project: ProjectProps) {
    return (
        // Project card
        <div className="w-full overflow-hidden">
            <div className="relative w-full h-min bg-black">
                <img
                    src={project.image}
                    alt={project.title}
                    className="rounded h-full w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className="px-4">
                <p className="text-white text-xl flex items-center">
                    <img src={project.stack} alt="" className={
                        `mr-2 ${project.stack === "/images/vue.png" ? "w-4 h-4" : "w-6 h-6"}`
                    } />
                    {project.title}
                </p>
                <p className="text-white/60 text-sm mt-2">{project.category}</p>
                <p className="text-white/80 mt-4">{project.description}</p>
            </div>
        </div>
    );
}