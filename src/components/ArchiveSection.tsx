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
    // Mobile: zero GSAP animation, pure native touch scroll
    if (isMobile) return;

    // Desktop: GSAP horizontal scroll with pin + scrub
    const sections = gsap.utils.toArray(".archive-card");

    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + (scrollWrapperRef.current?.scrollWidth || window.innerWidth),
        invalidateOnRefresh: true,
        refreshPriority: 1,
      }
    });

    sections.forEach((card: any) => {
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

  /* ──────────────────────────────────────────
     MOBILE: native swipeable horizontal scroll
     ────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section ref={sectionRef} id="archive" className="relative w-full bg-obsidian z-10 py-12">
        <div className="px-6 mb-6">
          <h1 className="font-garamond italic text-[5rem] text-quicksilver opacity-20 leading-none tracking-tighter">
            archive.
          </h1>
        </div>

        <div
          ref={scrollWrapperRef}
          className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Card 03 */}
          <article className="archive-card min-w-[85vw] snap-center px-6 py-8 flex items-center justify-center relative">
            <div className="w-full flex flex-col items-start gap-6">
              <div className="archive-num font-garamond italic text-[4rem] text-muted-aurum/10 select-none pointer-events-none leading-none">03</div>
              <div className="space-y-4 reveal-elem">
                <h2 className="font-grotesk text-2xl font-bold text-aurum tracking-tight uppercase">Boostly Bot</h2>
                <p className="font-grotesk text-base text-quicksilver/80 leading-relaxed">
                  Engineered a RAG-based support chatbot using Python to dynamically retrieve context-specific answers from vectorized knowledge bases. Leveraged advanced embedding methodologies to secure a <strong className="text-aurum font-normal">B2B enterprise contract</strong>.
                </p>
              </div>
              <div className="flex flex-col gap-6 reveal-elem">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Python</span>
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">FAISS</span>
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">GenAI</span>
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">LLMs</span>
                </div>
                <Link href="https://huggingface.co/spaces/aimelxd/chatbotdemoboostly" target="_blank" rel="noopener noreferrer" className="bg-primary text-obsidian px-8 py-3 font-grotesk text-[10px] uppercase tracking-[0.3em] w-fit cursor-pointer text-center">
                  View Demo
                </Link>
              </div>
            </div>
          </article>

          {/* Card 04 */}
          <article className="archive-card min-w-[85vw] snap-center px-6 py-8 flex items-center justify-center relative">
            <div className="w-full flex flex-col items-start gap-6">
              <div className="archive-num font-garamond italic text-[4rem] text-muted-aurum/10 select-none pointer-events-none leading-none">04</div>
              <div className="space-y-4 reveal-elem">
                <h2 className="font-grotesk text-2xl font-bold text-aurum tracking-tight uppercase">Surah Recommender AI</h2>
                <p className="font-grotesk text-base text-quicksilver/80 leading-relaxed">
                  Fine-tuned all-mpnet-v2 embeddings on a custom dataset achieving <strong className="text-aurum font-normal">0.9+ Pearson correlation</strong>. Built a FAISS-powered semantic search integrated with Gemini-based RAG for context-aware recommendations, deployed globally via Flask.
                </p>
              </div>
              <div className="flex flex-col gap-6 reveal-elem">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">FAISS</span>
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Flask</span>
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">PyTorch</span>
                </div>
                <Link href="https://huggingface.co/spaces/aimelxd/surah-recommender-ai" target="_blank" rel="noopener noreferrer" className="bg-primary text-obsidian px-8 py-3 font-grotesk text-[10px] uppercase tracking-[0.3em] w-fit cursor-pointer text-center">
                  Access Kernel
                </Link>
              </div>
            </div>
          </article>

          {/* Card 05 */}
          <article className="archive-card min-w-[85vw] snap-center px-6 py-8 flex items-center justify-center relative">
            <div className="w-full flex flex-col items-start gap-6">
              <div className="archive-num font-garamond italic text-[4rem] text-muted-aurum/10 select-none pointer-events-none leading-none">05</div>
              <div className="space-y-4 reveal-elem">
                <h2 className="font-grotesk text-2xl font-bold text-aurum tracking-tight uppercase">ParhaDe</h2>
                <p className="font-grotesk text-base text-quicksilver/80 leading-relaxed">
                  Developing a scalable full-stack peer-tutoring marketplace connecting junior students with senior academic mentors. Features a dynamic algorithmic matching system mapping course codes, time availability, and expertise levels.
                </p>
              </div>
              <div className="flex flex-col gap-6 reveal-elem">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">React</span>
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Node.js</span>
                  <span className="px-3 py-1 border border-quicksilver/20 font-grotesk text-[10px] uppercase tracking-widest text-quicksilver/60">Python</span>
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

  /* ──────────────────────────────────────────
     DESKTOP: original GSAP horizontal scroll
     Exactly matches the original markup
     ────────────────────────────────────────── */
  return (
    <section ref={sectionRef} id="archive" className="relative h-screen w-full bg-obsidian z-10 flex flex-col overflow-hidden">
      {/* Fixed Archive Heading */}
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
