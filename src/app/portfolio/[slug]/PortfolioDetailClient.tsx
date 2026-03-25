'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import AppImage from '@/components/ui/AppImage';
import type { PortfolioDetail, PortfolioItem } from '@/lib/wordpress/types';

interface ProjectDetail {
  slug: string;
  title: string;
  tag: string;
  tagColor: string;
  client: string;
  location: string;
  duration: string;
  year: string;
  result: string;
  description: string;
  challenge: string;
  solution: string;
  tech: string[];
  results: {icon: string;value: string;label: string;}[];
  gallery: {src: string;alt: string;caption: string;}[];
  testimonial: {text: string;author: string;role: string;};
  demoUrl: string;
}

/* ── Fallback static data ── */
const projectsData: Record<string, ProjectDetail> = {
  'spa-huong-thom': {
    slug: 'spa-huong-thom',
    title: 'Spa Hương Thơm',
    tag: 'Spa & Beauty',
    tagColor: 'bg-pink-100 text-pink-700',
    client: 'Spa Hương Thơm',
    location: 'TP.HCM',
    duration: '5 ngày',
    year: '2024',
    result: '+40% lượt đặt lịch qua web',
    description: 'Spa Hương Thơm là một spa cao cấp tại TP.HCM chuyên cung cấp các dịch vụ chăm sóc sắc đẹp và thư giãn.',
    challenge: 'Trước đây Spa Hương Thơm chỉ nhận khách qua Zalo và giới thiệu miệng. Không có website, không có hiện diện online.',
    solution: 'Thiết kế website WordPress Flatsome với giao diện màu hồng kem sang trọng, tích hợp hệ thống đặt lịch online, chat Zalo trực tiếp.',
    tech: ['WordPress', 'Flatsome Theme', 'Booking System', 'SEO Local', 'Zalo OA', 'Google Analytics'],
    results: [
      { icon: '📅', value: '+40%', label: 'Lượt đặt lịch qua web' },
      { icon: '🔍', value: 'Top 5', label: 'Google "spa TP.HCM"' },
      { icon: '⚡', value: '5 ngày', label: 'Thời gian bàn giao' },
      { icon: '📱', value: '100%', label: 'Mobile responsive' },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1672666037110-2dbdff9ac52e", alt: 'Trang chủ website Spa Hương Thơm', caption: 'Trang chủ — Giao diện sang trọng' },
      { src: "https://img.rocket.new/generatedImages/rocket_gen_img_19da85e8e-1772182199533.png", alt: 'Trang dịch vụ spa', caption: 'Trang dịch vụ — Liệt kê liệu trình' },
      { src: "https://img.rocket.new/generatedImages/rocket_gen_img_10fff23d0-1766589453161.png", alt: 'Giao diện đặt lịch online', caption: 'Đặt lịch online — Tích hợp booking' },
      { src: "https://img.rocket.new/generatedImages/rocket_gen_img_19330abe5-1772905195171.png", alt: 'Trang giới thiệu spa', caption: 'Giới thiệu — Xây dựng niềm tin' },
    ],
    testimonial: { text: 'Mình rất hài lòng với website mới. Chỉ sau 2 tuần ra mắt đã có khách đặt lịch qua web.', author: 'Chị Hương', role: 'Chủ Spa Hương Thơm, TP.HCM' },
    demoUrl: '#',
  },
};

