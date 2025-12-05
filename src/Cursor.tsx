"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  
  // Initialize device detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasPointer(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHasPointer(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);
  
  // Main cursor functionality
  useEffect(() => {
    if (!hasPointer) return;
    
    // Main mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      rafIdRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };
    
    // Check for interactive elements
    const handleInteractiveElements = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("role") ||
        target.closest(".interactive") ||
        target.classList.contains("interactive")
      );
      
      setIsHovering(isInteractive);
    };
    
    // Simple handler for mouse out
    const handleMouseOut = () => setIsHovering(false);
    
    // Attach event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleInteractiveElements, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    
    // Cleanup function
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleInteractiveElements);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [hasPointer]);
  
  if (!hasPointer) {
    return null;
  }
  
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-white/30 outline-1 outline-white/40 -outline-offset-1 backdrop-blur-sm"
      style={{
        height: isHovering ? "1rem" : "2rem",
        width: isHovering ? "1rem" : "2rem",
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        transition: "width 0.3s ease-out, height 0.3s ease-out",
      }}
    />
  );
}