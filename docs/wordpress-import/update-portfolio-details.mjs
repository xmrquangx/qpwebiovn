/**
 * QPWeb — Update Portfolio detail fields
 * Chạy: node docs/wordpress-import/update-portfolio-details.mjs
 */

const WP_URL = 'https://api.qpweb.io.vn';
const WP_USER = 'admin';
const WP_APP_PASS = 'tqEp gRkh O0kE VQCQ 0nd4 FqWk';
const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64');

async function findBySlug(slug) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/portfolio?slug=${slug}&per_page=1`, {
    headers: { Authorization: AUTH },
  });
  const posts = await res.json();
  return posts?.[0] || null;
}

async function updatePost(postId, data) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/portfolio/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: AUTH },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const err = await res.text();
      console.error(`  ❌ ${res.status}: ${err.substring(0, 200)}`);
      return false;
    }
    return true;
  } catch (e) {
    clearTimeout(timeout);
    console.error(`  ❌ Error: ${e.message}`);
    return false;
  }
}

const portfolioDetails = [
  {
    slug: 'spa-huong-thom',
    content: '<p>Spa Hương Thơm là một spa cao cấp tại TP.HCM chuyên cung cấp các dịch vụ chăm sóc sắc đẹp và thư giãn. Khách hàng cần một website sang trọng, dễ đặt lịch và tối ưu SEO local để thu hút khách hàng mới trong khu vực.</p>',
    meta: {
      portfolio_location: 'TP.HCM',
      portfolio_duration: '5 ngày',
      portfolio_year: '2024',
      portfolio_challenge: 'Trước đây Spa Hương Thơm chỉ nhận khách qua Zalo và giới thiệu miệng. Không có website, không có hiện diện online, khó mở rộng tệp khách hàng mới.',
      portfolio_solution: 'Thiết kế website WordPress Flatsome với giao diện màu hồng kem sang trọng, tích hợp hệ thống đặt lịch online, chat Zalo trực tiếp và tối ưu SEO local cho từ khóa "spa TP.HCM".',
      portfolio_testimonial_name: 'Chị Hương',
      portfolio_testimonial_role: 'Chủ Spa Hương Thơm, TP.HCM',
      portfolio_testimonial_quote: 'Mình rất hài lòng với website mới. Chỉ sau 2 tuần ra mắt đã có khách đặt lịch qua web, điều mà trước đây mình không nghĩ tới. Giao diện đẹp, dễ dùng!',
      portfolio_demo_url: '',
    },
  },
  {
    slug: 'the-brew-house',
    content: '<p>The Brew House là quán cà phê phong cách vintage tại Hoàn Kiếm, Hà Nội. Quán cần website để giới thiệu không gian, menu và thu hút khách hàng qua tìm kiếm Google địa phương.</p>',
    meta: {
      portfolio_location: 'Hà Nội',
      portfolio_duration: '5 ngày',
      portfolio_year: '2024',
      portfolio_challenge: 'Quán cà phê đang hoạt động tốt nhưng chưa có hiện diện online. Đối thủ cạnh tranh trong khu vực đã có website và đang chiếm top Google.',
      portfolio_solution: 'Thiết kế website với phong cách vintage ấm áp, tích hợp menu online, bản đồ Google Maps và tối ưu SEO local mạnh mẽ.',
      portfolio_testimonial_name: 'Anh Minh',
      portfolio_testimonial_role: 'Chủ The Brew House, Hà Nội',
      portfolio_testimonial_quote: 'Website giúp quán mình lên top Google chỉ sau 3 tuần. Giờ mỗi ngày có 5-10 khách mới tìm đến qua Google Maps.',
      portfolio_demo_url: '',
    },
  },
  {
    slug: 'minh-tuan-photo',
    content: '<p>Minh Tuấn là nhiếp ảnh gia chuyên nghiệp tại Đà Nẵng, chuyên chụp ảnh sự kiện doanh nghiệp, cưới hỏi và portrait. Cần portfolio website tối giản để thu hút khách hàng doanh nghiệp cao cấp.</p>',
    meta: {
      portfolio_location: 'Đà Nẵng',
      portfolio_duration: '5 ngày',
      portfolio_year: '2024',
      portfolio_challenge: 'Minh Tuấn chủ yếu nhận việc qua mạng xã hội nhưng thiếu sự chuyên nghiệp khi tiếp cận khách doanh nghiệp.',
      portfolio_solution: 'Thiết kế portfolio website với giao diện đen trắng tối giản, gallery ảnh tốc độ cao, trang giới thiệu dịch vụ rõ ràng.',
      portfolio_testimonial_name: 'Minh Tuấn',
      portfolio_testimonial_role: 'Nhiếp ảnh gia, Đà Nẵng',
      portfolio_testimonial_quote: 'Từ khi có website, khách doanh nghiệp liên hệ nhiều hơn hẳn. Đây là khoản đầu tư tốt nhất mình từng làm.',
      portfolio_demo_url: '',
    },
  },
  {
    slug: 'coaching-thanh-cong',
    content: '<p>Coaching Thành Công là trung tâm đào tạo kỹ năng sống và kinh doanh tại TP.HCM. Cần website chuyên nghiệp để giới thiệu khóa học, thu hút học viên và tích hợp đăng ký online.</p>',
    meta: {
      portfolio_location: 'TP.HCM',
      portfolio_duration: '5 ngày',
      portfolio_year: '2024',
      portfolio_challenge: 'Trung tâm đang phát triển nhanh nhưng việc quản lý đăng ký học viên qua Zalo và Facebook rất tốn thời gian.',
      portfolio_solution: 'Thiết kế website với trang giới thiệu khóa học chi tiết, hệ thống đăng ký online, tích hợp Zalo OA.',
      portfolio_testimonial_name: 'Anh Thành',
      portfolio_testimonial_role: 'Giám đốc Coaching Thành Công, TP.HCM',
      portfolio_testimonial_quote: 'Website giúp chúng tôi tiết kiệm rất nhiều thời gian xử lý đăng ký. Doanh thu tăng rõ rệt chỉ sau 1 tháng.',
      portfolio_demo_url: '',
    },
  },
  {
    slug: 'thoi-trang-linh',
    content: '<p>Thời Trang Linh là chuỗi thời trang tại Hải Phòng, cần website thương mại điện tử để bán hàng online.</p>',
    meta: {
      portfolio_location: 'Hải Phòng',
      portfolio_duration: '5 ngày',
      portfolio_year: '2024',
      portfolio_challenge: 'Cần bán hàng online nhưng chỉ có fanpage Facebook, khó quản lý đơn hàng và tồn kho.',
      portfolio_solution: 'Thiết kế website WooCommerce với giao diện thời trang hiện đại, tích hợp thanh toán online, quản lý tồn kho.',
      portfolio_testimonial_name: 'Chị Linh',
      portfolio_testimonial_role: 'Chủ Thời Trang Linh, Hải Phòng',
      portfolio_testimonial_quote: '30% đơn hàng giờ đến từ website. Quản lý kho và đơn tiện hơn rất nhiều so với bán qua Facebook.',
      portfolio_demo_url: '',
    },
  },
  {
    slug: 'dien-lanh-hoang',
    content: '<p>Điện Lạnh Hoàng Phát là doanh nghiệp sửa chữa và lắp đặt điều hòa tại Cần Thơ. Cần website để tăng độ tin cậy và thu hút khách hàng mới từ Google.</p>',
    meta: {
      portfolio_location: 'Cần Thơ',
      portfolio_duration: '5 ngày',
      portfolio_year: '2024',
      portfolio_challenge: 'Chỉ có khách quen giới thiệu, chưa có kênh online nào. Đối thủ đã lên top Google từ lâu.',
      portfolio_solution: 'Thiết kế website dịch vụ chuyên nghiệp với bảng giá rõ ràng, nút gọi điện nổi, SEO local mạnh.',
      portfolio_testimonial_name: 'Anh Đức',
      portfolio_testimonial_role: 'Chủ Điện Lạnh Hoàng Phát, Cần Thơ',
      portfolio_testimonial_quote: 'Bây giờ 30% đơn đến từ website. Khách gọi nói "tìm thấy trên Google".',
      portfolio_demo_url: '',
    },
  },
];

async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║  Update Portfolio Detail Fields          ║');
  console.log('╚══════════════════════════════════════════╝\n');

  for (const p of portfolioDetails) {
    console.log(`── ${p.slug} ──`);
    const post = await findBySlug(p.slug);
    if (!post) {
      console.log(`  ⚠️ Not found — skipping`);
      continue;
    }
    console.log(`  Found ID: ${post.id}`);

    // Update content + meta (simple text fields only)
    const ok = await updatePost(post.id, {
      content: p.content,
      meta: p.meta,
    });
    if (ok) {
      console.log(`  ✅ Updated content + meta fields`);
    }
  }

  console.log('\n🎉 Done!');
}

main().catch(console.error);
