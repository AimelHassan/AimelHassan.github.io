"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".arch-header-elem", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "header",
        start: "top 80%",
      }
    });

    // Content blocks staggered reveal
    gsap.from(".arch-content-elem", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".arch-content-container",
        start: "top 75%",
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="architecture" className="relative z-10 min-h-screen py-24 px-6 md:py-48 md:px-24 border-t border-aurum/10">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 md:left-1/4 -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 w-full max-w-[500px] h-[500px] bg-aurum/5 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        
        {/* Header */}
        <header className="mb-24 md:mb-32 w-full text-center md:text-left flex flex-col items-center md:items-start gap-6">
          <h1 className="arch-header-elem font-garamond italic text-white text-6xl sm:text-[5rem] md:text-[9rem] leading-none tracking-tighter">
            the architecture.
          </h1>
          <p className="arch-header-elem font-grotesk text-lg md:text-xl text-quicksilver/80 leading-relaxed max-w-2xl text-center md:text-left">
            At FAST, I am forging the computational bedrock where silent logic transforms into autonomous intelligence.
          </p>
        </header>

        {/* Content Container */}
        <div className="arch-content-container w-full grid grid-cols-1 md:grid-cols-12 gap-24">
          
          {/* Left Column: Education */}
          <div className="md:col-span-5 space-y-12">
            <h2 className="arch-content-elem font-grotesk uppercase text-[10px] tracking-[0.5em] text-aurum/50 pb-4 border-b border-quicksilver/20">
              Education
            </h2>
            
            <div className="arch-content-elem space-y-6">
              <div>
                <h3 className="font-garamond italic text-4xl text-quicksilver">FAST National University</h3>
                <p className="font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/50 mt-2">
                  ISLAMABAD, PK // AUG 2024 – AUG 2028
                </p>
              </div>
              <p className="font-grotesk text-lg text-quicksilver/70 leading-relaxed">
                Bachelor of Science in Computer Science. Maintaining a focus on emerging computational theories and algorithmic efficiency.
              </p>
              <div className="inline-block px-4 py-2 border border-aurum/30 bg-aurum/5">
                <p className="font-grotesk text-[10px] uppercase tracking-[0.2em] text-aurum">
                  GPA: 3.51/4.0 (DEAN'S LIST)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Stack */}
          <div className="md:col-span-7 space-y-12">
            <h2 className="arch-content-elem font-grotesk uppercase text-[10px] tracking-[0.5em] text-aurum/50 pb-4 border-b border-quicksilver/20">
              Technical Stack
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 arch-content-elem">
              {/* Stack Category */}
              <div className="space-y-6">
                <h3 className="font-garamond italic text-3xl text-quicksilver">Core Syntax</h3>
                <ul className="flex flex-col gap-3 font-grotesk text-sm uppercase tracking-widest text-quicksilver/60">
                  <li>— Python</li>
                  <li>— C++</li>
                  <li>— Java</li>
                  <li>— JavaScript</li>
                  <li>— SQL</li>
                </ul>
              </div>

              {/* Stack Category */}
              <div className="space-y-6">
                <h3 className="font-garamond italic text-3xl text-quicksilver">Intelligence Layer</h3>
                <ul className="flex flex-col gap-3 font-grotesk text-sm uppercase tracking-widest text-quicksilver/60">
                  <li>— PyTorch / Hugging Face</li>
                  <li>— FAISS / RAG</li>
                  <li>— LLM Integration</li>
                  <li>— LangChain</li>
                  <li>— Custom Agentic Workflows</li>
                </ul>
              </div>
            </div>

            {/* Operational Status */}
            <div className="arch-content-elem pt-8 border-t border-quicksilver/10">
              <div className="flex flex-col gap-2">
                <span className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-quicksilver/40">Systems & Deployment</span>
                <Link href="#" className="font-grotesk text-sm uppercase tracking-widest text-aurum group flex items-center gap-4 w-fit">
                  [OPERATIONAL_v1.0.4]
                  <div className="w-8 h-[1px] bg-aurum group-hover:w-16 transition-all duration-500"></div>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
