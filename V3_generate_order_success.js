const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("🎉 Fixing Order Success (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 16000, 0, DS.w, 1080, "11. ĐẶT HÀNG THÀNH CÔNG (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    const centerX = DS.w / 2;
    await text(c, centerX - 150, 300, "🎉 ĐẶT HÀNG THÀNH CÔNG!", 32, 800, DS.colors.succ, fId);
    await text(c, centerX - 250, 360, "Cảm ơn bạn đã tin tưởng BOOKVN. Đơn hàng của bạn đang được xử lý.", 16, 400, DS.colors.n600, fId, 500);

    await rect(c, centerX - 120, 450, 240, 56, DS.colors.pri, DS.r.full, fId, { shadow: true });
    await text(c, centerX - 50, 470, "VỀ TRANG CHỦ", 14, 700, "#FFFFFF", fId);

    console.log("✨ Professional Order Success FIXED.");
}

run().catch(console.error);
