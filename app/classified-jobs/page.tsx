import JobListSection from '@/app/classified-jobs/JobListSection';

export default async function ClassifiedJobsPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  // ⛔ You’ve disabled type safety — now force-cast carefully
  const rawParams = searchParams as Record<string, string>;
  const page = parseInt(rawParams?.page || '1', 10);

  return <JobListSection page={page} searchParams={rawParams} />;
}
