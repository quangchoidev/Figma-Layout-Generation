const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('💳 Generating COMPLETE Checkout Step 2 (Payment)...');

    const X = PAGE_OFFSETS.checkoutStep2;
    const fId = await frame(c, X, 0, DS.w, 3200, '08. Checkout Step 2 - Payment');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    await text(c, M, y, 'Giỏ hàng > Thông tin giao hàng > Thanh toán', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    await text(c, M, y, 'Phương Thức Thanh Toán', 48, 800, DS.colors.n900, fId.id);
    y += 80;

    // PROGRESS INDICATOR
    await rect(c, M, y, 400, 48, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });
    await rect(c, M + 16, y + 12, 120, 24, DS.colors.succ, DS.r.full, fId.id);
    await text(c, M + 36, y + 16, '✓ Giao hàng', 14, 700, '#FFFFFF', fId.id);
    await rect(c, M + 152, y + 12, 120, 24, DS.colors.pri, DS.r.full, fId.id);
    await text(c, M + 168, y + 16, '2. Thanh toán', 14, 700, '#FFFFFF', fId.id);
    await rect(c, M + 288, y + 12, 96, 24, DS.colors.n100, DS.r.full, fId.id);
    await text(c, M + 304, y + 16, '3. Hoàn tất', 14, 600, DS.colors.n600, fId.id);
    y += 88;

    const summaryWidth = 380;
    const formWidth = DS.container - summaryWidth - 40;

    // === PAYMENT METHODS ===
    await rect(c, M, y, formWidth, 620, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let pY = y + 32;

    await text(c, M + 32, pY, 'Chọn Phương Thức Thanh Toán', 18, 700, DS.colors.n900, fId.id);
    pY += 56;

    const paymentMethods = [
        ['💳 Thẻ Tín Dụng / Ghi Nợ', 'Visa, MasterCard, JCB', true],
        ['🏦 Chuyển Khoản Ngân Hàng', 'Chuyển khoản trực tiếp', false],
        ['💵 Thanh Toán Khi Nhận Hàng (COD)', 'Thanh toán bằng tiền mặt', false],
        ['📱 Ví Điện Tử', 'Momo, ZaloPay, VNPay', false]
    ];

    for (let i = 0; i < paymentMethods.length; i++) {
        const method = paymentMethods[i];
        const mY = pY + i * 88;

        await rect(c, M + 32, mY, formWidth - 64, 72, method[2] ? DS.colors.priL : '#FFFFFF', DS.r.md, fId.id, { stroke: method[2] ? DS.colors.pri : DS.colors.n200 });

        // Radio button
        await rect(c, M + 48, mY + 26, 20, 20, '#FFFFFF', 999, fId.id, { stroke: method[2] ? DS.colors.pri : DS.colors.n400 });
        if (method[2]) {
            await rect(c, M + 53, mY + 31, 10, 10, DS.colors.pri, 999, fId.id);
        }

        // Text
        await text(c, M + 84, mY + 16, method[0], 16, 600, DS.colors.n900, fId.id);
        await text(c, M + 84, mY + 42, method[1], 14, 400, DS.colors.n600, fId.id);
    }

    pY += paymentMethods.length * 88 + 32;

    // CARD FORM (conditional on payment method)
    await rect(c, M, pY, formWidth, 360, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let cY = pY + 32;

    await text(c, M + 32, cY, 'Thông Tin Thẻ', 18, 700, DS.colors.n900, fId.id);
    cY += 56;

    // Card number
    await text(c, M + 32, cY, 'Số thẻ', 14, 600, DS.colors.n600, fId.id);
    cY += 28;
    await rect(c, M + 32, cY, formWidth - 64, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 48, cY + 18, '1234 5678 9012 3456', 16, 400, DS.colors.n400, fId.id);
    cY += 76;

    // Expiry and CVV (side by side)
    await text(c, M + 32, cY, 'Ngày hết hạn', 14, 600, DS.colors.n600, fId.id);
    await text(c, M + 340, cY, 'CVV', 14, 600, DS.colors.n600, fId.id);
    cY += 28;

    await rect(c, M + 32, cY, 260, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 48, cY + 18, 'MM/YY', 16, 400, DS.colors.n400, fId.id);

    await rect(c, M + 308, cY, 200, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 324, cY + 18, '***', 16, 400, DS.colors.n400, fId.id);

    // === ORDER SUMMARY (same as step 1) ===
    const summaryX = M + formWidth + 40;

    await rect(c, summaryX, y, summaryWidth, 580, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let sY = y + 32;

    await text(c, summaryX + 32, sY, 'Xác Nhận Đơn Hàng', 20, 700, DS.colors.n900, fId.id);
    sY += 60;

    // Shipping info
    await rect(c, summaryX + 32, sY, summaryWidth - 64, 80, DS.colors.n50, DS.r.md, fId.id);
    await text(c, summaryX + 48, sY + 16, 'Giao đến:', 14, 600, DS.colors.n600, fId.id);
    await text(c, summaryX + 48, sY + 38, 'Nguyễn Văn An', 14, 700, DS.colors.n900, fId.id);
    await text(c, summaryX + 48, sY + 58, '123 Đường Nguyễn Huệ...', 12, 400, DS.colors.n600, fId.id, 260);
    sY += 100;

    // Items
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

    await text(c, summaryX + 32, sY, 'Tổng cộng:', 18, 700, DS.colors.n900, fId.id);
    await text(c, summaryX + 200, sY, '610.000đ', 24, 800, DS.colors.pri, fId.id);
    sY += 60;

    // Place order button
    await rect(c, summaryX + 32, sY, summaryWidth - 64, 56, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, summaryX + 85, sY + 18, 'ĐẶT HÀNG', 16, 700, '#FFFFFF', fId.id);
    sY += 76;

    await text(c, summaryX + 60, sY, 'Bằng việc đặt hàng, bạn đồng ý\nvới điều khoản sử dụng', 12, 400, DS.colors.n600, fId.id, 260);

    y += 1080;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Checkout Step 2 generated!');
}

run().catch(console.error);
