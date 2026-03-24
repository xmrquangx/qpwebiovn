# Headless WordPress Audit

## Project summary

- Frontend stack: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS.
- Current data source: hardcoded arrays and objects inside `src/app/**` and `src/components/**`.
- Intended domains:
  - WordPress API: `https://api.qpweb.io.vn`
  - Next.js frontend: `https://qpweb.io.vn`
- Current deployment blockers found during scan:
  - This workspace is not a Git working tree, so push steps cannot run here yet.
  - `node_modules` is missing, so `next build` cannot run yet.
  - `NEXT_PUBLIC_SITE_URL` in `.env` is still pointing to a Rocket-generated domain.
  - A large part of Vietnamese copy appears mojibake-encoded in source files; this must be normalized before import, or WordPress will receive broken text.

## Current content inventory

| Area | Current source | Recommended WP object |
| --- | --- | --- |
| Home hero, trust stats, homepage section copy | hardcoded in home components | native `page` + SCF fields |
| Services page | `src/app/dich-vu/page.tsx` | CPT `service` |
| Service target audiences | `src/app/dich-vu/page.tsx` | taxonomy `client_segment` |
| Pricing plans | `src/app/gia/page.tsx`, `src/app/home/components/PricingSection.tsx` | CPT `pricing_plan` |
| Pricing add-ons | `src/app/gia/page.tsx` | CPT `pricing_addon` |
| Portfolio listing + detail | `src/app/portfolio/page.tsx`, `src/app/portfolio/[slug]/page.tsx` | CPT `case_study` |
| Portfolio categories | portfolio pages | taxonomy `case_study_category` |
| Testimonials | `src/app/khach-hang/page.tsx`, `src/app/home/components/TestimonialsSection.tsx` | CPT `testimonial` |
| Process steps | `src/app/quy-trinh/page.tsx`, `src/app/home/components/ProcessSection.tsx` | CPT `process_step` |
| FAQs | home, pricing, process pages | CPT `faq_item` + taxonomy `faq_group` |
| Contact methods and business info | `src/app/lien-he/page.tsx`, layout metadata | native `page` + SCF fields |

## Recommended WordPress model

### 1. CPT `service`

| Field | Type | Notes |
| --- | --- | --- |
| title | WP title | Service name |
| slug | WP slug | Stable frontend route key |
| excerpt | WP excerpt | Short card description |
| content | WP editor | Full service page/body if needed later |
| `service_icon` | text | Store icon key, not inline SVG |
| `service_number` | text | `01`, `02`, ... |
| `service_tag` | text | WordPress, SEO, Zalo... |
| `service_tag_color` | text | CSS token only if really needed |
| `service_theme_color` | text | optional design token |
| `service_intro` | textarea | Long description used on listing/detail |
| `service_features` | repeater | Feature list |
| `service_cta_label` | text | Optional CTA override |
| `service_cta_url` | text | Optional CTA override |

Taxonomies:

- `client_segment`: Coach, Nhiếp ảnh gia, TikToker, F&B, Spa, SME

### 2. CPT `pricing_plan`

| Field | Type | Notes |
| --- | --- | --- |
| title | WP title | Basic, Standard, Pro |
| slug | WP slug | `basic`, `standard`, `pro` |
| `plan_price` | text | Keep formatted VND string or split numeric/display |
| `plan_description` | textarea | Card description |
| `plan_pages` | text | 5 trang, 10 trang... |
| `plan_design` | text | Template/custom design summary |
| `plan_seo` | text | SEO summary |
| `plan_warranty` | text | 3 tháng, 6 tháng... |
| `plan_features` | repeater | Included features |
| `plan_exclusions` | repeater | Not included items |
| `plan_popular` | true/false | Highlight flag |
| `plan_cta_label` | text | Button text |
| `plan_order` | number | Sort order |

### 3. CPT `pricing_addon`

| Field | Type | Notes |
| --- | --- | --- |
| title | WP title | Add-on name |
| `addon_price` | text | Formatted price |
| `addon_description` | textarea | Short description |
| `addon_order` | number | Sort order |

### 4. CPT `case_study`

| Field | Type | Notes |
| --- | --- | --- |
| title | WP title | Project title |
| slug | WP slug | Used by `/portfolio/[slug]` |
| excerpt | WP excerpt | Listing summary |
| content | WP editor | Optional long-form body |
| featured image | media | Main listing image |
| `case_client_name` | text | Client display name |
| `case_location` | text | TP.HCM, Hà Nội... |
| `case_duration` | text | 5 ngày |
| `case_year` | text | 2024 |
| `case_result_headline` | text | Main outcome |
| `case_challenge` | textarea | Challenge section |
| `case_solution` | textarea | Solution section |
| `case_tech_stack` | repeater | Technology list |
| `case_result_stats` | repeater | icon, value, label |
| `case_gallery` | repeater | image, alt, caption |
| `case_testimonial_text` | textarea | Embedded testimonial |
| `case_testimonial_author` | text | Author name |
| `case_testimonial_role` | text | Author role |
| `case_demo_url` | url | Optional live demo |
| `case_client_segment_label` | text | Optional if not modeled by taxonomy |

