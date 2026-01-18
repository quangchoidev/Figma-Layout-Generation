const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter, productCard } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('🛒 Generating COMPLETE Shop Grid Page...');

    const X = PAGE_OFFSETS.shopGrid;
    const fId = await frame(c, X, 0, DS.w, 3500, '02. Shop Grid - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    // UNIFIED HEADER
    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // BREADCRUMBS
    await text(c, M, y, 'Trang chủ > Cửa hàng', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    // PAGE TITLE
    await text(c, M, y, 'Cửa Hàng', 48, 800, DS.colors.n900, fId.id);
    await text(c, M, y + 60, 'Khám phá hơn 50.000 đầu sách', 18, 400, DS.colors.n600, fId.id);
    y += 140;

    // LAYOUT: Sidebar (280px) + Product Grid
    const sidebarWidth = 280;
    const gridStartX = M + sidebarWidth + 40;

    // === SIDEBAR ===
    await rect(c, M, y, sidebarWidth, 1200, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });

    let sY = y + 24;

    // Categories filter
    await text(c, M + 16, sY, 'Danh Mục', 18, 700, DS.colors.n900, fId.id);
    sY += 40;
    const cats = ['Văn học', 'Kinh tế', 'Thiếu nhi', 'Khoa học', 'Nghệ thuật'];
    for (const cat of cats) {
        await rect(c, M + 16, sY, 16, 16, '#FFFFFF', 4, fId.id, { stroke: DS.colors.n400 });
        await text(c, M + 40, sY + 2, cat, 14, 400, DS.colors.n600, fId.id);
        sY += 32;
    }
    sY += 20;

    // Price range
    await text(c, M + 16, sY, 'Khoảng Giá', 18, 700, DS.colors.n900, fId.id);
    sY += 40;
    await rect(c, M + 16, sY, 248, 4, DS.colors.n200, DS.r.full, fId.id);
    await rect(c, M + 16, sY, 120, 4, DS.colors.pri, DS.r.full, fId.id);
    await text(c, M + 16, sY + 20, '0đ - 500.000đ', 14, 400, DS.colors.n600, fId.id);
    sY += 60;

    // Rating
    await text(c, M + 16, sY, 'Đánh Giá', 18, 700, DS.colors.n900, fId.id);
    sY += 40;
    for (let i = 5; i >= 1; i--) {
        await rect(c, M + 16, sY, 16, 16, '#FFFFFF', 4, fId.id, { stroke: DS.colors.n400 });
        await text(c, M + 40, sY + 2, '⭐'.repeat(i), 14, 400, DS.colors.warn, fId.id);
        sY += 32;
    }

    // === PRODUCT GRID ===
    // Sort bar
    await rect(c, gridStartX, y, 920, 48, '#FFFFFF', DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, gridStartX + 16, y + 16, 'Sắp xếp theo:', 14, 600, DS.colors.n900, fId.id);
    await rect(c, gridStartX + 720, y + 8, 180, 32, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, gridStartX + 740, y + 16, 'Bán chạy nhất', 14, 400, DS.colors.n600, fId.id);

    let gridY = y + 80;

    // Products (4x3 = 12 products)
    const products = [
        ['Mắt Biếc', 'Nguyễn Nhật Ánh', '125.000đ'],
        ['Nhà Giả Kim', 'Paulo Coelho', '110.000đ'],
        ['Sapiens', 'Yuval Noah Harari', '250.000đ'],
        ['Đắc Nhân Tâm', 'Dale Carnegie', '95.000đ'],
        ['Tôi Thấy Hoa Vàng...', 'Nguyễn Nhật Ánh', '115.000đ'],
        ['Atomic Habits', 'James Clear', '180.000đ'],
        ['Hoàng Tử Bé', 'Antoine de Saint', '65.000đ'],
        ['Tâm Lý Học Tội Phạm', 'Diệp Hồng Vũ', '145.000đ'],
        ['Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', '89.000đ'],
        ['Cây Cam Ngọt Của Tôi', 'José Mauro', '92.000đ'],
        ['Bố Già', 'Mario Puzo', '175.000đ'],
        ['Sherlock Holmes', 'Arthur Conan Doyle', '220.000đ']
    ];

    for (let i = 0; i < 12; i++) {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const px = gridStartX + col * (220 + 20);
        const py = gridY + row * (420);
        await productCard(c, px, py, products[i][0], products[i][1], products[i][2], fId.id);
    }

    gridY += 3 * 420 + 40;

    // Pagination
    await rect(c, gridStartX + 300, gridY, 40, 40, DS.colors.pri, DS.r.sm, fId.id);
    await text(c, gridStartX + 315, gridY + 13, '1', 16, 700, '#FFFFFF', fId.id);
    await rect(c, gridStartX + 356, gridY, 40, 40, DS.colors.n100, DS.r.sm, fId.id);
    await text(c, gridStartX + 371, gridY + 13, '2', 16, 400, DS.colors.n600, fId.id);
    await rect(c, gridStartX + 412, gridY, 40, 40, DS.colors.n100, DS.r.sm, fId.id);
    await text(c, gridStartX + 427, gridY + 13, '3', 16, 400, DS.colors.n600, fId.id);

    y = gridY + 80;

    // UNIFIED FOOTER
    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Shop Grid generated!');
}

run().catch(console.error);
