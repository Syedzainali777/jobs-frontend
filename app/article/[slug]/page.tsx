import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import StrapiImage from "@/components/StrapiImage";
import {
  getArticleBySlug,
  getLatestArticles,
  formatDate,
  getStrapiImageUrl,
  getStrapiImageAlt,
  estimateReadingTime,
} from "@/lib/api";
import BlockRenderer from "@/components/BlockRenderer";
import ArticleCard from "@/components/ArticleCard";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: articles } = await getArticleBySlug(slug);
  const article = articles[0];

  if (!article) {
    return { title: "Article Not Found" };
  }

  const imageUrl = getStrapiImageUrl(article.featuredImage);

  return {
    title: article.title,
    description: article.excerpt || `Read ${article.title} on Insight`,
    openGraph: {
      title: article.title,
      description: article.excerpt || `Read ${article.title} on Insight`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || `Read ${article.title} on Insight`,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { data: articles } = await getArticleBySlug(slug);
  const article = articles[0];

  if (!article) {
    notFound();
  }

  const { data: relatedArticles } = await getLatestArticles(4);
  const filteredRelated = relatedArticles.filter((a) => a.id !== article.id).slice(0, 3);

  const imageUrl = getStrapiImageUrl(article.featuredImage);
  const imageAlt = getStrapiImageAlt(article.featuredImage) || article.title;
  const readingTime = estimateReadingTime(article.content);

  return (
    <>
      {/* Article Header */}
      <article>
        <header className="border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-4 sm:mb-6">
              <Link href="/" className="hover:text-stone-900 transition-colors">
                Home
              </Link>
              {article.category && (
                <>
                  <span>/</span>
                  <Link
                    href={`/category/${article.category.slug}`}
                    className="hover:text-stone-900 transition-colors"
                  >
                    {article.category.name}
                  </Link>
                </>
              )}
            </nav>

            {/* Category Badge */}
            {article.category && (
              <Link
                href={`/category/${article.category.slug}`}
                className="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-3 sm:mb-4 hover:bg-amber-100 transition-colors"
              >
                {article.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-stone-600 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-500">
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {imageUrl && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg sm:rounded-xl bg-stone-100">
              <StrapiImage
                image={article.featuredImage}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
            {imageAlt && imageAlt !== article.title && (
              <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm text-stone-500">
                {imageAlt}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <BlockRenderer blocks={article.content} />
        </div>

        {/* Share & Back */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="pt-6 sm:pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xs sm:text-sm text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to all articles
            </Link>

            {article.category && (
              <Link
                href={`/category/${article.category.slug}`}
                className="text-xs sm:text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors"
              >
                More in {article.category.name} →
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {filteredRelated.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-6 sm:mb-8">
              More Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {filteredRelated.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

