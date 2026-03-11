"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartData, CartItem, ShippingAddress } from "@/types";

interface CartContextType {
  cartData: CartData;
  setCartData: (data: CartData) => void;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
  paymentMethod: "online" | "cod";
  setPaymentMethod: (method: "online" | "cod") => void;
  updateQuantity: (productId: number, delta: number) => void;
  appliedCoupon: string | null;
  setAppliedCoupon: (coupon: string | null) => void;
  subtotal: number;
  shipping: number;
  discount: number;
  grandTotal: number;
  deselectedItems: number[];
  toggleItem: (productId: number) => void;
  savedItems: number[];
  saveForLater: (productId: number) => void;
  moveToCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart: CartData;
}) {
  const [cartData, setCartData] = useState<CartData>(initialCart);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">(
    "online",
  );
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [deselectedItems, setDeselectedItems] = useState<number[]>([]);
  const [savedItems, setSavedItems] = useState<number[]>([]);

  const saveForLater = (productId: number) => {
    setSavedItems((prev) => [...prev, productId]);
  };

  const moveToCart = (productId: number) => {
    setSavedItems((prev) => prev.filter((id) => id !== productId));
  };

  const toggleItem = (productId: number) => {
    setDeselectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCartData((prev) => ({
      ...prev,
      cartItems: prev.cartItems
        .map((item: CartItem) =>
          item.product_id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item: CartItem) => item.quantity > 0),
    }));
  };

  const subtotal = cartData.cartItems
    .filter(
      (item) =>
        !deselectedItems.includes(item.product_id) &&
        !savedItems.includes(item.product_id),
    )
    .reduce((sum, item) => sum + item.product_price * item.quantity, 0);

  const discount =
    appliedCoupon === "SHIPFREE2025"
      ? cartData.shipping_fee
      : cartData.discount_applied;
  const shipping = appliedCoupon === "SHIPFREE2025" ? 0 : cartData.shipping_fee;
  const codCharge = paymentMethod === "cod" ? 49 : 0;
  const grandTotal =
    subtotal - cartData.discount_applied + shipping + codCharge;

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        shippingAddress,
        setShippingAddress,
        paymentMethod,
        setPaymentMethod,
        appliedCoupon,
        setAppliedCoupon,
        updateQuantity,
        subtotal,
        shipping,
        discount,
        grandTotal,
        deselectedItems,
        toggleItem,
        savedItems,
        saveForLater,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
