// app/terms-and-conditions/page.tsx
import JobsInKarachi from '@/components/JobsInKarachi';

export const metadata = {
  title: 'Jobs in Karachi – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'Searching for the latest jobs in Karachi? HR Posting Partner posts daily updates from government organizations, private companies, and freelance opportunities across IT, banking, education, healthcare, engineering, sales, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-karachi',
  },
  openGraph: {
    title: 'Jobs in Karachi – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated jobs in Karachi across government and private sectors, including remote, part-time, full-time, and freelance roles.',
    url: 'https://www.hrpostingpartner.com/jobs-in-karachi',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Karachi – Latest Government & Private Vacancies',
    description:
      'Daily job updates in Karachi: government, private, remote, part-time, and full-time roles across top industries.',
  },
};

export default function TermsPage() {
  return <JobsInKarachi />;
}
