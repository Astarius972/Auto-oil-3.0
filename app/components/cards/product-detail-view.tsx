"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/cart-context";
import { SimilarProducts } from "./similar-products";
import { formatPrice, type Product } from "./product-data";

export interface ProductDetailViewProps {
  product: Product;
  similarProducts: Product[];
}

type ProductTab = "info" | "specs";

export function ProductDetailView({
  product,
  similarProducts,
}: ProductDetailViewProps) {
  const { addToCartWithQuantity, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ProductTab>("info");
  const [activeImage, setActiveImage] = useState(product.imageUrl);

  const galleryImages = product.images?.length
    ? product.images
    : [product.imageUrl];

  const cartQuantity =
    items.find((item) => item.productId === product.id)?.quantity ?? 0;

  const handleAddToCart = () => {
    addToCartWithQuantity(product, quantity);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/products"
        className="inline-block text-sm text-[#0d4a8f] hover:underline"
      >
        ← Бүтээгдэхүүн рүү буцах
      </Link>

      <div className="grid grid-cols-1 gap-8 border border-slate-200 bg-white p-6 lg:grid-cols-2">
        <div className="relative border border-slate-200 bg-slate-100 p-6">
          <div className="absolute left-4 top-4 z-10">
            <button
              type="button"
              onClick={() => setActiveImage(product.imageUrl)}
              className="border border-slate-300 bg-white p-1"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
            </button>
          </div>
          <div className="flex min-h-[360px] items-center justify-center">
            <Image
              src={activeImage}
              alt={product.name}
              width={420}
              height={420}
              className="h-[320px] w-auto object-contain"
            />
          </div>
          {galleryImages.length > 1 ? (
            <div className="mt-4 flex gap-2">
              {galleryImages.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`border bg-white p-1 ${
                    activeImage === image
                      ? "border-[#0d4a8f]"
                      : "border-slate-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h1 className="text-2xl font-bold uppercase leading-tight text-slate-900">
            {product.name}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <span className="rounded bg-slate-700 px-4 py-2 text-sm text-white">
              Нэгж үнэ ( ширхэг )
            </span>
            <span className="text-3xl font-bold text-red-600">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-slate-700">
            {product.shortDescription}
          </p>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-slate-800">
              Тоо хэмжээ
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="rounded border border-slate-300 p-2 hover:bg-slate-50"
                aria-label="Хэмжээ бууруулах"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) =>
                  setQuantity(Math.max(1, Number(event.target.value) || 1))
                }
                className="w-16 border border-slate-300 px-2 py-2 text-center text-sm"
              />
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="rounded border border-slate-300 p-2 hover:bg-slate-50"
                aria-label="Хэмжээ нэмэх"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
            >
              <ShoppingCart size={18} />
              {cartQuantity > 0
                ? `Сагсанд нэмэх (${cartQuantity} байна)`
                : "Сагсанд нэмэх"}
            </button>
            <button
              type="button"
              className="border border-slate-300 bg-white px-4 py-3 text-slate-800 transition-colors hover:bg-slate-50"
              aria-label="Дуртай жагсаалтад нэмэх"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="border border-slate-200 bg-white">
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "info"
                ? "text-red-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Барааны мэдээлэл
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "specs"
                ? "text-red-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Техник үзүүлэлт
          </button>
        </div>
        <div className="border-x border-b border-slate-200 bg-white p-6">
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {activeTab === "info" ? product.description : product.specifications}
          </p>
        </div>
      </div>

      <SimilarProducts products={similarProducts} />
    </div>
  );
}
