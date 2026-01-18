const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("🛒 Fixing Cart (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 10000, 0, DS.w, 2000, "08. GIỎ HÀNG (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    await text(c, DS.margin, 140, "Giỏ Hàng Của Bạn", 48, 800, DS.colors.n900, fId);

    const itemsWidth = (8 * 77) + (7 * 32);
    const summaryWidth = (4 * 77) + (3 * 32);
    const summaryStartX = DS.margin + itemsWidth + DS.gutter;

    // Items
    let y = 240;
    const items = [
        ["Mắt Biếc", "125.000đ", "1"],
        ["Sapiens", "250.000đ", "1"],
        ["Atomic Habits", "180.000đ", "1"]
    ];

    let i = 0;
    for (const item of items) {
        const iy = y + i * 140;
        await rect(c, DS.margin, iy, itemsWidth, 120, "#FFFFFF", DS.r.lg, fId, { shadow: true });
        await rect(c, DS.margin + 16, iy + 16, 88, 88, DS.colors.n100, DS.r.md, fId);
        await text(c, DS.margin + 120, iy + 30, item[0], 20, 700, DS.colors.n900, fId);
        await text(c, DS.margin + 120, iy + 65, item[1], 18, 600, DS.colors.pri, fId);
        i++;
    }

    // Summary
    await rect(c, summaryStartX, y, summaryWidth, 450, "#FFFFFF", DS.r.lg, fId, { shadow: true });
    await text(c, summaryStartX + 24, y + 24, "Tóm tắt đơn hàng", 20, 700, DS.colors.n900, fId);
    await text(c, summaryStartX + 24, y + 80, "Tổng cộng:", 20, 800, DS.colors.n900, fId);
    await text(c, summaryStartX + summaryWidth - 150, y + 80, "555.000đ", 24, 800, DS.colors.pri, fId);

    await rect(c, summaryStartX + 24, y + 160, summaryWidth - 48, 56, DS.colors.pri, DS.r.full, fId, { shadow: true });
    await text(c, summaryStartX + 80, y + 180, "TIẾP TỤC ĐẶT HÀNG", 14, 700, "#FFFFFF", fId);

    console.log("✨ Professional Cart FIXED.");
}

run().catch(console.error);
