"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".connect-header-elem", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "h1.connect-header-elem",
        start: "top 85%",
      }
    });

    // Links staggered reveal
    gsap.from(".connect-link-elem", {
      x: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".connect-list-container",
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="connect" className="relative z-10 min-h-screen px-6 py-24 md:px-24 md:py-0 flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end gap-24 md:gap-12 pb-12 md:pb-32 relative z-10">
        
        {/* Left: Giant Heading */}
        <h1 className="connect-header-elem font-garamond italic text-7xl sm:text-[8rem] md:text-[12rem] leading-none tracking-tighter text-white -translate-y-8 md:-translate-y-16">
          connect<span className="text-aurum">.</span>
        </h1>

        {/* Right: Terminal Details */}
        <div className="flex flex-col gap-12 text-center md:text-right relative">
          
          {/* Pulsating Aurum Glow behind the terminal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] h-[300px] bg-aurum/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>

          <div className="connect-list-container flex flex-col items-center md:items-end gap-12 font-grotesk lowercase tracking-[0.4em] text-[10px] text-quicksilver/60 border-b md:border-b-0 md:border-r border-aurum/20 pb-12 md:pb-0 md:pr-8 w-full">
            
            <div className="connect-link-elem flex flex-col items-end gap-2 group cursor-pointer">
              <span className="text-aurum/40 mb-1">01 / init</span>
              <Link href="mailto:aimel.hassan@example.com" className="text-lg tracking-[0.2em] group-hover:text-aurum transition-colors duration-500">
                aimel.hassan@example.com
              </Link>
              <div className="h-[1px] w-0 group-hover:w-full bg-aurum transition-all duration-700 mt-2"></div>
            </div>

            <div className="connect-link-elem flex flex-col items-end gap-2 group cursor-pointer">
              <span className="text-aurum/40 mb-1">02 / github</span>
              <Link href="https://github.com/aimelhassan" target="_blank" rel="noopener noreferrer" className="text-lg tracking-[0.2em] group-hover:text-aurum transition-colors duration-500">
                @aimelhassan
              </Link>
              <div className="h-[1px] w-0 group-hover:w-full bg-aurum transition-all duration-700 mt-2"></div>
            </div>

            <div className="connect-link-elem flex flex-col items-end gap-2 group cursor-pointer">
              <span className="text-aurum/40 mb-1">03 / x_twitter</span>
              <Link href="#" className="text-lg tracking-[0.2em] group-hover:text-aurum transition-colors duration-500">
                @aimel_h
              </Link>
              <div className="h-[1px] w-0 group-hover:w-full bg-aurum transition-all duration-700 mt-2"></div>
            </div>

            <div className="connect-link-elem flex flex-col items-center md:items-end gap-2 group cursor-pointer w-full">
              <span className="text-aurum/40 mb-1">04 / linkedin</span>
              <Link href="https://linkedin.com/in/aimelhassan" target="_blank" rel="noopener noreferrer" className="text-lg tracking-[0.2em] group-hover:text-aurum transition-colors duration-500">
                /aimelhassan
              </Link>
              <div className="h-[1px] w-0 group-hover:w-full bg-aurum transition-all duration-700 mt-2"></div>
            </div>

          </div>
          
          <div className="mt-4 md:pr-8 flex justify-center md:justify-end">
            <p className="text-xl font-grotesk text-primary opacity-60 max-w-[280px] leading-relaxed">
              "The conversation begins in the silence."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
