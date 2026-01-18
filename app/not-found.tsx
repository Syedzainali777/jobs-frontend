import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
      <h1 className="text-6xl font-semibold text-stone-900">404</h1>
      <p className="mt-4 text-xl text-stone-600">Page not found</p>
      <p className="mt-2 text-stone-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

