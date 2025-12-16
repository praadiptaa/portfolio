"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useMotion } from '../lib/MotionProvider';

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

export default function CaseModal({ project, open, onClose }: { project?: Project | null; open: boolean; onClose: () => void }) {
  const { motionEnabled } = useMotion();
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={motionEnabled ? { duration: 0.18 } : { duration: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={motionEnabled ? { duration: 0.32 } : { duration: 0 }}
            className="relative z-10 max-w-4xl w-full mx-4 bg-zinc-900 rounded-lg overflow-hidden shadow-xl"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <div className="text-sm text-gray-400">{project.role} • {project.year}</div>
                </div>
                <button onClick={onClose} aria-label="Close" className="text-gray-300 hover:text-white">✕</button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-800 rounded overflow-hidden relative h-64">
                  {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-white/60">No image</div>
                  )}
                </div>
                <div className="text-gray-300">
                  <p className="mb-4">{project.excerpt}</p>
                  {project.tags && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(t => <span key={t} className="text-xs px-2 py-1 bg-white/5 rounded">{t}</span>)}
                    </div>
                  )}
                  <div className="mt-6 flex gap-3">
                    {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="px-3 py-2 rounded bg-white text-black text-sm">Open Live</a>}
                    {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="px-3 py-2 rounded border border-zinc-700 text-gray-200 text-sm">Repository</a>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
