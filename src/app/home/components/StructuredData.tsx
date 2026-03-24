export function Organization() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WebAgencyVN",
          "url": "https://webagencyvn.com",
          "logo": "https://webagencyvn.com/assets/images/app_logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84-901-234-567",
            "contactType": "customer service",
            "areaServed": "VN",
            "availableLanguage": "Vietnamese"
          },
          "sameAs": [
            "https://facebook.com/webagencyvn",
            "https://youtube.com/webagencyvn",
            "https://zalo.me/0901234567"
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
          "url": "https://webagencyvn.com",
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