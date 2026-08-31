# Graduation Release 2026.0

Website thiệp mời lễ trao bằng theo concept software release.

## Chạy local

```bash
npm install
npm run dev
```

## Deploy GitHub Pages

1. Tạo repository, ví dụ `graduation-release`.
2. Trong `vite.config.js`, đổi:
   `base: "/graduation-release/"`
   thành đúng tên repository.
3. Push code lên branch `main`.
4. Vào `Settings -> Pages -> Build and deployment -> Source`.
5. Chọn `GitHub Actions`.
6. GitHub Actions sẽ tự build và deploy.

URL:

`https://USERNAME.github.io/graduation-release/`

## Chỉnh thông tin

Sửa `src/data.js`:

- name
- date
- time
- venue
- address
- mapUrl

## Ảnh

Có thể thêm ảnh vào `public/images/` rồi dùng đường dẫn `/graduation-release/images/ten-anh.jpg`.

## Lưu ý RSVP

RSVP hiện chỉ là interaction phía client, chưa lưu dữ liệu. Nếu muốn thu thập danh sách khách, nối nút RSVP với Google Forms, Formspree hoặc một backend/API riêng.
