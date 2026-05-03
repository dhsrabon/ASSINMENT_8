"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const password = form.password.value;

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        image,
      });

      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Registration failed. Please try again.");
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
          Register
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            name="image"
            type="url"
            placeholder="Photo URL"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-4"
        >
          Continue with Google
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}