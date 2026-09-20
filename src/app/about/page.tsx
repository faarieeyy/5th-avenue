"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  
  useGSAP(() => {
    // Initial Reveal
    gsap.to(".about-reveal .split-char", {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out"
    });

    // Dark Section Scroll Reveal (The "VR Area" effect)
    gsap.fromTo(".dark-scroll-section", 
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", ease: "none", 
        scrollTrigger: {
          trigger: ".dark-scroll-wrapper",
          start: "top center",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
    
    gsap.fromTo(".dark-text", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, ease: "power2.out",
        scrollTrigger: {
          trigger: ".dark-scroll-wrapper",
          start: "top 30%",
        }
      }
    );
  });

  return (
    <main className="bg-[var(--color-fmrg-bg)] text-[var(--color-fmrg-text)] overflow-hidden">
      
      <section className="min-h-screen pt-48 px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto">
        <span className="fmrg-nav-link text-gray-400 mb-8 block">Who We Are</span>
        <h1 className="about-reveal font-fmrg-serif text-6xl md:text-[8rem] leading-[0.9] tracking-tight mb-16 max-w-5xl">
          <SplitText text="Discipline." className="block" />
          <SplitText text="Woven in." className="block text-[var(--color-fmrg-accent)]" />
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <p className="font-fmrg-sans text-2xl leading-relaxed text-gray-700">
            5th Avenue started with a singular vision: to elevate the standard of professional and institutional apparel. 
          </p>
          <p className="font-fmrg-sans text-lg text-gray-500 leading-relaxed">
            We are not just tailors; we are a massive manufacturing infrastructure capable of outfitting entire hospitals, corporate towers, and school districts without sacrificing an inch of quality or comfort.
          </p>
        </div>
      </section>

      {/* The Dark Scrolling Section requested for the "We Are" / "VR" Area */}
      <div className="dark-scroll-wrapper relative min-h-[150vh] w-full">
        {/* Sticky dark background that reveals via clip-path scrub */}
        <section className="dark-scroll-section sticky top-0 h-screen w-full bg-fmrg-text text-fmrg-bg flex items-center justify-center px-8 md:px-12">
           <div className="max-w-[100rem] w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              
              <div className="w-full h-[60vh] overflow-hidden bg-black border border-gray-800">
                 <img src="/images/media_1789212503069.webp" alt="Manufacturing" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
              </div>

              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="dark-text font-fmrg-serif text-5xl md:text-7xl mb-6">Our Legacy.</h3>
                  <p className="dark-text font-fmrg-sans text-xl text-gray-400 max-w-lg">
                    Decades of precise craftsmanship. We map your brand colors exactly. We source fabrics that breathe in the summer and insulate in the winter.
                  </p>
                </div>
                <div className="dark-text border-t border-gray-800 pt-8 grid grid-cols-2 gap-8">
                  <div>
                    <span className="font-fmrg-serif text-4xl text-[var(--color-fmrg-accent)] block mb-2">500k+</span>
                    <span className="fmrg-nav-link text-gray-500">Uniforms Delivered</span>
                  </div>
                  <div>
                    <span className="font-fmrg-serif text-4xl text-[var(--color-fmrg-accent)] block mb-2">100%</span>
                    <span className="fmrg-nav-link text-gray-500">Custom Fit</span>
                  </div>
                </div>
              </div>

           </div>
        </section>
      </div>

    </main>
  );
}
