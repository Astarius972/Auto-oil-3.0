"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import type { Product } from "./product-data";

export interface SimilarProductsProps {
  products: Product[];
  title?: string;
}

export function SimilarProducts({
  products,
  title = "ИЖИЛ ТӨРЛИЙН БАРАА",
}: SimilarProductsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + visibleCount < products.length;

  if (products.length === 0) {
    return null;
  }

  const visibleProducts = products.slice(
    startIndex,
    startIndex + visibleCount,
  );

  return (
    <section className="app-card p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-white">
            <Clock size={15} />
          </span>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStartIndex((index) => Math.max(0, index - 1))}
            disabled={!canGoBack}
            className="rounded-lg border border-slate-300 p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Өмнөх бүтээгдэхүүн"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              setStartIndex((index) =>
                Math.min(products.length - visibleCount, index + 1),
              )
            }
            disabled={!canGoForward}
            className="rounded-lg border border-slate-300 p-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Дараагийн бүтээгдэхүүн"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {visibleProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group overflow-hidden rounded-xl border border-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex h-48 items-center justify-center bg-slate-50 p-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={180}
                height={180}
                className="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="px-4 py-3 text-center text-sm font-semibold text-slate-900 transition-colors group-hover:text-brand-dark">
              {product.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
