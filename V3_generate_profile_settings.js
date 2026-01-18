const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('⚙️ Generating COMPLETE Profile Settings Page...');

    const X = PAGE_OFFSETS.profileSettings;
    const fId = await frame(c, X, 0, DS.w, 3000, '13. Profile Settings - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 40;

    await text(c, M, y, 'Tài khoản > Cài đặt', 14, 400, DS.colors.n600, fId.id);
    y += 50;

    await text(c, M, y, 'Thông Tin Cá Nhân', 48, 800, DS.colors.n900, fId.id);
    y += 100;

    // 1. AVATAR UPLOAD SECTION
    await rect(c, M, y, DS.container, 160, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });
    await rect(c, M + 32, y + 32, 96, 96, DS.colors.n200, 999, fId.id);
    await text(c, M + 62, y + 64, 'AN', 24, 700, DS.colors.n600, fId.id);
    await text(c, M + 156, y + 44, 'Ảnh Đại Diện', 18, 700, DS.colors.n900, fId.id);
    await rect(c, M + 156, y + 80, 140, 40, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 176, y + 90, 'Thay đổi ảnh', 14, 600, DS.colors.n900, fId.id);
    y += 200;

    // 2. PERSONAL INFORMATION FORM
    await rect(c, M, y, DS.container, 520, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let fY = y + 32;

    await text(c, M + 32, fY, 'Thông Tin Cá Nhân', 20, 700, DS.colors.n900, fId.id);
    fY += 56;

    const fields = [
        ['Họ và tên', 'Nguyễn Văn An'],
        ['Email', 'nguyenvanan@email.com'],
        ['Số điện thoại', '0901234567'],
        ['Ngày sinh', '15/03/1995']
    ];

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const idx = i * 2 + j;
            const fx = M + 32 + j * 620;
            const fy = fY + i * 104;

            await text(c, fx, fy, fields[idx][0], 14, 600, DS.colors.n600, fId.id);
            await rect(c, fx, fy + 28, 580, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
            await text(c, fx + 16, fy + 46, fields[idx][1], 16, 400, DS.colors.n900, fId.id);
        }
    }

    fY += 240;

    // Gender radio buttons
    await text(c, M + 32, fY, 'Giới tính', 14, 600, DS.colors.n600, fId.id);
    fY += 32;

    await rect(c, M + 32, fY, 20, 20, '#FFFFFF', 999, fId.id, { stroke: DS.colors.pri });
    await rect(c, M + 37, fY + 5, 10, 10, DS.colors.pri, 999, fId.id);
    await text(c, M + 60, fY + 3, 'Nam', 14, 400, DS.colors.n900, fId.id);

    await rect(c, M + 152, fY, 20, 20, '#FFFFFF', 999, fId.id, { stroke: DS.colors.n400 });
    await text(c, M + 180, fY + 3, 'Nữ', 14, 400, DS.colors.n900, fId.id);

    await rect(c, M + 272, fY, 20, 20, '#FFFFFF', 999, fId.id, { stroke: DS.colors.n400 });
    await text(c, M + 300, fY + 3, 'Khác', 14, 400, DS.colors.n900, fId.id);

    fY += 60;

    // Save button
    await rect(c, M + 32, fY, 180, 48, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, M + 80, fY + 16, 'Lưu Thay Đổi', 14, 700, '#FFFFFF', fId.id);

    y += 560;

    // 3. CHANGE PASSWORD
    await rect(c, M, y, DS.container, 340, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let pY = y + 32;

    await text(c, M + 32, pY, 'Thay Đổi Mật Khẩu', 20, 700, DS.colors.n900, fId.id);
    pY += 56;

    const pwFields = [
        'Mật khẩu hiện tại',
        'Mật khẩu mới',
        'Xác nhận mật khẩu mới'
    ];

    for (const pwField of pwFields) {
        await text(c, M + 32, pY, pwField, 14, 600, DS.colors.n600, fId.id);
        pY += 28;
        await rect(c, M + 32, pY, 580, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
        await text(c, M + 48, pY + 18, '••••••••', 16, 400, DS.colors.n400, fId.id);
        pY += 76;
    }

    await rect(c, M + 32, pY, 180, 48, DS.colors.pri, DS.r.full, fId.id);
    await text(c, M + 66, pY + 16, 'Cập Nhật Mật Khẩu', 14, 700, '#FFFFFF', fId.id);

    y += 380;

    // 4. SAVED ADDRESSES
    await rect(c, M, y, DS.container, 360, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });

    let aY = y + 32;

    await text(c, M + 32, aY, 'Địa Chỉ Đã Lưu', 20, 700, DS.colors.n900, fId.id);
    await rect(c, M + 1080, aY - 4, 160, 40, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 1096, aY + 6, '+ Thêm địa chỉ', 14, 600, DS.colors.n900, fId.id);
    aY += 56;

    const addresses = [
        ['Nhà riêng', '123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM', '0901234567', true],
        ['Văn phòng', '456 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM', '0907654321', false]
    ];

    for (const addr of addresses) {
        await rect(c, M + 32, aY, DS.container - 64, 100, DS.colors.n50, DS.r.md, fId.id, { stroke: addr[3] ? DS.colors.pri : DS.colors.n200 });

        await text(c, M + 48, aY + 20, addr[0], 16, 700, DS.colors.n900, fId.id);
        if (addr[3]) {
            await rect(c, M + 160, aY + 20, 80, 24, DS.colors.pri, DS.r.full, fId.id);
            await text(c, M + 172, aY + 24, 'Mặc định', 12, 700, '#FFFFFF', fId.id);
        }
        await text(c, M + 48, aY + 48, addr[1], 14, 400, DS.colors.n600, fId.id, 900);
        await text(c, M + 48, aY + 72, 'SĐT: ' + addr[2], 12, 400, DS.colors.n600, fId.id);

        await rect(c, M + 1040, aY + 30, 80, 36, DS.colors.n100, DS.r.md, fId.id);
        await text(c, M + 1060, aY + 38, 'Sửa', 14, 600, DS.colors.n900, fId.id);

        await rect(c, M + 1136, aY + 30, 80, 36, DS.colors.n100, DS.r.md, fId.id);
        await text(c, M + 1156, aY + 38, 'Xóa', 14, 600, DS.colors.err, fId.id);

        aY += 120;
    }

    y += 400;

    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Profile Settings generated!');
}

run().catch(console.error);
