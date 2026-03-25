import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { getContactOptions } from '@/lib/wordpress/services';
import { SiteOptionsProvider } from '@/lib/SiteOptionsContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'WebAgencyVN — Website Đẹp Lên Sóng Trong 5 Ngày',
  description: 'Freelancer thiết kế website WordPress Flatsome cho cá nhân và doanh nghiệp nhỏ tại Việt Nam. SEO local, tích hợp Zalo, bàn giao trong 5 ngày.',
  openGraph: {
    title: 'WebAgencyVN — Website Đẹp Trong 5 Ngày',
    description: 'WordPress Flatsome, SEO local, tích hợp Zalo. Cho coaches, TikTokers, quán cà phê, spa tại Việt Nam.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
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