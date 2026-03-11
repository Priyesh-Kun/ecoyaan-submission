"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
  const {
    cartData,
    subtotal,
    shipping,
    grandTotal,
    appliedCoupon,
    setAppliedCoupon,
    paymentMethod,
    discount,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);

  const gst = Math.round(subtotal * 0.18 * 0.1); // approximate tax
  const codCharge = paymentMethod === "cod" ? 49 : 0;

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === "SHIPFREE2025") {
      setAppliedCoupon("SHIPFREE2025");
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24">
      <h2 className="text-base font-bold text-gray-800 mb-4">Order Summary</h2>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {cartData.cartItems.map((item) => (
          <div key={item.product_id} className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.product_name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-snug">
                {item.product_name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                ₹{item.product_price} x {item.quantity}
              </p>
            </div>
            <span className="text-sm font-bold text-gray-800 flex-shrink-0">
              ₹{item.product_price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Coupon */}
      <div className="mb-4">
        <button
          onClick={() => setCouponOpen(!couponOpen)}
          className="w-full flex items-center justify-between text-sm text-green-700 font-medium py-2"
        >
          <span>🏷️ Offers & Coupons</span>
          <span>{couponOpen ? "▲" : "▶"}</span>
        </button>

        {couponOpen && (
          <div className="mt-2">
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs font-bold text-green-700">{appliedCoupon}</p>
                  <p className="text-xs text-green-600">FREE Shipping applied!</p>
                </div>
                <button
                  onClick={() => setAppliedCoupon(null)}
                  className="text-gray-400 hover:text-red-500 text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-green-500 text-gray-700"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-green-700 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            {couponError && (
              <p className="text-xs text-red-500 mt-1">{couponError}</p>
            )}
            {!appliedCoupon && (
              <p className="text-xs text-gray-400 mt-1">
                Try: <span className="font-mono font-bold">SHIPFREE2025</span>
              </p>
            )}
          </div>
        )}
      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span className="text-green-600">− ₹{cartData.discount_applied}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {appliedCoupon === "SHIPFREE2025" ? (
            <span>
              <span className="text-green-600 font-semibold">FREE</span>{" "}
              <span className="line-through text-gray-400">₹{cartData.shipping_fee}</span>
            </span>
          ) : (
            <span>₹{shipping}</span>
          )}
        </div>
        {codCharge > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>COD Charges</span>
            <span>₹{codCharge}</span>
          </div>
        )}
      </div>

      <hr className="border-gray-100 my-3" />

      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-800">You Pay</span>
        <div className="text-right">
          <p className="font-bold text-green-700 text-lg">₹{grandTotal}</p>
          <p className="text-xs text-gray-400">Including ₹{gst} in taxes</p>
        </div>
      </div>
    </div>
  );
}