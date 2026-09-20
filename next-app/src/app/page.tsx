"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import SplitText from '@/components/SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    // 1. Initial Load (Preloader finishes)
    // No scroll indicator anymore

    // 2. Hero Video Scrubbing (Canvas Image Sequence)
    const setupScroll = () => {
      // Hide the text initially
      gsap.set(".hero-text", { yPercent: 50, opacity: 0 });

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const frameCount = 885;
      const currentFrame = (index: number) => `/hero-frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

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
        duration: 0.1
      }, 0.9);

      // Canvas fade out
      scrubTl.to(canvas, {
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.1
      }, 0.9);

      // Statement words appear and change color sequentially
      scrubTl.to(".hero-statement-word", {
        opacity: 1,
        color: "var(--color-fmrg-text)",
        stagger: 0.02,
        ease: "none",
        duration: 0.2
      }, 1.0);
    };

    setupScroll();

    // 3. (Removed standalone statement section)

    // 4. Products Horizontal Scroll with Dynamic Color Transitions
    const productsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".products-section",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      }
    });

    // Animate the horizontal track
    productsTl.to(".products-track", { xPercent: -50, ease: "none" }, 0);
    
    // Dynamic background color transitions
    // 0 - 0.33 (School -> Mustard)
    // 0.33 - 0.66 (Healthcare -> Medical Green)
    // 0.66 - 1.0 (Corporate -> Dark Charcoal)
    productsTl.to(".products-section", { backgroundColor: "var(--color-fmrg-muted)", color: "var(--color-fmrg-bg)", duration: 0.2 }, 0.3);
    productsTl.to(".products-section", { backgroundColor: "var(--color-fmrg-text)", color: "var(--color-fmrg-bg)", duration: 0.2 }, 0.6);

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

        <div className="absolute top-[65%] left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
          <div className="hero-statement text-center px-8 md:px-12 max-w-4xl">
             <h2 className="font-fmrg-serif text-2xl md:text-4xl text-[var(--color-fmrg-muted)] flex justify-center flex-wrap gap-x-2 md:gap-x-3 gap-y-2">
              {['Premium', 'uniforms', 'designed', 'for', 'comfort,', 'discipline,', 'and', 'everyday', 'performance.'].map((word, i) => (
                <span key={i} className="hero-statement-word opacity-0">{word}</span>
              ))}
            </h2>
          </div>
        </div>

      </section>

      {/* 3. PRODUCTS HORIZONTAL SCROLL with dynamic color transitions */}
      {/* Starts with Mustard color for School */}
      <section className="products-section relative h-screen w-full bg-[var(--color-fmrg-accent)] text-[var(--color-fmrg-bg)] overflow-hidden flex flex-col justify-center transition-colors duration-300">
        
        <div className="absolute top-24 md:top-28 left-8 md:left-12 z-20 mix-blend-difference text-white">
          <h3 className="font-fmrg-serif text-4xl md:text-6xl mb-4">Core Products</h3>
          <p className="fmrg-nav-link text-white/50">Swipe or scroll to explore our 10 primary garments.</p>
        </div>

        {/* 200vw width to hold 10 items comfortably */}
        <div className="products-track flex h-[60vh] w-[200vw] mt-32 md:mt-40 items-center pl-8 md:pl-12 gap-8 md:gap-16">
          
          {[
            { cat: "School", title: "Boys Shirts & Shorts", img: "/images/products/boys_school_uniform_1789839759243.jpg" },
            { cat: "School", title: "Girls Pinafores", img: "/images/products/girls_school_pinafore_1789839775913.jpg" },
            { cat: "School", title: "Sports Track Pants", img: "/images/products/school_sports_trackpants_1789839789307.jpg" },
            { cat: "School", title: "Winter Waist Coats", img: "/images/products/new_winter_waistcoat.jpg" },
            { cat: "Healthcare", title: "Doctor Lab Coats", img: "/images/products/hospital_doctor_coat_1789887508441.jpg" },
            { cat: "Healthcare", title: "V-Neck Scrub Sets", img: "/images/products/hospital_vneck_scrub_1789887522110.jpg" },
            { cat: "Healthcare", title: "Nurse Tunics", img: "/images/products/hospital_tunics_pants_1789887565362.jpg" },
            { cat: "Healthcare", title: "OT Surgical Wear", img: "/images/products/hospital_ward_boy_1789887617894.jpg" },
            { cat: "Work Wear", title: "Formal Trousers", img: "/images/products/corporate_formal_trousers_1789840370513.jpg" },
            { cat: "Work Wear", title: "Corporate Polo Tees", img: "/images/products/corporate_polo_tees_1789840388961.jpg" },
            { cat: "Work Wear", title: "Executive Shirts", img: "/images/products/hospital_attender_1789887603892.jpg" },
            { cat: "Work Wear", title: "Industrial Overalls", img: "/images/products/hospital_housekeeping_1789887631446.jpg" }
          ].map((prod, idx) => (
            <div key={idx} className="w-[70vw] md:w-[35vw] h-full flex flex-col shrink-0 group">
              <div className="w-full h-[85%] mb-6 flex items-center justify-center overflow-hidden relative border border-black/10 shadow-xl bg-black">
                <img src={prod.img} alt={prod.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <span className="absolute font-fmrg-sans text-[8rem] text-white/30 font-black -left-4 bottom-4 drop-shadow-lg mix-blend-overlay">0{idx+1}</span>
              </div>
              <div className="flex justify-between items-start mix-blend-difference text-white">
                <div>
                  <h4 className="font-fmrg-serif text-2xl md:text-3xl mb-2">{prod.title}</h4>
                  <span className="fmrg-nav-link opacity-60">{prod.cat}</span>
                </div>
              </div>
            </div>
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

      {/* 5. ASYMMETRIC GRID (Toggle Actions) */}
      <section className="split-grid-section px-8 md:px-12 pb-32 max-w-[100rem] mx-auto pt-48 overflow-hidden bg-[var(--color-fmrg-bg)]">
        <div className="superstar-entry grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          
          <div className="relative h-[80vh] w-full overflow-hidden bg-gray-200">
             <div className="split-image absolute -inset-y-[20%] inset-x-0 w-full h-[140%] bg-[var(--color-fmrg-text)] flex items-center justify-center overflow-hidden">
                <img src="/images/media_1789212528658.png" className="w-full h-full object-cover opacity-80" alt="Cinematic presentation" />
             </div>
          </div>

          <div className="flex flex-col gap-24 pt-12 md:pt-32">
            
            <div className="metric-item">
              <h3 className="font-fmrg-serif fmrg-stat-number mb-4">03</h3>
              <p className="font-fmrg-sans fmrg-nav-link text-[var(--color-fmrg-text)]">Dedicated Collections<br/>(School, Healthcare, Corporate)</p>
            </div>

            <div className="metric-item">
              <h3 className="font-fmrg-serif fmrg-stat-number mb-4">100%</h3>
              <p className="font-fmrg-sans fmrg-nav-link text-[var(--color-fmrg-text)]">Custom Branding & Fitting<br/>Made for Your Identity</p>
            </div>

            <div className="metric-item pt-12 border-t border-[var(--color-fmrg-muted)]">
              <Link href="/contact" className="fmrg-hover group">
                <span className="fmrg-hover-inner font-fmrg-sans fmrg-nav-link text-[var(--color-fmrg-accent)]" data-text="Request a Quote">Request a Quote</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
