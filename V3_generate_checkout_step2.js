const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("💳 Fixing Checkout Step 2 (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 14000, 0, DS.w, 1500, "10. THANH TOÁN - BƯỚC 2 (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header 
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    let y = 140;
    await text(c, DS.margin, y, "Phương thức thanh toán", 32, 800, DS.colors.n900, fId);

    const methods = ["COD - Thanh toán khi nhận hàng", "Chuyển khoản ngân hàng", "Ví MoMo"];
    y += 80;
    let i = 0;
    for (const m of methods) {
        await rect(c, DS.margin, y, 600, 80, "#FFFFFF", DS.r.lg, fId, { stroke: i === 0 ? DS.colors.pri : DS.colors.n200 });
        await text(c, DS.margin + 60, y + 30, m, 16, 600, DS.colors.n900, fId);
        y += 100;
        i++;
    }

    console.log("✨ Professional Checkout Step 2 FIXED.");
}

run().catch(console.error);
