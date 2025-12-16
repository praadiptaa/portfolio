"use client";
import { AnimatedLink } from "./AnimatedButton";
import SocialLinks from "./SocialLinks";

export default function Navbar() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <a href="#home" onClick={e => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-3">
            <span className="font-semibold text-white">Pradipta - Personal Portfolio</span>
          </a>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-200">
          <AnimatedLink href="#home" className="px-3 py-2 rounded-md hover:text-white" onClick={e => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}>Home</AnimatedLink>
          <AnimatedLink href="#about" className="px-3 py-2 rounded-md hover:text-white" onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</AnimatedLink>
          <AnimatedLink href="#portfolio" className="px-3 py-2 rounded-md hover:text-white" onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>Portfolio</AnimatedLink>
          <AnimatedLink href="#experience" className="px-3 py-2 rounded-md hover:text-white" onClick={e => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }}>Experience</AnimatedLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block"><SocialLinks size="md" /></div>
          <a href="/resume.pdf" download className="px-3 py-2 rounded-md border border-zinc-700 text-gray-200 hover:bg-white/5 hidden md:inline-flex">Resume</a>
          <AnimatedLink href="#contact" className="px-4 py-2 rounded-full bg-white text-black font-medium shadow-sm hidden md:inline-flex" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</AnimatedLink>
          <button aria-label="Open menu" className="md:hidden px-3 py-2 rounded-md border border-zinc-800 text-gray-200">☰</button>
        </div>
      </nav>
    </div>
  );
}
