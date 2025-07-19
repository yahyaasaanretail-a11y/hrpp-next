// app/jobs/page/[page]/page.tsx
import JobListSection from '@/app/classified-jobs/JobListSection';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function PaginatedJobsPage({ params }: { params: { page: string } }) {
  const currentPage = parseInt(params.page, 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
     <section className="mb-6 text-center">
        <p className="text-sm text-gray-500">9th September, 2001 - 9th September, 2001</p>
      </section>
      {/* Pass the current page to JobListSection */}
      <JobListSection page={currentPage} />
    </div>
  );
}
