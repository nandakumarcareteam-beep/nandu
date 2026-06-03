import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const loadingTexts = [
    "Establishing uplink with [Nandakumar KT]...",
    "Activating [Viziorad Neural Core v2.4]...",
    "Calibrating [Chest X-Ray Pathology Classifier]...",
    "Iterating [Segmentation Masks] overlay projection...",
    "Optimizing [Clinical Report Parser & NLP Module]...",
    "Initializing interactive [PACS Web Viewer]...",
    "Secure Link Established."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 180);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const textTimer = setInterval(() => {
      setTextIndex(prev => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 320);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  // Escape key quick-skip listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  const renderTextWithHighlights = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const word = part.slice(1, -1);
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-primary font-mono font-bold bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded text-[11px] sm:text-xs shadow-[0_0_10px_rgba(var(--primary),0.15)] mx-1"
          >
            {word}
          </motion.span>
        );
      }
      return <span key={i} className="text-white/60">{part}</span>;
    });
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-[#050912] flex flex-col items-center justify-center p-6"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Dynamic Visual Scanning Grid representing chest pathology alignment */}
        <div className="relative mb-10 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-2xl border border-white/10 relative flex items-center justify-center overflow-hidden bg-white/[0.01]">
            {/* Diagnostic vertical scan line */}
            <motion.div 
              className="absolute left-0 right-0 h-[1.5px] bg-primary/60 shadow-[0_0_8px_rgba(var(--primary),0.8)] z-10"
              animate={{ 
                top: ["0%", "100%", "0%"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.2, 
                ease: "easeInOut" 
              }}
            />
            {/* Subtle dots simulating medical matrix scan */}
            <div className="grid grid-cols-4 gap-2 opacity-35">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    (i + Math.floor(progress / 10)) % 3 === 0 ? "bg-primary shadow-[0_0_6px_rgba(var(--primary),1)]" : "bg-white/20"
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="flex justify-between items-end mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">System Booting</span>
              <span className="font-mono text-primary text-xl font-bold">{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </motion.div>

          <div className="h-14 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p 
                key={textIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-xs sm:text-sm text-center leading-relaxed tracking-wide flex items-center justify-center flex-wrap"
              >
                {renderTextWithHighlights(loadingTexts[textIndex])}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5">
        {/* Vertical Grid lines */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-white" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white" />
      </div>

      {/* Subtle accessibility Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 0.85 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 font-mono text-[9px] uppercase tracking-[0.2em] text-white/55 hover:text-primary transition-all p-2 px-3 bg-white/[0.02] border border-white/5 rounded-lg pointer-events-auto cursor-pointer"
      >
        Skip Intro // ESC
      </motion.button>
    </motion.div>
  );
}
