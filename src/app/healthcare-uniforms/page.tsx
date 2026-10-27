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
          gsap.to(".product-image", { opacity: 0, scale: 1.03, duration: 0.4, ease: "power2.inOut" });
          gsap.to(`.product-image-${i}`, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(".product-image", { opacity: 0, scale: 1.03, duration: 0.4, ease: "power2.inOut" });
          gsap.to(`.product-image-${i}`, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
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
      specs: [
        "Knee-Length Consultation Silhouette",
        "Chest Pen Slot & Stethoscope Utility Pockets",
        "Fluid-Barrier Repellent Twill Finish",
        "Stain-Release White Medical Trousers Included"
      ],
      img: "/images/products/medical_doctor_full_coat_male.jpeg" 
    },
    { 
      title: "Specialist Nurse Lilac Tunic & Trousers Set", 
      role: "Nursing Staff & Specialist Clinical Care",
      desc: "Designed for dedicated frontline nursing professionals and clinical specialists like Nurse Meera. Cut in soothing pastel lilac with crisp white contrast piping along the mandarin neckband, pocket edges, and short sleeve cuffs. Features a secure front button closure and matching ergonomic lilac trousers engineered for effortless bending, walking, and patient mobility throughout 12-hour shifts.",
      quote: "Empowering compassionate care with comfort, elegance, and 12-hour mobility.",
      specs: [
        "Mandarin Neckband with Crisp White Piping",
        "Contrast Trimmed Dual Hip Pockets",
        "Breathable Soft-Touch Antimicrobial Weave",
        "Ergonomic Flex Trousers for 12-Hour Shifts"
      ],
      img: "/images/products/medical_nurse_lavender_tunic.jpeg" 
    },
    { 
      title: "Royal Cobalt Blue Contrast V-Neck Scrubs", 
      role: "Emergency Teams & Surgical Units",
      desc: "Crafted for emergency physicians, ICU teams, and surgical specialists like Dr. Kavya. This set features vibrant royal cobalt blue highlighted by crisp white piping along the rounded V-neckline and dual slant hip pockets. Tailored in lightweight 4-way stretch micro-fiber with antimicrobial protection, paired with matching comfort-fit drawstring scrub trousers.",
      quote: "Fluid-resistant high-performance scrubs engineered for relentless shifts.",
      specs: [
        "Rounded V-Neck with Contrast White Piping",
        "Dual Deep Slanted Hip Pockets",
        "4-Way Stretch Aerocool Micro-Fiber",
        "Drawstring Comfort Scrub Trousers"
      ],
      img: "/images/products/medical_royal_blue_scrub_set.jpeg" 
    },
    { 
      title: "Women's Short-Sleeve Doctor Consultation Coat", 
      role: "Resident Doctors & Outpatient Specialists",
      desc: "Engineered for outpatient physicians, dentists, and resident officers like Dr. Sneha. A tailored short-sleeve silhouette featuring crisp notched lapels, a 4-button placket, reinforced chest pocket, and deep side pockets. Paired with clean white medical trousers that offer a dignified clinical appearance without sleeve interference during patient examinations.",
      quote: "Distinguished clinical presentation and unrestricted patient examination ease.",
      specs: [
        "Unrestricted Short-Sleeve Examination Cut",
        "Form-Fitting Notched Lapel Front",
        "Reinforced Chest Pen Slot & Side Pockets",
        "Tailored Stain-Resistant White Trousers"
      ],
      img: "/images/products/medical_female_doctor_coat.jpeg" 
    },
    { 
      title: "Consultant White Coat Over Navy Scrub Ensemble", 
      role: "Department Chiefs & Medical Directors",
      desc: "Designed for department chiefs and surgical consultants like Dr. Rahul who transition between clinical OPD consultations and procedural suites. Features an impeccably structured mid-length white consultation lab coat layered over deep navy V-neck surgical scrubs and navy scrub trousers, combining authoritative executive presence with procedural readiness.",
      quote: "Executive clinical presence meeting immediate procedural readiness.",
      specs: [
        "Dual-System Layered Consultation Set",
        "Structured Mid-Length Outer Lab Coat",
        "Breathable Deep Navy V-Neck Base Scrub",
        "Autoclave & Industrial Wash Colorfast"
      ],
      img: "/images/products/medical_physician_navy_scrubs.jpeg" 
    }
  ];

  return (
    <main ref={containerRef} className="bg-[#F8FCFA] text-[#0F2F28] min-h-screen">
      
      {/* 1. DYNAMIC PARALLAX HERO - Luminous Clinical Teal & Healing Mint */}
      <section className="healthcare-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#14B8A6] text-white">
        
        {/* Soft Ambient Radial Lights */}
        <div className="absolute inset-0 bg-radial-gradient from-white/20 via-transparent to-transparent pointer-events-none" />

        {/* Floating Editorial Images (100% Fully Shown with object-contain) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="parallax-img absolute top-[14%] left-[4%] md:left-[6%] w-44 md:w-72 aspect-[3/4] p-2 bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl border border-white/30 flex items-center justify-center overflow-hidden" data-speed="1.1">
            <img 
              src="/images/products/medical_doctor_full_coat_male.jpeg" 
              className="w-full h-full object-contain" 
              alt="Doctor Consultation Coat" 
            />
          </div>
          <div className="parallax-img absolute top-[42%] right-[4%] md:right-[7%] w-52 md:w-84 aspect-[3/4] p-2 bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl border border-white/30 flex items-center justify-center overflow-hidden" data-speed="0.7">
            <img 
              src="/images/products/medical_nurse_lavender_tunic.jpeg" 
              className="w-full h-full object-contain" 
              alt="Nurse Tunic Set" 
            />
          </div>
          <div className="parallax-img absolute top-[68%] left-[20%] md:left-[28%] w-56 md:w-96 aspect-[3/4] p-2 bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl border border-white/30 flex items-center justify-center overflow-hidden" data-speed="1.4">
            <img 
              src="/images/products/medical_royal_blue_scrub_set.jpeg" 
              className="w-full h-full object-contain" 
              alt="Royal Blue Scrubs" 
            />
          </div>
        </div>

        {/* Massive Typography */}
        <div className="relative z-10 text-center w-full px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/40 mb-6 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-white font-semibold font-mono">
              Clinical & Healthcare Atelier
            </span>
          </div>

          <h1 className="reveal-text font-fmrg-serif flex flex-col items-center justify-center">
             <span className="text-[14vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase block overflow-hidden text-white drop-shadow-md">
               <SplitText text="HEALTHCARE" />
             </span>
             <span className="text-[4.5vw] md:text-[3.2vw] italic lowercase font-light block mt-4 tracking-wide overflow-hidden text-teal-100 font-serif drop-shadow-sm">
               <SplitText text="woven to care." />
             </span>
          </h1>

          <p className="mt-8 max-w-xl mx-auto text-teal-50 font-fmrg-sans text-sm md:text-base leading-relaxed drop-shadow-xs">
            Antimicrobial protection, fluid-repellent comfort, and precision department color-coding crafted for doctors, surgeons, nurses, and hospital care teams.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/90 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono">Scroll to Explore</span>
          <span className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse"></span>
        </div>
      </section>

      {/* 2. Split-Screen Sticky Showcase (Luminous Clinical Environment) */}
      <section className="relative max-w-[100rem] mx-auto px-8 md:px-14 flex flex-col lg:flex-row pb-32 gap-12 lg:gap-24 pt-28">
        
        {/* Left Side: Sticky Image (Full image shown using object-contain, no heads cropped) */}
        <div className="w-full lg:w-1/2 relative hidden lg:block">
          <div className="lg:sticky lg:top-36 h-[65vh] lg:h-[78vh] w-full bg-white shadow-2xl rounded-2xl border border-teal-100 p-6 flex items-center justify-center overflow-hidden">
            {products.map((p, i) => (
              <div 
                key={i} 
                className={`product-image product-image-${i} absolute inset-0 w-full h-full p-4 flex items-center justify-center opacity-0`}
              >
                <img 
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-contain filter drop-shadow-lg" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Scrollable Text */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {products.map((p, i) => (
            <div key={i} className={`text-section text-section-${i} lg:min-h-screen flex flex-col justify-center py-20 lg:py-0 border-b lg:border-none border-teal-100/60`}>
                
                {/* Mobile Image (Hidden on Desktop, fully visible via object-contain) */}
                <div className="lg:hidden w-full aspect-[3/4] mb-8 bg-white shadow-xl overflow-hidden relative rounded-2xl border border-teal-100 p-4 flex items-center justify-center">
                   <img src={p.img} alt={p.title} className="w-full h-full object-contain" />
                </div>

                {/* Role Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-teal-800 font-bold px-3 py-1 rounded-full bg-teal-100/70 border border-teal-300/60">
                    Product #{i < 9 ? `0${i + 1}` : i + 1}
                  </span>
                  <span className="text-teal-400">•</span>
                  <span className="text-xs uppercase tracking-wider text-teal-700 font-semibold font-mono">
                    {p.role}
                  </span>
                </div>
                
                {/* Title */}
                <h2 className="product-title font-fmrg-serif text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight text-teal-950">
                  <SplitText text={p.title} />
                </h2>
                
                {/* Quote */}
                <div className="mb-6 pl-5 border-l-2 border-teal-600 bg-teal-50/70 py-3 pr-4 rounded-r-lg">
                  <p className="font-fmrg-serif text-lg sm:text-2xl text-teal-900 italic leading-relaxed">
                    "{p.quote}"
                  </p>
                </div>
                
                {/* Description */}
                <p className="font-fmrg-sans text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl mb-6">
                  {p.desc}
                </p>

                {/* Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 max-w-xl">
                  {p.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-medium text-teal-900 bg-teal-50/60 border border-teal-200/60 px-3 py-2 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0"></span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Procurement Link */}
                <div className="flex items-center gap-4">
                  <Link 
                    href="/contact" 
                    className="px-6 py-2.5 rounded-full bg-teal-700 hover:bg-teal-600 text-white font-fmrg-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-md inline-flex items-center gap-2"
                  >
                    <span>Request Hospital Samples</span>
                    <span>→</span>
                  </Link>
                </div>
                
            </div>
          ))}

          {/* Footer Contact Callout (Luminous Modern Surgical Teal) */}
          <div className="mt-20 p-10 md:p-14 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#0D9488] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-teal-400/30">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-teal-100 font-semibold block mb-2 font-mono">
                Institutional Healthcare Procurement
              </span>
              <h3 className="font-fmrg-serif text-3xl md:text-4xl text-white">
                Equip Your Healthcare Network with 5th Avenue.
              </h3>
              <p className="text-teal-50/90 mt-2 max-w-xl text-sm leading-relaxed">
                Hospital crest embroidery, department color-coding, and antimicrobial fluid-resistant bulk sizing across all clinical roles.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white hover:bg-teal-50 text-teal-900 rounded-full font-fmrg-sans text-xs uppercase tracking-widest font-bold transition-all shrink-0 shadow-xl"
            >
              Request Hospital Catalog →
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
}
