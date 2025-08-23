// app/terms-and-conditions/page.tsx
import JobsInFaisalabad from '@/components/JobsInFaisalabad';


export const metadata = {
  title: 'Jobs in Faisalabad – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'Searching for the latest jobs in Faisalabad? HR Posting Partner posts daily updates from government organizations, private companies, and freelance opportunities across IT, banking, education, healthcare, engineering, sales, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-faisalabad',
  },
  openGraph: {
    title: 'Jobs in Faisalabad – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated jobs in Faisalabad across government and private sectors, including remote, part-time, full-time, and freelance roles.',
    url: 'https://www.hrpostingpartner.com/jobs-in-faisalabad',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Faisalabad – Latest Government & Private Vacancies',
    description:
      'Daily job updates in Faisalabad: government, private, remote, part-time, and full-time roles across top industries.',
  },
};

export default function TermsPage() {
  return <JobsInFaisalabad />;
}
