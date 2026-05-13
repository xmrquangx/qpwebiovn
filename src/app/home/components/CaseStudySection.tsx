'use client';

import React, { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

const caseMetrics = [
  { value: '5 ngày', label: 'website lên sóng' },
  { value: 'x2', label: 'lead từ Google tháng đầu' },
  { value: '0 phí ẩn', label: 'đúng gói đã chốt' },
];

const caseSteps = [
  {
    label: 'Trước đó',
    text: 'Chỉ dùng Facebook cá nhân để giới thiệu dịch vụ, khách hỏi thông tin lặp lại và khó tạo uy tín khi gửi proposal.',
  },
  {
    label: 'QPWeb triển khai',
    text: 'Thiết kế landing page WordPress, tối ưu SEO local, thêm form liên hệ, Zalo CTA và testimonial để giảm rào cản mua.',
  },
  {
    label: 'Sau bàn giao',
    text: 'Khách mới tìm thấy qua Google, thương hiệu cá nhân chuyên nghiệp hơn và quy trình tư vấn gọn hơn.',
  },
];

export default function CaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.case-animate') as NodeListOf<HTMLElement>;
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.getAttribute('data-delay') || '0');
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      item.setAttribute('data-delay', String(i * 90));
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className="section-white py-20 md:py-28"
      aria-labelledby="case-study-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div className="case-animate">
            <div className="badge-gradient mb-4 inline-flex">Case study nổi bật</div>
            <h2
              id="case-study-heading"
              className="font-display font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}
            >
              LanAnh Coaching: <span className="highlight-orange">lead Google tăng x2</span> sau
              tháng đầu
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Một website nhỏ nhưng đúng thông điệp có thể thay đổi cách khách nhìn thấy bạn: rõ
              dịch vụ, rõ giá trị, rõ cách liên hệ và đủ bằng chứng để họ nhắn ngay.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {caseMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-border bg-bg-alt p-4 text-center"
                >
                  <div className="font-display font-extrabold text-xl md:text-2xl highlight-blue">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-xs text-muted">{metric.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary inline-flex"
              onClick={() => trackEvent('ClickCaseStudyCTA', { location: 'case_study' })}
            >
              Nhận tư vấn giống case này
            </a>
          </div>

          <div className="space-y-4">
            {caseSteps.map((step, index) => (
              <div
                key={step.label}
                className="case-animate card-base p-6"
                data-delay={String(index * 100)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center font-display font-extrabold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">{step.label}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
