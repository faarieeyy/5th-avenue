"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useCursor } from './CursorContext';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { cursorType } = useCursor();
  const [isPointerFine, setIsPointerFine] = useState(true);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsPointerFine(false);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Smooth trailing effect via GSAP quickTo
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xTo(mouseX);
      yTo(mouseY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    if (cursorType === 'default') {
      gsap.to(cursorRef.current, { width: 12, height: 12, duration: 0.3, ease: "power2.out", backgroundColor: "black" });
      gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
    } else {
      gsap.to(cursorRef.current, { width: 80, height: 80, duration: 0.4, ease: "power2.out", backgroundColor: "rgba(0,0,0,0.8)" });
      gsap.to(textRef.current, { opacity: 1, duration: 0.2, delay: 0.1 });
    }
  }, [cursorType]);

  if (!isPointerFine) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ willChange: 'transform' }}
    >
      <span ref={textRef} className="text-white text-[10px] font-bold uppercase tracking-widest opacity-0 select-none">
        {cursorType !== 'default' ? cursorType : ''}
      </span>
    </div>
  );
}
