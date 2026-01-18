const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("📐 Fixing Design System (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 0, 0, DS.w, 3000, "00. CORE DESIGN SYSTEM (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    let y = 100;
    await text(c, DS.margin, y, "Hệ thống thiết kế BOOKVN v3.1", 48, 800, DS.colors.pri, fId);

    // Colors
    y += 120;
    await text(c, DS.margin, y, "Màu sắc", 32, 700, DS.colors.n900, fId);
    const cols = [
        ["Primary", DS.colors.pri],
        ["Secondary", DS.colors.priL],
        ["Gray 900", DS.colors.n900],
        ["Gray 600", DS.colors.n600]
    ];
    let i = 0;
    for (const col of cols) {
        const cx = DS.margin + i * 200;
        await rect(c, cx, y + 60, 160, 160, col[1], DS.r.lg, fId, { shadow: true });
        await text(c, cx, y + 240, col[0], 14, 700, DS.colors.n900, fId);
        i++;
    }

    // Buttons
    y += 400;
    await text(c, DS.margin, y, "Nút bấm", 32, 700, DS.colors.n900, fId);
    await rect(c, DS.margin, y + 60, 240, 64, DS.colors.pri, DS.r.full, fId, { shadow: true });
    await text(c, DS.margin + 60, y + 80, "PRIMARY BUTTON", 14, 700, "#FFFFFF", fId);

    console.log("✨ Professional Design System FIXED.");
}

run().catch(console.error);
