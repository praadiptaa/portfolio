"use client";

import AnimatedContainer from "../components/AnimatedContainer";
import { motion } from "framer-motion";
import { AnimatedButton, AnimatedLink } from "../components/AnimatedButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InteractiveCursor from "../components/InteractiveCursor";
import SocialLinks from "../components/SocialLinks";
import PortfolioSideRail from "../components/PortfolioSideRail";

// Komponen efek idle (declare at top-level to avoid creating component during render)
const IdleEffect = () => (
  <div className="pointer-events-none absolute inset-0 z-10">
    <div className="absolute left-1/2 top-1/3 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/6 via-indigo-300/12 to-transparent blur-2xl animate-float-glow" />
    <div className="absolute right-1/4 bottom-1/4 w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-300/18 to-white/0 blur-xl animate-float-particle" />
  </div>
);

// Minimalist content variants (subtle)
const contentVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.998, rotate: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.32, 0, 0.2, 1],
    },
  }),
};

// Card variants for portfolio/skill tiles (very subtle)
const cardVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.997 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.4 }
  }),
};

// Ripple effect handler
function useRippleEffect(sectionId: string) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = section.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      section.appendChild(ripple);
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    };
    section.addEventListener('click', handleClick);
    return () => {
      section.removeEventListener('click', handleClick);
    };
  }, []);
}

// Parallax mouse handler
function useSectionParallax(sectionId: string, bgId: string) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    const bg = document.getElementById(bgId);
    if (!section || !bg) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      // Dampen movement for a subtle minimalist parallax
      const dampX = 50 + (x - 50) * 0.12;
      const dampY = 50 + (y - 50) * 0.08;
      bg.style.setProperty('--parallax-x', `${dampX}%`);
      bg.style.setProperty('--parallax-y', `${dampY}%`);
    };
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', () => {
      bg.style.setProperty('--parallax-x', '50%');
      bg.style.setProperty('--parallax-y', '50%');
    });
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}

      


