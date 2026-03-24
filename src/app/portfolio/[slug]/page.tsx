'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import AppImage from '@/components/ui/AppImage';

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
    description:
    'Spa Hương Thơm là một spa cao cấp tại TP.HCM chuyên cung cấp các dịch vụ chăm sóc sắc đẹp và thư giãn. Khách hàng cần một website sang trọng, dễ đặt lịch và tối ưu SEO local để thu hút khách hàng mới trong khu vực.',
    challenge:
    'Trước đây Spa Hương Thơm chỉ nhận khách qua Zalo và giới thiệu miệng. Không có website, không có hiện diện online, khó mở rộng tệp khách hàng mới. Cần một giải pháp nhanh, đẹp và hiệu quả ngay từ ngày đầu.',
    solution:
    'Thiết kế website WordPress Flatsome với giao diện màu hồng kem sang trọng, tích hợp hệ thống đặt lịch online, chat Zalo trực tiếp và tối ưu SEO local cho từ khóa "spa TP.HCM". Toàn bộ hoàn thành trong 5 ngày làm việc.',
    tech: ['WordPress', 'Flatsome Theme', 'Booking System', 'SEO Local', 'Zalo OA', 'Google Analytics'],
    results: [
    { icon: '📅', value: '+40%', label: 'Lượt đặt lịch qua web' },
    { icon: '🔍', value: 'Top 5', label: 'Google "spa TP.HCM"' },
    { icon: '⚡', value: '5 ngày', label: 'Thời gian bàn giao' },
    { icon: '📱', value: '100%', label: 'Mobile responsive' }],

    gallery: [
    {
      src: "https://images.unsplash.com/photo-1672666037110-2dbdff9ac52e",
      alt: 'Trang chủ website Spa Hương Thơm với giao diện màu hồng kem sang trọng',
      caption: 'Trang chủ — Giao diện sang trọng, tối giản'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_19da85e8e-1772182199533.png",
      alt: 'Trang dịch vụ spa với danh sách các liệu trình chăm sóc sắc đẹp',
      caption: 'Trang dịch vụ — Liệt kê đầy đủ liệu trình'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_10fff23d0-1766589453161.png",
      alt: 'Giao diện đặt lịch online trên website spa với form chọn ngày giờ',
      caption: 'Đặt lịch online — Tích hợp booking system'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_19330abe5-1772905195171.png",
      alt: 'Trang giới thiệu spa với hình ảnh không gian thư giãn và đội ngũ nhân viên',
      caption: 'Giới thiệu — Xây dựng niềm tin khách hàng'
    }],

    testimonial: {
      text: 'Mình rất hài lòng với website mới. Chỉ sau 2 tuần ra mắt đã có khách đặt lịch qua web, điều mà trước đây mình không nghĩ tới. Giao diện đẹp, dễ dùng và quan trọng là khách hàng khen nhiều lắm!',
      author: 'Chị Hương',
      role: 'Chủ Spa Hương Thơm, TP.HCM'
    },
    demoUrl: '#'
  },
  'the-brew-house': {
    slug: 'the-brew-house',
    title: 'The Brew House',
    tag: 'F&B',
    tagColor: 'bg-amber-100 text-amber-700',
    client: 'The Brew House',
    location: 'Hà Nội',
    duration: '5 ngày',
    year: '2024',
    result: 'Top 3 Google "cà phê Hoàn Kiếm"',
    description:
    'The Brew House là quán cà phê phong cách vintage tại Hoàn Kiếm, Hà Nội. Quán cần website để giới thiệu không gian, menu và thu hút khách hàng qua tìm kiếm Google địa phương.',
    challenge:
    'Quán cà phê đang hoạt động tốt nhưng chưa có hiện diện online. Đối thủ cạnh tranh trong khu vực đã có website và đang chiếm top Google. Cần nhanh chóng xây dựng website và SEO để không bị bỏ lại phía sau.',
    solution:
    'Thiết kế website với phong cách vintage ấm áp, tích hợp menu online, bản đồ Google Maps và tối ưu SEO local mạnh mẽ. Sử dụng schema markup cho local business để tăng khả năng hiển thị trên Google.',
    tech: ['WordPress', 'Flatsome Theme', 'SEO Local', 'Schema Markup', 'Google Maps', 'Zalo'],
    results: [
    { icon: '🔍', value: 'Top 3', label: 'Google "cà phê Hoàn Kiếm"' },
    { icon: '👥', value: '+35%', label: 'Khách mới từ Google' },
    { icon: '⚡', value: '5 ngày', label: 'Thời gian bàn giao' },
    { icon: '⭐', value: '4.8★', label: 'Đánh giá Google Maps' }],

    gallery: [
    {
      src: "https://images.unsplash.com/photo-1651338520040-5e02e1ce9404",
      alt: 'Trang chủ website The Brew House với phong cách vintage ấm áp màu nâu',
      caption: 'Trang chủ — Phong cách vintage đặc trưng'
    },
    {
      src: 'https://img.rocket.new/generatedImages/rocket_gen_img_101c23f1e-1772098302371.png',
      alt: 'Trang menu online của quán cà phê với danh sách đồ uống và giá',
      caption: 'Menu online — Đầy đủ thức uống và giá'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbcf1307-1772627399820.png",
      alt: 'Trang giới thiệu không gian quán cà phê vintage với ánh đèn vàng ấm',
      caption: 'Không gian — Giới thiệu trải nghiệm quán'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_19d1c6f52-1774325655936.png",
      alt: 'Trang liên hệ và bản đồ chỉ đường đến quán cà phê tại Hoàn Kiếm',
      caption: 'Liên hệ & Bản đồ — Dễ tìm đường'
    }],

    testimonial: {
      text: 'Website giúp quán mình lên top Google chỉ sau 3 tuần. Giờ mỗi ngày có 5-10 khách mới tìm đến qua Google Maps. Đầu tư rất xứng đáng!',
      author: 'Anh Minh',
      role: 'Chủ The Brew House, Hà Nội'
    },
    demoUrl: '#'
  },
  'minh-tuan-photo': {
    slug: 'minh-tuan-photo',
    title: 'Minh Tuấn Photo',
    tag: 'Nhiếp ảnh',
    tagColor: 'bg-gray-100 text-gray-700',
    client: 'Minh Tuấn Photography',
    location: 'Đà Nẵng',
    duration: '5 ngày',
    year: '2024',
    result: '+60% khách doanh nghiệp mới',
    description:
    'Minh Tuấn là nhiếp ảnh gia chuyên nghiệp tại Đà Nẵng, chuyên chụp ảnh sự kiện doanh nghiệp, cưới hỏi và portrait. Cần portfolio website tối giản, sang trọng để thu hút khách hàng doanh nghiệp cao cấp.',
    challenge:
    'Minh Tuấn chủ yếu nhận việc qua mạng xã hội nhưng thiếu sự chuyên nghiệp khi tiếp cận khách doanh nghiệp. Cần một portfolio website thể hiện đẳng cấp và tạo niềm tin với khách hàng B2B.',
    solution:
    'Thiết kế portfolio website với giao diện đen trắng tối giản, gallery ảnh tốc độ cao, trang giới thiệu dịch vụ rõ ràng và form liên hệ chuyên nghiệp. Tối ưu SEO cho từ khóa "nhiếp ảnh doanh nghiệp Đà Nẵng".',
    tech: ['WordPress', 'Portfolio Theme', 'Gallery Lightbox', 'SEO', 'Contact Form', 'Lazy Loading'],
    results: [
    { icon: '💼', value: '+60%', label: 'Khách doanh nghiệp mới' },
    { icon: '🔍', value: 'Top 5', label: 'Google "nhiếp ảnh Đà Nẵng"' },
    { icon: '⚡', value: '5 ngày', label: 'Thời gian bàn giao' },
    { icon: '🖼️', value: '200+', label: 'Ảnh trong gallery' }],

    gallery: [
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_138817c9c-1764782793767.png",
      alt: 'Trang chủ portfolio nhiếp ảnh gia với giao diện đen trắng tối giản chuyên nghiệp',
      caption: 'Trang chủ — Tối giản, sang trọng'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d682778c-1767008426773.png",
      alt: 'Gallery ảnh sự kiện doanh nghiệp với bố cục masonry đẹp mắt',
      caption: 'Gallery — Bố cục masonry chuyên nghiệp'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_189ab91e9-1772182273187.png",
      alt: 'Trang dịch vụ nhiếp ảnh với các gói chụp ảnh và bảng giá rõ ràng',
      caption: 'Dịch vụ & Giá — Rõ ràng, minh bạch'
    },
    {
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_163d8dca6-1768133602485.png",
      alt: 'Trang liên hệ nhiếp ảnh gia với form đặt lịch chụp ảnh chuyên nghiệp',
      caption: 'Liên hệ — Form đặt lịch chuyên nghiệp'
    }],

    testimonial: {
      text: 'Từ khi có website, khách doanh nghiệp liên hệ nhiều hơn hẳn. Họ nói nhìn website thấy chuyên nghiệp nên mới dám thuê. Đây là khoản đầu tư tốt nhất mình từng làm.',
      author: 'Minh Tuấn',
      role: 'Nhiếp ảnh gia, Đà Nẵng'
    },
    demoUrl: '#'
  }
};

