'use client';

import React, { useEffect, useRef } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  desc: string;
  pages: string;
  design: string;
  seo: string;
  warranty: string;
  features: string[];
  popular: boolean;
  cta: string;
  num: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '3.500.000',
    desc: 'Phù hợp cho cá nhân, freelancer, coach mới bắt đầu.',
    pages: '5 trang',
    design: 'Template Flatsome có sẵn',
    seo: 'SEO on-page cơ bản',
    warranty: 'Bảo hành 3 tháng',
    features: [
      '5 trang nội dung',
      'Thiết kế template Flatsome',
      'Responsive mobile',
      'Form liên hệ + Zalo',
      'SEO on-page cơ bản',
      'Bảo hành 3 tháng',
    ],
    popular: false,
    cta: 'Chọn Basic',
    num: '01',
  },
  {
    name: 'Standard',
    price: '6.500.000',
    desc: 'Lý tưởng cho quán cà phê, spa, cửa hàng, dịch vụ địa phương.',
    pages: '10 trang',
    design: 'Thiết kế tuỳ chỉnh theo brand',
    seo: 'SEO local + Google My Business',
    warranty: 'Bảo hành 6 tháng',
    features: [
      '10 trang nội dung',
      'Thiết kế tuỳ chỉnh theo brand',
      'Responsive + tốc độ tối ưu',
      'Zalo OA + Live chat',
      'SEO local + Google My Business',
      'Bảo hành 6 tháng',
      'Hướng dẫn quản trị',
    ],
    popular: true,
    cta: 'Chọn Standard',
    num: '02',
  },
  {
    name: 'Pro',
    price: '12.000.000',
    desc: 'Dành cho doanh nghiệp SME, thương mại điện tử, website nhiều tính năng.',
    pages: 'Không giới hạn',
    design: 'Thiết kế premium 100% custom',
    seo: 'SEO toàn diện + blog content',
    warranty: 'Bảo hành 12 tháng',
    features: [
      'Trang không giới hạn',
      'Thiết kế premium 100% custom',
      'WooCommerce / đặt lịch online',
      'Zalo OA + Email marketing',
      'SEO toàn diện + blog content',
      'Bảo hành 12 tháng',
      'Báo cáo tháng + tư vấn chiến lược',
    ],
    popular: false,
    cta: 'Chọn Pro',
    num: '03',
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.pricing-card') as NodeListOf<HTMLElement>;
    if (!cards) return;

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

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(32px)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      card.setAttribute('data-delay', String(i * 120));
      observer.observe(card);
    });

    // Spotlight
    const allCards = document.querySelectorAll('.spotlight-card');
    const handleMouseMove = (e: MouseEvent) => {
      allCards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-white py-20 md:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge-gradient mb-4 mx-auto inline-flex">Bảng giá minh bạch</div>
          <h2
            id="pricing-heading"
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}
          >
            Chọn gói phù hợp,{' '}
            <span className="highlight-blue">không phí ẩn</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Giá cố định, thanh toán rõ ràng. Tất cả gói đều bao gồm domain + hosting năm đầu.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card spotlight-card flex flex-col ${
                plan.popular
                  ? 'ring-2 ring-primary/40 shadow-orange'
                  : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="flex justify-center pt-4">
                  <span className="pricing-popular">⭐ Phổ biến nhất</span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                <span className="text-xs font-mono text-muted/40 font-display font-bold mb-3">
                  {plan.num}
                </span>

                <div className="mb-6">
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-display font-extrabold text-3xl highlight-orange">
                      {plan.price}
                    </span>
                    <span className="text-muted text-sm">đ</span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{plan.desc}</p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-1 gap-2 mb-6 p-4 rounded-xl bg-bg-alt">
                  {[
                    { label: 'Số trang', value: plan.pages },
                    { label: 'Thiết kế', value: plan.design },
                    { label: 'Tối ưu', value: plan.seo },
                    { label: 'Bảo hành', value: plan.warranty },
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between items-start gap-2 text-sm">
                      <span className="text-muted font-medium flex-shrink-0">{spec.label}:</span>
                      <span className="text-foreground font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="text-foreground/80">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className={plan.popular ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                  aria-label={`${plan.cta} - ${plan.name}`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-muted mt-8">
          💡 Chưa chắc gói nào phù hợp?{' '}
          <button
            onClick={scrollToContact}
            className="text-primary font-semibold hover:underline"
          >
            Nhắn Zalo để được tư vấn miễn phí
          </button>
        </p>
      </div>
    </section>
  );
}