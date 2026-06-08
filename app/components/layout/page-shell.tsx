import type { ReactNode } from "react";
import { MainHeader } from "../cards/main-header";
import { TopBar } from "../cards/top-bar";
import Footer from "../footer";

interface PageShellProps {
  children: ReactNode;
  /** When false, children render full-bleed without the centered container. */
  contained?: boolean;
  className?: string;
}

export function PageShell({
  children,
  contained = true,
  className = "",
}: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-brand/20">
      <TopBar />
      <MainHeader />
      <main className={`flex-1 ${className}`}>
        {contained ? (
          <div className="container-page py-8 sm:py-10 lg:py-12">{children}</div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
}
