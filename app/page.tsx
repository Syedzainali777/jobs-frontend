import Link from "next/link";
import { getLatestArticles } from "@/lib/api";
import { CATEGORIES } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

export default async function HomePage() {
  const { data: articles } = await getLatestArticles(12);

  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight max-w-3xl">
            Insights that matter for your career and growth
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-stone-600 max-w-2xl">
            Stay informed with the latest opportunities, educational resources, and technology trends.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-full hover:border-stone-300 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {articles.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <h2 className="text-lg sm:text-xl font-medium text-stone-900">No articles yet</h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">Check back soon for new content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Featured Article */}
            <div className="lg:col-span-2">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                Featured
              </span>
              <div className="mt-3 sm:mt-4">
                <ArticleCard article={featuredArticle} featured />
              </div>
            </div>

            {/* Latest Articles */}
            <div className="lg:col-span-1">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                Latest
              </span>
              <div className="mt-3 sm:mt-4 space-y-4 sm:space-y-6">
                {remainingArticles.slice(0, 5).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* More Articles Grid */}
        {remainingArticles.length > 5 && (
          <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-stone-200">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              More Stories
            </h2>
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {remainingArticles.slice(5).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
