// app/jobs/JobListSection.tsx
import Link from "next/link";

export const revalidate = 60;

interface Job {
  id: number;
  title: string;
  slug: string;
  posted_at: string;
  expiry_date: string;
  description: string;
  short_description?: string;
  image_path?: string;
  locations: string[];
  roles: string[];
}

interface JobListSectionProps {
  page?: number;
  searchParams?: Record<string, string>;
}

async function getJobs(
  page = 1,
  filters: JobListSectionProps["searchParams"] = {}
): Promise<{ data: Job[]; last_page: number }> {
  // ✅ Normalize filters to ensure it's a plain object
  let safeFilters: Record<string, string> = { page: page.toString() };

  if (filters instanceof URLSearchParams) {
    for (const [key, value] of filters.entries()) {
      if (value) safeFilters[key] = value;
    }
  } else if (filters && typeof filters === "object") {
    safeFilters = {
      ...safeFilters,
      ...Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) => typeof value === "string" && value !== ""
        )
      ),
    };
  }

  const query = new URLSearchParams(safeFilters).toString();

  const res = await fetch(
    `http://localhost:8000/api/jobs?${query}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch jobs");

  const data = await res.json();
  return { data: data.data, last_page: data.meta?.last_page || 1 };
}

export default async function JobListSection({
  page = 1,
  searchParams = {},
}: JobListSectionProps) {
  const { data: jobs, last_page } = await getJobs(page, searchParams);

  if (!jobs || jobs.length === 0) {
    return <p className="text-center text-gray-500">No jobs found.</p>;
  }

  const queryString = new URLSearchParams(
    Object.entries(searchParams || {}).reduce((acc, [key, value]) => {
      if (key !== "page" && typeof value === "string") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  const pagePath = `/classified-jobs${
    queryString ? `?${queryString}&page=` : `?page=`
  }`;

  return (
    <div className="space-y-6">
  {jobs.map((job) => (
    <Link
      key={job.id}
      href={`/classified-jobs/${job.slug}`}
      className="block border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        {job.image_path && (
          <img
            src={job.image_path}
            alt={job.title}
            className="w-20 h-20 sm:w-16 sm:h-16 rounded object-cover mx-auto sm:mx-0"
          />
        )}

        <div className="text-center sm:text-left flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-1">
            {job.title}
          </h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1 text-xs text-gray-500">
            <p>Posted: {job.posted_at}</p>
            <p>Expires: {job.expiry_date ?? "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-700 line-clamp-3 mb-3">
        {job.short_description}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {job.locations?.map((loc) => (
          <span
            key={loc}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
          >
            📍 {loc}
          </span>
        ))}
        {job.roles?.map((role, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            #{role}
          </span>
        ))}
      </div>
    </Link>
  ))}

  {/* Pagination */}
  <div className="flex flex-wrap justify-center gap-2 mt-10">
    {Array.from({ length: last_page }, (_, i) => (
      <Link
        key={i + 1}
        href={`${pagePath}${i + 1}`}
        className={`px-4 py-2 rounded border text-sm transition ${
          page === i + 1
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
        }`}
      >
        {i + 1}
      </Link>
    ))}
  </div>
</div>

  );
}
