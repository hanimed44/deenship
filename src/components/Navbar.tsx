import { useEffect, useState } from 'react';
import { cn } from '../utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between",
      scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100" : "bg-transparent"
    )}>
      <div className="font-serif text-2xl tracking-wide text-[var(--color-ink)]">
        Deenship
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-gray-600">
        <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Programmes</a>
        <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Philosophy</a>
        <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Journal</a>
      </div>

      <button className="px-6 py-2 rounded-full bg-[var(--color-ink)] text-white text-xs uppercase tracking-widest hover:bg-[var(--color-accent)] transition-colors">
        Join
      </button>
    </nav>
  );
}
