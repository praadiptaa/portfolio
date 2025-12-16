"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SkillRing({ name, level }: { name: string; level: number }) {
  // Map level (1-3) to a relative value (0-1) but we won't show the percentage label
  const pct = level === 3 ? 0.95 : level === 2 ? 0.78 : 0.55;
  const size = 88;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * pct;

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <defs>
          <linearGradient id={`g-${name.replace(/\s+/g, '-')}`} x1="0%" x2="100%">
            <stop offset="0%" stopColor="#7A64FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <g transform={`translate(${size/2}, ${size/2})`}>
          <circle r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth={stroke} />
          <motion.circle
            r={radius}
            fill="transparent"
            stroke={`url(#g-${name.replace(/\s+/g, '-')})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - dash }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.3,0,0.2,1] }}
          />
        </g>
      </svg>
      <div className="text-sm text-white/90 font-medium">{name}</div>
    </div>
  );
}
