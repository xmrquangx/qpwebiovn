'use client';

import React, { useEffect, useRef } from 'react';

const advantages = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'WordPress + Flatsome tối ưu',
    desc: 'Theme Flatsome premium với UX Builder kéo thả. Tốc độ tải trang dưới 2 giây, chuẩn Core Web Vitals.',
    color: 'text-primary',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    num: '01',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 4.5h3" />
      </svg>
    ),
    title: 'Responsive + Tốc độ cao',
    desc: 'Chuẩn mobile-first 100%. Hiển thị hoàn hảo trên mọi thiết bị — điện thoại, tablet, máy tính.',
    color: 'text-blue-brand',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    num: '02',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'SEO local + Chat Zalo',
    desc: 'Tối ưu từ khoá địa phương, Google My Business, tích hợp nút Zalo OA để khách liên hệ ngay.',
    color: 'text-primary',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    num: '03',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Hỗ trợ & Bảo trì',
    desc: 'Bảo hành 6 tháng, hỗ trợ qua Zalo 24/7. Cập nhật plugin, backup định kỳ, xử lý lỗi trong 2 giờ.',
    color: 'text-blue-brand',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    num: '04',
  },
];

export default function AdvantagesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.adv-card') as NodeListOf<HTMLElement>;
    if (!cards) return;

    cards.forEach((card) => {
      card.classList.add('will-animate', 'animate-on-scroll');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute('data-delay') || '0');
            setTimeout(() => {
              el.classList.remove('will-animate');
              el.classList.add('animated', 'animate-on-scroll');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card, i) => {
      card.setAttribute('data-delay', String(i * 100));
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Spotlight effect
  useEffect(() => {
    const cards = document.querySelectorAll('.spotlight-card');
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-alt py-20 md:py-28"
      aria-labelledby="advantages-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="badge-gradient mb-4 mx-auto inline-flex">Tại sao chọn tôi?</div>
          <h2
            id="advantages-heading"
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}
          >
            4 lý do khách hàng{' '}
            <span className="highlight-orange">tin tưởng</span> mỗi dự án
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Không chỉ làm đẹp — website của bạn phải hoạt động, chuyển đổi và tăng trưởng.
          </p>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={adv.num}
              className={`adv-card spotlight-card p-8 md:p-10 relative ${i === 0 ? 'md:col-span-1' : ''}`}
            >
              <span className="absolute top-6 right-6 text-xs font-mono text-muted/40 font-display font-bold">
                {adv.num}
              </span>

              <div className={`w-14 h-14 rounded-2xl ${adv.bg} border ${adv.border} flex items-center justify-center ${adv.color} mb-6`}>
                {adv.icon}
              </div>

              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {adv.title}
              </h3>
              <p className="text-muted leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '⚡', text: 'Bàn giao trong 5 ngày làm việc' },
            { icon: '🔒', text: 'Bảo hành 6 tháng miễn phí' },
            { icon: '💬', text: 'Hỗ trợ Zalo 24/7' },
          ].map((item) => (
            <div key={item.text} className="trust-badge justify-center text-sm font-medium text-foreground">
              <span>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}