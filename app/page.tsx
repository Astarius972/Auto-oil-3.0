import React from "react";
import { CircularTestimonialsDemo } from "./components/Testimonials";
import { NavigationHub } from "./components/cards/navigation-hub";
import { MainHeader } from "./components/cards/main-header";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="page-home flex min-h-dvh flex-col overflow-x-clip bg-slate-950 text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <MainHeader />

      <main className="relative flex min-h-[calc(100dvh-var(--header-height))] flex-1 flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <CircularTestimonialsDemo />
        </div>

        <NavigationHub />
      </main>

      <Footer />
    </div>
  );
}
