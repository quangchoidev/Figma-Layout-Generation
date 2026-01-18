const http = require('http');

// ============================================================================
// PROFESSIONAL SEARCH RESULTS GENERATOR v3.0
// Focus: 12-Column Grid, Search UI, Result Count alignment
// ============================================================================

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
    constructor() { this.msgId = 1; }
    async connect() {
        return new Promise((resolve, reject) => {
            const initPayload = {
                jsonrpc: "2.0", id: this.msgId++, method: "initialize",
                params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "pro-search-gen", version: "3.0" } }
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
        return new Promise((resolve) => {
            const payload = { jsonrpc: "2.0", id: this.msgId++, method: "tools/call", params: { name, arguments: args } };
            this._send(this.sessionId, payload, (err, res, data) => {
                if (err) return resolve(null);
                try {
                    const lines = data.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const jsonStr = line.substring(6);
                            if (jsonStr.trim() === '[DONE]') continue;
                            const parsed = JSON.parse(jsonStr);
                            if (parsed.id === payload.id && parsed.result) {
                                resolve(parsed.result.isError ? null : parseResult(parsed.result.content?.[0]?.text));
                                return;
                            }
                        }
                    }
                    resolve(null);
                } catch (e) { resolve(null); }
            });
        });
    }
    _send(sessionId, body, callback) {
        const bodyString = JSON.stringify(body);
        const options = {
            hostname: 'localhost', port: 38450, path: '/mcp', method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream', 'Content-Length': Buffer.byteLength(bodyString) }
        };
        if (sessionId) options.headers['mcp-session-id'] = sessionId;
        const req = http.request(options, (res) => {
            let data = ''; res.on('data', c => data += c); res.on('end', () => callback(null, res, data));
        });
        req.on('error', callback); req.write(bodyString); req.end();
    }
}

const DS = {
    colors: {
        pri: "#FF6B35", n50: "#F9FAFB", n100: "#F3F4F6", n200: "#E5E7EB", n400: "#9CA3AF", n600: "#4B5563", n900: "#111827"
    },
    r: { sm: 8, md: 12, lg: 16, full: 999 },
    spacing: { xl: 48, xxl: 80 },
    w: 1440,
    margin: 80,
    gutter: 32
};

// --- ELITE HELPERS ---
async function rect(c, x, y, w, h, fill, r, p, options = {}) {
    const node = await c.callTool("create-rectangle", { x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(h), parentId: p });
    if (node?.id) {
        if (fill) await c.callTool("set-fill-color", { id: node.id, color: toHex8(fill) });
        if (r !== undefined) await c.callTool("set-corner-radius", { id: node.id, cornerRadius: r });
        if (options.stroke) await c.callTool("set-stroke-color", { id: node.id, color: toHex8(options.stroke) });
        if (options.shadow) await c.callTool("apply-effect", { id: node.id, type: "DROP_SHADOW", color: toHex8("#00000010"), offset: { x: 0, y: 4 }, radius: 12 });
    }
    return node;
}

async function text(c, x, y, content, size, weight, color, p, maxWidth = 9999) {
    let disp = content || " ";
    if (disp.length * (size * 0.5) > maxWidth) {
        const limit = Math.floor(maxWidth / (size * 0.45));
        if (disp.length > limit) disp = disp.substring(0, limit - 3) + "...";
    }
    return await c.callTool("create-text", {
        x: Math.round(x), y: Math.round(y), text: disp, fontSize: size, fontWeight: weight,
        fontColor: toHex8(color), fontName: "Inter", parentId: p
    });
}

async function frame(c, x, y, w, h, name) {
    const f = await c.callTool("create-frame", { x, y, width: w, height: h, name });
    if (f?.id) {
        await c.callTool("set-fill-color", { id: f.id, color: toHex8(DS.colors.n50) });
        await c.callTool("create-layout-grid", { parentId: f.id, type: "COLUMNS", numColumns: 12, gutterSize: DS.gutter, margin: DS.margin, color: toHex8("#FF6B3510") });
    }
    return f;
}

async function productCard(c, x, y, title, author, price, p) {
    const card = await rect(c, x, y, 280, 420, "#FFFFFF", DS.r.lg, p, { shadow: true });
    await rect(c, x + 12, y + 12, 256, 280, DS.colors.n100, DS.r.md, p);
    await text(c, x + 16, y + 308, title, 16, 700, DS.colors.n900, p, 248);
    await text(c, x + 16, y + 336, author, 14, 400, DS.colors.n600, p);
    await text(c, x + 16, y + 372, price, 20, 700, DS.colors.pri, p);
}

async function run() {
    const c = new McpClient();
    console.log("🔍 Fixing Search Results (Async Loops & Coordinates)...");
    await c.connect();

    const f = await frame(c, 18000, 0, DS.w, 2000, "05. KẾT QUẢ TÌM KIẾM (V3.1 FIXED)");
    if (!f?.id) return;
    const fId = f.id;

    // Header 
    await rect(c, 0, 0, DS.w, 80, "#FFFFFF", 0, fId);
    await text(c, DS.margin, 24, "BOOKVN", 24, 800, DS.colors.pri, fId);

    // Search Bar
    let y = 140;
    await rect(c, DS.margin, y, DS.container, 80, DS.colors.n100, DS.r.full, fId, { stroke: DS.colors.n200 });
    await text(c, DS.margin + 40, y + 28, "Nguyễn Nhật Ánh", 24, 600, DS.colors.n900, fId);
    await rect(c, DS.margin + DS.container - 180, y + 12, 160, 56, DS.colors.pri, DS.r.full, fId);
    await text(c, DS.margin + DS.container - 145, y + 32, "TÌM KIẾM", 14, 700, "#FFFFFF", fId);

    y += 120;
    await text(c, DS.margin, y, "8 kết quả cho \"Nguyễn Nhật Ánh\"", 18, 500, DS.colors.n600, fId);

    // Results Grid (2x4)
    y += 64;
    const products = [
        ["Mắt Biếc", "Nguyễn Nhật Ánh", "125.000đ"],
        ["Tôi Thấy Hoa Vàng...", "Nguyễn Nhật Ánh", "115.000đ"],
        ["Cho Tôi Xin Một Vé...", "Nguyễn Nhật Ánh", "105.000đ"],
        ["Cảm Ơn Người Lớn", "Nguyễn Nhật Ánh", "98.000đ"],
        ["Lá Nằm Trong Lá", "Nguyễn Nhật Ánh", "92.000đ"],
        ["Cô Gái Đến Từ Hôm Qua", "Nguyễn Nhật Ánh", "118.000đ"],
        ["Tôi Là Bêtô", "Nguyễn Nhật Ánh", "88.000đ"],
        ["Ngồi Khóc Trên Cây", "Nguyễn Nhật Ánh", "95.000đ"]
    ];

    let i = 0;
    for (const p of products) {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const px = DS.margin + col * (280 + 53);
        const py = y + row * (420 + 32);
        await productCard(c, px, py, p[0], p[1], p[2], fId);
        i++;
    }

    // Related Searches
    y += 2 * (420 + 32) + 64;
    await text(c, DS.margin, y, "Tìm kiếm liên quan:", 16, 600, DS.colors.n600, fId);
    const related = ["Nguyễn Nhật Ánh truyện ngắn", "Sách hay 2024", "Tiểu thuyết thanh xuân", "NXB Trẻ"];
    let j = 0;
    for (const r of related) {
        await text(c, DS.margin + 160 + j * 240, y, r, 16, 500, DS.colors.pri, fId);
        j++;
    }

    console.log("✨ Professional Search Results (High Density) Ready.");
}

run().catch(console.error);
