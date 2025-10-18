import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import BlogShareButton from "@/components/BlogShareButton";

const API_BASE_URL = "https://admin.hrpostingpartner.com/api";

export const revalidate = 300;

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  excerpt?: string | null;
  image_url?: string | null;
  published_at?: string | null;
  published_at_readable?: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
  author?: {
    id: number;
    name: string;
  } | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    canonical_url?: string | null;
    image?: string | null;
    published_at?: string | null;
  } | null;
}

interface LatestBlogSummary {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  image_url?: string | null;
  published_at?: string | null;
  published_at_readable?: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

interface SimilarCategoryBlog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  image_url?: string | null;
  published_at?: string | null;
  published_at_readable?: string | null;
  is_featured?: boolean;
  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

const getBlog = cache(async (slug: string): Promise<BlogDetail | null> => {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    console.error(`Failed to fetch blog ${slug}`, res.statusText);
    return null;
  }

  const data = await res.json();
  return data?.data ?? null;
});

const getLatestBlogs = cache(
  async (excludeSlug: string): Promise<LatestBlogSummary[]> => {
    const url = new URL(`${API_BASE_URL}/blogs/latest`);
    if (excludeSlug) {
      url.searchParams.set("exclude", excludeSlug);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error("Failed to fetch latest blogs", res.statusText);
      return [];
    }

    const data = await res.json();
    const blogs = Array.isArray(data?.data) ? data.data : [];
    return blogs.slice(0, 5);
  },
);

