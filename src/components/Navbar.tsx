"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of the screen
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50 p-12 justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-1">
          <span className="font-grotesk text-[10px] uppercase tracking-[0.5em] text-aurum/40">
            branding.core / v0.1
          </span>
          <div className="font-garamond italic text-2xl lowercase tracking-tighter text-quicksilver opacity-60">
            quiet ignition
          </div>
        </div>
        <nav className="flex gap-12 items-center">
          {["hero", "ventures", "archive", "connect"].map((section) => (
            <Link key={section} href={`#${section}`} className="group flex flex-col items-center gap-1">
              <span className={cn(
                "font-grotesk text-[10px] uppercase tracking-[0.4em] transition-colors duration-500",
                activeSection === section ? "text-aurum" : "text-quicksilver/60 group-hover:text-aurum"
              )}>
                {section === 'hero' ? 'manifesto' : section}
              </span>
              <div className={cn(
                "h-[1px] transition-all duration-700 bg-aurum",
                activeSection === section ? "w-full" : "w-0 group-hover:w-full"
              )}></div>
            </Link>
          ))}
          <a 
            href="/resume.pdf" 
            download="Aimel_Hassan_Resume.pdf"
            className="group flex flex-col items-center gap-1 ml-4"
          >
            <span className="font-grotesk text-[10px] uppercase tracking-[0.4em] text-obsidian bg-aurum px-5 py-2 hover:bg-white transition-colors duration-500">
              resume
            </span>
          </a>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 p-6 flex justify-end items-center pointer-events-auto">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="z-50 font-grotesk text-[10px] uppercase tracking-[0.4em] text-aurum/80 px-4 py-2 border border-aurum/20 bg-obsidian/50 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-700 pointer-events-auto",
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <nav className="flex flex-col items-center gap-12">
          {["hero", "ventures", "archive", "connect"].map((section) => (
            <Link 
              key={section} 
              href={`#${section}`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex flex-col items-center gap-2"
            >
              <span className={cn(
                "font-garamond italic text-5xl lowercase tracking-tighter transition-colors duration-500",
                activeSection === section ? "text-aurum" : "text-quicksilver group-hover:text-aurum"
              )}>
                {section === 'hero' ? 'manifesto' : section}
              </span>
              <div className={cn(
                "h-[1px] transition-all duration-700 bg-aurum",
                activeSection === section ? "w-full" : "w-0 group-hover:w-full"
              )}></div>
            </Link>
          ))}
          <a 
            href="/resume.pdf" 
            download="Aimel_Hassan_Resume.pdf"
            className="mt-8 font-garamond italic text-4xl lowercase tracking-tighter text-obsidian bg-aurum px-12 py-3 hover:bg-white transition-colors duration-500"
          >
            resume doc
          </a>
        </nav>
      </div>
    </>
  );
}
