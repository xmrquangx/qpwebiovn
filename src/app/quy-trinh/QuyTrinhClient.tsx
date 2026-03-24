'use client';

import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFloat from '@/app/home/components/ZaloFloat';
import Link from 'next/link';
import type { ProcessStep, FAQ } from '@/lib/wordpress/types';

const fallbackSteps: ProcessStep[] = [
  { num:'01', title:'Thu thập yêu cầu', desc:'Tư vấn qua Zalo, ghi nhận nội dung, màu sắc, mục tiêu website.', day:'Ngày 1', details:['Tư vấn 1-1 qua Zalo/Điện thoại','Điền form yêu cầu chi tiết','Xác nhận brief & timeline','Ký hợp đồng & thanh toán 50%'], iconSvg:'', color:'text-primary', bg:'bg-orange-50', borderColor:'border-primary/30' },
  { num:'02', title:'Thiết kế mockup', desc:'Tạo giao diện Figma/Flatsome theo brand của bạn.', day:'Ngày 2', details:['Thiết kế wireframe & layout','Chọn màu sắc & typography','Mockup desktop + mobile','Gửi xem trước qua Zalo'], iconSvg:'', color:'text-blue-brand', bg:'bg-blue-50', borderColor:'border-blue-brand/30' },
  { num:'03', title:'Chỉnh sửa & duyệt', desc:'Tối đa 3 lần chỉnh sửa mockup theo phản hồi của bạn.', day:'Ngày 3', details:['Tối đa 3 lần chỉnh sửa','Phản hồi trong 4 giờ làm việc','Duyệt mockup cuối cùng','Xác nhận nội dung & hình ảnh'], iconSvg:'', color:'text-primary', bg:'bg-orange-50', borderColor:'border-primary/30' },
  { num:'04', title:'Dev & tích hợp', desc:'Lên WordPress Flatsome, cài plugin SEO, tích hợp Zalo OA.', day:'Ngày 4', details:['Cài đặt WordPress + Flatsome','Tích hợp Zalo OA & form','Cài plugin SEO Yoast','Tối ưu tốc độ & bảo mật'], iconSvg:'', color:'text-blue-brand', bg:'bg-blue-50', borderColor:'border-blue-brand/30' },
  { num:'05', title:'Kiểm thử toàn diện', desc:'Test mobile, tốc độ, form, SEO, cross-browser.', day:'Ngày 5', details:['Test responsive mobile/tablet','Kiểm tra tốc độ PageSpeed','Test form & Zalo integration','Cross-browser Chrome/Safari/Firefox'], iconSvg:'', color:'text-primary', bg:'bg-orange-50', borderColor:'border-primary/30' },
  { num:'06', title:'Bàn giao & hỗ trợ', desc:'Bàn giao toàn bộ tài khoản, hướng dẫn quản trị qua video.', day:'Ngày 5', details:['Bàn giao domain + hosting','Video hướng dẫn quản trị','Thanh toán 50% còn lại','Bắt đầu bảo hành chính thức'], iconSvg:'', color:'text-blue-brand', bg:'bg-blue-50', borderColor:'border-blue-brand/30' },
];
const fallbackFaqs: FAQ[] = [
  { question:'Tôi cần chuẩn bị gì trước khi bắt đầu?', answer:'Bạn chỉ cần cung cấp: logo (nếu có), nội dung text, hình ảnh sản phẩm/dịch vụ và mô tả ngắn về doanh nghiệp.' },
  { question:'Nếu tôi không hài lòng với thiết kế thì sao?', answer:'Bạn được chỉnh sửa tối đa 3 lần miễn phí ở bước mockup.' },
  { question:'Sau khi bàn giao, tôi có thể tự cập nhật nội dung không?', answer:'Có! WordPress rất dễ dùng. Chúng tôi sẽ cung cấp video hướng dẫn chi tiết.' },
  { question:'5 ngày có tính cả cuối tuần không?', answer:'5 ngày là ngày làm việc (thứ 2 - thứ 6).' },
];

const defaultStepIcons: Record<string, React.ReactNode> = {
  '01': <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  '02': <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  '03': <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
  '04': <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
  '05': <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  '06': <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
};

function renderStepIcon(step: ProcessStep): React.ReactNode {
  if (step.iconSvg) return <span className="w-8 h-8" dangerouslySetInnerHTML={{ __html: step.iconSvg }} />;
  return defaultStepIcons[step.num] || defaultStepIcons['01'];
}

interface Props { steps: ProcessStep[]; faqs: FAQ[]; }

