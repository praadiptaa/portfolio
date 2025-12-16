"use client";

import React from 'react';
import { motion } from 'framer-motion';

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

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.45 } }),
};

export default function PortfolioMasonry({ projects }: { projects?: Project[] }) {
  const items: Project[] = projects ?? [
    { id: 1, title: 'Landing — Product Showcase', role: 'Frontend / Design', year: '2025', image: '/portfolio/portofolio1.png', excerpt: 'Minimal landing with performant animations.' , tags:['React','Next.js']},
    { id: 2, title: 'Dashboard — Analytics', role: 'Fullstack', year: '2024', image: '/portfolio/portofolio2.png', excerpt: 'Data visualizations and controls for analytics.' , tags:['D3','Supabase']},
    { id: 3, title: 'E-commerce — Checkout Flow', role: 'Frontend', year: '2023', image: '/portfolio/portofolio3.png', excerpt: 'Optimized checkout with progressive enhancement.' , tags:['Stripe','Accessibility']},
    { id: 4, title: 'Marketing Site — Campaign', role: 'Frontend', year: '2025', image: '/portfolio/cover4.svg', excerpt: 'Campaign microsite with A/B tested variants.' , tags:['Tailwind','A/B']},
    { id: 5, title: 'Tooling — Dev Platform', role: 'Fullstack', year: '2022', image: '/portfolio/cover5.svg', excerpt: 'Internal tooling for faster releases.' , tags:['Node','React']},
  ];

  return (
    <div className="masonry">
      {items.map((p, i) => (
        <motion.article key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={itemVariants} className="masonry-item glass-card">
          <div className="relative overflow-hidden">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={`${p.title} cover`} className="w-full h-auto object-cover block" loading="lazy" />
            ) : (
              <div className="h-40 bg-zinc-800 flex items-center justify-center text-white/60">No preview</div>
            )}
            <div className="case-badge">{p.year}</div>
          </div>
          <div className="p-4">
            <h3 className="text-white font-semibold mb-1">{p.title}</h3>
            <div className="text-xs text-gray-400">{p.role}</div>
            <p className="text-gray-400 text-sm mt-3">{p.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(p.tags || []).map(t => (<span key={t} className="px-2 py-1 text-xs rounded bg-zinc-800 text-gray-300">{t}</span>))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
