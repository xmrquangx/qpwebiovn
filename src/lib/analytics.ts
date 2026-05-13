'use client';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: AnalyticsParams[];
    gtag?: (event: 'event', name: string, params?: AnalyticsParams) => void;
    fbq?: (action: string, name: string, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });

  window.gtag?.('event', name, params);
}

export function trackContactAction(action: string, location: string, params: AnalyticsParams = {}) {
  trackEvent(action, { location, ...params });

  if (typeof window === 'undefined') return;
  if (action === 'ClickZalo') {
    window.fbq?.('trackCustom', 'ClickZalo', { location, ...params });
  }
  if (action === 'ClickPhone') {
    window.fbq?.('trackCustom', 'ClickPhone', { location, ...params });
  }
}

export function trackLead(location: string, params: AnalyticsParams = {}) {
  trackEvent('FormSubmit', { location, ...params });

  if (typeof window === 'undefined') return;
  window.fbq?.('track', 'Lead', { location, ...params });
}