const defaultProject: ProjectDetail = {
  slug: 'default',
  title: 'Coaching Thành Công',
  tag: 'Coaching',
  tagColor: 'bg-blue-100 text-blue-700',
  client: 'Coaching Thành Công',
  location: 'TP.HCM',
  duration: '5 ngày',
  year: '2024',
  result: '2x học viên đăng ký online',
  description: 'Coaching Thành Công là trung tâm đào tạo kỹ năng sống và kinh doanh tại TP.HCM.',
  challenge: 'Việc quản lý đăng ký học viên qua Zalo và Facebook rất tốn thời gian.',
  solution: 'Thiết kế website với trang giới thiệu khóa học chi tiết, hệ thống đăng ký online.',
  tech: ['WordPress', 'LMS Plugin', 'Zalo OA', 'SEO', 'Payment Gateway', 'Email Marketing'],
  results: [
    { icon: '🎓', value: '2x', label: 'Học viên đăng ký online' },
    { icon: '⏰', value: '-70%', label: 'Thời gian xử lý đăng ký' },
    { icon: '⚡', value: '5 ngày', label: 'Thời gian bàn giao' },
    { icon: '💰', value: '+45%', label: 'Doanh thu từ website' },
  ],
  gallery: [
    { src: "https://img.rocket.new/generatedImages/rocket_gen_img_112127b74-1765392059924.png", alt: 'Trang chủ website coaching', caption: 'Trang chủ — Chuyên nghiệp, uy tín' },
    { src: "https://img.rocket.new/generatedImages/rocket_gen_img_18b3867c0-1768239312455.png", alt: 'Trang danh sách khóa học', caption: 'Khóa học — Thông tin đầy đủ' },
  ],
  testimonial: { text: 'Website giúp chúng tôi tiết kiệm rất nhiều thời gian xử lý đăng ký.', author: 'Anh Thành', role: 'Giám đốc Coaching Thành Công, TP.HCM' },
  demoUrl: '#',
};

/* ── Map WP PortfolioDetail → local ProjectDetail ── */
function wpToProject(wp: PortfolioDetail): ProjectDetail {
  return {
    slug: wp.slug,
    title: wp.title,
    tag: wp.tag,
    tagColor: wp.tagColor,
    client: wp.client,
    location: wp.location,
    duration: wp.duration,
    year: wp.year,
    result: wp.result,
    description: wp.content.replace(/<[^>]*>/g, '').trim(),
    challenge: wp.challenge,
    solution: wp.solution,
    tech: wp.tech,
    results: [],
    gallery: wp.gallery.length > 0 ? wp.gallery : [],
    testimonial: wp.testimonial,
    demoUrl: wp.demoUrl,
  };
}

interface Props {
  project: PortfolioDetail | null;
  slug: string;
  relatedItems: PortfolioItem[];
}

