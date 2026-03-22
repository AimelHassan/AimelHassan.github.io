"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);

  // Refs for typing effect
  const type1Ref = useRef<HTMLSpanElement>(null);
  const type2Ref = useRef<HTMLSpanElement>(null);

  const text1 = "SYSTEM.STATUS // INITIALIZING";
  const text2 = "LNX_REF: 0092-X-IGNITION-ACTIVE";

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
      }
    });

    // 1. Animate Status Number, Bars & Star Rotation over 2.5 seconds
    const statusObj = { val: 0 };
    tl.to(statusObj, {
      val: 1,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = statusObj.val.toFixed(2);
        }
      }
    }, 0);

    // Sync Star Rotation
    tl.fromTo(starRef.current,
      { rotation: 0 },
      { rotation: 180, duration: 2.5, ease: "power3.inOut" },
      0
    );

    tl.fromTo(progressRef.current, 
      { width: "0%" },
      { width: "100%", duration: 2.5, ease: "power3.inOut" }, 
      0
    );

    tl.fromTo(scrubberRef.current, 
      { width: "0%" },
      { width: "100%", duration: 2.5, ease: "power3.inOut" }, 
      0
    );

    // Terminal Typing Effect
    const typeObj1 = { val: 0 };
    tl.to(typeObj1, {
      val: text1.length,
      duration: 1.0,
      ease: "none",
      onUpdate: () => {
        if (type1Ref.current) type1Ref.current.innerText = text1.substring(0, Math.floor(typeObj1.val));
      }
    }, 0);

    const typeObj2 = { val: 0 };
    tl.to(typeObj2, {
      val: text2.length,
      duration: 1.0,
      ease: "none",
      onUpdate: () => {
        if (type2Ref.current) type2Ref.current.innerText = text2.substring(0, Math.floor(typeObj2.val));
      }
    }, 1.0); // Starts after first line finishes typing

    // 2. Fade out the entire container over the last 0.5 seconds
    tl.to(containerRef.current, { 
      opacity: 0, 
      duration: 0.5, 
      ease: "power2.inOut" 
    }, 2.5);
    
  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
    >
      {/* Absolute Radial Glow to prevent background override glitches */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(198, 198, 206, 0.05) 0%, transparent 70%)" }}></div>

      {/* Central Element Cluster */}
      <div className="flex flex-col items-center space-y-12 z-10 w-full max-w-sm px-8">
        
        {/* Custom 4-Pointed Star (Aurum) */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Ambient glow behind star */}
          <div className="absolute inset-0 bg-aurum/10 blur-2xl rounded-full"></div>
          <svg 
            ref={starRef}
            className="w-full h-full text-aurum drop-shadow-[0_0_15px_rgba(247,226,149,0.4)]" 
            viewBox="0 0 100 100"
          >
            <path d="M50 0 L56 44 L100 50 L56 56 L50 100 L44 56 L0 50 L44 44 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Loading Interface */}
        <div className="w-full space-y-4">
          {/* Counter */}
          <div className="flex justify-between items-baseline font-grotesk">
            <span className="text-aurum text-[10px] tracking-[0.3em] uppercase">Status</span>
            <span ref={counterRef} className="text-quicksilver text-sm font-medium tracking-widest">
              0.00
            </span>
          </div>

          {/* Progress Line */}
          <div className="relative w-full h-[1px] bg-quicksilver/20">
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-quicksilver shadow-[0_0_8px_rgba(216,216,224,0.5)]"
            ></div>
          </div>

          {/* Centered Telemetry Typing Effect */}
          <div className="pt-6 font-grotesk flex flex-col justify-center items-center gap-2 h-16 pointer-events-none">
            <div className="text-aurum text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              <span ref={type1Ref}></span><span className="w-[1.5px] h-3 bg-aurum animate-pulse"></span>
            </div>
            <div className="text-quicksilver/40 text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <span ref={type2Ref}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-obsidian via-transparent to-obsidian opacity-50 z-0"></div>

      {/* Background Cinematic Scrubber */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] z-20">
        <div className="w-full h-full bg-quicksilver/10"></div>
        <div ref={scrubberRef} className="absolute top-0 left-0 h-full bg-white/40"></div>
      </div>
    </div>
  );
}
