const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('📄 Generating COMPLETE About Us Page...');

    const X = PAGE_OFFSETS.aboutUs;
    const fId = await frame(c, X, 0, DS.w, 3600, '16. About Us - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    // HERO
    await rect(c, 0, y, DS.w, 400, DS.colors.n800, 0, fId.id);
    await text(c, DS.w / 2 - 150, y + 170, 'VỀ CHÚNG TÔI', 64, 800, '#FFFFFF', fId.id);
    y += 460;

    // MISSION STATEMENT (centered, 800px width)
    await text(c, M + 240, y, 'Sứ Mệnh Của Chúng Tôi', 36, 700, DS.colors.n900, fId.id);
    y += 60;

    await text(c, M + 140, y, 'Chúng tôi là nền tảng thương mại điện tử chuyên về sách hàng đầu Việt Nam,\nvới mong muốn lan tỏa tri thức đến mọi nhà.\n\nVới hơn 50.000 đầu sách từ khắp thế giới, chúng tôi cam kết mang đến cho bạn\nnhững cuốn sách chất lượng với giá cả hợp lý nhất.', 18, 400, DS.colors.n600, fId.id, 960);
    y += 220;

    // TEAM SECTION
    await text(c, M, y, 'Đội Ngũ Của Chúng Tôi', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const team = [
        ['Nguyễn Văn An', 'CEO & Founder'],
        ['Trần Thị Bình', 'CTO'],
        ['Lê Minh Cường', 'Head of Marketing'],
        ['Phạm Thu Hà', 'Head of Operations'],
        ['Hoàng Minh Tuấn', 'Head of Customer Service'],
        ['Vũ Lan Anh', 'Head of Content']
    ];

    for (let i = 0; i < team.length; i++) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const tx = M + col * (405 + 32);
        const ty = y + row * (240 + 32);

        await rect(c, tx, ty, 405, 220, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
        await rect(c, tx + 140, ty + 24, 120, 120, DS.colors.n200, 999, fId.id);
        await text(c, tx + 170, ty + 68, team[i][0].substring(0, 2).toUpperCase(), 24, 700, DS.colors.n600, fId.id);
        await text(c, tx + 100, ty + 160, team[i][0], 18, 700, DS.colors.n900, fId.id);
        await text(c, tx + 120, ty + 188, team[i][1], 14, 400, DS.colors.n600, fId.id);
    }
    y += 2 * (240 + 32) + 60;

    // TIMELINE
    await text(c, M, y, 'Lịch Sử Phát Triển', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const milestones = [
        ['2020', 'Thành lập công ty', 'BOOKVN được thành lập với 1.000 đầu sách'],
        ['2021', 'Mở rộng kho sách', 'Đạt 10.000 đầu sách và 5.000 khách hàng'],
        ['2022', 'Ra mắt ứng dụng', 'Ứng dụng mobile chính thức ra mắt'],
        ['2023', 'Mở chi nhánh', 'Mở chi nhánh tại Hà Nội và Đà Nẵng'],
        ['2024', 'Đạt 50.000 sách', 'Trở thành nền tảng sách số 1 Việt Nam']
    ];

    for (let i = 0; i < milestones.length; i++) {
        // Dot
        await rect(c, M + 20, y + i * 100 + 8, 8, 8, DS.colors.pri, 999, fId.id);

        // Line connector (except last)
        if (i < milestones.length - 1) {
            await rect(c, M + 22, y + i * 100 + 16, 2, 92, DS.colors.n200, 0, fId.id);
        }

        // Content
        await text(c, M + 60, y + i * 100, milestones[i][0], 20, 700, DS.colors.pri, fId.id);
        await text(c, M + 60, y + i * 100 + 32, milestones[i][1], 18, 700, DS.colors.n900, fId.id);
        await text(c, M + 60, y + i * 100 + 62, milestones[i][2], 14, 400, DS.colors.n600, fId.id);
    }
    y += milestones.length * 100 + 60;

    // CONTACT SECTION
    await text(c, M, y, 'Liên Hệ Với Chúng Tôi', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    await rect(c, M, y, DS.container, 300, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });

    const contactInfo = [
        ['📍 Địa chỉ:', '123 Đường Nguyễn Huệ, Quận 1, TP.HCM'],
        ['📞 Điện thoại:', '1900 1234'],
        ['📧 Email:', 'contact@bookvn.com'],
        ['🕐 Giờ làm việc:', 'Thứ 2 - Thứ 7: 8:00 - 20:00']
    ];

    for (let i = 0; i < contactInfo.length; i++) {
        await text(c, M + 40, y + 40 + i * 60, contactInfo[i][0], 16, 600, DS.colors.n900, fId.id);
        await text(c, M + 240, y + 40 + i * 60, contactInfo[i][1], 16, 400, DS.colors.n600, fId.id);
    }

    y += 360;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete About Us generated!');
}

run().catch(console.error);
