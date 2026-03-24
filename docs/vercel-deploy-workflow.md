# Vercel Deployment Workflow

## Trigger phrase

When you say: `triển khai project này lên vercel`

the workflow for this project should run in this order.

## Standard workflow

1. Quét project
   - inspect routes, hardcoded content, metadata, env, and existing data layer
   - detect deployment blockers: Git status, dependencies, build issues, encoding issues

2. Phân tích và đề xuất backend WordPress
   - build a project-specific content model
   - propose CPT, custom taxonomy, and Secure Custom Fields
   - map every page and reusable section to WordPress objects
   - flag risks before implementation

3. Chờ duyệt cấu trúc
   - no import file generation before structure approval
   - lock field names only after approval

4. Tạo file import chuẩn WordPress
   - generate WXR XML for native pages, CPTs, taxonomies, and SCF post meta
   - keep slugs stable to match frontend routing

5. Sửa frontend Next.js để lấy dữ liệu từ WordPress
   - create WordPress data layer
   - fetch from `https://api.qpweb.io.vn`
   - replace hardcoded content with API-backed data
   - preserve current design and route structure

6. Kiểm tra và build
   - install dependencies if needed
   - run `npm.cmd run build`
   - fix blocking type/build/runtime issues

7. Đẩy code
   - commit only when inside the actual Git repository
   - push to the connected remote
   - confirm Vercel environment variables and production domain settings

8. Tổng hợp kiến thức
   - update the reusable skill for this workflow
   - add any new schema rules, edge cases, or import conventions learned from the project

## Required checks before implementation

- Confirm the workspace is the real Git repo, not just an exported source folder.
- Confirm `node_modules` exists or dependencies can be installed.
- Confirm WordPress CPT/taxonomy/meta are exposed to REST.
- Confirm text encoding is valid UTF-8 before generating import files.
- Confirm `NEXT_PUBLIC_SITE_URL` matches `https://qpweb.io.vn`.

## Project-specific notes from current scan

- This repo is currently frontend-only and content-heavy.
- Most data can be migrated cleanly into WordPress without changing routes.
- Homepage, pricing, process, and testimonials repeat data that should be centralized in WP entities.
- The current contact form is local UI only; if needed later, form submission should be routed to WP, email, or another backend service.
