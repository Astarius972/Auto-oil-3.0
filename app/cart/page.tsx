"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageShell } from "../components/layout/page-shell";
import { PageHeader } from "../components/layout/page-header";
import { formatPrice } from "../components/cards/product-data";
import { useCart } from "../context/cart-context";

export default function CartPage() {
  const {
    items,
    totalCount,
    totalPrice,
    isHydrated,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <PageShell>
      <PageHeader
        eyebrow="Захиалга"
        title="Миний сагс"
        description="Сонгосон бүтээгдэхүүнээ шалгаж, тоо хэмжээгээ тохируулна уу."
        actions={
          isHydrated && items.length > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              className="btn-secondary text-red-600 hover:border-red-300 hover:bg-red-50"
            >
              <Trash2 size={16} />
              Бүгдийг устгах
            </button>
          ) : undefined
        }
      />

      {!isHydrated ? (
        <div className="app-card p-12 text-center text-slate-500">
          Сагсыг ачаалж байна...
        </div>
      ) : items.length === 0 ? (
        <div className="app-card flex flex-col items-center gap-4 p-12 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <ShoppingBag size={28} />
          </span>
          <p className="text-base font-medium text-slate-600">
            Таны сагс хоосон байна.
          </p>
          <Link href="/products" className="btn-primary">
            Бүтээгдэхүүн үзэх
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <article
                key={item.productId}
                className="app-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-20 w-auto object-contain"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {item.brand}
                  </p>
                  <h2 className="font-semibold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-sm font-bold text-brand-dark">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-xl border border-slate-300">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="rounded-l-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-50"
                      aria-label="Хэмжээ бууруулах"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-9 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="rounded-r-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-50"
                      aria-label="Хэмжээ нэмэх"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="rounded-xl border border-slate-300 p-2.5 text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
                    aria-label="Устгах"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="app-card p-5 sm:p-6">
              <h2 className="border-b border-slate-200 pb-4 text-lg font-bold text-slate-900">
                Захиалгын дүн
              </h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Нийт бүтээгдэхүүн</span>
                  <span className="font-semibold text-slate-900">
                    {totalCount} ш
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="font-semibold text-slate-700">Нийт дүн</span>
                  <span className="text-xl font-bold text-brand-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
              <Link
                href="/products"
                className="btn-secondary mt-5 w-full"
              >
                Үргэлжлүүлэн дэлгүүр хэсэх
              </Link>
            </div>
          </aside>
        </div>
      )}
    </PageShell>
  );
}
