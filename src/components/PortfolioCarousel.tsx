"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Slide = {
  id: string | number;
  title: string;
  subtitle?: string;
  image?: string;
  excerpt?: string;
  live?: string;
  repo?: string;
};

const slidesDefault: Slide[] = [
  { id: 1, title: 'Landing — Product Showcase', subtitle: 'Frontend / Design • 2025', image: '/portfolio/portofolio1.png', excerpt: 'A minimal landing with performant animations and accessible markup.', live: '#', repo: '#' },
  { id: 2, title: 'Dashboard — Analytics', subtitle: 'Fullstack • 2024', image: '/portfolio/portofolio2.png', excerpt: 'Data visualizations and realtime controls for insights.', live: '#', repo: '#' },
  { id: 3, title: 'E-commerce — Checkout Flow', subtitle: 'Frontend • 2023', image: '/portfolio/portofolio3.png', excerpt: 'Optimized checkout with progressive enhancement and A/B tested flows.', live: '#', repo: '#' },
];

export default function PortfolioCarousel({ slides }: { slides?: Slide[] }) {
  const items = slides ?? slidesDefault;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // autoplay every 6s
    timeoutRef.current = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); };
  }, [index, items.length]);

  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setIndex(i => (i + 1) % items.length);

  return (
    <div className="carousel-container relative w-full">
      <div className="carousel-viewport overflow-hidden relative rounded-lg">
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={items[index].id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.6 }} className="carousel-slide relative w-full h-[52vh] sm:h-[60vh] lg:h-[68vh]">
            <div className="carousel-split flex w-full h-full">
              <div className="carousel-split-left w-full lg:w-5/12 p-6 flex items-center">
                <div className="glass-card w-full p-6 pointer-events-auto">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">{items[index].title}</h3>
                  <p className="text-gray-300 mt-2">{items[index].subtitle}</p>
                  <p className="text-gray-300 mt-4">{items[index].excerpt}</p>
                  <div className="mt-4 flex gap-3">
                    <a href={items[index].live} className="px-4 py-2 rounded bg-white text-black font-medium">View</a>
                    <a href={items[index].repo} className="px-4 py-2 rounded border border-gray-700 text-white">Code</a>
                  </div>
                </div>
              </div>
              <div className="carousel-split-right hidden lg:block w-7/12 h-full relative">
                {items[index].image ? (
                  <div className="w-full h-full relative">
                    <Image src={items[index].image} alt={items[index].title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white/60">No image</div>
                )}
                <div className="case-overlay" />
              </div>
            </div>
            {/* Mobile: overlay caption */}
            <div className="lg:hidden carousel-caption p-4">
              <h3 className="text-xl font-bold text-white">{items[index].title}</h3>
              <p className="text-gray-300 mt-2">{items[index].subtitle}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button aria-label="Previous" onClick={prev} className="carousel-nav left-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button aria-label="Next" onClick={next} className="carousel-nav right-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      <div className="carousel-indicators absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((s, i) => (
          <button key={s.id} onClick={() => setIndex(i)} aria-label={`Go to slide ${i+1}`} className={`indicator ${i === index ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
