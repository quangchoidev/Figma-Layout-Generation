const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('✅ Generating COMPLETE Order Success Page...');

    const X = PAGE_OFFSETS.orderSuccess;
    const fId = await frame(c, X, 0, DS.w, 2200, '09. Order Success - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 120;

    // SUCCESS ICON
    await rect(c, DS.w / 2 - 60, y, 120, 120, DS.colors.succL, 999, fId.id);
    await text(c, DS.w / 2 - 25, y + 25, '✓', 64, 800, DS.colors.succ, fId.id);
    y += 180;

    // SUCCESS MESSAGE
    await text(c, DS.w / 2 - 250, y, 'Đặt Hàng Thành Công!', 48, 800, DS.colors.n900, fId.id);
    y += 80;

    await text(c, DS.w / 2 - 320, y, 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn\nvà gửi email xác nhận trong ít phút.', 18, 400, DS.colors.n600, fId.id, 640);
    y += 120;

    // ORDER INFO CARD
    await rect(c, M + 200, y, 880, 280, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let oY = y + 40;

    // Order details grid
    const details = [
        ['Mã đơn hàng:', '#ORD-20260118-001'],
        ['Ngày đặt hàng:', '18/01/2026 18:00'],
        ['Tổng tiền:', '610.000đ'],
        ['Phương thức thanh toán:', 'Thẻ tín dụng'],
        ['Địa chỉ giao hàng:', '123 Đường Nguyễn Huệ, Quận 1, TP.HCM'],
        ['Dự kiến giao:', '22-24/01/2026']
    ];

    for (let i = 0; i < details.length; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const dx = M + 240 + col * 420;
        const dy = oY + row * 70;

        await text(c, dx, dy, details[i][0], 14, 600, DS.colors.n600, fId.id);
        await text(c, dx, dy + 28, details[i][1], 16, 700, DS.colors.n900, fId.id, 360);
    }

    y += 340;

    // ACTION BUTTONS
    await rect(c, M + 360, y, 200, 56, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, M + 395, y + 18, 'THEO DÕI ĐƠN HÀNG', 14, 700, '#FFFFFF', fId.id);

    await rect(c, M + 580, y, 200, 56, '#FFFFFF', DS.r.full, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 610, y + 18, 'Tiếp tục mua sắm', 14, 600, DS.colors.n900, fId.id);

    y += 120;

    // WHAT'S NEXT
    await text(c, M, y, 'Bước Tiếp Theo', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const steps = [
        ['1️⃣ Xác nhận đơn hàng', 'Chúng tôi sẽ gửi email xác nhận đơn hàng cho bạn'],
        ['2️⃣ Chuẩn bị hàng', 'Đơn hàng sẽ được đóng gói và chuẩn bị giao'],
        ['3️⃣ Giao hàng', 'Đơn vị vận chuyển sẽ liên hệ và giao hàng đến bạn']
    ];

    for (let i = 0; i < steps.length; i++) {
        await rect(c, M + i * 420, y, 400, 140, DS.colors.n50, DS.r.lg, fId.id);
        await text(c, M + i * 420 + 24, y + 28, steps[i][0], 18, 700, DS.colors.n900, fId.id);
        await text(c, M + i * 420 + 24, y + 64, steps[i][1], 14, 400, DS.colors.n600, fId.id, 352);
    }

    y += 200;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Order Success generated!');
}

run().catch(console.error);
