"use client";
import { useState } from "react";
import { AnimatedLink } from "./AnimatedButton";
import SocialLinks from "./SocialLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <a href="#home" onClick={e => handleNavClick('home', e)} className="flex items-center gap-3">
            <span className="font-semibold text-white">Pradipta - Personal Portfolio</span>
          </a>
        </div>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-200">
          <AnimatedLink href="#home" className="px-3 py-2 rounded-md hover:text-white" onClick={e => handleNavClick('home', e)}>Home</AnimatedLink>
          <AnimatedLink href="#about" className="px-3 py-2 rounded-md hover:text-white" onClick={e => handleNavClick('about', e)}>About</AnimatedLink>
          <AnimatedLink href="#portfolio" className="px-3 py-2 rounded-md hover:text-white" onClick={e => handleNavClick('portfolio', e)}>Portfolio</AnimatedLink>
          <AnimatedLink href="#experience" className="px-3 py-2 rounded-md hover:text-white" onClick={e => handleNavClick('experience', e)}>Experience</AnimatedLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block"><SocialLinks size="md" /></div>
          <a href="/resume.pdf" download className="px-3 py-2 rounded-md border border-zinc-700 text-gray-200 hover:bg-white/5 hidden md:inline-flex">Resume</a>
          <AnimatedLink href="#contact" className="px-4 py-2 rounded-full bg-white text-black font-medium shadow-sm hidden md:inline-flex" onClick={e => handleNavClick('contact', e)}>Contact</AnimatedLink>

          {/* Mobile menu button */}
          <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(v => !v)} className="md:hidden px-3 py-2 rounded-md border border-zinc-800 text-gray-200">
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-md border-t border-zinc-800 md:hidden z-40">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
              <a href="#home" onClick={e => handleNavClick('home', e)} className="px-3 py-2 rounded-md hover:bg-zinc-900/50">Home</a>
              <a href="#about" onClick={e => handleNavClick('about', e)} className="px-3 py-2 rounded-md hover:bg-zinc-900/50">About</a>
              <a href="#portfolio" onClick={e => handleNavClick('portfolio', e)} className="px-3 py-2 rounded-md hover:bg-zinc-900/50">Portfolio</a>
              <a href="#experience" onClick={e => handleNavClick('experience', e)} className="px-3 py-2 rounded-md hover:bg-zinc-900/50">Experience</a>
              <div className="flex items-center gap-3 pt-2">
                <SocialLinks size="sm" />
                <a href="/resume.pdf" download className="px-3 py-2 rounded-md border border-zinc-700 text-gray-200">Resume</a>
                <a href="#contact" onClick={e => handleNavClick('contact', e)} className="px-4 py-2 rounded-full bg-white text-black font-medium">Contact</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
