// app/jobs/JobListSection.tsx
import Link from 'next/link';

export const revalidate = 60;

interface Job {
  id: number;
  title: string;
  slug: string;
  posted_at: string;
  description: string;
  short_description?: string;
  image_path?: string;
  locations: string[];
  roles: string[];
}

interface JobListSectionProps {
  page?: number;
  totalPages?: number;
}

async function getJobs(page = 1): Promise<{ data: Job[]; last_page: number }> {
  const res = await fetch(`https://admin.hrpostingpartner.com/api/jobs?page=${page}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch jobs');

  const data = await res.json();
  return { data: data.data, last_page: data.meta?.last_page || 1 };
}

export default async function JobListSection({ page = 1 }: JobListSectionProps) {
  const { data: jobs, last_page } = await getJobs(page);

  if (!jobs || jobs.length === 0) {
    return <p className="text-center text-gray-500">No jobs found.</p>;
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/classified-jobs/${job.slug}`}
          className="block border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50"
        >
          <div className="flex items-center gap-4 mb-4">
            {job.image_path && (
              <img
                src={`${job.image_path}`}
                alt={job.title}
                className="w-16 h-16 rounded object-cover"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-blue-700">{job.title}</h2>
              <p className="text-sm text-gray-400">Posted on: {job.posted_at}</p>
            </div>
          </div>

          <div className="text-sm text-gray-700 line-clamp-3">
            {job.short_description}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.locations?.map((loc) => (
              <span key={loc} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                📍 {loc}
              </span>
            ))}
            {job.roles?.map((role, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                #{role}
              </span>
            ))}
          </div>
        </Link>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: last_page }, (_, i) => (
          <Link
            key={i + 1}
            href={i === 0 ? `/classified-jobs` : `/classified-jobs/page/${i + 1}`}
            className={`px-4 py-2 rounded border text-sm transition ${
              page === i + 1
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
