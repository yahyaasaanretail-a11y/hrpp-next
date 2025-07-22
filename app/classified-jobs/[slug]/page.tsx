import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import JobsLayout from "@/app/classified-jobs/JobsLayout";

export const revalidate = 60;

async function getJob(slug: string) {
  const res = await fetch(`http://localhost:8000/api/jobs/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const job = await getJob(params.slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: job.job_title,
    description: job.short_description ?? "",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);
  if (!job) notFound();

  const jobContent = (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{job.job_title}</h1>

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

      {job.image_path && (
        <div className="w-full max-w-xl h-64 mx-auto mb-8 overflow-hidden">
          <img
            src={`http://localhost:8000/storage/${job.image_path}`}
            alt={job.job_title}
            className="w-full h-full object-contain rounded"
          />
        </div>
      )}

      <div
        className="prose max-w-full text-gray-800 break-words 
             prose-img:mx-auto prose-img:w-full prose-img:aspect-[4/3] prose-img:rounded 
             prose-a:underline prose-a:text-blue-600 prose-a:hover:text-blue-800"
        dangerouslySetInnerHTML={{ __html: job.description ?? "" }}
      />
    </div>
  );

  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-10">Loading job...</div>}>
      <JobsLayout>{jobContent}</JobsLayout>
    </Suspense>
  );
}
