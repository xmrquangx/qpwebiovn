'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { label: 'Trang chủ', href: '/home' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Quy trình', href: '/quy-trinh' },
  { label: 'Khách hàng', href: '/khach-hang' },
  { label: 'Giá', href: '/gia' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/home"
              className="flex items-center gap-2 group"
              aria-label="WebAgencyVN - về trang chủ"
            >
              <AppLogo size={36} />
              <span className="font-display font-800 text-lg text-foreground tracking-tight hidden sm:block">
                Web<span className="highlight-orange">Agency</span>VN
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-bg-alt ${
                    pathname === link?.href
                      ? 'text-primary font-semibold' :'text-muted hover:text-foreground'
                  }`}
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href="tel:0901234567"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
                aria-label="Gọi điện tư vấn"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0901 234 567
              </a>
              <Link
                href="/lien-he"
                className="btn-primary text-sm px-4 py-2.5 md:px-6 md:py-3"
                aria-label="Nhận báo giá miễn phí"
              >
                <span>Nhận báo giá</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-bg-alt transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
              >
                {mobileOpen ? (
                  <XMarkIcon className="w-6 h-6 text-foreground" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-nav border-t border-border px-4 py-4 space-y-1">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link?.href
                    ? 'text-primary bg-orange-50 font-semibold' :'text-foreground hover:bg-bg-alt'
                }`}
              >
                {link?.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/lien-he"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
                aria-label="Tư vấn miễn phí"
              >
                <span>Tư vấn miễn phí</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}