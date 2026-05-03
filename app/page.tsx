import Link from "next/link";
import products from "./products.json";

export default function Home() {
  const popularProducts = products.slice(0, 3);

  return (
    <div className="bg-orange-50">

      {/* Hero Section */}
      <section className="min-h-[420px] flex items-center px-8 bg-gradient-to-r from-orange-400 via-yellow-300 to-pink-300">
        <div className="max-w-3xl">
          <p className="text-lg font-semibold text-white mb-3">
            Hot Deals 🔥
          </p>

          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Summer Sale 50% OFF
          </h1>

          <p className="text-white text-lg mt-4">
            Explore sunglasses, summer outfits, skincare, beach accessories and more.
          </p>

          <Link href="/products" className="btn btn-warning mt-6">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Popular Products */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          Popular Products 🔥
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <div key={product.id} className="card bg-white shadow-xl">
              <figure className="h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>

                <p className="text-sm text-slate-500">
                  Rating: ⭐ {product.rating}
                </p>

                <p className="text-xl font-bold text-orange-500">
                  ${product.price}
                </p>

                <div className="card-actions justify-end">
                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-sm btn-warning"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="px-8 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          Summer Care Tips ☀️
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl bg-orange-100 shadow">
            <h3 className="font-bold text-xl mb-2">Use Sunscreen</h3>
            <p>Apply SPF before going outside.</p>
          </div>

          <div className="p-6 rounded-xl bg-yellow-100 shadow">
            <h3 className="font-bold text-xl mb-2">Stay Hydrated</h3>
            <p>Drink enough water during summer.</p>
          </div>

          <div className="p-6 rounded-xl bg-pink-100 shadow">
            <h3 className="font-bold text-xl mb-2">Wear Sunglasses</h3>
            <p>Protect your eyes from UV rays.</p>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          Top Brands
        </h2>

        <div className="grid md:grid-cols-4 gap-5">
          {["SunShade", "CoolWear", "SkinCarePro", "HydroMax"].map((brand) => (
            <div
              key={brand}
              className="p-6 text-center rounded-xl bg-white shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-orange-500">
                {brand}
              </h3>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}