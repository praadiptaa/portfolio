"use client";

import React, { useEffect, useRef } from "react";

export default function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      cursor.style.display = "none";
      return;
    }

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    // Hover highlights for interactive elements
    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a") || target.closest("button") || target.classList.contains("interactive")) {
        cursor.classList.add("cursor--hover");
      }
    };
    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a") || target.closest("button") || target.classList.contains("interactive")) {
        cursor.classList.remove("cursor--hover");
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden>
        <div ref={dotRef} className="cursor__dot" />
      </div>
    </>
  );
}
