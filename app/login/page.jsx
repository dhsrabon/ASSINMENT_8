"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await authClient.signIn.email({
        email,
        password,
      });

      router.push(redirectPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Login failed. Please try again.");
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      setError("Google login failed.");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <button className="btn btn-warning w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-4"
        >
          Continue with Google
        </button>

        <p className="text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-orange-500 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-2xl font-bold">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}