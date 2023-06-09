import { useCallback } from 'react';

type SendFunction = (data: { [key: string]: string | number | boolean }) => void;

/**
 * Send data to Google Tag Manager.
 * @return {(data: {[p: string]: string | number | boolean}) => void}
 */
export default function useGTM(): SendFunction {
  return useCallback((data) => {
    if (!(typeof window === 'object')) {
      return;
    }

    if (typeof window.dataLayer === 'undefined') {
      window.dataLayer = [];
    }

    window.dataLayer.push(data);
  }, []);
}
