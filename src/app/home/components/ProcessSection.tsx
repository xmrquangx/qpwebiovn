'use client';

import React, { useEffect, useRef } from 'react';

const steps = [
  {
    num: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Thu thập yêu cầu',
    desc: 'Tư vấn qua Zalo, ghi nhận nội dung, màu sắc, mục tiêu website.',
    color: 'text-primary',
    bg: 'bg-orange-50',
    day: 'Ngày 1',
  },
  {
    num: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Thiết kế mockup',
    desc: 'Tạo giao diện Figma/Flatsome, gửi xem trước để duyệt.',
    color: 'text-blue-brand',
    bg: 'bg-blue-50',
    day: 'Ngày 2',
  },
  {
    num: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    title: 'Chỉnh sửa & duyệt',
    desc: 'Tối đa 3 lần chỉnh sửa mockup theo phản hồi của bạn.',
    color: 'text-primary',
    bg: 'bg-orange-50',
    day: 'Ngày 3',
  },
  {
    num: '04',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Dev & tích hợp',
    desc: 'Lên WordPress Flatsome, cài plugin SEO, tích hợp Zalo OA.',
    color: 'text-blue-brand',
    bg: 'bg-blue-50',
    day: 'Ngày 4',
  },
  {
    num: '05',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Kiểm thử',
    desc: 'Test mobile, tốc độ, form, SEO, cross-browser trước khi go-live.',
    color: 'text-primary',
    bg: 'bg-orange-50',
    day: 'Ngày 5',
  },
  {
    num: '06',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: 'Bàn giao & hỗ trợ',
    desc: 'Bàn giao toàn bộ tài khoản, hướng dẫn quản trị, bắt đầu bảo hành.',
    color: 'text-blue-brand',
    bg: 'bg-blue-50',
    day: 'Ngày 5',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.process-item') as NodeListOf<HTMLElement>;
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute('data-delay') || '0');
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(28px)';
      item.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      item.setAttribute('data-delay', String(i * 100));
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-dark py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/60 mb-4 font-display">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Quy trình làm việc
          </div>
          <h2
            id="process-heading"
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}
          >
            Từ ý tưởng đến{' '}
            <span className="highlight-orange">website live</span>{' '}
            chỉ 5 ngày
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Quy trình rõ ràng, cập nhật tiến độ hàng ngày qua Zalo — không bao giờ trễ hẹn.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="process-item">
              <div className="card-base bg-white/5 border border-white/10 p-7 h-full hover:bg-white/8 transition-all group">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${step.bg} ${step.color} flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-white/20 block font-display">{step.num}</span>
                    <span className="text-xs font-bold text-primary/70">{step.day}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-2xl">⚡</span>
            <span className="text-white font-semibold text-sm">
              Tổng thời gian: <span className="text-primary font-extrabold">5 ngày làm việc</span> — cam kết 100%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}