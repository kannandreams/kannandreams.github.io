
import React, { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// The Google Analytics tracking ID
const GA_TRACKING_ID = 'G-FPC2HLGQZZ';

const GoogleAnalytics = () => {
  // Initialize GA on component mount
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    script1.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      // @ts-ignore
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID, {
        page_path: window.location.pathname,
      });
      
      console.log('Google Analytics initialized with ID:', GA_TRACKING_ID);
    };

    // Clean up
    return () => {
      document.head.removeChild(script1);
    };
  }, []);

  // Track page views when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: window.location.pathname,
        });
        console.log('GA pageview tracked:', window.location.pathname);
      }
    };

    // Add listener for route changes
    window.addEventListener('popstate', handleRouteChange);

    // Initial page view
    handleRouteChange();

    // Clean up
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
