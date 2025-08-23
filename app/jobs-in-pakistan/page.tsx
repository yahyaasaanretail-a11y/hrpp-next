// app/terms-and-conditions/page.tsx
import JobsInPakistan from '@/components/JobsInPakistan';

export const metadata = {
  title: 'Jobs in Pakistan – Latest Government & Private Vacancies | HR Posting Partner',
  description:
    'HR Posting Partner updates daily jobs in Pakistan across government and private sectors, including remote, part-time, full-time, and freelance roles. Explore opportunities in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and other major cities.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-in-pakistan',
  },
  openGraph: {
    title: 'Jobs in Pakistan – Latest Government & Private Vacancies | HR Posting Partner',
    description:
      'Find daily updated government and private jobs in Pakistan, including remote and part-time roles. Discover opportunities in Karachi, Lahore, Islamabad, Rawalpindi, and Faisalabad.',
    url: 'https://www.hrpostingpartner.com/jobs-in-pakistan',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in Pakistan – Latest Government & Private Vacancies',
    description:
      'Daily updated jobs in Pakistan: government, private, remote, part-time, and full-time roles across major cities.',
  },
};

export default function TermsPage() {
  return <JobsInPakistan />;
}
