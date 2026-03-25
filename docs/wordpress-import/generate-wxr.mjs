/**
 * QPWeb — Generate WXR XML for WordPress manual import
 * Run: node docs/wordpress-import/generate-wxr.mjs
 * Output: docs/wordpress-import/qpweb-import.xml
 */
import { writeFileSync } from 'fs';

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function cdata(s) { return `<![CDATA[${s}]]>`; }

function meta(key, val) {
  return `      <wp:postmeta><wp:meta_key>${esc(key)}</wp:meta_key><wp:meta_value>${cdata(String(val))}</wp:meta_value></wp:postmeta>`;
}

function acfMeta(key, fieldKey, val) {
  // value + reference key
  return meta(key, val) + '\n' + meta('_' + key, fieldKey);
}

function repeaterMeta(key, fieldKey, subFieldName, subFieldKey, items) {
  const lines = [];
  lines.push(meta(key, items.length));
  lines.push(meta('_' + key, fieldKey));
  items.forEach((item, i) => {
    lines.push(meta(`${key}_${i}_${subFieldName}`, item));
    lines.push(meta(`_${key}_${i}_${subFieldName}`, subFieldKey));
  });
  return lines.join('\n');
}

let postId = 100;
function nextId() { return ++postId; }

function termXml(taxonomy, slug, name) {
  return `  <wp:term>
    <wp:term_taxonomy>${cdata(taxonomy)}</wp:term_taxonomy>
    <wp:term_slug>${cdata(slug)}</wp:term_slug>
    <wp:term_name>${cdata(name)}</wp:term_name>
  </wp:term>`;
}

function postXml(opts) {
  const { id, title, slug, type, status='publish', menuOrder=0, metas=[], cats=[] } = opts;
  const catXml = cats.map(c => `      <category domain="${esc(c.taxonomy)}" nicename="${esc(c.slug)}">${cdata(c.name)}</category>`).join('\n');
  return `
    <item>
      <title>${cdata(title)}</title>
      <wp:post_name>${cdata(slug)}</wp:post_name>
      <wp:post_id>${id}</wp:post_id>
      <wp:post_type>${cdata(type)}</wp:post_type>
      <wp:status>${cdata(status)}</wp:status>
      <wp:menu_order>${menuOrder}</wp:menu_order>
${catXml}
${metas.join('\n')}
    </item>`;
}

// ═══ DATA ═══

const taxonomyTerms = [
  // service-cat
  ...['WordPress','SEO','Zalo','E-commerce','Booking','Bảo trì'].map(n => ({ tax:'service-cat', slug:n.toLowerCase().replace(/[^a-z0-9]/g,'-'), name:n })),
  // portfolio-cat
  ...['Spa & Beauty','F&B','Nhiếp ảnh','Coaching','Thời trang','Dịch vụ','Doanh nghiệp'].map(n => ({ tax:'portfolio-cat', slug:n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''), name:n })),
  // review-cat
  ...['Coaching','F&B','Nhiếp ảnh','Dịch vụ','Spa & Beauty','Content Creator'].map(n => ({ tax:'review-cat', slug:'r-'+n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''), name:n })),
  // faq-cat
  { tax:'faq-cat', slug:'gia', name:'Giá' },
  { tax:'faq-cat', slug:'quy-trinh', name:'Quy trình' },
];