export default function LandingPage() {
  // Parallax mouse untuk setiap section
  useSectionParallax('home', 'home-bg');
  useSectionParallax('about', 'about-bg');
  useSectionParallax('experience', 'experience-bg');
  useSectionParallax('contact', 'contact-bg');

  // Ripple effect untuk setiap section
  useRippleEffect('home');
  useRippleEffect('about');
  useRippleEffect('experience');
  useRippleEffect('contact');
  // State untuk tab Education/Work
  const [selectedTab, setSelectedTab] = useState<'education' | 'work'>("education");

  // State untuk idle (tidak scroll)
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Parallax effect for home section background & idle detector
  useEffect(() => {
    const handleScroll = () => {
      const home = document.getElementById("home-bg");
      if (home) {
        home.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
      }
      setIsIdle(false);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => setIsIdle(true), 3000); // 3 detik idle
    };
    window.addEventListener("scroll", handleScroll);
    // Set idle jika tidak scroll dari awal
    idleTimeout.current = setTimeout(() => setIsIdle(true), 3000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);



  return (
    <div className="w-full font-sans bg-background text-foreground">
      <InteractiveCursor />
      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center px-4 scroll-mt-24 relative overflow-hidden pb-0 section-hover-effect"
      >
        <div
          id="home-bg"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-900 to-zinc-800 bg-fixed parallax-bg"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        />
        {isIdle && <IdleEffect />}
        <AnimatedContainer>
            <motion.div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-24" initial="hidden" animate="visible" variants={contentVariants}>
              <motion.div custom={0} variants={contentVariants} className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-zinc-900 border border-zinc-700 shadow-lg overflow-hidden flex items-center justify-center">
                  <Image src="/profile.jpeg" alt="Profile" className="object-cover" width={192} height={192} priority />
                </div>
                <div className="hidden md:block"><SocialLinks /></div>
                <div className="mt-2 md:mt-6 text-gray-400 max-w-sm"><p>Hi, I'm <span className="text-white font-semibold">Pradipta Rahmatan Isya Hertanto</span>. I design and build simple, beautiful websites focused on clarity and performance.</p></div>
              </motion.div>
              <motion.div custom={1} variants={contentVariants} className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <div className="mx-auto md:mx-0">
                  <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">Welcome to Pradipta's Portfolio</h1>
                  <p className="mt-3 text-lg text-gray-400 max-w-lg">I design focused interfaces that are fast, accessible, and memorable.</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <AnimatedLink href="#portfolio" aria-label="See portfolio" className="px-6 py-3 rounded-full bg-white text-black font-medium shadow-lg" onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>See Portfolio</AnimatedLink>
                  <AnimatedLink href="#contact" aria-label="Get in touch" className="px-6 py-3 rounded-full border border-gray-700 text-white hover:bg-white hover:text-black transition" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Get in Touch</AnimatedLink>
                </div>
                <div className="mt-6 md:hidden"><SocialLinks /></div>
              </motion.div>
            </motion.div>
        </AnimatedContainer>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-white/60">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0-6-6m6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* About Section (two-column) */}
      <section id="about" className="min-h-[70vh] flex items-center px-6 scroll-mt-24 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden section-hover-effect">
        <div
          id="about-bg"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 bg-fixed parallax-bg"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        />
        {isIdle && <IdleEffect />}
        <AnimatedContainer>
          <motion.div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <motion.div custom={1} variants={contentVariants} className="text-left">
              <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
              <p className="text-gray-400 mb-6">I'm <span className="font-semibold text-white">Pradipta Rahmatan Isya Hertanto</span>, As a Frontend Developer, I orchestrate pixels and logic to build seamless user interfaces. When I’m not crafting clean code or optimizing performance, I’m on stage shredding the guitar with my band. I bring the same passion and precision to my development work as I do to a live performance."</p>
            </motion.div>
            <motion.div custom={2} variants={contentVariants} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3">Quick Highlights</h3>
              <p className="text-gray-400 mb-4">Available for freelance and collaboration. Interested in clean UI, good performance, and meaningful interactions.</p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 rounded bg-zinc-800 text-gray-200 text-sm">Open to work</span>
                <span className="px-3 py-1 rounded bg-zinc-800 text-gray-200 text-sm">Remote</span>
                <span className="px-3 py-1 rounded bg-zinc-800 text-gray-200 text-sm">React / Next</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatedContainer>
      </section>




      {/* Experience Section - Alternating Timeline */}
      <section id="experience" className="min-h-screen flex flex-col items-center justify-center px-4 scroll-mt-24 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden section-hover-effect">
        <div
          id="experience-bg"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 bg-fixed parallax-bg"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-full" />
        {isIdle && <IdleEffect />}
        <AnimatedContainer>
          <motion.main
            className="flex flex-col items-center justify-center text-center py-24 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={contentVariants}
          >
            <motion.h1 custom={1} variants={contentVariants} className="text-4xl font-bold mb-8 text-white tracking-tight">Education & Experience</motion.h1>
            <motion.div custom={2} variants={contentVariants} className="flex gap-4 mb-8 justify-center">
              <AnimatedButton
                className={`px-7 py-2 rounded-full border border-gray-700 bg-zinc-900 text-white font-medium shadow-md transition-all duration-200 ${selectedTab === 'education' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
                onClick={() => setSelectedTab('education')}
                type="button"
              >
                Education
              </AnimatedButton>
              <AnimatedButton
                className={`px-7 py-2 rounded-full border border-gray-700 bg-zinc-900 text-white font-medium shadow-md transition-all duration-200 ${selectedTab === 'work' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
                onClick={() => setSelectedTab('work')}
                type="button"
              >
                Work / Intern Experience
              </AnimatedButton>
            </motion.div>
            {selectedTab === 'education' && (
              <motion.div className="relative w-full max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={contentVariants}>
                <div className="absolute left-1/2 top-0 h-full w-1 bg-zinc-700 rounded-full -translate-x-1/2" />
                <ol className="relative z-10">
                  {/* Enhanced Education entries (school cards with logo + details) */}
                  <motion.li className="mb-16 flex justify-between items-center w-full" custom={1} variants={contentVariants}>
                    <div className="w-1/2 pr-8 text-right">
                      <div className="exp-card glass-card p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="company-logo">
                            <img src="/logos/logo-ub.png" alt="University of Brawijaya logo" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">University of Brawijaya</div>
                            <div className="text-xs text-gray-400">Associate Degree • 2023 - 2026 (Expected)</div>
                          </div>
                        </div>
                        <div className="exp-detail text-gray-400 text-sm mt-3">Information Technology (D3 Program). Focused on software development, web technologies, system design, and practical project-based learning.</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-zinc-900 border-2 border-white rounded-full shadow-lg z-10">
                        <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                      </span>
                      <span className="h-16 w-1 bg-zinc-700" />
                    </div>
                    <div className="w-1/2" />
                  </motion.li>
                  <motion.li className="mb-16 flex justify-between items-center w-full" custom={2} variants={contentVariants}>
                    <div className="w-1/2" />
                    <div className="flex flex-col items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-zinc-900 border-2 border-white rounded-full shadow-lg z-10">
                        <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                      </span>
                      <span className="h-16 w-1 bg-zinc-700" />
                    </div>
                    <div className="w-1/2 pl-8 text-left">
                      <div className="exp-card glass-card p-4">
                        <div className="flex items-center gap-3">
                          <div className="company-logo">
                            <img src="/logos/logo-smk.png" alt="SMKN 2 Probolinggo logo" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">SMKN 2 Probolinggo</div>
                            <div className="text-xs text-gray-400">Vocational High School • 2021 - 2023</div>
                          </div>
                        </div>
                        <div className="exp-detail text-gray-400 text-sm mt-3">Majored in Computer & Network Engineering. Completed practical projects in network configuration and basic server setup, participated in workshops.</div>
                      </div>
                    </div>
                  </motion.li>
                  <motion.li className="mb-16 flex justify-between items-center w-full" custom={3} variants={contentVariants}>
                    <div className="w-1/2 pr-8 text-right">
                      <div className="exp-card glass-card p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="company-logo">
                            <img src="/logos/logo-smp.png" alt="SMPN 2 Probolinggo logo" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">SMPN 2 Probolinggo</div>
                            <div className="text-xs text-gray-400">Junior High School • 2017 - 2020</div>
                          </div>
                        </div>
                        <div className="exp-detail text-gray-400 text-sm mt-3">Completed general junior high school education with a standard academic curriculum.</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-zinc-900 border-2 border-white rounded-full shadow-lg z-10">
                        <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                      </span>
                      <span className="h-16 w-1 bg-zinc-700" />
                    </div>
                    <div className="w-1/2" />
                  </motion.li>
                  <motion.li className="mb-16 flex justify-between items-center w-full" custom={4} variants={contentVariants}>
                    <div className="w-1/2" />
                    <div className="flex flex-col items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-zinc-900 border-2 border-white rounded-full shadow-lg z-10">
                        <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                      </span>
                      <span className="h-16 w-1 bg-zinc-700" />
                    </div>
                    <div className="w-1/2 pl-8 text-left">
                      <div className="exp-card glass-card p-4">
                        <div className="flex items-center gap-3">
                          <div className="company-logo">
                            <img src="/logos/logo-sd.png" alt="SDN Kebonsari Kulon 3 Probolinggo logo" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">SDN Kebonsari Kulon 3 Probolinggo</div>
                            <div className="text-xs text-gray-400">Elementary School • 2011 - 2017</div>
                          </div>
                        </div>
                        <div className="exp-detail text-gray-400 text-sm mt-3">Completed primary education with a standard elementary school curriculum.</div>
                      </div>
                    </div>
                  </motion.li>
                </ol>
              </motion.div>
            )}
            {selectedTab === 'work' && (
              <motion.div className="relative w-full max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={contentVariants}>
                <div className="absolute left-1/2 top-0 h-full w-1 bg-zinc-700 rounded-full -translate-x-1/2" />
                <ol className="relative z-10">
                  {/* Enhanced Work/Intern Experience (logos, role badges, hover details) */}
                  <motion.li className="mb-16 flex justify-between items-center w-full" custom={1} variants={contentVariants}>
                    <div className="w-1/2 pr-8 text-right">
                      <div className="exp-card glass-card p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="company-logo">
                            <img src="/logos/logo-paiton.png" alt="PT. Paiton O&M logo" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">PT. Paiton Operation & Maintenance Indonesia</div>
                            <div className="text-xs text-gray-400">Intern Web Developer • Jul 2025 - Dec 2025</div>
                          </div>
                        </div>
                        <div className="exp-detail text-gray-400 text-sm mt-3">Developed a stock opname application using FlutterFlow, Supabase, and SQLite, built landing pages with React.js, and enhanced the company website through custom WordPress themes and PHP plugins within the ITSM System Management team.</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-zinc-900 border-2 border-white rounded-full shadow-lg z-10">
                        <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                      </span>
                      <span className="h-16 w-1 bg-zinc-700" />
                    </div>
                    <div className="w-1/2" />
                  </motion.li>
                  <motion.li className="mb-16 flex justify-between items-center w-full" custom={2} variants={contentVariants}>
                    <div className="w-1/2" />
                    <div className="flex flex-col items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-zinc-900 border-2 border-white rounded-full shadow-lg z-10">
                        <span className="w-2.5 h-2.5 bg-white rounded-full block"></span>
                      </span>
                      <span className="h-16 w-1 bg-zinc-700" />
                    </div>
                    <div className="w-1/2 pl-8 text-left">
                      <div className="exp-card glass-card p-4">
                        <div className="flex items-center gap-3">
                          <div className="company-logo">
                            <img src="/logos/logo-diskominfo.png" alt="Dinas Komunikasi dan Informatika (Diskominfo) logo" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">Dinas Komunikasi dan Informatika (Diskominfo) Probolinggo City</div>
                            <div className="text-xs text-gray-400">IT Technician Intern • Jan 2022 - May 2022</div>
                          </div>
                        </div>
                        <div className="exp-detail text-gray-400 text-sm mt-3">Handled hardware and network maintenance, troubleshooting, and technical support for government offices across Probolinggo City, ensuring stable IT infrastructure and daily operational continuity.</div>
                      </div>
                    </div>
                  </motion.li>
                </ol>
              </motion.div>
            )}
          </motion.main>
        </AnimatedContainer>
      </section>

      {/* What am I doing? Section */}
      <section id="what" className="min-h-[40vh] flex items-center justify-center px-4 scroll-mt-24 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
        <AnimatedContainer>
          <motion.main className="w-full max-w-6xl mx-auto py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <h2 className="text-3xl font-bold text-white text-center mb-4">What am I doing?</h2>
            <p className="text-gray-400 text-center mb-8">A few of the roles I focus on when building products.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{
                title: 'UI/UX Designer',
                desc: 'Design intuitive interfaces, wireframes and prototypes.',
                tools: ['Figma', 'Sketch', 'Prototyping']
              },{
                title: 'Frontend Developer',
                desc: 'Implement responsive, accessible UIs with React.',
                tools: ['React', 'Next.js', 'Tailwind']
              },{
                title: 'Web Developer',
                desc: 'Build full-featured websites with best practices.',
                tools: ['HTML', 'CSS', 'Accessibility']
              },{
                title: 'Backend Developer',
                desc: 'Design APIs, databases, and server-side logic.',
                tools: ['Node.js', 'SQL', 'APIs']
              }].map((r, i) => (
                <motion.div key={r.title} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" whileHover={{ scale: 1.03 }} viewport={{ once: true, amount: 0.4 }} className="role-card glass-card p-6 text-center">
                  <div className="role-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="9" /></svg>
                  </div>
                  <div className="role-title mt-3">{r.title}</div>
                  <div className="role-desc mt-1">{r.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        </AnimatedContainer>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-[60vh] flex flex-col items-center justify-center px-4 scroll-mt-24 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden section-hover-effect">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 bg-fixed parallax-bg" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <AnimatedContainer>
          <motion.main className="w-full max-w-4xl mx-auto py-20 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
            <p className="text-gray-400 mb-8">A selection of core skills I use to build products.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'HTML', level: 3 },
                { name: 'CSS', level: 3 },
                { name: 'JavaScript', level: 3 },
                { name: 'React', level: 3 },
                { name: 'Next.js', level: 2 },
                { name: 'Tailwind', level: 2 },
                { name: 'Laravel', level: 2 },
              ].map((s) => (
                <div key={s.name} className="skill-chip">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-dots" aria-hidden>
                    <span className={s.level >= 1 ? 'filled' : ''} />
                    <span className={s.level >= 2 ? 'filled' : ''} />
                    <span className={s.level >= 3 ? 'filled' : ''} />
                  </span>
                </div>
              ))}
            </div>
          </motion.main>
        </AnimatedContainer>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen flex flex-col items-center justify-center px-4 scroll-mt-24 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden section-hover-effect">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 bg-fixed parallax-bg" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <AnimatedContainer>
          <motion.main className="w-full max-w-6xl mx-auto py-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <h2 className="text-3xl font-bold text-white mb-6">Portfolio</h2>
            <p className="text-gray-400 mb-8">Selected projects and case studies. Click <span className="text-white">View</span> to read a brief overview.</p>
            <div className="w-full">
              {/* Side rail + Thumbnails presentation */}
              <PortfolioSideRail />
            </div>
          </motion.main>
        </AnimatedContainer>
      </section>


      {/* Contact Section (premium icon-only layout) */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 scroll-mt-24 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
        <div id="contact-bg" className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 bg-fixed parallax-bg" style={{ backgroundSize: "cover", backgroundPosition: "center" }} />
        {isIdle && <IdleEffect />}
        <AnimatedContainer>
          <motion.div className="w-full max-w-3xl mx-auto py-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Let's build something great</h2>
                <p className="text-gray-400 mt-2 max-w-md">Prefer quick messages? Find me on social media below — or send a short email. I reply to meaningful messages.</p>
                <div className="mt-6 hidden md:block">
                  <AnimatedLink href="mailto:email@domain.com" className="px-5 py-2 rounded-full bg-white text-black font-medium shadow">Send Email</AnimatedLink>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-4 bg-zinc-900 p-4 rounded-full shadow-inner">
                  <SocialLinks size="lg" />
                </div>
                <div className="mt-3 text-sm text-gray-400">Or email: <a href="mailto:diptabeldoz40@gmail.com" className="text-white underline">diptabeldoz40@gmail.com</a></div>
              </div>
            </div>
            <div className="mt-8 text-center text-xs text-gray-500">I prioritize privacy — I won't share your contact details.</div>
          </motion.div>
        </AnimatedContainer>
      </section>
    </div>
  );
}
