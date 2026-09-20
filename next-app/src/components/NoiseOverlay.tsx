"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NoiseOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isHome = pathname === '/';
    
    const handleScroll = () => {
      if (isHome) {
        // Hide noise during the hero scroll animation (first 12 viewport heights)
        setVisible(window.scrollY > window.innerHeight * 11.5);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <div className={`noise-overlay transition-opacity duration-700 pointer-events-none z-[9999] ${visible ? 'opacity-40' : 'opacity-0'}`}></div>
  );
}
