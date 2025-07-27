'use client';

import { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react'; // Optional: Install lucide-react for icons

const ShareButton = ({ title }) => {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.share) {
      setCanShare(true);
    }
  }, []);

  if (!canShare) return null;

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigator.share({
          title,
          text: `Check out this job: ${title}`,
          url: window.location.href,
        });
      }}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
    >
      <Share2 className="w-4 h-4" />
      Share this job
    </a>
  );
};

export default ShareButton;
