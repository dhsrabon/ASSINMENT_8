"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-lg text-orange-500"></div>
          <p className="text-lg font-semibold text-gray-700">Loading profile...</p>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md animate__animated animate__fadeInDown">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-2xl md:text-3xl font-bold text-red-500 mb-3">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Please login to view your profile.
          </p>
          <Link href="/login?redirect=/my-profile" className="btn btn-warning btn-lg">
            Login Now
          </Link>
        </div>
      </section>
    );
  }

  const user = session.user;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="animate__animated animate__fadeInUp bg-white shadow-2xl rounded-3xl p-8 md:p-10">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <img
              src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt={user.name}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-300 shadow-lg mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              {user.name}
            </h1>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
              <span>📧</span>
              <p className="text-sm md:text-base break-all">{user.email}</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-orange-50 rounded-lg p-4 md:p-6 mb-6 border border-orange-200">
            <h2 className="font-bold text-orange-600 mb-3">Account Information</h2>
            <div className="space-y-2 text-sm md:text-base text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email:</span>
                <span className="break-all">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Account Status:</span>
                <span className="text-green-600 font-bold">✓ Active</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/update-profile"
              className="btn btn-warning btn-lg w-full text-white font-bold hover:shadow-lg transition"
            >
              ✏️ Update Profile
            </Link>
            <Link
              href="/products"
              className="btn btn-outline btn-lg w-full font-bold hover:bg-orange-50 transition"
            >
              🛍️ Continue Shopping
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <p className="text-xs md:text-sm text-gray-600">
              <span className="font-bold text-blue-600">💡 Tip:</span>
              <br />
              You can update your profile information anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}