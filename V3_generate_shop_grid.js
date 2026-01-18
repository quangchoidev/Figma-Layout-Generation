const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function productCard(c, x, y, title, author, price, pId) {
    await rect(c, x, y, 280, 420, "#FFFFFF", DS.r.lg, pId, { shadow: true });
    await rect(c, x + 12, y + 12, 256, 280, DS.colors.n100, DS.r.md, pId);
    await text(c, x + 16, y + 308, title, 16, 700, DS.colors.n900, pId, 248);
    await text(c, x + 16, y + 372, price, 20, 800, DS.colors.pri, pId);
}

async function run() {
    const c = new McpClient();
    console.log("🛒 Fixing Shop Grid (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 4000, 0, DS.w, 2500, "02. CỬA HÀNG - LƯỚI (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header 
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    // Title
    let y = 140;
    await text(c, DS.margin, y, "Tất cả sản phẩm", 40, 800, DS.colors.n900, fId);

    // Grid (3x4)
    y += 80;
    const products = [
        ["Mắt Biếc", "Nguyễn Nhật Ánh", "125.000đ"],
        ["Sapiens", "Yuval Noah", "250.000đ"],
        ["Atomic Habits", "James Clear", "180.000đ"],
        ["Dế Mèn Phiêu Lưu", "Tô Hoài", "85.000đ"],
        ["Tôi Thấy Hoa Vàng", "Nguyễn Nhật Ánh", "115.000đ"],
        ["Cho Tôi Một Vé", "Nguyễn Nhật Ánh", "105.000đ"],
        ["Cây Cam Ngọt", "José Mauro", "92.000đ"],
        ["Nhà Giả Kim", "Paulo Coelho", "89.000đ"]
    ];

    const gridStartX = DS.margin + 300; // Offset for sidebar
    let i = 0;
    for (const p of products) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const px = gridStartX + col * (280 + 32);
        const py = y + row * (420 + 32);
        await productCard(c, px, py, p[0], p[1], p[2], fId);
        i++;
    }

    console.log("✨ Professional Shop Grid FIXED.");
}

run().catch(console.error);
