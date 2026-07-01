import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "./product-data";

export interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
  brand?: string;
}

export default function ProductCard({
  id,
  name,
  imageUrl,
  price,
  brand,
}: ProductCardProps) {
  return (
    <article className="app-card app-card-hover group flex h-full w-full flex-col overflow-hidden">
      <Link
        href={`/products/${id}`}
        className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-t-2xl bg-slate-50 p-4 sm:min-h-[220px] sm:p-6"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="mx-auto h-[140px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105 sm:h-[180px]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {brand ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {brand}
          </p>
        ) : null}
        <Link href={`/products/${id}`} className="rounded">
          <h3 className="line-clamp-2 min-h-[44px] text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-dark">
            {name}
          </h3>
        </Link>
        {price !== undefined ? (
          <p className="mt-2 text-lg font-bold text-brand-dark">
            {formatPrice(price)}
          </p>
        ) : null}
      </div>
    </article>
  );
}
