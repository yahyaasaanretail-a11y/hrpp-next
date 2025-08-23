// app/terms-and-conditions/page.tsx
import JobsRemote from '@/components/JobsRemote';

export const metadata = {
  title: 'Remote Jobs for Pakistan – Work-from-Home Opportunities | HR Posting Partner',
  description:
    'Looking for remote jobs in Pakistan? HR Posting Partner curates the latest work-from-home roles in IT, design, software engineering, content, admin support, and more for Pakistan-based applicants.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/remote-jobs',
  },
  openGraph: {
    title: 'Remote Jobs for Pakistan – Work-from-Home Opportunities | HR Posting Partner',
    description:
      'Discover daily updated remote and work-from-home jobs tailored for Pakistan. Filter by category, experience, and posting date.',
    url: 'https://www.hrpostingpartner.com/remote-jobs',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote Jobs for Pakistan – Work-from-Home Opportunities',
    description:
      'Daily updated remote jobs for Pakistan: full-time, part-time, freelance, and contract roles across top industries.',
  },
};

export default function TermsPage() {
  return <JobsRemote />;
}
