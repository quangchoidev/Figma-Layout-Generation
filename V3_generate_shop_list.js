const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📋 Generating COMPLETE Shop List Page...');

    const X = PAGE_OFFSETS.shopList;
    const fId = await frame(c, X, 0, DS.w, 3200, '03. Shop List - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    await text(c, M, y, 'Trang chủ > Cửa hàng > Danh sách', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    await text(c, M, y, 'Danh Sách Sản Phẩm', 48, 800, DS.colors.n900, fId.id);
    y += 100;

    const sidebarWidth = 280;
    const listStartX = M + sidebarWidth + 40;

    // Sidebar (same as Shop Grid)
    await rect(c, M, y, sidebarWidth, 800, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 24, 'Bộ Lọc', 18, 700, DS.colors.n900, fId.id);

    // List products (200px height each)
    const products = [
        ['Mắt Biếc', 'Nguyễn Nhật Ánh', '125.000đ', '⭐⭐⭐⭐⭐', 'Tác phẩm kinh điển của văn học Việt Nam đương đại...'],
        ['Nhà Giả Kim', 'Paulo Coelho', '110.000đ', '⭐⭐⭐⭐⭐', 'Hành trình tìm kiếm kho báu và ý nghĩa cuộc đời...'],
        ['Sapiens', 'Yuval Noah Harari', '250.000đ', '⭐⭐⭐⭐⭐', 'Lịch sử loài người từ thời kỳ đồ đá đến hiện đại...'],
        ['Đắc Nhân Tâm', 'Dale Carnegie', '95.000đ', '⭐⭐⭐⭐⭐', 'Nghệ thuật giao tiếp và ứng xử trong cuộc sống...'],
        ['Atomic Habits', 'James Clear', '180.000đ', '⭐⭐⭐⭐⭐', 'Xây dựng thói quen tốt và loại bỏ thói quen xấu...']
    ];

    for (let i = 0; i < products.length; i++) {
        const py = y + i * 220;
        await rect(c, listStartX, py, 920, 200, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

        // Image (25%)
        await rect(c, listStartX + 16, py + 16, 220, 168, DS.colors.n100, DS.r.md, fId.id);

        // Details (75%)
        const detailsX = listStartX + 252;
        await text(c, detailsX, py + 20, products[i][0], 20, 700, DS.colors.n900, fId.id, 620);
        await text(c, detailsX, py + 52, products[i][1], 16, 400, DS.colors.n600, fId.id);
        await text(c, detailsX, py + 80, products[i][3], 14, 400, DS.colors.warn, fId.id);
        await text(c, detailsX, py + 110, products[i][4], 14, 400, DS.colors.n600, fId.id, 600);
        await text(c, detailsX, py + 148, products[i][2], 20, 700, DS.colors.pri, fId.id);
        await rect(c, detailsX + 520, py + 140, 140, 40, DS.colors.pri, DS.r.full, fId.id);
        await text(c, detailsX + 540, py + 150, 'Thêm vào giỏ', 14, 700, '#FFFFFF', fId.id);
    }

    y += products.length * 220 + 60;
    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Shop List generated!');
}

run().catch(console.error);
