const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("📰 Fixing Blog List (V3.1 FIXED)...");
    await c.connect();

    const f = await frame(c, 20000, 0, DS.w, 3000, "06. DANH SÁCH BLOG (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    // Title
    let y = 160;
    await text(c, DS.margin, y, "Blog & Kiến Thức", 48, 800, DS.colors.n900, fId);
    await text(c, DS.margin, y + 70, "Cập nhật những thông tin mới nhất về sách.", 18, 400, DS.colors.n400, fId);

    // Grid
    y += 140;
    const blogs = [
        ["10 Cuốn Sách Nên Đọc 2026", "GỢI Ý SÁCH", "15/01/2026"],
        ["Cách Xây Dựng Thói Quen Đọc", "KỸ NĂNG", "12/01/2026"],
        ["Review: Atomic Habits", "REVIEW SÁCH", "10/01/2026"],
        ["Tại Sao Nên Đọc Sách Mỗi Ngày?", "LỐI SỐNG", "08/01/2026"],
        ["Top 5 Tác Giả Việt Nam", "TÁC GIẢ", "05/01/2026"],
        ["Sách Hay Cho Dân Khởi Nghiệp", "KINH DOANH", "03/01/2026"]
    ];

    let i = 0;
    for (const b of blogs) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const bx = DS.margin + col * (405 + 32);
        const by = y + row * (420 + 32);

        await rect(c, bx, by, 405, 400, "#FFFFFF", DS.r.lg, fId, { shadow: true });
        await rect(c, bx + 12, by + 12, 381, 200, DS.colors.n100, DS.r.md, fId);
        await text(c, bx + 24, by + 230, b[1], 12, 700, DS.colors.pri, fId);
        await text(c, bx + 24, by + 260, b[0], 24, 700, DS.colors.n900, fId, 360);
        await text(c, bx + 24, by + 350, b[2], 14, 400, DS.colors.n400, fId);
        i++;
    }

    console.log("✨ Professional Blog List FIXED.");
}

run().catch(console.error);
