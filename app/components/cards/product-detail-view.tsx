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
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark transition-colors hover:text-brand-deep"
      >
        ← Бүтээгдэхүүн рүү буцах
      </Link>

      <div className="app-card grid grid-cols-1 gap-8 p-5 sm:p-6 lg:grid-cols-2">
        <div className="relative flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex min-h-[320px] flex-1 items-center justify-center">
            <Image
              src={activeImage}
              alt={product.name}
              width={420}
              height={420}
              className="h-[300px] w-auto object-contain transition-opacity duration-300"
            />
          </div>
          {galleryImages.length > 1 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {galleryImages.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  aria-label="Зургийг үзэх"
                  aria-pressed={activeImage === image}
                  className={`rounded-lg border bg-white p-1.5 transition-all ${
                    activeImage === image
                      ? "border-brand ring-2 ring-brand/20"
                      : "border-slate-200 hover:border-slate-300"
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

        <div className="flex flex-col">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {product.brand}
          </p>
          <h1 className="text-xl font-bold uppercase leading-tight text-slate-900 sm:text-2xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
              Нэгж үнэ ( ширхэг )
            </span>
            <span className="text-3xl font-bold text-brand-accent">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-600">
            {product.shortDescription}
          </p>

          <div className="mt-7 border-t border-slate-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-slate-800">
              Тоо хэмжээ
            </p>
            <div className="inline-flex items-center rounded-xl border border-slate-300">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="rounded-l-xl p-3 text-slate-600 transition-colors hover:bg-slate-50"
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
                aria-label="Тоо хэмжээ"
                className="w-14 border-x border-slate-300 py-2.5 text-center text-sm font-semibold text-slate-900 outline-none focus:bg-slate-50"
              />
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="rounded-r-xl p-3 text-slate-600 transition-colors hover:bg-slate-50"
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
              className="btn-primary flex-1 py-3"
            >
              <ShoppingCart size={18} />
              {cartQuantity > 0
                ? `Сагсанд нэмэх (${cartQuantity} байна)`
                : "Сагсанд нэмэх"}
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-500"
              aria-label="Дуртай жагсаалтад нэмэх"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="app-card overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "info"
                ? "text-brand-accent"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Барааны мэдээлэл
            {activeTab === "info" ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-accent" />
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "specs"
                ? "text-brand-accent"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Техник үзүүлэлт
            {activeTab === "specs" ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-accent" />
            ) : null}
          </button>
        </div>
        <div className="p-6">
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {activeTab === "info" ? product.description : product.specifications}
          </p>
        </div>
      </div>

      <SimilarProducts products={similarProducts} />
    </div>
  );
}
