import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineEntries = [
  {
    year: "2018",
    role: "Senior Radiographer",
    company: "Hosmat Multispecialty Hospital",
    desc: "Spearheaded CT/MRI scanning protocols for Level-1 trauma cases, ensuring diagnostic precision in high-pressure environments."
  },
  {
    year: "2021",
    role: "Clinical Lead",
    company: "Imaging Optimization Unit",
    desc: "Led cross-functional teams to refine report turnaround time using digital transformation strategies."
  },
  {
    year: "2023",
    role: "AI Developer (Radiology)",
    company: "Viziorad Intelligence",
    desc: "Transitioned to full-stack AI development, building neural networks for chest X-ray and report parsing."
  },
  {
    year: "2024",
    role: "Founder & AI Architect",
    company: "VIZIORAD",
    desc: "Developing a suite of medical intelligence modules to transform radiology into a data-driven powerhouse."
  }
];

export default function Experience() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.to(horizontalRef.current, {
      x: () => {
        if (!horizontalRef.current) return 0;
        return -(horizontalRef.current.scrollWidth - window.innerWidth);
      },
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${horizontalRef.current ? horizontalRef.current.scrollWidth - window.innerWidth : 2000}`,
        scrub: 0.5,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden border-t border-white/5 bg-[#050912]">
      <div>
        <div ref={horizontalRef} className="h-screen w-[400vw] flex flex-row relative bg-[#050912]">
          {timelineEntries.map((entry, index) => (
            <div 
              key={index} 
              className="h-screen w-screen flex flex-col justify-center px-12 py-16 md:px-32 md:py-24 relative"
            >
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
              
              <div className="max-w-4xl space-y-10">
                <div className="flex items-center gap-10">
                  <span className="text-[10rem] md:text-[18rem] font-display font-black text-primary/5 leading-none absolute top-4 left-10 select-none pointer-events-none">{entry.year}</span>
                  <div className="w-12 h-[1px] bg-primary hidden md:block" />
                  <span className="font-mono text-primary text-xl tracking-[0.3em] uppercase">{entry.role}</span>
                </div>

                <h3 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none">
                  {entry.company}
                </h3>

                <p className="text-xl md:text-3xl text-white/50 leading-relaxed font-light font-heading max-w-2xl">
                  {entry.desc}
                </p>

                <div className="pt-10 flex gap-4">
                   <div className="w-3 h-3 rounded-full bg-primary" />
                   <div className="w-20 h-[1px] bg-primary/20 self-center" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
