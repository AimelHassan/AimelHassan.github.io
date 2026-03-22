"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);

  const mouse = useRef({ x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 });
  const pos = useRef({ x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 });
  
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  
  const isHovering = useRef(false);
  const currentScale = useRef(0); 
  const currentChevronScale = useRef(1);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouchDevice.current = true;
      return;
    }

    const cursor = cursorRef.current;
    const orb = orbRef.current;
    if (!cursor || !orb) return;

    gsap.set(cursor, { transformOrigin: "100% 50%" });
    gsap.set(orb, { transformOrigin: "50% 50%" });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.group') || target.closest('.cursor-pointer')) {
        isHovering.current = true;
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.group') || target.closest('.cursor-pointer')) {
        isHovering.current = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const rotSet = gsap.quickSetter(cursor, "rotation", "deg");
    const chevScaleSet = gsap.quickSetter(cursor, "scale");

    const orbXSet = gsap.quickSetter(orb, "x", "px");
    const orbYSet = gsap.quickSetter(orb, "y", "px");
    const orbScaleSet = gsap.quickSetter(orb, "scale");

    const ticker = gsap.ticker.add(() => {
      const dt = gsap.ticker.deltaRatio(); 
      const lerpFactor = 0.2 * dt; 
      
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      pos.current.x += dx * lerpFactor;
      pos.current.y += dy * lerpFactor;

      const vx = dx * lerpFactor;
      const vy = dy * lerpFactor;
      const speed = Math.sqrt(vx * vx + vy * vy);

      if (speed > 0.5) {
        const rawAngle = Math.atan2(vy, vx) * (180 / Math.PI);
        let diff = rawAngle - targetRotation.current;
        diff = ((diff + 180) % 360) - 180;
        if (diff < -180) diff += 360; 
        targetRotation.current += diff;
      }

      currentRotation.current += (targetRotation.current - currentRotation.current) * (0.15 * dt);

      // Smooth Mathematical Scaling (Replaces CSS Transitions completely)
      const targetOrbScale = isHovering.current ? 1 : 0;
      currentScale.current += (targetOrbScale - currentScale.current) * (0.15 * dt);
      
      const targetChevScale = isHovering.current ? 0.3 : 1;
      currentChevronScale.current += (targetChevScale - currentChevronScale.current) * (0.15 * dt);

      // Render Chevron (w-5 h-5 -> offsets are 20 and 10 for tip alignment)
      xSet(pos.current.x - 20); 
      ySet(pos.current.y - 10);
      rotSet(currentRotation.current);
      chevScaleSet(currentChevronScale.current);

      // Render Orb (w-20 h-20 -> exactly 80px -> offsets 40 and 40 to perfectly center over tip)
      orbXSet(pos.current.x - 40);
      orbYSet(pos.current.y - 40);
      orbScaleSet(currentScale.current);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  if (isTouchDevice.current) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}} />
      
      {/* 1. Backdrop Filter Inversion Orb (Bulletproof replacement for mix-blend bugs ensuring guaranteed pixel inversion regardless of OS stacking context isolation) */}
      <div 
        ref={orbRef}
        className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-[99998] hidden md:block"
        style={{ transform: "scale(0)", backdropFilter: "invert(1) contrast(2) grayscale(0.2)" }}
      ></div>

      {/* 2. Primary 3D Chevron */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-5 h-5 z-[99999] pointer-events-none hidden md:block"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full origin-right drop-shadow-2xl mix-blend-screen opacity-90"
        >
          <defs>
            <linearGradient id="aurumFacetL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" /> 
              <stop offset="50%" stopColor="#FEF6D8" /> 
              <stop offset="100%" stopColor="#F7E295" /> 
            </linearGradient>
            
            <linearGradient id="aurumFacetD" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7E295" />
              <stop offset="50%" stopColor="#D4AF37" /> 
              <stop offset="100%" stopColor="#997A15" /> 
            </linearGradient>
          </defs>

          <path d="M2 2 L24 12 L8 12 Z" fill="url(#aurumFacetL)" />
          <path d="M2 22 L24 12 L8 12 Z" fill="url(#aurumFacetD)" />
        </svg>
      </div>
    </>
  );
}
