"use client";

import React from 'react';
import { motion } from 'framer-motion';

type Project = {
  id: string | number;
  title: string;
  role: string;
  year?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
  live?: string;
  repo?: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

export default function PortfolioGrid({ projects }: { projects?: Project[] }) {
  const items: Project[] = projects ?? [
    {
      id: 1,
      title: 'Landing — Product Showcase',
      role: 'Frontend / Design',
      year: '2025',
      image: '/portfolio/cover1.svg',
      excerpt: 'A minimal landing with performant animations and accessibility-first markup.',
      tags: ['React', 'Next.js', 'Tailwind'],
      live: '#',
      repo: '#',
    },
    {
      id: 2,
      title: 'Dashboard — Analytics',
      role: 'Fullstack',
      year: '2024',
      image: '/portfolio/portofolio2.png',
      excerpt: 'Data-driven dashboard with charts and realtime updates.',
      tags: ['React', 'D3', 'Supabase'],
      live: '#',
      repo: '#',
    },
    {
      id: 3,
      title: 'E-commerce — Checkout Flow',
      role: 'Frontend',
      year: '2023',
      image: '/portfolio/portofolio3.png',
      excerpt: 'Streamlined checkout with progressive enhancement and A/B tested UI.',
      tags: ['Next.js', 'Stripe', 'Tailwind'],
      live: '#',
      repo: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="glass-card overflow-hidden relative group"
          aria-labelledby={`project-${p.id}-title`}
        >
          <div className="h-44 bg-zinc-800 overflow-hidden">
            {p.image ? (
              <img src={p.image} alt={`${p.title} cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">No preview</div>
            )}
            <div className="case-overlay pointer-events-none" />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id={`project-${p.id}-title`} className="text-white font-semibold text-lg">{p.title}</h3>
                <div className="text-xs text-gray-400 mt-1">{p.role} • {p.year}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3">{p.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(p.tags || []).map(t => (
                <span key={t} className="px-2 py-1 text-xs rounded bg-zinc-800 text-gray-300">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a href={p.live} className="px-3 py-1 rounded border border-gray-700 text-white/90 hover:bg-white hover:text-black transition">View</a>
              <a href={p.repo} className="px-3 py-1 rounded border border-gray-700 text-white/90 hover:bg-white hover:text-black transition">Code</a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
