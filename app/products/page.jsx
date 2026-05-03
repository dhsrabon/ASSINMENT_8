"use client";

import Link from "next/link";
import products from "../products.json";

export default function ProductsPage() {
  return (
    <section className="px-8 py-12 bg-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-slate-800">
          All Products
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-white shadow-xl hover:shadow-2xl transition">
              <figure className="h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <p className="badge badge-info">{product.category}</p>

                <h3 className="card-title mt-2">{product.name}</h3>

                <p className="text-sm text-slate-500">
                  {product.brand}
                </p>

                <p className="text-sm text-slate-600">
                  ⭐ {product.rating} | Stock: {product.stock}
                </p>

                <p className="text-2xl font-bold text-orange-500">
                  ${product.price}
                </p>

                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-warning"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
