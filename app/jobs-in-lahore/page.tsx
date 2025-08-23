// app/terms-and-conditions/page.tsx
import JobsInLahore from '@/components/JobsInLahore';

export const metadata = {
  title: 'Jobs in Lahore – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'Searching for the latest jobs in Lahore? HR Posting Partner posts daily updates from government organizations, private companies, and freelance opportunities across IT, banking, education, healthcare, engineering, sales, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-lahore',
  },
  openGraph: {
    title: 'Jobs in Lahore – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated jobs in Lahore across government and private sectors, including remote, part-time, full-time, and freelance roles.',
    url: 'https://www.hrpostingpartner.com/jobs-in-lahore',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Lahore – Latest Government & Private Vacancies',
    description:
      'Daily job updates in Lahore: government, private, remote, part-time, and full-time roles across top industries.',
  },
};

export default function TermsPage() {
  return <JobsInLahore />;
}
