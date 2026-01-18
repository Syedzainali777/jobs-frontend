export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero Skeleton */}
      <div className="mb-12">
        <div className="h-10 w-3/4 bg-stone-200 rounded-lg animate-pulse" />
        <div className="mt-4 h-6 w-1/2 bg-stone-100 rounded-lg animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Featured */}
        <div className="lg:col-span-2">
          <div className="aspect-[16/9] bg-stone-200 rounded-xl animate-pulse" />
          <div className="mt-6 h-8 w-3/4 bg-stone-200 rounded-lg animate-pulse" />
          <div className="mt-3 h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="mt-2 h-4 w-2/3 bg-stone-100 rounded animate-pulse" />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-24 h-24 bg-stone-200 rounded-lg animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <div className="h-5 w-full bg-stone-200 rounded animate-pulse" />
                <div className="mt-2 h-4 w-1/2 bg-stone-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

