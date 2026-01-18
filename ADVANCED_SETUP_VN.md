# HƯỚNG DẪN CÀI ĐẶT FIGMA MCP SERVER (LOCAL PLUGIN VERSION)

Đây là phương pháp **Local Plugin**: Script Node.js <-> Server Trung Gian <-> Figma Plugin (Desktop).

---

## 1. Chuẩn Bị Server
Bộ công cụ này đã **tích hợp sẵn** source code của figma-mcp-server trong thư mục `figma-mcp-server`.
Bạn KHÔNG CẦN tải gì thêm. Chỉ cần cài đặt thư viện một lần duy nhất:

```bash
cd figma-mcp-server
npm install
npm run build
```

## 2. Cài Đặt Plugin Vào Figma

Để Figma "nghe" được lệnh, bạn cần cài Plugin này vào chế độ Development.

1.  Mở **Figma Desktop App**.
2.  Chuột phải vào màn hình thiết kế -> **Plugins** -> **Development** -> **Import plugin from manifest...**
3.  Chọn file `manifest.json` trong thư mục `figma-mcp-server` vừa tải.
4.  **CHẠY PLUGIN**: Vào lại menu Plugins -> Development -> Chọn **Figma MCP Server**.
    *   *Một cửa sổ nhỏ sẽ hiện ra. Đừng đóng nó!*

## 3. Bật Server Trung Gian (Quan Trọng)

Đây là bước kết nối giữa máy tính và Plugin trong Figma.

1.  Vào thư mục `Figma_Layout_Generation`.
2.  Chạy file `start_figma_server.bat`.
    *   *Lưu ý: Nếu file này báo lỗi không tìm thấy, hãy chuột phải vào nó chọn Edit và sửa lại đường dẫn tới thư mục `figma-mcp-server` của bạn.*
3.  Khi thấy thông báo server đang chạy, hãy để nguyên cửa sổ đó.

## 4. Chạy Script Tạo Layout

Bây giờ mọi thứ đã thông suốt, bạn có thể chạy các script tạo giao diện.

1.  Mở một cửa sổ Terminal mới tại thư mục `Figma_Layout_Generation`.
2.  Chạy lệnh:
    ```bash
    node run_all.js
    ```

Script sẽ gửi lệnh tới Server Trung Gian -> Plugin -> Vẽ lên Figma.

---

### TÓM TẮT CÁC CỬA SỔ CẦN MỞ:
1.  **Figma Desktop**: Đang mở file & Plugin đang chạy (cửa sổ bé xíu).
2.  **CMD/Terminal 1**: Đang chạy `start_figma_server.bat` (Server trung gian).
3.  **CMD/Terminal 2**: Chạy lệnh `node run_all.js` (Script vẽ).
