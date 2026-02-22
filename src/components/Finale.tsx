import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Finale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(waveRef.current, {
        scaleY: 100,
        scaleX: 10,
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut',
      }, 0)
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 1.5)
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, 2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#fdfcfb] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div 
          ref={waveRef}
          className="w-full h-[1px] bg-[var(--color-accent)] opacity-0 origin-bottom"
          style={{
            borderRadius: '50% 50% 0 0',
            background: 'linear-gradient(to top, rgba(139, 115, 85, 0.2), transparent)',
          }}
        />
      </div>

      <div ref={textRef} className="relative z-10 text-center max-w-3xl px-6 opacity-0 translate-y-10">
        <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight text-gray-900">
          A Drop Becomes a <span className="italic text-[var(--color-accent)]">Wave</span>
        </h2>
        <p className="text-xl md:text-2xl font-light text-gray-600 mb-12 leading-relaxed">
          When inner alignment meets shared action, we move together. An Ummah in motion, guided by Deen, seeking Barakah.
        </p>
      </div>

      <div ref={ctaRef} className="relative z-10 flex flex-col items-center gap-6 opacity-0 translate-y-10">
        <button className="px-10 py-4 rounded-full bg-[var(--color-accent)] text-white hover:bg-gray-900 transition-all duration-500 text-sm tracking-[0.2em] uppercase font-medium shadow-xl hover:shadow-2xl">
          Design Your Life
        </button>
        <p className="text-xs uppercase tracking-widest text-gray-400">Join the Newsletter</p>
      </div>
    </section>
  );
}
