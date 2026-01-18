# BOOKVN - COMPLETE DESIGN SPECIFICATION v2.0

> **Mục đích:** Tài liệu kỹ thuật chi tiết cho Design System và UI của nền tảng thương mại điện tử sách BOOKVN.
> **Phạm vi:** 50+ Components, 16 Pages, Grid System, Typography Scale, Color Palette.

---

## 📐 PHẦN 1: DESIGN TOKENS (Thiết Kế Cơ Bản)

### 1.1 Color Palette (Bảng Màu)

#### Primary Colors (Màu Chính)
| Token Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| `primary` | `#FF6B35` | rgb(255, 107, 53) | CTA buttons, Links, Prices, Active states |
| `primary-hover` | `#D9531E` | rgb(217, 83, 30) | Hover state for primary elements |
| `primary-light` | `#FFF5F2` | rgb(255, 245, 242) | Hero backgrounds, Highlights |

#### Functional Colors (Màu Chức Năng)
| Token Name | Hex Code | Usage |
|------------|----------|-------|
| `success` | `#10B981` | Success messages, "In Stock" badges |
| `error` | `#EF4444` | Error states, Validation messages |
| `warning` | `#F59E0B` | Warning alerts, Limited stock |
| `info` | `#3B82F6` | Info messages, Tips |

#### Neutral Scale (Thang Màu Trung Tính)
| Token Name | Hex Code | Usage |
|------------|----------|-------|
| `neutral-50` | `#F9FAFB` | Page background |
| `neutral-100` | `#F3F4F6` | Card backgrounds, Disabled states |
| `neutral-200` | `#E5E7EB` | Borders, Dividers |
| `neutral-400` | `#9CA3AF` | Placeholder text, Muted text |
| `neutral-600` | `#4B5563` | Secondary text |
| `neutral-800` | `#1F2937` | Body text, Footer background |
| `neutral-900` | `#111827` | Headings, Primary text |

---

### 1.2 Typography Scale (Thang Chữ)

**Font Family:** Inter (Google Fonts)
**Available Weights:** 400 (Regular), 500 (Medium), 700 (Bold), 800 (ExtraBold)

| Style Name | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|------|--------|-------------|----------------|-------|
| **Display** | 64px | 800 | 1.1 (70px) | -0.02em | Hero headlines |
| **H1** | 48px | 800 | 1.2 (58px) | -0.01em | Page titles |
| **H2** | 36px | 700 | 1.2 (43px) | 0 | Section headings |
| **H3** | 24px | 700 | 1.3 (31px) | 0 | Subsection headings |
| **Body Large** | 18px | 400 | 1.5 (27px) | 0 | Intro paragraphs |
| **Body** | 16px | 400 | 1.5 (24px) | 0 | Default body text |
| **Caption** | 14px | 500 | 1.4 (20px) | 0 | Labels, Small text |
| **Button** | 14px | 700 | 1.0 (14px) | 0.02em | Button text |

---

### 1.3 Spacing Scale (Thang Khoảng Cách)

**Base Unit:** 8px (Grid system)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 8px | Tight spacing (icon-text gap) |
| `space-2` | 16px | Default spacing (form fields) |
| `space-3` | 24px | Medium spacing (card padding) |
| `space-4` | 32px | Large spacing (section padding) |
| `space-6` | 48px | XL spacing (between components) |
| `space-8` | 64px | 2XL spacing (hero padding) |
| `space-10` | 80px | Container side padding |
| `space-15` | 120px | Section vertical spacing |
| `space-20` | 160px | Major section breaks |

---

### 1.4 Border Radius (Bo Góc)

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | Small elements (badges) |
| `radius-md` | 12px | Input fields, Small cards |
| `radius-lg` | 16px | Product cards, Modals |
| `radius-xl` | 24px | Large cards, Containers |
| `radius-full` | 999px | Pills, Circular avatars |

---

### 1.5 Shadows (Bóng Đổ)

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, Dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, Popovers |
| `shadow-glow-primary` | `0 0 20px rgba(255,107,53,0.3)` | Primary button hover |

---

## 🧩 PHẦN 2: COMPONENT LIBRARY (Thư Viện Linh Kiện)

### 2.1 Buttons (Nút Bấm)

