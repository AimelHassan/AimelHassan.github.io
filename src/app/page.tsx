import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalOverlays from "@/components/GlobalOverlays";
import LoadingScreen from "@/components/LoadingScreen";

import HeroSection from "@/components/HeroSection";
import VenturesSection from "@/components/VenturesSection";
import ArchiveSection from "@/components/ArchiveSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ConnectSection from "@/components/ConnectSection";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <div className="relative w-full h-full text-quicksilver bg-obsidian">
      {/* Intro Sequence */}
      <LoadingScreen />

      {/* Global UI Overlays */}
      {/* Global UI Overlays managed by GSAP */}
      <div className="fixed inset-0 z-0 vignette pointer-events-none"></div>
      <GlobalOverlays />
      <Navbar />
      <Footer />

      {/* Main Container Controlled by Lenis/GSAP */}
      <SmoothScroll>
        <main className="relative z-10 w-full min-h-screen text-quicksilver">
          <HeroSection />
        <VenturesSection />
        {/* ArchiveSection has its own horizontal scroll for its content, but the section itself takes 100vh vertically */}
          <ArchiveSection />
          <ArchitectureSection />
          <ConnectSection />
        </main>
      </SmoothScroll>
    </div>
  );
}
