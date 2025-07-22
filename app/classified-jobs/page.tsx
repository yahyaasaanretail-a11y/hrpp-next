import { Suspense } from 'react';
import JobListSection from '@/app/classified-jobs/JobListSection';
import JobsLayout from '@/app/classified-jobs/JobsLayout';

export default async function ClassifiedJobsPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const page = parseInt(searchParams?.page || '1', 10);

  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-10">Loading jobs...</div>}>
      <JobsLayout>
        <JobListSection page={page} searchParams={searchParams} />
      </JobsLayout>
    </Suspense>
  );
}
