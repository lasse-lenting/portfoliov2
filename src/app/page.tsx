import Image from "next/image";
import Navbar from "@/components/Navbar";
import Project from "@/components/ProjectCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center bg-black">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/lasse.png"
            alt="Logo"
            width={650}
            height={650}
            className="opacity-85 object-contain max-h-full"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-[40px]">
            <p className="text-white text-[35vw] sm:text-[38vw] md:text-[222px] font-thunder-black tracking-[-0.01em]">
              L<span className="tracking-[-0.015em]">E</span>NT<span className="tracking-[-0.02em]">ING</span>
            </p>
          </div>
        </div>
      </div>
      {/* about */}
      <div className="w-full flex justify-center items-center">
        <h1 className="text-white text-3xl tracking-[-0.05em] mt-16">
          about.
        </h1>
      </div>
      <div className="w-full max-w-[1200px] min-h-screen bg-black mx-auto py-20 px-4">
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
          <br />
          <br />
        </p>
      </div>
      {/* projects */}
      <div className="w-full flex justify-center items-center">
        <h1 className="text-white text-3xl tracking-[-0.05em] mt-16">
          projects.
        </h1>
      </div>

      <div className="w-full max-w-[1200px] min-h-screen bg-black mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-6">
          {/* project cards */}
          <Project
            title="Lanalicious"
            category="3D Web Design"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus."
            image="/images/Mockup.png"
            stack="/images/framer.avif"
          />
          <Project
            title="Eduface"
            category="Web Development"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus."
            image="/images/Mockup2.png"
            stack="/images/vue.png"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
