'use client';

import Image from 'next/image';
import jobsNonExperienced from '@/public/images/jobs_non_experienced.png'; // Ensure this image is inside /public/images

const JobsInexperienced = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Jobs/Internship for Non-Experienced
        </h1>

        {/* Image */}
        <div className="flex justify-center mt-8 mb-4">
          <Image
            src={jobsNonExperienced}
            alt="Non-experienced jobs by HRPP"
            width={400}
            height={300}
            placeholder="blur"
            className="rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-xl mb-4">
            Hey there! Are you looking for a job/internship in Pakistan?
          </p>
          <p className="text-xl mb-6">
            We have a WhatsApp Channel full of job/internship opportunities for Non-Experienced.
          </p>

          {/* WhatsApp Channel Button */}
          <div className="mb-4">
            <a
              href="https://whatsapp.com/channel/0029Vb43BKJ8fewx69E56x3O"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600"
            >
              WhatsApp Channel
            </a>
            <p className="mt-2">
              Click and follow our WhatsApp Channel containing job/internship ads for Non-Experienced.
            </p>
          </div>

          {/* Closing Message */}
          <p className="mt-8 text-xl">
            So what are you waiting for? Click and follow now!
          </p>
          <p className="mt-4 text-lg">
            Also, invite your friends and/or family too, let’s end unemployment together.
            <br />
            (Note: Please do not share your resumes with us and do not request us to send you job ads separately)
          </p>
        </div>
      </div>
    </>
  );
};

export default JobsInexperienced;
