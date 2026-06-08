import { Globe, Mail, Phone } from "lucide-react";
import React from "react";

export interface TopBarContact {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TOP_BAR_CONTACTS: TopBarContact[] = [
  { href: "tel:70070088", label: "70070088", icon: Phone },
  { href: "mailto:info@auto-oil.mn", label: "info@auto-oil.mn", icon: Mail },
];

export const topBarStyles = {
  bar: "sticky top-0 z-50 border-b border-white/10 bg-[#070b14] text-xs text-slate-300",
  container: "container-page flex h-10 items-center justify-between",
  contacts: "flex items-center gap-4 sm:gap-6",
  contactLink:
    "flex items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors hover:text-blue-300",
  langButton:
    "flex items-center gap-1.5 rounded-md px-2 py-0.5 font-medium transition-colors hover:bg-white/10 hover:text-white",
  icon: "h-3.5 w-3.5",
};
