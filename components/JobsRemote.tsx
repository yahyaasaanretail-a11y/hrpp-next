import Image from 'next/image';
import Link from 'next/link';
import remote_jobs from '@/public/images/remote_jobs.png';

export default function RemoteJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
        Remote Jobs for Pakistan – Work-from-Home Opportunities
      </h1>

      {/* Banner Image */}
      <div className="flex justify-center mt-6 mb-6">
        <Image
          src={remote_jobs}
          alt="Remote jobs in Pakistan by HR Posting Partner"
          className="rounded-lg shadow"
          width={400}
          height={300}
          placeholder="blur"
          priority
        />
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <p className="text-lg text-gray-800">
          Looking for remote jobs in Pakistan? <strong>HR Posting Partner</strong> curates the latest
          work-from-home and remote job listings tailored for Pakistan-based applicants. Whether you&apos;re
          seeking roles in <strong>IT</strong>, <strong>digital content</strong>, <strong>design</strong>,
          <strong> software engineering</strong>, <strong>administrative support</strong> or other fields,
          our platform helps you connect with top employers offering remote flexibility.
        </p>
      </div>

      {/* WhatsApp Alerts */}
      <section className="mx-auto max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Instant Updates via WhatsApp Channel
        </h2>

        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <p className="font-medium mb-3">
            Stay ahead with instant remote job alerts—follow our WhatsApp Channel to receive
            real-time updates as soon as new openings are posted.
          </p>
          <a
            href="https://whatsapp.com/channel/0029Vb3lANuG8l5L2TxX001s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
            aria-label="Join HR Posting Partner WhatsApp Channel for remote jobs in Pakistan"
          >
            WhatsApp Channel
          </a>
          <p className="mt-2 text-sm text-gray-600">
            It&apos;s the quickest way to get notified about remote jobs in Pakistan without manually
            checking the site.
          </p>
        </div>
      </section>

      {/* Classified Remote Jobs */}
      <section className="mx-auto max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Find Remote Classified Jobs in Pakistan
        </h2>
        <p className="text-gray-800 text-center mb-4">
          Need fast access? Explore our dedicated <strong>Classified Jobs – Remote Pakistan</strong> section:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Daily-updated remote job ads posted specifically for Pakistan-based applicants.</li>
          <li>Filterable listings by job category, experience level, and posting date.</li>
          <li>Opportunities ranging from full-time and part-time to freelance and contract-based roles.</li>
        </ul>

        <div className="text-center mt-6">
          <Link
            href={{
              pathname: '/classified-jobs',
              query: {
                start: '',
                end: '',
                locations: 'Remote',
                experience: '',
              },
            }}
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
            aria-label="Browse Classified Remote Jobs for Pakistan"
          >
            Browse Remote Classified Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}
