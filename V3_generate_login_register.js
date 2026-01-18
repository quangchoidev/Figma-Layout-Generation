const { McpClient, DS, PAGE_OFFSETS, frame, rect, text, unifiedHeader, unifiedFooter } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('🔐 Generating COMPLETE Login/Register Page...');

    const X = PAGE_OFFSETS.loginRegister;
    const fId = await frame(c, X, 0, DS.w, 1000, '10. Login Register - Complete');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    y = await unifiedHeader(c, y, fId.id);
    y += 80;

    // SPLIT SCREEN LAYOUT (50/50)
    const splitWidth = DS.container / 2;

    // === LEFT SIDE: Branding ===
    await rect(c, M, y, splitWidth, 700, DS.colors.priL, DS.r.xl, fId.id);

    await text(c, M + 80, y + 200, 'Chào Mừng Bạn\nQuay Lại!', 48, 800, DS.colors.n900, fId.id, 480);
    await text(c, M + 80, y + 340, 'Trải nghiệm mua sắm tuyệt vời với:', 18, 400, DS.colors.n600, fId.id);

    const benefits = [
        '✓ Miễn phí vận chuyển đơn đầu tiên',
        '✓ Tích điểm mỗi đơn hàng',
        '✓ Ưu đãi độc quyền cho thành viên',
        '✓ Theo dõi đơn hàng dễ dàng'
    ];

    let bY = y + 400;
    for (const benefit of benefits) {
        await text(c, M + 80, bY, benefit, 16, 400, DS.colors.n900, fId.id);
        bY += 36;
    }

    // === RIGHT SIDE: Login/Register Form ===
    const formX = M + splitWidth + 40;

    await rect(c, formX, y, splitWidth - 40, 700, '#FFFFFF', DS.r.xl, fId.id, { shadow: true });

    let fY = y + 60;

    // Tabs
    await rect(c, formX + 40, fY, 240, 48, DS.colors.priL, DS.r.lg, fId.id);
    await text(c, formX + 80, fY + 16, 'Đăng Nhập', 16, 700, DS.colors.pri, fId.id);

    await rect(c, formX + 296, fY, 240, 48, DS.colors.n50, DS.r.lg, fId.id);
    await text(c, formX + 340, fY + 16, 'Đăng Ký', 16, 400, DS.colors.n600, fId.id);
    fY += 88;

    // Login Form
    await text(c, formX + 40, fY, 'Email', 14, 600, DS.colors.n600, fId.id);
    fY += 28;
    await rect(c, formX + 40, fY, splitWidth - 120, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, formX + 56, fY + 18, 'your@email.com', 16, 400, DS.colors.n400, fId.id);
    fY += 76;

    await text(c, formX + 40, fY, 'Mật khẩu', 14, 600, DS.colors.n600, fId.id);
    fY += 28;
    await rect(c, formX + 40, fY, splitWidth - 120, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, formX + 56, fY + 18, '••••••••', 16, 400, DS.colors.n400, fId.id);
    fY += 76;

    // Remember me + Forgot password
    await rect(c, formX + 40, fY, 16, 16, '#FFFFFF', 4, fId.id, { stroke: DS.colors.n400 });
    await text(c, formX + 64, fY + 1, 'Ghi nhớ đăng nhập', 14, 400, DS.colors.n600, fId.id);
    await text(c, formX + 360, fY + 1, 'Quên mật khẩu?', 14, 400, DS.colors.pri, fId.id);
    fY += 56;

    // Login button
    await rect(c, formX + 40, fY, splitWidth - 120, 56, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, formX + 180, fY + 18, 'ĐĂNG NHẬP', 16, 700, '#FFFFFF', fId.id);
    fY += 76;

    // Divider
    await rect(c, formX + 40, fY + 16, splitWidth - 120, 1, DS.colors.n200, 0, fId.id);
    await text(c, formX + 250, fY + 4, 'hoặc', 14, 400, DS.colors.n600, fId.id);
    fY += 56;

    // Social login buttons
    const socials = [
        ['🔵', 'Google'],
        ['🔷', 'Facebook'],
        ['⚫', 'Apple']
    ];

    for (let i = 0; i < socials.length; i++) {
        await rect(c, formX + 40 + i * 180, fY, 160, 48, '#FFFFFF', DS.r.md, fId.id, { stroke: DS.colors.n200 });
        await text(c, formX + 60 + i * 180, fY + 14, socials[i][0] + ' ' + socials[i][1], 14, 600, DS.colors.n900, fId.id);
    }

    y += 780;
    await unifiedFooter(c, y, fId.id);

    console.log('✅ Complete Login/Register generated!');
}

run().catch(console.error);
