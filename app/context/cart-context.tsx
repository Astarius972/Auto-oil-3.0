"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../components/cards/product-data";

const CART_STORAGE_KEY = "auto-oil-cart";

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  isHydrated: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).productId === "string" &&
        typeof (item as CartItem).quantity === "number" &&
        (item as CartItem).quantity > 0,
    );
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    writeStoredCart(items);
  }, [items, isHydrated]);

  const addToCart = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) =>
        currentItems.filter((item) => item.productId !== productId),
      );
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalPrice,
      isHydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      totalCount,
      totalPrice,
      isHydrated,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
