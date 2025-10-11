import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

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

type BlogPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = await getBlog(params.slug);

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

function formatPublishedDate(blog: BlogDetail): string | null {
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
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = formatPublishedDate(blog);

  return (
    <article className="bg-gray-50 pb-16 pt-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
        </div>

        {blog.image_url && (
          <div className="relative mt-8 overflow-hidden rounded-3xl bg-gray-200">
            <div className="relative aspect-[16/9] w-full">
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

        {blog.excerpt && (
          <p className="mt-8 rounded-2xl bg-white p-6 text-lg font-medium text-gray-700 shadow-sm">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <div
            className="space-y-6 text-base leading-7 text-gray-700 [&_h2]:mt-10 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:text-xl [&_img]:rounded-lg [&_img]:shadow [&_p]:text-gray-700 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
            dangerouslySetInnerHTML={{ __html: blog.content_html }}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            Back to all blogs
          </Link>
        </div>
      </div>
    </article>
  );
}
