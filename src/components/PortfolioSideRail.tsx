"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CaseModal from './CaseModal';
import { useMotion } from '../lib/MotionProvider';
import Image from 'next/image';

type Project = {
  id: string | number;
  title: string;
  role?: string;
  year?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
  live?: string;
  repo?: string;
};

const variants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function PortfolioSideRail({ projects }: { projects?: Project[] }) {
  const items: Project[] = projects ?? [
    { id: 1, title: 'Landing Page — POMI Digital Hubs', role: 'Frontend / Design', year: '2025', image: '/portfolio/portofolio1.png', excerpt: 'A minimal landing with performant animations and accessible markup for POMI Digital Hubs.', tags: ['React'] , live: 'https://mypomi.app/'  },
    { id: 2, title: 'Company Website Update - PT. POMI (On Progress)', role: 'Fullstack', year: '2025', image: '/portfolio/portofolio2.png', excerpt: 'Using custom theme, custom pattern & custom plugin for Wordpress', tags: ['Wordpress'] },
  ];

  const [index, setIndex] = useState(0);
  const [openId, setOpenId] = useState<string | number | null>(null);
  const { motionEnabled } = useMotion();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pid = params.get('project');
      if (pid) {
        const found = items.findIndex(it => String(it.id) === pid);
        if (found >= 0) {
          setIndex(found);
          setOpenId(items[found].id);
        }
      }
    } catch (e) {
      // ignore non-browser environments
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [items.length]);

  return (
    <div className="side-rail-portfolio w-full flex flex-col gap-6 items-stretch">
      {/* Image area */}
      <div className="relative w-full">
        <div className="h-[52vh] sm:h-[60vh] lg:h-[68vh] overflow-hidden rounded-lg">
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={items[index].id} variants={variants} initial="enter" animate="center" exit="exit" transition={motionEnabled ? { duration: 0.5 } : { duration: 0 }} className="w-full h-full relative">
                  {items[index].image ? (
                    <div className="w-full h-full relative">
                      <Image src={items[index].image} alt={items[index].title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority={true} />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white/60">No image</div>
                  )}
              <div className="case-overlay" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Info bar placed under the image, horizontal layout */}
      <div className="info-bar glass-card mt-0 p-4 flex items-center justify-between gap-4">
        <div className="info-left min-w-0">
          <h3 className="text-lg font-bold text-white truncate">{items[index].title}</h3>
          <div className="text-xs text-gray-400">{items[index].role} • {items[index].year}</div>
        </div>
        <div className="info-center text-gray-300 hidden md:block flex-1 px-4">
          <p className="truncate">{items[index].excerpt}</p>
        </div>
        <div className="info-right flex-shrink-0">
          <button onClick={() => {
            const id = items[index].id;
            setOpenId(id);
            try {
              const url = new URL(window.location.href);
              url.searchParams.set('project', String(id));
              window.history.pushState({}, '', url.toString());
            } catch (e) {}
          }} className="px-3 py-2 rounded bg-white text-black text-sm">View</button>
        </div>
      </div>

      {/* Thumbnails below info bar, horizontal */}
      <div className="w-full">
        <div className="thumb-row flex gap-3 overflow-auto py-2">
          {items.map((it, i) => (
            <button key={it.id} onClick={() => setIndex(i)} className={`thumb-btn ${i === index ? 'active' : ''}`} aria-label={`Open ${it.title}`} aria-pressed={i === index} aria-current={i === index ? 'true' : undefined}>
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.36 }} whileHover={motionEnabled ? { scale: 1.03 } : undefined} className="w-40 h-24 relative rounded overflow-hidden">
                  {it.image ? (
                    <Image src={it.image} alt={it.title} fill className="object-cover" sizes="160px" />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white/60">No image</div>
                  )}
                </motion.div>
            </button>
          ))}
        </div>
      </div>
      <CaseModal project={items.find(p => p.id === openId) ?? null} open={Boolean(openId)} onClose={() => {
        setOpenId(null);
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete('project');
          window.history.pushState({}, '', url.toString());
        } catch (e) {}
      }} />
    </div>
  );
}
