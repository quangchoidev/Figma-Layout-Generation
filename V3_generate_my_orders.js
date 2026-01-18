const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📦 Generating COMPLETE My Orders Page...');

    const X = PAGE_OFFSETS.myOrders;
    const fId = await frame(c, X, 0, DS.w, 2400, '12. My Orders - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    await text(c, M, y, 'Trang chủ > Tài khoản > Đơn hàng', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    await text(c, M, y, 'Đơn Hàng Của Tôi', 48, 800, DS.colors.n900, fId.id);
    y += 100;

    // FILTER BAR
    await rect(c, M, y, DS.container, 60, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 24, y + 22, 'Lọc theo:', 14, 600, DS.colors.n900, fId.id);

    const filters = ['Tất cả', 'Đang xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'];
    for (let i = 0; i < filters.length; i++) {
        const fx = M + 140 + i * 160;
        const isActive = i === 0;
        await rect(c, fx, y + 15, 140, 32, isActive ? DS.colors.pri : DS.colors.n50, DS.r.full, fId.id, { stroke: isActive ? DS.colors.pri : DS.colors.n200 });
        await text(c, fx + 20, y + 23, filters[i], 14, 600, isActive ? '#FFFFFF' : DS.colors.n600, fId.id);
    }
    y += 100;

    // ORDERS TABLE
    await rect(c, M, y, DS.container, 600, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    // Table header
    await rect(c, M, y, DS.container, 56, DS.colors.n100, DS.r.lg, fId.id);
    await text(c, M + 32, y + 20, 'Mã Đơn', 14, 700, DS.colors.n900, fId.id);
    await text(c, M + 240, y + 20, 'Ngày', 14, 700, DS.colors.n900, fId.id);
    await text(c, M + 440, y + 20, 'Sản Phẩm', 14, 700, DS.colors.n900, fId.id);
    await text(c, M + 640, y + 20, 'Tổng Tiền', 14, 700, DS.colors.n900, fId.id);
    await text(c, M + 840, y + 20, 'Trạng Thái', 14, 700, DS.colors.n900, fId.id);
    await text(c, M + 1040, y + 20, 'Thao Tác', 14, 700, DS.colors.n900, fId.id);

    let tY = y + 56;

    // Table rows
    const orders = [
        ['#ORD-001', '18/01/2026', '3', '610.000đ', 'Đang giao', DS.colors.warn],
        ['#ORD-002', '15/01/2026', '2', '225.000đ', 'Hoàn thành', DS.colors.succ],
        ['#ORD-003', '10/01/2026', '5', '890.000đ', 'Hoàn thành', DS.colors.succ],
        ['#ORD-004', '05/01/2026', '1', '125.000đ', 'Hoàn thành', DS.colors.succ],
        ['#ORD-005', '01/01/2026', '4', '520.000đ', 'Đã hủy', DS.colors.err]
    ];

    for (let i = 0; i < orders.length; i++) {
        const rowBg = i % 2 === 0 ? '#FFFFFF' : DS.colors.n50;
        await rect(c, M, tY, DS.container, 80, rowBg, 0, fId.id, { stroke: DS.colors.n200 });

        await text(c, M + 32, tY + 28, orders[i][0], 14, 700, DS.colors.n900, fId.id);
        await text(c, M + 240, tY + 28, orders[i][1], 14, 400, DS.colors.n600, fId.id);
        await text(c, M + 440, tY + 28, orders[i][2] + ' sản phẩm', 14, 400, DS.colors.n600, fId.id);
        await text(c, M + 640, tY + 28, orders[i][3], 14, 700, DS.colors.pri, fId.id);

        // Status badge
        await rect(c, M + 840, tY + 20, 120, 32, orders[i][5] + '33', DS.r.full, fId.id);
        await text(c, M + 860, tY + 28, orders[i][4], 12, 600, orders[i][5], fId.id);

        // Action buttons
        await rect(c, M + 1040, tY + 20, 80, 32, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
        await text(c, M + 1056, tY + 28, 'Xem', 12, 600, DS.colors.n900, fId.id);

        await rect(c, M + 1136, tY + 20, 80, 32, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
        await text(c, M + 1144, tY + 28, 'Theo dõi', 12, 600, DS.colors.n900, fId.id);

        tY += 80;
    }

    y = tY + 60;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete My Orders generated!');
}

run().catch(console.error);
