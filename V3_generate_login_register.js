const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("🔑 Fixing Login/Register (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 24000, 0, DS.w, 1080, "12. ĐĂNG NHẬP (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Branding Side
    const brandingWidth = (6 * 77) + (5 * 32) + DS.margin;
    await rect(c, 0, 0, brandingWidth, 1080, DS.colors.priL, 0, fId);
    await text(c, DS.margin, 400, "BOOKVN", 48, 800, DS.colors.pri, fId);
    await text(c, DS.margin, 480, "Chào mừng bạn quay trở lại.\nHàng ngàn cuốn sách đang chờ đón bạn.", 24, 400, DS.colors.n900, fId, 500);

    // Form Side
    const formX = brandingWidth + DS.gutter;
    let y = 300;
    await text(c, formX, y, "Đăng Nhập", 40, 800, DS.colors.n900, fId);

    const inputs = [["Email", "example@email.com"], ["Mật khẩu", "••••••••"]];
    y += 100;
    for (const input of inputs) {
        await text(c, formX, y, input[0], 14, 700, DS.colors.n900, fId);
        await rect(c, formX, y + 15, 480, 56, "#FFFFFF", DS.r.md, fId, { stroke: DS.colors.n200 });
        await text(c, formX + 16, y + 35, input[1], 16, 400, DS.colors.n400, fId);
        y += 110;
    }

    await rect(c, formX, y, 480, 64, DS.colors.pri, DS.r.full, fId, { shadow: true });
    await text(c, formX + 180, y + 22, "ĐĂNG NHẬP", 14, 700, "#FFFFFF", fId);

    console.log("✨ Professional Login/Register FIXED.");
}

run().catch(console.error);
