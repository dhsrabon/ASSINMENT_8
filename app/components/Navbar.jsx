"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      window.location.href = "/";
    }
  };

  if (isPending) {
    return (
      <div className="navbar bg-base-100 shadow px-4 md:px-6">
        <div className="flex-1">
          <Link href="/" className="text-xl md:text-2xl font-bold text-orange-500">
            SummerShop
          </Link>
        </div>
      </div>
    );
  }

  const isLoggedIn = !!session;

  return (
    <div className="navbar bg-base-100 shadow px-4 md:px-6 flex justify-between items-center">
      <div className="flex-1">
        <Link href="/" className="text-xl md:text-2xl font-bold text-orange-500">
          SummerShop
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="font-medium hover:text-orange-500 transition">
          Home
        </Link>

        <Link href="/products" className="font-medium hover:text-orange-500 transition">
          Products
        </Link>

        <Link href="/my-profile" className="font-medium hover:text-orange-500 transition">
          My Profile
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <img
              src={session?.user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-orange-500"
            />
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link href="/register" className="btn btn-sm btn-warning">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-ghost btn-sm"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 left-0 bg-base-100 shadow-lg md:hidden border-t">
          <div className="flex flex-col items-start p-4 gap-3">
            <Link
              href="/"
              className="font-medium hover:text-orange-500 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/products"
              className="font-medium hover:text-orange-500 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              href="/my-profile"
              className="font-medium hover:text-orange-500 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>

            <div className="divider my-2"></div>

            {isLoggedIn ? (
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={session?.user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="user"
                    className="w-8 h-8 rounded-full border-2 border-orange-500"
                  />
                  <span className="text-sm font-medium">{session?.user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-sm btn-error text-white w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-2">
                <Link
                  href="/login"
                  className="btn btn-sm btn-outline w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sm btn-warning w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}