"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold text-stone-900">
        Something went wrong
      </h1>
      <p className="mt-4 text-stone-600">
        We encountered an error loading this page.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-6 py-3 text-sm font-medium text-stone-900 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

