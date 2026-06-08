import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              🇦🇪 UAE Classifieds
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The UAE&apos;s favourite marketplace to buy and sell new and used
              items. Free classifieds for cars, properties, electronics,
              furniture, jobs, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="hover:text-amber-400 transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Latest Ads
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-amber-400 transition-colors">
                  Post Free Ad
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Safety Tips
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Report a Problem
                </span>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-semibold mb-3">Popular Cities</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Dubai
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Abu Dhabi
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Sharjah
                </span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">
                  Ajman
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} UAE Classifieds. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span>Made with ❤️ in the UAE 🇦🇪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
