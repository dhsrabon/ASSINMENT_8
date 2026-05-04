"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    });
    
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    
    setLoading(true);
    try {
      const result = await authClient.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.name,
      });
      
      if (result.error) {
        setError(result.error.message || "Registration failed");
        setLoading(false);
        return;
      }
      
      router.push("/login");
    } catch (err) {
      setError(err.message || "An error occurred during registration");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google sign-in failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 animate__animated animate__fadeInUp">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🌞</div>
            <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              Join SummerShop
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Create your account and enjoy summer deals
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 animate__animated animate__shakeX">
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  👤 Full Name
                </span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="input input-bordered input-md focus:input-warning w-full transition"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  📧 Email Address
                </span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="input input-bordered input-md focus:input-warning w-full transition"
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
                required
                placeholder="••••••••"
                className="input input-bordered input-md focus:input-warning w-full transition"
              />
              <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-warning btn-lg w-full text-white font-bold mt-4 hover:shadow-lg transition"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs text-gray-500">OR</div>

          {/* Google Register */}
          <button
            type="button"
            onClick={handleGoogle}
            className="btn btn-outline btn-lg w-full hover:bg-orange-50 transition font-semibold"
          >
            <span className="text-xl">🔐</span>
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-500 font-bold hover:text-orange-600 transition"
            >
              Login here
            </Link>
          </p>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs md:text-sm text-gray-600">
              <span className="font-bold text-blue-600">✓ Free & Secure:</span>
              <br />
              Your data is encrypted and secure with BetterAuth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
