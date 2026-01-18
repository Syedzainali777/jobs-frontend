import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/api";
import { CATEGORIES } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: category.name,
    description: `Browse the latest ${category.name.toLowerCase()} articles and updates.`,
    openGraph: {
      title: `${category.name} | Insight`,
      description: `Browse the latest ${category.name.toLowerCase()} articles and updates.`,
    },
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const { data: articles } = await getArticlesByCategory(slug, 20);

  return (
    <>
      {/* Category Header */}
      <section className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-stone-900">{category.name}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight">
            {category.name}
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-stone-600">
            Browse the latest {category.name.toLowerCase()} articles and opportunities.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  cat.slug === slug
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:text-stone-900 bg-white border border-stone-200 hover:border-stone-300"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Articles */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {articles.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <h2 className="text-lg sm:text-xl font-medium text-stone-900">
              No articles in this category
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Check back soon for new content.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {articles[0] && (
              <div className="mb-8 sm:mb-12">
                <ArticleCard article={articles[0]} featured />
              </div>
            )}

            {/* Article Grid */}
            {articles.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {articles.slice(1).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

