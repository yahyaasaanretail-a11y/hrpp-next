// app/jobs/[page]/page.tsx
import JobListSection from '@/app/classified-jobs/JobListSection';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    page: string;
  }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return Array.from({ length: 5 }).map((_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function PaginatedJobsPage({ params }: PageProps) {
    const params2  = await params;
    const currentPage = parseInt(params2.page, 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <section className="mb-6 text-center">
        <p className="text-sm text-gray-500">9th September, 2001 - 9th September, 2001</p>
      </section>
      <JobListSection page={currentPage} />
    </div>
  );
}
