import Link from "next/link";
import {
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-16">
      {/* CTA Section */}
      <div className="max-w-[1200px] mx-auto px-4 mb-16">
        <div className="bg-[#14142B] p-12 rounded-lg text-center">
          <h2 className="text-white text-4xl md:text-5xl font-thunder-black mb-4">
            Jouw succesverhaal begint hier!
          </h2>
          <p className="text-white/70 mb-8">
            Nieuwsgierig geworden? Laten we kennismaken.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center bg-[#5E38F7] text-white px-8 py-3 font-thunder text-xl tracking-wide hover:bg-[#4E2EE3] transition-colors"
            >
              <span className="mr-2">Neem contact op</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Contact Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-[#5E38F7] w-12 h-12 flex items-center justify-center rounded-md mr-3">
                <span className="text-white font-thunder-black text-xl">
                  LL
                </span>
              </div>
              <span className="text-white font-thunder text-xl">Lasse Lenting</span>
            </div>

            <div className="space-y-4 text-white/70">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Rotterdam</p>
                  <p>The Netherlands</p>
                </div>
              </div>


              <div className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  lasselenting@gmail.com
                </a>
              </div>
            </div>
          </div>



          {/* Column 3: Direct Links */}
          <div>
            <h3 className="text-white text-xl font-thunder mb-6">
              Direct naar
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Over mij
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>



            </ul>
          </div>

          {/* Column 4: Site Info */}
        </div>

        {/* Copyright & Social */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Lasse Lenting. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/lasselenting/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/lasse-lenting/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.github.com/lasse-lenting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
