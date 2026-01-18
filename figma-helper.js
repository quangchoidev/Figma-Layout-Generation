const http = require('http');

function toHex8(hex) {
    if (!hex) return '#000000FF';
    let clean = hex.startsWith('#') ? hex.substring(1) : hex;
    if (clean.length === 6) return '#' + clean + 'FF';
    if (clean.length === 8) return '#' + clean;
    return '#000000FF';
}

function parseResult(content) {
    if (typeof content !== 'string') return content;
    try {
        const parsed = JSON.parse(content);
        if (typeof parsed === 'string') return parseResult(parsed);
        return parsed;
    } catch (e) { return content; }
}

class McpClient {
    constructor() {
        this.msgId = 1;
        this.sessionId = null;
    }

    async connect() {
        return new Promise((resolve, reject) => {
            const initPayload = {
                jsonrpc: "2.0", id: this.msgId++, method: "initialize",
                params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "book-gen", version: "1.0" } }
            };
            this._send(null, initPayload, (err, res) => {
                if (err) return reject(err);
                this.sessionId = res.headers['mcp-session-id'];
                if (!this.sessionId) return reject("No Session ID");
                setTimeout(() => resolve(), 500);
            });
        });
    }

    async callTool(name, args) {
        await new Promise(r => setTimeout(r, 50));
        return new Promise((resolve) => {
            const payload = { jsonrpc: "2.0", id: this.msgId++, method: "tools/call", params: { name, arguments: args } };
            this._send(this.sessionId, payload, (err, res, data) => {
                if (err) {
                    console.error(`Tool error [${name}]:`, err.message);
                    return resolve(null);
                }
                try {
                    const lines = data.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const jsonStr = line.substring(6);
                            if (jsonStr.trim() === '[DONE]') continue;
                            const parsed = JSON.parse(jsonStr);
                            if (parsed.id === payload.id && parsed.result) {
                                const val = parsed.result.isError ? null : parseResult(parsed.result.content?.[0]?.text || parsed.result);
                                resolve(val);
                                return;
                            }
                        }
                    }
                    resolve(null);
                } catch (e) {
                    console.error("Parse Error:", e.message, "Raw data:", data);
                    resolve(null);
                }
            });
        });
    }

    _send(sessionId, body, callback) {
        const bodyStr = JSON.stringify(body);
        const options = {
            hostname: 'localhost', port: 38450, path: '/mcp', method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/event-stream',
                'Content-Length': Buffer.byteLength(bodyStr)
            }
        };
        if (sessionId) options.headers['mcp-session-id'] = sessionId;
        const req = http.request(options, (res) => {
            let data = ''; res.on('data', c => data += c);
            res.on('end', () => callback(null, res, data));
        });
        req.on('error', callback); req.write(bodyStr); req.end();
    }
}

// ========== DESIGN SYSTEM ==========
const DS = {
    w: 1440,
    margin: 80,
    gutter: 32,
    container: 1280,
    colors: {
        pri: "#FF5C00", priH: "#E65300", priL: "#FFF5F0",
        n900: "#111827", n600: "#4B5563", n400: "#9CA3AF",
        n200: "#E5E7EB", n100: "#F3F4F6", n50: "#F9FAFB",
        succ: "#10B981", succL: "#ECFDF5", err: "#EF4444", warn: "#F59E0B",
        // Category Colors
        catVanHoc: "#FFE4E1", catKinhTe: "#E0F2FE", catThieuNhi: "#FEF3C7",
        catKhoaHoc: "#DBEAFE", catNgheThuat: "#FCE7F3", catLichSu: "#D1FAE5"
    },
    r: { sm: 4, md: 8, lg: 16, xl: 24, full: 999 },
    spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 64, s3xl: 80, s4xl: 120 }
};

// ========== PAGE X OFFSETS (tránh đè lên nhau) ==========
const PAGE_OFFSETS = {
    designSystem: 0,
    homepage: 2000,
    shopGrid: 4000,
    shopList: 6000,
    productDetail: 8000,
    searchResults: 10000,
    blogList: 12000,
    blogPost: 14000,
    cart: 16000,
    checkoutStep1: 18000,
    checkoutStep2: 20000,
    orderSuccess: 22000,
    loginRegister: 24000,
    dashboard: 26000,
    myOrders: 28000,
    profileSettings: 30000,
    aboutUs: 32000
};

// ========== BASIC FUNCTIONS ==========
async function frame(c, x, y, width, height, name) {
    const f = await c.callTool("create-frame", { x, y, width, height, name });
    if (f?.id) await c.callTool("set-fill-color", { id: f.id, color: toHex8("#FFFFFF") });
    return f;
}

async function rect(c, x, y, width, height, color, cornerRadius, parentId, options = {}) {
    const r = await c.callTool("create-rectangle", {
        x: Math.round(x), y: Math.round(y),
        width: Math.round(width), height: Math.round(height),
        parentId
    });
    if (r?.id) {
        if (color) await c.callTool("set-fill-color", { id: r.id, color: toHex8(color) });
        if (cornerRadius !== undefined) await c.callTool("set-corner-radius", { id: r.id, cornerRadius });
        if (options.stroke) await c.callTool("set-stroke", { id: r.id, color: toHex8(options.stroke), weight: 1 });
        if (options.shadow) await c.callTool("add-drop-shadow", { id: r.id, color: "#0000001A", offset: { x: 0, y: 4 }, blur: 20 });
    }
    return r;
}