// ═══ Services ═══
const services = [
  { title:'Thiết kế Website WordPress Flatsome', slug:'thiet-ke-website-wordpress-flatsome', order:1, tag:'WordPress', acf:{ service_num:'01', service_short_desc:'Xây dựng website chuyên nghiệp trên nền tảng WordPress với theme Flatsome — tối ưu tốc độ, dễ quản trị, không cần biết code.', service_tag:'WordPress', service_tag_color:'bg-blue-100 text-blue-700', service_color:'text-blue-brand', service_bg:'bg-blue-50', features:['Giao diện tuỳ chỉnh theo brand','Responsive 100% mobile-first','Tốc độ tải trang < 3 giây','Dễ tự cập nhật nội dung','Tích hợp Google Analytics'] }},
  { title:'SEO Local & Google My Business', slug:'seo-local-google-my-business', order:2, tag:'SEO', acf:{ service_num:'02', service_short_desc:'Tối ưu website xuất hiện top Google tìm kiếm địa phương.', service_tag:'SEO', service_tag_color:'bg-green-100 text-green-700', service_color:'text-primary', service_bg:'bg-orange-50', features:['Nghiên cứu từ khoá địa phương','Tối ưu on-page SEO','Cài đặt Google My Business','Schema markup địa phương','Báo cáo thứ hạng hàng tháng'] }},
  { title:'Tích hợp Zalo OA & Live Chat', slug:'tich-hop-zalo-oa-live-chat', order:3, tag:'Zalo', acf:{ service_num:'03', service_short_desc:'Kết nối Zalo Official Account vào website — khách hàng nhắn tin trực tiếp.', service_tag:'Zalo', service_tag_color:'bg-blue-100 text-blue-700', service_color:'text-blue-brand', service_bg:'bg-blue-50', features:['Nút Zalo nổi trên website','Zalo OA tích hợp chat','Form liên hệ tự động','Thông báo tin nhắn realtime','Hỗ trợ cài đặt Zalo OA'] }},
  { title:'Website Thương Mại Điện Tử', slug:'website-thuong-mai-dien-tu', order:4, tag:'E-commerce', acf:{ service_num:'04', service_short_desc:'Xây dựng cửa hàng online với WooCommerce.', service_tag:'E-commerce', service_tag_color:'bg-purple-100 text-purple-700', service_color:'text-primary', service_bg:'bg-orange-50', features:['WooCommerce đầy đủ tính năng','Thanh toán VNPay / MoMo','Quản lý kho hàng','Tích hợp vận chuyển','Báo cáo doanh thu'] }},
  { title:'Đặt lịch & Booking Online', slug:'dat-lich-booking-online', order:5, tag:'Booking', acf:{ service_num:'05', service_short_desc:'Hệ thống đặt lịch hẹn tự động cho spa, phòng khám, salon, coach.', service_tag:'Booking', service_tag_color:'bg-amber-100 text-amber-700', service_color:'text-blue-brand', service_bg:'bg-blue-50', features:['Lịch đặt hẹn tự động','Nhắc nhở qua Zalo / SMS','Quản lý lịch làm việc','Xác nhận đặt lịch tức thì','Tích hợp Google Calendar'] }},
  { title:'Bảo trì & Hỗ trợ Website', slug:'bao-tri-ho-tro-website', order:6, tag:'Bảo trì', acf:{ service_num:'06', service_short_desc:'Dịch vụ bảo trì định kỳ, cập nhật plugin, backup dữ liệu, sửa lỗi nhanh.', service_tag:'Bảo trì', service_tag_color:'bg-gray-100 text-gray-700', service_color:'text-primary', service_bg:'bg-orange-50', features:['Backup dữ liệu hàng tuần','Cập nhật WordPress & plugin','Sửa lỗi trong 24h','Báo cáo uptime hàng tháng','Hỗ trợ qua Zalo 8h-22h'] }},
];

