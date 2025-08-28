import Image from 'next/image';
import Link from 'next/link';
import jobsNonExperienced from '@/public/images/jobs_non_experienced.png';

export default function JobsForFreshersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
        Jobs &amp; Internships for Non-Experienced Talent in Pakistan
      </h1>

      {/* Banner */}
      <div className="flex justify-center mt-6 mb-6">
        <Image
          src={jobsNonExperienced}
          alt="Jobs & Internships for Non-Experienced in Pakistan by HR Posting Partner"
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
          Are you a fresh graduate or entry-level job seeker in Pakistan? <strong>HR Posting Partner</strong> connects you with the latest
          jobs and internships for non-experienced candidates—no prior work history required. Whether you&apos;re targeting <strong>marketing</strong>, <strong>IT</strong>,
          <strong> administration</strong>, <strong>content creation</strong>, <strong>technical</strong> roles, or more, we make sure you don’t miss out.
        </p>
      </div>

      {/* WhatsApp Alerts */}
      <section className="mx-auto max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Instant Updates via WhatsApp
        </h2>

        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <p className="font-medium mb-3">
            Stay ahead with real-time alerts—follow our WhatsApp Channel to receive instant notifications of new jobs and internships for non-experienced candidates.
          </p>
          <a
            href="https://whatsapp.com/channel/0029Vb43BKJ8fewx69E56x3O"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
            aria-label="Join HR Posting Partner WhatsApp Channel for freshers jobs"
          >
            WhatsApp Channel
          </a>
          <p className="mt-2 text-sm text-gray-600">
            No more manual checking—your next opportunity is delivered straight to your phone.
          </p>
        </div>
      </section>

      {/* Classified Jobs for Freshers */}
      <section className="mx-auto max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Fast-Access Classified Jobs for Freshers
        </h2>
        <p className="text-gray-800 text-center mb-4">
          Looking for quick listings? Explore our <strong>Classified Jobs – Fresh Required</strong> section, specially curated for fresh graduates and non-experienced applicants:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Daily-updated classified job and internship ads targeted at fresh talent.</li>
          <li>Easily filterable listings by experience level (<em>Fresh Required</em>) and posting date.</li>
          <li>
            A variety of roles—from admin interns and marketing trainees to assistant jobs and technical internships—<strong>no experience needed</strong>.
          </li>
        </ul>

        <div className="text-center mt-6">
          <Link
            href={{
              pathname: '/classified-jobs',
              query: {
                start: '',
                end: '',
                locations: '',
                experience: 'Fresh Required',
              },
            }}
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
            aria-label="Browse Classified Jobs for Freshers in Pakistan"
          >
            Browse Freshers Classified Jobs
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Tips to Get Hired Faster
        </h2>
        <div className="text-gray-800 space-y-2">
          <p>• Use filters to match your skills, city, and preferred work type.</p>
          <p>• Keep a clean, updated PDF resume ready to apply quickly.</p>
          <p>• Apply early to high-demand roles and turn on channel alerts for instant updates.</p>
        </div>
        <p className="text-center text-gray-700 mt-6">
          <strong>HR Posting Partner</strong> is committed to helping Pakistan’s job seekers connect with the right employers—quickly and reliably.
        </p>
      </section>
    </div>
  );
}
