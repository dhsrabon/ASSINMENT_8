export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 md:px-6 py-12 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-orange-400 mb-3">
              ☀️ SummerShop
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your modern summer eCommerce platform for all seasonal products and beach essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-orange-400 transition">Home</a></li>
              <li><a href="/products" className="hover:text-orange-400 transition">Products</a></li>
              <li><a href="/my-profile" className="hover:text-orange-400 transition">My Profile</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📧 support@summershop.com</li>
              <li>📞 +880123456789</li>
              <li>🏪 Summer Store, Beach City</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition"
                title="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                title="Twitter"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} SummerShop. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}