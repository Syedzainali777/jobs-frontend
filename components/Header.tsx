import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            href="/"
            className="text-lg sm:text-xl font-semibold tracking-tight text-stone-900 hover:text-stone-700 transition-colors"
          >
            Insight
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="px-3 py-2 text-sm text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="group">
        <summary className="list-none p-2 cursor-pointer">
          <svg
            className="w-6 h-6 text-stone-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
              className="group-open:hidden"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
              className="hidden group-open:block"
            />
          </svg>
        </summary>
        <nav className="absolute left-0 right-0 top-14 sm:top-16 bg-white border-b border-stone-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-col gap-0.5 sm:gap-1">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="px-4 py-2.5 sm:py-3 text-sm sm:text-base text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-md transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </details>
    </div>
  );
}