const portfolioItems = [
  { title:'Spa Hương Thơm', slug:'spa-huong-thom', order:1, cat:'Spa & Beauty', acf:{ portfolio_client:'Spa Hương Thơm - TP.HCM', portfolio_result:'+40% lượt đặt lịch qua web', portfolio_tag_color:'bg-pink-100 text-pink-700', tech:['WordPress','Flatsome','Booking'] }},
  { title:'The Brew House', slug:'the-brew-house', order:2, cat:'F&B', acf:{ portfolio_client:'The Brew House - Hà Nội', portfolio_result:'Top 3 Google "cà phê Hoàn Kiếm"', portfolio_tag_color:'bg-amber-100 text-amber-700', tech:['WordPress','SEO Local','Zalo'] }},
  { title:'Minh Tuấn Photo', slug:'minh-tuan-photo', order:3, cat:'Nhiếp ảnh', acf:{ portfolio_client:'Minh Tuấn Photography - Đà Nẵng', portfolio_result:'+60% khách doanh nghiệp mới', portfolio_tag_color:'bg-gray-100 text-gray-700', tech:['WordPress','Portfolio','Gallery'] }},
  { title:'Coaching Thành Công', slug:'coaching-thanh-cong', order:4, cat:'Coaching', acf:{ portfolio_client:'Coaching Thành Công - TP.HCM', portfolio_result:'2x học viên đăng ký online', portfolio_tag_color:'bg-blue-100 text-blue-700', tech:['WordPress','LMS','Zalo OA'] }},
  { title:'Thời Trang Linh', slug:'thoi-trang-linh', order:5, cat:'Thời trang', acf:{ portfolio_client:'Thời Trang Linh - Hải Phòng', portfolio_result:'30% đơn hàng từ website', portfolio_tag_color:'bg-purple-100 text-purple-700', tech:['WooCommerce','SEO','Zalo'] }},
  { title:'Điện Lạnh Hoàng Phát', slug:'dien-lanh-hoang', order:6, cat:'Dịch vụ', acf:{ portfolio_client:'Điện Lạnh Hoàng Phát - Cần Thơ', portfolio_result:'30% đơn từ website trong 2 tháng', portfolio_tag_color:'bg-green-100 text-green-700', tech:['WordPress','Booking','SEO Local'] }},
];

const plans = [
  { title:'Basic', slug:'basic', order:1, acf:{ pricing_price:'3.500.000', pricing_short_desc:'Phù hợp cho cá nhân, freelancer, coach mới bắt đầu.', pricing_pages:'5 trang', pricing_design:'Template Flatsome có sẵn', pricing_seo:'SEO on-page cơ bản', pricing_warranty:'Bảo hành 3 tháng', pricing_is_popular:'0', pricing_cta:'Chọn Basic', pricing_num:'01', pricing_color:'text-blue-brand', pricing_bg:'bg-blue-50', features:['5 trang nội dung','Thiết kế template Flatsome','Responsive mobile 100%','Form liên hệ + nút Zalo','SEO on-page cơ bản','Bảo hành 3 tháng','Hỗ trợ qua Zalo'], notIncluded:['SEO local & Google My Business','WooCommerce / đặt lịch','Báo cáo tháng'] }},
  { title:'Standard', slug:'standard', order:2, acf:{ pricing_price:'6.500.000', pricing_short_desc:'Lý tưởng cho quán cà phê, spa, cửa hàng, dịch vụ địa phương.', pricing_pages:'10 trang', pricing_design:'Thiết kế tuỳ chỉnh theo brand', pricing_seo:'SEO local + Google My Business', pricing_warranty:'Bảo hành 6 tháng', pricing_is_popular:'1', pricing_cta:'Chọn Standard', pricing_num:'02', pricing_color:'text-primary', pricing_bg:'bg-orange-50', features:['10 trang nội dung','Thiết kế tuỳ chỉnh theo brand','Responsive + tốc độ tối ưu','Zalo OA + Live chat','SEO local + Google My Business','Bảo hành 6 tháng','Hướng dẫn quản trị'], notIncluded:['WooCommerce / đặt lịch online','Báo cáo tháng + tư vấn chiến lược'] }},
  { title:'Pro', slug:'pro', order:3, acf:{ pricing_price:'12.000.000', pricing_short_desc:'Dành cho doanh nghiệp SME, thương mại điện tử, website nhiều tính năng.', pricing_pages:'Không giới hạn', pricing_design:'Thiết kế premium 100% custom', pricing_seo:'SEO toàn diện + blog content', pricing_warranty:'Bảo hành 12 tháng', pricing_is_popular:'0', pricing_cta:'Chọn Pro', pricing_num:'03', pricing_color:'text-blue-brand', pricing_bg:'bg-blue-50', features:['Trang không giới hạn','Thiết kế premium 100% custom','WooCommerce / đặt lịch online','Zalo OA + Email marketing','SEO toàn diện + blog content','Bảo hành 12 tháng','Báo cáo tháng + tư vấn chiến lược'], notIncluded:[] }},
];

