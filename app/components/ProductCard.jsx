import Link from "next/link";

export default function ProductCard({ product, index = 0, animationDelay = 0 }) {
  return (
    <div
      className="card bg-white shadow-xl hover:shadow-2xl transition animate__animated animate__fadeInUp"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <figure className="h-56">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-105 transition duration-300"
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

        <h3 className="card-title text-lg md:text-base line-clamp-2">
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
            className="btn btn-warning btn-sm md:btn-md hover:shadow-lg transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
