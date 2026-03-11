"use client";

import { useState } from "react";
import Image from "next/image";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("This field is required");
      return;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const isMobile = /^\d{10}$/.test(trimmed);
    if (!isEmail && !isMobile) {
      setError("Enter a valid email or 10-digit mobile number");
      return;
    }
    onSuccess();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Image
                        src="/ecoyaan-favicon.ico"
                        alt="Ecoyaan"
                        width={40}
                        height={40}
                      />
            <span className="font-bold text-green-700 text-lg">Ecoyaan</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Mobile Number or Email
        </h2>

        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          placeholder="Mobile Number or Email"
          autoFocus
          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-gray-700
            ${error ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-green-500"}`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

        <button
          onClick={handleContinue}
          className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}