"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === '/';
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      if (isHome) {
        // Hero pin ends around 12 * viewport height
        setShowLinks(window.scrollY > window.innerHeight * 11.5);
      } else {
        setShowLinks(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] px-8 md:px-12 py-8 flex items-center pointer-events-none mix-blend-difference text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${(isScrolled && showLinks) ? 'py-6' : ''}`}>
      
      <Link href="/" className="font-fmrg-serif text-3xl pointer-events-auto leading-none shrink-0 z-10">
        5.A
      </Link>
      
      <div 
        className={`hidden md:flex flex-1 items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? 'justify-end gap-12 lg:gap-16 pr-12' 
            : 'justify-center gap-24 lg:gap-40'     
        } ${showLinks ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <Link href="/" className="fmrg-nav-link hover:opacity-50 transition-opacity">Home</Link>
        <Link href="/school-uniforms" className="fmrg-nav-link hover:opacity-50 transition-opacity">School</Link>
        <Link href="/healthcare-uniforms" className="fmrg-nav-link hover:opacity-50 transition-opacity">Healthcare</Link>
        <Link href="/work-wear" className="fmrg-nav-link hover:opacity-50 transition-opacity">Work Wear</Link>
      </div>
      
      <div className={`hidden md:flex gap-8 items-center shrink-0 z-10 transition-opacity duration-700 ${showLinks ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Link href="/about" className="fmrg-nav-link hover:opacity-50 transition-opacity">About</Link>
        <Link href="/contact" className="fmrg-nav-link hover:opacity-50 transition-opacity text-fmrg-muted">Contact</Link>
      </div>
      
      {/* Mobile Hamburger */}
      <button className={`md:hidden flex flex-col gap-1.5 ml-auto transition-opacity duration-700 ${showLinks ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <span className="w-8 h-px bg-white"></span>
        <span className="w-8 h-px bg-white"></span>
      </button>
    </nav>
  );
}
