"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CartData } from "@/types";
import Navbar from "@/components/Navbar";
import CartItem from "@/components/CartItem";
import LoginModal from "@/components/LoginModal";

export default function CartPageClient({ cartData }: { cartData: CartData }) {
  const router = useRouter();
  const {
    subtotal,
    shipping,
    grandTotal,
    cartData: liveCart,
    deselectedItems,
    toggleItem,
  } = useCart();
  const { savedItems, moveToCart } = useCart();
  const savedCartItems = cartData.cartItems.filter((item) =>
    savedItems.includes(item.product_id),
  );
  const [showLogin, setShowLogin] = useState(false);

  const isEmpty = liveCart.cartItems.length === 0;

  return (
    <>
      <Navbar />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            router.push("/payment");
          }}
        />
      )}

      <main className="max-w-2xl mx-auto px-4 h-screen mt-30">

        {/* Savings banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
          <span className="text-green-600 text-lg">💚</span>
          <div>
            <p className="text-sm font-semibold text-green-800">
              You saved ₹{liveCart.discount_applied} in total
            </p>
            <p className="text-xs text-green-600">
              Great choice! You&apos;re making sustainable shopping more
              rewarding.
            </p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-green-700 hover:underline mb-4"
        >
          Chat with us on WhatsApp
        </a>

        {/* Cart items */}
        {isEmpty ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-gray-500 font-medium">Your cart is empty</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 px-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-700">
                List of added items
              </p>
              <button
                onClick={() => {
                  const allDeselected =
                    deselectedItems.length === cartData.cartItems.length;
                  if (allDeselected) {
                    // Reselect all — clear deselectedItems
                    cartData.cartItems.forEach((item) => {
                      if (deselectedItems.includes(item.product_id)) {
                        toggleItem(item.product_id);
                      }
                    });
                  } else {
                    // Deselect all that aren't already deselected
                    cartData.cartItems.forEach((item) => {
                      if (!deselectedItems.includes(item.product_id)) {
                        toggleItem(item.product_id);
                      }
                    });
                  }
                }}
                className="text-xs text-green-700 hover:underline"
              >
                {deselectedItems.length === cartData.cartItems.length
                  ? "Select All Products"
                  : "Deselect All Products"}
              </button>
            </div>
            {liveCart.cartItems.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
          </div>
        )}

        {savedCartItems.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 px-4 mt-3">
            <p className="text-sm font-semibold text-gray-700 py-3 border-b border-gray-100">
              Saved for Later ({savedCartItems.length})
            </p>
            {savedCartItems.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-none"
              >
                <img
                  src={item.image}
                  alt={item.product_name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {item.product_name}
                  </p>
                  <p className="text-green-700 font-bold text-sm mt-1">
                    ₹{item.product_price}
                  </p>
                </div>
                <button
                  onClick={() => moveToCart(item.product_id)}
                  className="text-xs font-semibold text-green-700 border border-green-700 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors flex-shrink-0"
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        {!isEmpty && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mt-3 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total items: {liveCart.cartItems.length}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-800 pt-2 border-t border-gray-100">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        )}
      </main>

      {/* Sticky bottom bar */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between z-40">
          <div>
            <p className="text-xs text-gray-500">Grand Total</p>
            <p className="text-lg font-bold text-gray-800">₹{grandTotal}</p>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </>
  );
}
