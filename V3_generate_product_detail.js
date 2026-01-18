const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("📄 Fixing Product Detail (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 8000, 0, DS.w, 3500, "04. CHI TIẾT SẢN PHẨM (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header & Breadcrumbs
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);
    await text(c, DS.margin, 120, "Cửa hàng / Văn học Việt Nam / Mắt Biếc", 14, 500, DS.colors.n400, fId);

    // Main Content
    let y = 160;
    const galleryWidth = (6 * 77) + (5 * 32);
    const contentStartX = DS.margin + galleryWidth + DS.gutter;

    // Gallery
    await rect(c, DS.margin, y, galleryWidth, 600, DS.colors.n100, DS.r.lg, fId);
    for (let k = 0; k < 4; k++) {
        const thumbX = DS.margin + k * (145 + 16);
        await rect(c, thumbX, y + 620, 145, 145, DS.colors.n100, DS.r.md, fId, { stroke: (k === 0 ? DS.colors.pri : null) });
    }

    // Info
    await text(c, contentStartX, y, "Mắt Biếc (Tái Bản 2024)", 48, 800, DS.colors.n900, fId, 600);
    await text(c, contentStartX, y + 110, "Tác giả: Nguyễn Nhật Ánh", 20, 600, DS.colors.pri, fId);
    await text(c, contentStartX, y + 150, "⭐⭐⭐⭐⭐ (150 đánh giá)", 16, 400, DS.colors.warn, fId);
    await text(c, contentStartX, y + 200, "125.000đ", 40, 800, DS.colors.n900, fId);
    await text(c, contentStartX, y + 260, "Câu chuyện tình yêu thuở thanh xuân đầy cảm xúc giữa Ngạn và Hà Lan. Một tác phẩm kinh điển của văn học Việt Nam đương đại.", 16, 400, DS.colors.n600, fId, 600);

    // Buttons
    y += 380;
    await rect(c, contentStartX, y, 150, 56, "#FFFFFF", DS.r.full, fId, { stroke: DS.colors.n200 });
    await text(c, contentStartX + 20, y + 18, "-", 20, 700, DS.colors.n900, fId);
    await text(c, contentStartX + 70, y + 18, "1", 18, 700, DS.colors.n900, fId);
    await text(c, contentStartX + 120, y + 18, "+", 20, 700, DS.colors.n900, fId);

    await rect(c, contentStartX + 180, y, 420, 56, DS.colors.pri, DS.r.full, fId, { shadow: true });
    await text(c, contentStartX + 310, y + 20, "THÊM VÀO GIỎ HÀNG", 14, 700, "#FFFFFF", fId);

    // Reviews Section
    y += 600;
    await rect(c, DS.margin, y, DS.container, 1, DS.colors.n200, 0, fId);
    await text(c, DS.margin, y + 40, "Đánh giá từ khách hàng", 24, 700, DS.colors.n900, fId);

    const reviews = [
        ["Nguyễn Văn An", "Sách rất hay, đóng gói kỹ.", "⭐⭐⭐⭐⭐"],
        ["Trần Thị Bình", "Nội dung cảm động, giao nhanh.", "⭐⭐⭐⭐⭐"],
        ["Lê Minh Cường", "Gói cẩn thận, sách mới.", "⭐⭐⭐⭐⭐"]
    ];

    let i = 0;
    for (const r of reviews) {
        const ry = y + 100 + i * 140;
        await rect(c, DS.margin, ry, DS.container, 1, DS.colors.n100, 0, fId);
        await text(c, DS.margin, ry + 20, r[0], 18, 700, DS.colors.n900, fId);
        await text(c, DS.margin, ry + 50, r[2], 14, 400, DS.colors.warn, fId);
        await text(c, DS.margin, ry + 80, r[1], 16, 400, DS.colors.n600, fId);
        i++;
    }

    console.log("✨ Professional Product Detail FIXED.");
}

run().catch(console.error);