const addons = [
  { title:'Thêm trang nội dung', slug:'them-trang', order:1, acf:{ addon_price:'300.000đ/trang', addon_short_desc:'Thêm trang About, Blog, FAQ, v.v.' }},
  { title:'Logo design', slug:'logo-design', order:2, acf:{ addon_price:'500.000đ', addon_short_desc:'Thiết kế logo chuyên nghiệp theo brand' }},
  { title:'Bảo trì tháng', slug:'bao-tri-thang', order:3, acf:{ addon_price:'500.000đ/tháng', addon_short_desc:'Backup, update, sửa lỗi, hỗ trợ kỹ thuật' }},
  { title:'SEO nâng cao', slug:'seo-nang-cao', order:4, acf:{ addon_price:'1.500.000đ/tháng', addon_short_desc:'Viết content, link building, báo cáo thứ hạng' }},
  { title:'Email marketing', slug:'email-marketing', order:5, acf:{ addon_price:'800.000đ/tháng', addon_short_desc:'Thiết lập & gửi newsletter tự động' }},
  { title:'Chụp ảnh sản phẩm', slug:'chup-anh-san-pham', order:6, acf:{ addon_price:'Liên hệ', addon_short_desc:'Chụp ảnh chuyên nghiệp cho website' }},
];

const testimonials = [
  { title:'Nguyễn Thị Lan Anh', slug:'nguyen-thi-lan-anh', order:1, cat:'Coaching', acf:{ review_role:'Coach Tư Duy Tích Cực', review_company:'LanAnh Coaching', review_quote:'Mình rất bất ngờ khi website xong đúng 5 ngày, đẹp hơn mình tưởng rất nhiều.', review_stars:'5', review_result:'+100% học viên mới từ Google', review_tag:'Coaching', review_tag_color:'bg-blue-100 text-blue-700', review_num:'01' }},
  { title:'Trần Minh Khoa', slug:'tran-minh-khoa', order:2, cat:'F&B', acf:{ review_role:'Chủ quán The Brew House', review_company:'The Brew House Coffee', review_quote:'Từ khi có website tích hợp Zalo và SEO local, khách tìm đến quán tăng hẳn.', review_stars:'5', review_result:'Top 3 Google "cà phê Hoàn Kiếm"', review_tag:'F&B', review_tag_color:'bg-amber-100 text-amber-700', review_num:'02' }},
  { title:'Phạm Thu Hương', slug:'pham-thu-huong', order:3, cat:'Nhiếp ảnh', acf:{ review_role:'Nhiếp ảnh gia', review_company:'Hương Photography Studio', review_quote:'Portfolio giờ trông rất xịn. Khách hàng doanh nghiệp liên hệ qua website.', review_stars:'5', review_result:'+60% khách doanh nghiệp mới', review_tag:'Nhiếp ảnh', review_tag_color:'bg-gray-100 text-gray-700', review_num:'03' }},
  { title:'Lê Văn Đức', slug:'le-van-duc', order:4, cat:'Dịch vụ', acf:{ review_role:'Chủ cửa hàng điện lạnh', review_company:'Điện Lạnh Hoàng Phát', review_quote:'Bây giờ 30% đơn đến từ website.', review_stars:'5', review_result:'30% đơn hàng từ website', review_tag:'Dịch vụ', review_tag_color:'bg-green-100 text-green-700', review_num:'04' }},
  { title:'Võ Thị Mai Linh', slug:'vo-thi-mai-linh', order:5, cat:'Spa & Beauty', acf:{ review_role:'Chủ spa & làm đẹp', review_company:'Spa Hương Thơm', review_quote:'Website booking online giúp mình giảm 80% thời gian nhắn tin xác nhận lịch.', review_stars:'5', review_result:'+40% lượt đặt lịch online', review_tag:'Spa & Beauty', review_tag_color:'bg-pink-100 text-pink-700', review_num:'05' }},
  { title:'Nguyễn Hoàng Nam', slug:'nguyen-hoang-nam', order:6, cat:'Content Creator', acf:{ review_role:'TikToker & Content Creator', review_company:'Nam Hoàng Media', review_quote:'Tỷ lệ chuyển đổi từ TikTok sang mua khoá học tăng 3x.', review_stars:'5', review_result:'3x tỷ lệ chuyển đổi khoá học', review_tag:'Content Creator', review_tag_color:'bg-purple-100 text-purple-700', review_num:'06' }},
];

