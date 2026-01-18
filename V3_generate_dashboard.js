const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📊 Generating COMPLETE Dashboard Page...');

    const X = PAGE_OFFSETS.dashboard;
    const fId = await frame(c, X, 0, DS.w, 2200, '11. Dashboard - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // LAYOUT: Sidebar (280px) + Main Content
    const sidebarWidth = 280;
    const contentStartX = M + sidebarWidth + 40;

    // === SIDEBAR MENU ===
    await rect(c, M, y, sidebarWidth, 600, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let sY = y + 32;

    const menuItems = [
        ['📊 Tổng Quan', true],
        ['📦 Đơn Hàng', false],
        ['❤️ Yêu Thích', false],
        ['📍 Địa Chỉ', false],
        ['⚙️ Cài Đặt', false],
        ['🚪 Đăng Xuất', false]
    ];

    for (const item of menuItems) {
        await rect(c, M + 16, sY, sidebarWidth - 32, 48, item[1] ? DS.colors.priL : 'transparent', DS.r.md, fId.id);
        await text(c, M + 32, sY + 16, item[0], 14, item[1] ? 700 : 400, item[1] ? DS.colors.pri : DS.colors.n600, fId.id);
        sY += 56;
    }

    // === MAIN CONTENT ===
    // Welcome banner
    await rect(c, contentStartX, y, 920, 120, DS.colors.priL, DS.r.xl, fId.id);
    await text(c, contentStartX + 40, y + 28, 'Xin chào, Nguyễn Văn An! 👋', 32, 700, DS.colors.n900, fId.id);
    await text(c, contentStartX + 40, y + 72, 'Chào mừng bạn quay lại. Dưới đây là tổng quan tài khoản của bạn.', 16, 400, DS.colors.n600, fId.id);

    let cY = y + 160;

    // STAT CARDS (4 cards in a row)
    const stats = [
        ['📦', 'Tổng Đơn Hàng', '24'],
        ['💰', 'Tổng Chi Tiêu', '5.2M đ'],
        ['⭐', 'Điểm Tích Lũy', '1,234'],
        ['❤️', 'Sách Yêu Thích', '18']
    ];

    for (let i = 0; i < stats.length; i++) {
        const sx = contentStartX + i * 220;
        await rect(c, sx, cY, 200, 160, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
        await text(c, sx + 24, cY + 28, stats[i][0], 32, 400, DS.colors.pri, fId.id);
        await text(c, sx + 24, cY + 84, stats[i][1], 14, 500, DS.colors.n600, fId.id);
        await text(c, sx + 24, cY + 112, stats[i][2], 28, 800, DS.colors.n900, fId.id);
    }

    cY += 200;

    // RECENT ORDERS
    await text(c, contentStartX, cY, 'Đơn Hàng Gần Đây', 24, 700, DS.colors.n900, fId.id);
    cY += 60;

    const orders = [
        ['#ORD-001', '18/01/2026', '3 sản phẩm', '610.000đ', 'Đang giao'],
        ['#ORD-002', '15/01/2026', '2 sản phẩm', '225.000đ', 'Hoàn thành'],
        ['#ORD-003', '10/01/2026', '5 sản phẩm', '890.000đ', 'Hoàn thành']
    ];

    for (let i = 0; i < orders.length; i++) {
        await rect(c, contentStartX, cY, 920, 100, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

        await text(c, contentStartX + 24, cY + 20, orders[i][0], 16, 700, DS.colors.n900, fId.id);
        await text(c, contentStartX + 24, cY + 50, orders[i][1], 14, 400, DS.colors.n600, fId.id);

        await text(c, contentStartX + 240, cY + 36, orders[i][2], 14, 400, DS.colors.n600, fId.id);

        await text(c, contentStartX + 460, cY + 36, orders[i][3], 16, 700, DS.colors.pri, fId.id);

        const statusColor = orders[i][4] === 'Đang giao' ? DS.colors.warn : DS.colors.succ;
        await rect(c, contentStartX + 640, cY + 28, 120, 32, statusColor + '33', DS.r.full, fId.id);
        await text(c, contentStartX + 660, cY + 36, orders[i][4], 12, 600, statusColor, fId.id);

        await rect(c, contentStartX + 780, cY + 28, 100, 32, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
        await text(c, contentStartX + 800, cY + 36, 'Xem chi tiết', 12, 600, DS.colors.n900, fId.id);

        cY += 120;
    }

    y = cY + 40;
    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Dashboard generated!');
}

run().catch(console.error);
