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
        HR Posting Partner is an HR-based marketing business providing Job Ads
        services along with marketing for other companies or businesses. We are
        here to help you boost your Job Ad and/or Sponsored Ad.
      </p>
      <p>
        Also, we are continuously striving to help job seekers in finding career
        opportunities.
      </p>
      <p>
        We are one of the best platforms for job opportunities in Pakistan as we
        are one of Pakistan’s fastest-growing Talent Attraction and People
        Interaction platforms.
      </p>
    </div>

     {/* Mission Statement */}
     <div className="mb-8">
      <h4 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">
        Mission Statement
      </h4>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
        “To empower job seekers and employers in Pakistan by providing a
        reliable, accessible, and free job posting platform that bridges
        opportunities with talent, fostering career growth and organizational
        success.”
      </p>
    </div>

    {/* Vision */}
    <div>
      <h4 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">
        Vision
      </h4>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
        “To become Pakistan’s most trusted and go-to digital partner for job
        postings, enabling a future where every individual finds the right
        opportunity and every employer connects with the right talent.”
      </p>
    </div>

    {/* Image */}
    <div className="flex justify-center pt-8 mb-10">
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
