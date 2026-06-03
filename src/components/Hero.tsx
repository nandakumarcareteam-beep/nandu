import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      isHighlighted?: boolean;
      pulseAngle?: number;
      pulseSpeed?: number;
      highlightColor?: string;
    }> = [];

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 90; // Slightly increased for a richer network mesh
    const connectionDistance = isMobile ? 90 : 135;

    for (let i = 0; i < particleCount; i++) {
      // Designate ~15% of nodes as special highlighted neural hubs
      const isHighlighted = Math.random() < 0.15;
      const radius = isHighlighted 
        ? Math.random() * 1.8 + 2.5 // Broader, visible size for highlights
        : Math.random() * 1.2 + 0.8;

      const colors = ["rgba(0, 245, 255, ", "rgba(16, 185, 129, ", "rgba(245, 158, 11, "];
      const selectedBaseColor = isHighlighted 
        ? colors[Math.floor(Math.random() * colors.length)] // cyan, emerald, amber
        : "rgba(0, 245, 255, ";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isHighlighted ? 0.18 : 0.28), // Highlighting nodes are slightly more stable
        vy: (Math.random() - 0.5) * (isHighlighted ? 0.18 : 0.28),
        radius,
        color: isHighlighted ? `${selectedBaseColor} 0.85)` : `${selectedBaseColor} ${Math.random() * 0.2 + 0.1})`,
        isHighlighted,
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        highlightColor: isHighlighted ? selectedBaseColor : undefined
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          p1.x += dxMouse * 0.012;
          p1.y += dyMouse * 0.012;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        // Implement flashing outer halos & pulse layers for highlighted neural nodes
        if (p1.isHighlighted && p1.highlightColor) {
          p1.pulseAngle = (p1.pulseAngle || 0) + (p1.pulseSpeed || 0.02);
          const baseSin = Math.sin(p1.pulseAngle);
          
          // Inner glowing halo
          const glowRadius = p1.radius * (1.6 + baseSin * 0.5);
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, glowRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${p1.highlightColor}${0.2 + baseSin * 0.1})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();

          // Outer faint sensory ripple
          const rippleRadius = glowRadius * (1.5 + baseSin * 0.3);
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${p1.highlightColor}${0.06 + baseSin * 0.04})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();

          // Core bright focal dot overlay
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const isAnyHighlighted = p1.isHighlighted || p2.isHighlighted;
            const baseAlpha = 1 - dist / connectionDistance;
            
            // Highlighted node lines glow brighter and draw user attention
            const alpha = isAnyHighlighted ? baseAlpha * 0.24 : baseAlpha * 0.11;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            if (isAnyHighlighted) {
              const strokeColorGroup = p1.isHighlighted ? p1.highlightColor : p2.highlightColor;
              ctx.strokeStyle = `${strokeColorGroup}${alpha})`;
              ctx.lineWidth = 0.95;
            } else {
              ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
              ctx.lineWidth = 0.55;
            }
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#050912] border-b border-white/5">
      
      {/* Dynamic low-opacity Neural Network Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
      />
      
      {/* Wibify-Style Thin Grid Layout lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Vertical Grid Axis Lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white/[0.03]" />
        
        {/* Horizontal Line Markers */}
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/[0.03]" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-white/[0.03]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 z-10 flex flex-col items-center justify-center"
      >
        {/* Brand visual headline with Wibify font style pairings */}
        <div className="max-w-4xl text-center mb-8">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-black tracking-tighter leading-[0.95] text-white uppercase"
          >
            I Don’t Just <span className="text-hollow italic font-light tracking-tight lowercase">work</span> in Radiology
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="my-6 flex items-center justify-center gap-3"
          >
            <div className="h-[1px] w-8 bg-white/10" />
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">Innovation Protocol</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-light tracking-wide text-white/50 uppercase"
          >
            I’m Building Its Future <span className="text-primary font-medium">with AI</span>
          </motion.h2>

          {/* Subtext description */}
          <motion.p 
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base font-sans font-light text-white/40 max-w-xl mx-auto mt-6 leading-relaxed tracking-wide"
          >
            From scanning bodies to decoding unstructured medical data — developing high-fidelity intelligent radiology systems where clinical rigor meets automated design.
          </motion.p>
        </div>

        {/* Action Button Links */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xs sm:max-w-md"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-14 px-8 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono bg-primary text-black hover:bg-primary/95 transition-all duration-300 group"
            onClick={() => {
              const lenis = (window as any).lenisInstance;
              if (lenis) {
                lenis.scrollTo('#story', { offset: -40, duration: 1.2 });
              } else {
                const story = document.getElementById('story');
                story?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Enter Experience
            <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto h-14 px-8 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono border-white/10 text-white/80 bg-[#050912]/80 hover:bg-white/5 transition-all duration-300 group flex gap-2 border-white/10"
            onClick={() => {
              const lenis = (window as any).lenisInstance;
              if (lenis) {
                lenis.scrollTo('#connect', { offset: -40, duration: 1.2 });
              } else {
                const connect = document.getElementById('connect');
                connect?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            Connect Now
          </Button>
        </motion.div>
      </motion.div>

      {/* Subtle Bottom fading grid overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050912] to-transparent pointer-events-none" />
    </section>
  );
}

