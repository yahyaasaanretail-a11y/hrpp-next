import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

const API_BASE_URL = "https://admin.hrpostingpartner.com/api";

export const revalidate = 300;

interface CategorySummary {
  id: number;
  name: string;
  slug: string;
  total_posts: number;
}

interface CategoryPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  image_url?: string | null;
  published_at?: string | null;
  published_at_readable?: string | null;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  has_more: boolean;
}

interface CategoryPostsResponse {
  category: CategorySummary;
  data: CategoryPost[];
  meta: PaginationMeta;
}

const getCategoryPosts = cache(
  async (slug: string, page: number): Promise<CategoryPostsResponse | null> => {
    const url = new URL(
      `${API_BASE_URL}/blogs/categories/${encodeURIComponent(slug)}/posts`,
    );

    if (page > 1) {
      url.searchParams.set("page", String(page));
    }

    const res = await fetch(url.toString(), {
      next: { revalidate },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }

      console.error(`Failed to fetch category ${slug}`, res.statusText);
      return null;
    }

    const data = await res.json();
    if (!data || !data.category) {
      return null;
    }

    const meta: PaginationMeta | null = data?.meta
      ? {
          current_page: Number(data.meta.current_page) || 1,
          last_page: Number(data.meta.last_page) || 1,
          per_page: Number(data.meta.per_page) || 10,
          total: Number(data.meta.total) || data.category?.total_posts || 0,
          has_more: Boolean(data.meta.has_more),
        }
      : null;

    return {
      category: data.category as CategorySummary,
      data: Array.isArray(data.data) ? (data.data as CategoryPost[]) : [],
      meta: meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: Array.isArray(data.data) ? data.data.length : 0,
        total:
          data.category?.total_posts ??
          (Array.isArray(data.data) ? data.data.length : 0),
        has_more: false,
      },
    };
  },
);

type BlogCategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

function parsePage(page?: string): number {
  const parsed = Number(page);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

function buildPageHref(slug: string, page: number): string {
  if (page <= 1) {
    return `/blogs/categories/${slug}`;
  }

  return `/blogs/categories/${slug}?page=${page}`;
}

function getPublishedLabel(post: CategoryPost): string | null {
  if (post.published_at_readable) {
    return post.published_at_readable;
  }

  if (post.published_at) {
    const parsed = new Date(post.published_at);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = await getCategoryPosts(slug, 1);

  if (!categoryData) {
    return {
      title: "Category Not Found | HR Posting Partner",
      description: "The blog category you are looking for does not exist.",
    };
  }

  const { category } = categoryData;
  const title = `${category.name} Blogs | HR Posting Partner`;
  const description = `Read the latest ${category.name} articles from HR Posting Partner.`;
  const canonical = `https://www.hrpostingpartner.com/blogs/categories/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: BlogCategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const categoryData = await getCategoryPosts(slug, page);

  if (!categoryData) {
    notFound();
  }

  const { category, data: posts, meta } = categoryData;

  if (page > meta.last_page && meta.total > 0) {
    notFound();
  }

  return (
    <div className="bg-gray-50 pb-16 pt-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-blue-600">
          <Link href="/blogs" className="font-semibold hover:text-blue-700">
            Blogs
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-medium text-gray-500">{category.name}</span>
        </nav>

        <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-2 max-w-3xl text-base text-gray-600">
              Explore every article we have published in the {category.name}{" "}
              category. New posts appear here automatically as they go live.
            </p>
          </div>
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {category.total_posts}{" "}
            {category.total_posts === 1 ? "post" : "posts"}
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-blue-200 bg-white/70 p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Content coming soon
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              We are preparing new insights for this category. Please check back
              shortly.
            </p>
            <div className="mt-6">
              <Link
                href="/blogs"
                className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
              >
                Browse other categories
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const publishedLabel = getPublishedLabel(post);

                return (
                  <article
                    key={post.id}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    {post.image_url && (
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 100vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-grow flex-col p-6">
                      <h2 className="text-lg font-semibold text-gray-900">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="hover:text-blue-700"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex flex-1 items-end justify-between text-sm text-gray-500">
                        {publishedLabel && (
                          <span>Published {publishedLabel}</span>
                        )}
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Read more
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {meta.total > meta.per_page && (
              <nav
                className="mt-12 flex items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm sm:px-6"
                aria-label="Pagination"
              >
                <div>
                  Page {meta.current_page} of {meta.last_page}
                </div>
                <div className="flex items-center gap-3">
                  {meta.current_page > 1 ? (
                    <Link
                      href={buildPageHref(category.slug, meta.current_page - 1)}
                      className="inline-flex items-center rounded-full border border-gray-200 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-gray-100 px-4 py-2 text-gray-400">
                      ← Previous
                    </span>
                  )}
                  {meta.has_more ? (
                    <Link
                      href={buildPageHref(category.slug, meta.current_page + 1)}
                      className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-gray-100 px-4 py-2 text-gray-400">
                      Next →
                    </span>
                  )}
                </div>
              </nav>
            )}
          </>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            Back to all blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
