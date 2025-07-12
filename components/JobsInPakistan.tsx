'use client';

import Image from 'next/image';
import pakistan from '@/public/images/jobs_in_pakistan.png'; // Adjust based on your project structure

const JobsInPakistan = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Jobs in Pakistan
        </h1>

        {/* Main Content */}
        <div className="flex justify-center mt-8 mb-4">
          <Image
            src={pakistan}
            alt="JAP by HRPP"
            className="rounded-lg"
            width={400}
            height={300}
            placeholder="blur"
          />
        </div>

        <div className="text-center">
          <p className="text-xl mb-4">Hey there! Are you looking for a job in Pakistan?</p>
          <p className="text-xl mb-6">
            We have a WhatsApp Channel and Facebook page full of job opportunities in Pakistan.
          </p>

          {/* Facebook Page Button */}
          <div className="mb-4">
            <a
              href="https://www.facebook.com/profile.php?id=100087877179793"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
            >
              Facebook Page
            </a>
            <p className="mt-2">
              Click and follow our Facebook page containing job ads of Pakistan.
            </p>
          </div>

          {/* WhatsApp Channel Button */}
          <div className="mb-4">
            <a
              href="https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600"
            >
              WhatsApp Channel
            </a>
            <p className="mt-2">
              Click and follow our WhatsApp Channel containing job ads of Pakistan.
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

export default JobsInPakistan;
