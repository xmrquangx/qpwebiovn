'use client';

import React, { useState, useEffect } from 'react';
import { useSiteOptions } from '@/lib/SiteOptionsContext';

export default function StickyCTA() {
  const { hotline, zalo } = useSiteOptions();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[90] lg:hidden transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      aria-label="Liên hệ nhanh"
    >
      {/* Gradient fade above */}
      <div className="h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="bg-white/95 backdrop-blur-lg border-t border-border px-4 py-3 flex gap-3">
        <a
          href={zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 justify-center py-3.5 text-sm"
          aria-label="Nhắn Zalo"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48" fill="currentColor">
            <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm9.185 27.723c-.535 1.17-3.106 2.263-4.315 2.39-1.16.135-2.254.646-7.59-1.58-6.396-2.668-10.476-9.293-10.79-9.725-.314-.43-2.558-3.4-2.558-6.487 0-3.087 1.617-4.607 2.19-5.234.575-.627 1.255-.783 1.673-.783l1.2.017c.387.017.905-.147 1.414 1.078.535 1.288 1.817 4.44 1.978 4.76.16.322.268.695.054 1.123-.215.43-.322.695-.643 1.078-.322.383-.675.855-.963 1.147-.322.33-.657.688-.282 1.35.375.66 1.668 2.753 3.58 4.462 2.458 2.196 4.53 2.876 5.173 3.196.643.322 1.018.268 1.393-.16.375-.43 1.608-1.876 2.036-2.52.43-.645.857-.537 1.447-.322.59.215 3.74 1.764 4.382 2.084.643.322 1.072.483 1.232.752.16.268.16 1.555-.375 2.723z"/>
          </svg>
          Nhắn Zalo
        </a>
        <a
          href={`tel:${hotline.replace(/\s/g, '')}`}
          className="btn-secondary flex-1 justify-center py-3.5 text-sm"
          aria-label={`Gọi ${hotline}`}
        >
          📞 Gọi ngay
        </a>
      </div>
    </div>
  );
}
