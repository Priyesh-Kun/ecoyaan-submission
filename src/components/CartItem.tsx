"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }: { item: CartItemType }) {
  const {
    updateQuantity,
    toggleItem,
    deselectedItems,
    saveForLater,
    savedItems,
  } = useCart();
  const isDeselected = deselectedItems.includes(item.product_id);
  const isSaved = savedItems.includes(item.product_id);

  if (isSaved) return null;

  return (
    <div
      className={`flex items-start gap-4 py-4 border-b border-gray-100 last:border-none transition-opacity
      ${isDeselected ? "opacity-40" : "opacity-100"}`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={!isDeselected}
        onChange={() => toggleItem(item.product_id)}
        className="mt-1 accent-green-700 cursor-pointer w-4 h-4"
      />

      {/* Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
        <img
          src={item.image}
          alt={item.product_name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
          {item.product_name}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-700 font-bold text-sm">
            ₹{item.product_price}
          </span>
          <span className="text-gray-400 line-through text-xs">
            ₹{Math.round(item.product_price * 1.2)}
          </span>
          <span className="text-green-600 text-xs font-medium">
            You Save ₹{Math.round(item.product_price * 0.2)}
          </span>
        </div>

        {/* Qty controls — disabled when deselected */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product_id, -1)}
              disabled={isDeselected}
              className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:border-green-700 hover:text-green-700 transition-colors text-lg leading-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="text-sm font-semibold w-5 text-center text-gray-600">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product_id, 1)}
              disabled={isDeselected}
              className="w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:border-green-700 hover:text-green-700 transition-colors text-lg leading-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          <button
            onClick={() => saveForLater(item.product_id)}
            className="text-xs text-green-700 hover:underline"
          >
            Save for later
          </button>
        </div>
      </div>

      {/* Line total — greys out when deselected */}
      <div
        className={`text-sm font-bold flex-shrink-0 ${isDeselected ? "text-gray-300" : "text-gray-800"}`}
      >
        ₹{item.product_price * item.quantity}
      </div>
    </div>
  );
}