const getSimilarCategoryBlogs = cache(
  async (
    categorySlug: string,
    excludeSlug: string,
  ): Promise<SimilarCategoryBlog[]> => {
    if (!categorySlug) {
      return [];
    }

    const url = new URL(
      `${API_BASE_URL}/blogs/categories/${encodeURIComponent(categorySlug)}/latest`,
    );

    console.log(url)

    if (excludeSlug) {
      url.searchParams.set("exclude", excludeSlug);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch similar category blogs for ${categorySlug}`,
        res.statusText,
      );
      return [];
    }

    const data = await res.json();
    const items = Array.isArray(data?.data) ? data.data : [];
    return items.slice(0, 5);
  },
);

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | HR Posting Partner",
      description: "The blog you are looking for is not available.",
    };
  }

  const title = blog.seo?.title || blog.title;
  const description = blog.seo?.description || blog.excerpt || "";
  const canonical =
    blog.seo?.canonical_url ||
    `https://www.hrpostingpartner.com/blogs/${blog.slug}`;
  const ogImage = blog.seo?.image || blog.image_url || undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function formatPublishedDate(
  blog: Pick<BlogDetail, "published_at" | "published_at_readable">,
): string | null {
  if (blog.published_at_readable) {
    return blog.published_at_readable;
  }

  if (blog.published_at) {
    const parsed = new Date(blog.published_at);
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

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const latestBlogs = await getLatestBlogs(blog.slug);
  const filteredLatestBlogs = latestBlogs.filter((item) => item.slug !== blog.slug);
  const similarCategoryBlogs = blog.category?.slug
    ? await getSimilarCategoryBlogs(blog.category.slug, blog.slug)
    : [];
  const similarCategoryHighlights = (() => {
    const highlights: Array<{
      categoryName: string;
      categorySlug: string | null;
      representative: SimilarCategoryBlog;
    }> = [];
    const seen = new Set<string>();

    for (const item of similarCategoryBlogs) {
      const categorySlug = item.category?.slug ?? `blog-${item.slug}`;

      if (seen.has(categorySlug)) {
        continue;
      }
      console.log(item)
      seen.add(categorySlug);
      highlights.push({
        categoryName: item?.title ?? "Related category",
        categorySlug: item?.slug ?? null,
        representative: item,
      });
    }

    return highlights.slice(0, 5);
  })();

  const shareUrl =
    blog.seo?.canonical_url ||
    `https://www.hrpostingpartner.com/blogs/${blog.slug}`;
  const formattedDate = formatPublishedDate(blog);

  return (
    <article className="bg-gray-50 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-blue-600">
          <Link href="/blogs" className="font-semibold hover:text-blue-700">
            Blogs
          </Link>
          {blog.category?.name && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-medium text-gray-500">
                {blog.category.name}
              </span>
            </>
          )}
        </nav>

        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {blog.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {blog.author?.name && (
            <span className="font-medium text-gray-700">
              By {blog.author.name}
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              Published {formattedDate}
            </span>
          )}
          {blog.category?.name && (
            <span className="flex items-center gap-2 text-gray-500">
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              {blog.category.name}
            </span>
          )}
          <BlogShareButton
            className="ml-auto"
            title={blog.title}
            url={shareUrl}
          />
        </div>

        {blog.image_url && (
          <div className="relative mt-8 overflow-hidden rounded-3xl bg-gray-200">
            <div className="relative aspect-[16/9] w-full lg:aspect-[21/9]">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 896px, 100vw"
                priority
              />
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div className="space-y-8">
            {blog.excerpt && (
              <p className="rounded-2xl bg-white p-6 text-lg font-medium text-gray-700 shadow-sm">
                {blog.excerpt}
              </p>
            )}

            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
              <div
                className="space-y-6 text-base leading-7 text-gray-700 [&_h2]:mt-10 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:text-xl [&_img]:rounded-lg [&_img]:shadow [&_p]:text-gray-700 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                dangerouslySetInnerHTML={{ __html: blog.content_html }}
              />
            </div>

            <div className="flex justify-center">
              <Link
                href="/blogs"
                className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
              >
                Back to all blogs
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Latest blogs
              </h2>
              {filteredLatestBlogs.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">
                  Fresh posts will appear here soon. In the meantime, explore
                  more stories from our main blog hub.
                </p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {filteredLatestBlogs.map((item) => {
                    const publishedLabel = formatPublishedDate(item);

                    return (
                      <li
                        key={item.id}
                        className="group flex items-start gap-4 rounded-2xl bg-blue-50/50 p-3 transition hover:bg-blue-100/70"
                      >
                        {item.image_url && (
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-blue-100">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="flex min-w-0 flex-col gap-1">
                          {item.category?.name && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                              {item.category.name}
                            </span>
                          )}
                          <Link
                            href={`/blogs/${item.slug}`}
                            className="line-clamp-2 text-sm font-semibold text-gray-900 transition group-hover:text-blue-700"
                          >
                            {item.title}
                          </Link>
                          {publishedLabel && (
                            <span className="text-xs text-gray-500">
                              {publishedLabel}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {similarCategoryHighlights.length > 0 && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Explore similar categories
                </h2>
                <ul className="mt-4 space-y-4">
                  {similarCategoryHighlights.map(({ categoryName, categorySlug, representative }) => {
                    const categoryHref = categorySlug
                      ? `/blogs/categories/${categorySlug}`
                      : `/blogs/${representative.slug}`;
                    const publishedLabel = formatPublishedDate(representative);

                    return (
                      <li
                        key={`${categorySlug ?? representative.slug}`}
                        className="group flex items-start gap-4 rounded-2xl bg-indigo-50/40 p-3 transition hover:bg-indigo-100/70"
                      >
                        {representative.image_url && (
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-indigo-100">
                            <Image
                              src={representative.image_url}
                              alt={categoryName}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="flex min-w-0 flex-col gap-1">
                          <Link
                            href={categoryHref}
                            className="text-sm font-semibold text-gray-900 transition group-hover:text-indigo-700"
                          >
                            {categoryName}
                          </Link>
                          <p className="line-clamp-2 text-xs text-gray-600">
                            {representative.excerpt || representative.title}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-gray-500">
                            {publishedLabel && <span>{publishedLabel}</span>}
                            <Link
                              href={categoryHref}
                              className="inline-flex items-center gap-1 font-semibold text-indigo-600 transition hover:text-indigo-700"
                            >
                              View posts
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