Taxonomies:

- `case_study_category`: Spa & Beauty, F&B, Nhiếp ảnh, Coaching, Thời trang, Dịch vụ, Doanh nghiệp
- `client_segment`: optional shared taxonomy for cross-filtering services, testimonials, case studies

### 5. CPT `testimonial`

| Field | Type | Notes |
| --- | --- | --- |
| title | WP title | Usually person name |
| excerpt | WP excerpt | Short quote if needed |
| featured image | media | Avatar |
| `testimonial_role` | text | Role |
| `testimonial_company` | text | Company |
| `testimonial_quote` | textarea | Full quote |
| `testimonial_rating` | number | Usually 5 |
| `testimonial_result` | text | Result summary |
| `testimonial_number` | text | `01`... |
| `testimonial_alt` | text | Avatar alt text |

Taxonomies:

- `client_segment`

### 6. CPT `process_step`

| Field | Type | Notes |
| --- | --- | --- |
| title | WP title | Step name |
| `step_number` | text | `01`... |
| `step_day` | text | Ngày 1, Ngày 2... |
| `step_summary` | textarea | Short description |
| `step_details` | repeater | Bullet items |
| `step_icon_key` | text | Store icon identifier |
| `step_order` | number | Sort order |

### 7. CPT `faq_item`

| Field | Type | Notes |
| --- | --- | --- |
| title | WP title | Question |
| content | WP editor | Answer |
| `faq_order` | number | Sort order |

Taxonomies:

- `faq_group`: `home`, `pricing`, `process`

### 8. Native pages

Use WordPress native pages for:

- Home
- Dịch vụ
- Portfolio
- Quy trình
- Khách hàng
- Giá
- Liên hệ

These pages should mainly hold page-level SEO, intro copy, and curation references:

| Page | Suggested SCF fields |
| --- | --- |
| Home | hero title, hero subtitle, hero stats, featured service IDs, featured case study IDs, featured testimonial IDs, featured FAQ group |
| Services | hero copy, target audience cards, CTA copy |
| Portfolio | hero copy, stats, featured category order |
| Pricing | hero copy, pricing FAQs group, CTA copy |
| Process | hero copy, guarantees repeater, FAQ group |
| Clients | hero copy, stats repeater, trust badges repeater |
| Contact | hero copy, hotline, zalo URL, email, working hours repeater |

## Secure Custom Fields guidance

- Keep all SCF field names lowercase snake_case.
- Prefer repeaters for lists currently rendered from arrays.
- Avoid storing presentation classes like `bg-pink-100 text-pink-700` unless the frontend truly depends on them.
- Prefer semantic values and map them to design tokens in Next.js.
- If the frontend will fetch via WP REST API, make sure:
  - CPTs and taxonomies are registered with `show_in_rest = true`
  - required meta fields are exposed to REST, either via registered meta or a custom REST response mapper

## Route mapping recommendation

| Frontend route | WordPress source |
| --- | --- |
| `/home` | page `home` + related queries |
| `/dich-vu` | page `dich-vu` + query `service` |
| `/portfolio` | page `portfolio` + query `case_study` |
| `/portfolio/[slug]` | single `case_study` by slug |
| `/quy-trinh` | page `quy-trinh` + query `process_step` + `faq_group=process` |
| `/khach-hang` | page `khach-hang` + query `testimonial` |
| `/gia` | page `gia` + queries `pricing_plan`, `pricing_addon`, `faq_group=pricing` |
| `/lien-he` | page `lien-he` |

## Import format recommendation

For step 3 of the workflow, use WordPress WXR XML, because it matches the default WordPress importer flow and supports:

- native pages
- CPT posts
- custom taxonomies and term assignments
- post meta for SCF fields

What should be generated after structure approval:

- `pages.xml` for native pages
- `content.xml` for CPT entries and taxonomy terms
- optional `media-map.csv` if images need manual media re-linking

## Integration recommendation for Next.js

- Use WordPress REST API as default transport to avoid depending on extra plugins.
- Create a dedicated data layer under something like `src/lib/wordpress/`.
- Normalize WP responses into frontend-friendly shapes before passing into components.
- Refactor hardcoded arrays into:
  - page queries
  - collection queries
  - relationship-based homepage sections
- Keep static fallbacks only during migration.

## First-pass implementation priorities when you say "triển khai project này lên vercel"

1. Normalize text encoding issues in source/sample data first.
2. Freeze the WordPress content model and SCF field names.
3. Generate WXR import files from approved sample data.
4. Replace hardcoded frontend content with WP fetchers.
5. Update `.env` and metadata to `qpweb.io.vn`.
6. Install deps, run `build`, then push from the actual Git repo.
