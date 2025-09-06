'use client';

import React, { useEffect } from 'react';

interface AdUnitProps {
  slotId: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId }) => {
  useEffect(() => {
    // Dynamically load the AdSense script if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3826573131304099';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error('AdSense push error:', error);
        }
      };
      document.head.appendChild(script);
    } else {
      // If the script is already loaded
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
      data-full-width-responsive="true"
    />
  );
};

export default AdUnit;
