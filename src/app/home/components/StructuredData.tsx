'use client';

import { useSiteOptions } from '@/lib/SiteOptionsContext';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qpweb.io.vn';

export function Organization() {
  const { hotline, zalo } = useSiteOptions();
  const phone = hotline.replace(/\s/g, '');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WebAgencyVN",
          "url": SITE_URL,
          "logo": `${SITE_URL}/assets/images/app_logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": `+84-${phone.slice(1)}`,
            "contactType": "customer service",
            "areaServed": "VN",
            "availableLanguage": "Vietnamese"
          },
          "sameAs": [
            "https://facebook.com/webagencyvn",
            "https://youtube.com/webagencyvn",
            `https://zalo.me/${zalo.replace(/\s/g, '')}`
          ]
        })
      }}
    />
  );
}

export function WebPage() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "WebAgencyVN — Website Đẹp Lên Sóng Trong 5 Ngày",
          "description": "Freelancer thiết kế website WordPress Flatsome cho cá nhân và doanh nghiệp nhỏ tại Việt Nam.",
          "url": SITE_URL,
          "inLanguage": "vi-VN"
        })
      }}
    />
  );
}

export function SoftwareApplication() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Thiết kế Website WordPress Flatsome",
          "provider": {
            "@type": "Organization",
            "name": "WebAgencyVN"
          },
          "serviceType": "Web Design",
          "areaServed": "Vietnam",
          "description": "Dịch vụ thiết kế website WordPress Flatsome chuẩn SEO, responsive, bàn giao trong 5 ngày.",
          "offers": [
            {
              "@type": "Offer",
              "name": "Gói Basic",
              "price": "3500000",
              "priceCurrency": "VND"
            },
            {
              "@type": "Offer",
              "name": "Gói Standard",
              "price": "6500000",
              "priceCurrency": "VND"
            },
            {
              "@type": "Offer",
              "name": "Gói Pro",
              "price": "12000000",
              "priceCurrency": "VND"
            }
          ]
        })
      }}
    />
  );
}