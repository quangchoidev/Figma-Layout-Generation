const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter, productCard } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('🔍 Generating COMPLETE Search Results Page...');

    const X = PAGE_OFFSETS.searchResults;
    const fId = await frame(c, X, 0, DS.w, 2800, '05. Search Results - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // SEARCH QUERY DISPLAY
    await text(c, M, y, 'Kết quả tìm kiếm cho: "Nguyễn Nhật Ánh"', 36, 700, DS.colors.n900, fId.id);
    await text(c, M, y + 50, 'Tìm thấy 24 sản phẩm', 16, 400, DS.colors.n600, fId.id);
    y += 120;

    // FILTER BAR
    await rect(c, M, y, DS.container, 60, '#FFFFFF', DS.r.lg, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 24, y + 22, 'Lọc:', 14, 600, DS.colors.n900, fId.id);

    const filters = ['Tất cả', 'Văn học', 'Thiếu nhi', 'Giá thấp đến cao'];
    for (let i = 0; i < filters.length; i++) {
        const fx = M + 100 + i * 180;
        const isActive = i === 0;
        await rect(c, fx, y + 15, 160, 32, isActive ? DS.colors.pri : '#FFFFFF', DS.r.full, fId.id, { stroke: isActive ? DS.colors.pri : DS.colors.n200 });
        await text(c, fx + 20, y + 23, filters[i], 14, 600, isActive ? '#FFFFFF' : DS.colors.n600, fId.id);
    }
    y += 90;

    // PRODUCT GRID (3x3 = 9 products)
    const products = [
        ['Mắt Biếc', 'Nguyễn Nhật Ánh', '125.000đ'],
        ['Tôi Thấy Hoa Vàng...', 'Nguyễn Nhật Ánh', '115.000đ'],
        ['Cho Tôi Xin Một Vé...', 'Nguyễn Nhật Ánh', '105.000đ'],
        ['Cô Gái Đến Từ Hôm Qua', 'Nguyễn Nhật Ánh', '98.000đ'],
        ['Lá Nằm Trong Lá', 'Nguyễn Nhật Ánh', '88.000đ'],
        ['Bàn Có Năm Chỗ Ngồi', 'Nguyễn Nhật Ánh', '92.000đ'],
        ['Cảm Ơn Người Lớn', 'Nguyễn Nhật Ánh', '85.000đ'],
        ['Ngồi Khóc Trên Cây', 'Nguyễn Nhật Ánh', '95.000đ'],
        ['Tôi Là Bêtô', 'Nguyễn Nhật Ánh', '78.000đ']
    ];

    for (let i = 0; i < products.length; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const px = M + col * (405 + 32);
        const py = y + row * (420 + 32);
        await productCard(c, px, py, products[i][0], products[i][1], products[i][2], fId.id);
    }

    y += 3 * (420 + 32) + 40;

    // SUGGESTED SEARCHES
    await rect(c, M, y, DS.container, 1, DS.colors.n200, 0, fId.id);
    await text(c, M, y + 40, 'Tìm kiếm liên quan', 24, 700, DS.colors.n900, fId.id);
    y += 90;

    const suggestions = [
        'Tô Hoài',
        'Paulo Coelho',
        'Văn học Việt Nam',
        'Sách thiếu nhi',
        'Truyện ngắn',
        'Tiểu thuyết'
    ];

    for (let i = 0; i < suggestions.length; i++) {
        const sx = M + i * (200 + 16);
        await rect(c, sx, y, 190, 48, DS.colors.n50, DS.r.full, fId.id, { stroke: DS.colors.n200 });
        await text(c, sx + 20, y + 18, suggestions[i], 14, 400, DS.colors.n900, fId.id);
    }

    y += 100;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Search Results generated!');
}

run().catch(console.error);
