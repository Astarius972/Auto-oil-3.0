import React from "react";
import { CircularTestimonialsDemo } from "./components/Testimonials";
import { NavigationHub } from "./components/cards/navigation-hub";
import { MainHeader } from "./components/cards/main-header";
import Footer from "./components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      <MainHeader />

      <main className="relative overflow-hidden min-h-[calc(100vh-140px)] flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <CircularTestimonialsDemo />
        </div>

        <NavigationHub />
      </main>

      <Footer />
    </div>
  );
}
