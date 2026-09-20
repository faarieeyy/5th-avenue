"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function WorkWear() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero text animation
    gsap.fromTo(".reveal-text .split-char", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.04, ease: "power4.out", delay: 0.2 }
    );

    // Hero Parallax Scrub
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".workwear-hero",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    gsap.utils.toArray(".parallax-img").forEach((img: any) => {
      const speed = parseFloat(img.getAttribute("data-speed") || "1");
      heroTl.to(img, {
        y: () => -window.innerHeight * speed,
        ease: "none"
      }, 0);
    });

    // Product sections reveal
    const sections = gsap.utils.toArray(".product-section");
    
    sections.forEach((section: any) => {
      const titleChars = section.querySelectorAll(".product-title .split-char");
      const textElements = section.querySelectorAll(".product-reveal");
      const image = section.querySelector(".product-image");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });
      
      if (titleChars.length) {
        tl.to(titleChars, { y: "0%", opacity: 1, duration: 0.8, stagger: 0.015, ease: "power4.out" }, 0);
      }
      
      if (textElements.length) {
        tl.fromTo(textElements, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
          0.2
        );
      }

      if (image) {
        tl.fromTo(image,
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", scale: 1.1 },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, duration: 1.2, ease: "power3.inOut" },
          0
        );
      }
    });
  }, { scope: containerRef });

  const products = [
    { 
      title: "Men's Formal Shirts & Trousers", 
      desc: "Designed for the modern professional, our formal shirts and trousers are crafted from wrinkle-free blends that guarantee a sharp, corporate silhouette all day long.",
      quote: "Flawless structure for the corporate arena.",
      img: "/images/products/corporate_formal_trousers_1789840370513.webp" 
    },
    { 
      title: "Men's Corporate T-Shirts", 
      desc: "A smart-casual essential. We utilize breathable pique cotton that ensures comfort in any climate, while offering the perfect canvas for your company's logo embroidery.",
      quote: "Smart-casual wear that speaks your brand's language.",
      img: "/images/products/corporate_polo_tees_1789840388961.webp" 
    },
    { 
      title: "Women's Formal Shirts & Trousers", 
      desc: "Tailored to perfection, our women's formal line exudes authority and confidence. A staple for those who command the room in any business development or front desk role.",
      quote: "Command the room with impeccable tailoring.",
      img: "/images/products/new_winter_waistcoat.webp" 
    },
    { 
      title: "Women's Corporate Sarees", 
      desc: "Elegance meets professional corporate styling. Our uniform sarees are designed for ease of draping and all-day comfort, ideal for front desk, educational, and service teams.",
      quote: "Timeless elegance for the modern workplace.",
      img: "/images/products/hospital_tunics_pants_1789887565362.webp" 
    },
    { 
      title: "Women's Corporate T-Shirts", 
      desc: "Comfort and branding combined. Tailored specifically for a flattering feminine fit while maintaining a professional standard for IT and software company teams.",
      quote: "Comfort and branding combined effortlessly.",
      img: "/images/products/school_tshirt_1789884872133.webp" 
    },
  ];

  return (
    <main ref={containerRef} className="bg-fmrg-bg text-fmrg-text">
      
      {/* 1. DYNAMIC PARALLAX HERO */}
      <section className="workwear-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-fmrg-bg">
        
        {/* Floating Editorial Images */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img src="/images/products/corporate_formal_trousers_1789840370513.webp" className="parallax-img absolute top-[20%] left-[2%] md:left-[5%] w-48 md:w-80 aspect-[3/4] object-cover opacity-90 shadow-2xl" data-speed="1.2" />
          <img src="/images/products/new_winter_waistcoat.webp" className="parallax-img absolute top-[40%] right-[2%] md:right-[5%] w-56 md:w-96 aspect-[3/4] object-cover opacity-90 shadow-2xl" data-speed="0.8" />
          <img src="/images/products/corporate_polo_tees_1789840388961.webp" className="parallax-img absolute top-[75%] left-[15%] md:left-[25%] w-64 md:w-[30rem] aspect-[4/5] object-cover opacity-90 shadow-2xl" data-speed="1.5" />
        </div>

        {/* Massive Typography */}
        <div className="relative z-10 mix-blend-difference text-white text-center w-full px-4">
          <h1 className="reveal-text font-fmrg-serif flex flex-col items-center justify-center">
             <span className="text-[16vw] md:text-[14vw] leading-[0.85] tracking-tighter uppercase block overflow-hidden">
               <SplitText text="WORK WEAR" />
             </span>
             <span className="text-[5vw] md:text-[4vw] italic lowercase font-light block mt-4 tracking-wide overflow-hidden opacity-90">
               <SplitText text="dress to build." />
             </span>
          </h1>
        </div>
      </section>

      {/* TARGET AUDIENCE SECTION */}
      <section className="max-w-[100rem] mx-auto pt-32 pb-16 px-8 md:px-12 text-center">
        <p className="font-fmrg-sans text-sm tracking-widest uppercase mb-8 text-fmrg-accent font-bold">Who We Dress</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {["Corporate & IT Professionals", "Front Desk & Client-Facing Teams", "Business Development Teams", "Administrative & Support Staff", "IT & Software Companies", "Corporate Offices & MNCs", "Banks & Financial Institutions", "Educational Institutions", "Hospitals & Service Offices"].map((audience, i) => (
             <span key={i} className="px-6 py-3 border border-fmrg-accent/30 rounded-full font-fmrg-sans text-sm md:text-base bg-white/50 text-fmrg-text shadow-sm">
                {audience}
             </span>
          ))}
        </div>
      </section>

      {/* 2. PRODUCT LISTING */}
      <div className="max-w-[100rem] mx-auto pt-16 pb-32 px-8 md:px-12">
        <div className="flex flex-col gap-32 md:gap-48">
          {products.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={i} className={`product-section flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Text Content */}
                <div className="flex-1 w-full flex flex-col justify-center">
                  <h2 className="product-title font-fmrg-serif text-4xl md:text-6xl mb-8 leading-tight">
                    <SplitText text={p.title} />
                  </h2>
                  
                  <div className="product-reveal mb-8 pl-6 border-l-2 border-fmrg-text">
                    <p className="font-fmrg-serif text-2xl md:text-3xl text-gray-800 italic">
                      "{p.quote}"
                    </p>
                  </div>
                  
                  <p className="product-reveal font-fmrg-sans text-lg text-gray-600 leading-relaxed max-w-2xl">
                    {p.desc}
                  </p>
                </div>

                {/* Image Content */}
                <div className="w-full lg:w-2/5 aspect-[4/5] relative overflow-hidden bg-gray-200 shadow-2xl">
                  <img src={p.img} alt={p.title} className="product-image w-full h-full object-cover" />
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
