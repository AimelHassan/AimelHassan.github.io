"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Basic text reveal after loading screen
    gsap.to(".hero-elem", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.2,
      delay: 3, // waits for loading screen
    });

    // Subtle moving gradient glow on 'Hassan' (Sweeping from Right to Left / N to H)
    gsap.fromTo(".hero-surname-gradient", 
      { backgroundPosition: "200% center" },
      {
        backgroundPosition: "-200% center",
        duration: 15,
        ease: "none",
        repeat: -1,
      }
    );

    // Parallax Effect: Pinned Master Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // User scrolls 1.5x the screen height to complete the eclipse
        scrub: true,   // 'true' explicitly removes the friction/lag for immediate 1:1 response
        pin: true,     // Locks vertical scrolling while the animation plays
        refreshPriority: 10, // Calculates pin spacer before downstream sections!
      }
    });
    
    // Aimel moves left, scales heavily towards the screen, fades out smoothly
    tl.fromTo(".name-first-parallax", 
      { xPercent: 0, scale: 1, opacity: 1 },
      {
        xPercent: -100, 
        scale: 3,       
        opacity: 0,
        ease: "power2.inOut",
      },
      0 // Start exactly at timeline beginning
    );

    // Hassan moves right, scales heavily towards the screen, fades out smoothly
    tl.fromTo(".name-last-parallax", 
      { xPercent: 0, scale: 1, opacity: 1 },
      {
        xPercent: 100,  
        scale: 3,       
        opacity: 0,
        ease: "power2.inOut",
      },
      0
    );

    // Gently drift and fade out the E-lines and coordinates downward
    tl.fromTo(".hero-fade-out-parallax", 
      { y: 0, opacity: 1 },
      {
        y: 80,
        opacity: 0,
        ease: "power2.inOut",
      },
      0
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Central Identity */}
      <div className="text-center space-y-4 relative z-10 flex flex-col items-center">
        <h1 className="font-garamond italic text-6xl sm:text-[5rem] md:text-[9rem] leading-none tracking-tighter text-white transition-all flex items-center justify-center gap-[2vw]">
          <span className="name-first-parallax inline-block origin-right">
            <span className="hero-elem inline-block opacity-0 translate-y-10">Aimel</span>
          </span>
          <span className="name-last-parallax inline-block origin-left">
            <span 
              className="hero-elem opacity-0 translate-y-10 hero-surname-gradient inline-block text-transparent bg-clip-text bg-gradient-to-r from-aurum/60 via-aurum to-aurum/60 bg-[length:200%_auto]"
              style={{ filter: "drop-shadow(0px 0px 8px rgba(247, 226, 149, 0.4))" }}
            >
              Hassan
            </span>
          </span>
        </h1>
        
        <div className="hero-fade-out-parallax w-full flex justify-center">
          <div className="hero-elem opacity-0 translate-y-10 flex items-center justify-center gap-2 sm:gap-6 w-full px-4">
            <div className="h-[1px] w-4 sm:w-12 bg-aurum/30"></div>
            <p className="font-grotesk text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.8em] text-quicksilver/50 text-center whitespace-nowrap">
              AI Founder / Islamabad / South Punjab
            </p>
            <div className="h-[1px] w-4 sm:w-12 bg-aurum/30"></div>
          </div>
        </div>

        {/* Mobile Coordinates (Hero Only) */}
        <div className="hero-fade-out-parallax w-full h-full absolute inset-0 pointer-events-none md:hidden">
          <div className="hero-elem absolute bottom-32 w-full flex justify-between px-12 opacity-40">
            <span className="font-grotesk text-[8px] tracking-[0.5em] uppercase text-quicksilver">
              lat.30.15
            </span>
            <span className="font-grotesk text-[8px] tracking-[0.5em] uppercase text-quicksilver">
              lon.71.52
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
