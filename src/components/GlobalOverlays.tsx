"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalOverlays() {
  const fadeGroupRef = useRef<HTMLDivElement>(null);
  
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);
  const dot4Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hide text/stars when overlapping text-heavy sections
    const venturesSection = document.getElementById("ventures");
    const archiveSection = document.getElementById("archive");
    const architectureSection = document.getElementById("architecture");
    const connectSection = document.getElementById("connect");

    [venturesSection, archiveSection, architectureSection].forEach((section) => {
      if (section && fadeGroupRef.current) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 20%",
          end: "bottom 80%",
          onEnter: () => gsap.to(fadeGroupRef.current, { opacity: 0, duration: 0.5 }),
          onLeave: () => gsap.to(fadeGroupRef.current, { opacity: 1, duration: 0.5 }),
          onEnterBack: () => gsap.to(fadeGroupRef.current, { opacity: 0, duration: 0.5 }),
          onLeaveBack: () => gsap.to(fadeGroupRef.current, { opacity: 1, duration: 0.5 }),
          refreshPriority: -1,
        });
      }
    });

    // 2. Animate edge dots based on scroll progression
    const grayColor = "rgba(216, 216, 224, 0.2)";
    const goldColor = "#F7E295";

    if (venturesSection && dot1Ref.current && dot2Ref.current && dot3Ref.current && dot4Ref.current) {
      ScrollTrigger.create({
        trigger: venturesSection,
        start: "top center",
        onEnter: () => {
          gsap.to(dot2Ref.current, { backgroundColor: goldColor, duration: 0.3 });
          gsap.to([dot1Ref.current, dot3Ref.current, dot4Ref.current], { backgroundColor: grayColor, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(dot1Ref.current, { backgroundColor: goldColor, duration: 0.3 });
          gsap.to([dot2Ref.current, dot3Ref.current, dot4Ref.current], { backgroundColor: grayColor, duration: 0.3 });
        },
      });
    }

    if (archiveSection && dot1Ref.current && dot2Ref.current && dot3Ref.current && dot4Ref.current) {
      ScrollTrigger.create({
        trigger: archiveSection,
        start: "top center",
        onEnter: () => {
          gsap.to(dot3Ref.current, { backgroundColor: goldColor, duration: 0.3 });
          gsap.to([dot1Ref.current, dot2Ref.current, dot4Ref.current], { backgroundColor: grayColor, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(dot2Ref.current, { backgroundColor: goldColor, duration: 0.3 });
          gsap.to([dot1Ref.current, dot3Ref.current, dot4Ref.current], { backgroundColor: grayColor, duration: 0.3 });
        },
        refreshPriority: -1,
      });
    }

    if (architectureSection && dot1Ref.current && dot2Ref.current && dot3Ref.current && dot4Ref.current) {
      ScrollTrigger.create({
        trigger: architectureSection,
        start: "top center",
        onEnter: () => {
          gsap.to(dot4Ref.current, { backgroundColor: goldColor, duration: 0.3 });
          gsap.to([dot1Ref.current, dot2Ref.current, dot3Ref.current], { backgroundColor: grayColor, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(dot3Ref.current, { backgroundColor: goldColor, duration: 0.3 });
          gsap.to([dot1Ref.current, dot2Ref.current, dot4Ref.current], { backgroundColor: grayColor, duration: 0.3 });
        },
        refreshPriority: -2,
      });
    }

    if (connectSection && dot1Ref.current && dot2Ref.current && dot3Ref.current && dot4Ref.current) {
      ScrollTrigger.create({
        trigger: connectSection,
        start: "top center",
        onEnter: () => {
          gsap.to([dot1Ref.current, dot2Ref.current, dot3Ref.current, dot4Ref.current], { backgroundColor: goldColor, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(dot4Ref.current, { backgroundColor: goldColor, duration: 0.3 });
          gsap.to([dot1Ref.current, dot2Ref.current, dot3Ref.current], { backgroundColor: grayColor, duration: 0.3 });
        },
        refreshPriority: -3,
      });
    }

  }, { scope: undefined }); // global scope to find element IDs

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      
      {/* Elements that FADE OUT during text overlap */}
      <div ref={fadeGroupRef} className="transition-opacity duration-500">
        <div className="absolute bottom-12 left-12 max-w-xs space-y-4">
          <span className="font-grotesk text-[9px] uppercase tracking-[0.3em] text-aurum">
            system.status // operational
          </span>
          <p className="font-garamond italic text-lg text-quicksilver/40 leading-tight">
            "The stage is set in silence; the light is merely a consequence of the thought."
          </p>
        </div>

        <div className="absolute z-20 pointer-events-none top-32 right-12 md:top-[11rem] md:right-[11rem]">
          <div className="animate-slow-rotate text-aurum opacity-60">
            <svg fill="currentColor" height="32" viewBox="0 0 24 24" width="32">
              <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z"></path>
            </svg>
          </div>
        </div>

        <div className="absolute z-20 pointer-events-none bottom-32 left-12 md:bottom-[11rem] md:left-[11rem]">
          <div className="animate-slow-rotate text-aurum opacity-60">
            <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
              <path d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Elements that REMAIN VISIBLE (Edge Lines & Dots) */}
      <div>
        {/* Hide coordinates on mobile to save horizontal space */}
        <div className="hidden md:flex absolute top-1/2 left-6 -translate-y-1/2 flex-col gap-24 items-center opacity-20">
          <span className="font-grotesk text-[8px] -rotate-90 origin-center tracking-[0.5em] uppercase whitespace-nowrap">
            latitude.30.15
          </span>
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-quicksilver to-transparent"></div>
          <span className="font-grotesk text-[8px] -rotate-90 origin-center tracking-[0.5em] uppercase whitespace-nowrap">
            longitude.71.52
          </span>
        </div>

        {/* Progress Dots: Top on Mobile, Right on Desktop */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex md:top-1/2 md:right-6 md:left-auto md:translate-x-0 md:-translate-y-1/2 md:flex-col gap-8 items-center opacity-40">
          <div ref={dot1Ref} className="w-1 h-1 rounded-full bg-aurum"></div>
          <div ref={dot2Ref} className="w-1 h-1 rounded-full bg-quicksilver/20"></div>
          <div ref={dot3Ref} className="w-1 h-1 rounded-full bg-quicksilver/20"></div>
          <div ref={dot4Ref} className="w-1 h-1 rounded-full bg-quicksilver/20"></div>
        </div>

        {/* Mobile Branding (Below dots) */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex md:hidden flex-col items-center gap-1 opacity-60">
          <span className="font-grotesk text-[8px] uppercase tracking-[0.4em] text-aurum/80">
            branding.core
          </span>
          <div className="font-garamond italic text-lg lowercase tracking-tighter text-quicksilver">
            quiet ignition
          </div>
        </div>
      </div>

    </div>
  );
}
