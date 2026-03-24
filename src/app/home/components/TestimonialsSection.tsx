'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  name: 'Nguyễn Thị Lan Anh',
  role: 'Coach Tư Duy Tích Cực',
  company: 'LanAnh Coaching',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2020835-1763297966684.png",
  alt: 'Chân dung phụ nữ Việt Nam tóc dài mặc áo trắng chuyên nghiệp',
  quote: 'Mình rất bất ngờ khi website xong đúng 5 ngày, đẹp hơn mình tưởng rất nhiều. Sau khi có website, học viên mới tìm đến mình qua Google tăng gấp đôi trong tháng đầu!',
  stars: 5,
  tag: 'Coaching',
  tagColor: 'bg-blue-100 text-blue-700',
  num: '01'
},
{
  name: 'Trần Minh Khoa',
  role: 'Chủ quán The Brew House',
  company: 'The Brew House Coffee',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff87df0a-1763300324588.png",
  alt: 'Chân dung nam thanh niên Việt Nam tóc ngắn mặc áo polo xanh',
  quote: 'Trước đây mình chỉ bán qua Facebook. Từ khi có website tích hợp Zalo và SEO local, khách tìm đến quán tăng hẳn. Anh làm việc rất chuyên nghiệp, cập nhật tiến độ mỗi ngày.',
  stars: 5,
  tag: 'F&B',
  tagColor: 'bg-amber-100 text-amber-700',
  num: '02'
},
{
  name: 'Phạm Thu Hương',
  role: 'Nhiếp ảnh gia',
  company: 'Hương Photography Studio',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12132e915-1772250338040.png",
  alt: 'Chân dung nữ nhiếp ảnh gia Việt Nam mặc áo đen cầm máy ảnh',
  quote: 'Portfolio của mình giờ trông rất xịn và chuyên nghiệp. Khách hàng doanh nghiệp bắt đầu liên hệ qua website thay vì chỉ Instagram. Giá cả hợp lý, chất lượng vượt kỳ vọng.',
  stars: 5,
  tag: 'Nhiếp ảnh',
  tagColor: 'bg-gray-100 text-gray-700',
  num: '03'
},
{
  name: 'Lê Văn Đức',
  role: 'Chủ cửa hàng điện lạnh',
  company: 'Điện Lạnh Hoàng Phát',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17811e40c-1773306160878.png",
  alt: 'Chân dung người đàn ông trung niên Việt Nam mặc đồng phục xanh',
  quote: 'Cửa hàng điện lạnh của mình cần website để khách đặt lịch sửa online. Anh làm đúng yêu cầu, có thêm nút Zalo để khách liên hệ ngay. Bây giờ 30% đơn đến từ website.',
  stars: 5,
  tag: 'Dịch vụ',
  tagColor: 'bg-green-100 text-green-700',
  num: '04'
}];


export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.testi-card') as NodeListOf<HTMLElement>;
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
      card.style.transform = 'translateY(28px)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      card.setAttribute('data-delay', String(i * 100));
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

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-white py-20 md:py-28"
      aria-labelledby="testimonials-heading">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge-gradient mb-4 mx-auto inline-flex">Khách hàng nói gì</div>
          <h2
            id="testimonials-heading"
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            
            120+ khách hàng{' '}
            <span className="highlight-orange">tin tưởng</span> &{' '}
            <span className="highlight-blue">hài lòng</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Từ coach cá nhân đến doanh nghiệp SME — tất cả đều nhận được website đúng hẹn.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) =>
          <div key={t.name} className="testi-card spotlight-card p-8 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border pb-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <AppImage
                    src={t.avatar}
                    alt={t.alt}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-xl object-cover" />
                  
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted mt-0.5">{t.role}</div>
                    <div className="text-xs font-semibold text-primary mt-0.5">{t.company}</div>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.tagColor} flex-shrink-0`}>
                  {t.tag}
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) =>
              <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
              )}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 leading-relaxed flex-1 text-[15px] italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Number */}
              <div className="flex justify-between items-center mt-5 pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted/40 font-display">{t.num}</span>
                <svg className="w-4 h-4 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}