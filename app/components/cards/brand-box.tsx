import Image from "next/image";
import Link from "next/link";

type BrandBoxProps = {
  imageUrl: string;
  alt: string;
  href: string;
};

export default function BrandBox({ imageUrl, alt, href }: BrandBoxProps) {
  return (
    <Link
      href={href}
      aria-label={alt}
      className="group flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg sm:aspect-square"
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={200}
        height={140}
        unoptimized={imageUrl.startsWith("http")}
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}
