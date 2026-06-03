import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Stethoscope, FileText, Brain, Activity } from 'lucide-react';

const scenes = [
  {
    title: "Started as a Radiographer",
    desc: "3+ years immersed in the radiology room, witnessing the human side of medical data.",
    icon: <Stethoscope className="w-12 h-12" />,
    color: "from-blue-500/20 to-transparent"
  },
  {
    title: "Identified the Gap",
    desc: "I saw firsthand the friction in report turnaround and communication gaps in modern workflows.",
    icon: <FileText className="w-12 h-12" />,
    color: "from-purple-500/20 to-transparent"
  },
  {
    title: "Pivoted to Intelligence",
    desc: "Dived into deep learning and medical imaging AI to build systems that automate the mundane.",
    icon: <Brain className="w-12 h-12" />,
    color: "from-emerald-500/20 to-transparent"
  },
  {
    title: "Building the Future",
    desc: "Now developing VIZIORAD—a suite of AI modules that turn complex scans into simple, actionable insights.",
    icon: <Activity className="w-12 h-12" />,
    color: "from-primary/20 to-transparent"
  }
];

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 180,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {scenes.map((scene, index) => {
          const start = index / scenes.length;
          const end = (index + 1) / scenes.length;
          
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.94, 1, 1, 1.04]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(scrollYProgress, [start, end], [15, -15]);

          return (
            <motion.div 
              key={index}
              style={{ opacity, scale, y }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto"
            >
              <div className="mb-8 p-6 rounded-[24px] bg-white/[0.015] border border-white/10 relative overflow-hidden backdrop-blur-xl">
                <div className="relative z-10 text-primary">
                  {scene.icon}
                </div>
                <div className="absolute inset-0 bg-noise opacity-5" />
              </div>

              <span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4 block">
                PHASE 0{index + 1} // DEVELOPMENT
              </span>

              <h3 className="text-3xl md:text-6xl font-display font-black uppercase mb-6 tracking-tighter leading-none text-white">
                {scene.title}
              </h3>

              <p className="text-base md:text-2xl font-sans font-light text-white/50 leading-relaxed max-w-2xl">
                {scene.desc}
              </p>

              {/* Background Glow */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] opacity-20 -z-10`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
