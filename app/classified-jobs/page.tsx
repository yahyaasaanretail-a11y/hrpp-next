import { Suspense } from 'react';
import JobListSection from '@/app/classified-jobs/JobListSection';
import JobsLayout from '@/app/classified-jobs/JobsLayout';

// ✅ Add metadata for SEO
export const metadata = {
  title: 'Classified Jobs in Pakistan | HR Posting Partner',
  description:
    'Find the latest classified jobs in Pakistan. Explore fresh, part-time, remote & full-time roles in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad and other cities of Pakistan.',
  openGraph: {
    title: 'Classified Jobs in Pakistan | HR Posting Partner',
    description:
      'Discover new classified jobs across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad and other cities in Pakistan. Search part-time, remote, and full-time roles today.',
    url: 'https://yourdomain.com/classified-jobs', // replace with your domain
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classified Jobs in Pakistan | HR Posting Partner',
    description:
      'Explore the latest classified jobs in Pakistan — part-time, remote, and full-time roles in top cities like Karachi, Lahore, and Islamabad.',
  },
};

export default async function ClassifiedJobsPage({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const page = parseInt(searchParams?.page || '1', 10);

  return (
    <Suspense
      fallback={<div className="text-center text-gray-500 py-10">Loading jobs...</div>}
    >
      <JobsLayout>
        {/* ✅ Use the H1 here */}
        <JobListSection page={page} searchParams={searchParams} />
      </JobsLayout>
    </Suspense>
  );
}
