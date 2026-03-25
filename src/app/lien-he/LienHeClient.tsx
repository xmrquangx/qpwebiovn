'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import Link from 'next/link';
import type { ContactOptions } from '@/lib/wordpress/services';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  website: string; // honeypot
}

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.qpweb.io.vn';

/* ── Fallback values ── */
const FALLBACK_HOTLINE = '0901 234 567';
const FALLBACK_ZALO = '0901234567';
const FALLBACK_EMAIL = 'hello@webagencyvn.com';

interface Props {
  options: ContactOptions;
}

export default function LienHeClient({ options }: Props) {
  const hotline = options.hotline || FALLBACK_HOTLINE;
  const zalo = options.zalo || FALLBACK_ZALO;
  const email = options.email || FALLBACK_EMAIL;

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      label: 'Hotline',
      value: hotline,
      href: `tel:${hotline.replace(/\s/g, '')}`,
      desc: 'Gọi trực tiếp 8h - 22h mỗi ngày',
      color: 'text-primary',
      bg: 'bg-orange-50',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.03c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.26 14.167l-2.95-.924c-.642-.204-.654-.642.136-.953l11.527-4.445c.535-.194 1.003.131.589.403z" />
        </svg>
      ),
      label: 'Zalo',
      value: 'Nhắn Zalo ngay',
      href: `https://zalo.me/${zalo.replace(/\s/g, '')}`,
      desc: 'Phản hồi trong vòng 30 phút',
      color: 'text-blue-brand',
      bg: 'bg-blue-50',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      desc: 'Phản hồi trong vòng 2 giờ làm việc',
      color: 'text-primary',
      bg: 'bg-orange-50',
    },
  ];

  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    budget: '',
    message: '',
    website: '', // honeypot — hidden
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${WP_API_URL}/wp-json/qpweb/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      setErrorMsg('Lỗi kết nối. Vui lòng thử lại hoặc nhắn Zalo trực tiếp.');
    } finally {
      setLoading(false);
    }
  };

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
                Tư vấn miễn phí
              </div>
              <h1 className="font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                Liên hệ để nhận <span className="highlight-orange">tư vấn</span>{' '}
                <span className="highlight-blue">miễn phí</span>
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                Điền form bên dưới hoặc nhắn Zalo trực tiếp — chúng tôi sẽ phản hồi trong vòng 30 phút.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-alt py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="card-base p-6 flex items-start gap-4 group"
                  aria-label={method.label}
                >
                  <div className={`w-12 h-12 rounded-xl ${method.bg} ${method.color} flex items-center justify-center flex-shrink-0`}>
                    {method.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted/60 mb-1 font-display">{method.label}</div>
                    <div className={`font-display font-bold text-foreground group-hover:${method.color} transition-colors`}>{method.value}</div>
                    <div className="text-xs text-muted mt-1">{method.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Info */}
        <section className="section-white py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="card-base p-8">
                  <h2 className="font-display font-bold text-foreground text-2xl mb-2">Gửi yêu cầu tư vấn</h2>
                  <p className="text-muted text-sm mb-8">Điền thông tin bên dưới — chúng tôi sẽ liên hệ lại trong 30 phút.</p>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">🎉</div>
                      <h3 className="font-display font-bold text-foreground text-xl mb-2">Gửi thành công!</h3>
                      <p className="text-muted text-sm mb-6">Chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút qua Zalo hoặc điện thoại.</p>
                      <a
                        href={`https://zalo.me/${zalo.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <span>💬 Nhắn Zalo ngay</span>
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Honeypot — hidden from users */}
                      <div className="hidden" aria-hidden="true">
                        <input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="name">
                            Họ và tên <span className="text-primary">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nguyễn Văn A"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="phone">
                            Số điện thoại <span className="text-primary">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0901 234 567"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="service">
                            Dịch vụ quan tâm
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          >
                            <option value="">Chọn dịch vụ...</option>
                            <option value="basic">Gói Basic - 3.5 triệu</option>
                            <option value="standard">Gói Standard - 6.5 triệu</option>
                            <option value="pro">Gói Pro - 12 triệu</option>
                            <option value="seo">SEO Local</option>
                            <option value="maintenance">Bảo trì website</option>
                            <option value="other">Khác</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="budget">
                            Ngân sách dự kiến
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          >
                            <option value="">Chọn ngân sách...</option>
                            <option value="under5">Dưới 5 triệu</option>
                            <option value="5to10">5 - 10 triệu</option>
                            <option value="10to20">10 - 20 triệu</option>
                            <option value="over20">Trên 20 triệu</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="message">
                          Mô tả yêu cầu
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Mô tả ngắn về doanh nghiệp và yêu cầu website của bạn..."
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                        />
                      </div>

                      {errorMsg && (
                        <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                          ⚠️ {errorMsg}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center text-base py-4"
                        aria-label="Gửi yêu cầu tư vấn"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Đang gửi...
                          </span>
                        ) : (
                          <span>🚀 Gửi yêu cầu tư vấn</span>
                        )}
                      </button>

                      <p className="text-xs text-muted text-center">
                        Hoặc nhắn trực tiếp qua{' '}
                        <a href={`https://zalo.me/${zalo.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-brand font-semibold hover:underline">
                          Zalo: {zalo}
                        </a>
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* Info Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Why us */}
                <div className="card-base p-6">
                  <h3 className="font-display font-bold text-foreground mb-4">Tại sao chọn chúng tôi?</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: '⚡', title: 'Bàn giao trong 5 ngày', desc: 'Cam kết đúng hẹn hoặc hoàn tiền 100%' },
                      { icon: '💰', title: 'Giá cố định, không phí ẩn', desc: 'Báo giá rõ ràng từ đầu, không phát sinh' },
                      { icon: '📱', title: 'Hỗ trợ qua Zalo 8h-22h', desc: 'Phản hồi nhanh, không để bạn chờ lâu' },
                      { icon: '🛡️', title: 'Bảo hành chính thức', desc: 'Bảo hành 3-12 tháng theo gói đã chọn' },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <div className="font-semibold text-foreground text-sm">{item.title}</div>
                          <div className="text-xs text-muted">{item.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Working hours */}
                <div className="card-base p-6">
                  <h3 className="font-display font-bold text-foreground mb-4">Giờ làm việc</h3>
                  <div className="space-y-3">
                    {[
                      { day: 'Thứ 2 - Thứ 6', time: '8:00 - 22:00', active: true },
                      { day: 'Thứ 7', time: '8:00 - 18:00', active: true },
                      { day: 'Chủ nhật', time: 'Nghỉ (Zalo vẫn trả lời)', active: false },
                    ].map((item) => (
                      <div key={item.day} className="flex justify-between items-center text-sm">
                        <span className="text-foreground font-medium">{item.day}</span>
                        <span className={`font-semibold ${item.active ? 'text-green-600' : 'text-muted'}`}>{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="card-base p-6">
                  <h3 className="font-display font-bold text-foreground mb-4">Tìm hiểu thêm</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Xem Portfolio', href: '/portfolio' },
                      { label: 'Bảng giá chi tiết', href: '/gia' },
                      { label: 'Quy trình làm việc', href: '/quy-trinh' },
                      { label: 'Khách hàng nói gì', href: '/khach-hang' },
                    ].map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center justify-between text-sm text-muted hover:text-primary transition-colors py-1.5 border-b border-border last:border-0"
                      >
                        {link.label}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloFloat />
    </>
  );
}
