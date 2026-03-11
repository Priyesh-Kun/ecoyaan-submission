"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

function generateOrderId() {
  return "ECO-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function SuccessPage() {
  const router = useRouter();
  const [orderId] = useState(generateOrderId);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center h-screen ">
        {/* Animated checkmark */}
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-5xl shadow-lg shadow-green-200 transition-all duration-500
            ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        >
          ✓
        </div>

        <h1
          className={`mt-6 text-3xl font-bold text-gray-800 transition-all duration-500 delay-150
            ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          Order Placed!
        </h1>

        <p
          className={`mt-2 text-gray-500 max-w-xs leading-relaxed transition-all duration-500 delay-200
            ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          Thank you for choosing sustainable products. Your order is confirmed and on its way.
        </p>

        {/* Order ID */}
        <div
          className={`mt-6 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 transition-all duration-500 delay-300
            ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <p className="text-xs text-gray-400 uppercase tracking-wide">Order ID</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{orderId}</p>
        </div>

        {/* Eco badges */}
        <div
          className={`mt-6 flex flex-wrap gap-2 justify-center transition-all duration-500 delay-[400ms]
            ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {[
            { icon: "🌱", text: "Eco-friendly packaging" },
            { icon: "🚚", text: "Carbon-neutral delivery" },
            { icon: "♻️", text: "100% recyclable" },
          ].map(({ icon, text }) => (
            <span
              key={text}
              className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200"
            >
              {icon} {text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/")}
          className={`mt-8 bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-500 delay-500
            ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          Continue Shopping
        </button>
      </main>
    </>
  );
}