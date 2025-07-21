import JobListSection from '@/app/classified-jobs/JobListSection';
import { notFound } from 'next/navigation';

export const revalidate = 60;

// ✅ generateStaticParams can stay the same
export async function generateStaticParams() {
  return Array.from({ length: 5 }).map((_, i) => ({
    page: (i + 1).toString(),
  }));
}

// ✅ Treat `params` as a Promise, since you're on async request API
export default async function PaginatedJobsPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <section className="mb-6 text-center">
        {/* Optional intro or header */}
      </section>
      <JobListSection page={currentPage} />
    </div>
  );
}
