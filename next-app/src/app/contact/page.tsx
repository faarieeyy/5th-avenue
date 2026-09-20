"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "@/components/SplitText";

export default function Contact() {
  
  useGSAP(() => {
    gsap.to(".contact-reveal .split-char", {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out"
    });

    gsap.fromTo(".fade-up", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.3 }
    );
  });

  return (
    <main className="min-h-screen bg-[var(--color-fmrg-bg)] text-[var(--color-fmrg-text)] pt-48 pb-24 px-8 md:px-12 flex flex-col justify-between">
      
      <div className="max-w-[100rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Left Side: Massive Typography & Info */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="contact-reveal font-fmrg-serif text-6xl md:text-[8rem] leading-[0.9] tracking-tight mb-12">
              <SplitText text="Let's build" className="block" />
              <SplitText text="your identity." className="block text-[var(--color-fmrg-accent)]" />
            </h1>
            <p className="fade-up font-fmrg-sans text-xl md:text-2xl text-gray-500 max-w-md leading-relaxed">
              Whether you need 50 uniforms or 50,000, we provide premium manufacturing and custom branding tailored to your organization.
            </p>
          </div>

          <div className="fade-up grid grid-cols-2 gap-12 mt-24">
            <div>
              <span className="fmrg-nav-link text-gray-400 block mb-4">Location</span>
              <p className="font-fmrg-sans text-lg leading-relaxed">
                Coimbatore,<br/>
                Tamil Nadu, India
              </p>
            </div>
            <div>
              <span className="fmrg-nav-link text-gray-400 block mb-4">Direct Connect</span>
              <a href="tel:+919790003637" className="font-fmrg-sans text-lg block hover:text-[var(--color-fmrg-accent)] transition-colors mb-2">+91 97900 03637</a>
              <a href="mailto:5thavenueuniforms@gmail.com" className="font-fmrg-sans text-lg block hover:text-[var(--color-fmrg-accent)] transition-colors">5thavenueuniforms@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Right Side: Minimal FMRG Form */}
        <div className="fade-up bg-white p-8 md:p-16 border border-black/10 shadow-sm flex flex-col justify-center">
          <form className="flex flex-col gap-12">
            
            <div className="flex flex-col gap-4 relative group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="border-b border-gray-300 py-4 bg-transparent text-xl font-medium focus:outline-none focus:border-[var(--color-fmrg-accent)] transition-colors rounded-none placeholder:text-gray-200"
              />
            </div>

            <div className="flex flex-col gap-4 relative group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Organization</label>
              <input 
                type="text" 
                placeholder="School / Hospital / Company Name"
                className="border-b border-gray-300 py-4 bg-transparent text-xl font-medium focus:outline-none focus:border-[var(--color-fmrg-accent)] transition-colors rounded-none placeholder:text-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-4 relative group">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Email Address</label>
                <input 
                  type="email" 
                  placeholder="hello@example.com"
                  className="border-b border-gray-300 py-4 bg-transparent text-xl font-medium focus:outline-none focus:border-[var(--color-fmrg-accent)] transition-colors rounded-none placeholder:text-gray-200"
                />
              </div>

              <div className="flex flex-col gap-4 relative group">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91"
                  className="border-b border-gray-300 py-4 bg-transparent text-xl font-medium focus:outline-none focus:border-[var(--color-fmrg-accent)] transition-colors rounded-none placeholder:text-gray-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Uniform Category</label>
              <select defaultValue="" className="border-b border-gray-300 py-4 bg-transparent text-xl font-medium focus:outline-none focus:border-[var(--color-fmrg-accent)] transition-colors rounded-none cursor-pointer">
                <option value="" disabled>Select an option</option>
                <option value="school">School Uniforms</option>
                <option value="healthcare">Healthcare Uniforms</option>
                <option value="corporate">Corporate Work Wear</option>
              </select>
            </div>

            <div className="flex flex-col gap-4 relative group mt-4">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">Estimated Quantity</label>
              <input 
                type="number" 
                placeholder="e.g. 500"
                className="border-b border-gray-300 py-4 bg-transparent text-xl font-medium focus:outline-none focus:border-[var(--color-fmrg-accent)] transition-colors rounded-none placeholder:text-gray-200"
              />
            </div>

            <button 
              type="button"
              className="mt-8 bg-[var(--color-fmrg-text)] text-[var(--color-fmrg-bg)] py-6 text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-fmrg-accent)] transition-colors"
            >
              Submit Inquiry
            </button>
            
          </form>
        </div>

      </div>
    </main>
  );
}