const processSteps = [
  { title:'Thu thập yêu cầu', slug:'thu-thap-yeu-cau', order:1, acf:{ step_num:'01', step_day:'Ngày 1', step_short_desc:'Tư vấn qua Zalo, ghi nhận nội dung, màu sắc, mục tiêu website.', step_color:'text-primary', step_bg:'bg-orange-50', step_border_color:'border-primary/30', details:['Tư vấn 1-1 qua Zalo/Điện thoại','Điền form yêu cầu chi tiết','Xác nhận brief & timeline','Ký hợp đồng & thanh toán 50%'] }},
  { title:'Thiết kế mockup', slug:'thiet-ke-mockup', order:2, acf:{ step_num:'02', step_day:'Ngày 2', step_short_desc:'Tạo giao diện Figma/Flatsome theo brand.', step_color:'text-blue-brand', step_bg:'bg-blue-50', step_border_color:'border-blue-brand/30', details:['Thiết kế wireframe & layout','Chọn màu sắc & typography','Mockup desktop + mobile','Gửi xem trước qua Zalo'] }},
  { title:'Chỉnh sửa & duyệt', slug:'chinh-sua-duyet', order:3, acf:{ step_num:'03', step_day:'Ngày 3', step_short_desc:'Tối đa 3 lần chỉnh sửa mockup theo phản hồi.', step_color:'text-primary', step_bg:'bg-orange-50', step_border_color:'border-primary/30', details:['Tối đa 3 lần chỉnh sửa','Phản hồi trong 4 giờ làm việc','Duyệt mockup cuối cùng','Xác nhận nội dung & hình ảnh'] }},
  { title:'Dev & tích hợp', slug:'dev-tich-hop', order:4, acf:{ step_num:'04', step_day:'Ngày 4', step_short_desc:'Lên WordPress Flatsome, cài plugin SEO, tích hợp Zalo OA.', step_color:'text-blue-brand', step_bg:'bg-blue-50', step_border_color:'border-blue-brand/30', details:['Cài đặt WordPress + Flatsome','Tích hợp Zalo OA & form','Cài plugin SEO Yoast','Tối ưu tốc độ & bảo mật'] }},
  { title:'Kiểm thử toàn diện', slug:'kiem-thu-toan-dien', order:5, acf:{ step_num:'05', step_day:'Ngày 5', step_short_desc:'Test mobile, tốc độ, form, SEO, cross-browser.', step_color:'text-primary', step_bg:'bg-orange-50', step_border_color:'border-primary/30', details:['Test responsive mobile/tablet','Kiểm tra tốc độ PageSpeed','Test form & Zalo integration','Cross-browser Chrome/Safari/Firefox'] }},
  { title:'Bàn giao & hỗ trợ', slug:'ban-giao-ho-tro', order:6, acf:{ step_num:'06', step_day:'Ngày 5', step_short_desc:'Bàn giao toàn bộ tài khoản, hướng dẫn quản trị qua video.', step_color:'text-blue-brand', step_bg:'bg-blue-50', step_border_color:'border-blue-brand/30', details:['Bàn giao domain + hosting','Video hướng dẫn quản trị','Thanh toán 50% còn lại','Bắt đầu bảo hành chính thức'] }},
];

