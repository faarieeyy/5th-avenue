"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";
import Link from "next/link";

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
      title: "Physician's Full-Length Consultation Lab Coat", 
      role: "Senior Physician & Clinical Consultant",
      desc: "Tailored for senior physicians and hospital consultants. Worn here by Dr. Aarav during morning clinical rounds, this full-length white coat is crafted in fluid-repellent poly-viscose twill featuring crisp notched lapels, four front buttons, a dedicated chest pocket with pen slot, and deep hip utility pockets for your stethoscope and clinical notes. Paired with straight-cut stain-resistant white medical trousers.",
      quote: "Pristine authority and comfort for intensive clinical ward rounds.",
      specs: "Knee-Length Cut · Chest Pen Slot · Deep Hip Pockets · White Medical Trousers Included",
      img: "/images/products/medical_doctor_full_coat_male.jpeg" 
    },
    { 
      title: "Specialist Nurse Lilac Tunic & Trousers Set", 
      role: "Nursing Staff & Specialist Clinical Care",
      desc: "Designed for dedicated frontline nursing professionals and clinical specialists like Nurse Meera. Cut in soothing pastel lilac with crisp white contrast piping along the mandarin neckband, pocket edges, and short sleeve cuffs. Features a secure front button closure and matching ergonomic lilac trousers engineered for effortless bending, walking, and patient mobility throughout 12-hour shifts.",
      quote: "Empowering compassionate care with comfort, elegance, and 12-hour mobility.",
      specs: "Mandarin Collar with White Piping · Contrast Pocket Trim · Breathable Soft-Touch Twill · 12-Hour Shift Fit",
      img: "/images/products/medical_nurse_lavender_tunic.jpeg" 
    },
    { 
      title: "Royal Cobalt Blue Contrast V-Neck Scrubs", 
      role: "Emergency Teams & Surgical Units",
      desc: "Crafted for emergency physicians, ICU teams, and surgical specialists like Dr. Kavya. This set features vibrant royal cobalt blue highlighted by crisp white piping along the rounded V-neckline and dual slant hip pockets. Tailored in lightweight 4-way stretch micro-fiber with antimicrobial protection, paired with matching comfort-fit drawstring scrub trousers.",
      quote: "Fluid-resistant high-performance scrubs engineered for relentless shifts.",
      specs: "Rounded V-Neck with Contrast Trim · Dual Slant Pockets · 4-Way Stretch Aerocool · Fluid-Barrier Finish",
      img: "/images/products/medical_royal_blue_scrub_set.jpeg" 
    },
    { 
      title: "Women's Short-Sleeve Doctor Consultation Coat", 
      role: "Resident Doctors & Outpatient Specialists",
      desc: "Engineered for outpatient physicians, dentists, and resident officers like Dr. Sneha. A tailored short-sleeve silhouette featuring crisp notched lapels, a 4-button placket, reinforced chest pocket, and deep side pockets. Paired with clean white medical trousers that offer a dignified clinical appearance without sleeve interference during patient examinations.",
      quote: "Distinguished clinical presentation and unrestricted patient examination ease.",
      specs: "Short-Sleeve Examination Cut · Notched Lapels · 4-Button Placket · Tailored Feminine Fit",
      img: "/images/products/medical_female_doctor_coat.jpeg" 
    },
    { 
      title: "Consultant White Coat Over Navy Scrub Ensemble", 
      role: "Department Chiefs & Medical Directors",
      desc: "Designed for department chiefs and surgical consultants like Dr. Rahul who transition between clinical OPD consultations and procedural suites. Features an impeccably structured mid-length white consultation lab coat layered over deep navy V-neck surgical scrubs and navy scrub trousers, combining authoritative executive presence with procedural readiness.",
      quote: "Executive clinical presence meeting immediate procedural readiness.",
      specs: "Layered Dual-Uniform System · Mid-Length Lab Coat · Deep Navy V-Neck Scrub Base · Fluid & Chemical Repellent",
      img: "/images/products/medical_physician_navy_scrubs.jpeg" 
    }
  ];

  return (
    <main ref={containerRef} className="bg-[#F0F7F4] text-[#0D261F] min-h-screen">
      
      {/* 1. DYNAMIC PARALLAX HERO (Clinical Deep Emerald Atmosphere) */}
      <section className="healthcare-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0B211A] text-white">
        
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 bg-radial from-[#163E32]/60 via-transparent to-transparent opacity-50 pointer-events-none"></div>

        {/* Floating Editorial Images */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img src="/images/products/medical_doctor_full_coat_male.jpeg" className="parallax-img absolute top-[15%] left-[5%] w-48 md:w-80 aspect-[3/4] object-cover opacity-90 shadow-2xl rounded-sm border border-white/10" data-speed="1.1" alt="Doctor Consultation Coat" />
          <img src="/images/products/medical_nurse_lavender_tunic.jpeg" className="parallax-img absolute top-[45%] right-[8%] w-56 md:w-96 aspect-[3/4] object-cover opacity-90 shadow-2xl rounded-sm border border-white/10" data-speed="0.7" alt="Nurse Tunic Set" />
          <img src="/images/products/medical_royal_blue_scrub_set.jpeg" className="parallax-img absolute top-[70%] left-[25%] w-64 md:w-[28rem] aspect-[3/4] object-cover opacity-90 shadow-2xl rounded-sm border border-white/10" data-speed="1.4" alt="Royal Blue Scrubs" />
        </div>

        {/* Massive Typography */}
        <div className="relative z-10 text-center w-full px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#163E32]/80 border border-[#80CBA8]/30 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#80CBA8] animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#A3E4D7] font-semibold">Clinical Uniform Atelier</span>
          </div>
          <h1 className="reveal-text font-fmrg-serif flex flex-col items-center justify-center">
             <span className="text-[12vw] leading-[0.85] tracking-tighter uppercase block overflow-hidden text-white drop-shadow-md">
               <SplitText text="HEALTHCARE" />
             </span>
             <span className="text-[4vw] md:text-[3vw] italic lowercase font-light block mt-4 tracking-wide overflow-hidden text-[#80CBA8]/90">
               <SplitText text="woven to care." />
             </span>
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 pointer-events-none">
          <span className="text-[11px] uppercase tracking-[0.2em]">Explore Medical Collection</span>
          <span className="w-px h-8 bg-[#80CBA8]/50 animate-pulse"></span>
        </div>
      </section>

      {/* 2. Split-Screen Sticky Showcase (Serene Clinical Mint Universe) */}
      <section className="relative max-w-[100rem] mx-auto px-8 md:px-12 flex flex-col lg:flex-row pb-32 gap-12 lg:gap-24 pt-32">
        
        {/* Left Side: Sticky Image */}
        <div className="w-full lg:w-1/2 relative hidden lg:block">
          <div className="lg:sticky lg:top-40 h-[60vh] lg:h-[75vh] w-full bg-[#E3EEE9] overflow-hidden shadow-2xl rounded-xl border border-[#163E32]/15">
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
                <div className="lg:hidden w-full aspect-[3/4] mb-12 bg-[#E3EEE9] shadow-2xl overflow-hidden relative rounded-xl border border-[#163E32]/15">
                   <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-fmrg-sans text-xs tracking-widest uppercase text-[#163E32] font-bold px-3 py-1 rounded-full bg-[#163E32]/10 border border-[#163E32]/20">
                    {i < 9 ? `0${i + 1}` : i + 1} / {products.length < 10 ? `0${products.length}` : products.length}
                  </span>
                  <span className="text-[#163E32]/40">•</span>
                  <span className="text-xs uppercase tracking-wider text-[#2D6A4F] font-semibold">
                    {p.role}
                  </span>
                </div>
                
                <h2 className="product-title font-fmrg-serif text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight text-[#0D261F]">
                  <SplitText text={p.title} />
                </h2>
                
                <div className="mb-6 pl-6 border-l-2 border-[#163E32]">
                  <p className="font-fmrg-serif text-xl sm:text-2xl text-[#163E32] italic leading-relaxed">
                    "{p.quote}"
                  </p>
                </div>
                
                <p className="font-fmrg-sans text-base sm:text-lg text-[#2D4A3E] leading-relaxed max-w-xl mb-6">
                  {p.desc}
                </p>

                {/* Craftsmanship Specs */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-4 border-t border-[#163E32]/15">
                  <span className="text-xs uppercase tracking-wider text-[#163E32] font-bold shrink-0">Specifications:</span>
                  <span className="text-xs text-[#2D4A3E] font-sans">{p.specs}</span>
                </div>
                
            </div>
          ))}

          {/* Footer Contact Callout */}
          <div className="mt-20 p-10 md:p-14 rounded-2xl bg-[#0B211A] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-[#163E32]/40">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#80CBA8] font-semibold block mb-2">
                Hospital Procurement & Bulk Institutional Orders
              </span>
              <h3 className="font-fmrg-serif text-3xl md:text-4xl text-white">
                Equip Your Healthcare Facility With 5th Avenue.
              </h3>
              <p className="text-[#A3E4D7]/80 mt-2 max-w-xl text-sm leading-relaxed">
                Hospital crest embroidery, department color-coding, and antimicrobial fluid-resistant bulk sizing across all clinical roles.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#80CBA8] hover:bg-[#97D8BA] text-[#0B211A] rounded-full font-fmrg-sans text-xs uppercase tracking-widest font-bold transition-all shrink-0 shadow-lg"
            >
              Request Hospital Catalog →
            </Link>
          </div>

        </div>

      </section>
      
    </main>
  );
}
