'use client';

import Image from 'next/image';

const SponsoredAd = () => {
  return (
    <div className="w-full flex flex-col justify-center py-8 items-center">
      <a
        href="https://storonic.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-3/5"
      >
        <Image
          src="/images/storonic-banner.png"
          alt="Sponsor Ad"
          className="w-full object-contain m-0"
          width={800}
          height={80}
          priority
        />
      </a>
      <div className="w-full sm:w-3/5 text-black text-sm font-semibold text-center mt-2">
        Main Sponsored Ad
      </div>
    </div>
  );
};

export default SponsoredAd;
