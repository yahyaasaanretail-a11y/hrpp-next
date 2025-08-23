// app/terms-and-conditions/page.tsx
import JobsInIslamabad from '@/components/JobsInIslamabad';

export const metadata = {
  title:
    'Jobs in Islamabad and Rawalpindi – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'Searching for the latest jobs in Islamabad and Rawalpindi? HR Posting Partner posts daily updates from government organizations, private companies, and freelance opportunities across IT, banking, education, healthcare, engineering, sales, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-islamabad-rawalpindi',
  },
  openGraph: {
    title:
      'Jobs in Islamabad and Rawalpindi – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated jobs in Islamabad & Rawalpindi across government and private sectors, including remote, part-time, full-time, and freelance roles.',
    url: 'https://www.hrpostingpartner.com/jobs-in-islamabad-rawalpindi',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Jobs in Islamabad and Rawalpindi – Latest Government & Private Vacancies',
    description:
      'Daily job updates in Islamabad & Rawalpindi: government, private, remote, part-time, and full-time roles across top industries.',
  },
};

export default function TermsPage() {
  return <JobsInIslamabad />;
}
