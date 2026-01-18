const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter, productCard } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('🛒 Generating COMPLETE Cart Page...');

    const X = PAGE_OFFSETS.cart;
    const fId = await frame(c, X, 0, DS.w, 3500, '06. Cart Page - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    // UNIFIED HEADER
    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // BREADCRUMBS
    await text(c, M, y, 'Trang chủ > Giỏ hàng', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    // PAGE TITLE
    await text(c, M, y, 'Giỏ Hàng Của Bạn', 48, 800, DS.colors.n900, fId.id);
    await text(c, M, y + 60, 'Bạn có 3 sản phẩm trong giỏ hàng', 16, 400, DS.colors.n600, fId.id);
    y += 140;

    // LAYOUT: Cart Items (left) + Summary (right sidebar)
    const summaryWidth = 380;
    const cartItemsWidth = DS.container - summaryWidth - 40;

    // === CART ITEMS ===
    const cartItems = [
        ['Mắt Biếc', 'Nguyễn Nhật Ánh', '125.000đ', 2, '250.000đ'],
        ['Nhà Giả Kim', 'Paulo Coelho', '110.000đ', 1, '110.000đ'],
        ['Sapiens', 'Yuval Noah Harari', '250.000đ', 1, '250.000đ']
    ];

    for (let i = 0; i < cartItems.length; i++) {
        const itemY = y + i * 180;

        // Cart item card
        await rect(c, M, itemY, cartItemsWidth, 160, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

        // Product image
        await rect(c, M + 16, itemY + 16, 120, 128, DS.colors.n100, DS.r.md, fId.id);

        // Product info
        const infoX = M + 156;
        await text(c, infoX, itemY + 20, cartItems[i][0], 18, 700, DS.colors.n900, fId.id, 400);
        await text(c, infoX, itemY + 52, cartItems[i][1], 14, 400, DS.colors.n600, fId.id);
        await text(c, infoX, itemY + 80, cartItems[i][2], 16, 600, DS.colors.pri, fId.id);

        // Quantity stepper
        const stepperX = infoX;
        const stepperY = itemY + 110;
        await rect(c, stepperX, stepperY, 32, 32, DS.colors.n100, DS.r.sm, fId.id, { stroke: DS.colors.n200 });
        await text(c, stepperX + 11, stepperY + 6, '−', 18, 700, DS.colors.n900, fId.id);

        await rect(c, stepperX + 40, stepperY, 60, 32, '#FFFFFF', DS.r.sm, fId.id, { stroke: DS.colors.n200 });
        await text(c, stepperX + 63, stepperY + 8, cartItems[i][3].toString(), 16, 600, DS.colors.n900, fId.id);

        await rect(c, stepperX + 108, stepperY, 32, 32, DS.colors.n100, DS.r.sm, fId.id, { stroke: DS.colors.n200 });
        await text(c, stepperX + 118, stepperY + 6, '+', 18, 700, DS.colors.n900, fId.id);

        // Quantity label
        await text(c, stepperX + 160, stepperY + 8, `× ${cartItems[i][3]} = ${cartItems[i][4]}`, 14, 400, DS.colors.n600, fId.id);

        // Remove button
        await rect(c, M + cartItemsWidth - 120, itemY + 60, 100, 36, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
        await text(c, M + cartItemsWidth - 100, itemY + 68, '🗑 Xóa', 14, 600, DS.colors.err, fId.id);
    }

    y += cartItems.length * 180 + 20;

    // COUPON INPUT
    await rect(c, M, y, cartItemsWidth, 60, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 24, y + 12, 'Mã giảm giá', 14, 600, DS.colors.n900, fId.id);
    await rect(c, M + 24, y + 36, cartItemsWidth - 180, 40, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 40, y + 46, 'Nhập mã giảm giá...', 14, 400, DS.colors.n400, fId.id);
    await rect(c, M + cartItemsWidth - 140, y + 36, 120, 40, DS.colors.pri, DS.r.md, fId.id);
    await text(c, M + cartItemsWidth - 110, y + 46, 'Áp dụng', 14, 700, '#FFFFFF', fId.id);

    // === SUMMARY SIDEBAR ===
    const summaryX = M + cartItemsWidth + 40;
    const summaryStartY = 300; // Bắt đầu từ vị trí cố định để luôn visible

    await rect(c, summaryX, summaryStartY, summaryWidth, 440, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let sY = summaryStartY + 32;

    // Summary header
    await text(c, summaryX + 32, sY, 'Tóm Tắt Đơn Hàng', 20, 700, DS.colors.n900, fId.id);
    sY += 60;

    // Divider
    await rect(c, summaryX + 32, sY, summaryWidth - 64, 1, DS.colors.n200, 0, fId.id);
    sY += 32;

    // Subtotal
    await text(c, summaryX + 32, sY, 'Tạm tính:', 16, 400, DS.colors.n600, fId.id);
    await text(c, summaryX + 240, sY, '610.000đ', 16, 600, DS.colors.n900, fId.id);
    sY += 40;

    // Shipping
    await text(c, summaryX + 32, sY, 'Phí vận chuyển:', 16, 400, DS.colors.n600, fId.id);
    await text(c, summaryX + 240, sY, '30.000đ', 16, 600, DS.colors.n900, fId.id);
    sY += 40;

    // Discount
    await text(c, summaryX + 32, sY, 'Giảm giá:', 16, 400, DS.colors.n600, fId.id);
    await text(c, summaryX + 240, sY, '-50.000đ', 16, 600, DS.colors.succ, fId.id);
    sY += 40;

    // Divider
    await rect(c, summaryX + 32, sY, summaryWidth - 64, 1, DS.colors.n200, 0, fId.id);
    sY += 32;

    // Total
    await text(c, summaryX + 32, sY, 'Tổng cộng:', 18, 700, DS.colors.n900, fId.id);
    await text(c, summaryX + 200, sY, '590.000đ', 24, 800, DS.colors.pri, fId.id);
    sY += 60;

    // Checkout button
    await rect(c, summaryX + 32, sY, summaryWidth - 64, 56, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, summaryX + 110, sY + 18, 'THANH TOÁN', 16, 700, '#FFFFFF', fId.id);
    sY += 76;

    // Continue shopping link
    await text(c, summaryX + 80, sY, '← Tiếp tục mua sắm', 14, 400, DS.colors.pri, fId.id);

    y += 100;

    // === RECOMMENDED PRODUCTS ===
    await rect(c, M, y, DS.container, 1, DS.colors.n200, 0, fId.id);
    await text(c, M, y + 40, 'Có Thể Bạn Cũng Thích', 32, 700, DS.colors.n900, fId.id);
    y += 100;

    const recommended = [
        ['Đắc Nhân Tâm', 'Dale Carnegie', '95.000đ'],
        ['Tuổi Trẻ Đáng Giá...', 'Rosie Nguyễn', '80.000đ'],
        ['Cà Phê Cùng Tony', 'Tony Buổi Sáng', '75.000đ'],
        ['Hoàng Tử Bé', 'Antoine de Saint', '65.000đ']
    ];

    for (let i = 0; i < 4; i++) {
        await productCard(c, M + i * (300), y, recommended[i][0], recommended[i][1], recommended[i][2], fId.id);
    }

    y += 440;

    // UNIFIED FOOTER
    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Cart Page generated!');
}

run().catch(console.error);
