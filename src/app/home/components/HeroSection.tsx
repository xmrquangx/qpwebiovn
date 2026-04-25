'use client';

import React, { useEffect, useRef } from 'react';


const archImages = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_101c23f1e-1772098302371.png",
  alt: 'Website thiết kế quán cà phê màu nâu ấm áp trên màn hình laptop',
  style: { left: '5%', top: '72%', transform: 'rotate(-32deg)' }
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_13dc3af92-1768230094419.png",
  alt: 'Giao diện website spa màu hồng pastel tối giản',
  style: { left: '14%', top: '42%', transform: 'rotate(-22deg)' }
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1644aff77-1764659451775.png",
  alt: 'Dashboard thiết kế web hiện đại với bảng màu xanh dương',
  style: { left: '25%', top: '18%', transform: 'rotate(-12deg)' }
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_108a0859a-1772349644893.png",
  alt: 'Trang web landing page doanh nghiệp màu trắng sạch sẽ',
  style: { left: '38%', top: '5%', transform: 'rotate(-3deg)' }
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9d1dbf8-1767922575252.png",
  alt: 'Website thương mại điện tử hiển thị sản phẩm trên nền sáng',
  style: { left: '51%', top: '5%', transform: 'rotate(3deg)' }
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_157c4caf6-1764839075183.png",
  alt: 'Màn hình máy tính hiển thị code website WordPress',
  style: { left: '64%', top: '18%', transform: 'rotate(12deg)' }
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3c30478-1773105689326.png",
  alt: 'Thiết kế website portfolio nhiếp ảnh gia màu tối sang trọng',
  style: { left: '76%', top: '42%', transform: 'rotate(22deg)' }
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb089fd3-1772791245629.png",
  alt: 'Laptop mở code trên bàn làm việc freelancer',
  style: { left: '85%', top: '72%', transform: 'rotate(32deg)' }
}];


export default function HeroSection() {
  const archRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const images = archRef.current?.querySelectorAll('.arch-image') as NodeListOf<HTMLElement>;
    if (!images) return;

    // Stagger arch images
    images.forEach((img, i) => {
      img.style.opacity = '0';
      img.style.transform = (img.style.transform || '') + ' translateY(20px)';
      setTimeout(() => {
        img.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        img.style.opacity = '1';
        img.style.transform = img.getAttribute('data-base-transform') || '';
      }, 200 + i * 100);
    });

    // Store base transforms
    images.forEach((img) => {
      img.setAttribute('data-base-transform', img.style.transform.replace(' translateY(20px)', ''));
    });

    // Hero content fade in
    const elements = [titleRef.current, descRef.current, btnsRef.current, statsRef.current];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 800 + i * 150);
    });
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    const el = document.querySelector('#portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-36 pb-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50"
      aria-label="Hero - WebAgencyVN">
      
      {/* Background decorative blobs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }}
        aria-hidden="true" />
      
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #007BFF 0%, transparent 70%)' }}
        aria-hidden="true" />
      

      {/* Beam lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 top-0 w-px h-full bg-orange-100">
          <div className="beam" />
        </div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-blue-100">
          <div className="beam beam-delay-2" />
        </div>
      </div>

      {/* Arching Image Gallery */}
      <div
        ref={archRef}
        className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[340px] pointer-events-none hidden md:block"
        aria-hidden="true">
        
        {archImages.map((img, i) =>
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className="arch-image pointer-events-auto"
          style={img.style}
          loading={i < 3 ? 'eager' : 'lazy'} />

        )}
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center mt-0 md:mt-48">
        {/* Badge */}
        <div className="badge-gradient mb-6 mx-auto inline-flex">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          ⭐ 120+ dự án · 5.0/5 đánh giá · Bàn giao 5 ngày
        </div>

        {/* H1 */}
        <h1
          ref={titleRef}
          className="font-display font-extrabold tracking-tight text-foreground mb-6 leading-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
          
          Website đẹp xịn,{' '}
          <span className="highlight-orange">lên sóng</span>{' '}
          trong{' '}
          <span className="highlight-blue">5 ngày</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={descRef}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
          
          Khách hàng <span className="highlight-word font-semibold text-foreground">tìm bạn trên Google</span> thay vì chỉ Facebook
          — website chuyên nghiệp, chuẩn SEO, tích hợp{' '}
          <span className="font-semibold text-[#0068FF]">Zalo</span> chat.
          Giao đúng 5 ngày, <span className="highlight-word font-semibold text-foreground">bảo hành 6 tháng</span>.
        </p>

        {/* CTA Buttons */}
        <div
          ref={btnsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          
          <button
            onClick={scrollToContact}
            className="btn-primary text-base px-8 py-4"
            aria-label="Nhận báo giá trong 30 phút">
            
            <span>🚀 Nhận báo giá trong 30 phút</span>
          </button>
          <button
            onClick={scrollToPortfolio}
            className="btn-secondary text-base px-8 py-4"
            aria-label="Xem 120+ dự án đã làm">
            
            Xem 120+ dự án đã làm →
          </button>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          
          {[
          { value: '120+', label: 'Dự án hoàn thành' },
          { value: '5 ngày', label: 'Thời gian bàn giao' },
          { value: '100%', label: 'Đúng tiến độ' }].
          map((stat) =>
          <div key={stat.label} className="text-center">
              <div className="font-display font-extrabold text-2xl md:text-3xl highlight-orange">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-60">
        <span className="text-xs text-muted font-medium">Cuộn xuống</span>
        <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>);

}