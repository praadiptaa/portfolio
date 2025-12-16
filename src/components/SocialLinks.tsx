"use client";

import React from "react";
import { AnimatedLink } from "./AnimatedButton";

export default function SocialLinks({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const classes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }[size];

  const iconClass = 'w-5 h-5';

  return (
    <div className="flex items-center gap-3">
      <AnimatedLink href="https://github.com/praadiptaa" className={`${classes} rounded-full border border-gray-700 bg-transparent text-white/90 hover:bg-white hover:text-black transition transform-gpu duration-200 hover:scale-110 social-icon flex items-center justify-center`} aria-label="GitHub">
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.96 3.22 9.16 7.69 10.64.56.1.77-.24.77-.53 0-.26-.01-1-.02-1.93-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 .99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.71-1.49-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.45.11-3.02 0 0 .95-.31 3.12 1.16a10.8 10.8 0 0 1 2.85-.38c.97 0 1.95.13 2.85.38 2.17-1.47 3.12-1.16 3.12-1.16 .61 1.57.23 2.73.11 3.02.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .29.21.64.78.53C19.03 21 22.25 16.7 22.25 11.75 22.25 5.48 17.27.5 12 .5z"/></svg>
      </AnimatedLink>

      <AnimatedLink href="https://www.linkedin.com/in/praadipta19/" className={`${classes} rounded-full border border-gray-700 bg-transparent text-white/90 hover:bg-white hover:text-black transition transform-gpu duration-200 hover:scale-110 social-icon flex items-center justify-center`} aria-label="LinkedIn">
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3.5 8.99h3v11.01h-3V8.99zM9.5 8.99h2.88v1.49h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v6.48h-3v-5.74c0-1.37-.03-3.13-1.91-3.13-1.92 0-2.22 1.5-2.22 3.03v5.84h-3V8.99z"/></svg>
      </AnimatedLink>

      <AnimatedLink href="https://www.instagram.com/praadiptaa?igsh=MWs4ZWx6Y3BiOGo1bg==" className={`${classes} rounded-full border border-gray-700 bg-transparent text-white/90 hover:bg-white hover:text-black transition transform-gpu duration-200 hover:scale-110 social-icon flex items-center justify-center`} aria-label="Instagram">
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" /></svg>
      </AnimatedLink>
    </div>
  );
}
