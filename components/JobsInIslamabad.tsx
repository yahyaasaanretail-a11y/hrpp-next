import Image from 'next/image';
import Link from 'next/link';
import islamabad from '@/public/images/jobs_in_islamabad.png';



export default function JobsInIslamabadRawalpindiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
        Jobs in Islamabad and Rawalpindi – Latest Government & Private Vacancies
      </h1>

      {/* Banner Image */}
      <div className="flex justify-center mt-6 mb-6">
        <Image
          src={islamabad}
          alt="Jobs in Islamabad and Rawalpindi by HR Posting Partner"
          className="rounded-lg shadow"
         width={400} height={300} placeholder="blur"
        />
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <p className="text-lg text-gray-800">
          Searching for the latest jobs in Islamabad and Rawalpindi?{' '}
          <strong>HR Posting Partner</strong> brings you daily updated listings
          from government organizations, private companies, and freelance
          opportunities. Whether you’re looking for a job in <strong>IT</strong>
          , <strong>banking</strong>, <strong>education</strong>,{' '}
          <strong>healthcare</strong>, <strong>engineering</strong>,{' '}
          <strong>sales</strong> or other fields, our portal makes job hunting
          in Islamabad and Rawalpindi faster and easier.
        </p>
      </div>

      {/* WhatsApp Alerts */}
      <section className="mx-auto max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Get Job Alerts on WhatsApp
        </h2>

        <div className="rounded-2xl border p-6 text-center shadow-sm">
          <p className="font-medium mb-3">
            Don’t want to miss out on opportunities? Follow our official
            WhatsApp Channel and get instant job alerts delivered straight to
            your phone.
          </p>
          <a
            href="https://whatsapp.com/channel/0029Vb2Md2WAe5VjPJYi2g0Y"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
            aria-label="Join HR Posting Partner WhatsApp Channel for Islamabad & Rawalpindi jobs"
          >
            WhatsApp Channel
          </a>
          <p className="mt-2 text-sm text-gray-600">
            This way, you stay updated on the latest Islamabad and Rawalpindi
            jobs without checking the website every day.
          </p>
        </div>
      </section>

      {/* Classified Jobs */}
      <section className="mx-auto max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Explore Classified Jobs in Islamabad and Rawalpindi
        </h2>
        <p className="text-gray-800 text-center mb-4">
          For quick access to fresh job ads, visit our{' '}
          <strong>Classified Jobs</strong> section.
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Daily updated job postings specific to Islamabad and Rawalpindi.</li>
          <li>Easy filtering by category, industry, and experience level.</li>
          <li>
            Opportunities ranging from full-time and part-time to freelance and
            remote jobs.
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Link
            href={{
              pathname: '/classified-jobs',
              query: {
                start: '',
                end: '',
                locations: 'Islamabad',
                experience: '',
              },
            }}
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
            aria-label="Browse Classified Jobs – Islamabad"
          >
            Browse Classified Jobs – Islamabad
          </Link>

          <Link
            href={{
              pathname: '/classified-jobs',
              query: {
                start: '',
                end: '',
                locations: 'Rawalpindi',
                experience: '',
              },
            }}
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
            aria-label="Browse Classified Jobs – Rawalpindi"
          >
            Browse Classified Jobs – Rawalpindi
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
