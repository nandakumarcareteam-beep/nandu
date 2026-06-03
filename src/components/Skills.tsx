import { motion } from "motion/react";
import { Brain, Code, Microscope, ShieldCheck, Cpu, CheckCircle } from "lucide-react";

const skillCategories = [
  {
    id: "01",
    title: "Clinical Intelligence",
    tagline: "RADIOLOGY SYSTEMS",
    skills: ["DICOM Processing", "Radiology Workflows", "Anatomy Localization", "Clinical Logic"],
    icon: <Microscope className="w-5 h-5 text-primary" />,
  },
  {
    id: "02",
    title: "Neural Engine Nodes",
    tagline: "ARTIFICIAL SYSTEMS",
    skills: ["PyTorch Core", "NLP Pipelines", "Computer Vision", "LLM Precision Fine-tuning"],
    icon: <Brain className="w-5 h-5 text-primary" />,
  },
  {
    id: "03",
    title: "Elite Frontends",
    tagline: "HIGH-FIDELITY DESIGN",
    skills: ["React & Framer", "Three.js / GSAP", "UI Engineering", "UX for Radiologists"],
    icon: <Code className="w-5 h-5 text-primary" />,
  }
];

const lighthouseMetrics = [
  { value: "100", label: "Performance", desc: "Ultra-fast direct server rendering" },
  { value: "100", label: "Accessibility", desc: "Fully readable screenreader structure" },
  { value: "100", label: "Best Practices", desc: "Modern diagnostic secure protocol" },
  { value: "100", label: "HIPAA Guard", desc: "Patient data completely scrubbed" }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative border-t border-white/5 bg-[#050912]">
      <div className="container mx-auto px-6">
        
        {/* Title Block with Wibify minimalist layout */}
        <div className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-12 border-b border-white/5">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.35em] block mb-3">
              Capabilities // Neural Infrastructure
            </span>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
              Intelligence Nodes
            </h2>
          </div>
          <p className="text-sm md:text-base font-light text-white/40 max-w-sm font-sans tracking-wide">
            Engineered systems designed to process medical diagnostic data, serve low-latency models, and render elite web portals.
          </p>
        </div>

        {/* Wibify Discipline Grid System - Zero gap, separated by borders */}
        <div className="grid md:grid-cols-3 border border-white/10 rounded-[28px] overflow-hidden bg-black/10">
          {skillCategories.map((cat, i) => (
            <div 
              key={cat.title}
              className={`p-10 md:p-14 relative flex flex-col justify-between group transition-colors duration-300 hover:bg-white/[0.015] ${
                i !== skillCategories.length - 1 ? "border-b md:border-b-0 md:border-r border-white/10" : ""
              }`}
            >
              <div>
                {/* Discipline Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                      {cat.icon}
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 font-semibold">
                      {cat.tagline}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-white/20 font-black tracking-normal">
                    // L-{cat.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-display font-black uppercase mb-4 text-white group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                
                <p className="text-xs text-white/40 font-mono mb-8 font-light lowercase">
                  * authenticated system interface ready
                </p>

                {/* Skills sub-items */}
                <div className="flex flex-col gap-3">
                  {cat.skills.map(skill => (
                    <div 
                      key={skill}
                      className="flex items-center gap-3 text-sm text-white/60 transition-colors group-hover:text-white group-hover:translate-x-1 duration-300"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary transition-colors" />
                      <span className="font-sans font-light">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Accent Lines */}
              <div className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu className="w-20 h-20 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Wibify-Style Performance Audit Results Row */}
        <div className="mt-20 border border-white/10 rounded-[28px] overflow-hidden bg-black/15 p-8 lg:p-14">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Audi Left Text */}
            <div className="lg:col-span-4 max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                  Verified Audit Passed
                </span>
              </div>
              <h4 className="text-xl md:text-3xl font-display font-black uppercase text-white tracking-wider leading-tight">
                Perfect Scores.<br />All Compliant.
              </h4>
              <p className="text-xs text-white/40 font-sans font-light mt-3 leading-relaxed">
                Engineering builds tested against severe clinical performance standards. Every production interface matches optimal page indexing, light-speed Core Web Vitals, and medical safety rules.
              </p>
            </div>

            {/* Audit Right Circle Metrics */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {lighthouseMetrics.map((metric, idx) => (
                <div 
                  key={metric.label}
                  className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col items-center text-center group/card hover:border-emerald-500/20 hover:bg-white/[0.03] transition-all duration-300"
                >
                  {/* Gauge representation */}
                  <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-white/[0.03]"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                        className="text-emerald-400"
                        strokeWidth="2.5"
                        strokeDasharray="100, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-mono text-base font-bold text-emerald-400 group-hover/card:scale-105 transition-transform duration-300">
                      {metric.value}
                    </span>
                  </div>

                  <span className="text-xs uppercase font-mono tracking-wider text-white/80 font-bold mb-1">
                    {metric.label}
                  </span>
                  <span className="text-[10px] text-white/40 leading-snug font-sans font-light">
                    {metric.desc}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
