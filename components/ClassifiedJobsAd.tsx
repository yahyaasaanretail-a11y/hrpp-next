import Link from "next/link";
import Image from "next/image";

export default function ClassifiedJobsAd() {
  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex flex-col-reverse lg:flex-row items-center bg-white shadow-2xl rounded-2xl p-6 sm:p-10 gap-8">
        <div className="w-full lg:w-2/3 text-center lg:text-left space-y-4 lg:pr-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
            Classified Jobs
          </h3>
          <p className="text-lg text-gray-700">
            We are now posting job ads on our website.
          </p>
          <p className="text-gray-800 font-medium">
            You can search for jobs you desire with our{" "}
            <span className="font-semibold">
              Filtered and Search-Enabled Features
            </span>
            .
          </p>

          <p className="font-semibold">
            Start your job search here ➜{" "}
            <Link
              href="/classified-jobs"
              className="text-blue-600 underline hover:text-blue-800"
            >
              HRPostingPartner.com/ClassifiedJobs
            </Link>
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>(Find jobs by clicking the link above)</span>

          </div>
        </div>
        <div className="w-full lg:w-1/3 flex justify-center">
          <Image
            src="/images/find_jobs_here.png"
            alt="Classified Jobs"
            width={400}
            height={300}
            className="rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
}
