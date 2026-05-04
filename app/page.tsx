import Link from "next/link";
import products from "./products.json";

export default function Home() {
  const popularProducts = products.slice(0, 3);

  return (
    <div className="bg-orange-50">

      {/* Hero Section */}
      <section className="min-h-screen md:min-h-[420px] flex items-center justify-center px-4 md:px-8 py-8 md:py-0 bg-gradient-to-r from-orange-400 via-yellow-300 to-pink-300">
        <div className="max-w-3xl text-center md:text-left animate__animated animate__fadeInUp">
          <p className="text-base md:text-lg font-semibold text-white mb-3">
            Hot Deals 🔥
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Summer Sale 50% OFF
          </h1>

          <p className="text-white text-base md:text-lg mt-4">
            Explore sunglasses, summer outfits, skincare, beach accessories and more.
          </p>

          <Link href="/products" className="btn btn-warning mt-6">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Popular Products */}
      <section className="px-4 md:px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 text-center md:text-left animate__animated animate__fadeInDown">
          Popular Products 🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularProducts.map((product, index) => (
            <div
              key={product.id}
              className="card bg-white shadow-xl hover:shadow-2xl transition animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <figure className="h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title text-lg">{product.name}</h3>

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
      <section className="px-4 md:px-8 py-12 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 text-center animate__animated animate__fadeInDown">
          Summer Care Tips ☀️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl bg-orange-100 shadow hover:shadow-lg transition transform hover:-translate-y-1 animate__animated animate__fadeInUp">
            <h3 className="font-bold text-lg md:text-xl mb-2">☀️ Use Sunscreen</h3>
            <p className="text-sm md:text-base text-gray-700">Apply SPF 50+ before going outside to protect your skin.</p>
          </div>

          <div className="p-6 rounded-xl bg-yellow-100 shadow hover:shadow-lg transition transform hover:-translate-y-1 animate__animated animate__fadeInUp" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-bold text-lg md:text-xl mb-2">💧 Stay Hydrated</h3>
            <p className="text-sm md:text-base text-gray-700">Drink enough water during summer to stay healthy.</p>
          </div>

          <div className="p-6 rounded-xl bg-pink-100 shadow hover:shadow-lg transition transform hover:-translate-y-1 animate__animated animate__fadeInUp" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-bold text-lg md:text-xl mb-2">🕶️ Wear Sunglasses</h3>
            <p className="text-sm md:text-base text-gray-700">Protect your eyes from harmful UV rays.</p>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="px-4 md:px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 text-center md:text-left animate__animated animate__fadeInDown">
          Top Brands ⭐
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {["SunShade", "CoolWear", "SkinCarePro", "HydroMax"].map((brand, index) => (
            <div
              key={brand}
              className="p-6 text-center rounded-xl bg-white shadow hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl mb-2">
                {brand === "SunShade" && "🕶️"}
                {brand === "CoolWear" && "👕"}
                {brand === "SkinCarePro" && "🧴"}
                {brand === "HydroMax" && "💧"}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-orange-500">
                {brand}
              </h3>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}