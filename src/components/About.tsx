import StorySection from "./StorySection";

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/5 bg-[#050912] pt-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-12 border-b border-white/5">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] text-primary uppercase tracking-[0.35em] block mb-3">
              Patient Zero // The Narrative
            </span>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
              My Origin Story
            </h2>
          </div>
          <p className="text-sm md:text-base font-light text-white/40 max-w-sm font-sans tracking-wide">
            A linear progression from operating complex diagnostic machinery in clinical corridors to developing autonomous AI interpreters.
          </p>
        </div>
      </div>
      <StorySection />
    </section>
  );
}
