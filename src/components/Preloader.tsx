"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // jump randomly
      if (progress > 100) progress = 100;
      
      if (percentRef.current) {
        percentRef.current.innerText = progress.toString();
      }

      if (progress === 100) {
        clearInterval(interval);
        
        // FMRG style slide-up exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoaded(true);
            document.body.style.overflow = '';
          }
        });

        tl.to(".preloader-text", { y: -50, opacity: 0, duration: 0.6, ease: "power3.in" })
          .to(containerRef.current, { yPercent: -100, duration: 1.2, ease: "power4.inOut" });
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99999] bg-[var(--color-fmrg-bg)] flex items-center justify-center pointer-events-none"
    >
      <div className="preloader-text overflow-hidden">
        <h1 className="font-fmrg-serif text-6xl md:text-9xl font-black text-[var(--color-fmrg-accent)] flex items-end">
          <span ref={percentRef}>0</span>
          <span className="text-4xl md:text-6xl mb-2 md:mb-4">%</span>
        </h1>
      </div>
    </div>
  );
}
