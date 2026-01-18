# HƯỚNG DẪN SỬ DỤNG BỘ CÔNG CỤ TẠO LAYOUT FIGMA (MCP)

Tài liệu này hướng dẫn chi tiết cách mang bộ công cụ `Figma_Layout_Generation` sang một dự án hoặc máy tính khác để tự động tạo giao diện UI.

---

## 1. Chuẩn Bị Môi Trường

Trước khi bắt đầu, hãy đảm bảo máy tính mới đã cài:
1.  **Node.js**: (Phiên bản v18 trở lên). Tải tại: [nodejs.org](https://nodejs.org/)
2.  **Git Bash / Terminal**: Để chạy lệnh.

## 2. Thiết Lập Dự Án Mới

### Bước 1: Copy Thư Mục
Copy toàn bộ thư mục `Figma_Layout_Generation` vào dự án mới của bạn.

### Bước 2: Cài Đặt Thư Viện
Mở Terminal tại thư mục `Figma_Layout_Generation` và chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
npm install
```
*(Lệnh này sẽ cài đặt `axios` dựa trên file `package.json` đi kèm).*

---

## 3. Kết Nối Với Figma (Quan Trọng)

Để script có thể vẽ lên file Figma của bạn, bạn cần chạy một "cầu nối" gọi là **MCP Server**.

### 3.1. Lấy thông tin từ Figma
1.  **Access Token**: 
    *   Vào Figma -> Settings -> Personal Access Tokens -> Generate new token.
    *   **Lưu ý:** Copy token này ngay vì bạn sẽ không xem lại được.
2.  **File Key**:
    *   Mở file thiết kế Figma muốn vẽ.
    *   Nhìn lên thanh địa chỉ: `figma.com/design/GOOGLE_123/Ten-Du-An...`
    *   `GOOGLE_123` chính là **File Key**.

### 3.2. Chạy Server
Dùng lệnh sau trong Terminal (thay thế thông tin của bạn vào):

```bash
npx -y @modelcontextprotocol/server-figma --access-token <TOKEN_CUA_BAN> --file-key <KEY_FILE_CUA_BAN>
```

*Giữ nguyên cửa sổ Terminal này đang chạy. Đừng tắt nó!*

---

## 4. Chạy Script Tạo Giao Diện

Mở một cửa sổ Terminal **mới** (khác cửa sổ đang chạy server), trỏ vào thư mục `Figma_Layout_Generation`.

### Cách 1: Chạy toàn bộ (Khuyên dùng)
Lệnh này sẽ tự động tạo trang Design System trước, sau đó lần lượt tạo tất cả các trang khác (Trang chủ, Chi tiết, Giỏ hàng...) theo đúng thứ tự.

```bash
node run_all.js
```

### Cách 2: Chạy từng trang lẻ
Nếu bạn chỉ muốn sửa/tạo lại một trang cụ thể:

*   **Design System:** `node V3_generate_design_system.js`
*   **Trang chủ:** `node V3_generate_homepage.js`
*   **Chi tiết sản phẩm:** `node V3_generate_product_detail.js`
*   **Giỏ hàng:** `node V3_generate_cart.js`
*   ... (dùng lệnh `ls` hoặc `dir` để xem danh sách file)

---

## 5. Tùy Chỉnh Thiết Kế (Nâng Cao)

Bạn có thể thay đổi màu sắc, font chữ hoặc kích thước chung cho toàn bộ dự án mà không cần sửa từng file.

### Sửa file `figma-helper.js`
Tìm biến `DS` (Design System) ở đầu file:

```javascript
const DS = {
    w: 1440,          // Chiều rộng trang web
    margin: 80,       // Lề trái/phải
    gutter: 32,       // Khoảng cách giữa các cột
    colors: {
        pri: "#FF5C00",   // Màu chủ đạo (Cam) -> Đổi thành màu brand của bạn
        n900: "#111827",  // Màu chữ chính
        // ...
    },
    // ...
};
```

Sau khi sửa file này, chạy lại `node run_all.js`, toàn bộ giao diện sẽ được cập nhật theo màu sắc/kích thước mới.

---

## 6. Xử Lý Lỗi

*   **Lỗi `connect ECONNREFUSED 127.0.0.1:38450`**:
    *   Nguyên nhân: Bạn chưa chạy MCP Server hoặc đã tắt cửa sổ Terminal ở Bước 3.2.
    *   Khắc phục: Chạy lại lệnh `npx` ở Bước 3.2.

*   **Lỗi `Cannot read properties of null (reading 'id')`**:
    *   Nguyên nhân: Server kết nối được nhưng Figma từ chối tạo Frame (thường do mạng lag hoặc Token hết hạn).
    *   Khắc phục: Thử chạy lại lệnh `node`. Nếu vẫn bị, hãy thử tạo Access Token mới.

*   **Script chạy xong nhưng Figma không có gì**:
    *   Nguyên nhân: Bạn đang mở sai file Figma (File Key không khớp với Key lúc chạy server).
    *   Khắc phục: Kiểm tra kỹ File Key.
