# Tối Ưu Landing Page Trang Chủ — QPWeb Agency

> Ngày: 2026-04-25 | Mục tiêu: Tăng conversion (Zalo mess + form liên hệ)

---

## AUDIT TRANG CHỦ HIỆN TẠI

### Cấu trúc (7 sections)

| # | Section | Đánh giá |
|---|---------|----------|
| 1 | Hero — H1 + 2 CTA + 3 stats | ✅ Tốt — H1 rõ USP |
| 2 | Advantages — 4 cards + trust badges | ✅ Tốt |
| 3 | Pricing — 3 gói giá | ✅ Tốt — anchor pricing |
| 4 | Portfolio — gallery dự án | ✅ Tốt |
| 5 | Process — 6 bước quy trình | ⚠️ Thiếu outcome |
| 6 | Testimonials — 4 reviews 5 sao | ✅ Tốt |
| 7 | FAQ + CTA panel | ⚠️ Cần cải thiện |

### 7 Vấn đề phát hiện

| # | Vấn đề | Mức độ |
|---|--------|--------|
| 1 | **Thiếu section "Problem"** — nhảy từ Hero sang Advantages, chưa chạm nỗi đau | 🔴 CRITICAL |
| 2 | **CTA scroll đến #contact nhưng KHÔNG CÓ FORM** — chỉ có link Zalo | 🔴 CRITICAL |
| 3 | **Thiếu yếu tố khẩn cấp** — không countdown, không giới hạn slot | 🟡 HIGH |
| 4 | **Sub-headline quá kỹ thuật** — "Flatsome WordPress chuẩn SEO local" | 🟡 HIGH |
| 5 | **Badge hero nói về mình, không nói về khách** | 🟢 MEDIUM |
| 6 | **Portfolio thiếu "trước/sau"** — chỉ show hình, không show kết quả | 🟢 MEDIUM |
| 7 | **Process thiếu outcome** — chỉ mô tả bước, không nói kết quả | ⚪ LOW |

---

## 9 THAY ĐỔI CỤ THỂ

### 🔴 P0: Thêm Contact Form (CRITICAL)

**Vấn đề:** CTA "Tư vấn miễn phí" scroll đến `#contact` nhưng không có form.

**Giải pháp:** Tạo `ContactFormSection.tsx` đặt sau FAQ, trước Footer:
- **Headline:** "Nhận báo giá trong 30 phút"
- **Fields:** Tên + SĐT/Zalo + Dropdown ngành (3 trường)
- **CTA:** "🚀 Nhận báo giá miễn phí" (cam, full-width mobile)
- **Dưới button:** "Bảo mật · Không spam · Phản hồi 30 phút"
- **Bên cạnh (desktop):** Zalo + Hotline + 3 trust stats

> [!IMPORTANT]
> Đây là thay đổi ảnh hưởng lớn nhất — hiện tại khách click CTA nhưng không có form để điền.

---

### 🔴 P0: Thêm Problem Section (CRITICAL)

**Vị trí:** Giữa Hero và Advantages

**Nội dung:**
```
"Bạn có đang gặp những vấn đề này?"

• Bán hàng chỉ qua Facebook — reach giảm 70%, khách không tìm thấy trên Google
• Từng thuê làm web nhưng bị giao muộn, không đẹp, không hỗ trợ sau bàn giao
• Đối thủ đã có website đẹp — bạn gửi link Facebook cho khách thì mất uy tín
• Muốn có website nhưng sợ tốn tiền, sợ phức tạp, không biết bắt đầu từ đâu

"Nếu gặp ít nhất 1 điều trên — QPWeb giải quyết trong 5 ngày."
```

**File mới:** `src/app/home/components/ProblemSection.tsx`

---

### 🟡 P1: Sửa Sub-headline Hero (HIGH)

