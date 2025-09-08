'use client';

import React, { useEffect } from 'react';

interface AdUnitProps {
  slotId: string;
}

const AdUnitVertical: React.FC<AdUnitProps> = ({ slotId }) => {
  useEffect(() => {
    // Dynamically load the AdSense script if not already loaded
    const script = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');

    if (!script) {
      const newScript = document.createElement('script');
      newScript.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3826573131304099';
      newScript.async = true;
      newScript.crossOrigin = 'anonymous';
      newScript.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error('AdSense push error:', error);
        }
      };
      document.head.appendChild(newScript);
    } else {
      // If the script is already loaded, directly push the ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
    className="adsbygoogle"
    style={{ display: 'block' }}
    data-ad-client="ca-pub-3826573131304099"
    data-ad-slot={slotId}
    data-ad-format="auto"
    data-ad-width="150"   // Specify the width for vertical ads
    data-ad-height="300"  // Specify the height for vertical ads
    data-full-width-responsive="true"
    />
  );
};

export default AdUnitVertical;
