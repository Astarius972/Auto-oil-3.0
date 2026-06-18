  export interface HeaderNavLink {
    label: string;
    href: string;
  }

  // Үгсийг нэг мөрөнд шахцалдахгүй, цэвэрхэн багтаах үүднээс богиносгов
  export const HEADER_NAV_LINKS: HeaderNavLink[] = [
    { label: "ТУХАЙ", href: "/about" },
    { label: "БАЙРШИЛ", href: "/branch" },
    { label: "БҮТЭЭГДЭХҮҮН", href: "/products" },
    { label: "ХУДАЛДАН АВАЛТ", href: "/procurement" },
    { label: "БРЭНДҮҮД", href: "/brand" },
    { label: "АЖЛЫН БАЙР", href: "/jobs" },
    { label: "ХОЛБОО БАРИХ", href: "/contact" },
  ];
  
    export const headerStyles = {
      // 1. Брэндийн гүн цэнхэр өнгө (bg-[#1a3e75]/90) дээр цэвэрхэн blur + доод талын нарийн цагаан шугам
      header:
        "fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#1a3e75]/90 backdrop-blur-md shadow-md transition-all duration-300",
      
      container:
        "container-page flex items-center justify-between gap-6 py-4 px-8 mx-auto",
      
      nav: "hidden items-center gap-1 lg:flex",
      
      // 2. Цэвэрхэн Slide-in Underline hover эффект нэмэв.
      // "after:" ашиглан хулганаа хүргэхэд дундаас нь эсвэл зүүнээс нь нарийн цагаан зураас сунаж гарч ирнэ.
      link: "relative px-3 py-1.5 text-[12px] font-normal tracking-widest text-white/70 uppercase transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-[calc(100%-24px)]",
      
      // 3. Идэвхтэй байгаа хуудасны цэс байнга 100% тод цагаан, доогуураа нарийн зураастайгаа байна.
      linkActive: "text-white font-medium after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1px] after:w-[calc(100%-24px)] after:bg-white",
    };