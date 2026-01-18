const { McpClient, DS, toHex8, frame, rect, text } = require('./figma-helper');

async function run() {
    const c = new McpClient();
    console.log("📦 Fixing Batch Pages (V3.1 FIXED)...");
    await c.connect();

    const pages = [
        ["07. BÀI VIẾT CHI TIẾT", 22000, 3000],
        ["13. TRANG DASHBOARD", 26000, 1500],
        ["14. ĐƠN HÀNG CỦA TÔI", 28000, 1500],
        ["15. THÔNG TIN CÁ NHÂN", 30000, 1500],
        ["16. GIỚI THIỆU", 32000, 1500]
    ];

    for (const pInfo of pages) {
        const f = await frame(c, pInfo[1], 0, DS.w, pInfo[2], pInfo[0] + " (V3.1 FIXED)");
        if (!f?.id) continue;
        const fId = f.id;

        await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
        await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);
        await text(c, DS.margin, 140, pInfo[0], 48, 800, DS.colors.n900, fId);

        if (pInfo[0].includes("DASHBOARD")) {
            const stats = [["Đơn hàng", "12"], ["Đã giao", "10"], ["Đang xử lý", "2"]];
            let i = 0;
            for (const s of stats) {
                const sx = DS.margin + i * (416);
                await rect(c, sx, 240, 384, 160, "#FFFFFF", DS.r.lg, fId, { shadow: true });
                await text(c, sx + 24, 272, s[0], 16, 600, DS.colors.n600, fId);
                await text(c, sx + 24, 304, s[1], 40, 800, DS.colors.n900, fId);
                i++;
            }
        }

        if (pInfo[0].includes("GIỚI THIỆU")) {
            await text(c, DS.margin, 240, "Về BOOKVN", 32, 700, DS.colors.n900, fId);
            await text(c, DS.margin, 300, "Chúng tôi là nền tảng thương mại điện tử chuyên về sách hàng đầu Việt Nam, với mong muốn lan tỏa tri thức đến mọi nhà.", 18, 400, DS.colors.n600, fId, 800);
        }
    }

    console.log("✨ Professional Batch Pages FIXED.");
}

run().catch(console.error);
