// app/jobs/page.tsx
import { Suspense } from 'react';
import JobListSection from './JobListSection';

export default function JobsPage() {
  return (
    <main className="flex-1">
      <section className="mb-6 text-center">
        <p className="text-sm text-gray-500">9th September, 2001 - 9th September, 2001</p>
      </section>

      <Suspense fallback={<p className="text-center text-gray-600">Loading jobs...</p>}>
        <JobListSection page={1} />
      </Suspense>

    
    </main>
  );
}
