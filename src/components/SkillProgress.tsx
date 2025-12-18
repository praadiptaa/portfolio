"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SkillProgress({ name, percent, icon }: { name: string; percent: number; icon?: string }) {
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <div className="skill-progress-item w-72 flex-shrink-0 flex items-center gap-4 p-3" role="group" aria-label={`${name} skill`}>
      <div className="skill-icon flex items-center justify-center w-12 h-12 rounded-lg solid-panel text-white/90 font-semibold text-sm">{icon ?? name.slice(0,2)}</div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline gap-2">
          <div className="text-sm text-white/90 font-medium truncate">{name}</div>
        </div>
        <div className="mt-2 w-full h-2 rounded-full bg-white/6 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${name} proficiency ${pct} percent`}>
          <motion.div className="h-full bg-gradient-to-r from-[#7A64FF] to-[#BBAEFF]" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, ease: [0.3,0,0.2,1] }} />
        </div>
      </div>
    </div>
  );
}
