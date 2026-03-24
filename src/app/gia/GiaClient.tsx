'use client';

import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import Link from 'next/link';
import type { PricingPlan, Addon, FAQ } from '@/lib/wordpress/types';

/* ── Fallback static data ── */
const fallbackPlans: PricingPlan[] = [
  { name: 'Basic', price: '3.500.000', desc: 'Phù hợp cho cá nhân, freelancer, coach mới bắt đầu.', pages: '5 trang', design: 'Template Flatsome có sẵn', seo: 'SEO on-page cơ bản', warranty: 'Bảo hành 3 tháng', features: ['5 trang nội dung','Thiết kế template Flatsome','Responsive mobile 100%','Form liên hệ + nút Zalo','SEO on-page cơ bản','Bảo hành 3 tháng','Hỗ trợ qua Zalo'], notIncluded: ['SEO local & Google My Business','WooCommerce / đặt lịch','Báo cáo tháng'], popular: false, cta: 'Chọn Basic', num: '01', color: 'text-blue-brand', bg: 'bg-blue-50' },
  { name: 'Standard', price: '6.500.000', desc: 'Lý tưởng cho quán cà phê, spa, cửa hàng, dịch vụ địa phương.', pages: '10 trang', design: 'Thiết kế tuỳ chỉnh theo brand', seo: 'SEO local + Google My Business', warranty: 'Bảo hành 6 tháng', features: ['10 trang nội dung','Thiết kế tuỳ chỉnh theo brand','Responsive + tốc độ tối ưu','Zalo OA + Live chat','SEO local + Google My Business','Bảo hành 6 tháng','Hướng dẫn quản trị'], notIncluded: ['WooCommerce / đặt lịch online','Báo cáo tháng + tư vấn chiến lược'], popular: true, cta: 'Chọn Standard', num: '02', color: 'text-primary', bg: 'bg-orange-50' },
  { name: 'Pro', price: '12.000.000', desc: 'Dành cho doanh nghiệp SME, thương mại điện tử, website nhiều tính năng.', pages: 'Không giới hạn', design: 'Thiết kế premium 100% custom', seo: 'SEO toàn diện + blog content', warranty: 'Bảo hành 12 tháng', features: ['Trang không giới hạn','Thiết kế premium 100% custom','WooCommerce / đặt lịch online','Zalo OA + Email marketing','SEO toàn diện + blog content','Bảo hành 12 tháng','Báo cáo tháng + tư vấn chiến lược'], notIncluded: [], popular: false, cta: 'Chọn Pro', num: '03', color: 'text-blue-brand', bg: 'bg-blue-50' },
];
const fallbackAddons: Addon[] = [
  { name: 'Thêm trang nội dung', price: '300.000đ/trang', desc: 'Thêm trang About, Blog, FAQ, v.v.' },
  { name: 'Logo design', price: '500.000đ', desc: 'Thiết kế logo chuyên nghiệp theo brand' },
  { name: 'Bảo trì tháng', price: '500.000đ/tháng', desc: 'Backup, update, sửa lỗi, hỗ trợ kỹ thuật' },
  { name: 'SEO nâng cao', price: '1.500.000đ/tháng', desc: 'Viết content, link building, báo cáo thứ hạng' },
  { name: 'Email marketing', price: '800.000đ/tháng', desc: 'Thiết lập & gửi newsletter tự động' },
  { name: 'Chụp ảnh sản phẩm', price: 'Liên hệ', desc: 'Chụp ảnh chuyên nghiệp cho website' },
];
const fallbackFaqs: FAQ[] = [
  { question: 'Giá đã bao gồm domain và hosting chưa?', answer: 'Có! Tất cả gói đều bao gồm domain .com/.vn và hosting tốc độ cao cho năm đầu tiên (trị giá khoảng 1.200.000đ). Từ năm thứ 2 trở đi, bạn tự gia hạn với chi phí khoảng 1.000.000-1.500.000đ/năm.' },
  { question: 'Thanh toán như thế nào?', answer: '50% khi ký hợp đồng và bắt đầu dự án, 50% còn lại khi bàn giao website hoàn chỉnh. Thanh toán qua chuyển khoản ngân hàng hoặc MoMo.' },
  { question: 'Có thể nâng cấp gói sau khi đã mua không?', answer: 'Có! Bạn có thể nâng cấp từ Basic lên Standard hoặc Pro bất cứ lúc nào. Chỉ cần thanh toán phần chênh lệch.' },
  { question: 'Nếu không hài lòng có được hoàn tiền không?', answer: 'Nếu chúng tôi không bàn giao đúng 5 ngày như cam kết, bạn được hoàn 100% tiền đã thanh toán. Chúng tôi tự tin vào quy trình của mình.' },
];

interface Props { plans: PricingPlan[]; addons: Addon[]; faqs: FAQ[]; }

