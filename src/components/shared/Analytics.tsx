'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const CONSENT_KEY = 'dongrielabs-cookie-consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = 'GTM-W737S83Q';
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setConsent(hasConsent());
    const onAccept = () => setConsent(true);
    window.addEventListener('cookie-consent-accepted', onAccept);
    return () => window.removeEventListener('cookie-consent-accepted', onAccept);
  }, []);

  if (!consent) return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'}); gtag('js', new Date());`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
