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
  return (
    <article className="flex h-full w-full flex-col overflow-hidden border border-slate-200 bg-white">
      <Link
        href={`/products/${id}`}
        className="flex min-h-[220px] items-center justify-center bg-slate-100 p-6"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="mx-auto h-[180px] w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {brand ? (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            {brand}
          </p>
        ) : null}
        <Link href={`/products/${id}`}>
          <h3 className="min-h-[56px] text-base font-bold leading-snug text-slate-900 transition-colors hover:text-[#0d4a8f]">
            {name}
          </h3>
        </Link>
        {price !== undefined ? (
          <p className="mt-2 text-sm font-semibold text-[#0d4a8f]">
            {formatPrice(price)}
          </p>
        ) : null}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="flex flex-1 items-center justify-center gap-2 border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-50"
          >
            <ShoppingCart size={16} />
            {cartQuantity > 0
              ? `Сагсанд (${cartQuantity})`
              : "Сагсанд нэмэх"}
          </button>

          <button
            type="button"
            onClick={onFavorite}
            className="border border-slate-300 bg-white px-3 py-2 text-slate-800 transition-colors hover:bg-slate-50"
            aria-label="Дуртай жагсаалтад нэмэх"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