const faqsGia = [
  { title:'Giá đã bao gồm domain và hosting chưa?', slug:'gia-da-bao-gom-domain', answer:'Có! Tất cả gói đều bao gồm domain .com/.vn và hosting tốc độ cao cho năm đầu tiên.' },
  { title:'Thanh toán như thế nào?', slug:'thanh-toan-nhu-the-nao', answer:'50% khi ký hợp đồng, 50% còn lại khi bàn giao website hoàn chỉnh.' },
  { title:'Có thể nâng cấp gói sau khi đã mua không?', slug:'co-the-nang-cap-goi', answer:'Có! Bạn có thể nâng cấp bất cứ lúc nào. Chỉ cần thanh toán phần chênh lệch.' },
  { title:'Nếu không hài lòng có được hoàn tiền không?', slug:'hoan-tien', answer:'Nếu chúng tôi không bàn giao đúng 5 ngày, bạn được hoàn 100% tiền đã thanh toán.' },
];
const faqsQuyTrinh = [
  { title:'Tôi cần chuẩn bị gì trước khi bắt đầu?', slug:'can-chuan-bi-gi', answer:'Bạn chỉ cần cung cấp: logo (nếu có), nội dung text, hình ảnh sản phẩm/dịch vụ.' },
  { title:'Nếu tôi không hài lòng với thiết kế thì sao?', slug:'khong-hai-long-thiet-ke', answer:'Bạn được chỉnh sửa tối đa 3 lần miễn phí ở bước mockup.' },
  { title:'Sau khi bàn giao tôi có thể tự cập nhật nội dung không?', slug:'tu-cap-nhat-noi-dung', answer:'Có! WordPress rất dễ dùng. Chúng tôi sẽ cung cấp video hướng dẫn chi tiết.' },
  { title:'5 ngày có tính cả cuối tuần không?', slug:'5-ngay-tinh-cuoi-tuan', answer:'5 ngày là ngày làm việc (thứ 2 - thứ 6).' },
];

// ═══ BUILD XML ═══

const allTermsXml = taxonomyTerms.map(t => termXml(t.tax, t.slug, t.name)).join('\n');

const allPostsXml = [];

// Services
for (const s of services) {
  const id = nextId();
  const tagSlug = s.tag.toLowerCase().replace(/[^a-z0-9]/g,'-');
  const m = [
    acfMeta('service_num','field_service_num', s.acf.service_num),
    acfMeta('service_short_desc','field_service_short_desc', s.acf.service_short_desc),
    acfMeta('service_tag','field_service_tag', s.acf.service_tag),
    acfMeta('service_tag_color','field_service_tag_color', s.acf.service_tag_color),
    acfMeta('service_color','field_service_color', s.acf.service_color),
    acfMeta('service_bg','field_service_bg', s.acf.service_bg),
    repeaterMeta('service_features','field_service_features','feature_item','field_service_feature_item', s.acf.features),
  ];
  allPostsXml.push(postXml({ id, title:s.title, slug:s.slug, type:'service', menuOrder:s.order, metas:m, cats:[{taxonomy:'service-cat',slug:tagSlug,name:s.tag}] }));
}

// Portfolio
for (const p of portfolioItems) {
  const id = nextId();
  const catSlug = p.cat.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
  const m = [
    acfMeta('portfolio_client','field_portfolio_client', p.acf.portfolio_client),
    acfMeta('portfolio_result','field_portfolio_result', p.acf.portfolio_result),
    acfMeta('portfolio_tag_color','field_portfolio_tag_color', p.acf.portfolio_tag_color),
    repeaterMeta('portfolio_tech','field_portfolio_tech','tech_item','field_portfolio_tech_item', p.acf.tech),
  ];
  allPostsXml.push(postXml({ id, title:p.title, slug:p.slug, type:'portfolio', menuOrder:p.order, metas:m, cats:[{taxonomy:'portfolio-cat',slug:catSlug,name:p.cat}] }));
}

// Plans
for (const p of plans) {
  const id = nextId();
  const m = [
    acfMeta('pricing_price','field_pricing_price', p.acf.pricing_price),
    acfMeta('pricing_short_desc','field_pricing_short_desc', p.acf.pricing_short_desc),
    acfMeta('pricing_pages','field_pricing_pages', p.acf.pricing_pages),
    acfMeta('pricing_design','field_pricing_design', p.acf.pricing_design),
    acfMeta('pricing_seo','field_pricing_seo', p.acf.pricing_seo),
    acfMeta('pricing_warranty','field_pricing_warranty', p.acf.pricing_warranty),
    acfMeta('pricing_is_popular','field_pricing_is_popular', p.acf.pricing_is_popular),
    acfMeta('pricing_cta','field_pricing_cta', p.acf.pricing_cta),
    acfMeta('pricing_num','field_pricing_num', p.acf.pricing_num),
    acfMeta('pricing_color','field_pricing_color', p.acf.pricing_color),
    acfMeta('pricing_bg','field_pricing_bg', p.acf.pricing_bg),
    repeaterMeta('pricing_features','field_pricing_features','feature_item','field_pricing_feature_item', p.acf.features),
    repeaterMeta('pricing_not_included','field_pricing_not_included','not_included_item','field_pricing_not_included_item', p.acf.notIncluded),
  ];
  allPostsXml.push(postXml({ id, title:p.title, slug:p.slug, type:'goi-gia', menuOrder:p.order, metas:m }));
}

