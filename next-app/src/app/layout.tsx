import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "5th Avenue | A Uniform Brand",
  description: "Premium professional uniform solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-fmrg-sans`}>
        <Preloader />
        <LenisProvider>
            <Navigation />
            
            {children}

            {/* FMRG Style Minimal Footer */}
            <footer className="bg-fmrg-text text-fmrg-bg py-24 px-8 md:px-12 flex flex-col md:flex-row justify-between items-end">
              <div className="mb-16 md:mb-0">
                <h2 className="font-fmrg-serif text-5xl md:text-7xl mb-4">5th Avenue.</h2>
                <p className="fmrg-nav-link text-gray-400">A Uniform Brand &copy; 2026</p>
              </div>
              
              <div className="flex gap-16 md:gap-32 fmrg-nav-link text-gray-400">
                <div className="flex flex-col gap-4">
                  <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                  <a href="mailto:5thavenueuniforms@gmail.com" className="hover:text-white transition-colors">Email</a>
                </div>
                <div className="flex flex-col gap-4">
                  <span>Coimbatore, India</span>
                  <span>+91 97900 03637</span>
                </div>
              </div>
            </footer>
        </LenisProvider>
      </body>
    </html>
  );
}
