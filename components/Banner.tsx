'use client';

import JobStatistics from './Jobstatistics';

const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/main_banner.png')`,
        height: '400px',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Centered Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Welcome to, HR Posting Partner
        </h1>
        <h5 className="text-base sm:text-lg md:text-xl mt-2">
          Job ke liye, HR Posting Partner.com
        </h5>
      </div>

      {/* Bottom Stats (desktop only) */}
      <div className="hidden md:flex absolute left-0 right-0 bottom-0 z-20 justify-center pb-6 text-white">
        <JobStatistics />
      </div>
    </section>
  );
};

export default Banner;
