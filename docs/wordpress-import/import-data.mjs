/**
 * QPWeb — Import dữ liệu mẫu vào WordPress qua REST API
 * 
 * Chạy: node docs/wordpress-import/import-data.mjs
 * 
 * Yêu cầu: Plugin QPWeb Headless Setup đã kích hoạt trên WordPress.
 */

const WP_URL = 'https://api.qpweb.io.vn';
const WP_USER = 'admin';
const WP_APP_PASS = 'tqEp gRkh O0kE VQCQ 0nd4 FqWk';
const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64');

/* ───── Helper: tạo post ───── */
async function createPost(type, data) {
  const url = `${WP_URL}/wp-json/wp/v2/${type}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: AUTH },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`❌ [${type}] "${data.title}" — ${res.status}: ${err}`);
    return null;
  }
  const post = await res.json();
  console.log(`✅ [${type}] "${data.title}" → ID ${post.id}`);
  return post;
}

/* ───── Helper: tạo taxonomy term ───── */
async function createTerm(taxonomy, name) {
  const url = `${WP_URL}/wp-json/wp/v2/${taxonomy}`;
  // Check if term already exists
  const check = await fetch(`${url}?search=${encodeURIComponent(name)}`, {
    headers: { Authorization: AUTH },
  });
  const existing = await check.json();
  if (Array.isArray(existing) && existing.length > 0) {
    console.log(`  ⏭️  [${taxonomy}] "${name}" đã tồn tại → ID ${existing[0].id}`);
    return existing[0].id;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: AUTH },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    console.error(`❌ [${taxonomy}] "${name}" — ${res.status}`);
    return null;
  }
  const term = await res.json();
  console.log(`✅ [${taxonomy}] "${name}" → ID ${term.id}`);
  return term.id;
}

/* ───── Helper: update ACF fields ───── */
async function updateACF(postId, type, fields) {
  // Use meta endpoint to update fields
  const url = `${WP_URL}/wp-json/wp/v2/${type}/${postId}`;
  const meta = {};
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      // For repeater fields, store as serialized
      meta[key] = value.length;
      value.forEach((item, i) => {
        if (typeof item === 'object') {
          for (const [subKey, subVal] of Object.entries(item)) {
            meta[`${key}_${i}_${subKey}`] = subVal;
          }
        } else {
          meta[`${key}_${i}`] = item;
        }
      });
    } else {
      meta[key] = value;
    }
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: AUTH },
    body: JSON.stringify({ meta }),
  });
  if (!res.ok) {
    console.error(`  ⚠️  ACF update failed for post ${postId}: ${res.status}`);
  }
}

/* ════════════════════════════════════════════════════════
 *  DATA — Dịch vụ
 * ════════════════════════════════════════════════════════ */
const services = [
  { title: 'Thiết kế Website WordPress Flatsome', menu_order: 1, acf: { service_num: '01', service_short_desc: 'Xây dựng website chuyên nghiệp trên nền tảng WordPress với theme Flatsome — tối ưu tốc độ, dễ quản trị, không cần biết code.', service_features: [{feature_item:'Giao diện tuỳ chỉnh theo brand'},{feature_item:'Responsive 100% mobile-first'},{feature_item:'Tốc độ tải trang < 3 giây'},{feature_item:'Dễ tự cập nhật nội dung'},{feature_item:'Tích hợp Google Analytics'}], service_tag: 'WordPress', service_tag_color: 'bg-blue-100 text-blue-700', service_color: 'text-blue-brand', service_bg: 'bg-blue-50' } },
  { title: 'SEO Local & Google My Business', menu_order: 2, acf: { service_num: '02', service_short_desc: 'Tối ưu website xuất hiện top Google tìm kiếm địa phương — giúp khách hàng gần bạn tìm thấy doanh nghiệp dễ dàng hơn.', service_features: [{feature_item:'Nghiên cứu từ khoá địa phương'},{feature_item:'Tối ưu on-page SEO'},{feature_item:'Cài đặt Google My Business'},{feature_item:'Schema markup địa phương'},{feature_item:'Báo cáo thứ hạng hàng tháng'}], service_tag: 'SEO', service_tag_color: 'bg-green-100 text-green-700', service_color: 'text-primary', service_bg: 'bg-orange-50' } },
  { title: 'Tích hợp Zalo OA & Live Chat', menu_order: 3, acf: { service_num: '03', service_short_desc: 'Kết nối Zalo Official Account vào website — khách hàng nhắn tin trực tiếp, tăng tỷ lệ chuyển đổi.', service_features: [{feature_item:'Nút Zalo nổi trên website'},{feature_item:'Zalo OA tích hợp chat'},{feature_item:'Form liên hệ tự động'},{feature_item:'Thông báo tin nhắn realtime'},{feature_item:'Hỗ trợ cài đặt Zalo OA'}], service_tag: 'Zalo', service_tag_color: 'bg-blue-100 text-blue-700', service_color: 'text-blue-brand', service_bg: 'bg-blue-50' } },
  { title: 'Website Thương Mại Điện Tử', menu_order: 4, acf: { service_num: '04', service_short_desc: 'Xây dựng cửa hàng online với WooCommerce — bán hàng 24/7, quản lý đơn hàng, thanh toán online.', service_features: [{feature_item:'WooCommerce đầy đủ tính năng'},{feature_item:'Thanh toán VNPay / MoMo'},{feature_item:'Quản lý kho hàng'},{feature_item:'Tích hợp vận chuyển'},{feature_item:'Báo cáo doanh thu'}], service_tag: 'E-commerce', service_tag_color: 'bg-purple-100 text-purple-700', service_color: 'text-primary', service_bg: 'bg-orange-50' } },
  { title: 'Đặt lịch & Booking Online', menu_order: 5, acf: { service_num: '05', service_short_desc: 'Hệ thống đặt lịch hẹn tự động cho spa, phòng khám, salon, coach.', service_features: [{feature_item:'Lịch đặt hẹn tự động'},{feature_item:'Nhắc nhở qua Zalo / SMS'},{feature_item:'Quản lý lịch làm việc'},{feature_item:'Xác nhận đặt lịch tức thì'},{feature_item:'Tích hợp Google Calendar'}], service_tag: 'Booking', service_tag_color: 'bg-amber-100 text-amber-700', service_color: 'text-blue-brand', service_bg: 'bg-blue-50' } },
  { title: 'Bảo trì & Hỗ trợ Website', menu_order: 6, acf: { service_num: '06', service_short_desc: 'Dịch vụ bảo trì định kỳ, cập nhật plugin, backup dữ liệu, sửa lỗi nhanh.', service_features: [{feature_item:'Backup dữ liệu hàng tuần'},{feature_item:'Cập nhật WordPress & plugin'},{feature_item:'Sửa lỗi trong 24h'},{feature_item:'Báo cáo uptime hàng tháng'},{feature_item:'Hỗ trợ qua Zalo 8h-22h'}], service_tag: 'Bảo trì', service_tag_color: 'bg-gray-100 text-gray-700', service_color: 'text-primary', service_bg: 'bg-orange-50' } },
];

/* ════════════════════════════════════════════════════════
 *  DATA — Portfolio
 * ════════════════════════════════════════════════════════ */
const portfolioItems = [
  { title: 'Spa Hương Thơm', slug: 'spa-huong-thom', menu_order: 1, cat: 'Spa & Beauty', acf: { portfolio_client: 'Spa Hương Thơm - TP.HCM', portfolio_result: '+40% lượt đặt lịch qua web', portfolio_tech: [{tech_item:'WordPress'},{tech_item:'Flatsome'},{tech_item:'Booking'}], portfolio_tag_color: 'bg-pink-100 text-pink-700' } },
  { title: 'The Brew House', slug: 'the-brew-house', menu_order: 2, cat: 'F&B', acf: { portfolio_client: 'The Brew House - Hà Nội', portfolio_result: 'Top 3 Google "cà phê Hoàn Kiếm"', portfolio_tech: [{tech_item:'WordPress'},{tech_item:'SEO Local'},{tech_item:'Zalo'}], portfolio_tag_color: 'bg-amber-100 text-amber-700' } },
  { title: 'Minh Tuấn Photo', slug: 'minh-tuan-photo', menu_order: 3, cat: 'Nhiếp ảnh', acf: { portfolio_client: 'Minh Tuấn Photography - Đà Nẵng', portfolio_result: '+60% khách doanh nghiệp mới', portfolio_tech: [{tech_item:'WordPress'},{tech_item:'Portfolio'},{tech_item:'Gallery'}], portfolio_tag_color: 'bg-gray-100 text-gray-700' } },
  { title: 'Coaching Thành Công', slug: 'coaching-thanh-cong', menu_order: 4, cat: 'Coaching', acf: { portfolio_client: 'Coaching Thành Công - TP.HCM', portfolio_result: '2x học viên đăng ký online', portfolio_tech: [{tech_item:'WordPress'},{tech_item:'LMS'},{tech_item:'Zalo OA'}], portfolio_tag_color: 'bg-blue-100 text-blue-700' } },
  { title: 'Thời Trang Linh', slug: 'thoi-trang-linh', menu_order: 5, cat: 'Thời trang', acf: { portfolio_client: 'Thời Trang Linh - Hải Phòng', portfolio_result: '30% đơn hàng từ website', portfolio_tech: [{tech_item:'WooCommerce'},{tech_item:'SEO'},{tech_item:'Zalo'}], portfolio_tag_color: 'bg-purple-100 text-purple-700' } },
  { title: 'Điện Lạnh Hoàng Phát', slug: 'dien-lanh-hoang', menu_order: 6, cat: 'Dịch vụ', acf: { portfolio_client: 'Điện Lạnh Hoàng Phát - Cần Thơ', portfolio_result: '30% đơn từ website trong 2 tháng', portfolio_tech: [{tech_item:'WordPress'},{tech_item:'Booking'},{tech_item:'SEO Local'}], portfolio_tag_color: 'bg-green-100 text-green-700' } },
];

/* ════════════════════════════════════════════════════════
 *  DATA — Gói giá
 * ════════════════════════════════════════════════════════ */
const plans = [
  { title: 'Basic', menu_order: 1, acf: { pricing_price: '3.500.000', pricing_short_desc: 'Phù hợp cho cá nhân, freelancer, coach mới bắt đầu.', pricing_pages: '5 trang', pricing_design: 'Template Flatsome có sẵn', pricing_seo: 'SEO on-page cơ bản', pricing_warranty: 'Bảo hành 3 tháng', pricing_features: [{feature_item:'5 trang nội dung'},{feature_item:'Thiết kế template Flatsome'},{feature_item:'Responsive mobile 100%'},{feature_item:'Form liên hệ + nút Zalo'},{feature_item:'SEO on-page cơ bản'},{feature_item:'Bảo hành 3 tháng'},{feature_item:'Hỗ trợ qua Zalo'}], pricing_not_included: [{not_included_item:'SEO local & Google My Business'},{not_included_item:'WooCommerce / đặt lịch'},{not_included_item:'Báo cáo tháng'}], pricing_is_popular: false, pricing_cta: 'Chọn Basic', pricing_num: '01', pricing_color: 'text-blue-brand', pricing_bg: 'bg-blue-50' } },
  { title: 'Standard', menu_order: 2, acf: { pricing_price: '6.500.000', pricing_short_desc: 'Lý tưởng cho quán cà phê, spa, cửa hàng, dịch vụ địa phương.', pricing_pages: '10 trang', pricing_design: 'Thiết kế tuỳ chỉnh theo brand', pricing_seo: 'SEO local + Google My Business', pricing_warranty: 'Bảo hành 6 tháng', pricing_features: [{feature_item:'10 trang nội dung'},{feature_item:'Thiết kế tuỳ chỉnh theo brand'},{feature_item:'Responsive + tốc độ tối ưu'},{feature_item:'Zalo OA + Live chat'},{feature_item:'SEO local + Google My Business'},{feature_item:'Bảo hành 6 tháng'},{feature_item:'Hướng dẫn quản trị'}], pricing_not_included: [{not_included_item:'WooCommerce / đặt lịch online'},{not_included_item:'Báo cáo tháng + tư vấn chiến lược'}], pricing_is_popular: true, pricing_cta: 'Chọn Standard', pricing_num: '02', pricing_color: 'text-primary', pricing_bg: 'bg-orange-50' } },
  { title: 'Pro', menu_order: 3, acf: { pricing_price: '12.000.000', pricing_short_desc: 'Dành cho doanh nghiệp SME, thương mại điện tử, website nhiều tính năng.', pricing_pages: 'Không giới hạn', pricing_design: 'Thiết kế premium 100% custom', pricing_seo: 'SEO toàn diện + blog content', pricing_warranty: 'Bảo hành 12 tháng', pricing_features: [{feature_item:'Trang không giới hạn'},{feature_item:'Thiết kế premium 100% custom'},{feature_item:'WooCommerce / đặt lịch online'},{feature_item:'Zalo OA + Email marketing'},{feature_item:'SEO toàn diện + blog content'},{feature_item:'Bảo hành 12 tháng'},{feature_item:'Báo cáo tháng + tư vấn chiến lược'}], pricing_not_included: [], pricing_is_popular: false, pricing_cta: 'Chọn Pro', pricing_num: '03', pricing_color: 'text-blue-brand', pricing_bg: 'bg-blue-50' } },
];

/* ════════════════════════════════════════════════════════
 *  DATA — Addons
 * ════════════════════════════════════════════════════════ */
const addons = [
  { title: 'Thêm trang nội dung', menu_order: 1, acf: { addon_price: '300.000đ/trang', addon_short_desc: 'Thêm trang About, Blog, FAQ, v.v.' } },
  { title: 'Logo design', menu_order: 2, acf: { addon_price: '500.000đ', addon_short_desc: 'Thiết kế logo chuyên nghiệp theo brand' } },
  { title: 'Bảo trì tháng', menu_order: 3, acf: { addon_price: '500.000đ/tháng', addon_short_desc: 'Backup, update, sửa lỗi, hỗ trợ kỹ thuật' } },
  { title: 'SEO nâng cao', menu_order: 4, acf: { addon_price: '1.500.000đ/tháng', addon_short_desc: 'Viết content, link building, báo cáo thứ hạng' } },
  { title: 'Email marketing', menu_order: 5, acf: { addon_price: '800.000đ/tháng', addon_short_desc: 'Thiết lập & gửi newsletter tự động' } },
  { title: 'Chụp ảnh sản phẩm', menu_order: 6, acf: { addon_price: 'Liên hệ', addon_short_desc: 'Chụp ảnh chuyên nghiệp cho website' } },
];

/* ════════════════════════════════════════════════════════
 *  DATA — Testimonials
 * ════════════════════════════════════════════════════════ */
const testimonials = [
  { title: 'Nguyễn Thị Lan Anh', menu_order: 1, reviewCat: 'Coaching', acf: { review_role: 'Coach Tư Duy Tích Cực', review_company: 'LanAnh Coaching', review_quote: 'Mình rất bất ngờ khi website xong đúng 5 ngày, đẹp hơn mình tưởng rất nhiều. Học viên đăng ký qua website tăng rõ rệt từ tháng đầu tiên.', review_stars: 5, review_result: '+100% học viên mới từ Google', review_tag: 'Coaching', review_tag_color: 'bg-blue-100 text-blue-700', review_num: '01' } },
  { title: 'Trần Minh Khoa', menu_order: 2, reviewCat: 'F&B', acf: { review_role: 'Chủ quán The Brew House', review_company: 'The Brew House Coffee', review_quote: 'Từ khi có website tích hợp Zalo và SEO local, khách tìm đến quán tăng hẳn. Giờ quán luôn nằm top 3 Google khi tìm "cà phê Hoàn Kiếm".', review_stars: 5, review_result: 'Top 3 Google "cà phê Hoàn Kiếm"', review_tag: 'F&B', review_tag_color: 'bg-amber-100 text-amber-700', review_num: '02' } },
  { title: 'Phạm Thu Hương', menu_order: 3, reviewCat: 'Nhiếp ảnh', acf: { review_role: 'Nhiếp ảnh gia', review_company: 'Hương Photography Studio', review_quote: 'Portfolio giờ trông rất xịn. Khách hàng doanh nghiệp liên hệ qua website thay vì Instagram. Đẹp, nhanh, rất đáng đầu tư.', review_stars: 5, review_result: '+60% khách doanh nghiệp mới', review_tag: 'Nhiếp ảnh', review_tag_color: 'bg-gray-100 text-gray-700', review_num: '03' } },
  { title: 'Lê Văn Đức', menu_order: 4, reviewCat: 'Dịch vụ', acf: { review_role: 'Chủ cửa hàng điện lạnh', review_company: 'Điện Lạnh Hoàng Phát', review_quote: 'Bây giờ 30% đơn đến từ website. Khách gọi nói "tìm thấy trên Google" — trước đó chỉ có khách quen giới thiệu thôi.', review_stars: 5, review_result: '30% đơn hàng từ website', review_tag: 'Dịch vụ', review_tag_color: 'bg-green-100 text-green-700', review_num: '04' } },
  { title: 'Võ Thị Mai Linh', menu_order: 5, reviewCat: 'Spa & Beauty', acf: { review_role: 'Chủ spa & làm đẹp', review_company: 'Spa Hương Thơm', review_quote: 'Website booking online giúp mình giảm 80% thời gian nhắn tin xác nhận lịch. Khách tự đặt, tự chọn — tiện cả đôi bên.', review_stars: 5, review_result: '+40% lượt đặt lịch online', review_tag: 'Spa & Beauty', review_tag_color: 'bg-pink-100 text-pink-700', review_num: '05' } },
  { title: 'Nguyễn Hoàng Nam', menu_order: 6, reviewCat: 'Content Creator', acf: { review_role: 'TikToker & Content Creator', review_company: 'Nam Hoàng Media', review_quote: 'Tỷ lệ chuyển đổi từ TikTok sang mua khoá học tăng 3x nhờ landing page chuyên nghiệp. Đội ngũ rất hiểu creator cần gì.', review_stars: 5, review_result: '3x tỷ lệ chuyển đổi khoá học', review_tag: 'Content Creator', review_tag_color: 'bg-purple-100 text-purple-700', review_num: '06' } },
];

/* ════════════════════════════════════════════════════════
 *  DATA — Quy trình
 * ════════════════════════════════════════════════════════ */
const processSteps = [
  { title: 'Thu thập yêu cầu', menu_order: 1, acf: { step_num: '01', step_day: 'Ngày 1', step_short_desc: 'Tư vấn qua Zalo, ghi nhận nội dung, màu sắc, mục tiêu website.', step_details: [{detail_item:'Tư vấn 1-1 qua Zalo/Điện thoại'},{detail_item:'Điền form yêu cầu chi tiết'},{detail_item:'Xác nhận brief & timeline'},{detail_item:'Ký hợp đồng & thanh toán 50%'}], step_color: 'text-primary', step_bg: 'bg-orange-50', step_border_color: 'border-primary/30' } },
  { title: 'Thiết kế mockup', menu_order: 2, acf: { step_num: '02', step_day: 'Ngày 2', step_short_desc: 'Tạo giao diện Figma/Flatsome theo brand của bạn.', step_details: [{detail_item:'Thiết kế wireframe & layout'},{detail_item:'Chọn màu sắc & typography'},{detail_item:'Mockup desktop + mobile'},{detail_item:'Gửi xem trước qua Zalo'}], step_color: 'text-blue-brand', step_bg: 'bg-blue-50', step_border_color: 'border-blue-brand/30' } },
  { title: 'Chỉnh sửa & duyệt', menu_order: 3, acf: { step_num: '03', step_day: 'Ngày 3', step_short_desc: 'Tối đa 3 lần chỉnh sửa mockup theo phản hồi.', step_details: [{detail_item:'Tối đa 3 lần chỉnh sửa'},{detail_item:'Phản hồi trong 4 giờ làm việc'},{detail_item:'Duyệt mockup cuối cùng'},{detail_item:'Xác nhận nội dung & hình ảnh'}], step_color: 'text-primary', step_bg: 'bg-orange-50', step_border_color: 'border-primary/30' } },
  { title: 'Dev & tích hợp', menu_order: 4, acf: { step_num: '04', step_day: 'Ngày 4', step_short_desc: 'Lên WordPress Flatsome, cài plugin SEO, tích hợp Zalo OA.', step_details: [{detail_item:'Cài đặt WordPress + Flatsome'},{detail_item:'Tích hợp Zalo OA & form'},{detail_item:'Cài plugin SEO Yoast'},{detail_item:'Tối ưu tốc độ & bảo mật'}], step_color: 'text-blue-brand', step_bg: 'bg-blue-50', step_border_color: 'border-blue-brand/30' } },
  { title: 'Kiểm thử toàn diện', menu_order: 5, acf: { step_num: '05', step_day: 'Ngày 5', step_short_desc: 'Test mobile, tốc độ, form, SEO, cross-browser.', step_details: [{detail_item:'Test responsive mobile/tablet'},{detail_item:'Kiểm tra tốc độ PageSpeed'},{detail_item:'Test form & Zalo integration'},{detail_item:'Cross-browser Chrome/Safari/Firefox'}], step_color: 'text-primary', step_bg: 'bg-orange-50', step_border_color: 'border-primary/30' } },
  { title: 'Bàn giao & hỗ trợ', menu_order: 6, acf: { step_num: '06', step_day: 'Ngày 5', step_short_desc: 'Bàn giao toàn bộ tài khoản, hướng dẫn quản trị qua video.', step_details: [{detail_item:'Bàn giao domain + hosting'},{detail_item:'Video hướng dẫn quản trị'},{detail_item:'Thanh toán 50% còn lại'},{detail_item:'Bắt đầu bảo hành chính thức'}], step_color: 'text-blue-brand', step_bg: 'bg-blue-50', step_border_color: 'border-blue-brand/30' } },
];

/* ════════════════════════════════════════════════════════
 *  DATA — FAQ
 * ════════════════════════════════════════════════════════ */
const faqsGia = [
  { title: 'Giá đã bao gồm domain và hosting chưa?', acf: { faq_answer: 'Có! Tất cả gói đều bao gồm domain .com/.vn và hosting tốc độ cao cho năm đầu tiên (trị giá khoảng 1.200.000đ). Từ năm thứ 2 trở đi, bạn tự gia hạn với chi phí khoảng 1.000.000-1.500.000đ/năm.' } },
  { title: 'Thanh toán như thế nào?', acf: { faq_answer: '50% khi ký hợp đồng và bắt đầu dự án, 50% còn lại khi bàn giao website hoàn chỉnh. Thanh toán qua chuyển khoản ngân hàng hoặc MoMo.' } },
  { title: 'Có thể nâng cấp gói sau khi đã mua không?', acf: { faq_answer: 'Có! Bạn có thể nâng cấp từ Basic lên Standard hoặc Pro bất cứ lúc nào. Chỉ cần thanh toán phần chênh lệch.' } },
  { title: 'Nếu không hài lòng có được hoàn tiền không?', acf: { faq_answer: 'Nếu chúng tôi không bàn giao đúng 5 ngày như cam kết, bạn được hoàn 100% tiền đã thanh toán.' } },
];
const faqsQuyTrinh = [
  { title: 'Tôi cần chuẩn bị gì trước khi bắt đầu?', acf: { faq_answer: 'Bạn chỉ cần cung cấp: logo (nếu có), nội dung text, hình ảnh sản phẩm/dịch vụ và mô tả ngắn về doanh nghiệp. Nếu chưa có nội dung, chúng tôi có thể hỗ trợ viết content với phụ phí.' } },
  { title: 'Nếu tôi không hài lòng với thiết kế thì sao?', acf: { faq_answer: 'Bạn được chỉnh sửa tối đa 3 lần miễn phí ở bước mockup. Chúng tôi cam kết làm đến khi bạn hài lòng.' } },
  { title: 'Sau khi bàn giao, tôi có thể tự cập nhật nội dung không?', acf: { faq_answer: 'Có! WordPress rất dễ dùng. Chúng tôi sẽ cung cấp video hướng dẫn chi tiết để bạn tự cập nhật bài viết, hình ảnh, sản phẩm.' } },
  { title: '5 ngày có tính cả cuối tuần không?', acf: { faq_answer: '5 ngày là ngày làm việc (thứ 2 - thứ 6). Nếu bạn gửi yêu cầu ngày thứ 6, dự án sẽ bắt đầu từ thứ 2 tuần sau.' } },
];

/* ════════════════════════════════════════════════════════
 *  MAIN — Run import
 * ════════════════════════════════════════════════════════ */
async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║  QPWeb — Import dữ liệu mẫu WordPress  ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');

  // 1. Taxonomy terms
  console.log('── Tạo Taxonomy Terms ──');
  const portfolioCats = {};
  for (const cat of ['Spa & Beauty', 'F&B', 'Nhiếp ảnh', 'Coaching', 'Thời trang', 'Dịch vụ', 'Doanh nghiệp']) {
    portfolioCats[cat] = await createTerm('portfolio-cat', cat);
  }
  const serviceCats = {};
  for (const cat of ['WordPress', 'SEO', 'Zalo', 'E-commerce', 'Booking', 'Bảo trì']) {
    serviceCats[cat] = await createTerm('service-cat', cat);
  }
  const reviewCats = {};
  for (const cat of ['Coaching', 'F&B', 'Nhiếp ảnh', 'Dịch vụ', 'Spa & Beauty', 'Content Creator']) {
    reviewCats[cat] = await createTerm('review-cat', cat);
  }
  const faqCatGia = await createTerm('faq-cat', 'Giá');
  const faqCatQuyTrinh = await createTerm('faq-cat', 'Quy trình');

  console.log('\n── Tạo Dịch vụ ──');
  for (const svc of services) {
    const catId = serviceCats[svc.acf.service_tag];
    const post = await createPost('service', {
      title: svc.title,
      status: 'publish',
      menu_order: svc.menu_order,
      'service-cat': catId ? [catId] : [],
    });
    if (post) await updateACF(post.id, 'service', svc.acf);
  }

  console.log('\n── Tạo Portfolio ──');
  for (const p of portfolioItems) {
    const catId = portfolioCats[p.cat];
    const post = await createPost('portfolio', {
      title: p.title,
      slug: p.slug,
      status: 'publish',
      menu_order: p.menu_order,
      'portfolio-cat': catId ? [catId] : [],
    });
    if (post) await updateACF(post.id, 'portfolio', p.acf);
  }

  console.log('\n── Tạo Gói giá ──');
  for (const plan of plans) {
    const post = await createPost('goi-gia', {
      title: plan.title,
      status: 'publish',
      menu_order: plan.menu_order,
    });
    if (post) await updateACF(post.id, 'goi-gia', plan.acf);
  }

  console.log('\n── Tạo Dịch vụ bổ sung ──');
  for (const addon of addons) {
    const post = await createPost('addon', {
      title: addon.title,
      status: 'publish',
      menu_order: addon.menu_order,
    });
    if (post) await updateACF(post.id, 'addon', addon.acf);
  }

  console.log('\n── Tạo Đánh giá ──');
  for (const t of testimonials) {
    const catId = reviewCats[t.reviewCat];
    const post = await createPost('testimonial', {
      title: t.title,
      status: 'publish',
      menu_order: t.menu_order,
      'review-cat': catId ? [catId] : [],
    });
    if (post) await updateACF(post.id, 'testimonial', t.acf);
  }

  console.log('\n── Tạo Quy trình ──');
  for (const step of processSteps) {
    const post = await createPost('quy-trinh', {
      title: step.title,
      status: 'publish',
      menu_order: step.menu_order,
    });
    if (post) await updateACF(post.id, 'quy-trinh', step.acf);
  }

  console.log('\n── Tạo FAQ (Giá) ──');
  for (const [i, faq] of faqsGia.entries()) {
    const post = await createPost('faq', {
      title: faq.title,
      status: 'publish',
      menu_order: i + 1,
      'faq-cat': faqCatGia ? [faqCatGia] : [],
    });
    if (post) await updateACF(post.id, 'faq', faq.acf);
  }

  console.log('\n── Tạo FAQ (Quy trình) ──');
  for (const [i, faq] of faqsQuyTrinh.entries()) {
    const post = await createPost('faq', {
      title: faq.title,
      status: 'publish',
      menu_order: i + 1,
      'faq-cat': faqCatQuyTrinh ? [faqCatQuyTrinh] : [],
    });
    if (post) await updateACF(post.id, 'faq', faq.acf);
  }

  console.log('\n════════════════════════════════════════════');
  console.log('🎉 Import hoàn tất!');
  console.log('════════════════════════════════════════════');
}

main().catch(console.error);
