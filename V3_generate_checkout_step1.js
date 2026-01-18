const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("🚚 Fixing Checkout Step 1 (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 12000, 0, DS.w, 1500, "09. THANH TOÁN - BƯỚC 1 (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header 
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    // Progress
    let y = 140;
    await text(c, DS.margin, y, "Thông tin giao hàng", 32, 800, DS.colors.n900, fId);

    const formWidth = (8 * 77) + (7 * 32);
    const summaryWidth = (4 * 77) + (3 * 32);
    const summaryX = DS.margin + formWidth + DS.gutter;

    y += 80;
    const fields = [["Họ và tên", "Nguyễn Văn An"], ["Số điện thoại", "0901234567"], ["Địa chỉ", "123 Lê Lợi, Quận 1, TP.HCM"]];
    let i = 0;
    for (const field of fields) {
        await text(c, DS.margin, y, field[0], 14, 700, DS.colors.n900, fId);
        await rect(c, DS.margin, y + 10, formWidth, 56, "#FFFFFF", DS.r.md, fId, { stroke: DS.colors.n200 });
        await text(c, DS.margin + 16, y + 30, field[1], 16, 400, DS.colors.n900, fId);
        y += 100;
        i++;
    }

    await rect(summaryX, 220, summaryWidth, 400, "#FFFFFF", DS.r.lg, fId, { shadow: true });
    await text(summaryX + 24, 250, "Đơn hàng", 20, 700, DS.colors.n900, fId);

    console.log("✨ Professional Checkout Step 1 FIXED.");
}

run().catch(console.error);
