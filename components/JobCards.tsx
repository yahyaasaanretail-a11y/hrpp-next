'use client';

import Image from 'next/image';
import Link from 'next/link';

const jobData = [
  { title: 'Jobs in Pakistan', link: '/jobs-in-pakistan', image: '/images/jobs_in_pakistan.png' },
  { title: 'Jobs in Karachi', link: '/jobs-in-karachi', image: '/images/jobs_in_karachi.png' },
  { title: 'Jobs in Lahore', link: '/jobs-in-lahore', image: '/images/jobs_in_lahore.png' },
  { title: 'Jobs in Islamabad/Rawalpindi', link: '/jobs-in-islamabad-rawalpindi', image: '/images/jobs_in_islamabad.png' },
  { title: 'Jobs in Faisalabad', link: '/jobs-in-faisalabad', image: '/images/jobs_in_faisalabad.png' },
  { title: 'Remote Jobs for Pakistan', link: '/remote-jobs-for-pakistan', image: '/images/remote_jobs.png' },
  { title: 'Jobs/Internship for Non-Experienced', link: '/jobs-internships-for-non-experienced', image: '/images/jobs_non_experienced.png' },
];

const JobCard = ({ job }: { job: { title: string; link: string; image: string } }) => (
  <Link
    href={job.link}
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-300 h-full flex flex-col overflow-hidden"
  >
    <div className="h-48 relative">
      <Image
        src={job.image}
        alt={`${job.title} job`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />
    </div>

    <div className="p-6 flex-1 flex flex-col justify-end">
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        </div>
      </div>
    </div>
  </Link>
);

const JobCards = () => {
  const firstRowCards = jobData.slice(0, 4);
  const remainingCards = jobData.slice(4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">Are you Searching for a Job?</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {firstRowCards.map((job, index) => (
          <JobCard job={job} key={`first-${index}`} />
        ))}
      </div>

      {remainingCards.length > 0 && (
        <div className="flex justify-center w-full p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center w-full max-w-screen-lg">
            {remainingCards.map((job, index) => (
              <div className="w-full max-w-sm" key={`remaining-${index}`}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-blue-600 p-4">
        Note: No or less job in your city? Don't worry! You can click on remote jobs.
      </p>
    </div>
  );
};

export default JobCards;
