'use client';

import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import type { Testimonial } from '@/lib/wordpress/types';

const fallbackTestimonials: Testimonial[] = [
  { name: 'Nguyễn Thị Lan Anh', role: 'Coach Tư Duy Tích Cực', company: 'LanAnh Coaching', avatar: 'https://images.unsplash.com/photo-1633058851642-4bc86a5a6117', alt: 'Chân dung phụ nữ Việt Nam', quote: 'Mình rất bất ngờ khi website xong đúng 5 ngày, đẹp hơn mình tưởng rất nhiều.', stars: 5, tag: 'Coaching', tagColor: 'bg-blue-100 text-blue-700', result: '+100% học viên mới từ Google', num: '01' },
  { name: 'Trần Minh Khoa', role: 'Chủ quán The Brew House', company: 'The Brew House Coffee', avatar: 'https://images.unsplash.com/photo-1601724373327-8d3d925e43a2', alt: 'Chân dung nam thanh niên', quote: 'Từ khi có website tích hợp Zalo và SEO local, khách tìm đến quán tăng hẳn.', stars: 5, tag: 'F&B', tagColor: 'bg-amber-100 text-amber-700', result: 'Top 3 Google "cà phê Hoàn Kiếm"', num: '02' },
  { name: 'Phạm Thu Hương', role: 'Nhiếp ảnh gia', company: 'Hương Photography Studio', avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_12132e915-1772250338040.png', alt: 'Nữ nhiếp ảnh gia', quote: 'Portfolio giờ trông rất xịn. Khách hàng doanh nghiệp liên hệ qua website thay vì Instagram.', stars: 5, tag: 'Nhiếp ảnh', tagColor: 'bg-gray-100 text-gray-700', result: '+60% khách doanh nghiệp mới', num: '03' },
  { name: 'Lê Văn Đức', role: 'Chủ cửa hàng điện lạnh', company: 'Điện Lạnh Hoàng Phát', avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_17811e40c-1773306160878.png', alt: 'Người đàn ông trung niên', quote: 'Bây giờ 30% đơn đến từ website.', stars: 5, tag: 'Dịch vụ', tagColor: 'bg-green-100 text-green-700', result: '30% đơn hàng từ website', num: '04' },
  { name: 'Võ Thị Mai Linh', role: 'Chủ spa & làm đẹp', company: 'Spa Hương Thơm', avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c2020835-1763297966684.png', alt: 'Phụ nữ mặc áo dài', quote: 'Website booking online giúp mình giảm 80% thời gian nhắn tin xác nhận lịch.', stars: 5, tag: 'Spa & Beauty', tagColor: 'bg-pink-100 text-pink-700', result: '+40% lượt đặt lịch online', num: '05' },
  { name: 'Nguyễn Hoàng Nam', role: 'TikToker & Content Creator', company: 'Nam Hoàng Media', avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ff87df0a-1763300324588.png', alt: 'Nam thanh niên cầm điện thoại', quote: 'Tỷ lệ chuyển đổi từ TikTok sang mua khoá học tăng 3x.', stars: 5, tag: 'Content Creator', tagColor: 'bg-purple-100 text-purple-700', result: '3x tỷ lệ chuyển đổi khoá học', num: '06' },
];

const stats = [
  { value: '120+', label: 'Khách hàng hài lòng', icon: '😊' },
  { value: '4.9/5', label: 'Đánh giá trung bình', icon: '⭐' },
  { value: '100%', label: 'Đúng tiến độ', icon: '✅' },
  { value: '0', label: 'Khiếu nại hoàn tiền', icon: '🏆' },
];

interface Props { testimonials: Testimonial[]; }

export default function KhachHangClient({ testimonials: wp }: Props) {
  const testimonials = wp.length > 0 ? wp : fallbackTestimonials;
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; setTimeout(() => { el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 100); }
    const cards = cardsRef.current?.querySelectorAll('.testi-card') as NodeListOf<HTMLElement>;
    if (!cards) return;
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { const card = entry.target as HTMLElement; const delay = parseInt(card.getAttribute('data-delay') || '0'); setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, delay); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    cards.forEach((card, i) => { card.style.opacity = '0'; card.style.transform = 'translateY(28px)'; card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'; card.setAttribute('data-delay', String(i * 100)); observer.observe(card); });
    return () => { observer.disconnect(); };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #007BFF 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div ref={heroRef}>
              <div className="badge-gradient mb-6 mx-auto inline-flex"><span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />Khách hàng nói gì</div>
              <h1 className="font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>120+ khách hàng <span className="highlight-orange">tin tưởng</span> &{' '}<span className="highlight-blue">hài lòng</span></h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">Từ coach cá nhân đến doanh nghiệp <span className="highlight-word font-semibold text-foreground">SME</span> — tất cả đều nhận được website đúng hẹn, đúng chất lượng.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/lien-he" className="btn-primary text-base px-8 py-4"><span>🚀 Trở thành khách hàng tiếp theo</span></Link></div>
            </div>
          </div>
        </section>

        <section className="section-alt py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (<div key={stat.label} className="card-base p-6 text-center"><div className="text-2xl mb-2">{stat.icon}</div><div className="font-display font-extrabold text-2xl highlight-orange mb-1">{stat.value}</div><div className="text-xs text-muted">{stat.label}</div></div>))}
            </div>
          </div>
        </section>

        <section className="section-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="badge-gradient mb-4 mx-auto inline-flex">Đánh giá thực tế</div>
              <h2 className="font-display font-bold text-foreground mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>Họ đã <span className="highlight-orange">thành công</span> như thế nào?</h2>
              <p className="text-muted text-lg max-w-xl mx-auto">Những câu chuyện thực tế từ khách hàng đã tin tưởng và đạt được kết quả rõ ràng.</p>
            </div>
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="testi-card spotlight-card p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between border-b border-border pb-5 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <AppImage src={t.avatar} alt={t.alt} width={48} height={48} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-foreground text-sm">{t.name}</div>
                        <div className="text-xs text-muted mt-0.5">{t.role}</div>
                        <div className="text-xs font-semibold text-primary mt-0.5">{t.company}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.tagColor} flex-shrink-0`}>{t.tag}</span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (<svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed flex-1 text-[15px] italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                      {t.result}
                    </div>
                    <span className="text-xs font-mono text-muted/40 font-display">{t.num}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-alt py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10"><h2 className="font-display font-bold text-foreground mb-2" style={{ fontSize: 'clamp(20px, 3vw, 32px)' }}>Tại sao khách hàng <span className="highlight-orange">tin tưởng</span> chúng tôi?</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[{ icon: '🎯', title: 'Chuyên môn cao', desc: '5+ năm kinh nghiệm WordPress Flatsome, 120+ dự án thành công' },{ icon: '💬', title: 'Giao tiếp rõ ràng', desc: 'Cập nhật tiến độ hàng ngày qua Zalo, phản hồi trong 2 giờ' },{ icon: '🔒', title: 'Cam kết bảo hành', desc: 'Bảo hành 3-12 tháng, hỗ trợ kỹ thuật 8h-22h mỗi ngày' }].map((item) => (
                <div key={item.title} className="card-base p-6 text-center"><div className="text-3xl mb-3">{item.icon}</div><div className="font-display font-bold text-foreground mb-2">{item.title}</div><div className="text-sm text-muted leading-relaxed">{item.desc}</div></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-dark py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,138,0,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>Bạn muốn là <span className="highlight-orange">câu chuyện tiếp theo</span>?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Hãy nhắn Zalo để được tư vấn miễn phí — không áp lực, không phí ẩn.</p>
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
