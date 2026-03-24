'use client';

import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import Link from 'next/link';
import type { Service } from '@/lib/wordpress/types';

/* ── Static data: target audience (small, no need for WP) ── */
const targets = [
  { icon: '🎯', label: 'Coach & Trainer', desc: 'Tư vấn, coaching, khoá học online' },
  { icon: '📸', label: 'Nhiếp ảnh gia', desc: 'Portfolio, đặt lịch chụp ảnh' },
  { icon: '🎵', label: 'TikToker & KOL', desc: 'Landing page, bán khoá học' },
  { icon: '☕', label: 'Quán cà phê & F&B', desc: 'Menu online, đặt bàn, SEO local' },
  { icon: '💆', label: 'Spa & Làm đẹp', desc: 'Booking online, giới thiệu dịch vụ' },
  { icon: '🏪', label: 'Cửa hàng & SME', desc: 'Bán hàng online, catalogue sản phẩm' },
];

/* ── Fallback static services (used when WP has no data yet) ── */
const fallbackServices: Service[] = [
  { num: '01', title: 'Thiết kế Website WordPress Flatsome', desc: 'Xây dựng website chuyên nghiệp trên nền tảng WordPress với theme Flatsome — tối ưu tốc độ, dễ quản trị, không cần biết code.', features: ['Giao diện tuỳ chỉnh theo brand','Responsive 100% mobile-first','Tốc độ tải trang < 3 giây','Dễ tự cập nhật nội dung','Tích hợp Google Analytics'], tag: 'WordPress', tagColor: 'bg-blue-100 text-blue-700', color: 'text-blue-brand', bg: 'bg-blue-50', iconSvg: '' },
  { num: '02', title: 'SEO Local & Google My Business', desc: 'Tối ưu website xuất hiện top Google tìm kiếm địa phương — giúp khách hàng gần bạn tìm thấy doanh nghiệp dễ dàng hơn.', features: ['Nghiên cứu từ khoá địa phương','Tối ưu on-page SEO','Cài đặt Google My Business','Schema markup địa phương','Báo cáo thứ hạng hàng tháng'], tag: 'SEO', tagColor: 'bg-green-100 text-green-700', color: 'text-primary', bg: 'bg-orange-50', iconSvg: '' },
  { num: '03', title: 'Tích hợp Zalo OA & Live Chat', desc: 'Kết nối Zalo Official Account vào website — khách hàng nhắn tin trực tiếp, tăng tỷ lệ chuyển đổi và giữ chân khách hàng.', features: ['Nút Zalo nổi trên website','Zalo OA tích hợp chat','Form liên hệ tự động','Thông báo tin nhắn realtime','Hỗ trợ cài đặt Zalo OA'], tag: 'Zalo', tagColor: 'bg-blue-100 text-blue-700', color: 'text-blue-brand', bg: 'bg-blue-50', iconSvg: '' },
  { num: '04', title: 'Website Thương Mại Điện Tử', desc: 'Xây dựng cửa hàng online với WooCommerce — bán hàng 24/7, quản lý đơn hàng, thanh toán online đầy đủ tính năng.', features: ['WooCommerce đầy đủ tính năng','Thanh toán VNPay / MoMo','Quản lý kho hàng','Tích hợp vận chuyển','Báo cáo doanh thu'], tag: 'E-commerce', tagColor: 'bg-purple-100 text-purple-700', color: 'text-primary', bg: 'bg-orange-50', iconSvg: '' },
  { num: '05', title: 'Đặt lịch & Booking Online', desc: 'Hệ thống đặt lịch hẹn tự động cho spa, phòng khám, salon, coach — giảm thời gian xử lý thủ công, tăng trải nghiệm khách hàng.', features: ['Lịch đặt hẹn tự động','Nhắc nhở qua Zalo / SMS','Quản lý lịch làm việc','Xác nhận đặt lịch tức thì','Tích hợp Google Calendar'], tag: 'Booking', tagColor: 'bg-amber-100 text-amber-700', color: 'text-blue-brand', bg: 'bg-blue-50', iconSvg: '' },
  { num: '06', title: 'Bảo trì & Hỗ trợ Website', desc: 'Dịch vụ bảo trì định kỳ, cập nhật plugin, backup dữ liệu, sửa lỗi nhanh — đảm bảo website luôn hoạt động ổn định.', features: ['Backup dữ liệu hàng tuần','Cập nhật WordPress & plugin','Sửa lỗi trong 24h','Báo cáo uptime hàng tháng','Hỗ trợ qua Zalo 8h-22h'], tag: 'Bảo trì', tagColor: 'bg-gray-100 text-gray-700', color: 'text-primary', bg: 'bg-orange-50', iconSvg: '' },
];

