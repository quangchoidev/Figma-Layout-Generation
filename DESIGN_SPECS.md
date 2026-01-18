# HỆ THỐNG THIẾT KẾ TOÀN DIỆN (ULTIMATE DESIGN SYSTEM) - BOOKVN v6.0

> **Sứ mệnh:** Xây dựng nền tảng thương mại điện tử sách chuyên nghiệp, hiện đại và tin cậy nhất Việt Nam.

---

## 🎨 1. CORE DESIGN TOKENS

### A. Màu Sắc (Color Palette)
- **Primary:** `#FF6B35` (Cam) | **Primary Dark:** `#D9531E` (Dành cho Hover)
- **Secondary:** `#1F2937` (Dark Navy) | **Secondary Light:** `#374151`
- **Functional:** 
    - Success: `#10B981` (Xanh lục)
    - Error: `#EF4444` (Đỏ)
    - Warning: `#F59E0B` (Vàng cam)
- **Neutrals:**
    - Background: `#F9FAFB` (Trắng xám)
    - Card/Surface: `#FFFFFF` (Trắng)
    - Border: `#E5E7EB` (Xám nhạt)
- **Interaction:**
    - Shadow Small: `0 1px 2px rgba(0,0,0,0.05)`
    - Shadow Medium: `0 4px 6px rgba(0,0,0,0.1)`
    - Glow Primary: `0 0 20px rgba(255,107,53,0.3)`

### B. Typography (Inter Font Family)
- **Logo:** 24px | ExtraBold (800)
- **H1 (Hero):** 64px | ExtraBold (800) | Line-height 1.1
- **H2 (Section):** 36px | Bold (700) | Line-height 1.2
- **H3 (Sub):** 24px | Bold (700) | Line-height 1.3
- **Body Large:** 18px | Regular (400)
- **Body Base:** 16px | Regular (400)
- **Caption:** 14px | Medium (500)
- **Label/Nav:** 14px | Bold (700)

---

## 💠 2. THƯ VIỆN LINH KIỆN (COMPONENT LIBRARY)

1. **Buttons:**
    - **Pill Primary:** Radius full, Orange bg, White text.
    - **Square Secondary:** Radius 12px, White bg, Border gray, Black text.
    - **Icon Button:** Hình tròn 40x40px, nền mờ (Glassmorphism).
2. **Cards:**
    - **Product Card:** Image (3:4 ratio), Title, Author, Price (Primary color), Add to Cart button (Pill).
    - **Blog Card:** Thumbnail ngang, Category badge, Title, Date.
    - **Review Card:** User avatar, Name, Star rating, Comment content.
3. **Form Elements:**
    - **Input:** Cao 56px, Radius 12px, Label nổi.
    - **Dropdown:** Dropdown menu bóng đổ lớn, Radius 16px.
    - **Stepper:** - [ 1 ] + (Dùng trong giỏ hàng).
4. **Navigation:**
    - **Unified Header:** Sticky, Glassmorphism, Search bar tích hợp.
    - **Mega Menu:** Dropdown rộng hiển thị tất cả danh mục sách.
    - **Mobile Bottom Nav:** (Dành cho bản mobile).

---

## 🗺️ 3. KIẾN TRÚC THÔNG TIN (INFORMATION ARCHITECTURE - 15+ PAGES)

### Nhóm 1: Public & Discovery
- **01. Trang Chủ (Home):** Hero, Flash Sale, Categories, Best Sellers, Blog Highlights.
- **02. Cửa Hàng (Shop Grid):** Bộ lọc nâng cao, Sắp xếp, Lưới sản phẩm.
- **03. Thư Viện (Shop List):** Hiển thị dạng danh sách chi tiết.
- **04. Chi Tiết Sách (Product Detail):** Ảnh lớn, Thông số, Mô tả dài, Đánh giá, Sách liên quan.
- **05. Blog Tin Tức (Blog List):** Danh sách bài viết, Danh mục blog.
- **06. Bài Viết Chi Tiết (Blog Post):** Nội dung bài viết, Comment.
- **07. Tìm Kiếm (Search):** Kết quả tìm kiếm, Gợi ý từ khóa.

### Nhóm 2: Thương Mại (Ecommerce)
- **08. Giỏ Hàng (Cart Page):** Danh sách sách chọn, Mã giảm giá, Tổng tiền.
- **09. Thanh Toán - Bước 1 (Checkout Shipping):** Địa chỉ, Phương thức vận chuyển.
- **10. Thanh Toán - Bước 2 (Checkout Payment):** Chọn phương thức thanh toán.
- **11. Hoàn Tất (Order Success):** Cảm ơn, Mã đơn hàng, Tracking link.

### Nhóm 3: Tài Khoản & Hỗ Trợ (User & Support)
- **12. Đăng Nhập/Đăng Ký (Auth):** Form linh hoạt, Social login.
- **13. Dashboard:** Tổng quan tài khoản, Đơn hàng gần đây.
- **14. Đơn Hàng Của Tôi (My Orders):** Danh sách, Trạng thái (Chờ duyệt, Đang giao...).
- **15. Hồ Sơ Cá Nhân (Profile Settings):** Đổi ảnh, Đổi mật khẩu, Địa chỉ.
- **16. Về Chúng Tôi (About Us):** Đội ngũ, Sứ mệnh, Liên hệ.

---

## 📏 4. QUY TẮC BỐ CỤC (GRID & LAYOUT)
- **Container Center:** 1280px.
- **Gutters:** 32px.
- **Column Count:** 12 Columns.
- **Vertical Spacing:** 160px giữa các section lớn.
