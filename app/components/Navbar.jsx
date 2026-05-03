"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

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
      <div className="navbar bg-base-100 shadow px-6">
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            SummerShop
          </Link>
        </div>
      </div>
    );
  }

  const isLoggedIn = !!session;

  return (
    <div className="navbar bg-base-100 shadow px-6">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          SummerShop
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/" className="font-medium hover:text-orange-500">
          Home
        </Link>

        <Link href="/products" className="font-medium hover:text-orange-500">
          Products
        </Link>

        <Link href="/my-profile" className="font-medium hover:text-orange-500">
          My Profile
        </Link>

        {isLoggedIn ? (
          <>
            <img
              src={session?.user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link href="/register" className="btn btn-sm btn-warning">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}