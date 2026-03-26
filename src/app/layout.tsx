import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { getContactOptions } from '@/lib/wordpress/services';
import { SiteOptionsProvider } from '@/lib/SiteOptionsContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/* ── Default metadata (overridden per-page via generateMetadata) ── */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'WebAgencyVN — Website Đẹp Lên Sóng Trong 5 Ngày',
    template: '%s',
  },
  description: 'Freelancer thiết kế website WordPress Flatsome cho cá nhân và doanh nghiệp nhỏ tại Việt Nam. SEO local, tích hợp Zalo, bàn giao trong 5 ngày.',
  openGraph: {
    title: 'WebAgencyVN — Website Đẹp Trong 5 Ngày',
    description: 'WordPress Flatsome, SEO local, tích hợp Zalo. Cho coaches, TikTokers, quán cà phê, spa tại Việt Nam.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
    locale: 'vi_VN',
    type: 'website',
    siteName: 'WebAgencyVN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://qpweb.io.vn',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const options = await getContactOptions();

  return (
    <html lang="vi">
      <body>
        <SiteOptionsProvider options={options}>
          {children}
        </SiteOptionsProvider>
      </body>
    </html>
  );
}