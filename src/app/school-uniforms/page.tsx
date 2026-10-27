"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "@/components/SplitText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function SchoolUniforms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // One-time Hero & Lookbook animations
  useGSAP(() => {
    // Hero text animation
    gsap.fromTo(".reveal-text .split-char", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.04, ease: "power4.out", delay: 0.2 }
    );

    // Hero Parallax Scrub with pin
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".school-hero",
        start: "top top",
        end: "+=100%",
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

    // Animate lookbook cards
    gsap.fromTo(".lookbook-card", 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.08, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".lookbook-grid",
          start: "top 80%"
        }
      }
    );
  }, { scope: containerRef });

  // Update product section animations when category changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Official 9 Look Book Categories
  const lookBookCategories = [
    {
      id: "kindergarten",
      number: "01",
      title: "A Day at the Kindergarten!",
      covers: "Pre-primary school uniforms",
      desc: "Ultra-soft, breathable fabrics with easy-on closures and playful flexibility engineered specifically for young toddlers.",
      highlight: "Ages 3 – 5",
      img: "/images/products/kindergarten_activity_wear.jpeg",
      color: "#1E3A8A"
    },
    {
      id: "primary",
      number: "02",
      title: "Make way for the explorers",
      covers: "Primary school uniforms (1st to 5th Standard)",
      desc: "Designed for Class 1 to 5 students. Heavy-duty reinforced stitching, stain-resistant fabrics, and smart comfort tailored for young explorers.",
      highlight: "Classes 1 – 5",
      img: "/images/products/primary_girl_skirt_uniform.jpeg",
      color: "#1E40AF"
    },
    {
      id: "secondary",
      number: "03",
      title: "The Clean Slate",
      covers: "Secondary school uniforms (6th to 10th Standard)",
      desc: "A transition toward mature discipline. Crisp anti-wrinkle shirts, permanently pressed knife-pleats, and structured tartan trousers.",
      highlight: "Classes 6 – 10",
      img: "/images/products/secondary_boys_plaid_trousers.jpeg",
      color: "#0F172A"
    },
    {
      id: "senior",
      number: "04",
      title: "Earthy Shades",
      covers: "Higher secondary school uniforms (11th & 12th Standard)",
      desc: "Refined, executive cuts in rich earth-toned fabrics, custom-embroidered beige waistcoats, and knife-pleated skirts for senior scholars.",
      highlight: "Classes 11 & 12",
      img: "/images/products/senior_earthy_waistcoat_skirt.jpeg",
      color: "#334155"
    },
    {
      id: "accessories",
      number: "05",
      title: "The Complete School Look",
      covers: "School accessories",
      desc: "Ergonomic spinal-support school bags, jacquard crest ties, embossed leather belts, and cotton socks completing the uniform.",
      highlight: "Gear & Accessories",
      img: "/images/products/school_bag_1789884884376.webp",
      color: "#1E293B"
    },
    {
      id: "merchandise",
      number: "06",
      title: "My School My Pride",
      covers: "School merchandise & campus identity",
      desc: "Celebrate school spirit with varsity crest polos, heavyweight combed cotton apparel, custom crest caps, and alumni celebration gear.",
      highlight: "Campus Identity",
      img: "/images/products/corporate_polo_tees_1789840388961.webp",
      color: "#1E3A8A"
    },
    {
      id: "hostel",
      number: "07",
      title: "Good Dress Equals Good Night!",
      covers: "Hostel uniforms & residential activewear",
      desc: "Cozy, breathable 100% natural cotton raglan sets and lounge wear ensuring restful comfort in student dormitories and study halls.",
      highlight: "Residential & Boarding",
      img: "/images/products/school_tshirt_1789884872133.webp",
      color: "#0284C7"
    },
    {
      id: "house",
      number: "08",
      title: "Up for a Match?",
      covers: "School house uniforms",
      desc: "Vibrant colorfast house polo tees, matching athletic shorts, and competition kits uniting students under their house colors.",
      highlight: "Inter-House Pride",
      img: "/images/products/sports_house_quad_chevron.jpeg",
      color: "#D97706"
    },
    {
      id: "sports",
      number: "09",
      title: "For the Love of Sports",
      covers: "Sports uniforms",
      desc: "High-performance moisture-wicking jerseys and 4-way articulated knee track pants engineered for speed, agility, and sports days.",
      highlight: "Athletics & PE",
      img: "/images/products/sports_hockey_chevron_girls.jpeg",
      color: "#059669"
    }
  ];

  // Comprehensive Product Catalog mapped to Look Book Categories
  const products = [
    { 
      title: "Kindergarten Pleated Pinafores & Frocks", 
      categoryId: "kindergarten",
      categoryTitle: "A Day at the Kindergarten!",
      categoryCover: "Pre-primary school uniforms",
      desc: "Elegantly tailored frocks and pinafores designed for young girls. Combining gentle, hypoallergenic combed cotton blends with Peter Pan collar shirts for effortless classroom comfort.",
      quote: "Gentle comfort for their very first school steps.",
      img: "/images/products/kindergarten_girl_pinafore.jpeg",
      details: "100% Breathable Combed Cotton · Hypoallergenic · Skin-Friendly"
    },
    { 
      title: "Kindergarten Playwear Activity Sets", 
      categoryId: "kindergarten",
      categoryTitle: "A Day at the Kindergarten!",
      categoryCover: "Pre-primary school uniforms",
      desc: "Engineered for joyful discovery, sensory play, and playground energy. Breathable cotton-rich tees paired with soft pull-on skirts and play shorts.",
      quote: "Vibrant, play-ready uniform kits for energetic minds.",
      img: "/images/products/kindergarten_activity_wear.jpeg",
      details: "Reinforced Collar Ribbing · Non-Fade Reactive Dyes · 4-Way Stretch"
    },
    { 
      title: "Kindergarten Plaid Shorts & Shirts", 
      categoryId: "kindergarten",
      categoryTitle: "A Day at the Kindergarten!",
      categoryCover: "Pre-primary school uniforms",
      desc: "Smart, cheerful tailoring for little scholars. Crisp breathable white shirts paired with yarn-dyed tartan plaid shorts featuring an elasticated back waist for all-day ease.",
      quote: "Smart, cheerful tailoring for little scholars.",
      img: "/images/products/kindergarten_boy_shorts.jpeg",
      details: "Yarn-Dyed Plaid Weave · Gentle Elasticated Waist · Spill-Resistant Finish"
    },
    { 
      title: "Primary Girls Flared Pleated Skirts & Shirts", 
      categoryId: "primary",
      categoryTitle: "Make way for the explorers",
      categoryCover: "Primary school uniforms (1st to 5th Standard)",
      desc: "Crisp white tailored shirts paired with flared box-pleat skirts featuring a vibrant contrast accent band. Designed with anti-wrinkle blends that stay neat throughout active school days.",
      quote: "Tailored confidence for energetic young minds.",
      img: "/images/products/primary_girl_skirt_uniform.jpeg",
      details: "Wrinkle-Resistant Poly-Cotton · Contrast Hem Trim · Concealed Zipper & Comfort Waist"
    },
    { 
      title: "Primary Boys Tailored Plaid Shorts & Shirts", 
      categoryId: "primary",
      categoryTitle: "Make way for the explorers",
      categoryCover: "Primary school uniforms (1st to 5th Standard)",
      desc: "Crisp short-sleeve collared shirts paired with yarn-dyed charcoal plaid tailored shorts. Features durable belt loops, functional pockets, and reinforced seam construction for rough-and-tumble playground activities.",
      quote: "Built to endure daily classroom and playground adventures.",
      img: "/images/products/primary_boy_plaid_shorts.jpeg",
      details: "Reinforced Dual-Stitched Twill · Stain-Release Weave · Inner Adjustable Elastic Tab"
    },
    { 
      title: "Secondary Boys Formal Tartan Trousers & Shirts", 
      categoryId: "secondary",
      categoryTitle: "The Clean Slate",
      categoryCover: "Secondary school uniforms (6th to 10th Standard)",
      desc: "Crisp breathable white shirts paired with precision-tailored yarn-dyed tartan plaid trousers. Features permanent front creases, belt loops, and expandable hidden waist adjusters for growing teenage scholars.",
      quote: "Sharp tailoring, structured discipline.",
      img: "/images/products/secondary_boys_plaid_trousers.jpeg",
      details: "Yarn-Dyed Poly-Viscose · Permanent Crease Retention · Deep Functional Pockets"
    },
    { 
      title: "Secondary Girls Tartan Plaid Pinafores & Shirts", 
      categoryId: "secondary",
      categoryTitle: "The Clean Slate",
      categoryCover: "Secondary school uniforms (6th to 10th Standard)",
      desc: "Distinguished V-neck pinafores crafted from rich earthy brown and charcoal checked weaves with front button closures and sharp knife pleats over crisp collared blouses.",
      quote: "Timeless elegance with modern structure.",
      img: "/images/products/secondary_earthy_plaid_pinafore.jpeg",
      details: "Crease-Resistant Woven Plaid · Front Button Fastening · Anti-Static Finish"
    },
    { 
      title: "Senior Earthy Beige Waistcoats & Pleated Skirts", 
      categoryId: "senior",
      categoryTitle: "Earthy Shades",
      categoryCover: "Higher secondary school uniforms (11th & 12th Standard)",
      desc: "Executive tailored earthy beige waistcoats with custom 5th Avenue embroidery, paired with matching knife-pleated skirts and crisp white shirts for senior student leaders.",
      quote: "Sophisticated presence for emerging young leaders.",
      img: "/images/products/senior_earthy_waistcoat_skirt.jpeg",
      details: "Precision Embroidered Monogram · Form-Fitting Tailored Cut · Soil-Release Fabric"
    },
    { 
      title: "Quad-House Chevron Athletic Performance Sets", 
      categoryId: "house",
      categoryTitle: "Up for a Match?",
      categoryCover: "School house uniforms (Courage · Discipline · Harmony · Excellence)",
      desc: "Dynamic color-coded house uniforms featuring vibrant sublimated chevron patterns representing the four school pillars: Courage (Red), Discipline (Yellow), Harmony (Green), and Excellence (Blue). Crafted from breathable micro-mesh performance fabric with contrast navy sleeves, paired with tailored navy athletic track pants with contrast side piping.",
      quote: "Play, learn, grow together — united in house spirit and athletic pride.",
      img: "/images/products/sports_house_quad_chevron.jpeg",
      details: "Dry-Fit Micro-Mesh Poly · Sublimated Fade-Proof Chevron · Navy Contrast Sleeves & Drawstring Pants"
    },
    { 
      title: "Girls Field Sports Performance Raglan & Track Pants", 
      categoryId: "sports",
      categoryTitle: "For the Love of Sports",
      categoryCover: "Sports uniforms (Girls Field Hockey & Athletics)",
      desc: "Girls Play Stronger series. High-visibility yellow performance raglan polo t-shirt with navy contrast sleeves and sublimated dynamic chest chevrons, paired with flexible navy sports track pants engineered for freedom on the court and hockey field.",
      quote: "Empowering young athletes to move faster, play harder, and lead.",
      img: "/images/products/sports_hockey_chevron_girls.jpeg",
      details: "Moisture-Wicking Micro-Pique · Ergonomic Raglan Cut · High-Stretch Athletic Track Pants"
    },
    { 
      title: "Varsity Court Athletic Polo & Track Pants", 
      categoryId: "sports",
      categoryTitle: "For the Love of Sports",
      categoryCover: "Sports uniforms (Basketball & Court Agility)",
      desc: "Vibrant yellow collared athletic polo t-shirt featuring contrast navy sleeve ribbing and side panels, matched with breathable navy track pants with double-piped white side racing stripes for physical education and basketball tournaments.",
      quote: "Dynamic court agility with dry-fit cooling technology.",
      img: "/images/products/sports_basketball_yellow_polo.jpeg",
      details: "Dry-Fit Micro-Mesh Poly · Shape-Retaining Collar · Contrast Side Racing Stripes"
    },
    { 
      title: "Primary Four-House Athletic Pique Polos", 
      categoryId: "house",
      categoryTitle: "Up for a Match?",
      categoryCover: "School house uniforms (Junior Primary 1st to 5th)",
      desc: "Four-color junior house pique polos in vibrant Red, Emerald Green, Royal Blue, and Golden Yellow. Features structured contrast tipping on collars and cuffs, engineered with colorfast dyes that never fade across repeated sports day wash cycles.",
      quote: "Uniting young learners in team spirit, camaraderie, and friendly competition.",
      img: "/images/products/sports_primary_house_quad_polos.jpeg",
      details: "100% Colorfast Reactive Dyes · Breathable Pique Weave · Anti-Chafing Flat Seams"
    },
    { 
      title: "Turf Soccer Aerocool Jersey & Performance Pants", 
      categoryId: "sports",
      categoryTitle: "For the Love of Sports",
      categoryCover: "Sports uniforms (Soccer, Turf & Sprinting)",
      desc: "Ultra-breathable athletic teamwear featuring a dynamic lime green body with contrast white raglan sleeves and ergonomic navy contour side panels. Paired with flexible navy sports track pants with white piping, engineered for maximum movement and aerodynamic speed on turf and track.",
      quote: "Built for agility, endurance, and fearless moves on the field.",
      img: "/images/products/sports_soccer_girl_performance.jpeg",
      details: "Ultra-Light Aerocool Fabric · Ergonomic V-Neck Design · Quick-Drying & Wrinkle-Free"
    },
    { 
      title: "Secondary Athletic Polo & Navy Track Pants", 
      categoryId: "sports",
      categoryTitle: "For the Love of Sports",
      categoryCover: "Sports uniforms (6th to 12th Standard)",
      desc: "Athletic heather grey polo t-shirts with contrast shoulder stripes and school crest, paired with navy performance track pants with white contrast piping.",
      quote: "Athletic agility meets campus pride.",
      img: "/images/products/secondary_athletic_polo_trackpants.jpeg",
      details: "Dry-Fit Micro-Pique · Articulated Knee Panels · Embroidered Crest"
    },
    { 
      title: "Senior Inter-House Raglan Performance Kits", 
      categoryId: "house",
      categoryTitle: "Up for a Match?",
      categoryCover: "School house uniforms (6th to 12th Standard)",
      desc: "Senior student house uniforms in color-coded raglan sleeves (Red, Sky Blue, Yellow, Green) paired with light grey tailored trousers and pleated skirts for house competitions.",
      quote: "Dynamic house identity on sports day and beyond.",
      img: "/images/products/senior_house_raglan_quad.jpeg",
      details: "Colorfast Reactive Dyed Sleeves · Moisture-Wicking Body · Tailored Grey Bottoms"
    },
    { 
      title: "School Bags & Carryalls", 
      categoryId: "accessories",
      categoryTitle: "The Complete School Look",
      categoryCover: "School accessories",
      desc: "Ergonomically designed to distribute weight evenly, our school bags are built with ultra-durable, water-resistant materials to protect books and tech in all conditions.",
      quote: "Durable protection for everyday essentials.",
      img: "/images/products/school_bag_1789884884376.webp",
      details: "Ergonomic Spinal Support · Water-Repellent Nylon · Padded Tech Sleeve"
    },
    { 
      title: "Varsity Heritage Crest Polo Shirts", 
      categoryId: "merchandise",
      categoryTitle: "My School My Pride",
      categoryCover: "School merchandise & campus identity",
      desc: "Celebrate institutional heritage with premium mercerized pique polo shirts. Engineered with shape-retaining non-roll collars, ribbed sleeve cuffs, and custom high-density embroidered school emblems, ideal for faculty, senior scholars, and alumni celebrations.",
      quote: "Wear your institution's heritage with refined everyday pride.",
      img: "/images/products/corporate_polo_tees_1789840388961.webp",
      details: "240 GSM Mercerized Combed Cotton · Anti-Pilling Knit · Custom Crest Embroidery"
    },
    { 
      title: "Residential Dormitory & Campus Athletic Crew Sets", 
      categoryId: "hostel",
      categoryTitle: "Good Dress Equals Good Night!",
      categoryCover: "Hostel uniforms & residential activewear",
      desc: "Crafted for residential scholars and evening campus downtime. Breathable combed cotton raglan t-shirts with athletic two-tone ribbing at collar and cuffs, paired with lightweight lounge shorts for dormitories, hostel study hours, and campus leisure.",
      quote: "Home-like breathability and relaxed campus identity for boarding scholars.",
      img: "/images/products/school_tshirt_1789884872133.webp",
      details: "100% Combed Breathable Cotton · Athletic Raglan Seams · Non-Chafing Comfort"
    },
    { 
      title: "Four-House Inter-House Competition Polos", 
      categoryId: "house",
      categoryTitle: "Up for a Match?",
      categoryCover: "School house uniforms (1st to 5th Standard)",
      desc: "Color-coded house uniforms in Red, Yellow, Blue, and Green with athletic contrast collars. Worn with tailored navy trousers or knife-pleated skirts for spirit rallies and sports meets.",
      quote: "House pride, sportsmanship, and teamwork on display.",
      img: "/images/products/school_house_uniform_quad.jpeg",
      details: "100% Colorfast Reactive Dyes · Breathable Pique Cotton · Structured Contrast Collar"
    },
    { 
      title: "Primary Sports Kits & Athletic Skorts", 
      categoryId: "sports",
      categoryTitle: "For the Love of Sports",
      categoryCover: "Sports uniforms (1st to 5th Standard)",
      desc: "Moisture-wicking sky blue collared polo tees with school crest, paired with athletic track pants and pleated performance skorts with contrast piping for track, court, and soccer field.",
      quote: "Dynamic sportswear built for speed, agility, and sports days.",
      img: "/images/products/primary_sports_pe_uniform.jpeg",
      details: "Micro-Pique Breathable Knit · Dry-Fit Moisture Control · Reinforced Seams"
    }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.categoryId === selectedCategory);

  return (
    <main ref={containerRef} className="bg-[#F8FAFC] text-[#0F172A] relative min-h-screen">
      
      {/* 1. DYNAMIC PARALLAX HERO - Oxford Collegiate Navy & Academic Gold */}
      <section className="school-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E3A8A] text-white">
        
        {/* Floating Editorial Images (100% fully visible with object-contain, no heads cropped) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="parallax-img absolute top-[14%] left-[3%] md:left-[5%] w-44 md:w-72 aspect-[3/4] p-2 bg-white/15 backdrop-blur-md shadow-2xl rounded-2xl border border-white/25 flex items-center justify-center overflow-hidden" data-speed="1.2">
            <img 
              src="/images/products/kindergarten_girl_pinafore.jpeg" 
              className="w-full h-full object-contain" 
              alt="Kindergarten Pinafore" 
            />
          </div>
          <div className="parallax-img absolute top-[40%] right-[3%] md:right-[6%] w-52 md:w-84 aspect-[3/4] p-2 bg-white/15 backdrop-blur-md shadow-2xl rounded-2xl border border-white/25 flex items-center justify-center overflow-hidden" data-speed="0.8">
            <img 
              src="/images/products/kindergarten_activity_wear.jpeg" 
              className="w-full h-full object-contain" 
              alt="Kindergarten Activity Wear" 
            />
          </div>
          <div className="parallax-img absolute top-[70%] left-[16%] md:left-[24%] w-56 md:w-96 aspect-[3/4] p-2 bg-white/15 backdrop-blur-md shadow-2xl rounded-2xl border border-white/25 flex items-center justify-center overflow-hidden" data-speed="1.5">
            <img 
              src="/images/products/kindergarten_boy_shorts.jpeg" 
              className="w-full h-full object-contain" 
              alt="Kindergarten Plaid Shorts" 
            />
          </div>
        </div>

        {/* Massive Editorial Typography */}
        <div className="relative z-10 text-center w-full px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 mb-6 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold font-mono">
              Academy & Campus Uniform Atelier
            </span>
          </div>

          <h1 className="reveal-text font-fmrg-serif flex flex-col items-center justify-center">
             <span className="text-[16vw] md:text-[14vw] leading-[0.85] tracking-tighter uppercase block overflow-hidden text-white drop-shadow-md">
               <SplitText text="SCHOOL" />
             </span>
             <span className="text-[5vw] md:text-[3.8vw] italic lowercase font-light block mt-4 tracking-wide overflow-hidden text-amber-300 font-serif">
               <SplitText text="built for kids." />
             </span>
          </h1>

          <p className="mt-8 max-w-xl mx-auto text-slate-200 font-fmrg-sans text-sm md:text-base leading-relaxed">
            Durable, hypoallergenic, and disciplined school uniforms designed across all 9 academic stages from kindergarten explorations to proud senior house tournaments.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-300 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-slate-300">Explore Lookbook</span>
          <span className="w-px h-8 bg-gradient-to-b from-amber-400 to-transparent animate-pulse"></span>
        </div>
      </section>


      {/* 2. THE SCHOOL LOOKBOOK CATEGORIES SHOWCASE */}
      <section className="py-24 md:py-32 px-8 md:px-14 max-w-[100rem] mx-auto border-b border-slate-200">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-blue-700 text-xs tracking-[0.25em] font-bold uppercase font-mono">
                Curated Range Directory
              </span>
            </div>
            <h2 className="font-fmrg-serif text-3xl md:text-5xl text-slate-900 tracking-tight">
              The School Lookbook
            </h2>
            <p className="font-fmrg-sans text-base md:text-lg text-slate-600 mt-4 leading-relaxed">
              Explore our 9 specialized categories covering every stage of student life — from joyful first steps in kindergarten to proud senior house matches and restful hostel nights.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              09 Dedicated Look Book Ranges
            </span>
          </div>
        </div>

        {/* 9 Look Book Cards Grid */}
        <div className="lookbook-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lookBookCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? "all" : cat.id);
                  document.getElementById("catalog-filter")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`lookbook-card group relative cursor-pointer overflow-hidden rounded-2xl border p-7 md:p-8 transition-all duration-500 flex flex-col justify-between ${
                  isSelected 
                    ? "bg-[#0F172A] text-white border-[#0F172A] shadow-2xl scale-[1.02]" 
                    : "bg-white hover:bg-slate-50/80 text-slate-900 border-slate-200 hover:border-blue-400 hover:shadow-xl"
                }`}
              >
                <div>
                  {/* Top Bar with Number & Highlight Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-mono text-sm tracking-widest font-bold ${isSelected ? "text-amber-400" : "text-blue-600"}`}>
                      {cat.number}
                    </span>
                    <span className={`text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full border ${
                      isSelected 
                        ? "bg-amber-400/20 text-amber-300 border-amber-400/40" 
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {cat.highlight}
                    </span>
                  </div>

                  {/* Category Visual Preview (Full image displayed with object-contain) */}
                  <div className="relative w-full aspect-[16/10] mb-5 overflow-hidden rounded-xl bg-slate-100 border border-slate-200 p-2 flex items-center justify-center">
                    <img 
                      src={cat.img} 
                      alt={cat.title} 
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>

                  {/* Look Book Category Title */}
                  <h3 className={`font-fmrg-serif text-2xl md:text-3xl mb-2 transition-colors ${
                    isSelected ? "text-white" : "group-hover:text-blue-700"
                  }`}>
                    {cat.title}
                  </h3>

                  {/* What it Covers */}
                  <div className="mb-4">
                    <span className={`inline-block text-xs uppercase tracking-wider font-semibold ${
                      isSelected ? "text-amber-300" : "text-blue-700"
                    }`}>
                      ✦ {cat.covers}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`font-fmrg-sans text-sm leading-relaxed mb-6 ${
                    isSelected ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {cat.desc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className={`pt-4 border-t flex items-center justify-between ${isSelected ? "border-slate-800" : "border-slate-100"}`}>
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isSelected ? "text-amber-400 font-semibold" : "text-slate-500 group-hover:text-blue-600"
                  }`}>
                    {isSelected ? "Showing Range Items ✓" : "View Collection Range →"}
                  </span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform group-hover:translate-x-1 ${
                    isSelected ? "bg-amber-400 text-slate-950 font-bold" : "bg-blue-50 text-blue-700"
                  }`}>
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>


      {/* 2.5 SPECIAL ATHLETICS & SPORTS WEAR SHOWCASE */}
      <section className="py-20 md:py-24 px-8 md:px-14 max-w-[100rem] mx-auto border-b border-slate-200 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-blue-700 text-xs tracking-[0.25em] font-bold uppercase font-mono">
                Official School Sports & House Wear
              </span>
            </div>
            <h2 className="font-fmrg-serif text-3xl md:text-5xl text-slate-900 tracking-tight">
              Play · Learn · Grow Together
            </h2>
            <p className="font-fmrg-sans text-base md:text-lg text-slate-600 mt-2 max-w-2xl">
              Engineered with moisture-wicking poly-mesh fabrics, vibrant sublimated chevrons, and flexible track pants for school houses, athletics meets, and campus tournaments.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setSelectedCategory("sports");
                document.getElementById("catalog-filter")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-blue-700 text-white hover:bg-blue-800 transition-all shadow-md"
            >
              Filter Sports Wear Range →
            </button>
            <button
              onClick={() => {
                setSelectedCategory("house");
                document.getElementById("catalog-filter")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md"
            >
              Filter House Kits →
            </button>
          </div>
        </div>

        {/* 5-Card High Impact Visual Strip (Full image visible with object-contain) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            {
              title: "Quad-House Chevron Kits",
              subtitle: "Courage · Discipline · Harmony · Excellence",
              img: "/images/products/sports_house_quad_chevron.jpeg",
              tag: "Inter-House",
              catId: "house"
            },
            {
              title: "Girls Field Hockey Wear",
              subtitle: "Girls Play Stronger Series",
              img: "/images/products/sports_hockey_chevron_girls.jpeg",
              tag: "Field Sports",
              catId: "sports"
            },
            {
              title: "Varsity Court Polos",
              subtitle: "Basketball & Court Agility",
              img: "/images/products/sports_basketball_yellow_polo.jpeg",
              tag: "Court & PE",
              catId: "sports"
            },
            {
              title: "Primary 4-House Polos",
              subtitle: "Classic Pique House Colors",
              img: "/images/products/sports_primary_house_quad_polos.jpeg",
              tag: "Junior House",
              catId: "house"
            },
            {
              title: "Turf Soccer Performance",
              subtitle: "Aerocool V-Neck & Track Pants",
              img: "/images/products/sports_soccer_girl_performance.jpeg",
              tag: "Soccer & Sprint",
              catId: "sports"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedCategory(item.catId);
                document.getElementById("catalog-filter")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col p-3"
            >
              <div className="aspect-[3/4] overflow-hidden relative rounded-xl bg-slate-50 flex items-center justify-center p-2">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                  {item.tag}
                </span>
              </div>
              <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-fmrg-serif text-base text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-600 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View in Catalog →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. INTERACTIVE CATEGORY FILTER BAR */}
      <section id="catalog-filter" className="sticky top-20 z-30 bg-[#F8FAFC]/95 backdrop-blur-md py-4 px-8 md:px-14 border-b border-slate-200">
        <div className="max-w-[100rem] mx-auto flex items-center justify-between gap-4 overflow-x-auto hide-scrollbar">
          
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mr-2 hidden sm:inline">
              Filter Range:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-700 text-white shadow-md font-semibold"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All Ranges ({products.length})
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar shrink-0">
            {lookBookCategories.map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    active
                      ? "bg-blue-700 text-white shadow-md font-semibold"
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-amber-400" : "bg-slate-300"}`}></span>
                  {c.title}
                </button>
              );
            })}
          </div>

        </div>
      </section>


      {/* 4. PRODUCT LISTING WITH FULL IMAGE VIEW (object-contain, exact ratio) */}
      <div className="max-w-[100rem] mx-auto pt-20 pb-32 px-8 md:px-14">
        
        {/* Active Range Notice */}
        {selectedCategory !== "all" && (
          <div className="mb-16 p-6 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-blue-700 block mb-1">
                Currently Viewing Range:
              </span>
              <h3 className="font-fmrg-serif text-2xl text-slate-900">
                {lookBookCategories.find(c => c.id === selectedCategory)?.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                What it covers: <strong className="text-slate-900">{lookBookCategories.find(c => c.id === selectedCategory)?.covers}</strong>
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-xs uppercase tracking-wider font-semibold text-blue-700 hover:underline self-start sm:self-center"
            >
              Clear Filter (View All) ✕
            </button>
          </div>
        )}

        <div className="flex flex-col gap-28 md:gap-36">
          {filteredProducts.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`product-section flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                
                {/* Text Content */}
                <div className="flex-1 w-full flex flex-col justify-center">
                  
                  {/* Category Pill Tag */}
                  <div className="product-reveal flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                      Lookbook: {p.categoryTitle}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-mono">
                      {p.categoryCover}
                    </span>
                  </div>

                  <h2 className="product-title font-fmrg-serif text-3xl md:text-5xl mb-5 leading-tight text-slate-900">
                    <SplitText text={p.title} />
                  </h2>
                  
                  <div className="product-reveal mb-6 pl-5 border-l-2 border-blue-600 bg-blue-50/60 py-3 pr-4 rounded-r-lg">
                    <p className="font-fmrg-serif text-lg md:text-2xl text-slate-800 italic leading-snug">
                      "{p.quote}"
                    </p>
                  </div>
                  
                  <p className="product-reveal font-fmrg-sans text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
                    {p.desc}
                  </p>

                  {/* Craftsmanship Specs */}
                  <div className="product-reveal flex flex-col sm:flex-row sm:items-center gap-2 pt-4 border-t border-slate-200 mb-6">
                    <span className="text-xs uppercase tracking-wider text-blue-700 font-bold shrink-0">Specifications:</span>
                    <span className="text-xs text-slate-600 font-sans">{p.details}</span>
                  </div>

                  <div className="product-reveal flex items-center gap-4">
                    <Link
                      href="/contact"
                      className="px-6 py-2.5 rounded-full bg-blue-700 hover:bg-blue-600 text-white font-fmrg-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <span>Request School Sample</span>
                      <span>→</span>
                    </Link>
                  </div>

                </div>

                {/* Image Content (100% Fully Shown with object-contain, No Heads Cropped) */}
                <div className="w-full lg:w-5/12 aspect-[3/4] md:aspect-[4/5] relative overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200 p-4 flex items-center justify-center group">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="product-image w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] uppercase tracking-wider border border-white/20">
                    {p.categoryCover}
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>

        {/* Footer Contact Callout (Oxford Collegiate Navy & Varsity Gold) */}
        <div className="mt-32 p-12 md:p-16 rounded-2xl bg-[#0F172A] border border-blue-900/60 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold block mb-2 font-mono">
              Institutional Inquiries & Samples
            </span>
            <h3 className="font-fmrg-serif text-3xl md:text-5xl text-white">
              Equip Your School With 5th Avenue.
            </h3>
            <p className="text-slate-300 mt-2 max-w-xl text-base">
              Custom embroidery, Pantone fabric matching, and bulk institutional sizing across all 9 Look Book categories.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full font-fmrg-sans text-xs uppercase tracking-widest font-bold transition-all shrink-0 shadow-xl"
          >
            Request Institutional Catalog →
          </Link>
        </div>

      </div>

    </main>
  );
}
