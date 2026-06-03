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
      
      {/* Liquid Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: "10%", top: "15%", size: "500px" },
          { left: "70%", top: "25%", size: "600px" },
          { left: "20%", top: "60%", size: "700px" },
          { left: "60%", top: "75%", size: "550px" }
        ].map((blob, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500/5 rounded-full blur-[130px]"
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.left,
              top: blob.top,
            }}
            animate={{ 
              opacity: [0.04, 0.09, 0.04],
              scale: [1, 1.05, 1],
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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-8 pointer-events-none"
    >
      <div className="glass px-10 py-4 rounded-full flex items-center gap-10 pointer-events-auto">
        <a href="#" className="font-mono-ui !opacity-100 text-[11px] hover:text-primary transition-colors uppercase tracking-widest">Nandakumar KT</a>
        <div className="h-4 w-[1px] bg-white/10" />
        <div className="flex gap-8">
          {["Story", "Systems", "Connect"].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-[11px] font-mono-ui uppercase tracking-[0.2em] hover:text-primary transition-colors"
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
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.8,
      infinite: false,
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
            duration: 1.5,
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
