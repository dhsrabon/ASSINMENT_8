"use client";

import { useState } from "react";
import products from "../products.json";
import ProductCard from "../components/ProductCard";

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
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              animationDelay={(index % 3) * 0.1}
            />
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
