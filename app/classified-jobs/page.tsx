import JobListSection from '@/app/classified-jobs/JobListSection';

export default function ClassifiedJobsPage({
  searchParams,
}: {
  searchParams?: {
    start?: string;
    end?: string;
    locations?: string;
    experience?: string;
    page?: string;
  };
}) {
  const page = parseInt(searchParams?.page || '1');

  return <JobListSection page={page} searchParams={searchParams} />;
}
