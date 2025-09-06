    'use client'
    // Example of a manual ad unit component
    import React, { useEffect } from 'react';

    const AdUnit = ({ slotId }) => {
      useEffect(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.error('AdSense push error:', error);
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
        ></ins>
      );
    };

    export default AdUnit;