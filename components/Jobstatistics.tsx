'use client';

import { FaBriefcase, FaSearch, FaCoffee, FaUsers } from 'react-icons/fa';

const JobStatistics = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {/* Job Ads */}
          <div className="flex flex-col items-center text-white">
            <FaBriefcase className="text-3xl md:text-4xl mb-2" />
            <p className="text-sm md:text-lg font-semibold">500+ jobs every week</p>
          </div>

          {/* Found Jobs */}
          <div className="flex flex-col items-center text-white">
            <FaSearch className="text-3xl md:text-4xl mb-2" />
            <p className="text-sm md:text-lg font-semibold">10,000+ found jobs</p>
          </div>

          {/* Recruiters Helped */}
          <div className="flex flex-col items-center text-white">
            <FaCoffee className="text-3xl md:text-4xl mb-2" />
            <p className="text-sm md:text-lg font-semibold">1,000+ recruiters helped</p>
          </div>

          {/* Followers */}
          <div className="flex flex-col items-center text-white">
            <FaUsers className="text-3xl md:text-4xl mb-2" />
            <p className="text-sm md:text-lg font-semibold">200,000+ followers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobStatistics;
