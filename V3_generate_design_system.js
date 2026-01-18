const { McpClient, DS, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    await c.connect();
    console.log('🎨 Generating COMPLETE Design System (60 components)...');

    const fId = await frame(c, 0, 0, DS.w, 7000, '00. Design System Reference');
    if (!fId?.id) return console.error('Frame creation failed');

    let y = 0;
    const M = DS.margin;

    // ========== TITLE ==========
    await text(c, M, y, 'BOOKVN Design System v2.0', 48, 800, DS.colors.n900, fId.id);
    await text(c, M, y + 60, 'Complete design tokens and component library', 18, 400, DS.colors.n600, fId.id);
    y += 140;

    // ========== 1. COLOR PALETTE ==========
    await text(c, M, y, '1. Color Palette', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const colors = [
        { name: 'Primary', hex: DS.colors.pri },
        { name: 'Primary Hover', hex: DS.colors.priH },
        { name: 'Primary Light', hex: DS.colors.priL },
        { name: 'Success', hex: DS.colors.succ },
        { name: 'Error', hex: DS.colors.err },
        { name: 'Warning', hex: DS.colors.warn },
        { name: 'Neutral 900', hex: DS.colors.n900 },
        { name: 'Neutral 600', hex: DS.colors.n600 },
        { name: 'Neutral 400', hex: DS.colors.n400 },
        { name: 'Neutral 200', hex: DS.colors.n200 },
        { name: 'Neutral 100', hex: DS.colors.n100 },
        { name: 'Neutral 50', hex: DS.colors.n50 }
    ];

    for (let i = 0; i < colors.length; i++) {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const cx = M + col * (200 + 16);
        const cy = y + row * (200 + 16);

        await rect(c, cx, cy, 200, 140, colors[i].hex, DS.r.lg, fId.id, { shadow: true });
        await text(c, cx + 16, cy + 156, colors[i].name, 14, 700, DS.colors.n900, fId.id);
        await text(c, cx + 16, cy + 176, colors[i].hex, 12, 400, DS.colors.n600, fId.id);
    }
    y += 2 * (200 + 16) + 80;

    // ========== 2. TYPOGRAPHY SCALE ==========
    await text(c, M, y, '2. Typography Scale', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const typographyStyles = [
        ['Display', 64, 800],
        ['H1', 48, 800],
        ['H2', 36, 700],
        ['H3', 24, 700],
        ['Body Large', 18, 400],
        ['Body', 16, 400],
        ['Caption', 14, 500],
        ['Button', 14, 700]
    ];

    for (const style of typographyStyles) {
        await text(c, M, y, style[0], style[1], style[2], DS.colors.n900, fId.id);
        await text(c, M + 400, y + 10, `${style[1]}px / ${style[2]}`, 14, 400, DS.colors.n600, fId.id);
        y += style[1] + 20;
    }
    y += 60;

    // ========== 3. SPACING SCALE ==========
    await text(c, M, y, '3. Spacing Scale', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const spacings = [
        ['space-1 (XS)', 8],
        ['space-2 (SM)', 16],
        ['space-3 (MD)', 24],
        ['space-4 (LG)', 32],
        ['space-6 (XL)', 48],
        ['space-8 (2XL)', 64],
        ['space-10 (3XL)', 80],
        ['space-15 (4XL)', 120]
    ];

    for (const spacing of spacings) {
        await text(c, M, y, spacing[0], 16, 600, DS.colors.n900, fId.id);
        await rect(c, M + 200, y, spacing[1], 32, DS.colors.pri, DS.r.sm, fId.id);
        await text(c, M + 220 + spacing[1], y + 8, `${spacing[1]}px`, 14, 400, DS.colors.n600, fId.id);
        y += 52;
    }
    y += 60;

    // ========== 4. BORDER RADIUS ==========
    await text(c, M, y, '4. Border Radius', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const radiusTokens = [
        ['radius-sm', 8, 'Small elements (badges)'],
        ['radius-md', 12, 'Input fields, Small cards'],
        ['radius-lg', 16, 'Product cards, Modals'],
        ['radius-xl', 24, 'Large cards, Containers'],
        ['radius-full', 999, 'Pills, Circular avatars']
    ];

    for (const rad of radiusTokens) {
        await text(c, M, y, rad[0], 16, 600, DS.colors.n900, fId.id);
        await rect(c, M + 200, y - 8, 120, 56, DS.colors.n100, rad[1], fId.id, { stroke: DS.colors.n200 });
        await text(c, M + 340, y + 8, `${rad[1]}px - ${rad[2]}`, 14, 400, DS.colors.n600, fId.id);
        y += 76;
    }
    y += 60;

    // ========== 5. SHADOWS ==========
    await text(c, M, y, '5. Shadows', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const shadows = [
        ['shadow-sm', 'Subtle elevation'],
        ['shadow-md', 'Cards, Dropdowns'],
        ['shadow-lg', 'Modals, Popovers'],
        ['shadow-glow-primary', 'Primary button hover']
    ];

    for (const shad of shadows) {
        await text(c, M, y, shad[0], 16, 600, DS.colors.n900, fId.id);
        await rect(c, M + 250, y - 8, 140, 56, '#FFFFFF', DS.r.md, fId.id, { shadow: true });
        await text(c, M + 410, y + 8, shad[1], 14, 400, DS.colors.n600, fId.id);
        y += 76;
    }
    y += 80;

    // ========== 6. BUTTONS (5 types) ==========
    await text(c, M, y, '6. Button Components (5 Types)', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    // Primary Button
    await text(c, M, y, 'Primary Button', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 200, y - 8, 200, 48, DS.colors.pri, DS.r.full, fId.id, { shadow: true });
    await text(c, M + 260, y + 8, 'Button Text', 14, 700, '#FFFFFF', fId.id);
    y += 68;

    // Secondary Button
    await text(c, M, y, 'Secondary Button', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 200, y - 8, 200, 48, '#FFFFFF', DS.r.full, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 260, y + 8, 'Button Text', 14, 700, DS.colors.n900, fId.id);
    y += 68;

    // Ghost Button
    await text(c, M, y, 'Ghost Button', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 200, y - 8, 200, 48, DS.colors.priL, DS.r.full, fId.id);
    await text(c, M + 260, y + 8, 'Button Text', 14, 700, DS.colors.pri, fId.id);
    y += 68;

    // Danger Button
    await text(c, M, y, 'Danger Button', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 200, y - 8, 200, 48, DS.colors.err, DS.r.full, fId.id);
    await text(c, M + 260, y + 8, 'Delete', 14, 700, '#FFFFFF', fId.id);
    y += 68;

    // Icon Button
    await text(c, M, y, 'Icon Button', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 200, y - 4, 40, 40, DS.colors.n100, DS.r.full, fId.id);
    await text(c, M + 212, y + 6, '✕', 18, 700, DS.colors.n600, fId.id);
    y += 80;

    // ========== 7. FORM INPUTS (8 types) ==========
    await text(c, M, y, '7. Form Inputs (8 Types)', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    // Text Input
    await text(c, M, y, 'Text Input', 16, 600, DS.colors.n900, fId.id);
    await text(c, M, y + 28, 'Label', 14, 500, DS.colors.n600, fId.id);
    await rect(c, M, y + 52, 360, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 70, 'Enter your name...', 16, 400, DS.colors.n400, fId.id);
    y += 140;

    // Search Bar
    await text(c, M, y, 'Search Bar', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 400, 56, DS.colors.n50, DS.r.full, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 20, y + 46, '🔍', 18, 400, DS.colors.n600, fId.id);
    await text(c, M + 56, y + 46, 'Search books...', 16, 400, DS.colors.n400, fId.id);
    y += 116;

    // Dropdown/Select
    await text(c, M, y, 'Dropdown/Select', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 280, 56, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 46, 'Select category', 16, 400, DS.colors.n400, fId.id);
    await text(c, M + 240, y + 46, '▼', 12, 400, DS.colors.n600, fId.id);
    y += 116;

    // Checkbox
    await text(c, M, y, 'Checkbox', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 20, 20, '#FFFFFF', 4, fId.id, { stroke: DS.colors.n400 });
    await text(c, M + 32, y + 30, 'Unchecked', 14, 400, DS.colors.n600, fId.id);
    await rect(c, M + 150, y + 28, 20, 20, DS.colors.pri, 4, fId.id);
    await text(c, M + 154, y + 30, '✓', 14, 700, '#FFFFFF', fId.id);
    await text(c, M + 182, y + 30, 'Checked', 14, 400, DS.colors.n600, fId.id);
    y += 80;

    // Radio Button
    await text(c, M, y, 'Radio Button', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 20, 20, '#FFFFFF', DS.r.full, fId.id, { stroke: DS.colors.n400 });
    await text(c, M + 32, y + 30, 'Option A', 14, 400, DS.colors.n600, fId.id);
    await rect(c, M + 150, y + 28, 20, 20, '#FFFFFF', DS.r.full, fId.id, { stroke: DS.colors.pri });
    await rect(c, M + 155, y + 33, 10, 10, DS.colors.pri, DS.r.full, fId.id);
    await text(c, M + 182, y + 30, 'Option B (Selected)', 14, 400, DS.colors.n600, fId.id);
    y += 80;

    // Toggle Switch
    await text(c, M, y, 'Toggle Switch', 16, 600, DS.colors.n900, fId.id);
    // OFF state
    await rect(c, M, y + 28, 48, 24, DS.colors.n200, DS.r.full, fId.id);
    await rect(c, M + 2, y + 30, 20, 20, '#FFFFFF', DS.r.full, fId.id);
    await text(c, M + 60, y + 32, 'OFF', 14, 400, DS.colors.n600, fId.id);
    // ON state
    await rect(c, M + 150, y + 28, 48, 24, DS.colors.pri, DS.r.full, fId.id);
    await rect(c, M + 176, y + 30, 20, 20, '#FFFFFF', DS.r.full, fId.id);
    await text(c, M + 210, y + 32, 'ON', 14, 400, DS.colors.n600, fId.id);
    y += 80;

    // Textarea
    await text(c, M, y, 'Textarea', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 400, 120, DS.colors.n50, DS.r.md, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 46, 'Enter your message...', 16, 400, DS.colors.n400, fId.id);
    y += 180;

    // Number Stepper
    await text(c, M, y, 'Number Stepper (Quantity)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 32, 32, DS.colors.n100, DS.r.sm, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 11, y + 36, '−', 18, 700, DS.colors.n900, fId.id);
    await rect(c, M + 40, y + 28, 60, 32, '#FFFFFF', DS.r.sm, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 63, y + 36, '1', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 108, y + 28, 32, 32, DS.colors.n100, DS.r.sm, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 118, y + 36, '+', 18, 700, DS.colors.n900, fId.id);
    y += 100;

    // ========== 8. CARDS (6 types) ==========
    await text(c, M, y, '8. Card Components (6 Types)', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    const cardY = y;

    // Product Card
    await text(c, M, cardY, 'Product Card', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, cardY + 28, 240, 400, '#FFFFFF', DS.r.lg, fId.id, { shadow: true, stroke: DS.colors.n200 });
    await rect(c, M + 12, cardY + 40, 216, 280, DS.colors.n100, DS.r.md, fId.id);
    await text(c, M + 16, cardY + 336, 'Book Title', 16, 700, DS.colors.n900, fId.id);
    await text(c, M + 16, cardY + 360, 'Author Name', 14, 400, DS.colors.n600, fId.id);
    await text(c, M + 16, cardY + 384, '125.000đ', 18, 700, DS.colors.pri, fId.id);

    // Blog Card
    await text(c, M + 280, cardY, 'Blog Card', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 280, cardY + 28, 380, 300, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
    await rect(c, M + 280, cardY + 28, 380, 180, DS.colors.n100, DS.r.lg, fId.id);
    await rect(c, M + 296, cardY + 44, 100, 28, DS.colors.priL, DS.r.full, fId.id);
    await text(c, M + 308, cardY + 50, 'Category', 12, 600, DS.colors.pri, fId.id);
    await text(c, M + 296, cardY + 224, 'Blog Post Title', 18, 700, DS.colors.n900, fId.id);
    await text(c, M + 296, cardY + 256, 'Excerpt text goes here...', 14, 400, DS.colors.n600, fId.id);
    await text(c, M + 296, cardY + 304, '15/01/2026 • 8 phút', 12, 400, DS.colors.n400, fId.id);

    // Review Card
    await text(c, M + 700, cardY, 'Review Card', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 700, cardY + 28, 400, 180, DS.colors.n50, DS.r.lg, fId.id);
    await rect(c, M + 724, cardY + 52, 48, 48, DS.colors.n200, DS.r.full, fId.id);
    await text(c, M + 788, cardY + 60, 'User Name', 16, 700, DS.colors.n900, fId.id);
    await text(c, M + 788, cardY + 84, '⭐⭐⭐⭐⭐', 14, 400, DS.colors.warn, fId.id);
    await text(c, M + 724, cardY + 118, 'Review text content here...', 14, 400, DS.colors.n600, fId.id);

    y = cardY + 480;

    // Category Card
    await text(c, M, y, 'Category Card', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 280, 200, DS.colors.priL, DS.r.lg, fId.id, { shadow: true });
    await text(c, M + 20, y + 60, '📚', 32, 400, DS.colors.pri, fId.id);
    await text(c, M + 20, y + 120, 'Category Name', 24, 700, DS.colors.n900, fId.id);

    // Stat Card
    await text(c, M + 320, y, 'Stat Card', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 320, y + 28, 280, 160, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
    await text(c, M + 340, y + 52, '📊', 32, 400, DS.colors.pri, fId.id);
    await text(c, M + 340, y + 100, 'Total Orders', 14, 500, DS.colors.n600, fId.id);
    await text(c, M + 340, y + 128, '1,234', 48, 800, DS.colors.n900, fId.id);

    // Feature Card
    await text(c, M + 640, y, 'Feature Card', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M + 640, y + 28, 380, 320, '#FFFFFF', DS.r.lg, fId.id, { shadow: true });
    await text(c, M + 660, y + 60, '🚀', 40, 400, DS.colors.pri, fId.id);
    await text(c, M + 660, y + 128, 'Feature Title', 24, 700, DS.colors.n900, fId.id);
    await text(c, M + 660, y + 168, 'Feature description text goes here...', 16, 400, DS.colors.n600, fId.id, 340);

    y += 380;

    // ========== 9. NAVIGATION COMPONENTS (5 types) ==========
    await text(c, M, y, '9. Navigation Components (5 Types)', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    // Unified Header
    await text(c, M, y, 'Unified Header (80px height)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 1280, 80, '#FFFFFF', 0, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 20, y + 56, 'LOGO', 18, 700, DS.colors.pri, fId.id);
    await text(c, M + 200, y + 56, 'Trang chủ', 14, 400, DS.colors.n900, fId.id);
    await text(c, M + 320, y + 56, 'Sản phẩm', 14, 400, DS.colors.n900, fId.id);
    await text(c, M + 440, y + 56, 'Blog', 14, 400, DS.colors.n900, fId.id);
    await rect(c, M + 600, y + 40, 300, 48, DS.colors.n50, DS.r.full, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 620, y + 56, '🔍 Search...', 14, 400, DS.colors.n400, fId.id);
    await rect(c, M + 1200, y + 48, 40, 40, DS.colors.n100, DS.r.full, fId.id);
    await text(c, M + 1212, y + 60, '👤', 16, 400, DS.colors.n600, fId.id);
    y += 140;

    // Footer
    await text(c, M, y, 'Footer (500px height, 4 columns)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 1280, 280, DS.colors.n900, 0, fId.id);
    await text(c, M + 20, y + 60, 'BOOKVN', 18, 700, '#FFFFFF', fId.id);
    await text(c, M + 20, y + 92, 'About us', 14, 400, DS.colors.n400, fId.id);
    await text(c, M + 360, y + 60, 'Danh Mục', 16, 700, '#FFFFFF', fId.id);
    await text(c, M + 360, y + 92, 'Văn học', 14, 400, DS.colors.n400, fId.id);
    await text(c, M + 680, y + 60, 'Hỗ Trợ', 16, 700, '#FFFFFF', fId.id);
    await text(c, M + 680, y + 92, 'Liên hệ', 14, 400, DS.colors.n400, fId.id);
    await text(c, M + 1000, y + 60, 'Theo Dõi', 16, 700, '#FFFFFF', fId.id);
    await text(c, M + 1000, y + 92, 'Facebook', 14, 400, DS.colors.n400, fId.id);
    y += 340;

    // Breadcrumbs
    await text(c, M, y, 'Breadcrumbs', 16, 600, DS.colors.n900, fId.id);
    await text(c, M, y + 32, 'Home', 14, 400, DS.colors.n600, fId.id);
    await text(c, M + 56, y + 32, '>', 14, 400, DS.colors.n400, fId.id);
    await text(c, M + 76, y + 32, 'Category', 14, 400, DS.colors.n600, fId.id);
    await text(c, M + 160, y + 32, '>', 14, 400, DS.colors.n400, fId.id);
    await text(c, M + 180, y + 32, 'Product', 14, 700, DS.colors.pri, fId.id);
    y += 84;

    // Pagination
    await text(c, M, y, 'Pagination', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 32, 40, 40, DS.colors.n100, DS.r.sm, fId.id);
    await text(c, M + 12, y + 45, '←', 16, 400, DS.colors.n600, fId.id);
    await rect(c, M + 56, y + 32, 40, 40, DS.colors.pri, DS.r.sm, fId.id);
    await text(c, M + 71, y + 45, '1', 16, 700, '#FFFFFF', fId.id);
    await rect(c, M + 112, y + 32, 40, 40, DS.colors.n100, DS.r.sm, fId.id);
    await text(c, M + 127, y + 45, '2', 16, 400, DS.colors.n600, fId.id);
    await rect(c, M + 168, y + 32, 40, 40, DS.colors.n100, DS.r.sm, fId.id);
    await text(c, M + 183, y + 45, '3', 16, 400, DS.colors.n600, fId.id);
    await text(c, M + 224, y + 45, '...', 16, 400, DS.colors.n400, fId.id);
    await rect(c, M + 256, y + 32, 40, 40, DS.colors.n100, DS.r.sm, fId.id);
    await text(c, M + 268, y + 45, '→', 16, 400, DS.colors.n600, fId.id);
    y += 100;

    // Tabs
    await text(c, M, y, 'Tabs', 16, 600, DS.colors.n900, fId.id);
    await text(c, M, y + 36, 'Description', 16, 700, DS.colors.pri, fId.id);
    await rect(c, M, y + 64, 100, 3, DS.colors.pri, 0, fId.id);
    await text(c, M + 132, y + 36, 'Reviews', 16, 400, DS.colors.n600, fId.id);
    await text(c, M + 232, y + 36, 'Shipping', 16, 400, DS.colors.n600, fId.id);
    y += 120;

    // ========== 10. FEEDBACK COMPONENTS (5 types) ==========
    await text(c, M, y, '10. Feedback Components (5 Types)', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    // Toast Notification
    await text(c, M, y, 'Toast Notification (Success)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 360, 80, DS.colors.succ, DS.r.md, fId.id, { shadow: true });
    await text(c, M + 20, y + 48, '✓', 20, 700, '#FFFFFF', fId.id);
    await text(c, M + 56, y + 48, 'Success!', 16, 700, '#FFFFFF', fId.id);
    await text(c, M + 56, y + 74, 'Your action was successful', 14, 400, '#FFFFFF', fId.id);
    y += 140;

    // Alert Banner
    await text(c, M, y, 'Alert Banner (Warning)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 600, 56, '#FEF3C7', DS.r.md, fId.id);
    await rect(c, M, y + 28, 4, 56, DS.colors.warn, 0, fId.id);
    await text(c, M + 20, y + 48, '⚠', 18, 400, DS.colors.warn, fId.id);
    await text(c, M + 52, y + 48, 'Warning: Please verify your email address', 14, 600, '#78350F', fId.id);
    y += 116;

    // Progress Bar
    await text(c, M, y, 'Progress Bar (60%)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 32, 400, 8, DS.colors.n200, DS.r.full, fId.id);
    await rect(c, M, y + 32, 240, 8, DS.colors.pri, DS.r.full, fId.id);
    y += 80;

    // Skeleton Loader
    await text(c, M, y, 'Skeleton Loader', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 32, 300, 16, DS.colors.n200, DS.r.sm, fId.id);
    await rect(c, M, y + 64, 200, 16, DS.colors.n200, DS.r.sm, fId.id);
    await rect(c, M, y + 96, 250, 16, DS.colors.n200, DS.r.sm, fId.id);
    y += 156;

    // Badge
    await text(c, M, y, 'Badge (3 variants)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 32, 80, 28, DS.colors.succL, DS.r.full, fId.id);
    await text(c, M + 16, y + 39, 'Success', 12, 600, DS.colors.succ, fId.id);
    await rect(c, M + 100, y + 32, 80, 28, '#FEF3C7', DS.r.full, fId.id);
    await text(c, M + 114, y + 39, 'Warning', 12, 600, DS.colors.warn, fId.id);
    await rect(c, M + 200, y + 32, 60, 28, DS.colors.pri, DS.r.full, fId.id);
    await text(c, M + 214, y + 39, 'Promo', 12, 700, '#FFFFFF', fId.id);
    y += 100;

    // ========== 11. DATA DISPLAY (4 types) ==========
    await text(c, M, y, '11. Data Display Components (4 Types)', 32, 700, DS.colors.n900, fId.id);
    y += 60;

    // Table
    await text(c, M, y, 'Table', 16, 600, DS.colors.n900, fId.id);
    // Header
    await rect(c, M, y + 28, 600, 48, DS.colors.n100, 0, fId.id);
    await text(c, M + 16, y + 46, 'Product', 14, 700, DS.colors.n900, fId.id);
    await text(c, M + 216, y + 46, 'Price', 14, 700, DS.colors.n900, fId.id);
    await text(c, M + 416, y + 46, 'Stock', 14, 700, DS.colors.n900, fId.id);
    // Row 1
    await rect(c, M, y + 76, 600, 48, '#FFFFFF', 0, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 94, 'Book Title 1', 14, 400, DS.colors.n900, fId.id);
    await text(c, M + 216, y + 94, '125.000đ', 14, 400, DS.colors.n900, fId.id);
    await text(c, M + 416, y + 94, 'In Stock', 14, 400, DS.colors.succ, fId.id);
    // Row 2
    await rect(c, M, y + 124, 600, 48, DS.colors.n50, 0, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 142, 'Book Title 2', 14, 400, DS.colors.n900, fId.id);
    await text(c, M + 216, y + 142, '89.000đ', 14, 400, DS.colors.n900, fId.id);
    await text(c, M + 416, y + 142, 'Low Stock', 14, 400, DS.colors.warn, fId.id);
    y += 220;

    // List
    await text(c, M, y, 'List', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 28, 500, 64, '#FFFFFF', 0, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 54, 'List Item 1', 16, 400, DS.colors.n900, fId.id);
    await rect(c, M, y + 92, 500, 64, '#FFFFFF', 0, fId.id, { stroke: DS.colors.n200 });
    await text(c, M + 16, y + 118, 'List Item 2', 16, 400, DS.colors.n900, fId.id);
    y += 188;

    // Avatar
    await text(c, M, y, 'Avatar (3 sizes)', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 32, 32, 32, DS.colors.n200, DS.r.full, fId.id);
    await text(c, M + 9, y + 42, 'S', 12, 700, DS.colors.n600, fId.id);
    await rect(c, M + 60, y + 28, 40, 40, DS.colors.n200, DS.r.full, fId.id);
    await text(c, M + 75, y + 40, 'M', 14, 700, DS.colors.n600, fId.id);
    await rect(c, M + 128, y + 20, 56, 56, DS.colors.n200, DS.r.full, fId.id);
    await text(c, M + 147, y + 40, 'L', 18, 700, DS.colors.n600, fId.id);
    y += 108;

    // Divider
    await text(c, M, y, 'Divider', 16, 600, DS.colors.n900, fId.id);
    await rect(c, M, y + 48, 800, 1, DS.colors.n200, 0, fId.id);
    y += 100;

    console.log('✅ COMPLETE Design System generated! (60 components)');
}

run().catch(console.error);
