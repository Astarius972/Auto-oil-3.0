"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { MainHeader } from "../components/cards/main-header";
import { TopBar } from "../components/cards/top-bar";
import Footer from "../components/footer";
import { formatPrice } from "../components/cards/product-data";
import { useCart } from "../context/cart-context";

export default function CartPage() {
  const { items, totalCount, totalPrice, isHydrated, updateQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-blue-500/30">
      <TopBar />
      <MainHeader />

      <div className="mx-auto max-w-4xl p-4 md:p-8">
        <div className="border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between border-b border-slate-300 pb-4">
            <h1 className="text-xl font-bold text-black">Миний сагс</h1>
            {isHydrated && items.length > 0 ? (
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Бүгдийг устгах
              </button>
            ) : null}
          </div>

          {!isHydrated ? (
            <p className="py-12 text-center text-slate-500">Сагсыг ачаалж байна...</p>
          ) : items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-500">Таны сагс хоосон байна.</p>
              <Link
                href="/products"
                className="mt-4 inline-block text-sm font-semibold text-[#0d4a8f] hover:underline"
              >
                Бүтээгдэхүүн үзэх
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="flex flex-col gap-4 border border-slate-200 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-20 w-auto object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {item.brand}
                    </p>
                    <h2 className="font-semibold text-slate-900">{item.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-[#0d4a8f]">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="rounded border border-slate-300 p-2 hover:bg-slate-50"
                      aria-label="Хэмжээ бууруулах"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="rounded border border-slate-300 p-2 hover:bg-slate-50"
                      aria-label="Хэмжээ нэмэх"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="rounded border border-slate-300 p-2 text-red-600 hover:bg-red-50"
                      aria-label="Устгах"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}

              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <div>
                  <p className="text-sm text-slate-500">Нийт бүтээгдэхүүн: {totalCount}</p>
                  <p className="text-lg font-bold text-slate-900">
                    Нийт дүн: {formatPrice(totalPrice)}
                  </p>
                </div>
                <Link
                  href="/products"
                  className="rounded bg-[#0d4a8f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a3d75]"
                >
                  Үргэлжлүүлэх
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
