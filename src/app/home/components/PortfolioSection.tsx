'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const portfolioItems = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_140930152-1773529709087.png",
  alt: 'Website spa thư giãn màu hồng kem với giao diện tối giản sang trọng',
  title: 'Spa Hương Thơm',
  tag: 'Spa & Beauty',
  tagColor: 'bg-pink-100 text-pink-700'
},
{
  src: "https://images.unsplash.com/photo-1715572158823-7fae1ef02b3b",
  alt: 'Website quán cà phê phong cách vintage với menu online',
  title: 'The Brew House',
  tag: 'F&B',
  tagColor: 'bg-amber-100 text-amber-700'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1e8e280b3-1772070160060.png",
  alt: 'Portfolio nhiếp ảnh gia chuyên nghiệp màu đen trắng tối giản',
  title: 'Minh Tuấn Photo',
  tag: 'Nhiếp ảnh',
  tagColor: 'bg-gray-100 text-gray-700'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_174834907-1773110789836.png",
  alt: 'Website dịch vụ tư vấn doanh nghiệp màu xanh chuyên nghiệp',
  title: 'Coaching Thành Công',
  tag: 'Coaching',
  tagColor: 'bg-blue-100 text-blue-700'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1815a4642-1772246537354.png",
  alt: 'Website cửa hàng thời trang với catalogue sản phẩm WooCommerce',
  title: 'Thời Trang Linh',
  tag: 'Thời trang',
  tagColor: 'bg-purple-100 text-purple-700'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c9ef2cf3-1772642421181.png",
  alt: 'Website dịch vụ sửa chữa điện lạnh địa phương tích hợp đặt lịch',
  title: 'Điện Lạnh Hoàng',
  tag: 'Dịch vụ',
  tagColor: 'bg-green-100 text-green-700'
}];


export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.portfolio-item') as NodeListOf<HTMLElement>;
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute('data-delay') || '0');
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'scale(1) translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.94) translateY(20px)';
      item.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      item.setAttribute('data-delay', String(i * 80));
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-alt py-20 md:py-28"
      aria-labelledby="portfolio-heading">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge-gradient mb-4 mx-auto inline-flex">Portfolio thực tế</div>
          <h2
            id="portfolio-heading"
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            
            Dự án đã{' '}
            <span className="highlight-orange">bàn giao</span>{' '}
            thành công
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            120+ website cho khách hàng Việt Nam — từ quán nhỏ đến doanh nghiệp SME.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) =>
          <div key={item.title} className="portfolio-item group cursor-pointer">
              <div className="portfolio-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <AppImage
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority={i < 2} />
              
                <div className="overlay">
                  <div className="w-full">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg">{item.title}</h3>
                    <button
                    className="mt-3 text-sm font-semibold text-white/80 hover:text-white flex items-center gap-1 transition-colors"
                    aria-label={`Xem case study ${item.title}`}>
                    
                      Xem case →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <button
            className="btn-secondary"
            aria-label="Xem tất cả portfolio">
            
            Xem tất cả 120+ dự án →
          </button>
        </div>
      </div>
    </section>);

}