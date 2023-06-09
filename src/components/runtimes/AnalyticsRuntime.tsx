import Script from 'next/script';
import type { FC } from 'react';
import useGTM from '@hooks/useGTM';

/**
 * Component used to add the Google Tag Manager script responsible for sending data to Google Analytics
 */
const AnalyticsRuntime: FC = () => {
  const send = useGTM();

  if (!process.env.NEXT_PUBLIC_GTM_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        onLoad={() => {
          send({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        }}
      />

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
};

export default AnalyticsRuntime;
