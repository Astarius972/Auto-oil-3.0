"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AutoOilLogo } from "../icons";
import { HEADER_NAV_LINKS, headerStyles } from "./header-navigation-data";

export function MainHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <Link
          href="/"
          aria-label="Авто Ойл нүүр хуудас"
          className="shrink-0 rounded-lg"
        >
          <AutoOilLogo />
        </Link>

        <nav className={headerStyles.nav} aria-label="Үндсэн цэс">
          {HEADER_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`${headerStyles.link} ${
                isActive(link.href) ? headerStyles.linkActive : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={isMenuOpen ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/10 bg-[#1d3f9e] transition-[max-height,opacity] duration-300 lg:hidden ${
          isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-3" aria-label="Гар утасны цэс">
          {HEADER_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-4 py-3 text-sm font-semibold tracking-wide transition-colors ${
                isActive(link.href)
                  ? "bg-white/15 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
