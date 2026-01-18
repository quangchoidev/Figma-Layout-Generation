const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📝 Generating COMPLETE Blog Post Page...');

    const X = PAGE_OFFSETS.blogPost;
    const fId = await frame(c, X, 0, DS.w, 3800, '15. Blog Post - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    await text(c, M, y, 'Trang chủ > Blog > Gợi Ý Sách', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    // HERO IMAGE
    await rect(c, 0, y, DS.w, 500, DS.colors.n200, 0, fId.id);
    await text(c, DS.w / 2 - 100, y + 230, '[Blog Hero Image]', 24, 700, DS.colors.n400, fId.id);
    y += 540;

    // TITLE + META
    await text(c, M + 140, y, '10 Cuốn Sách Nên Đọc Trong Năm 2026', 48, 800, DS.colors.n900, fId.id, 1000);
    y += 100;

    // Author info
    await rect(c, M + 140, y, 48, 48, DS.colors.n200, 999, fId.id);
    await text(c, M + 168, y + 18, 'AN', 16, 700, DS.colors.n600, fId.id);

    await text(c, M + 204, y + 8, 'Nguyễn Văn An', 16, 600, DS.colors.n900, fId.id);
    await text(c, M + 204, y + 32, '15/01/2026 • 8 phút đọc', 14, 400, DS.colors.n600, fId.id);
    y += 88;

    // Category badge
    await rect(c, M + 140, y, 120, 32, DS.colors.priL, DS.r.full, fId.id);
    await text(c, M + 156, y + 8, 'Gợi Ý Sách', 14, 600, DS.colors.pri, fId.id);
    y += 72;

    // CONTENT (5 sections)
    const sections = [
        {
            title: '1. Atomic Habits - James Clear',
            content: 'Cuốn sách về xây dựng thói quen tốt và loại bỏ thói quen xấu. Với phương pháp khoa học\nvà dễ áp dụng, James Clear đã giúp hàng triệu người thay đổi cuộc sống của họ.\n\nỨng dụng thực tế cao, ngôn ngữ dễ hiểu, và đầy những ví dụ thuyết phục.'
        },
        {
            title: '2. Sapiens - Yuval Noah Harari',
            content: 'Lịch sử loài người từ thời kỳ đồ đá đến thời đại công nghệ. Một góc nhìn mới mẻ\nvà sâu sắc về sự phát triển của nhân loại.\n\nHarari kết nối lịch sử, khoa học và triết học một cách xuất sắc.'
        },
        {
            title: '3. Tâm Lý Học Tội Phạm - Diệp Hồng Vũ',
            content: 'Khám phá tâm lý của tội phạm qua các vụ án có thật. Hấp dẫn và đầy bất ngờ,\ncuốn sách giúp bạn hiểu sâu hơn về hành vi con người.\n\nPhù hợp cho những ai yêu thích tâm lý học và tội phạm học.'
        },
        {
            title: '4. Đắc Nhân Tâm - Dale Carnegie',
            content: 'Kinh điển về nghệ thuật giao tiếp và ứng xử. Bất hủ qua thời gian, cuốn sách\nvẫn mang lại giá trị to lớn cho người đọc hiện đại.\n\nNhững bài học về quan hệ con người vượt thời gian.'
        },
        {
            title: '5. Nhà Giả Kim - Paulo Coelho',
            content: 'Hành trình tìm kiếm kho báu và ý nghĩa cuộc đời. Triết lý sâu sắc về số phận\nvà ước mơ được kể qua câu chuyện đầy cảm hứng.\n\nMột tác phẩm văn học tuyệt đẹp với thông điệp mạnh mẽ.'
        }
    ];

    for (const section of sections) {
        await text(c, M + 140, y, section.title, 24, 700, DS.colors.n900, fId.id, 1000);
        y += 48;
        await text(c, M + 140, y, section.content, 18, 400, DS.colors.n600, fId.id, 1000);
        y += 160;
    }

    y += 40;

    // AUTHOR BIO CARD
    await rect(c, M + 140, y, 1000, 180, DS.colors.n50, DS.r.lg, fId.id);
    await rect(c, M + 164, y + 24, 80, 80, DS.colors.n200, 999, fId.id);
    await text(c, M + 192, y + 54, 'AN', 20, 700, DS.colors.n600, fId.id);

    await text(c, M + 264, y + 30, 'Về tác giả', 14, 600, DS.colors.n400, fId.id);
    await text(c, M + 264, y + 52, 'Nguyễn Văn An', 20, 700, DS.colors.n900, fId.id);
    await text(c, M + 264, y + 86, 'Biên tập viên chuyên mục sách tại BOOKVN.\nYêu thích văn học và tâm lý học. Đã xuất bản hơn 50 bài viết.', 16, 400, DS.colors.n600, fId.id, 820);

    y += 220;

    // RELATED POSTS
    await rect(c, M, y, DS.container, 1, DS.colors.n200, 0, fId.id);
    await text(c, M, y + 40, 'Bài Viết Liên Quan', 32, 700, DS.colors.n900, fId.id);
    y += 100;

    const relatedPosts = [
        ['Cách Xây Dựng Thói Quen Đọc Sách', 'Kỹ Năng', '12/01 • 5 phút'],
        ['Review: Atomic Habits', 'Review Sách', '10/01 • 10 phút'],
        ['Top 5 Sách Kinh Tế Hay Nhất', 'Gợi Ý Sách', '08/01 • 7 phút']
    ];

    for (let i = 0; i < relatedPosts.length; i++) {
        const px = M + i * (400 + 40);
        await rect(c, px, y, 400, 300, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
        await rect(c, px, y, 400, 180, DS.colors.n100, DS.r.lg, fId.id);
        await rect(c, px + 16, y + 16, 100, 28, DS.colors.priL, DS.r.full, fId.id);
        await text(c, px + 28, y + 22, relatedPosts[i][1], 12, 600, DS.colors.pri, fId.id);
        await text(c, px + 16, y + 200, relatedPosts[i][0], 18, 700, DS.colors.n900, fId.id, 368);
        await text(c, px + 16, y + 268, relatedPosts[i][2], 14, 400, DS.colors.n400, fId.id);
    }

    y += 360;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Blog Post generated!');
}

run().catch(console.error);
