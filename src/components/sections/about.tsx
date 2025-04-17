import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function About() {
    // Add these style definitions at the top of the component
    useEffect(() => {
        // Add the custom animation to the document
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes pulseLeft {
                0%, 95%, 100% { transform: translateX(0); }
                4% { transform: translateX(-3px); }
                8% { transform: translateX(0); }
                10% { transform: translateX(-3px); }
                14% { transform: translateX(0); }
            }
            .animate-pulse-left {
                animation: pulseLeft 5s infinite;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);
    
    const [orangeBoxCols, setOrangeBoxCols] = useState(1); // Default column span for orange box
    const [pinkBoxCols, setPinkBoxCols] = useState(3); // Default column span for pink box
    const [isDragging, setIsDragging] = useState(false);
    const dragHandleRef = useRef<HTMLDivElement>(null);
    const startPosRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
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
                    <div className="bg-orange-500 rounded-xl overflow-hidden p-3 col-span-3 md:col-span-3 row-span-1 flex flex-col items-center justify-center transition-all hover:opacity-90">
                        <h2 className="text-amber-100 text-5xl font-thunder-black text-center">
                            5+ years of experience
                        </h2>
                    </div>
                    {/* contact box */}
                    <div className="bg-blue-500 rounded-xl overflow-hidden p-6 col-span-5 sm:col-span-4 row-span-1 flex items-center justify-center transition-all hover:opacity-100 relative">
                        <div className="flex gap-4">
                            <Link href="/files/cv.pdf" target="_blank" className="relative z-10 h-full flex items-center justify-center">
                                <button className="bg-amber-50 hover:text-blue-500 text-stone-800 font-semibold py-2 px-5 rounded-full flex items-center justify-center gap-2 transition-all duration-700 group">
                                    <span className="relative z-10 text-sm sm:text-base mt-[-3px] hover:text-blue-500">Download CV <span className="text-xl">↓</span></span>
                                    <span className="absolute inset-0 bg-amber-50 rounded-full group-hover:rounded-xl transform scale-100 group-hover:scale-[5] transition-all duration-700"></span>
                                </button>
                            </Link>
                        </div>
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
                            className={`bg-stone-800 rounded-xl text-xl overflow-hidden p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:opacity-90 col-span-${orangeBoxCols} relative`}
                        >
                            {/* Icons container with grid layout */}
                            <div className={`grid ${orangeBoxCols === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                                {/* Left column - always visible */}
                                <div className="flex items-center justify-center">
                                    <i className="devicon-nextjs-plain text-2xl"></i>
                                </div>
                                <div className="flex items-center justify-center">
                                    <i className="devicon-react-original colored text-2xl "></i>
                                </div>
                                <div className="flex items-center justify-center">
                                    <i className="devicon-tailwindcss-original colored text-2xl"></i>
                                </div>
                                <div className="flex items-center justify-center ">
                                    <i className="devicon-mongodb-plain colored text-2xl"></i>
                                </div>

                                {/* Right column - visible only when expanded */}
                                {orangeBoxCols === 2 && (
                                    <>
                                        <div className="flex items-center justify-center col-start-2 row-start-1">
                                            <i className="devicon-javascript-plain colored text-2xl"></i>
                                        </div>
                                        <div className="flex items-center justify-center col-start-2 row-start-2">
                                            <i className="devicon-typescript-plain colored text-2xl"></i>
                                        </div>
                                        <div className="flex items-center justify-center col-start-2 row-start-3">
                                            <i className="devicon-nodejs-plain colored text-2xl"></i>
                                        </div>
                                        <div className="flex items-center justify-center col-start-2 row-start-4">
                                            <i className="devicon-photoshop-plain text-[#2dabff] text-2xl"></i>
                                        </div>
                                        {/* add another column */}
                                    </>
                                )}
                            </div>

                            {/* Draggable handle inside the orange box, on its left edge */}
                            <div
                                ref={dragHandleRef}
                                className={`absolute top-0 bottom-0 left-0 w-4 bg-white/20 hover:bg-white/40 cursor-col-resize z-10 transition-all ${isDragging ? 'bg-white/50' : ''
                                    }`}
                            >
                                {/* Visual indicator for the handle with pulsing animation that stops when expanded */}
                                <div 
                                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-14 bg-white/70 rounded ${orangeBoxCols === 1 ? 'animate-pulse-left' : ''}`}
                                ></div>

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
    );
}