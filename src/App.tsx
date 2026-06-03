/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <div className="mesh-gradient" />
      <div className="cyber-grid" />
      
      {/* Liquid Blobs (with optimized hardware-accelerated radial gradients avoiding blur filters) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: "10%", top: "15%", size: "500px", color: "rgba(0, 245, 255, 0.06)" },
          { left: "70%", top: "25%", size: "600px", color: "rgba(99, 102, 241, 0.05)" },
          { left: "20%", top: "60%", size: "700px", color: "rgba(0, 245, 255, 0.04)" },
          { left: "60%", top: "75%", size: "550px", color: "rgba(99, 102, 241, 0.05)" }
        ].map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full will-change-transform transform-gpu"
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.left,
              top: blob.top,
              background: `radial-gradient(circle, ${blob.color} 0%, rgba(0,0,0,0) 70%)`
            }}
            animate={{ 
              opacity: [0.8, 1.1, 0.8],
              scale: [1, 1.04, 1],
            }}
            transition={{ 
              duration: 15 + i * 5, 
              repeat: Infinity, 
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-8 pointer-events-none"
    >
      <div className="glass px-4 sm:px-10 py-3 sm:py-4 rounded-full flex items-center gap-4 sm:gap-10 pointer-events-auto max-w-[95%] sm:max-w-none">
        <a href="#" className="font-mono-ui !opacity-100 text-[10px] sm:text-[11px] hover:text-primary transition-colors uppercase tracking-widest whitespace-nowrap">Nandakumar KT</a>
        <div className="h-4 w-[1px] bg-white/10 shrink-0" />
        <div className="flex gap-4 sm:gap-8">
          {["Story", "Systems", "Connect"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-[10px] sm:text-[11px] font-mono-ui uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 28,
    restDelta: 0.001
  });

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      lerp: 0.08,
      infinite: false,
      syncTouch: true,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis RAF with GSAP Tick
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Dynamic global listener for custom smooth anchor routing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const dest = document.querySelector(href);
        if (dest) {
          lenis.scrollTo(dest as HTMLElement, {
            offset: -80,
            duration: 1.1,
            immediate: false,
          });
        }
      }
    };

    const anchors = document.querySelectorAll("a[href^='#']");
    anchors.forEach((a) => {
      a.addEventListener("click", handleAnchorClick as EventListener);
    });

    // Save instance window-wide for cross-component access
    (window as any).lenisInstance = lenis;

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      anchors.forEach((a) => {
        a.removeEventListener("click", handleAnchorClick as EventListener);
      });
      delete (window as any).lenisInstance;
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 font-sans">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="bg-noise" />
      <CustomCursor />
      <Background />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <div id="story">
              <About />
            </div>
            <div id="systems">
              <Projects />
              <Skills />
              <Experience />
            </div>
            <div id="connect">
              <Contact />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