#### Primary Button
- **Kích thước:** Height 56px (Large), 48px (Medium), 40px (Small)
- **Padding:** Horizontal 32px (Large), 24px (Medium), 16px (Small)
- **Background:** `primary` (#FF6B35)
- **Text:** `neutral-50` (#FFFFFF), Font: Button style
- **Border Radius:** `radius-full` (999px)
- **Shadow:** `shadow-glow-primary` on hover
- **States:**
  - Hover: Background → `primary-hover` (#D9531E)
  - Active: Scale 0.98
  - Disabled: Opacity 0.5, cursor not-allowed

#### Secondary Button
- **Background:** `neutral-50` (#FFFFFF)
- **Border:** 1px solid `neutral-200` (#E5E7EB)
- **Text:** `neutral-900` (#111827)
- **States:**
  - Hover: Background → `neutral-100`, Border → `neutral-400`

#### Ghost Button
- **Background:** Transparent
- **Text:** `primary` (#FF6B35)
- **States:**
  - Hover: Background → `primary-light` (#FFF5F2)

#### Danger Button
- **Background:** `error` (#EF4444)
- **Text:** White
- **Usage:** Delete actions, Destructive operations

#### Icon Button
- **Size:** 40x40px (circular)
- **Background:** `neutral-100` (#F3F4F6)
- **Icon:** 20x20px, `neutral-600` color
- **Usage:** Close, Menu, Actions

---

### 2.2 Form Inputs (Ô Nhập Liệu)

#### Text Input
- **Height:** 56px
- **Padding:** 16px horizontal
- **Background:** `neutral-50` (#F9FAFB)
- **Border:** 1px solid `neutral-200` (#E5E7EB)
- **Border Radius:** `radius-md` (12px)
- **Label:** Caption style, `neutral-600`, positioned above input
- **Placeholder:** Body style, `neutral-400`
- **States:**
  - Focus: Border → `primary` (2px), Shadow → `shadow-sm`
  - Error: Border → `error`, Helper text in red below
  - Disabled: Background → `neutral-100`, Opacity 0.6

#### Search Bar
- **Icon:** 🔍 positioned left (20px from edge)
- **Padding Left:** 48px (to accommodate icon)
- **Border Radius:** `radius-full` (999px)
- **Width:** Flexible (min 300px, max 600px)

#### Dropdown/Select
- **Appearance:** Same as Text Input
- **Icon:** Chevron down (▼) positioned right
- **Dropdown Menu:**
  - Background: White
  - Shadow: `shadow-lg`
  - Border Radius: `radius-md`
  - Max Height: 300px (scrollable)
  - Item Hover: Background → `neutral-100`

#### Checkbox
- **Size:** 20x20px
- **Border:** 2px solid `neutral-400`
- **Border Radius:** `radius-sm` (4px)
- **Checked State:**
  - Background: `primary`
  - Icon: White checkmark (✓)

#### Radio Button
- **Size:** 20x20px (circular)
- **Border:** 2px solid `neutral-400`
- **Checked State:**
  - Border: `primary`
  - Inner dot: 10x10px, `primary`

#### Toggle Switch
- **Width:** 48px, Height: 24px
- **Shape:** Pill (radius-full)
- **Off State:** Background `neutral-200`, Knob left
- **On State:** Background `primary`, Knob right
- **Knob:** 20x20px white circle

#### Textarea
- **Min Height:** 120px
- **Resize:** Vertical only
- **Other specs:** Same as Text Input

#### Number Stepper (Quantity)
- **Layout:** [ - ] [ 1 ] [ + ]
- **Button Size:** 32x32px
- **Input Width:** 60px, Center-aligned
- **Usage:** Cart quantity, Product detail

---

### 2.3 Cards (Thẻ)

#### Product Card
- **Dimensions:** 240px wide × 400px tall
- **Structure:**
  ```
  ┌─────────────────────┐
  │  Image (3:4 ratio)  │ ← 240×280px, radius-md
  │                     │
  ├─────────────────────┤
  │ Title (H3)          │ ← 2 lines max, ellipsis
  │ Author (Caption)    │ ← 1 line, neutral-600
  │ Price (H3, Primary) │
  │            [+ Icon] │ ← Add to cart button
  └─────────────────────┘
  ```
- **Padding:** 12px all sides
- **Background:** White
- **Border:** 1px solid `neutral-200`
- **Border Radius:** `radius-lg` (16px)
- **Shadow:** `shadow-sm`, `shadow-md` on hover
- **Badge:** Optional "Sale" or "New" badge at top-left corner

#### Blog Card
- **Dimensions:** 600px wide × 400px tall (horizontal layout)
- **Structure:** Thumbnail (left 40%) + Content (right 60%)
- **Elements:**
  - Category badge (top)
  - Title (H3, 3 lines max)
  - Excerpt (Body, 4 lines max)
  - Date + Read time (Caption)

#### Review Card
- **Layout:** Vertical
- **Elements:**
  - Avatar (40px) + Name + Date (top row)
  - Star rating (⭐⭐⭐⭐⭐)
  - Review text (Body, max 6 lines)
- **Background:** `neutral-50`
- **Padding:** 24px

#### Category Card
- **Size:** 280px × 200px
- **Background:** Gradient or solid color
- **Content:** Icon (48px) + Category name (H3)
- **Hover:** Scale 1.05, Shadow increase

#### Stat Card
- **Size:** 280px × 160px
- **Content:** Icon + Label (Caption) + Value (Display)
- **Usage:** Dashboard statistics

#### Feature Card
- **Size:** 380px × 320px
- **Content:** Icon + Title (H3) + Description (Body)
- **Usage:** About page, Homepage features

---

### 2.4 Navigation Components

#### Unified Header
- **Height:** 80px
- **Background:** White with 1px bottom border (`neutral-200`)
- **Layout:**
  ```
  [Logo]  [Nav Menu]  [Search Bar]  [Cart] [Avatar]
  ```
- **Logo:** 24px text, Bold, Primary color
- **Nav Items:** Button style, `neutral-900`, 120px spacing
- **Search:** Integrated search bar (300px width)
- **Cart Icon:** With badge showing item count
- **Avatar:** 40px circular, with dropdown menu

#### Footer
- **Height:** 500px
- **Background:** `neutral-800` (#1F2937)
- **Layout:** 4 columns (Brand, Links, Links, Links)
- **Text Color:** White (headings), `neutral-400` (links)
- **Bottom Bar:** Copyright text, Social icons

#### Breadcrumbs
- **Format:** Home > Category > Product
- **Separator:** > (chevron)
- **Text:** Caption style
- **Colors:** `neutral-600` (inactive), `primary` (current page)

#### Pagination
- **Layout:** [← Prev] [1] [2] [3] ... [Next →]
- **Button Size:** 40×40px
- **Active State:** Background `primary`, Text white
- **Inactive:** Background `neutral-100`, Text `neutral-600`

#### Tabs
- **Layout:** Horizontal list
- **Active Tab:** Bottom border (3px, `primary`), Text `primary`
- **Inactive:** Text `neutral-600`
- **Spacing:** 32px between tabs

---

### 2.5 Feedback Components

#### Toast Notification
- **Position:** Top-right corner, Fixed
- **Size:** 360px wide × auto height
- **Padding:** 16px
- **Border Radius:** `radius-md`
- **Variants:**
  - Success: Background `success`, Icon ✓
  - Error: Background `error`, Icon ✗
  - Info: Background `info`, Icon ℹ
- **Auto-dismiss:** 5 seconds

#### Alert Banner
- **Width:** Full container width
- **Padding:** 16px 24px
- **Border-left:** 4px solid (variant color)
- **Background:** Tinted background (variant color at 10% opacity)

#### Progress Bar
- **Height:** 8px
- **Background:** `neutral-200`
- **Fill:** `primary`
- **Border Radius:** `radius-full`
- **Usage:** Checkout steps, Upload progress

#### Skeleton Loader
- **Appearance:** Gray blocks with shimmer animation
- **Usage:** Loading states for cards, text

#### Badge
- **Size:** Auto width × 28px height
- **Padding:** 8px 12px
- **Border Radius:** `radius-full`
- **Variants:**
  - Success: Background `success` at 20%, Text `success`
  - Warning: Background `warning` at 20%, Text `warning`
  - Promo: Background `primary`, Text white

---

### 2.6 Data Display

#### Table
- **Header:** Background `neutral-100`, Text Bold
- **Rows:** Alternating backgrounds (white, `neutral-50`)
- **Border:** 1px solid `neutral-200` between rows
- **Padding:** 16px per cell

#### List
- **Item Height:** 64px
- **Divider:** 1px solid `neutral-200`
- **Hover:** Background `neutral-50`

#### Avatar
- **Sizes:** 32px (Small), 40px (Medium), 56px (Large)
- **Shape:** Circular (`radius-full`)
- **Fallback:** Initials on `primary` background

#### Divider
- **Thickness:** 1px
- **Color:** `neutral-200`
- **Margin:** 32px vertical

---

## 📄 PHẦN 3: PAGE SPECIFICATIONS (Đặc Tả Trang)

### 3.1 Homepage

**Sections (Top to Bottom):**

1. **Hero Section** (Height: 700px)
   - Background: `primary-light` (#FFF5F2)
   - Content: Display text + Body Large + Primary Button
   - Layout: Text left, Image/Illustration right

2. **Flash Sale Banner** (Height: 120px)
   - Background: `primary` gradient
   - Content: Countdown timer + "Shop Now" CTA

3. **Categories Grid** (6 items)
   - Layout: 3 columns × 2 rows
   - Component: Category Card
   - Spacing: 32px gap

4. **Best Sellers Section**
   - Title: H2
   - Layout: Horizontal scroll (10 Product Cards)
   - Spacing: 24px gap

5. **New Arrivals Section**
   - Same layout as Best Sellers

6. **Blog Highlights** (3 posts)
   - Layout: 3 columns
   - Component: Blog Card (vertical variant)

7. **Newsletter Section** (Height: 350px)
   - Background: `primary`
   - Content: H2 + Body + Email Input + Button
   - Layout: Centered

8. **Testimonials** (3 reviews)
   - Layout: 3 columns
   - Component: Review Card

9. **Footer**

---

### 3.2 Shop Grid Page

**Layout:**
```
┌─────────────┬──────────────────────────┐
│             │  [Sort Dropdown]         │
│  Filters    │  ┌────┬────┬────┬────┐  │
│  Sidebar    │  │ P1 │ P2 │ P3 │ P4 │  │
│  (280px)    │  ├────┼────┼────┼────┤  │
│             │  │ P5 │ P6 │ P7 │ P8 │  │
│  Categories │  ├────┼────┼────┼────┤  │
│  Price      │  │ P9 │P10 │P11 │P12 │  │
│  Rating     │  └────┴────┴────┴────┘  │
│  Author     │  [Pagination]            │
└─────────────┴──────────────────────────┘
```

**Filters Sidebar:**
- Categories (Checkbox list)
- Price Range (Slider)
- Rating (Star checkboxes)
- Author (Search + Checkbox list)

**Product Grid:**
- 4 columns × 3 rows = 12 products per page
- Gap: 24px
- Component: Product Card

---

### 3.3 Shop List Page

**Layout:** Same sidebar, but products in vertical list format

**Product List Item:**
- Height: 200px
- Layout: Image (left 25%) + Details (right 75%)
- Details: Title, Author, Rating, Price, Short description, Add to Cart button

---

### 3.4 Product Detail Page

**Layout:**
```
┌──────────────┬─────────────────────────┐
│              │  Breadcrumbs            │
│  Image       │  Title (H1)             │
│  Gallery     │  Author (H3, Primary)   │
│  (5 images)  │  Rating + Reviews count │
│              │  Price (Display)        │
│  [Thumbnail] │  [Quantity] [Add Cart]  │
│  [Thumbnail] │  Description (3 para)   │
│  [Thumbnail] │  Specs Table            │
└──────────────┴─────────────────────────┘

[Reviews Section - 5 Review Cards]
[Related Products - 4 Product Cards]
```

---

### 3.5 Search Results Page

**Layout:** Similar to Shop Grid
**Additional Elements:**
- Search query display: "Kết quả cho: [query]"
- Result count: "Tìm thấy 24 sản phẩm"
- Suggested searches (if no results)

---

### 3.6 Blog List Page

**Layout:**
```
┌──────────────────────┬──────────┐
│  Featured Post       │          │
│  (Large Blog Card)   │ Category │
├──────────────────────┤ Sidebar  │
│  ┌────┬────┬────┐   │          │
│  │ P1 │ P2 │ P3 │   │ Recent   │
│  ├────┼────┼────┤   │ Posts    │
│  │ P4 │ P5 │ P6 │   │          │
│  └────┴────┴────┘   │          │
└──────────────────────┴──────────┘
```

---

### 3.7 Blog Post Page

**Structure:**
1. Hero Image (Full width, 400px height)
2. Title (H1) + Author + Date
3. Content (5 sections with H2 subheadings)
4. Author Bio Card
5. Related Posts (3 Blog Cards)

---

### 3.8 Cart Page

**Layout:**
```
┌─────────────────────────┬──────────────┐
│  Cart Items (3)         │  Summary     │
│  ┌────────────────────┐ │  Card        │
│  │ [Img] Title        │ │              │
│  │ Price × Qty [Stpr] │ │  Subtotal    │
│  │ [Remove]           │ │  Shipping    │
│  └────────────────────┘ │  Tax         │
│                         │  ───────────  │
│  [Coupon Input]         │  Total       │
│                         │  [Checkout]  │
└─────────────────────────┴──────────────┘

[Recommended Products - 4 Product Cards]
```

---

### 3.9 Checkout Step 1 (Shipping)

**Form Fields:**
1. Full Name (Text Input)
2. Phone Number (Text Input)
3. Email (Text Input)
4. Address Line 1 (Text Input)
5. Address Line 2 (Text Input)
6. City / Province (Dropdown)

**Delivery Options:** (Radio buttons)
- Standard (3-5 days) - Free
- Express (1-2 days) - 30.000đ
- Same Day - 50.000đ

**Right Sidebar:** Order Summary Card

---

### 3.10 Checkout Step 2 (Payment)

**Payment Methods:** (Radio buttons with icons)
- Credit/Debit Card
- Bank Transfer
- COD (Cash on Delivery)
- E-Wallet (Momo, ZaloPay)

**Billing Form:** (if card selected)
- Card Number, Expiry, CVV

**Order Review:** List of items + Total

**Action:** [Place Order] Primary Button

---

### 3.11 Order Success Page

**Content:**
- Success Icon (Large ✓)
- "Đặt hàng thành công!" (H1)
- Order Number: #123456
- Estimated Delivery: Date
- [Track Order] Button
- [Continue Shopping] Secondary Button

---

### 3.12 Login/Register Page

**Layout:** Split screen (50/50)

**Left Side:**
- Brand illustration
- "Chào mừng bạn quay lại" (Display)
- Benefits list

**Right Side:**
- Tab: [Đăng nhập] [Đăng ký]
- Form (4 fields)
- Social Login buttons (Google, Facebook, Apple)
- [Submit] Primary Button

---

### 3.13 Dashboard Page

**Layout:**
```
┌──────────┬─────────────────────────────┐
│          │  Welcome Banner             │
│ Sidebar  │  "Xin chào, [Name]!"        │
│ Menu     ├─────────────────────────────┤
│          │  ┌────┬────┬────┬────┐     │
│ • Tổng   │  │Stat│Stat│Stat│Stat│     │
│   quan   │  └────┴────┴────┴────┘     │
│ • Đơn    │                             │
│   hàng   │  Recent Orders (3)          │
│ • Cài    │  ┌─────────────────────┐   │
│   đặt    │  │ Order #123          │   │
│          │  └─────────────────────┘   │
└──────────┴─────────────────────────────┘
```

**Stats:** Total Orders, Total Spent, Points, Wishlist Count

---

### 3.14 My Orders Page

**Layout:** Table view

**Columns:**
- Order Number
- Date
- Items (count)
- Total
- Status (Badge)
- Actions ([View] [Track])

**Filters:** Status dropdown (All, Pending, Shipped, Delivered, Cancelled)

---

### 3.15 Profile Settings Page

**Sections:**

1. **Avatar Upload**
   - Current avatar (56px)
   - [Change Photo] Button

2. **Personal Information Form**
   - Full Name
   - Email
   - Phone
   - Date of Birth
   - Gender (Radio)

3. **Change Password**
   - Current Password
   - New Password
   - Confirm Password

4. **Saved Addresses**
   - List of addresses with [Edit] [Delete]
   - [Add New Address] Button

---

### 3.16 About Us Page

**Sections:**

1. **Hero** (Height: 400px)
   - Background: `neutral-800`
   - "VỀ CHÚNG TÔI" (Display, White)

2. **Mission Statement** (Centered, 800px width)
   - H2 + Body Large

3. **Team Section** (6 members)
   - Layout: 3 columns × 2 rows
   - Component: Avatar (Large) + Name + Role

4. **Timeline** (Company history)
   - Vertical timeline with milestones

5. **Contact Section**
   - Address, Phone, Email
   - Map embed placeholder

---

## � PHẦN 5: NỘI DUNG CHI TIẾT CHO TỪNG TRANG

### 5.1 Homepage Content

#### Hero Section
- **Headline:** "MỞ SÁCH RA, MỞ TƯƠNG LAI"
- **Subheadline:** "Khám phá hơn 50.000 đầu sách từ khắp thế giới. Miễn phí vận chuyển cho đơn hàng đầu tiên."
- **CTA Button:** "KHÁM PHÁ NGAY"

#### Flash Sale Banner
- **Text:** "⚡ FLASH SALE - Giảm đến 50% | Kết thúc sau: 02:45:30"
- **CTA:** "MUA NGAY"

#### Categories (6 items)
1. 📚 Văn Học Việt Nam
2. 💼 Kinh Tế - Khởi Nghiệp
3. 👶 Sách Thiếu Nhi
4. 🧪 Khoa Học Công Nghệ
5. 🎨 Nghệ Thuật - Mỹ Học
6. 🌍 Lịch Sử - Địa Lý

#### Best Sellers (10 products)
1. **Mắt Biếc** | Nguyễn Nhật Ánh | 125.000đ
2. **Dế Mèn Phiêu Lưu Ký** | Tô Hoài | 89.000đ
3. **Nhà Giả Kim** | Paulo Coelho | 110.000đ
4. **Sapiens** | Yuval Noah Harari | 250.000đ
5. **Đắc Nhân Tâm** | Dale Carnegie | 95.000đ
6. **Tuổi Trẻ Đáng Giá Bao Nhiêu** | Rosie Nguyễn | 80.000đ
7. **Cà Phê Cùng Tony** | Tony Buổi Sáng | 75.000đ
8. **Tôi Thấy Hoa Vàng Trên Cỏ Xanh** | Nguyễn Nhật Ánh | 115.000đ
9. **Cho Tôi Xin Một Vé Đi Tuổi Thơ** | Nguyễn Nhật Ánh | 105.000đ
10. **Totto-Chan** | Tetsuko Kuroyanagi | 98.000đ

#### New Arrivals (10 products)
1. **Atomic Habits** | James Clear | 180.000đ
2. **Nghệ Thuật Tinh Tế Của Việc Đếch** | Mark Manson | 120.000đ
3. **Tâm Lý Học Tội Phạm** | Diệp Hồng Vũ | 145.000đ
4. **Hoàng Tử Bé** | Antoine de Saint-Exupéry | 65.000đ
5. **Chiến Tranh Tiền Tệ** | Song Hongbing | 195.000đ
6. **Không Gia Đình** | Hector Malot | 88.000đ
7. **Bố Già** | Mario Puzo | 175.000đ
8. **Sherlock Holmes** | Arthur Conan Doyle | 220.000đ
9. **Hai Số Phận** | Jeffrey Archer | 160.000đ
10. **Cây Cam Ngọt Của Tôi** | José Mauro de Vasconcelos | 92.000đ

#### Blog Highlights (3 posts)
1. **"10 Cuốn Sách Nên Đọc Trong Năm 2026"**
   - Category: Gợi Ý Sách
   - Excerpt: "Danh sách những cuốn sách hay nhất được các chuyên gia khuyên đọc..."
   - Date: 15/01/2026 | 8 phút đọc

2. **"Cách Xây Dựng Thói Quen Đọc Sách Hiệu Quả"**
   - Category: Kỹ Năng
   - Excerpt: "Bí quyết giúp bạn duy trì thói quen đọc sách mỗi ngày..."
   - Date: 12/01/2026 | 5 phút đọc

3. **"Review: Atomic Habits - Thay Đổi Tí Hon, Kết Quả Bất Ngờ"**
   - Category: Review Sách
   - Excerpt: "Cuốn sách đã thay đổi cuộc sống của hàng triệu người..."
   - Date: 10/01/2026 | 10 phút đọc

#### Newsletter Section
- **Headline:** "Đăng Ký Nhận Tin Mới Nhất"
- **Description:** "Nhận ngay voucher 50.000đ và cập nhật sách mới, khuyến mãi đặc biệt mỗi tuần."
- **Input Placeholder:** "Nhập email của bạn..."
- **Button:** "ĐĂNG KÝ NGAY"

#### Testimonials (3 reviews)
1. **Nguyễn Văn An** | ⭐⭐⭐⭐⭐
   - "Dịch vụ tuyệt vời! Sách đóng gói cẩn thận, giao hàng nhanh chóng. Chắc chắn sẽ ủng hộ dài dài."

2. **Trần Thị Bình** | ⭐⭐⭐⭐⭐
   - "Giá cả hợp lý, nhiều chương trình khuyến mãi. Đặc biệt là chương trình tích điểm rất hấp dẫn."

3. **Lê Minh Cường** | ⭐⭐⭐⭐⭐
   - "Kho sách phong phú, dễ tìm kiếm. Hỗ trợ khách hàng nhiệt tình. Rất hài lòng!"

---

### 5.2 Product Detail Page Content

**Example: Mắt Biếc**

#### Breadcrumbs
Trang chủ > Văn Học Việt Nam > Tiểu Thuyết > Mắt Biếc

#### Product Info
- **Title:** Mắt Biếc
- **Author:** Nguyễn Nhật Ánh
- **Rating:** ⭐⭐⭐⭐⭐ (4.8/5 - 1,234 đánh giá)
- **Price:** 125.000đ
- **Original Price:** ~~150.000đ~~ (-17%)

#### Description
"Mắt Biếc là một tác phẩm kinh điển của văn học Việt Nam đương đại, kể về câu chuyện tình yêu thuở thanh xuân trong sáng và đầy cảm xúc.

Câu chuyện xoay quanh nhân vật Ngạn và Hà Lan - cô bé có đôi mắt biếc đẹp tuyệt trần. Tình cảm trong sáng của tuổi thơ dần dần chuyển thành tình yêu sâu đậm nhưng lại không thể nói ra.

Với ngòi bút tài hoa, Nguyễn Nhật Ánh đã khắc họa nên bức tranh tuổi thơ miền quê Việt Nam đầy chân thực và cảm động."

#### Specifications Table
| Thông Tin | Chi Tiết |
|-----------|----------|
| Nhà xuất bản | NXB Trẻ |
| Năm xuất bản | 2020 |
| Số trang | 256 |
| Kích thước | 14 x 20.5 cm |
| Loại bìa | Bìa mềm |
| Ngôn ngữ | Tiếng Việt |

#### Reviews (5 samples)
1. **Mai Phương** | ⭐⭐⭐⭐⭐ | 20/12/2025
   - "Cuốn sách hay nhất tôi từng đọc. Cảm xúc rất chân thực, đọc xong muốn khóc."

2. **Hoàng Nam** | ⭐⭐⭐⭐⭐ | 15/12/2025
   - "Nguyễn Nhật Ánh viết về tình yêu tuổi học trò rất tinh tế. Đáng đọc!"

3. **Thanh Hương** | ⭐⭐⭐⭐ | 10/12/2025
   - "Sách hay, nhưng kết thúc hơi buồn. Vẫn recommend cho mọi người."

4. **Đức Anh** | ⭐⭐⭐⭐⭐ | 05/12/2025
   - "Mua tặng bạn gái, cô ấy rất thích. Sách đẹp, chất lượng tốt."

5. **Lan Anh** | ⭐⭐⭐⭐⭐ | 01/12/2025
   - "Đọc lại lần thứ 3 vẫn thấy hay. Tác phẩm kinh điển không bao giờ cũ."

#### Related Products (4 items)
1. Tôi Thấy Hoa Vàng Trên Cỏ Xanh | 115.000đ
2. Cho Tôi Xin Một Vé Đi Tuổi Thơ | 105.000đ
3. Cảm Ơn Người Lớn | 98.000đ
4. Totto-Chan | 98.000đ

---

### 5.3 Cart Page Content

#### Cart Items (3 examples)
1. **Mắt Biếc** | Nguyễn Nhật Ánh
   - Price: 125.000đ
   - Quantity: 1
   - Subtotal: 125.000đ

2. **Sapiens** | Yuval Noah Harari
   - Price: 250.000đ
   - Quantity: 2
   - Subtotal: 500.000đ

3. **Đắc Nhân Tâm** | Dale Carnegie
   - Price: 95.000đ
   - Quantity: 1
   - Subtotal: 95.000đ

#### Coupon Section
- **Label:** "Mã giảm giá"
- **Placeholder:** "Nhập mã giảm giá..."
- **Button:** "ÁP DỤNG"

#### Summary Card
- **Tạm tính:** 720.000đ
- **Phí vận chuyển:** Miễn phí
- **Giảm giá:** -50.000đ
- **Tổng cộng:** 670.000đ
- **Button:** "TIẾN HÀNH THANH TOÁN"

#### Recommended Products
- "Khách hàng cũng quan tâm"
- 4 Product Cards

---

### 5.4 Checkout Pages Content

#### Step 1: Shipping Information

**Form Labels & Placeholders:**
- Họ và tên: "Nguyễn Văn A"
- Số điện thoại: "0912 345 678"
- Email: "nguyenvana@email.com"
- Địa chỉ (Dòng 1): "Số 123, Đường ABC"
- Địa chỉ (Dòng 2): "Phường XYZ, Quận 1"
- Tỉnh/Thành phố: [Dropdown: Hà Nội, TP.HCM, Đà Nẵng...]

**Delivery Options:**
- ○ Giao hàng tiêu chuẩn (3-5 ngày) - Miễn phí
- ○ Giao hàng nhanh (1-2 ngày) - 30.000đ
- ○ Giao hàng trong ngày - 50.000đ

**Button:** "TIẾP TỤC"

#### Step 2: Payment Method

**Payment Options:**
- ○ Thẻ tín dụng/ghi nợ (Visa, Mastercard)
- ○ Chuyển khoản ngân hàng
- ○ Thanh toán khi nhận hàng (COD)
- ○ Ví điện tử (Momo, ZaloPay, VNPay)

**Card Form (if selected):**
- Số thẻ: "1234 5678 9012 3456"
- Ngày hết hạn: "MM/YY"
- CVV: "123"

**Button:** "ĐẶT HÀNG"

---

### 5.5 Order Success Page Content

- **Icon:** ✓ (Large green checkmark)
- **Headline:** "Đặt Hàng Thành Công!"
- **Message:** "Cảm ơn bạn đã mua sắm tại BOOKVN. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất."
- **Order Number:** "Mã đơn hàng: #BV20260118001"
- **Estimated Delivery:** "Dự kiến giao hàng: 22/01/2026"
- **Primary Button:** "THEO DÕI ĐƠN HÀNG"
- **Secondary Button:** "TIẾP TỤC MUA SẮM"

---

### 5.6 Login/Register Page Content

#### Left Side (Brand)
- **Headline:** "Chào Mừng Bạn Quay Lại"
- **Subheadline:** "Đăng nhập để trải nghiệm đầy đủ tính năng"
- **Benefits:**
  - ✓ Theo dõi đơn hàng dễ dàng
  - ✓ Lưu danh sách yêu thích
  - ✓ Nhận ưu đãi độc quyền
  - ✓ Tích điểm đổi quà

#### Right Side - Login Form
- **Tab 1:** Đăng Nhập
- **Tab 2:** Đăng Ký

**Login Fields:**
- Email hoặc số điện thoại: "example@email.com"
- Mật khẩu: "••••••••"
- ☐ Ghi nhớ đăng nhập
- Link: "Quên mật khẩu?"
- **Button:** "ĐĂNG NHẬP"

**Social Login:**
- "Hoặc đăng nhập bằng"
- [Google] [Facebook] [Apple]

**Register Fields:**
- Họ và tên: "Nguyễn Văn A"
- Email: "example@email.com"
- Số điện thoại: "0912 345 678"
- Mật khẩu: "••••••••"
- ☑ Tôi đồng ý với Điều khoản sử dụng
- **Button:** "ĐĂNG KÝ"

---

### 5.7 Dashboard Page Content

#### Welcome Banner
- "Xin chào, **Nguyễn Văn An**! 👋"
- "Bạn có 250 điểm thưởng"

#### Stats Cards (4)
1. **Tổng đơn hàng:** 12
2. **Tổng chi tiêu:** 2.450.000đ
3. **Điểm tích lũy:** 250
4. **Sách yêu thích:** 8

#### Recent Orders (3)
1. **Đơn hàng #BV001** | 15/01/2026
   - 3 sản phẩm | 670.000đ
   - Status: Đang giao hàng

2. **Đơn hàng #BV002** | 10/01/2026
   - 2 sản phẩm | 450.000đ
   - Status: Đã giao

3. **Đơn hàng #BV003** | 05/01/2026
   - 5 sản phẩm | 1.200.000đ
   - Status: Đã giao

---

### 5.8 About Us Page Content

#### Hero
- **Headline:** "VỀ CHÚNG TÔI"

#### Mission Statement
- **Title:** "Sứ Mệnh Của Chúng Tôi"
- **Content:** "BOOKVN ra đời với sứ mệnh lan tỏa tri thức Việt đến mọi miền tổ quốc. Chúng tôi tin rằng sách là cầu nối giữa tri thức và con người, là chìa khóa mở ra tương lai tươi sáng."

#### Team (6 members)
1. **Nguyễn Văn A** - CEO & Founder
2. **Trần Thị B** - COO
3. **Lê Văn C** - CTO
4. **Phạm Thị D** - Marketing Director
5. **Hoàng Văn E** - Operations Manager
6. **Đỗ Thị F** - Customer Success Lead

#### Timeline
- **2020:** Thành lập BOOKVN với 1.000 đầu sách
- **2021:** Mở rộng kho sách lên 10.000 đầu sách
- **2022:** Ra mắt ứng dụng mobile
- **2023:** Đạt 100.000 khách hàng
- **2024:** Mở chi nhánh tại 3 thành phố lớn
- **2025:** Vượt mốc 50.000 đầu sách

#### Contact
- **Địa chỉ:** Số 123, Đường ABC, Quận 1, TP.HCM
- **Hotline:** 1900 1234
- **Email:** contact@bookvn.com
- **Giờ làm việc:** 8:00 - 22:00 (Tất cả các ngày)

---

### 5.9 Blog Post Example Content

#### Title
"10 Cuốn Sách Nên Đọc Trong Năm 2026"

#### Meta
- **Author:** Nguyễn Văn An
- **Date:** 15/01/2026
- **Category:** Gợi Ý Sách
- **Read Time:** 8 phút đọc

#### Content Sections

**1. Giới Thiệu**
"Năm 2026 đã đến với rất nhiều tác phẩm văn học xuất sắc. Dưới đây là 10 cuốn sách được các chuyên gia đánh giá cao nhất..."

**2. Top 10 Sách Hay**
- Atomic Habits - James Clear
- Sapiens - Yuval Noah Harari
- [... 8 cuốn khác]

**3. Tại Sao Nên Đọc Những Cuốn Sách Này**
"Mỗi cuốn sách đều mang đến một góc nhìn mới về cuộc sống..."

**4. Cách Đọc Hiệu Quả**
"Để tận dụng tối đa giá trị của sách, bạn nên..."

**5. Kết Luận**
"Hãy bắt đầu hành trình đọc sách của bạn ngay hôm nay!"

#### Author Bio
- **Nguyễn Văn An** - Biên tập viên tại BOOKVN
- "Yêu sách, yêu đời. Chia sẻ niềm đam mê đọc sách với cộng đồng."

#### Related Posts (3)
1. Cách Xây Dựng Thói Quen Đọc Sách
2. Review: Atomic Habits
3. Top 5 Sách Kinh Tế Hay Nhất

---

### 5.10 Search Results Page Content

#### Search Query Display
- "Kết quả tìm kiếm cho: **'atomic habits'**"
- "Tìm thấy **24 sản phẩm**"

#### Sort Dropdown Options
- Liên quan nhất
- Giá: Thấp đến cao
- Giá: Cao đến thấp
- Mới nhất
- Bán chạy nhất
- Đánh giá cao nhất

#### Suggested Searches (if no results)
- "Có phải bạn muốn tìm:"
- atomic habit
- james clear
- thói quen

---

## 📏 PHẦN 4: LAYOUT SYSTEM (Hệ Thống Bố Cục)

### Grid System
- **Columns:** 12
- **Container Max Width:** 1280px
- **Gutter:** 32px
- **Side Padding:** 80px (Desktop), 24px (Mobile)

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Vertical Rhythm
- **Section Spacing:** 160px between major sections
- **Component Spacing:** 64px between related components
- **Element Spacing:** 24px between elements within a component

---

## ✅ CHECKLIST TRIỂN KHAI

### Phase 1: Design System Reference
- [ ] Generate color palette swatches
- [ ] Generate typography scale examples
- [ ] Generate all 50+ component variants
- [ ] Generate spacing/grid demonstration

### Phase 2: Page Generation
- [ ] Generate all 16 pages with realistic content
- [ ] Ensure proper alignment (80px padding, 8px grid)
- [ ] Verify Vietnamese text renders correctly
- [ ] Apply consistent styling across all pages

### Phase 3: Quality Assurance
- [ ] Check all components have correct states
- [ ] Verify color contrast ratios (WCAG AA)
- [ ] Test alignment with Figma's measurement tools
- [ ] User review and approval
