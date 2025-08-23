import Image from 'next/image';
import Link from 'next/link';
import pakistan from '@/public/images/jobs_in_pakistan.png';

export default function JobsInPakistanPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
        Jobs in Pakistan – Latest Government & Private Vacancies
      </h1>

      {/* Banner Image */}
      <div className="flex justify-center mt-6 mb-6">
        <Image
          src={pakistan}
          alt="Jobs in Pakistan by HR Posting Partner"
          className="rounded-lg shadow"
          width={400}
          height={300}
          placeholder="blur"
        />
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <p className="text-lg text-gray-800">
          Finding the right <strong>jobs in Pakistan</strong> can be challenging—so we make it simple.
          <strong> HR Posting Partner</strong> updates listings daily across government departments and
          the private sector, including <strong>remote</strong>, <strong>part-time</strong>,
          <strong> full-time</strong>, and <strong>freelance</strong> roles.
        </p>
        <p className="text-lg text-gray-800">
          Whether you’re a fresh graduate, mid-career professional, or a skilled worker, explore
          opportunities in <strong>Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad</strong> and
          other major cities across Pakistan.
        </p>
      </div>

      {/* Social Channels */}
      <section className="mx-auto max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Join Us on Facebook & WhatsApp
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border p-6 text-center shadow-sm">
            <p className="font-medium mb-3">
              Follow our Main Facebook Page for daily job alerts, hiring news, and fresh openings.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=100087877179793"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700"
              aria-label="Follow HR Posting Partner on Facebook"
            >
              Facebook Page
            </a>
          </div>

          <div className="rounded-2xl border p-6 text-center shadow-sm">
            <p className="font-medium mb-3">
              Get instant job notifications directly on your phone via our Main WhatsApp Channel.
            </p>
            <a
              href="https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
              aria-label="Join HR Posting Partner WhatsApp Channel"
            >
              WhatsApp Channel
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-3">
          By joining our Facebook Page and WhatsApp Channel, you’ll never miss important openings or deadlines.
        </p>
      </section>

      {/* Classified Jobs */}
      <section className="mx-auto max-w-3xl mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Explore Classified Jobs in Pakistan
        </h2>
        <p className="text-gray-800 text-center mb-4">
          In addition to regular listings, we offer a dedicated <strong>Classified Jobs</strong> section—perfect
          for quick scanning and fast applications.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>Fresh postings directly from employers</li>
          <li>Easy-to-browse categories (IT, Banking, Education, Healthcare, Freelance)</li>
          <li>City-wise job feeds (Karachi, Lahore, Islamabad, etc.)</li>
          <li>Part-time and full-time classified opportunities</li>
        </ul>
        <div className="text-center mt-6">
          <Link
            href="/classified-jobs"
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
            aria-label="Go to Classified Jobs in Pakistan"
          >
            Browse Classified Jobs
          </Link>
        </div>
      </section>

      {/* Tips */}
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
