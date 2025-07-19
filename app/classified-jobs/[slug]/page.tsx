// app/jobs/[slug]/page.tsx
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

async function getJob(slug: string) {
  const res = await fetch(`http://localhost:8000/api/jobs/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ClassifiedJobPage({ params }: PageProps) {
  const job = await getJob(params.slug);
  if (!job) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>

      {job.image_path && (
       <img
       src={`http://localhost:8000/storage/${job.image_path}`}
       alt={job.job_title}
       className="rounded mb-6 max-h-64 object-cover w-full"
     />
     
      )}

      <div
        className="text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: job.description ?? '' }}
      />

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>📍 Locations:</strong> {job.locations?.join(', ')}</p>
        <p><strong>👨‍💼 Roles:</strong> {job.roles?.join(', ')}</p>
        <p><strong>🗓 Posted:</strong> {job.posted_at}</p>
      </div>
    </div>
  );
}
