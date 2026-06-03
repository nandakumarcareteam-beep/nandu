export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 relative bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-display font-black text-2xl uppercase tracking-tighter">Viziorad</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">© 2026 intelligence systems // all rights reserved</span>
          </div>
          
          <div className="flex gap-12 font-mono-ui !opacity-100 uppercase tracking-widest text-[11px]">
            <a href="#" className="hover:text-primary transition-colors">Integrity</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">System Logs</a>
          </div>

          <div className="flex items-center gap-4 glass px-6 py-2 rounded-full border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-500/80">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
