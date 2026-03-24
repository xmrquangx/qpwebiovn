'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/wordpress/types';

/* ── fallback portfolio items ── */
const fallbackItems: PortfolioItem[] = [
  { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_140930152-1773529709087.png', alt: 'Website spa thư giãn màu hồng kem với giao diện tối giản sang trọng', title: 'Spa Hương Thơm', tag: 'Spa & Beauty', tagColor: 'bg-pink-100 text-pink-700', client: 'Spa Hương Thơm - TP.HCM', result: '+40% lượt đặt lịch qua web', tech: ['WordPress','Flatsome','Booking'], slug: 'spa-huong-thom' },
  { src: 'https://images.unsplash.com/photo-1715572158823-7fae1ef02b3b', alt: 'Website quán cà phê phong cách vintage với menu online', title: 'The Brew House', tag: 'F&B', tagColor: 'bg-amber-100 text-amber-700', client: 'The Brew House - Hà Nội', result: 'Top 3 Google "cà phê Hoàn Kiếm"', tech: ['WordPress','SEO Local','Zalo'], slug: 'the-brew-house' },
  { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e8e280b3-1772070160060.png', alt: 'Portfolio nhiếp ảnh gia chuyên nghiệp', title: 'Minh Tuấn Photo', tag: 'Nhiếp ảnh', tagColor: 'bg-gray-100 text-gray-700', client: 'Minh Tuấn Photography - Đà Nẵng', result: '+60% khách doanh nghiệp mới', tech: ['WordPress','Portfolio','Gallery'], slug: 'minh-tuan-photo' },
  { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_174834907-1773110789836.png', alt: 'Website dịch vụ tư vấn doanh nghiệp', title: 'Coaching Thành Công', tag: 'Coaching', tagColor: 'bg-blue-100 text-blue-700', client: 'Coaching Thành Công - TP.HCM', result: '2x học viên đăng ký online', tech: ['WordPress','LMS','Zalo OA'], slug: 'coaching-thanh-cong' },
  { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1815a4642-1772246537354.png', alt: 'Website cửa hàng thời trang', title: 'Thời Trang Linh', tag: 'Thời trang', tagColor: 'bg-purple-100 text-purple-700', client: 'Thời Trang Linh - Hải Phòng', result: '30% đơn hàng từ website', tech: ['WooCommerce','SEO','Zalo'], slug: 'thoi-trang-linh' },
  { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c9ef2cf3-1772642421181.png', alt: 'Website dịch vụ sửa chữa điện lạnh', title: 'Điện Lạnh Hoàng', tag: 'Dịch vụ', tagColor: 'bg-green-100 text-green-700', client: 'Điện Lạnh Hoàng Phát - Cần Thơ', result: '30% đơn từ website trong 2 tháng', tech: ['WordPress','Booking','SEO Local'], slug: 'dien-lanh-hoang' },
];

const fallbackCategories = ['Tất cả','Spa & Beauty','F&B','Nhiếp ảnh','Coaching','Thời trang','Dịch vụ','Doanh nghiệp'];

interface Props {
  items: PortfolioItem[];
  categories: string[];
}

export default function PortfolioClient({ items: wpItems, categories: wpCategories }: Props) {
  const portfolioItems = wpItems.length > 0 ? wpItems : fallbackItems;
  const allTags = wpCategories.length > 0 ? ['Tất cả', ...wpCategories] : fallbackCategories;

  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const heroRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'Tất cả' ? portfolioItems : portfolioItems.filter((p) => p.tag === activeFilter);

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
              <div className="badge-gradient mb-6 mx-auto inline-flex">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                120+ dự án hoàn thành
              </div>
              <h1 className="font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                Portfolio <span className="highlight-orange">thực tế</span> — kết quả{' '}
                <span className="highlight-blue">đo được</span>
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
                Mỗi dự án là một câu chuyện thành công — từ quán nhỏ đến doanh nghiệp{' '}
                <span className="highlight-word font-semibold text-foreground">SME</span> Việt Nam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/lien-he" className="btn-primary text-base px-8 py-4"><span>🚀 Bắt đầu dự án của bạn</span></Link>
                <Link href="/gia" className="btn-secondary text-base px-8 py-4">Xem bảng giá →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-alt py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '120+', label: 'Dự án hoàn thành', icon: '🏆' },
                { value: '5 ngày', label: 'Thời gian bàn giao', icon: '⚡' },
                { value: '100%', label: 'Đúng tiến độ', icon: '✅' },
                { value: '4.9★', label: 'Đánh giá trung bình', icon: '⭐' },
              ].map((stat) => (
                <div key={stat.label} className="card-base p-6 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="font-display font-extrabold text-2xl highlight-orange mb-1">{stat.value}</div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="section-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {allTags.map((cat) => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeFilter === cat ? 'bg-primary text-white shadow-md' : 'bg-bg-alt text-muted hover:text-foreground hover:bg-border'}`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <Link key={item.title} href={`/portfolio/${item.slug}`} className="group cursor-pointer">
                  <div className="portfolio-card shadow-card hover:shadow-card-hover transition-shadow duration-300">
                    <AppImage src={item.src} alt={item.alt} width={800} height={600} className="w-full h-full object-cover" priority={i < 3} />
                    <div className="overlay">
                      <div className="w-full">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block ${item.tagColor}`}>{item.tag}</span>
                        <h3 className="font-display font-bold text-white text-lg mb-1">{item.title}</h3>
                        <p className="text-white/70 text-xs mb-2">{item.client}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tech.map((t) => (<span key={t} className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{t}</span>))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-green-300 font-semibold">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                            {item.result}
                          </div>
                          <span className="text-xs text-white/80 font-semibold flex items-center gap-1">Xem case →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/lien-he" className="btn-primary text-base px-8 py-4"><span>🚀 Bắt đầu dự án của bạn</span></Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-dark py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,138,0,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              Dự án tiếp theo là <span className="highlight-orange">của bạn</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Hãy để chúng tôi tạo ra câu chuyện thành công tiếp theo cho doanh nghiệp của bạn.</p>
            <Link href="/lien-he" className="btn-primary text-base px-8 py-4"><span>💬 Nhắn Zalo tư vấn ngay</span></Link>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloFloat />
    </>
  );
}
