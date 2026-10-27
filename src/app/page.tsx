"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import SplitText from '@/components/SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCollectionTab, setActiveCollectionTab] = useState<number>(0);

  useGSAP(() => {
    // 1. Initial Load (Preloader finishes)
    // No scroll indicator anymore

    // 2. Hero Video Scrubbing (Canvas Image Sequence)
    const setupScroll = () => {
      // Hide the text initially
      gsap.set(".hero-text", { yPercent: 50, opacity: 0 });
      gsap.set(".hero-statement", { y: 20, opacity: 0 });

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const frameCount = 886;
      const currentFrame = (index: number) => `/hero-frames/frame_${(index + 1).toString().padStart(4, '0')}.webp`;

      const images: HTMLImageElement[] = [];
      const seq = { frame: 0 };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      function render() {
        if (!context || !canvas) return;
        const img = images[seq.frame];
        if (!img || !img.complete || img.width === 0) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image cover style
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }

      images[0].onload = render;

      window.addEventListener("resize", () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          render();
        }
      });

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=1500%", // Increased scroll distance for video + statement animation
          pin: true,
          scrub: 0.5, // smooth scrubbing
        }
      });
      
      // Scrub the frames
      scrubTl.to(seq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
        onUpdate: render,
      });

      // Text animation
      scrubTl.to(".hero-text", {
        yPercent: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.08
      }, 0.88);

      // Canvas fade out
      scrubTl.to(canvas, {
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.08
      }, 0.88);

      // Subtitle statement appears cleanly with 90% opacity in dark tone
      scrubTl.to(".hero-statement", {
        y: 0,
        opacity: 0.9,
        ease: "power2.out",
        duration: 0.08
      }, 0.90);
    };

    setupScroll();

    // 3. (Removed standalone statement section)

    // 4. Products Horizontal Scroll with Dynamic Color Transitions
    const track = document.querySelector(".products-track") as HTMLElement;
    const calculateDistance = () => {
      if (!track) return -window.innerWidth * 2.5;
      return -(track.scrollWidth - window.innerWidth + 80);
    };

    const productsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".products-section",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Animate the horizontal track
    productsTl.to(".products-track", { 
      x: calculateDistance, 
      ease: "none" 
    }, 0);
    
    // Dynamic background color transitions across specific category palettes:
    // 0.00 -> 0.30: School (#7C4A27 - Warm Amber Ochre)
    // 0.30 -> 0.65: Healthcare (#163E32 - Deep Restorative Forest Emerald)
    // 0.65 -> 1.00: Work Wear (#182028 - Executive Tailored Obsidian Slate)
    productsTl.to(".products-section", { 
      backgroundColor: "#163E32", 
      ease: "power2.inOut", 
      duration: 0.08 
    }, 0.28);

    productsTl.to(".products-section", { 
      backgroundColor: "#182028", 
      ease: "power2.inOut", 
      duration: 0.08 
    }, 0.60);

    // 5. Superstar Entry (Asymmetric Grid Reveal from Left, Play/Reverse on scroll)
    const superstarTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".split-grid-section",
        start: "top 70%",
        toggleActions: "play reverse play reverse",
      }
    });

    superstarTl.fromTo(".superstar-entry",
      { x: "-100vw", opacity: 0 },
      { x: "0", opacity: 1, duration: 1.2, ease: "power3.out" }
    ).fromTo(".metric-item", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    );

    // 6. About Section Reveal
    gsap.fromTo(".about-anim", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", 
        scrollTrigger: { trigger: ".about-section", start: "top 75%" }
      }
    );

    gsap.to(".split-image", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".split-grid-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-transparent text-[var(--color-fmrg-text)] overflow-hidden">
      
      {/* 1. HERO */}
      <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden z-0 bg-black">
        
        <div className="hero-media absolute inset-0 z-0 w-full h-full overflow-hidden bg-[var(--color-fmrg-bg)]">
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 mix-blend-difference text-white pointer-events-none">
          <h1 className="hero-text font-fmrg-serif text-[12vw] md:text-[10vw] leading-none tracking-tight">
            5TH AVENUE
          </h1>
        </div>

        <div className="absolute top-[63%] md:top-[65%] left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
          <div className="hero-statement text-center px-8 md:px-12 max-w-4xl opacity-0">
            <h2 className="font-fmrg-serif text-xl sm:text-2xl md:text-3xl text-[#171717] opacity-90 tracking-wide font-normal leading-relaxed italic">
              Premium uniforms designed for comfort, discipline, and everyday performance.
            </h2>
          </div>
        </div>

      </section>

      {/* 3. PRODUCTS HORIZONTAL SCROLL with dynamic specific category colors */}
      {/* Starts with School (#7C4A27) -> Healthcare (#163E32) -> Work Wear (#182028) */}
      <section className="products-section relative h-screen w-full bg-[#7C4A27] text-white overflow-hidden flex flex-col justify-center transition-colors duration-500">
        
        {/* Editorial Header */}
        <div className="absolute top-12 md:top-16 left-8 md:left-14 right-8 md:right-14 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-fmrg-highlight)] animate-pulse"></span>
              <p className="fmrg-nav-link text-white/80 text-xs tracking-[0.2em] uppercase font-semibold">Curated Garment Lineup</p>
            </div>
            <h3 className="font-fmrg-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none drop-shadow-sm">
              Core Products
            </h3>
          </div>

          {/* Collection indicator badges */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <Link 
              href="/school-uniforms" 
              className="px-3.5 py-1.5 rounded-full border border-white/20 bg-black/25 hover:bg-[#8C5229] text-white/90 hover:text-white text-xs tracking-wider uppercase transition-all backdrop-blur-md flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2B774]"></span>
              School
            </Link>
            <Link 
              href="/healthcare-uniforms" 
              className="px-3.5 py-1.5 rounded-full border border-white/20 bg-black/25 hover:bg-[#1A4B3D] text-white/90 hover:text-white text-xs tracking-wider uppercase transition-all backdrop-blur-md flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#80CBA8]"></span>
              Healthcare
            </Link>
            <Link 
              href="/work-wear" 
              className="px-3.5 py-1.5 rounded-full border border-white/20 bg-black/25 hover:bg-[#222B36] text-white/90 hover:text-white text-xs tracking-wider uppercase transition-all backdrop-blur-md flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]"></span>
              Work Wear
            </Link>
          </div>
        </div>

        {/* Dynamic horizontal track with curated core items */}
        <div className="products-track flex h-[58vh] md:h-[62vh] w-max mt-28 md:mt-32 items-center pl-8 md:pl-14 pr-24 gap-6 md:gap-10">
          
          {[
            { 
              cat: "School", 
              title: "Primary Girls Skirt & Shirt Set", 
              desc: "Tailored white short-sleeve shirt with contrast collar trim paired with a box-pleated flared navy skirt in durable wrinkle-resistant fabric.",
              img: "/images/products/primary_girl_skirt_uniform.jpeg",
              href: "/school-uniforms",
              tag: "Pleated Skirt & Shirt",
              accent: "#E2B774",
              badge: "bg-[#8C532B]/40 text-[#FCEBD9] border-[#D4A373]/50"
            },
            { 
              cat: "School", 
              title: "Quad-House Chevron Sports Kit", 
              desc: "Breathable dry-fit poly-mesh sports jersey featuring sublimated color-coded chevrons and navy sleeves, paired with matching track pants.",
              img: "/images/products/sports_house_quad_chevron.jpeg",
              href: "/school-uniforms",
              tag: "Sublimated Sports Kit",
              accent: "#E2B774",
              badge: "bg-[#8C532B]/40 text-[#FCEBD9] border-[#D4A373]/50"
            },
            { 
              cat: "Healthcare", 
              title: "Consultant Doctor Lab Coat", 
              desc: "Tailored full-length white medical coat featuring notched lapels, chest pen pocket, deep utility hip pockets, and matching white medical trousers.",
              img: "/images/products/medical_doctor_full_coat_male.jpeg",
              href: "/healthcare-uniforms",
              tag: "Full-Length White Coat",
              accent: "#80CBA8",
              badge: "bg-[#1E5242]/40 text-[#D8F3DC] border-[#74C69D]/50"
            },
            { 
              cat: "Healthcare", 
              title: "Royal Blue V-Neck Scrub Suit", 
              desc: "Cobalt royal blue scrub top with contrast white neckline piping and dual slant pockets, paired with ergonomic flexible drawstring trousers.",
              img: "/images/products/medical_royal_blue_scrub_set.jpeg",
              href: "/healthcare-uniforms",
              tag: "V-Neck Scrub Suit",
              accent: "#80CBA8",
              badge: "bg-[#1E5242]/40 text-[#D8F3DC] border-[#74C69D]/50"
            },
            { 
              cat: "Work Wear", 
              title: "Corporate Formal Trousers", 
              desc: "Tailored slim-fit poly-viscose formal trousers with permanent front creases, functional side pockets, and durable belt loops for daily office wear.",
              img: "/images/products/corporate_formal_trousers_1789840370513.webp",
              href: "/work-wear",
              tag: "Tailored Formal Trousers",
              accent: "#CBD5E1",
              badge: "bg-[#334155]/40 text-[#F1F5F9] border-[#94A3B8]/50"
            },
            { 
              cat: "Work Wear", 
              title: "Mercerized Polo T-Shirt", 
              desc: "Premium combed cotton pique polo shirt with structured rib-knit collar, 2-button placket, and colorfast weave engineered for company branding.",
              img: "/images/products/corporate_polo_tees_1789840388961.webp",
              href: "/work-wear",
              tag: "Pique Cotton Polo",
              accent: "#CBD5E1",
              badge: "bg-[#334155]/40 text-[#F1F5F9] border-[#94A3B8]/50"
            }
          ].map((prod, idx) => (
            <Link 
              href={prod.href}
              key={idx} 
              className="w-[74vw] sm:w-[48vw] md:w-[30vw] lg:w-[24vw] h-full flex flex-col shrink-0 group select-none cursor-pointer"
            >
              <div className="w-full h-[76%] mb-3 flex items-center justify-center overflow-hidden relative rounded-xl border border-white/15 shadow-2xl bg-black/50 backdrop-blur-md transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.45)] p-2">
                <img 
                  src={prod.img} 
                  alt={prod.title} 
                  className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                
                {/* Specific colored category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium border backdrop-blur-md ${prod.badge}`}>
                    {prod.cat}
                  </span>
                </div>

                {/* Specific garment detail chip */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2 py-0.5 rounded text-[10px] tracking-wide text-white/80 bg-black/60 backdrop-blur-md border border-white/10 font-sans">
                    {prod.tag}
                  </span>
                </div>

                {/* View link indicator on hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-[11px] uppercase tracking-wider text-white font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                    Explore →
                  </span>
                </div>
              </div>

              {/* Title & metadata */}
              <div className="flex flex-col text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="fmrg-nav-link text-[10px] text-white/60 uppercase tracking-widest">{prod.cat}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-[11px] text-white/80 font-mono tracking-wide">{prod.tag}</span>
                </div>
                <h4 className="font-fmrg-serif text-lg md:text-xl text-white group-hover:text-[var(--color-fmrg-highlight)] transition-colors duration-300 line-clamp-1">
                  {prod.title}
                </h4>
                <p className="text-xs text-white/70 font-sans mt-1 line-clamp-2 leading-relaxed">
                  {prod.desc}
                </p>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* 4. ABOUT & CAPABILITIES */}
      <section className="about-section py-32 md:py-48 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          <div className="md:w-1/2">
            <h2 className="about-anim font-fmrg-serif text-5xl md:text-7xl leading-none mb-12">Built Around<br/>Your Requirements.</h2>
            <p className="about-anim font-fmrg-sans text-2xl leading-relaxed text-gray-700 mb-12">
              We are a dedicated manufacturing partner, building complete corporate and institutional apparel solutions where discipline meets everyday comfort.
            </p>
            <div className="about-anim">
              <Link href="/about" className="fmrg-hover group">
                <span className="fmrg-hover-inner font-fmrg-sans fmrg-nav-link text-[var(--color-fmrg-accent)]" data-text="Read Our Story">Read Our Story</span>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-12">
            {[
              { num: "01", title: "Premium Fabrics", desc: "Sourced globally for breathability and extreme durability." },
              { num: "02", title: "Custom Branding", desc: "Precision embroidery mapping your exact brand colors." },
              { num: "03", title: "Custom Sizing", desc: "Tailored fitting beyond standard off-the-rack solutions." },
              { num: "04", title: "Bulk Capacity", desc: "Robust manufacturing ready for institutional scales." }
            ].map(item => (
              <div key={item.num} className="about-anim border-t border-[var(--color-fmrg-text)] pt-6">
                <span className="fmrg-nav-link text-[var(--color-fmrg-accent)] block mb-4">{item.num}</span>
                <h4 className="font-fmrg-serif text-2xl mb-2">{item.title}</h4>
                <p className="font-fmrg-sans text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEDICATED COLLECTIONS SHOWCASE (School · Healthcare · Corporate) */}
      <section className="split-grid-section px-8 md:px-12 pb-32 max-w-[100rem] mx-auto pt-48 overflow-hidden bg-[var(--color-fmrg-bg)]">
        <div className="superstar-entry grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          
          {/* Flagship Product Showcase (100% Fully Shown with object-contain, exact ratio) */}
          <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl bg-[#FAF8F5] border border-black/10 shadow-2xl flex flex-col p-4 md:p-6 justify-between group">
             {/* Main Image View */}
             <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                <img 
                  key={activeCollectionTab}
                  src={
                    activeCollectionTab === 0 
                      ? "/images/products/sports_house_quad_chevron.jpeg"
                      : activeCollectionTab === 1
                      ? "/images/products/medical_female_doctor_coat.jpeg"
                      : "/images/products/new_winter_waistcoat.webp"
                  } 
                  className="w-full h-full object-contain filter drop-shadow-md transition-all duration-700 ease-out" 
                  alt={
                    activeCollectionTab === 0
                      ? "5th Avenue School House Uniforms"
                      : activeCollectionTab === 1
                      ? "5th Avenue Healthcare Doctor Consultation Uniform"
                      : "5th Avenue Corporate Executive Waistcoat"
                  } 
                />
             </div>
             
             {/* Card Caption Strip */}
             <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                    {activeCollectionTab === 0 && "School House Spirit · Courage · Discipline · Harmony · Excellence"}
                    {activeCollectionTab === 1 && "Clinical Consultation Coat · Antimicrobial Fluid Barrier"}
                    {activeCollectionTab === 2 && "Executive Waistcoat Duo · Luxury Corporate & Hospitality"}
                  </span>
                  <h4 className="font-fmrg-serif text-base md:text-lg text-slate-900 line-clamp-1">
                    {activeCollectionTab === 0 && "Quad-House Athletic & Academy Uniforms"}
                    {activeCollectionTab === 1 && "Physician Consultation & Clinical OPD Coat"}
                    {activeCollectionTab === 2 && "Executive Hospitality & Corporate Waistcoats"}
                  </h4>
                </div>
                <Link 
                  href={
                    activeCollectionTab === 0
                      ? "/school-uniforms"
                      : activeCollectionTab === 1
                      ? "/healthcare-uniforms"
                      : "/work-wear"
                  } 
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shrink-0 shadow-sm inline-flex items-center gap-1.5"
                >
                  <span>Explore</span>
                  <span>→</span>
                </Link>
             </div>
          </div>

          <div className="flex flex-col gap-16 md:gap-20 pt-8 md:pt-16">
            
            <div className="metric-item">
              <h3 className="font-fmrg-serif fmrg-stat-number mb-4">03</h3>
              <p className="font-fmrg-sans fmrg-nav-link text-[var(--color-fmrg-text)] mb-6">
                Dedicated Collections<br/>(School, Healthcare, Corporate)
              </p>
              
              {/* Interactive Category Selector Pills */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: "01 School Uniforms", idx: 0 },
                  { label: "02 Healthcare", idx: 1 },
                  { label: "03 Work Wear", idx: 2 }
                ].map((tab) => (
                  <button
                    key={tab.idx}
                    onClick={() => setActiveCollectionTab(tab.idx)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeCollectionTab === tab.idx
                        ? "bg-[#171717] text-white shadow-lg font-bold scale-105"
                        : "bg-black/5 hover:bg-black/10 text-slate-700 border border-black/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="metric-item">
              <h3 className="font-fmrg-serif fmrg-stat-number mb-4">100%</h3>
              <p className="font-fmrg-sans fmrg-nav-link text-[var(--color-fmrg-text)]">
                Custom Branding & Fitting<br/>Made for Your Identity
              </p>
            </div>

            <div className="metric-item pt-8 border-t border-[var(--color-fmrg-muted)]">
              <Link href="/contact" className="fmrg-hover group inline-block">
                <span className="fmrg-hover-inner font-fmrg-sans fmrg-nav-link text-[var(--color-fmrg-accent)] font-semibold" data-text="Request a Quote">
                  Request a Quote
                </span>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
