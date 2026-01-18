import Link from "next/link";
import { CATEGORIES } from "@/lib/types";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <Link
              href="/"
              className="text-base sm:text-lg font-semibold text-stone-900"
            >
              Insight
            </Link>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Your trusted source for the latest in jobs, education, scholarships, 
              and technology news.
            </p>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-medium text-stone-900 uppercase tracking-wider">
              Categories
            </h3>
            <nav className="mt-3 sm:mt-4 flex flex-col gap-1.5 sm:gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="text-xs sm:text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="relative sm:col-span-2 md:col-span-1">
            <h3 className="text-xs sm:text-sm font-medium text-stone-900 uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-stone-600">
              Subscribe to our newsletter for the latest updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-500">
            <p>© {currentYear} Insight. All rights reserved.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/privacy" className="hover:text-stone-900 transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-stone-900 transition-colors">
                Terms of Service
              </Link>
              <span>·</span>
              <Link href="/about" className="hover:text-stone-900 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
