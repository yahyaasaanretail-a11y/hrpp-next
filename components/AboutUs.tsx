import React from "react";
import Image from "next/image";

const AboutUs = () => (
  <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-4 sm:p-8 my-10">
    {/* Title */}
    <div className="flex justify-center mb-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
        About Us
      </h3>
    </div>

    {/* Description */}
    <div className="space-y-4 text-gray-800 text-base sm:text-lg mb-8">
      <p>
        HR Posting Partner is HR based Marketing business providing Job Ads service along with marketing for other companies or businesses. We are here to help you boost your Job Ad and/or Sponsored Ad.
      </p>
      <p>
        Also, we are continuously striving to help job seekers in finding career opportunities.
      </p>
      <p>
        We are one of the best platform for job opportunities in Pakistan as we are one of Pakistan’s fastest-growing Talent Attraction and People Interaction platform.
      </p>
    </div>

    {/* Image */}
    <div className="flex justify-center">
      <Image
        src="/images/main_banner.png" // ✅ path from public folder
        alt="About HR Posting Partner"
        width={800}
        height={400}
        className="rounded-lg shadow"
        priority
      />
    </div>
  </section>
);

export default AboutUs;
