const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  reading_time?: number;
  is_featured?: boolean;
  published_at?: string;
  createdAt: string;
  updatedAt: string;
  cover?: {
    url: string;
    alternativeText?: string;
  };
  author?: {
    name: string;
    bio?: string;
    avatar?: {
      url: string;
      alternativeText?: string;
    };
  };
  category?: {
    name: string;
    slug: string;
    description?: string;
  };
  blocks?: any[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface Author {
  id: number;
  name: string;
  bio?: string;
  email?: string;
  social_links?: any;
  avatar?: {
    url: string;
    alternativeText?: string;
  };
}

// Helper function to build Strapi URL
function getStrapiURL(path: string = ""): string {
  return `${STRAPI_URL}/api${path}`;
}

// Helper function to fetch data from Strapi
async function fetchAPI(path: string, options: RequestInit = {}): Promise<any> {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(
      `Strapi API error: ${response.status} ${response.statusText}`
    );
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }

  return response.json();
}

// Blog Posts API functions
export async function getBlogPosts(
  options: {
    page?: number;
    pageSize?: number;
    featured?: boolean;
    category?: string;
    search?: string;
  } = {}
): Promise<StrapiResponse<BlogPost[]>> {
  const { page = 1, pageSize = 10, featured, category, search } = options;

  const params = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    "populate[cover]": "true",
    "populate[author][populate][avatar]": "true",
    "populate[category]": "true",
    sort: "createdAt:desc",
  });

  // Add filters
  if (featured !== undefined) {
    params.append("filters[is_featured][$eq]", featured.toString());
  }

  if (category) {
    params.append("filters[category][slug][$eq]", category);
  }

  if (search) {
    params.append("filters[title][$containsi]", search);
  }

  return fetchAPI(`/articles?${params.toString()}`);
}

export async function getBlogPost(
  slug: string
): Promise<StrapiResponse<BlogPost[]>> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[cover]": "true",
    "populate[author][populate][avatar]": "true",
    "populate[category]": "true",
    "populate[blocks]": "true",
    "populate[seo]": "true",
  });

  return fetchAPI(`/articles?${params.toString()}`);
}

export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<StrapiResponse<BlogPost[]>> {
  return getBlogPosts({
    pageSize: limit,
    featured: true,
  });
}

// Categories API functions
export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  const params = new URLSearchParams({
    sort: "name:asc",
  });

  return fetchAPI(`/categories?${params.toString()}`);
}

export async function getCategory(
  slug: string
): Promise<StrapiResponse<Category[]>> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
  });

  return fetchAPI(`/categories?${params.toString()}`);
}

// Authors API functions
export async function getAuthors(): Promise<StrapiResponse<Author[]>> {
  const params = new URLSearchParams({
    "populate[avatar]": "true",
    sort: "name:asc",
  });

  return fetchAPI(`/authors?${params.toString()}`);
}

export async function getAuthor(id: number): Promise<StrapiResponse<Author>> {
  const params = new URLSearchParams({
    "populate[avatar]": "true",
  });

  return fetchAPI(`/authors/${id}?${params.toString()}`);
}

// Helper function to get media URL
export function getStrapiMediaURL(media: any): string {
  if (!media?.url) return "";

  if (media.url.startsWith("http")) {
    return media.url;
  }

  // For local images in public folder, return as is
  if (media.url.startsWith("/blog/") ?? media.url.startsWith("/")) {
    return media.url;
  }

  return `${STRAPI_URL}${media.url}`;
}

// Export types for use in components
export type { BlogPost, Category, Author, StrapiResponse };
