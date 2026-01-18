# Hướng Dẫn Cài Đặt & Sử Dụng Figma Layout Generation

Bộ công cụ này giúp bạn tự động tạo các layout UI chuyên nghiệp trong Figma thông qua Model Context Protocol (MCP).

## 1. Yêu Cầu Hệ Thống

*   **Node.js**: Phiên bản 18 trở lên.
*   **Figma Account**: Có quyền chỉnh sửa (Edit access).
*   **Figma Desktop App**: (Khuyến nghị) để xem thay đổi theo thời gian thực.

## 2. Cài Đặt Figma MCP Server

Đây là bước quan trọng nhất để script có thể kết nối và điều khiển Figma.

### Bước 2.1: Lấy Figma Access Token
1.  Mở Figma trong trình duyệt hoặc Desktop App.
2.  Bấm vào Avatar của bạn (góc trên trái hoặc phải) -> **Settings**.
3.  Kéo xuống phần **Personal Access Tokens**.
4.  Bấm **Generate new token**.
5.  Đặt tên (ví dụ: `AI-Agent`) và chọn Expiration (ví dụ: `No expiration`).
6.  **Copy token này ngay lập tức** (bạn sẽ không thấy lại nó).

### Bước 2.2: Lấy File Key
1.  Mở file Figma thiết kế của bạn.
2.  Nhìn vào URL của file: `https://www.figma.com/design/FILE_KEY/Title...`
3.  Copy chuỗi `FILE_KEY` (ví dụ: `abc123XYZ...`).

### Bước 2.3: Chạy Figma MCP Server
Chúng ta sẽ sử dụng server `figma-mcp-server` từ cộng đồng (hoặc phiên bản local bạn đã có).

Cách nhanh nhất là dùng `npx` (nếu bạn chưa cài local server):

```bash
# Thay thế YOUR_ACCESS_TOKEN bằng token bạn vừa lấy ở Bước 2.1
# Thay thế FILE_KEY bằng key file bạn lấy ở Bước 2.2
npx -y @modelcontextprotocol/server-figma --access-token YOUR_ACCESS_TOKEN --file-key FILE_KEY
```

**Lưu ý:** Script hiện tại đang được cấu hình để kết nối tới cổng `38450`. Nếu bạn dùng một MCP Server khác hoặc cổng khác, hãy sửa lại file `figma-helper.js`:
```javascript
// figma-helper.js
class McpClient {
    constructor() {
        this.url = 'http://localhost:38450/mcp'; // Đổi cổng nếu cần
        // ...
    }
}
```

## 3. Cài Đặt Dependencies Cho Script

Trong thư mục `Figma_Layout_Generation`, mở terminal và chạy:

```bash
npm install axios
```
*(Script dùng `axios` để giao tiếp JSON-RPC với MCP Server)*

## 4. Cách Sử Dụng

### Chạy Tất Cả (Khuyến nghị)
Để tạo toàn bộ hệ thống layout (Design System, Trang chủ, Chi tiết sản phẩm, v.v.):

```bash
node run_all.js
```

### Chạy Từng Phần
Bạn có thể chạy riêng lẻ từng script nếu chỉ muốn update một trang cụ thể:

*   `node V3_generate_homepage.js` : Tạo Trang chủ
*   `node V3_generate_product_detail.js` : Tạo Trang chi tiết sản phẩm
*   `node V3_generate_cart.js` : Tạo Giỏ hàng
*   ... (xem danh sách file trong thư mục)

## 5. Xử Lý Lỗi Thường Gặp

*   **Lỗi kết nối (ECONNREFUSED)**: Kiểm tra xem Figma MCP Server đã chạy chưa (Bước 2.3). Đảm bảo cổng 38450 đang mở.
*   **Lỗi "Cannot read properties of null"**: Thường do MCP Server không trả về ID của Frame mới tạo. Hãy thử lại lệnh hoặc kiểm tra kết nối mạng.
*   **Script chạy nhưng không thấy gì trên Figma**: Kiểm tra xem bạn có đang mở đúng File ứng với `FILE_KEY` đã cung cấp cho server không.

---
**Chúc bạn thành công!**
