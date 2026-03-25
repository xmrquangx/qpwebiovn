'use client';

import React, { useState, useEffect } from 'react';
import { useSiteOptions } from '@/lib/SiteOptionsContext';

export default function ZaloFloat() {
  const { zalo } = useSiteOptions();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={`https://zalo.me/${zalo.replace(/\s/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="zalo-float"
      aria-label="Nhắn tin qua Zalo"
      title="Chat Zalo với WebAgencyVN"
    >
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.03c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.26 14.167l-2.95-.924c-.642-.204-.654-.642.136-.953l11.527-4.445c.535-.194 1.003.131.589.403z"/>
      </svg>
      <span className="sr-only">Chat Zalo</span>
    </a>
  );
}