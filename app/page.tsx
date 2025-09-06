import Banner from '@/components/Banner';
import JobCards from '@/components/JobCards';
import RecruiterSection from '@/components/RecruiterSection';
import HomePageSlider from '@/components/HomePageSlider';
import ClassifiedJobsAd from '@/components/ClassifiedJobsAd';
import AdUnit from '@/components/AdUnit';


export const metadata = {
  title: 'HR Posting Partner | Job Portal Pakistan',
  description:
    'HR Posting Partner helps job seekers in Pakistan find the latest jobs and recruiters hire the best talent along with advertising opportunity for businesses and companies. Post jobs free and search hundreds of listings today.',
  keywords: [
    'jobs in Pakistan',
    'HR Posting Partner',
    'job portal Pakistan',
    'latest jobs Pakistan',
    'post jobs free',
    'recruitment platform Pakistan',
  ],
  openGraph: {
    title: 'HR Posting Partner | Job Portal Pakistan',
    description:
      'Find the latest jobs in Pakistan and hire the best talent with HR Posting Partner. Post jobs free, search listings, and advertise your business today.',
    url: 'https://yourdomain.com', // replace with your domain
    siteName: 'HR Posting Partner',
    type: 'website',
  },
};

export default function HomePage() {

  return (
    <main className="flex flex-col">
      <Banner />
      
      {/* Google Ad Banner */}
      {/* Google Ad Banner */}
      <AdUnit slotId="9389960073"/>

      <section className="px-4 md:px-12">
        <ClassifiedJobsAd />
        <JobCards />
      </section>
      <AdUnit slotId="9389960073"/>
      <RecruiterSection />
      <section>
        <HomePageSlider />
      </section>
      <AdUnit slotId="9389960073"/>
    </main>
  );
}
