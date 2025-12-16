"use client";
import React from "react";

export function SmoothScrollScript() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);
  return null;
}
