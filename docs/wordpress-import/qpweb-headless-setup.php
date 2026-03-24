<?php
/**
 * Plugin Name:  QPWeb Headless Setup
 * Description:  Đăng ký CPT, Custom Taxonomy và SCF Field Groups cho project QPWeb headless WordPress.
 * Version:      1.0.0
 * Author:       QPWeb
 * Text Domain:  qpweb-headless
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/* ──────────────────────────────────────────────
 *  1. CUSTOM POST TYPES
 * ────────────────────────────────────────────── */

add_action( 'init', 'qpweb_register_post_types' );

function qpweb_register_post_types() {

    /* --- Dịch vụ (service) - đã tồn tại, đăng ký lại để đảm bảo REST --- */
    if ( ! post_type_exists( 'service' ) ) {
        register_post_type( 'service', [
            'labels'       => [
                'name'          => 'Dịch vụ',
                'singular_name' => 'Dịch vụ',
                'add_new_item'  => 'Thêm dịch vụ',
                'edit_item'     => 'Sửa dịch vụ',
            ],
            'public'       => true,
            'has_archive'  => false,
            'show_in_rest' => true,
            'rest_base'    => 'service',
            'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
            'menu_icon'    => 'dashicons-admin-tools',
        ]);
    }

    /* --- Portfolio - đã tồn tại --- */
    if ( ! post_type_exists( 'portfolio' ) ) {
        register_post_type( 'portfolio', [
            'labels'       => [
                'name'          => 'Portfolio',
                'singular_name' => 'Portfolio',
                'add_new_item'  => 'Thêm dự án',
                'edit_item'     => 'Sửa dự án',
            ],
            'public'       => true,
            'has_archive'  => true,
            'show_in_rest' => true,
            'rest_base'    => 'portfolio',
            'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
            'menu_icon'    => 'dashicons-portfolio',
        ]);
    }

    /* --- Testimonial (Đánh giá) - đã tồn tại --- */
    if ( ! post_type_exists( 'testimonial' ) ) {
        register_post_type( 'testimonial', [
            'labels'       => [
                'name'          => 'Đánh giá',
                'singular_name' => 'Đánh giá',
                'add_new_item'  => 'Thêm đánh giá',
                'edit_item'     => 'Sửa đánh giá',
            ],
            'public'       => true,
            'has_archive'  => false,
            'show_in_rest' => true,
            'rest_base'    => 'testimonial',
            'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
            'menu_icon'    => 'dashicons-format-quote',
        ]);
    }

    /* --- Gói giá --- */
    register_post_type( 'goi-gia', [
        'labels'       => [
            'name'          => 'Gói giá',
            'singular_name' => 'Gói giá',
            'add_new_item'  => 'Thêm gói giá',
            'edit_item'     => 'Sửa gói giá',
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,
        'rest_base'    => 'goi-gia',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'menu_icon'    => 'dashicons-money-alt',
    ]);

    /* --- Dịch vụ bổ sung (Addon) --- */
    register_post_type( 'addon', [
        'labels'       => [
            'name'          => 'Dịch vụ bổ sung',
            'singular_name' => 'Dịch vụ bổ sung',
            'add_new_item'  => 'Thêm dịch vụ bổ sung',
            'edit_item'     => 'Sửa dịch vụ bổ sung',
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,
        'rest_base'    => 'addon',
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-plus-alt',
    ]);

    /* --- Quy trình --- */
    register_post_type( 'quy-trinh', [
        'labels'       => [
            'name'          => 'Quy trình',
            'singular_name' => 'Quy trình',
            'add_new_item'  => 'Thêm bước',
            'edit_item'     => 'Sửa bước',
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,
        'rest_base'    => 'quy-trinh',
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-editor-ol',
    ]);

    /* --- FAQ --- */
    register_post_type( 'faq', [
        'labels'       => [
            'name'          => 'FAQ',
            'singular_name' => 'FAQ',
            'add_new_item'  => 'Thêm FAQ',
            'edit_item'     => 'Sửa FAQ',
        ],
        'public'       => true,
        'has_archive'  => false,
        'show_in_rest' => true,
        'rest_base'    => 'faq',
        'supports'     => [ 'title', 'editor', 'custom-fields' ],
        'menu_icon'    => 'dashicons-editor-help',
    ]);
}


/* ──────────────────────────────────────────────
 *  2. CUSTOM TAXONOMIES
 * ────────────────────────────────────────────── */

add_action( 'init', 'qpweb_register_taxonomies' );

function qpweb_register_taxonomies() {

    /* --- Danh mục dịch vụ --- */
    register_taxonomy( 'service-cat', [ 'service' ], [
        'labels'            => [
            'name'          => 'Danh mục dịch vụ',
            'singular_name' => 'Danh mục dịch vụ',
        ],
        'public'            => true,
        'hierarchical'      => true,
        'show_in_rest'      => true,
        'rest_base'         => 'service-cat',
        'show_admin_column' => true,
    ]);

    /* --- Danh mục portfolio (cập nhật nếu đã có portfolio_category) --- */
    if ( ! taxonomy_exists( 'portfolio-cat' ) && ! taxonomy_exists( 'portfolio_category' ) ) {
        register_taxonomy( 'portfolio-cat', [ 'portfolio' ], [
            'labels'            => [
                'name'          => 'Danh mục Portfolio',
                'singular_name' => 'Danh mục Portfolio',
            ],
            'public'            => true,
            'hierarchical'      => true,
            'show_in_rest'      => true,
            'rest_base'         => 'portfolio-cat',
            'show_admin_column' => true,
        ]);
    }

    /* --- Danh mục đánh giá --- */
    register_taxonomy( 'review-cat', [ 'testimonial' ], [
        'labels'            => [
            'name'          => 'Danh mục đánh giá',
            'singular_name' => 'Danh mục đánh giá',
        ],
        'public'            => true,
        'hierarchical'      => true,
        'show_in_rest'      => true,
        'rest_base'         => 'review-cat',
        'show_admin_column' => true,
    ]);

    /* --- Danh mục FAQ --- */
    register_taxonomy( 'faq-cat', [ 'faq' ], [
        'labels'            => [
            'name'          => 'Danh mục FAQ',
            'singular_name' => 'Danh mục FAQ',
        ],
        'public'            => true,
        'hierarchical'      => true,
        'show_in_rest'      => true,
        'rest_base'         => 'faq-cat',
        'show_admin_column' => true,
    ]);
}


/* ──────────────────────────────────────────────
 *  3. SECURE CUSTOM FIELDS (SCF) FIELD GROUPS
 *     Sử dụng acf_add_local_field_group()
 * ────────────────────────────────────────────── */

add_action( 'acf/init', 'qpweb_register_scf_fields' );

function qpweb_register_scf_fields() {

    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    /* ── 3.1  Dịch vụ (Service) Fields ── */
    acf_add_local_field_group([
        'key'      => 'group_qpweb_service',
        'title'    => 'QPWeb - Dịch vụ',
        'fields'   => [
            [
                'key'   => 'field_service_num',
                'label' => 'Số thứ tự',
                'name'  => 'service_num',
                'type'  => 'text',
                'instructions' => 'Số hiển thị: 01, 02, ...',
            ],
            [
                'key'   => 'field_service_short_desc',
                'label' => 'Mô tả ngắn',
                'name'  => 'service_short_desc',
                'type'  => 'textarea',
                'rows'  => 3,
            ],
            [
                'key'   => 'field_service_features',
                'label' => 'Tính năng',
                'name'  => 'service_features',
                'type'  => 'repeater',
                'sub_fields' => [
                    [
                        'key'   => 'field_service_feature_item',
                        'label' => 'Tính năng',
                        'name'  => 'feature_item',
                        'type'  => 'text',
                    ],
                ],
            ],
            [
                'key'   => 'field_service_icon_svg',
                'label' => 'SVG Icon',
                'name'  => 'service_icon_svg',
                'type'  => 'textarea',
                'rows'  => 4,
                'instructions' => 'Dán SVG code của icon',
            ],
            [
                'key'   => 'field_service_tag',
                'label' => 'Tag',
                'name'  => 'service_tag',
                'type'  => 'text',
                'instructions' => 'VD: WordPress, SEO, Zalo, ...',
            ],
            [
                'key'   => 'field_service_tag_color',
                'label' => 'Tag Color CSS',
                'name'  => 'service_tag_color',
                'type'  => 'text',
                'instructions' => 'VD: bg-blue-100 text-blue-700',
            ],
            [
                'key'   => 'field_service_color',
                'label' => 'Color CSS',
                'name'  => 'service_color',
                'type'  => 'text',
                'instructions' => 'VD: text-blue-brand',
            ],
            [
                'key'   => 'field_service_bg',
                'label' => 'Background CSS',
                'name'  => 'service_bg',
                'type'  => 'text',
                'instructions' => 'VD: bg-blue-50',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'service',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);


    /* ── 3.2  Portfolio Fields ── */
    acf_add_local_field_group([
        'key'      => 'group_qpweb_portfolio',
        'title'    => 'QPWeb - Portfolio',
        'fields'   => [
            [
                'key'   => 'field_portfolio_image',
                'label' => 'Ảnh dự án',
                'name'  => 'portfolio_image',
                'type'  => 'image',
                'return_format' => 'url',
            ],
            [
                'key'   => 'field_portfolio_client',
                'label' => 'Khách hàng',
                'name'  => 'portfolio_client',
                'type'  => 'text',
                'instructions' => 'VD: Spa Hương Thơm - TP.HCM',
            ],
            [
                'key'   => 'field_portfolio_result',
                'label' => 'Kết quả',
                'name'  => 'portfolio_result',
                'type'  => 'text',
                'instructions' => 'VD: +40% lượt đặt lịch qua web',
            ],
            [
                'key'   => 'field_portfolio_tech',
                'label' => 'Công nghệ',
                'name'  => 'portfolio_tech',
                'type'  => 'repeater',
                'sub_fields' => [
                    [
                        'key'   => 'field_portfolio_tech_item',
                        'label' => 'Tech',
                        'name'  => 'tech_item',
                        'type'  => 'text',
                    ],
                ],
            ],
            [
                'key'   => 'field_portfolio_tag_color',
                'label' => 'Tag Color CSS',
                'name'  => 'portfolio_tag_color',
                'type'  => 'text',
                'instructions' => 'VD: bg-pink-100 text-pink-700',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'portfolio',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);


    /* ── 3.3  Gói giá Fields ── */
    acf_add_local_field_group([
        'key'      => 'group_qpweb_pricing',
        'title'    => 'QPWeb - Gói giá',
        'fields'   => [
            [
                'key'   => 'field_pricing_price',
                'label' => 'Giá',
                'name'  => 'pricing_price',
                'type'  => 'text',
                'instructions' => 'VD: 3.500.000',
            ],
            [
                'key'   => 'field_pricing_short_desc',
                'label' => 'Mô tả ngắn',
                'name'  => 'pricing_short_desc',
                'type'  => 'textarea',
                'rows'  => 2,
            ],
            [
                'key'   => 'field_pricing_pages',
                'label' => 'Số trang',
                'name'  => 'pricing_pages',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_pricing_design',
                'label' => 'Thiết kế',
                'name'  => 'pricing_design',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_pricing_seo',
                'label' => 'SEO',
                'name'  => 'pricing_seo',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_pricing_warranty',
                'label' => 'Bảo hành',
                'name'  => 'pricing_warranty',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_pricing_features',
                'label' => 'Tính năng bao gồm',
                'name'  => 'pricing_features',
                'type'  => 'repeater',
                'sub_fields' => [
                    [
                        'key'   => 'field_pricing_feature_item',
                        'label' => 'Tính năng',
                        'name'  => 'feature_item',
                        'type'  => 'text',
                    ],
                ],
            ],
            [
                'key'   => 'field_pricing_not_included',
                'label' => 'Không bao gồm',
                'name'  => 'pricing_not_included',
                'type'  => 'repeater',
                'sub_fields' => [
                    [
                        'key'   => 'field_pricing_not_included_item',
                        'label' => 'Tính năng',
                        'name'  => 'not_included_item',
                        'type'  => 'text',
                    ],
                ],
            ],
            [
                'key'   => 'field_pricing_is_popular',
                'label' => 'Gói phổ biến nhất',
                'name'  => 'pricing_is_popular',
                'type'  => 'true_false',
                'ui'    => 1,
            ],
            [
                'key'   => 'field_pricing_cta',
                'label' => 'CTA Text',
                'name'  => 'pricing_cta',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_pricing_num',
                'label' => 'Số thứ tự',
                'name'  => 'pricing_num',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_pricing_color',
                'label' => 'Color CSS',
                'name'  => 'pricing_color',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_pricing_bg',
                'label' => 'Background CSS',
                'name'  => 'pricing_bg',
                'type'  => 'text',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'goi-gia',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);


    /* ── 3.4  Addon Fields ── */
    acf_add_local_field_group([
        'key'      => 'group_qpweb_addon',
        'title'    => 'QPWeb - Dịch vụ bổ sung',
        'fields'   => [
            [
                'key'   => 'field_addon_price',
                'label' => 'Giá',
                'name'  => 'addon_price',
                'type'  => 'text',
                'instructions' => 'VD: 500.000đ/tháng',
            ],
            [
                'key'   => 'field_addon_short_desc',
                'label' => 'Mô tả ngắn',
                'name'  => 'addon_short_desc',
                'type'  => 'text',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'addon',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);


    /* ── 3.5  Đánh giá (Testimonial) Fields ── */
    acf_add_local_field_group([
        'key'      => 'group_qpweb_testimonial',
        'title'    => 'QPWeb - Đánh giá',
        'fields'   => [
            [
                'key'   => 'field_review_role',
                'label' => 'Vai trò',
                'name'  => 'review_role',
                'type'  => 'text',
                'instructions' => 'VD: Coach Tư Duy Tích Cực',
            ],
            [
                'key'   => 'field_review_company',
                'label' => 'Công ty',
                'name'  => 'review_company',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_review_avatar',
                'label' => 'Ảnh đại diện',
                'name'  => 'review_avatar',
                'type'  => 'image',
                'return_format' => 'url',
            ],
            [
                'key'   => 'field_review_quote',
                'label' => 'Nội dung đánh giá',
                'name'  => 'review_quote',
                'type'  => 'textarea',
                'rows'  => 4,
            ],
            [
                'key'   => 'field_review_stars',
                'label' => 'Số sao',
                'name'  => 'review_stars',
                'type'  => 'number',
                'min'   => 1,
                'max'   => 5,
                'default_value' => 5,
            ],
            [
                'key'   => 'field_review_result',
                'label' => 'Kết quả',
                'name'  => 'review_result',
                'type'  => 'text',
                'instructions' => 'VD: +100% học viên mới từ Google',
            ],
            [
                'key'   => 'field_review_tag',
                'label' => 'Tag',
                'name'  => 'review_tag',
                'type'  => 'text',
                'instructions' => 'VD: Coaching, F&B, ...',
            ],
            [
                'key'   => 'field_review_tag_color',
                'label' => 'Tag Color CSS',
                'name'  => 'review_tag_color',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_review_num',
                'label' => 'Số thứ tự',
                'name'  => 'review_num',
                'type'  => 'text',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'testimonial',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);


    /* ── 3.6  Quy trình Fields ── */
    acf_add_local_field_group([
        'key'      => 'group_qpweb_process',
        'title'    => 'QPWeb - Quy trình',
        'fields'   => [
            [
                'key'   => 'field_step_num',
                'label' => 'Số bước',
                'name'  => 'step_num',
                'type'  => 'text',
                'instructions' => 'VD: 01, 02, ...',
            ],
            [
                'key'   => 'field_step_day',
                'label' => 'Ngày',
                'name'  => 'step_day',
                'type'  => 'text',
                'instructions' => 'VD: Ngày 1',
            ],
            [
                'key'   => 'field_step_short_desc',
                'label' => 'Mô tả ngắn',
                'name'  => 'step_short_desc',
                'type'  => 'textarea',
                'rows'  => 3,
            ],
            [
                'key'   => 'field_step_details',
                'label' => 'Chi tiết',
                'name'  => 'step_details',
                'type'  => 'repeater',
                'sub_fields' => [
                    [
                        'key'   => 'field_step_detail_item',
                        'label' => 'Chi tiết bước',
                        'name'  => 'detail_item',
                        'type'  => 'text',
                    ],
                ],
            ],
            [
                'key'   => 'field_step_icon_svg',
                'label' => 'SVG Icon',
                'name'  => 'step_icon_svg',
                'type'  => 'textarea',
                'rows'  => 4,
            ],
            [
                'key'   => 'field_step_color',
                'label' => 'Color CSS',
                'name'  => 'step_color',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_step_bg',
                'label' => 'Background CSS',
                'name'  => 'step_bg',
                'type'  => 'text',
            ],
            [
                'key'   => 'field_step_border_color',
                'label' => 'Border Color CSS',
                'name'  => 'step_border_color',
                'type'  => 'text',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'quy-trinh',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);


    /* ── 3.7  FAQ Fields ── */
    acf_add_local_field_group([
        'key'      => 'group_qpweb_faq',
        'title'    => 'QPWeb - FAQ',
        'fields'   => [
            [
                'key'   => 'field_faq_answer',
                'label' => 'Câu trả lời',
                'name'  => 'faq_answer',
                'type'  => 'textarea',
                'rows'  => 5,
                'instructions' => 'Title = Câu hỏi, field này = Câu trả lời',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'faq',
                ],
            ],
        ],
        'show_in_rest' => true,
    ]);
}


/* ──────────────────────────────────────────────
 *  4. EXPOSE SCF FIELDS TO REST API
 *     Đảm bảo tất cả meta fields hiển thị trong REST response
 * ────────────────────────────────────────────── */

add_action( 'init', 'qpweb_register_meta_rest' );

function qpweb_register_meta_rest() {

    $meta_map = [
        'service'     => [
            'service_num', 'service_short_desc', 'service_features',
            'service_icon_svg', 'service_tag', 'service_tag_color',
            'service_color', 'service_bg',
        ],
        'portfolio'   => [
            'portfolio_image', 'portfolio_client', 'portfolio_result',
            'portfolio_tech', 'portfolio_tag_color',
        ],
        'goi-gia'     => [
            'pricing_price', 'pricing_short_desc', 'pricing_pages',
            'pricing_design', 'pricing_seo', 'pricing_warranty',
            'pricing_features', 'pricing_not_included', 'pricing_is_popular',
            'pricing_cta', 'pricing_num', 'pricing_color', 'pricing_bg',
        ],
        'addon'       => [ 'addon_price', 'addon_short_desc' ],
        'testimonial' => [
            'review_role', 'review_company', 'review_avatar', 'review_quote',
            'review_stars', 'review_result', 'review_tag', 'review_tag_color',
            'review_num',
        ],
        'quy-trinh'   => [
            'step_num', 'step_day', 'step_short_desc', 'step_details',
            'step_icon_svg', 'step_color', 'step_bg', 'step_border_color',
        ],
        'faq'         => [ 'faq_answer' ],
    ];

    foreach ( $meta_map as $post_type => $fields ) {
        foreach ( $fields as $meta_key ) {
            register_post_meta( $post_type, $meta_key, [
                'show_in_rest'  => true,
                'single'        => true,
                'type'          => 'string',
                'auth_callback' => '__return_true',
            ]);
        }
    }
}


/* ──────────────────────────────────────────────
 *  5. THÊM SCF FIELDS VÀO REST RESPONSE
 *     Inject acf fields vào REST response cho mỗi CPT
 * ────────────────────────────────────────────── */

add_action( 'rest_api_init', 'qpweb_add_acf_to_rest' );

function qpweb_add_acf_to_rest() {

    $post_types = [ 'service', 'portfolio', 'goi-gia', 'addon', 'testimonial', 'quy-trinh', 'faq' ];

    foreach ( $post_types as $pt ) {
        register_rest_field( $pt, 'acf', [
            'get_callback' => function ( $object ) {
                if ( function_exists( 'get_fields' ) ) {
                    return get_fields( $object['id'] ) ?: [];
                }
                return [];
            },
            'schema' => [
                'type'        => 'object',
                'description' => 'SCF/ACF custom fields',
            ],
        ]);
    }
}


/* ──────────────────────────────────────────────
 *  6. ENABLE CORS CHO HEADLESS FRONTEND
 * ────────────────────────────────────────────── */

add_action( 'rest_api_init', function () {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function ( $value ) {
        $origin = get_http_origin();
        $allowed = [
            'https://qpweb.io.vn',
            'http://localhost:4028',
            'http://localhost:3000',
        ];
        if ( in_array( $origin, $allowed, true ) ) {
            header( 'Access-Control-Allow-Origin: ' . $origin );
        }
        header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
        return $value;
    });
});
