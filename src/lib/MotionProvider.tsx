"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type MotionContextType = {
  motionEnabled: boolean;
  toggleMotion: () => void;
};

const MotionContext = createContext<MotionContextType | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('motionEnabled');
      if (stored !== null) {
        setMotionEnabled(stored === 'true');
        return;
      }
    } catch (e) {}

    // fallback to prefers-reduced-motion
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setMotionEnabled(!mq.matches);
    } catch (e) {
      setMotionEnabled(true);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('motionEnabled', String(motionEnabled));
    } catch (e) {}
    // set a data attribute for CSS checks
    try {
      if (motionEnabled) document.documentElement.removeAttribute('data-reduce-motion');
      else document.documentElement.setAttribute('data-reduce-motion', 'true');
    } catch (e) {}
  }, [motionEnabled]);

  const toggleMotion = () => setMotionEnabled(v => !v);

  return (
    <MotionContext.Provider value={{ motionEnabled, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error('useMotion must be used within MotionProvider');
  return ctx;
}
