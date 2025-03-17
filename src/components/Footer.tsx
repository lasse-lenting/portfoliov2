import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-black border-t border-white/10 py-16">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* CTA Section */}
                <div className="mb-16">
                    <h2 className="text-white text-4xl md:text-5xl font-thunder-black tracking-[-0.03em] mb-6">
                        Let&apos;s create something<br />together.
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="/contact" 
                            className="inline-block bg-white text-black px-8 py-3 font-thunder text-xl tracking-wide hover:bg-white/90 transition-colors"
                        >
                            Get in touch
                        </Link>
                        <Link 
                            href="mailto:hello@lasselenting.nl" 
                            className="inline-block border border-white/30 text-white px-8 py-3 font-thunder text-xl tracking-wide hover:bg-white/10 transition-colors"
                        >
                            hello@lasselenting.nl
                        </Link>
                    </div>
                </div>
                
                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white text-xl font-thunder mb-4">About</h3>
                        <p className="text-white/70 mb-4">
                            Lasse is a web developer, 3D modeller, and graphic designer creating visually stunning and user-friendly experiences.
                        </p>
                        <p className="text-white/50 text-sm">
                            Based in Rotterdam, The Netherlands.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-white text-xl font-thunder mb-4">Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/projects" className="text-white/70 hover:text-white transition-colors">Projects</Link></li>
                            <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-white text-xl font-thunder mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Lasse Lenting. All rights reserved.
                    </p>
                    <p className="text-white/50 text-sm mt-2 md:mt-0">
                        Designed & Built with ♥ in Next.js
                    </p>
                </div>
            </div>
        </footer>
    )
}