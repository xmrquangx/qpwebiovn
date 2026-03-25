'use client';

import React, { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    q: 'Thực sự làm xong trong 5 ngày không?',
    a: 'Có — với điều kiện bạn cung cấp đủ nội dung (logo, ảnh, text) trong ngày đầu. Mình có checklist cụ thể gửi trước để bạn chuẩn bị. 100% dự án giao đúng hẹn trong 3 năm qua.',
  },
  {
    q: 'Tôi không biết gì về WordPress có tự quản lý được không?',
    a: 'Được. Sau bàn giao, mình hướng dẫn qua video Loom + Zalo. Flatsome có giao diện kéo thả trực quan, bạn có thể tự đổi ảnh, nội dung dễ dàng. Bảo hành 6 tháng — lỗi gì mình fix ngay.',
  },
  {
    q: 'Hosting và domain có bao gồm trong giá không?',
    a: 'Tất cả gói đều bao gồm domain .com (1 năm) và hosting tốc độ cao (1 năm). Từ năm 2 trở đi khoảng 1.2–1.8 triệu/năm — mình hỗ trợ gia hạn và không tăng giá đột ngột.',
  },
  {
    q: 'SEO local là gì và có hiệu quả không?',
    a: 'SEO local giúp website của bạn xuất hiện khi khách tìm kiếm "[dịch vụ] + [tên quận/thành phố]" trên Google. Ví dụ "spa quận 1 TPHCM". Kết quả thường thấy sau 2–4 tuần với từ khoá ít cạnh tranh.',
  },
  {
    q: 'Tôi có thể yêu cầu thêm tính năng ngoài gói không?',
    a: 'Có. Đặt lịch online, thanh toán VNPay/MoMo, blog, đa ngôn ngữ... đều có thể thêm với phí rõ ràng. Báo giá trước khi làm, không phát sinh chi phí bất ngờ.',
  },
  {
    q: 'Thanh toán như thế nào? Có an toàn không?',
    a: 'Thanh toán 50% khi bắt đầu, 50% khi bàn giao và bạn hài lòng. Chuyển khoản ngân hàng hoặc ví điện tử. Có hợp đồng dịch vụ rõ ràng bảo vệ quyền lợi của bạn.',
  },
];

const trustItems = [
  { icon: '🏆', label: '120+ dự án', sub: 'thành công' },
  { icon: '⚡', label: '100%', sub: 'đúng tiến độ' },
  { icon: '⭐', label: '5.0/5', sub: 'đánh giá' },
  { icon: '🛡️', label: 'Bảo hành', sub: '6-12 tháng' },
];

export default function FaqSection({ wpFaqs = [] }: { wpFaqs?: { question: string; answer: string }[] }) {
  const activeFaqs = wpFaqs.length > 0 ? wpFaqs.map(f => ({ q: f.question, a: f.answer })) : faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.faq-animate') as NodeListOf<HTMLElement>;
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
      item.setAttribute('data-delay', String(i * 80));
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-alt py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="faq-animate grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {trustItems.map((item) => (
            <div key={item.label} className="card-base p-5 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-display font-extrabold text-xl highlight-orange">{item.label}</div>
              <div className="text-xs text-muted">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* FAQ */}
          <div>
            <div className="mb-8 faq-animate">
              <div className="badge-gradient mb-4 inline-flex">Câu hỏi thường gặp</div>
              <h2
                id="faq-heading"
                className="font-display font-bold text-foreground"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
              >
                Còn thắc mắc?{' '}
                <span className="highlight-blue">Mình giải đáp</span>
              </h2>
            </div>

            <div className="space-y-0 card-base overflow-hidden">
              {activeFaqs.map((faq, i) => (
                <div key={i} className="faq-item faq-animate" data-delay={String(i * 60)}>
                  <button
                    className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-bg-alt transition-colors"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-display font-semibold text-foreground text-sm leading-relaxed">
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === i
                          ? 'bg-primary text-white rotate-45' :'bg-bg-alt text-muted'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Panel */}
          <div className="faq-animate">
            <div
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #007BFF 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold text-primary uppercase tracking-widest mb-6 font-display">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Sẵn sàng bắt đầu
                </div>

                <h3 className="font-display font-bold text-white text-2xl md:text-3xl mb-4 leading-tight">
                  Nhận báo giá{' '}
                  <span className="highlight-orange">miễn phí</span>{' '}
                  trong 30 phút
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  Mô tả ngắn về website bạn cần — mình sẽ báo giá và timeline cụ thể qua Zalo ngay hôm nay.
                </p>

                <div className="space-y-4">
                  <a
                    href="https://zalo.me/0901234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-base"
                    aria-label="Nhắn Zalo ngay"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.03c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.26 14.167l-2.95-.924c-.642-.204-.654-.642.136-.953l11.527-4.445c.535-.194 1.003.131.589.403z"/>
                    </svg>
                    <span>Nhắn Zalo ngay</span>
                  </a>
                  <button
                    onClick={scrollToContact}
                    className="btn-secondary w-full justify-center border-white/20 text-white hover:border-white/50 hover:text-white"
                    aria-label="Hoặc gọi điện trực tiếp"
                  >
                    📞 Gọi 0901 234 567
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                  {[
                    { v: '5 ngày', l: 'Bàn giao' },
                    { v: 'Miễn phí', l: 'Tư vấn' },
                    { v: '6 tháng', l: 'Bảo hành' },
                  ].map((item) => (
                    <div key={item.l}>
                      <div className="font-display font-extrabold text-white text-lg">{item.v}</div>
                      <div className="text-xs text-white/40">{item.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}