"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArchiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    // Zero GSAP scrolling animation on mobile (use native CSS scroll instead)
    if (isMobile) return;

    const sections = gsap.utils.toArray(".archive-card");
    
    // Animate horizontal translation based on vertical scroll
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        // Calculate the exact amount to scrub based on total scrollable width
        end: () => "+=" + (scrollWrapperRef.current?.scrollWidth || window.innerWidth),
        invalidateOnRefresh: true,
        refreshPriority: 1,
      }
    });

    // Animate elements inside the horizontally scrolling cards
    sections.forEach((card: any, index: number) => {
      // Scale down the giant background number as it comes into view
      gsap.from(card.querySelector(".archive-num"), {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "left 75%",
          toggleActions: "play none none reverse",
        }
      });

      // Stagger reveal the text content
      gsap.from(card.querySelectorAll(".reveal-elem"), {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "left 75%",
          toggleActions: "play none none reverse",
        }
      });
    });
  }, { scope: sectionRef, dependencies: [isMobile] });

  // -------------------------------------------------------------
  // RENDER SELECTION
  // The structure is kept exactly identical to the original file
  // for desktop, guaranteeing the layout is 100% correct.
  // Mobile gets a native scrollable container with static positioning.
  // -------------------------------------------------------------

  if (isMobile) {
    return (
      <section ref={sectionRef} id="archive" className="relative py-24 w-full bg-obsidian z-10 flex flex-col">
        {/* Mobile Heading */}
        <div className="px-8 pb-12 pointer-events-none select-none z-30">
          <h1 className="font-garamond italic text-[6rem] text-quicksilver opacity-20 leading-none tracking-tighter">
            archive.
          </h1>
        </div>

        {/* Native Horizontal Scroll Wrapper for Mobile */}
        <div
          ref={scrollWrapperRef}
          className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar w-full"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Project 03 */}
          <article className="archive-card min-w-[85vw] snap-center flex items-center justify-center relative px-8 py-4">
            <div className="w-full flex flex-col items-start gap-6 relative">
              {/* STATIC positioned number on mobile so it never dislocates */}
              <div className="archive-num font-garamond italic text-[5rem] leading-none text-muted-aurum/10 select-none pointer-events-none -mb-4">
                03
              </div>
              <div className="space-y-4 relative z-10 reveal-elem">
                <h2 className="font-grotesk text-3xl font-bold text-aurum tracking-tight uppercase">Boostly Bot</h2>
                <p className="font-grotesk text-[15px] text-quicksilver/80 leading-relaxed max-w-2xl">
                  Engineered a RAG-based support chatbot using Python to dynamically retrieve context-specific answers from vectorized knowledge bases. Leveraged advanced embedding methodologies to secure a <strong className="text-aurum font-normal">B2B enterprise contract</strong>.
                </p>
              </div>
              <div className="flex flex-col gap-8 relative z-10 reveal-elem">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Python</span>
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">FAISS</span>
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">GenAI</span>
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">LLMs</span>
                </div>
                <Link href="https://huggingface.co/spaces/aimelxd/chatbotdemoboostly" target="_blank" rel="noopener noreferrer" className="bg-primary text-obsidian px-8 py-3 font-grotesk text-[10px] uppercase tracking-[0.3em] w-fit cursor-pointer text-center">
                  View Demo
                </Link>
              </div>
            </div>
          </article>

          {/* Project 04 */}
          <article className="archive-card min-w-[85vw] snap-center flex items-center justify-center relative px-8 py-4">
            <div className="w-full flex flex-col items-start gap-6 relative">
              <div className="archive-num font-garamond italic text-[5rem] leading-none text-muted-aurum/10 select-none pointer-events-none -mb-4">
                04
              </div>
              <div className="space-y-4 z-10 reveal-elem">
                <h2 className="font-grotesk text-3xl font-bold text-aurum tracking-tight uppercase">Surah RecommAI</h2>
                <p className="font-grotesk text-[15px] text-quicksilver/80 leading-relaxed max-w-2xl">
                  Fine-tuned all-mpnet-v2 embeddings on a custom dataset achieving <strong className="text-aurum font-normal">0.9+ Pearson correlation</strong>. Built a FAISS-powered semantic search integrated with Gemini-based RAG for context-aware recommendations, deployed globally via Flask.
                </p>
              </div>
              <div className="flex flex-col gap-8 z-10 reveal-elem">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">FAISS</span>
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Flask</span>
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">PyTorch</span>
                </div>
                <Link href="https://huggingface.co/spaces/aimelxd/surah-recommender-ai" target="_blank" rel="noopener noreferrer" className="bg-primary text-obsidian px-8 py-3 font-grotesk text-[10px] uppercase tracking-[0.3em] w-fit cursor-pointer text-center">
                  Access Kernel
                </Link>
              </div>
            </div>
          </article>

          {/* Project 05 */}
          <article className="archive-card min-w-[85vw] snap-center flex items-center justify-center relative px-8 py-4">
            <div className="w-full flex flex-col items-start gap-6 relative">
              <div className="archive-num font-garamond italic text-[5rem] leading-none text-muted-aurum/10 select-none pointer-events-none -mb-4">
                05
              </div>
              <div className="space-y-4 z-10 reveal-elem">
                <h2 className="font-grotesk text-3xl font-bold text-aurum tracking-tight uppercase">ParhaDe</h2>
                <p className="font-grotesk text-[15px] text-quicksilver/80 leading-relaxed max-w-2xl">
                  Developing a scalable full-stack peer-tutoring marketplace connecting junior students with senior academic mentors. Features a dynamic algorithmic matching system mapping course codes, time availability, and expertise levels.
                </p>
              </div>
              <div className="flex flex-col gap-8 z-10 reveal-elem">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">React</span>
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Node.js</span>
                  <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Python</span>
                </div>
                <button className="bg-primary text-obsidian px-8 py-3 font-grotesk text-[10px] uppercase tracking-[0.3em] w-fit cursor-pointer">
                  Inspect Logic
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  // DESKTOP RENDER: EXACTLY THE ORIGINAL MARKUP TO PREVENT CSS COLLISIONS
  return (
    <section ref={sectionRef} id="archive" className="relative h-screen w-full bg-obsidian z-10 flex flex-col overflow-hidden">
      {/* Fixed Archive Heading (Absolute relative to section) */}
      <div className="absolute top-[15%] left-6 md:left-auto md:right-24 pointer-events-none select-none z-30">
        <h1 className="font-garamond italic text-[8rem] sm:text-[10rem] md:text-[12rem] text-quicksilver opacity-20 leading-none tracking-tighter">
          archive.
        </h1>
      </div>

      {/* GSAP Horizontal Scroll Wrapper */}
      <div ref={scrollWrapperRef} className="flex-1 w-[300vw] flex h-full relative z-10 flex-nowrap">
        
        {/* Project 03: Boostly Bot */}
        <article className="archive-card w-screen h-full flex items-center justify-center relative px-6 md:px-24">
          <div className="max-w-4xl w-full flex flex-col items-start gap-8 md:gap-12 relative">
            <div className="archive-num absolute top-0 -translate-y-full md:-top-32 left-0 font-garamond italic text-[4rem] md:text-[12rem] text-muted-aurum/10 select-none pointer-events-none">
              03
            </div>
            
            <div className="space-y-4 md:space-y-6 relative z-10 reveal-elem">
              <h2 className="font-grotesk text-4xl md:text-6xl font-bold text-aurum tracking-tight uppercase">Boostly Bot</h2>
              <p className="font-grotesk text-base md:text-xl text-quicksilver/80 leading-relaxed max-w-2xl">
                Engineered a RAG-based support chatbot using Python to dynamically retrieve context-specific answers from vectorized knowledge bases. Leveraged advanced embedding methodologies to secure a <strong className="text-aurum font-normal">B2B enterprise contract</strong>.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 relative z-10 reveal-elem">
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Python</span>
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">FAISS</span>
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">GenAI</span>
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">LLMs</span>
              </div>
              <Link href="https://huggingface.co/spaces/aimelxd/chatbotdemoboostly" target="_blank" rel="noopener noreferrer" className="bg-primary text-obsidian px-10 py-4 font-grotesk text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 w-fit cursor-pointer text-center">
                View Demo
              </Link>
            </div>
            
            {/* Abstract Visual Indicator */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none">
              <div className="w-full h-full rounded-full border border-primary animate-spin" style={{ animationDuration: "20s", borderStyle: "dashed" }}></div>
              <div className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-aurum animate-spin" style={{ animationDuration: "15s", borderStyle: "dotted" }}></div>
            </div>
          </div>
        </article>

        {/* Project 04: Surah Recommender AI */}
        <article className="archive-card w-screen h-full flex items-center justify-center relative px-24">
          <div className="max-w-4xl w-full flex flex-col items-start gap-12 relative">
            <div className="archive-num absolute top-0 -translate-y-full md:-top-32 left-0 font-garamond italic text-[4rem] md:text-[12rem] text-muted-aurum/10 select-none pointer-events-none">
              04
            </div>
            
            <div className="space-y-4 md:space-y-6 z-10 reveal-elem">
              <h2 className="font-grotesk text-4xl md:text-6xl font-bold text-aurum tracking-tight uppercase">Surah Recommender AI</h2>
              <p className="font-grotesk text-base md:text-xl text-quicksilver/80 leading-relaxed max-w-2xl">
                Fine-tuned all-mpnet-v2 embeddings on a custom dataset achieving <strong className="text-aurum font-normal">0.9+ Pearson correlation</strong>. Built a FAISS-powered semantic search integrated with Gemini-based RAG for context-aware recommendations, deployed globally via Flask.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 z-10 reveal-elem">
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">FAISS</span>
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Flask</span>
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">PyTorch</span>
              </div>
              <Link href="https://huggingface.co/spaces/aimelxd/surah-recommender-ai" target="_blank" rel="noopener noreferrer" className="bg-primary text-obsidian px-10 py-4 font-grotesk text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 w-fit cursor-pointer text-center">
                Access Kernel
              </Link>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aurum/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          </div>
        </article>

        {/* Project 05: ParhaDe */}
        <article className="archive-card w-screen h-full flex items-center justify-center relative px-24">
          <div className="max-w-4xl w-full flex flex-col items-start gap-12 relative">
            <div className="archive-num absolute top-0 -translate-y-full md:-top-32 left-0 font-garamond italic text-[4rem] md:text-[12rem] text-muted-aurum/10 select-none pointer-events-none">
              05
            </div>
            
            <div className="space-y-4 md:space-y-6 z-10 reveal-elem">
              <h2 className="font-grotesk text-4xl md:text-6xl font-bold text-aurum tracking-tight uppercase">ParhaDe</h2>
              <p className="font-grotesk text-base md:text-xl text-quicksilver/80 leading-relaxed max-w-2xl">
                Developing a scalable full-stack peer-tutoring marketplace connecting junior students with senior academic mentors. Features a dynamic algorithmic matching system mapping course codes, time availability, and expertise levels.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 z-10 reveal-elem">
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">React</span>
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Node.js</span>
                <span className="px-4 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Python</span>
              </div>
              <button className="bg-primary text-obsidian px-10 py-4 font-grotesk text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 w-fit cursor-pointer">
                Inspect Logic
              </button>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
