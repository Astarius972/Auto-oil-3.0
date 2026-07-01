"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SimilarProducts } from "./similar-products";
import { formatPrice, type Product } from "./product-data";

export interface ProductDetailViewProps {
  product: Product;
  oilRelatedProducts: Product[];
}

type ProductTab = "info" | "specs";

export function ProductDetailView({
  product,
  oilRelatedProducts,
}: ProductDetailViewProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>("info");
  const [activeImage, setActiveImage] = useState(product.imageUrl);

  const galleryImages = product.images?.length
    ? product.images
    : [product.imageUrl];

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
          <div className="flex min-h-[240px] flex-1 items-center justify-center sm:min-h-[320px]">
            <Image
              src={activeImage}
              alt={product.name}
              width={420}
              height={420}
              className="h-auto max-h-[240px] w-auto max-w-full object-contain transition-opacity duration-300 sm:max-h-[300px]"
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
            Хэрэглэх заавар
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
          {activeTab === "info" ? (
            product.usageInstructionsHtml ? (
              <div
                className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700"
                dangerouslySetInnerHTML={{
                  __html: product.usageInstructionsHtml,
                }}
              />
            ) : (
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {product.usageInstructions || product.description}
              </p>
            )
          ) : product.specificationsHtml ? (
            <div
              className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700"
              dangerouslySetInnerHTML={{
                __html: product.specificationsHtml,
              }}
            />
          ) : (
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
              {product.specifications}
            </p>
          )}
        </div>
      </div>

      <SimilarProducts products={oilRelatedProducts} title="Тостой бараа" />
    </div>
  );
}
