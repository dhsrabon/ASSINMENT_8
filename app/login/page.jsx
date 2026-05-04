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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 animate__animated animate__fadeInUp">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🕶️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Sign in to explore summer products
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 animate__animated animate__shakeX">
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  📧 Email Address
                </span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="input input-bordered input-md focus:input-warning w-full transition"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  🔒 Password
                </span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered input-md focus:input-warning w-full transition"
                required
              />
            </div>

            <button
              className="btn btn-warning btn-lg w-full text-white font-bold mt-2 hover:shadow-lg transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs text-gray-500">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-lg w-full hover:bg-orange-50 transition font-semibold"
          >
            <span className="text-xl">🔐</span>
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-500 font-bold hover:text-orange-600 transition"
            >
              Register here
            </Link>
          </p>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs md:text-sm text-gray-600">
              <span className="font-bold text-orange-600">Demo Credentials:</span>
              <br />
              Email: demo@example.com
              <br />
              Password: password123
            </p>
          </div>
        </div>
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