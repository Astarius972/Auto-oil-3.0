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
      className="group block w-70 h-70 bg-slate-200 rounded-xl p-4 shadow-md hover:shadow-lg hover:ring-2 hover:ring-blue-500/40 transition-all duration-300 flex flex-col items-center justify-center"
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={180}
        height={112}
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}
