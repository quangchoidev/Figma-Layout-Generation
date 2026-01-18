const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter, blogCard } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📰 Generating COMPLETE Blog List Page...');

    const X = PAGE_OFFSETS.blogList;
    const fId = await frame(c, X, 0, DS.w, 3200, '14. Blog List - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    await text(c, M, y, 'Trang chủ > Blog', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    await text(c, M, y, 'Blog & Tin Tức', 48, 800, DS.colors.n900, fId.id);
    await text(c, M, y + 60, 'Chia sẻ kiến thức và gợi ý sách hay', 18, 400, DS.colors.n600, fId.id);
    y += 140;

    // LAYOUT: Main content (left) + Sidebar (right)
    const sidebarWidth = 320;
    const contentWidth = DS.container - sidebarWidth - 40;

    // === FEATURED POST (Large) ===
    await rect(c, M, y, contentWidth, 450, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
    await rect(c, M, y, contentWidth, 260, DS.colors.n100, DS.r.lg, fId.id);
    await rect(c, M + 24, y + 24, 140, 32, DS.colors.priL, DS.r.full, fId.id);
    await text(c, M + 40, y + 32, 'BÀI NỔI BẬT', 12, 700, DS.colors.pri, fId.id);

    await text(c, M + 24, y + 284, '10 Cuốn Sách Nên Đọc Trong Năm 2026', 28, 700, DS.colors.n900, fId.id, contentWidth - 48);
    await text(c, M + 24, y + 352, 'Danh sách những cuốn sách hay nhất được các chuyên gia\nkhuyên đọc trong năm nay. Từ văn học đến khoa học...', 16, 400, DS.colors.n600, fId.id, contentWidth - 48);
    await text(c, M + 24, y + 418, '15/01/2026 • 8 phút đọc • Gợi Ý Sách', 14, 400, DS.colors.n400, fId.id);

    y += 490;

    // === BLOG GRID (3x2 = 6 posts) ===
    const blogs = [
        ['Cách Xây Dựng Thói Quen Đọc Sách', 'Kỹ Năng', 'Bí quyết giúp bạn duy trì thói quen...', '12/01 • 5 phút'],
        ['Review: Atomic Habits', 'Review', 'Cuốn sách đã thay đổi cuộc sống...', '10/01 • 10 phút'],
        ['Top 5 Sách Kinh Tế Hay Nhất', 'Gợi Ý', 'Những cuốn sách kinh tế không thể bỏ qua...', '08/01 • 7 phút'],
        ['Nghệ Thuật Đọc Hiểu', 'Kỹ Năng', 'Làm thế nào để hiểu sâu hơn khi đọc...', '05/01 • 6 phút'],
        ['Lịch Sử Văn Học Việt Nam', 'Văn Học', 'Hành trình phát triển của văn học Việt...', '03/01 • 12 phút'],
        ['Sách Cho Người Bận Rộn', 'Gợi Ý', 'Danh sách sách ngắn gọn, dễ đọc...', '01/01 • 4 phút']
    ];

    for (let i = 0; i < 6; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const bx = M + col * (290 + 20);
        const by = y + row * (320 + 32);

        await rect(c, bx, by, 290, 300, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
        await rect(c, bx, by, 290, 160, DS.colors.n100, DS.r.lg, fId.id);
        await rect(c, bx + 16, by + 16, 100, 24, DS.colors.priL, DS.r.full, fId.id);
        await text(c, bx + 26, by + 20, blogs[i][1], 11, 600, DS.colors.pri, fId.id);

        await text(c, bx + 16, by + 180, blogs[i][0], 16, 700, DS.colors.n900, fId.id, 258);
        await text(c, bx + 16, by + 236, blogs[i][2], 13, 400, DS.colors.n600, fId.id, 258);
        await text(c, bx + 16, by + 272, blogs[i][3], 11, 400, DS.colors.n400, fId.id);
    }

    // === SIDEBAR ===
    const sidebarX = M + contentWidth + 40;
    let sY = 310; // Align with posts grid

    // Categories widget
    await rect(c, sidebarX, sY, sidebarWidth, 280, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });
    await text(c, sidebarX + 24, sY + 24, 'Danh Mục', 18, 700, DS.colors.n900, fId.id);
    sY += 68;

    const categories = [
        ['Gợi Ý Sách', '24'],
        ['Review Sách', '18'],
        ['Kỹ Năng Đọc', '12'],
        ['Văn Học', '10'],
        ['Kinh Tế', '8']
    ];

    for (const cat of categories) {
        await text(c, sidebarX + 24, sY, cat[0], 14, 400, DS.colors.n900, fId.id);
        await text(c, sidebarX + 260, sY, cat[1], 14, 600, DS.colors.n400, fId.id);
        sY += 32;
    }

    sY += 40;

    // Recent posts widget
    await rect(c, sidebarX, sY, sidebarWidth, 280, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });
    await text(c, sidebarX + 24, sY + 24, 'Bài Viết Mới', 18, 700, DS.colors.n900, fId.id);
    sY += 68;

    const recent = [
        ['Atomic Habits Review', '10/01'],
        ['Top 5 Sách Hay', '08/01'],
        ['Nghệ Thuật Đọc Hiểu', '05/01']
    ];

    for (const post of recent) {
        await text(c, sidebarX + 24, sY, post[0], 14, 600, DS.colors.n900, fId.id, 250);
        await text(c, sidebarX + 24, sY + 24, post[1], 12, 400, DS.colors.n400, fId.id);
        sY += 68;
    }

    y += 700;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Blog List generated!');
}

run().catch(console.error);
