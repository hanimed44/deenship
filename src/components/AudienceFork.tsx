import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function AudienceFork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const leftPathRef = useRef<HTMLDivElement>(null);
  const rightPathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(questionRef.current, {
        y: '-30vh',
        scale: 0.8,
        opacity: 0.5,
        duration: 1,
      }, 0)
      .fromTo(leftPathRef.current, 
        { x: '10vw', opacity: 0 },
        { x: '0', opacity: 1, duration: 1 },
        0.5
      )
      .fromTo(rightPathRef.current,
        { x: '-10vw', opacity: 0 },
        { x: '0', opacity: 1, duration: 1 },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#fdfcfb] flex flex-col items-center justify-center overflow-hidden">
      <h2 ref={questionRef} className="absolute top-1/2 -translate-y-1/2 text-4xl md:text-6xl font-serif text-center max-w-2xl px-6 leading-tight z-10">
        What kind of life are you designing?
      </h2>

      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center pointer-events-none z-20 gap-8 md:gap-24 px-6 pt-32 md:pt-0">
        <div ref={leftPathRef} className="pointer-events-auto flex flex-col items-center text-center max-w-sm p-8 group opacity-0">
          <span className="text-[var(--color-accent)] font-serif text-3xl mb-4 transition-colors duration-500">Learners</span>
          <p className="text-gray-500 font-light mb-8 transition-opacity duration-500 group-hover:text-gray-900">
            For those seeking to align their daily choices with their deepest values.
          </p>
          <button className="px-8 py-3 rounded-full border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 text-sm tracking-widest uppercase">
            Join a Programme
          </button>
        </div>

        <div className="w-[1px] h-32 bg-gray-200 hidden md:block" />

        <div ref={rightPathRef} className="pointer-events-auto flex flex-col items-center text-center max-w-sm p-8 group opacity-0">
          <span className="text-gray-900 font-serif text-3xl mb-4 transition-colors duration-500 group-hover:text-[var(--color-accent)]">Educators</span>
          <p className="text-gray-500 font-light mb-8 transition-opacity duration-500 group-hover:text-gray-900">
            For practitioners guiding others to lead a life rooted in Deen.
          </p>
          <button className="px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-[var(--color-accent)] transition-all duration-300 text-sm tracking-widest uppercase">
            Collaborate
          </button>
        </div>
      </div>
    </section>
  );
}
