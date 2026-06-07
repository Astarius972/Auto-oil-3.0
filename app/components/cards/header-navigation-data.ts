export interface HeaderNavLink {
  label: string;
  href: string;
}

export const HEADER_NAV_LINKS: HeaderNavLink[] = [
  { label: "БИДНИЙ ТУХАЙ", href: "/about" },
  { label: "САЛБАРЫН БАЙРШИЛ", href: "/branch" },
  { label: "БАРАА БҮТЭЭГДЭХҮҮН", href: "/products" },
  { label: "АЖЛЫН БАЙР", href: "/jobs" },
  { label: "ХОЛБОО БАРИХ", href: "/contact" },
];

export const headerStyles = {
  header: "w-full bg-[#2248b3] shadow-md",
  container: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between",
  nav: "hidden md:flex items-center gap-8 text-[13px] font-semibold tracking-wide text-white/80",
  link: "hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all",
};
