"use client";
import React, { useEffect } from "react";

export default function ExpModal({ item, onClose }: { item: any; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl mx-4 md:mx-0 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded overflow-hidden bg-zinc-800 flex items-center justify-center border border-zinc-700">
              {item.img ? <img src={item.img} alt={item.title} className="w-full h-full object-cover" /> : <div className="text-sm text-gray-400">Logo</div>}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <div className="text-xs text-gray-400">{item.date}</div>
              <p className="mt-3 text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
            <div className="ml-4">
              <button aria-label="Close" onClick={onClose} className="px-3 py-2 rounded bg-zinc-800 text-gray-300 hover:bg-zinc-700">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
