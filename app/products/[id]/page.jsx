"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";
import products from "../../products.json";
import { authClient } from "@/lib/auth-client";

export default function ProductDetails({ params: paramsPromise }) {
  const router = useRouter();
  const params = use(paramsPromise);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=/products/${params.id}`);
    }
  }, [session, isPending, params.id, router]);

  if (isPending) {
    return (
      <section className="p-8 bg-orange-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-3xl p-12 text-center">
          <p className="text-xl font-semibold text-slate-700">Loading product details...</p>
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
      <section className="p-8 bg-orange-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-3xl p-12 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Product Not Found</h1>
          <Link href="/products" className="btn btn-outline mt-6">
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-12 bg-orange-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-slate-500">Product / Details</p>
          <h1 className="text-4xl font-bold text-slate-900 mt-2">{product.name}</h1>
          <p className="mt-2 text-slate-600">Explore the full details of your selected product.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="overflow-hidden rounded-3xl shadow-xl bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[32rem] object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="badge badge-warning">{product.category}</span>
                <span className="text-sm text-slate-500">Stock: {product.stock}</span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Price</h2>
                  <p className="text-3xl font-bold text-orange-500">${product.price}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Brand</h2>
                  <p className="text-slate-700">{product.brand}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Rating</h2>
                  <p className="text-slate-700">⭐ {product.rating}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-slate-900">Product Description</h2>
              <p className="mt-4 text-slate-700 leading-7">{product.description}</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl space-y-4">
              <button className="btn btn-warning w-full text-white">Add to Cart</button>
              <Link href="/products" className="btn btn-outline w-full">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
