// app/terms-and-conditions/page.tsx
import JobsInexperieced from '@/components/JobsInexperieced';

export const metadata = {
  title: 'Jobs & Internships for Non-Experienced Talent in Pakistan | HR Posting Partner',
  description:
    'Fresh graduate or entry-level in Pakistan? Find jobs and internships for non-experienced candidates across marketing, IT, admin, content, technical roles, and more.',
  alternates: {
    canonical: 'https://www.hrpostingpartner.com/jobs-for-freshers',
  },
  openGraph: {
    title: 'Jobs & Internships for Non-Experienced Talent in Pakistan | HR Posting Partner',
    description:
      'Daily updated jobs and internships for fresh graduates and entry-level candidates in Pakistan. Get instant alerts via WhatsApp.',
    url: 'https://www.hrpostingpartner.com/jobs-for-freshers',
    siteName: 'HR Posting Partner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs & Internships for Non-Experienced Talent in Pakistan',
    description:
      'Find freshers jobs and internships in Pakistan—marketing, IT, admin, content, technical and more. Get WhatsApp alerts.',
  },
};


export default function TermsPage() {
  return <JobsInexperieced />;
}
