"use client";
import { motion } from "framer-motion";

export default function AnimatedContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
