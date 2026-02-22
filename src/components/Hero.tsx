import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const deenTextRef = useRef<HTMLHeadingElement>(null);
  const dunyaTextRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breathing animation for the drop
      gsap.to(dropRef.current, {
        scale: 1.05,
        boxShadow: '0 0 20px rgba(139, 115, 85, 0.4)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(deenTextRef.current, {
        x: '-20vw',
        y: '-20vh',
        scale: 0.8,
        opacity: 0.5,
        ease: 'power2.inOut',
      }, 0)
      .to(dunyaTextRef.current, {
        x: '20vw',
        y: '20vh',
        scale: 0.8,
        opacity: 0.5,
        ease: 'power2.inOut',
      }, 0)
      .to(dropRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
      }, 0)
      .to(lineRef.current, {
        height: '100vh',
        opacity: 1,
        ease: 'power2.inOut',
      }, 0.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fdfcfb] to-[#f5f0eb]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(139, 115, 85, 0.05) 0%, transparent 70%)' }} />
      
      <div className="z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight flex flex-col items-center gap-4">
          <span ref={deenTextRef} className="block">Deen</span>
          <span className="text-2xl md:text-3xl font-sans text-gray-400 italic font-light">&amp;</span>
          <span ref={dunyaTextRef} className="block">Dunya</span>
        </h1>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
        <div 
          ref={dropRef}
          className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-lg"
          style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
        >
          <div className="w-2 h-2 bg-white rounded-full opacity-50 absolute top-1.5 right-2" />
        </div>
        <div 
          ref={lineRef}
          className="w-[1px] h-0 bg-[var(--color-accent)] opacity-0 absolute top-4"
        />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-current" />
      </div>
    </section>
  );
}
