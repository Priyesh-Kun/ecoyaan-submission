import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartData } from "@/types";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Sustainable shopping checkout flow",
};

async function getCartData(): Promise<CartData> {
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartData = await getCartData();

  return (
    <html lang="en">
      <body className={`${geist.className} bg-[#FFFFFF] min-h-screen`}>
        <div className="bg-white w-screen">
        <CartProvider initialCart={cartData}>{children}</CartProvider>

        </div>
      </body>
    </html>
  );
}
