import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogSearch from "@/components/BlogSearch";

const API_BASE_URL = "https://admin.hrpostingpartner.com/api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blogs | HR Posting Partner",
  description:
    "Explore the latest insights, hiring tips, and company updates from HR Posting Partner. Browse blog categories and discover the three most recent articles in each area.",
  alternates: {
    canonical: "https://www.hrpostingpartner.com/blogs",
  },
  openGraph: {
    title: "Blogs | HR Posting Partner",
    description:
      "Discover the latest articles from HR Posting Partner across hiring, job posting, and recruiting best practices.",
    url: "https://www.hrpostingpartner.com/blogs",
    siteName: "HR Posting Partner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | HR Posting Partner",
    description:
      "Stay up to date with HR Posting Partner news, insights, and hiring resources.",
  },
};

interface BlogSummary {
  id: number;
  title: string;
  slug: string;
  image_url: string | null;
  published_at: string | null;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
  posts: BlogSummary[];
}

async function getCategories(): Promise<BlogCategory[]> {
  const res = await fetch(`${API_BASE_URL}/blogs/categories`, {
    next: { revalidate },
  });

  if (!res.ok) {
    console.error("Failed to fetch blog categories", res.statusText);
    return [];
  }

  const data = await res.json();
  return Array.isArray(data?.data) ? data.data : [];
}

export default async function BlogsPage() {
  const categories = await getCategories();

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            HR Posting Partner Blog
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Insights, hiring tips, and updates for modern recruiters
          </h1>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Browse our latest articles by category. Each section highlights up to
            three recent posts so you can quickly dive into the topics that
            matter most to you.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <BlogSearch />
        </div>

        {categories.length === 0 ? (
          <p className="mt-12 text-center text-gray-500">
            Blogs are on their way. Please check back soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const posts = Array.isArray(category.posts)
                ? category.posts
                : [];
              const postsToDisplay = posts.slice(0, 3);
              const initials = (
                category.name ||
                category.slug ||
                "HR"
              )
                .slice(0, 2)
                .toUpperCase();
              const categoryHref = category.slug
                ? `/blogs/categories/${category.slug}`
                : "/blogs";
              const postsCount = posts.length;

              return (
                <article
                  key={category.id}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white/90 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  {category.image_url && (
                    <div className="relative aspect-[5/2.5] w-full">
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 100vw"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={categoryHref}
                        className="group flex items-center gap-3"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold uppercase text-blue-700">
                          {initials}
                        </span>
                        <h2 className="text-lg font-semibold text-gray-900 transition group-hover:text-blue-700">
                          {category.name}
                        </h2>
                      </Link>
                      {postsCount > 0 && (
                        <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
                          {postsCount} {postsCount === 1 ? "post" : "posts"}
                        </span>
                      )}
                    </div>

                    {postsToDisplay.length === 0 ? (
                      <p className="mt-5 text-sm text-gray-500">
                        We are preparing fresh content for this category. Stay
                        tuned!
                      </p>
                    ) : (
                      <ul className="mt-5 space-y-2">
                        {postsToDisplay.map((post) => (
                          <li key={post.id} className="flex flex-col">
                            <Link
                              href={`/blogs/${post.slug}`}
                              className="group inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition hover:text-blue-800"
                            >
                              <span className="line-clamp-2">{post.title}</span>
                              <span className="text-xs text-blue-300 transition group-hover:translate-x-1">
                                &rarr;
                              </span>
                            </Link>
                            {post.published_at && (
                              <span className="text-xs text-gray-400">
                                {post.published_at}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {category.slug && (
                      <div>
                        <Link
                          href={categoryHref}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                        >
                          View all posts
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

