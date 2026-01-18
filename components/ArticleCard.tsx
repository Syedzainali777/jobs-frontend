import Link from "next/link";
import StrapiImage from "./StrapiImage";
import { Article, formatDate, getStrapiImageUrl, getStrapiImageAlt, estimateReadingTime } from "@/lib/api";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const imageUrl = getStrapiImageUrl(article.featuredImage);
  const imageAlt = getStrapiImageAlt(article.featuredImage) || article.title;
  const readingTime = estimateReadingTime(article.content);

  if (featured) {
    return (
      <article className="group">
        <Link href={`/article/${article.slug}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-stone-100">
            {imageUrl ? (
              <StrapiImage
                image={article.featuredImage}
                alt={imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-stone-400 text-sm">No image</span>
              </div>
            )}
          </div>

          <div className="mt-4 sm:mt-6">
            {article.category && (
              <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full mb-2 sm:mb-3">
                {article.category.name}
              </span>
            )}

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 group-hover:text-stone-600 transition-colors leading-tight">
              {article.title}
            </h2>

            {article.excerpt && (
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-stone-600 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            )}

            <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-500">
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/article/${article.slug}`} className="flex gap-3 sm:gap-4 md:gap-6">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
          {imageUrl ? (
            <StrapiImage
              image={article.featuredImage}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-stone-400 text-xs">No image</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {article.category && (
            <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mb-1.5 sm:mb-2">
              {article.category.name}
            </span>
          )}

          <h3 className="text-sm sm:text-base md:text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2 text-xs text-stone-500">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span>·</span>
            <span>{readingTime} min</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

