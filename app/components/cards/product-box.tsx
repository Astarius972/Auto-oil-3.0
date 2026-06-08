import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { formatPrice } from "./product-data";

export interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
  brand?: string;
  cartQuantity?: number;
  onAddToCart?: () => void;
  onFavorite?: () => void;
}

export default function ProductCard({
  id,
  name,
  imageUrl,
  price,
  brand,
  cartQuantity = 0,
  onAddToCart,
  onFavorite,
}: ProductCardProps) {
  const inCart = cartQuantity > 0;

  return (
    <article className="app-card app-card-hover group flex h-full w-full flex-col overflow-hidden">
      <Link
        href={`/products/${id}`}
        className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-t-2xl bg-slate-50 p-6"
      >
        {inCart ? (
          <span className="absolute right-3 top-3 z-10 flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-white shadow-sm">
            {cartQuantity}
          </span>
        ) : null}
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="mx-auto h-[180px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
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

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
              inCart
                ? "bg-brand-dark/10 text-brand-dark hover:bg-brand-dark/15"
                : "bg-brand text-white shadow-sm hover:bg-brand-deep hover:shadow-md"
            }`}
          >
            <ShoppingCart size={16} />
            {inCart ? `Сагсанд (${cartQuantity})` : "Сагсанд нэмэх"}
          </button>

          <button
            type="button"
            onClick={onFavorite}
            className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-500"
            aria-label="Дуртай жагсаалтад нэмэх"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
