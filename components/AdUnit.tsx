    'use client'
    // Example of a manual ad unit component
    import React, { useEffect } from 'react';

const AdUnit = ({ slotId }) => {
  useEffect(() => {
    // Dynamically load the AdSense script if it isn't already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3826573131304099';
      script.async = true;
      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error('AdSense push error:', error);
        }
      };
      document.head.appendChild(script);
    } else {
      // If the script is already loaded, push the ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []); // Only run once when the component mounts

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-3826573131304099"
      data-ad-slot={slotId} // Dynamically set the ad slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdUnit;
