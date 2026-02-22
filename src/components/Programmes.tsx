import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROGRAMMES = [
  {
    id: 1,
    title: "Leadership",
    inner: "Cultivating sincerity and accountability to Allah.",
    outer: "Leading teams with empathy and justice."
  },
  {
    id: 2,
    title: "Work & Wealth",
    inner: "Purifying intention (Niyyah) in earning.",
    outer: "Building ethical businesses and careers."
  },
  {
    id: 3,
    title: "Relationships",
    inner: "Grounding love in shared values (Akhlaq).",
    outer: "Navigating family and community dynamics."
  }
];

export function Programmes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${PROGRAMMES.length * 100}%`,
          scrub: 1,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // Initial state
        gsap.set(card, { 
          opacity: i === 0 ? 1 : 0, 
          y: i === 0 ? 0 : 100,
          scale: i === 0 ? 1 : 0.9,
          zIndex: PROGRAMMES.length - i
        });

        if (i > 0) {
          tl.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out'
          }, i - 0.5);
        }

        if (i < PROGRAMMES.length - 1) {
          tl.to(card, {
            opacity: 0,
            y: -50,
            scale: 0.95,
            duration: 1,
            ease: 'power2.in'
          }, i + 0.5);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#1a1a1a] text-white overflow-hidden flex items-center justify-center">
      <div className="absolute top-12 left-0 w-full text-center z-20">
        <h2 className="text-sm uppercase tracking-[0.2em] text-gray-400 font-medium">Programmes</h2>
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-[60vh] flex items-center justify-center perspective-[1000px]">
        {PROGRAMMES.map((prog, i) => (
          <div 
            key={prog.id}
            ref={el => cardsRef.current[i] = el}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-8"
          >
            <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
              <span className="text-[var(--color-accent)] text-xs uppercase tracking-widest font-semibold mb-4 block">Inner Alignment</span>
              <h3 className="text-3xl font-serif mb-4">{prog.title}</h3>
              <p className="text-gray-300 font-light leading-relaxed">{prog.inner}</p>
            </div>
            
            <div className="hidden md:flex items-center justify-center text-gray-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>

            <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
              <span className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-4 block">Outer Path</span>
              <h3 className="text-3xl font-serif mb-4 opacity-0 select-none">{prog.title}</h3>
              <p className="text-gray-300 font-light leading-relaxed">{prog.outer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
