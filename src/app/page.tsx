"use client";

import AnimatedContainer from "../components/AnimatedContainer";
import { motion } from "framer-motion";
import { AnimatedButton, AnimatedLink } from "../components/AnimatedButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InteractiveCursor from "../components/InteractiveCursor";
import SocialLinks from "../components/SocialLinks";
import PortfolioSideRail from "../components/PortfolioSideRail";
import { useI18n } from "../lib/i18n";
import ExpModal from "../components/ExpModal";

// Komponen efek idle (declare at top-level to avoid creating component during render)
const IdleEffect = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute left-1/2 top-1/3 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/4 via-indigo-300/8 to-transparent blur-2xl animate-float-glow" />
    <div className="absolute right-1/4 bottom-1/4 w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-300/12 to-white/0 blur-xl animate-float-particle" />
  </div>
);

// Minimalist content variants (subtle)
const contentVariants: any = {
  hidden: { opacity: 0, y: 8, scale: 0.998, rotate: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: "easeOut",
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
  const { t } = useI18n() as any;
  const [selectedExp, setSelectedExp] = useState<{ type: 'education' | 'work'; item: any } | null>(null);
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

  // Accordion state: which item is open (null = all collapsed)
  const [openEducation, setOpenEducation] = useState<number | null>(null);
  const [openWork, setOpenWork] = useState<number | null>(null);

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
    <div className="w-full font-sans bg-transparent text-foreground">
      <InteractiveCursor />
      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center px-4 scroll-mt-24 relative overflow-hidden pb-0 section-hover-effect"
      >
        {isIdle && <div className="hidden md:block"><IdleEffect /></div>}
        <AnimatedContainer>
            <motion.div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-24" initial="hidden" animate="visible" variants={contentVariants}>
              <motion.div custom={0} variants={contentVariants} className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-full company-avatar overflow-hidden flex items-center justify-center">
                  <Image src="/profile.jpeg" alt="Profile" className="object-cover" width={192} height={192} priority />
                </div>
                <div className="hidden md:block"><SocialLinks /></div>
                <div className="mt-2 md:mt-6 text-gray-400 max-w-sm"><p>Hi, I'm <span className="text-white font-semibold">{t.home.name}</span>. {t.home.welcome}</p></div>
              </motion.div>
              <motion.div custom={1} variants={contentVariants} className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <div className="mx-auto md:mx-0">
                  <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">{(t.home as any).titleFull}</h1>
                  <p className="mt-3 text-lg text-gray-400 max-w-lg">{t.home.welcome}</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <AnimatedLink href="#portfolio" aria-label="See portfolio" className="px-6 py-3 rounded-full bg-white text-black font-medium shadow-lg" onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>{(t.home as any).cta.portfolio}</AnimatedLink>
                  <AnimatedLink href="#contact" aria-label="Get in touch" className="px-6 py-3 rounded-full border border-gray-700 text-white hover:bg-white hover:text-black transition" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>{(t.home as any).cta.contact}</AnimatedLink>
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
      <section id="about" className="min-h-[70vh] flex items-center px-6 scroll-mt-24 relative overflow-hidden section-hover-effect">
        {isIdle && <div className="hidden md:block"><IdleEffect /></div>}
        <AnimatedContainer>
          <motion.div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
              <motion.div custom={1} variants={contentVariants} className="text-left">
              <h2 className="text-4xl font-bold text-white mb-4">{t.about.title}</h2>
              <p className="text-gray-400 mb-6">{t.about.desc}</p>
            </motion.div>
            <motion.div custom={2} variants={contentVariants} className="solid-panel rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3">{(t as any).aboutSection.highlightsTitle}</h3>
              <p className="text-gray-400 mb-4">{(t as any).aboutSection.highlightsDesc}</p>
              <div className="flex gap-3 flex-wrap">
                {(t as any).aboutSection.badges.map((b: string) => (
                  <span key={b} className="px-3 py-1 rounded tag-pill">{b}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatedContainer>
      </section>




      {/* Experience Section - Alternating Timeline */}
      <section id="experience" className="min-h-screen flex flex-col items-center justify-center px-4 scroll-mt-24 relative overflow-hidden section-hover-effect">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-full" />
        {isIdle && <div className="hidden md:block"><IdleEffect /></div>}
        <AnimatedContainer>
          <motion.main
            className="flex flex-col items-center justify-center text-center py-24 w-full"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <motion.h1 custom={1} variants={contentVariants} className="text-4xl font-bold mb-8 text-white tracking-tight">{t.experience.title}</motion.h1>
            <motion.div custom={2} variants={contentVariants} className="flex gap-4 mb-8 justify-center">
              <AnimatedButton
                className={`px-7 py-2 rounded-full border border-gray-700 solid-btn text-white font-medium shadow-md transition-all duration-200 ${selectedTab === 'education' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
                onClick={() => setSelectedTab('education')}
                type="button"
              >
                {t.experience.tabs.education}
              </AnimatedButton>
              <AnimatedButton
                className={`px-7 py-2 rounded-full border border-gray-700 solid-btn text-white font-medium shadow-md transition-all duration-200 ${selectedTab === 'work' ? 'bg-white text-black' : 'hover:bg-white hover:text-black'}`}
                onClick={() => setSelectedTab('work')}
                type="button"
              >
                {t.experience.tabs.work}
              </AnimatedButton>
            </motion.div>
            {selectedTab === 'education' && (
              <motion.div className="relative w-full max-w-4xl mx-auto" initial="hidden" animate="visible" variants={contentVariants}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.experience.educationList.map((e: any, i: number) => (
                    <motion.div key={e.id} custom={i} variants={cardVariants} className="exp-card glass-card p-4 flex items-start gap-4 cursor-pointer hover:scale-[1.01] transition" onClick={() => setSelectedExp({ type: 'education', item: e })} role="button" tabIndex={0} onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') setSelectedExp({ type: 'education', item: e }); }}>
                      <div className="company-logo"><img src={e.img} alt={`${e.title} logo`} loading="lazy" /></div>
                      <div>
                        <div className="text-white font-semibold">{e.title}</div>
                        <div className="text-xs text-gray-400">{e.date}</div>
                        <div className="exp-detail text-gray-400 text-sm mt-2 line-clamp-3">{e.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {selectedTab === 'work' && (
              <motion.div className="relative w-full max-w-4xl mx-auto" initial="hidden" animate="visible" variants={contentVariants}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.experience.workList.map((e: any, i: number) => (
                      <motion.div key={e.id} custom={i} variants={cardVariants} className="exp-card glass-card p-4 flex items-start gap-4 cursor-pointer hover:scale-[1.01] transition" onClick={() => setSelectedExp({ type: 'work', item: e })} role="button" tabIndex={0} onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') setSelectedExp({ type: 'work', item: e }); }}>
                        <div className="company-logo"><img src={e.img} alt={`${e.title} logo`} loading="lazy" /></div>
                        <div>
                          <div className="text-white font-semibold">{e.title}</div>
                          <div className="text-xs text-gray-400">{e.date}</div>
                          <div className="exp-detail text-gray-400 text-sm mt-2 line-clamp-3">{e.desc}</div>
                        </div>
                      </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.main>
        </AnimatedContainer>
      </section>
      {selectedExp && (
        <ExpModal item={selectedExp.item} onClose={() => setSelectedExp(null)} />
      )}

      {/* What am I doing? Section */}
      <section id="what" className="min-h-[40vh] flex items-center justify-center px-4 scroll-mt-24 relative overflow-hidden">
        <AnimatedContainer>
          <motion.main className="w-full max-w-6xl mx-auto py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <h2 className="text-3xl font-bold text-white text-center mb-4">{t.what.title}</h2>
            <p className="text-gray-400 text-center mb-8">{t.what.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.what.roles.map((r: any, i: number) => (
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
      <section id="skills" className="min-h-[60vh] flex flex-col items-center justify-center px-4 scroll-mt-24 relative overflow-hidden section-hover-effect">
        <AnimatedContainer>
          <motion.main className="w-full max-w-4xl mx-auto py-20 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <h2 className="text-3xl font-bold text-white mb-6">{t.skills.title}</h2>
            <p className="text-gray-400 mb-8">{t.skills.desc}</p>
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
      <section id="portfolio" className="min-h-screen flex flex-col items-center justify-center px-4 scroll-mt-24 relative overflow-hidden section-hover-effect">
        <AnimatedContainer>
          <motion.main className="w-full max-w-6xl mx-auto py-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <h2 className="text-3xl font-bold text-white mb-6">{t.portfolio.title}</h2>
            <p className="text-gray-400 mb-8">{t.portfolio.note}</p>
            <div className="w-full">
              {/* Side rail + Thumbnails presentation */}
              <PortfolioSideRail />
            </div>
          </motion.main>
        </AnimatedContainer>
      </section>


      {/* Contact Section (premium icon-only layout) */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 scroll-mt-24 relative overflow-hidden">
        {isIdle && <div className="hidden md:block"><IdleEffect /></div>}
        <AnimatedContainer>
          <motion.div className="w-full max-w-3xl mx-auto py-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={contentVariants}>
            <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white">{t.contact.title}</h2>
                <p className="text-gray-400 mt-2 max-w-md">{t.contact.desc}</p>
                <div className="mt-6 hidden md:block">
                  <AnimatedLink href={`mailto:${t.contact.email}`} className="px-5 py-2 rounded-full bg-white text-black font-medium shadow">{t.contact.sendEmail}</AnimatedLink>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-4 bg-zinc-900 p-4 rounded-full shadow-inner">
                  <SocialLinks size="lg" />
                </div>
                <div className="mt-3 text-sm text-gray-400">Or email: <a href={`mailto:${t.contact.email}`} className="text-white underline">{t.contact.email}</a></div>
              </div>
            </div>
            <div className="mt-8 text-center text-xs text-gray-500">{t.contact.privacy}</div>
          </motion.div>
        </AnimatedContainer>
      </section>
    </div>
  );
}
