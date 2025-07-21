import Link from 'next/link';

export default function ClassifiedJobsAd() {
  return (
    <div className="bg-white px-4 lg:px-16">
      <div className="mx-auto py-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-4">
          <h1 className="text-4xl font-bold text-blue-500">Are you Searching for a Job?</h1>

          <p className="text-gray-800">
            We are now posting job ads on our website.
          </p>

          <p className="text-gray-800 font-medium">
            You can search for jobs you desire with our{' '}
            <span className="font-semibold">Filtered and Search-Enabled Features</span>.
          </p>

          <p className="font-semibold">
            Start your job search here ➜{' '}
            <Link
              href="/classified-jobs"
              className="text-blue-600 underline hover:text-blue-800"
            >
              HRPostingPartner.com/ClassifiedJobs
            </Link>
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>(Find jobs by clicking the link above)</span>
            <span className="text-xl">👉</span>
            <span className="text-sm font-semibold text-black">Jobs here!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