export default function GiaClient({ plans: wp, addons: wpA, faqs: wpF }: Props) {
  const plans = wp.length > 0 ? wp : fallbackPlans;
  const addons = wpA.length > 0 ? wpA : fallbackAddons;
  const faqs = wpF.length > 0 ? wpF : fallbackFaqs;
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; setTimeout(() => { el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 100); }
    const cards = cardsRef.current?.querySelectorAll('.pricing-card') as NodeListOf<HTMLElement>;
    if (!cards) return;
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { const card = entry.target as HTMLElement; const delay = parseInt(card.getAttribute('data-delay') || '0'); setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, delay); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    cards.forEach((card, i) => { card.style.opacity = '0'; card.style.transform = 'translateY(32px)'; card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'; card.setAttribute('data-delay', String(i * 120)); observer.observe(card); });
    return () => { observer.disconnect(); };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #007BFF 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div ref={heroRef}>
              <div className="badge-gradient mb-6 mx-auto inline-flex"><span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />Bảng giá minh bạch</div>
              <h1 className="font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>Giá cố định, <span className="highlight-orange">không phí ẩn</span>,{' '}<span className="highlight-blue">không bất ngờ</span></h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">Chọn gói phù hợp với nhu cầu — tất cả đều bao gồm domain + hosting năm đầu và bảo hành chính thức.</p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan) => (
                <div key={plan.name} className={`pricing-card spotlight-card flex flex-col ${plan.popular ? 'ring-2 ring-primary/40 shadow-orange' : ''}`}>
                  {plan.popular && (<div className="flex justify-center pt-4"><span className="pricing-popular">⭐ Phổ biến nhất</span></div>)}
                  <div className="p-8 flex flex-col flex-1">
                    <span className="text-xs font-mono text-muted/40 font-display font-bold mb-3">{plan.num}</span>
                    <div className="mb-6">
                      <h3 className="font-display font-bold text-2xl text-foreground mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-3"><span className="font-display font-extrabold text-3xl highlight-orange">{plan.price}</span><span className="text-muted text-sm">đ</span></div>
                      <p className="text-muted text-sm leading-relaxed">{plan.desc}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-6 p-4 rounded-xl bg-bg-alt">
                      {[{ label: 'Số trang', value: plan.pages },{ label: 'Thiết kế', value: plan.design },{ label: 'Tối ưu', value: plan.seo },{ label: 'Bảo hành', value: plan.warranty }].map((spec) => (
                        <div key={spec.label} className="flex justify-between items-start gap-2 text-sm"><span className="text-muted font-medium flex-shrink-0">{spec.label}:</span><span className="text-foreground font-semibold text-right">{spec.value}</span></div>
                      ))}
                    </div>
                    <ul className="space-y-3 mb-4 flex-1">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm">
                          <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5"><svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></span>
                          <span className="text-foreground/80">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.notIncluded.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {plan.notIncluded.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 text-sm">
                            <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5"><svg className="w-3 h-3 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></span>
                            <span className="text-muted/50">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href="/lien-he" className={plan.popular ? 'btn-primary w-full justify-center text-center' : 'btn-secondary w-full justify-center text-center'}>{plan.cta}</Link>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted mt-8">💡 Chưa chắc gói nào phù hợp?{' '}<Link href="/lien-he" className="text-primary font-semibold hover:underline">Nhắn Zalo để được tư vấn miễn phí</Link></p>
          </div>
        </section>

        {/* Add-ons */}
        <section className="section-alt py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="badge-gradient mb-4 mx-auto inline-flex">Dịch vụ bổ sung</div>
              <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>Tuỳ chỉnh theo <span className="highlight-orange">nhu cầu</span> của bạn</h2>
              <p className="text-muted text-lg max-w-xl mx-auto">Thêm các dịch vụ bổ sung để tối ưu website và tăng hiệu quả kinh doanh.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {addons.map((addon) => (
                <div key={addon.name} className="card-base p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-primary flex items-center justify-center flex-shrink-0"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></div>
                  <div><div className="font-display font-bold text-foreground text-sm mb-0.5">{addon.name}</div><div className="text-primary font-bold text-sm mb-1">{addon.price}</div><div className="text-xs text-muted">{addon.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-white py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="badge-gradient mb-4 mx-auto inline-flex">Câu hỏi về giá</div>
              <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>Giải đáp <span className="highlight-blue">thắc mắc</span> về giá</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card-base p-6">
                  <h3 className="font-display font-bold text-foreground mb-2 flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>{faq.question}</h3>
                  <p className="text-muted text-sm leading-relaxed pl-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-dark py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,138,0,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>Sẵn sàng đầu tư vào <span className="highlight-orange">website xịn</span>?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Nhắn Zalo để được tư vấn chọn gói phù hợp — miễn phí, không áp lực.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lien-he" className="btn-primary text-base px-8 py-4"><span>💬 Nhắn Zalo tư vấn ngay</span></Link>
              <Link href="/portfolio" className="btn-secondary text-base px-8 py-4" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Xem Portfolio →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloFloat />
    </>
  );
}
