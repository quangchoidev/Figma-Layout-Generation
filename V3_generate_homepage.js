const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter, productCard, blogCard } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('🏠 Generating COMPLETE Homepage (Professional Quality)...');

    const X = PAGE_OFFSETS.homepage;
    const fId = await frame(c, X, 0, DS.w, 7500, '01. Homepage - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    // UNIFIED HEADER
    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // 1. HERO SECTION (700px)
    await rect(c, M, y, DS.container, 600, DS.colors.priL, DS.r.xl, fId.id);
    await text(c, M + 64, y + 120, 'MỞ SÁCH RA,\nMỞ TƯƠNG LAI', 64, 800, DS.colors.n900, fId.id, 700);
    await text(c, M + 64, y + 300, 'Khám phá hơn 50.000 đầu sách từ khắp thế giới.\nMiễn phí vận chuyển cho đơn hàng đầu tiên.', 18, 400, DS.colors.n600, fId.id, 650);
    await rect(c, M + 64, y + 420, 220, 56, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, M + 105, y + 438, 'KHÁM PHÁ NGAY', 14, 700, '#FFFFFF', fId.id);
    y += 740;

    // 2. FLASH SALE BANNER (120px) - FIX: Text trắng trên nền cam
    await rect(c, M, y, DS.container, 100, DS.colors.pri, DS.r.lg, fId.id);
    await text(c, M + 40, y + 25, '⚡ FLASH SALE - Giảm đến 50%', 28, 700, '#FFFFFF', fId.id); // ✅ White text
    await text(c, M + 40, y + 60, 'Kết thúc sau: 02:45:30', 16, 400, '#FFFFFF', fId.id); // ✅ White text
    await rect(c, M + 900, y + 30, 160, 40, '#FFFFFF', DS.r.full, fId.id);
    await text(c, M + 940, y + 42, 'MUA NGAY', 14, 700, DS.colors.pri, fId.id);
    y += 140;

    // 3. CATEGORIES GRID (6 items, 3x2)
    await text(c, M, y, 'Danh Mục Nổi Bật', 36, 700, DS.colors.n900, fId.id);
    y += 60;

    const categories = [
        ['📚 Văn Học Việt Nam', DS.colors.catVanHoc],
        ['💼 Kinh Tế - Khởi Nghiệp', DS.colors.catKinhTe],
        ['👶 Sách Thiếu Nhi', DS.colors.catThieuNhi],
        ['🧪 Khoa Học Công Nghệ', DS.colors.catKhoaHoc],
        ['🎨 Nghệ Thuật - Mỹ Học', DS.colors.catNgheThuat],
        ['🌍 Lịch Sử - Địa Lý', DS.colors.catLichSu]
    ];

    for (let i = 0; i < categories.length; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const cx = M + col * (405 + 32);
        const cy = y + row * (200 + 32);
        await rect(c, cx, cy, 405, 180, categories[i][1], DS.r.lg, fId.id, { shadow: true });
        await text(c, cx + 32, cy + 75, categories[i][0], 24, 700, DS.colors.n900, fId.id);
    }
    y += 440;

    // 4. BEST SELLERS (10 products)
    await text(c, M, y, 'Sách Bán Chạy', 36, 700, DS.colors.n900, fId.id);
    y += 60;

    const bestSellers = [
        ['Mắt Biếc', 'Nguyễn Nhật Ánh', '125.000đ'],
        ['Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', '89.000đ'],
        ['Nhà Giả Kim', 'Paulo Coelho', '110.000đ'],
        ['Sapiens', 'Yuval Noah Harari', '250.000đ'],
        ['Đắc Nhân Tâm', 'Dale Carnegie', '95.000đ']
    ];

    for (let i = 0; i < 5; i++) {
        await productCard(c, M + i * (240 + 20), y, bestSellers[i][0], bestSellers[i][1], bestSellers[i][2], fId.id);
    }
    y += 440;

    // 5. NEW ARRIVALS (10 products)
    await text(c, M, y, 'Sách Mới Về', 36, 700, DS.colors.n900, fId.id);
    y += 60;

    const newArrivals = [
        ['Atomic Habits', 'James Clear', '180.000đ'],
        ['Nghệ Thuật Tinh Tế...', 'Mark Manson', '120.000đ'],
        ['Tâm Lý Học Tội Phạm', 'Diệp Hồng Vũ', '145.000đ'],
        ['Hoàng Tử Bé', 'Antoine de Saint', '65.000đ'],
        ['Chiến Tranh Tiền Tệ', 'Song Hongbing', '195.000đ']
    ];

    for (let i = 0; i < 5; i++) {
        await productCard(c, M + i * (240 + 20), y, newArrivals[i][0], newArrivals[i][1], newArrivals[i][2], fId.id);
    }
    y += 440;

    // 6. BLOG HIGHLIGHTS (3 posts)
    await text(c, M, y, 'Bài Viết Nổi Bật', 36, 700, DS.colors.n900, fId.id);
    y += 60;

    const blogs = [
        ['10 Cuốn Sách Nên Đọc Trong Năm 2026', 'Gợi Ý Sách', 'Danh sách những cuốn sách hay nhất...', '15/01/2026 • 8 phút đọc'],
        ['Cách Xây Dựng Thói Quen Đọc Sách', 'Kỹ Năng', 'Bí quyết giúp bạn duy trì thói quen...', '12/01/2026 • 5 phút đọc'],
        ['Review: Atomic Habits', 'Review Sách', 'Cuốn sách đã thay đổi cuộc sống...', '10/01/2026 • 10 phút đọc']
    ];

    for (let i = 0; i < 3; i++) {
        await blogCard(c, M + i * (400 + 40), y, blogs[i][0], blogs[i][1], blogs[i][2], blogs[i][3], fId.id);
    }
    y += 510;

    // 7. NEWSLETTER SECTION (350px)
    await rect(c, M, y, DS.container, 280, DS.colors.pri, DS.r.xl, fId.id);
    await text(c, M + DS.container / 2 - 250, y + 60, 'Đăng Ký Nhận Tin Mới Nhất', 36, 700, '#FFFFFF', fId.id);
    await text(c, M + DS.container / 2 - 350, y + 120, 'Nhận ngay voucher 50.000đ và cập nhật sách mới,\nkhuyến mãi đặc biệt mỗi tuần.', 16, 400, '#FFFFFF', fId.id, 700);
    await rect(c, M + 300, y + 180, 480, 56, '#FFFFFF', DS.r.full, fId.id);
    await text(c, M + 320, y + 198, 'Nhập email của bạn...', 16, 400, DS.colors.n400, fId.id);
    await rect(c, M + 800, y + 180, 180, 56, DS.colors.n900, DS.r.full, fId.id);
    await text(c, M + 830, y + 198, 'ĐĂNG KÝ NGAY', 14, 700, '#FFFFFF', fId.id);
    y += 320;

    // 8. TESTIMONIALS (3 reviews)
    await text(c, M, y, 'Khách Hàng Nói Gì', 36, 700, DS.colors.n900, fId.id);
    y += 60;

    const testimonials = [
        ['Nguyễn Văn An', 'Dịch vụ tuyệt vời! Sách đóng gói cẩn thận,\ngiao hàng nhanh chóng. Chắc chắn sẽ ủng hộ dài dài.'],
        ['Trần Thị Bình', 'Giá cả hợp lý, nhiều chương trình khuyến mãi.\nĐặc biệt là chương trình tích điểm rất hấp dẫn.'],
        ['Lê Minh Cường', 'Kho sách phong phú, dễ tìm kiếm.\nHỗ trợ khách hàng nhiệt tình. Rất hài lòng!']
    ];

    for (let i = 0; i < 3; i++) {
        const tx = M + i * (400 + 40);
        await rect(c, tx, y, 400, 200, DS.colors.n50, DS.r.lg, fId.id);
        await rect(c, tx + 24, y + 24, 48, 48, DS.colors.n200, DS.r.full, fId.id);
        await text(c, tx + 88, y + 32, testimonials[i][0], 16, 700, DS.colors.n900, fId.id);
        await text(c, tx + 88, y + 56, '⭐⭐⭐⭐⭐', 14, 400, DS.colors.warn, fId.id);
        await text(c, tx + 24, y + 100, testimonials[i][1], 14, 400, DS.colors.n600, fId.id, 352);
    }
    y += 240;

    // 9. UNIFIED FOOTER
    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Homepage generated!');
}

run().catch(console.error);
