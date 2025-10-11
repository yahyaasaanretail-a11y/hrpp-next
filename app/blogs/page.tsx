import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Insights, hiring tips, and updates for modern recruiters
          </h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Browse our latest articles by category. Each section highlights up to
            three recent posts so you can quickly dive into the topics that
            matter most to you.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="mt-16 text-center text-gray-500">
            Blogs are on their way. Please check back soon.
          </p>
        ) : (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const postsToDisplay = category.posts.slice(0, 3);

              return (
                <article
                  key={category.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {category.image_url ? (
                    <div className="relative h-44 w-full">
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        priority={false}
                      />
                    </div>
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                      <span className="text-xl font-semibold text-blue-700">
                        {category.name}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {category.name}
                      </h2>
                      {category.posts.length > 0 && (
                        <span className="text-sm font-medium text-blue-600">
                          {category.posts.length}{" "}
                          {category.posts.length === 1 ? "post" : "posts"}
                        </span>
                      )}
                    </div>

                    {postsToDisplay.length === 0 ? (
                      <p className="mt-6 text-sm text-gray-500">
                        We are preparing fresh content for this category. Stay
                        tuned!
                      </p>
                    ) : (
                      <div className="mt-6 space-y-4">
                        {postsToDisplay.map((post) => (
                          <Link
                            key={post.id}
                            href={`/blogs/${post.slug}`}
                            className="group flex gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
                          >
                            {post.image_url ? (
                              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                <Image
                                  src={post.image_url}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition duration-300 group-hover:scale-105"
                                  sizes="80px"
                                />
                              </div>
                            ) : (
                              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                {category.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div className="flex flex-col justify-center">
                              <h3 className="text-sm font-semibold text-gray-900 transition group-hover:text-blue-700">
                                {post.title}
                              </h3>
                              {post.published_at && (
                                <p className="mt-2 text-xs text-gray-500">
                                  {post.published_at}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
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
