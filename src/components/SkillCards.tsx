"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SkillCard({ name, level, meta }: { name: string; level: number; meta?: string }) {
  // level: 1..3 (1 = basic, 3 = expert)
  const label = level === 3 ? 'Expert' : level === 2 ? 'Proficient' : 'Familiar';
  return (
    <motion.div
      className="skill-card glass-card p-4 w-56"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm text-white/90 font-semibold">{name}</div>
          {meta && <div className="text-xs text-gray-400 mt-1">{meta}</div>}
        </div>
        <div className="ml-auto text-xs text-white/80 px-2 py-1 rounded-full bg-white/6">{label}</div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1">
          <div className="microbars-hr" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`microbar-hr ${i < Math.round((level/3)*6) ? 'microbar-hr-filled' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
