"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function SchoolUniforms() {
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
        trigger: ".school-hero",
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
      title: "School Frocks", 
      desc: "Elegantly tailored frocks designed for young girls, combining comfort with a smart, pristine look. Breathable fabric ensures all-day ease in the classroom.",
      quote: "Classic comfort for the modern classroom.",
      img: "/images/products/school_frock_1789884830546.jpg" 
    },
    { 
      title: "Pleated Skirts", 
      desc: "Our pleated skirts are woven to hold their shape wash after wash. Providing a neat, structured appearance while allowing full freedom of movement for active students.",
      quote: "Sharp pleats, resilient fabric.",
      img: "/images/products/school_skirt_1789884846197.jpg" 
    },
    { 
      title: "Boys Shorts", 
      desc: "Designed for the relentless energy of youth, our boys' shorts combine breathable cotton blends with reinforced stitching to withstand the daily rigors of the playground.",
      quote: "Built to endure daily adventures.",
      img: "/images/products/boys_school_uniform_1789839759243.jpg" 
    },
    { 
      title: "Girls Pinafores", 
      desc: "A perfect blend of classic elegance and everyday practicality. Our pinafores are tailored from premium, stain-resistant fabrics that retain their vibrant color.",
      quote: "Timeless style meets modern resilience.",
      img: "/images/products/girls_school_pinafore_1789839775913.jpg" 
    },
    { 
      title: "Classic Shirts", 
      desc: "Crisp, lightweight, and incredibly durable. Our classic school shirts are designed with anti-wrinkle technology so students look sharp from the morning bell to dismissal.",
      quote: "Pristine presentation, everyday.",
      img: "/images/products/boys_school_uniform_1789839759243.jpg" 
    },
    { 
      title: "Formal Pants", 
      desc: "Premium tailored school pants that offer a distinguished, formal silhouette without sacrificing comfort. Featuring an adjustable waist and robust fabric.",
      quote: "A distinguished silhouette for every student.",
      img: "/images/products/school_pant_1789884859416.jpg" 
    },
    { 
      title: "Sports T-Shirts", 
      desc: "Engineered for physical education, these sports t-shirts use advanced moisture-wicking technology to keep students cool, dry, and focused during athletic activities.",
      quote: "Breathable performance for active days.",
      img: "/images/products/school_tshirt_1789884872133.jpg" 
    },
    { 
      title: "Track Pants", 
      desc: "Performance wear redefined. Featuring high-elasticity waistbands and articulated knees for unrestricted movement during sports and physical education.",
      quote: "Unrestricted movement for the active student.",
      img: "/images/products/school_sports_trackpants_1789839789307.jpg" 
    },
    { 
      title: "Winter Waist Coats", 
      desc: "When the temperature drops, our winter waist coats provide the perfect layer of insulation. Expertly tailored to fit seamlessly over shirts without adding bulk.",
      quote: "Sophisticated warmth for cold mornings.",
      img: "/images/products/new_winter_waistcoat.jpg" 
    },
    { 
      title: "School Bags", 
      desc: "Ergonomically designed to distribute weight evenly, our school bags are built with ultra-durable, water-resistant materials to protect books and tech in all conditions.",
      quote: "Durable protection for everyday essentials.",
      img: "/images/products/school_bag_1789884884376.jpg" 
    }
  ];

  return (
    <main ref={containerRef} className="bg-fmrg-bg text-fmrg-text">
      
      {/* 1. DYNAMIC PARALLAX HERO */}
      <section className="school-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-fmrg-bg">
        
        {/* Floating Editorial Images */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img src="/images/products/school_frock_1789884830546.jpg" className="parallax-img absolute top-[20%] left-[2%] md:left-[5%] w-48 md:w-80 aspect-[3/4] object-cover opacity-90 shadow-2xl" data-speed="1.2" />
          <img src="/images/products/school_skirt_1789884846197.jpg" className="parallax-img absolute top-[40%] right-[2%] md:right-[5%] w-56 md:w-96 aspect-[3/4] object-cover opacity-90 shadow-2xl" data-speed="0.8" />
          <img src="/images/products/boys_school_uniform_1789839759243.jpg" className="parallax-img absolute top-[75%] left-[15%] md:left-[25%] w-64 md:w-[30rem] aspect-[4/5] object-cover opacity-90 shadow-2xl" data-speed="1.5" />
        </div>

        {/* Massive Typography */}
        <div className="relative z-10 mix-blend-difference text-white text-center w-full px-4">
          <h1 className="reveal-text font-fmrg-serif flex flex-col items-center justify-center">
             <span className="text-[18vw] leading-[0.85] tracking-tighter uppercase block overflow-hidden">
               <SplitText text="SCHOOL" />
             </span>
             <span className="text-[5vw] md:text-[4vw] italic lowercase font-light block mt-4 tracking-wide overflow-hidden opacity-90">
               <SplitText text="built for kids." />
             </span>
          </h1>
        </div>
      </section>

      {/* 2. PRODUCT LISTING */}
      <div className="max-w-[100rem] mx-auto pt-32 pb-32 px-8 md:px-12">
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
                  
                  <div className="product-reveal mb-8 pl-6 border-l-2 border-fmrg-accent">
                    <p className="font-fmrg-serif text-2xl md:text-3xl text-gray-800 italic">
                      "{p.quote}"
                    </p>
                  </div>
                  
                  <p className="product-reveal font-fmrg-sans text-lg text-gray-600 leading-relaxed max-w-2xl">
                    {p.desc}
                  </p>
                </div>

                {/* Image Content */}
                <div className="w-full lg:w-2/5 aspect-[4/5] relative overflow-hidden bg-gray-200">
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
