const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📦 Generating COMPLETE Checkout Step 1 (Shipping)...');

    const X = PAGE_OFFSETS.checkoutStep1;
    const fId = await frame(c, X, 0, DS.w, 2800, '07. Checkout Step 1 - Shipping');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // BREADCRUMBS
    await text(c, M, y, 'Giỏ hàng > Thông tin giao hàng > Thanh toán', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    // PAGE TITLE
    await text(c, M, y, 'Thông Tin Giao Hàng', 48, 800, DS.colors.n900, fId.id);
    y += 80;

    // PROGRESS INDICATOR
    await rect(c, M, y, 400, 48, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });
    await rect(c, M + 16, y + 12, 120, 24, DS.colors.pri, DS.r.full, fId.id);
    await text(c, M + 36, y + 16, '1. Giao hàng', 14, 700, '#FFFFFF', fId.id);
    await rect(c, M + 152, y + 12, 120, 24, DS.colors.n100, DS.r.full, fId.id);
    await text(c, M + 168, y + 16, '2. Thanh toán', 14, 600, DS.colors.n600, fId.id);
    await rect(c, M + 288, y + 12, 96, 24, DS.colors.n100, DS.r.full, fId.id);
    await text(c, M + 304, y + 16, '3. Hoàn tất', 14, 600, DS.colors.n600, fId.id);
    y += 88;

    // LAYOUT: Form (left) + Order Summary (right)
    const summaryWidth = 380;
    const formWidth = DS.container - summaryWidth - 40;

    // === SHIPPING FORM ===
    await rect(c, M, y, formWidth, 900, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let fY = y + 32;

    // Form fields
    const fields = [
        ['Họ và tên', 'Nguyễn Văn An'],
        ['Số điện thoại', '0901234567'],
        ['Email', 'nguyenvanan@email.com'],
        ['Địa chỉ dòng 1', '123 Đường Nguyễn Huệ'],
        ['Địa chỉ dòng 2 (tùy chọn)', 'Phường Bến Nghé'],
        ['Thành phố / Tỉnh', 'Thành phố Hồ Chí Minh']
    ];

    for (let i = 0; i < fields.length; i++) {
        await text(c, M + 32, fY, fields[i][0], 14, 600, DS.colors.n600, fId.id);
        fY += 28;

        await rect(c, M + 32, fY, formWidth - 64, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
        await text(c, M + 48, fY + 18, fields[i][1], 16, 400, DS.colors.n900, fId.id);
        fY += 76;
    }

    fY += 20;

    // DELIVERY OPTIONS
    await text(c, M + 32, fY, 'Phương Thức Giao Hàng', 18, 700, DS.colors.n900, fId.id);
    fY += 48;

    const deliveryOptions = [
        ['Giao hàng tiêu chuẩn', '3-5 ngày làm việc', 'Miễn phí', true],
        ['Giao hàng nhanh', '1-2 ngày làm việc', '30.000đ', false],
        ['Giao hàng trong ngày', 'Trong ngày hôm nay', '50.000đ', false]
    ];

    for (let i = 0; i < deliveryOptions.length; i++) {
        const opt = deliveryOptions[i];
        const optY = fY + i * 80;

        await rect(c, M + 32, optY, formWidth - 64, 64, opt[3] ? DS.colors.priL : '#FFFFFF', DS.r.md, fId.id, { stroke: opt[3] ? DS.colors.pri : DS.colors.n200 });

        // Radio button
        await rect(c, M + 48, optY + 22, 20, 20, '#FFFFFF', 999, fId.id, { stroke: opt[3] ? DS.colors.pri : DS.colors.n400 });
        if (opt[3]) {
            await rect(c, M + 53, optY + 27, 10, 10, DS.colors.pri, 999, fId.id);
        }

        // Text
        await text(c, M + 84, optY + 12, opt[0], 16, 600, DS.colors.n900, fId.id);
        await text(c, M + 84, optY + 38, opt[1], 14, 400, DS.colors.n600, fId.id);
        await text(c, M + formWidth - 120, optY + 24, opt[2], 16, 700, DS.colors.pri, fId.id);
    }

    // === ORDER SUMMARY SIDEBAR ===
    const summaryX = M + formWidth + 40;

    await rect(c, summaryX, y, summaryWidth, 520, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let sY = y + 32;

    await text(c, summaryX + 32, sY, 'Đơn Hàng Của Bạn', 20, 700, DS.colors.n900, fId.id);
    sY += 60;

    // Order items
    const items = [
        ['Mắt Biếc × 2', '250.000đ'],
        ['Nhà Giả Kim × 1', '110.000đ'],
        ['Sapiens × 1', '250.000đ']
    ];

    for (const item of items) {
        await text(c, summaryX + 32, sY, item[0], 14, 400, DS.colors.n600, fId.id);
        await text(c, summaryX + 260, sY, item[1], 14, 600, DS.colors.n900, fId.id);
        sY += 32;
    }

    sY += 20;
    await rect(c, summaryX + 32, sY, summaryWidth - 64, 1, DS.colors.n200, 0, fId.id);
    sY += 32;

    // Summary
    await text(c, summaryX + 32, sY, 'Tạm tính:', 16, 400, DS.colors.n600, fId.id);
    await text(c, summaryX + 240, sY, '610.000đ', 16, 600, DS.colors.n900, fId.id);
    sY += 36;

    await text(c, summaryX + 32, sY, 'Vận chuyển:', 16, 400, DS.colors.n600, fId.id);
    await text(c, summaryX + 240, sY, 'Miễn phí', 16, 600, DS.colors.succ, fId.id);
    sY += 36;

    await rect(c, summaryX + 32, sY, summaryWidth - 64, 1, DS.colors.n200, 0, fId.id);
    sY += 32;

    await text(c, summaryX + 32, sY, 'Tổng cộng:', 18, 700, DS.colors.n900, fId.id);
    await text(c, summaryX + 200, sY, '610.000đ', 24, 800, DS.colors.pri, fId.id);
    sY += 60;

    // Continue button
    await rect(c, summaryX + 32, sY, summaryWidth - 64, 56, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, summaryX + 88, sY + 18, 'TIẾP TỤC', 16, 700, '#FFFFFF', fId.id);

    y += 980;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Checkout Step 1 generated!');
}

run().catch(console.error);
