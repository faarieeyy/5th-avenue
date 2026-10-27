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
    // Refresh ScrollTrigger after DOM updates
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
      color: "#8C5229"
    },
    {
      id: "primary",
      number: "02",
      title: "Make way for the explorers",
      covers: "Primary school uniforms (1st to 5th Standard)",
      desc: "Designed for Class 1 to 5 students. Heavy-duty reinforced stitching, stain-resistant fabrics, and smart comfort tailored for young explorers.",
      highlight: "Classes 1 – 5",
      img: "/images/products/primary_girl_skirt_uniform.jpeg",
      color: "#7C4A27"
    },
    {
      id: "secondary",
      number: "03",
      title: "The Clean Slate",
      covers: "Secondary school uniforms (6th to 10th Standard)",
      desc: "A transition toward mature discipline. Crisp anti-wrinkle shirts, permanently pressed knife-pleats, and structured tartan trousers.",
      highlight: "Classes 6 – 10",
      img: "/images/products/secondary_boys_plaid_trousers.jpeg",
      color: "#163E32"
    },
    {
      id: "senior",
      number: "04",
      title: "Earthy Shades",
      covers: "Higher secondary school uniforms (11th & 12th Standard)",
      desc: "Refined, executive cuts in rich earth-toned fabrics, custom-embroidered beige waistcoats, and knife-pleated skirts for senior scholars.",
      highlight: "Classes 11 & 12",
      img: "/images/products/senior_earthy_waistcoat_skirt.jpeg",
      color: "#6B4C35"
    },
    {
      id: "accessories",
      number: "05",
      title: "The Complete School Look",
      covers: "School accessories",
      desc: "Ergonomic spinal-support school bags, jacquard crest ties, embossed leather belts, and cotton socks completing the uniform.",
      highlight: "Gear & Accessories",
      img: "/images/products/school_bag_1789884884376.webp",
      color: "#3D4852"
    },
    {
      id: "merchandise",
      number: "06",
      title: "My School My Pride",
      covers: "School merchandise",
      desc: "Celebrate school spirit with varsity jackets, heavyweight brushed hoodies, custom crest caps, and alumni celebration apparel.",
      highlight: "Campus Identity",
      img: "/images/products/corporate_polo_tees_1789840388961.webp",
      color: "#523B2D"
    },
    {
      id: "hostel",
      number: "07",
      title: "Good Dress Equals Good Night!",
      covers: "Hostel uniforms & cozy nightwear",
      desc: "Cozy, breathable 100% natural cotton pajama sets and evening lounge wear ensuring restful sleep and comfort in student dormitories.",
      highlight: "Residential & Boarding",
      img: "/images/products/school_tshirt_1789884872133.webp",
      color: "#3A4D45"
    },
    {
      id: "house",
      number: "08",
      title: "Up for a Match?",
      covers: "School house uniforms",
      desc: "Vibrant colorfast house polo tees, matching athletic shorts, and competition sashes uniting students under their house colors.",
      highlight: "Inter-House Pride",
      img: "/images/products/sports_house_quad_chevron.jpeg",
      color: "#854F28"
    },
    {
      id: "sports",
      number: "09",
      title: "For the Love of Sports",
      covers: "Sports uniforms",
      desc: "High-performance moisture-wicking jerseys and 4-way articulated knee track pants engineered for speed, agility, and sports days.",
      highlight: "Athletics & PE",
      img: "/images/products/sports_hockey_chevron_girls.jpeg",
      color: "#1E3B2E"
    }
  ];

  // Comprehensive Product Catalog mapped to Look Book Categories
  const products = [
    { 
      title: "Kindergarten Pleated Pinafores & Frocks", 
      categoryId: "kindergarten",
      categoryTitle: "A Day at the Kindergarten!",
      categoryCover: "Pre-primary school uniforms",
      desc: "Elegantly tailored frocks and pinafores designed for young girls. Combining gentle, hypoallergenic cotton blends with Peter Pan collar shirts for effortless classroom comfort.",
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
      desc: "High-performance sports uniform engineered specifically for field hockey, track & field, and team sports. Features a sunset-gradient multi-tone chevron graphic with navy raglan sleeves and breathable underarm panels, paired with flexible performance navy track pants designed for swift sprints and agile footwork.",
      quote: "Discipline builds brighter tomorrows — empowering young athletes on every turf.",
      img: "/images/products/sports_hockey_chevron_girls.jpeg",
      details: "High-Ventilation Mesh Body · Anti-Chafe Raglan Cut · 4-Way Stretch Ankle Zips"
    },
    { 
      title: "Varsity Court Polo & Navy Athletic Track Pants", 
      categoryId: "sports",
      categoryTitle: "For the Love of Sports",
      categoryCover: "Sports uniforms (Court Sports & PE)",
      desc: "Vibrant golden-sun performance sports polo shirt featuring a reinforced flat-knit collar, 2-button placket, and embroidered school crest, paired with athletic navy track pants featuring contrast white side piping. Designed for court agility across basketball, tennis, badminton, and daily physical training.",
      quote: "Dynamic court presence engineered for speed, comfort, and everyday agility.",
      img: "/images/products/sports_basketball_yellow_polo.jpeg",
      details: "Breathable Honeycomb Pique · Ribbed Lay-Flat Collar · Heavy-Duty Contrast Piping"
    },
    { 
      title: "Primary Four-House Sports Polos & Athletic Shorts", 
      categoryId: "house",
      categoryTitle: "Up for a Match?",
      categoryCover: "School house uniforms (Primary 1st to 5th Standard)",
      desc: "Classic four-house athletic kits featuring color-fast pique polos in Royal Blue, Canary Yellow, Scarlet Red, and Emerald Green with custom embroidered Perks Public School crests. Paired with comfortable, hard-wearing navy athletic shorts tailored for active young athletes.",
      quote: "Instilling camaraderie, sportsmanship, and house pride from day one.",
      img: "/images/products/sports_primary_house_quad_polos.jpeg",
      details: "100% Colorfast Reactive Dyes · Reinforced Button Placket · Dual-Pocket Athletic Shorts"
    },
    { 
      title: "Turf Soccer & Athletics V-Neck Performance Jersey", 
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
    <main ref={containerRef} className="bg-[var(--color-fmrg-bg)] text-[var(--color-fmrg-text)] relative min-h-screen">
      
      {/* 1. DYNAMIC PARALLAX HERO */}
      <section className="school-hero relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAF8F5]">
        
        {/* Floating Editorial Images */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img src="/images/products/kindergarten_girl_pinafore.jpeg" className="parallax-img absolute top-[18%] left-[2%] md:left-[5%] w-48 md:w-80 aspect-[3/4] object-cover opacity-90 shadow-2xl rounded-sm" data-speed="1.2" alt="Kindergarten Pinafore" />
          <img src="/images/products/kindergarten_activity_wear.jpeg" className="parallax-img absolute top-[38%] right-[2%] md:right-[5%] w-56 md:w-96 aspect-[3/4] object-cover opacity-90 shadow-2xl rounded-sm" data-speed="0.8" alt="Kindergarten Activity Wear" />
          <img src="/images/products/kindergarten_boy_shorts.jpeg" className="parallax-img absolute top-[72%] left-[15%] md:left-[25%] w-64 md:w-[30rem] aspect-[4/5] object-cover opacity-90 shadow-2xl rounded-sm" data-speed="1.5" alt="Kindergarten Plaid Shorts" />
        </div>

        {/* Massive Editorial Typography */}
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

        {/* Subtle Scroll Down Prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white mix-blend-difference pointer-events-none">
          <span className="text-[11px] uppercase tracking-[0.2em] opacity-70">Explore Lookbook</span>
          <span className="w-px h-8 bg-white/50 animate-pulse"></span>
        </div>
      </section>


      {/* 2. THE SCHOOL LOOKBOOK CATEGORIES SHOWCASE (User's Exact Categorization Table) */}
      <section className="py-24 md:py-32 px-8 md:px-14 max-w-[100rem] mx-auto border-b border-black/10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-fmrg-accent)]"></span>
              <span className="fmrg-nav-link text-[var(--color-fmrg-accent)] text-xs tracking-[0.25em] font-semibold uppercase">
                Curated Range Directory
              </span>
            </div>
            <h2 className="font-fmrg-serif text-4xl md:text-6xl text-[var(--color-fmrg-text)] tracking-tight">
              The School Lookbook
            </h2>
            <p className="font-fmrg-sans text-lg md:text-xl text-[var(--color-fmrg-muted)] mt-4 leading-relaxed">
              Explore our 9 specialized categories covering every stage of student life — from joyful first steps in kindergarten to proud senior house matches and restful hostel nights.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs uppercase tracking-widest text-[var(--color-fmrg-muted)] font-mono">
              09 Dedicated Look Book Ranges
            </span>
          </div>
        </div>

        {/* 9 Look Book Cards Grid */}
        <div className="lookbook-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lookBookCategories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? "all" : cat.id);
                  document.getElementById("catalog-filter")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`lookbook-card group relative cursor-pointer overflow-hidden rounded-xl border p-7 md:p-8 transition-all duration-500 flex flex-col justify-between ${
                  isSelected 
                    ? "bg-[#3B2212] text-white border-[#3B2212] shadow-2xl scale-[1.02]" 
                    : "bg-white hover:bg-[#FAF6F0] text-[var(--color-fmrg-text)] border-black/10 hover:border-[#7C4A27]/40 hover:shadow-xl"
                }`}
              >
                <div>
                  {/* Top Bar with Number & Highlight Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-mono text-sm tracking-widest font-bold ${isSelected ? "text-[var(--color-fmrg-highlight)]" : "text-[var(--color-fmrg-accent)]"}`}>
                      {cat.number}
                    </span>
                    <span className={`text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full border ${
                      isSelected 
                        ? "bg-white/10 text-white border-white/20" 
                        : "bg-[#7C4A27]/10 text-[#7C4A27] border-[#7C4A27]/20"
                    }`}>
                      {cat.highlight}
                    </span>
                  </div>

                  {/* Category Visual Preview */}
                  <div className="relative w-full aspect-[16/10] mb-5 overflow-hidden rounded-lg bg-black/5 shadow-inner">
                    <img 
                      src={cat.img} 
                      alt={cat.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Look Book Category Title */}
                  <h3 className={`font-fmrg-serif text-2xl md:text-3xl mb-2 transition-colors ${
                    isSelected ? "text-white" : "group-hover:text-[var(--color-fmrg-accent)]"
                  }`}>
                    {cat.title}
                  </h3>

                  {/* What it Covers */}
                  <div className="mb-4">
                    <span className={`inline-block text-xs uppercase tracking-wider font-semibold ${
                      isSelected ? "text-amber-200/90" : "text-[#7C4A27]"
                    }`}>
                      ✦ {cat.covers}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`font-fmrg-sans text-sm leading-relaxed mb-6 ${
                    isSelected ? "text-white/80" : "text-gray-600"
                  }`}>
                    {cat.desc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className={`text-xs font-medium uppercase tracking-wider ${
                    isSelected ? "text-[var(--color-fmrg-highlight)]" : "text-gray-500 group-hover:text-[var(--color-fmrg-accent)]"
                  }`}>
                    {isSelected ? "Showing Range Items ✓" : "View Collection Range →"}
                  </span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform group-hover:translate-x-1 ${
                    isSelected ? "bg-white text-black" : "bg-black/5 text-gray-700"
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
      <section className="py-20 md:py-24 px-8 md:px-14 max-w-[100rem] mx-auto border-b border-black/10 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6]/60 to-[#FAF8F5]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E3B2E]"></span>
              <span className="text-[#1E3B2E] text-xs tracking-[0.25em] font-semibold uppercase font-fmrg-sans">
                Official School Sports & House Wear
              </span>
            </div>
            <h2 className="font-fmrg-serif text-3xl md:text-5xl text-[var(--color-fmrg-text)] tracking-tight">
              Play · Learn · Grow Together
            </h2>
            <p className="font-fmrg-sans text-base md:text-lg text-[var(--color-fmrg-muted)] mt-2 max-w-2xl">
              Engineered with moisture-wicking poly-mesh fabrics, vibrant sublimated chevrons, and flexible track pants for school houses, athletics meets, and campus tournaments.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setSelectedCategory("sports");
                document.getElementById("catalog-filter")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#1E3B2E] text-white hover:bg-[#2A5240] transition-all shadow-md"
            >
              Filter Sports Wear Range →
            </button>
            <button
              onClick={() => {
                setSelectedCategory("house");
                document.getElementById("catalog-filter")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#7C4A27] text-white hover:bg-[#8F562E] transition-all shadow-md"
            >
              Filter House Kits →
            </button>
          </div>
        </div>

        {/* 5-Card High Impact Visual Strip */}
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
              className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-black/10 hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-gray-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/70 backdrop-blur-md text-white border border-white/20">
                  {item.tag}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h4 className="font-fmrg-serif text-base text-gray-900 group-hover:text-[var(--color-fmrg-accent)] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-fmrg-accent)] mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View in Catalog →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. INTERACTIVE CATEGORY FILTER BAR */}
      <section id="catalog-filter" className="sticky top-20 z-30 bg-[#FAF8F5]/90 backdrop-blur-md py-4 px-8 md:px-14 border-b border-black/10">
        <div className="max-w-[100rem] mx-auto flex items-center justify-between gap-4 overflow-x-auto hide-scrollbar">
          
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs uppercase tracking-widest text-[var(--color-fmrg-muted)] font-semibold mr-2 hidden sm:inline">
              Filter Range:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#7C4A27] text-white shadow-md font-semibold"
                  : "bg-white/80 text-gray-700 hover:bg-gray-100 border border-black/10"
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
                      ? "bg-[#7C4A27] text-white shadow-md font-semibold"
                      : "bg-white/70 text-gray-600 hover:bg-white hover:text-black border border-black/5"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-amber-300" : "bg-gray-400"}`}></span>
                  {c.title}
                </button>
              );
            })}
          </div>

        </div>
      </section>


      {/* 4. PRODUCT LISTING WITH LOOKBOOK DETAILS */}
      <div className="max-w-[100rem] mx-auto pt-20 pb-32 px-8 md:px-14">
        
        {/* Active Range Notice */}
        {selectedCategory !== "all" && (
          <div className="mb-16 p-6 rounded-xl bg-[#FAF5EE] border border-[#7C4A27]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7C4A27] block mb-1">
                Currently Viewing Range:
              </span>
              <h3 className="font-fmrg-serif text-2xl text-[var(--color-fmrg-text)]">
                {lookBookCategories.find(c => c.id === selectedCategory)?.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                What it covers: <strong className="text-black">{lookBookCategories.find(c => c.id === selectedCategory)?.covers}</strong>
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-xs uppercase tracking-wider font-semibold text-[#7C4A27] hover:underline self-start sm:self-center"
            >
              Clear Filter (View All) ✕
            </button>
          </div>
        )}

        <div className="flex flex-col gap-28 md:gap-40">
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
                    <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-[#7C4A27]/10 text-[#7C4A27] border border-[#7C4A27]/25">
                      Lookbook: {p.categoryTitle}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-mono">
                      {p.categoryCover}
                    </span>
                  </div>

                  <h2 className="product-title font-fmrg-serif text-4xl md:text-6xl mb-6 leading-tight">
                    <SplitText text={p.title} />
                  </h2>
                  
                  <div className="product-reveal mb-6 pl-5 border-l-2 border-[#7C4A27] bg-[#FAF5EE] py-3 pr-4 rounded-r-lg">
                    <p className="font-fmrg-serif text-xl md:text-2xl text-[#3B2212] italic leading-snug">
                      "{p.quote}"
                    </p>
                  </div>
                  
                  <p className="product-reveal font-fmrg-sans text-lg text-gray-600 leading-relaxed max-w-2xl mb-6">
                    {p.desc}
                  </p>

                  {/* Craftsmanship Specs */}
                  <div className="product-reveal flex items-center gap-2 pt-4 border-t border-black/10">
                    <span className="text-xs uppercase tracking-wider text-[var(--color-fmrg-accent)] font-semibold">Specifications:</span>
                    <span className="text-xs text-gray-500 font-sans">{p.details}</span>
                  </div>

                </div>

                {/* Image Content */}
                <div className="w-full lg:w-2/5 aspect-[4/5] relative overflow-hidden bg-gray-200 rounded-sm shadow-2xl group">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="product-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] uppercase tracking-wider border border-white/15">
                    {p.categoryCover}
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>

        {/* Footer Contact Callout */}
        <div className="mt-32 p-12 md:p-16 rounded-2xl bg-[#341B0D] border border-[#7C4A27]/40 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold block mb-2 font-mono">
              Institutional Inquiries & Samples
            </span>
            <h3 className="font-fmrg-serif text-3xl md:text-5xl text-amber-50">
              Equip Your School With 5th Avenue.
            </h3>
            <p className="text-amber-100/80 mt-2 max-w-xl text-base">
              Custom embroidery, Pantone fabric matching, and bulk institutional sizing across all 9 Look Book categories.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#7C4A27] hover:bg-[#8F562E] text-white rounded-full font-fmrg-sans text-xs uppercase tracking-widest font-semibold transition-all shrink-0 shadow-lg"
          >
            Request Institutional Catalog →
          </Link>
        </div>

      </div>

    </main>
  );
}
