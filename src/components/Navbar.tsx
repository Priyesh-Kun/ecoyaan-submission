"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocation } from "@/hooks/useLocation";
import { Search, User, Heart, MapPin } from "lucide-react";

export default function Navbar() {
  const { city, pincode, loading } = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main navbar */}
      <div className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/ecoyaan-favicon.ico"
            alt="Ecoyaan"
            width={36}
            height={36}
          />
          <div>
            <p className="font-bold text-green-700 text-2xl leading-none pb-1 tracking-widest">
              Ecoyaan
            </p>
            <p className="text-xs text-green-800 leading-none">
              Sustainability made easy
            </p>
          </div>
        </Link>

        {/* Location */}
        <div className="hidden sm:flex items-center gap-1 text-sm text-gray-600 shrink-0">
          <MapPin size={16} className="text-gray-400" />
          <div className="mr-10">
            {loading ? (
              <span className="text-xs text-gray-400 animate-pulse">
                Detecting...
              </span>
            ) : (
              <>
                <p className="font-semibold text-gray-700 leading-none">
                  {city}
                  {pincode && `, ${pincode}`}
                </p>
                <p className="text-xs text-green-600 hover:underline cursor-pointer leading-none mt-0.5">
                  Update Location
                </p>
              </>
            )}
          </div>
          <div className="flex-1 min-w-3xl">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 gap-2 hover:border-green-500 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for 'Coir Brushes'"
                className="w-full text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Search bar */}

        {/* Right icons */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-600 transition-colors text-gray-600">
            <User size={18} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:text-green-600 transition-colors text-gray-500">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
