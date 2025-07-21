// app/jobs/[slug]/page.tsx
import { notFound } from "next/navigation";

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

export default async function ClassifiedJobPage({
  params,
}: ClassifiedJobPageProps) {
  const { slug } = await params; // Await params because Next.js may pass it as a Promise
  
  const job = await getJob(slug);

  if (!job) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {job.job_title}
      </h1>

      {/* Job Metadata */}
      <div className="space-y-2 text-sm text-gray-600 mb-6">
        <p>
          <strong>📍 Locations:</strong>{" "}
          {job.locations?.map((l: any) => l.name || l.text).join(", ") || "N/A"}
        </p>
        <p>
          <strong>👨‍💼 Roles:</strong>{" "}
          {job.roles?.map((r: any) => r.name || r.text).join(", ") || "N/A"}
        </p>
        <p>
          <strong>🗓 Posted:</strong> {job.posted_at}
        </p>
        <p>
          <strong>⏳ Expires:</strong> {job.expiry_date ?? "N/A"}
        </p>
      </div>

      {/* Job Image */}
      {job.image_path && (
        <img
          src={`https://admin.hrpostingpartner.com/storage/${job.image_path}`}
          alt={job.job_title}
          className="w-full max-h-64 object-cover rounded mb-8"
        />
      )}

      {/* Job Description */}
      <div
        className="prose prose-img:mx-auto max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: job.description ?? "" }}
      />

    </div>
  );
}