// Default fallback project for unknown slugs
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
  description:
  'Coaching Thành Công là trung tâm đào tạo kỹ năng sống và kinh doanh tại TP.HCM. Cần website chuyên nghiệp để giới thiệu khóa học, thu hút học viên và tích hợp đăng ký online.',
  challenge:
  'Trung tâm đang phát triển nhanh nhưng việc quản lý đăng ký học viên qua Zalo và Facebook rất tốn thời gian. Cần hệ thống website tự động hóa quy trình đăng ký và thanh toán.',
  solution:
  'Thiết kế website với trang giới thiệu khóa học chi tiết, hệ thống đăng ký online, tích hợp Zalo OA để chăm sóc học viên và tối ưu SEO cho từ khóa coaching tại TP.HCM.',
  tech: ['WordPress', 'LMS Plugin', 'Zalo OA', 'SEO', 'Payment Gateway', 'Email Marketing'],
  results: [
  { icon: '🎓', value: '2x', label: 'Học viên đăng ký online' },
  { icon: '⏰', value: '-70%', label: 'Thời gian xử lý đăng ký' },
  { icon: '⚡', value: '5 ngày', label: 'Thời gian bàn giao' },
  { icon: '💰', value: '+45%', label: 'Doanh thu từ website' }],

  gallery: [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_112127b74-1765392059924.png",
    alt: 'Trang chủ website coaching với giao diện xanh chuyên nghiệp và CTA đăng ký khóa học',
    caption: 'Trang chủ — Chuyên nghiệp, uy tín'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_18b3867c0-1768239312455.png",
    alt: 'Trang danh sách khóa học với thông tin chi tiết và nút đăng ký',
    caption: 'Khóa học — Thông tin đầy đủ, dễ đăng ký'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a11d3b6a-1763300597589.png",
    alt: 'Trang giới thiệu giảng viên và đội ngũ coaching chuyên nghiệp',
    caption: 'Đội ngũ — Xây dựng niềm tin'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_18b3867c0-1768239312455.png",
    alt: 'Trang đăng ký khóa học online với form và tích hợp thanh toán',
    caption: 'Đăng ký — Quy trình tự động hóa'
  }],

  testimonial: {
    text: 'Website giúp chúng tôi tiết kiệm rất nhiều thời gian xử lý đăng ký. Học viên có thể tự đăng ký và thanh toán 24/7. Doanh thu tăng rõ rệt chỉ sau 1 tháng.',
    author: 'Anh Thành',
    role: 'Giám đốc Coaching Thành Công, TP.HCM'
  },
  demoUrl: '#'
};

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = projectsData[slug] || defaultProject;

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
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted mb-6" aria-label="Breadcrumb">
                <Link href="/home" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                <span>/</span>
                <span className="text-foreground font-medium">{project.title}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.tagColor}`}>{project.tag}</span>
                <span className="text-xs text-muted bg-bg-alt px-3 py-1 rounded-full border border-border">📍 {project.location}</span>
                <span className="text-xs text-muted bg-bg-alt px-3 py-1 rounded-full border border-border">⚡ {project.duration}</span>
                <span className="text-xs text-muted bg-bg-alt px-3 py-1 rounded-full border border-border">📅 {project.year}</span>
              </div>

              <h1 className="font-display font-extrabold tracking-tight text-foreground mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                {project.title}
              </h1>
              <p className="text-lg text-muted max-w-2xl leading-relaxed mb-6">{project.description}</p>

              <div className="flex items-center gap-2 text-green-600 font-semibold text-base">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                Kết quả: {project.result}
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="section-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="mb-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-bg-alt" style={{ aspectRatio: '16/9' }}>
                <AppImage
                  src={project.gallery[activeImage]?.src}
                  alt={project.gallery[activeImage]?.alt}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-sm font-medium">{project.gallery[activeImage]?.caption}</p>
                </div>
                {/* Nav arrows */}
                {project.gallery.length > 1 &&
                <>
                    <button
                    onClick={() => setActiveImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Ảnh trước">
                    
                      <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                    onClick={() => setActiveImage((prev) => (prev + 1) % project.gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Ảnh tiếp theo">
                    
                      <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                }
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {project.gallery.map((img, i) =>
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                activeImage === i ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'opacity-70 hover:opacity-100'}`
                }
                style={{ aspectRatio: '16/9' }}
                aria-label={`Xem ảnh ${i + 1}: ${img.caption}`}>
                
                  <AppImage
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={169}
                  className="w-full h-full object-cover" />
                
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="section-alt py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <div className="badge-gradient mb-4 mx-auto inline-flex">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Kết quả đạt được
              </div>
              <h2 className="font-display font-extrabold text-foreground" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                Số liệu <span className="highlight-orange">thực tế</span> sau khi ra mắt
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.results.map((r) =>
              <div key={r.label} className="card-base p-6 text-center">
                  <div className="text-3xl mb-3">{r.icon}</div>
                  <div className="font-display font-extrabold text-2xl highlight-orange mb-1">{r.value}</div>
                  <div className="text-sm text-muted leading-tight">{r.label}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="section-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Challenge */}
              <div className="card-base p-8">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">Thách thức</h3>
                <p className="text-muted leading-relaxed">{project.challenge}</p>
              </div>
              {/* Solution */}
              <div className="card-base p-8">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">Giải pháp</h3>
                <p className="text-muted leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="section-alt py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="font-display font-extrabold text-foreground mb-2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Công nghệ <span className="highlight-blue">sử dụng</span>
              </h2>
              <p className="text-muted">Stack được chọn lọc kỹ càng cho hiệu suất tối ưu</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {project.tech.map((t) =>
              <div key={t} className="card-base px-5 py-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-semibold text-foreground text-sm">{t}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="section-white py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <div className="badge-gradient mb-6 mx-auto inline-flex">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Khách hàng nói gì
            </div>
            <div className="card-base p-8 md:p-10 relative">
              <div className="text-5xl text-primary/20 font-serif leading-none mb-4 select-none">"</div>
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
                {project.testimonial.text}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {project.testimonial.author.charAt(project.testimonial.author.lastIndexOf(' ') + 1)}
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-foreground text-sm">{project.testimonial.author}</div>
                  <div className="text-xs text-muted">{project.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Link + CTA */}
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
                    <span>🚀 Tư vấn miễn phí</span>
                  </Link>
                  {project.demoUrl !== '#' ?
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/40 text-white font-display font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-200 hover:-translate-y-1">
                    
                      <span>🌐 Xem website live</span>
                    </a> :

                  <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/40 text-white font-display font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-200 hover:-translate-y-1">
                      <span>← Xem portfolio khác</span>
                    </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="section-white py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="font-display font-extrabold text-foreground" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Dự án <span className="highlight-orange">liên quan</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Object.values(projectsData).
              filter((p) => p.slug !== project.slug).
              slice(0, 3).
              map((p) =>
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group card-base overflow-hidden">
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <AppImage
                    src={p.gallery[0]?.src}
                    alt={p.gallery[0]?.alt}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                    </div>
                    <div className="p-4">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.tagColor}`}>{p.tag}</span>
                      <h3 className="font-display font-bold text-foreground mt-2 mb-1 text-sm">{p.title}</h3>
                      <p className="text-xs text-green-600 font-semibold">{p.result}</p>
                    </div>
                  </Link>
              )}
            </div>
            <div className="text-center mt-8">
              <Link href="/portfolio" className="btn-secondary text-sm px-6 py-3">
                Xem tất cả portfolio →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloFloat />
    </>);

}