"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {/* @ts-expect-error Bypass React 18/19 Node mismatch from Lenis */}
      {children}
    </ReactLenis>
  );
}
