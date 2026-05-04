"use client";

import Link from "next/link";
import { useState } from "react";
import products from "../products.json";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="px-4 md:px-8 py-12 bg-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate__animated animate__fadeInDown">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-800">
            All Products
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Explore our amazing collection of summer products
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 md:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn btn-sm md:btn-md ${
                selectedCategory === category
                  ? "btn-warning"
                  : "btn-outline"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="card bg-white shadow-xl hover:shadow-2xl transition animate__animated animate__fadeInUp"
              style={{ animationDelay: `${(index % 3) * 0.1}s` }}
            >
              <figure className="h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <p className="badge badge-info text-xs md:text-sm">
                    {product.category}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500">
                    Stock: {product.stock}
                  </p>
                </div>

                <h3 className="card-title text-lg md:text-base">
                  {product.name}
                </h3>

                <p className="text-xs md:text-sm text-slate-600 font-semibold">
                  {product.brand}
                </p>

                <div className="flex justify-between items-center my-3">
                  <p className="text-sm md:text-base text-slate-500">
                    ⭐ {product.rating}
                  </p>
                  <p className="text-2xl md:text-xl font-bold text-orange-500">
                    ${product.price}
                  </p>
                </div>

                <div className="card-actions justify-end gap-2 mt-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-warning btn-sm md:btn-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
