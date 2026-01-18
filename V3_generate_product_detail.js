const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter, productCard } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📖 Generating COMPLETE Product Detail Page...');

    const X = PAGE_OFFSETS.productDetail;
    const fId = await frame(c, X, 0, DS.w, 4500, '04. Product Detail - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // BREADCRUMBS
    await text(c, M, y, 'Trang chủ > Văn Học Việt Nam > Tiểu Thuyết > Mắt Biếc', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    // MAIN LAYOUT
    const galleryWidth = 600;
    const contentStartX = M + galleryWidth + 60;

    // GALLERY
    await rect(c, M, y, galleryWidth, 600, DS.colors.n100, DS.r.lg, fId.id);
    await text(c, M + 250, y + 280, '[Main Image]', 20, 600, DS.colors.n400, fId.id);

    // Thumbnails
    for (let i = 0; i < 4; i++) {
        const thumbX = M + i * (145 + 10);
        await rect(c, thumbX, y + 620, 145, 145, DS.colors.n100, DS.r.md, fId.id, { stroke: i === 0 ? DS.colors.pri : DS.colors.n200 });
    }

    // PRODUCT INFO
    await text(c, contentStartX, y, 'Mắt Biếc (Tái Bản 2024)', 48, 800, DS.colors.n900, fId.id, 600);
    await text(c, contentStartX, y + 80, 'Tác giả: Nguyễn Nhật Ánh', 20, 600, DS.colors.pri, fId.id);
    await text(c, contentStartX, y + 120, '⭐⭐⭐⭐⭐ (4.8/5 - 1,234 đánh giá)', 16, 400, DS.colors.warn, fId.id);

    await text(c, contentStartX, y + 180, '125.000đ', 40, 800, DS.colors.n900, fId.id);
    await text(c, contentStartX + 180, y + 190, '150.000đ', 20, 400, DS.colors.n400, fId.id);
    await rect(c, contentStartX + 170, y + 200, 80, 2, DS.colors.n400, 0, fId.id);
    await rect(c, contentStartX + 280, y + 185, 80, 32, DS.colors.err, DS.r.full, fId.id);
    await text(c, contentStartX + 295, y + 193, '-17%', 14, 700, '#FFFFFF', fId.id);

    // DESCRIPTION
    await text(c, contentStartX, y + 260, 'Mô Tả Sản Phẩm', 18, 700, DS.colors.n900, fId.id);
    await text(c, contentStartX, y + 300, 'Mắt Biếc là một tác phẩm kinh điển của văn học Việt Nam\nđương đại, kể về câu chuyện tình yêu thuở thanh xuân\ntrong sáng và đầy cảm xúc.', 16, 400, DS.colors.n600, fId.id, 600);

    // QUANTITY + ADD TO CART
    await rect(c, contentStartX, y + 450, 150, 56, '#FFFFFF', DS.r.full, fId.id, { stroke: DS.colors.n200 });
    await text(c, contentStartX + 25, y + 468, '-', 24, 700, DS.colors.n900, fId.id);
    await text(c, contentStartX + 68, y + 468, '1', 18, 700, DS.colors.n900, fId.id);
    await text(c, contentStartX + 115, y + 468, '+', 24, 700, DS.colors.n900, fId.id);

    await rect(c, contentStartX + 170, y + 450, 430, 56, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, contentStartX + 290, y + 468, 'THÊM VÀO GIỎ HÀNG', 16, 700, '#FFFFFF', fId.id);

    y += 800;

    // SPECS TABLE
    await rect(c, M, y, DS.container, 1, DS.colors.n200, 0, fId.id);
    await text(c, M, y + 40, 'Thông Số Kỹ Thuật', 24, 700, DS.colors.n900, fId.id);
    y += 90;

    const specs = [
        ['Nhà xuất bản', 'NXB Trẻ'],
        ['Năm xuất bản', '2020'],
        ['Số trang', '256'],
        ['Kích thước', '14 x 20.5 cm'],
        ['Loại bìa', 'Bìa mềm'],
        ['Ngôn ngữ', 'Tiếng Việt']
    ];

    for (let i = 0; i < specs.length; i++) {
        await rect(c, M, y + i * 60, DS.container, 60, i % 2 === 0 ? '#FFFFFF' : DS.colors.n50, 0, fId.id);
        await text(c, M + 32, y + i * 60 + 22, specs[i][0], 16, 600, DS.colors.n900, fId.id);
        await text(c, M + 400, y + i * 60 + 22, specs[i][1], 16, 400, DS.colors.n600, fId.id);
    }
    y += 400;

    // REVIEWS
    await rect(c, M, y, DS.container, 1, DS.colors.n200, 0, fId.id);
    await text(c, M, y + 40, 'Đánh Giá Từ Khách Hàng (5 reviews)', 24, 700, DS.colors.n900, fId.id);
    y += 90;

    const reviews = [
        ['Mai Phương', 'Cuốn sách hay nhất tôi từng đọc. Cảm xúc rất chân thực.', '20/12/2025'],
        ['Hoàng Nam', 'Nguyễn Nhật Ánh viết về tình yêu tuổi học trò rất tinh tế. Đáng đọc!', '15/12/2025'],
        ['Lan Anh', 'Giao hàng nhanh, sách đóng gói cẩn thận. Nội dung cảm động.', '10/12/2025'],
        ['Minh Tuấn', 'Một tác phẩm kinh điển. Ai cũng nên đọc ít nhất một lần.', '05/12/2025'],
        ['Thu Hà', 'Văn phong Nguyễn Nhật Ánh rất đặc trưng. Rất thích!', '01/12/2025']
    ];

    for (let i = 0; i < reviews.length; i++) {
        await rect(c, M, y, DS.container, 140, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });
        await rect(c, M + 24, y + 24, 48, 48, DS.colors.n200, DS.r.full, fId.id);
        await text(c, M + 88, y + 28, reviews[i][0], 16, 700, DS.colors.n900, fId.id);
        await text(c, M + 88, y + 52, '⭐⭐⭐⭐⭐', 14, 400, DS.colors.warn, fId.id);
        await text(c, M + 200, y + 52, reviews[i][2], 12, 400, DS.colors.n400, fId.id);
        await text(c, M + 24, y + 90, reviews[i][1], 14, 400, DS.colors.n600, fId.id, 1200);
        y += 160;
    }

    y += 40;

    // RELATED PRODUCTS
    await rect(c, M, y, DS.container, 1, DS.colors.n200, 0, fId.id);
    await text(c, M, y + 40, 'Sản Phẩm Liên Quan', 24, 700, DS.colors.n900, fId.id);
    y += 90;

    const related = [
        ['Tôi Thấy Hoa Vàng...', 'Nguyễn Nhật Ánh', '115.000đ'],
        ['Cho Tôi Xin Một Vé...', 'Nguyễn Nhật Ánh', '105.000đ'],
        ['Cây Cam Ngọt Của Tôi', 'José Mauro', '92.000đ'],
        ['Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', '89.000đ']
    ];

    for (let i = 0; i < 4; i++) {
        await productCard(c, M + i * (300), y, related[i][0], related[i][1], related[i][2], fId.id);
    }

    y += 440;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Product Detail generated!');
}

run().catch(console.error);
