"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VenturesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate section header
    gsap.from(".ventures-header-elem", {
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

    // Animate projects dynamically
    const projects = gsap.utils.toArray(".project-block");
    projects.forEach((project: any) => {
      // Text reveals
      gsap.from(project.querySelectorAll(".reveal-elem"), {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: project,
          start: "top 75%",
        }
      });

      // Image parallax/zoom effect
      gsap.fromTo(project.querySelector("img"),
        { scale: 1.15, transformOrigin: "center center" },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="ventures" className="relative z-10 min-h-screen pt-24 pb-32 px-6 md:pt-48 md:pb-64 md:px-24">
      {/* Section Title */}
      <header className="mb-24 md:mb-48 max-w-4xl">
        <h2 className="ventures-header-elem font-garamond italic text-white text-6xl sm:text-[5rem] md:text-[10rem] leading-none tracking-tighter">
          ventures.
        </h2>
        <p className="ventures-header-elem font-grotesk text-aurum/50 text-[10px] mt-6 tracking-[0.6em] uppercase">
          architecting the future of intelligence
        </p>
      </header>

      {/* Project 01: Valith */}
      <div className="project-block mb-40 md:mb-80 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        <div className="order-2 md:order-1 md:col-span-5 space-y-12">
          <div className="space-y-4 reveal-elem">
            <span className="font-grotesk text-[10px] tracking-[0.4em] text-quicksilver/30 uppercase">
              01 / founder & lead dev
            </span>
            <div className="flex flex-col">
              <span className="font-garamond italic text-6xl md:text-9xl text-quicksilver/20 leading-none -mb-6 md:-mb-8 -ml-2 md:-ml-4 pointer-events-none select-none">
                01
              </span>
              <h2 className="font-grotesk font-bold text-5xl md:text-7xl text-aurum tracking-tighter uppercase leading-none z-10 whitespace-nowrap">
                HERMES AI
              </h2>
              <div className="font-grotesk text-xs tracking-[0.6em] text-white/50 uppercase mt-2 z-10 pl-1">
                VALITH
              </div>
            </div>
          </div>
          
          <p className="reveal-elem font-grotesk text-lg md:text-xl text-quicksilver/80 leading-relaxed max-w-md">
            Architected a custom multi-agent orchestration pipeline in pure Python to autonomously research prospects, personalize B2B messaging, and manage follow-up sequences. Secured competitive placement in <strong className="text-aurum font-normal">NIC Cohort 4</strong> with <strong className="text-aurum font-normal">155+ pre-launch waitlist users</strong>.
          </p>
          
          <div className="reveal-elem pt-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-1 h-1 bg-aurum"></span>
              <span className="font-grotesk uppercase text-[10px] tracking-[0.3em] text-quicksilver/60">
                pure python & gen_ai
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-1 h-1 bg-aurum/30"></span>
              <span className="font-grotesk uppercase text-[10px] tracking-[0.3em] text-quicksilver/40">
                multi-agent orchestration
              </span>
            </div>
          </div>
          
          <div className="reveal-elem pt-8">
            <Link href="https://hermesai.tech/" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-obsidian px-8 py-3 font-grotesk text-[10px] uppercase tracking-widest hover:bg-white transition-colors duration-500 cursor-pointer">
              view platform
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-7 reveal-elem">
          <div className="aspect-[16/9] w-full bg-surface-container-lowest relative overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5uoMBPT3-DcF-1K-fFXKfg7b3Dsyjk2G4jRk6OYFzojPVmdw1qjqwoLVA1xI-uHkvukTfE7JEZxUKkWYifpiXcI9s3RlSVQm3xa6YgEaLcAp24Hz76wQLVLcv8i6rfMVLM8dUlJ4BxtNn4b0imZgP0HN_ElcxbM_WLbR5AmxosXD683n6fmgNyqhV7XPcBSGBrk1YLxleZ2tYYvUjIccwF_ydgaXLwv3IXAkey4fhx3n4v0d34YV_Ud70yB2_htLJHYQ-Ew2fsag"
              alt="Valith"
              fill
              className="object-cover grayscale opacity-30 hover:opacity-50 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Project 02: Eon */}
      <div className="project-block mb-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="order-1 md:col-span-6 reveal-elem">
          <div className="aspect-square md:aspect-[4/5] w-full bg-surface-container-lowest relative overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRz0C7ntwx4igReItuHjKfVmUc6kKBwGRBeIRShEzb1qKwrhgOt_hT9vQ2sJSsgLBaBejdmanlhVtDSfbPCdKgxQUY7h29R0Dqogg04XD7HDIZTAWYC1XsJ2dzeVWW_6FBisfUh4tdiJUP8WvhXXD4YcX-zmq907jr66ecADtdYs_R39dqOa3isEZ1mnvxee23yXneSFb0Xdjr7tDZIeXNXYGeyHFsJgzy2mkb2M3lV4vDEqn1ixxGFXL-r7GQFxYcmDs_41BhE6Q"
              alt="Eon"
              fill
              className="object-cover grayscale opacity-20 hover:opacity-40 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-transparent opacity-70"></div>
          </div>
        </div>
        
        <div className="order-2 md:col-span-5 md:ml-auto space-y-12">
          <div className="space-y-4 reveal-elem">
            <span className="font-grotesk text-[10px] tracking-[0.4em] text-quicksilver/30 uppercase">
              02 / ai solutions consultant
            </span>
            <div className="flex flex-col">
              <span className="font-garamond italic text-7xl md:text-9xl text-quicksilver/20 leading-none -mb-8 -ml-4 pointer-events-none select-none">
                02
              </span>
              <h2 className="font-grotesk font-bold text-5xl md:text-7xl text-aurum tracking-tighter uppercase leading-none z-10 w-full whitespace-nowrap">
                PROJECT EON
              </h2>
              <div className="font-grotesk text-xs tracking-[0.6em] text-white/50 uppercase mt-2 z-10 pl-1">
                INDEPENDENT CONTRACTOR
              </div>
            </div>
          </div>
          
          <p className="reveal-elem font-grotesk text-xl text-quicksilver/80 leading-relaxed max-w-md">
            Engineered and deployed a custom Python Email AI agent integrated with internal APIs for real-time tracking data, effectively <strong className="text-aurum font-normal">eliminating LLM hallucinations</strong> in production. Deployed context-aware models that processed <strong className="text-aurum font-normal">500+ complaint tickets</strong> in week one, explicitly maximizing ticket visibility and accelerating Turnaround Time (TAT).
          </p>
          
          <div className="reveal-elem pt-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-1 h-1 bg-aurum"></span>
              <span className="font-grotesk uppercase text-[10px] tracking-[0.3em] text-quicksilver/60">
                rag pipeline & llms
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-1 h-1 bg-aurum/30"></span>
              <span className="font-grotesk uppercase text-[10px] tracking-[0.3em] text-quicksilver/40">
                api automation
              </span>
            </div>
          </div>
          
          <div className="reveal-elem pt-8">
            <Link 
              href="https://valith.tech/eon" target="_blank" rel="noopener noreferrer"
              className="font-grotesk text-[10px] uppercase tracking-[0.4em] text-aurum border-b border-aurum/30 hover:border-aurum transition-all pb-1"
            >
              Explore Eon
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
