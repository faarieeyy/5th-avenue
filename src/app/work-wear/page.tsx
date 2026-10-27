"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";
import Link from "next/link";

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
        end: "+=120%",
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
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", scale: 1.08 },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, duration: 1.2, ease: "power3.inOut" },
          0
        );
      }
    });
  }, { scope: containerRef });

  const products = [
    { 
      title: "Executive Charcoal Suiting & Formal Pleated Trousers", 
      role: "Worn by Kabir · Managing Partner & Senior Strategy Consultant",
      headline: "Command the boardroom with razor-sharp Italian wool-blend tailoring.",
      desc: "Architecturally cut two-piece executive suiting crafted from premium wrinkle-resistant super-120s wool blend. Features tailored notch lapels, a natural shoulder drape, and crisp front-pleated charcoal trousers with belt loops. Paired with a pristine white poplin spread-collar dress shirt and calfskin oxfords for high-stakes client negotiations, annual general meetings, and leadership summits.",
      quote: "Flawless structural poise engineered for leaders who shape the enterprise.",
      specs: [
        "Super-120s Wool & Poly Twill",
        "Permanent Front Sharp Crease",
        "Wrinkle-Proof & Anti-Static",
        "Tailored Notch-Lapel Silhouette"
      ],
      img: "/images/products/corporate_formal_trousers_1789840370513.webp" 
    },
    { 
      title: "Mercerized Combed Cotton Olive Polo & Graphite Chinos", 
      role: "Worn by Vikram · VP of Engineering & Product Development Lead",
      headline: "Smart-casual refinement tailored for agile engineering & creative founders.",
      desc: "Designed for high-growth tech campuses, modern consultancies, and collaborative sprint leaders. Features an olive-drab mercerized combed cotton pique body with an engineered non-roll 3-button spread collar and tone-on-tone custom chest monogramming. Paired with tailored graphite grey flat-front stretch chinos and suede penny loafers for effortless all-day comfort.",
      quote: "Smart-casual wear that communicates authority while keeping teams effortlessly agile.",
      specs: [
        "240 GSM Mercerized Combed Cotton",
        "Shape-Retaining Ribbed Collar",
        "Graphite 4-Way Stretch Chinos",
        "Subtle Tone-on-Tone Crest Embroidery"
      ],
      img: "/images/products/corporate_polo_tees_1789840388961.webp" 
    },
    { 
      title: "Executive Hospitality & Concierge Tailored Waistcoat Duo", 
      role: "Worn by Aryan (Guest Experience Director) & Priya (VIP Relations Manager)",
      headline: "Luxury guest-facing uniforms crafted for five-star hotels and premium suites.",
      desc: "The premier frontline statement for luxury hospitality, corporate reception lounges, and private wealth suites. His look features an architecturally tailored four-button midnight black waistcoat with dual jetted pockets over a crisp spread-collar white poplin shirt and black formal trousers. Her look pairs a sophisticated warm champagne tailored waistcoat with tortoiseshell buttons over a midnight silk-blend collared blouse and pleat-front black trousers.",
      quote: "A world-class visual first impression for front-desk and hospitality ambassadors.",
      specs: [
        "Tailored 4-Button Structured Vests",
        "Functional Dual Jetted Pockets",
        "Stain-Release Teflon Finish",
        "Coordinated Men's & Women's Ensembles"
      ],
      img: "/images/products/new_winter_waistcoat.webp" 
    },
    { 
      title: "Institutional Reception & Administration Waistcoat Ensemble", 
      role: "Worn by Ananya · Client Services & Campus Relations Officer",
      headline: "Poised executive tailoring for administrative headquarters and visitor desks.",
      desc: "A refined uniform ensemble designed for educational administration, corporate front desks, and diplomatic visitor centers. Features a tailored sand-beige four-button vest with precision institutional crest embroidery, layered cleanly over an open-collar crisp white short-sleeve poplin blouse and a matching sand-beige knife-pleated skirt for all-day poise and graceful movement.",
      quote: "Earthy warmth and poised symmetry for front-of-house administrative professionals.",
      specs: [
        "Institutional Monogram Embroidery",
        "Knife-Pleat Structured Skirt",
        "4-Button Form-Fitting Vest",
        "Anti-Crease Poly-Viscose Twill"
      ],
      img: "/images/products/senior_earthy_waistcoat_skirt.jpeg" 
    },
    { 
      title: "Corporate Wellness & Team Hackathon Raglan Crewneck", 
      role: "Worn by Rohan · Lead DevOps Engineer & Tech Marathon Club Captain",
      headline: "Breathable team spirit activewear for company offsites and wellness sports.",
      desc: "Engineered for corporate sports leagues, company hackathons, and corporate wellness programs. Features an athletic forest-green raglan body with dual-tone athletic collar ribbing and contrast sleeve cuffs, emblazoned with custom institutional athletic typography. Matched with lightweight moisture-wicking navy running shorts for active team offsites, annual sporting fixtures, and campus retreats.",
      quote: "High-performance team apparel celebrating corporate camaraderie and wellness.",
      specs: [
        "Moisture-Wicking Aerocool Poly-Knit",
        "Dual-Tone Ribbed Neckline & Cuffs",
        "Athletic Raglan Seams for Zero Friction",
        "Custom Corporate Typography & Crest"
      ],
      img: "/images/products/school_tshirt_1789884872133.webp" 
    },
  ];

  return (
    <main ref={containerRef} className="bg-[#F8FAFC] text-[#0F172A] relative min-h-screen">
      
      {/* 1. DYNAMIC PARALLAX HERO - Executive Obsidian & Slate Theme */}
      <section className="workwear-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0B0F17]">
        
        {/* Floating Editorial Images with cool slate ambient shadows */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img 
            src="/images/products/corporate_formal_trousers_1789840370513.webp" 
            className="parallax-img absolute top-[18%] left-[2%] md:left-[5%] w-48 md:w-80 aspect-[3/4] object-cover opacity-85 shadow-2xl rounded-sm border border-slate-700/50" 
            data-speed="1.2" 
            alt="Executive Charcoal Suiting"
          />
          <img 
            src="/images/products/new_winter_waistcoat.webp" 
            className="parallax-img absolute top-[38%] right-[2%] md:right-[5%] w-56 md:w-96 aspect-[3/4] object-cover opacity-85 shadow-2xl rounded-sm border border-slate-700/50" 
            data-speed="0.8" 
            alt="Tailored Waistcoat Hospitality Duo"
          />
          <img 
            src="/images/products/corporate_polo_tees_1789840388961.webp" 
            className="parallax-img absolute top-[72%] left-[15%] md:left-[25%] w-64 md:w-[30rem] aspect-[4/5] object-cover opacity-85 shadow-2xl rounded-sm border border-slate-700/50" 
            data-speed="1.5" 
            alt="Smart Casual Corporate Polo"
          />
        </div>

        {/* Ambient Subtle Cool Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-blue-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Massive Typography */}
        <div className="relative z-10 text-center w-full px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-300 font-semibold font-mono">
              Corporate & Enterprise Collection
            </span>
          </div>

          <h1 className="reveal-text font-fmrg-serif flex flex-col items-center justify-center text-white">
             <span className="text-[16vw] md:text-[14vw] leading-[0.85] tracking-tighter uppercase block overflow-hidden text-slate-100">
               <SplitText text="WORK WEAR" />
             </span>
             <span className="text-[5vw] md:text-[4vw] italic lowercase font-light block mt-4 tracking-wide overflow-hidden text-sky-300/90 font-serif">
               <SplitText text="dress to build." />
             </span>
          </h1>

          <p className="mt-8 max-w-xl mx-auto text-slate-400 font-fmrg-sans text-sm md:text-base leading-relaxed">
            Architectural tailoring, wrinkle-proof breathable blends, and custom brand identity uniforms engineered for executive suites, tech firms, and frontline hospitality teams.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-400 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-slate-400">Scroll to Explore</span>
          <span className="w-px h-8 bg-gradient-to-b from-sky-400 to-transparent animate-pulse"></span>
        </div>
      </section>

      {/* TARGET AUDIENCE SECTION - Executive Slate Architecture */}
      <section className="max-w-[100rem] mx-auto pt-24 pb-16 px-8 md:px-12 text-center border-b border-slate-200">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-sky-600"></span>
          <p className="font-fmrg-sans text-xs tracking-[0.25em] uppercase text-sky-700 font-bold">
            Corporate Client Spectrum
          </p>
        </div>
        <h2 className="font-fmrg-serif text-3xl md:text-5xl text-slate-900 mb-8">
          Trusted Across India's Premier Enterprises
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {[
            "Corporate & IT Professionals", 
            "Front Desk & Client-Facing Teams", 
            "Executive Leadership & Directors",
            "Business Development Teams", 
            "Administrative & Facilities Staff", 
            "Software Companies & Tech Parks", 
            "Banks & Financial Institutions", 
            "Five-Star Luxury Hospitality", 
            "Aviation & Ground Staff"
          ].map((audience, i) => (
             <span key={i} className="px-5 py-2.5 border border-slate-300 rounded-full font-fmrg-sans text-xs md:text-sm bg-white text-slate-800 shadow-sm hover:border-sky-500 hover:text-sky-700 transition-colors">
                {audience}
             </span>
          ))}
        </div>
      </section>

      {/* 2. PRODUCT LISTING - Personalized, Photo-Accurate Articles */}
      <div className="max-w-[100rem] mx-auto pt-20 pb-32 px-8 md:px-14">
        <div className="flex flex-col gap-32 md:gap-40">
          {products.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`product-section flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                {/* Text Content */}
                <div className="flex-1 w-full flex flex-col justify-center">
                  
                  {/* Category & Wearer Tag */}
                  <div className="product-reveal flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-900 text-sky-300">
                      Product #{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono text-slate-600 tracking-wide font-medium">
                      {p.role}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h2 className="product-title font-fmrg-serif text-3xl md:text-5xl text-slate-900 mb-4 leading-tight">
                    <SplitText text={p.title} />
                  </h2>

                  {/* Headline Quote */}
                  <div className="product-reveal mb-6 pl-5 border-l-2 border-sky-600 bg-sky-50/60 py-3 pr-4 rounded-r-lg">
                    <p className="font-fmrg-serif text-lg md:text-2xl text-slate-800 italic leading-snug">
                      "{p.quote}"
                    </p>
                  </div>
                  
                  {/* Photo-accurate Description */}
                  <p className="product-reveal font-fmrg-sans text-base md:text-lg text-slate-600 leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  {/* Technical Specs Tags */}
                  <div className="product-reveal grid grid-cols-2 gap-2 mb-8 max-w-xl">
                    {p.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-md shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"></span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Procurement CTA Button */}
                  <div className="product-reveal flex items-center gap-4">
                    <Link 
                      href="/contact" 
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-sky-600 text-white font-fmrg-sans text-sm font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                    >
                      <span>Inquire Corporate Fitting</span>
                      <span>→</span>
                    </Link>
                    <span className="text-xs font-mono text-slate-500">
                      Bespoke sizing & brand embroidery available
                    </span>
                  </div>
                </div>

                {/* Image Content with Executive Obsidian Border Frame */}
                <div className="w-full lg:w-5/12 aspect-[4/5] relative overflow-hidden bg-slate-200 shadow-2xl rounded-lg border border-slate-300 group">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="product-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-xs font-mono tracking-wider">
                      {p.role}
                    </p>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>

      {/* INSTITUTIONAL CORPORATE PROCUREMENT BANNER */}
      <section className="bg-[#0B0F17] text-white py-24 px-8 md:px-14 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="text-sky-400 text-xs font-mono tracking-[0.25em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full bg-sky-950/60 border border-sky-800/60">
            Enterprise Uniform Programs
          </span>
          <h2 className="font-fmrg-serif text-3xl md:text-5xl text-slate-100 mb-6 leading-tight">
            Dress Your Entire Organization with Cohesive Authority
          </h2>
          <p className="font-fmrg-sans text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
            From pan-India multi-office deployments to tailored trial fittings and automated replenishment portals, 5th Avenue partners with leading companies to deliver flawless corporate uniforms.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-fmrg-sans font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl"
            >
              Request Corporate Catalog & Swatches
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 rounded-full border border-slate-700 hover:border-slate-500 text-slate-200 font-fmrg-sans text-sm tracking-wider transition-all duration-300"
            >
              Our Manufacturing Standards
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