**File:** [HeroSection.tsx](file:///e:/Headless/webagencyvn/src/app/home/components/HeroSection.tsx#L168-L177)

**Hiện tại:**
> "Flatsome WordPress chuẩn SEO local, tích hợp chat Zalo — cho freelancer, coaches, TikTokers, quán cà phê & SME."

**Đề xuất:**
> "Khách hàng tìm bạn trên Google thay vì chỉ Facebook — website chuyên nghiệp, chuẩn SEO, tích hợp Zalo. Giao đúng 5 ngày, bảo hành 6 tháng."

**Lý do:** Nói KẾT QUẢ thay vì tính năng kỹ thuật.

---

### 🟡 P1: Thêm yếu tố khẩn cấp (HIGH)

**Áp dụng tại:** Hero (dưới CTA) + FAQ CTA panel

```
"🔥 Tháng 5: Chỉ nhận tối đa 10 dự án — còn [X] slot"
```

---

### 🟡 P1: Thêm Sticky CTA Mobile (HIGH)

**File mới:** `src/app/home/components/StickyCTA.tsx`

Thanh CTA cố định bottom mobile, hiện khi scroll qua Hero:
```
[📱 Nhắn Zalo]  [📞 Gọi ngay]
```

---

### 🟢 P2: Sửa Badge Hero

**Hiện tại:** "Freelancer · WordPress Flatsome · Việt Nam"
**Đề xuất:** "⭐ 120+ dự án · 5.0/5 đánh giá · Bàn giao 5 ngày"

---

### 🟢 P2: Sửa CTA Copy

| Vị trí | Hiện tại | Đề xuất |
|--------|----------|---------|
| Hero chính | "🚀 Tư vấn miễn phí" | "🚀 Nhận báo giá trong 30 phút" |
| Hero phụ | "Xem Portfolio →" | "Xem 120+ dự án đã làm →" |
| Pricing | "Chọn Standard" | "Chọn Standard — Nhắn Zalo ngay" |

---

### 🟢 P2: Portfolio thêm kết quả

Mỗi portfolio item thêm: tag ngành + kết quả (vd: "Leads Google +200%")

---

### ⚪ P3: Case Study Section

Sau Testimonials, trước FAQ — mini case study LanAnh Coaching (trước → giải pháp → kết quả).

---

## THỨ TỰ TRIỂN KHAI

| Tuần | Việc | Effort |
|------|------|--------|
| **Tuần 1** | #5 Contact Form + #3 Problem Section + #1 Sub-headline + #4 Urgency + #8 Sticky CTA | 1-2 ngày |
| **Tuần 2** | #2 Badge + #7 CTA copy + #6 Portfolio results | 2-3 giờ |
| **Tuần 3** | #9 Case Study section | 2-3 giờ |

---

## A/B TEST PLAN

### Vòng 1 (Tuần 1-2)
| Test | A (hiện tại) | B (mới) | Đo |
|------|-------------|---------|-----|
| Sub-headline | "Flatsome WordPress..." | "Khách tìm bạn trên Google..." | Click rate CTA |
| CTA hero | "Tư vấn miễn phí" | "Nhận báo giá trong 30 phút" | Form submit |

### Vòng 2 (Tuần 3-4)
| Test | A | B | Đo |
|------|---|---|-----|
| Form fields | 2 trường | 3 trường | Submission rate |
| Urgency | "Chỉ nhận 10 dự án" | Countdown timer | Click rate |

---

## TRACKING CẦN CÀI

| Sự kiện | Trigger | Platform |
|---------|---------|----------|
| ClickHeroCTA | Click CTA hero | GA4 + Meta Pixel |
| ClickZalo | Click link Zalo | GA4 + Meta Pixel |
| ClickPhone | Click hotline | GA4 |
| FormStart | Focus field đầu tiên | GA4 |
| FormSubmit | Submit thành công | GA4 + Meta Pixel (Lead) |
| ScrollDepth | 25/50/75/100% | GA4 |
