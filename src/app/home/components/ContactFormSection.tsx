'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSiteOptions } from '@/lib/SiteOptionsContext';

const industryOptions = [
  'Quán cà phê / Nhà hàng',
  'Spa / Thẩm mỹ',
  'Coach / Đào tạo',
  'Portfolio / Nhiếp ảnh',
  'Dịch vụ địa phương',
  'Cửa hàng / Bán lẻ',
  'Khác',
];

export default function ContactFormSection() {
  const { hotline, zalo } = useSiteOptions();
  const [formData, setFormData] = useState({ name: '', phone: '', industry: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.contact-animate') as NodeListOf<HTMLElement>;
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
      item.setAttribute('data-delay', String(i * 100));
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setLoading(true);

    // Build Zalo message with form data
    const message = `Xin chào, mình là ${formData.name}. Mình cần tư vấn thiết kế website${formData.industry ? ` cho ngành ${formData.industry}` : ''}. SĐT: ${formData.phone}`;
    const zaloUrl = `${zalo}?text=${encodeURIComponent(message)}`;

    // Simulate small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    setSubmitted(true);

    // Open Zalo with pre-filled message
    setTimeout(() => {
      window.open(zaloUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-white py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="contact-animate">
            <div className="badge-gradient mb-4 inline-flex">Nhận báo giá</div>
            <h2
              id="contact-heading"
              className="font-display font-bold text-foreground mb-3"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
            >
              Báo giá <span className="highlight-orange">miễn phí</span> trong 30 phút
            </h2>
            <p className="text-muted mb-8 text-sm leading-relaxed">
              Điền thông tin bên dưới — mình sẽ liên hệ qua Zalo ngay hôm nay để tư vấn và báo giá cụ thể.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground mb-2">
                    Tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Ví dụ: Lan Anh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-foreground mb-2">
                    Số điện thoại / Zalo <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="Ví dụ: 0901 234 567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label htmlFor="contact-industry" className="block text-sm font-semibold text-foreground mb-2">
                    Bạn cần website cho?
                  </label>
                  <select
                    id="contact-industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="">— Chọn ngành —</option>
                    {industryOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60"
                  aria-label="Gửi yêu cầu báo giá"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Đang gửi...
                    </span>
                  ) : (
                    <span>🚀 Nhận báo giá miễn phí</span>
                  )}
                </button>

                {/* Trust text */}
                <p className="text-center text-xs text-muted/70 flex items-center justify-center gap-4">
                  <span>🔒 Bảo mật thông tin</span>
                  <span>·</span>
                  <span>Không spam</span>
                  <span>·</span>
                  <span>Phản hồi trong 30 phút</span>
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="card-base p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Đã nhận thông tin!
                </h3>
                <p className="text-muted text-sm mb-6">
                  Mình sẽ liên hệ bạn qua Zalo trong 30 phút. Nếu cần gấp, nhắn Zalo hoặc gọi trực tiếp nhé!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary justify-center"
                  >
                    💬 Nhắn Zalo ngay
                  </a>
                  <a
                    href={`tel:${hotline.replace(/\s/g, '')}`}
                    className="btn-secondary justify-center"
                  >
                    📞 Gọi {hotline}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right side — Trust + Contact */}
          <div className="contact-animate space-y-6">
            {/* CTA Dark Panel */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
            >
              {/* Glow effects */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold text-primary uppercase tracking-widest mb-5 font-display">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Sẵn sàng bắt đầu
                </div>

                <h3 className="font-display font-bold text-white text-xl mb-3">
                  Hoặc liên hệ trực tiếp
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Mô tả ngắn về website bạn cần — mình báo giá và timeline cụ thể qua Zalo ngay hôm nay.
                </p>

                <div className="space-y-3">
                  <a
                    href={zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center"
                  >
                    💬 Nhắn Zalo ngay
                  </a>
                  <a
                    href={`tel:${hotline.replace(/\s/g, '')}`}
                    className="btn-secondary w-full justify-center border-white/20 text-white hover:border-white/50"
                  >
                    📞 Gọi {hotline}
                  </a>
                </div>

                {/* Mini stats */}
                <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  {[
                    { v: '120+', l: 'Dự án' },
                    { v: '5.0/5', l: 'Đánh giá' },
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

            {/* Urgency badge */}
            <div className="card-base p-5 flex items-center gap-4 border-orange-100">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="font-display font-bold text-foreground text-sm">
                  Tháng 5: Chỉ nhận tối đa 10 dự án
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Đảm bảo chất lượng — mỗi dự án được toàn tâm chăm sóc
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
