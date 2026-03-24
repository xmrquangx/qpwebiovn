---
description: Triển khai project Next.js lên Vercel với headless WordPress backend
---

# Triển khai project lên Vercel

Khi người dùng nói **"triển khai project này lên vercel"**, thực hiện các bước sau.

## Bước 1: Quét project
// turbo
Đọc SKILL.md tại `codex-skills/headless-wordpress-vercel-pipeline/SKILL.md` để nạp hướng dẫn chi tiết.

1. Quét toàn bộ cấu trúc project: routes, pages, components, static data, metadata, env, dependencies.
2. Kiểm tra blockers: Git status, node_modules, build issues, encoding.
3. Tổng hợp danh sách dữ liệu tĩnh (hardcoded arrays/objects) cần chuyển sang WordPress.

## Bước 2: Phân tích & đề xuất cấu hình WordPress
Từ dữ liệu mẫu trong project, tạo bảng đề xuất:
- **Custom Post Type (CPT)**: tên, slug, REST route
- **Custom Taxonomy (CT)**: tên, slug, gắn với CPT nào
- **Secure Custom Fields (SCF)**: mỗi CPT/CT cần những field gì (field name, field type, mô tả)
- **Route mapping**: mỗi route frontend tương ứng với CPT/endpoint nào

Trình bày dưới dạng bảng markdown rõ ràng, gửi cho user duyệt qua `notify_user`.

## Bước 3: Chờ duyệt cấu trúc
**KHÔNG tạo file import cho đến khi user xác nhận cấu trúc.**
Nếu user yêu cầu thay đổi, cập nhật đề xuất và gửi lại.

## Bước 4: Tạo file import WordPress
Sau khi được duyệt:
1. Tạo file WXR XML chuẩn WordPress (dùng WordPress Importer mặc định).
2. Bao gồm: pages, CPT posts, taxonomy terms, term assignments, post meta cho SCF fields.
3. Giữ slug ổn định để khớp với frontend routing.
4. Lưu file tại `docs/wordpress-import/`.

## Bước 5: Sửa frontend Next.js
1. Tạo data layer tại `src/lib/wordpress/` (API client, types, helpers).
2. Lấy dữ liệu từ `https://api.qpweb.io.vn` qua WordPress REST API.
3. Thay thế dữ liệu hardcoded bằng API data, bắt đầu từ route-critical pages.
4. Giữ nguyên design và route structure hiện tại.
5. Cập nhật `.env` với `NEXT_PUBLIC_WP_API_URL=https://api.qpweb.io.vn`.
6. Cập nhật `NEXT_PUBLIC_SITE_URL=https://qpweb.io.vn`.

## Bước 6: Build & kiểm tra
// turbo
```powershell
npm.cmd run build
```
- Fix mọi lỗi type/build/runtime blocking.
- Kiểm tra lại output.

## Bước 7: Đẩy code lên Git
Chỉ commit & push khi workspace là Git repo thực sự:
```powershell
git add -A
git commit -m "feat: integrate headless WordPress backend"
git push
```
Nhắc user kiểm tra Vercel environment variables và domain settings.

## Bước 8: Tổng hợp kiến thức
Cập nhật skill `codex-skills/headless-wordpress-vercel-pipeline/SKILL.md` với:
- Schema conventions mới
- Edge cases phát hiện được
- Import conventions đã học
