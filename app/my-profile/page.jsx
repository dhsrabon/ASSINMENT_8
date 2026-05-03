"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <h1 className="p-8 text-2xl font-bold">Loading...</h1>;
  }

  if (!session) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="mt-3">Please login to view your profile.</p>
          <Link href="/login?redirect=/my-profile" className="btn btn-warning mt-5">
            Login Now
          </Link>
        </div>
      </section>
    );
  }

  const user = session.user;

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="animate__animated animate__fadeInUp bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt={user.name}
          className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-orange-300"
        />

        <h1 className="text-3xl font-bold mt-4 text-orange-500">
          {user.name}
        </h1>

        <p className="text-slate-600 mt-2">{user.email}</p>

        <Link href="/update-profile" className="btn btn-warning mt-6">
          Update Profile
        </Link>
      </div>
    </section>
  );
}