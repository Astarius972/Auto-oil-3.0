import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

type ProductCardProps = {
  name: string;
  imageUrl: string;
  onAddToCart?: () => void;
  onFavorite?: () => void;
};

export default function ProductCard({
  name,
  imageUrl,
  onAddToCart,
  onFavorite,
}: ProductCardProps) {
  return (
    <div className="w-[260px] overflow-hidden rounded border border-slate-200 bg-white">
      {/* Image */}
      <div className="bg-slate-100 p-6">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          className="mx-auto h-[220px] w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="min-h-[60px] text-lg font-semibold text-slate-800">
          {name}
        </h3>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded border px-4 py-2 hover:bg-slate-50"
          >
            <ShoppingCart size={16} />
            Сагсанд нэмэх
          </button>

          <button
            onClick={onFavorite}
            className="rounded border px-3 py-2 hover:bg-slate-50"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