// Addons
for (const a of addons) {
  const id = nextId();
  const m = [
    acfMeta('addon_price','field_addon_price', a.acf.addon_price),
    acfMeta('addon_short_desc','field_addon_short_desc', a.acf.addon_short_desc),
  ];
  allPostsXml.push(postXml({ id, title:a.title, slug:a.slug, type:'addon', menuOrder:a.order, metas:m }));
}

// Testimonials
for (const t of testimonials) {
  const id = nextId();
  const catSlug = 'r-'+t.cat.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
  const m = [
    acfMeta('review_role','field_review_role', t.acf.review_role),
    acfMeta('review_company','field_review_company', t.acf.review_company),
    acfMeta('review_quote','field_review_quote', t.acf.review_quote),
    acfMeta('review_stars','field_review_stars', t.acf.review_stars),
    acfMeta('review_result','field_review_result', t.acf.review_result),
    acfMeta('review_tag','field_review_tag', t.acf.review_tag),
    acfMeta('review_tag_color','field_review_tag_color', t.acf.review_tag_color),
    acfMeta('review_num','field_review_num', t.acf.review_num),
  ];
  allPostsXml.push(postXml({ id, title:t.title, slug:t.slug, type:'testimonial', menuOrder:t.order, metas:m, cats:[{taxonomy:'review-cat',slug:catSlug,name:t.cat}] }));
}

// Process Steps
for (const s of processSteps) {
  const id = nextId();
  const m = [
    acfMeta('step_num','field_step_num', s.acf.step_num),
    acfMeta('step_day','field_step_day', s.acf.step_day),
    acfMeta('step_short_desc','field_step_short_desc', s.acf.step_short_desc),
    acfMeta('step_color','field_step_color', s.acf.step_color),
    acfMeta('step_bg','field_step_bg', s.acf.step_bg),
    acfMeta('step_border_color','field_step_border_color', s.acf.step_border_color),
    repeaterMeta('step_details','field_step_details','detail_item','field_step_detail_item', s.acf.details),
  ];
  allPostsXml.push(postXml({ id, title:s.title, slug:s.slug, type:'quy-trinh', menuOrder:s.order, metas:m }));
}

// FAQs - Giá
for (const f of faqsGia) {
  const id = nextId();
  const m = [ acfMeta('faq_answer','field_faq_answer', f.answer) ];
  allPostsXml.push(postXml({ id, title:f.title, slug:f.slug, type:'faq', metas:m, cats:[{taxonomy:'faq-cat',slug:'gia',name:'Giá'}] }));
}
// FAQs - Quy trình
for (const f of faqsQuyTrinh) {
  const id = nextId();
  const m = [ acfMeta('faq_answer','field_faq_answer', f.answer) ];
  allPostsXml.push(postXml({ id, title:f.title, slug:f.slug, type:'faq', metas:m, cats:[{taxonomy:'faq-cat',slug:'quy-trinh',name:'Quy trình'}] }));
}

const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
  <title>QPWeb Import</title>
  <link>https://api.qpweb.io.vn</link>
  <wp:wxr_version>1.2</wp:wxr_version>

${allTermsXml}

${allPostsXml.join('\n')}

</channel>
</rss>`;

writeFileSync('docs/wordpress-import/qpweb-import.xml', xml, 'utf8');
console.log('✅ Generated: docs/wordpress-import/qpweb-import.xml');
console.log(`   ${allPostsXml.length} posts, ${taxonomyTerms.length} taxonomy terms`);
