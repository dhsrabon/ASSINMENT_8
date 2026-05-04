"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-lg text-orange-500"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
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
            Please login to update your profile.
          </p>
          <Link href="/login" className="btn btn-warning btn-lg">
            Login Now
          </Link>
        </div>
      </section>
    );
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const image = form.image.value.trim();

    if (!name) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    try {
      const { error } = await authClient.updateUser({
        name,
        ...(image && { image }),
      });

      if (error) {
        setError(error.message || "Update failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/my-profile");
      }, 1500);
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  }

  const user = session.user;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 animate__animated animate__fadeInUp">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">✏️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              Update Profile
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Manage your account information
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 animate__animated animate__shakeX">
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6 animate__animated animate__slideInDown">
              <p className="text-green-700 text-sm font-semibold">
                ✓ Profile updated successfully! Redirecting...
              </p>
            </div>
          )}

          {/* Current Info */}
          <div className="bg-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
            <h3 className="font-bold text-orange-600 mb-3 text-sm">Current Information</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
            </div>
          </div>

          {/* Update Form */}
          <form onSubmit={handleUpdate} className="space-y-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  👤 Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.name || ""}
                placeholder="Enter your full name"
                className="input input-bordered input-md focus:input-warning w-full transition"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  🖼️ Photo URL
                </span>
              </label>
              <input
                type="url"
                name="image"
                defaultValue={user.image || ""}
                placeholder="Enter your photo URL"
                className="input input-bordered input-md focus:input-warning w-full transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste a direct image URL (e.g., https://example.com/photo.jpg)
              </p>
            </div>

            {/* Preview */}
            {user.image && (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">Current Photo:</p>
                <img
                  src={user.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-lg object-cover mx-auto border-2 border-orange-300"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-warning btn-lg w-full text-white font-bold mt-6 hover:shadow-lg transition"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Link
              href="/my-profile"
              className="btn btn-outline btn-md w-full font-semibold hover:bg-orange-50 transition"
            >
              Cancel
            </Link>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs md:text-sm text-gray-600">
              <span className="font-bold text-blue-600">📝 Tips:</span>
              <br />
              • Use a direct image URL for your photo
              <br />
              • Fields can be updated anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
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