export default function QuyTrinhClient({ steps: wp, faqs: wpF }: Props) {
  const steps = wp.length > 0 ? wp : fallbackSteps;
  const faqs = wpF.length > 0 ? wpF : fallbackFaqs;
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) { el.style.opacity='0'; el.style.transform='translateY(24px)'; setTimeout(()=>{el.style.transition='opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';el.style.opacity='1';el.style.transform='translateY(0)';},100); }
    const items = stepsRef.current?.querySelectorAll('.step-item') as NodeListOf<HTMLElement>;
    if (!items) return;
    const observer = new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){const item=entry.target as HTMLElement;const delay=parseInt(item.getAttribute('data-delay')||'0');setTimeout(()=>{item.style.opacity='1';item.style.transform='translateY(0)';},delay);observer.unobserve(entry.target);}});},{threshold:0.1});
    items.forEach((item,i)=>{item.style.opacity='0';item.style.transform='translateY(28px)';item.style.transition='opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';item.setAttribute('data-delay',String(i*100));observer.observe(item);});
    return ()=>observer.disconnect();
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" /><Header />
      <main>
        <section className="section-dark relative pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5 pointer-events-none" style={{background:'radial-gradient(circle, #FF8A00 0%, transparent 70%)'}} aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div ref={heroRef}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-white/60 mb-6 font-display"><span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"/>Quy trình làm việc</div>
              <h1 className="font-display font-extrabold tracking-tight text-white mb-6 leading-tight" style={{fontSize:'clamp(32px, 5vw, 56px)'}}>Từ ý tưởng đến <span className="highlight-orange">website live</span>{' '}chỉ <span className="highlight-blue">5 ngày</span></h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">Quy trình rõ ràng, cập nhật tiến độ hàng ngày qua Zalo — không bao giờ trễ hẹn.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/lien-he" className="btn-primary text-base px-8 py-4"><span>🚀 Bắt đầu ngay</span></Link>
                <Link href="/gia" className="btn-secondary text-base px-8 py-4" style={{background:'transparent',color:'white',borderColor:'rgba(255,255,255,0.2)'}}>Xem bảng giá →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="badge-gradient mb-4 mx-auto inline-flex">{steps.length} bước rõ ràng</div>
              <h2 className="font-display font-bold text-foreground mb-4" style={{fontSize:'clamp(24px, 3.5vw, 40px)'}}>Quy trình <span className="highlight-blue">minh bạch</span> từng bước</h2>
              <p className="text-muted text-lg max-w-xl mx-auto">Bạn biết chính xác điều gì đang xảy ra ở mỗi giai đoạn.</p>
            </div>
            <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div key={step.num} className="step-item">
                  <div className={`card-base p-7 h-full border-t-4 ${step.borderColor}`}>
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-xl ${step.bg} ${step.color} flex items-center justify-center`}>{renderStepIcon(step)}</div>
                      <div className="text-right"><span className="text-xs font-mono text-muted/30 block font-display font-bold">{step.num}</span><span className="text-xs font-bold text-primary/70">{step.day}</span></div>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-2">{step.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm">
                          <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5"><svg className="w-2.5 h-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg></span>
                          <span className="text-foreground/70">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center"><div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20"><span className="text-2xl">⚡</span><span className="text-foreground font-semibold text-sm">Tổng thời gian: <span className="text-primary font-extrabold">5 ngày làm việc</span> — cam kết 100%</span></div></div>
          </div>
        </section>

        <section className="section-alt py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12"><div className="badge-gradient mb-4 mx-auto inline-flex">Cam kết của chúng tôi</div><h2 className="font-display font-bold text-foreground mb-4" style={{fontSize:'clamp(24px, 3.5vw, 40px)'}}>Bạn được <span className="highlight-orange">bảo vệ</span> toàn diện</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[{icon:'⏰',title:'Đúng 5 ngày',desc:'Cam kết bàn giao đúng hẹn hoặc hoàn tiền 100%'},{icon:'💰',title:'Không phí ẩn',desc:'Giá cố định từ đầu, không phát sinh thêm'},{icon:'🔄',title:'3 lần chỉnh sửa',desc:'Miễn phí chỉnh sửa mockup tối đa 3 lần'},{icon:'🛡️',title:'Bảo hành dài hạn',desc:'Bảo hành 3-12 tháng tùy gói'}].map((g) => (
                <div key={g.title} className="card-base p-6 text-center"><div className="text-3xl mb-3">{g.icon}</div><div className="font-display font-bold text-foreground mb-2">{g.title}</div><div className="text-sm text-muted leading-relaxed">{g.desc}</div></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-white py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12"><div className="badge-gradient mb-4 mx-auto inline-flex">Câu hỏi thường gặp</div><h2 className="font-display font-bold text-foreground mb-4" style={{fontSize:'clamp(24px, 3.5vw, 40px)'}}>Bạn còn <span className="highlight-blue">thắc mắc</span>?</h2></div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card-base p-6"><h3 className="font-display font-bold text-foreground mb-2 flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{i+1}</span>{faq.question}</h3><p className="text-muted text-sm leading-relaxed pl-9">{faq.answer}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-dark py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at center, rgba(255,138,0,0.08) 0%, transparent 70%)'}} aria-hidden="true" />
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="font-display font-bold text-white mb-4" style={{fontSize:'clamp(24px, 3.5vw, 40px)'}}>Sẵn sàng bắt đầu <span className="highlight-orange">hành trình</span>?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Nhắn Zalo ngay hôm nay — tư vấn miễn phí, không áp lực.</p>
            <Link href="/lien-he" className="btn-primary text-base px-8 py-4"><span>💬 Nhắn Zalo tư vấn ngay</span></Link>
          </div>
        </section>
      </main>
      <Footer /><ZaloFloat />
    </>
  );
}
