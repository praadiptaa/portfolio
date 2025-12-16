"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SkillMicrobars({ name, level }: { name: string; level: number }) {
  const segments = 5;
  const fillCount = Math.max(0, Math.min(segments, Math.round((level / 3) * segments)));

  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <div className="text-sm text-white/90 font-medium">{name}</div>
      <div className="microbars mt-2">
        {Array.from({ length: segments }).map((_, i) => {
          const filled = i < fillCount;
          return (
            <motion.div
              key={i}
              className={`microbar ${filled ? 'microbar-filled' : ''}`}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.28, delay: i * 0.03 }}
            />
          );
        })}
      </div>
    </div>
  );
}
