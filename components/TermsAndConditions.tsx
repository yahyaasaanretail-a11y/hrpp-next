// app/components/TermsAndConditions.tsx
import React from 'react';

const TermsAndConditions = () => (
  <section className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg p-4 sm:p-8 my-8">
    {/* Title */}
    <div className="flex justify-center mb-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
        Terms and Conditions
      </h3>
    </div>

    {/* Main Content */}
    <div className="text-sm sm:text-base text-gray-800 space-y-6">
      
      {/* Job Ads on Main Platforms */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          For Job Ads on our Main Platforms:
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Job Ads containing only WhatsApp numbers for reaching out candidates are not allowed.</li>
          <li>We don’t post job ads without a company’s official email address or link to the job.</li>
          <li>Google Form links are not allowed.</li>
          <li>@gmail.com, @ymail.com, etc. are not official email addresses and are not allowed.</li>
          <li>Walk-in interview job ads may contain WhatsApp numbers, but not unofficial email addresses.</li>
          <li>Walk-in interview job ads must include a proper location, date, and time, otherwise they won’t be posted.</li>
        </ul>
      </div>

      {/* Sponsored Ads */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          For Sponsored Ads:
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ensure your business is legal and authentic.</li>
          <li>Scamming the audience will result in immediate deletion and possible reporting.</li>
          <li>Any illegal business discovered later will be treated similarly.</li>
          <li>Team HRPP does initial scrutiny, but users are advised to remain cautious.</li>
        </ul>
      </div>

      {/* Open Platforms */}
      <div>
        <h2 className="font-semibold text-lg sm:text-xl mb-2">
          For Open Platforms:
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Only job ads are allowed — no unrelated content.</li>
          <li>Bullying or foul language will lead to a ban.</li>
          <li>For sponsored ads, contact us via our official WhatsApp number.</li>
          <li>Group activity will be monitored by Team HRPP.</li>
          <li>We are not responsible for scams on open platforms — proceed with caution.</li>
        </ul>
      </div>

    </div>
  </section>
);

export default TermsAndConditions;
