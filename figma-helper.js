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
        // Slow down slightly to avoid bridge congestion
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

const DS = {
    w: 1440,
    margin: 80,
    gutter: 32,
    container: 1280,
    colors: {
        pri: "#FF5C00", priH: "#E65300", priL: "#FFF5F0",
        n900: "#111827", n600: "#4B5563", n400: "#9CA3AF",
        n200: "#E5E7EB", n100: "#F3F4F6", n50: "#F9FAFB",
        succ: "#10B981", succL: "#ECFDF5", err: "#EF4444", warn: "#F59E0B"
    },
    r: { sm: 4, md: 8, lg: 16, xl: 24, full: 999 },
    spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 64, s3xl: 80, s4xl: 120 }
};

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

module.exports = { McpClient, DS, toHex8, frame, rect, text };
