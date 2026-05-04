"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import products from "../../products.json";
import { authClient } from "@/lib/auth-client";

export default function ProductDetails({ params: paramsPromise }) {
  const router = useRouter();
  const params = use(paramsPromise);
  const { data: session, isPending } = authClient.useSession();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=/products/${params.id}`);
    }
  }, [session, isPending, params.id, router]);

  if (isPending) {
    return (
      <section className="p-4 md:p-8 bg-orange-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-3xl p-8 md:p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 mx-auto"></div>
          <p className="text-lg md:text-xl font-semibold text-slate-700 mt-4">
            Loading product details...
          </p>
        </div>
      </section>
    );
  }

  if (!session) {
    return null;
  }

  const product = products.find((item) => item.id === Number(params.id));

  if (!product) {
    return (
      <section className="p-4 md:p-8 bg-orange-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-3xl p-8 md:p-12 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Product Not Found
          </h1>
          <Link href="/products" className="btn btn-outline mt-6">
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 py-12 bg-orange-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate__animated animate__fadeInDown">
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Product / Details
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            {product.name}
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            Explore the full details of your selected product.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Product Image */}
          <div className="overflow-hidden rounded-3xl shadow-xl bg-white animate__animated animate__fadeInLeft">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4 md:space-y-6 animate__animated animate__fadeInRight">
            {/* Category & Stock */}
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="badge badge-warning text-xs md:text-sm">
                  {product.category}
                </span>
                <span className="text-xs md:text-sm text-slate-500 font-semibold">
                  {product.stock > 0 ? (
                    <span className="text-green-600">✓ In Stock ({product.stock})</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Price & Rating */}
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg md:text-2xl font-semibold text-slate-900 mb-2">
                    Price
                  </h2>
                  <p className="text-3xl md:text-4xl font-bold text-orange-500">
                    ${product.price}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm md:text-lg font-semibold text-slate-900">
                      Brand
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base">
                      {product.brand}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm md:text-lg font-semibold text-slate-900">
                      Rating
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base">
                      ⭐ {product.rating}/5
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl">
              <h2 className="text-lg md:text-2xl font-semibold text-slate-900 mb-3">
                Description
              </h2>
              <p className="text-slate-700 leading-7 text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl space-y-3">
              <button
                className="btn btn-warning w-full text-white text-sm md:text-base"
                onClick={() => {
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2000);
                }}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <Link href="/products" className="btn btn-outline w-full text-sm md:text-base">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
