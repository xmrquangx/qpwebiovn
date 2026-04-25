'use client';

import React, { useEffect, useRef } from 'react';

const painPoints = [
  {
    icon: '📉',
    text: 'Bán hàng chỉ qua Facebook — reach giảm 70%, khách mới không tìm thấy bạn trên Google',
    emotion: 'Mất khách mỗi ngày mà không biết',
  },
  {
    icon: '😤',
    text: 'Từng thuê làm website nhưng bị giao muộn, không đẹp, không ai hỗ trợ sau bàn giao',
    emotion: 'Mất tiền, mất thời gian, mất niềm tin',
  },
  {
    icon: '😟',
    text: 'Đối thủ đã có website chuyên nghiệp — bạn gửi link Facebook cho khách thì mất uy tín',
    emotion: 'Tụt hậu so với đối thủ',
  },
  {
    icon: '🤔',
    text: 'Muốn có website nhưng sợ tốn tiền, sợ phức tạp, không biết bắt đầu từ đâu',
    emotion: 'Trì hoãn → mất cơ hội',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.problem-item') as NodeListOf<HTMLElement>;
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
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      item.setAttribute('data-delay', String(i * 120));
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="section-white py-16 md:py-24"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 problem-item">
          <div className="badge-gradient mb-4 mx-auto inline-flex">Bạn có đang gặp vấn đề này?</div>
          <h2
            id="problem-heading"
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(24px, 3.5vw, 38px)' }}
          >
            Tại sao <span className="highlight-orange">khách hàng</span> không tìm thấy bạn?
          </h2>
        </div>

        {/* Pain Points */}
        <div className="space-y-4 mb-10">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="problem-item card-base p-5 md:p-6 flex items-start gap-4 hover:border-orange-200 transition-colors"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{point.icon}</span>
              <div className="flex-1">
                <p className="text-foreground font-medium leading-relaxed text-[15px]">
                  {point.text}
                </p>
                <p className="text-xs text-red-500/80 font-semibold mt-1.5">→ {point.emotion}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Transition */}
        <div className="problem-item text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-100/50">
            <span className="text-2xl">💡</span>
            <p className="text-foreground font-semibold text-sm md:text-base">
              Nếu bạn gặp ít nhất 1 điều trên —{' '}
              <span className="highlight-orange">QPWeb giải quyết trong 5 ngày</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
