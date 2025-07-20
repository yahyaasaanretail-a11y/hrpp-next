// app/jobs/[slug]/page.tsx
import { notFound } from 'next/navigation';

interface ClassifiedJobPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

async function getJob(slug: string) {
  const res = await fetch(`https://admin.hrpostingpartner.com/api/jobs/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ClassifiedJobPage({ params }: ClassifiedJobPageProps) {
  const { slug } = await params; // Await params because Next.js may pass it as a Promise
  
  const job = await getJob(slug);
  if (!job) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>

      {job.image_path && (
       <img
       src={`https://admin.hrpostingpartner.com/storage/${job.image_path}`}
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