/* Default SVG icons per service num */
const defaultIcons: Record<string, React.ReactNode> = {
  '01': <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" /></svg>,
  '02': <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  '03': <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
  '04': <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>,
  '05': <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
  '06': <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>,
};

function renderIcon(svc: Service): React.ReactNode {
  if (svc.iconSvg) {
    return <span className="w-7 h-7" dangerouslySetInnerHTML={{ __html: svc.iconSvg }} />;
  }
  return defaultIcons[svc.num] || defaultIcons['01'];
}

interface Props {
  services: Service[];
}

export default function DichVuClient({ services: wpServices }: Props) {
  const services = wpServices.length > 0 ? wpServices : fallbackServices;
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    }

    const cards = cardsRef.current?.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const delay = parseInt(card.getAttribute('data-delay') || '0');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(32px)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      card.setAttribute('data-delay', String(i * 100));
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #007BFF 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div ref={heroRef}>
              <div className="badge-gradient mb-6 mx-auto inline-flex">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Dịch vụ thiết kế web
              </div>
              <h1 className="font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                Dịch vụ <span className="highlight-orange">chuyên nghiệp</span> cho{' '}
                <span className="highlight-blue">mọi nhu cầu</span>
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
                Từ website cá nhân đến thương mại điện tử — tất cả được xây dựng trên{' '}
                <span className="highlight-word font-semibold text-foreground">Flatsome WordPress</span>, tối ưu SEO và tích hợp Zalo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/lien-he" className="btn-primary text-base px-8 py-4">
                  <span>🚀 Tư vấn miễn phí</span>
                </Link>
                <Link href="/gia" className="btn-secondary text-base px-8 py-4">
                  Xem bảng giá →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="badge-gradient mb-4 mx-auto inline-flex">{services.length} dịch vụ cốt lõi</div>
              <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
                Giải pháp <span className="highlight-blue">toàn diện</span> cho doanh nghiệp
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Mỗi dịch vụ được thiết kế để giải quyết đúng vấn đề của bạn — không thừa, không thiếu.
              </p>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div key={svc.num} className="service-card card-base p-7 flex flex-col h-full group">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-xl ${svc.bg} ${svc.color} flex items-center justify-center`}>
                      {renderIcon(svc)}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-mono text-muted/30 font-display font-bold">{svc.num}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${svc.tagColor}`}>{svc.tag}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-3 leading-snug">{svc.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-5">{svc.desc}</p>
                  <ul className="space-y-2 flex-1">
                    {svc.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <span className="text-foreground/80">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-border">
                    <Link href="/lien-he" className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors group-hover:gap-2">
                      Tư vấn dịch vụ này →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="section-alt py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="badge-gradient mb-4 mx-auto inline-flex">Phù hợp với ai?</div>
              <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
                Dịch vụ dành cho <span className="highlight-orange">bạn</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {targets.map((t) => (
                <div key={t.label} className="card-base p-5 text-center group">
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <div className="font-display font-bold text-foreground text-sm mb-1">{t.label}</div>
                  <div className="text-xs text-muted leading-relaxed">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section-dark py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,138,0,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/60 mb-6 font-display">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Bắt đầu ngay hôm nay
            </div>
            <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              Sẵn sàng có website <span className="highlight-orange">xịn</span> trong 5 ngày?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Nhắn Zalo để được tư vấn miễn phí — không áp lực, không phí ẩn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lien-he" className="btn-primary text-base px-8 py-4">
                <span>💬 Nhắn Zalo tư vấn</span>
              </Link>
              <Link href="/gia" className="btn-secondary text-base px-8 py-4" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                Xem bảng giá →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloFloat />
    </>
  );
}
