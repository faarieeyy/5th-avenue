"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function HealthcareUniforms() {
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
        trigger: ".healthcare-hero",
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

    // Make sure the first image is visible on load
    gsap.set(".product-image-0", { opacity: 1, scale: 1 });

    const textSections = gsap.utils.toArray(".text-section");
    
    textSections.forEach((section: any, i) => {
      // Title text reveal animation
      const titleChars = section.querySelectorAll(".product-title .split-char");
      if (titleChars.length) {
        gsap.fromTo(titleChars, 
          { y: "100%", opacity: 0 },
          { 
            y: "0%", opacity: 1, duration: 0.8, stagger: 0.015, ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Sticky image crossfade logic
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%", 
        end: "bottom 50%",
        onEnter: () => {
          gsap.to(".product-image", { opacity: 0, scale: 1.05, duration: 0.5, ease: "power2.inOut" });
          gsap.to(`.product-image-${i}`, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(".product-image", { opacity: 0, scale: 1.05, duration: 0.5, ease: "power2.inOut" });
          gsap.to(`.product-image-${i}`, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
        }
      });
    });
  }, { scope: containerRef });

  const products = [
    { 
      title: "Doctor Coats", 
      desc: "Immaculately tailored doctor coats engineered for comfort during long shifts, featuring an anti-microbial finish and deep utility pockets.",
      quote: "Pristine armor for the frontlines of care.",
      img: "/images/products/hospital_doctor_coat_1789887508441.webp" 
    },
    { 
      title: "V-Neck Scrubs", 
      desc: "Designed for those who never stop moving. These scrub sets use a lightweight, fluid-resistant fabric that breathes and stretches effortlessly.",
      quote: "Fluid-resistant comfort for relentless shifts.",
      img: "/images/products/hospital_vneck_scrub_1789887522110.webp" 
    },
    { 
      title: "Lab Coats", 
      desc: "Crisp white tailoring for laboratory professionals, offering protection and precision with reinforced seams and smart styling.",
      quote: "Precision tailoring for meticulous work.",
      img: "/images/products/hospital_lab_coat_1789887534891.webp" 
    },
    { 
      title: "Nurse Uniforms", 
      desc: "Professional and caring appearance meets extreme mobility. Our nurse uniforms blend soft-touch fabrics with highly functional designs.",
      quote: "Empowering mobility without compromising elegance.",
      img: "/images/products/hospital_nurse_uniform_1789887551064.webp" 
    },
    { 
      title: "Tunics & Pants", 
      desc: "Elegant yet practical tunic sets offering superior comfort and a distinguished look for senior nursing staff and specialists.",
      quote: "Sophisticated styling for modern healthcare.",
      img: "/images/products/hospital_tunics_pants_1789887565362.webp" 
    },
    { 
      title: "Attender Uniforms", 
      desc: "Neat and professional attender uniforms designed to withstand rigorous daily wear while maintaining a sharp appearance.",
      quote: "Durable presentation for everyday support.",
      img: "/images/products/hospital_attender_1789887603892.webp" 
    },
    { 
      title: "Ward Boy Uniforms", 
      desc: "Practical and comfortable sets in calming tones, providing high utility and ease of movement for ward assistants.",
      quote: "High utility for essential assistance.",
      img: "/images/products/hospital_ward_boy_1789887617894.webp" 
    },
    { 
      title: "Housekeeping", 
      desc: "Highly functional cleaning uniforms that don't sacrifice elegance. Made from easy-care, stain-release fabrics.",
      quote: "Functional elegance for facility care.",
      img: "/images/products/hospital_housekeeping_1789887631446.webp" 
    },
    { 
      title: "Staff Shirt & Pant", 
      desc: "Clean lines and professional styling for hospital administration and support staff. Lightweight and breathable for all-day comfort.",
      quote: "Professional attire for healthcare administration.",
      img: "/images/products/corporate_formal_trousers_1789840370513.webp" 
    },
    { 
      title: "Front Office Suites", 
      desc: "Sophisticated corporate healthcare attire ensuring your front desk team makes a lasting, premium first impression.",
      quote: "A distinguished welcome for every patient.",
      img: "/images/products/new_winter_waistcoat.webp" 
    }
  ];

  return (
    <main ref={containerRef} className="bg-fmrg-bg text-fmrg-text">
      
      {/* DYNAMIC PARALLAX HERO */}
      <section className="healthcare-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-fmrg-bg">
        
        {/* Floating Editorial Images */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img src="/images/products/hospital_doctor_coat_1789887508441.webp" className="parallax-img absolute top-[15%] left-[5%] w-48 md:w-80 aspect-[3/4] object-cover opacity-90 shadow-2xl" data-speed="1.1" />
          <img src="/images/products/hospital_vneck_scrub_1789887522110.webp" className="parallax-img absolute top-[45%] right-[8%] w-56 md:w-96 aspect-[3/4] object-cover opacity-90 shadow-2xl" data-speed="0.7" />
          <img src="/images/products/hospital_tunics_pants_1789887565362.webp" className="parallax-img absolute top-[70%] left-[25%] w-64 md:w-[28rem] aspect-[3/4] object-cover opacity-90 shadow-2xl" data-speed="1.4" />
        </div>

        {/* Massive Typography */}
        <div className="relative z-10 mix-blend-difference text-white text-center w-full px-4">
          <h1 className="reveal-text font-fmrg-serif flex flex-col items-center justify-center">
             <span className="text-[12vw] leading-[0.85] tracking-tighter uppercase block overflow-hidden">
               <SplitText text="HEALTHCARE" />
             </span>
             <span className="text-[4vw] md:text-[3vw] italic lowercase font-light block mt-4 tracking-wide overflow-hidden opacity-90">
               <SplitText text="woven to care." />
             </span>
          </h1>
        </div>
      </section>

      {/* Split-Screen Sticky Section */}
      <section className="relative max-w-[100rem] mx-auto px-8 md:px-12 flex flex-col lg:flex-row pb-32 gap-12 lg:gap-24 pt-32">
        
        {/* Left Side: Sticky Image */}
        <div className="w-full lg:w-1/2 relative hidden lg:block">
          <div className="lg:sticky lg:top-40 h-[60vh] lg:h-[75vh] w-full bg-gray-200 overflow-hidden shadow-2xl">
            {products.map((p, i) => (
              <img 
                key={i}
                src={p.img}
                alt={p.title}
                className={`product-image product-image-${i} absolute inset-0 w-full h-full object-cover opacity-0`} 
              />
            ))}
          </div>
        </div>

        {/* Right Side: Scrollable Text */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {products.map((p, i) => (
            <div key={i} className={`text-section text-section-${i} lg:min-h-screen flex flex-col justify-center py-24 lg:py-0`}>
                
                {/* Mobile Image (Hidden on Desktop) */}
                <div className="lg:hidden w-full aspect-[3/4] mb-12 bg-gray-200 shadow-2xl overflow-hidden relative">
                   <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>

                <span className="font-fmrg-sans text-sm tracking-widest uppercase mb-4 text-fmrg-accent font-bold">
                  {i < 9 ? `0${i + 1}` : i + 1} / {products.length < 10 ? `0${products.length}` : products.length}
                </span>
                
                <h2 className="product-title font-fmrg-serif text-5xl md:text-7xl mb-8 leading-tight">
                  <SplitText text={p.title} />
                </h2>
                
                <div className="mb-8 pl-6 border-l-2 border-fmrg-accent">
                  <p className="font-fmrg-serif text-2xl md:text-3xl text-gray-800 italic">
                    "{p.quote}"
                  </p>
                </div>
                
                <p className="font-fmrg-sans text-lg text-gray-600 leading-relaxed max-w-xl">
                  {p.desc}
                </p>
                
            </div>
          ))}
        </div>

      </section>
      
    </main>
  );
}