async function text(c, x, y, characters, fontSize, fontWeight, color, parentId, maxWidth) {
    return await c.callTool("create-text", {
        x: Math.round(x), y: Math.round(y),
        text: characters || " ", fontSize, fontWeight,
        color: toHex8(color), parentId, maxWidth: maxWidth ? Math.round(maxWidth) : undefined
    });
}

// ========== UNIFIED HEADER COMPONENT ==========
async function unifiedHeader(c, y, parentId) {
    const M = DS.margin;

    // Header background với border bottom
    await rect(c, 0, y, DS.w, 80, '#FFFFFF', 0, parentId, { stroke: DS.colors.n200 });

    // Logo
    await text(c, M, y + 28, 'BOOKVN', 24, 800, DS.colors.pri, parentId);

    // Nav items
    const navItems = ['Trang chủ', 'Cửa hàng', 'Blog', 'Về chúng tôi', 'Liên hệ'];
    for (let i = 0; i < navItems.length; i++) {
        await text(c, 320 + i * 140, y + 32, navItems[i], 14, 600, DS.colors.n900, parentId);
    }

    // Search bar (integrated)
    await rect(c, 900, y + 24, 300, 32, DS.colors.n50, DS.r.full, parentId, { stroke: DS.colors.n200 });
    await text(c, 920, y + 32, '🔍 Tìm sách...', 12, 400, DS.colors.n400, parentId);

    // Login button
    await rect(c, DS.w - 200, y + 24, 120, 32, DS.colors.pri, DS.r.full, parentId);
    await text(c, DS.w - 175, y + 32, 'Đăng nhập', 14, 700, '#FFFFFF', parentId);

    return y + 80;
}

// ========== UNIFIED FOOTER COMPONENT ==========
async function unifiedFooter(c, y, parentId) {
    const M = DS.margin;
    const footerHeight = 400;

    // Footer background
    await rect(c, 0, y, DS.w, footerHeight, DS.colors.n800, 0, parentId);

    // Brand column
    await text(c, M, y + 40, 'BOOKVN', 24, 800, '#FFFFFF', parentId);
    await text(c, M, y + 80, 'Nền tảng sách trực tuyến\nhàng đầu Việt Nam', 14, 400, DS.colors.n400, parentId, 300);

    // Footer columns
    const footerCols = [
        ['Về Chúng Tôi', 'Giới thiệu', 'Liên hệ', 'Tuyển dụng'],
        ['Hỗ Trợ', 'Câu hỏi thường gặp', 'Chính sách đổi trả', 'Hướng dẫn mua hàng'],
        ['Chính Sách', 'Bảo mật', 'Điều khoản', 'Thanh toán']
    ];

    for (let i = 0; i < footerCols.length; i++) {
        const fx = M + 400 + i * 280;
        await text(c, fx, y + 40, footerCols[i][0], 16, 700, '#FFFFFF', parentId);
        for (let j = 1; j < footerCols[i].length; j++) {
            await text(c, fx, y + 80 + j * 32, footerCols[i][j], 14, 400, DS.colors.n400, parentId);
        }
    }

    // Bottom bar
    await rect(c, 0, y + footerHeight - 50, DS.w, 1, DS.colors.n600, 0, parentId);
    await text(c, M, y + footerHeight - 30, '© 2026 BOOKVN. All rights reserved.', 14, 400, DS.colors.n400, parentId);

    return y + footerHeight;
}

// ========== REUSABLE COMPONENTS ==========
async function productCard(c, x, y, title, author, price, parentId) {
    await rect(c, x, y, 240, 400, '#FFFFFF', DS.r.lg, parentId, { shadow: true, stroke: DS.colors.n200 });
    await rect(c, x + 12, y + 12, 216, 280, DS.colors.n100, DS.r.md, parentId);
    await text(c, x + 16, y + 308, title, 16, 700, DS.colors.n900, parentId, 208);
    await text(c, x + 16, y + 340, author, 14, 400, DS.colors.n600, parentId, 208);
    await text(c, x + 16, y + 368, price, 18, 700, DS.colors.pri, parentId);
}

async function blogCard(c, x, y, title, category, excerpt, date, parentId) {
    await rect(c, x, y, 400, 450, '#FFFFFF', DS.r.lg, parentId, { shadow: true });
    await rect(c, x, y, 400, 240, DS.colors.n100, DS.r.lg, parentId);
    await rect(c, x + 16, y + 16, 120, 28, DS.colors.priL, DS.r.full, parentId);
    await text(c, x + 28, y + 22, category, 12, 600, DS.colors.pri, parentId);
    await text(c, x + 16, y + 260, title, 18, 700, DS.colors.n900, parentId, 368);
    await text(c, x + 16, y + 320, excerpt, 14, 400, DS.colors.n600, parentId, 368);
    await text(c, x + 16, y + 410, date, 12, 400, DS.colors.n400, parentId);
}

module.exports = { McpClient, DS, PAGE_OFFSETS, toHex8, frame, rect, text, unifiedHeader, unifiedFooter, productCard, blogCard };
