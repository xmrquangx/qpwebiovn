<?php
/**
 * Plugin Name:  QPWeb Import Portfolio Details
 * Description:  Import dữ liệu chi tiết portfolio (challenge, solution, testimonial, gallery, tech...). Kích hoạt plugin → tự động import → vào Plugins deactivate khi xong.
 * Version:      1.0.0
 * Author:       QPWeb
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/* Chạy import khi plugin được kích hoạt */
register_activation_hook( __FILE__, 'qpweb_import_portfolio_details' );

function qpweb_import_portfolio_details() {

    $portfolios = [
        [
            'slug'    => 'spa-huong-thom',
            'content' => '<p>Spa Hương Thơm là một spa cao cấp tại TP.HCM chuyên cung cấp các dịch vụ chăm sóc sắc đẹp và thư giãn. Khách hàng cần một website sang trọng, dễ đặt lịch và tối ưu SEO local để thu hút khách hàng mới trong khu vực.</p>',
            'fields'  => [
                'portfolio_location'             => 'TP.HCM',
                'portfolio_duration'             => '5 ngày',
                'portfolio_year'                 => '2024',
                'portfolio_challenge'            => 'Trước đây Spa Hương Thơm chỉ nhận khách qua Zalo và giới thiệu miệng. Không có website, không có hiện diện online, khó mở rộng tệp khách hàng mới. Cần một giải pháp nhanh, đẹp và hiệu quả ngay từ ngày đầu.',
                'portfolio_solution'             => 'Thiết kế website WordPress Flatsome với giao diện màu hồng kem sang trọng, tích hợp hệ thống đặt lịch online, chat Zalo trực tiếp và tối ưu SEO local cho từ khóa "spa TP.HCM". Toàn bộ hoàn thành trong 5 ngày làm việc.',
                'portfolio_testimonial_name'     => 'Chị Hương',
                'portfolio_testimonial_role'     => 'Chủ Spa Hương Thơm, TP.HCM',
                'portfolio_testimonial_quote'    => 'Mình rất hài lòng với website mới. Chỉ sau 2 tuần ra mắt đã có khách đặt lịch qua web, điều mà trước đây mình không nghĩ tới. Giao diện đẹp, dễ dùng và quan trọng là khách hàng khen nhiều lắm!',
                'portfolio_demo_url'             => '',
            ],
            'tech'    => ['WordPress', 'Flatsome Theme', 'Booking System', 'SEO Local', 'Zalo OA', 'Google Analytics'],
            'gallery' => [
                ['image' => 'https://images.unsplash.com/photo-1672666037110-2dbdff9ac52e', 'caption' => 'Trang chủ — Giao diện sang trọng, tối giản'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_19da85e8e-1772182199533.png', 'caption' => 'Trang dịch vụ — Liệt kê đầy đủ liệu trình'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_10fff23d0-1766589453161.png', 'caption' => 'Đặt lịch online — Tích hợp booking system'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_19330abe5-1772905195171.png', 'caption' => 'Giới thiệu — Xây dựng niềm tin khách hàng'],
            ],
        ],
        [
            'slug'    => 'the-brew-house',
            'content' => '<p>The Brew House là quán cà phê phong cách vintage tại Hoàn Kiếm, Hà Nội. Quán cần website để giới thiệu không gian, menu và thu hút khách hàng qua tìm kiếm Google địa phương.</p>',
            'fields'  => [
                'portfolio_location'             => 'Hà Nội',
                'portfolio_duration'             => '5 ngày',
                'portfolio_year'                 => '2024',
                'portfolio_challenge'            => 'Quán cà phê đang hoạt động tốt nhưng chưa có hiện diện online. Đối thủ cạnh tranh trong khu vực đã có website và đang chiếm top Google. Cần nhanh chóng xây dựng website và SEO để không bị bỏ lại phía sau.',
                'portfolio_solution'             => 'Thiết kế website với phong cách vintage ấm áp, tích hợp menu online, bản đồ Google Maps và tối ưu SEO local mạnh mẽ. Sử dụng schema markup cho local business để tăng khả năng hiển thị trên Google.',
                'portfolio_testimonial_name'     => 'Anh Minh',
                'portfolio_testimonial_role'     => 'Chủ The Brew House, Hà Nội',
                'portfolio_testimonial_quote'    => 'Website giúp quán mình lên top Google chỉ sau 3 tuần. Giờ mỗi ngày có 5-10 khách mới tìm đến qua Google Maps. Đầu tư rất xứng đáng!',
                'portfolio_demo_url'             => '',
            ],
            'tech'    => ['WordPress', 'Flatsome Theme', 'SEO Local', 'Schema Markup', 'Google Maps', 'Zalo'],
            'gallery' => [
                ['image' => 'https://images.unsplash.com/photo-1651338520040-5e02e1ce9404', 'caption' => 'Trang chủ — Phong cách vintage đặc trưng'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_101c23f1e-1772098302371.png', 'caption' => 'Menu online — Đầy đủ thức uống và giá'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_1bbcf1307-1772627399820.png', 'caption' => 'Không gian — Giới thiệu trải nghiệm quán'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_19d1c6f52-1774325655936.png', 'caption' => 'Liên hệ & Bản đồ — Dễ tìm đường'],
            ],
        ],
        [
            'slug'    => 'minh-tuan-photo',
            'content' => '<p>Minh Tuấn là nhiếp ảnh gia chuyên nghiệp tại Đà Nẵng, chuyên chụp ảnh sự kiện doanh nghiệp, cưới hỏi và portrait. Cần portfolio website tối giản, sang trọng để thu hút khách hàng doanh nghiệp cao cấp.</p>',
            'fields'  => [
                'portfolio_location'             => 'Đà Nẵng',
                'portfolio_duration'             => '5 ngày',
                'portfolio_year'                 => '2024',
                'portfolio_challenge'            => 'Minh Tuấn chủ yếu nhận việc qua mạng xã hội nhưng thiếu sự chuyên nghiệp khi tiếp cận khách doanh nghiệp. Cần một portfolio website thể hiện đẳng cấp và tạo niềm tin với khách hàng B2B.',
                'portfolio_solution'             => 'Thiết kế portfolio website với giao diện đen trắng tối giản, gallery ảnh tốc độ cao, trang giới thiệu dịch vụ rõ ràng và form liên hệ chuyên nghiệp. Tối ưu SEO cho từ khóa "nhiếp ảnh doanh nghiệp Đà Nẵng".',
                'portfolio_testimonial_name'     => 'Minh Tuấn',
                'portfolio_testimonial_role'     => 'Nhiếp ảnh gia, Đà Nẵng',
                'portfolio_testimonial_quote'    => 'Từ khi có website, khách doanh nghiệp liên hệ nhiều hơn hẳn. Họ nói nhìn website thấy chuyên nghiệp nên mới dám thuê. Đây là khoản đầu tư tốt nhất mình từng làm.',
                'portfolio_demo_url'             => '',
            ],
            'tech'    => ['WordPress', 'Portfolio Theme', 'Gallery Lightbox', 'SEO', 'Contact Form', 'Lazy Loading'],
            'gallery' => [
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_138817c9c-1764782793767.png', 'caption' => 'Trang chủ — Tối giản, sang trọng'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_1d682778c-1767008426773.png', 'caption' => 'Gallery — Bố cục masonry chuyên nghiệp'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_189ab91e9-1772182273187.png', 'caption' => 'Dịch vụ & Giá — Rõ ràng, minh bạch'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_163d8dca6-1768133602485.png', 'caption' => 'Liên hệ — Form đặt lịch chuyên nghiệp'],
            ],
        ],
        [
            'slug'    => 'coaching-thanh-cong',
            'content' => '<p>Coaching Thành Công là trung tâm đào tạo kỹ năng sống và kinh doanh tại TP.HCM. Cần website chuyên nghiệp để giới thiệu khóa học, thu hút học viên và tích hợp đăng ký online.</p>',
            'fields'  => [
                'portfolio_location'             => 'TP.HCM',
                'portfolio_duration'             => '5 ngày',
                'portfolio_year'                 => '2024',
                'portfolio_challenge'            => 'Trung tâm đang phát triển nhanh nhưng việc quản lý đăng ký học viên qua Zalo và Facebook rất tốn thời gian. Cần hệ thống website tự động hóa quy trình đăng ký và thanh toán.',
                'portfolio_solution'             => 'Thiết kế website với trang giới thiệu khóa học chi tiết, hệ thống đăng ký online, tích hợp Zalo OA để chăm sóc học viên và tối ưu SEO cho từ khóa coaching tại TP.HCM.',
                'portfolio_testimonial_name'     => 'Anh Thành',
                'portfolio_testimonial_role'     => 'Giám đốc Coaching Thành Công, TP.HCM',
                'portfolio_testimonial_quote'    => 'Website giúp chúng tôi tiết kiệm rất nhiều thời gian xử lý đăng ký. Học viên có thể tự đăng ký và thanh toán 24/7. Doanh thu tăng rõ rệt chỉ sau 1 tháng.',
                'portfolio_demo_url'             => '',
            ],
            'tech'    => ['WordPress', 'LMS Plugin', 'Zalo OA', 'SEO', 'Payment Gateway', 'Email Marketing'],
            'gallery' => [
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_112127b74-1765392059924.png', 'caption' => 'Trang chủ — Chuyên nghiệp, uy tín'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_18b3867c0-1768239312455.png', 'caption' => 'Khóa học — Thông tin đầy đủ, dễ đăng ký'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_1a11d3b6a-1763300597589.png', 'caption' => 'Đội ngũ — Xây dựng niềm tin'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_18b3867c0-1768239312455.png', 'caption' => 'Đăng ký — Quy trình tự động hóa'],
            ],
        ],
        [
            'slug'    => 'thoi-trang-linh',
            'content' => '<p>Thời Trang Linh là chuỗi thời trang tại Hải Phòng, cần website thương mại điện tử để bán hàng online và mở rộng tệp khách hàng ra ngoài khu vực.</p>',
            'fields'  => [
                'portfolio_location'             => 'Hải Phòng',
                'portfolio_duration'             => '5 ngày',
                'portfolio_year'                 => '2024',
                'portfolio_challenge'            => 'Cần bán hàng online nhưng chỉ có fanpage Facebook, khó quản lý đơn hàng và tồn kho. Cần hệ thống website e-commerce chuyên nghiệp nhưng dễ quản trị.',
                'portfolio_solution'             => 'Thiết kế website WooCommerce với giao diện thời trang hiện đại, tích hợp thanh toán online, quản lý tồn kho và tối ưu SEO.',
                'portfolio_testimonial_name'     => 'Chị Linh',
                'portfolio_testimonial_role'     => 'Chủ Thời Trang Linh, Hải Phòng',
                'portfolio_testimonial_quote'    => '30% đơn hàng giờ đến từ website. Quản lý kho và đơn tiện hơn rất nhiều so với bán qua Facebook.',
                'portfolio_demo_url'             => '',
            ],
            'tech'    => ['WooCommerce', 'Flatsome Theme', 'SEO', 'Zalo', 'Payment Gateway', 'Inventory'],
            'gallery' => [
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_112127b74-1765392059924.png', 'caption' => 'Trang chủ — Giao diện thời trang hiện đại'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_18b3867c0-1768239312455.png', 'caption' => 'Sản phẩm — Bộ sưu tập mới nhất'],
            ],
        ],
        [
            'slug'    => 'dien-lanh-hoang',
            'content' => '<p>Điện Lạnh Hoàng Phát là doanh nghiệp sửa chữa và lắp đặt điều hòa tại Cần Thơ. Cần website để tăng độ tin cậy và thu hút khách hàng mới từ Google.</p>',
            'fields'  => [
                'portfolio_location'             => 'Cần Thơ',
                'portfolio_duration'             => '5 ngày',
                'portfolio_year'                 => '2024',
                'portfolio_challenge'            => 'Chỉ có khách quen giới thiệu, chưa có kênh online nào. Đối thủ đã lên top Google từ lâu, cần bắt kịp nhanh chóng.',
                'portfolio_solution'             => 'Thiết kế website dịch vụ chuyên nghiệp với bảng giá rõ ràng, nút gọi điện nổi, SEO local mạnh và tích hợp Google My Business.',
                'portfolio_testimonial_name'     => 'Anh Đức',
                'portfolio_testimonial_role'     => 'Chủ Điện Lạnh Hoàng Phát, Cần Thơ',
                'portfolio_testimonial_quote'    => 'Bây giờ 30% đơn đến từ website. Khách gọi nói "tìm thấy trên Google" — trước đó chỉ có khách quen giới thiệu thôi.',
                'portfolio_demo_url'             => '',
            ],
            'tech'    => ['WordPress', 'Flatsome Theme', 'Booking System', 'SEO Local', 'Google My Business', 'Click-to-Call'],
            'gallery' => [
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_138817c9c-1764782793767.png', 'caption' => 'Trang chủ — Chuyên nghiệp, đáng tin cậy'],
                ['image' => 'https://img.rocket.new/generatedImages/rocket_gen_img_1d682778c-1767008426773.png', 'caption' => 'Dịch vụ — Bảng giá rõ ràng'],
            ],
        ],
    ];

    $log = [];

    foreach ( $portfolios as $p ) {
        // Find post by slug
        $posts = get_posts([
            'post_type'   => 'portfolio',
            'name'        => $p['slug'],
            'numberposts' => 1,
            'post_status' => 'any',
        ]);

        if ( empty( $posts ) ) {
            $log[] = "⚠️ Not found: {$p['slug']}";
            continue;
        }

        $post_id = $posts[0]->ID;

        // Update content
        wp_update_post([
            'ID'           => $post_id,
            'post_content' => $p['content'],
        ]);

        // Update simple fields
        foreach ( $p['fields'] as $key => $value ) {
            update_field( $key, $value, $post_id );
        }

        // Update tech repeater
        if ( ! empty( $p['tech'] ) ) {
            $tech_rows = [];
            foreach ( $p['tech'] as $t ) {
                $tech_rows[] = [ 'tech_item' => $t ];
            }
            update_field( 'portfolio_tech', $tech_rows, $post_id );
        }

        // Update gallery repeater
        if ( ! empty( $p['gallery'] ) ) {
            $gallery_rows = [];
            foreach ( $p['gallery'] as $g ) {
                $gallery_rows[] = [
                    'gallery_image'   => $g['image'],
                    'gallery_caption' => $g['caption'],
                ];
            }
            update_field( 'portfolio_gallery', $gallery_rows, $post_id );
        }

        $log[] = "✅ Updated: {$p['slug']} (ID {$post_id})";
    }

    // Save log as transient so admin can see it
    set_transient( 'qpweb_import_log', $log, 300 );

    // Show admin notice
    add_action( 'admin_notices', function () {
        $log = get_transient( 'qpweb_import_log' );
        if ( $log ) {
            echo '<div class="notice notice-success"><p><strong>QPWeb Import Portfolio Details:</strong></p><ul>';
            foreach ( $log as $line ) {
                echo "<li>{$line}</li>";
            }
            echo '</ul></div>';
            delete_transient( 'qpweb_import_log' );
        }
    });
}

/* Show import results on admin page */
add_action( 'admin_notices', function () {
    $log = get_transient( 'qpweb_import_log' );
    if ( $log ) {
        echo '<div class="notice notice-success is-dismissible"><p><strong>QPWeb Import Portfolio Details — Kết quả:</strong></p><ul>';
        foreach ( $log as $line ) {
            echo "<li>{$line}</li>";
        }
        echo '</ul></div>';
        delete_transient( 'qpweb_import_log' );
    }
});
