import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white border-t border-white/5">
      {/* Top highlight */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand + Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <AppLogo size={40} />
              <span className="font-display font-bold text-xl text-white tracking-tight">
                WebAgencyVN
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Freelancer thiết kế website WordPress Flatsome chuyên nghiệp. Bàn giao trong 5 ngày, SEO local, tích hợp Zalo.
            </p>
            <div className="space-y-3">
              <a
                href="tel:0901234567"
                className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors text-sm font-medium"
                aria-label="Hotline"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                0901 234 567
              </a>
              <a
                href="mailto:hello@webagencyvn.com"
                className="flex items-center gap-3 text-white/70 hover:text-blue-brand transition-colors text-sm font-medium"
                aria-label="Email"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                hello@webagencyvn.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-white/10 transition-all" aria-label="YouTube">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-brand hover:bg-white/10 transition-all" aria-label="Zalo">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.03c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.26 14.167l-2.95-.924c-.642-.204-.654-.642.136-.953l11.527-4.445c.535-.194 1.003.131.589.403z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-white/10 transition-all" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 font-display">Dịch vụ</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Thiết kế Website', href: '/dich-vu' },
                  { label: 'WordPress Flatsome', href: '/dich-vu' },
                  { label: 'SEO Local', href: '/dich-vu' },
                  { label: 'Bảo trì Website', href: '/dich-vu' },
                  { label: 'Tư vấn miễn phí', href: '/lien-he' },
                ]?.map((item) => (
                  <li key={item?.label}>
                    <Link href={item?.href} className="text-sm text-white/50 hover:text-white transition-colors">{item?.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 font-display">Công ty</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Portfolio', href: '/portfolio' },
                  { label: 'Quy trình làm việc', href: '/quy-trinh' },
                  { label: 'Bảng giá', href: '/gia' },
                  { label: 'Khách hàng', href: '/khach-hang' },
                  { label: 'Liên hệ', href: '/lien-he' },
                ]?.map((item) => (
                  <li key={item?.label}>
                    <Link href={item?.href} className="text-sm text-white/50 hover:text-white transition-colors">{item?.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © 2026 WebAgencyVN. Thiết kế với ❤️ tại Việt Nam.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}