import Banner from '@/components/Banner';
import SponsoredAd from '@/components/SponsoredAd';
import JobCards from '@/components/JobCards';
import RecruiterSection from '@/components/RecruiterSection';
import HomePageSlider from '@/components/HomePageSlider';
import ClassifiedJobsAd from '@/components/ClassifiedJobsAd';

export const metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Banner />
      <SponsoredAd />
      <section className="px-4 md:px-12">
        <ClassifiedJobsAd />
        <JobCards />
      </section>
      <RecruiterSection />
      <section>
        <HomePageSlider />
      </section>
    </main>
  );
}
