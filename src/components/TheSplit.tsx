import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function TheSplit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const centerLineRef = useRef<HTMLDivElement>(null);
  const integratedTextRef = useRef<HTMLDivElement>(null);

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

      // Drift apart
      tl.to(leftColRef.current, { x: '-10vw', duration: 1 }, 0)
        .to(rightColRef.current, { x: '10vw', duration: 1 }, 0)
        .to(centerLineRef.current, { scaleY: 1, duration: 1 }, 0);

      // Snap together
      tl.to(leftColRef.current, { x: '25vw', opacity: 0, duration: 1 }, 1)
        .to(rightColRef.current, { x: '-25vw', opacity: 0, duration: 1 }, 1)
        .to(centerLineRef.current, { scaleY: 0.2, y: '20vh', duration: 1 }, 1);

      // Integrated life appears
      tl.fromTo(integratedTextRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        1.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#fdfcfb]">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div ref={centerLineRef} className="w-[1px] h-full bg-[var(--color-accent)] opacity-30 scale-y-0 origin-top" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-2 gap-4 md:gap-12 relative z-10">
        <div ref={leftColRef} className="flex flex-col items-end text-right pr-4 md:pr-12 border-r border-transparent">
          <h2 className="text-2xl md:text-4xl font-serif mb-4 md:mb-8 text-[var(--color-accent)]">Deen</h2>
          <p className="text-[10px] md:text-sm uppercase tracking-widest text-gray-500 mb-4 md:mb-6">Who you are</p>
          <ul className="space-y-2 md:space-y-4 text-sm md:text-xl font-light">
            <li>Intention (Niyyah)</li>
            <li>Sincerity</li>
            <li>Values</li>
            <li>Akhlaq</li>
            <li>Conscience</li>
          </ul>
        </div>

        <div ref={rightColRef} className="flex flex-col items-start text-left pl-4 md:pl-12 border-l border-transparent">
          <h2 className="text-2xl md:text-4xl font-serif mb-4 md:mb-8 text-[var(--color-ink)]">Dunya</h2>
          <p className="text-[10px] md:text-sm uppercase tracking-widest text-gray-500 mb-4 md:mb-6">What you do</p>
          <ul className="space-y-2 md:space-y-4 text-sm md:text-xl font-light">
            <li>Work</li>
            <li>Relationships</li>
            <li>Leadership</li>
            <li>Decisions</li>
            <li>Service</li>
          </ul>
        </div>
      </div>

      <div ref={integratedTextRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 px-6">
        <h3 className="text-4xl md:text-7xl font-serif text-center leading-tight">
          An <span className="italic text-[var(--color-accent)]">Integrated</span> Life
        </h3>
        <p className="mt-4 md:mt-6 text-base md:text-lg font-light max-w-md text-center text-gray-600">
          Where inner alignment drives the outer path.
        </p>
      </div>
    </section>
  );
}
