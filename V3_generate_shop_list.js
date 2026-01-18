const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("🛒 Fixing Shop List (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 6000, 0, DS.w, 3000, "03. CỬA HÀNG - DANH SÁCH (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header 
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    // Title
    let y = 140;
    await text(c, DS.margin, y, "Văn học Việt Nam", 40, 800, DS.colors.n900, fId);

    // Sidebar (3 cols) + List (9 cols)
    const sidebarWidth = (3 * 77) + (2 * 32);
    const listStartX = DS.margin + sidebarWidth + DS.gutter;
    const listWidth = (9 * 77) + (8 * 32);

    const products = [
        ["Mắt Biếc", "Nguyễn Nhật Ánh", "125.000đ", "Câu chuyện về Ngạn và Hà Lan..."],
        ["Tôi Thấy Hoa Vàng", "Nguyễn Nhật Ánh", "115.000đ", "Tuổi thơ ở làng quê miền Trung..."],
        ["Cho Tôi Một Vé", "Nguyễn Nhật Ánh", "105.000đ", "Hành trình tìm lại ký ức..."]
    ];

    y += 80;
    let i = 0;
    for (const p of products) {
        const py = y + i * 260;
        await rect(c, listStartX, py, listWidth, 240, "#FFFFFF", DS.r.lg, fId, { shadow: true });
        await rect(c, listStartX + 16, py + 16, 160, 208, DS.colors.n100, DS.r.md, fId);
        await text(c, listStartX + 200, py + 24, p[0], 24, 700, DS.colors.n900, fId);
        await text(c, listStartX + 200, py + 64, p[1], 16, 500, DS.colors.pri, fId);
        await text(c, listStartX + 200, py + 100, p[3], 15, 400, DS.colors.n600, fId, listWidth - 400);
        await text(c, listStartX + 200, py + 180, p[2], 24, 800, DS.colors.n900, fId);
        i++;
    }

    console.log("✨ Professional Shop List FIXED.");
}

run().catch(console.error);
