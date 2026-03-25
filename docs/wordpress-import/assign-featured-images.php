<?php
/**
 * QPWeb — Tự động gán Featured Image cho bài viết
 * 
 * CÁCH DÙNG:
 * 1. Dán code này vào cuối file plugin qpweb-headless-setup.php (Plugin Editor)
 * 2. Truy cập: https://api.qpweb.io.vn/wp-admin/?qpweb_assign_images=1
 * 3. Xong thì XÓA đoạn code này khỏi plugin
 */

add_action('admin_init', function () {
    if (!isset($_GET['qpweb_assign_images'])) return;
    if (!current_user_can('manage_options')) return;

    // Lấy tất cả media
    $media = get_posts([
        'post_type'      => 'attachment',
        'post_mime_type'  => 'image',
        'posts_per_page' => -1,
    ]);

    // Build map: filename (không ext) -> attachment ID
    $media_map = [];
    foreach ($media as $m) {
        $file = get_attached_file($m->ID);
        if ($file) {
            $name = pathinfo(basename($file), PATHINFO_FILENAME);
            $media_map[$name] = $m->ID;
        }
        // Also check by title
        $media_map[sanitize_title($m->post_title)] = $m->ID;
    }

    // Mapping: image_filename => [post_type, post_slug]
    $assignments = [
        // Portfolio
        'portfolio-spa-huong-thom'      => ['portfolio', 'spa-huong-thom'],
        'portfolio-the-brew-house'      => ['portfolio', 'the-brew-house'],
        'portfolio-minh-tuan-photo'     => ['portfolio', 'minh-tuan-photo'],
        'portfolio-coaching-thanh-cong' => ['portfolio', 'coaching-thanh-cong'],
        'portfolio-thoi-trang-linh'     => ['portfolio', 'thoi-trang-linh'],
        'portfolio-dien-lanh-hoang'     => ['portfolio', 'dien-lanh-hoang'],
        // Testimonial avatars
        'avatar-lan-anh'    => ['testimonial', 'nguyen-thi-lan-anh'],
        'avatar-minh-khoa'  => ['testimonial', 'tran-minh-khoa'],
        'avatar-thu-huong'  => ['testimonial', 'pham-thu-huong'],
        'avatar-van-duc'    => ['testimonial', 'le-van-duc'],
        'avatar-mai-linh'   => ['testimonial', 'vo-thi-mai-linh'],
        'avatar-hoang-nam'  => ['testimonial', 'nguyen-hoang-nam'],
    ];

    $results = [];
    $success = 0;
    $fail = 0;

    foreach ($assignments as $img_name => $info) {
        list($post_type, $post_slug) = $info;

        // Tìm media
        $attachment_id = $media_map[$img_name] ?? null;
        if (!$attachment_id) {
            $results[] = "❌ Không tìm thấy ảnh: {$img_name}";
            $fail++;
            continue;
        }

        // Tìm post
        $posts = get_posts([
            'post_type'   => $post_type,
            'name'        => $post_slug,
            'numberposts' => 1,
        ]);

        if (empty($posts)) {
            $results[] = "❌ Không tìm thấy post: [{$post_type}] {$post_slug}";
            $fail++;
            continue;
        }

        $post_id = $posts[0]->ID;
        set_post_thumbnail($post_id, $attachment_id);
        $results[] = "✅ {$img_name} → [{$post_type}] \"{$posts[0]->post_title}\" (Post #{$post_id}, Media #{$attachment_id})";
        $success++;
    }

    // Output
    $output = "<h1>QPWeb — Gán Featured Image</h1>";
    $output .= "<p><strong>{$success} thành công, {$fail} thất bại</strong></p>";
    $output .= "<pre>" . implode("\n", $results) . "</pre>";
    $output .= "<p><em>⚠️ Hãy xóa đoạn code này khỏi plugin sau khi hoàn tất!</em></p>";
    wp_die($output, 'QPWeb — Gán Featured Image');
});
