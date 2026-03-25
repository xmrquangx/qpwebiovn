'use client';

import React, { createContext, useContext } from 'react';

export interface SiteOptions {
  hotline: string;
  zalo: string;
  email: string;
}

const defaultOptions: SiteOptions = {
  hotline: '0901 234 567',
  zalo: '0901234567',
  email: 'hello@webagencyvn.com',
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
