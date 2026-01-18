const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Types
export interface StrapiImage {
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  // Strapi v4 nested structure
  data?: {
    id?: number;
    attributes?: {
      url: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    };
  };
  attributes?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export interface BlockChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  url?: string;
  children?: BlockChild[];
}

export interface Block {
  type: string;
  level?: number;
  format?: string;
  children?: BlockChild[];
  image?: StrapiImage;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: Block[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: StrapiImage;
  category?: Category;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Fetch utilities
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}/api${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Articles
export async function getArticles(params?: {
  category?: string;
  limit?: number;
  page?: number;
}): Promise<StrapiResponse<Article[]>> {
  const searchParams = new URLSearchParams();
  searchParams.set("populate", "*");
  searchParams.set("sort", "publishedAt:desc");

  if (params?.category) {
    searchParams.set("filters[category][slug][$eq]", params.category);
  }

  if (params?.limit) {
    searchParams.set("pagination[pageSize]", params.limit.toString());
  }

  if (params?.page) {
    searchParams.set("pagination[page]", params.page.toString());
  }

  return fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${searchParams.toString()}`
  );
}

export async function getArticleBySlug(
  slug: string
): Promise<StrapiResponse<Article[]>> {
  const searchParams = new URLSearchParams();
  searchParams.set("filters[slug][$eq]", slug);
  searchParams.set("populate", "*");

  return fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${searchParams.toString()}`
  );
}

export async function getLatestArticles(
  limit: number = 10
): Promise<StrapiResponse<Article[]>> {
  return getArticles({ limit });
}

export async function getArticlesByCategory(
  categorySlug: string,
  limit?: number
): Promise<StrapiResponse<Article[]>> {
  return getArticles({ category: categorySlug, limit });
}

// Categories
export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  return fetchAPI<StrapiResponse<Category[]>>("/categories?populate=*");
}

export async function getCategoryBySlug(
  slug: string
): Promise<StrapiResponse<Category[]>> {
  const searchParams = new URLSearchParams();
  searchParams.set("filters[slug][$eq]", slug);

  return fetchAPI<StrapiResponse<Category[]>>(
    `/categories?${searchParams.toString()}`
  );
}

// Image URL helper
export function getStrapiImageUrl(image?: StrapiImage | any): string | null {
  if (!image) return null;

  // Handle Strapi v4 nested structure
  let imageUrl: string | undefined;

  if (image?.data?.attributes) {
    // Nested structure: { data: { attributes: { url: ... } } }
    imageUrl = image.data.attributes.url;
  } else if (image?.attributes) {
    // Alternative nested: { attributes: { url: ... } }
    imageUrl = image.attributes.url;
  } else if (image?.url) {
    // Flat structure: { url: ... }
    imageUrl = image.url;
  }

  if (!imageUrl) return null;

  // If already a full URL, return as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Otherwise, prepend API URL
  return `${API_URL}${imageUrl}`;
}

// Get image alternative text helper
export function getStrapiImageAlt(image?: StrapiImage | any): string | undefined {
  if (!image) return undefined;

  if (image?.data?.attributes) {
    return image.data.attributes.alternativeText;
  } else if (image?.attributes) {
    return image.attributes.alternativeText;
  } else if (image?.alternativeText) {
    return image.alternativeText;
  }

  return undefined;
}

// Date formatting
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Reading time estimate
export function estimateReadingTime(blocks?: Block[]): number {
  if (!blocks) return 1;

  let wordCount = 0;

  function countWords(children?: BlockChild[]) {
    children?.forEach((child) => {
      if (child.text) {
        wordCount += child.text.split(/\s+/).filter(Boolean).length;
      }
      if (child.children) {
        countWords(child.children);
      }
    });
  }

  blocks.forEach((block) => countWords(block.children));

  return Math.max(1, Math.ceil(wordCount / 200));
}

