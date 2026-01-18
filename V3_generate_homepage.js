const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function productCard(c, x, y, title, author, price, pId) {
    await rect(c, x, y, 240, 400, "#FFFFFF", DS.r.lg, pId, { shadow: true });
    await rect(c, x + 12, y + 12, 216, 220, DS.colors.n100, DS.r.md, pId);
    await text(c, x + 16, y + 250, title, 16, 700, DS.colors.n900, pId, 208);
    await text(c, x + 16, y + 300, author, 14, 400, DS.colors.n400, pId);
    await text(c, x + 16, y + 340, price, 20, 800, DS.colors.pri, pId);
}

async function run() {
    const c = new McpClient();
    console.log("🏠 Fixing Homepage (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 2000, 0, DS.w, 5000, "01. TRANG CHỦ (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header 
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    const nav = ["Trang chủ", "Cửa hàng", "Blog", "Về chúng tôi", "Liên hệ"];
    let i = 0;
    for (const n of nav) {
        await text(c, 320 + i * 130, 30, n, 14, 600, DS.colors.n900, fId);
        i++;
    }

    // Hero
    let y = 140;
    await rect(c, DS.margin, y, DS.container, 600, DS.colors.priL, DS.r.xl, fId);
    await text(c, DS.margin + 64, y + 150, "MỞ SÁCH RA,\nMỞ TƯƠNG LAI", 64, 900, DS.colors.n900, fId, 800);
    await text(c, DS.margin + 64, y + 320, "Hàng ngàn cuốn sách tinh hoa đang chờ đón bạn khám phá.", 24, 400, DS.colors.n600, fId, 600);
    await rect(c, DS.margin + 64, y + 420, 240, 64, DS.colors.pri, DS.r.full, fId, { shadow: true });
    await text(c, DS.margin + 110, y + 440, "MUA NGAY", 16, 700, "#FFFFFF", fId);

    // Categories
    y += 740;
    await text(c, DS.margin, y, "Danh mục nổi bật", 32, 800, DS.colors.n900, fId);
    const cats = [["Văn học", "#FFE4E1"], ["Kinh tế", "#E0FFFF"], ["Kỹ năng", "#F0FFF0"]];
    i = 0;
    for (const cat of cats) {
        const cx = DS.margin + i * (405 + 32);
        await rect(c, cx, y + 64, 405, 200, cat[1], DS.r.lg, fId);
        await text(c, cx + 32, y + 200, cat[0], 24, 800, DS.colors.n900, fId);
        i++;
    }

    // Best Sellers
    y += 400;
    await text(c, DS.margin, y, "Sách bán chạy", 32, 800, DS.colors.n900, fId);
    const best = [
        ["Mắt Biếc", "Nguyễn Nhật Ánh", "125.000đ"],
        ["Tôi Thấy Hoa Vàng...", "Nguyễn Nhật Ánh", "115.000đ"],
        ["Sapiens", "Yuval Noah Harari", "250.000đ"],
        ["Atomic Habits", "James Clear", "180.000đ"],
        ["Tuổi Trẻ Đáng Giá...", "Rosie Nguyễn", "80.000đ"]
    ];
    i = 0;
    for (const p of best) {
        await productCard(c, DS.margin + i * (240 + 20), y + 80, p[0], p[1], p[2], fId);
        i++;
    }

    console.log("✨ Professional Homepage FIXED.");
}

run().catch(console.error);
