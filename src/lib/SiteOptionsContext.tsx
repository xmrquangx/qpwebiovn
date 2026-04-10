'use client';

import React, { createContext, useContext } from 'react';

export interface SiteOptions {
  hotline: string;
  zalo: string;
  email: string;
  logo: string;
  header_code?: string;
}

const defaultOptions: SiteOptions = {
  hotline: '0901 234 567',
  zalo: 'https://zalo.me/0901234567',
  email: 'hello@webagencyvn.com',
  logo: '/assets/images/app_logo.png',
  header_code: '',
};

const SiteOptionsContext = createContext<SiteOptions>(defaultOptions);

export function SiteOptionsProvider({
  options,
  children,
}: {
  options: SiteOptions;
  children: React.ReactNode;
}) {
  const merged: SiteOptions = {
    hotline: options.hotline || defaultOptions.hotline,
    zalo: options.zalo || defaultOptions.zalo,
    email: options.email || defaultOptions.email,
    logo: options.logo || defaultOptions.logo,
    header_code: options.header_code || defaultOptions.header_code,
  };
  return (
    <SiteOptionsContext.Provider value={merged}>
      {children}
    </SiteOptionsContext.Provider>
  );
}

export function useSiteOptions(): SiteOptions {
  return useContext(SiteOptionsContext);
}
