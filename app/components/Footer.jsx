export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white px-6 py-8 mt-10">
      <div className="grid md:grid-cols-3 gap-6">

        <div>
          <h2 className="text-xl font-bold text-orange-400">
            SummerShop
          </h2>
          <p className="mt-2 text-sm">
            Your modern summer eCommerce platform.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: support@summershop.com</p>
          <p>Phone: +880123456789</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Social</h3>
          <p>Facebook | Instagram | Twitter</p>
          <p className="underline mt-2 cursor-pointer">
            Privacy Policy
          </p>
        </div>

      </div>
    </footer>
  );
}