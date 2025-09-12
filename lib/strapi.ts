const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "https://phenomenal-example-f9a76ee58b.strapiapp.com";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Content block types
interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

interface QuoteBlock {
  __component: "shared.quote";
  id: number;
  title: string;
  body?: string;
}

interface MediaBlock {
  __component: "shared.media";
  id: number;
  file: {
    url: string;
    alternativeText?: string;
    caption?: string;
  };
}

type ContentBlock = RichTextBlock | QuoteBlock | MediaBlock;

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

// Media format interface for Strapi
interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

// Full media object from Strapi
interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
  cover?: StrapiMedia;
  author?: {
    id: number;
    documentId: string;
    name: string;
    email?: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar?: StrapiMedia;
  };
  category?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  blocks?: ContentBlock[];
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
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
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
async function fetchAPI(
  path: string,
  options: RequestInit = {},
): Promise<unknown> {
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
      `Strapi API error: ${response.status} ${response.statusText}`,
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
  } = {},
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

  const response = await fetchAPI(`/articles?${params.toString()}`) as StrapiResponse<BlogPost[]>;
  
  // Ensure all posts have valid slugs
  const postsWithSlugs = response.data.map(ensurePostSlug);
  
  return {
    ...response,
    data: postsWithSlugs
  };
}

export async function getBlogPost(
  slug: string,
): Promise<StrapiResponse<BlogPost[]>> {
  // First try to get by slug
  let params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate[cover]": "true",
    "populate[author][populate][avatar]": "true",
    "populate[category]": "true",
    "populate[blocks]": "true",
  });

  let response = await fetchAPI(`/articles?${params.toString()}`) as StrapiResponse<BlogPost[]>;
  
  // If not found by slug, try to get all posts and find by generated slug
  if (response.data.length === 0) {
    params = new URLSearchParams({
      "populate[cover]": "true",
      "populate[author][populate][avatar]": "true",
      "populate[category]": "true",
      "populate[blocks]": "true",
    });
    
    const allPostsResponse = await fetchAPI(`/articles?${params.toString()}`) as StrapiResponse<BlogPost[]>;
    const postsWithSlugs = allPostsResponse.data.map(ensurePostSlug);
    
    // Find post by generated slug
    const foundPost = postsWithSlugs.find(post => post.slug === slug);
    
    if (foundPost) {
      response = {
        data: [foundPost],
        meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } }
      };
    }
  } else {
    // Ensure slug is set for found post
    response.data = response.data.map(ensurePostSlug);
  }
  
  return response;
}

export async function getFeaturedBlogPosts(
  limit: number = 3,
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

  return fetchAPI(`/categories?${params.toString()}`) as Promise<
    StrapiResponse<Category[]>
  >;
}

export async function getCategory(
  slug: string,
): Promise<StrapiResponse<Category[]>> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
  });

  return fetchAPI(`/categories?${params.toString()}`) as Promise<
    StrapiResponse<Category[]>
  >;
}

// Authors API functions
export async function getAuthors(): Promise<StrapiResponse<Author[]>> {
  const params = new URLSearchParams({
    "populate[avatar]": "true",
    sort: "name:asc",
  });

  return fetchAPI(`/authors?${params.toString()}`) as Promise<
    StrapiResponse<Author[]>
  >;
}

export async function getAuthor(id: number): Promise<StrapiResponse<Author>> {
  const params = new URLSearchParams({
    "populate[avatar]": "true",
  });

  return fetchAPI(`/authors/${id}?${params.toString()}`) as Promise<
    StrapiResponse<Author>
  >;
}

// Helper function to get media URL with optional size preference
export function getStrapiMediaURL(
  media: StrapiMedia | { url?: string } | null | undefined,
  size: "thumbnail" | "small" | "medium" | "large" | "original" = "original",
): string | null {
  if (!media) return null;

  // Handle new StrapiMedia structure
  if ("formats" in media && media.formats && size !== "original") {
    const format = media.formats[size];
    if (format?.url) {
      // If it's already a full HTTP/HTTPS URL, return as is
      if (
        format.url.startsWith("http://") ||
        format.url.startsWith("https://")
      ) {
        return format.url;
      }
      // If it's a relative path, prepend the base URL
      if (format.url.startsWith("/")) {
        return `${STRAPI_URL}${format.url}`;
      }
      return `${STRAPI_URL}/${format.url}`;
    }
  }

  // Fallback to main URL
  const mainUrl = "url" in media ? media.url : undefined;
  if (!mainUrl) return null;

  // If it's already a full HTTP/HTTPS URL, return as is
  if (mainUrl.startsWith("http://") || mainUrl.startsWith("https://")) {
    return mainUrl;
  }

  // If it's a relative path (starts with /), prepend the base URL
  if (mainUrl.startsWith("/")) {
    return `${STRAPI_URL}${mainUrl}`;
  }

  // For any other format, treat as relative and prepend base URL with slash
  return `${STRAPI_URL}/${mainUrl}`;
}

// Helper function to generate slug from title if slug is null
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Helper function to ensure post has valid slug
export function ensurePostSlug(post: BlogPost): BlogPost {
  return {
    ...post,
    slug: post.slug || generateSlugFromTitle(post.title)
  };
}

// Export types for use in components
export type {
  BlogPost,
  Category,
  Author,
  StrapiResponse,
  StrapiMedia,
  MediaFormat,
};