export default function PortfolioDetailClient({ project: wpProject, slug, relatedItems }: Props) {
  // Use WP data if available, otherwise fallback
  const project: ProjectDetail = wpProject
    ? wpToProject(wpProject)
    : projectsData[slug] || defaultProject;

  // If WP gallery is empty, try fallback gallery
  if (project.gallery.length === 0 && projectsData[slug]?.gallery) {
    project.gallery = projectsData[slug].gallery;
  }
  // If challenge/solution empty, fallback
  if (!project.challenge && projectsData[slug]) {
    project.challenge = projectsData[slug].challenge;
    project.solution = projectsData[slug].solution;
  }

  const [activeImage, setActiveImage] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

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

  // Auto-advance slider
  useEffect(() => {
    if (project.gallery.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % project.gallery.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [project.gallery.length]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #FF8A00 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #007BFF 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
            <div ref={heroRef}>
              <nav className="flex items-center gap-2 text-sm text-muted mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                <span>/</span>
                <span className="text-foreground font-medium">{project.title}</span>
              </nav>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.tagColor}`}>{project.tag}</span>
                {project.location && <span className="text-xs text-muted bg-bg-alt px-3 py-1 rounded-full border border-border">📍 {project.location}</span>}
                {project.duration && <span className="text-xs text-muted bg-bg-alt px-3 py-1 rounded-full border border-border">⚡ {project.duration}</span>}
                {project.year && <span className="text-xs text-muted bg-bg-alt px-3 py-1 rounded-full border border-border">📅 {project.year}</span>}
              </div>
              <h1 className="font-display font-extrabold tracking-tight text-foreground mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                {project.title}
              </h1>
              <div className="text-lg text-muted max-w-2xl leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: wpProject ? wpProject.content : project.description }} />
              {project.result && (
                <div className="flex items-center gap-2 text-green-600 font-semibold text-base">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  Kết quả: {project.result}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Image Gallery / Slider */}
        {project.gallery.length > 0 && (
          <section className="section-white py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="mb-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-bg-alt" style={{ aspectRatio: '16/9' }}>
                  <AppImage
                    src={project.gallery[activeImage]?.src}
                    alt={project.gallery[activeImage]?.alt || project.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    priority
                  />
                  {project.gallery[activeImage]?.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white text-sm font-medium">{project.gallery[activeImage].caption}</p>
                    </div>
                  )}
                  {project.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                        aria-label="Ảnh trước"
                      >
                        <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setActiveImage((prev) => (prev + 1) % project.gallery.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                        aria-label="Ảnh tiếp theo"
                      >
                        <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </>
                  )}
                  {/* Slide indicators */}
                  {project.gallery.length > 1 && (
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`w-2 h-2 rounded-full transition-all ${activeImage === i ? 'bg-white w-6' : 'bg-white/50'}`}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {project.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                      activeImage === i ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ aspectRatio: '16/9' }}
                    aria-label={`Xem ảnh ${i + 1}`}
                  >
                    <AppImage src={img.src} alt={img.alt || project.title} width={300} height={169} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenge & Solution */}
        {(project.challenge || project.solution) && (
          <section className="section-white py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-8">
                {project.challenge && (
                  <div className="card-base p-8">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">Thách thức</h3>
                    <p className="text-muted leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="card-base p-8">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">Giải pháp</h3>
                    <p className="text-muted leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {project.tech.length > 0 && (
          <section className="section-alt py-16">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="font-display font-extrabold text-foreground mb-2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                  Công nghệ <span className="highlight-blue">sử dụng</span>
                </h2>
                <p className="text-muted">Stack được chọn lọc kỹ càng cho hiệu suất tối ưu</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {project.tech.map((t) => (
                  <div key={t} className="card-base px-5 py-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-semibold text-foreground text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {project.testimonial.text && (
          <section className="section-white py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
              <div className="badge-gradient mb-6 mx-auto inline-flex">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Khách hàng nói gì
              </div>
              <div className="card-base p-8 md:p-10 relative">
                <div className="text-5xl text-primary/20 font-serif leading-none mb-4 select-none">&ldquo;</div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
                  {project.testimonial.text}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {project.testimonial.author.charAt(project.testimonial.author.lastIndexOf(' ') + 1) || project.testimonial.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-foreground text-sm">{project.testimonial.author}</div>
                    <div className="text-xs text-muted">{project.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="section-alt py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 40%, #007BFF 100%)' }}>
              <div className="p-8 md:p-12 text-center">
                <h2 className="font-display font-extrabold text-white mb-3" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                  Bạn muốn website tương tự?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Liên hệ ngay để được tư vấn miễn phí và nhận báo giá trong vòng 24 giờ.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/lien-he" className="inline-flex items-center justify-center gap-2 bg-white text-foreground font-display font-bold px-8 py-4 rounded-lg hover:bg-orange-50 transition-all duration-200 hover:-translate-y-1 shadow-lg">
                    🚀 Tư vấn miễn phí
                  </Link>
                  {project.demoUrl !== '#' ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/40 text-white font-display font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-200 hover:-translate-y-1">
                      🌐 Xem website live
                    </a>
                  ) : (
                    <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/40 text-white font-display font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-200 hover:-translate-y-1">
                      ← Xem portfolio khác
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedItems.length > 0 && (
          <section className="section-white py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="font-display font-extrabold text-foreground" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                  Dự án <span className="highlight-orange">liên quan</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedItems.map((p) => (
                  <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group card-base overflow-hidden">
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <AppImage src={p.src} alt={p.alt || p.title} width={400} height={225} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.tagColor}`}>{p.tag}</span>
                      <h3 className="font-display font-bold text-foreground mt-2 mb-1 text-sm">{p.title}</h3>
                      <p className="text-xs text-green-600 font-semibold">{p.result}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/portfolio" className="btn-secondary text-sm px-6 py-3">
                  Xem tất cả portfolio →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ZaloFloat />
    </>
  );
}
