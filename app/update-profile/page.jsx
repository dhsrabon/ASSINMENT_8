"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return <h1 className="p-8 text-2xl font-bold">Loading...</h1>;
  }

  if (!session) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="mt-3">Please login to update your profile.</p>
          <Link href="/login" className="btn btn-warning mt-5">
            Login Now
          </Link>
        </div>
      </section>
    );
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;

    try {
      const { error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        setError(error.message || "Update failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/my-profile");
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  }

  const user = session.user;

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Update Profile
        </h1>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.name || ""}
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="url"
              name="image"
              defaultValue={user.image || ""}
              placeholder="Enter your photo URL"
              className="input input-bordered w-full"
            />
          </div>

          {user.image && (
            <div className="flex justify-center">
              <img
                src={user.image}
                alt="preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-orange-300"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-warning w-full mt-6 text-white"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/my-profile" className="text-orange-500 hover:underline">
            Back to Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
