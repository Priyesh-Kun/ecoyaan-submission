"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import OrderSummary from "@/components/OrderSummary";
import AddressModal from "@/components/AddressModal";

export default function PaymentPage() {
  const router = useRouter();
  const { shippingAddress, paymentMethod, setPaymentMethod, grandTotal } = useCart();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!shippingAddress) {
      setShowAddressModal(true);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    router.push("/success");
  };

  return (
    <>
      <Navbar />

      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onSuccess={() => setShowAddressModal(false)}
          prefillEmail=""
        />
      )}

      <main className="max-w-5xl mx-auto px-4 pb-16 h-screen mt-30">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">

            {/* Select Address */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">Select address</h2>
                {shippingAddress && (
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="text-xs text-green-700 hover:underline"
                  >
                    Change
                  </button>
                )}
              </div>

              {shippingAddress ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-green-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-700" />
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <p className="font-semibold text-gray-800">{shippingAddress.fullName}</p>
                      <p>{shippingAddress.mobile} • {shippingAddress.email}</p>
                      <p>{shippingAddress.house}, {shippingAddress.street}</p>
                      {shippingAddress.landmark && <p>{shippingAddress.landmark}</p>}
                      <p>{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  <span>+</span> Add New Address
                </button>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-800 mb-4">Payment Method</h2>

              <div className="grid grid-cols-2 gap-3">
                {/* Pay Online */}
                <button
                  onClick={() => setPaymentMethod("online")}
                  className={`border-2 rounded-xl p-3 text-left transition-all
                    ${paymentMethod === "online"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">
                      Pay Online 🔥
                    </span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${paymentMethod === "online" ? "border-green-600" : "border-gray-300"}`}>
                      {paymentMethod === "online" && (
                        <div className="w-2 h-2 rounded-full bg-green-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-green-700 font-bold text-sm">₹{grandTotal}</p>
                  <p className="text-xs text-green-600 font-medium">SAVE ₹49</p>
                </button>

                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`border-2 rounded-xl p-3 text-left transition-all
                    ${paymentMethod === "cod"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">
                      Cash on Delivery
                    </span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${paymentMethod === "cod" ? "border-green-600" : "border-gray-300"}`}>
                      {paymentMethod === "cod" && (
                        <div className="w-2 h-2 rounded-full bg-green-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 font-bold text-sm">₹{grandTotal + 49}</p>
                  <p className="text-xs text-gray-400">+₹49 COD charges</p>
                </button>
              </div>

              {/* Proceed to Pay */}
              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full mt-4 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Proceed to Pay ₹${paymentMethod === "cod" ? grandTotal + 49 : grandTotal}`
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                🔒 100% secure payments • UPI • Cards • NetBanking
              </p>
            </div>
          </div>

          {/* Right column — Order Summary */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </main>
    </>
  );
}