import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setIsPointer(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsPointer(e.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    if (!isPointer) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" });
    const glowXTo = gsap.quickTo(glow, "x", { duration: 0.25, ease: "power2.out" });
    const glowYTo = gsap.quickTo(glow, "y", { duration: 0.25, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      glowXTo(e.clientX);
      glowYTo(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isPointer]);

  if (!isPointer) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full z-[10000] pointer-events-none mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={glowRef} 
        className="cursor-glow"
      />
    </>
  );
}
