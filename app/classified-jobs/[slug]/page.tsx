import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareButton from "@/components/ShareButton";
import JobImageSlider from '@/components/JobImageSlider'; 

export const revalidate = 60;

async function getJob(slug: string) {
  const res = await fetch(
    `https://admin.hrpostingpartner.com/api/jobs/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

// ✅ generateMetadata can stay sync with the correct type
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Job Not Found" };

  return {
    title: job.job_title,
    description: job.short_description ?? "",
  };
}

// ✅ Main component uses async `params` (after codemod)
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <h1 className="text-3xl font-bold text-gray-800">{job.job_title}</h1>
        <ShareButton title={job.job_title} />
      </div>

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
          <strong>👨‍💼 Experiences:</strong>{" "}
          {job.experiences?.map((r: any) => r.name || r.text).join(", ") ||
            "N/A"}
        </p>
        <p>
          <strong>🗓 Posted:</strong> {job.posted_at}
        </p>
        <p>
          <strong>⏳ Expires:</strong> {job.expiry_date ?? "N/A"}
        </p>
      </div>

      {job.images && (
        <JobImageSlider images={job.images} title={job.job_title} />
      )}

      <div
        className="prose max-w-full text-gray-800 break-words 
             prose-img:mx-auto prose-img:w-full prose-img:rounded 
             prose-a:underline prose-a:text-blue-600 prose-a:hover:text-blue-800"
        dangerouslySetInnerHTML={{ __html: job.description ?? "" }}
      />

      <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-700">
        <p>Want your job ad here?</p>
        <p>
          Contact:{" "}
          <a
            href="https://wa.me/923223379647"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            +92 322 337 9647
          </a>
        </p>
        <p>
          Follow our{" "}
          <a href="/terms-and-conditions" className="text-blue-600 underline">
            terms and conditions
          </a>
          .
        </p>
        <p className="mt-2">Note: Do not send your resume or contact us by phone.</p>
      </div>

      <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-700">
        <p className="mt-2">
          <strong>How to apply:</strong> Please click on the email address or link mentioned above.
        </p>
      </div>


      <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-700 break-words">
        <p className="font-semibold mb-2">Follow other platforms for jobs:</p>

        <p>
          <span className="font-medium">Main WhatsApp Channel:</span>
          <br />
          <a
            href="https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 break-all"
          >
            https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K
          </a>
        </p>

        <p className="mt-2">
          <span className="font-medium">Facebook Page:</span>
          <br />
          <a
            href="https://www.facebook.com/profile.php?id=100087877179793"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 break-all"
          >
            https://www.facebook.com/profile.php?id=100087877179793
          </a>
        </p>

        <p className="mt-2">
          <span className="font-medium">LinkedIn Page:</span>
          <br />
          <a
            href="https://www.linkedin.com/company/hr-posting-partner/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 break-all"
          >
            https://www.linkedin.com/company/hr-posting-partner/
          </a>
        </p>
      </div>
    </div>
  );
}
