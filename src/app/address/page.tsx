"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import AddressModal from "@/components/AddressModal";

export default function AddressPage() {
  const router = useRouter();
  const { shippingAddress } = useCart();

  // If already has address, redirect to payment
  if (shippingAddress) {
    router.push("/payment");
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 pb-16">
        {/* Render modal inline as a page on this route */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <AddressModal
            onClose={() => router.push("/")}
            onSuccess={() => router.push("/payment")}
            prefillEmail=""
          />
        </div>
      </main>
    </>
  );
}