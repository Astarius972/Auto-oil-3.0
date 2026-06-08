export interface HeaderNavLink {
  label: string;
  href: string;
}

export const HEADER_NAV_LINKS: HeaderNavLink[] = [
  { label: "БИДНИЙ ТУХАЙ", href: "/about" },
  { label: "САЛБАРЫН БАЙРШИЛ", href: "/branch" },
  { label: "БАРАА БҮТЭЭГДЭХҮҮН", href: "/products" },
  { label: "ХУДАЛДАН АВАЛТ", href: "/procurement" },
  { label: "БРЭНДҮҮД", href: "/brand" },
  { label: "АЖЛЫН БАЙР", href: "/jobs" },
  { label: "ХОЛБОО БАРИХ", href: "/contact" },
];

export const headerStyles = {
  header:
    "sticky top-10 z-40 w-full border-b border-white/10 bg-[#2248b3]/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-[#2248b3]/90",
  container:
    "container-page flex items-center justify-between gap-4 py-3.5",
  nav: "hidden items-center gap-1 lg:flex",
  link: "relative rounded-lg px-3 py-2 text-[13px] font-semibold tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white",
  linkActive: "bg-white/15 text-white",
};
