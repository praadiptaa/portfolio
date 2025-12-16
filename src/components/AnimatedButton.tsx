"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

export function AnimatedButton({ children, className = "", ...props }: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileTap={{ scale: 0.95, boxShadow: "0 0 0 2px #fff, 0 0 16px #fff2" }}
      whileHover={{ scale: 1.04, boxShadow: "0 2px 16px #fff1" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedLink({ children, className = "", ...props }: HTMLMotionProps<"a">) {
  return (
    <motion.a
      whileTap={{ scale: 0.95, color: "#fff", backgroundColor: "#222" }}
      whileHover={{ scale: 1.08, color: "#fff" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}
